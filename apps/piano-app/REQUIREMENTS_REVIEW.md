# 要件定義レビュー記録

## イテレーション1: 初期要件定義
**日時**: 2024-12-09
**ステータス**: 完了

### 作成内容
- プロジェクト概要の定義
- 必須機能（MVP）の洗い出し
- 非機能要件の明確化
- 技術スタック提案
- リスク分析
- マイルストーン設定

### 主要決定事項
- Web Audio API を採用（無料、外部音源ファイル不要）
- Vanilla JavaScript または React（軽量化優先）
- Vite をビルドツールに選定
- スマホ対応を最優先

---

## イテレーション2: 曖昧な点の明確化と実現可能性評価

### 2.1 曖昧な点の明確化

#### 2.1.1 鍵盤数の詳細仕様
**問題**: スマホ横向きで「1.5-2オクターブ」は具体的に何鍵？

**明確化**:
- スマホ縦向き: 1オクターブ = 12鍵（C4-B4）
- スマホ横向き（小画面, 〜375px幅）: 1.5オクターブ = 18鍵（C4-F5）
- スマホ横向き（中画面, 376-768px幅）: 2オクターブ = 24鍵（C4-B5）
- タブレット/PC: 2.5オクターブ = 30鍵（C4-F6）

#### 2.1.2 同時発音数の制限
**問題**: 「最大10音」は技術的に適切か？

**評価結果**:
- Web Audio APIでは理論上100音以上同時発音可能
- しかし、スマホのCPU負荷を考慮すると10音が妥当
- 実装方針: 古いノード（発音終了）を自動削除するガベージコレクション実装

**修正**: 制限を維持（10音）

#### 2.1.3 録音データ形式
**問題**: 「音符とタイミング」を具体的にどう記録？

**明確化**:
```json
{
  "version": "1.0",
  "tempo": 120,
  "events": [
    {
      "type": "noteOn",
      "note": "C4",
      "frequency": 261.63,
      "timestamp": 0.0,
      "velocity": 0.8
    },
    {
      "type": "noteOff",
      "note": "C4",
      "timestamp": 0.5
    }
  ]
}
```
- MIDI風の形式（noteOn/noteOff）
- タイムスタンプは秒単位（小数点以下3桁）
- velocity は音の強さ（0.0-1.0）

#### 2.1.4 練習曲のガイド表示
**問題**: 「次に弾く鍵盤をハイライト」の具体的な実装方法は？

**明確化**:
- 楽譜データをJSON形式で保持
- 現在位置をトラッキング
- 次の音符を緑色でハイライト（1秒前から点滅）
- 押した後は青色に変化（正解）、押し間違いは赤色

例：
```json
{
  "title": "きらきら星",
  "notes": [
    { "note": "C4", "duration": 0.5, "text": "ド" },
    { "note": "C4", "duration": 0.5, "text": "ド" },
    { "note": "G4", "duration": 0.5, "text": "ソ" }
  ]
}
```

#### 2.1.5 テーマシステムの実装方法
**問題**: CSS Variablesで十分か？

**評価結果**:
- CSS Variablesで十分対応可能
- `data-theme` 属性でテーマ切り替え
- アニメーション付きテーマ遷移（0.3秒のtransition）

**実装例**:
```css
[data-theme="classic"] {
  --key-white: #ffffff;
  --key-black: #000000;
  --bg-color: #1a1a1a;
}

[data-theme="modern"] {
  --key-white: linear-gradient(180deg, #f5f5f5, #e0e0e0);
  --key-black: linear-gradient(180deg, #333, #111);
  --bg-color: #2c3e50;
}

[data-theme="neon"] {
  --key-white: #0ff;
  --key-black: #f0f;
  --bg-color: #000;
  --glow: 0 0 10px currentColor;
}
```

---

### 2.2 実現可能性の評価

#### 2.2.1 音声遅延の懸念
**リスク**: スマホでの音声遅延（レイテンシ）

**評価**:
- 現代のブラウザ（Chrome, Safari）では20-50msのレイテンシが一般的
- 目標の50ms以内は達成可能

**技術対策**:
1. AudioContextの初期化をユーザー操作後に実行（iOS要件）
2. `latencyHint: 'interactive'` を設定
3. OscillatorNodeの事前プーリング（生成コスト削減）

```javascript
const audioContext = new AudioContext({ latencyHint: 'interactive' });
```

#### 2.2.2 LocalStorageの容量制限
**制約**: LocalStorageは通常5-10MB

**評価**:
- 録音データ（JSON形式）は1分あたり約10-20KB
- 5分の録音 = 約50-100KB
- 10件保存 = 約500KB-1MB → **問題なし**

**追加対策**:
- 容量超過時の警告表示
- 古い録音データの自動削除オプション

