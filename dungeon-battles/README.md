# Dungeon Battles - Vertical Scrolling Action RPG

縦スクロール型ダンジョンRPG。廃墟ダンジョンを探索し、敵とリアルタイムバトルを行いながらボスを倒すアクションRPG。

## Play Now

**[ゲームをプレイ](https://sohei-t.github.io/ai-agent-portfolio/dungeon-battles/index.html)**

## About

**[プロジェクト解説ページ](https://sohei-t.github.io/ai-agent-portfolio/dungeon-battles/about.html)** - 技術詳細・開発プロセス・アーキテクチャの解説

## Features

- **リアルタイムバトルシステム**: 通常攻撃と魔法攻撃
- **5ステージ構成**: 徐々に強くなる敵とボス戦
- **アイテムシステム**: HP/MP回復アイテム
- **ドロップシステム**: 武器・魔法の強化
- **エフェクトシステム**: 攻撃・死亡エフェクト
- **スコアシステム**: ボーナス付き
- **コンティニュー機能**: 3回まで
- **レスポンシブデザイン**: PC & モバイル対応

## Tech Stack

| Category | Technology |
|----------|------------|
| Language | JavaScript (ES6 Modules) |
| Graphics | HTML5 Canvas |
| Architecture | Component-Based |
| Platform | Web (PC & Mobile) |

## Controls

### Desktop
- **Arrow Keys**: Move
- **Space**: Normal Attack
- **B**: Magic Attack

### Mobile
- **Virtual Joystick**: Move
- **Attack Button**: Normal Attack
- **Magic Button**: Magic Attack

## Game Structure

| Stage | Enemy | HP |
|-------|-------|-----|
| 1 | Enemy 1 | 30 |
| 2 | Enemy 2 | 50 |
| 3 | Enemy 3 | 70 |
| 4 | Enemy 4 | 90 |
| Boss | Boss | 300 |

## Player Stats

- **HP**: 100
- **MP**: 50
- **Attack**: 10
- **Magic Attack**: 20 (Cost: 10 MP)

## Architecture

```
dungeon-battles/
├── index.html          # Main entry
├── src/
│   ├── game/           # Core game logic
│   ├── entities/       # Game entities
│   ├── systems/        # Game systems
│   ├── ui/             # UI components
│   └── states/         # Game states
├── styles/             # CSS
├── assets/             # Images & sprites
└── config/             # Game configuration
```

---

**Developer**: sohei-t
**Built with**: Claude Code AI Agent
