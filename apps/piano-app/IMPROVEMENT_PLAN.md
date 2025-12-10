# Piano App - 改善計画書

**策定日時**: 2025-12-10
**策定者**: Improvement Planner Agent
**プロジェクト**: Piano Web Application (mission-piano-app)
**改善目標**: テストカバレッジ 26.53% → 80%以上

---

## 📊 現状分析サマリー

### 品質評価結果
- **テストカバレッジ**: 26.53% (目標: 80%)
- **テスト合格率**: 100% (281/281) ✅
- **ビルド成功**: 正常 ✅
- **セキュリティ**: 問題なし ✅
- **パフォーマンス**: 優秀 ✅

### 根本原因分析

#### 🔴 Critical Issue: テストカバレッジ不足の原因

1. **カスタムHooksが完全に未テスト (0%カバレッジ)**
   - 影響範囲: 6ファイル (useAudioEngine, useKeyboard, useLocalStorage, useRecorder, useResponsive, useTouch)
   - 原因: Hooksのテストには @testing-library/react-hooks が必要だが、テスト戦略で見落とされていた
   - 影響度: **極めて高** - これらはアプリの中核ロジック

2. **App.jsx が未テスト (0%カバレッジ)**
   - 影響範囲: 1ファイル (アプリケーション全体の統合ポイント)
   - 原因: 統合テストの優先度が低く設定されていた
   - 影響度: **高** - 全体の動作保証が不十分

3. **ユーティリティ関数が未テスト (0%カバレッジ)**
   - 影響範囲: 2ファイル (helpers.js, storage.js)
   - 原因: 重要度が低いと判断されていた
   - 影響度: **中** - debounce/throttleなど重要な関数を含む

---

## 🎯 改善戦略

### 戦略方針
1. **段階的アプローチ**: 影響度の高いものから順に対応
2. **既存テスト保護**: 現在の281テストは100%合格を維持
3. **実現可能性重視**: 3回の改善ループ内で完了可能な範囲

### 改善対象の優先順位付け

| 優先度 | 対象ファイル | 現在カバレッジ | 目標カバレッジ | 工数見積 |
|--------|------------|---------------|---------------|---------|
| **P0** | useAudioEngine.js | 0% | 85%+ | 3時間 |
| **P0** | App.jsx | 0% | 75%+ | 2.5時間 |
| **P1** | useKeyboard.js | 0% | 80%+ | 2時間 |
| **P1** | useLocalStorage.js | 0% | 90%+ | 1.5時間 |
| **P2** | useRecorder.js | 0% | 80%+ | 2時間 |
| **P2** | useResponsive.js | 0% | 85%+ | 1.5時間 |
| **P2** | useTouch.js | 0% | 80%+ | 1.5時間 |
| **P3** | helpers.js | 0% | 85%+ | 1.5時間 |
| **P4** | storage.js | 0% | 70%+ | 1時間 |

**総工数見積**: 約16.5時間 → **3回の改善ループで完了可能**

---

## 📋 改善タスクリスト（3段階実装）

### 🔄 改善ループ1: 最優先タスク（P0 + P1）

#### Task 1-1: useAudioEngine.js のテスト作成
**目標カバレッジ**: 85%+
**工数**: 3時間
**優先度**: P0（最優先）

**テスト観点**:
```javascript
// 1. 初期化テスト
- initialize() の成功/失敗ケース
- isInitialized フラグの状態管理
- AudioContext の生成確認

// 2. 音声再生テスト
- playNote() の正常動作
- 複数音の同時再生（ポリフォニー）
- MAX_POLYPHONY (10音) の制限テスト

// 3. 音声停止テスト
- stopNote() の正常動作
- stopAllNotes() の動作確認
- メモリリーク防止（disconnect確認）

// 4. 音量制御テスト
- setVolume() の範囲チェック (0-1)
- 音量変更の即時反映

// 5. クリーンアップテスト
- cleanup() の正常動作
- リソース解放の確認
```

