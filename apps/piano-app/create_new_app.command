#!/bin/bash
# 新規アプリ用のエージェント環境を作成するスクリプト
# ダブルクリックで実行可能

set -e

# スクリプトのディレクトリに移動（.commandファイル用）
cd "$(dirname "$0")"

# カラー定義
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m'

# ターミナルをクリア
clear

echo -e "${BLUE}================================${NC}"
echo -e "${BLUE}🚀 新規アプリ環境作成ウィザード${NC}"
echo -e "${BLUE}================================${NC}"
echo ""

# プロジェクトタイプを選択
echo -e "${YELLOW}プロジェクトタイプを選択してください:${NC}"
echo "  [1] Portfolio - 技術ポートフォリオ用（GitHub公開）"
echo "  [2] Client - 顧客納品用（非公開）"
echo ""
read -p "選択 (1/2): " PROJECT_TYPE_CHOICE

if [ "$PROJECT_TYPE_CHOICE" = "1" ]; then
    PROJECT_TYPE="portfolio"
    echo -e "${GREEN}✓ Portfolioプロジェクトとして作成します${NC}"
elif [ "$PROJECT_TYPE_CHOICE" = "2" ]; then
    PROJECT_TYPE="client"
    echo -e "${GREEN}✓ Clientプロジェクトとして作成します${NC}"
    echo ""
    echo -e "${YELLOW}クライアント名を入力してください（省略可）:${NC}"
    read -p "クライアント名: " CLIENT_NAME
else
    echo -e "${RED}無効な選択です。Portfolioとして作成します${NC}"
    PROJECT_TYPE="portfolio"
fi
echo ""

# インタラクティブにアプリ名を取得
if [ $# -eq 0 ]; then
    echo -e "${YELLOW}作成するアプリ名を英語で入力してください${NC}"
    echo -e "${YELLOW}（例: calculator, todo-app, chat-bot）${NC}"
    echo ""
    read -p "アプリ名（英語）: " APP_NAME
    echo ""

    if [ -z "$APP_NAME" ]; then
        echo -e "${RED}❌ アプリ名が入力されませんでした${NC}"
        echo "終了します..."
        sleep 2
        exit 1
    fi
else
    APP_NAME=$1
fi

# アプリ名を正規化（スペースや特殊文字を処理）
APP_SLUG=$(echo "$APP_NAME" | tr '[:upper:]' '[:lower:]' | sed 's/[^a-z0-9]/-/g' | sed 's/--*/-/g' | sed 's/^-//;s/-$//')

# AI-Appsフォルダを作成（初回のみ）
AI_APPS_DIR="$HOME/Desktop/AI-Apps"
mkdir -p "$AI_APPS_DIR"

AGENT_DIR="${AI_APPS_DIR}/${APP_SLUG}-agent"
TEMPLATE_DIR="$HOME/Desktop/git-worktree-agent"

# 既存チェック
if [ -d "$AGENT_DIR" ]; then
    echo -e "${YELLOW}⚠️  警告: ${APP_SLUG}-agent は既に存在します${NC}"
    echo ""
    echo "以下から選択してください:"
    echo "  [1] 既存の環境を開く"
    echo "  [2] 上書きして新規作成（既存のコードは失われます）"
    echo "  [3] キャンセル"
    echo ""
    read -p "選択 (1/2/3): " CHOICE

    case $CHOICE in
        1)
            echo -e "${GREEN}既存の環境を開きます${NC}"
            open "$AGENT_DIR"
            exit 0
            ;;
        2)
            echo -e "${RED}既存の環境を削除して新規作成します${NC}"
            rm -rf "$AGENT_DIR"
            ;;
        3)
            echo -e "${BLUE}キャンセルしました${NC}"
            exit 0
            ;;
        *)
            echo -e "${RED}無効な選択です${NC}"
            exit 1
            ;;
    esac
fi

echo -e "${BLUE}================================${NC}"
echo -e "${BLUE}🚀 新規アプリ環境を作成${NC}"
echo -e "${BLUE}================================${NC}"

