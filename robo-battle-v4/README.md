# ROBO BATTLE V3 - Online Multiplayer Edition

オンライン対戦機能を搭載した、次世代ロボット対戦アクションゲーム。

## 🎮 Play Now

**[🕹️ ライブデモ](https://robo-battle-v3-game.web.app)** | **[📖 About](https://robo-battle-v3-game.web.app/about.html)** | **[🔊 音声解説](https://robo-battle-v3-game.web.app/explanation.mp3)**

## ✨ V3の新機能

- **オンライン対戦**: WebRTC P2Pによるリアルタイム対戦
- **ルーム作成/参加**: 6桁のルームコードで友達と対戦
- **設定同期**: ホストの設定（ステージ・難易度・アイテム）がクライアントに反映
- **アイテムモード**: ワープゾーン、デスゾーン、パワーアップアイテム
- **フォトリアル背景**: 6種類のAI生成シネマティック背景
- **スムーズなアニメーション**: 全16種類のロボットスプライト

## 🤖 ゲーム概要

赤いロボット（プレイヤー）と青いロボット（CPU/対戦相手）が1対1で戦うアクションゲーム。
ビームライフル、ジャンプ、キックを駆使して敵を倒せ！

### ゲームモード

- **VS CPU**: コンピューターとの対戦（難易度選択可能）
- **ONLINE BATTLE**: インターネット経由でリアルタイム対戦

### 操作方法

**PC（キーボード）**
- 矢印キー左右: 移動
- 上矢印 / スペース: ジャンプ
- Z: ビーム発射（長押しでチャージ）
- X: キック

**モバイル**
- 画面左: ビーム発射
- 画面中央上: ジャンプ
- 画面右: キック
- バーチャルジョイスティック / 傾きセンサー: 移動

## 🌐 オンライン対戦

### ホスト（部屋を作る）
1. ONLINE BATTLE を選択
2. CREATE ROOM をクリック
3. 表示される6桁のルームコードを相手に伝える
4. 相手が参加したら START BATTLE

### クライアント（部屋に参加）
1. ONLINE BATTLE を選択
2. JOIN ROOM をクリック
3. ホストから教えてもらったルームコードを入力
4. ホストがバトルを開始するのを待つ

### オンライン設定同期
ホスト側で設定した以下の項目がクライアントに反映されます：
- ステージ（背景）
- 難易度
- アイテムモード ON/OFF

## 🎯 カスタマイズシステム

JUMP, WALK, BEAM, KICKに合計20ポイントを振り分け：
- **JUMP**: ジャンプ力（高いほど高くジャンプ）
- **WALK**: 移動速度（高いほど速く移動）
- **BEAM**: ビーム攻撃力（高いほど高ダメージ）
- **KICK**: キック攻撃力（高いほど高ダメージ）

## 🗺️ ステージ

| ステージ | 背景テーマ |
|---------|-----------|
| NEO CITY | サイバーパンク都市 |
| PYRAMID | 古代エジプト遺跡 |
| PARTHENON | ギリシャ神殿 |
| FACTORY | 巨大ロボット工場 |
| CAVE | クリスタル洞窟 |
| FINAL ARENA | 宇宙チャンピオンシップアリーナ |

## 🛠 技術スタック

- **Frontend**: Vanilla JavaScript (ES6+)
- **Graphics**: HTML5 Canvas (60FPS)
- **Online**: WebRTC (P2P), Firebase Realtime Database (Signaling)
- **Hosting**: Firebase Hosting
- **AI Image Generation**: Vertex AI Imagen 3.0
- **Sprites**: Photorealistic 3D-style PNG (512x512)
- **Backgrounds**: Cinematic 16:9 JPG (1024x576)

## 📁 ファイル構成

```
robo-battle-v3/
├── index.html           # ゲームエントリーポイント
├── game.js              # ゲームロジック（5500+ lines）
├── online-mode.js       # オンライン対戦モジュール
├── firebase-config.js   # Firebase設定
├── assets/
│   ├── sprites/         # 16種類のAI生成3Dスプライト
│   │   ├── player_*.png # プレイヤーロボット（8ポーズ）
│   │   └── enemy_*.png  # 敵ロボット（8ポーズ）
│   └── backgrounds/     # 6種類のAI生成背景
│       └── bg_*.jpg     # フォトリアル背景画像
├── about.html           # 技術解説ページ
└── README.md            # このファイル
```

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
- **AI支援**: Claude Code + AI Agent Workflow

## 🔄 バージョン履歴

| バージョン | 主な機能 |
|-----------|---------|
| V1 | 基本対戦システム、SVGスプライト |
| V2 | AI生成フォトリアルスプライト＆背景 |
| V3 | オンライン対戦、アイテムモード、設定同期 |

---

Generated with [Claude Code](https://claude.com/claude-code) and [Firebase](https://firebase.google.com/)