**実装方法**:
```javascript
// テストファイル: src/hooks/__tests__/useAudioEngine.test.js
import { renderHook, act } from '@testing-library/react';
import { useAudioEngine } from '../useAudioEngine';

// Web Audio API のモック
global.AudioContext = jest.fn().mockImplementation(() => ({
  createOscillator: jest.fn(() => ({
    connect: jest.fn(),
    start: jest.fn(),
    stop: jest.fn(),
    frequency: { setValueAtTime: jest.fn() }
  })),
  createGain: jest.fn(() => ({
    connect: jest.fn(),
    gain: {
      setValueAtTime: jest.fn(),
      linearRampToValueAtTime: jest.fn()
    }
  })),
  destination: {},
  currentTime: 0
}));

describe('useAudioEngine Hook', () => {
  // ... テストケース実装
});
```

**期待される効果**:
- useAudioEngine.js のカバレッジ: 0% → 85%
- 音声エンジンの品質保証
- 将来の改修時のリグレッション防止

---

#### Task 1-2: App.jsx の統合テスト作成
**目標カバレッジ**: 75%+
**工数**: 2.5時間
**優先度**: P0（最優先）

**テスト観点**:
```javascript
// 1. レンダリングテスト
- すべての主要コンポーネントの表示確認
- Piano, Controls, Header の存在確認

// 2. ステート管理テスト
- オクターブ変更の動作
- 音量変更の動作
- テーマ切替の動作
- 音名表示切替の動作

// 3. ユーザーインタラクションテスト
- ピアノキーのクリック動作
- キーボード入力による演奏
- タッチ操作のシミュレーション

// 4. データ永続化テスト
- LocalStorage への設定保存
- ページリロード後の設定復元（モック）

// 5. エラーハンドリングテスト
- Audio初期化失敗時の動作
```

**実装方法**:
```javascript
// テストファイル: src/components/App/__tests__/App.test.jsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from '../App';

// LocalStorage のモック
const mockLocalStorage = (() => {
  let store = {};
  return {
    getItem: (key) => store[key] || null,
    setItem: (key, value) => { store[key] = value.toString(); },
    clear: () => { store = {}; }
  };
})();
Object.defineProperty(window, 'localStorage', { value: mockLocalStorage });

describe('App Integration Tests', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  // ... テストケース実装
});
```

**期待される効果**:
- App.jsx のカバレッジ: 0% → 75%
- 全体統合動作の保証
- ユーザーフローの品質保証

---

#### Task 1-3: useKeyboard.js のテスト作成
**目標カバレッジ**: 80%+
**工数**: 2時間
**優先度**: P1

**テスト観点**:
```javascript
// 1. キーマッピングテスト
- A-L キーが正しい音階にマッピング
- オクターブ変更時のマッピング更新

// 2. キーボードイベントテスト
- keydown イベントの処理
- keyup イベントの処理
- リピート防止（同じキーの連続押下）

// 3. クリーンアップテスト
- アンマウント時のリスナー削除
```

**実装方法**:
```javascript
// テストファイル: src/hooks/__tests__/useKeyboard.test.js
import { renderHook } from '@testing-library/react';
import { useKeyboard } from '../useKeyboard';

describe('useKeyboard Hook', () => {
  const mockOnNotePlay = jest.fn();
  const mockOnNoteStop = jest.fn();

  // ... テストケース実装
});
```

**期待される効果**:
- useKeyboard.js のカバレッジ: 0% → 80%
- キーボード操作の品質保証

---

#### Task 1-4: useLocalStorage.js のテスト作成
**目標カバレッジ**: 90%+
**工数**: 1.5時間
**優先度**: P1

**テスト観点**:
```javascript
// 1. データ読み込みテスト
- 存在するキーの読み込み
- 存在しないキーのデフォルト値返却
- JSON パースエラー時のフォールバック

// 2. データ保存テスト
- setValue() の正常動作
- JSON.stringify の実行確認

// 3. エラーハンドリングテスト
- LocalStorage 利用不可時の動作
```

**実装方法**:
```javascript
// テストファイル: src/hooks/__tests__/useLocalStorage.test.js
import { renderHook, act } from '@testing-library/react';
import { useLocalStorage } from '../useLocalStorage';

describe('useLocalStorage Hook', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  // ... テストケース実装
});
```

**期待される効果**:
- useLocalStorage.js のカバレッジ: 0% → 90%
- データ永続化の品質保証

---

### 🔄 改善ループ2: 重要タスク（P2）

