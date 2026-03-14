# Project Specification

> Auto-generated: 2026-03-14


## Project Info

```yaml
project:
  name: cli-sticky-notes
  slug: cli-sticky-notes
  type: portfolio
  created: 2026-01-06 07:08:11
  last_updated: 2026-01-06
  status: completed
  version: 1.0.0

portfolio:
  github_repo: ai-agent-portfolio
  visibility: public
  demo_url: "https://github.com/sohei-t/ai-agent-portfolio/tree/main/cli-sticky-notes"

paths:
  agent_dir: ./Desktop/AI-Apps/cli-sticky-notes-agent
  release_dir: ~/Desktop/my-apps/cli-sticky-notes
  portfolio_dir: ~/Desktop/GitHub/ai-agent-portfolio/cli-sticky-notes

workflow:
  1_develop: "このディレクトリ内で開発"
  2_test: "npm testでテスト実行"
  3_release: "./release.sh を実行"
  4_publish: "./publish_to_portfolio.sh を実行"
  5_modify: "このディレクトリに戻って修正"

features:
  - "グローバルホットキー（Cmd+Shift+M）で即座に付箋作成"
  - "クリップボード内容から付箋作成（Cmd+Shift+V）"
  - "6色のカラーテーマで視覚的整理"
  - "タグ付け機能"
  - "常に最前面表示（ピン留め）"
  - "位置・サイズの自動保存"
  - "システムトレイ統合"
  - "複数ウィンドウの独立管理"

tech_stack:
  - "Electron 28.x"
  - "electron-store"
  - "Node.js"
  - "Jest（テスト）"

```