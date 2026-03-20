#!/usr/bin/env python3
"""
RAG 精度テストランナー

rag_index.json + rag_test_questions.json → 回答生成 → 精度レポート

使い方:
  python3 src/rag_accuracy_test.py <講座ディレクトリ>

例:
  python3 src/rag_accuracy_test.py /Users/sohei/Desktop/Learning-Curricula/API入門講座

入力:
  - <講座DIR>/rag_index.json（rag_index_builder.py で生成）
  - <講座DIR>/rag_test_questions.json（rag_chunker.py で生成、オプション）

出力:
  - <講座DIR>/rag_accuracy_report.json（精度レポート）
  - ターミナルに結果サマリー表示
"""

import os
import sys
import json
import math
import time
from pathlib import Path
from datetime import datetime

from dotenv import load_dotenv
load_dotenv(os.path.expanduser("~/.config/ai-agents/profiles/default.env"))

EMBEDDING_MODEL = "models/gemini-embedding-001"
GENERATION_MODEL = "gemini-2.5-flash"
N_RESULTS = 3  # 検索上位件数


def load_api_keys() -> list:
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


# ========== ベクトル検索 ==========

def cosine_similarity(a: list, b: list) -> float:
    dot = sum(x * y for x, y in zip(a, b))
    norm_a = math.sqrt(sum(x * x for x in a))
    norm_b = math.sqrt(sum(x * x for x in b))
    if norm_a == 0 or norm_b == 0:
        return 0.0
    return dot / (norm_a * norm_b)


def search_similar(query_embedding: list, chunks: list, top_k: int = N_RESULTS) -> list:
    """コサイン類似度でチャンク検索"""
    scored = []
    for chunk in chunks:
        sim = cosine_similarity(query_embedding, chunk["embedding"])
        scored.append({
            "id": chunk["id"],
            "text": chunk["text"],
            "metadata": chunk["metadata"],
            "similarity": sim,
        })
    scored.sort(key=lambda x: x["similarity"], reverse=True)
    return scored[:top_k]


# ========== API呼び出し ==========

_key_index = 0
_api_keys = []


def _switch_key():
    global _key_index
    import google.generativeai as genai
    key = _api_keys[_key_index % len(_api_keys)]
    _key_index += 1
    genai.configure(api_key=key)


def call_with_retry(fn, max_retries=None):
    if max_retries is None:
        max_retries = len(_api_keys) * 3
    for attempt in range(max_retries):
        try:
            return fn()
        except Exception as e:
            err = str(e)
            if ("429" in err or "404" in err) and attempt < max_retries - 1:
                _switch_key()
                wait = min(3 * (attempt + 1), 30)
                print(f"      (API制限、キー切替 {wait}秒待機...)")
                time.sleep(wait)
            else:
                raise


def embed_query(text: str) -> list:
    """クエリ文をEmbedding化"""
    import google.generativeai as genai

    def _embed():
        result = genai.embed_content(
            model=EMBEDDING_MODEL,
            content=text,
            task_type="RETRIEVAL_QUERY",
        )
        return result["embedding"]

    return call_with_retry(_embed)


def generate_answer(query: str, hits: list, course_title: str) -> str:
    """検索結果をコンテキストとしてGeminiで回答生成"""
    import google.generativeai as genai

    context_parts = []
    for i, hit in enumerate(hits, 1):
        meta = hit["metadata"]
        chapter = meta.get("chapter", "")
        title = meta.get("title", "")
        context_parts.append(
            f"--- コンテキスト{i} ({chapter} / {title}) ---\n"
            f"{hit['text']}"
        )
    context = "\n\n".join(context_parts)

    system_prompt = f"""\
あなたは「{course_title}」の質疑応答アシスタントです。
以下のルールに従って回答してください。

## ルール
1. 提供されたコンテキスト（講座内容）に基づいてのみ回答する
2. 回答の根拠となるトピック名を【】で引用する
3. コンテキストに該当する情報がない場合は「この講座の範囲外の質問です」と正直に伝える
4. 回答は簡潔かつわかりやすく書く
5. コンテキストの内容を忠実に反映し、独自の解釈や外部情報を加えない"""

    prompt = f"""{system_prompt}

## 講座コンテキスト
{context}

## 質問
{query}

## 回答"""

    def _generate():
        model = genai.GenerativeModel(GENERATION_MODEL)
        response = model.generate_content(prompt)
        return response.text

    return call_with_retry(_generate)


