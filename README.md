# AI Agent Portfolio

> **AIエージェントによる一気通貫の高速アプリ開発** を実証するポートフォリオ

[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Live-success)](https://sohei-t.github.io/ai-agent-portfolio/)
[![Apps](https://img.shields.io/badge/Apps-13+-blue)](#-portfolio-applications)
[![Workflow](https://img.shields.io/badge/Workflow-7%20Phases-purple)](#-development-workflow)

[English](#english) | [日本語](#日本語)

---

<a id="日本語"></a>

## 🎯 概要

このポートフォリオは、**Claude Code + 独自ワークフロー**により、要件定義から本番デプロイまでを自動化した開発プロセスの成果物です。

### 従来の開発との違い

| 観点 | 従来のAI支援開発 | 本ワークフロー |
|------|-----------------|---------------|
| **開発方式** | 逐次処理（1タスクずつ） | **9つのGit Worktreeで物理的並列開発** |
| **思考深度** | 長い会話で文脈が希薄化 | **コンテキスト分割による深い専門思考** |
| **品質管理** | 人間による確認 | **自律評価システムによる自動選択** |
| **成果物** | コードのみ | **ドキュメント・音声解説まで自動生成** |
| **セキュリティ** | 手動チェック | **63パターン自動検出 + 独立監査** |

---

## 🏗️ アーキテクチャ

### Git Worktree による物理的並列開発

```
worktrees/
├── phase1-planning-a/     # 計画案A（保守的アプローチ）
├── phase1-planning-b/     # 計画案B（革新的アプローチ）
├── phase2-impl-prototype-a/   # 実装プロトタイプA
├── phase2-impl-prototype-b/   # 実装プロトタイプB
├── phase2-impl-prototype-c/   # 実装プロトタイプC
├── phase3-testing/        # テスト環境
├── phase4-quality-opt-a/  # 最適化アプローチA
├── phase4-quality-opt-b/  # 最適化アプローチB
└── phase5-delivery/       # 最終成果物
```

**なぜGit Worktreeか？**

1. **物理的なコンテキスト分離**: 各アプローチが独立したディレクトリで開発され、相互干渉を防止
2. **真の並列実行**: 複数のサブエージェントが同時に異なるディレクトリで作業可能
3. **比較評価の容易性**: 複数の実装を並べて評価し、最良を選択

### コンテキスト分割戦略

LLMのコンテキストウィンドウ制限を克服するため、タスクを専門エージェントに分割：

```
メインエージェント（オーケストレーター）
    │
    ├── 要件分析エージェント
    │       └── 深い要件理解に特化（REQUIREMENTS.md生成）
    │
    ├── 設計エージェント
    │       └── アーキテクチャ設計に特化（SPEC.md, TECH_STACK.md生成）
    │
    ├── 実装エージェント（並列×3）
    │       ├── Frontend Developer
    │       ├── Backend Developer
    │       └── Database Engineer
    │
    ├── テストエージェント
    │       └── 品質保証に特化（100%合格まで継続）
    │
    └── ドキュメントエージェント
            └── README, about.html, 音声解説を自動生成
```

**効果**: 各エージェントは自身の専門領域に集中でき、より深い思考が可能

---

## 🔄 開発ワークフロー（7フェーズ）

```
Phase 0: 初期化
    │
    ▼
Phase 1: 並列計画 ──────────────────┐
    │  ├─ Planning A（保守的）      │ 自律評価で
    │  └─ Planning B（革新的）      │ 最良を選択
    │                              │
    ▼ ◀────────────────────────────┘
Phase 2: 並列実装 ──────────────────┐
    │  ├─ Prototype A              │
    │  ├─ Prototype B              │ UX重視の
    │  └─ Prototype C              │ 評価基準で選択
    │                              │
    ▼ ◀────────────────────────────┘
Phase 3: テスト
    │  └─ 100%合格まで自動修正ループ
    │
    ▼
Phase 4: 品質最適化
    │  └─ カバレッジ80-90%目標
    │
    ▼
Phase 5: 完成処理
    │  ├─ README.md自動生成
    │  ├─ about.html自動生成
    │  └─ 音声解説自動生成（GCP TTS）
    │
    ▼
Phase 6: GitHub公開
    │  └─ GitHub Pages自動デプロイ
    │
    ▼
Phase 6.5: セキュリティ検証
       └─ 独立エージェントによる監査
```

### 自律評価システム

複数の実装から最良を選択する評価基準：

```yaml
evaluation_criteria:
  user_experience: 35%    # 最優先！
    - Core Web Vitals準拠
    - 直感的な操作性
    - アクセシビリティ（WCAG 2.1 AA）
    - レスポンシブデザイン

  feature_completeness: 20%
  performance: 15%
  test_quality: 15%
  security: 10%
  maintainability: 5%
```

---

## 📱 Portfolio Applications

### 🤖 Robo Battle シリーズ

| バージョン | 説明 | デモ |
|-----------|------|------|
| [Robo Battle v4](./robo-battle-v4/) | 魔獣召喚システム + 強化CPU AI搭載 | [Live](https://robo-battle-v3-game.web.app/) |
| [Robo Battle v3](./robo-battle-v3/) | WebRTC P2Pオンライン対戦対応 | [Live](https://robo-battle-v3-game.web.app/) |
| [Robo Battle v2](./robo-battle-v2/) | フォトリアル3Dグラフィックス（AI生成スプライト） | [Live](https://sohei-t.github.io/ai-agent-portfolio/robo-battle-v2/) |
| [Robo Battle](./robo-battle/) | 初期版ロボット対戦ゲーム | [Live](https://sohei-t.github.io/ai-agent-portfolio/robo-battle/) |

### 👾 シューティングゲーム

| アプリ名 | 説明 | デモ |
|---------|------|------|
| [Boss Shooter 2](./boss-shooter2/) | 10ステージ構成のボス戦シューティング（改良版） | [Live](https://sohei-t.github.io/ai-agent-portfolio/boss-shooter2/) |
| [Boss Shooting](./boss-shooting/) | レトロスタイル縦スクロールシューティング | [Live](https://sohei-t.github.io/ai-agent-portfolio/boss-shooting/) |
| [Space Shooter](./space-shooter/) | Space Invaders風シューティング | [Live](https://sohei-t.github.io/ai-agent-portfolio/space-shooter/) |
| [Gradius Clone](./gradius-clone/) | グラディウス風横スクロールSTG（Phaser 3） | [Live](https://sohei-t.github.io/ai-agent-portfolio/gradius-clone/) |

### 🎮 その他のゲーム

| アプリ名 | 説明 | デモ |
|---------|------|------|
| [Bowling Adventure v2](./bowling-adventure-v2/) | 3D障害物コースボウリング（Three.js + Cannon.js） | [Live](https://sohei-t.github.io/ai-agent-portfolio/bowling-adventure-v2/) |
| [Bowling Adventure](./bowling-adventure/) | 3Dボウリングゲーム（初期版） | [Live](https://sohei-t.github.io/ai-agent-portfolio/bowling-adventure/) |
| [Dungeon Battles](./dungeon-battles/) | 縦スクロール型ダンジョンRPG | [Live](https://sohei-t.github.io/ai-agent-portfolio/dungeon-battles/) |

### 🛠️ ユーティリティ / その他

| アプリ名 | 説明 | デモ |
|---------|------|------|
| [CLI Sticky Notes](./cli-sticky-notes/) | ターミナル用グローバルホットキー付箋（Electron） | [About](https://sohei-t.github.io/ai-agent-portfolio/cli-sticky-notes/about.html) |
| [Piano App](./piano-app/) | 18種類の楽器音源搭載ピアノアプリ（Web Audio API） | [Live](https://sohei-t.github.io/ai-agent-portfolio/piano-app/) |

---

## 📊 成果

### 定量的実績

- **開発速度**: 要件定義〜デプロイまで **数時間** で完了
- **品質基準**: テストカバレッジ **80-90%** を自動達成
- **ドキュメント**: README + about.html + 音声解説を **100%自動生成**
- **セキュリティ**: **63パターン**の機密ファイル自動除外

### 技術的イノベーション

1. **物理的並列開発**: Git Worktreeによる真の並列処理
2. **深い専門思考**: コンテキスト分割によるエージェント特化
3. **自律品質管理**: UX重視の評価基準による自動選択
4. **エンドツーエンド自動化**: コード→テスト→ドキュメント→デプロイ

---

## 🛠️ 技術スタック

### ワークフロー基盤
- **Claude Code** (Claude Opus 4.5) - メインAIエージェント
- **Git Worktree** - 並列開発環境
- **Task Tool** - サブエージェント並列実行

### 開発ツール
- **Electron** - デスクトップアプリ
- **HTML5 Canvas** - ゲーム開発
- **Jest** - テスト自動化

### インフラ
- **GitHub Pages** - 自動デプロイ
- **GCP Text-to-Speech** - 音声解説生成
- **Vertex AI Imagen** - 画像生成（一部アプリ）

---

## 🎓 このポートフォリオが示すスキル

### AIエンジニアリング
- マルチエージェントシステムの設計・実装
- LLMのコンテキスト管理とプロンプトエンジニアリング
- 自律評価システムの構築

### ソフトウェアエンジニアリング
- テスト駆動開発（TDD）
- CI/CD パイプライン設計
- セキュリティを考慮した開発

### プロセス設計
- 開発ワークフローの自動化
- 品質基準の定量化と自動検証
- 再現可能なテンプレート化

---

## 👤 Author

**Sohei T.**

- GitHub: [@sohei-t](https://github.com/sohei-t)
- Portfolio: [ai-agent-portfolio](https://sohei-t.github.io/ai-agent-portfolio/)

---

<a id="english"></a>

## 🇺🇸 English

### Overview

This portfolio demonstrates **end-to-end AI-driven application development** using Claude Code with a custom workflow system.

### Key Innovations

1. **Physical Parallelism**: 9 Git worktrees enable true parallel development
2. **Context Splitting**: Specialized sub-agents for deeper reasoning
3. **Autonomous Quality Control**: UX-first evaluation criteria (35% weight)
4. **Full Automation**: Requirements → Code → Tests → Docs → Deploy

### Workflow Architecture

```
Phase 0: Initialize → Phase 1: Parallel Planning (2 approaches)
    → Phase 2: Parallel Implementation (3 prototypes)
    → Phase 3: Testing (100% pass required)
    → Phase 4: Quality Optimization (80-90% coverage)
    → Phase 5: Documentation (auto-generated)
    → Phase 6: GitHub Publishing
    → Phase 6.5: Security Verification
```

### Results

- **Speed**: Full apps delivered in hours, not days
- **Quality**: 80-90% test coverage automatically achieved
- **Documentation**: 100% auto-generated (README + about.html + audio)
- **Security**: 63+ patterns for sensitive file detection

---

## 📄 License

MIT License - See individual app directories for details.

---

<p align="center">
  <strong>Built with Claude Code + Custom AI Agent Workflow</strong><br>
  <em>Demonstrating the future of AI-driven software development</em>
</p>