#### 2.2.3 Reactの必要性
**検討**: Vanilla JS vs React

**評価結果**:
| 項目 | Vanilla JS | React |
|------|------------|-------|
| 初期ロード | 速い（〜1秒） | やや遅い（〜2秒） |
| 開発速度 | 遅い | 速い |
| 状態管理 | 手動実装必要 | useStateで簡単 |
| バンドルサイズ | 小（〜50KB） | 中（〜150KB） |

**結論**: **React採用**
- 理由: 状態管理（テーマ、オクターブ、録音状態）が複雑
- 妥協案: Preact（Reactの軽量版、3KB）を検討

#### 2.2.4 オフライン対応の実現性
**要件**: CDNなしで動作

**評価**:
- npm installで依存関係をローカル化 → **可能**
- Viteでバンドル化 → **可能**
- Service Workerでキャッシュ → **オプション機能**

**結論**: 実現可能（Service WorkerはPhase 2で検討）

---

### 2.3 修正・追加事項

#### 追加機能
1. **キーボード操作対応**（PC向け）:
   - QWERTY配列で鍵盤演奏
   - 例: Q=C4, W=D4, E=E4...

2. **音量調整機能**:
   - スライダーで音量0-100%調整
   - ミュート機能

3. **全画面モード**:
   - スマホで鍵盤を大きく表示
   - ヘッダー/フッター非表示

#### 優先順位の調整
| 機能 | 旧 | 新 | 理由 |
|------|----|----|------|
| 録音・再生 | 必須 | 必須（Phase 1.5） | 実装複雑度高い、MVP後に移動 |
| 練習曲 | 必須 | オプション | 鍵盤演奏が最優先 |
| キーボード対応 | - | 必須 | PC体験向上、実装容易 |

#### 技術スタック最終決定
- **フレームワーク**: React（useState, useEffect中心）
- **ビルドツール**: Vite
- **スタイリング**: CSS Modules + CSS Variables
- **テスト**: Jest + React Testing Library + Playwright

---

### 2.4 更新されたMVPスコープ

#### Phase 1: コア機能（Day 1-3）
- [x] 鍵盤表示（レスポンシブ）
- [x] Web Audio API音源
- [x] オクターブ切り替え
- [x] テーマ切り替え（3種類）
- [x] 音名表示切り替え
- [x] キーボード操作対応
- [x] 音量調整

#### Phase 1.5: 録音機能（Day 4）
- [ ] 録音・再生
- [ ] LocalStorage保存

#### Phase 2: 学習機能（将来）
- [ ] 練習曲
- [ ] ガイド表示

---

### 2.5 明確化された非機能要件

#### パフォーマンス
- **初期ロード**: < 2秒（3Gネットワーク）
- **鍵盤レスポンス**: < 30ms（目標値を厳格化）
- **FPS**: 60fps維持（アニメーション時）

#### アクセシビリティ
- **WAI-ARIA**: ボタンにaria-label付与
- **キーボードナビゲーション**: Tabキーで移動可能
- **カラーコントラスト**: WCAG AA準拠

---

## イテレーション3: 優先順位の最適化とリスク再評価

### 3.1 MVPスコープの最終調整

#### 必須機能の再定義
以下の基準で優先順位を設定：
1. **ユーザー体験の核心**: 鍵盤演奏がスムーズにできるか
2. **技術的難易度**: 実装複雑度が低い順
3. **デモ性**: 視覚的に分かりやすいか

#### 最終MVP範囲
**Phase 1（3日間）**:
```
1. 鍵盤UI + 音源（Web Audio API） ← 最優先
2. オクターブ切り替え
3. テーマ切り替え（3種類）
4. 音名表示切り替え
5. 音量調整
6. キーボード操作（PC）
```

**Phase 2（2日間）**:
```
7. 録音・再生機能
8. LocalStorage保存
9. 簡単な練習曲（1曲のみ: きらきら星）
```

**Phase 3（将来拡張）**:
```
- 追加の練習曲
- メトロノーム
- 音源バリエーション
```

#### 削除した機能（Scope Out）
- 録音データのエクスポート/インポート（複雑度高）
- 練習曲のガイド機能（AI判定が複雑）
- コード表示機能（Phase 3へ延期）

---

### 3.2 技術的リスクの最終評価

#### リスク1: iOS Safariの自動再生制限
**詳細**: iOSではユーザー操作なしでAudioContextを開始できない

**対策**:
```javascript
// 初回タップ時にAudioContextを初期化
document.addEventListener('touchstart', () => {
  if (audioContext.state === 'suspended') {
    audioContext.resume();
  }
}, { once: true });
```

**検証方法**: iPhone実機テスト（Day 3）

