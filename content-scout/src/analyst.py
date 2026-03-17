#!/usr/bin/env python3
"""
Content Scout - コア分析パイプライン

蓄積された技術シグナルを Claude CLI で分析し、
研修テーマの提案 YAML を生成する。

使い方:
    python3 analyst.py                # 標準実行
    python3 analyst.py --dry-run      # 保存せずに確認
    python3 analyst.py --days 5       # 過去5日分を対象
    python3 analyst.py --data-dir /tmp/scout  # データディレクトリ指定
"""

import argparse
import json
import logging
import os
import re
import subprocess
import sys
from datetime import datetime, timedelta, timezone
from pathlib import Path
from typing import Optional

import yaml

# ─── 定数 ───
SCOUT_DIR = Path(__file__).parent          # project/src/
PROJECT_DIR = SCOUT_DIR.parent             # project/
CONFIG_DIR = PROJECT_DIR / "config"        # project/config/

JST = timezone(timedelta(hours=9))

# デフォルトのデータディレクトリ（環境変数で上書き可能）
DEFAULT_DATA_DIR = Path.home() / ".scout" / "data"
DEFAULT_PROPOSALS_DIR = Path.home() / ".scout" / "proposals"
DEFAULT_STATE_DIR = Path.home() / ".scout" / "state"
DEFAULT_LOG_DIR = Path.home() / ".scout" / "logs"
DEFAULT_CURRICULA_DIR = Path.home() / "Desktop" / "Learning-Curricula"

PROMPT_TEMPLATE_FILE = CONFIG_DIR / "analyst_prompt.txt"
STRATEGY_FILE = CONFIG_DIR / "content_strategy.yaml"

# 提案上限
MAX_PROPOSALS_PER_DAY = 2
MAX_PROPOSALS_PER_WEEK = 5
MIN_SIGNAL_SCORE = 5.0

# バリデーション定数
VALID_AUDIENCES = {"エンジニア", "初学者", "ビジネス職"}
VALID_DIFFICULTIES = {"入門", "入門〜中級", "中級〜上級"}
VALID_ACTIONS = {"create", "update", "defer"}
REQUIRED_PROPOSAL_FIELDS = [
    "title", "curriculum_name", "target_audience",
    "difficulty", "reason", "source_signal_ids",
    "existing_similar", "action",
]


# ─── パス解決ヘルパー ───
def _resolve_data_dir() -> Path:
    """環境変数からデータディレクトリを解決する。"""
    env = os.environ.get("SCOUT_DATA_DIR")
    if env:
        return Path(env)
    home = os.environ.get("SCOUT_HOME")
    if home:
        return Path(home) / "data"
    return DEFAULT_DATA_DIR


def _resolve_proposals_dir() -> Path:
    """環境変数から提案ディレクトリを解決する。"""
    home = os.environ.get("SCOUT_HOME")
    if home:
        return Path(home) / "proposals"
    return DEFAULT_PROPOSALS_DIR


def _resolve_state_dir() -> Path:
    """環境変数から状態ディレクトリを解決する。"""
    home = os.environ.get("SCOUT_HOME")
    if home:
        return Path(home) / "state"
    return DEFAULT_STATE_DIR


def _resolve_log_dir() -> Path:
    """環境変数からログディレクトリを解決する。"""
    home = os.environ.get("SCOUT_HOME")
    if home:
        return Path(home) / "logs"
    return DEFAULT_LOG_DIR


def _resolve_curricula_dir() -> Path:
    """カリキュラムディレクトリを解決する。"""
    env = os.environ.get("SCOUT_CURRICULA_DIR")
    if env:
        return Path(env)
    return DEFAULT_CURRICULA_DIR


