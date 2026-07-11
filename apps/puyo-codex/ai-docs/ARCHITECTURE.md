# Architecture & Tech Stack

> Auto-generated: 2026-07-10

# Prism Cascade Arena — アーキテクチャ設計（計画案B）

## 設計判断

ゲームの正しさを担う純粋TypeScript engineを中心に、描画・入力・音・時間・CPU探索を外側へ追い出す。CPUはengineのimmutable snapshotをWeb Workerへ送り、返答をメインスレッド上の「CPU操作役」が段階的に実行する。これにより探索負荷、アニメーション、ルールの決定性を分離する。

```text
DOM Menu / HUD / Touch controls        Keyboard / Pointer
             │                               │
             └────────── InputRouter ────────┘
                              │ GameCommand
                    MatchOrchestrator (FSM)
                     │         │          │
              GameEngine   CpuGateway   AudioDirector
              (pure TS)      │ async       │ Web Audio
                │            ▼
           MatchState   cpu.worker.ts
                │       Candidate Generator → Simulator → Evaluator
                ▼
           CanvasRenderer ← AnimationEvents
```

## モジュール境界

| 領域 | 主な責務 | 禁止依存 |
|---|---|---|
| `src/engine/model.ts` | Board, Cell, Pair, MatchState, rule型 | DOM/Canvas/Worker |
| `src/engine/board.ts` | 衝突、固定、重力、連結、消去 | UI、実時間 |
| `src/engine/resolve.ts` | wave loop、chain、score、attack | DOM、乱数global |
| `src/engine/garbage.ts` | 相殺、均等降下、隣接消去 | renderer |
| `src/engine/match.ts` | spawn、tick、command、勝敗、同時解決 | browser API |
| `src/cpu/candidates.ts` | 列×回転の合法終端候補、盤面hash重複排除 | DOM |
| `src/cpu/evaluate.ts` | 特徴抽出、難易度weight、順位付け | UI |
| `src/cpu/search.ts` | budget、beam lookahead、決定的tie break | main-thread state |
| `src/cpu/cpu.worker.ts` | request/response transport | DOM/Canvas |
| `src/app/orchestrator.ts` | FSM、fixed-step loop、両盤面transaction | engine内部変更 |
| `src/app/input.ts` | key/pointerをGameCommandへ変換、repeat | rule判断 |
| `src/render/canvas-renderer.ts` | DPR対応盤面、effect描画 | 状態変更 |
| `src/ui/*` | menu、HUD、help、modal、aria-live | engine内部変更 |
| `src/audio/audio-director.ts` | gesture後の合成SE、mute | ゲーム判定 |

## 主要データモデル

```ts
type ColorId = 0 | 1 | 2 | 3 | 4;
type Cell = { kind: 'color'; color: ColorId } | { kind: 'garbage' } | null;
type Orientation = 0 | 1 | 2 | 3;
interface Pair { pivot: ColorId; satellite: ColorId; x: number; y: number; orientation: Orientation }
interface BoardState { readonly cells: readonly Cell[]; readonly width: 6; readonly totalRows: 14 }
interface PlayerState { board: BoardState; active: Pair | null; score: number; pendingGarbage: number; maxChain: number }
interface MatchState { revision: number; phase: MatchPhase; seed: number; players: readonly [PlayerState, PlayerState]; queue: readonly PairColors[] }
interface CpuRequest { revision: number; board: BoardState; current: PairColors; next: PairColors; pendingGarbage: number; difficulty: Difficulty; seed: number }
interface CpuResponse { revision: number; target: Placement; features: FeatureVector; evaluated: number; elapsedMs: number }
```

Boardはrow-majorの固定長配列でcloneしやすくする。engine APIは新しいstateとdomain event列を返す。renderer/audioはeventを購読するだけで結果を決めない。

## 状態遷移と同時性

```text
MENU → PLAYING ⇄ PAUSED
  │        │          │
  │        ├→ RESOLVING → GARBAGE_COMMIT → SPAWN → PLAYING
  │        ├→ HELP → (直前状態)
  │        └→ GAME_OVER → RETRY → PLAYING
  └→ HELP → MENU
```

各盤面の固定後、resolveを純粋関数として最後まで計算する。両者の同じlogical tickの攻撃を集約し、各自pendingと相殺した後に相手へcommitするため、処理順で結果が変わらない。おじゃまは解決中の盤面へ割り込ませない。

fixed-step loop（例16.67ms）は経過時間を蓄積し最大catch-up回数を制限する。描画は補間可能だがengine tickとは独立。`visibilitychange`復帰時は過大deltaを捨てる。

