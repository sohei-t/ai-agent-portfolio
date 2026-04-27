# Architecture & Tech Stack

> Auto-generated: 2026-04-27

# ARCHITECTURE.md - mp4-join システムアーキテクチャ

**プロジェクト**: mp4-join
**作成日**: 2026-04-27
**前提**: SPEC.md / TECH_STACK.md を基底とする

---

## 目次

1. レイヤー構成
2. モジュール一覧
3. ディレクトリ構成（project/src 以下）
4. 状態遷移図（メインステートマシン）
5. コンポーネント間通信
6. Web Worker 設計
7. プロトタイプバリアント（A/B/C）と Phase 2 への引き継ぎ
8. パフォーマンス・セキュリティ設計
9. 補足: Plan B（革新版）からの取り込みポイント

---

## 1. レイヤー構成

本アプリは 4 層構造で責務を分離する。各層の依存方向は **上→下のみ**（下位層が上位層を import しない）。

```
┌────────────────────────────────────────────────────────────────┐
│ Presentation Layer (React Components)                          │
│   App / DropZone / FolderTree / FileNode / MergeQueue /        │
│   PreviewModal / ProgressModal / Toast / SortControls /        │
│   SummaryBar / ResultPanel / SettingsPanel                     │
├────────────────────────────────────────────────────────────────┤
│ Hooks Layer (Stateful Business Logic)                          │
│   useFolderPicker / useFileScanner / useThumbnail /            │
│   useMergeQueue / useFFmpegJoin / useDownload / useToast /     │
│   useKeyboardNav / useFocusTrap / useAppState (root reducer)   │
├────────────────────────────────────────────────────────────────┤
│ Service Layer (Pure Logic / Wrappers)                          │
│   folderScanner / sortStrategies / ffmpegService /             │
│   blobManager / pathUtils / capability / idGenerator /         │
│   logger / etaCalculator / thumbnailGen                        │
├────────────────────────────────────────────────────────────────┤
│ Browser APIs                                                   │
│   File System Access API / DataTransferItem /                  │
│   <input type="file" webkitdirectory> / <video> + <canvas> /   │
│   Web Worker / Blob / URL / IntersectionObserver /             │
│   navigator.userAgent / SharedArrayBuffer (optional)           │
└────────────────────────────────────────────────────────────────┘
```

### 1.1 各層の責務と禁止事項

| 層 | 責務 | 禁止 |
|----|------|------|
| Presentation | レンダリング、イベントハンドラ呼出のみ。`useState` も最小限 | Service 層を直接 import しない（必ず Hook 経由）|
| Hooks | 状態管理、副作用、Service 呼出 | DOM 直接操作（`document.querySelector` 等）禁止 |
| Service | 純粋関数、外部 API ラッパ | React import 禁止、`window` への直接依存最小化 |
| Browser APIs | ブラウザネイティブ | — |

### 1.2 依存ルール（ESLint で強制）

```javascript
// .eslintrc 設定例
{
  rules: {
    'import/no-restricted-paths': ['error', {
      zones: [
        { target: './src/services', from: './src/components' },
        { target: './src/services', from: './src/hooks' },
        { target: './src/hooks', from: './src/components' },
      ],
    }],
  }
}
```

---

## 2. モジュール一覧

### 2.1 Presentation 層（components/）

| モジュール | 役割 | Props（要約） | テスト |
|-----------|------|--------------|--------|
| `App.tsx` | ルート、AppContext Provider、ステートマシン配線 | — | Integration |
| `Header.tsx` | ロゴ、設定/About リンク | — | Snapshot |
| `DropZone.tsx` | フォルダ取り込み UI（D&D + ボタン）| `onFolder(input: HandleOrFiles): void` | Unit + a11y |
| `FolderTree.tsx` | ツリー全体レイアウト | `root: TreeNode`, `selection: Selection` | Unit |
| `TreeNodeRow.tsx` | 1 行（フォルダ or ファイル） | `node: TreeNode`, `depth: number` | Unit |
| `FileNode.tsx` | ファイル行の中身（チェック+サムネ+名前） | `node: FileNode` | Unit |
| `DirectoryNode.tsx` | フォルダ行の中身（三状態チェック+ラベル） | `node: DirectoryNode` | Unit |
| `MergeQueue.tsx` | 結合キュー縦リスト | `items: FileEntry[]` | Unit |
| `MergeQueueItem.tsx` | キュー 1 行（D&D 対応） | `item: FileEntry`, `index: number` | Unit |
| `SortControls.tsx` | ソートボタングループ | `current: SortStrategy`, `onChange` | Unit |
| `SummaryBar.tsx` | 選択件数・合計サイズ・警告 | `count: number`, `totalBytes: number` | Unit |
| `JoinButton.tsx` | 結合開始ボタン | `disabled: boolean`, `onClick` | Unit |
| `PreviewModal.tsx` | プレビュー再生 + 速度制御 | `file: FileEntry \| null`, `onClose` | Unit + a11y |
| `ProgressModal.tsx` | FFmpeg ロード/結合進捗 | `job: JoinJob`, `onCancel` | Unit |
| `ResultPanel.tsx` | 完了画面 + DL ボタン | `result: JoinResult`, `onRestart` | Unit |
| `Toast.tsx` + `ToastContainer.tsx` | エラー/通知 | (Context 経由) | Unit |
| `SettingsPanel.tsx` (Phase 2-S10) | 設定（ログ表示切替等） | — | Unit |
| `ErrorBoundary.tsx` | エラー境界（クラスコンポーネント、唯一の例外） | `children` | Unit |
| `Skeleton.tsx` | 走査中の placeholder | — | Snapshot |

### 2.2 Hooks 層（hooks/）

