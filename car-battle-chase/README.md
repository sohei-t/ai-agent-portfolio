# Car Battle Chase 🏎️💥

マリオカート風のカーバトルゲーム。可愛らしいデザインの車で敵AIと対戦しよう！

## 🎮 デモ

[▶️ プレイする](https://sohei-t.github.io/ai-agent-portfolio/car-battle-chase/)

[📖 About](https://sohei-t.github.io/ai-agent-portfolio/car-battle-chase/about.html)

[🔊 音声解説](https://sohei-t.github.io/ai-agent-portfolio/car-battle-chase/explanation.mp3)

## 🎯 ゲーム概要

- **ジャンル**: バトルレース
- **プラットフォーム**: モバイル/デスクトップブラウザ
- **操作**: バーチャルジョイスティック / ジャイロ / キーボード

## 🕹️ 操作方法

### モバイル
- **移動**: 画面左側のバーチャルジョイスティック
- **爆弾**: 赤いボタン（後方に投擲）
- **ミサイル**: 青いボタン（追尾攻撃）
- **ジャイロ**: 設定でONにすると傾け操作可能

### デスクトップ
- **移動**: WASD または 矢印キー
- **爆弾**: Space または Z
- **ミサイル**: Shift または X

## ⚔️ 武器

| 武器 | 効果 |
|------|------|
| 💣 爆弾 | 後方に投擲、2秒後に爆発（ダメージ40） |
| 🚀 ミサイル | 前方に発射、最寄りの敵を追尾（ダメージ30） |

## 🤖 敵AI

敵車両は4つの状態で行動:
1. **PATROL**: 巡回中、プレイヤーを探索
2. **CHASE**: プレイヤーを追跡
3. **ATTACK**: 攻撃範囲内で攻撃
4. **EVADE**: ダメージを受けると回避行動

## 🎨 技術スタック

- **描画**: Canvas 2D
- **言語**: VanillaJS (ES6+)
- **モジュール**: ES Modules
- **テスト**: Jest（582テスト、100%合格）
- **画像**: SVGフォールバック対応

## 📊 パフォーマンス

- 60fps安定動作
- オブジェクトプールによるメモリ最適化
- モバイルファーストのレスポンシブデザイン

## 🏆 勝利条件

すべての敵車両を撃破すれば勝利！

## 📁 ファイル構成

```
car-battle-chase/
├── index.html          # ゲーム本体
├── about.html          # プロジェクト解説
├── explanation.mp3     # 音声解説
├── README.md           # このファイル
├── assets/
│   ├── css/styles.css
│   ├── images/*.svg    # ゲームアセット
│   └── audio/          # 音声ファイル
└── js/                 # ゲームロジック
```

## 🤖 開発について

このゲームはClaude CodeのAIエージェントシステムにより完全自動開発されました。

---

Generated with [Claude Code](https://claude.com/code) and AI Agent Workflow
