#!/usr/bin/env python3
"""
Content Scout - 技術情報巡回スクリプト

定期的にRSS/API/Webページを巡回し、研修コンテンツの候補となる
技術トレンドを収集して raw_signals.jsonl に蓄積する。

使い方:
    python3 scout.py                  # 全ソースを巡回
    python3 scout.py --source hacker_news  # 特定ソースのみ
    python3 scout.py --dry-run        # 保存せずに確認
    python3 scout.py --days 3         # 過去3日以内の記事のみ
"""

import json
import logging
import os
import re
import sys
import time
import urllib.request
import urllib.error
import xml.etree.ElementTree as ET
from datetime import datetime, timedelta, timezone
from email.utils import parsedate_to_datetime
from hashlib import sha256
from pathlib import Path
from typing import Optional

# ─── 定数 ───
SCOUT_DIR = Path(__file__).parent          # project/src/
PROJECT_DIR = SCOUT_DIR.parent             # project/
CONFIG_DIR = PROJECT_DIR / "config"        # project/config/

DATA_DIR = Path.home() / ".scout" / "data"
STATE_DIR = Path.home() / ".scout" / "state"
LOG_DIR = Path.home() / ".scout" / "logs"

SIGNALS_FILE = DATA_DIR / "raw_signals.jsonl"
STATE_FILE = STATE_DIR / "last_fetch.json"
SOURCES_FILE = CONFIG_DIR / "scout_sources.yaml"

JST = timezone(timedelta(hours=9))

# ─── ログ設定 ───
LOG_DIR.mkdir(parents=True, exist_ok=True)
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s",
    handlers=[
        logging.StreamHandler(),
        logging.FileHandler(LOG_DIR / "scout.log", encoding="utf-8"),
    ],
)
log = logging.getLogger("scout")


# ─── YAML パーサー ───
def load_yaml(path: Path) -> dict:
    """YAMLファイルを読み込む。PyYAML利用。"""
    import yaml

    with open(path, "r", encoding="utf-8") as f:
        return yaml.safe_load(f) or {}


# ─── HTTP ユーティリティ ───
def fetch_url(url: str, timeout: int = 30) -> Optional[str]:
    """URLからテキストを取得"""
    try:
        req = urllib.request.Request(
            url,
            headers={
                "User-Agent": "ContentScout/1.0 (AI Training Content Generator)",
                "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
            },
        )
        with urllib.request.urlopen(req, timeout=timeout) as resp:
            charset = resp.headers.get_content_charset() or "utf-8"
            return resp.read().decode(charset, errors="replace")
    except (urllib.error.URLError, urllib.error.HTTPError, OSError, UnicodeDecodeError) as e:
        log.warning("Fetch failed: %s → %s", url, e)
        return None


def fetch_json(url: str, timeout: int = 30) -> Optional[dict | list]:
    """URLからJSONを取得"""
    body = fetch_url(url, timeout)
    if body is None:
        return None
    try:
        return json.loads(body)
    except json.JSONDecodeError as e:
        log.warning("JSON decode failed: %s → %s", url, e)
        return None


# ─── シグナル構造 ───
def make_signal(
    source: str,
    title: str,
    url: str,
    published: str,
    category: str,
    priority: int,
    keywords_matched: list[str],
    score: float = 0.0,
    summary: str = "",
) -> dict:
    """正規化されたシグナルを生成"""
    signal_id = sha256(f"{source}:{url}".encode()).hexdigest()[:16]
    return {
        "id": signal_id,
        "source": source,
        "title": title,
        "url": url,
        "published": published,
        "fetched_at": datetime.now(JST).isoformat(),
        "category": category,
        "priority": priority,
        "keywords_matched": keywords_matched,
        "score": score,
        "summary": summary,
    }