| モジュール | API | テスト |
|-----------|-----|--------|
| `useAppState.ts` | `(state, dispatch) = useAppState()` ルート reducer | renderHook + 各 action |
| `useFolderPicker.ts` | `pickFolder()`, `handleDrop(e)`, `handleFileInput(files)` | renderHook + モック |
| `useFileScanner.ts` | `scan(input): Promise<TreeNode>`, `progress` | renderHook + モック scanner |
| `useThumbnail.ts` | `getThumbnail(file): Promise<string>`, `register(ref)` | renderHook + モック video |
| `useMergeQueue.ts` | `add/remove/sort/move/clear/has(id)` | renderHook（純化テスト） |
| `useFFmpegJoin.ts` | `load()`, `join(items, onProgress): Promise<Blob>`, `cancel()` | renderHook + モック ffmpeg |
| `useDownload.ts` | `download(blob, filename)` | renderHook |
| `useToast.ts` | `notify({ kind, message })`, `clear(id)` | renderHook |
| `useFocusTrap.ts` | `useFocusTrap(active: boolean, ref)` | renderHook |
| `useKeyboardNav.ts` | キーバインドのフック化（必要箇所で利用） | renderHook |

### 2.3 Service 層（services/）

| モジュール | エクスポート | テスト容易性 |
|-----------|--------------|-------------|
| `folderScanner.ts` | `walkFsa(handle): AsyncIterable<FileEntry>`, `fromFileList(files): TreeNode`, `buildTree(entries): TreeNode` | 高（純関数）|
| `sortStrategies.ts` | `byName(items, dir)`, `byDate(items, dir)`, `random(items, seed?)` | 高（純関数）|
| `ffmpegService.ts` | `loadCore(onProgress): Promise<FFmpeg>`, `concatDemuxer(items, onProgress): Promise<Blob>`, `concatFilter(items, onProgress): Promise<Blob>`, `terminate(): void` | 中（モック必須）|
| `blobManager.ts` | `register(blob): string`, `revoke(url)`, `revokeAll()` | 高 |
| `thumbnailGen.ts` | `generate(file, atSec): Promise<string>` | 中（jsdom video モック）|
| `pathUtils.ts` | `naturalSort(a, b)`, `relativePath(node)`, `formatBytes(n)`, `formatDuration(s)` | 高 |
| `capability.ts` | `hasFsa()`, `hasGetAsFsHandle()`, `isIosSafari()`, `hasSharedArrayBuffer()` | 高（モック window）|
| `idGenerator.ts` | `nextId(): string` | 高 |
| `logger.ts` | `info/warn/error(...args)`, `getHistory(): LogEntry[]` | 高 |
| `etaCalculator.ts` | `update(progress, elapsed): { etaSec, smoothedRate }` | 高（純関数）|

### 2.4 Workers 層（workers/）— 任意（Prototype A は最小、B/C で拡張）

| Worker | 役割 | Prototype A 採否 |
|--------|------|----------------|
| `scanner.worker.ts` | 大量ファイルの再帰走査をオフロード | △ 1000 件超で有効化（Phase 4）|
| `thumbnail.worker.ts` | OffscreenCanvas でサムネ生成 | × （Prototype C で採用）|
| `ffmpeg.worker.ts` | FFmpeg 実行は @ffmpeg/ffmpeg 内部で Worker 化されるため自前不要 | — |

### 2.5 Types 層（types/）

| ファイル | 内容 |
|---------|------|
| `tree.ts` | TreeNode / DirectoryNode / FileNode / NodeId |
| `file.ts` | FileEntry |
| `queue.ts` | MergeQueue / SortStrategy |
| `job.ts` | JoinJob / JoinStatus / JoinResult |
| `error.ts` | AppError / ErrorCode |
| `playback.ts` | PlaybackSpeed |
| `state.ts` | AppState / AppAction (reducer 用) |
| `index.ts` | 上記の re-export |

### 2.6 Utils / その他

| ファイル | 内容 |
|---------|------|
| `utils/format.ts` | バイト・時間のフォーマッタ |
| `utils/seededRandom.ts` | ランダム並び替えのシード対応 |
| `utils/intersection.ts` | IntersectionObserver の薄ラッパ |
| `i18n/messages.ja.ts` | エラー文言・UI 文言（日本語固定） |
| `styles/tailwind.css` | Tailwind のエントリ |

---

## 3. ディレクトリ構成（project/ 以下）

