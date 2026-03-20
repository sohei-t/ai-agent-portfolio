#!/usr/bin/env python3
"""
ファイル名生成ユーティリティ

トピックタイトルから有効なファイル名を生成する。
全関連ファイル（.html, .txt, .mp3）で統一した名前を使用。

重要: ファイル名のプレフィックスはゼロパディング形式（01-01）を使用
    - 旧形式（1-1）は廃止：辞書順ソートで誤った順序になるため
    - 新形式（01-01）：01-01, 01-02, ..., 01-10 と正しくソートされる

Note:
    SSMLファイル（_ssml.txt）は不要。
    Gemini 2.5 Flash TTSは自然言語から直接音声生成するため。

使用方法:
    from filename_generator import generate_filename, format_prefix, TopicFilenames

    # プレフィックスを生成（必ずこの関数を使う）
    prefix = format_prefix(1, 1)  # -> "01-01"

    # 単一のファイル名を生成
    slug = generate_filename("Firebaseとは何か", prefix)
    # -> "01-01_firebase_toha_nanika"

    # トピックの全ファイル名を生成
    files = TopicFilenames.from_topic("01-01", "Firebaseとは何か")
    print(files.html)       # "content/01-01_firebase_toha_nanika.html"
    print(files.script)     # "content/01-01_firebase_toha_nanika.txt"
    print(files.audio)      # "content/01-01_firebase_toha_nanika.mp3"
"""

import re
import unicodedata
from dataclasses import dataclass
from typing import Optional
from pathlib import Path


# ============================================
# 設定
# ============================================

# タイトル部分の最大長（全体ではなくタイトルスラッグの長さ）
MAX_TITLE_LENGTH = 40

# 最小タイトル長（これより短い場合はprefixのみ使用）
MIN_TITLE_LENGTH = 2

# プレフィックスの桁数（ゼロパディング用）
PREFIX_DIGITS = 2


# ============================================
# プレフィックス生成
# ============================================

def format_prefix(chapter: int, topic: int) -> str:
    """
    章番号とトピック番号からゼロパディング付きプレフィックスを生成する。

    Args:
        chapter: 章番号（1から開始）
        topic: トピック番号（1から開始）

    Returns:
        ゼロパディング付きプレフィックス（例: "01-01"）

    Examples:
        >>> format_prefix(1, 1)
        '01-01'
        >>> format_prefix(1, 10)
        '01-10'
        >>> format_prefix(12, 5)
        '12-05'

    Note:
        ゼロパディングにより、ファイルの辞書順ソートが
        正しいコンテンツ順序と一致するようになる。
        旧形式（1-1）では 1-1, 1-10, 1-2 と並んでしまう問題があった。
    """
    return f"{chapter:0{PREFIX_DIGITS}d}-{topic:0{PREFIX_DIGITS}d}"


# ============================================
# ローマ字変換テーブル（ひらがな）
# ============================================

HIRAGANA_TO_ROMAJI = {
    'あ': 'a', 'い': 'i', 'う': 'u', 'え': 'e', 'お': 'o',
    'か': 'ka', 'き': 'ki', 'く': 'ku', 'け': 'ke', 'こ': 'ko',
    'さ': 'sa', 'し': 'shi', 'す': 'su', 'せ': 'se', 'そ': 'so',
    'た': 'ta', 'ち': 'chi', 'つ': 'tsu', 'て': 'te', 'と': 'to',
    'な': 'na', 'に': 'ni', 'ぬ': 'nu', 'ね': 'ne', 'の': 'no',
    'は': 'ha', 'ひ': 'hi', 'ふ': 'fu', 'へ': 'he', 'ほ': 'ho',
    'ま': 'ma', 'み': 'mi', 'む': 'mu', 'め': 'me', 'も': 'mo',
    'や': 'ya', 'ゆ': 'yu', 'よ': 'yo',
    'ら': 'ra', 'り': 'ri', 'る': 'ru', 'れ': 're', 'ろ': 'ro',
    'わ': 'wa', 'を': 'wo', 'ん': 'n',
    'が': 'ga', 'ぎ': 'gi', 'ぐ': 'gu', 'げ': 'ge', 'ご': 'go',
    'ざ': 'za', 'じ': 'ji', 'ず': 'zu', 'ぜ': 'ze', 'ぞ': 'zo',
    'だ': 'da', 'ぢ': 'di', 'づ': 'du', 'で': 'de', 'ど': 'do',
    'ば': 'ba', 'び': 'bi', 'ぶ': 'bu', 'べ': 'be', 'ぼ': 'bo',
    'ぱ': 'pa', 'ぴ': 'pi', 'ぷ': 'pu', 'ぺ': 'pe', 'ぽ': 'po',
    'きゃ': 'kya', 'きゅ': 'kyu', 'きょ': 'kyo',
    'しゃ': 'sha', 'しゅ': 'shu', 'しょ': 'sho',
    'ちゃ': 'cha', 'ちゅ': 'chu', 'ちょ': 'cho',
    'にゃ': 'nya', 'にゅ': 'nyu', 'にょ': 'nyo',
    'ひゃ': 'hya', 'ひゅ': 'hyu', 'ひょ': 'hyo',
    'みゃ': 'mya', 'みゅ': 'myu', 'みょ': 'myo',
    'りゃ': 'rya', 'りゅ': 'ryu', 'りょ': 'ryo',
    'ぎゃ': 'gya', 'ぎゅ': 'gyu', 'ぎょ': 'gyo',
    'じゃ': 'ja', 'じゅ': 'ju', 'じょ': 'jo',
    'びゃ': 'bya', 'びゅ': 'byu', 'びょ': 'byo',
    'ぴゃ': 'pya', 'ぴゅ': 'pyu', 'ぴょ': 'pyo',
    'っ': '',  # 促音は次の子音を重ねる（簡略化のため空に）
}