# ─── ログ設定 ───
def _setup_logging() -> logging.Logger:
    """ロガーをセットアップする。"""
    log_dir = _resolve_log_dir()
    log_dir.mkdir(parents=True, exist_ok=True)
    logger = logging.getLogger("analyst")
    if not logger.handlers:
        logger.setLevel(logging.INFO)
        fmt = logging.Formatter("%(asctime)s [%(levelname)s] %(name)s: %(message)s")
        sh = logging.StreamHandler()
        sh.setFormatter(fmt)
        logger.addHandler(sh)
        fh = logging.FileHandler(log_dir / "analyst.log", encoding="utf-8")
        fh.setFormatter(fmt)
        logger.addHandler(fh)
    return logger


log = _setup_logging()


# ─── YAML ユーティリティ ───
def load_yaml(path: Path) -> dict:
    """YAML ファイルを読み込む。"""
    with open(path, "r", encoding="utf-8") as f:
        return yaml.safe_load(f) or {}


# ─── JSONL ユーティリティ ───
def read_jsonl(path: Path) -> list[dict]:
    """JSONL ファイルを読み込む。不正な行はスキップする。"""
    entries = []
    if not path.exists():
        return entries
    with open(path, "r", encoding="utf-8") as f:
        for line in f:
            line = line.strip()
            if not line:
                continue
            try:
                entries.append(json.loads(line))
            except json.JSONDecodeError as e:
                log.warning("JSONL パースエラー (%s): %s", path.name, e)
    return entries


def append_jsonl(path: Path, entry: dict) -> None:
    """JSONL ファイルにエントリを追記する。"""
    path.parent.mkdir(parents=True, exist_ok=True)
    with open(path, "a", encoding="utf-8") as f:
        f.write(json.dumps(entry, ensure_ascii=False) + "\n")


# ============================================================
# A1. load_signals - シグナル読み込み
# ============================================================

def load_signals(data_dir: Optional[Path] = None, days: int = 3) -> list[dict]:
    """直近 N 日分の未分析シグナルを読み込む。

    Args:
        data_dir: データディレクトリ（None の場合は環境変数から解決）
        days: 過去何日分のシグナルを対象とするか

    Returns:
        フィルタリングされたシグナルのリスト
    """
    if data_dir is None:
        data_dir = _resolve_data_dir()

    signals_file = data_dir / "raw_signals.jsonl"
    if not signals_file.exists():
        log.warning("シグナルファイルが存在しません: %s", signals_file)
        return []

    # 全シグナル読み込み（不正行はスキップ）
    all_signals = read_jsonl(signals_file)
    if not all_signals:
        log.info("シグナルファイルが空です")
        return []

    # 日付フィルタ
    now = datetime.now(JST)
    cutoff = now - timedelta(days=days)
    filtered = []
    for sig in all_signals:
        try:
            fetched = datetime.fromisoformat(sig["fetched_at"])
            if fetched >= cutoff:
                filtered.append(sig)
        except (KeyError, ValueError) as e:
            log.warning("シグナルの日付パースエラー: %s", e)
            continue

    # 分析済み除外
    state_dir = _resolve_state_dir()
    last_analysis_file = state_dir / "last_analysis.json"
    if last_analysis_file.exists():
        try:
            with open(last_analysis_file, "r", encoding="utf-8") as f:
                state = json.load(f)
            last_fetched_str = state.get("last_signal_fetched_at", "")
            if last_fetched_str:
                last_fetched = datetime.fromisoformat(last_fetched_str)
                filtered = [
                    s for s in filtered
                    if datetime.fromisoformat(s["fetched_at"]) > last_fetched
                ]
        except (json.JSONDecodeError, ValueError) as e:
            log.warning("last_analysis.json パースエラー: %s", e)

    log.info("シグナル読み込み完了: %d件（全%d件中）", len(filtered), len(all_signals))
    return filtered


# ============================================================
# A2. check_duplicates - 重複チェック
# ============================================================

def _string_similarity(a: str, b: str) -> float:
    """簡易文字列類似度（文字集合の Jaccard 係数）。"""
    a_set = set(a.lower())
    b_set = set(b.lower())
    if not a_set or not b_set:
        return 0.0
    intersection = a_set & b_set
    union = a_set | b_set
    return len(intersection) / len(union)