```
project/
├── package.json
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
├── vitest.config.ts
├── playwright.config.ts
├── tailwind.config.ts
├── postcss.config.js
├── eslint.config.js
├── .prettierrc
├── index.html                      # Vite エントリ（dev）
├── src/
│   ├── main.tsx                    # ルートマウント
│   ├── App.tsx                     # ルートコンポーネント
│   ├── components/
│   │   ├── App/                    # ルート関連
│   │   │   ├── ErrorBoundary.tsx
│   │   │   └── Header.tsx
│   │   ├── DropZone/
│   │   │   ├── DropZone.tsx
│   │   │   └── DropZone.test.tsx
│   │   ├── Tree/
│   │   │   ├── FolderTree.tsx
│   │   │   ├── TreeNodeRow.tsx
│   │   │   ├── DirectoryNode.tsx
│   │   │   ├── FileNode.tsx
│   │   │   └── *.test.tsx
│   │   ├── Queue/
│   │   │   ├── MergeQueue.tsx
│   │   │   ├── MergeQueueItem.tsx
│   │   │   └── SortControls.tsx
│   │   ├── Modal/
│   │   │   ├── PreviewModal.tsx
│   │   │   ├── ProgressModal.tsx
│   │   │   └── BaseModal.tsx       # フォーカストラップ等の共通
│   │   ├── Result/
│   │   │   └── ResultPanel.tsx
│   │   ├── Toast/
│   │   │   ├── Toast.tsx
│   │   │   └── ToastContainer.tsx
│   │   └── Skeleton.tsx
│   ├── hooks/
│   │   ├── useAppState.ts          # ルート reducer
│   │   ├── useFolderPicker.ts
│   │   ├── useFileScanner.ts
│   │   ├── useThumbnail.ts
│   │   ├── useMergeQueue.ts
│   │   ├── useFFmpegJoin.ts
│   │   ├── useDownload.ts
│   │   ├── useToast.ts
│   │   ├── useFocusTrap.ts
│   │   └── *.test.ts
│   ├── services/
│   │   ├── folderScanner.ts
│   │   ├── sortStrategies.ts
│   │   ├── ffmpegService.ts
│   │   ├── blobManager.ts
│   │   ├── thumbnailGen.ts
│   │   ├── pathUtils.ts
│   │   ├── capability.ts
│   │   ├── idGenerator.ts
│   │   ├── logger.ts
│   │   ├── etaCalculator.ts
│   │   └── *.test.ts
│   ├── workers/                    # Phase 4 で必要に応じて
│   │   └── scanner.worker.ts       # 任意
│   ├── types/
│   │   ├── tree.ts
│   │   ├── file.ts
│   │   ├── queue.ts
│   │   ├── job.ts
│   │   ├── error.ts
│   │   ├── playback.ts
│   │   ├── state.ts
│   │   └── index.ts
│   ├── utils/
│   │   ├── format.ts
│   │   ├── seededRandom.ts
│   │   └── intersection.ts
│   ├── context/
│   │   ├── AppContext.tsx          # createContext + Provider
│   │   └── ToastContext.tsx
│   ├── i18n/
│   │   └── messages.ja.ts
│   └── styles/
│       └── tailwind.css
├── tests/
│   ├── unit/                       # （実体は src/**/*.test.ts に同居 推奨）
│   ├── e2e/
│   │   ├── e2e-01-merge-flow.spec.ts
│   │   ├── e2e-02-large-folder.spec.ts
│   │   ├── e2e-03-webkitdirectory.spec.ts
│   │   ├── e2e-04-preview-speed.spec.ts
│   │   ├── e2e-05-cancel.spec.ts
│   │   └── e2e-06-error-handling.spec.ts
│   └── fixtures/
│       ├── small-1.mp4             # 数 KB のテスト用 mp4
│       ├── small-2.mp4
│       ├── small-3.mp4
│       └── README.md               # 生成手順
└── public/                         # 公開成果物（Phase 5 で配置）
    ├── index.html                  # Vite ビルド出力
    ├── about.html                  # documenter_agent.py が生成
    ├── assets/
    │   ├── index-[hash].js
    │   ├── index-[hash].css
    │   ├── ffmpeg-core-[hash].wasm
    │   └── ffmpeg-core-[hash].js
    ├── README.md
    └── explanation.mp3             # 任意
```

---

## 4. 状態遷移図（メインステートマシン）

`useAppState` は単一の `useReducer` で全アプリ状態を管理する。

### 4.1 状態列挙

```typescript
type AppState =
  | 'idle'
  | 'scanning'
  | 'browsing'
  | 'preview-open'        // モーダル：browsing からのオーバーレイ
  | 'ffmpeg-loading'
  | 'joining'
  | 'done'
  | 'error';
```

### 4.2 アクション

```typescript
type AppAction =
  | { type: 'SCAN_START'; input: HandleOrFiles }
  | { type: 'SCAN_PROGRESS'; count: number }
  | { type: 'SCAN_COMPLETE'; tree: TreeNode }
  | { type: 'SCAN_FAIL'; error: AppError }
  | { type: 'TOGGLE_FILE_CHECK'; id: NodeId }
  | { type: 'TOGGLE_DIR_CHECK'; id: NodeId }
  | { type: 'TOGGLE_DIR_EXPAND'; id: NodeId }
  | { type: 'SORT_QUEUE'; strategy: SortStrategy }
  | { type: 'MOVE_QUEUE_ITEM'; from: number; to: number }
  | { type: 'PREVIEW_OPEN'; id: NodeId }
  | { type: 'PREVIEW_CLOSE' }
  | { type: 'JOIN_START' }
  | { type: 'JOIN_LOAD_PROGRESS'; pct: number }
  | { type: 'JOIN_LOAD_COMPLETE' }
  | { type: 'JOIN_PROGRESS'; pct: number; currentFile: string; etaSec: number | null }
  | { type: 'JOIN_FALLBACK_TO_FILTER' }
  | { type: 'JOIN_FILE_SKIP'; id: NodeId; reason: string }
  | { type: 'JOIN_COMPLETE'; result: JoinResult }
  | { type: 'JOIN_CANCEL' }
  | { type: 'JOIN_FAIL'; error: AppError }
  | { type: 'RESET_TO_IDLE' }
  | { type: 'RESET_TO_BROWSING' };
```

### 4.3 遷移表

| 現在 | アクション | 次状態 | 副作用 |
|------|----------|--------|--------|
| idle | SCAN_START | scanning | 走査開始 |
| scanning | SCAN_COMPLETE | browsing | tree を保存 |
| scanning | SCAN_FAIL | error | Toast 表示 |
| error | RESET_TO_IDLE | idle | tree クリア |
| browsing | TOGGLE_FILE_CHECK | browsing | queue 更新 |
| browsing | TOGGLE_DIR_CHECK | browsing | queue 一括更新 |
| browsing | TOGGLE_DIR_EXPAND | browsing | tree のフラグ更新 |
| browsing | SORT_QUEUE | browsing | queue 並び替え |
| browsing | MOVE_QUEUE_ITEM | browsing | queue 位置変更 |
| browsing | PREVIEW_OPEN | preview-open | フォーカス保存 |
| preview-open | PREVIEW_CLOSE | browsing | フォーカス復帰、Blob 解放 |
| browsing | JOIN_START | ffmpeg-loading | FFmpeg lazy load |
| ffmpeg-loading | JOIN_LOAD_PROGRESS | ffmpeg-loading | progress 更新 |
| ffmpeg-loading | JOIN_LOAD_COMPLETE | joining | concat 開始 |
| joining | JOIN_PROGRESS | joining | progress 更新 |
| joining | JOIN_FALLBACK_TO_FILTER | joining | filter 経路 |
| joining | JOIN_FILE_SKIP | joining | 続行 |
| joining | JOIN_COMPLETE | done | result 保存 |
| joining | JOIN_CANCEL | browsing | ffmpeg.terminate |
| joining / ffmpeg-loading | JOIN_FAIL | error | Toast 表示 |
| done | RESET_TO_BROWSING | browsing | result 解放 |
| done | RESET_TO_IDLE | idle | 全リセット |

