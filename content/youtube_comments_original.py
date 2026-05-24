#!/usr/bin/env python3
"""
YouTube Comments -> single CEE-ready Markdown report in the current folder.

Default behavior:
  - Reads API key from YOUTUBE_API_KEY
  - Fetches top-level comments only
  - Writes ONE Markdown file in the folder where you run the script
  - Does not require an output folder

Usage:
  export YOUTUBE_API_KEY="your_key_here"
  python youtube_comments_flat_v2.py "https://www.youtube.com/watch?v=VIDEO_ID" --output-name comments-01-intro-to-chemical-bonds --max-pages 5

Optional:
  python youtube_comments_flat_v2.py "URL" --output comments-01-intro-to-chemical-bonds.md
  python youtube_comments_flat_v2.py "URL" --lecture-id chemical-bonding-lecture-01 --output-name comments-01-intro-to-chemical-bonds
  python youtube_comments_flat_v2.py "URL" --save-json
  python youtube_comments_flat.py "URL" --include-replies
"""

from __future__ import annotations

import argparse
import html
import json
import os
import re
import sys
import time
from collections import Counter, defaultdict
from dataclasses import asdict, dataclass
from datetime import datetime, timezone
from pathlib import Path
from typing import Any
from urllib.parse import parse_qs, urlparse

import requests


COMMENT_THREADS_URL = "https://www.googleapis.com/youtube/v3/commentThreads"
COMMENTS_URL = "https://www.googleapis.com/youtube/v3/comments"


@dataclass
class CleanComment:
    type: str
    comment_id: str
    parent_id: str
    text: str
    likes: int
    published: str
    timestamps: list[str]
    categories: list[str]
    cee_priority: str
    review_status: str = "needs_cee_review"


def extract_video_id(url_or_id: str) -> str:
    value = url_or_id.strip()

    # Accept raw 11-character video IDs.
    if re.fullmatch(r"[A-Za-z0-9_-]{11}", value):
        return value

    parsed = urlparse(value)
    host = (parsed.hostname or "").lower()

    if host == "youtu.be":
        video_id = parsed.path.strip("/").split("/")[0]
        if video_id:
            return video_id

    if host in {"www.youtube.com", "youtube.com", "m.youtube.com"}:
        qs = parse_qs(parsed.query)
        if "v" in qs and qs["v"]:
            return qs["v"][0]
        # Handles /shorts/<id>, /embed/<id>, /live/<id>
        parts = [p for p in parsed.path.split("/") if p]
        if len(parts) >= 2 and parts[0] in {"shorts", "embed", "live"}:
            return parts[1]

    raise ValueError("Could not extract a YouTube video ID from the URL/input.")


def youtube_get(url: str, params: dict[str, Any], timeout: int) -> dict[str, Any]:
    try:
        response = requests.get(url, params=params, timeout=timeout)
    except requests.Timeout as exc:
        raise RuntimeError(f"YouTube API request timed out after {timeout}s") from exc
    except requests.RequestException as exc:
        raise RuntimeError(f"YouTube API request failed: {exc}") from exc

    try:
        data = response.json()
    except ValueError as exc:
        raise RuntimeError(f"YouTube API returned non-JSON response: HTTP {response.status_code}") from exc

    if response.status_code >= 400 or "error" in data:
        err = data.get("error", {})
        message = err.get("message", "Unknown YouTube API error")
        reason = ""
        errors = err.get("errors") or []
        if errors:
            reason = errors[0].get("reason", "")
        raise RuntimeError(f"YouTube API error: {message}" + (f" ({reason})" if reason else ""))

    return data


def clean_text(text: str) -> str:
    text = html.unescape(text or "")
    text = re.sub(r"<[^>]+>", " ", text)
    text = re.sub(r"\S+@\S+", "[email removed]", text)
    text = re.sub(r"\b(?:\+?91[-\s]?)?[6-9]\d{9}\b", "[phone removed]", text)
    text = re.sub(r"https?://\S+", "[url removed]", text)
    text = re.sub(r"\s+", " ", text).strip()
    return text