# ─── フェッチャー: RSS ───
def fetch_rss(source_id: str, config: dict, max_age_days: int) -> list[dict]:
    """RSSフィードを取得してシグナルに変換"""
    url = config.get("url", "")
    if not url:
        return []

    body = fetch_url(url)
    if body is None:
        return []

    signals = []
    cutoff = datetime.now(timezone.utc) - timedelta(days=max_age_days)
    keywords = [k.lower() for k in config.get("keywords", [])]
    priority = config.get("priority", 5)
    category = config.get("category", "unknown")

    try:
        root = ET.fromstring(body)
    except ET.ParseError as e:
        log.warning("RSS parse failed for %s: %s", source_id, e)
        return []

    # RSS 2.0
    items = root.findall(".//item")
    # Atom
    if not items:
        ns = {"atom": "http://www.w3.org/2005/Atom"}
        items = root.findall(".//atom:entry", ns)

    for item in items:
        title_el = item.find("title")
        if title_el is None:
            # Atom
            title_el = item.find("{http://www.w3.org/2005/Atom}title")
        title = (title_el.text or "").strip() if title_el is not None else ""

        link_el = item.find("link")
        if link_el is not None:
            link = link_el.text or link_el.get("href", "")
        else:
            link_el = item.find("{http://www.w3.org/2005/Atom}link")
            link = link_el.get("href", "") if link_el is not None else ""
        link = link.strip()

        # 日付パース
        pub_el = item.find("pubDate")
        if pub_el is None:
            pub_el = item.find("{http://www.w3.org/2005/Atom}updated")
        if pub_el is not None and pub_el.text:
            try:
                pub_dt = parsedate_to_datetime(pub_el.text.strip())
            except (ValueError, TypeError):
                try:
                    pub_dt = datetime.fromisoformat(pub_el.text.strip().replace("Z", "+00:00"))
                except ValueError:
                    pub_dt = datetime.now(timezone.utc)
        else:
            pub_dt = datetime.now(timezone.utc)

        if pub_dt.tzinfo is None:
            pub_dt = pub_dt.replace(tzinfo=timezone.utc)

        # 古い記事をスキップ
        if pub_dt < cutoff:
            continue

        # キーワードマッチ
        title_lower = title.lower()
        desc_el = item.find("description")
        if desc_el is None:
            desc_el = item.find("{http://www.w3.org/2005/Atom}summary")
        desc = (desc_el.text or "").lower() if desc_el is not None else ""
        text = f"{title_lower} {desc}"

        matched = [kw for kw in keywords if kw in text]
        if not matched:
            continue

        score = priority * (1 + 0.3 * len(matched))

        signals.append(
            make_signal(
                source=source_id,
                title=title,
                url=link,
                published=pub_dt.isoformat(),
                category=category,
                priority=priority,
                keywords_matched=matched,
                score=round(score, 2),
            )
        )

    log.info("[%s] RSS: %d articles matched (of %d items)", source_id, len(signals), len(items))
    return signals


# ─── フェッチャー: Hacker News API ───
def fetch_hacker_news(source_id: str, config: dict, max_age_days: int) -> list[dict]:
    """Hacker News APIからトップストーリーを取得"""
    base = config.get("url", "https://hacker-news.firebaseio.com/v0/")
    min_score = config.get("min_score", 100)
    max_items = config.get("max_items", 30)
    keywords = [k.lower() for k in config.get("keywords", [])]
    priority = config.get("priority", 6)
    category = config.get("category", "community")

    # トップストーリーID一覧
    top_ids = fetch_json(f"{base}topstories.json")
    if not top_ids:
        return []

    signals = []
    cutoff_ts = (datetime.now(timezone.utc) - timedelta(days=max_age_days)).timestamp()

    for item_id in top_ids[:max_items]:
        item = fetch_json(f"{base}item/{item_id}.json")
        if not item or item.get("type") != "story":
            continue

        score = item.get("score", 0)
        if score < min_score:
            continue

        created = item.get("time", 0)
        if created < cutoff_ts:
            continue

        title = item.get("title", "")
        url = item.get("url", f"https://news.ycombinator.com/item?id={item_id}")

        title_lower = title.lower()
        matched = [kw for kw in keywords if kw in title_lower]
        if not matched:
            continue

        pub_dt = datetime.fromtimestamp(created, tz=timezone.utc)
        signal_score = priority * (1 + 0.3 * len(matched)) + (score / 100)

        signals.append(
            make_signal(
                source=source_id,
                title=f"{title} ({score}pt)",
                url=url,
                published=pub_dt.isoformat(),
                category=category,
                priority=priority,
                keywords_matched=matched,
                score=round(signal_score, 2),
                summary=f"HN Score: {score}, Comments: {item.get('descendants', 0)}",
            )
        )

        time.sleep(0.1)  # API負荷軽減

    log.info("[%s] HN: %d articles matched", source_id, len(signals))
    return signals