### 4.4 ステートマシン図（テキスト）

```
              ┌────────┐
              │  idle  │←─────────────────────┐
              └───┬────┘                       │
                  │ SCAN_START                  │ RESET_TO_IDLE
                  ▼                            │
              ┌────────────┐                  │
   ┌──FAIL──→ │  scanning  │                  │
   │          └──────┬─────┘                  │
   │                 │ COMPLETE               │
   │                 ▼                        │
   │          ┌────────────┐    PREVIEW_OPEN  │
   │  ┌─────→ │  browsing  │ ───────────┐     │
   │  │       └──────┬─────┘            ▼     │
   │  │              │                 ┌──────────────┐
   │  │              │ JOIN_START      │ preview-open │
   │  │              ▼                 └──────┬───────┘
   │  │       ┌──────────────────┐            │ CLOSE
   │  │  ┌──→ │  ffmpeg-loading  │ ───────────┘
   │  │  │    └──────┬───────────┘
   │  │  │           │ LOAD_COMPLETE
   │  │  │           ▼
   │  │  │    ┌─────────────┐  CANCEL
   │  │  │    │   joining   │ ─────────────────┐
   │  │  │    └──────┬──────┘                  │
   │  │  │           │ COMPLETE                │
   │  │  │           ▼                         ▼
   │  │  │    ┌─────────────┐          back to browsing
   │  │  │    │     done    │
   │  │  │    └──────┬──────┘
   │  │  │           │ RESET_TO_BROWSING
   │  │  └───────────┘
   │  │
   │  │   FAIL (any phase)
   │  ▼
   │  ┌────────┐
   └─→│  error │
      └────────┘
```

---

## 5. コンポーネント間通信

### 5.1 通信パターン

| パターン | 用途 | 実装 |
|---------|------|------|
| Props drilling | 浅い階層（最大 2 段）| 通常の props |
| Context | 全アプリ状態 / トースト | `AppContext`, `ToastContext` |
| Custom Hooks | ロジック共有 | hooks/ 各モジュール |
| Reducer Action | 状態変更 | `dispatch(action)` |
| Event Bus | （使わない）| — |
| Pub/Sub | （使わない）| — |

### 5.2 AppContext の構造

```typescript
interface AppContextValue {
  state: AppContextState;
  dispatch: React.Dispatch<AppAction>;
}

interface AppContextState {
  appState: AppState;
  tree: TreeNode | null;
  selection: Set<NodeId>;
  queue: MergeQueue;
  job: JoinJob;
  preview: { fileId: NodeId | null; speed: PlaybackSpeed };
  scanProgress: number;
  errors: AppError[];
}
```

### 5.3 Context 分割の判断

| Context | 理由 |
|---------|------|
| AppContext | 全画面で参照される中核状態 |
| ToastContext | Toast の頻繁な追加・削除で再レンダ範囲を限定 |

> Prototype A では Context は 2 つに留める。Prototype B/C でパフォーマンス計測後に細粒度化（Zustand 等）を検討。

### 5.4 副作用の所在

| 副作用 | 所在 | 例 |
|--------|------|----|
| FFmpeg ロード | `useFFmpegJoin` | `services/ffmpegService.loadCore` |
| Blob URL 生成・解放 | `services/blobManager`（singleton）| 各所 |
| IntersectionObserver | `useThumbnail` 内 | サムネ生成トリガ |
| Window event | `useFolderPicker`（drag/drop）| `addEventListener('dragover', ...)` |
| storage | （使わない）| — |

---

## 6. Web Worker 設計

### 6.1 Worker 化の判定基準

| 候補処理 | UI ブロック影響 | 実装コスト | Prototype A 採否 |
|---------|---------------|----------|----------------|
| FFmpeg 実行 | 大（数十秒）| 低（@ffmpeg/ffmpeg が内部で Worker 化）| ✅ 既定で Worker 化 |
| フォルダ走査（1000 件）| 中（数秒）| 中 | △ Phase 4 で 1000 件超ベンチ後判断 |
| サムネ生成（1 ファイル 200ms）| 小（IntersectionObserver で分散）| 中（OffscreenCanvas 必要）| × Prototype C で実装 |
| ソート（純関数）| 小 | — | × メインスレッドで十分 |

### 6.2 Prototype A の Worker 構成

- **FFmpeg Worker**: `@ffmpeg/ffmpeg` ライブラリが内部で `core.worker.js` を起動。アプリ側は通常の async/await。
- **自前 Worker**: なし（最小構成）

### 6.3 Prototype C の拡張案

| Worker | 入出力 | 通信プロトコル |
|--------|--------|--------------|
| `scanner.worker.ts` | in: handle (transferable), out: chunks of FileEntry[] | postMessage with `transfer: [handle]` |
| `thumbnail.worker.ts` | in: { file, atSec }, out: ImageBitmap or Blob | OffscreenCanvas + transfer |

### 6.4 Worker 周りの注意点

- **structuredClone 対応**: `FileSystemFileHandle` は転送可能（Chromium）。File オブジェクトもクローン可能
- **エラーハンドリング**: `worker.onerror` と `Promise reject` の両方で捕捉
- **ライフサイクル**: 単一インスタンス（singleton）で再利用、`terminate()` でクリーンアップ
- **型安全**: `comlink` のような RPC ライブラリは不採用、自前の `postMessage` + 型定義（軽量化）

---

## 7. プロトタイプバリアント（A/B/C）

Phase 2 で 3 つのプロトタイプを並列実装する。本書のアーキテクチャを基底とし、各バリアントが独自の最適化を加える。

### 7.1 Prototype A: 保守版（本書のベースライン）

| 観点 | 採用 |
|------|------|
| FFmpeg | 単一スレッド `@ffmpeg/core` |
| 状態管理 | React Context + useReducer |
| ツリー | 自前実装（IntersectionObserver 遅延描画）|
| D&D | HTML5 Drag and Drop API |
| キャッシュ | なし（セッション内のみ）|
| Service Worker | なし |
| i18n | なし（日本語固定）|