def classify(text: str, timestamps: list[str]) -> tuple[list[str], str]:
    t = text.lower()
    cats: set[str] = set()
    priority = "low"

    correction_words = [
        "wrong", "mistake", "error", "correction", "correct", "incorrect",
        "actually", "should be", "not ", "isn't", "is not", "unit", "formula",
        "exception", "graph", "label", "galat", "गलत", "sahi", "सही", "nahi", "नहीं",
        "sir yaha", "sir ye", "sir ne", "ma'am", "mam",
    ]
    doubt_words = [
        "doubt", "confused", "confusion", "why", "how", "explain", "samajh",
        "samajh nahi", "समझ", "kaise", "kyu", "क्यों", "कैसे", "please explain",
    ]
    missing_words = [
        "missing", "not covered", "please cover", "upload", "next lecture",
        "notes", "pdf", "playlist", "kaha hai", "where is",
    ]
    spam_words = [
        "first comment", "like karo", "subscribe", "telegram", "whatsapp",
        "neet attendance", "jee attendance", "op sir", "legend", "love you sir",
    ]

    if timestamps:
        cats.add("timestamp_specific_issue")
        priority = "medium"

    if any(w in t for w in correction_words):
        # A correction word plus a timestamp is especially valuable.
        cats.add("possible_lecture_error")
        cats.add("suggested_correction")
        priority = "high" if timestamps else "medium"

    if any(w in t for w in doubt_words) and len(text) > 20:
        cats.add("student_doubt")
        if priority == "low":
            priority = "medium"

    if any(w in t for w in missing_words):
        cats.add("missing_topic_request")
        if priority == "low":
            priority = "medium"

    if any(w in t for w in spam_words) or len(text) < 8:
        cats.add("off_topic_or_noise")
        if priority == "low":
            priority = "low"

    if not cats:
        cats.add("off_topic_or_noise")

    return sorted(cats), priority


def fetch_replies(api_key: str, parent_id: str, max_reply_pages: int, timeout: int, sleep: float) -> list[dict[str, Any]]:
    rows: list[dict[str, Any]] = []
    page_token = None

    for page in range(1, max_reply_pages + 1):
        params = {
            "key": api_key,
            "part": "snippet",
            "parentId": parent_id,
            "maxResults": 100,
            "textFormat": "plainText",
        }
        if page_token:
            params["pageToken"] = page_token

        data = youtube_get(COMMENTS_URL, params, timeout)
        items = data.get("items", [])
        print(f"    replies page {page}: {len(items)} replies", flush=True)

        for item in items:
            s = item["snippet"]
            rows.append({
                "type": "reply",
                "comment_id": item["id"],
                "parent_id": s.get("parentId", parent_id),
                "text": s.get("textDisplay", ""),
                "likes": s.get("likeCount", 0),
                "published": s.get("publishedAt", ""),
            })

        page_token = data.get("nextPageToken")
        if not page_token:
            break
        time.sleep(sleep)

    return rows


def fetch_comments(
    api_key: str,
    video_id: str,
    max_pages: int,
    include_replies: bool,
    max_reply_pages: int,
    order: str,
    timeout: int,
    sleep: float,
) -> list[dict[str, Any]]:
    rows: list[dict[str, Any]] = []
    page_token = None

    for page in range(1, max_pages + 1):
        params = {
            "key": api_key,
            "part": "snippet",
            "videoId": video_id,
            "maxResults": 100,
            "order": order,
            "textFormat": "plainText",
        }
        if page_token:
            params["pageToken"] = page_token

        data = youtube_get(COMMENT_THREADS_URL, params, timeout)
        items = data.get("items", [])
        print(f"top-level page {page}: {len(items)} comments", flush=True)

        for item in items:
            top = item["snippet"]["topLevelComment"]
            s = top["snippet"]
            comment_id = top["id"]
            rows.append({
                "type": "comment",
                "comment_id": comment_id,
                "parent_id": "",
                "text": s.get("textDisplay", ""),
                "likes": s.get("likeCount", 0),
                "published": s.get("publishedAt", ""),
            })

            if include_replies and item["snippet"].get("totalReplyCount", 0) > 0:
                rows.extend(fetch_replies(api_key, comment_id, max_reply_pages, timeout, sleep))

        print(f"  total fetched so far: {len(rows)}", flush=True)

        page_token = data.get("nextPageToken")
        if not page_token:
            break
        time.sleep(sleep)

    return rows


