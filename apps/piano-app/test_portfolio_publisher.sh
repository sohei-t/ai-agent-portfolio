#!/bin/bash

# ポートフォリオ公開機能のテストスクリプト

echo "================================"
echo "📝 Portfolio Publisher Test"
echo "================================"

# カラー定義
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 環境変数チェック
echo -e "\n${YELLOW}1. 環境変数チェック${NC}"
if [ -z "$GITHUB_USERNAME" ]; then
    echo -e "${RED}❌ GITHUB_USERNAME が設定されていません${NC}"
    echo "以下を実行してください:"
    echo "export GITHUB_USERNAME='your-github-username'"
    exit 1
else
    echo -e "${GREEN}✅ GITHUB_USERNAME: $GITHUB_USERNAME${NC}"
fi

if [ -z "$GITHUB_TOKEN" ]; then
    echo -e "${RED}❌ GITHUB_TOKEN が設定されていません${NC}"
    echo "GitHubでPersonal Access Tokenを作成し、以下を実行してください:"
    echo "export GITHUB_TOKEN='ghp_xxxxxxxxxx'"
    exit 1
else
    echo -e "${GREEN}✅ GITHUB_TOKEN: (設定済み)${NC}"
fi

# Pythonパッケージチェック
echo -e "\n${YELLOW}2. 依存パッケージチェック${NC}"
python3 -c "import yaml" 2>/dev/null
if [ $? -ne 0 ]; then
    echo -e "${YELLOW}⚠️ PyYAMLをインストールしています...${NC}"
    pip3 install pyyaml
fi
echo -e "${GREEN}✅ 依存パッケージOK${NC}"

# dry-runテスト
echo -e "\n${YELLOW}3. Dry-runモードでテスト実行${NC}"
echo "以下のディレクトリをスキャンします:"
echo "  - ~/Desktop/mission-*"
echo "  - ~/Desktop/*-game"
echo "  - ~/Desktop/*-app"

cd /Users/tsujisouhei/Desktop/git-worktree-agent

# dry-runで実行
python3 src/portfolio_publisher.py --dry-run

echo -e "\n${GREEN}================================${NC}"
echo -e "${GREEN}テスト完了！${NC}"
echo -e "${GREEN}================================${NC}"

echo -e "\n次のステップ:"
echo "1. GitHubでリポジトリを作成:"
echo "   - リポジトリ名: ai-agent-portfolio"
echo "   - 公開設定: Public"
echo ""
echo "2. リポジトリをクローン:"
echo "   git clone https://github.com/$GITHUB_USERNAME/ai-agent-portfolio.git ~/Desktop/ai-agent-portfolio"
echo ""
echo "3. 実際に公開（dry-runなし）:"
echo "   python3 src/portfolio_publisher.py"
echo ""
echo "4. 特定のソースディレクトリから公開:"
echo "   python3 src/portfolio_publisher.py --source ~/Desktop/my-projects"