# 1. テンプレートをコピー
echo -e "\n${YELLOW}1. エージェント環境を作成中...${NC}"
cp -r "$TEMPLATE_DIR" "$AGENT_DIR"

# 2. 不要なファイルを削除
cd "$AGENT_DIR"
rm -rf .git worktrees/* .processed_apps.json
rm -rf example-apps delete
rm -f create_new_app.command manage_apps.command  # 管理ツールは不要
rm -f git-worktree-agent-backup-*.tar.gz  # バックアップも不要

# 3. CLAUDE.mdを専用環境用に書き換え（テンプレートのCLAUDE.mdをコピーして一部修正）
echo -e "\n${YELLOW}2. 専用環境用の設定を作成...${NC}"

# テンプレートのCLAUDE.mdを読み込んで、専用環境用に書き換え
cat "$TEMPLATE_DIR/CLAUDE.md" | sed 's|git-worktree-agent|この専用環境|g' > CLAUDE.md

# 専用環境用の追記を行う（変数を展開して書き込む）
cat >> CLAUDE.md << EOFMARKER

## 📍 専用環境での注意事項

**このディレクトリは専用のアプリ開発環境です**
- アプリ名: ${APP_NAME}
- 環境パス: ${AGENT_DIR}

### 開発完了後の処理

アプリが完成し、すべてのテストが合格したら：

1. **リリース版作成**
   \`\`\`bash
   ./release.sh
   \`\`\`

2. **GitHubポートフォリオに公開**
   \`\`\`bash
   ./publish_to_portfolio.sh
   \`\`\`

3. **公開URLを報告**
   \`\`\`
   GitHubに公開完了！
   URL: https://github.com/[username]/ai-agent-portfolio/apps/[app-name]
   \`\`\`

### ディレクトリ構造
\`\`\`
この専用環境/
├── worktrees/
│   └── mission-{プロジェクト名}/  # ワークフロー実行場所
├── CLAUDE.md                      # このファイル
├── WORKFLOW_AUTOMATION_V6.md      # ワークフロー定義
├── agent_config.yaml              # エージェント設定
├── WBS_TEMPLATE.json              # タスク分割テンプレート
└── SUBAGENT_PROMPT_TEMPLATE.md    # サブエージェント用プロンプト
\`\`\`
EOFMARKER

# 4. 新しいGitリポジトリとして初期化
echo -e "\n${YELLOW}3. Gitリポジトリを初期化...${NC}"
git init
git add .
git commit -m "Initial: ${APP_NAME} development environment setup"

# 5. プロジェクト情報ファイルを作成
if [ "$PROJECT_TYPE" = "client" ]; then
    cat > PROJECT_INFO.yaml << EOF
project:
  name: ${APP_NAME}
  slug: ${APP_SLUG}
  type: ${PROJECT_TYPE}
  created: $(date +"%Y-%m-%d %H:%M:%S")
  last_updated: $(date +"%Y-%m-%d %H:%M:%S")
  status: development
  version: 1.0.0

client:
  client_name: "${CLIENT_NAME:-未定}"
  contract_id: "TBD"
  delivery_date: "TBD"
  confidential: true

paths:
  agent_dir: ${AGENT_DIR}
  release_dir: ~/Desktop/my-apps/${APP_SLUG}
  deliverables_dir: ${AGENT_DIR}/deliverables

workflow:
  1_develop: "このディレクトリ内で開発"
  2_test: "worktrees内でテスト実行"
  3_release: "./release.sh を実行"
  4_documents: "./generate_documents.sh を実行"
  5_package: "./package_deliverables.sh を実行"
EOF
else
    cat > PROJECT_INFO.yaml << EOF
project:
  name: ${APP_NAME}
  slug: ${APP_SLUG}
  type: ${PROJECT_TYPE}
  created: $(date +"%Y-%m-%d %H:%M:%S")
  last_updated: $(date +"%Y-%m-%d %H:%M:%S")
  status: development
  version: 1.0.0

portfolio:
  github_repo: ai-agent-portfolio
  visibility: public
  demo_url: "https://github.com/[username]/ai-agent-portfolio/apps/${APP_SLUG}"

paths:
  agent_dir: ${AGENT_DIR}
  release_dir: ~/Desktop/my-apps/${APP_SLUG}
  portfolio_dir: ~/Desktop/GitHub/ai-agent-portfolio/apps/${APP_SLUG}

workflow:
  1_develop: "このディレクトリ内で開発"
  2_test: "worktrees内でテスト実行"
  3_release: "./release.sh を実行"
  4_publish: "./publish_to_portfolio.sh を実行"
  5_modify: "このディレクトリに戻って修正"
EOF
fi

# 5. リリーススクリプトを作成
cat > release.sh << 'SCRIPT'
#!/bin/bash
# 完成版を独立プロジェクトとしてリリース

# PROJECT_INFO.yamlからslugを取得
APP_SLUG=$(grep "slug:" PROJECT_INFO.yaml | awk '{print $2}')
if [ -z "$APP_SLUG" ]; then
    # フォールバック: ディレクトリ名から推測
    APP_SLUG=$(basename $PWD | sed 's/-agent$//')
fi

RELEASE_DIR="$HOME/Desktop/my-apps/${APP_SLUG}"

echo "📦 リリース版を作成: $RELEASE_DIR"

# リリースディレクトリを作成（既存の場合は上書き）
rm -rf "$RELEASE_DIR"
mkdir -p "$RELEASE_DIR"

# 最新のworktreeから成果物をコピー
LATEST_WORKTREE=$(ls -td worktrees/mission-* 2>/dev/null | head -1)
if [ -n "$LATEST_WORKTREE" ]; then
    cp -r "$LATEST_WORKTREE"/* "$RELEASE_DIR/"

    # .gitignore追加
    echo -e "node_modules/\n.env\n*.log\n.DS_Store" > "$RELEASE_DIR/.gitignore"

    # 独立Gitリポジトリとして初期化
    cd "$RELEASE_DIR"
    git init
    git add .
    git commit -m "Release: $(date +'%Y-%m-%d %H:%M:%S')"

    # PROJECT_INFO.yamlのステータスを更新
    cd - > /dev/null
    sed -i '' 's/status: development/status: released/' PROJECT_INFO.yaml
    sed -i '' "s/last_updated:.*/last_updated: $(date -Iseconds)/" PROJECT_INFO.yaml

    echo "✅ リリース完了: $RELEASE_DIR"
