#!/usr/bin/env python3
"""
学習コンテンツ自動生成オーケストレーター

このスクリプトはカリキュラム作成ワークフローのエントリーポイントです。
各フェーズの実行を管理し、進捗を追跡します。
"""

import os
import sys
import yaml
import json
import subprocess
from datetime import datetime
from pathlib import Path


class ContentOrchestrator:
    """学習コンテンツ生成のオーケストレーター"""

    def __init__(self, working_dir: str = "."):
        self.working_dir = Path(working_dir).resolve()
        self.config = self._load_config()
        self.content_info = None
        self.reference_map = None

    def _load_config(self) -> dict:
        """agent_config.yamlを読み込む"""
        config_path = self.working_dir / "agent_config.yaml"
        if config_path.exists():
            with open(config_path, "r", encoding="utf-8") as f:
                return yaml.safe_load(f)
        return {}

    def _save_content_info(self, info: dict):
        """CONTENT_INFO.yamlを保存"""
        info_path = self.working_dir / "CONTENT_INFO.yaml"
        with open(info_path, "w", encoding="utf-8") as f:
            yaml.dump(info, f, allow_unicode=True, default_flow_style=False)
        self.content_info = info

    def _load_content_info(self) -> dict:
        """CONTENT_INFO.yamlを読み込む"""
        info_path = self.working_dir / "CONTENT_INFO.yaml"
        if info_path.exists():
            with open(info_path, "r", encoding="utf-8") as f:
                return yaml.safe_load(f)
        return None

    def _update_status(self, status: str):
        """ステータスを更新"""
        if self.content_info:
            self.content_info["status"] = status
            self._save_content_info(self.content_info)

    def _print_checkpoint(self, phase: str, tasks: list, context: dict = None):
        """チェックポイントを出力"""
        print("\n" + "=" * 50)
        print(f"📌 チェックポイント: {phase}")
        print("=" * 50)
        print("実行すべきタスク:")
        for task in tasks:
            print(f"  ✅ {task}")
        if context:
            print("\n現在のコンテキスト:")
            for key, value in context.items():
                print(f"  {key}: {value}")
        print("=" * 50 + "\n")

    def phase_0_initialize(self, curriculum_theme: str, target_audience: str = "エンジニア"):
        """Phase 0: 初期化"""
        self._print_checkpoint(
            "Phase 0 - 初期化",
            [
                "CONTENT_INFO.yaml生成",
                "ディレクトリ構造作成",
                "Worktree作成"
            ]
        )

        # CONTENT_INFO.yaml生成
        content_info = {
            "curriculum": {
                "title": curriculum_theme,
                "description": f"{curriculum_theme}に関する体系的な学習コンテンツ",
                "target_audience": target_audience,
                "difficulty_level": "入門〜中級",
                "estimated_duration": "未定"
            },
            "creation_date": datetime.now().strftime("%Y-%m-%d"),
            "status": "phase0_initialized",
        }
        self._save_content_info(content_info)
        print(f"✅ CONTENT_INFO.yaml を生成しました")

        # ディレクトリ構造作成
        directories = ["content", "research", "reports"]
        for dir_name in directories:
            dir_path = self.working_dir / dir_name
            dir_path.mkdir(exist_ok=True)
            print(f"✅ {dir_name}/ ディレクトリを作成しました")

        # Worktree作成
        self._create_worktrees()

        print("\n🎉 Phase 0 完了: 初期化が完了しました")
        return content_info

    def _create_worktrees(self):
        """Worktreeを作成"""
        worktrees = self.config.get("basic_settings", {}).get("worktrees", [])

        for wt in worktrees:
            wt_path = self.working_dir / "worktrees" / wt["name"]
            if not wt_path.exists():
                try:
                    # ブランチ作成
                    subprocess.run(
                        ["git", "branch", wt["branch"]],
                        cwd=self.working_dir,
                        capture_output=True
                    )
                    # Worktree作成
                    subprocess.run(
                        ["git", "worktree", "add", str(wt_path), wt["branch"]],
                        cwd=self.working_dir,
                        capture_output=True
                    )
                    print(f"✅ Worktree作成: {wt['name']} ({wt['purpose']})")
                except Exception as e:
                    print(f"⚠️ Worktree作成スキップ: {wt['name']} - {e}")

    def phase_1_design_and_research(self):
        """Phase 1: 全体設計・リサーチ"""
        self._print_checkpoint(
            "Phase 1 - 全体設計・リサーチ",
            [
                "カリキュラム設計案作成（2案並列）",
                "設計案評価・選択",
                "全トピックディープリサーチ",
                "前後参照マップ作成",
                "WBS作成"
            ],
            {"📚 カリキュラム": self.content_info["curriculum"]["title"]}
        )

        self._update_status("phase1_in_progress")
        print("\n📋 Phase 1 の実行指示:")
        print("  1. Taskツールで2つの設計案を並列作成")
        print("  2. 評価スクリプトで最適案を選択")
        print("  3. 全トピックをリサーチ（並列可能）")
        print("  4. REFERENCE_MAP.yaml を作成")
        print("  5. WBS.json を作成")
        print("\n詳細は CLAUDE.md の Phase 1 セクションを参照してください")

    def phase_2_content_creation(self):
        """Phase 2: コンテンツ作成"""
        self._print_checkpoint(
            "Phase 2 - コンテンツ作成",
            [
                "各トピックのスライドHTML作成（frontend-designスキル使用）",
                "各トピックの台本作成"
                # SSMLは不要（Gemini 2.5 Flash TTSは自然言語から直接音声生成）
            ],
            {
                "📚 カリキュラム": self.content_info["curriculum"]["title"],
                "⚠️ 重要": "前後参照マップに従って順次処理"
            }
        )

        self._update_status("phase2_in_progress")
        print("\n📋 Phase 2 の実行指示:")
        print("  - 章単位でループ処理")
        print("  - 各トピック: HTML → 台本 の順で作成")
        print("  - 前後参照マップの内容を反映")
        print("\n詳細は CLAUDE.md の Phase 2 セクションを参照してください")

    def _run_rag_preparation(self):
        """RAGチャットボット用データ準備（チャンキング + Embedding）"""
        print("\n--- RAG準備（チャンキング + Embedding）---")

        try:
            from rag_chunker import chunk_course, generate_test_questions

            # チャンク生成
            print("\n[1/4] RAGチャンク生成中...")
            result = chunk_course(self.working_dir)

            # rag_chunks.json 出力
            chunks_path = self.working_dir / "rag_chunks.json"
            with open(chunks_path, "w", encoding="utf-8") as f:
                json.dump(result, f, ensure_ascii=False, indent=2)
            print(f"✅ {chunks_path.name} 出力完了 ({result['chunk_count']}チャンク)")

            # テスト質問生成
            print("\n[2/4] テスト質問生成中...")
            questions = generate_test_questions(result["chunks"])

            test_output = {
                "course_title": result["course_title"],
                "questions": questions,
            }
            test_path = self.working_dir / "rag_test_questions.json"
            with open(test_path, "w", encoding="utf-8") as f:
                json.dump(test_output, f, ensure_ascii=False, indent=2)
            print(f"✅ {test_path.name} 出力完了 ({len(questions)}質問)")

            # チャンク統計
            sizes = [len(c["text"]) for c in result["chunks"]]
            if sizes:
                print(f"\nチャンク統計: 合計={len(sizes)}, "
                      f"最小={min(sizes)}, 最大={max(sizes)}, 平均={sum(sizes)//len(sizes)}文字")

            # Embedding生成
            print("\n[3/4] Embedding生成中...")
            try:
                from rag_index_builder import load_api_keys, generate_embeddings, EMBEDDING_MODEL
                import time
                from datetime import datetime as dt

                api_keys = load_api_keys()
                if not api_keys:
                    print("⚠️ Gemini APIキーが未設定のため、Embedding生成をスキップ")
                    print("   rag_chunks.json は出力済みです（トラッカーでEmbedding生成可能）")
                    return

                chunks = result["chunks"]
                print(f"  APIキー {len(api_keys)}個でローテーション")
                start_time = time.time()
                embeddings = generate_embeddings(chunks, api_keys)
                elapsed = time.time() - start_time
                print(f"  完了: {len(embeddings)}件 ({elapsed:.1f}秒)")

                # rag_index.json 出力
                print("\n[4/4] rag_index.json 出力中...")
                index_data = {
                    "course_title": result.get("course_title", ""),
                    "generated_at": dt.now().isoformat(),
                    "embedding_model": EMBEDDING_MODEL,
                    "generation_model": "gemini-2.5-flash",
                    "chunk_count": len(chunks),
                    "embedding_dimension": len(embeddings[0]) if embeddings else 0,
                    "chunks": []
                }

                for chunk, embedding in zip(chunks, embeddings):
                    index_data["chunks"].append({
                        "id": chunk["id"],
                        "text": chunk["text"],
                        "embedding": embedding,
                        "metadata": chunk["metadata"]
                    })

                index_path = self.working_dir / "rag_index.json"
                with open(index_path, "w", encoding="utf-8") as f:
                    json.dump(index_data, f, ensure_ascii=False)

                file_size_mb = index_path.stat().st_size / (1024 * 1024)
                print(f"✅ {index_path.name} 出力完了 ({len(chunks)}チャンク × {index_data['embedding_dimension']}次元, {file_size_mb:.1f}MB)")

            except ImportError:
                print("⚠️ rag_index_builder が見つからないため、Embedding生成をスキップ")
                print("   rag_chunks.json は出力済みです")
            except Exception as e:
                print(f"⚠️ Embedding生成でエラー: {e}")
                print("   rag_chunks.json は出力済みです（トラッカーでEmbedding生成可能）")

            print("\n✅ RAG準備完了")

            # .publish_ready マーカーを作成（Content Watcher が検知してPVPにドラフト公開）
            publish_ready_path = self.working_dir / ".publish_ready"
            with open(publish_ready_path, "w", encoding="utf-8") as f:
                from datetime import datetime as _dt
                f.write(f"completed_at: {_dt.now().isoformat()}\n")
            print("✅ .publish_ready 作成完了（自動アップロード対象）")

        except Exception as e:
            print(f"\n⚠️ RAG準備でエラー発生: {e}")
            print("RAG準備をスキップします（コンテンツ自体は問題なし）")

    def phase_3_audio_generation(self):
        """Phase 3: 音声生成"""
        self._print_checkpoint(
            "Phase 3 - 音声生成（キーローテーション対応・無音防止強化）",
            [
                "音声一括生成スクリプト実行",
                "生成レポート確認",
                "失敗ファイルの再実行（必要に応じて）",
                "音量チェック（無音検出）"
            ],
            {
                "📚 カリキュラム": self.content_info["curriculum"]["title"],
                "🔧 使用スクリプト": "src/audio_batch_generator.py",
                "⚠️ 重要": "gemini-flash-ttsスキルを直接使用しない！"
            }
        )

        self._update_status("phase3_in_progress")
        print("\n📋 Phase 3 の実行コマンド:")
        print("  python3 src/audio_batch_generator.py content")
        print("\n🔄 このスクリプトの特徴:")
        print("  - 複数APIキーを自動ローテーション")
        print("  - 429エラー時に別キーで自動リトライ")
        print("  - 全キー制限時はスキップして継続（全停止しない）")
        print("  - 最大10並列で処理")
        print("  - 🔊 無音防止: チャンクごとに音量検証（-50dBFS未満は拒否）")
        print("  - 🔊 無音防止: チャンク処理中の429は即座に中断（空データ結合を防止）")
        print("\n📊 キー状態確認:")
        print("  python3 src/gemini_key_manager.py")
        print("\n📝 生成結果確認:")
        print("  cat reports/audio_generation_report.json")
        print("\n🔊 Phase 3完了後の必須確認（無音検出）:")
        print("  bash src/check_audio_volume.sh content")

    def phase_4_quality_check(self):
        """Phase 4: 品質検証"""
        self._print_checkpoint(
            "Phase 4 - 品質検証",
            [
                "CSS競合チェック",
                "音声品質チェック（無音検出）",
                "Playwright E2Eテスト",
                "前後参照整合性チェック",
                "用語一貫性チェック"
            ]
        )

        self._update_status("phase4_in_progress")
        print("\n📋 Phase 4 の実行指示:")
        print("  Step 1: CSS競合チェック（最初に実行）")
        print("    bash src/check_slide_css.sh")
        print("")
        print("  Step 2: 音声品質チェック（無音検出）")
        print("    bash src/check_audio_volume.sh content")
        print("    ⚠️ 20dB以上の差がある場合は該当MP3を削除して再生成")
        print("")
        print("  Step 3: Playwright E2Eテスト")
        print("    - CONTENT_QUALITY_CRITERIA.yaml の基準で評価")
        print("    - QUALITY_REPORT.md を生成")
        print("\n詳細は CLAUDE.md の Phase 4 セクションを参照してください")

    def phase_5_improvement(self):
        """Phase 5: 改善"""
        self._print_checkpoint(
            "Phase 5 - 改善",
            [
                "品質評価結果分析",
                "問題箇所修正（最大3回）"
            ]
        )

        self._update_status("phase5_in_progress")
        print("\n📋 Phase 5 の実行指示:")
        print("  - QUALITY_REPORT.md の問題点を修正")
        print("  - 収束条件: 全チェックPASS or 3回完了")

    def phase_6_finalization(self):
        """Phase 6: 完成処理（目次・README + RAG構築）"""
        self._print_checkpoint(
            "Phase 6 - 完成処理",
            [
                "目次HTML生成（frontend-designスキル使用）",
                "README.md生成",
                "RAGチャンキング + Embedding生成",
                "rag_index.json 出力"
            ],
            {
                "📚 カリキュラム": self.content_info["curriculum"]["title"],
                "💡 RAG": "コンテンツ最終確定後にRAG構築 → GitHub直前"
            }
        )

        self._update_status("phase6_in_progress")
        print("\n📋 Phase 6 の実行指示:")
        print("  1. content/index.html を生成")
        print("  2. README.md を生成")
        print("  3. RAGチャンキング + Embedding生成（自動実行）")
        print("     → rag_index.json が出力されます")
        print("  4. GitHub にアップロード")

        # RAG準備を自動実行
        self._run_rag_preparation()

    def run(self, curriculum_theme: str = None):
        """ワークフロー全体を実行"""
        print("\n" + "=" * 60)
        print("🎓 学習コンテンツ自動生成エージェント")
        print("=" * 60)

        # 既存のCONTENT_INFO.yamlを確認
        self.content_info = self._load_content_info()

        if self.content_info is None:
            if curriculum_theme is None:
                print("\n❌ カリキュラムテーマを指定してください")
                print("使用方法: python3 src/content_orchestrator.py <テーマ>")
                sys.exit(1)
            self.phase_0_initialize(curriculum_theme)

        # 現在のステータスに応じて次のフェーズを提案
        status = self.content_info.get("status", "phase0_initialized")

        print(f"\n📊 現在のステータス: {status}")
        print(f"📚 カリキュラム: {self.content_info['curriculum']['title']}")

        phase_map = {
            "phase0_initialized": self.phase_1_design_and_research,
            "phase1_in_progress": self.phase_1_design_and_research,
            "phase1_completed": self.phase_2_content_creation,
            "phase2_in_progress": self.phase_2_content_creation,
            "phase2_completed": self.phase_3_audio_generation,
            "phase3_in_progress": self.phase_3_audio_generation,
            "phase3_completed": self.phase_4_quality_check,
            "phase4_in_progress": self.phase_4_quality_check,
            "phase4_completed": self.phase_5_improvement,
            "phase5_in_progress": self.phase_5_improvement,
            "phase5_completed": self.phase_6_finalization,
            "phase6_in_progress": self.phase_6_finalization,
            "phase6_completed": lambda: print("🎉 ワークフロー完了！")
        }

        next_phase = phase_map.get(status)
        if next_phase:
            next_phase()


def main():
    """メイン関数"""
    theme = sys.argv[1] if len(sys.argv) > 1 else None
    orchestrator = ContentOrchestrator()
    orchestrator.run(theme)


if __name__ == "__main__":
    main()
