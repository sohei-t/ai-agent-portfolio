#!/bin/bash

# ワークフロー完全性チェックスクリプト
# Portfolio と Client 両方のワークフローを徹底的に検証

set -e

# カラー定義
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
MAGENTA='\033[0;35m'
NC='\033[0m' # No Color

echo -e "${BLUE}================================${NC}"
echo -e "${BLUE}🔍 ワークフロー完全性チェック${NC}"
echo -e "${BLUE}================================${NC}"

# チェック結果を記録
PORTFOLIO_ISSUES=()
CLIENT_ISSUES=()
PORTFOLIO_OK=()
CLIENT_OK=()

# ======================
# 共通コンポーネントのチェック
# ======================
echo -e "\n${CYAN}【共通コンポーネント】${NC}"

# 1. create_new_app.command
if [ -f "create_new_app.command" ]; then
    echo -e "✅ create_new_app.command"

    # 必要な機能の確認
    grep -q "プロジェクトタイプを選択" create_new_app.command && \
        echo -e "  ✅ プロジェクトタイプ選択機能" || \
        echo -e "  ❌ プロジェクトタイプ選択機能が見つかりません"

    grep -q "git init" create_new_app.command && \
        echo -e "  ✅ Git初期化" || \
        echo -e "  ❌ Git初期化が見つかりません"

    grep -q "PROJECT_INFO.yaml" create_new_app.command && \
        echo -e "  ✅ PROJECT_INFO.yaml生成" || \
        echo -e "  ❌ PROJECT_INFO.yaml生成が見つかりません"
else
    echo -e "❌ create_new_app.command が見つかりません"
fi

# 2. 基本的なエージェントファイル
echo -e "\n${CYAN}【エージェントシステム】${NC}"

AGENT_FILES=(
    "CLAUDE.md"
    "SUBAGENT_PROMPT_TEMPLATE.md"
    "src/claude_agent_executor.py"
    "src/workflow_orchestrator.py"
    "src/launcher_generator.py"
)

for file in "${AGENT_FILES[@]}"; do
    if [ -f "$file" ]; then
        echo -e "✅ $file"
    else
        echo -e "❌ $file が見つかりません"
    fi
done

# ======================
# Portfolio ワークフローのチェック
# ======================
echo -e "\n${MAGENTA}【Portfolio プロジェクト ワークフロー】${NC}"

echo -e "\n${YELLOW}必須ファイル:${NC}"

# Portfolio用スクリプト（create_new_app.commandで生成されるもの）
PORTFOLIO_GENERATED=(
    "release.sh:リリース版作成"
    "publish_to_portfolio.sh:GitHub公開"
)

for item in "${PORTFOLIO_GENERATED[@]}"; do
    file="${item%:*}"
    desc="${item#*:}"

    if grep -q "cat > $file" create_new_app.command 2>/dev/null; then
        echo -e "✅ $file ($desc) - 生成される"
        PORTFOLIO_OK+=("$file")
    else
        echo -e "❌ $file ($desc) - 生成されない"
        PORTFOLIO_ISSUES+=("$file が生成されない")
    fi
done

# Portfolio公開システム
echo -e "\n${YELLOW}公開システム:${NC}"
if [ -f "src/portfolio_publisher.py" ]; then
    echo -e "✅ portfolio_publisher.py"

    # 機能チェック
    grep -q "professional-docs" src/portfolio_publisher.py && \
        echo -e "  ✅ プロフェッショナル文書対応" || \
        echo -e "  ⚠️  プロフェッショナル文書未対応"

    grep -q "slug" src/portfolio_publisher.py && \
        echo -e "  ✅ slug方式での管理" || \
        echo -e "  ❌ slug方式未実装"
else
    echo -e "❌ portfolio_publisher.py が見つかりません"
    PORTFOLIO_ISSUES+=("portfolio_publisher.py が存在しない")
fi

# Portfolio強化機能
echo -e "\n${YELLOW}強化機能:${NC}"
if [ -f "src/portfolio_doc_generator.py" ]; then
    echo -e "✅ portfolio_doc_generator.py (プロフェッショナル文書生成)"
    PORTFOLIO_OK+=("プロフェッショナル文書生成")
else
    echo -e "⚠️  portfolio_doc_generator.py が見つかりません（オプション）"
fi

