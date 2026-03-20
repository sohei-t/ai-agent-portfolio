# 学習コンテンツ自動生成エージェント

体系的な学習コンテンツ（カリキュラム）を自動生成するAIエージェントシステムです。

## 🚀 クイックスタート

### 新規カリキュラムを作成

1. **`create_new_curriculum.command` をダブルクリック**
2. カリキュラム名を入力（例: Firebase研修カリキュラム）
3. 対象者・難易度を選択
4. 自動的に専用環境が作成される
5. Claude Code で開いてコンテンツ生成を開始

```bash
# 生成された環境
~/Desktop/Learning-Curricula/firebase-training/
```

### 既存のテンプレート環境で開発

```bash
cd /Users/sohei/Desktop/AIエージェント組織/learning-content-agent/
python3 src/content_orchestrator.py "カリキュラム名"
```

## 概要

このエージェントは、指定されたテーマに基づいて以下を自動生成します：

- **HTMLスライド**: グラフィックレコーディング風のデザイン（frontend-designスキル使用）
- **台本テキスト**: 各スライドに対応した説明文
- **音声ファイル**: 台本を元にした解説音声（gemini-flash-ttsスキル使用）

## 特徴

### 前後参照の整合性管理

カリキュラム内のトピック間で、以下の参照関係を自動管理します：

- **前方参照**: 「前回学んだ〜」という言及
- **伏線**: 「次回詳しく説明する〜」という予告
- **伏線の回収**: 予告した内容を実際に説明

### 並列処理の最適化

- **並列可能**: リサーチフェーズ、音声生成フェーズ
- **順次処理**: コンテンツ作成（前後参照の整合性を保つため）

## ディレクトリ構成

```
learning-content-agent/
├── CLAUDE.md                      # メインワークフロー定義
├── SUBAGENT_PROMPT_TEMPLATE.md    # サブエージェント用プロンプト
├── WBS_TEMPLATE.json              # タスク分割テンプレート
├── REFERENCE_MAP_TEMPLATE.yaml    # 前後参照マップテンプレート
├── CONTENT_QUALITY_CRITERIA.yaml  # 品質評価基準
├── agent_config.yaml              # エージェント設定
├── src/
│   ├── content_orchestrator.py    # メインオーケストレーター
│   ├── rag_chunker.py            # RAGチャンキング
│   ├── rag_index_builder.py      # RAGインデックス構築
│   └── rag_accuracy_test.py      # RAG精度テスト
├── content/                       # 生成コンテンツ出力先
├── research/                      # リサーチ結果
├── reports/                       # 品質レポート
├── worktrees/                     # Git worktree
└── サンプルコンテンツ/              # 参照用サンプル
```

## ワークフロー

### Phase 0: 初期化
- カリキュラムテーマの入力
- CONTENT_INFO.yaml生成
- Worktree作成

### Phase 1: 全体設計・リサーチ
- カリキュラム設計案作成（2案並列）
- 設計案の自律評価・選択
- 全トピックのディープリサーチ（並列可能）
- 前後参照マップ（REFERENCE_MAP.yaml）作成
- WBS作成

### Phase 2: コンテンツ作成
- 各トピックのHTMLスライド作成（frontend-designスキル使用）
- 各トピックの台本作成（SSMLは不要：Gemini TTSは自然言語から直接生成）

**重要**: 前後参照の整合性を保つため、**章単位で順次処理**

### Phase 2.5: RAG準備
- RAGチャットボット用データのチャンキング
- テスト質問の自動生成
- （オプション）ベクトルインデックス構築・精度テスト

### Phase 3: 音声生成
- 全トピックの音声生成（並列可能、gemini-flash-ttsスキル使用）

### Phase 4: 品質検証
- Playwright E2Eテスト
- 前後参照の整合性チェック
- 用語の一貫性チェック

### Phase 5: 改善
- 品質評価結果の分析
- 問題箇所の修正（最大3回ループ）

### Phase 6: 完成処理
- 目次HTML生成
- README.md生成

### Phase 7: 修正フロー
- ユーザーからの修正依頼対応

## 使用方法

### 新規カリキュラム作成

```bash
python3 src/content_orchestrator.py "Firebase研修カリキュラム"
```

### 既存カリキュラムの続行

```bash
python3 src/content_orchestrator.py
```

## 必要なスキル

以下のClaude Codeスキルが必要です：

1. **frontend-design**: HTMLスライドの生成
2. **gemini-flash-tts**: 音声ファイルの生成

### RAGスクリプト用（オプション）
```bash
pip install google-generativeai python-dotenv
```

## 認証設定

### Gemini API（音声生成用）

```bash
# ~/.config/ai-agents/profiles/default.env に設定
GEMINI_API_KEY=your-api-key
```

## 品質基準

100点満点で評価、70点以上で合格：

| カテゴリ | 配点 |
|---------|------|
| 正確性 | 30% |
| 分かりやすさ | 25% |
| 前後参照の整合性 | 20% |
| 構成の論理性 | 15% |
| 用語の一貫性 | 10% |

## サンプルコンテンツ

`サンプルコンテンツ/` ディレクトリに、Firebase研修カリキュラムのサンプルが含まれています：

- HTMLスライド
- 台本テキスト
- 音声ファイル（MP3）

## ライセンス

MIT License

## 関連プロジェクト

- [git-worktree-agent](https://github.com/sohei-t/git-worktree-agent) - アプリ開発自動化エージェント
- [ai-agent-portfolio](https://github.com/sohei-t/ai-agent-portfolio) - ポートフォリオリポジトリ
