#!/bin/bash
# AIアプリ管理ツール
# AI-Appsフォルダ内のアプリを管理

set -e

# カラー定義
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
RED='\033[0;31m'
CYAN='\033[0;36m'
NC='\033[0m'

AI_APPS_DIR="$HOME/Desktop/AI-Apps"

# ターミナルをクリア
clear

echo -e "${CYAN}================================${NC}"
echo -e "${CYAN}📱 AIアプリ管理センター${NC}"
echo -e "${CYAN}================================${NC}"
echo ""

# AI-Appsフォルダが存在しない場合は作成
if [ ! -d "$AI_APPS_DIR" ]; then
    echo -e "${YELLOW}AI-Appsフォルダを作成中...${NC}"
    mkdir -p "$AI_APPS_DIR"
fi

# アプリ一覧を取得
APPS=($(ls -1d ${AI_APPS_DIR}/*-agent 2>/dev/null))

if [ ${#APPS[@]} -eq 0 ]; then
    echo -e "${YELLOW}まだAIアプリが作成されていません${NC}"
    echo ""
    echo "新しいアプリを作成するには："
    echo "  ./create_new_app.command を実行してください"
else
    echo -e "${GREEN}📂 作成済みのAIアプリ:${NC}"
    echo ""

    # アプリ一覧を表示
    for i in "${!APPS[@]}"; do
        APP_NAME=$(basename "${APPS[$i]}")
        APP_DATE=$(echo $APP_NAME | cut -d'-' -f1)
        APP_TYPE=$(echo $APP_NAME | sed 's/^[0-9]*-//' | sed 's/-agent$//')

        # プロジェクト情報を読み取り
        if [ -f "${APPS[$i]}/PROJECT_INFO.yaml" ]; then
            STATUS=$(grep "status:" "${APPS[$i]}/PROJECT_INFO.yaml" | awk '{print $2}')
        else
            STATUS="unknown"
        fi

        # ステータスに応じた色分け
        if [ "$STATUS" = "development" ]; then
            STATUS_COLOR="${YELLOW}🔨 開発中${NC}"
        elif [ "$STATUS" = "released" ]; then
            STATUS_COLOR="${GREEN}✅ リリース済${NC}"
        else
            STATUS_COLOR="${BLUE}📦 ${STATUS}${NC}"
        fi

        echo -e "  ${BLUE}[$((i+1))]${NC} ${APP_TYPE}"
        echo -e "      日付: ${APP_DATE}"
        echo -e "      状態: ${STATUS_COLOR}"
        echo ""
    done

    echo -e "${CYAN}================================${NC}"
    echo -e "${YELLOW}操作を選択してください:${NC}"
    echo "  [番号] - 選択したアプリフォルダを開く"
    echo "  [a]    - AI-Appsフォルダ全体を開く"
    echo "  [n]    - 新規アプリを作成"
    echo "  [q]    - 終了"
    echo ""
    read -p "選択: " CHOICE

    if [[ "$CHOICE" =~ ^[0-9]+$ ]] && [ "$CHOICE" -ge 1 ] && [ "$CHOICE" -le ${#APPS[@]} ]; then
        # 選択したアプリを開く
        SELECTED_APP="${APPS[$((CHOICE-1))]}"
        echo -e "${GREEN}開いています: $(basename $SELECTED_APP)${NC}"
        open "$SELECTED_APP"
    elif [ "$CHOICE" = "a" ] || [ "$CHOICE" = "A" ]; then
        # AI-Appsフォルダを開く
        echo -e "${GREEN}AI-Appsフォルダを開いています...${NC}"
        open "$AI_APPS_DIR"
    elif [ "$CHOICE" = "n" ] || [ "$CHOICE" = "N" ]; then
        # 新規作成
        echo -e "${GREEN}新規アプリ作成ツールを起動します...${NC}"
        ./create_new_app.command
        exit 0
    elif [ "$CHOICE" = "q" ] || [ "$CHOICE" = "Q" ]; then
        echo -e "${GREEN}終了します${NC}"
        exit 0
    else
        echo -e "${RED}無効な選択です${NC}"
    fi
fi

echo ""
echo "ウィンドウを閉じるには何かキーを押してください..."
read -n 1