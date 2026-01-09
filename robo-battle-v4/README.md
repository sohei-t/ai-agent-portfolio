# ROBO BATTLE V4 - Beast Summon Edition

魔獣召喚システムと強化されたCPU AIを搭載した、究極のロボット対戦アクションゲーム。

## Play Now

**[ライブデモ](https://robo-battle-v3-game.web.app/)** | **[About](https://sohei-t.github.io/ai-agent-portfolio/robo-battle-v4/about.html)** | **[音声解説](https://sohei-t.github.io/ai-agent-portfolio/robo-battle-v4/explanation.mp3)**

## V4の新機能

### V4.4: 魔獣召喚システム
- **魔獣召喚アイテム**: AI制御の魔獣を召喚し、対戦相手を攻撃
- **魔獣AI**: 最適距離を維持し、火炎を吐いて自動追尾
- **魔獣スプライト**: 青/赤バリアント、5種類のアニメーション（待機、歩行、ジャンプ、火炎、ダウン）
- **バランス**: HP 45（通常弾3発で撃破）、火炎ダメージ15、プレイヤー1人につき1体

### V4.4: 強化CPU AI
- **積極的アイテム追跡**: CPUが近くのアイテムを積極的に追跡（400px範囲）
- **即座の武器使用**: 取得後すぐに装備武器を発射
- **魔獣優先攻撃**: 脅威がある場合、敵の魔獣を優先的に攻撃

### V4.3: ノックダウンシステム＆新武器
- **ノックダウン機構**: 強力な攻撃でダウン状態に、起き上がりアニメーション付き
- **グリーンドラゴン**: 強力なドラゴンの火炎攻撃
- **メテオストライク**: 上空からの壊滅的な流星群

### V4.2: ガードシステム
- **シールド/ガード**: 攻撃をブロック（しゃがみを置き換え）
- **ガードブレイク**: 強攻撃でガードを崩す

## ゲーム概要

赤いロボット（プレイヤー）と青いロボット（CPU/対戦相手）が1対1で戦うアクションゲーム。
ビームライフル、ジャンプ、キック、そして魔獣召喚を駆使して敵を倒せ！

### ゲームモード

- **VS CPU**: コンピューターとの対戦（難易度: EASY / NORMAL / HARD）
- **ONLINE BATTLE**: WebRTC P2Pによるリアルタイム対戦

## オンライン対戦

V3で実装されたオンライン対戦機能。WebRTC P2Pによるリアルタイム対戦が可能。

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
ホスト側で設定した以下の項目がクライアントに自動反映されます：
- ステージ（背景）
- 難易度
- アイテムモード ON/OFF

## 操作方法

### PC（キーボード）
- 矢印キー左右: 移動
- 上矢印 / スペース: ジャンプ
- Z: ビーム発射（長押しでチャージ）
- X: キック
- C: ガード/シールド

### モバイル（タッチ / ジャイロ）
- 画面左上: ガード
- 画面左下: ジャンプ
- 画面右側: ビーム発射
- 傾きセンサー / バーチャルジョイスティック: 移動

### ジャイロ機能（傾きセンサー）
V1から実装されているスマートフォン向け機能。端末を左右に傾けることで直感的にロボットを移動操作できます。バーチャルジョイスティックとの切り替えも可能。

## 武器アイテム

| 武器 | 説明 | 威力 |
|-----|------|-----|
| Bazooka | 爆発する弾丸 | 高 |
| Machinegun | 高速連射 | 中 |
| Spread Shot | 広角攻撃 | 中 |
| Sword | 近距離斬撃 | 高 |
| Homing Missile | 自動追尾（1発） | 非常に高 |
| Clone | 分身生成 | 特殊 |
| Tiger | 突進攻撃 | 高 |
| Aerial | 空中からの強襲 | 高 |
| Green Dragon | ドラゴン火炎 | 非常に高 |
| Meteor Strike | 流星群 | 非常に高 |
| Beast Summon | AI魔獣コンパニオン | 特殊 |

## カスタマイズシステム

JUMP, WALK, BEAM, KICKに合計20ポイントを振り分け：
- **JUMP**: ジャンプ力（高いほど高くジャンプ）
- **WALK**: 移動速度（高いほど素早く移動）
- **BEAM**: ビーム攻撃力（高いほど高ダメージ）
- **KICK**: キック攻撃力（高いほど高ダメージ）

## ステージ

| ステージ | 背景テーマ |
|---------|-----------|
| NEO CITY | サイバーパンク都市 |
| PYRAMID | 古代エジプト遺跡 |
| PARTHENON | ギリシャ神殿 |
| FACTORY | 巨大ロボット工場 |
| CAVE | クリスタル洞窟 |
| FINAL ARENA | 宇宙チャンピオンシップアリーナ |

## 技術スタック

- **Frontend**: Vanilla JavaScript (ES6+)
- **Graphics**: HTML5 Canvas (60FPS)
- **Online**: WebRTC (P2P), Firebase Realtime Database（シグナリング）
- **Hosting**: Firebase Hosting
- **AI Image Generation**: Vertex AI Imagen 3.0
- **Sprites**: フォトリアル3Dスタイル PNG
- **Beast Sprites**: AI生成デーモンビーストアニメーション

## ファイル構成

```
robo-battle-v4/
├── index.html           # ゲームエントリーポイント
├── game.js              # ゲームロジック（10000+ lines）
├── online-mode.js       # オンライン対戦モジュール
├── firebase-config.js   # Firebase設定
├── assets/
│   ├── sprites/         # ロボット＆魔獣スプライト
│   │   ├── player_*.png # プレイヤーロボット（8ポーズ）
│   │   ├── enemy_*.png  # 敵ロボット（8ポーズ）
│   │   ├── beast_blue_*.png # 青魔獣（5アニメーション）
│   │   └── beast_red_*.png  # 赤魔獣（5アニメーション）
│   └── backgrounds/     # AI生成背景
├── about.html           # 技術解説ページ
└── README.md            # このファイル
```

## Firebase セットアップ（オンライン対戦を有効にする場合）

オンライン対戦機能を使用するには、自分のFirebaseプロジェクトをセットアップする必要があります。

### 手順

1. **Firebaseプロジェクト作成**
   - https://console.firebase.google.com/ にアクセス
   - 新しいプロジェクトを作成

2. **Realtime Database を有効化**
   - 左メニュー「Build」→「Realtime Database」
   - 「Create Database」をクリック
   - リージョン: `asia-southeast1` 推奨

3. **セキュリティルール設定**
   ```json
   {
     "rules": {
       "rooms": {
         "$roomId": {
           ".read": true,
           ".write": true
         }
       }
     }
   }
   ```

4. **Webアプリを追加**
   - プロジェクト設定 → 「アプリを追加」→ Web（</>）
   - 表示される `firebaseConfig` をコピー

5. **設定ファイル作成**
   ```bash
   cp firebase-config.example.js firebase-config.js
   ```
   - コピーした設定値を `firebase-config.js` に貼り付け

6. **（任意）Firebase Hosting にデプロイ**
   ```bash
   npm install -g firebase-tools
   firebase login
   firebase init hosting
   firebase deploy
   ```

## バージョン履歴

| バージョン | 主な機能 |
|-----------|---------|
| V1 | 基本対戦システム、SVGスプライト、ジャイロ操作 |
| V2 | AI生成フォトリアルスプライト＆背景 |
| V3 | オンライン対戦（WebRTC P2P）、アイテムモード、設定同期 |
| V4 | 魔獣召喚、ガードシステム、ノックダウン、強化AI |

---

Generated with [Claude Code](https://claude.com/claude-code)