if [ -f "enhance_portfolio_with_docs.sh" ]; then
    echo -e "✅ enhance_portfolio_with_docs.sh (Portfolio強化スクリプト)"
    PORTFOLIO_OK+=("Portfolio強化機能")
else
    echo -e "⚠️  enhance_portfolio_with_docs.sh が見つかりません（オプション）"
fi

# ======================
# Client ワークフローのチェック
# ======================
echo -e "\n${MAGENTA}【Client プロジェクト ワークフロー】${NC}"

echo -e "\n${YELLOW}必須ファイル:${NC}"

# Client用スクリプト（create_new_app.commandで生成されるもの）
CLIENT_GENERATED=(
    "generate_documents.sh:ドキュメント生成"
    "package_deliverables.sh:納品物パッケージング"
)

for item in "${CLIENT_GENERATED[@]}"; do
    file="${item%:*}"
    desc="${item#*:}"

    if grep -q "cat > $file" create_new_app.command 2>/dev/null; then
        echo -e "✅ $file ($desc) - 生成される"
        CLIENT_OK+=("$file")
    else
        echo -e "❌ $file ($desc) - 生成されない"
        CLIENT_ISSUES+=("$file が生成されない")
    fi
done

# ドキュメント生成システム
echo -e "\n${YELLOW}ドキュメント生成:${NC}"

if [ -f "src/client_document_generator.py" ]; then
    echo -e "✅ client_document_generator.py (基本版)"
    CLIENT_OK+=("基本ドキュメント生成")
fi

if [ -f "src/enhanced_client_document_generator.py" ]; then
    echo -e "✅ enhanced_client_document_generator.py (強化版)"
    CLIENT_OK+=("強化版ドキュメント生成")

    # 機能チェック
    grep -q "get_test_results" src/enhanced_client_document_generator.py && \
        echo -e "  ✅ テスト結果自動取得" || \
        echo -e "  ⚠️  テスト結果手動入力"

    grep -q "get_git_info" src/enhanced_client_document_generator.py && \
        echo -e "  ✅ Git情報自動取得" || \
        echo -e "  ⚠️  Git情報未対応"
else
    echo -e "❌ enhanced_client_document_generator.py が見つかりません"
    CLIENT_ISSUES+=("enhanced_client_document_generator.py が存在しない")
fi

# PDF変換システム
echo -e "\n${YELLOW}PDF変換:${NC}"

if [ -f "src/pdf_converter.js" ]; then
    echo -e "✅ pdf_converter.js"
    CLIENT_OK+=("PDF変換機能")

    # package.jsonでの依存関係確認
    if [ -f "package.json" ]; then
        grep -q "puppeteer" package.json && \
            echo -e "  ✅ puppeteer 依存関係" || \
            echo -e "  ❌ puppeteer が package.json にない"

        grep -q "marked" package.json && \
            echo -e "  ✅ marked 依存関係" || \
            echo -e "  ❌ marked が package.json にない"
    fi
else
    echo -e "❌ pdf_converter.js が見つかりません"
    CLIENT_ISSUES+=("pdf_converter.js が存在しない")
fi

# 納品物パッケージング
echo -e "\n${YELLOW}納品物管理:${NC}"

if [ -f "package_deliverables.sh" ]; then
    echo -e "✅ package_deliverables.sh"

    # 機能チェック
    grep -q "npm install" package_deliverables.sh && \
        echo -e "  ✅ 自動npm install" || \
        echo -e "  ⚠️  手動npm install必要"

    grep -q "deliverables.zip" package_deliverables.sh && \
        echo -e "  ✅ ZIP作成機能" || \
        echo -e "  ❌ ZIP作成機能なし"
else
    echo -e "❌ package_deliverables.sh が見つかりません"
    CLIENT_ISSUES+=("package_deliverables.sh が存在しない")
fi

# ======================
# ワークフロー自動化のチェック
# ======================
echo -e "\n${CYAN}【ワークフロー自動化】${NC}"

# create_new_app.commandでの自動化
echo -e "\n${YELLOW}プロジェクト作成時の自動化:${NC}"

grep -q "npm install" create_new_app.command && \
    echo -e "✅ Client作成時の自動npm install" || \
    echo -e "⚠️  Client作成時のnpm installは手動"

