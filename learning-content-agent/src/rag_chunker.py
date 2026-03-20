#!/usr/bin/env python3
"""RAG チャンキングモジュール - 講座非依存の汎用チャンカー"""

import json
import re
import yaml
from pathlib import Path
from datetime import datetime
from typing import Optional


# チャンクパラメータ（プロトタイプ実績値）
SLIDE_DELIMITER = "次のスライドに進んでください。"
CHUNK_MIN_CHARS = 500
CHUNK_MAX_CHARS = 800
SECTION_MIN_CHARS = 50


def build_topic_metadata(course_dir: Path) -> dict:
    """CURRICULUM_STRUCTURE.yaml + FILENAME_MAPPING.yaml を動的パースしてメタデータ構築

    フォールバック: ファイル名から NN-MM パターンで章・トピックを推定

    Returns:
        {stem: {"chapter": "第N章 ...", "title": "..."}, ...}
    """
    metadata = {}

    # 1. Try FILENAME_MAPPING.yaml
    mapping_path = course_dir / "FILENAME_MAPPING.yaml"
    if mapping_path.exists():
        with open(mapping_path, "r", encoding="utf-8") as f:
            mapping = yaml.safe_load(f)
        if mapping and "mapping" in mapping:
            for topic_key, info in mapping["mapping"].items():
                base = info.get("base", "")
                title = info.get("title", "")
                # Extract chapter from topic_key pattern (topic_NN_MM)
                m = re.match(r'topic_(\d+)_(\d+)', topic_key)
                chapter_num = m.group(1) if m else ""
                metadata[base] = {
                    "chapter": f"第{int(chapter_num)}章" if chapter_num else "",
                    "title": title
                }
            return metadata

    # 2. Try CURRICULUM_STRUCTURE.yaml
    curriculum_path = course_dir / "CURRICULUM_STRUCTURE.yaml"
    if curriculum_path.exists():
        with open(curriculum_path, "r", encoding="utf-8") as f:
            curriculum = yaml.safe_load(f)
        if curriculum and "chapters" in curriculum:
            for chapter in curriculum["chapters"]:
                chapter_title = chapter.get("title", "")
                for topic in chapter.get("topics", []):
                    topic_id = topic.get("id", "")
                    base_name = topic.get("base_name", "")
                    title = topic.get("title", "")
                    if base_name:
                        metadata[base_name] = {
                            "chapter": chapter_title,
                            "title": title
                        }
            return metadata

    # 3. Try WBS.json
    wbs_path = course_dir / "WBS.json"
    if wbs_path.exists():
        with open(wbs_path, "r", encoding="utf-8") as f:
            wbs = json.load(f)
        phases = wbs.get("phases", {})
        for phase_key, phase in phases.items():
            if "chapters" not in phase:
                continue
            chapters = phase.get("chapters", {})
            if isinstance(chapters, dict):
                chapters = chapters.values()
            for chapter in chapters:
                chapter_title = chapter.get("title", "")
                for topic in chapter.get("topics", []):
                    base_name = topic.get("base_name", "")
                    title = topic.get("title", "")
                    if base_name:
                        metadata[base_name] = {
                            "chapter": chapter_title,
                            "title": title
                        }
        return metadata

    # 4. Fallback: filename pattern (NN-MM_xxx → "第N章", title from filename)
    content_dir = course_dir / "content"
    if content_dir.exists():
        for txt_file in sorted(content_dir.glob("*.txt")):
            stem = txt_file.stem
            m = re.match(r'^(\d+)-(\d+)_(.+)', stem)
            if m:
                chapter_num = int(m.group(1))
                slug = m.group(3).replace("_", " ")
                metadata[stem] = {
                    "chapter": f"第{chapter_num}章",
                    "title": slug
                }

    return metadata


def split_into_sections(text: str) -> list:
    """スライドデリミタで分割し、短すぎるセクションを除外"""
    raw_sections = text.split(SLIDE_DELIMITER)
    return [s.strip() for s in raw_sections if len(s.strip()) >= SECTION_MIN_CHARS]


