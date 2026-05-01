# Changelog

> Auto-generated: 2026-04-27

## v1.0.6 (2026-05-01)

- **fix:** 結合動画の **freeze 問題を根本解決**（特にランダム並び替え時 + 大量ファイル時）。
  - 各入力ファイルを連結前に `-ignore_editlist 1 -c copy` で **remux** し、edit list（`elst` atom）と PTS 不整合を除去。
  - 出力側で `-avoid_negative_ts make_zero -movflags +faststart` を適用し、タイムスタンプを 0 起点に正規化 + faststart 化。
- **`joinDemuxer` を 2 段階パイプラインに置き換え:**
  1. **Pass 1 (per-file remux):** 各 `input_NNNN.mp4` を `clean_NNNN.mp4` に remux（再エンコードなし）。
  2. **Pass 2 (concat):** 整列済み `clean_NNNN.mp4` を `concat demuxer + -c copy` で連結。
- **再エンコードしない**ため、処理速度は v1.0.5 とほぼ同等を維持（500 ファイルで概ね 30 秒〜1 分の追加コスト）。
- **メモリ管理:** Pass 1 の remux 完了直後に対応する `input_NNNN.mp4` を MEMFS から削除し、ピークメモリを抑制。
- 個別ファイルの remux 失敗は `skippedFiles` に記録（`reason: "remux exit code N"`）し、他のファイルの結合は続行。**全ファイル remux 失敗時のみ** `All inputs failed to remux` を投げる。
- 進捗表示を 3 段階に細分化:
  - 0% → 5%: 入力ファイル準備
  - 5% → 80%: 整列中…（i/N） — 線形に進行
  - 80% → 100%: 連結中… → 出力準備
- **test:** ffmpegService.test に v1.0.6 専用テストを 6 件追加（合計 227 件、全て pass）。
  - Pass 1 で `-ignore_editlist 1` が `-i` の前に渡されること
  - 各入力に対して remux exec が呼ばれること（N+1 回の exec を検証）
  - `input_NNNN.mp4` が remux 後に MEMFS から削除されること
  - 個別 remux 失敗で `skippedFiles` に記録され、他のファイルは続行されること
  - 全 remux 失敗で `All inputs failed to remux` を投げること
  - `concat_list.txt` が `clean_NNNN.mp4` を参照していること

## v1.0.5 (2026-05-01)

- **fix:** 結合速度を **v1.0.0 と同等** に回復（500 ファイルでも数秒）。
- ロジックを v1.0.0 ベース（`concat demuxer + -c copy`）に戻し、freeze 対策として **timestamp 系フラグだけ** を追加:
  - `-fflags +genpts`（PTS 再生成）
  - `-avoid_negative_ts make_zero`（負タイムスタンプを 0 に正規化）
  - `-movflags +faststart`（プレイヤー対応性向上）
  - `-auto_convert 1`（互換性のための bitstream フィルタ自動適用）
- v1.0.1〜v1.0.4 で追加した以下の機能を **削除（過剰設計のため）**:
  - 入力 probe（codec/解像度/fps/audio params 取得）
  - 自動 filter ルーティング（互換性なし時に再エンコードへ自動切替）
  - 「再エンコードで結合」トグル（`forceReencode` ストアフラグ + `EncodeModeToggle` UI）
  - 全ファイル個別正規化（normalize → concat の 2 段階パイプライン）
- **維持** した v1.0.2 の UX 改善:
  - sticky な `JoinActionBar`（右ペイン上部の結合 CTA）
  - `Ctrl/Cmd + Enter` ショートカット（`useJoinShortcut`）
- **test:** 221 件（v1.0.4 の 265 件から、削除した機能のテスト 44 件を除去）。全 pass。
- **note:** edit list 起因の freeze がまだ残る場合は、次のリリースで「各ファイルを `-c copy` で remux してから結合」（再エンコードなし）の対応を検討します。

## v1.0.4 (2026-05-01)

- **fix:** 異なる解像度・フレームレート・音声仕様の mp4 を結合するときに発生していた `concat filter failed with exit code 1` を**根本解消**。
  - `joinFilter` を**2 段階パイプライン**に置き換え:
    1. 各入力を統一スペック（`1280x720 / 30 fps / yuv420p / H.264 baseline 3.1` + `AAC stereo 44.1 kHz 128 kb/s`）に**正規化**（アスペクト比は維持し、上下左右を黒帯で pad）。
    2. 正規化済みファイルを `concat demuxer (-c copy)` で**ロスレスに連結**。
  - 入力ごとに **音声ストリーム有無を probe**（`Stream #N:M: Audio:` 検出）。音声欠落ファイルには `anullsrc=r=44100:cl=stereo` で**無音トラックを自動合成**。
  - 個別ファイルの正規化失敗は `skippedFiles` に記録し、他のファイルの結合は続行。すべて失敗したときのみ `All inputs failed to normalize` を投げる。
  - 進捗表示を「`正規化中… (i/N)`」「`連結中…`」に具体化。
  - エラー詳細を統一: `normalize failed with exit code N on <filename>` / `final concat failed with exit code N`。
- **trade-offs (現状の妥協、将来余地あり):**
  - 4K → 720p は情報損失が出ます。将来 probe で「全ファイルが同一の高解像度なら維持」する分岐を追加予定。
  - 60 fps → 30 fps も同様。統一スペック化を優先しています。
  - `-preset ultrafast` で速度優先（ファイルサイズは `medium` より大きめ）。
- **test:** ffmpegService.test に 12 件の追加テスト（合計 265 件、全て pass）。`buildNormalizeArgs` / `parseHasAudio` のユニットテスト、normalize per-file failure → skippedFiles routing、single-survivor short-circuit、anullsrc 経路の検証など。

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
