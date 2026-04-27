# Project Specification

> Auto-generated: 2026-04-27

# REQUIREMENTS.md - mp4-join (計画案 A: 保守的アプローチ)

**プロジェクト名**: mp4-join
**アプローチ**: 保守的（Conservative） — 枯れた技術・段階的実装・低リスク優先
**作成日**: 2026-04-27
**対象**: ピュアフロントエンド Web アプリ（GitHub Pages 公開前提）

---

## 1. プロジェクト概要

ローカルフォルダ内の MP4 動画を、ブラウザ上で選択・並び替え・結合できるシングルページアプリケーション。
サーバーは一切持たず、ファイル走査・サムネイル生成・動画結合の全処理をブラウザ内（File System Access API + FFmpeg.wasm）で完結させる。

**コアバリュー**:
- インストール不要・サーバー不要・データ漏洩なし（全処理ローカル）
- GitHub Pages にホストするだけで誰でも利用可能
- 動画編集ソフトを開かずに「複数の MP4 を1本にまとめる」を最短手順で実現

---

## 2. ユーザーストーリー

| # | ロール | やりたいこと | 価値 |
|---|--------|--------------|------|
| US-01 | 一般ユーザー | フォルダをドラッグ＆ドロップして配下の MP4 を一覧表示したい | フォルダ選択ダイアログを開く手間を省きたい |
| US-02 | 一般ユーザー | 「フォルダ選択」ボタンからもフォルダを指定したい | ドラッグが苦手なユーザーでも操作できるようにしたい |
| US-03 | 一般ユーザー | フォルダ内の構造をツリーで確認したい | どの階層にどの MP4 があるか視覚的に把握したい |
| US-04 | 一般ユーザー | サムネイルを見ながら結合する MP4 を選びたい | ファイル名だけでは内容が分かりにくいので |
| US-05 | 一般ユーザー | サムネイルをクリックして個別にプレビュー再生したい | 結合前に内容を確認したい |
| US-06 | 一般ユーザー | プレビュー再生速度を 0.5/1.0/1.5/2.0 倍で切替えたい | 長時間動画を素早く確認したい |
| US-07 | 一般ユーザー | 選択した MP4 を「名前昇順/降順」「作成日昇順/降順」「ランダム」で並び替えたい | 結合順を意図通りに制御したい |
| US-08 | 一般ユーザー | 結合中の進捗（%・ETA・現在処理中ファイル名）を見たい | 完了タイミングが予測でき、放置 or 待機を判断したい |
| US-09 | 一般ユーザー | 結合済 MP4 を「ダウンロード」ボタンで保存したい | ローカルファイルとして残したい |
| US-10 | Safari/Firefox ユーザー | File System Access API 非対応ブラウザでも `<input webkitdirectory>` で同等の操作をしたい | ブラウザを乗り換えずに使いたい |

---

## 3. 機能要件

### 3.1 フォルダ取り込み（必須）
- **F-01**: `showDirectoryPicker()` でフォルダを起点として選択できる（Chromium 系）
- **F-02**: ブラウザウィンドウへフォルダをドラッグ＆ドロップで取り込める（`DataTransferItem.getAsFileSystemHandle()` を使用）
- **F-03**: File System Access API 非対応ブラウザでは `<input type="file" webkitdirectory>` でフォールバック
- **F-04**: 取り込み後、起点フォルダを再帰的に走査し、拡張子 `.mp4`（大小区別なし）のファイルを抽出
- **F-05**: 走査中はスケルトン UI または進捗（走査済ファイル数）を表示

### 3.2 ツリー表示・選択（必須）
- **F-10**: 起点フォルダ配下の構造をツリー（フォルダノード／ファイルノード）で表示
- **F-11**: 各ファイル行にチェックボックスを配置し、結合対象を選択可能にする
- **F-12**: フォルダノードのチェックボックスは「配下 mp4 を一括選択／解除」を行う（三状態：全選択／部分選択／未選択）
- **F-13**: ツリーの開閉トグル（折り畳み）対応
- **F-14**: 選択数・選択合計サイズをサマリーバーに表示