def merge_sections_into_chunks(sections: list, prefix: str) -> list:
    """隣接セクションを結合して適切サイズのチャンクを生成（オーバーラップあり）"""
    chunks = []
    i = 0
    while i < len(sections):
        chunk_sections = [sections[i]]
        chunk_len = len(sections[i])

        j = i + 1
        while j < len(sections) and chunk_len < CHUNK_MIN_CHARS:
            chunk_sections.append(sections[j])
            chunk_len += len(sections[j])
            j += 1

        while j < len(sections) and chunk_len + len(sections[j]) <= CHUNK_MAX_CHARS:
            chunk_sections.append(sections[j])
            chunk_len += len(sections[j])
            j += 1

        chunk_text = prefix + "\n\n" + "\n\n".join(chunk_sections)
        chunks.append(chunk_text)

        if j > i + 1:
            i = j - 1
        else:
            i = j

    return chunks


def chunk_course(course_dir: Path) -> dict:
    """講座ディレクトリをチャンキングしてJSON構造を返す

    Args:
        course_dir: 講座ルートディレクトリ (content/ を含む)

    Returns:
        {"course_title": "...", "generated_at": "...", "chunk_count": N,
         "chunk_params": {...}, "chunks": [...]}
    """
    content_dir = course_dir / "content"
    if not content_dir.exists():
        raise FileNotFoundError(f"content/ ディレクトリが見つかりません: {content_dir}")

    # 講座タイトル取得
    course_title = _get_course_title(course_dir)

    # メタデータ構築
    metadata = build_topic_metadata(course_dir)

    # TXTファイルを処理
    txt_files = sorted(content_dir.glob("*.txt"))

    # サブフォルダも再帰的にスキャン
    for subfolder in sorted(content_dir.iterdir()):
        if subfolder.is_dir() and not subfolder.name.startswith('.'):
            txt_files.extend(sorted(subfolder.glob("*.txt")))

    all_chunks = []

    for filepath in txt_files:
        stem = filepath.stem
        meta = metadata.get(stem, {})
        chapter = meta.get("chapter", "")
        title = meta.get("title", stem)

        # プレフィックス構築
        if chapter and title:
            prefix = f"【{chapter} / {title}】"
        elif chapter:
            prefix = f"【{chapter}】"
        elif title:
            prefix = f"【{title}】"
        else:
            prefix = f"【{stem}】"

        with open(filepath, "r", encoding="utf-8") as f:
            text = f.read()

        sections = split_into_sections(text)
        if not sections:
            continue

        chunks = merge_sections_into_chunks(sections, prefix)

        # サブフォルダの相対パスを計算
        try:
            rel_path = filepath.relative_to(content_dir)
        except ValueError:
            rel_path = filepath.name

        for idx, chunk_text in enumerate(chunks):
            all_chunks.append({
                "id": f"{stem}_chunk_{idx:03d}",
                "text": chunk_text,
                "metadata": {
                    "source_file": str(rel_path),
                    "chapter": chapter,
                    "title": title,
                    "chunk_index": idx,
                },
            })

        print(f"  {filepath.name}: {len(sections)}セクション → {len(chunks)}チャンク")

    result = {
        "course_title": course_title,
        "generated_at": datetime.now().isoformat(),
        "chunk_count": len(all_chunks),
        "chunk_params": {
            "min": CHUNK_MIN_CHARS,
            "max": CHUNK_MAX_CHARS,
            "delimiter": SLIDE_DELIMITER,
        },
        "chunks": all_chunks,
    }

    return result


