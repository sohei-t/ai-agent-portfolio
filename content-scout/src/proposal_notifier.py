#!/usr/bin/env python3
"""
Content Scout - 提案通知スクリプト (proposal_notifier.py)

未通知の提案YAMLを検出し、Slack Block Kit形式でDM通知を送信する。
urllib.request のみ使用（requests不要）。

使い方:
    python3 proposal_notifier.py                     # 未通知提案を送信
    python3 proposal_notifier.py --dry-run            # 送信せずに確認
    python3 proposal_notifier.py --proposals-dir DIR  # 提案ディレクトリ指定
"""

import json
import logging
import os
import sys
import urllib.error
import urllib.request
from datetime import datetime, timedelta, timezone
from pathlib import Path
from typing import Optional

import yaml

# ─── 定数 ───
JST = timezone(timedelta(hours=9))

SCOUT_DIR = Path(__file__).parent          # project/src/
PROJECT_DIR = SCOUT_DIR.parent             # project/

# データディレクトリ（環境変数で上書き可能）
_scout_home = os.environ.get("SCOUT_HOME", str(Path.home() / ".scout"))
DEFAULT_PROPOSALS_DIR = Path(_scout_home) / "proposals"
LOG_DIR = Path(_scout_home) / "logs"

# ─── ログ設定 ───
LOG_DIR.mkdir(parents=True, exist_ok=True)
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s",
    handlers=[
        logging.StreamHandler(),
        logging.FileHandler(LOG_DIR / "notifier.log", encoding="utf-8"),
    ],
)
log = logging.getLogger("notifier")


# ─── B1: 未通知提案の読み込み ───
def load_pending_proposals(proposals_dir: Path) -> list[dict]:
    """未通知（notified_at が null/None）の提案YAMLを検出してリストで返す。

    Args:
        proposals_dir: 提案YAMLが格納されたディレクトリパス

    Returns:
        未通知の提案データ（proposal辞書）のリスト。
        空ディレクトリや該当なしの場合は空リスト。
    """
    pending = []

    if not proposals_dir.exists():
        log.warning("提案ディレクトリが存在しません: %s", proposals_dir)
        return pending

    for yaml_file in sorted(proposals_dir.glob("*.yaml")):
        try:
            with open(yaml_file, "r", encoding="utf-8") as f:
                data = yaml.safe_load(f)

            if not data or not isinstance(data, dict):
                continue

            proposal = data.get("proposal")
            if not proposal or not isinstance(proposal, dict):
                continue

            if proposal.get("notified_at") is None:
                # ファイルパスを提案データに付与（通知後の更新に使用）
                proposal["_file_path"] = str(yaml_file)
                pending.append(proposal)

        except yaml.YAMLError as e:
            log.warning("YAMLパースエラー（スキップ）: %s → %s", yaml_file.name, e)
            continue
        except Exception as e:
            log.error("提案ファイル読み込みエラー: %s → %s", yaml_file.name, e)
            continue

    log.info("未通知提案: %d件", len(pending))
    return pending


