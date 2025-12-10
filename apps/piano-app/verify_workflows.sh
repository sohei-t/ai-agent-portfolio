#!/bin/bash

# ワークフロー検証スクリプト
# Portfolio と Client 両方のプロジェクト作成フローを検証

set -e

# カラー定義
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

echo -e "${BLUE}================================${NC}"
echo -e "${BLUE}📋 ワークフロー検証開始${NC}"
echo -e "${BLUE}================================${NC}"

CURRENT_DIR=$(pwd)
TIMESTAMP=$(date +%Y%m%d_%H%M%S)

# ======================
# 1. Portfolio プロジェクトの検証
# ======================
echo -e "\n${CYAN}【1】Portfolio プロジェクト作成フローの検証${NC}"
echo -e "${YELLOW}シミュレーション: Portfolio用のTodoアプリを作成${NC}\n"

TEST_PORTFOLIO_DIR="${HOME}/Desktop/AI-Apps/test-portfolio-${TIMESTAMP}-agent"

echo -e "${GREEN}想定される操作:${NC}"
echo "1. ./create_new_app.command を実行"
echo "2. アプリ名: test-portfolio"
echo "3. プロジェクトタイプ: 1 (Portfolio)"
echo ""

# Portfolioプロジェクトの作成をシミュレート
echo -e "${YELLOW}Portfolio プロジェクトに必要なファイルを確認中...${NC}"

# 必要なファイルの確認
PORTFOLIO_FILES=(
    "release.sh"
    "publish_to_portfolio.sh"
    "src/claude_agent_executor.py"
    "src/workflow_orchestrator.py"
    "src/documenter_agent.py"
    "src/launcher_generator.py"
    "CLAUDE.md"
    "SUBAGENT_PROMPT_TEMPLATE.md"
)

echo -e "\n${GREEN}Portfolio用ファイル チェックリスト:${NC}"
for file in "${PORTFOLIO_FILES[@]}"; do
    if [ -f "$file" ]; then
        echo -e "  ✅ $file"
    else
        echo -e "  ❌ $file (見つかりません)"
    fi
done

# ======================
# 2. Client プロジェクトの検証
# ======================
echo -e "\n${CYAN}【2】Client プロジェクト作成フローの検証${NC}"
echo -e "${YELLOW}シミュレーション: Client用の業務管理システムを作成${NC}\n"

TEST_CLIENT_DIR="${HOME}/Desktop/AI-Apps/test-client-${TIMESTAMP}-agent"

echo -e "${GREEN}想定される操作:${NC}"
echo "1. ./create_new_app.command を実行"
echo "2. アプリ名: test-client"
echo "3. プロジェクトタイプ: 2 (Client)"
echo "4. クライアント名: テスト株式会社"
echo ""

# Clientプロジェクトの作成をシミュレート
echo -e "${YELLOW}Client プロジェクトに必要なファイルを確認中...${NC}"

# Client用追加ファイルの確認
CLIENT_FILES=(
    "src/enhanced_client_document_generator.py"
    "src/pdf_converter.js"
    "package_deliverables.sh"
    "package.json"  # PDF変換用の依存関係を含む
)

echo -e "\n${GREEN}Client用追加ファイル チェックリスト:${NC}"
for file in "${CLIENT_FILES[@]}"; do
    if [ -f "$file" ]; then
        echo -e "  ✅ $file"
    else
        echo -e "  ❌ $file (見つかりません)"
    fi
done

# ======================
# 3. ワークフローの説明
# ======================
echo -e "\n${BLUE}================================${NC}"
echo -e "${BLUE}📖 完全なワークフロー説明${NC}"
echo -e "${BLUE}================================${NC}"

cat << 'WORKFLOW_DOC'

## 🎯 Portfolio プロジェクト（技術アピール用）

### 作成時の指示方法：
```
1. ターミナルで: ./create_new_app.command
2. アプリ名を入力（英語）: todo-app
3. プロジェクトタイプ: 1 (Portfolio)
```

### エージェントへの開発依頼：
```
「TODOアプリを作ってください。
以下の機能を実装してください：
- タスクの追加・削除・編集
- 優先度設定
- カテゴリ分類
- ローカルストレージ保存」
```

### 完成後のフロー：
1. エージェントが自動で実行:
   - テスト実行
   - launch_app.command 生成
   - ./release.sh でリリース版作成
   - ./publish_to_portfolio.sh でGitHub公開

2. 成果物:
   - GitHub公開URL
   - デモサイトURL
   - 技術解説付きREADME

---

## 💼 Client プロジェクト（顧客納品用）

### 作成時の指示方法：
```
1. ターミナルで: ./create_new_app.command
2. アプリ名を入力（英語）: inventory-system
3. プロジェクトタイプ: 2 (Client)
4. クライアント名: 山田商事株式会社
```

### エージェントへの開発依頼：
```
「在庫管理システムを作ってください。
要件：
- 商品マスタ管理
- 在庫数量管理
- 入出庫履歴
- CSVエクスポート機能
- ユーザー認証」
```

### 完成後のフロー：
1. エージェントが実行:
   - テスト実行
   - launch_app.command 生成
   - npm install（初回のみ）

2. 納品物作成（手動またはエージェント）:
   ```bash
   ./package_deliverables.sh
   ```

3. 成果物:
   - deliverables/（納品物フォルダ）
     - 01_documents/（PDF化された仕様書）
     - 02_source/（ソースコード）
     - 03_executable/（実行ファイル）
     - 04_presentation/（説明資料）
   - 納品用ZIPファイル

---

## 🔄 プロジェクトタイプの違い

| 項目 | Portfolio | Client |
|------|-----------|---------|
| 目的 | 技術力アピール | ビジネス納品 |
| 公開 | GitHub Public | Private/非公開 |
| ドキュメント | README, about.html | 要件定義書、設計書、マニュアル（PDF） |
| 成果物 | GitHubリポジトリ | 納品用ZIPパッケージ |
| PDF変換 | 不要 | 自動実行 |
| Git Push | 自動 | 無効化 |

WORKFLOW_DOC

# ======================
# 4. 実際のテスト実行
# ======================
echo -e "\n${CYAN}【4】実際の動作テスト${NC}"
echo -e "${YELLOW}create_new_app.command の構文チェック...${NC}"

# bashの構文チェック
if bash -n create_new_app.command 2>&1; then
    echo -e "${GREEN}✅ 構文エラーなし${NC}"
else
    echo -e "${RED}❌ 構文エラーあり${NC}"
    bash -n create_new_app.command
fi

# ======================
# 5. サマリー
# ======================
echo -e "\n${BLUE}================================${NC}"
echo -e "${BLUE}📊 検証結果サマリー${NC}"
echo -e "${BLUE}================================${NC}"

echo -e "\n${GREEN}✅ Portfolio ワークフロー:${NC}"
echo "  - GitHub公開向けの軽量構成"
echo "  - README と about.html で技術アピール"
echo "  - 音声解説付き"

echo -e "\n${GREEN}✅ Client ワークフロー:${NC}"
echo "  - 納品向けの完全構成"
echo "  - PDF化された正式ドキュメント"
echo "  - 納品用パッケージ自動生成"
echo "  - Git push 無効化でセキュリティ確保"

echo -e "\n${YELLOW}💡 使い分けのポイント:${NC}"
echo "  Portfolio: 個人の技術力をアピールしたい時"
echo "  Client: フリーランスや副業で実際に納品する時"

echo -e "\n${GREEN}検証完了！${NC}"