def check_duplicates(
    title: str,
    curricula_dir: Optional[Path] = None,
) -> dict:
    """既存カリキュラムとの重複をチェックする。

    Args:
        title: チェックする提案タイトル
        curricula_dir: カリキュラムディレクトリ

    Returns:
        {"exact": bool, "similar": [...], "action": "create"|"update"|"reject"}
    """
    if curricula_dir is None:
        curricula_dir = _resolve_curricula_dir()

    result = {"exact": False, "similar": [], "action": "create"}

    if not curricula_dir.exists():
        return result

    existing_curricula = []
    for d in curricula_dir.iterdir():
        if not d.is_dir():
            continue
        # CONTENT_INFO.yaml からタイトル取得
        info_path = d / "CONTENT_INFO.yaml"
        if info_path.exists():
            try:
                info = load_yaml(info_path)
                cur_title = info.get("title", d.name)
            except Exception:
                cur_title = d.name
        else:
            cur_title = d.name
        existing_curricula.append({"name": d.name, "title": cur_title})

    for cur in existing_curricula:
        # 完全一致
        if title == cur["title"] or title == cur["name"]:
            result["exact"] = True
            result["action"] = "reject"
            return result

        # 部分一致（70%以上）
        sim = _string_similarity(title, cur["title"])
        if sim >= 0.7:
            result["similar"].append({"name": cur["name"], "similarity": round(sim, 3)})

    if result["similar"]:
        result["action"] = "update"

    return result


# ============================================================
# A3. build_prompt - プロンプト組み立て
# ============================================================

def build_prompt(
    signals: list[dict],
    strategy: str,
    existing_curricula: list[str],
    history: list[dict],
    feedback_summary: str = "",
    deferred_proposals: str = "",
    max_proposals: int = MAX_PROPOSALS_PER_DAY,
) -> str:
    """Claude 分析用プロンプトを組み立てる。

    Args:
        signals: 分析対象シグナル
        strategy: content_strategy.yaml の内容文字列
        existing_curricula: 既存カリキュラム名のリスト
        history: 過去の提案・却下履歴
        feedback_summary: フィードバック学習の要約
        deferred_proposals: 保留中提案の一覧文字列
        max_proposals: 日次提案上限

    Returns:
        組み立てられたプロンプト文字列
    """
    # テンプレート読み込み
    if PROMPT_TEMPLATE_FILE.exists():
        template = PROMPT_TEMPLATE_FILE.read_text(encoding="utf-8")
    else:
        # フォールバックテンプレート
        template = (
            "あなたは研修コンテンツの企画担当者です。\n\n"
            "## 評価基準\n{content_strategy_yaml_content}\n\n"
            "## 既存カリキュラム一覧\n{existing_curricula_list}\n\n"
            "## 過去の承認/却下パターン（フィードバック学習）\n{feedback_summary}\n\n"
            "## 分析対象シグナル\n{signals_json}\n\n"
            "## 保留中の提案（再評価対象）\n{deferred_proposals}\n\n"
            "## 出力形式\n"
            "YAML形式で最大{max_proposals}件の提案を出力してください。\n"
        )

    # 既存カリキュラム一覧を文字列に
    curricula_list = "\n".join(f"- {c}" for c in existing_curricula) if existing_curricula else "（なし）"

    # シグナルデータを JSON に
    signals_json = json.dumps(signals, ensure_ascii=False, indent=2)

    # フィードバック要約が空なら表示
    if not feedback_summary:
        feedback_summary = "（フィードバック履歴なし）"

    if not deferred_proposals:
        deferred_proposals = "（保留中の提案なし）"

    prompt = template.format(
        content_strategy_yaml_content=strategy,
        existing_curricula_list=curricula_list,
        feedback_summary=feedback_summary,
        signals_json=signals_json,
        deferred_proposals=deferred_proposals,
        max_proposals=max_proposals,
    )

    return prompt


# ============================================================
# A4. run_analysis - Claude CLI 呼び出し
# ============================================================