# ─── フェッチャー: JSON API (Zenn等) ───
def fetch_json_api(source_id: str, config: dict, max_age_days: int) -> list[dict]:
    """JSON APIからトレンド記事を取得"""
    url = config.get("url", "")
    if not url:
        return []

    data = fetch_json(url)
    if data is None:
        return []

    response_path = config.get("response_path", "")
    articles = data
    if response_path and isinstance(data, dict):
        articles = data.get(response_path, [])

    if not isinstance(articles, list):
        return []

    keywords = [k.lower() for k in config.get("keywords", [])]
    priority = config.get("priority", 5)
    category = config.get("category", "community")
    title_field = config.get("title_field", "title")
    url_template = config.get("url_template", "{url}")

    signals = []
    for article in articles:
        if not isinstance(article, dict):
            continue

        title = article.get(title_field, "")
        # URL構築
        if "path" in article:
            link = url_template.replace("{path}", article["path"])
        elif "url" in article:
            link = article["url"]
        elif "slug" in article:
            link = url_template.replace("{path}", f"/articles/{article['slug']}")
        else:
            continue

        title_lower = title.lower()
        matched = [kw for kw in keywords if kw in title_lower]
        if not matched:
            continue

        pub = article.get("published_at", article.get("created_at", ""))
        likes = article.get("liked_count", 0)
        score = priority * (1 + 0.3 * len(matched)) + (likes / 20 if likes else 0)

        signals.append(
            make_signal(
                source=source_id,
                title=title,
                url=link,
                published=pub or datetime.now(JST).isoformat(),
                category=category,
                priority=priority,
                keywords_matched=matched,
                score=round(score, 2),
                summary=f"Likes: {likes}" if likes else "",
            )
        )

    log.info("[%s] API: %d articles matched (of %d)", source_id, len(signals), len(articles))
    return signals


# ─── フェッチャー: HTMLスクレイプ (Anthropic等) ───
def fetch_html_scrape(source_id: str, config: dict, max_age_days: int) -> list[dict]:
    """HTMLページから記事リンクを抽出"""
    url = config.get("url", "")
    if not url:
        return []

    body = fetch_url(url)
    if body is None:
        return []

    base_url = config.get("base_url", "")
    keywords = [k.lower() for k in config.get("keywords", [])]
    priority = config.get("priority", 10)
    category = config.get("category", "ai_official")

    signals = []
    seen_urls = set()

    # href属性を含むaタグを正規表現で抽出
    # selectors.article のパターンに基づく
    article_selector = config.get("selectors", {}).get("article", "a[href*='/news/']")
    href_pattern = article_selector.replace("a[href*='", "").replace("']", "")

    # 全aタグからhrefとテキストを抽出
    link_pattern = re.compile(
        r'<a\s[^>]*href="([^"]*' + re.escape(href_pattern) + r'[^"]*)"[^>]*>(.*?)</a>',
        re.DOTALL | re.IGNORECASE,
    )

    for match in link_pattern.finditer(body):
        href = match.group(1).strip()
        text = re.sub(r"<[^>]+>", "", match.group(2)).strip()

        if not text or len(text) < 5:
            continue

        # 絶対URL化
        if href.startswith("/"):
            href = base_url + href
        elif not href.startswith("http"):
            continue

        if href in seen_urls:
            continue
        seen_urls.add(href)

        text_lower = text.lower()
        matched = [kw for kw in keywords if kw in text_lower]
        # AI公式ソースは keywords マッチなしでも収集（全記事が関連性高い）
        if not matched and priority < 9:
            continue

        score = priority * (1 + 0.3 * max(len(matched), 1))

        signals.append(
            make_signal(
                source=source_id,
                title=text,
                url=href,
                published=datetime.now(JST).isoformat(),
                category=category,
                priority=priority,
                keywords_matched=matched if matched else ["(official source)"],
                score=round(score, 2),
            )
        )

    log.info("[%s] Scrape: %d articles found", source_id, len(signals))
    return signals


