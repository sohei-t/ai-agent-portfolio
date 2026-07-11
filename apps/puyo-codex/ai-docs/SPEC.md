# Project Specification

> Auto-generated: 2026-07-10

# Prism Cascade Arena — 要件定義（計画案B）

## 1. プロジェクト概要

独自英語名 **Prism Cascade Arena** を持つ、ブラウザで遊べる1人用対CPU落ちもの連鎖パズルを制作する。既存作品の名称・ロゴ・キャラクター・素材・固有画面構成を使わず、「偏光プリズムが共鳴するアリーナ」をテーマにCanvas、CSS、Web Audio APIだけで独自表現する。外部サーバー、外部API、課金サービス、認証、データベースは不要。ローカルHTTPサーバーで起動できる静的アプリとする。

本案の革新軸は、ゲーム結果を一切変えない非同期CPUプランナー、決定論的な純粋ゲームエンジン、色だけに依存しないピース表現、短い対戦でも判断が生まれる「次手予告＋危険度表示」である。

## 2. スコープと前提

- 盤面は各プレイヤー6列×12表示行＋上部2隠し行。座標原点は左上。
- 通常色は5色。各セルは色に加えて形状・模様を持ち、色覚差に配慮する。
- アクティブピースは軸セルと衛星セルの2個1組。上・右・下・左の4方向へ回転する。
- 1ゲームは同一ブラウザ内のプレイヤー対CPU。オンライン対戦や保存アカウントは対象外。
- 乱数は注入可能なseed付きPRNGを使い、テストと不具合再現を可能にする。
- ルール定数は独自値として一箇所に集約し、既存作品の固有得点表や演出を模倣しない。

## 3. 機能要件

### CRITICAL（Phase 2のMVP、欠落時は未完成）

| ID | 要件 | 検証可能な受入基準 |
|---|---|---|
| FR-001 | 対CPUゲーム | 開始操作でプレイヤー盤とCPU盤が同じseedの次ピース列を共有して進行する |
| FR-002 | 2個1組ピース | spawn時に隣接する2セルが生成され、双方の色・形が描画される |
| FR-003 | 移動・回転・高速落下 | 左右移動、時計/反時計回転、押下中soft drop、即時hard dropが衝突判定付きで動く。回転は壁際で±1列の簡易wall kickを試す |
| FR-004 | 固定と重力 | 接地後500msを上限とするlock delay後に固定し、空セルを挟むセルは各列の下端へ安定落下する |
| FR-005 | 連結・消去 | 上下左右で同色の通常ピースが4個以上連結した全グループを同一waveで消去する。斜めは接続しない |
| FR-006 | 連鎖 | 消去→重力→再判定を消去がなくなるまで繰り返し、wave番号をchain数として記録する |
| FR-007 | スコア | 1 waveの得点を `10 × 消去通常セル数 × max(1, chain² + 色数 - 1 + maxGroupSize - 4)` とし、全waveを加算する。同一入力・seedで同一結果になる |
| FR-008 | おじゃま生成・送信 | 1解決中の攻撃値を `floor(解決得点 / 70)` とする。自身の待機おじゃまを先に相殺し、残りを相手へ送る。相手の現在解決完了後・次spawn前に最大30個を均等列＋seed付き余り列で降らせる |
| FR-009 | おじゃまの消去 | おじゃまセルは4連結の色判定に含めないが、同一waveで消える通常グループに上下左右で隣接すれば消える |
| FR-010 | CPU候補生成 | 全4回転×有効軸列から合法な到達終端候補を生成し、盤面コピー上で着地・全連鎖をシミュレートする。重複する同色対称候補は結果盤面hashで除外できる |
| FR-011 | CPU評価 | 消去数、連鎖数、盤面最大高さ、列間凹凸、穴、spawn周辺危険度を含む重み付き評価で候補を順位付けする |
| FR-012 | CPU非同期動作 | 候補評価はWeb Workerで実行し、メインスレッドの描画・入力を止めない。Worker不可時は時間分割フォールバックを使う |
| FR-013 | CPU難易度 | 初級・中級・上級を開始前/リトライ時に選択可能。初級は上位候補へのノイズと遅い操作、中級は標準探索、上級は高精度評価（次ピース1手lookahead）と速い操作を使う |
| FR-014 | 勝敗 | spawn位置が埋まり新ピースを合法配置できない側が敗北。双方が同一解決tickで不能なら引き分け。結果画面に勝敗・得点・最大連鎖を示す |
| FR-015 | 一時停止・リトライ | Pause/Resumeで両盤面、CPU、タイマー、音を停止/再開する。Retryは選択難易度を維持してseedと全状態を初期化する |
| FR-016 | キーボード | ArrowLeft/Right=移動、ArrowDown=soft drop、Space=hard drop、Z/X=反時計/時計回転、P/Escape=pause。ブラウザ既定スクロールをゲームフォーカス中に抑止する |
| FR-017 | タッチ | 44×44 CSS px以上の左右・回転・soft/hard dropボタンを提供し、pointer eventsで長押しと複数pointerの破綻を防ぐ。盤面スワイプに必須操作を依存しない |
| FR-018 | レスポンシブUI | 360×640からデスクトップまで横スクロールなし。狭幅は盤面を横並びのまま縮尺調整し操作部を下へ、横長は盤面とHUDを中央配置する |
| FR-019 | 効果音 | Web Audio APIで移動、回転、固定、消去、連鎖、攻撃、勝敗の短い合成音を生成し、常時表示ボタンでON/OFFできる。初回ユーザー操作前にAudioContextを開始しない |
| FR-020 | 操作方法画面 | 開始画面と対戦中のHelpから、ルール、キーボード、タッチ、勝敗、おじゃま、アクセシビリティをモーダルで確認でき、Escapeと閉じるボタンで戻れる |

