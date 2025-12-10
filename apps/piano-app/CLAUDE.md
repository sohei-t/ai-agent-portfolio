# AI エージェント完全自動実行ガイドライン

## 🔴 最重要：記憶保持ルール

**各フェーズ開始時に必ずこのセクションを出力してワークフローを再確認すること**

```
📌 ワークフロー再確認：
1. 現在のフェーズ: [フェーズ名]
2. 品質基準: テストカバレッジ80%以上、改善ループ最大3回
3. 作業環境: ./worktrees/mission-{プロジェクト名}/
4. 並列実行: 1メッセージで複数Taskツール呼び出し
```

## 🚨 初期設定（必ず実行前に確認）

**重要: 実行環境を確認**
- テンプレート環境（git-worktree-agent）: 保護対象、直接開発禁止
- 専用環境（AI-Apps/*-agent）: ここで開発を実行

### 必須確認ファイル（ワークフロー実行前に必ず Read ツールで確認）
1. `WORKFLOW_AUTOMATION_V6.md` - ワークフロー詳細定義
2. `agent_config.yaml` - エージェント設定
3. `WBS_TEMPLATE.json` - タスク分割テンプレート
4. `SUBAGENT_PROMPT_TEMPLATE.md` - サブエージェント用プロンプト

## 📋 実行開始手順

### STEP 1: Worktree作成（最初に必ず実行）
```bash
# Bashツールで実行:
git worktree add -b feat/{プロジェクト名} ./worktrees/mission-{プロジェクト名} main
```
注意: 作業ディレクトリは ./worktrees/mission-{プロジェクト名}/ だが、
ファイル操作はこのパスを指定して実行（cdは不要）

### STEP 2: ワークフロー開始
以下のフェーズを順番に実行する（Task ツールを使用）：

## 🤖 Task ツールを使った並列ワークフロー実行

### 1. 要件定義・計画フェーズ（改善ループ付き）

#### 1-1. 要件定義（改善ループ：最大3回）
```
📌 ワークフロー再確認を出力してから実行

Task実行:
- subagent_type: "general-purpose"
- prompt: SUBAGENT_PROMPT_TEMPLATE.md の「1. Requirements Analyst」を使用
- 改善ループ: 初回実行 → 評価 → 改善（最大2回追加実行）
```

#### 1-2. WBS作成（改善ループ：最大3回）
```
📌 ワークフロー再確認を出力してから実行

Task実行:
- subagent_type: "general-purpose"
- prompt: SUBAGENT_PROMPT_TEMPLATE.md の「2. Planner（WBS作成）」を使用
- 改善ループ: 初回実行 → タスク粒度評価 → 最適化（最大2回追加実行）
重要: WBSの品質が全体の成否を決定
```

#### 1-3. テスト設計（改善ループ：最大3回）
```
📌 ワークフロー再確認を出力してから実行

Task実行:
- subagent_type: "general-purpose"
- prompt: SUBAGENT_PROMPT_TEMPLATE.md の「3. Test Designer」を使用
- 改善ループ: 初回実行 → カバレッジ評価 → 追加生成（最大2回追加実行）
重要: テストの品質が実装の品質を保証
```

#### 1-4. システム設計
```
Task実行:
- subagent_type: "general-purpose"
- prompt: アーキテクチャ設計の標準プロンプトを使用
```

### 2. 実装フェーズ（並列実行）
```
📌 ワークフロー再確認を出力してから実行

重要: 以下の3つのTaskを1つのメッセージで同時に呼び出す

Task 1: Frontend
- subagent_type: "general-purpose"
- prompt: SUBAGENT_PROMPT_TEMPLATE.md の「4. Frontend Developer」

Task 2: Backend
- subagent_type: "general-purpose"
- prompt: SUBAGENT_PROMPT_TEMPLATE.md の「5. Backend Developer」

Task 3: Database
- subagent_type: "general-purpose"
- prompt: データベース実装の標準プロンプト
```

### 3. テスト合格フェーズ（テストが通るまで最大3回修正）
```
📌 ワークフロー再確認を出力してから実行

テスト実行ループ（最大3回）:
1. すべてのテストを実行
2. 失敗があれば修正（Fixerエージェント）
3. 再度テスト実行
※ テストが100%合格するまで繰り返し（最大3回）
```

### 4. 品質改善フェーズ（テスト合格後、最大3回改善）
```
📌 ワークフロー再確認を出力してから実行

改善ループ実行（最大3回）:
1. Task: Evaluator
   - prompt: SUBAGENT_PROMPT_TEMPLATE.md の「6. Evaluator」
   - 品質評価（パフォーマンス、可読性、セキュリティ）

2. Task: Improvement Planner（改善余地がある場合）
   - prompt: SUBAGENT_PROMPT_TEMPLATE.md の「7. Improvement Planner」

3. Task: Fixer（改善実装）
   - prompt: SUBAGENT_PROMPT_TEMPLATE.md の「8. Fixer」
   - 重要: テストが壊れないように注意

4. テスト再実行（改善後も100%合格を維持）
```

### 5. 完成処理フェーズ（並列実行）
```
📌 ワークフロー再確認を出力してから実行

重要: 以下の3つのTaskを1つのメッセージで同時に呼び出す

Task 1: Documenter
- prompt: SUBAGENT_PROMPT_TEMPLATE.md の「10. Documenter」

Task 2: Launcher Creator
- prompt: SUBAGENT_PROMPT_TEMPLATE.md の「11. Launcher Creator」

Task 3: Reviewer
- prompt: 最終レビューの標準プロンプト
```

## 📝 サブエージェントへの標準プロンプト

Taskツール実行時、必ず以下の内容を含める：

```
あなたは{エージェント名}です。

【作業環境】
- 作業ディレクトリ: ./worktrees/mission-{プロジェクト名}/
- このディレクトリ内でのみファイル操作を行う

【品質基準】
- すべてのテストが合格すること
- エラーフリーで動作すること
- コードカバレッジ80%以上

【改善ループ】
- テスト失敗時は自動的に修正（最大3回）
- 各試行で異なるアプローチを試みる

【タスク】
{具体的なタスク内容}

【完了条件】
- テスト合格
- 動作確認済み
- コミット完了（メッセージ: "feat: {機能名} implemented by {エージェント名}"）
```

## ✅ 実行前チェックリスト

□ `WORKFLOW_AUTOMATION_V6.md` を読んだ
□ `agent_config.yaml` を読んだ
□ `WBS_TEMPLATE.json` を読んだ
□ worktree が作成されている
□ Taskツールで並列実行する準備ができている

## 🚫 禁止事項

- git-worktree-agent ディレクトリでの直接開発
- テスト未実行でのマージ
- 品質基準を満たさないコミット

## 💡 トラブルシューティング

ワークフローが実行されない場合：
1. `python src/workflow_orchestrator.py creative_webapp {名前}` を実行
2. Taskツールで並列実行（1メッセージで複数Task）
3. サブエージェントプロンプトに品質基準を明記