**強み**: ブラウザ互換性最大、依存最小、テスト容易。
**懸念**: 1 万ファイル超で描画もたつき、再エンコードが遅い。

### 7.2 Prototype B: PWA + SW キャッシュ版

| 観点 | 追加・差分 |
|------|----------|
| FFmpeg | 単一スレッド（同じ）|
| Service Worker | `vite-plugin-pwa` で生成、FFmpeg core を永続キャッシュ |
| 起動高速化 | App Shell キャッシュで 2 回目以降 < 1s |
| オフライン | 結合機能は完全オフライン動作 |
| マニフェスト | manifest.webmanifest を追加 |

**強み**: 2 回目以降の起動が劇的に速い、オフライン動作。
**懸念**: SW 更新時のキャッシュ競合（バージョニング戦略必須）。

### 7.3 Prototype C: マルチスレッド + 仮想化版（Plan B のアイデアを取り込み）

| 観点 | 追加・差分 |
|------|----------|
| FFmpeg | `@ffmpeg/core-mt` + Service Worker で COOP/COEP 注入 |
| 結合速度 | 2-4 倍（再エンコード時）|
| ツリー | 1 万ノード対応（自前仮想スクロール、または react-arborist 試験採用）|
| サムネ生成 | OffscreenCanvas + Worker プール（並列）|
| キャッシュ | IndexedDB で thumbnail を永続化 |
| D&D | dnd-kit でアクセシブル D&D |
| アニメ | View Transitions API |

**強み**: パフォーマンス最大、大量ファイル対応。
**懸念**: SW + COOP/COEP 注入の動作実証が必要、依存が増える。

### 7.4 評価軸（autonomous_evaluator_ux 用）

| 軸 | A | B | C |
|----|---|---|---|
| ブラウザ互換 | ★★★ | ★★★ | ★★ |
| 結合速度 | ★ | ★ | ★★★ |
| 起動速度 | ★★ | ★★★ | ★★ |
| 大量ファイル | ★★ | ★★ | ★★★ |
| 依存最小 | ★★★ | ★★ | ★ |
| FINDY 対応 | ★★ | ★★★ | ★★★ |

UX 重視で評価し、最良を mainブランチに採用する。

---

## 8. パフォーマンス・セキュリティ設計

### 8.1 パフォーマンス指針

| 領域 | 戦略 |
|------|------|
| 初期ロード | Critical CSS inline、FFmpeg lazy load、JS < 250KB gzip |
| LCP | DropZone を最初に描画（重い画像なし）|
| INP | イベントハンドラは即同期、重い処理は `requestIdleCallback` |
| CLS | 画像/サムネに `width × height` または `aspect-ratio` 指定 |
| メモリ | Blob URL を blobManager で集中管理、cleanup 徹底 |
| FFmpeg | 結合後 `ffmpeg.deleteFile` で入力ファイル解放 |
| サムネ | IntersectionObserver で生成範囲を限定 |
| ツリー再レンダ | TreeNodeRow を `React.memo`、Context selector で部分購読 |

### 8.2 セキュリティ指針

| 領域 | 戦略 |
|------|------|
| データ送信 | 一切なし（ローカル完結を README/about で明示）|
| CSP | `<meta>` で `default-src 'self'; script-src 'self' 'wasm-unsafe-eval'`|
| SRI | CDN 不使用、全アセットをセルフホスト（@ffmpeg/core は npm から bundle）|
| XSS | React のデフォルト escape を信頼、`dangerouslySetInnerHTML` 禁止 |
| ファイル名表示 | パス表示時にエンコード（`<` `>` 等を escape）|
| ライセンス | LICENSE に MIT + FFmpeg LGPL/GPL を明記 |

### 8.3 プライバシー

- ユーザーのファイル名・サイズ・コンテンツが外部に流出しないことを保証
- localStorage / IndexedDB に PII を保存しない（Prototype A は使用しない）
- 開発者ツール経由でのみエラーログを確認可能

---

## 9. 補足: Plan B（革新版）からの取り込みポイント

> Phase 1-A で生成された `[REDACTED]phase1-planning-b/PLAN_OUTLINE.md` の革新的アイデアを、Phase 2 の Prototype C 実装ヒントとしてここに集約する。

### 9.1 Prototype C で試行する技術（PLAN_OUTLINE_B § 1.6 / § 4 / § 6 より）

| # | 技術 | 効果（B 提案）| Prototype C 採否 |
|---|------|------------|-----------------|
| 1 | `@ffmpeg/core-mt` + SharedArrayBuffer | 結合速度 2-4 倍 | ✅ 採用試行 |
| 2 | Service Worker による COOP/COEP 注入 | GitHub Pages 制約突破 | ✅ 採用試行 |
| 3 | OffscreenCanvas + Worker プールでサムネ並列 | 100 枚生成が 4-8 倍速 | ✅ 採用試行 |
| 4 | react-arborist 仮想スクロール | 1 万ノード対応 | △ 自前仮想スクロールと比較評価 |
| 5 | IndexedDB キャッシュ（idb） | リロード後の体感速度向上 | ✅ サムネキャッシュとして採用試行 |
| 6 | dnd-kit | アクセシブル D&D | △ HTML5 D&D と比較評価 |
| 7 | View Transitions API | 並び替えアニメ滑らか | ✅ 対応ブラウザのみ progressive enhancement |
| 8 | React 19 (`use`, `useTransition`) | 並行レンダの恩恵 | × Prototype C は React 18 維持（破壊的変更回避）|
| 9 | Zustand | 軽量ストア | △ Context が遅いと判断した場合のみ |
| 10 | i18n（react-i18next） | グローバル対応 | × Phase 4 以降 |
| 11 | PWA（vite-plugin-pwa） | オフライン動作 | Prototype B の特色とする |

### 9.2 Prototype C 専用追加モジュール（提案）