### HIGH（品質成立に必須）

| ID | 要件 | 受入基準 |
|---|---|---|
| FR-021 | 次ピース/HUD | next 2組、score、chain、pending garbage、difficulty、sound/pause状態を表示する |
| FR-022 | 独自演出 | Canvas上のプリズム形状、共鳴リング、chain pulse、送信trailをCSS/Canvasで描き、画像素材へ依存しない |
| FR-023 | 状態管理 | `menu/playing/paused/resolving/gameover/help` を明示的状態機械で管理し、不正な入力を無視する |
| FR-024 | 診断可能性 | 開発モードでseedとFPSを確認可能。通常プレイでconsole error/unhandled rejectionを発生させない |

### LOW（時間に余裕がある場合）

- Reduced Motion選択時に粒子量と画面pulseを抑制する。
- high scoreと音設定のみlocalStorageへ保存する（ゲーム進行は保存しない）。
- CPUの評価理由を短い「狙い」ラベル（CHAIN / SAFE / ATTACK）で表示する。

## 4. CPU評価の要求仕様

候補特徴量は正規化し、概念式を次とする。

`score = clearWeight*cleared + chainWeight*chain² + attackWeight*attack - heightWeight*maxHeight - roughnessWeight*roughness - holeWeight*holes - dangerWeight*spawnDanger + setupPotential`

- `roughness`: 隣接列高の差の絶対値合計。
- `holes`: 同列で占有セルの下にある空セル数。
- `spawnDanger`: 隠し行占有、中央2列の高さ、次のおじゃま量から算出。
- 初級: 合法候補のランダム部分集合60%、評価ノイズ±25%、操作間隔450–700ms、lookaheadなし。
- 中級: 全候補、評価ノイズ±5%、操作間隔220–380ms、lookaheadなし。
- 上級: 全候補＋next 1組のbeam幅6探索、評価ノイズなし、操作間隔90–180ms。
- Worker応答にはgame revisionを付与し、古い応答は破棄する。思考時間budgetは初級20ms、中級35ms、上級80msを目安にし、超過時は得られた最良候補を採用する。

## 5. 非機能要件

### 性能・信頼性

- requestAnimationFrame描画を60fps目標、一般的なスマートフォンで継続30fps以上。論理更新は固定stepで描画と分離する。
- 通常入力への応答は次frame（目標50ms以内）。CPU探索中も100ms超のlong taskを発生させない。
- 1対戦を連続20回Retryしてもイベントリスナー、Worker、Audio nodeを増殖させない。
- viewport resize、tab非表示復帰、pointer cancelで状態破損しない。

### アクセシビリティ