# ─── B2: Block Kit メッセージ構築 ───
def build_blocks(proposal: dict) -> list[dict]:
    """提案データからSlack Block Kit形式のブロックリストを構築する。

    Args:
        proposal: 提案データ辞書（YAML の proposal キー配下）

    Returns:
        Slack Block Kit の blocks リスト
    """
    blocks = [
        {
            "type": "header",
            "text": {"type": "plain_text", "text": "\U0001f4cb 研修テーマ提案"},
        },
        {
            "type": "section",
            "text": {
                "type": "mrkdwn",
                "text": (
                    f"*{proposal['title']}*\n"
                    f"\U0001f465 {proposal['target_audience']} | "
                    f"\U0001f4ca {proposal['difficulty']}"
                ),
            },
        },
        {
            "type": "section",
            "text": {
                "type": "mrkdwn",
                "text": f"\U0001f4a1 *推奨理由:*\n{proposal['reason']}",
            },
        },
    ]

    # 根拠シグナル（最大3件、リンク付き）
    source_signals = proposal.get("source_signals", [])
    signal_texts = []
    for sig in source_signals[:3]:
        signal_texts.append(
            f"\u2022 <{sig['url']}|{sig['title']}> ({sig['source']}, {sig['score']})"
        )

    if signal_texts:
        blocks.append({
            "type": "section",
            "text": {
                "type": "mrkdwn",
                "text": "\U0001f4f0 *根拠シグナル:*\n" + "\n".join(signal_texts),
            },
        })

    # 更新提案ラベル（既存類似カリキュラムがある場合）
    existing_similar = proposal.get("existing_similar")
    if existing_similar:
        blocks.append({
            "type": "context",
            "elements": [
                {
                    "type": "mrkdwn",
                    "text": f"\U0001f504 *更新提案* - 類似カリキュラム: {existing_similar}",
                }
            ],
        })

    # クロスソースブースト情報
    boost = proposal.get("cross_source_boost", 1.0)
    if boost and boost > 1.0:
        blocks.append({
            "type": "context",
            "elements": [
                {
                    "type": "mrkdwn",
                    "text": f"\U0001f525 クロスソース検出: {boost}x ブースト",
                }
            ],
        })

    # ボタン value JSON
    button_value = json.dumps({
        "proposal_path": f"~/.scout/proposals/{proposal['id']}.yaml",
        "curriculum_name": proposal.get("curriculum_name", proposal["title"]),
        "target_audience": proposal["target_audience"],
        "difficulty": proposal["difficulty"],
        "proposal_id": proposal["id"],
        "category": proposal.get("category", ""),
        "keywords": [
            s.get("title", "")[:20]
            for s in proposal.get("source_signals", [])[:3]
        ],
    }, ensure_ascii=False)

    # 承認/却下/保留の3ボタン
    blocks.append({
        "type": "actions",
        "elements": [
            {
                "type": "button",
                "text": {"type": "plain_text", "text": "\u2705 承認"},
                "action_id": "proposal_approve",
                "style": "primary",
                "value": button_value,
            },
            {
                "type": "button",
                "text": {"type": "plain_text", "text": "\u274c 却下"},
                "action_id": "proposal_reject",
                "style": "danger",
                "value": button_value,
            },
            {
                "type": "button",
                "text": {"type": "plain_text", "text": "\u23f8\ufe0f 保留"},
                "action_id": "proposal_defer",
                "value": button_value,
            },
        ],
    })

    return blocks


# ─── Slack API ヘルパー ───
def _slack_api_call(endpoint: str, payload: dict, token: str) -> dict:
    """Slack APIを呼び出す共通関数。

    Args:
        endpoint: Slack API エンドポイント（例: "conversations.open"）
        payload: リクエストボディ
        token: Slack Bot Token

    Returns:
        APIレスポンス辞書

    Raises:
        urllib.error.HTTPError: API エラー
    """
    url = f"https://slack.com/api/{endpoint}"
    data = json.dumps(payload).encode("utf-8")
    req = urllib.request.Request(
        url,
        data=data,
        headers={
            "Authorization": f"Bearer {token}",
            "Content-Type": "application/json",
        },
    )
    with urllib.request.urlopen(req) as resp:
        return json.loads(resp.read().decode("utf-8"))


def _open_dm_channel(token: str, user_id: str) -> Optional[str]:
    """conversations.open でDMチャネルIDを取得する。

    Args:
        token: Slack Bot Token
        user_id: 対象ユーザーID

    Returns:
        DMチャネルID。失敗時はNone。
    """
    try:
        result = _slack_api_call("conversations.open", {"users": user_id}, token)
        if result.get("ok"):
            return result["channel"]["id"]
        else:
            log.error("conversations.open 失敗: %s", result.get("error", "unknown"))
            return None
    except Exception as e:
        log.error("DM チャネルオープン失敗: %s", e)
        return None