## CPU非同期プロトコル

1. CPU spawn時、orchestratorがreadonly snapshotとrevisionをWorkerへstructured cloneする。
2. Workerが全合法候補を生成し、engine simulatorで完全解決。難易度別weightで評価する。
3. 上級のみnext pairにbeam幅6の1手lookaheadを加える。deadline超過時は現在bestを返す。
4. main threadはrevision不一致、game pause/gameover、すでに固定済みの返答を破棄する。
5. targetを瞬間配置せず、difficulty別間隔で回転・左右・dropのコマンド列に変換し「対戦している」視認性を作る。
6. Worker生成失敗時は同じsearchを`requestIdleCallback`または8ms chunkの`setTimeout`で時間分割する。

到達不能な「直接drop結果」は候補に含めない。候補生成はspawnから回転/左右状態のBFS、または6列ルールで等価性を検証した終端列挙を用い、最終的にcollision付きcommand pathを保持する。

## 描画・UX設計

- Canvasは1枚または盤面ごとの2枚とし、CSSレイアウト内でlogical座標から描画する。DPR上限2で負荷を制限。
- Prism pieceは色＋輪郭形＋内部線パターン。背景はCSS gradient、粒子はprocedural。外部画像なし。
- DOM HUDでnext、score、chain、garbage、difficultyを読み上げ可能にする。Canvas自体には短い代替テキスト。
- 360px幅でも両盤面を比較できることを優先。touch操作は盤面下に固定せずsafe-areaを考慮する。
- animation eventはpool/上限を持ち、reduced motionではtrail/particleを停止する。

## エラーとライフサイクル

- orchestratorの`dispose()`がrAF、Worker、listeners、AudioContext参照を一括解除する。
- Worker errorは復旧可能通知を記録しfallbackへ切替。音声失敗はゲームを継続。
- 不変条件（board長、cell値、active合法性）はdevelopmentでassert、productionでは不正commandをno-op。
- consoleへseed以外の不要情報や秘密を出さない。外部入力をinnerHTMLへ挿入しない。

## テスト戦略への接続

- engine: table/property-style fixturesで4方向連結、同時group、重力、multi-chain、score、garbage、drawを検証。
- CPU: placement集合、左右端/凸凹/同色pair、特徴量単調性、危険盤面回避、seed再現を検証。
- adapter: fake clock、fake Worker、fake Audioでpause/retry/stale response/disposeを検証。
- E2E: debug用の公開最小hook（seed指定とsnapshot読取、productionでは無効）でflakyなpixel判定を避ける。視覚はscreenshotを補助利用。

## Phase 2で比較可能な実装差別化（現実的な2案）

### B1: Dual Canvas Event Renderer（推奨）

- 盤面ごとにCanvas、HUD/controlsはDOM。domain event駆動で軽量effectsを重ねる。
- 狙い: CPUとプレイヤーの独立再描画、狭幅scale調整、テスト性と演出の両立。
- 現実性: Canvas 2Dとvanilla TSのみで依存が少なく、ローカル静的配布に適する。

### B2: Single Arena Canvas + DOM Overlay

- 2盤面と対戦trailを1 Canvasで描画し、HUD/controlsだけDOM overlay。
- 狙い: 盤面間のおじゃま送信や共鳴演出を一体的に見せ、独自性を最大化。
- 現実性: renderer境界は同じでengine/CPUを共有できる。ただしresponsive hit areaとpartial redrawが複雑なため、性能計測後に選ぶ。

React/サーバー/WebGL案は今回の規模とローカル完結要件に対し意味のある優位が薄く、実装案には含めない。

## ビルドと配布

`npm install` → `npm run dev`。本番は`npm run build`で相対asset pathの`dist/`を生成し、任意の静的HTTPサーバーで配信する。file URL直開きはWorker/module制約があるため必須対象外とし、`launch_app.command`でローカルサーバー起動を簡略化する。外部通信は0件。


---

# Prism Cascade Arena — 技術スタック決定書

## 結論

ローカル完結の静的ブラウザゲームとして、**Vite + strict TypeScript + Canvas 2D + DOM + Web Worker + Web Audio API** を採用する。外部API、バックエンド、データベース、認証、CDN、課金サービスは使用しない。

## 採用技術

