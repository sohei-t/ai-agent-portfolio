#!/usr/bin/env python3
"""
既存HTMLスライドをslideAPI v1.0対応にアップグレードするスクリプト v2.0

複数の異なるHTML構造パターンに対応。

使用方法:
    python3 scripts/upgrade_to_slideapi_v2.py <directory>
    python3 scripts/upgrade_to_slideapi_v2.py /Users/sohei/Desktop/Learning-Curricula/FireBase入門/content

機能:
    - 既存のナビゲーションに content-nav クラスを追加
    - JavaScriptにslideAPIを追加（異なる関数名パターンに対応）
    - CSSにプラットフォーム制御時の非表示スタイルを追加
    - 複数のスクリプトパターンを検出して置き換え
"""

import os
import re
import sys
from pathlib import Path


def generate_slideapi_script(use_goToPrev=False, slide_badge_id='slideNumber', use_slide_badge=False):
    """
    HTMLの既存パターンに合わせたslideAPIスクリプトを生成

    Args:
        use_goToPrev: goToPrev()を使用するか（False=goToPrevious()）
        slide_badge_id: スライド番号表示のID
        use_slide_badge: slideBadgeスタイルを使用するか
    """
    prev_func_name = "goToPrev" if use_goToPrev else "goToPrevious"
    update_func_name = "updateSlide" if use_goToPrev else "updateSlideInfo"

    # スライド番号更新のコード
    if use_slide_badge:
        slide_num_update = f'''const slideNumEl = document.getElementById('{slide_badge_id}');
            if (slideNumEl) {{
                slideNumEl.textContent = `${{currentSlide}} / ${{totalSlides}}`;
            }}'''
    else:
        slide_num_update = f'''const slideNumEl = document.getElementById('{slide_badge_id}');
            if (slideNumEl) {{
                slideNumEl.textContent = `Step (${{currentSlide}}/${{totalSlides}})`;
            }}'''

    return f'''    <script>
        // スライド制御スクリプト（slideAPI v1.0対応）
        let currentSlide = 1;
        let totalSlides = 0;

        function {update_func_name}() {{
            const slides = document.querySelectorAll('.slide');
            totalSlides = slides.length;
            {slide_num_update}

            slides.forEach((slide, index) => {{
                slide.classList.remove('active');
                if (index + 1 === currentSlide) slide.classList.add('active');
            }});

            const prevBtn = document.getElementById('prevBtn');
            const nextBtn = document.getElementById('nextBtn');
            if (prevBtn) prevBtn.disabled = (currentSlide === 1);
            if (nextBtn) nextBtn.disabled = (currentSlide === totalSlides);

            // slideAPIコールバック呼び出し
            if (window.slideAPI && typeof window.slideAPI.onSlideChange === 'function') {{
                window.slideAPI.onSlideChange(currentSlide, totalSlides);
            }}
        }}

        function showSlide(n) {{
            if (n >= 1 && n <= totalSlides) {{
                currentSlide = n;
                {update_func_name}();
            }}
        }}

        function {prev_func_name}() {{ if(currentSlide > 1) {{ currentSlide--; {update_func_name}(); }} }}
        function goToNext() {{ if(currentSlide < totalSlides) {{ currentSlide++; {update_func_name}(); }} }}
        function goToFirst() {{ currentSlide = 1; {update_func_name}(); }}
        function goToLast() {{ currentSlide = totalSlides; {update_func_name}(); }}

        // 後方互換性エイリアス（既存のonclick属性との互換性を維持）
        var nextSlide = goToNext;
        var prevSlide = {prev_func_name};
        var goToSlide = showSlide;

        // キーボードショートカット（プラットフォーム制御時は無効）
        document.addEventListener('keydown', (e) => {{
            if (document.body.classList.contains('platform-controlled')) {{
                return; // プラットフォーム制御モード時は何もしない
            }}
            if(e.key === 'ArrowRight' || e.key === ' ') {{ e.preventDefault(); goToNext(); }}
            if(e.key === 'ArrowLeft') {{ e.preventDefault(); {prev_func_name}(); }}
            if(e.key === 'Home') {{ e.preventDefault(); goToFirst(); }}
        }});

        // ===== slideAPI公開（Progressive Enhancement方式） =====
        window.slideAPI = {{
            version: "1.0",

            // 読み取り
            getTotalSlides: function() {{ return totalSlides; }},
            getCurrentSlide: function() {{ return currentSlide; }},

            // 操作
            showSlide: showSlide,
            nextSlide: goToNext,
            prevSlide: {prev_func_name},
            firstSlide: goToFirst,
            lastSlide: goToLast,

            // UI制御
            hideContentNav: function() {{
                const nav = document.querySelector('.content-nav');
                if (nav) nav.style.display = 'none';
            }},
            showContentNav: function() {{
                const nav = document.querySelector('.content-nav');
                if (nav) nav.style.display = '';
            }},
            setPlatformControlled: function(enabled) {{
                if (enabled) {{
                    document.body.classList.add('platform-controlled');
                }} else {{
                    document.body.classList.remove('platform-controlled');
                }}
            }},

            // イベント（プラットフォームが設定）
            onSlideChange: null
        }};

        {update_func_name}();
    </script>'''


