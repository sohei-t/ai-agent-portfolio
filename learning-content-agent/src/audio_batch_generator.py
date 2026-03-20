#!/usr/bin/env python3
"""
音声一括生成スクリプト（キーローテーション対応）

Phase 3で使用。content/*.txt（台本ファイル）から音声を一括生成。
- 複数APIキーのローテーション
- 429エラー時の自動リトライ
- 同時並列処理の制限（最大10本）
- エラー時はスキップして継続（全停止しない）

Note:
    SSMLは不要。Gemini 2.5 Flash TTSは自然言語から直接音声生成。

使用方法:
    python3 src/audio_batch_generator.py [content_dir]
"""

import os
import sys
import time
import glob
import json
import asyncio
from pathlib import Path
from datetime import datetime
from concurrent.futures import ThreadPoolExecutor, as_completed
from typing import List, Dict, Optional

# 同じディレクトリからgemini_key_managerをインポート
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from gemini_key_manager import GeminiKeyManager, GeminiTTSWithKeyRotation, ChunkProcessingError


class AudioBatchGenerator:
    """音声一括生成（キーローテーション対応）"""

    def __init__(
        self,
        content_dir: str = "content",
        parallel_limit: int = 10,
        voice: str = "Kore"
    ):
        """
        初期化

        Args:
            content_dir: コンテンツディレクトリ
            parallel_limit: 同時並列処理の上限
            voice: 音声名
        """
        self.content_dir = Path(content_dir)
        self.parallel_limit = parallel_limit
        self.voice = voice

        # キーマネージャーとTTS初期化
        try:
            self.key_manager = GeminiKeyManager()
            self.tts = GeminiTTSWithKeyRotation(self.key_manager)
        except Exception as e:
            print(f"❌ 初期化エラー: {e}")
            raise

        # 結果記録
        self.results: Dict[str, dict] = {}
        self.failed: List[str] = []
        self.skipped: List[str] = []

    def find_script_files(self) -> List[Path]:
        """台本ファイルを検索（*.txt、ただしMP3が存在しないもののみ）"""
        pattern = str(self.content_dir / "*.txt")
        files = sorted(glob.glob(pattern))
        return [Path(f) for f in files]

    def get_output_path(self, script_file: Path) -> Path:
        """出力MP3ファイルのパスを取得"""
        # xxx.txt → xxx.mp3
        base_name = script_file.stem
        return self.content_dir / f"{base_name}.mp3"

    def generate_single(self, script_file: Path) -> dict:
        """
        単一ファイルの音声生成

        Returns:
            {
                "status": "success" | "failed" | "skipped",
                "file": str,
                "output": str,
                "duration": float,
                "error": str (失敗時)
            }
        """
        output_path = self.get_output_path(script_file)
        topic_id = script_file.stem

        # 既に生成済みの場合はスキップ
        if output_path.exists():
            print(f"⏭️ スキップ（既存）: {topic_id}")
            return {
                "status": "skipped",
                "file": str(script_file),
                "output": str(output_path),
                "reason": "already_exists"
            }

        try:
            # テキスト読み込み
            with open(script_file, "r", encoding="utf-8") as f:
                text = f.read()

            if not text.strip():
                print(f"⚠️ 空ファイル: {topic_id}")
                return {
                    "status": "skipped",
                    "file": str(script_file),
                    "reason": "empty_file"
                }

            print(f"🔊 生成開始: {topic_id} ({len(text)}文字)")

            # TTS実行（キーローテーション対応）
            result = self.tts.synthesize(
                text=text,
                output_path=str(output_path),
                voice=self.voice
            )

            print(f"✅ 生成完了: {topic_id} ({result['duration']:.1f}秒)")

            return {
                "status": "success",
                "file": str(script_file),
                "output": str(output_path),
                "duration": result["duration"],
                "chunks": result.get("chunks", 1)
            }

        except ChunkProcessingError as e:
            # 無音防止: チャンク処理中のエラー（429、空データ、無音チャンク等）
            if e.is_quota_error:
                print(f"⚠️ チャンク処理中にクォータ超過: {topic_id}")
                print(f"   チャンク {e.chunk_index + 1}/{e.total_chunks} で中断")
                print(f"   ⚠️ 無音MP3を防ぐため、空データでの続行を中止しました")
                return {
                    "status": "failed",
                    "file": str(script_file),
                    "error": "chunk_quota_exceeded",
                    "chunk_index": e.chunk_index,
                    "total_chunks": e.total_chunks,
                    "message": str(e)
                }
            elif e.is_silent:
                print(f"⚠️ 無音チャンク検出: {topic_id}")
                print(f"   チャンク {e.chunk_index + 1}/{e.total_chunks} が無音")
                return {
                    "status": "failed",
                    "file": str(script_file),
                    "error": "silent_chunk_detected",
                    "chunk_index": e.chunk_index,
                    "total_chunks": e.total_chunks,
                    "message": str(e)
                }
            else:
                print(f"❌ チャンク処理エラー: {topic_id} - {e}")
                return {
                    "status": "failed",
                    "file": str(script_file),
                    "error": "chunk_processing_error",
                    "chunk_index": e.chunk_index,
                    "total_chunks": e.total_chunks,
                    "message": str(e)
                }

        except RuntimeError as e:
            error_str = str(e)
            if "全てのGemini APIキーが制限に達しました" in error_str:
                print(f"❌ 全キー制限到達: {topic_id}")
                return {
                    "status": "failed",
                    "file": str(script_file),
                    "error": "all_keys_exhausted",
                    "message": error_str
                }
            elif "音量が低すぎます" in error_str:
                print(f"⚠️ 生成音声が無音: {topic_id}")
                return {
                    "status": "failed",
                    "file": str(script_file),
                    "error": "silent_audio_detected",
                    "message": error_str
                }
            else:
                print(f"❌ 生成失敗: {topic_id} - {e}")
                return {
                    "status": "failed",
                    "file": str(script_file),
                    "error": str(e)
                }

        except Exception as e:
            print(f"❌ 予期しないエラー: {topic_id} - {e}")
            return {
                "status": "failed",
                "file": str(script_file),
                "error": str(e)
            }

    def generate_all_sequential(self) -> dict:
        """
        全ファイルを順次生成（レート制限対応）

        Returns:
            生成結果のサマリー
        """
        script_files = self.find_script_files()

        if not script_files:
            print("⚠️ 台本ファイルが見つかりません")
            return {"status": "no_files", "total": 0}

        print(f"\n{'='*60}")
        print(f"🎙️ 音声一括生成開始")
        print(f"{'='*60}")
        print(f"📁 対象ファイル: {len(script_files)}件")
        print(f"🎤 音声: {self.voice}")
        print(self.key_manager.get_status_report())
        print(f"{'='*60}\n")

        success_count = 0
        failed_count = 0
        skipped_count = 0
        total_duration = 0.0

        for i, script_file in enumerate(script_files, 1):
            print(f"\n[{i}/{len(script_files)}] ", end="")

            result = self.generate_single(script_file)
            self.results[str(script_file)] = result

            if result["status"] == "success":
                success_count += 1
                total_duration += result.get("duration", 0)
            elif result["status"] == "failed":
                failed_count += 1
                self.failed.append(str(script_file))

                # 全キー制限到達の場合は警告
                if result.get("error") == "all_keys_exhausted":
                    print("⚠️ 全APIキーが制限に達しました。残りはスキップします。")
                    # 残りはスキップとしてマーク
                    for remaining in script_files[i:]:
                        self.skipped.append(str(remaining))
                        skipped_count += 1
                    break
            else:
                skipped_count += 1
                self.skipped.append(str(script_file))

            # レート制限対策: 生成間に少し待機
            if result["status"] == "success":
                time.sleep(0.5)  # 0.5秒待機

        # 結果サマリー
        summary = {
            "status": "completed",
            "total": len(script_files),
            "success": success_count,
            "failed": failed_count,
            "skipped": skipped_count,
            "total_duration": total_duration,
            "failed_files": self.failed,
            "skipped_files": self.skipped
        }

        self._print_summary(summary)
        self._save_report(summary)

        return summary

    def generate_all_parallel(self) -> dict:
        """
        全ファイルを並列生成（最大parallel_limit本）

        Returns:
            生成結果のサマリー
        """
        script_files = self.find_script_files()

        if not script_files:
            print("⚠️ 台本ファイルが見つかりません")
            return {"status": "no_files", "total": 0}

        print(f"\n{'='*60}")
        print(f"🎙️ 音声一括生成開始（並列モード）")
        print(f"{'='*60}")
        print(f"📁 対象ファイル: {len(script_files)}件")
        print(f"🔄 並列数: {self.parallel_limit}")
        print(f"🎤 音声: {self.voice}")
        print(self.key_manager.get_status_report())
        print(f"{'='*60}\n")

        success_count = 0
        failed_count = 0
        skipped_count = 0
        total_duration = 0.0

        # ThreadPoolExecutorで並列実行
        with ThreadPoolExecutor(max_workers=self.parallel_limit) as executor:
            # タスクを投入
            future_to_file = {
                executor.submit(self.generate_single, f): f
                for f in script_files
            }

            # 完了を待機
            for future in as_completed(future_to_file):
                script_file = future_to_file[future]
                try:
                    result = future.result()
                    self.results[str(script_file)] = result

                    if result["status"] == "success":
                        success_count += 1
                        total_duration += result.get("duration", 0)
                    elif result["status"] == "failed":
                        failed_count += 1
                        self.failed.append(str(script_file))
                    else:
                        skipped_count += 1
                        self.skipped.append(str(script_file))

                except Exception as e:
                    print(f"❌ 並列実行エラー: {script_file} - {e}")
                    failed_count += 1
                    self.failed.append(str(script_file))

        # 結果サマリー
        summary = {
            "status": "completed",
            "total": len(script_files),
            "success": success_count,
            "failed": failed_count,
            "skipped": skipped_count,
            "total_duration": total_duration,
            "failed_files": self.failed,
            "skipped_files": self.skipped
        }

        self._print_summary(summary)
        self._save_report(summary)

        return summary

    def _print_summary(self, summary: dict):
        """結果サマリーを出力"""
        print(f"\n{'='*60}")
        print(f"📊 生成結果サマリー")
        print(f"{'='*60}")
        print(f"✅ 成功: {summary['success']}件")
        print(f"❌ 失敗: {summary['failed']}件")
        print(f"⏭️ スキップ: {summary['skipped']}件")
        print(f"⏱️ 総音声時間: {summary['total_duration']/60:.1f}分")
        print(f"{'='*60}")

        if summary['failed'] > 0:
            print(f"\n❌ 失敗ファイル:")
            for f in summary['failed_files'][:10]:  # 最大10件表示
                print(f"   - {Path(f).name}")
            if len(summary['failed_files']) > 10:
                print(f"   ... 他{len(summary['failed_files'])-10}件")

        print(f"\n{self.key_manager.get_status_report()}")

    def _save_report(self, summary: dict):
        """結果レポートをJSONで保存"""
        report_path = self.content_dir.parent / "reports" / "audio_generation_report.json"
        report_path.parent.mkdir(exist_ok=True)

        report = {
            "generated_at": datetime.now().isoformat(),
            "summary": summary,
            "details": self.results
        }

        with open(report_path, "w", encoding="utf-8") as f:
            json.dump(report, f, ensure_ascii=False, indent=2)

        print(f"\n📝 レポート保存: {report_path}")


def main():
    """メイン関数"""
    # 引数解析
    content_dir = sys.argv[1] if len(sys.argv) > 1 else "content"
    mode = sys.argv[2] if len(sys.argv) > 2 else "sequential"

    print(f"📁 コンテンツディレクトリ: {content_dir}")
    print(f"🔄 実行モード: {mode}")

    # 生成実行
    generator = AudioBatchGenerator(
        content_dir=content_dir,
        parallel_limit=10,
        voice="Kore"
    )

    if mode == "parallel":
        summary = generator.generate_all_parallel()
    else:
        summary = generator.generate_all_sequential()

    # 終了コード
    if summary["failed"] > 0 and summary["success"] == 0:
        print("\n❌ 全ファイルの生成に失敗しました")
        sys.exit(1)
    elif summary["failed"] > 0:
        print(f"\n⚠️ 一部ファイルの生成に失敗しました（{summary['failed']}件）")
        sys.exit(0)  # 部分的成功は成功扱い
    else:
        print("\n🎉 全ファイルの生成が完了しました！")
        sys.exit(0)


if __name__ == "__main__":
    main()