# カタカナ→ひらがな変換用オフセット
KATAKANA_OFFSET = ord('ァ') - ord('ぁ')


# ============================================
# メイン関数
# ============================================

def generate_filename(
    title: str,
    prefix: str,
    max_length: int = MAX_TITLE_LENGTH
) -> str:
    """
    トピックタイトルからファイル名（拡張子なし）を生成する。

    Args:
        title: トピックタイトル（例: "Firebaseとは何か"）
        prefix: ファイル名のプレフィックス（例: "01-01"、ゼロパディング必須）
        max_length: タイトル部分の最大長

    Returns:
        ファイル名（拡張子なし）

    Examples:
        >>> generate_filename("Firebaseとは何か", "01-01")
        '01-01_firebase_toha_nanika'

        >>> generate_filename("Introduction to APIs", "02-03")
        '02-03_introduction_to_apis'

        >>> generate_filename("第1章: はじめに", "01-01")
        '01-01_1_hajimeni'

    Note:
        プレフィックスは format_prefix() 関数で生成すること。
        ゼロパディングにより辞書順ソートが正しい順序になる。
    """
    # タイトルをスラッグ化
    slug = _slugify_title(title, max_length)

    # スラッグが短すぎる場合はプレフィックスのみ
    if len(slug) < MIN_TITLE_LENGTH:
        return prefix

    return f"{prefix}_{slug}"


def _slugify_title(title: str, max_length: int) -> str:
    """
    タイトルをファイル名用のスラッグに変換する。

    処理順序:
    1. Unicode正規化（NFKC）
    2. カタカナをひらがなに変換
    3. ひらがなをローマ字に変換
    4. 小文字化
    5. 特殊文字の処理（:→_、スペース→_）
    6. 非ASCII文字を削除
    7. 連続アンダースコアを統一
    8. 長さ制限
    """
    # 1. Unicode正規化
    title = unicodedata.normalize('NFKC', title)

    # 2. カタカナをひらがなに変換
    title = _katakana_to_hiragana(title)

    # 3. ひらがなをローマ字に変換（2文字組み合わせを先に処理）
    for hiragana, romaji in sorted(HIRAGANA_TO_ROMAJI.items(), key=lambda x: -len(x[0])):
        title = title.replace(hiragana, romaji)

    # 4. 小文字化
    title = title.lower()

    # 5. 特殊文字の処理
    title = title.replace('：', '_').replace(':', '_')
    title = title.replace(' ', '_').replace('　', '_')
    title = title.replace('-', '_').replace('−', '_')
    title = title.replace('/', '_').replace('・', '_')

    # 6. ASCII英数字とアンダースコアのみ保持
    title = re.sub(r'[^a-z0-9_]', '', title)

    # 7. 連続アンダースコアを統一、先頭末尾削除
    title = re.sub(r'_+', '_', title)
    title = title.strip('_')

    # 8. 長さ制限
    if len(title) > max_length:
        # 単語の途中で切らないように、最後の_で切る
        title = title[:max_length]
        if '_' in title:
            title = title.rsplit('_', 1)[0]
        title = title.rstrip('_')

    return title


def _katakana_to_hiragana(text: str) -> str:
    """カタカナをひらがなに変換"""
    result = []
    for char in text:
        code = ord(char)
        # カタカナの範囲: ァ(0x30A1) - ン(0x30F3)
        if 0x30A1 <= code <= 0x30F3:
            result.append(chr(code - KATAKANA_OFFSET))
        else:
            result.append(char)
    return ''.join(result)


# ============================================
# TopicFilenames データクラス
# ============================================