# ========== 評価ロジック ==========

def evaluate_answer(question: dict, answer: str, hits: list) -> dict:
    """回答を評価してスコアを付ける"""
    result = {
        "question": question["question"],
        "category": question.get("category", "unknown"),
        "answer": answer,
        "search_results": [
            {
                "chapter": h["metadata"].get("chapter", ""),
                "title": h["metadata"].get("title", ""),
                "similarity": round(h["similarity"], 4),
            }
            for h in hits
        ],
        "checks": {},
    }

    category = question.get("category", "")
    expected_chapter = question.get("expected_chapter", "")

    # チェック1: 範囲外質問を正しく拒否しているか
    if category == "out_of_scope":
        is_rejected = "範囲外" in answer or "扱っていない" in answer or "お答えできません" in answer
        result["checks"]["correctly_rejected"] = is_rejected
        result["score"] = 1.0 if is_rejected else 0.0
        return result

    # チェック2: 回答が空でない
    has_content = len(answer.strip()) > 20
    result["checks"]["has_content"] = has_content

    # チェック3: 出典引用【】がある
    has_citation = "【" in answer and "】" in answer
    result["checks"]["has_citation"] = has_citation

    # チェック4: 検索結果に期待する章が含まれる
    if expected_chapter:
        chapter_found = any(
            expected_chapter in h["metadata"].get("chapter", "")
            for h in hits
        )
        result["checks"]["expected_chapter_found"] = chapter_found
    else:
        chapter_found = True
        result["checks"]["expected_chapter_found"] = None

    # チェック5: 類似度スコア（上位1件が0.7以上なら良好）
    top_similarity = hits[0]["similarity"] if hits else 0
    good_similarity = top_similarity >= 0.7
    result["checks"]["good_similarity"] = good_similarity
    result["top_similarity"] = round(top_similarity, 4)

    # 総合スコア
    checks = [has_content, has_citation, good_similarity]
    if expected_chapter:
        checks.append(chapter_found)
    result["score"] = sum(1 for c in checks if c) / len(checks)

    return result


# ========== デフォルト質問 ==========

def generate_default_questions(chunks: list) -> list:
    """rag_test_questions.json がない場合のデフォルト質問を生成"""
    questions = []

    # チャンクのメタデータからトピックを抽出
    topics = {}
    for chunk in chunks:
        meta = chunk["metadata"]
        key = (meta.get("chapter", ""), meta.get("title", ""))
        if key not in topics and key[1]:
            topics[key] = meta

    # 各トピックから1問ずつ
    for (chapter, title), meta in list(topics.items())[:10]:
        questions.append({
            "question": f"{title}について教えてください",
            "category": "basic",
            "expected_chapter": chapter,
        })

    # 範囲外質問
    questions.append({
        "question": "Pythonのクラスの書き方は？",
        "category": "out_of_scope",
    })

    return questions


# ========== メイン ==========