```
src/
├── infra/
│   ├── sw/
│   │   └── coopCoepSw.ts          # COOP/COEP 注入 SW
│   ├── workers/
│   │   ├── thumbnail.worker.ts    # OffscreenCanvas
│   │   └── thumbnailPool.ts       # Worker プール
│   ├── idb/
│   │   ├── cacheDb.ts             # IndexedDB スキーマ
│   │   └── thumbnailCache.ts      # サムネキャッシュアクセサ
│   └── ffmpeg/
│       └── ffmpegMtAdapter.ts     # core-mt 用ラッパ
```

### 9.3 評価方針

- A/B/C を `[REDACTED]src/autonomous_evaluator_ux.py` で評価
- UX 軸 35% を最優先（パフォーマンス、ユーザビリティ、a11y、レスポンシブ）
- スコア最大のプロトタイプを `main` にマージ

---

**この ARCHITECTURE.md は Phase 2 のすべてのプロトタイプ実装の基底となる。Prototype A は本書の構成を直接実装、B は SW 機能を追加、C は §9 の革新項目を取り込む。**


---

# TECH_STACK.md - mp4-join 技術選定書

**プロジェクト**: mp4-join
**作成日**: 2026-04-27
**ベース計画**: 計画案 A（保守的）／Plan B 革新版のアイデアは Prototype C で取り込み

---

## 1. フロントエンド技術スタック

### 1.1 採用バージョン（Prototype A: 保守版）

| カテゴリ | 採用技術 | バージョン | 理由 |
|---------|---------|-----------|------|
| フレームワーク | **React** | 18.3.1 | 関数コンポーネント + Hooks のデファクト。AI 学習データが豊富で品質安定。Concurrent 機能 (`useTransition`, `useDeferredValue`) も利用可能。 |
| 言語 | **TypeScript** | 5.5.4 | `strict: true`、`any` 禁止、`exactOptionalPropertyTypes: true` |
| ビルドツール | **Vite** | 5.4.x | ESM-native、HMR 高速、Worker サポート充実、`build.rollupOptions.output.manualChunks` で分割可能 |
| Vite React プラグイン | **@vitejs/plugin-react** | 4.3.x | React の HMR と Fast Refresh |
| スタイリング | **Tailwind CSS** | 3.4.x | クラスベース、設定軽量、JIT コンパイル |
| Tailwind プラグイン | **@tailwindcss/forms** | 0.5.x | フォーム要素の正規化 |
| アイコン | **lucide-react** | 0.453.x | SVG ベース、tree-shake 対応、デザイン統一感 |
| 状態管理 | **React Context + useReducer** | — | アプリ規模に対して十分。ライブラリ追加なし |
| ルーティング | **なし** | — | 単一画面 SPA |
| ユニーク ID | **crypto.randomUUID** | (Browser API) | 標準 API、依存なし |

> Prototype B / C で React 19 / Zustand / react-arborist / dnd-kit を試験採用する余地を残す（ARCHITECTURE.md §補足参照）

### 1.2 動画処理ライブラリ

| カテゴリ | 採用技術 | バージョン | 理由 |
|---------|---------|-----------|------|
| 動画結合 | **@ffmpeg/ffmpeg** | 0.12.10 | デファクト。`ffmpeg.exec` API が安定 |
| FFmpeg コア | **@ffmpeg/core** | 0.12.6 | 単一スレッド版。COOP/COEP ヘッダ不要 |
| FFmpeg ユーティリティ | **@ffmpeg/util** | 0.12.x | `fetchFile`, `toBlobURL` でロード補助 |

#### `@ffmpeg/core` vs `@ffmpeg/core-mt` 比較

| 観点 | `core` (単一スレッド) | `core-mt` (マルチスレッド) |
|------|----------------------|---------------------------|
| バンドルサイズ | 約 25 MB | 約 32 MB |
| 結合速度 | 基準 (1.0x) | 2-4x（再エンコード時） |
| 必要ヘッダ | なし | `Cross-Origin-Opener-Policy: same-origin` + `Cross-Origin-Embedder-Policy: require-corp` |
| GitHub Pages 直配信 | ✅ 動作 | ❌ ヘッダ設定不可（Service Worker 経由なら可） |
| iOS Safari | ✅ 動作 | ❌ SharedArrayBuffer 制約 |
| Prototype A の選択 | ✅ デフォルト採用 | — |
| Prototype C の選択 | フォールバック | ✅ デフォルト採用（SW で COOP/COEP 注入） |

**Prototype A は `@ffmpeg/core` を採用** し、確実な動作を優先する。Prototype C で `core-mt` を試行する。

### 1.3 開発・品質ツール

| カテゴリ | 採用技術 | バージョン | 理由 |
|---------|---------|-----------|------|
| ユニットテスト | **Vitest** | 2.1.x | Vite ネイティブ、Jest 互換 API、jsdom サポート |
| カバレッジ | **@vitest/coverage-v8** | 2.1.x | V8 coverage、高速 |
| コンポーネントテスト | **@testing-library/react** | 16.x | a11y 重視のクエリ |
| ユーザーイベント | **@testing-library/user-event** | 14.x | 実際のユーザー操作を再現 |
| jsdom 拡張 | **happy-dom** | 15.x | jsdom の代替（高速）— Vitest デフォルトに |
| E2E テスト | **Playwright** | 1.47.x | 公式仕様、Chromium/Firefox/WebKit 対応 |
| アクセシビリティ | **@axe-core/playwright** | 4.10.x | 自動 WCAG 2.1 AA 検証 |
| Lint | **ESLint** | 9.x (flat config) | 標準 |
| Lint プリセット | **typescript-eslint** | 8.x | TS 専用ルール |
| React フック lint | **eslint-plugin-react-hooks** | 5.x | hooks ルール |
| a11y lint | **eslint-plugin-jsx-a11y** | 6.x | JSX の a11y ルール |
| Format | **Prettier** | 3.3.x | 標準 |
| 型チェック | **tsc --noEmit** | (TypeScript 同梱) | CI で必須 |
| Stylelint | （導入しない） | — | Tailwind 中心のため不要 |

### 1.4 ファイル取得 API