def build_clean_comments(rows: list[dict[str, Any]]) -> list[CleanComment]:
    cleaned: list[CleanComment] = []
    seen_texts: set[str] = set()

    for row in rows:
        text = clean_text(row.get("text", ""))
        if not text:
            continue

        dedupe_key = re.sub(r"\W+", "", text.lower())[:200]
        if dedupe_key in seen_texts:
            continue
        seen_texts.add(dedupe_key)

        timestamps = re.findall(r"\b\d{1,2}:\d{2}(?::\d{2})?\b", text)
        cats, priority = classify(text, timestamps)

        cleaned.append(CleanComment(
            type=row.get("type", "comment"),
            comment_id=row.get("comment_id", ""),
            parent_id=row.get("parent_id", ""),
            text=text,
            likes=int(row.get("likes", 0) or 0),
            published=row.get("published", ""),
            timestamps=timestamps,
            categories=cats,
            cee_priority=priority,
        ))

    return cleaned


def render_items(items: list[CleanComment], limit: int = 60) -> str:
    if not items:
        return "_No items found._\n"

    rank = {"high": 0, "medium": 1, "low": 2}
    items = sorted(items, key=lambda c: (rank.get(c.cee_priority, 9), -c.likes, c.published))

    out: list[str] = []
    for c in items[:limit]:
        ts = f" | timestamps: {', '.join(c.timestamps)}" if c.timestamps else ""
        out.append(
            f"- priority: {c.cee_priority} | likes: {c.likes}{ts}\n"
            f"  - text: {c.text}\n"
            f"  - CEE review: verify / reject / needs_source_check\n"
        )

    if len(items) > limit:
        out.append(f"\n_Additional {len(items) - limit} items omitted from this section._\n")
    return "\n".join(out)


def build_markdown_report(
    video_id: str,
    source: str,
    lecture_id: str | None,
    fetched_at: str,
    cleaned: list[CleanComment],
    include_replies: bool,
    max_pages: int,
) -> str:
    by_category: dict[str, list[CleanComment]] = defaultdict(list)
    for c in cleaned:
        for cat in c.categories:
            by_category[cat].append(c)

    counts = Counter(cat for c in cleaned for cat in c.categories)

    return f"""# YouTube Comments CEE Brief

lecture_id: {lecture_id}
video_id: {video_id}
source: {source}
fetched_at: {fetched_at}
max_pages: {max_pages}
include_replies: {str(include_replies).lower()}
status: cleaned_needs_cee_review
cee_use: student_correction_signal_only
truth_status: unverified
cee_review_required: true
public_display: false
public_rag_eligible: false
pagefind_index: false

## CEE instruction

Use these comments only as student correction/doubt signals.

Do not treat comments as Chemistry truth.
Do not copy comment wording into public notes.
For each possible correction, independently verify the Chemistry and mark:
accepted / rejected / needs_source_check.

## Category counts

{chr(10).join(f"- {k}: {v}" for k, v in sorted(counts.items()))}

## 1. Possible lecture errors

{render_items(by_category.get("possible_lecture_error", []))}

## 2. Suggested corrections

{render_items(by_category.get("suggested_correction", []))}

## 3. Timestamp-specific issues

{render_items(by_category.get("timestamp_specific_issue", []))}

## 4. Student doubts

{render_items(by_category.get("student_doubt", []))}

## 5. Missing topic requests

{render_items(by_category.get("missing_topic_request", []))}

## 6. Off-topic / noise sample

{render_items(by_category.get("off_topic_or_noise", []), limit=25)}

## Internal note

This report is for CEE review only. It is not public ChemDesk content and must not be indexed or used for public RAG.
"""


def safe_filename_stem(value: str) -> str:
    stem = re.sub(r"[^A-Za-z0-9_.-]+", "-", value.strip()).strip("-")
    return stem or "youtube-comments"


def ensure_md_suffix(path: Path) -> Path:
    if path.suffix:
        return path
    return path.with_suffix(".md")


def default_output_name(video_id: str, lecture_id: str | None, output_name: str | None) -> str:
    """
    Naming priority:
      1. --output gives an exact path and bypasses this function.
      2. --output-name gives a friendly filename stem. Example:
         comments-01-intro-to-chemical-bonds -> comments-01-intro-to-chemical-bonds.md
      3. --lecture-id gives comments-<lecture-id>.md.
      4. fallback uses the video id.
    """
    if output_name:
        return ensure_md_suffix(Path(safe_filename_stem(output_name))).name

    if lecture_id:
        return f"comments-{safe_filename_stem(lecture_id)}.md"

    return f"comments-{video_id}.md"


