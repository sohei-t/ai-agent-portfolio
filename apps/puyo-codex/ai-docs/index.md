> Auto-generated Markdown mirror: 2026-07-10

# Prism Cascade Arena

ブラウザで遊べる、独自デザインのコンピュータ対戦型落ちもの連鎖パズルです。2個1組のプリズムを配置し、同色4個以上を消して連鎖とおじゃま攻撃を作ります。

## 起動

最も簡単な方法はmacOSで `launch_app.command` をダブルクリックすることです。手動の場合:

```bash
npm install
npm run dev
```

production納品物だけを確認する場合は、リポジトリルートで `python3 -m http.server 4173 -d project/public` を実行し、`http://.//` を開きます。

## 操作

- `←` / `→`: 左右移動、`↓`: 高速落下、`Space`: 即時落下
- `Z` / `X`: 反時計/時計回転、`P` / `Escape`: 一時停止
- スマートフォン: アリーナ下の44px以上の操作ボタン
- `HOW TO PLAY`: ルールと全操作、`SOUND ON/OFF`: 合成効果音切替、`RETRY`: 再戦

## CPU

CPUは各列と4回転の合法候補をシミュレートし、消去数、連鎖、攻撃、最大高さ、凹凸、穴、出現地点の危険度を評価します。初級は候補間引きと評価ノイズ、中級は全候補、上級は高精度・高速操作です。探索はWeb Workerで行い、利用できない場合は非同期fallbackへ切り替えます。

## 技術と構造

Vite、strict TypeScript、Canvas 2D、semantic DOM/CSS、Web Worker、Web Audio API、Vitest、ESLint。純粋ゲームロジックを`src/engine.ts`に分離し、描画・入力・音・CPU transportは`src/main.ts`等のbrowser adapterが担当します。外部サーバー/API/データベース/第三者assetはありません。

## テスト

```bash
npm run check
```

lint、型検査、18件のunit test、production buildを実行します。Phase 4時点ですべて成功し、`npm audit --omit=dev`は脆弱性0件でした。

## 音声・制約

- 説明音声`explanation.mp3`はありません。今回は課金APIの無断使用を禁止しているため、GCP Text-to-Speechを呼び出していません。代わりに`audio_script.txt`を同梱しています。
- ゲーム内効果音はWeb Audio APIによるコード生成で、初回ユーザー操作後に端末内で鳴ります。
- online対戦、アカウント、ゲーム途中保存はスコープ外です。
- Vite module/Workerのため`file://`直開きではなくローカルHTTP serverを使います。

## 公開用ファイル

- `project/public/index.html`, `assets/`: ゲーム本体
- `project/public/about.html`: 日英プロジェクト紹介（日本語既定）
- `project/public/README.md`, `audio_script.txt`: 操作/説明
- `project/public/ai-docs/`: AI向け設計文書
- `project/public/docs/`: 階層型仕様・操作サイト（音声なし）
- `launch_app.command`: ローカル起動