| 機能 | 第一選択 | フォールバック |
|------|----------|--------------|
| フォルダ選択ボタン | `window.showDirectoryPicker()` | `<input type="file" webkitdirectory multiple>` |
| フォルダ D&D | `DataTransferItem.getAsFileSystemHandle()` | webkitdirectory ボタンへ誘導 |
| 再帰走査 | `FileSystemDirectoryHandle.values()` | `FileList` を `webkitRelativePath` でツリー化 |

### 1.5 ホスティング・デプロイ

| 環境 | 構成 |
|------|------|
| 本番 | GitHub Pages (`https://sohei-t.github.io/ai-agent-portfolio/mp4-join/`) |
| デプロイ | `[REDACTED]src/simplified_github_publisher.py` で自動公開 |
| ローカル | `launch_app.command` → `python3 -m http.server 8080` |
| ビルド出力 | `dist/` → `project/public/` にコピー |

---

## 2. 採用しなかった技術と理由

| 検討した技術 | 不採用の理由 |
|--------------|------------|
| **Next.js / Remix** | SSR 不要、SPA で十分、デプロイが GitHub Pages 制約と合わない |
| **Zustand** (Prototype A) | 規模に対しオーバースペック。Context + useReducer で十分。Prototype B/C で試験採用の余地あり |
| **Redux Toolkit** | 同上。ボイラープレート過多 |
| **MUI / Chakra UI** | バンドル増、Tailwind と競合。Lucide React + 自前で十分な見栄えを実現可 |
| **WebCodecs API** | Safari 対応がまだ限定的、エラーハンドリング複雑。FFmpeg.wasm の安定性を優先 |
| **react-arborist** (Prototype A) | ファイル数の上限が見えるまで自前実装で十分。Prototype C で 1 万件超対応のため検討 |
| **react-window / react-virtuoso** | 自前で `IntersectionObserver` ベースの遅延描画で代替可能 |
| **dnd-kit** (Prototype A) | HTML5 D&D で機能要件を満たせる。Prototype C でアクセシブル D&D 強化のため検討 |
| **react-dnd** | dnd-kit の方が新しく軽量。両方とも Prototype A では不要 |
| **SWR / TanStack Query** | サーバー通信なし、不要 |
| **React Router** | 単一画面のため不要 |
| **i18next / react-i18next** | アプリ本体は日本語固定（about.html のみ日英切替）。Phase 4 で検討 |
| **idb (IndexedDB wrapper)** | キャッシュは Prototype A スコープ外。Prototype B/C で導入余地 |
| **vite-plugin-pwa** | Prototype A スコープ外。Prototype B/C で SW + COOP/COEP 注入用に採用検討 |
| **clsx + tailwind-merge** | 単純なクラス結合は文字列テンプレートで足りる |
| **react-hot-toast** | 自前 Toast コンポーネント（Context + 配列）で 50 行以内に実装可 |

---

## 3. バンドル戦略

### 3.1 コードスプリッティング

| チャンク | 内容 | サイズ目安 | ロード戦略 |
|---------|------|-----------|-----------|
| `index.[hash].js` | React + アプリ本体 | 約 200 KB (gzip) | 初期ロード |
| `vendor-react.[hash].js` | React + ReactDOM | 約 45 KB (gzip) | 初期ロード |
| `ffmpeg.[hash].js` | `@ffmpeg/ffmpeg` のラッパ | 約 30 KB | dynamic import（結合ボタン押下時） |
| `ffmpeg-core.[hash].js` | `@ffmpeg/core` JS | 約 200 KB | dynamic import |
| `ffmpeg-core.[hash].wasm` | FFmpeg WASM 本体 | 約 25 MB | `toBlobURL` で fetch |
| `index.[hash].css` | Tailwind 出力 | 約 10 KB (gzip) | 初期ロード |

#### vite.config.ts の主な設定（抜粋）

```typescript
export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    target: 'es2020',
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom'],
          'vendor-icons': ['lucide-react'],
        },
      },
    },
  },
  worker: {
    format: 'es',
  },
  optimizeDeps: {
    exclude: ['@ffmpeg/ffmpeg', '@ffmpeg/util'],
  },
});
```

### 3.2 圧縮戦略

- Vite ビルドで自動的に gzip 対応の `*.gz` を生成（`vite-plugin-compression` は不要、ホスティングが対応する場合のみ）
- GitHub Pages は gzip 自動配信されるため追加設定不要
- WASM の事前 gzip は GitHub Pages 制約により無効（クライアント側で展開不可）

### 3.3 LCP 最適化

- index.html の `<head>` に critical CSS を inline 化（Vite 標準）
- フォントは system font stack（外部フォント不使用）
- 初期表示には FFmpeg コアを含めない（lazy load）

---

## 4. ビルド・デプロイ手順

### 4.1 開発

```bash
# プロジェクトルート: project/
npm install
npm run dev          # Vite dev server (http://./)
npm run test         # Vitest watch
npm run test:run     # 1 回実行
npm run test:coverage
npm run lint
npm run typecheck
```

### 4.2 ビルド

```bash
npm run build        # Vite build → dist/
npm run preview      # ビルド成果物の確認
```

### 4.3 GitHub Pages 用配置（Phase 5）

```bash
# project/dist/ の中身を project/public/ にコピー
cp -r project/dist/* project/public/

# 追加ファイル（Phase 5 で生成）
# project/public/about.html
# project/public/README.md
# project/public/explanation.mp3 （任意）
```

### 4.4 GitHub Actions 連携

- `[REDACTED]src/simplified_github_publisher.py` が自動的に：
  - `project/public/` を `ai-agent-portfolio/mp4-join/` に push
  - GitHub Pages を自動有効化
  - リリースタグ `mp4-join-v1.0.0` を作成

---

## 5. パッケージ依存ツリー（package.json ひな形）

### 5.1 project/package.json

