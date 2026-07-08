# Test Report

> Auto-generated: 2026-07-06


## Summary

| Item | Result |
|---|---|
| Unit / integration tests (Vitest) | **247/247 passing** (24 test files) |
| Overall coverage | Statements/Lines 86.65%, Branches 84.80%, Functions 91.44% |
| `src/logic/*` coverage (core game rules) | Statements/Lines 99.28%, Functions 100% |
| `src/systems/*` coverage | Statements/Lines 77.91%, Functions 84.33% |
| E2E test cases (Playwright, written & type-checked) | 63 (21 scenarios × 3 viewport projects: desktop / mobile-portrait / mobile-landscape) |
| Independent code review (Codex) | 2 rounds (Phase 2, Phase 4), both reaching LGTM after fixes |

- E2E tests: Playwright. The suite type-checks cleanly and `--list` enumerates all 63 cases, but could not be *executed* in this development sandbox: launching a real Chrome instance fails at the OS level (Crashpad's mach service registration is denied) independent of any Playwright configuration. Run `npm run build && npm run build:e2e && npm run test:e2e` in an unrestricted environment to execute it.
- Full breakdown, methodology, and the module-level exceptions left below the branch-coverage target (with justification) are documented in the project's `COVERAGE_REPORT.md` and `REVIEW_FINDINGS.md` history.
