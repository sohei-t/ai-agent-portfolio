# AI駆動開発ポートフォリオ

[English](#english) | 日本語

自然言語の指示一つから、フルスタックアプリケーションの設計・実装・テスト・ドキュメント作成・デプロイまでを自律的に行うAIエージェントシステムです。

## ポートフォリオカテゴリ

### 1. 開発自動化ツール
| プロジェクト | 説明 | 技術スタック | リンク |
|-------------|------|-------------|--------|
| **slack-bridge-for-claude-code** | Slack↔Claude Code 双方向ブリッジ（モバイルからAI開発を制御） | Node.js, Slack Bot API, tmux | [GitHub](https://github.com/sohei-t/slack-bridge-for-claude-code) |
| **video-generator-agent** | HTMLスライド + MP3 → YouTube用MP4自動生成 | Playwright, Whisper, ffmpeg | [GitHub](https://github.com/sohei-t/video-generator-agent) |
| **training-content-progress-tracker** | リアルタイム研修進捗ダッシュボード | FastAPI, Vue.js 3, WebSocket | [GitHub](https://github.com/sohei-t/training-content-progress-tracker) |
| **ai-orchestrator** | AIワークフロー可視化ダッシュボード | React, WebSocket | [詳細](https://sohei-t.github.io/ai-agent-portfolio/ai-orchestrator/about.html) |
| **claude-agent-skills** | Claude Code拡張スキルコレクション | Python, Shell | [GitHub](https://github.com/sohei-t/claude-agent-skills) |

### 2. 生産性向上ツール
| プロジェクト | 説明 | 技術スタック | テストカバレッジ |
|-------------|------|-------------|-----------------|
| **budget-tracker** | WBSベースのタスク・予算管理SPA | React 19, TypeScript, Express, SQLite | 97.92% |
| **text-diff-editor** | Myersアルゴリズム搭載マルチパネル差分エディタ | React, TypeScript, File System Access API | 高 |
| **piano-app** | 18楽器対応バーチャルピアノ | React 18, Web Audio API | 100% |
| **cli-sticky-notes** | グローバルホットキー付きターミナル付箋 | Electron, Node.js | - |
| **content-viewer** | コンテンツビューアアプリ | JavaScript | - |
| **picture-merge-app-v2** | 画像合成ツール | JavaScript | - |

### 3. ゲーム開発（Canvas/WebGL/Three.js）
| プロジェクト | 説明 | 主要技術 |
|-------------|------|---------|
| **robo-battle** シリーズ (v1-v5) | ロボットバトルゲームの進化 | Canvas, WebRTC, Vertex AI Imagen |
| **boss-shooter2** | 全10ステージのボスシューティング | Canvas, モバイルジャイロ操作 |
| **bowling-adventure** (v1-v2) | 3Dボウリングゲーム | Three.js, Cannon.js |
| **gradius-clone** | 横スクロールSTG | Phaser 3 |
| **space-shooter** | スペースインベーダー風アーケード | Canvas |
| **dungeon-battles** | 縦スクロールダンジョンRPG | Canvas |

## 開発ワークフロー

すべてのアプリケーションは、7フェーズのワークフローで自律的に構築されます：

```
Phase 0: 初期化 → Phase 1: 設計（×2 並列） → Phase 2: 実装（×3 並列）
→ Phase 3: テスト（100%パス） → Phase 4: 品質（カバレッジ 80-90%）
→ Phase 5: ドキュメント → Phase 6: GitHubデプロイ
```

- **9つのGit Worktree** による真の並列開発
- **自律的UX重み付け評価**（UX 35%、機能 20%、パフォーマンス 15%）
- **Claude Code Action** による全リポジトリの自動PRレビュー
- **TDDアプローチ** でテストカバレッジ最大97.92%

## ライブポートフォリオ

**[ポートフォリオを見る](https://sohei-t.github.io/ai-agent-portfolio/)**

## 技術スタック

**フロントエンド:** React 18/19, TypeScript, Vue.js 3, Tailwind CSS, Vite  
**バックエンド:** FastAPI, Express.js, Node.js  
**ゲーム:** Canvas, WebGL, Three.js, Phaser 3  
**リアルタイム:** WebSocket, WebRTC, Slack Bot API  
**AI/自動化:** Claude Code, GitHub Actions, Gemini TTS, Vertex AI Imagen  
**テスト:** Vitest, 97%+カバレッジ  
**インフラ:** GitHub Pages, Firebase Hosting

---

<a id="english"></a>

# AI-Driven Development Portfolio

English | [日本語](#ai駆動開発ポートフォリオ)

Autonomous AI agent system that builds, tests, documents, and deploys full-stack applications — from a single natural language instruction.

## Portfolio Categories

### 1. Development Automation Tools
| Project | Description | Tech Stack | Links |
|---------|-------------|------------|-------|
| **slack-bridge-for-claude-code** | Bidirectional Slack↔Claude Code bridge for mobile AI dev control | Node.js, Slack Bot API, tmux | [GitHub](https://github.com/sohei-t/slack-bridge-for-claude-code) |
| **video-generator-agent** | HTML slides + MP3 → YouTube MP4 auto-generation | Playwright, Whisper, ffmpeg | [GitHub](https://github.com/sohei-t/video-generator-agent) |
| **training-content-progress-tracker** | Real-time training progress dashboard | FastAPI, Vue.js 3, WebSocket | [GitHub](https://github.com/sohei-t/training-content-progress-tracker) |
| **ai-orchestrator** | AI workflow visualization dashboard | React, WebSocket | [About](https://sohei-t.github.io/ai-agent-portfolio/ai-orchestrator/about.html) |
| **claude-agent-skills** | Claude Code extension skills collection | Python, Shell | [GitHub](https://github.com/sohei-t/claude-agent-skills) |

### 2. Productivity Tools
| Project | Description | Tech Stack | Test Coverage |
|---------|-------------|------------|---------------|
| **budget-tracker** | WBS-based task & budget management SPA | React 19, TypeScript, Express, SQLite | 97.92% |
| **text-diff-editor** | Multi-panel diff editor with Myers algorithm | React, TypeScript, File System Access API | High |
| **piano-app** | 18-instrument virtual piano | React 18, Web Audio API | 100% |
| **cli-sticky-notes** | Terminal sticky notes with global hotkey | Electron, Node.js | - |
| **content-viewer** | Content viewer application | JavaScript | - |
| **picture-merge-app-v2** | Image merge tool | JavaScript | - |

### 3. Game Development (Canvas/WebGL/Three.js)
| Project | Description | Key Technology |
|---------|-------------|---------------|
| **robo-battle** series (v1-v5) | Evolution of robot battle game | Canvas, WebRTC, Vertex AI Imagen |
| **boss-shooter2** | 10-stage boss shooting game | Canvas, Mobile Gyro Controls |
| **bowling-adventure** (v1-v2) | 3D bowling game | Three.js, Cannon.js |
| **gradius-clone** | Side-scrolling STG | Phaser 3 |
| **space-shooter** | Space Invaders-style arcade | Canvas |
| **dungeon-battles** | Vertical-scroll dungeon RPG | Canvas |

## Development Workflow

All applications are built autonomously through a 7-phase workflow:

```
Phase 0: Init → Phase 1: Planning (×2 parallel) → Phase 2: Implementation (×3 parallel)
→ Phase 3: Testing (100% pass) → Phase 4: Quality (coverage 80-90%)
→ Phase 5: Documentation → Phase 6: GitHub Deploy
```

- **9 Git Worktrees** for true parallel development
- **Autonomous UX-weighted evaluation** (UX 35%, Features 20%, Performance 15%)
- **Claude Code Action** for automated PR review on all repositories
- **TDD approach** with test coverage up to 97.92%

## Live Portfolio

**[View Portfolio](https://sohei-t.github.io/ai-agent-portfolio/)**

## Tech Stack

**Frontend:** React 18/19, TypeScript, Vue.js 3, Tailwind CSS, Vite  
**Backend:** FastAPI, Express.js, Node.js  
**Game:** Canvas, WebGL, Three.js, Phaser 3  
**Real-time:** WebSocket, WebRTC, Slack Bot API  
**AI/Automation:** Claude Code, GitHub Actions, Gemini TTS, Vertex AI Imagen  
**Testing:** Vitest, 97%+ coverage  
**Infrastructure:** GitHub Pages, Firebase Hosting

---

Built with [Claude Code](https://claude.ai/claude-code) | Powered by Claude Opus 4.6