### 3.3 サムネイル・プレビュー（必須）
- **F-20**: 各 mp4 ファイル行にサムネイル（最初のキーフレーム or 1.0 秒地点）を表示
- **F-21**: サムネイル生成は `<video>` + `<canvas>` を用い、ビューポート内のファイルのみ遅延生成（IntersectionObserver）
- **F-22**: サムネイルクリックでモーダルプレビュー（`<video controls>`）を開く
- **F-23**: プレビューの再生速度セレクタ（0.5 / 1.0 / 1.5 / 2.0）を提供。デフォルト 1.0
- **F-24**: モーダルを閉じる際は `URL.revokeObjectURL()` で Blob URL を解放（メモリリーク防止）

### 3.4 並び替え（必須）
- **F-30**: 結合キュー（選択済リスト）に対して以下の並び替えを適用できる
  - 名前 昇順／降順（自然順ソート: `Intl.Collator` の `numeric:true`）
  - 作成日（File.lastModified）昇順／降順
  - ランダム（Fisher-Yates シャッフル）
- **F-31**: 並び替え後、ユーザーが手動でドラッグ＆ドロップによる微調整も可能（HTML5 Drag and Drop API）
- **F-32**: 結合キューはサムネイル+ファイル名で縦リスト表示

### 3.5 結合処理（必須・コア）
- **F-40**: 結合エンジンは FFmpeg.wasm（@ffmpeg/ffmpeg v0.12 系）を使用
- **F-41**: 初回利用時に FFmpeg core（wasm + worker）をロードし、進捗（%）を表示
- **F-42**: ロード済みの FFmpeg インスタンスを再利用（再ロード回避）
- **F-43**: 結合方式は **第一選択: concat demuxer**（再エンコードなし、高速）
- **F-44**: concat demuxer 失敗時（コーデック不一致など）は **第二選択: concat filter で再エンコード**（H.264 + AAC）にフォールバック
- **F-45**: 結合中は以下を表示
  - 全体進捗バー（%）
  - 現在処理中ファイル名
  - ETA（推定残り時間）
  - キャンセルボタン
- **F-46**: 結合完了後、出力 Blob をダウンロード可能なリンク（`a[download]`）として表示。ファイル名は `joined_YYYYMMDD_HHmmss.mp4`

### 3.6 ダウンロード（必須）
- **F-50**: 結合済 MP4 のダウンロードボタンを提供
- **F-51**: ダウンロード後、Blob URL を `URL.revokeObjectURL()` で解放
- **F-52**: ダウンロード履歴（直近 1 件）を画面上に保持し、再ダウンロード可能にする

### 3.7 エラーハンドリング・通知（必須）
- **F-60**: 走査エラー、サムネイル生成失敗、FFmpeg ロード失敗、結合失敗をトースト通知で表示
- **F-61**: 破損 MP4／未対応コーデックは個別にスキップし、結合キューから除外（理由をログ表示）
- **F-62**: 進捗ログ（コンソール風）をオプションで表示できる（上級者向け）

---

## 4. 非機能要件

### 4.1 パフォーマンス
- **NFR-P-01**: 1000 ファイルのフォルダ走査が **5 秒以内**
- **NFR-P-02**: サムネイル生成は遅延ロード（IntersectionObserver）で初期表示 **< 1 秒**
- **NFR-P-03**: FFmpeg.wasm 初回ロード進捗を必ず表示（数十 MB のため UX 上必須）
- **NFR-P-04**: LCP < 2.5s, CLS < 0.1（初期表示時、Core Web Vitals 準拠）
- **NFR-P-05**: 結合処理は Web Worker 経由で実行し、UI スレッドをブロックしない

### 4.2 UX
- **NFR-UX-01**: 全操作はキーボードのみで可能（Tab / Space / Enter / 矢印キー）
- **NFR-UX-02**: WCAG 2.1 AA 準拠（コントラスト比 4.5:1 以上、フォーカスリング、ARIA）
- **NFR-UX-03**: モバイル（縦・横）対応（ただし FFmpeg.wasm はメモリ制約があるため iOS Safari は制限事項として明記）
- **NFR-UX-04**: 主要操作（選択・並び替え・結合開始）は 2 クリック以内で到達可能
- **NFR-UX-05**: エラーメッセージは技術用語を避け、対処方法を併記（例: "このファイルは対応外です。別のファイルをお試しください"）