# プラットフォーム制御用CSS
PLATFORM_CONTROL_CSS = '''
        /* プラットフォーム制御時にコンテンツナビゲーションを非表示 */
        body.platform-controlled .content-nav {
            display: none !important;
        }'''


def detect_html_pattern(content):
    """HTMLの構造パターンを検出"""
    pattern = {
        'use_goToPrev': 'goToPrev(' in content or 'goToPrev()' in content,
        'slide_badge_id': 'slideBadge',
        'use_slide_badge': 'slideBadge' in content,
        'has_navigation': 'class="navigation"' in content,
        'has_nav_btn': 'class="nav-btn"' in content,
    }

    # スライド番号表示のIDを検出
    if 'slideBadge' in content:
        pattern['slide_badge_id'] = 'slideBadge'
        pattern['use_slide_badge'] = True
    elif 'slideNumber' in content:
        pattern['slide_badge_id'] = 'slideNumber'
        pattern['use_slide_badge'] = False

    return pattern


def upgrade_html_file(filepath: Path) -> tuple:
    """
    HTMLファイルをslideAPI対応にアップグレード

    Returns:
        (success: bool, message: str)
    """
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()

        # 既にslideAPI対応済みかチェック
        if 'window.slideAPI' in content:
            return (False, "既に対応済み")

        # index.htmlはスキップ（目次ページの場合が多い）
        if filepath.name == 'index.html':
            return (False, "index.htmlはスキップ")

        original_content = content

        # HTMLパターンを検出
        pattern = detect_html_pattern(content)

        # ナビゲーションがない場合はスキップ
        if not pattern['has_navigation'] and not pattern['has_nav_btn']:
            return (False, "ナビゲーションなし")

        # 1. ナビゲーションに content-nav クラスを追加
        content = re.sub(
            r'<nav\s+class="navigation"',
            '<nav class="navigation content-nav"',
            content
        )

        # 2. ナビゲーションボタンに content-nav-btn クラスを追加
        # パターン1: class="nav-btn"
        content = re.sub(
            r'<button\s+class="nav-btn"',
            '<button class="nav-btn content-nav-btn"',
            content
        )
        # パターン2: class="nav-btn" id="..."
        content = re.sub(
            r'<button\s+class="nav-btn"\s+id="',
            '<button class="nav-btn content-nav-btn" id="',
            content
        )
        # パターン3: class="nav-btn primary"
        content = re.sub(
            r'<button\s+class="nav-btn primary"',
            '<button class="nav-btn content-nav-btn primary"',
            content
        )
        # パターン4: class="nav-btn primary" id="..."
        content = re.sub(
            r'<button\s+class="nav-btn primary"\s+id="',
            '<button class="nav-btn content-nav-btn primary" id="',
            content
        )

        # 3. CSSにプラットフォーム制御スタイルを追加
        if 'body.platform-controlled' not in content:
            # パターン1: .nav-btn:disabled の後
            if re.search(r'\.nav-btn:disabled\s*\{[^}]+\}', content):
                content = re.sub(
                    r'(\.nav-btn:disabled\s*\{[^}]+\})',
                    r'\1' + PLATFORM_CONTROL_CSS,
                    content,
                    count=1
                )
            # パターン2: </style> の前
            elif '</style>' in content:
                content = content.replace(
                    '</style>',
                    PLATFORM_CONTROL_CSS + '\n    </style>',
                    1
                )

        # 4. JavaScriptをslideAPI対応に置き換え
        slideapi_script = generate_slideapi_script(
            use_goToPrev=pattern['use_goToPrev'],
            slide_badge_id=pattern['slide_badge_id'],
            use_slide_badge=pattern['use_slide_badge']
        )

        # 複数のスクリプトパターンを試す
        script_patterns = [
            # パターン1: let currentSlide で始まるスクリプト
            r'<script>\s*let\s+currentSlide\s*=\s*1;.*?</script>',
            # パターン2: コメント付き
            r'<script>\s*//.*?スライド.*?let\s+currentSlide.*?</script>',
            # パターン3: const slides で始まるパターン
            r'<script>\s*let\s+currentSlide\s*=\s*1;\s*const\s+slides.*?</script>',
        ]

        replaced = False
        for pattern_str in script_patterns:
            if re.search(pattern_str, content, re.DOTALL):
                content = re.sub(pattern_str, slideapi_script, content, flags=re.DOTALL, count=1)
                replaced = True
                break

        if not replaced:
            # 最後の手段：</body>の直前に追加
            if '</body>' in content and '<script>' in content:
                # 既存のスクリプトを探して置き換えを試みる
                old_script = re.search(r'<script>.*?currentSlide.*?</script>', content, re.DOTALL)
                if old_script:
                    content = content.replace(old_script.group(), slideapi_script)
                    replaced = True

        # 変更があったかチェック
        if content == original_content:
            return (False, "変更なし")

        # ファイルを更新
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)

        return (True, "更新完了")

    except Exception as e:
        return (False, f"エラー: {e}")