def run_analysis(prompt: str) -> Optional[str]:
    """claude --print で分析を実行する。

    Args:
        prompt: 分析プロンプト

    Returns:
        Claude の出力文字列。失敗時は None。
    """
    try:
        result = subprocess.run(
            ["claude", "--print", "-p", prompt],
            capture_output=True,
            text=True,
            timeout=300,
        )
        if result.returncode != 0:
            log.error("Claude CLI エラー (exit %d): %s", result.returncode, result.stderr)
            return None
        return result.stdout
    except FileNotFoundError:
        log.error("Claude CLI が見つかりません。`claude` コマンドをインストールしてください。")
        return None
    except subprocess.TimeoutExpired:
        log.error("Claude CLI タイムアウト (300秒)")
        return None
    except Exception as e:
        log.error("Claude CLI 実行エラー: %s", e)
        return None


# ============================================================
# A5. parse_output / save_proposal - 出力パース・保存
# ============================================================

def parse_output(raw_output: str) -> Optional[list[dict]]:
    """Claude 出力から YAML ブロックを抽出・パースする。

    Args:
        raw_output: Claude の生出力

    Returns:
        提案リスト。パース失敗時は None。
    """
    if not raw_output:
        return None

    # ```yaml ... ``` ブロックを抽出
    yaml_match = re.search(r"```yaml\n(.*?)```", raw_output, re.DOTALL)
    if yaml_match is None:
        log.warning("Claude 出力に YAML ブロックが見つかりません")
        return None

    try:
        parsed = yaml.safe_load(yaml_match.group(1))
    except yaml.YAMLError as e:
        log.error("YAML パースエラー: %s", e)
        return None

    if not isinstance(parsed, dict) or "proposals" not in parsed:
        log.warning("YAML に 'proposals' キーがありません")
        return None

    proposals = parsed["proposals"]
    if not isinstance(proposals, list):
        return None

    # 必須フィールドバリデーション
    validated = []
    for p in proposals:
        if not isinstance(p, dict):
            continue
        # 最低限のフィールドチェック
        required = ["title", "curriculum_name", "target_audience", "difficulty", "reason"]
        if not all(k in p for k in required):
            missing = [k for k in required if k not in p]
            log.warning("提案に必須フィールドが不足: %s", missing)
            continue
        validated.append(p)

    return validated if validated else None


def save_proposal(
    proposal: dict,
    proposals_dir: Optional[Path] = None,
) -> Optional[str]:
    """提案を YAML ファイルとして保存し、履歴に追記する。

    Args:
        proposal: 提案データ
        proposals_dir: 保存先ディレクトリ

    Returns:
        保存先ファイルパス。上限超過時は None。
    """
    if proposals_dir is None:
        proposals_dir = _resolve_proposals_dir()

    proposals_dir.mkdir(parents=True, exist_ok=True)

    now = datetime.now(JST)
    date_str = now.strftime("%Y%m%d")

    # 日次上限チェック
    existing_today = list(proposals_dir.glob(f"{date_str}_*.yaml"))
    if len(existing_today) >= MAX_PROPOSALS_PER_DAY:
        log.warning("日次提案上限 (%d件) に達しています", MAX_PROPOSALS_PER_DAY)
        return None

    # ID 生成
    seq = len(existing_today) + 1
    proposal_id = f"{date_str}_{seq:03d}"

    # 提案データ構築
    full_proposal = {
        "id": proposal_id,
        "title": proposal.get("title", ""),
        "curriculum_name": proposal.get("curriculum_name", ""),
        "target_audience": proposal.get("target_audience", "エンジニア"),
        "difficulty": proposal.get("difficulty", "入門"),
        "category": proposal.get("category", ""),
        "reason": proposal.get("reason", ""),
        "source_signals": proposal.get("source_signals", []),
        "existing_similar": proposal.get("existing_similar"),
        "action": proposal.get("action", "create"),
        "created_at": now.isoformat(),
        "notified_at": None,
        "cross_source_boost": proposal.get("cross_source_boost", 1.0),
        "feedback_adjustment": proposal.get("feedback_adjustment", 0.0),
    }

    # YAML 保存
    path = proposals_dir / f"{proposal_id}.yaml"
    with open(path, "w", encoding="utf-8") as f:
        yaml.dump(
            {"proposal": full_proposal},
            f,
            allow_unicode=True,
            default_flow_style=False,
        )

    # history.jsonl に追記
    history_entry = {
        "proposal_id": proposal_id,
        "title": full_proposal["title"],
        "action": "proposed",
        "acted_at": now.isoformat(),
        "curriculum_path": None,
        "category": full_proposal.get("category", ""),
        "keywords": [],
    }
    append_jsonl(proposals_dir / "history.jsonl", history_entry)

    # last_analysis.json 更新
    _update_last_analysis(len([proposal]))

    log.info("提案保存完了: %s → %s", proposal_id, path)
    return str(path)


