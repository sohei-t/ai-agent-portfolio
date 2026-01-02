# ROBO BATTLE

1985年のMSX用ゲーム「WARROID」にインスパイアされた、レトロスタイルのロボット対戦アクションゲーム。

## 🎮 Play Now

**[Live Demo](https://sohei-t.github.io/ai-agent-portfolio/robo-battle/)**

## 🤖 ゲーム概要

赤いロボット（プレイヤー）と青いロボット（CPU）が1対1で戦うアクションゲーム。
ビームライフル、ジャンプ、キックを駆使して敵を倒せ！

### 操作方法

**PC（キーボード）**
- 矢印キー左右: 移動
- 上矢印 / スペース: ジャンプ
- Z: ビーム発射
- X: キック

**モバイル**
- 画面左: ビーム発射
- 画面中央上: ジャンプ
- 画面右: キック
- 傾きセンサー / ジョイスティック: 移動

### ゲームの特徴

- **カスタマイズシステム**: JUMP, WALK, BEAM, KICKに20ポイントを振り分け
- **6ステージ**: シティ → ピラミッド → パルテノン → ファクトリー → ケイブ → フューチャーシティ
- **レトロピクセルアート**: 80年代MSXゲームを彷彿させるビジュアル
- **モバイル対応**: ジャイロセンサーとタッチ操作に完全対応

## 🛠 技術スタック

- **Frontend**: Vanilla JavaScript (ES6+)
- **Graphics**: HTML5 Canvas (60FPS)
- **Sprites**: SVG-based pixel art
- **Mobile**: DeviceOrientation API, Touch Events
- **Testing**: Jest (98 tests, 100% pass)

## 📁 ファイル構成

```
robo-battle/
├── index.html      # ゲームエントリーポイント
├── game.js         # ゲームロジック（1900+ lines）
├── assets/
│   └── sprites.svg # SVGスプライト集
├── about.html      # 技術解説ページ
└── README.md       # このファイル
```

## 🎯 ゲームシステム

### ロボットステータス
- **HP**: 体力（0になると敗北）
- **JUMP**: ジャンプ力（高いほど高くジャンプ）
- **WALK**: 移動速度（高いほど速く移動）
- **BEAM**: ビーム攻撃力（高いほど高ダメージ）
- **KICK**: キック攻撃力（高いほど高ダメージ）

### 敵AIの特徴
- 距離に応じた戦術変更
- ジャンプ回避
- ビーム予測射撃
- 接近戦でのキック攻撃

## 🔧 ローカル実行

```bash
# 簡易サーバーで起動
python3 -m http.server 8080

# ブラウザで開く
open http://localhost:8080
```

## 📊 開発情報

- **開発期間**: 2026年1月
- **テスト**: 98テスト / 100%合格
- **コード品質**: ESLint準拠
- **AI支援**: Claude Code + AI Agent Workflow

---

Generated with [Claude Code](https://claude.com/claude-code) and AI Agent Workflow System
