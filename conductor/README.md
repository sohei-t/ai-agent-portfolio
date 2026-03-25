# Web Claude Bridge v2

Web UI から Claude Code の tmux セッションをリアルタイムに操作・監視するブリッジシステム。

## 概要

Web Claude Bridge v2 は、ターミナル上で動作する Claude Code を Web ブラウザから遠隔操作するためのシステムです。SSE（Server-Sent Events）による差分ストリーミングと WebSocket による双方向コマンド送信の二重チャネルアーキテクチャを採用し、低遅延かつ効率的なリアルタイム通信を実現しています。

## 機能一覧

- **セッション管理**: 複数の tmux セッションを一覧表示・切り替え
- **リアルタイム出力表示**: SSE 差分ストリーミングによるターミナル出力のライブ表示
- **コマンド送信**: WebSocket 経由でのテキスト入力・コマンド実行
- **承認/拒否操作**: Claude Code の確認プロンプトに対する Approve / Deny ボタン
- **Ask Peer**: 別の Claude インスタンスへの質問機能
- **Reviewer ペイン**: Worker と Reviewer の分割表示
- **状態検出**: idle / thinking / tool_use / waiting_approval などの自動検出
- **接続状態表示**: WS / SSE の接続状態をステータスバーにリアルタイム表示
- **トースト通知**: 操作結果やエラーのポップアップ通知
- **ダークテーマ**: GitHub Dark 風の配色

## 技術スタック

### フロントエンド
- **React 19** + **TypeScript**
- **Vite 6** (ビルドツール)
- **Tailwind CSS 4**
- **Zustand 5** (状態管理)
- **xterm.js 5** (ターミナルエミュレータ)

### バックエンド
- **Python 3** + **FastAPI**
- **Uvicorn** (ASGI サーバー)
- **SSE-Starlette** (Server-Sent Events)
- **tmux** (セッション管理)

### アーキテクチャ
```
Browser (React)
  ├── SSE ← FastAPI (差分ストリーミング: capture-pane → diff → push)
  └── WS ↔ FastAPI (コマンド: send / approve / deny / ask_peer)
              ↓
         tmux sessions (Claude Code 実行環境)
```

## セットアップ手順

### 前提条件
- Python 3.10+
- Node.js 18+
- tmux

### 1. Python 依存パッケージのインストール
```bash
cd server
pip3 install -r requirements.txt
```

### 2. Node.js 依存パッケージのインストール
```bash
cd frontend
npm install
```

### 3. 起動

#### ワンクリック起動（推奨）
```bash
# launch_app.command をダブルクリック、または:
./launch_app.command
```

#### 手動起動
```bash
# ターミナル1: サーバー起動
cd server
python3 -m uvicorn server:app --host 127.0.0.1 --port 8765

# ターミナル2: フロントエンド起動
cd frontend
npm run dev -- --port 5173
```

### 4. ブラウザでアクセス
```
http://localhost:5173
```

## スクリーンショット

```
+------------------------------------------------------------------+
|  [Session: worker-1 ▼]  [State: thinking]  [Ask Peer]           |
+------------------------------------------------------------------+
|                                                                    |
|  ┌─ Worker: worker-1 ──────────┐ ┌─ Reviewer ──────────────────┐ |
|  │ $ claude                     │ │ Peer response will appear   │ |
|  │                              │ │ here...                     │ |
|  │ I'll help you with that.     │ │                             │ |
|  │ Let me analyze the code...   │ │                             │ |
|  │                              │ │                             │ |
|  │ > Running: cat src/main.ts   │ │                             │ |
|  │ ████████████░░░ thinking     │ │                             │ |
|  └──────────────────────────────┘ └─────────────────────────────┘ |
|                                                                    |
+------------------------------------------------------------------+
|  [Input text here...                    ] [Send] [✓] [✗]         |
+------------------------------------------------------------------+
|  WS: Connected  |  SSE: Connected  |  Session: worker-1  | idle  |
+------------------------------------------------------------------+
```

## ライセンス

MIT