- ゲーム外UIはセマンティックHTML、明示label、可視focus、キーボード完結、モーダルfocus trapを備える。
- 色以外の形状/模様、十分なコントラスト、`prefers-reduced-motion`、音なしでも分かる視覚通知を提供する。
- `aria-live`はchain、受信警告、勝敗の低頻度情報に限定し、毎frame更新しない。

### セキュリティ・プライバシー・権利

- 外部通信、Cookie、個人情報収集、動的HTML注入を行わない。依存パッケージを最小化し監査する。
- 既存IPの素材・固有名称・ロゴ・キャラクター・音源・画面コピーを使わない。全ビジュアルと音はコード生成。
- secretや認証情報を必要とせず、生成・保存・ログ出力しない。

### 保守性・テスト性

- TypeScript strict。`engine/`はDOM、Canvas、Audio、時刻、Workerに依存しない純粋関数中心とする。
- renderer、input、audio、CPU planner、orchestratorをinterface越しに分離する。
- Vitestで連結、消去、重力、連鎖、スコア、おじゃま、勝敗、候補生成、評価を単体テストする。
- Playwrightで開始、移動/回転/drop、pause/resume、help、sound、difficulty、retry、touch相当pointer操作、勝敗をE2Eテストする。
- ESLint、`tsc --noEmit`、unit、E2E、production buildをCI相当ローカルコマンドで実行可能にする。

## 6. 成功基準（Definition of Done）

1. FR-001〜FR-024が実装され、CRITICAL/HIGHの受入基準に対応するテストまたは検証記録がある。
2. 必須ロジックのunit testが全合格し、クリティカルなengineモジュールはbranch coverage 90%以上、全体80%以上を目標とする。
3. 主要E2EがChromium desktopとmobile viewportで全合格する。
4. lint、型検査、buildがexit code 0。ブラウザconsole errorとpage errorが0件。
5. CPU候補に全合法列/回転が含まれ、3難易度の精度/速度差を自動テストまたは統計検証できる。
6. ローカル起動手順が3ステップ以内で、README、操作説明、設計概要が揃う。
7. 外部サーバー/APIなしで動作し、既存作品由来のアセットを含まない。

## 7. 技術スタック提案

- Vite + TypeScript（strict）、HTML/CSS、Canvas 2D、Web Audio API、Web Worker。
- UIは軽量なvanilla DOM。ReactはゲームloopとCanvas状態の二重管理を避け、初回bundleと構成を簡潔にするため不採用。
- Vitest + jsdom（純粋ロジック中心）、Playwright（E2E）、ESLint。
- npm scripts: `dev`, `build`, `preview`, `lint`, `typecheck`, `test`, `test:e2e`, `check`。

## 8. リスクと対策

| リスク | 影響 | 対策 |
|---|---|---|
| CPU探索でUI停止 | 操作不能 | Worker、revision、budget、時間分割fallback、performance test |
| ルール境界の不整合 | 不公平/再現不能 | 純粋engine、seed、状態遷移表、fixture/golden test |
| おじゃま同時送信の順序依存 | 勝敗不整合 | 解決単位のtransaction、相殺→送信→降下の順序固定 |
| Canvasのアクセシビリティ不足 | 操作困難 | DOM HUD/controls、aria-live、模様、キーボード、help |
| モバイルで盤面が小さい | 視認/誤操作 | DPR対応scale、最小touch target、実機相当viewport E2E |
| 音の自動再生制限 | 無音/例外 | user gesture後lazy init、失敗時silent degrade |
| scope過大 | 納期遅延 | online、ストーリー、永続進行、外部素材を明示除外 |

## 9. 改善ループ記録

- 1回目: ユーザー列挙機能を網羅し、ローカル静的ゲームに限定。
- 2回目: 盤面、連鎖、得点、おじゃま、同時敗北、CPU特徴量と非同期契約を数値化。
- 3回目: CRITICAL/HIGH/LOWへ再優先付けし、IP非依存、性能、アクセシビリティ、unit/E2E完了条件を追加。MVPからonline/サーバー/課金APIを除外。


---


## Project Info

```yaml
project:
  name: "Space Invaders Game"
  type: "game"
  description: "8-bit style retro space shooter game"

```