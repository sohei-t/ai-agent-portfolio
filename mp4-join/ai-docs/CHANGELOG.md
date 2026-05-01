# Changelog

> Auto-generated: 2026-04-27

## v1.0.3 (2026-05-01)

- **fix:** 一部環境で「結合に失敗しました」エラーが発生する問題に対する防御策
  - probe（Tier 2）を**完全フェイルセーフ化**。任意の失敗を握り潰してレガシーパス（demuxer→filter）に降格。
  - probe コマンドを `-f null -` から `-f null __probe_null.tmp` に変更し、`-` を出力 URL として受け付けない wasm ビルドでも動作するように。`-hide_banner` も追加してログのノイズを削減。
  - 部分的に欠損した probe メタデータでは filter ルーティングを行わない（`videoCodec / width / height` がすべての入力で揃っているときのみ判定する）。
  - 結合失敗時のトーストに FFmpeg の実エラーメッセージを併記（例: 「結合に失敗しました（詳細: concat demuxer failed with exit code 1）」）。診断容易化のため、トースト表示時間も 5s → 10s に延長。
- **test:** ffmpegService / useFFmpegJoin に 7 件の追加テスト（合計 253 件、全て pass）。

## v1.0.2 (2026-04-30)

- **improve:** 「N件を結合」ボタンを右ペイン上部に **sticky 配置**。長いキューでも下までスクロールせずに実行できる。
- **improve:** エンコードモードを **2 択セグメントコントロール（⚡ 高速 / 🎬 安定）** に変更。チェックボックスと逆セマンティクスの混乱を解消。
  - 高速モード: コーデック自動判定（推奨デフォルト）。
  - 安定モード: 常に再エンコードで結合（コーデック不揃いの freeze に強い）。
- **improve:** **Ctrl + Enter / ⌘ + Enter** で結合を即時実行（IME 中・フォーム入力中は誤発火しない）。
- **improve:** 結合キューに件数バッジを追加。空状態のメッセージを改善（「左のツリーからファイルを選択してください」）。
- **improve:** sticky アクションバーに選択件数 / 合計サイズ / メモリ警告を統合。
- **improve:** 結合実行中（busy）は CTA・全解除ボタンを自動的に disabled 化。
- **a11y:** エンコードモードを `role="radiogroup" / role="radio" + aria-checked` に変更。CTA に `aria-keyshortcuts="Control+Enter Meta+Enter"` を付与。
- **test:** EncodeModeToggle / JoinActionBar / useJoinShortcut に追加テスト（合計 246 件、+20 件、全て pass）。

## v1.0.1 (2026-04-30)

- **fix:** 動画結合後に出力動画が「再生時間は進むが映像フレームが固まる」現象を修正
  - **Tier 1:** concat demuxer のコマンドに `-auto_convert 1`、`-avoid_negative_ts make_zero`、`-movflags +faststart` を追加し、PTS gap や bitstream filter 不一致による freeze を抑止。
  - **Tier 2:** 結合前に各入力の codec / 解像度 / fps / pixel format / audio params を probe し、互換性が無い場合は自動的に `concat filter` (再エンコード) に切り替え。
  - **Tier 3:** UI に「再エンコードで結合（互換性優先・低速）」トグルを追加（localStorage 永続化）。
- **test:** ffmpegService / appStore / EncodeModeToggle に 20 件の追加テスト（合計 226 件、全て pass）。

## Recent Changes

- 1ef7b9d chore(progress): record Phase 7 completion (v1.0.1 freeze fix) (2026-05-01)
- 18e6ed2 fix(mp4-join): resolve PTS gap freeze in concat demuxer (v1.0.1) (2026-05-01)
- 2dbc880 feat(phase6): GitHub portfolio publish + security verify + launcher register (2026-04-27 15:42:01 +0900)
- 60a69f0 feat(phase5): build, documenter (about/README/mp3), launcher, ai-docs (2026-04-27 15:36:50 +0900)
- 4ef1f2e refactor(phase4): perf + a11y + UX polish (2026-04-27 15:32:27 +0900)
- ce2718c test(phase3): expand coverage to 86.83%, critical path 100% (2026-04-27 11:24:46 +0900)
- 818c01d feat(phase2-prototype-c): innovative multi-thread + virtual tree + dnd-kit (2026-04-27 11:08:27 +0900)
- 7070799 feat(phase1-b): spec, tech stack, architecture, WBS, test design (2026-04-27 10:49:29 +0900)
- 8ea11aa feat(phase1-a): conservative planning (2026-04-27 10:33:17 +0900)
- 043233e Initial: mp4-join development environment setup (2026-04-27 09:43:51 +0900)
