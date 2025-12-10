#!/bin/bash

# 音声生成機能の統合テストスクリプト

set -e

# カラー定義
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

echo -e "${BLUE}================================${NC}"
echo -e "${BLUE}🔊 音声生成機能テスト${NC}"
echo -e "${BLUE}================================${NC}"

# テスト用ディレクトリを作成
TEST_DIR="test_audio_$(date +%Y%m%d_%H%M%S)"
mkdir -p "$TEST_DIR"
cd "$TEST_DIR"

echo -e "\n${CYAN}1. テスト環境の準備${NC}"

# PROJECT_INFO.yaml を作成
cat > PROJECT_INFO.yaml << 'EOF'
project:
  name: AudioTestProject
  slug: audio-test
  type: portfolio
  created: 2024-12-09
EOF
echo -e "${GREEN}✅ PROJECT_INFO.yaml 作成${NC}"

# package.json を作成
cat > package.json << 'EOF'
{
  "name": "audio-test-project",
  "version": "1.0.0",
  "description": "Audio generation test",
  "scripts": {
    "generate-audio:gcp": "node generate_audio_gcp.js"
  },
  "dependencies": {
    "@google-cloud/text-to-speech": "^4.2.0"
  }
}
EOF
echo -e "${GREEN}✅ package.json 作成${NC}"

# Documenterエージェントを実行
echo -e "\n${CYAN}2. Documenterエージェントの実行${NC}"

python3 ../src/documenter_agent.py

# 生成されたファイルを確認
echo -e "\n${CYAN}3. 生成ファイルの確認${NC}"

if [ -f "about.html" ]; then
    echo -e "${GREEN}✅ about.html が生成されました${NC}"
    echo -e "  サイズ: $(wc -c < about.html) bytes"
else
    echo -e "${RED}❌ about.html が生成されませんでした${NC}"
fi

if [ -f "audio_script.txt" ]; then
    echo -e "${GREEN}✅ audio_script.txt が生成されました${NC}"
    echo -e "  文字数: $(wc -m < audio_script.txt) 文字"
else
    echo -e "${RED}❌ audio_script.txt が生成されませんでした${NC}"
fi

if [ -f "generate_audio_gcp.js" ]; then
    echo -e "${GREEN}✅ generate_audio_gcp.js が生成されました${NC}"
else
    echo -e "${RED}❌ generate_audio_gcp.js が生成されませんでした${NC}"
fi

# GCP認証情報の確認
echo -e "\n${CYAN}4. GCP認証情報の確認${NC}"

CRED_PATH="$HOME/Desktop/git-worktree-agent/credentials/gcp-tts-key.json"
if [ -f "$CRED_PATH" ]; then
    echo -e "${GREEN}✅ GCP認証キーが存在します${NC}"

    # npm install を実行
    echo -e "\n${CYAN}5. 依存パッケージのインストール${NC}"
    if command -v npm &> /dev/null; then
        echo -e "${YELLOW}npm install を実行中...${NC}"
        npm install --silent

        if [ -d "node_modules/@google-cloud/text-to-speech" ]; then
            echo -e "${GREEN}✅ @google-cloud/text-to-speech インストール完了${NC}"

            # 音声生成を実行
            echo -e "\n${CYAN}6. 音声生成の実行${NC}"
            echo -e "${YELLOW}音声を生成しますか？ (y/n)${NC}"
            read -p "> " GENERATE_AUDIO

            if [ "$GENERATE_AUDIO" = "y" ] || [ "$GENERATE_AUDIO" = "Y" ]; then
                export GOOGLE_APPLICATION_CREDENTIALS="$CRED_PATH"

                # generate_audio_gcp.js の認証パスを修正
                if [ -f "generate_audio_gcp.js" ]; then
                    sed -i.bak "s|keyFilename:.*|keyFilename: '$CRED_PATH'|" generate_audio_gcp.js
                fi

                npm run generate-audio:gcp

                if [ -f "explanation.mp3" ]; then
                    echo -e "${GREEN}✅ explanation.mp3 が生成されました！${NC}"
                    echo -e "  サイズ: $(du -h explanation.mp3 | cut -f1)"

                    # macOSの場合は再生
                    if [ "$(uname)" = "Darwin" ]; then
                        echo -e "${YELLOW}音声を再生しますか？ (y/n)${NC}"
                        read -p "> " PLAY_AUDIO
                        if [ "$PLAY_AUDIO" = "y" ] || [ "$PLAY_AUDIO" = "Y" ]; then
                            afplay explanation.mp3
                        fi
                    fi
                else
                    echo -e "${RED}❌ 音声ファイルが生成されませんでした${NC}"
                fi
            fi
        else
            echo -e "${RED}❌ @google-cloud/text-to-speech のインストールに失敗しました${NC}"
        fi
    else
        echo -e "${YELLOW}⚠️  npm がインストールされていません${NC}"
    fi