def generate_test_questions(chunks: list) -> list:
    """チャンクテキストからテスト質問を自動生成（API不要、ヒューリスティック）

    パターン:
    - 「〜とは」→ 定義質問
    - 「〜の仕組み」→ 説明質問
    - 「〜の方法」→ 手順質問
    - 章のタイトルから基本質問
    """
    questions = []
    seen_questions = set()

    # チャンクからヘッダー情報を収集
    chapters = set()
    for chunk in chunks:
        meta = chunk.get("metadata", {})
        if meta.get("chapter"):
            chapters.add(meta["chapter"])

    # パターンベースの質問生成
    patterns = [
        (r'【[^/]*/ ([^】]+)】', 'basic', lambda m: f"{m.group(1)}とは何ですか？"),
        (r'(.{2,15})とは[、。]', 'definition', lambda m: f"{m.group(1)}とは何ですか？"),
        (r'(.{2,15})の仕組み', 'mechanism', lambda m: f"{m.group(1)}の仕組みを説明してください"),
        (r'(.{2,15})の方法', 'howto', lambda m: f"{m.group(1)}の方法を教えてください"),
        (r'(.{2,15})のメリット', 'merit', lambda m: f"{m.group(1)}のメリットは何ですか？"),
    ]

    for chunk in chunks:
        text = chunk["text"]
        meta = chunk.get("metadata", {})

        for pattern, category, question_fn in patterns:
            for match in re.finditer(pattern, text):
                q = question_fn(match)
                if q not in seen_questions and len(q) < 60:
                    seen_questions.add(q)
                    questions.append({
                        "question": q,
                        "category": category,
                        "expected_chapter": meta.get("chapter", ""),
                    })

    # スコープ外テスト質問を追加
    out_of_scope = [
        {"question": "Pythonのクラスの書き方は？", "category": "out_of_scope"},
        {"question": "今日の天気を教えてください", "category": "out_of_scope"},
    ]
    questions.extend(out_of_scope)

    return questions


def _get_course_title(course_dir: Path) -> str:
    """講座タイトルを各種ソースから取得"""
    # CONTENT_INFO.yaml
    info_path = course_dir / "CONTENT_INFO.yaml"
    if info_path.exists():
        with open(info_path, "r", encoding="utf-8") as f:
            info = yaml.safe_load(f)
        if info and "curriculum" in info:
            return info["curriculum"].get("title", course_dir.name)

    # フォルダ名をフォールバック
    return course_dir.name


def main():
    """CLI用エントリーポイント"""
    import sys

    if len(sys.argv) > 1:
        course_dir = Path(sys.argv[1]).resolve()
    else:
        course_dir = Path(".").resolve()

    print("=" * 60)
    print("RAG チャンキング - コンテンツ分割")
    print("=" * 60)
    print(f"対象: {course_dir}")

    # チャンク生成
    print("\n[1/2] チャンク生成中...")
    result = chunk_course(course_dir)

    # 出力
    output_path = course_dir / "rag_chunks.json"
    with open(output_path, "w", encoding="utf-8") as f:
        json.dump(result, f, ensure_ascii=False, indent=2)
    print(f"\n✅ {output_path} に出力 ({result['chunk_count']}チャンク)")

    # テスト質問生成
    print("\n[2/2] テスト質問生成中...")
    questions = generate_test_questions(result["chunks"])

    test_output = {
        "course_title": result["course_title"],
        "questions": questions,
    }
    test_path = course_dir / "rag_test_questions.json"
    with open(test_path, "w", encoding="utf-8") as f:
        json.dump(test_output, f, ensure_ascii=False, indent=2)
    print(f"✅ {test_path} に出力 ({len(questions)}質問)")

    # 統計
    sizes = [len(c["text"]) for c in result["chunks"]]
    if sizes:
        print(f"\nチャンク統計:")
        print(f"  合計: {len(sizes)}チャンク")
        print(f"  文字数: 最小={min(sizes)}, 最大={max(sizes)}, 平均={sum(sizes)//len(sizes)}")

    print("\n" + "=" * 60)
    print("チャンキング完了")
    print("=" * 60)


if __name__ == "__main__":
    main()