else
    echo "❌ worktreeが見つかりません"
fi
SCRIPT

chmod +x release.sh

# 6. ポートフォリオ公開スクリプトを作成
cat > publish_to_portfolio.sh << 'SCRIPT'
#!/bin/bash
# ポートフォリオに公開

# PROJECT_INFO.yamlからslugを取得
APP_SLUG=$(grep "slug:" PROJECT_INFO.yaml | awk '{print $2}')
if [ -z "$APP_SLUG" ]; then
    APP_SLUG=$(basename $PWD | sed 's/-agent$//')
fi

PORTFOLIO_PUBLISHER="$HOME/Desktop/git-worktree-agent/src/portfolio_publisher.py"
RELEASE_DIR="$HOME/Desktop/my-apps/${APP_SLUG}"

if [ -d "$RELEASE_DIR" ]; then
    echo "📤 ポートフォリオに公開中..."
    python3 "$PORTFOLIO_PUBLISHER" --source "$RELEASE_DIR" --slug "$APP_SLUG"
else
    echo "❌ リリース版が見つかりません。先に ./release.sh を実行してください"
fi
SCRIPT

chmod +x publish_to_portfolio.sh

# 6-2. Client用スクリプト（プロジェクトタイプがclientの場合）
if [ "$PROJECT_TYPE" = "client" ]; then
    # ドキュメント生成スクリプト
    cat > generate_documents.sh << 'SCRIPT'