else
    echo -e "${YELLOW}⚠️  GCP認証キーが見つかりません: $CRED_PATH${NC}"
    echo -e "${YELLOW}   ../setup_gcp_tts.sh を実行してセットアップしてください${NC}"
fi

# HTMLファイルをブラウザで開く
echo -e "\n${CYAN}7. ブラウザで確認${NC}"
if [ -f "about.html" ]; then
    echo -e "${YELLOW}about.html をブラウザで開きますか？ (y/n)${NC}"
    read -p "> " OPEN_BROWSER

    if [ "$OPEN_BROWSER" = "y" ] || [ "$OPEN_BROWSER" = "Y" ]; then
        if [ "$(uname)" = "Darwin" ]; then
            open about.html
        elif [ "$(uname)" = "Linux" ]; then
            xdg-open about.html 2>/dev/null || firefox about.html 2>/dev/null || google-chrome about.html 2>/dev/null
        fi
        echo -e "${GREEN}✅ ブラウザで開きました${NC}"
    fi
fi

# テスト結果のサマリー
echo -e "\n${BLUE}================================${NC}"
echo -e "${BLUE}📊 テスト結果サマリー${NC}"
echo -e "${BLUE}================================${NC}"

SUCCESS_COUNT=0
TOTAL_COUNT=4

echo ""
[ -f "about.html" ] && ((SUCCESS_COUNT++)) && echo -e "${GREEN}✅ about.html 生成${NC}" || echo -e "${RED}❌ about.html 生成失敗${NC}"
[ -f "audio_script.txt" ] && ((SUCCESS_COUNT++)) && echo -e "${GREEN}✅ audio_script.txt 生成${NC}" || echo -e "${RED}❌ audio_script.txt 生成失敗${NC}"
[ -f "generate_audio_gcp.js" ] && ((SUCCESS_COUNT++)) && echo -e "${GREEN}✅ generate_audio_gcp.js 生成${NC}" || echo -e "${RED}❌ generate_audio_gcp.js 生成失敗${NC}"
[ -f "explanation.mp3" ] && ((SUCCESS_COUNT++)) && echo -e "${GREEN}✅ explanation.mp3 生成${NC}" || echo -e "${YELLOW}⚠️  explanation.mp3 未生成（手動実行が必要）${NC}"

echo -e "\n結果: ${SUCCESS_COUNT}/${TOTAL_COUNT} 成功"

if [ "$SUCCESS_COUNT" -eq "$TOTAL_COUNT" ]; then
    echo -e "${GREEN}🎉 すべてのテストに成功しました！${NC}"
else
    echo -e "${YELLOW}⚠️  一部のテストが未完了です${NC}"

    if [ ! -f "explanation.mp3" ]; then
        echo -e "\n${YELLOW}音声ファイルを生成するには:${NC}"
        echo "1. cd $(pwd)"
        echo "2. export GOOGLE_APPLICATION_CREDENTIALS=\"$CRED_PATH\""
        echo "3. npm run generate-audio:gcp"
    fi
fi

# クリーンアップ
echo -e "\n${YELLOW}テストディレクトリを削除しますか？ (y/n)${NC}"
read -p "> " CLEANUP

if [ "$CLEANUP" = "y" ] || [ "$CLEANUP" = "Y" ]; then
    cd ..
    rm -rf "$TEST_DIR"
    echo -e "${GREEN}✅ テストディレクトリを削除しました${NC}"
else
    echo -e "${YELLOW}テストディレクトリ: $(pwd)${NC}"
fi

echo -e "\n${GREEN}テスト完了${NC}"