# Gradius Clone - Horizontal Scrolling Shooter

グラディウスにインスパイアされた横スクロールシューティングゲーム。Phaser 3 + TypeScriptで構築。

## Play Now

**[ライブデモ](https://sohei-t.github.io/ai-agent-portfolio/gradius-clone/)** | **[About](https://sohei-t.github.io/ai-agent-portfolio/gradius-clone/about.html)** | **[音声解説](https://sohei-t.github.io/ai-agent-portfolio/gradius-clone/explanation.mp3)**

## Features

- **クラシックなグラディウススタイル**: 滑らかな横スクロール
- **パワーアップシステム**: 6種類のアップグレード
- **オプションシステム**: 最大4つの追従砲台
- **ボスバトル**: 複数同時出現のボス戦
- **AI生成アセット**: Google Imagen APIによるスプライト

## Power-ups

| アイコン | 名前 | 効果 |
|---------|------|------|
| ⚡ | Speed Up | 移動速度アップ |
| 🚀 | Missile | ホーミングミサイル |
| 🔫🔫 | Double | ツインショット |
| ⚡ | Laser | 貫通レーザー（2倍ダメージ） |
| 🔵 | Option | 追従砲台（最大4つ） |
| 🛡️ | Shield | 防御バリア（3ヒット） |

## Tech Stack

| Category | Technology |
|----------|------------|
| Engine | Phaser 3.80 |
| Language | TypeScript 5 |
| Build Tool | Vite |
| Assets | AI-generated (Google Imagen) |

## Controls

### Desktop
- **Arrow Keys / WASD**: Move
- **Space / Z**: Fire
- **X**: Activate Power-up

### Mobile
- **Touch & Drag**: Move
- **Auto-fire**: Enabled
- **Power-up Button**: On-screen

## Enemy Types

- **Basic**: 直進攻撃
- **Wave Pattern**: 波状移動 + 拡散弾
- **Charge**: 突進行動
- **Boss**: 複数フェーズ攻撃

---

**Developer**: sohei-t
**Built with**: Claude Code AI Agent
