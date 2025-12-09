# 画像アセット配置ガイド

## プレイヤー画像の変更方法

現在、プレースホルダーのSVG画像を使用していますが、カスタム画像に簡単に置き換えることができます。

### 推奨画像仕様

#### プレイヤー機体（player_ship）
- **形式**: PNG（透過対応）またはSVG
- **推奨サイズ**: 30×25ピクセル
- **ファイル名**: `player_ship.png` または `player_ship.svg`

#### 敵キャラクター（今後実装予定）
- **形式**: PNG（透過対応）
- **推奨サイズ**: 32×24ピクセル
- **ファイル名**: `enemy_1.png`, `enemy_2.png`, `enemy_3.png`

#### UFO（今後実装予定）
- **形式**: PNG（透過対応）
- **推奨サイズ**: 48×21ピクセル
- **ファイル名**: `ufo.png`

### 画像の置き換え方法

1. 新しい画像ファイルを `src/assets/` フォルダに配置
2. ファイル名を既存のファイル名と同じにするか、index.htmlの以下の行を編集：
   ```javascript
   playerImage.src = 'assets/player_ship.svg';  // この部分を新しいファイル名に変更
   ```

### アニメーション対応

スプライトシート形式の画像も対応可能です。その場合は、index.htmlに以下のような処理を追加してください：

```javascript
// スプライトアニメーション例
const frameWidth = 30;
const frameHeight = 25;
const currentFrame = Math.floor(Date.now() / 100) % totalFrames;
ctx.drawImage(
  playerImage,
  currentFrame * frameWidth, 0,  // ソース位置
  frameWidth, frameHeight,         // ソースサイズ
  player.x, player.y,             // 描画位置
  player.width, player.height     // 描画サイズ
);
```

## パフォーマンス最適化

- 画像は可能な限り最適化してください（TinyPNGなど使用）
- 大きすぎる画像は避けてください（各画像100KB以下推奨）