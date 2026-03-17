#!/usr/bin/env python3
"""
Content Scout - 提案アクションハンドラー (proposal_handlers.py)

bot.py から import して使用する独立モジュール。
Slack ボタン押下時の承認/却下/保留処理を提供する。

使い方（bot.py 側）:
    from proposal_handlers import register_handlers
    register_handlers(app)
"""

import json
import logging
import os
import subprocess
from datetime import datetime, timedelta, timezone
from pathlib import Path
from typing import Any

# ─── 定数 ───
JST = timezone(timedelta(hours=9))

# データディレクトリ（環境変数で上書き可能）
_scout_home = os.environ.get("SCOUT_HOME", str(Path.home() / ".scout"))
PROPOSALS_DIR = Path(os.environ.get("SCOUT_DATA_DIR", _scout_home)) / "proposals" \
    if os.environ.get("SCOUT_DATA_DIR") else Path(_scout_home) / "proposals"

# ログ設定
log = logging.getLogger("proposal_handlers")


# ─── ユーティリティ ───
def _get_proposals_dir() -> Path:
    """提案ディレクトリのパスを返す。環境変数で上書き可能。"""
    scout_home = os.environ.get("SCOUT_HOME", str(Path.home() / ".scout"))
    return Path(scout_home) / "proposals"


def _parse_button_value(body: dict) -> dict:
    """ボタンの value から JSON データを抽出する。

    Args:
        body: Slack のイベントボディ

    Returns:
        パースされた value 辞書

    Raises:
        ValueError: パース失敗時
    """
    try:
        value_str = body["actions"][0]["value"]
        return json.loads(value_str)
    except (KeyError, IndexError, json.JSONDecodeError) as e:
        raise ValueError(f"ボタン value のパースに失敗: {e}") from e


def _append_jsonl(path: Path, entry: dict) -> None:
    """JSONL ファイルにエントリを追記する。

    Args:
        path: JSONL ファイルパス
        entry: 追記するデータ辞書
    """
    path.parent.mkdir(parents=True, exist_ok=True)
    try:
        with open(path, "a", encoding="utf-8") as f:
            f.write(json.dumps(entry, ensure_ascii=False) + "\n")
    except IOError as e:
        log.warning("JSONL 書き込み失敗: %s → %s", path, e)


def _record_history(value: dict, action: str, curriculum_path: str = None) -> None:
    """history.jsonl に操作記録を追記する。

    Args:
        value: ボタン value からパースしたデータ
        action: "approved" | "rejected" | "deferred"
        curriculum_path: 承認時のカリキュラムパス（オプション）
    """
    proposals_dir = _get_proposals_dir()
    entry = {
        "proposal_id": value.get("proposal_id", ""),
        "title": value.get("curriculum_name", ""),
        "action": action,
        "acted_at": datetime.now(JST).isoformat(),
        "curriculum_path": curriculum_path,
        "category": value.get("category", ""),
        "keywords": value.get("keywords", []),
    }
    _append_jsonl(proposals_dir / "history.jsonl", entry)


def _record_feedback(value: dict, action: str) -> None:
    """feedback.jsonl にフィードバック記録を追記する。

    承認/却下のみ記録（保留は記録しない）。

    Args:
        value: ボタン value からパースしたデータ
        action: "approved" | "rejected"
    """
    proposals_dir = _get_proposals_dir()
    entry = {
        "action": action,
        "category": value.get("category", ""),
        "keywords": value.get("keywords", []),
        "proposal_id": value.get("proposal_id", ""),
        "timestamp": datetime.now(JST).isoformat(),
    }
    _append_jsonl(proposals_dir / "feedback.jsonl", entry)