#!/bin/bash
# 顧客納品用ドキュメント生成

echo "📄 納品ドキュメント生成中..."

# deliverables/01_documentsフォルダ作成
mkdir -p deliverables/01_documents

# Pythonスクリプトでドキュメント生成
if [ -f "src/client_document_generator.py" ]; then
    python3 src/client_document_generator.py
else
    echo "⚠️ ドキュメント生成スクリプトが見つかりません"
    echo "手動でドキュメントを作成してください"
fi

echo "✅ ドキュメント生成完了"
SCRIPT
    chmod +x generate_documents.sh

    # 納品物パッケージングスクリプト
    cat > package_deliverables.sh << 'SCRIPT'
#!/bin/bash
# 納品物のパッケージング

echo "📦 納品物をパッケージング中..."

# deliverables構造を作成
mkdir -p deliverables/01_documents
mkdir -p deliverables/02_source
mkdir -p deliverables/03_executable
mkdir -p deliverables/04_presentation

# ソースコードのzip化
if [ -d "worktrees/mission-v1" ]; then
    cd worktrees/mission-v1
    zip -r ../../deliverables/02_source/source_code.zip . -x "*.git*" "node_modules/*" ".env*"
    cd ../..
fi

# 実行可能形式のコピー
if [ -d "release" ]; then
    cp -r release/* deliverables/03_executable/
fi

# 全体をzip化
cd deliverables
zip -r ../deliverables.zip .
cd ..

echo "✅ 納品物パッケージング完了"
echo "📁 deliverables.zip が作成されました"
SCRIPT
    chmod +x package_deliverables.sh

    # GitHubへの誤push防止
    echo "" >> .git/config
    echo "[remote \"origin\"]" >> .git/config
    echo "    pushurl = no_push" >> .git/config
    echo "" >> .git/config

    echo -e "${YELLOW}⚠️  このプロジェクトはClient用です。GitHubへのpushは無効化されています${NC}"

    # PDF変換用のスクリプトとpackage.jsonをコピー
    echo -e "${YELLOW}📄 PDF変換機能をセットアップ中...${NC}"

    # enhanced_client_document_generator.pyをコピー
    if [ -f "${CURRENT_DIR}/src/enhanced_client_document_generator.py" ]; then
        cp "${CURRENT_DIR}/src/enhanced_client_document_generator.py" src/
    fi

    # pdf_converter.jsをコピー
    if [ -f "${CURRENT_DIR}/src/pdf_converter.js" ]; then
        cp "${CURRENT_DIR}/src/pdf_converter.js" src/
    fi

    # package.jsonを作成（PDF変換用の依存関係を含む）
    cat > package.json << EOFMARKER
{
  "name": "${APP_SLUG}-client",
  "version": "1.0.0",
  "description": "Client project for ${APP_NAME}",
  "scripts": {
    "pdf:convert": "node src/pdf_converter.js",
    "pdf:docs": "node src/pdf_converter.js deliverables/01_documents/",
    "generate:docs": "python3 src/enhanced_client_document_generator.py",
    "package": "./package_deliverables.sh"
  },
  "dependencies": {
    "marked": "^11.1.0",
    "puppeteer": "^21.6.0"
  },
  "devDependencies": {
    "js-yaml": "^4.1.0"
  }
}
EOFMARKER

    # package_deliverables.shをコピー
    if [ -f "${CURRENT_DIR}/package_deliverables.sh" ]; then
        cp "${CURRENT_DIR}/package_deliverables.sh" .
        chmod +x package_deliverables.sh
    fi

    echo -e "${GREEN}✅ PDF変換機能セットアップ完了${NC}"

    # npm install を自動実行
    echo -e "${YELLOW}📦 PDF変換用モジュールをインストール中...${NC}"
    echo -e "${YELLOW}   (puppeteerのダウンロードに数分かかる場合があります)${NC}"

    if command -v npm &> /dev/null; then
        npm install --no-save --silent 2>/dev/null || {
            echo -e "${YELLOW}⚠️  npm install が失敗しました。後で手動実行してください：${NC}"
            echo -e "${YELLOW}   cd ${AGENT_DIR}${NC}"
            echo -e "${YELLOW}   npm install${NC}"
        }

        # インストール確認
        if [ -d "node_modules/puppeteer" ] && [ -d "node_modules/marked" ]; then
            echo -e "${GREEN}✅ PDF変換モジュール インストール完了${NC}"
            echo -e "${GREEN}   納品物作成時に自動でPDF変換されます${NC}"
        else
            echo -e "${YELLOW}⚠️  モジュールが見つかりません。後で以下を実行してください:${NC}"
            echo -e "${YELLOW}   npm install${NC}"
        fi
    else
        echo -e "${RED}⚠️  npmが見つかりません。Node.jsをインストールしてください${NC}"
        echo -e "${YELLOW}   その後、以下を実行:${NC}"
        echo -e "${YELLOW}   cd ${AGENT_DIR}${NC}"
        echo -e "${YELLOW}   npm install${NC}"
    fi
fi

# 7. README作成
cat > README_APP.md << EOF
# ${APP_NAME} Development Environment

このディレクトリは **${APP_NAME}** 専用のAIエージェント開発環境です。

## 📋 ワークフロー

1. **開発開始**
   \`\`\`bash
   git worktree add -b feat/v1 ./worktrees/mission-v1 main
   cd worktrees/mission-v1
   # 開発作業...
   \`\`\`

2. **テスト・検証**
   \`\`\`bash
   npm test  # または pytest
   \`\`\`

3. **リリース版作成**
   \`\`\`bash
   ./release.sh
   \`\`\`

4. **ポートフォリオ公開**
   \`\`\`bash
   ./publish_to_portfolio.sh
   \`\`\`

5. **修正が必要な場合**
   - このディレクトリに戻って修正
   - 修正後、再度リリース

## 📁 ディレクトリ構成

- \`worktrees/\` - 開発作業場所
- \`src/\` - エージェントツール
- \`release.sh\` - リリース版作成
- \`publish_to_portfolio.sh\` - GitHub公開

## 🔄 修正フロー

1. 既存のworktreeに戻るか、新しいブランチを作成
2. 修正を実施
3. テスト確認
4. \`./release.sh\` で再リリース
5. \`./publish_to_portfolio.sh\` で更新

作成日: $(date)
EOF

# 完了メッセージ
echo -e "\n${GREEN}================================${NC}"
echo -e "${GREEN}✅ 環境作成完了！${NC}"
echo -e "${GREEN}================================${NC}"
echo ""
echo -e "📁 作成場所: ${BLUE}${AGENT_DIR}${NC}"
echo ""
echo -e "${YELLOW}次のステップ:${NC}"
echo "1. cd ${AGENT_DIR}"
echo "2. Claude Codeで開いて開発開始"
echo "3. 完成したら ./release.sh でリリース"
echo "4. ./publish_to_portfolio.sh でGitHub公開"
echo ""
echo -e "${GREEN}作成したフォルダを開きますか？ (y/n)${NC}"
read -p "> " OPEN_FINDER

if [ "$OPEN_FINDER" = "y" ] || [ "$OPEN_FINDER" = "Y" ]; then
    open "$AGENT_DIR"
    echo -e "${BLUE}Finderで開きました${NC}"
fi

# AI-Appsフォルダ内のアプリ一覧を表示
echo ""
echo -e "${YELLOW}📁 現在のAIアプリ一覧:${NC}"
ls -1d ${AI_APPS_DIR}/*-agent 2>/dev/null | xargs -n1 basename | sed 's/^/  • /'

echo ""
echo "ウィンドウを閉じるには何かキーを押してください..."
read -n 1
echo ""  # 改行を追加
exit 0  # 明示的に終了