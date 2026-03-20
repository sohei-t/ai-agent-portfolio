#!/usr/bin/env python3
"""
slideAPI対応済みファイルに後方互換性エイリアスを追加するスクリプト

使用方法:
    python3 scripts/fix_slideapi_aliases.py <directory>

機能:
    - 既にslideAPI対応済みのファイルにエイリアスを追加
    - nextSlide, prevSlide, goToSlide のエイリアスを追加
"""

import os
import re
import sys
from pathlib import Path


# 追加するエイリアスコード
ALIASES_CODE = '''
        // 後方互換性エイリアス（既存のonclick属性との互換性を維持）
        var nextSlide = goToNext;
        var prevSlide = goToPrevious;
        var goToSlide = showSlide;'''

ALIASES_CODE_GOTOPREV = '''
        // 後方互換性エイリアス（既存のonclick属性との互換性を維持）
        var nextSlide = goToNext;
        var prevSlide = goToPrev;
        var goToSlide = showSlide;'''


def fix_html_file(filepath: Path) -> tuple:
    """
    HTMLファイルにエイリアスを追加

    Returns:
        (success: bool, message: str)
    """
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()

        # slideAPI対応済みかチェック
        if 'window.slideAPI' not in content:
            return (False, "slideAPI未対応")

        # 既にエイリアスがあるかチェック
        if 'var nextSlide = goToNext' in content or 'var nextSlide=goToNext' in content:
            return (False, "既にエイリアス追加済み")

        # index.htmlはスキップ
        if filepath.name == 'index.html':
            return (False, "index.htmlはスキップ")

        original_content = content

        # goToPrev を使用しているか確認
        use_goToPrev = 'function goToPrev(' in content

        # エイリアスを追加
        aliases = ALIASES_CODE_GOTOPREV if use_goToPrev else ALIASES_CODE

        # キーボードショートカットの直前に追加
        if 'キーボードショートカット' in content:
            content = content.replace(
                '        // キーボードショートカット',
                aliases + '\n\n        // キーボードショートカット'
            )
        # または slideAPI公開の直前に追加
        elif '// ===== slideAPI公開' in content:
            content = content.replace(
                '        // ===== slideAPI公開',
                aliases + '\n\n        // ===== slideAPI公開'
            )
        # またはgoToLast関数の直後に追加
        elif 'function goToLast()' in content:
            # goToLast関数の行を探して、その次の行に追加
            content = re.sub(
                r'(function goToLast\(\)[^\n]+\n)',
                r'\1' + aliases + '\n',
                content,
                count=1
            )
        else:
            return (False, "挿入位置が見つかりません")

        # 変更があったかチェック
        if content == original_content:
            return (False, "変更なし")

        # ファイルを更新
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)

        return (True, "エイリアス追加完了")

    except Exception as e:
        return (False, f"エラー: {e}")


def main():
    if len(sys.argv) < 2:
        print("使用方法: python3 scripts/fix_slideapi_aliases.py <directory>")
        print("例: python3 scripts/fix_slideapi_aliases.py /Users/sohei/Desktop/Learning-Curricula")
        sys.exit(1)

    directory = Path(sys.argv[1])

    if not directory.exists():
        print(f"エラー: ディレクトリが見つかりません: {directory}")
        sys.exit(1)

    print(f"\n{'='*60}")
    print(f"slideAPIエイリアス追加スクリプト")
    print(f"{'='*60}")
    print(f"ディレクトリ: {directory}")

    # HTMLファイルを検索
    html_files = sorted(directory.rglob("*.html"))

    if not html_files:
        print("\nHTMLファイルが見つかりません")
        sys.exit(1)

    print(f"\n検出されたHTMLファイル: {len(html_files)}件")
    print(f"\n{'─'*60}")

    fixed_count = 0
    skipped_count = 0
    error_count = 0

    for html_file in html_files:
        rel_path = html_file.relative_to(directory)
        success, message = fix_html_file(html_file)

        if success:
            print(f"  ✅ {rel_path}")
            fixed_count += 1
        elif "エラー" in message:
            print(f"  ❌ {rel_path}: {message}")
            error_count += 1
        else:
            print(f"  ⏭️ {rel_path}: {message}")
            skipped_count += 1

    print(f"{'─'*60}")
    print(f"\n📊 結果サマリー")
    print(f"{'='*60}")
    print(f"✅ 修正: {fixed_count}件")
    print(f"⏭️ スキップ: {skipped_count}件")
    print(f"❌ エラー: {error_count}件")
    print(f"───────────────────")
    print(f"合計: {len(html_files)}件")

    if fixed_count > 0:
        print(f"\n✅ エイリアス追加完了！")


if __name__ == "__main__":
    main()