def _update_last_analysis(proposals_generated: int = 0) -> None:
    """last_analysis.json を更新する。"""
    state_dir = _resolve_state_dir()
    state_dir.mkdir(parents=True, exist_ok=True)
    state_path = state_dir / "last_analysis.json"

    now = datetime.now(JST)
    state = {
        "last_analysis": now.isoformat(),
        "signals_analyzed": 0,
        "proposals_generated": proposals_generated,
        "last_signal_fetched_at": now.isoformat(),
        "feedback_stats": {
            "total_approved": 0,
            "total_rejected": 0,
            "total_deferred": 0,
        },
    }

    # 既存の状態をマージ
    if state_path.exists():
        try:
            with open(state_path, "r", encoding="utf-8") as f:
                old = json.load(f)
            state["feedback_stats"] = old.get("feedback_stats", state["feedback_stats"])
        except (json.JSONDecodeError, KeyError):
            pass

    with open(state_path, "w", encoding="utf-8") as f:
        json.dump(state, f, ensure_ascii=False, indent=2)


# ============================================================
# A6. calculate_feedback_weights / apply_feedback_to_signal
# ============================================================

def calculate_feedback_weights(feedback_file: Optional[Path] = None) -> dict:
    """フィードバック履歴からカテゴリ/キーワード別ウェイトを計算する。

    Args:
        feedback_file: feedback.jsonl のパス

    Returns:
        {"categories": {cat: weight}, "keywords": {kw: weight}}
    """
    if feedback_file is None:
        feedback_file = _resolve_proposals_dir() / "feedback.jsonl"

    weights = {"categories": {}, "keywords": {}}

    if not feedback_file.exists():
        return weights

    entries = read_jsonl(feedback_file)
    if not entries:
        return weights

    for entry in entries:
        action = entry.get("action", "")
        if action == "approved":
            delta = 0.1
        elif action == "rejected":
            delta = -0.15
        else:
            continue

        cat = entry.get("category", "")
        if cat:
            current = weights["categories"].get(cat, 0)
            weights["categories"][cat] = max(-1.5, min(1.0, current + delta))

        for kw in entry.get("keywords", []):
            current = weights["keywords"].get(kw, 0)
            weights["keywords"][kw] = max(-1.5, min(1.0, current + delta))

    return weights


def apply_feedback_to_signal(signal: dict, weights: dict) -> dict:
    """シグナルのスコアにフィードバックウェイトを適用する。

    Args:
        signal: シグナルデータ
        weights: calculate_feedback_weights() の戻り値

    Returns:
        スコア調整済みのシグナルデータ（コピー）
    """
    adjusted = signal.copy()
    adjustment = 0.0

    cat = signal.get("category", "")
    adjustment += weights.get("categories", {}).get(cat, 0)

    matched_kw = signal.get("keywords_matched", [])
    if matched_kw:
        kw_adj = sum(weights.get("keywords", {}).get(kw, 0) for kw in matched_kw)
        adjustment += kw_adj / len(matched_kw)

    adjusted["score"] = signal.get("score", 0) + adjustment
    adjusted["feedback_adjustment"] = adjustment
    return adjusted