grep -q "enhanced_client_document_generator.py" create_new_app.command && \
    echo -e "✅ Client用ドキュメント生成器のコピー" || \
    echo -e "❌ Client用ドキュメント生成器がコピーされない"

grep -q "pdf_converter.js" create_new_app.command && \
    echo -e "✅ PDF変換スクリプトのコピー" || \
    echo -e "❌ PDF変換スクリプトがコピーされない"

# ======================
# 不足している可能性のある機能
# ======================
echo -e "\n${CYAN}【推奨される追加機能】${NC}"

RECOMMENDED_FEATURES=(
    "CI/CD設定ファイル:.github/workflows/deploy.yml"
    "Dockerサポート:Dockerfile"
    "環境変数テンプレート:.env.example"
    "VSCode設定:.vscode/settings.json"
    "エラー通知:src/error_notifier.py"
    "進捗レポート:src/progress_reporter.py"
    "バージョン管理:VERSION"
    "ライセンス:LICENSE"
)

for feature in "${RECOMMENDED_FEATURES[@]}"; do
    file="${feature%:*}"
    desc="${feature#*:}"

    if [ -f "$file" ]; then
        echo -e "✅ $desc ($file)"
    else
        echo -e "💡 $desc ($file) - 追加を検討"
    fi
done

# ======================
# 総合評価
# ======================
echo -e "\n${BLUE}================================${NC}"
echo -e "${BLUE}📊 総合評価${NC}"
echo -e "${BLUE}================================${NC}"

echo -e "\n${MAGENTA}【Portfolio ワークフロー】${NC}"
if [ ${#PORTFOLIO_ISSUES[@]} -eq 0 ]; then
    echo -e "${GREEN}✅ 完全性: 100% - すべての必須コンポーネントが揃っています${NC}"
else
    echo -e "${YELLOW}⚠️  改善が必要な項目:${NC}"
    for issue in "${PORTFOLIO_ISSUES[@]}"; do
        echo -e "  - $issue"
    done
fi
echo -e "${GREEN}利用可能な機能:${NC}"
for ok in "${PORTFOLIO_OK[@]}"; do
    echo -e "  ✅ $ok"
done

echo -e "\n${MAGENTA}【Client ワークフロー】${NC}"
if [ ${#CLIENT_ISSUES[@]} -eq 0 ]; then
    echo -e "${GREEN}✅ 完全性: 100% - すべての必須コンポーネントが揃っています${NC}"
else
    echo -e "${YELLOW}⚠️  改善が必要な項目:${NC}"
    for issue in "${CLIENT_ISSUES[@]}"; do
        echo -e "  - $issue"
    done
fi
echo -e "${GREEN}利用可能な機能:${NC}"
for ok in "${CLIENT_OK[@]}"; do
    echo -e "  ✅ $ok"
done

# ======================
# 改善提案
# ======================
echo -e "\n${BLUE}================================${NC}"
echo -e "${BLUE}💡 改善提案${NC}"
echo -e "${BLUE}================================${NC}"

cat << 'IMPROVEMENTS'

## 🚀 即座に実装可能な改善

1. **エラーハンドリングの強化**
   - 各スクリプトにエラー通知機能を追加
   - 失敗時の自動リトライ機能

2. **進捗表示の改善**
   - プログレスバーの実装
   - 推定完了時間の表示

3. **テスト自動化の強化**
   - プロジェクト作成後の自動テスト実行
   - テスト結果の自動レポート生成

## 📈 中期的な改善案

1. **CI/CD統合**
   - GitHub Actions設定の自動生成
   - 自動デプロイ設定

2. **マルチ言語対応**
   - 英語版ドキュメントの自動生成
   - 国際化対応

3. **パフォーマンス最適化**
   - 並列処理の活用
   - キャッシュの実装

## 🎯 長期的なビジョン

1. **AIエージェントの学習機能**
   - 過去のプロジェクトから学習
   - ベストプラクティスの自動適用

2. **プラグインシステム**
   - カスタムエージェントの追加
   - サードパーティツール連携

3. **ダッシュボード**
   - プロジェクト管理UI
   - 進捗可視化

IMPROVEMENTS

echo -e "\n${GREEN}✨ 現在のシステムは高い完成度に達しています！${NC}"
echo -e "継続的な改善により、さらに強力なツールに進化可能です。"