def _update_message(client: Any, body: dict, text: str) -> None:
    """Slack メッセージを更新する。

    Args:
        client: Slack WebClient
        body: Slack イベントボディ
        text: 更新後のテキスト
    """
    try:
        channel = body["channel"]["id"] if isinstance(body.get("channel"), dict) else body.get("channel", {}).get("id", "")
        if not channel:
            channel = body.get("container", {}).get("channel_id", "")
        ts = body.get("message", {}).get("ts", "")
        if not ts:
            ts = body.get("container", {}).get("message_ts", "")

        if channel and ts:
            client.chat_update(
                channel=channel,
                ts=ts,
                text=text,
                blocks=[],  # ボタンを除去
            )
        else:
            log.warning("メッセージ更新に必要な channel/ts が取得できません")
    except Exception as e:
        log.error("Slack メッセージ更新失敗: %s", e)


# ─── C1: 承認ハンドラー ───
def handle_proposal_approve(ack: Any, body: dict, client: Any) -> None:
    """提案の承認ハンドラー。

    1. ボタン value からデータ抽出
    2. create_new_curriculum_auto.sh を subprocess 起動
    3. 結果に応じて Slack メッセージを更新
    4. history.jsonl / feedback.jsonl に記録

    Args:
        ack: Slack の ack 関数
        body: Slack イベントボディ
        client: Slack WebClient
    """
    ack()

    try:
        value = _parse_button_value(body)
    except ValueError as e:
        log.error("承認処理エラー: %s", e)
        _update_message(client, body, "\u26a0\ufe0f 処理エラー: ボタンデータの解析に失敗しました")
        return

    curriculum_name = value.get("curriculum_name", "")
    target_audience = value.get("target_audience", "")
    difficulty = value.get("difficulty", "")

    # create_new_curriculum_auto.sh の実行
    auto_sh_path = Path(__file__).parent / "create_new_curriculum_auto.sh"

    try:
        result = subprocess.run(
            [
                "bash",
                str(auto_sh_path),
                "--name", curriculum_name,
                "--audience", target_audience,
                "--difficulty", difficulty,
            ],
            capture_output=True,
            text=True,
            timeout=60,
        )

        if result.returncode == 0:
            curriculum_path = f"~/Desktop/Learning-Curricula/{curriculum_name}"
            _update_message(
                client, body,
                f"\u2705 承認済み・環境作成完了: {curriculum_name}"
            )
            _record_history(value, "approved", curriculum_path=curriculum_path)
            _record_feedback(value, "approved")
            log.info("承認完了: %s", curriculum_name)

        elif result.returncode == 2:
            _update_message(
                client, body,
                f"\u2705 承認済み・既に存在します: {curriculum_name}"
            )
            _record_history(value, "approved")
            _record_feedback(value, "approved")
            log.warning("既存ディレクトリ: %s", curriculum_name)

        elif result.returncode == 3:
            _update_message(
                client, body,
                f"\u26a0\ufe0f 承認済み・テンプレート未検出（手動作成が必要）: {curriculum_name}"
            )
            _record_history(value, "approved")
            _record_feedback(value, "approved")
            log.error("テンプレート未検出: %s", curriculum_name)

        else:
            _update_message(
                client, body,
                f"\u26a0\ufe0f 承認済み・環境作成失敗: {curriculum_name}\n"
                f"エラー: {result.stderr.strip()}"
            )
            _record_history(value, "approved")
            _record_feedback(value, "approved")
            log.error(
                "auto_sh 失敗 (exit %d): %s",
                result.returncode,
                result.stderr.strip(),
            )

    except subprocess.TimeoutExpired:
        _update_message(
            client, body,
            f"\u26a0\ufe0f 承認済み・環境作成タイムアウト: {curriculum_name}"
        )
        _record_history(value, "approved")
        _record_feedback(value, "approved")
        log.error("auto_sh タイムアウト: %s", curriculum_name)

    except FileNotFoundError:
        _update_message(
            client, body,
            f"\u26a0\ufe0f 承認済み・auto_sh が見つかりません: {curriculum_name}"
        )
        _record_history(value, "approved")
        _record_feedback(value, "approved")
        log.error("create_new_curriculum_auto.sh が見つかりません")