| 領域 | 技術 | 選定理由 |
|---|---|---|
| 言語 | TypeScript（`strict: true`, `noUncheckedIndexedAccess`） | 盤面境界、状態遷移、Worker messageの不整合をコンパイル時に検出 |
| 開発/ビルド | Vite | native ESM、Worker URL、開発server、本番bundleを簡潔に扱える |
| ゲーム描画 | Canvas 2D | 2盤面とprocedural effectsを低コストで毎frame描画可能 |
| UI | semantic HTML + CSS + vanilla DOM | HUD、dialog、button、ARIAをCanvas外に保ち、アクセシビリティとテスト性を確保 |
| CPU | Web Worker | 全配置候補のsimulationをmain threadから隔離。revision付きprotocolで古い結果を破棄 |
| 効果音 | Web Audio API | 外部音声ファイルなしで独自の短いSEを合成。初回gesture後に初期化 |
| 状態/乱数 | pure TS immutable state + seed付きPRNG | 決定的unit/E2E、不具合再現、CPU simulation共有 |
| unit | Vitest | Vite/TSとの統合、純粋engineとWorker adapterの高速test |
| E2E | Playwright | keyboard、pointer、desktop/mobile viewport、console監視を自動化 |
| 静的品質 | ESLint + `tsc --noEmit` | 未処理Promise、危険な型逃げ、未使用コードを検出 |

## バージョン方針

- Node.jsは20 LTS以上、npmはlockfileで再現する。
- packageは実装開始時の安定最新版を採用し、`package-lock.json`をコミットする。
- runtime dependencyは原則0。Vite、TypeScript、Vitest、Playwright、ESLint関連はdevDependencyのみ。
- browser targetは直近2世代のChromium/Safari/Firefoxを目安とし、E2E必須ゲートはChromium desktop/mobile profile。

## TypeScript/Vite設定

- `moduleResolution: "Bundler"`, `isolatedModules: true`, `noEmit: true`。
- engineはDOM libを参照しない別境界を保ち、browser adapterだけがDOM/Canvas/Audio/Workerに触れる。
- `base: './'`で相対asset pathを生成し、静的server配下の任意pathで起動可能にする。
- Workerは`new Worker(new URL('./cpu.worker.ts', import.meta.url), { type: 'module' })`でbundleする。
- production source mapは公開範囲とdebug要件を確認し、既定はoff。

## npm scripts契約

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc --noEmit && vite build",
    "preview": "vite preview",
    "lint": "eslint . --max-warnings=0",
    "typecheck": "tsc --noEmit",
    "test": "vitest run",
    "test:coverage": "vitest run --coverage",
    "test:e2e": "playwright test",
    "check": "npm run lint && npm run typecheck && npm run test && npm run build"
  }
}
```

E2Eは別processのVite preview/dev serverをPlaywright `webServer`で起動する。`check`後に`test:e2e`を品質ゲートとして実行する。

## 外部API・データ・インフラ判定

- 外部API: **不要/使用禁止**。ゲームロジック、CPU、描画、音はすべて端末内。
- backend/API server: なし。ローカルHTTP serverは静的ファイル配信のみ。
- database: なし。任意設定のみlocalStorageを使用し、失敗してもplayを継続。
- network request: 開発server自身へのmodule取得以外なし。本番中の第三者通信0件。
- cost: $0。認証情報・秘密情報は不要。

## コード生成アセット方針

`IMAGE_PROMPTS.json`と`AUDIO_PROMPTS.json`は生成しない。画像生成API・音声生成APIも呼ばない。

- piece、背景、ring、particle、garbage trailはCanvas primitiveとCSS gradientでprocedural生成する。
- SEはOscillatorNode、GainNode、BiquadFilterNode等で実行時合成する。
- アイコンはテキスト/幾何形状/CSSで表現し、既存作品のロゴ、画像、音源、固有意匠を使用しない。
- この判断により課金、ライセンス由来、asset load failure、ネットワーク依存を排除する。

## 不採用技術

- React/Tailwind/UI library: 小規模なCanvas中心ゲームではstate二重管理とbundleを増やすため不採用。
- WebGL/game engine: 2D grid表現には過剰で、アクセシビリティUIとの統合コストが上がる。
- Service Worker/PWA: offline cache更新問題を増やす一方、ローカル起動要件に不要。
- synchronous CPU探索: input/render停止リスクがあるため不採用。

## 品質・性能予算

- main thread long task 100ms超をCPU探索由来で発生させない。
- 通常入力を50ms以内に視覚反映、render 60fps目標/継続30fps以上。
- production bundleの初期JS gzip 150KBを目安（Playwright等はbundle外）。
- engine branch coverage 90%以上、全体80%以上を目標。lint warning 0、type error 0、console/page error 0。


---


## Tech Stack (from package.json)


### Dev Dependencies
- @eslint/js
- eslint
- typescript
- typescript-eslint
- vite
- vitest
