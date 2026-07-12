# Test Report

> Auto-generated: 2026-07-11

## Summary

- **Unit / Integration Tests (Vitest)**: 363 tests, **363 passed (100%)**, 0 failed
  - Test files: 15+（logic, cpu, state, input, audio, ui, game-loop 各領域）
  - 3 consecutive runs confirmed stable (no flaky tests)
- **Coverage** (vitest run --coverage, `src/**/*.ts` 全体対象):

  | Metric | Coverage |
  |---|---|
  | Lines | 97.00% |
  | Statements | 96.21% |
  | Branches | 92.38% |
  | Functions | 99.34% |

  - Target range: 80-90% → 大きく上回って達成
  - `src/render/**`（Canvas描画専用）・`src/main.ts`（エントリーポイント）は計装対象外
    （理由: jsdom環境でのCanvas実測に限界があり、Playwright E2Eの担当領域とすみ分け）
- **E2E Tests (Playwright)**: 31 scenarios × 2 projects (chromium / mobile-chrome) = 92 tests listed
  and verified via `npx playwright test --list`. サンドボックス実行環境ではブラウザ起動不可のため
  実走はCI/ローカル開発環境で実施する運用（詳細は本リポジトリの `E2E_RESULTS.md` 参照）。
- **Static Checks**: `tsc --noEmit`（0 errors）/ `eslint .`（0 errors）/ `npm run build`（成功）
- **Cross-Model Code Review**: Codex（別モデルによるクロスレビュー）を3ラウンド実施し、
  Round 3 終了時点で残課題ゼロ（LGTM）。指摘は都度同一ブランチで即時修正。