@dataclass
class TopicFilenames:
    """
    トピックに関連する全ファイル名を保持するデータクラス。

    Attributes:
        title: トピックの日本語タイトル（Video Platform表示用）
        base: ベースファイル名（拡張子なし）
        html: HTMLスライドファイル名
        script: 台本ファイル名（音声生成の入力）
        audio: 音声ファイル名
        research: リサーチファイル名

    Note:
        SSMLファイルは不要（Gemini 2.5 Flash TTSは自然言語から直接音声生成）
        titleフィールドはFILENAME_MAPPING.yamlに保存され、
        Scannerがtitleを取得→DBに保存→Video Platformで日本語表示に使用される。
    """
    title: str
    base: str
    html: str
    script: str
    audio: str
    research: str

    @classmethod
    def from_topic(
        cls,
        prefix: str,
        title: str,
        content_dir: str = "content",
        research_dir: str = "research"
    ) -> 'TopicFilenames':
        """
        トピック情報からファイル名を生成する。

        Args:
            prefix: ファイル名のプレフィックス（例: "01-01"）
            title: トピックタイトル（日本語）
            content_dir: コンテンツディレクトリ
            research_dir: リサーチディレクトリ

        Returns:
            TopicFilenames インスタンス
        """
        base = generate_filename(title, prefix)

        return cls(
            title=title,
            base=base,
            html=f"{content_dir}/{base}.html",
            script=f"{content_dir}/{base}.txt",
            audio=f"{content_dir}/{base}.mp3",
            research=f"{research_dir}/{base}_research.md"
        )

    def get_all_paths(self) -> dict:
        """全ファイルパスを辞書で取得"""
        return {
            'html': self.html,
            'script': self.script,
            'audio': self.audio,
            'research': self.research
        }


# ============================================
# カリキュラム全体のファイル名マッピング
# ============================================

def generate_filename_mapping(curriculum_structure: dict) -> dict:
    """
    カリキュラム構造からファイル名マッピングを生成する。

    Args:
        curriculum_structure: CURRICULUM_STRUCTURE.yaml の内容

    Returns:
        トピックIDをキー、TopicFilenamesを値とする辞書

    Example:
        >>> mapping = generate_filename_mapping(structure)
        >>> mapping['topic_01_01'].html
        'content/01-01_firebase_introduction.html'

    Note:
        プレフィックスはゼロパディング形式（01-01）で生成される。
        これにより辞書順ソートが正しいコンテンツ順序と一致する。
    """
    mapping = {}

    chapters = curriculum_structure.get('chapters', [])
    for chapter_idx, chapter in enumerate(chapters, 1):
        topics = chapter.get('topics', [])
        for topic_idx, topic in enumerate(topics, 1):
            # ゼロパディング付きプレフィックスを生成
            prefix = format_prefix(chapter_idx, topic_idx)
            topic_id = topic.get('id', f'topic_{chapter_idx:02d}_{topic_idx:02d}')
            topic_title = topic.get('title', '')

            mapping[topic_id] = TopicFilenames.from_topic(prefix, topic_title)

    return mapping


def save_filename_mapping(mapping: dict, output_path: str = "FILENAME_MAPPING.yaml"):
    """
    ファイル名マッピングをYAMLファイルに保存する。

    Args:
        mapping: generate_filename_mapping() の結果
        output_path: 出力ファイルパス
    """
    import yaml

    output = {
        'generated_at': __import__('datetime').datetime.now().isoformat(),
        'description': 'トピックIDからファイル名へのマッピング',
        'mapping': {}
    }

    for topic_id, files in mapping.items():
        output['mapping'][topic_id] = {
            'title': files.title,
            'base': files.base,
            'files': files.get_all_paths()
        }

    with open(output_path, 'w', encoding='utf-8') as f:
        yaml.dump(output, f, allow_unicode=True, default_flow_style=False, sort_keys=False)

    print(f"✅ ファイル名マッピングを保存: {output_path}")


# ============================================
# CLI
# ============================================

def main():
    """コマンドラインインターフェース"""
    import sys
    import argparse

    parser = argparse.ArgumentParser(
        description='トピックタイトルからファイル名を生成',
        epilog='Note: プレフィックスはゼロパディング形式（01-01）を推奨'
    )
    parser.add_argument('title', help='トピックタイトル')
    parser.add_argument('--prefix', '-p', default='01-01',
                        help='ファイル名プレフィックス（デフォルト: 01-01、ゼロパディング推奨）')
    parser.add_argument('--chapter', '-c', type=int, help='章番号（--topicと組み合わせて使用）')
    parser.add_argument('--topic', '-t', type=int, help='トピック番号（--chapterと組み合わせて使用）')
    parser.add_argument('--all', '-a', action='store_true', help='全関連ファイル名を表示')

    args = parser.parse_args()

    # プレフィックスを決定（--chapter/--topic優先）
    if args.chapter is not None and args.topic is not None:
        prefix = format_prefix(args.chapter, args.topic)
    else:
        prefix = args.prefix

    if args.all:
        files = TopicFilenames.from_topic(prefix, args.title)
        print(f"📁 生成されたファイル名:")
        print(f"   Base: {files.base}")
        print(f"   HTML: {files.html}")
        print(f"   Script: {files.script}")
        print(f"   Audio: {files.audio}")
        print(f"   Research: {files.research}")
    else:
        filename = generate_filename(args.title, prefix)
        print(filename)


if __name__ == '__main__':
    main()
