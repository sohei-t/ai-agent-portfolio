# Changelog

> Auto-generated: 2026-04-27

## v1.0.1 (2026-04-30)

- **fix:** 動画結合後に出力動画が「再生時間は進むが映像フレームが固まる」現象を修正
  - **Tier 1:** concat demuxer のコマンドに `-auto_convert 1`、`-avoid_negative_ts make_zero`、`-movflags +faststart` を追加し、PTS gap や bitstream filter 不一致による freeze を抑止。
  - **Tier 2:** 結合前に各入力の codec / 解像度 / fps / pixel format / audio params を probe し、互換性が無い場合は自動的に `concat filter` (再エンコード) に切り替え。
  - **Tier 3:** UI に「再エンコードで結合（互換性優先・低速）」トグルを追加（localStorage 永続化）。
- **test:** ffmpegService / appStore / EncodeModeToggle に 20 件の追加テスト（合計 226 件、全て pass）。

## Recent Changes

- 4ef1f2e refactor(phase4): perf + a11y + UX polish (2026-04-27 15:32:27 +0900)
- ce2718c test(phase3): expand coverage to 86.83%, critical path 100% (2026-04-27 11:24:46 +0900)
- 818c01d feat(phase2-prototype-c): innovative multi-thread + virtual tree + dnd-kit (2026-04-27 11:08:27 +0900)
- 7070799 feat(phase1-b): spec, tech stack, architecture, WBS, test design (2026-04-27 10:49:29 +0900)
- 8ea11aa feat(phase1-a): conservative planning (2026-04-27 10:33:17 +0900)
- 043233e Initial: mp4-join development environment setup (2026-04-27 09:43:51 +0900)
