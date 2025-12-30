# Space Shooter Game

Space Invaders風のシューティングゲーム。レトロな雰囲気とモダンな演出を融合。

## Play Now

**[ゲームをプレイ](https://sohei-t.github.io/ai-agent-portfolio/space-shooter/index.html)**

## About

**[プロジェクト解説ページ](https://sohei-t.github.io/ai-agent-portfolio/space-shooter/about.html)** - 技術詳細・開発プロセス・アーキテクチャの解説

## Features

- **レスポンシブデザイン**: スマホ〜デスクトップまで対応（320px〜2560px）
- **パワーアップシステム**: Rapid Fire / Shield / Multi-Shot
- **UFOボーナス**: 特別ポイント獲得チャンス
- **破壊可能シールド**: 戦略的な防御要素
- **ステージクリア演出**: 花火エフェクト付き祝賀画面
- **タッチコントロール**: スマホでも快適にプレイ
- **レトロサウンド**: Web Audio APIによる動的生成

## Tech Stack

| Category | Technology |
|----------|------------|
| Language | JavaScript (Pure) |
| Graphics | HTML5 Canvas API |
| Audio | Web Audio API |
| Architecture | Entity-Component-System |
| Test Coverage | 91.82% |

## Controls

### Desktop
- **Arrow Keys / WASD**: Move
- **Space**: Shoot
- **P**: Pause

### Mobile
- **Touch Left/Right**: Move
- **Tap Center**: Shoot

## Architecture

```
space-shooter/
├── index.html          # Main entry
├── style.css           # Styles
├── core/               # Game engine
├── entities/           # Game objects (Player, Enemy, etc.)
├── systems/            # Game systems (Collision, Sound, etc.)
├── ui/                 # UI components (Menu, HUD, etc.)
└── utils/              # Utilities
```

## Development

Built with AI-assisted development workflow:
- Test-Driven Development (TDD)
- Automated quality assurance
- 91.82% test coverage

---

**Developer**: sohei-t
**Built with**: Claude Code AI Agent
