# ROBO BATTLE V2 - Photorealistic 3D Graphics Edition

フォトリアルな3Dグラフィックスでパワーアップした、次世代ロボット対戦アクションゲーム。

## 🎮 Play Now

**[🕹️ Live Demo](https://sohei-t.github.io/ai-agent-portfolio/robo-battle-v2/)** | **[📖 About](https://sohei-t.github.io/ai-agent-portfolio/robo-battle-v2/about.html)** | **[🔊 音声解説](https://sohei-t.github.io/ai-agent-portfolio/robo-battle-v2/explanation.mp3)**

## ✨ V2の新機能

- **AI生成3Dスプライト**: Vertex AI Imagenで生成した16種類のフォトリアルなロボット画像
- **フォトリアル背景**: 6種類のAI生成シネマティック背景
- **スムーズなアニメーション**: 歩行・ジャンプ・攻撃・被ダメージ・KOの各ポーズ
- **強化されたビジュアルエフェクト**: グロー効果、フラッシュエフェクト

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
- **フォトリアル3Dグラフィックス**: AI生成の高品質スプライト＆背景
- **モバイル対応**: ジャイロセンサーとタッチ操作に完全対応

## 🛠 技術スタック

- **Frontend**: Vanilla JavaScript (ES6+)
- **Graphics**: HTML5 Canvas (60FPS)
- **AI Image Generation**: Vertex AI Imagen 3.0 (22 images)
- **Sprites**: Photorealistic 3D-style PNG (512x512)
- **Backgrounds**: Cinematic 16:9 JPG (1024x576)
- **Mobile**: DeviceOrientation API, Touch Events

## 📁 ファイル構成

```
robo-battle-v2/
├── index.html           # ゲームエントリーポイント
├── game.js              # ゲームロジック（3400+ lines）
├── assets/
│   ├── sprites/         # 16種類のAI生成3Dスプライト
│   │   ├── player_*.png # プレイヤーロボット（8ポーズ）
│   │   └── enemy_*.png  # 敵ロボット（8ポーズ）
│   └── backgrounds/     # 6種類のAI生成背景
│       └── bg_*.jpg     # フォトリアル背景画像
├── about.html           # 技術解説ページ
└── README.md            # このファイル
```

## 🎨 AI生成アセット

### ロボットスプライト（各キャラクター8種）
| ポーズ | 説明 |
|-------|------|
| idle | 待機ポーズ |
| walk1/walk2 | 歩行アニメーション |
| jump | ジャンプ中 |
| beam | ビーム発射 |
| kick | キック攻撃 |
| hit | 被ダメージ |
| ko | 敗北・倒れ |

### 背景画像（6ステージ）
| ステージ | 背景テーマ |
|---------|-----------|
| Urban City | サイバーパンク東京 |
| Pyramid | 古代エジプト＋テクノロジー |
| Parthenon | ギリシャ神殿＋未来技術 |
| Factory | 巨大ロボット工場 |
| Cave | 生物発光クリスタル洞窟 |
| Neo City | 宇宙チャンピオンシップアリーナ |

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
- **AI画像生成**: Vertex AI Imagen 3.0
- **画像生成コスト**: $0.44（22画像 × $0.02）
- **コード品質**: ESLint準拠
- **AI支援**: Claude Code + AI Agent Workflow

## 🔄 V1からの変更点

| 項目 | V1 | V2 |
|------|-----|-----|
| スプライト | SVGベースピクセルアート | AI生成フォトリアル3D |
| 背景 | プロシージャル描画 | AI生成シネマティック |
| アニメーション | 2種類（idle/walk） | 8種類（全ポーズ） |
| ビジュアル品質 | レトロ8bit風 | 次世代フォトリアル |

---

Generated with [Claude Code](https://claude.com/claude-code) and [Vertex AI Imagen](https://cloud.google.com/vertex-ai/docs/generative-ai/image/overview)
