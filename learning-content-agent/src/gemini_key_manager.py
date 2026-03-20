#!/usr/bin/env python3
"""
Gemini APIキーマネージャー

複数のAPIキーをローテーションして、制限到達時に自動切り替えを行う。

使用方法:
    from gemini_key_manager import GeminiKeyManager

    manager = GeminiKeyManager()

    # 次に使用するキーを取得
    key = manager.get_next_key()

    # 特定のキーが制限に達した場合
    manager.mark_exhausted(key)

    # 並列タスク用にキーを分散取得
    keys = manager.get_keys_for_parallel(count=10)
"""

import os
import time
import threading
from pathlib import Path
from typing import Optional, List, Dict
from datetime import datetime, timedelta


class ChunkProcessingError(Exception):
    """チャンク処理中のエラー（無音防止のための専用例外）

    このエラーは以下の状況で発生します:
    - APIクォータ超過（429エラー）
    - 空のPCMデータ
    - 無音チャンク検出
    """

    def __init__(
        self,
        message: str,
        chunk_index: int = -1,
        total_chunks: int = -1,
        is_quota_error: bool = False,
        is_silent: bool = False
    ):
        super().__init__(message)
        self.chunk_index = chunk_index
        self.total_chunks = total_chunks
        self.is_quota_error = is_quota_error
        self.is_silent = is_silent


class GeminiKeyManager:
    """Gemini APIキーのローテーション管理"""

    # キーの状態
    KEY_ACTIVE = "active"
    KEY_EXHAUSTED = "exhausted"
    KEY_RATE_LIMITED = "rate_limited"

    def __init__(self, env_file: Optional[str] = None):
        """
        初期化

        Args:
            env_file: 環境変数ファイルのパス（省略時はデフォルト）
        """
        self.env_file = env_file or os.path.expanduser(
            "~/.config/ai-agents/profiles/default.env"
        )
        self.keys: List[str] = []
        self.key_status: Dict[str, dict] = {}
        self.current_index = 0
        self.lock = threading.Lock()

        self._load_keys()

    def _load_keys(self):
        """環境変数ファイルからAPIキーを読み込む"""
        self.keys = []

        # ファイルから読み込み
        if os.path.exists(self.env_file):
            with open(self.env_file, 'r') as f:
                for line in f:
                    line = line.strip()
                    if line.startswith('#') or '=' not in line:
                        continue

                    key, value = line.split('=', 1)

                    # GEMINI_API_KEY または GEMINI_API_KEY_N の形式
                    if key.startswith('GEMINI_API_KEY'):
                        if value and not value.startswith('your-'):
                            self.keys.append(value)
                            self.key_status[value] = {
                                'status': self.KEY_ACTIVE,
                                'exhausted_at': None,
                                'rate_limited_until': None,
                                'usage_count': 0
                            }

        # 環境変数からも読み込み（上書き優先）
        # 新形式: GEMINI_API_KEY_0 〜 GEMINI_API_KEY_9
        # 旧形式: GEMINI_API_KEY, GEMINI_API_KEY_2 〜 GEMINI_API_KEY_10（後方互換性）
        env_key_patterns = (
            # 新形式（優先）: _0 〜 _9
            [f'_0', '_1', '_2', '_3', '_4', '_5', '_6', '_7', '_8', '_9'] +
            # 旧形式（後方互換）: 無印、_2 〜 _10
            ['', '_10']
        )
        for suffix in env_key_patterns:
            env_key = f'GEMINI_API_KEY{suffix}'
            value = os.environ.get(env_key)
            if value and value not in self.keys:
                self.keys.append(value)
                self.key_status[value] = {
                    'status': self.KEY_ACTIVE,
                    'exhausted_at': None,
                    'rate_limited_until': None,
                    'usage_count': 0
                }

        if not self.keys:
            raise ValueError(
                "Gemini APIキーが見つかりません。\n"
                f"{self.env_file} に GEMINI_API_KEY を設定してください。"
            )

        print(f"✅ {len(self.keys)} 個のGemini APIキーを読み込みました")

    def get_next_key(self) -> str:
        """
        次に使用するキーを取得（ラウンドロビン）

        Returns:
            使用可能なAPIキー

        Raises:
            RuntimeError: 全てのキーが使用不可の場合
        """
        with self.lock:
            # 使用可能なキーを探す
            for _ in range(len(self.keys)):
                key = self.keys[self.current_index]
                self.current_index = (self.current_index + 1) % len(self.keys)

                status = self.key_status[key]

                # アクティブなキーを返す
                if status['status'] == self.KEY_ACTIVE:
                    status['usage_count'] += 1
                    return key

                # レート制限中だが時間が経過していれば復活
                if status['status'] == self.KEY_RATE_LIMITED:
                    if datetime.now() > status['rate_limited_until']:
                        status['status'] = self.KEY_ACTIVE
                        status['usage_count'] += 1
                        print(f"🔄 キー {key[:15]}... がレート制限から復帰")
                        return key

            # 全キーが使用不可
            raise RuntimeError(
                "全てのGemini APIキーが制限に達しました。\n"
                "新しいAPIキーを追加するか、時間をおいて再試行してください。"
            )

    def get_keys_for_parallel(self, count: int) -> List[str]:
        """
        並列タスク用にキーを分散取得

        Args:
            count: 必要なキーの数

        Returns:
            キーのリスト（重複あり、可能な限り分散）
        """
        result = []
        active_keys = self.get_active_keys()

        if not active_keys:
            raise RuntimeError("使用可能なAPIキーがありません")

        for i in range(count):
            # ラウンドロビンで分散
            key = active_keys[i % len(active_keys)]
            result.append(key)

        return result

    def get_active_keys(self) -> List[str]:
        """アクティブなキーのリストを取得"""
        active = []
        now = datetime.now()

        for key in self.keys:
            status = self.key_status[key]

            if status['status'] == self.KEY_ACTIVE:
                active.append(key)
            elif status['status'] == self.KEY_RATE_LIMITED:
                if now > status['rate_limited_until']:
                    status['status'] = self.KEY_ACTIVE
                    active.append(key)

        return active

    def mark_exhausted(self, key: str, reason: str = "daily_limit"):
        """
        キーを使用不可としてマーク（1日の上限到達）

        Args:
            key: APIキー
            reason: 理由
        """
        with self.lock:
            if key in self.key_status:
                self.key_status[key]['status'] = self.KEY_EXHAUSTED
                self.key_status[key]['exhausted_at'] = datetime.now()
                print(f"⚠️ キー {key[:15]}... が制限到達（{reason}）")

    def mark_rate_limited(self, key: str, retry_after: int = 60):
        """
        キーを一時的にレート制限中としてマーク

        Args:
            key: APIキー
            retry_after: 再試行までの秒数
        """
        with self.lock:
            if key in self.key_status:
                self.key_status[key]['status'] = self.KEY_RATE_LIMITED
                self.key_status[key]['rate_limited_until'] = (
                    datetime.now() + timedelta(seconds=retry_after)
                )
                print(f"⏳ キー {key[:15]}... が一時制限（{retry_after}秒後に復帰）")

    def get_status_report(self) -> str:
        """キーの状態レポートを取得"""
        lines = ["📊 Gemini APIキー状態:"]

        for i, key in enumerate(self.keys, 1):
            status = self.key_status[key]
            status_icon = {
                self.KEY_ACTIVE: "✅",
                self.KEY_EXHAUSTED: "❌",
                self.KEY_RATE_LIMITED: "⏳"
            }.get(status['status'], "❓")

            lines.append(
                f"  {i}. {key[:15]}... {status_icon} "
                f"(使用回数: {status['usage_count']})"
            )

        return "\n".join(lines)

    def reset_all_keys(self):
        """全キーの状態をリセット（日付変更時など）"""
        with self.lock:
            for key in self.keys:
                self.key_status[key] = {
                    'status': self.KEY_ACTIVE,
                    'exhausted_at': None,
                    'rate_limited_until': None,
                    'usage_count': 0
                }
            print("🔄 全APIキーの状態をリセットしました")


