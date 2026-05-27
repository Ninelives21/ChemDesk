#!/usr/bin/env python3
"""
YouTube Comments RAW Fetcher for ChemDesk / CSA

Fetches YouTube comments and saves ONE raw JSON file.
No ranking. No "gold". No final judgement.

Output:
  <output-name>.raw.json

Later CSA output should be:
  <output-name>.final.md or <output-name>.final.json
"""

from __future__ import annotations

import argparse
import html
import json
import os
import re
import sys
import time
from datetime import datetime, timezone
from pathlib import Path
from typing import Any
from urllib.parse import parse_qs, urlparse

import requests


COMMENT_THREADS_URL = "https://www.googleapis.com/youtube/v3/commentThreads"
COMMENTS_URL = "https://www.googleapis.com/youtube/v3/comments"


def extract_video_id(url_or_id: str) -> str:
    value = url_or_id.strip()

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
        errors = err.get("errors") or []
        reason = errors[0].get("reason", "") if errors else ""
        raise RuntimeError(f"YouTube API error: {message}" + (f" ({reason})" if reason else ""))

    return data


def clean_preview_text(text: str) -> str:
    """Light cleanup only. Raw text is preserved separately."""
    text = html.unescape(text or "")
    text = re.sub(r"<[^>]+>", " ", text)
    text = re.sub(r"\S+@\S+", "[email removed]", text)
    text = re.sub(r"\b(?:\+?91[-\s]?)?[6-9]\d{9}\b", "[phone removed]", text)
    text = re.sub(r"https?://\S+", "[url removed]", text)
    text = re.sub(r"\s+", " ", text).strip()
    return text


def extract_timestamps(text: str) -> list[str]:
    seen: list[str] = []
    for ts in re.findall(r"\b\d{1,2}:\d{2}(?::\d{2})?\b", text or ""):
        if ts not in seen:
            seen.append(ts)
    return seen


def safe_filename_stem(value: str) -> str:
    stem = re.sub(r"[^A-Za-z0-9_.-]+", "-", value.strip()).strip("-")
    return stem or "youtube-comments"


def output_path(output_name: str, dest_folder: str | None) -> Path:
    folder = Path(dest_folder).expanduser() if dest_folder else Path.cwd()
    return folder / f"{safe_filename_stem(output_name)}.raw.json"