### 4.3 セキュリティ・プライバシー
- **NFR-S-01**: 全処理ローカル完結。ファイル本体・メタデータを外部に送信しない
- **NFR-S-02**: CSP（Content Security Policy）で `unsafe-inline` を最小化。FFmpeg.wasm の `wasm-eval` 許可は必要最小限
- **NFR-S-03**: SharedArrayBuffer 利用のため `Cross-Origin-Opener-Policy: same-origin` / `Cross-Origin-Embedder-Policy: require-corp` を `<meta>` で対処、または GitHub Pages 制約に応じて単一スレッド版 FFmpeg を fallback として用意
- **NFR-S-04**: 第三者 CDN 使用時は SRI（Subresource Integrity）を付与

### 4.4 互換性（保守的観点で安全圏を狭く取る）
| ブラウザ | サポート状況 | 機能制約 |
|---------|--------------|----------|
| Chrome 110+ | フルサポート | — |
| Edge 110+ | フルサポート | — |
| Firefox 115+ | 部分サポート | フォルダドロップは webkitdirectory フォールバック |
| Safari 16.4+（macOS） | 部分サポート | webkitdirectory のみ。FFmpeg.wasm はマルチスレッド非対応の可能性 |
| Safari iOS | 制限あり | メモリ上限（〜500MB）に達する可能性。大容量結合は非推奨と明示 |
| モバイル Chrome | 部分サポート | 同上 |

### 4.5 保守性
- **NFR-M-01**: TypeScript 型定義必須（`any` 禁止、`strict: true`）
- **NFR-M-02**: コンポーネントは関数コンポーネント + Hooks のみ
- **NFR-M-03**: ビジネスロジックはカスタムフックに分離（UI とロジックを分割）
- **NFR-M-04**: テストカバレッジ 80% 以上（Phase 4 目標）

---

## 5. スコープ外（明示）

| # | 項目 | 理由 |
|---|------|------|
| OUT-01 | 動画のトリミング・カット編集 | スコープ外（結合のみ） |
| OUT-02 | mp4 以外のフォーマット入出力（mov, avi, mkv 等） | スコープを mp4 限定（要件） |
| OUT-03 | 解像度・ビットレート変換 UI | concat 失敗時の自動再エンコードのみ実施。ユーザー指定はしない |
| OUT-04 | クラウドストレージ連携（Google Drive, Dropbox 等） | サーバーレス前提 |
| OUT-05 | アカウント・ログイン機能 | 不要 |
| OUT-06 | 履歴の永続化（IndexedDB 保存） | 直近 1 件のセッション内保持のみ |
| OUT-07 | マルチタブ間の状態同期 | 単一タブ前提 |
| OUT-08 | 字幕・チャプター付与 | スコープ外 |
| OUT-09 | サーバーサイド処理（Node.js, FFmpeg バイナリ等） | GitHub Pages 制約 |
| OUT-10 | 国際化（i18n） | 日本語/英語のラベル切替は about.html のみ。アプリ本体は日本語固定 |

---

## 6. 主要な制約と前提

### 6.1 技術的制約
- **C-01**: ホスティングは GitHub Pages（静的ファイルのみ、サーバーサイドコード不可）
- **C-02**: FFmpeg.wasm は SharedArrayBuffer を使用するため、配信時の COOP/COEP ヘッダ設定が必要。GitHub Pages では HTTP ヘッダ設定が制限されるため、`<meta http-equiv>` または単一スレッド版にフォールバック
- **C-03**: File System Access API は Chromium 系のみ。Safari/Firefox は webkitdirectory で代替（読み取り専用）
- **C-04**: ブラウザのメモリ上限（通常 2GB 程度、モバイル 500MB 程度）が結合可能な総サイズの上限

### 6.2 前提
- **A-01**: ユーザーはモダンブラウザ（2024 年以降のメジャーバージョン）を使用
- **A-02**: 結合対象 mp4 は H.264 + AAC が大半（concat demuxer の前提条件）
- **A-03**: ローカル double-click 実行時は `launch_app.command` で簡易 HTTP サーバー（`python3 -m http.server`）起動を経由する（COOP/COEP 設定の利便性のため）

---

## 7. リスク分析

### 7.1 技術的リスク