def parse_args(argv: list[str]) -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Fetch YouTube comments and create one CEE-ready Markdown file in the current folder.")
    parser.add_argument("url_or_video_id", help="YouTube lecture URL or video ID")
    parser.add_argument("--lecture-id", default=None, help="Optional stable ChemDesk lecture ID. Useful in the report header, but not required.")
    parser.add_argument("--output", default=None, help="Exact output Markdown file path. Example: comments-01-intro-to-chemical-bonds.md")
    parser.add_argument("--output-name", default=None, help="Friendly output filename stem. Example: comments-01-intro-to-chemical-bonds")
    parser.add_argument("--max-pages", type=int, default=5, help="Max top-level pages to fetch. 100 comments/page.")
    parser.add_argument("--include-replies", action="store_true", help="Fetch replies too. Off by default.")
    parser.add_argument("--max-reply-pages", type=int, default=1, help="Max reply pages per parent when --include-replies is used.")
    parser.add_argument("--order", choices=["time", "relevance"], default="time", help="YouTube comment order")
    parser.add_argument("--timeout", type=int, default=30, help="HTTP timeout in seconds")
    parser.add_argument("--sleep", type=float, default=0.1, help="Sleep between API calls")
    parser.add_argument("--save-json", action="store_true", help="Also save cleaned JSON next to the Markdown file")
    return parser.parse_args(argv)


def main(argv: list[str]) -> int:
    args = parse_args(argv)

    api_key = os.environ.get("YOUTUBE_API_KEY")
    if not api_key:
        print("ERROR: Missing YOUTUBE_API_KEY environment variable.", file=sys.stderr)
        print('Set it first: export YOUTUBE_API_KEY="your_key_here"', file=sys.stderr)
        return 2

    try:
        video_id = extract_video_id(args.url_or_video_id)
        output = ensure_md_suffix(Path(args.output)) if args.output else Path.cwd() / default_output_name(video_id, args.lecture_id, args.output_name)

        print(f"Video ID: {video_id}", flush=True)
        print(f"Lecture ID: {args.lecture_id or 'not provided'}", flush=True)
        print(f"Output file: {output}", flush=True)
        print(f"Replies: {'included' if args.include_replies else 'not included'}", flush=True)

        rows = fetch_comments(
            api_key=api_key,
            video_id=video_id,
            max_pages=args.max_pages,
            include_replies=args.include_replies,
            max_reply_pages=args.max_reply_pages,
            order=args.order,
            timeout=args.timeout,
            sleep=args.sleep,
        )

        cleaned = build_clean_comments(rows)
        fetched_at = datetime.now(timezone.utc).isoformat()
        report = build_markdown_report(
            video_id=video_id,
            source=args.url_or_video_id,
            lecture_id=args.lecture_id,
            fetched_at=fetched_at,
            cleaned=cleaned,
            include_replies=args.include_replies,
            max_pages=args.max_pages,
        )

        output.parent.mkdir(parents=True, exist_ok=True)
        output.write_text(report, encoding="utf-8")

        if args.save_json:
            json_path = output.with_suffix(".cleaned.json")
            json_payload = {
                "lecture_id": args.lecture_id,
                "video_id": video_id,
                "source": args.url_or_video_id,
                "fetched_at": fetched_at,
                "status": "cleaned_needs_cee_review",
                "cee_use": "student_correction_signal_only",
                "truth_status": "unverified",
                "cee_review_required": True,
                "public_display": False,
                "public_rag_eligible": False,
                "pagefind_index": False,
                "comments": [asdict(c) for c in cleaned],
            }
            json_path.write_text(json.dumps(json_payload, ensure_ascii=False, indent=2), encoding="utf-8")
            print(f"Saved JSON: {json_path}", flush=True)

        print(f"\nDone. Fetched {len(rows)} raw comments/replies; cleaned {len(cleaned)} unique items.", flush=True)
        print(f"Saved Markdown: {output}", flush=True)
        return 0

    except KeyboardInterrupt:
        print("\nStopped by user.", file=sys.stderr)
        return 130
    except Exception as exc:
        print(f"\nERROR: {exc}", file=sys.stderr)
        return 1


if __name__ == "__main__":
    raise SystemExit(main(sys.argv[1:]))