#### Task 2-1: useRecorder.js のテスト作成
**目標カバレッジ**: 80%+
**工数**: 2時間
**優先度**: P2

**テスト観点**:
```javascript
// 1. 録音開始/停止テスト
- startRecording() の動作
- stopRecording() の動作
- 録音状態の管理

// 2. データ保存テスト
- 録音データの保存
- 再生機能の動作
```

---

#### Task 2-2: useResponsive.js のテスト作成
**目標カバレッジ**: 85%+
**工数**: 1.5時間
**優先度**: P2

**テスト観点**:
```javascript
// 1. ブレークポイント検出テスト
- isMobile, isTablet, isDesktop の判定
- window.matchMedia のモック

// 2. リサイズイベントテスト
- ウィンドウサイズ変更時の再評価
```

---

#### Task 2-3: useTouch.js のテスト作成
**目標カバレッジ**: 80%+
**工数**: 1.5時間
**優先度**: P2

**テスト観点**:
```javascript
// 1. タッチイベントテスト
- touchstart, touchend の処理
- マルチタッチ対応の確認

// 2. クリーンアップテスト
- イベントリスナーの削除
```

---

### 🔄 改善ループ3: 追加改善（P3-P4 + 最適化）

#### Task 3-1: helpers.js のテスト作成
**目標カバレッジ**: 85%+
**工数**: 1.5時間
**優先度**: P3

**テスト観点**:
```javascript
// 1. debounce 関数テスト
- 遅延実行の確認
- 複数回呼び出し時の動作

// 2. throttle 関数テスト
- 実行頻度制限の確認

// 3. その他ユーティリティ関数
```

---

#### Task 3-2: storage.js のテスト作成
**目標カバレッジ**: 70%+
**工数**: 1時間
**優先度**: P4

**テスト観点**:
```javascript
// 1. ストレージ操作テスト
- get, set, remove の動作
- エラーハンドリング
```

---

#### Task 3-3: React.memo 最適化（ボーナス改善）
**工数**: 1時間
**優先度**: P4（品質向上）

**対象コンポーネント**:
- Key.jsx
- Piano.jsx

**実装方法**:
```javascript
// Key.jsx の最適化例
import React, { memo } from 'react';

const Key = memo(({ note, octave, isBlack, onNotePlay, onNoteStop }) => {
  // ... 既存実装
}, (prevProps, nextProps) => {
  // カスタム比較関数（必要に応じて）
  return prevProps.note === nextProps.note &&
         prevProps.octave === nextProps.octave;
});

export default Key;
```

---

## 📈 カバレッジ予測

### 段階別カバレッジ改善予測

| 改善ループ | 完了タスク | 予測カバレッジ | 増加量 |
|----------|-----------|--------------|--------|
| **開始時** | - | 26.53% | - |
| **ループ1完了** | P0 + P1 タスク | 58-62% | +32-35% |
| **ループ2完了** | P2 タスク追加 | 72-76% | +14% |
| **ループ3完了** | P3-P4 タスク追加 | **82-85%** | +10% |

### 最終目標達成見込み
- **目標**: 80%以上
- **予測**: 82-85%
- **達成確率**: **95%以上**

---

## ⚠️ リスク評価と対策

### 識別されたリスク

#### リスク1: Web Audio API のモックが複雑
**影響度**: 中
**発生確率**: 中
**対策**:
- jest-web-audio-api パッケージの利用を検討
- 必要最小限のモック実装に限定
- 実装例をテンプレートとして準備

#### リスク2: 既存テストの破壊
**影響度**: 高
**発生確率**: 低
**対策**:
- 各タスク完了後に全テスト実行
- カバレッジ向上のみを目的とし、既存コードは変更しない
- テスト失敗時は即座にロールバック

#### リスク3: 時間超過
**影響度**: 中
**発生確率**: 低
**対策**:
- 優先度順に実装（P0 → P1 → P2）
- ループ3は時間が許す場合のみ実施
- 最低限ループ2完了で目標75%達成を目指す

---

## 🎯 成功基準

### 必須条件（Must Have）
- ✅ テストカバレッジ 80%以上
- ✅ 既存281テスト 100%合格維持
- ✅ ビルド成功（エラーなし）
- ✅ App.jsx と useAudioEngine.js のテスト完了