def main():
    if len(sys.argv) < 2:
        print("使用方法: python3 scripts/upgrade_to_slideapi_v2.py <directory>")
        print("例: python3 scripts/upgrade_to_slideapi_v2.py /Users/sohei/Desktop/Learning-Curricula/FireBase入門/content")
        sys.exit(1)

    directory = Path(sys.argv[1])

    if not directory.exists():
        print(f"エラー: ディレクトリが見つかりません: {directory}")
        sys.exit(1)

    print(f"\n{'='*60}")
    print(f"HTMLスライドをslideAPI v1.0対応にアップグレード (v2.0)")
    print(f"{'='*60}")
    print(f"ディレクトリ: {directory}")

    # HTMLファイルを検索（サブディレクトリも含む）
    html_files = sorted(directory.rglob("*.html"))

    if not html_files:
        print("\nHTMLファイルが見つかりません")
        sys.exit(1)

    print(f"\n検出されたHTMLファイル: {len(html_files)}件")
    print(f"\n{'─'*60}")

    updated_count = 0
    skipped_count = 0
    error_count = 0

    for html_file in html_files:
        # 相対パスで表示
        rel_path = html_file.relative_to(directory)
        success, message = upgrade_html_file(html_file)

        if success:
            print(f"  ✅ {rel_path}")
            updated_count += 1
        elif "エラー" in message:
            print(f"  ❌ {rel_path}: {message}")
            error_count += 1
        else:
            print(f"  ⏭️ {rel_path}: {message}")
            skipped_count += 1

    print(f"{'─'*60}")
    print(f"\n📊 結果サマリー")
    print(f"{'='*60}")
    print(f"✅ 更新: {updated_count}件")
    print(f"⏭️ スキップ: {skipped_count}件")
    print(f"❌ エラー: {error_count}件")
    print(f"───────────────────")
    print(f"合計: {len(html_files)}件")

    if updated_count > 0:
        print(f"\n✅ アップグレード完了！")
        print(f"\n📝 次のステップ:")
        print(f"1. ブラウザでHTMLを開いて動作確認")
        print(f"2. プラットフォームアプリで表示テスト")
        print(f"3. スライドナビゲーションの動作確認")


if __name__ == "__main__":
    main()