# ─── 重複排除 ───
def load_existing_ids() -> set[str]:
    """既存のシグナルIDをロード"""
    ids = set()
    if SIGNALS_FILE.exists():
        with open(SIGNALS_FILE, "r", encoding="utf-8") as f:
            for line in f:
                line = line.strip()
                if not line:
                    continue
                try:
                    sig = json.loads(line)
                    ids.add(sig.get("id", ""))
                except json.JSONDecodeError:
                    continue
    return ids


# ─── メイン処理 ───
def run_scout(
    source_filter: Optional[str] = None,
    dry_run: bool = False,
    max_age_days: int = 3,
) -> list[dict]:
    """全ソースを巡回してシグナルを収集"""

    log.info("=" * 60)
    log.info("Content Scout 開始: %s", datetime.now(JST).strftime("%Y-%m-%d %H:%M:%S JST"))
    log.info("=" * 60)

    # ソース定義を読み込み
    if not SOURCES_FILE.exists():
        log.error("scout_sources.yaml が見つかりません: %s", SOURCES_FILE)
        return []

    sources_config = load_yaml(SOURCES_FILE)
    sources = sources_config.get("sources", {})
    if not sources:
        log.error("ソースが定義されていません")
        return []

    # 既存IDをロード（重複排除用）
    existing_ids = load_existing_ids()
    log.info("既存シグナル数: %d", len(existing_ids))

    all_signals = []

    for source_id, config in sources.items():
        if not isinstance(config, dict):
            continue
        if source_filter and source_id != source_filter:
            continue

        source_type = config.get("type", "")
        name = config.get("name", source_id)
        log.info("巡回中: %s (%s)", name, source_type)

        try:
            if source_type == "rss":
                signals = fetch_rss(source_id, config, max_age_days)
            elif source_type == "hacker_news_api":
                signals = fetch_hacker_news(source_id, config, max_age_days)
            elif source_type == "json_api":
                signals = fetch_json_api(source_id, config, max_age_days)
            elif source_type == "html_scrape":
                signals = fetch_html_scrape(source_id, config, max_age_days)
            else:
                log.warning("未対応のソースタイプ: %s (%s)", source_type, source_id)
                continue
        except Exception as e:
            log.error("巡回エラー [%s]: %s", source_id, e, exc_info=True)
            continue

        # 重複排除
        new_signals = [s for s in signals if s["id"] not in existing_ids]
        for s in new_signals:
            existing_ids.add(s["id"])

        all_signals.extend(new_signals)
        log.info("  → 新規: %d件 (重複除外: %d件)", len(new_signals), len(signals) - len(new_signals))

        time.sleep(1)  # ソース間のインターバル

    # スコア順にソート
    all_signals.sort(key=lambda s: s["score"], reverse=True)

    # 保存
    if not dry_run and all_signals:
        DATA_DIR.mkdir(parents=True, exist_ok=True)
        with open(SIGNALS_FILE, "a", encoding="utf-8") as f:
            for sig in all_signals:
                f.write(json.dumps(sig, ensure_ascii=False) + "\n")
        log.info("保存完了: %d件 → %s", len(all_signals), SIGNALS_FILE)

        # 状態更新
        STATE_DIR.mkdir(parents=True, exist_ok=True)
        state = {
            "last_fetch": datetime.now(JST).isoformat(),
            "signals_count": len(all_signals),
            "sources_checked": len([s for s in sources if isinstance(sources[s], dict)]),
        }
        STATE_FILE.write_text(json.dumps(state, ensure_ascii=False, indent=2), encoding="utf-8")
    elif dry_run:
        log.info("[DRY RUN] %d件のシグナルを検出（保存なし）", len(all_signals))

    # サマリー出力
    log.info("")
    log.info("=" * 60)
    log.info("巡回完了サマリー")
    log.info("=" * 60)
    log.info("新規シグナル: %d件", len(all_signals))

    if all_signals:
        log.info("")
        log.info("上位シグナル:")
        for i, s in enumerate(all_signals[:10], 1):
            log.info(
                "  %d. [%.1f] %s (%s)",
                i,
                s["score"],
                s["title"][:60],
                s["source"],
            )

    by_category = {}
    for s in all_signals:
        cat = s.get("category", "unknown")
        by_category[cat] = by_category.get(cat, 0) + 1
    if by_category:
        log.info("")
        log.info("カテゴリ別:")
        for cat, count in sorted(by_category.items(), key=lambda x: -x[1]):
            log.info("  %s: %d件", cat, count)

    log.info("=" * 60)
    return all_signals