```json
{
  "name": "mp4-join",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "preview": "vite preview",
    "test": "vitest",
    "test:run": "vitest run",
    "test:coverage": "vitest run --coverage",
    "test:e2e": "playwright test",
    "lint": "eslint src --ext .ts,.tsx",
    "format": "prettier --write src",
    "typecheck": "tsc --noEmit"
  },
  "dependencies": {
    "@ffmpeg/ffmpeg": "^0.12.10",
    "@ffmpeg/core": "^0.12.6",
    "@ffmpeg/util": "^0.12.1",
    "lucide-react": "^0.453.0",
    "react": "^18.3.1",
    "react-dom": "^18.3.1"
  },
  "devDependencies": {
    "@axe-core/playwright": "^4.10.1",
    "@playwright/test": "^1.47.0",
    "@tailwindcss/forms": "^0.5.7",
    "@testing-library/jest-dom": "^6.5.0",
    "@testing-library/react": "^16.0.1",
    "@testing-library/user-event": "^14.5.2",
    "@types/react": "^18.3.10",
    "@types/react-dom": "^18.3.0",
    "@vitejs/plugin-react": "^4.3.1",
    "@vitest/coverage-v8": "^2.1.0",
    "autoprefixer": "^10.4.20",
    "eslint": "^9.11.0",
    "eslint-plugin-jsx-a11y": "^6.10.0",
    "eslint-plugin-react": "^7.36.1",
    "eslint-plugin-react-hooks": "^5.0.0-canary",
    "happy-dom": "^15.7.4",
    "postcss": "^8.4.47",
    "prettier": "^3.3.3",
    "tailwindcss": "^3.4.13",
    "typescript": "^5.5.4",
    "typescript-eslint": "^8.7.0",
    "vite": "^5.4.8",
    "vitest": "^2.1.1"
  },
  "engines": {
    "node": ">=20.10.0"
  }
}
```

### 5.2 セキュリティ・ライセンス

| パッケージ | ライセンス | 確認 |
|-----------|-----------|------|
| React | MIT | ✅ |
| @ffmpeg/* | MIT (wrapper) / GPL (FFmpeg core) | ⚠️ GPL: 商用利用時は配慮（本アプリは MIT 配信、ユーザーが結合した動画自体には影響なし）|
| Tailwind CSS | MIT | ✅ |
| lucide-react | ISC | ✅ |
| Vite | MIT | ✅ |
| Vitest / Playwright | MIT | ✅ |

**注**: `@ffmpeg/core` の WASM は LGPL/GPL ライセンスを継承するが、ブラウザでユーザーがローカル処理に使う限りは配布物自体は MIT ベースで問題ない。LICENSE ファイルに FFmpeg のライセンス表記を追加する。

### 5.3 Node.js / npm バージョン

- Node.js 20.10+ (LTS)
- npm 10+
- ローカル開発で `nvm use` 用に `.nvmrc` を配置（ただしポートフォリオ公開時は除外）

---

## 6. 設定ファイル一覧

| ファイル | 用途 | コミット |
|---------|------|---------|
| `vite.config.ts` | Vite 設定（chunks, worker format） | ✅ |
| `tsconfig.json` | TypeScript（strict, ESM） | ✅ |
| `tsconfig.node.json` | Vite 用 Node 設定 | ✅ |
| `tailwind.config.ts` | Tailwind（カラーパレット、breakpoints） | ✅ |
| `postcss.config.js` | PostCSS（autoprefixer） | ✅ |
| `.eslintrc.cjs` または `eslint.config.js` | ESLint flat config | ✅ |
| `.prettierrc` | Prettier 設定 | ✅ |
| `vitest.config.ts` | Vitest（happy-dom、coverage） | ✅ |
| `playwright.config.ts` | Playwright（projects: chromium / firefox / webkit） | ✅ |

---

## 7. 環境変数

本アプリはサーバー通信なしのため環境変数はビルド時のみ：

| 変数 | 用途 | 既定 |
|------|------|------|
| `VITE_APP_VERSION` | About 画面に表示 | `package.json` の version を `import.meta.env` 経由で参照 |
| `VITE_FFMPEG_CORE_URL` | FFmpeg core の CDN URL（オプション） | 内部バンドル |

---

## 8. ブラウザサポート目標

詳細は `REQUIREMENTS.md` 4.4 互換性表に従う。

| ブラウザ | 最低バージョン | サポート |
|---------|--------------|---------|
| Chrome | 110 | フル |
| Edge | 110 | フル |
| Firefox | 115 | webkitdirectory のみ |
| Safari (macOS) | 16.4 | webkitdirectory のみ |
| Safari (iOS) | 16.4 | 制限あり（メモリ警告必須） |
| Mobile Chrome (Android) | 110 | 部分（メモリ警告必須） |

---

## 9. パフォーマンス予算

| メトリクス | 目標 | 計測方法 |
|-----------|------|---------|
| LCP | < 2.5s | Lighthouse、Web Vitals |
| FID / INP | < 100ms / < 200ms | Lighthouse |
| CLS | < 0.1 | Lighthouse |
| 初期 JS バンドル | < 250 KB (gzip) | Vite build summary |
| FFmpeg lazy load | 結合ボタン押下時のみ | DevTools Network |
| 1000 ファイル走査 | < 5s | Performance API |
| サムネイル 1 枚生成 | < 500ms (小 mp4) | Performance API |

---

## 10. 将来の拡張余地（Phase 4 以降検討）

| 機能 | 採用候補技術 |
|------|------------|
| マルチスレッド FFmpeg | `@ffmpeg/core-mt` + Service Worker COOP/COEP 注入 |
| サムネ並列生成 | OffscreenCanvas + Worker プール |
| 大量ファイル仮想化 | react-arborist または自前 |
| アクセシブル D&D 強化 | dnd-kit |
| オフライン動作 | vite-plugin-pwa |
| サムネキャッシュ | IndexedDB + idb |
| アニメ並び替え | View Transitions API |
| i18n（本体） | react-i18next |
| 状態管理（規模拡大時） | Zustand |
| サイズ表示の単位切替 | カスタムフック自作（軽量）|

これらは Phase 4 の最適化で「効果が大きいもの」を抽出して実装する。

---

**この技術スタックで Phase 2 の Prototype A 実装を開始する。**
**Prototype B（PWA + SW）/ Prototype C（マルチスレッド + 仮想化）は本書を基底に追加技術を導入する。**


---


## Tech Stack (from package.json)

### Dependencies
- @google-cloud/text-to-speech