class GeminiTTSWithKeyRotation:
    """キーローテーション対応のGemini TTS

    v2.0: gemini-flash-tts スキル (template.py v2.3) のラッパー
    - オーバーラップ＋クロスフェード: チャンク境界の音質改善
    - tier-aware key management: 無料/有料枠の自動判定
    - 無音検出＋自動リトライ: 問題のあるチャンクを自動再生成
    """

    def __init__(self, key_manager: Optional[GeminiKeyManager] = None):
        """
        初期化

        Args:
            key_manager: キーマネージャー（後方互換性のため受け取るが、使用しない）
        """
        # template.py v2.3 をインポート（全機能を継承）
        try:
            import sys
            skill_path = os.path.expanduser("~/.claude/skills/gemini-flash-tts")
            if skill_path not in sys.path:
                sys.path.insert(0, skill_path)
            from template import GeminiFlashTTS
            self._tts_class = GeminiFlashTTS
            self._tts = None  # 遅延初期化
            print("✅ gemini-flash-tts スキル v2.3 を使用（オーバーラップ＋クロスフェード対応）")
        except ImportError as e:
            raise RuntimeError(
                f"gemini-flash-tts スキルが見つかりません: {e}\n"
                f"スキルパス: {skill_path}"
            )

    def _get_tts(self) -> "GeminiFlashTTS":
        """TTSインスタンスを取得（遅延初期化）"""
        if self._tts is None:
            self._tts = self._tts_class()
        return self._tts

    def synthesize(
        self,
        text: str,
        output_path: str,
        voice: str = "Kore"
    ) -> dict:
        """
        テキストを音声に変換

        template.py v2.3 の機能を使用:
        - オーバーラップ＋クロスフェード（チャンク境界の音質改善）
        - tier-aware key management（無料/有料枠の自動判定）
        - 無音検出＋自動リトライ
        - APIキープール対応

        Args:
            text: 変換するテキスト
            output_path: 出力ファイルパス
            voice: 音声名

        Returns:
            生成結果の辞書
        """
        tts = self._get_tts()

        try:
            result = tts.synthesize(
                text=text,
                output_path=output_path,
                voice=voice
            )

            # 結果を既存のインターフェースに合わせて変換
            return {
                "audio_path": result["audio_path"],
                "duration": result["duration"],
                "chunks": len(result.get("problem_chunks", [])) + 1,  # 概算
                "final_dbfs": -20.0,  # template.pyでは計算しないのでデフォルト値
                "has_problems": result.get("has_problems", False),
                "skipped_chunks": result.get("skipped_chunks", 0)
            }

        except Exception as e:
            error_str = str(e).lower()

            # ChunkProcessingError互換のエラー変換
            if '429' in str(e) or 'quota' in error_str or 'rate' in error_str:
                raise ChunkProcessingError(
                    f"APIクォータ超過: {e}",
                    is_quota_error=True
                )
            elif 'silent' in error_str or '無音' in str(e):
                raise ChunkProcessingError(
                    f"無音検出: {e}",
                    is_silent=True
                )
            else:
                raise


# CLI対応
if __name__ == "__main__":
    manager = GeminiKeyManager()
    print(manager.get_status_report())