# ─── エントリポイント ───
if __name__ == "__main__":
    import argparse

    parser = argparse.ArgumentParser(description="Content Scout - 技術情報巡回")
    parser.add_argument("--source", help="特定ソースのみ巡回")
    parser.add_argument("--dry-run", action="store_true", help="保存せずに確認")
    parser.add_argument("--days", type=int, default=3, help="過去N日以内の記事のみ (default: 3)")
    parser.add_argument("--show-signals", action="store_true", help="蓄積済みシグナルを表示")
    parser.add_argument("--stats", action="store_true", help="統計情報を表示")

    args = parser.parse_args()

    if args.show_signals:
        if SIGNALS_FILE.exists():
            with open(SIGNALS_FILE, "r", encoding="utf-8") as f:
                for line in f:
                    line = line.strip()
                    if line:
                        sig = json.loads(line)
                        print(f"[{sig['score']:5.1f}] {sig['source']:25s} {sig['title'][:70]}")
                        print(f"        {sig['url']}")
                        print()
        else:
            print("シグナルファイルがありません")
        sys.exit(0)

    if args.stats:
        if SIGNALS_FILE.exists():
            total = 0
            by_source = {}
            by_date = {}
            with open(SIGNALS_FILE, "r", encoding="utf-8") as f:
                for line in f:
                    line = line.strip()
                    if not line:
                        continue
                    sig = json.loads(line)
                    total += 1
                    src = sig.get("source", "unknown")
                    by_source[src] = by_source.get(src, 0) + 1
                    date = sig.get("fetched_at", "")[:10]
                    by_date[date] = by_date.get(date, 0) + 1

            print(f"総シグナル数: {total}")
            print("\nソース別:")
            for src, count in sorted(by_source.items(), key=lambda x: -x[1]):
                print(f"  {src}: {count}")
            print("\n日付別:")
            for date, count in sorted(by_date.items()):
                print(f"  {date}: {count}")
        else:
            print("シグナルファイルがありません")
        sys.exit(0)

    signals = run_scout(
        source_filter=args.source,
        dry_run=args.dry_run,
        max_age_days=args.days,
    )

    sys.exit(0 if signals is not None else 1)