#### リスク2: 黒鍵のタップ領域
**詳細**: スマホで黒鍵が小さくてタップしにくい可能性

**対策**:
- 黒鍵の幅を視覚表示より大きく設定（タップ領域拡大）
- `touch-action: manipulation` でダブルタップズーム無効化
- 最小タップ領域: 44x44px（Apple HIG準拠）

**実装例**:
```css
.black-key {
  width: 30px; /* 視覚的な幅 */
  padding: 10px; /* タップ領域拡大 */
  touch-action: manipulation;
}
```

#### リスク3: Web Audio APIのメモリリーク
**詳細**: OscillatorNodeを大量生成すると古いノードが残る

**対策**:
```javascript
const activeOscillators = new Map();

function playNote(frequency) {
  const osc = audioContext.createOscillator();
  const gainNode = audioContext.createGain();

  osc.connect(gainNode);
  gainNode.connect(audioContext.destination);

  osc.frequency.value = frequency;
  gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 1);

  osc.start();
  osc.stop(audioContext.currentTime + 1);

  // 1秒後に自動削除
  osc.onended = () => {
    osc.disconnect();
    gainNode.disconnect();
  };
}
```

---

### 3.3 成功基準の具体化

#### 定量的指標
| 指標 | 目標値 | 測定方法 |
|------|--------|----------|
| 初期ロード時間 | < 2秒 | Lighthouse |
| 鍵盤レスポンス | < 30ms | Performance API |
| テストカバレッジ | ≥ 80% | Jest coverage |
| バンドルサイズ | < 300KB | Vite build分析 |
| Lighthouse Score | ≥ 90 | Chrome DevTools |
| コンソールエラー | 0件 | 手動確認 |

#### 定性的指標
- [ ] 初心者が説明なしで演奏開始できる
- [ ] テーマ切り替えが視覚的に楽しい
- [ ] スマホで快適に演奏できる（ラグなし）
- [ ] 和音演奏がスムーズ

---

### 3.4 技術スタックの最終確定

#### 確定した技術構成
```yaml
frontend:
  framework: React 18
  build_tool: Vite 5
  styling: CSS Modules + CSS Variables

audio:
  api: Web Audio API
  format: Oscillator (sine wave)

storage:
  type: LocalStorage
  max_size: 5MB

testing:
  unit: Jest + React Testing Library
  e2e: Playwright
  coverage_target: 80%

deployment:
  hosting: Vercel (推奨) または GitHub Pages
  build_command: npm run build
```

#### 依存関係
```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "vite": "^5.0.0",
    "@vitejs/plugin-react": "^4.2.0",
    "jest": "^29.7.0",
    "@testing-library/react": "^14.1.0",
    "@testing-library/jest-dom": "^6.1.0",
    "playwright": "^1.40.0"
  }
}
```

---

### 3.5 最終的なファイル構造

```
piano-app/
├── public/
│   ├── index.html
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── Piano/
│   │   │   ├── Piano.jsx
│   │   │   ├── Piano.module.css
│   │   │   ├── Key.jsx
│   │   │   └── Key.module.css
│   │   ├── Controls/
│   │   │   ├── OctaveSelector.jsx
│   │   │   ├── ThemeSelector.jsx
│   │   │   ├── VolumeControl.jsx
│   │   │   └── Controls.module.css
│   │   └── Recorder/
│   │       ├── Recorder.jsx
│   │       └── Recorder.module.css
│   ├── hooks/
│   │   ├── useAudioEngine.js
│   │   ├── useRecorder.js
│   │   └── useKeyboard.js
│   ├── utils/
│   │   ├── audioEngine.js
│   │   ├── noteFrequencies.js
│   │   └── storage.js
│   ├── App.jsx
│   ├── App.css
│   └── main.jsx
├── tests/
│   ├── unit/
│   │   ├── audioEngine.test.js
│   │   └── Piano.test.jsx
│   └── e2e/
│       └── piano.spec.js
├── package.json
├── vite.config.js
├── jest.config.js
└── README.md
```

---

## 最終承認

### イテレーション2の成果
- [x] 曖昧な仕様を明確化
- [x] 実現可能性を技術的に検証
- [x] リスクの具体的対策を策定
- [x] 技術スタックを確定

### イテレーション3の成果
- [x] MVPスコープを最適化
- [x] 優先順位を明確化
- [x] 成功基準を定量化
- [x] ファイル構造を設計

### 次のアクション
1. REQUIREMENTS.md を更新（最終版）
2. WBS作成（詳細タスク分解）
3. テスト設計（テストケース作成）

---

**承認**: Requirements Analyst Agent
**日時**: 2024-12-09
**ステータス**: 要件定義完了（3イテレーション完了）