def run_accuracy_test(course_dir: str):
    global _api_keys

    course_path = Path(course_dir).resolve()
    index_path = course_path / "rag_index.json"
    questions_path = course_path / "rag_test_questions.json"

    if not index_path.exists():
        print(f"❌ {index_path} が見つかりません")
        print("   先に rag_index_builder.py を実行してください:")
        print(f"   python3 src/rag_index_builder.py {course_dir}")
        sys.exit(1)

    _api_keys = load_api_keys()
    if not _api_keys:
        print("❌ Gemini APIキーが設定されていません")
        sys.exit(1)

    _switch_key()

    print("=" * 60)
    print("RAG 精度テスト")
    print("=" * 60)

    # 1. インデックス読み込み
    print(f"\n[1/4] インデックス読み込み: {index_path.name}")
    with open(index_path, "r", encoding="utf-8") as f:
        index_data = json.load(f)

    chunks = index_data["chunks"]
    course_title = index_data.get("course_title", course_path.name)
    print(f"  講座: {course_title}")
    print(f"  チャンク数: {len(chunks)}")
    print(f"  Embedding次元: {len(chunks[0]['embedding'])}")

    # 2. テスト質問読み込み
    print(f"\n[2/4] テスト質問読み込み")
    if questions_path.exists():
        with open(questions_path, "r", encoding="utf-8") as f:
            questions_data = json.load(f)
        questions = questions_data.get("questions", [])
        print(f"  ソース: {questions_path.name} ({len(questions)}問)")
    else:
        print(f"  ⚠️  {questions_path.name} が見つかりません。デフォルト質問を生成します")
        questions = generate_default_questions(chunks)
        print(f"  デフォルト質問: {len(questions)}問")

    # 3. テスト実行
    print(f"\n[3/4] テスト実行中... ({len(questions)}問)")
    results = []
    start_time = time.time()

    for idx, q in enumerate(questions, 1):
        question_text = q["question"]
        category = q.get("category", "basic")
        print(f"\n  [{idx}/{len(questions)}] ({category}) {question_text}")

        try:
            # Embedding → 検索
            query_emb = embed_query(question_text)
            hits = search_similar(query_emb, chunks)

            print(f"    検索: top1類似度={hits[0]['similarity']:.4f}" if hits else "    検索: 結果なし")

            # 回答生成
            answer = generate_answer(question_text, hits, course_title)
            answer_preview = answer[:80].replace("\n", " ")
            print(f"    回答: {answer_preview}...")

            # 評価
            eval_result = evaluate_answer(q, answer, hits)
            results.append(eval_result)

            score_str = f"{eval_result['score']:.0%}"
            print(f"    スコア: {score_str} {eval_result['checks']}")

            # レート制限回避
            time.sleep(1.0)

        except Exception as e:
            print(f"    ❌ エラー: {e}")
            results.append({
                "question": question_text,
                "category": category,
                "answer": None,
                "error": str(e),
                "score": 0.0,
            })

    elapsed = time.time() - start_time

    # 4. レポート生成
    print(f"\n[4/4] レポート生成...")

    total = len(results)
    scores = [r["score"] for r in results]
    avg_score = sum(scores) / total if total > 0 else 0

    # カテゴリ別集計
    categories = {}
    for r in results:
        cat = r.get("category", "unknown")
        if cat not in categories:
            categories[cat] = {"count": 0, "total_score": 0, "pass": 0}
        categories[cat]["count"] += 1
        categories[cat]["total_score"] += r["score"]
        if r["score"] >= 0.75:
            categories[cat]["pass"] += 1

    report = {
        "course_title": course_title,
        "test_date": datetime.now().isoformat(),
        "elapsed_seconds": round(elapsed, 1),
        "summary": {
            "total_questions": total,
            "average_score": round(avg_score, 3),
            "pass_rate": round(sum(1 for s in scores if s >= 0.75) / total, 3) if total > 0 else 0,
            "perfect_rate": round(sum(1 for s in scores if s >= 1.0) / total, 3) if total > 0 else 0,
        },
        "category_breakdown": {
            cat: {
                "count": v["count"],
                "average_score": round(v["total_score"] / v["count"], 3),
                "pass_rate": round(v["pass"] / v["count"], 3),
            }
            for cat, v in categories.items()
        },
        "index_info": {
            "chunk_count": len(chunks),
            "embedding_model": index_data.get("embedding_model", ""),
            "generation_model": GENERATION_MODEL,
        },
        "results": results,
    }

    report_path = course_path / "rag_accuracy_report.json"
    with open(report_path, "w", encoding="utf-8") as f:
        json.dump(report, f, ensure_ascii=False, indent=2)

    # サマリー表示
    print("\n" + "=" * 60)
    print(f"📊 精度テスト結果: {course_title}")
    print("=" * 60)
    print(f"  質問数:       {total}")
    print(f"  平均スコア:   {avg_score:.1%}")
    print(f"  合格率(≥75%): {report['summary']['pass_rate']:.1%}")
    print(f"  満点率(100%): {report['summary']['perfect_rate']:.1%}")
    print(f"  実行時間:     {elapsed:.0f}秒")

    print(f"\n  カテゴリ別:")
    for cat, v in report["category_breakdown"].items():
        print(f"    {cat}: {v['count']}問, 平均{v['average_score']:.1%}, 合格率{v['pass_rate']:.1%}")

    # 低スコアの質問をハイライト
    low_scores = [r for r in results if r["score"] < 0.75]
    if low_scores:
        print(f"\n  ⚠️  低スコア質問 ({len(low_scores)}件):")
        for r in low_scores:
            print(f"    - [{r['score']:.0%}] {r['question']}")

    print(f"\n  レポート: {report_path}")
    print("=" * 60)

    return report


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("使い方: python3 src/rag_accuracy_test.py <講座ディレクトリ>")
        print("例:     python3 src/rag_accuracy_test.py /path/to/API入門講座")
        sys.exit(1)

    run_accuracy_test(sys.argv[1])
