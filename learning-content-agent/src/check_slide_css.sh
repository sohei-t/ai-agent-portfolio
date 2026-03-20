#!/bin/bash
#
# check_slide_css.sh - スライドCSSの競合をチェック
#
# スライド切り替えを壊す可能性のあるCSSルールを検出する。
# .title-slide等で直接 display: flex/block/grid を指定すると、
# .slide { display: none; } を上書きしてしまい、
# 全スライドが常に表示される問題が発生する。
#
# 使用方法:
#   bash src/check_slide_css.sh [content_dir]
#
# 戻り値:
#   0: 問題なし
#   1: 問題あり
#

# 色定義
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# コンテンツディレクトリ
CONTENT_DIR="${1:-content}"

echo "=============================================="
echo "🔍 スライドCSS競合チェック"
echo "=============================================="
echo "対象ディレクトリ: $CONTENT_DIR"
echo ""

# HTMLファイルが存在するか確認
if ! ls "$CONTENT_DIR"/*.html &> /dev/null; then
    echo -e "${YELLOW}⚠️  HTMLファイルが見つかりません${NC}"
    exit 0
fi

error_count=0
checked_count=0

# 各HTMLファイルをチェック
for file in "$CONTENT_DIR"/*.html; do
    ((checked_count++))
    filename=$(basename "$file")

    # .slide 以外のスライド関連セレクタで display: flex/block/grid が指定されているかチェック
    # 除外: .slide.active.XXX の形式（これは正しいパターン）

    # パターン1: .title-slide, .intro-slide, .summary-slide, .chapter-slide 等で直接 display 指定
    result=$(grep -n 'display:\s*\(flex\|block\|grid\)' "$file" | \
             grep -v '\.slide\.active' | \
             grep -v '\.slide\s*{' | \
             grep -E '\.(title|intro|summary|chapter|content|main|header|footer)-slide' || true)

    if [ -n "$result" ]; then
        echo -e "${RED}❌ 問題あり: $filename${NC}"
        echo "   以下の行でCSS競合の可能性:"
        echo "$result" | while read -r line; do
            echo "   → $line"
        done
        echo ""
        echo "   修正方法:"
        echo "   .XXX-slide { display: flex; }"
        echo "   ↓"
        echo "   .slide.active.XXX-slide { display: flex; }"
        echo ""
        ((error_count++))
    fi
done

# === コードブロック white-space チェック ===
echo ""
echo "=============================================="
echo "🔍 コードブロック white-space チェック"
echo "=============================================="

ws_error_count=0

for file in "$CONTENT_DIR"/*.html; do
    filename=$(basename "$file")

    # コードブロック系のCSSセレクタがあるか確認
    has_code_selector=$(grep -c -E '\.(code-block|code-content|terminal-body|terminal-block|command-block|quiz-code|script-block|yaml-block|json-block|config-block|dockerfile-block|bash-block|shell-block)\s*\{' "$file" 2>/dev/null || true)
    has_code_selector=${has_code_selector:-0}

    if [ "$has_code_selector" -gt 0 ]; then
        # white-space: pre または pre-wrap が含まれているかチェック
        has_whitespace=$(grep -c -E 'white-space:\s*(pre|pre-wrap|pre-line)' "$file" 2>/dev/null || true)
        has_whitespace=${has_whitespace:-0}

        if [ "$has_whitespace" -eq 0 ]; then
            echo -e "${RED}❌ 問題あり: $filename${NC}"
            echo "   コードブロック用CSSに white-space: pre-wrap が未指定"
            echo ""
            ((ws_error_count++))
        fi
    fi
done

if [ $ws_error_count -eq 0 ]; then
    echo -e "${GREEN}✅ すべてのファイルで問題なし${NC}"
else
    echo -e "${RED}❌ $ws_error_count ファイルで問題が見つかりました${NC}"
    echo "   コードブロック用CSSに white-space: pre-wrap; を追加してください"
fi

# === ナビゲーション onclick 関数チェック ===
echo ""
echo "=============================================="
echo "🔍 ナビゲーション onclick 関数チェック"
echo "=============================================="

nav_error_count=0

for file in "$CONTENT_DIR"/*.html; do
    filename=$(basename "$file")

    # onclick属性から呼ばれている関数名を抽出（macOS BSD grep互換）
    onclick_funcs=$(grep -oE 'onclick="[a-zA-Z_][a-zA-Z0-9_]*\(' "$file" 2>/dev/null | sed 's/onclick="//;s/($//' | sort -u)

    for func in $onclick_funcs; do
        # この関数がファイル内で定義されているか確認
        if ! grep -qE "function ${func}[^a-zA-Z0-9_]|var ${func}[[:space:]]*=" "$file" 2>/dev/null; then
            echo -e "${RED}❌ 問題あり: $filename${NC}"
            echo "   onclick=\"${func}(...)\" を呼んでいるが、${func}() が未定義"
            echo ""
            ((nav_error_count++))
        fi
    done
done

if [ $nav_error_count -eq 0 ]; then
    echo -e "${GREEN}✅ すべてのファイルで問題なし${NC}"
else
    echo -e "${RED}❌ $nav_error_count 件の未定義関数呼び出しが見つかりました${NC}"
    echo "   SLIDE_API_SPEC.md で定義された関数名のみを使用してください"
fi

# === 総合チェック結果 ===
echo ""
echo "=============================================="
echo "📊 チェック結果"
echo "=============================================="
echo "チェックしたファイル: $checked_count 件"

total_errors=$((error_count + ws_error_count + nav_error_count))

if [ $total_errors -eq 0 ]; then
    echo -e "${GREEN}✅ すべてのファイルで問題なし${NC}"
    echo ""
    echo "スライド切り替え機能は正常に動作する見込みです。"
    exit 0
else
    if [ $error_count -gt 0 ]; then
        echo -e "${RED}❌ CSS display 競合: $error_count ファイル${NC}"
    else
        echo -e "${GREEN}✅ CSS display 競合: 問題なし${NC}"
    fi
    if [ $ws_error_count -gt 0 ]; then
        echo -e "${RED}❌ コードブロック white-space: $ws_error_count ファイル${NC}"
    else
        echo -e "${GREEN}✅ コードブロック white-space: 問題なし${NC}"
    fi
    if [ $nav_error_count -gt 0 ]; then
        echo -e "${RED}❌ ナビゲーション onclick: $nav_error_count 件${NC}"
    else
        echo -e "${GREEN}✅ ナビゲーション onclick: 問題なし${NC}"
    fi
    echo ""
    echo "【対処方法】"
    if [ $error_count -gt 0 ]; then
        echo "- CSS display 競合: .XXX-slide { display: flex; } → .slide.active.XXX-slide { display: flex; } に変更"
    fi
    if [ $ws_error_count -gt 0 ]; then
        echo "- コードブロック: white-space: pre-wrap; を追加"
    fi
    if [ $nav_error_count -gt 0 ]; then
        echo "- onclick関数: SLIDE_API_SPEC.md で定義された関数名のみを使用"
    fi
    echo ""
    echo "詳細は SUBAGENT_PROMPT_TEMPLATE.md を参照"
    exit 1
fi