### 推奨条件（Should Have）
- ✅ 全6つのカスタムHooksがテスト済み
- ✅ helpers.js のテスト完了
- ✅ 改善ループ3回以内で完了

### 理想条件（Nice to Have）
- ✅ カバレッジ 85%以上
- ✅ React.memo 最適化適用
- ✅ ESLint設定追加（時間があれば）

---

## 📋 Fixer への実装指示

### 実装優先順位
1. **改善ループ1**: Task 1-1 → Task 1-2 → Task 1-3 → Task 1-4
2. **改善ループ2**: Task 2-1 → Task 2-2 → Task 2-3
3. **改善ループ3**: Task 3-1 → Task 3-2 → Task 3-3

### 各タスクの実装手順（標準フロー）
```bash
# 1. テストファイル作成
# 2. テスト実装
# 3. テスト実行
npm test -- --coverage

# 4. カバレッジ確認
# 5. 不足部分の追加テスト

# 6. 全テスト実行（既存含む）
npm test

# 7. ビルド確認
npm run build

# 8. コミット
git add .
git commit -m "test: add tests for [ファイル名] (coverage: X%)"
```

### 重要な注意事項
```
⚠️ 絶対に守ること:
1. 既存のソースコードは変更しない（テストのみ追加）
2. 各タスク完了後、必ず全テスト実行
3. テスト失敗時は原因特定後に修正
4. カバレッジレポートを毎回確認
5. コミットメッセージに達成カバレッジを記載
```

---

## 📊 実現可能性評価

### 工数とスケジュール

| 改善ループ | 作業時間 | 累計時間 | 達成目標 |
|----------|---------|---------|---------|
| ループ1 | 9時間 | 9時間 | 60%カバレッジ |
| ループ2 | 5時間 | 14時間 | 75%カバレッジ |
| ループ3 | 3.5時間 | 17.5時間 | 82%+カバレッジ |

**総工数**: 17.5時間（約2-3日）

### 段階的実装の利点
1. **リスク分散**: 各ループで成果確認が可能
2. **柔軟性**: ループ2完了時点で75%達成見込み
3. **品質保証**: 各段階でテスト実行により既存機能を保護

---

## ✅ 完了条件チェックリスト

### 改善ループ1 完了条件
- [ ] useAudioEngine.test.js 作成完了
- [ ] App.test.jsx 作成完了
- [ ] useKeyboard.test.js 作成完了
- [ ] useLocalStorage.test.js 作成完了
- [ ] 全テスト合格（281 + 新規）
- [ ] カバレッジ 58-62%達成
- [ ] コミット完了

### 改善ループ2 完了条件
- [ ] useRecorder.test.js 作成完了
- [ ] useResponsive.test.js 作成完了
- [ ] useTouch.test.js 作成完了
- [ ] 全テスト合格
- [ ] カバレッジ 72-76%達成
- [ ] コミット完了

### 改善ループ3 完了条件
- [ ] helpers.test.js 作成完了
- [ ] storage.test.js 作成完了
- [ ] React.memo 最適化適用（任意）
- [ ] 全テスト合格
- [ ] **カバレッジ 80%以上達成** ✅
- [ ] コミット完了

### 最終確認
- [ ] テストカバレッジ 80%以上
- [ ] 全テスト100%合格
- [ ] ビルド成功
- [ ] IMPROVEMENT_PLAN.md コミット完了
- [ ] Evaluator へ改善結果を報告

---

## 🎓 学習ポイント（将来への改善）

### 今回の教訓
1. **カスタムHooksのテスト**: 設計段階から考慮すべき
2. **統合テストの重要性**: App.jsx のテストは初期段階で実装推奨
3. **カバレッジ目標の設定**: 段階的な目標設定が効果的

### 次回プロジェクトへの提言
1. WBS作成時にHooksのテスト工数を明示的に含める
2. 実装フェーズで各Hookの実装と同時にテストを作成
3. テストカバレッジを継続的にモニタリング（CI/CD統合）

---

**改善計画策定者**: Improvement Planner Agent
**計画バージョン**: 1.0
**次のアクション**: Fixer Agent へ引き継ぎ、改善ループ1 開始
**目標完了時期**: 2-3日後（17.5時間の作業）
