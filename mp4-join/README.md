# mp4-join

ブラウザだけで MP4 動画を結合できる、ピュアフロントエンド SPA。
**サーバーレス・ファイル無アップロード**で、すべての処理がブラウザ内（FFmpeg.wasm）で完結します。

## 🌐 ライブデモ

GitHub Pages で公開予定:
- アプリ本体: `index.html`
- プロジェクト紹介: `about.html`
- 音声解説: `explanation.mp3`

## ✨ 主な機能

- 📁 **フォルダ取り込み**: `showDirectoryPicker` / D&D / `webkitdirectory` の三段フォールバック
- 🌳 **ツリー表示**: react-arborist で大規模フォルダもスムーズに（仮想スクロール）
- 🎯 **直感的な並び替え**: dnd-kit によるドラッグ&ドロップ並び替え
- 🎬 **MP4結合**: FFmpeg.wasm（マルチスレッド版）でブラウザ内エンコード
  - **2 段階パイプライン**（v1.0.6〜）: Pass 1 で各ファイルを `-ignore_editlist 1 -c copy` で remux（edit list 除去 + PTS 正規化）→ Pass 2 で `concat demuxer + -c copy` 連結（再エンコードなし）
  - 500 ファイルでも数十秒〜1 分程度で完了。再エンコードしないため画質・音質はオリジナルを保持
  - timestamp 系フラグ（`-fflags +genpts`、`-auto_convert 1`、`-avoid_negative_ts make_zero`、`-movflags +faststart`）と edit list 除去により、ランダム並び替え時 + 大量ファイル時の freeze を根本的に解消（v1.0.6〜）
- ⌨️ **キーボードショートカット**: `Ctrl + Enter` / `⌘ + Enter` で結合を即時実行（v1.0.2〜）
- 📌 **sticky CTA**: 「N 件を結合」ボタンが常に画面上部に表示され、長いキューでもスクロール不要（v1.0.2〜）
- 💾 **永続化**: IndexedDB で並び順・選択状態を保存
- 🔒 **プライバシー保護**: ファイルは一切アップロードされません

## 🛠 技術スタック

- **フレームワーク**: React 18 + TypeScript + Vite
- **スタイリング**: Tailwind CSS
- **状態管理**: Zustand
- **ツリー表示**: react-arborist（仮想スクロール）
- **D&D**: @dnd-kit
- **動画処理**: @ffmpeg/ffmpeg（マルチスレッド対応）
- **永続化**: idb（IndexedDB ラッパー）
- **アイコン**: lucide-react

## 🚀 ローカルで起動する

### 方法 1: ワンクリック起動（macOS）

リポジトリ内の `launch_app.command` をダブルクリック。

> COOP / COEP ヘッダ付きの簡易サーバを起動し、ブラウザを自動で開きます。
> マルチスレッド FFmpeg.wasm に必要な `SharedArrayBuffer` を有効化します。

### 方法 2: 任意の HTTPS / 専用ヘッダ付きサーバ

`SharedArrayBuffer` を使うため、以下のヘッダが必要です:

```
Cross-Origin-Embedder-Policy: require-corp
Cross-Origin-Opener-Policy: same-origin
```

```bash
cd public
python3 -c "
import http.server, socketserver
class H(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Cross-Origin-Embedder-Policy','require-corp')
        self.send_header('Cross-Origin-Opener-Policy','same-origin')
        super().end_headers()
socketserver.TCPServer(('',8080),H).serve_forever()
"
```

http://localhost:8080 を開いて利用できます。

## 🌍 対応ブラウザ

| ブラウザ | 対応状況 |
|---------|---------|
| Chrome 110+ | ✅ フル機能（File System Access API） |
| Edge 110+ | ✅ フル機能 |
| Safari 17+ | ⚠️ webkitdirectory フォールバック |
| Firefox | ⚠️ webkitdirectory フォールバック |

## 📊 品質指標

- ✅ テスト: 265 件 / カバレッジ 86%超（v1.0.4 で +12 件、v1.0.3 で +7 件、v1.0.2 で +20 件、v1.0.1 で +20 件）
- ✅ TypeScript 型エラー 0 / ESLint warning 0
- ✅ Core Web Vitals 適合（LCP < 2.5s、CLS < 0.1）
- ✅ WCAG 2.1 AA アクセシビリティ準拠

## 📚 詳細ドキュメント

`ai-docs/` 配下に開発ドキュメント一式を同梱しています:

- `ai-docs/SPEC.md` - 詳細仕様
- `ai-docs/ARCHITECTURE.md` - アーキテクチャ
- `ai-docs/TEST_REPORT.md` - テストレポート
- `ai-docs/AI_DEVELOPMENT_LOG.md` - AI 開発ログ
- `ai-docs/CHANGELOG.md` - 変更履歴

## 🧠 開発プロセス

このアプリは AI エージェント自律ワークフロー（Phase 0〜6）で生成されました:

1. **Phase 1**: 2 案を並列計画 → 自律評価 → 仕様策定
2. **Phase 2**: 3 つのアーキテクチャ（マイクロサービス / モノリス / サーバーレス）を並列実装
3. **Phase 3**: 206 件のテストで合格判定
4. **Phase 4**: パフォーマンス・カバレッジ最適化
5. **Phase 5**: ドキュメント・音声解説・ランチャー生成
6. **Phase 6**: GitHub ポートフォリオ公開

## 📄 ライセンス

MIT License

---

🤖 Generated with [Claude Code](https://claude.com/claude-code)