# ============================================================
# A7. cluster_signals_by_theme / apply_cross_source_boost
# ============================================================

def cluster_signals_by_theme(signals: list[dict]) -> list[list[dict]]:
    """シグナルをキーワード類似度でクラスタリングする。

    キーワード重複率 50% 以上で同一テーマと判定する。

    Args:
        signals: シグナルリスト

    Returns:
        クラスタのリスト（各クラスタはシグナルのリスト）
    """
    clusters = []
    used = set()

    for i, sig in enumerate(signals):
        if i in used:
            continue
        cluster = [sig]
        used.add(i)
        sig_kw = set(k.lower() for k in sig.get("keywords_matched", []))

        for j, other in enumerate(signals):
            if j in used:
                continue
            other_kw = set(k.lower() for k in other.get("keywords_matched", []))
            union = sig_kw | other_kw
            if not union:
                continue
            overlap = len(sig_kw & other_kw) / len(union)
            if overlap >= 0.5:
                cluster.append(other)
                used.add(j)

        clusters.append(cluster)

    return clusters


def apply_cross_source_boost(cluster: list[dict]) -> float:
    """クロスソース検出数に応じたスコア倍率を返す。

    Args:
        cluster: 同一テーマのシグナルリスト

    Returns:
        1.0 / 1.5 / 2.0 の倍率
    """
    unique_sources = set(sig.get("source", "") for sig in cluster)
    if len(unique_sources) >= 3:
        return 2.0
    elif len(unique_sources) >= 2:
        return 1.5
    else:
        return 1.0


# ============================================================
# A8. reevaluate_deferred_proposals - 保留提案再評価
# ============================================================

def reevaluate_deferred_proposals(
    defer_queue_file: Optional[Path] = None,
    signals: Optional[list[dict]] = None,
) -> list[dict]:
    """保留中の提案を再評価する。

    7日経過した提案を再評価し、関連シグナル増減をチェック。
    最大3回延長、超過は自動却下。

    Args:
        defer_queue_file: defer_queue.json のパス
        signals: 現在のシグナルリスト

    Returns:
        再提案すべき提案のリスト
    """
    if defer_queue_file is None:
        defer_queue_file = _resolve_proposals_dir() / "defer_queue.json"

    if signals is None:
        signals = []

    if not defer_queue_file.exists():
        return []

    try:
        with open(defer_queue_file, "r", encoding="utf-8") as f:
            queue = json.load(f)
    except (json.JSONDecodeError, ValueError) as e:
        log.warning("defer_queue.json パースエラー: %s", e)
        return []

    now = datetime.now(JST)
    reproposals = []
    updated_proposals = []

    for item in queue.get("deferred_proposals", []):
        try:
            reevaluate_at = datetime.fromisoformat(item["reevaluate_at"])
        except (KeyError, ValueError):
            updated_proposals.append(item)
            continue

        if now < reevaluate_at:
            updated_proposals.append(item)
            continue

        # 関連シグナルを検索
        related_keywords = set(k.lower() for k in item.get("related_keywords", []))
        new_signals = [
            s for s in signals
            if set(k.lower() for k in s.get("keywords_matched", [])) & related_keywords
            and s.get("fetched_at", "") > item.get("deferred_at", "")
        ]

        new_score = item.get("original_score", 0) + len(new_signals) * 1.5

        if item.get("reevaluation_count", 0) >= 3:
            # 自動却下
            log.info("自動却下: %s (再評価回数上限)", item.get("title", ""))
            _record_auto_reject(item)
            continue
        elif new_score >= MIN_SIGNAL_SCORE:
            # 再提案
            reproposals.append({
                "title": item.get("title", ""),
                "score": new_score,
                "new_signals": new_signals,
                "original_proposal_id": item.get("proposal_id", ""),
            })
            continue
        else:
            # 延長
            item["reevaluation_count"] = item.get("reevaluation_count", 0) + 1
            item["reevaluate_at"] = (now + timedelta(days=7)).isoformat()
            updated_proposals.append(item)
            log.info("延長: %s (回数: %d)", item.get("title", ""), item["reevaluation_count"])

    # キューを更新
    queue["deferred_proposals"] = updated_proposals
    with open(defer_queue_file, "w", encoding="utf-8") as f:
        json.dump(queue, f, ensure_ascii=False, indent=2)

    return reproposals