# ─── C2: 却下ハンドラー ───
def handle_proposal_reject(ack: Any, body: dict, client: Any) -> None:
    """提案の却下ハンドラー。

    1. Slack メッセージを「却下済み」に更新
    2. history.jsonl に却下記録追記
    3. feedback.jsonl に却下フィードバック記録（カテゴリ/キーワード付き）

    Args:
        ack: Slack の ack 関数
        body: Slack イベントボディ
        client: Slack WebClient
    """
    ack()

    try:
        value = _parse_button_value(body)
    except ValueError as e:
        log.error("却下処理エラー: %s", e)
        _update_message(client, body, "\u26a0\ufe0f 処理エラー: ボタンデータの解析に失敗しました")
        return

    curriculum_name = value.get("curriculum_name", "")

    # Slack メッセージ更新
    _update_message(client, body, f"\u274c 却下済み: {curriculum_name}")

    # 履歴・フィードバック記録
    _record_history(value, "rejected")
    _record_feedback(value, "rejected")

    log.info("却下完了: %s", curriculum_name)


# ─── C3: 保留ハンドラー ───
def handle_proposal_defer(ack: Any, body: dict, client: Any) -> None:
    """提案の保留ハンドラー。

    1. Slack メッセージを「保留中」に更新
    2. history.jsonl に保留記録追記
    3. defer_queue.json に追加（7日後再評価）

    Args:
        ack: Slack の ack 関数
        body: Slack イベントボディ
        client: Slack WebClient
    """
    ack()

    try:
        value = _parse_button_value(body)
    except ValueError as e:
        log.error("保留処理エラー: %s", e)
        _update_message(client, body, "\u26a0\ufe0f 処理エラー: ボタンデータの解析に失敗しました")
        return

    curriculum_name = value.get("curriculum_name", "")
    now = datetime.now(JST)

    # Slack メッセージ更新
    _update_message(client, body, f"\u23f8\ufe0f 保留中: {curriculum_name}")

    # 履歴記録
    _record_history(value, "deferred")

    # defer_queue.json に追加
    _add_to_defer_queue(value, now)

    log.info("保留完了: %s（再評価: %s）", curriculum_name, (now + timedelta(days=7)).strftime("%Y-%m-%d"))


def _add_to_defer_queue(value: dict, now: datetime) -> None:
    """defer_queue.json に保留提案を追加する。

    Args:
        value: ボタン value からパースしたデータ
        now: 現在時刻
    """
    proposals_dir = _get_proposals_dir()
    queue_path = proposals_dir / "defer_queue.json"

    # 既存キューの読み込み
    queue = {"deferred_proposals": []}
    if queue_path.exists():
        try:
            with open(queue_path, "r", encoding="utf-8") as f:
                queue = json.load(f)
        except (json.JSONDecodeError, IOError) as e:
            log.warning("defer_queue.json 読み込みエラー: %s", e)

    # 保留エントリを追加
    defer_entry = {
        "proposal_id": value.get("proposal_id", ""),
        "title": value.get("curriculum_name", ""),
        "original_score": 0.0,  # スコアはボタン value に含まれないため 0.0
        "deferred_at": now.isoformat(),
        "reevaluate_at": (now + timedelta(days=7)).isoformat(),
        "reevaluation_count": 0,
        "related_keywords": value.get("keywords", []),
        "original_source_signals": [],
    }
    queue["deferred_proposals"].append(defer_entry)

    # 保存
    try:
        with open(queue_path, "w", encoding="utf-8") as f:
            json.dump(queue, f, ensure_ascii=False, indent=2)
    except IOError as e:
        log.error("defer_queue.json 書き込みエラー: %s", e)


# ─── ハンドラー登録 ───
def register_handlers(app: Any) -> None:
    """slack_bolt の app にハンドラーを登録する。

    bot.py から以下のように呼び出す:
        from proposal_handlers import register_handlers
        register_handlers(app)

    Args:
        app: slack_bolt.App インスタンス
    """
    app.action("proposal_approve")(handle_proposal_approve)
    app.action("proposal_reject")(handle_proposal_reject)
    app.action("proposal_defer")(handle_proposal_defer)

    log.info("提案アクションハンドラーを登録しました")