| ID | リスク | 影響 | 確率 | 対策 |
|----|--------|------|------|------|
| R-T-01 | GitHub Pages で COOP/COEP ヘッダが設定できず、SharedArrayBuffer が使えない | 高 | 高 | 単一スレッド版 FFmpeg.wasm をデフォルトで採用。マルチスレッドはオプション扱い |
| R-T-02 | concat demuxer がコーデック不一致で失敗 | 中 | 中 | concat filter + 再エンコードへ自動フォールバック。ただし処理時間が大幅増（事前警告） |
| R-T-03 | 大容量 mp4（数 GB）でブラウザがクラッシュ | 高 | 中 | 入力時に総サイズを表示し、500MB / 2GB の閾値で警告ダイアログ |
| R-T-04 | iOS Safari の File System Access API 非対応・メモリ制約 | 中 | 高 | 機能制限ページを表示（webkitdirectory のみ、結合サイズ警告） |
| R-T-05 | サムネイル生成中のメモリリーク（Blob URL の解放漏れ） | 中 | 中 | useEffect cleanup で `URL.revokeObjectURL` を徹底。ESLint カスタムルールで検知 |
| R-T-06 | FFmpeg.wasm のバージョンアップで API 破壊的変更 | 中 | 低 | package.json で `^0.12.x` に固定。テストで API 互換性を担保 |
| R-T-07 | DataTransferItem.getAsFileSystemHandle がブラウザによって挙動差 | 中 | 中 | 検出ロジックを共通化、try/catch で webkitdirectory にフォールバック |

### 7.2 UX リスク

| ID | リスク | 影響 | 確率 | 対策 |
|----|--------|------|------|------|
| R-U-01 | 1000 ファイル超のフォルダで走査が重く UI がフリーズする | 高 | 中 | 走査を Web Worker 化、または非同期チャンク処理（10 件ごとに `requestIdleCallback`） |
| R-U-02 | サムネイル一斉生成で初期表示が遅延 | 中 | 高 | IntersectionObserver で遅延生成（ビューポート内のみ） |
| R-U-03 | FFmpeg ロード時間（数 MB〜数十 MB）でユーザーが離脱 | 中 | 中 | プログレス UI と「初回のみ」の説明文を表示。第二利用時はキャッシュから即時ロード |
| R-U-04 | 結合進捗が「%」だけだと長時間処理で不安になる | 中 | 高 | ETA + 現在処理中ファイル名 + キャンセルボタンを併記 |
| R-U-05 | エラー発生時に技術メッセージが出てユーザーが対処できない | 中 | 中 | エラーメッセージのラッピング層を設け、対処手順を併記 |
| R-U-06 | フォルダ選択方法が複数ありユーザーが迷う | 低 | 中 | UI で「ドラッグ or クリック」を視覚的に明示（点線ボーダー + アイコン） |

### 7.3 リスク受容ライン
- 致命的（R-T-01, R-T-03, R-U-01）は必ず対策実装
- 中程度はベストエフォート、Phase 4 で改善
- 低確率は文書化のみ（README に既知の制約として記載）

---

## 8. 完了の定義 (Definition of Done)

- 全機能要件 F-01〜F-62 が動作確認済み
- Chrome / Edge / Firefox の最新版でクリティカルパスが通る
- Safari は機能制限モードで起動できる
- Lighthouse スコア（Performance / Accessibility / Best Practices）が 90 以上
- テストカバレッジ 80% 以上
- README.md / about.html / explanation.mp3 が project/public/ に配置済み
- launch_app.command でローカル起動できる
- GitHub Pages で公開され、URL からアクセス可能


---


## Project Info

```yaml
project:
  name: mp4-join
  slug: mp4-join
  type: portfolio
  created: 2026-04-27 09:43:51
  last_updated: 2026-04-27 09:43:51
  status: development
  version: 1.0.0

portfolio:
  github_repo: ai-agent-portfolio
  visibility: public
  demo_url: "https://github.com/[username]/ai-agent-portfolio/mp4-join"

paths:
  agent_dir: ./Desktop/AI-Apps/mp4-join/mp4-join-agent
  release_dir: ~/Desktop/my-apps/mp4-join
  portfolio_dir: ~/Desktop/GitHub/ai-agent-portfolio/mp4-join

workflow:
  1_develop: "このディレクトリ内で開発"
  2_test: "worktrees内でテスト実行"
  3_release: "./release.sh を実行"
  4_publish: "./publish_to_portfolio.sh を実行"
  5_modify: "このディレクトリに戻って修正"

features:
  - "21体のエージェント（基本11体 + ゲーム8体 + 特殊2体）"
  - "Phase 0-6 完全自動実行"
  - "モバイル傾きセンサー対応"
  - "AI画像生成（Google Imagen API）"
  - "frontend-design スキル統合"
  - "Gemini TTS音声生成（GCPフォールバック）"

```