def _record_auto_reject(item: dict) -> None:
    """自動却下を history.jsonl に記録する。"""
    proposals_dir = _resolve_proposals_dir()
    entry = {
        "proposal_id": item.get("proposal_id", ""),
        "title": item.get("title", ""),
        "action": "rejected",
        "acted_at": datetime.now(JST).isoformat(),
        "curriculum_path": None,
        "category": "",
        "keywords": item.get("related_keywords", []),
    }
    append_jsonl(proposals_dir / "history.jsonl", entry)


# ============================================================
# メインパイプライン
# ============================================================

def _build_feedback_summary(weights: dict) -> str:
    """フィードバックウェイトを人間可読な要約に変換する。"""
    lines = []
    cats = weights.get("categories", {})
    kws = weights.get("keywords", {})

    if cats:
        lines.append("カテゴリ別傾向:")
        for cat, w in sorted(cats.items(), key=lambda x: -x[1]):
            sign = "+" if w >= 0 else ""
            lines.append(f"  {cat}: {sign}{w:.1f}")

    if kws:
        lines.append("キーワード別傾向:")
        for kw, w in sorted(kws.items(), key=lambda x: -x[1]):
            sign = "+" if w >= 0 else ""
            lines.append(f"  {kw}: {sign}{w:.1f}")

    return "\n".join(lines) if lines else "（フィードバック履歴なし）"


def _get_existing_curricula(curricula_dir: Optional[Path] = None) -> list[str]:
    """既存カリキュラム名のリストを取得する。"""
    if curricula_dir is None:
        curricula_dir = _resolve_curricula_dir()

    if not curricula_dir.exists():
        return []

    names = []
    for d in curricula_dir.iterdir():
        if d.is_dir():
            names.append(d.name)
    return sorted(names)