def fetch_replies(api_key: str, parent_id: str, max_reply_pages: int, timeout: int, sleep: float) -> list[dict[str, Any]]:
    rows: list[dict[str, Any]] = []
    page_token = None

    for page in range(1, max_reply_pages + 1):
        params: dict[str, Any] = {
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

        for index, item in enumerate(items, 1):
            s = item.get("snippet", {})
            raw_text = s.get("textDisplay", "")
            rows.append({
                "type": "reply",
                "comment_id": item.get("id", ""),
                "parent_id": s.get("parentId", parent_id),
                "raw_text": raw_text,
                "clean_preview_text": clean_preview_text(raw_text),
                "likes": s.get("likeCount", 0),
                "published": s.get("publishedAt", ""),
                "updated": s.get("updatedAt", ""),
                "author": s.get("authorDisplayName", ""),
                "timestamps": extract_timestamps(raw_text),
                "reply_order_within_parent": index,
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
    fetch_order = 0

    for page in range(1, max_pages + 1):
        params: dict[str, Any] = {
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
            top = item.get("snippet", {}).get("topLevelComment", {})
            s = top.get("snippet", {})
            raw_text = s.get("textDisplay", "")
            comment_id = top.get("id", "")
            fetch_order += 1

            rows.append({
                "type": "comment",
                "comment_id": comment_id,
                "parent_id": "",
                "raw_text": raw_text,
                "clean_preview_text": clean_preview_text(raw_text),
                "likes": s.get("likeCount", 0),
                "published": s.get("publishedAt", ""),
                "updated": s.get("updatedAt", ""),
                "author": s.get("authorDisplayName", ""),
                "timestamps": extract_timestamps(raw_text),
                "youtube_order": order,
                "page_number": page,
                "fetch_order": fetch_order,
                "reply_count_reported": item.get("snippet", {}).get("totalReplyCount", 0),
            })

            if include_replies and item.get("snippet", {}).get("totalReplyCount", 0) > 0:
                replies = fetch_replies(api_key, comment_id, max_reply_pages, timeout, sleep)
                for reply in replies:
                    fetch_order += 1
                    reply["fetch_order"] = fetch_order
                    reply["youtube_order"] = order
                    reply["page_number"] = page
                    rows.append(reply)

        print(f"  total fetched so far: {len(rows)}", flush=True)

        page_token = data.get("nextPageToken")
        if not page_token:
            break
        time.sleep(sleep)

    return rows


def parse_args(argv: list[str]) -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Fetch YouTube comments and save one raw JSON file for CSA.")
    parser.add_argument("url_or_video_id", help="YouTube lecture URL or video ID")
    parser.add_argument("--lecture-id", default=None, help="Stable ChemDesk lecture ID")
    parser.add_argument("--lecture-title", default=None, help="Human lecture title")
    parser.add_argument("--output-name", required=True, help="Filename stem, e.g. comments-02-ionic-bonds")
    parser.add_argument("--dest-folder", default=None, help="Folder where <output-name>.raw.json will be saved")
    parser.add_argument("--max-pages", type=int, default=5, help="Max top-level pages to fetch; 100 comments/page")
    parser.add_argument("--include-replies", action="store_true", help="Fetch replies too")
    parser.add_argument("--max-reply-pages", type=int, default=1, help="Max reply pages per parent when replies are included")
    parser.add_argument("--order", choices=["time", "relevance"], default="relevance", help="YouTube comment order")
    parser.add_argument("--timeout", type=int, default=30, help="HTTP timeout in seconds")
    parser.add_argument("--sleep", type=float, default=0.1, help="Sleep between API calls")
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
        out = output_path(args.output_name, args.dest_folder)
        out.parent.mkdir(parents=True, exist_ok=True)

        print(f"Video ID: {video_id}", flush=True)
        print(f"Lecture ID: {args.lecture_id or 'not provided'}", flush=True)
        print(f"Lecture title: {args.lecture_title or 'not provided'}", flush=True)
        print(f"YouTube order: {args.order}", flush=True)
        print(f"Replies: {'included' if args.include_replies else 'not included'}", flush=True)
        print(f"Output file: {out}", flush=True)

        comments = fetch_comments(
            api_key=api_key,
            video_id=video_id,
            max_pages=args.max_pages,
            include_replies=args.include_replies,
            max_reply_pages=args.max_reply_pages,
            order=args.order,
            timeout=args.timeout,
            sleep=args.sleep,
        )

        payload = {
            "schema": "chemdesk.youtube_comments.raw.v1",
            "status": "raw_for_csa",
            "lecture_id": args.lecture_id,
            "lecture_title": args.lecture_title,
            "video_id": video_id,
            "source": args.url_or_video_id,
            "fetched_at": datetime.now(timezone.utc).isoformat(),
            "youtube_order": args.order,
            "max_pages": args.max_pages,
            "include_replies": args.include_replies,
            "max_reply_pages": args.max_reply_pages if args.include_replies else 0,
            "comment_count": len(comments),
            "notes": [
                "This is raw CSA input.",
                "No ranking, Chemistry judgement, or usefulness filtering has been applied.",
                "CSA should scrub, cluster, prioritize, and create the .final report.",
                "CEE must verify Chemistry truth later."
            ],
            "comments": comments,
        }

        out.write_text(json.dumps(payload, ensure_ascii=False, indent=2), encoding="utf-8")

        top_level = sum(1 for c in comments if c.get("type") == "comment")
        replies = sum(1 for c in comments if c.get("type") == "reply")

        print(f"\nDone. Saved raw comments: {out}", flush=True)
        print(f"Top-level comments: {top_level}", flush=True)
        print(f"Replies: {replies}", flush=True)
        print(f"Total rows: {len(comments)}", flush=True)
        return 0

    except KeyboardInterrupt:
        print("\nStopped by user.", file=sys.stderr)
        return 130
    except Exception as exc:
        print(f"\nERROR: {exc}", file=sys.stderr)
        return 1


if __name__ == "__main__":
    raise SystemExit(main(sys.argv[1:]))
