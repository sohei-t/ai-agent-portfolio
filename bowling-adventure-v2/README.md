# Bowling Adventure

Three.jsとCannon.js物理エンジンで構築された革新的な3D障害物コースボウリングゲームです。障害物や地形の変化を乗り越えながらボウリングボールを操作し、ピンを倒しましょう！

## デモ

[Bowling Adventureをプレイする](https://sohei-t.github.io/ai-agent-portfolio/bowling-adventure/)

## 特徴

- **3D物理ベースのゲームプレイ**: Cannon.jsによるリアルなボールとピンの物理演算
- **障害物コース**: 岩、バリア、地形の変化を乗り越えながら進む
- **複数の地形タイプ**:
  - 標準の芝生レーン
  - 砂地セクション（高摩擦でボールが減速）
  - 氷セクション（低摩擦で滑りやすく高速）
- **デュアルコントロールシステム**:
  - バーチャルジョイスティック（デフォルト）による精密操作
  - モバイルデバイス向けチルト/ジャイロスコープ操作（iOS 18対応）
- **完全な10フレームボウリング**: ストライクとスペアを含む完全なボウリングスコアリングシステム
- **レスポンシブデザイン**: デスクトップとモバイルデバイスの両方に対応
- **美しい3D環境**: 空、雲、遠くの丘、影の表現

## 技術スタック

| カテゴリ | 技術 |
|----------|------------|
| **3Dレンダリング** | Three.js (v0.160.0) |
| **物理エンジン** | Cannon-es (v0.20.0) |
| **入力処理** | DeviceOrientation API, Touch Events |
| **ビルドツール** | Vite (v5.0.10) |
| **テスト** | Vitest (v1.1.0) |
| **言語** | JavaScript (ES Modules) |

## 遊び方

1. **ゲーム開始**: タイトル画面で「Start Game」をクリック
2. **ボールを操作**:
   - **ジョイスティックモード**（デフォルト）: バーチャルジョイスティックをドラッグしてボールを転がす
   - **チルトモード**: デバイスを傾けてボールを操作（「Joystick」ボタンをタップして切り替え）
3. **障害物を避ける**: 岩やバリアを避け、地形を有効活用する
4. **ピンを倒す**: 障害物コースを抜けてピンに当てる
5. **得点する**: 標準的なボウリングのスコアリング - ストライク（1投で10本）とスペア（2投で10本）
6. **10フレームを完了**: 全10フレームをプレイして最終スコアを獲得

### ヒント

- 障害物の手前で減速するために砂地セクションを活用
- スピードブーストには氷セクションを利用
- スピードゲージで現在のボール速度を確認できる
- コースから落ちるとガターボール扱い（0点）

## インストール

### 必要条件

- Node.js 18.x以上
- npm 9.x以上

### セットアップ

```bash
# リポジトリをクローン
git clone https://github.com/sohei-t/ai-agent-portfolio.git
cd ai-agent-portfolio/bowling-adventure

# 依存関係をインストール
npm install

# 開発サーバーを起動
npm run dev

# ブラウザで http://localhost:5173 を開く
```

### 本番用ビルド

```bash
# 最適化バージョンをビルド
npm run build

# 本番ビルドをプレビュー
npm run preview
```

## テストの実行

```bash
# テストを1回実行
npm test

# ウォッチモードでテストを実行
npm run test:watch

# カバレッジ付きでテストを実行
npm run test:coverage
```

### テストカバレッジ

このプロジェクトには以下の包括的なテストが含まれています：

- `BowlingScore.js` - スコアリングロジック（ストライク、スペア、フレーム完了）
- `Ball.js` - ボールエンティティの作成と物理
- `Pins.js` - ピン管理と倒れ検出
- `Course.js` - コース作成と地形タイプ
- `Controls.js` - 入力処理（ジョイスティックとジャイロスコープ）

## プロジェクト構成

```
bowling-adventure/
├── index.html          # メインHTMLエントリーポイント
├── package.json        # 依存関係とスクリプト
├── vite.config.js      # Vite設定
├── src/
│   ├── main.js         # エントリーポイント - ゲームインスタンスを作成
│   ├── BowlingGame.js  # メインゲームコントローラー
│   ├── BowlingScore.js # ボウリングスコアリングシステム
│   ├── Controls.js     # ジョイスティックとジャイロスコープ入力
│   ├── Course.js       # 障害物コース作成
│   ├── UI.js           # HUDと画面管理
│   └── entities/
│       ├── Ball.js     # ボウリングボールエンティティ
│       └── Pins.js     # ピンエンティティと管理
└── tests/
    └── *.test.js       # ユニットテスト
```

## アーキテクチャ

### ゲームループ

```
BowlingGame.animate()
├── 物理更新 (Cannon.js world.step)
├── ゲーム状態更新
│   ├── 入力処理 (Controls.getInput)
│   ├── ボール移動 (Ball.applyInput)
│   ├── カメラ追従
│   └── ピン検出
└── レンダリング (Three.js renderer.render)
```

### ステートマシン

```
title -> playing -> throwing -> waiting -> result
  ^                                          |
  └──────────── restartGame ─────────────────┘
```

## 操作リファレンス

| 操作 | デスクトップ | モバイル |
|---------|---------|--------|
| ボール移動 | ジョイスティックをドラッグ | ジョイスティックをドラッグまたはデバイスを傾ける |
| モード切替 | トグルボタンをクリック | トグルボタンをタップ |
| ゲーム開始 | 「Start Game」をクリック | 「Start Game」をタップ |
| リスタート | 「Play Again」をクリック | 「Play Again」をタップ |

## ブラウザサポート

- Chrome 90以上
- Firefox 88以上
- Safari 14以上
- Edge 90以上
- Mobile Safari (iOS 14以上)
- Android版Chrome

## パフォーマンス

- 60fpsゲームプレイに最適化
- リアルな照明のためのシャドウマッピング
- スリープ検出による効率的な物理演算
- 画面サイズに適応するレスポンシブデザイン

## 開発者向けメモ

### 新しい障害物の追加

```javascript
// Course.js内
this.createRock(new THREE.Vector3(x, 0, z), size);
this.createBarrier(new THREE.Vector3(x, 0, z), width, height, rotation);
```

### 新しい地形タイプの追加

```javascript
// Course.js内
this.createTerrainSection({
  start: 10,
  end: 20,
  color: 0xHEXCOLOR,
  friction: 0.0 - 1.0,
  restitution: 0.0 - 1.0,
  name: 'terrainName'
});
```

## ライセンス

MITライセンス - 詳細はLICENSEファイルを参照してください。

## クレジット

使用技術:
- [Three.js](https://threejs.org/) - 3Dグラフィックスライブラリ
- [Cannon-es](https://pmndrs.github.io/cannon-es/) - 物理エンジン
- [Vite](https://vitejs.dev/) - ビルドツール

---

[Claude Code](https://github.com/anthropics/claude-code)とAI Agent Workflowで生成