def run_pipeline(
    data_dir: Optional[Path] = None,
    days: int = 3,
    dry_run: bool = False,
) -> int:
    """分析パイプラインを実行する。

    Args:
        data_dir: データディレクトリ
        days: 対象日数
        dry_run: True の場合、保存・通知なしで確認のみ

    Returns:
        生成された提案数
    """
    log.info("=" * 60)
    log.info("Content Scout Analyst 開始: %s", datetime.now(JST).strftime("%Y-%m-%d %H:%M:%S JST"))
    log.info("=" * 60)

    # 1. シグナル読み込み
    signals = load_signals(data_dir=data_dir, days=days)
    if not signals:
        log.info("分析対象のシグナルがありません。終了します。")
        return 0

    # 2. フィードバック学習
    feedback_weights = calculate_feedback_weights()
    log.info("フィードバックウェイト計算完了")

    # 3. フィードバック適用
    adjusted_signals = [
        apply_feedback_to_signal(s, feedback_weights) for s in signals
    ]

    # 4. クロスソースシグナル増幅
    clusters = cluster_signals_by_theme(adjusted_signals)
    for cluster in clusters:
        boost = apply_cross_source_boost(cluster)
        if boost > 1.0:
            for sig in cluster:
                sig["score"] = sig.get("score", 0) * boost
                sig["cross_source_boost"] = boost
            log.info(
                "クロスソース増幅: %s (%.1fx, %d件)",
                cluster[0].get("title", "")[:40],
                boost,
                len(cluster),
            )

    # 5. 保留提案の再評価
    reproposals = reevaluate_deferred_proposals(signals=adjusted_signals)
    if reproposals:
        log.info("保留提案の再提案候補: %d件", len(reproposals))

    # 6. content_strategy.yaml 読み込み
    if STRATEGY_FILE.exists():
        strategy_content = STRATEGY_FILE.read_text(encoding="utf-8")
    else:
        log.error("content_strategy.yaml が見つかりません: %s", STRATEGY_FILE)
        strategy_content = "（評価基準ファイルなし）"

    # 7. 既存カリキュラム一覧取得
    existing_curricula = _get_existing_curricula()

    # 8. 履歴読み込み
    history = read_jsonl(_resolve_proposals_dir() / "history.jsonl")

    # 9. プロンプト組み立て
    feedback_summary = _build_feedback_summary(feedback_weights)
    deferred_str = ""
    if reproposals:
        deferred_str = "\n".join(
            f"- {r['title']} (スコア: {r['score']:.1f}, 再評価)"
            for r in reproposals
        )

    prompt = build_prompt(
        signals=adjusted_signals,
        strategy=strategy_content,
        existing_curricula=existing_curricula,
        history=history,
        feedback_summary=feedback_summary,
        deferred_proposals=deferred_str,
    )

    if dry_run:
        log.info("[DRY RUN] プロンプト生成完了 (%d文字)", len(prompt))
        log.info("[DRY RUN] 分析対象シグナル: %d件", len(adjusted_signals))
        log.info("=" * 60)
        return 0

    # 10. Claude 分析実行
    log.info("Claude 分析を実行中...")
    raw_output = run_analysis(prompt)
    if raw_output is None:
        log.error("Claude 分析に失敗しました")
        return 0

    # 11. 出力パース
    proposals = parse_output(raw_output)
    if proposals is None:
        log.warning("提案が生成されませんでした")
        return 0

    # 12. 重複チェック & 保存
    saved_count = 0
    for p in proposals:
        dup = check_duplicates(p.get("title", ""))
        if dup["exact"]:
            log.info("重複のためスキップ: %s", p.get("title", ""))
            continue

        if dup["similar"]:
            p["existing_similar"] = dup["similar"][0]["name"]
            p["action"] = "update"

        result = save_proposal(p)
        if result:
            saved_count += 1
        else:
            log.warning("提案保存失敗（上限超過）: %s", p.get("title", ""))
            break

    # 13. 状態更新
    state_dir = _resolve_state_dir()
    state_dir.mkdir(parents=True, exist_ok=True)
    state = {
        "last_analysis": datetime.now(JST).isoformat(),
        "signals_analyzed": len(adjusted_signals),
        "proposals_generated": saved_count,
        "last_signal_fetched_at": max(
            (s.get("fetched_at", "") for s in signals), default=""
        ),
        "feedback_stats": {
            "total_approved": sum(
                1 for h in history if h.get("action") == "approved"
            ),
            "total_rejected": sum(
                1 for h in history if h.get("action") == "rejected"
            ),
            "total_deferred": sum(
                1 for h in history if h.get("action") == "deferred"
            ),
        },
    }
    with open(state_dir / "last_analysis.json", "w", encoding="utf-8") as f:
        json.dump(state, f, ensure_ascii=False, indent=2)

    log.info("")
    log.info("=" * 60)
    log.info("分析完了サマリー")
    log.info("=" * 60)
    log.info("分析シグナル: %d件", len(adjusted_signals))
    log.info("生成提案: %d件", saved_count)
    log.info("=" * 60)

    return saved_count


# ─── エントリポイント ───
def main():
    """CLI エントリポイント。"""
    parser = argparse.ArgumentParser(description="Content Scout Analyst - シグナル分析パイプライン")
    parser.add_argument("--dry-run", action="store_true", help="保存せずに確認のみ")
    parser.add_argument("--data-dir", type=str, help="データディレクトリを指定")
    parser.add_argument("--days", type=int, default=3, help="過去N日分のシグナルを対象 (default: 3)")

    args = parser.parse_args()

    data_dir = Path(args.data_dir) if args.data_dir else None

    try:
        count = run_pipeline(
            data_dir=data_dir,
            days=args.days,
            dry_run=args.dry_run,
        )
        sys.exit(0)
    except Exception as e:
        log.error("パイプライン実行エラー: %s", e, exc_info=True)
        sys.exit(1)


if __name__ == "__main__":
    main()
