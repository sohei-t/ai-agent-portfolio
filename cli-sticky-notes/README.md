# CLI Sticky Notes

ターミナルユーザー向けの付箋アプリ。グローバルホットキーで複数のターミナルセッションを管理できます。

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Platform](https://img.shields.io/badge/platform-macOS%20%7C%20Windows%20%7C%20Linux-lightgrey)
![Electron](https://img.shields.io/badge/electron-28.x-47848f)

## 機能

- **グローバルホットキー**: フォーカスを切り替えずに付箋を作成 (`Cmd+Shift+N`)
- **クイックペースト**: クリップボードの内容を新しい付箋に貼り付け (`Cmd+Shift+V`)
- **カラーコーディング**: 6色のテーマでメモを分類
- **タグ**: カスタムタグで整理
- **常に最前面**: 重要な付箋を常に表示
- **位置記憶**: 付箋の位置とサイズを保持
- **システムトレイ**: メニューバーからアクセス

## インストール

### ソースから

```bash
# リポジトリをクローンまたはダウンロード
cd cli-sticky-notes-agent

# 依存関係をインストール
npm install

# アプリを起動
npm start
```

### 配布用ビルド

```bash
# 現在のプラットフォーム向けにビルド
npm run build

# macOS向けのみビルド
npm run build:mac
```

## 使い方

### キーボードショートカット

| ショートカット | 動作 |
|----------|--------|
| `Cmd+Shift+N` | 新規付箋を作成 |
| `Cmd+Shift+V` | クリップボードから付箋を作成 |
| `Cmd+Shift+H` | 全付箋の表示/非表示を切り替え |
| `Escape` | 現在の付箋を隠す |
| `Cmd+S` | 現在の付箋を保存 |

### カラーテーマ

| カラー | 推奨用途 |
|-------|--------------|
| イエロー | 一般的なメモ |
| グリーン | 完了 / 成功 |
| ブルー | 情報 / 参照 |
| ピンク | 重要 |
| パープル | アイデア |
| オレンジ | 警告 |

### Tips

- **閉じるボタンをダブルクリック**: 内容がある付箋を削除（安全機能）
- **トレイアイコンを右クリック**: 全コントロールにアクセス
- **タイトルバーをドラッグ**: 付箋を移動
- **角をドラッグ**: 付箋をリサイズ

## 技術スタック

- **Electron** - クロスプラットフォームデスクトップフレームワーク
- **electron-store** - 永続的なローカルストレージ
- **外部API不要** - 完全オフラインで動作

## プロジェクト構造

```
cli-sticky-notes/
├── main/               # メインプロセス (Node.js)
│   ├── index.js        # アプリのエントリーポイント
│   ├── windowManager.js # マルチウィンドウ管理
│   ├── globalShortcuts.js
│   ├── trayManager.js
│   └── store.js        # データ永続化
├── renderer/           # レンダラープロセス (Chromium)
│   ├── index.html
│   ├── preload.js
│   ├── styles/
│   └── scripts/
├── shared/             # 共有設定
├── tests/              # Jestテスト
└── assets/             # アイコンとリソース
```

## 開発

```bash
# 開発モードで起動
npm run dev

# テストを実行
npm test

# カバレッジ付きでテストを実行
npm test -- --coverage
```

## ライセンス

MIT License - 詳細は [LICENSE](LICENSE) を参照してください。

---

Electronとターミナル生産性への愛を込めて作りました。