def _mark_notified(proposal: dict) -> None:
    """提案YAMLに notified_at を追記する。

    Args:
        proposal: 提案データ（_file_path を含む）
    """
    file_path = proposal.get("_file_path")
    if not file_path:
        return

    path = Path(file_path)
    if not path.exists():
        log.warning("提案ファイルが見つかりません: %s", file_path)
        return

    try:
        with open(path, "r", encoding="utf-8") as f:
            data = yaml.safe_load(f)

        data["proposal"]["notified_at"] = datetime.now(JST).isoformat()

        with open(path, "w", encoding="utf-8") as f:
            yaml.dump(data, f, allow_unicode=True, default_flow_style=False)

        log.info("notified_at 更新: %s", path.name)
    except Exception as e:
        log.error("notified_at 更新失敗: %s → %s", path.name, e)


# ─── B3: 通知送信 ───
def send_notification(blocks: list[dict], token: str, user_id: str) -> bool:
    """Slack DM に Block Kit メッセージを送信する。

    conversations.open でDMチャネルを開き、chat.postMessage で送信。

    Args:
        blocks: Block Kit ブロックリスト
        token: Slack Bot Token
        user_id: 送信先ユーザーID

    Returns:
        送信成功なら True、失敗なら False
    """
    # DM チャネルを開く
    channel_id = _open_dm_channel(token, user_id)
    if not channel_id:
        log.error("DMチャネルの取得に失敗しました")
        return False

    # メッセージ送信
    try:
        payload = {
            "channel": channel_id,
            "blocks": blocks,
            "text": "\U0001f4cb 研修テーマ提案",  # フォールバックテキスト
        }
        result = _slack_api_call("chat.postMessage", payload, token)

        if result.get("ok"):
            log.info("Slack DM 送信成功: channel=%s", channel_id)
            return True
        else:
            log.error("chat.postMessage 失敗: %s", result.get("error", "unknown"))
            return False

    except urllib.error.HTTPError as e:
        if e.code == 429:
            retry_after = e.headers.get("Retry-After", "30")
            log.warning("レート制限 (429): %s秒後にリトライ", retry_after)
        elif e.code == 401:
            log.error("認証エラー (401): SLACK_BOT_TOKEN を確認してください")
        else:
            log.error("Slack API エラー (%d): %s", e.code, e.msg)
        return False

    except Exception as e:
        log.error("Slack送信エラー: %s", e)
        return False


# ─── B4: メインエントリポイント ───
def main() -> int:
    """CLI エントリポイント。

    未通知提案を検出 -> Block Kit 組み立て -> Slack送信。

    Returns:
        終了コード（0=成功, 1=エラー）
    """
    import argparse

    parser = argparse.ArgumentParser(description="Content Scout - 提案通知")
    parser.add_argument(
        "--dry-run",
        action="store_true",
        help="送信せずに確認のみ",
    )
    parser.add_argument(
        "--proposals-dir",
        type=str,
        default=None,
        help="提案YAMLディレクトリ（デフォルト: ~/.scout/proposals/）",
    )
    args = parser.parse_args()

    # 提案ディレクトリの決定
    if args.proposals_dir:
        proposals_dir = Path(args.proposals_dir)
    else:
        proposals_dir = DEFAULT_PROPOSALS_DIR

    # Slack トークンの確認
    token = os.environ.get("SLACK_BOT_TOKEN")
    user_id = os.environ.get("SLACK_ALLOWED_USER")

    if not args.dry_run:
        if not token:
            log.error("SLACK_BOT_TOKEN が設定されていません")
            return 1
        if not user_id:
            log.error("SLACK_ALLOWED_USER が設定されていません")
            return 1

    # 未通知提案を検出
    pending = load_pending_proposals(proposals_dir)

    if not pending:
        log.info("未通知の提案はありません")
        return 0

    # 各提案を通知
    success_count = 0
    fail_count = 0

    for proposal in pending:
        blocks = build_blocks(proposal)

        if args.dry_run:
            log.info("[DRY RUN] 提案: %s", proposal.get("title", "不明"))
            log.info("[DRY RUN] ブロック数: %d", len(blocks))
            success_count += 1
            continue

        sent = send_notification(blocks, token, user_id)

        if sent:
            _mark_notified(proposal)
            success_count += 1
        else:
            fail_count += 1

    log.info("通知完了: 成功=%d, 失敗=%d", success_count, fail_count)
    return 0 if fail_count == 0 else 1


if __name__ == "__main__":
    sys.exit(main())
