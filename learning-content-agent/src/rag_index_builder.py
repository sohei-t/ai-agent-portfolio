#!/usr/bin/env python3
"""
スタンドアロン RAG インデックス構築スクリプト

rag_chunks.json → Gemini Embedding API → rag_index.json

使い方:
  python3 src/rag_index_builder.py <講座ディレクトリ>

例:
  python3 src/rag_index_builder.py /Users/sohei/Desktop/Learning-Curricula/API入門講座

入力: <講座DIR>/rag_chunks.json（rag_chunker.py で生成）
出力: <講座DIR>/rag_index.json（Embedding付きインデックス）
"""

import os
import sys
import json
import time
from pathlib import Path
from datetime import datetime

# APIキー読み込み
from dotenv import load_dotenv
load_dotenv(os.path.expanduser("~/.config/ai-agents/profiles/default.env"))

EMBEDDING_MODEL = "models/gemini-embedding-001"
BATCH_SIZE = 5
RATE_LIMIT_WAIT = 1.5


def load_api_keys() -> list:
    """Gemini APIキーをローテーション用に読み込む"""
    keys = []
    for i in range(1, 10):
        key = os.getenv(f"GEMINI_API_KEY_{i}")
        if key:
            keys.append(key)
    if not keys:
        default = os.getenv("GEMINI_API_KEY")
        if default:
            keys.append(default)
    return keys


def generate_embeddings(chunks: list, api_keys: list) -> list:
    """Gemini Embedding API でバッチEmbedding生成（キーローテーション + リトライ）"""
    import google.generativeai as genai

    embeddings = []
    key_index = 0
    total = len(chunks)

    for i in range(0, total, BATCH_SIZE):
        batch = chunks[i:i + BATCH_SIZE]
        texts = [c["text"] for c in batch]

        max_attempts = len(api_keys) * 2
        for attempt in range(max_attempts):
            try:
                key = api_keys[key_index % len(api_keys)]
                key_index += 1
                genai.configure(api_key=key)

                result = genai.embed_content(
                    model=EMBEDDING_MODEL,
                    content=texts,
                    task_type="RETRIEVAL_DOCUMENT",
                )
                embeddings.extend(result["embedding"])
                break
            except Exception as e:
                if "429" in str(e) and attempt < max_attempts - 1:
                    wait = 2 * (attempt + 1)
                    print(f"    レート制限、キー切替して{wait}秒待機...")
                    time.sleep(wait)
                elif attempt < max_attempts - 1:
                    print(f"    エラー (attempt {attempt+1}): {e}")
                    time.sleep(1)
                else:
                    raise RuntimeError(f"Embedding生成失敗: {e}")

        processed = min(i + BATCH_SIZE, total)
        print(f"  Embedding生成: {processed}/{total}")

        if i + BATCH_SIZE < total:
            time.sleep(RATE_LIMIT_WAIT)

    return embeddings


def build_index(course_dir: str):
    """メイン処理: rag_chunks.json → rag_index.json"""
    course_path = Path(course_dir).resolve()
    chunks_path = course_path / "rag_chunks.json"

    if not chunks_path.exists():
        print(f"❌ {chunks_path} が見つかりません")
        print("   先に rag_chunker.py を実行してください:")
        print(f"   python3 src/rag_chunker.py {course_dir}")
        sys.exit(1)

    # APIキー確認
    api_keys = load_api_keys()
    if not api_keys:
        print("❌ Gemini APIキーが設定されていません")
        print("   ~/.config/ai-agents/profiles/default.env に GEMINI_API_KEY_1 等を設定してください")
        sys.exit(1)

    print("=" * 60)
    print("RAG インデックス構築（スタンドアロン）")
    print("=" * 60)

    # 1. チャンクデータ読み込み
    print(f"\n[1/3] チャンクデータ読み込み: {chunks_path.name}")
    with open(chunks_path, "r", encoding="utf-8") as f:
        chunks_data = json.load(f)

    chunks = chunks_data.get("chunks", [])
    course_title = chunks_data.get("course_title", course_path.name)
    print(f"  講座: {course_title}")
    print(f"  チャンク数: {len(chunks)}")

    if not chunks:
        print("❌ チャンクが空です")
        sys.exit(1)

    # チャンクサイズ統計
    sizes = [len(c["text"]) for c in chunks]
    print(f"  文字数: 最小={min(sizes)}, 最大={max(sizes)}, 平均={sum(sizes)//len(sizes)}")

    # 2. Embedding生成
    print(f"\n[2/3] Embedding生成中... (APIキー {len(api_keys)}個)")
    start_time = time.time()
    embeddings = generate_embeddings(chunks, api_keys)
    elapsed = time.time() - start_time
    print(f"  完了: {len(embeddings)}件 ({elapsed:.1f}秒)")

    # 3. rag_index.json 出力
    print(f"\n[3/3] インデックスファイル出力...")
    index_data = {
        "course_title": course_title,
        "generated_at": datetime.now().isoformat(),
        "embedding_model": EMBEDDING_MODEL,
        "generation_model": "gemini-2.5-flash",
        "chunk_count": len(chunks),
        "embedding_dimension": len(embeddings[0]) if embeddings else 0,
        "chunks": []
    }

    for chunk, embedding in zip(chunks, embeddings):
        index_data["chunks"].append({
            "id": chunk["id"],
            "text": chunk["text"],
            "embedding": embedding,
            "metadata": chunk["metadata"]
        })

    index_path = course_path / "rag_index.json"
    with open(index_path, "w", encoding="utf-8") as f:
        json.dump(index_data, f, ensure_ascii=False)

    file_size_mb = index_path.stat().st_size / (1024 * 1024)
    print(f"  出力: {index_path}")
    print(f"  ファイルサイズ: {file_size_mb:.1f} MB")

    print("\n" + "=" * 60)
    print(f"✅ インデックス構築完了")
    print(f"   {len(chunks)}チャンク × {len(embeddings[0])}次元 Embedding")
    print(f"   次のステップ: python3 src/rag_accuracy_test.py {course_dir}")
    print("=" * 60)


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("使い方: python3 src/rag_index_builder.py <講座ディレクトリ>")
        print("例:     python3 src/rag_index_builder.py /path/to/API入門講座")
        sys.exit(1)

    build_index(sys.argv[1])
