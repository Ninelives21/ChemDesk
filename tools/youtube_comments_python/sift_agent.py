#!/usr/bin/env python3
"""
ChemDesk Sift Agent v1

Single-lecture workflow:
  1. Read one row from sift_agent_manifest_revised_paths.csv.
  2. Reuse an existing raw JSON file, or fetch YouTube comments as raw JSON.
  3. Load Sift knowledge files from docs/agents/sift/.
  4. Either:
     - export a ChatGPT Plus-ready manual bridge input file, or
     - call the OpenAI API to scrub comments into useful student signals.
  5. Save scrubbed JSON at the manifest-approved path when API mode is used.
  6. Update a status CSV.

Safety:
  - Single lecture only unless this script is extended later.
  - Does not publish public notes.
  - Does not decide Chemistry truth.
  - Does not overwrite existing raw/scrubbed/bridge files unless --overwrite is supplied.
  - In --export-chatgpt-input mode, no OpenAI API call is made.
"""

from __future__ import annotations

import argparse
import csv
import datetime as dt
import html
import json
import os
import re
import sys
import time
from pathlib import Path
from typing import Any, Dict, List, Optional, Tuple
from urllib.parse import urlparse, parse_qs

import requests

try:
    from openai import OpenAI
except Exception:  # pragma: no cover
    OpenAI = None


YOUTUBE_API_URL = "https://www.googleapis.com/youtube/v3"
DEFAULT_MANIFEST = "tools/youtube_comments_python/sift_agent_manifest_revised_paths.csv"
DEFAULT_STATUS_FILE = "tools/youtube_comments_python/sift_agent_status.csv"
DEFAULT_SIFT_KNOWLEDGE_DIR = "docs/agents/sift"


class SiftAgentError(RuntimeError):
    pass


def now_iso() -> str:
    return dt.datetime.now(dt.timezone.utc).isoformat()


def eprint(*args: Any) -> None:
    print(*args, file=sys.stderr)


def require_env(name: str) -> str:
    value = os.environ.get(name, "").strip()
    if not value:
        raise SiftAgentError(f"Missing environment variable: {name}")
    return value


def safe_read_text(path: Path) -> str:
    if not path.exists():
        raise SiftAgentError(f"Required file not found: {path}")
    return path.read_text(encoding="utf-8")


def write_json(path: Path, data: Any, overwrite: bool = False) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    if path.exists() and not overwrite:
        raise SiftAgentError(f"Refusing to overwrite existing file without --overwrite: {path}")
    path.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


def write_text_file(path: Path, text: str, overwrite: bool = False) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    if path.exists() and not overwrite:
        raise SiftAgentError(f"Refusing to overwrite existing file without --overwrite: {path}")
    path.write_text(text, encoding="utf-8")


def read_json(path: Path) -> Any:
    return json.loads(path.read_text(encoding="utf-8"))


def video_id_from_url(url: str) -> str:
    url = html.unescape(url or "").strip()
    parsed = urlparse(url)
    host = (parsed.hostname or "").lower()
    if host == "youtu.be":
        parts = [p for p in parsed.path.split("/") if p]
        return parts[0] if parts else ""
    if host in {"youtube.com", "www.youtube.com", "m.youtube.com"}:
        qs = parse_qs(parsed.query)
        if "v" in qs and qs["v"]:
            return qs["v"][0]
        parts = [p for p in parsed.path.split("/") if p]
        if len(parts) >= 2 and parts[0] in {"embed", "shorts", "live"}:
            return parts[1]
    return ""


def load_manifest_row(manifest_path: Path, lecture_id: Optional[str], row_index: Optional[int]) -> Dict[str, str]:
    if not manifest_path.exists():
        raise SiftAgentError(f"Manifest not found: {manifest_path}")

    rows = list(csv.DictReader(manifest_path.open(encoding="utf-8")))
    if not rows:
        raise SiftAgentError(f"Manifest is empty: {manifest_path}")

    if lecture_id:
        matches = [r for r in rows if r.get("Lecture ID") == lecture_id]
        if not matches:
            raise SiftAgentError(f"Lecture ID not found in manifest: {lecture_id}")
        if len(matches) > 1:
            raise SiftAgentError(f"Duplicate Lecture ID in manifest: {lecture_id}")
        return matches[0]

    if row_index is not None:
        # User-facing row index is 1-based excluding header.
        if row_index < 1 or row_index > len(rows):
            raise SiftAgentError(f"--row-index must be between 1 and {len(rows)}")
        return rows[row_index - 1]

    raise SiftAgentError("Pass either --lecture-id or --row-index")


def youtube_get(endpoint: str, params: Dict[str, Any], api_key: str) -> Dict[str, Any]:
    params = dict(params)
    params["key"] = api_key
    url = f"{YOUTUBE_API_URL}/{endpoint}"
    response = requests.get(url, params=params, timeout=30)
    if response.status_code >= 400:
        try:
            payload = response.json()
        except Exception:
            payload = {"error_text": response.text}
        raise SiftAgentError(f"YouTube API error {response.status_code}: {json.dumps(payload, ensure_ascii=False)[:1500]}")
    return response.json()


def normalize_snippet(snippet: Dict[str, Any]) -> Dict[str, Any]:
    return {
        "author_display_name": snippet.get("authorDisplayName", ""),
        "author_channel_url": snippet.get("authorChannelUrl", ""),
        "author_channel_id": (snippet.get("authorChannelId") or {}).get("value", ""),
        "text_display": snippet.get("textDisplay", ""),
        "text_original": snippet.get("textOriginal", ""),
        "like_count": snippet.get("likeCount", 0),
        "published_at": snippet.get("publishedAt", ""),
        "updated_at": snippet.get("updatedAt", ""),
    }


def fetch_replies(parent_id: str, api_key: str, max_reply_pages: int) -> Tuple[List[Dict[str, Any]], int]:
    replies: List[Dict[str, Any]] = []
    page_token: Optional[str] = None
    pages = 0

    while pages < max_reply_pages:
        payload = youtube_get(
            "comments",
            {
                "part": "snippet",
                "parentId": parent_id,
                "maxResults": 100,
                "pageToken": page_token or "",
                "textFormat": "plainText",
            },
            api_key,
        )
        pages += 1

        for item in payload.get("items", []):
            snippet = item.get("snippet", {})
            replies.append({
                "comment_id": item.get("id", ""),
                "parent_id": parent_id,
                "comment_type": "reply",
                "snippet": normalize_snippet(snippet),
                "raw_item": item,
            })

        page_token = payload.get("nextPageToken")
        if not page_token:
            break

    return replies, pages


def fetch_youtube_comments(
    video_id: str,
    api_key: str,
    order: str = "relevance",
    max_pages: int = 5,
    include_replies: bool = True,
    max_reply_pages: int = 1,
    sleep_seconds: float = 0.0,
) -> Dict[str, Any]:
    if not video_id:
        raise SiftAgentError("Cannot fetch comments: missing video_id")

    threads: List[Dict[str, Any]] = []
    page_token: Optional[str] = None
    pages = 0
    reply_pages = 0
    reply_count = 0

    while pages < max_pages:
        payload = youtube_get(
            "commentThreads",
            {
                "part": "snippet",
                "videoId": video_id,
                "maxResults": 100,
                "order": order,
                "pageToken": page_token or "",
                "textFormat": "plainText",
            },
            api_key,
        )
        pages += 1

        for item in payload.get("items", []):
            top = item.get("snippet", {}).get("topLevelComment", {})
            top_snippet = top.get("snippet", {})
            thread_id = item.get("id", "")
            top_comment_id = top.get("id", "")
            total_reply_count = item.get("snippet", {}).get("totalReplyCount", 0)

            thread = {
                "thread_id": thread_id,
                "comment_id": top_comment_id,
                "parent_id": "",
                "comment_type": "comment",
                "total_reply_count": total_reply_count,
                "snippet": normalize_snippet(top_snippet),
                "replies": [],
                "raw_item": item,
            }

            if include_replies and total_reply_count:
                replies, used_pages = fetch_replies(top_comment_id, api_key, max_reply_pages=max_reply_pages)
                thread["replies"] = replies
                reply_pages += used_pages
                reply_count += len(replies)

            threads.append(thread)

        page_token = payload.get("nextPageToken")
        if not page_token:
            break

        if sleep_seconds:
            time.sleep(sleep_seconds)

    return {
        "schema": "chemdesk.youtube_comments.raw.v1",
        "fetched_at": now_iso(),
        "video_id": video_id,
        "fetch_options": {
            "order": order,
            "max_pages": max_pages,
            "include_replies": include_replies,
            "max_reply_pages": max_reply_pages,
        },
        "counts": {
            "top_level_comments": len(threads),
            "replies": reply_count,
            "comment_thread_pages": pages,
            "reply_pages": reply_pages,
        },
        "items": threads,
    }


_TIMESTAMP_RE = re.compile(r"(?<!\d)(?:\d{1,2}:)?\d{1,2}:\d{2}(?!\d)|\b\d{1,5}s\b")
_CHEM_HINT_RE = re.compile(
    r"\b("
    r"wrong|correct|option|formula|doubt|why|kaise|kyu|sirji|explain|definition|"
    r"bond|hybrid|vsepr|mot|dipole|angle|hydrogen|ionic|covalent|lattice|fajan|lewis|"
    r"soluble|solubility|amine|alcohol|resonance|back bonding|banana|ncert|exception|"
    r"acid|base|electron|electronegativity|oxidation|reduction|enthalpy|entropy|"
    r"mechanism|isomer|iupac|hydrocarbon|periodic|coordination|p block|d block"
    r")\b",
    flags=re.I,
)


def flatten_comments_for_model(raw_data: Dict[str, Any], max_comments: int) -> Dict[str, Any]:
    flat: List[Dict[str, Any]] = []

    def add_comment(item: Dict[str, Any], parent_context: Optional[str] = None) -> None:
        snippet = item.get("snippet", {})
        text = snippet.get("text_original") or snippet.get("text_display") or ""
        text = re.sub(r"\s+", " ", text).strip()
        if len(text) > 1800:
            text = text[:1800] + "… [truncated]"
        flat.append({
            "comment_id": item.get("comment_id", ""),
            "parent_id": item.get("parent_id", ""),
            "comment_type": item.get("comment_type", "comment"),
            "author": snippet.get("author_display_name", ""),
            "likes": snippet.get("like_count", 0),
            "published_at": snippet.get("published_at", ""),
            "timestamp_refs": _TIMESTAMP_RE.findall(text),
            "text": text,
            "parent_context": parent_context or "",
        })

    for thread in raw_data.get("items", []):
        parent_text = (thread.get("snippet", {}).get("text_original") or thread.get("snippet", {}).get("text_display") or "")
        add_comment(thread)
        for reply in thread.get("replies", []):
            add_comment(reply, parent_context=re.sub(r"\s+", " ", parent_text).strip()[:500])

    if len(flat) <= max_comments:
        selected = flat
        selection_note = "All fetched comments/replies were sent to the model."
    else:
        # Keep likely useful comments first, then fill with high-like comments up to max.
        def score(c: Dict[str, Any]) -> int:
            text = c.get("text", "")
            s = 0
            if c.get("timestamp_refs"):
                s += 5
            if "?" in text:
                s += 3
            if _CHEM_HINT_RE.search(text):
                s += 5
            likes = int(c.get("likes") or 0)
            if likes >= 50:
                s += 2
            if likes >= 200:
                s += 2
            if c.get("comment_type") == "reply" and (_CHEM_HINT_RE.search(text) or c.get("timestamp_refs")):
                s += 4
            if len(text) < 4:
                s -= 10
            return s

        selected = sorted(flat, key=score, reverse=True)[:max_comments]
        # Restore approximate original order inside selected set.
        selected_ids = {id(c) for c in selected}
        selected = [c for c in flat if id(c) in selected_ids]
        selection_note = (
            f"Fetched {len(flat)} comments/replies; sent top {len(selected)} to the model using a conservative "
            "pre-selection by timestamp/question/chemistry hints/likes to stay within context."
        )

    return {
        "selection_note": selection_note,
        "raw_total_flat_comments_and_replies": len(flat),
        "sent_to_model_count": len(selected),
        "comments": selected,
    }


def load_sift_knowledge(repo_root: Path, knowledge_dir: str) -> Dict[str, str]:
    base = repo_root / knowledge_dir
    files = {
        "agent_spec": base / "SIFT_AGENT_SPEC.md",
        "learned_knowledge": base / "SIFT_LEARNED_KNOWLEDGE.md",
        "noise_rules": base / "SIFT_NOISE_RULES.md",
        "signal_rules": base / "SIFT_SIGNAL_RULES.md",
        "output_schema": base / "SIFT_OUTPUT_SCHEMA.json",
        "examples": base / "examples" / "KEEP_REMOVE_DECISIONS.md",
    }
    return {name: safe_read_text(path) for name, path in files.items()}


def build_sift_prompt(row: Dict[str, str], compact_comments: Dict[str, Any], knowledge: Dict[str, str]) -> str:
    schema_json = knowledge["output_schema"]

    return f"""
You are the local ChemDesk Sift Agent v1.

Your task:
Create a scrubbed comments JSON object for CEE review.

You MUST:
- Use the Sift rules and learned knowledge below.
- Keep only useful/relevant student signals.
- Preserve evidence comments with enough wording for CEE.
- Mark Chemistry truth as unverified.
- Require CEE verification for correction/error claims.
- Never decide Chemistry truth.
- Never create public-facing content.
- Return JSON only. No markdown. No explanation outside JSON.

Lecture manifest row:
{json.dumps(row, ensure_ascii=False, indent=2)}

Sift Agent Spec:
{knowledge["agent_spec"]}

Sift Learned Knowledge:
{knowledge["learned_knowledge"]}

Sift Noise Rules:
{knowledge["noise_rules"]}

Sift Signal Rules:
{knowledge["signal_rules"]}

Sift Keep/Remove Examples:
{knowledge["examples"]}

Required output schema/template:
{schema_json}

Compact raw comments/replies for this lecture:
{json.dumps(compact_comments, ensure_ascii=False, indent=2)}

Now return one valid JSON object matching the schema intent.
"""


def default_chatgpt_input_path(scrubbed_path: Path) -> Path:
    name = scrubbed_path.name
    if name.endswith(".scrubbed.json"):
        name = name[: -len(".scrubbed.json")] + ".chatgpt-input.md"
    else:
        name = scrubbed_path.stem + ".chatgpt-input.md"
    return scrubbed_path.with_name(name)


def build_chatgpt_input_document(row: Dict[str, str], compact_comments: Dict[str, Any], prompt: str) -> str:
    lecture_id = row.get("Lecture ID", "")
    lecture_title = row.get("Lecture title", "")

    return f"""# ChemDesk Sift Agent Manual Bridge Input

Generated at: {now_iso()}

Lecture ID: {lecture_id}
Lecture title: {lecture_title}

Purpose:
This file lets ChatGPT Plus perform the Sift scrub step without using the OpenAI API.

Instructions for ChatGPT:
- Perform the Sift task below exactly.
- Return one valid JSON object only.
- Do not return markdown.
- Do not decide Chemistry truth.
- Keep correction/error claims unverified and requiring CEE review.

Selection note:
{compact_comments.get("selection_note", "")}

Raw comment selection counts:
- Raw total flattened comments/replies: {compact_comments.get("raw_total_flat_comments_and_replies", "")}
- Sent in this bridge file: {compact_comments.get("sent_to_model_count", "")}

--- BEGIN SIFT TASK ---
{prompt}
--- END SIFT TASK ---
"""


def extract_json_object(text: str) -> Dict[str, Any]:
    text = text.strip()
    if text.startswith("```"):
        text = re.sub(r"^```(?:json)?\s*", "", text)
        text = re.sub(r"\s*```$", "", text)
    try:
        return json.loads(text)
    except json.JSONDecodeError:
        start = text.find("{")
        end = text.rfind("}")
        if start >= 0 and end > start:
            return json.loads(text[start:end + 1])
        raise


def call_openai_for_scrubbed_json(
    prompt: str,
    model: str,
    allow_chat_fallback: bool = True,
) -> Dict[str, Any]:
    if OpenAI is None:
        raise SiftAgentError("The openai package is not installed. Run: pip install openai")

    require_env("OPENAI_API_KEY")
    client = OpenAI()

    # Prefer Responses API. Fallback keeps this script usable if an installed SDK/model combination differs.
    try:
        response = client.responses.create(
            model=model,
            input=[
                {
                    "role": "system",
                    "content": (
                        "You are ChemDesk Sift. Return valid JSON only. "
                        "Do not decide Chemistry truth. All correction claims are unverified and require CEE review."
                    ),
                },
                {"role": "user", "content": prompt},
            ],
            text={"format": {"type": "json_object"}},
        )
        return extract_json_object(response.output_text)
    except Exception as responses_error:
        if not allow_chat_fallback:
            raise SiftAgentError(f"OpenAI Responses call failed: {responses_error}") from responses_error

        try:
            response = client.chat.completions.create(
                model=model,
                messages=[
                    {
                        "role": "system",
                        "content": (
                            "You are ChemDesk Sift. Return valid JSON only. "
                            "Do not decide Chemistry truth. All correction claims are unverified and require CEE review."
                        ),
                    },
                    {"role": "user", "content": prompt},
                ],
                response_format={"type": "json_object"},
            )
            return extract_json_object(response.choices[0].message.content or "")
        except Exception as chat_error:
            raise SiftAgentError(
                f"OpenAI call failed. Responses error: {responses_error}; Chat fallback error: {chat_error}"
            ) from chat_error


def enforce_safety_flags(scrubbed: Dict[str, Any], row: Dict[str, str], raw_path: Path, output_path: Path) -> Dict[str, Any]:
    scrubbed["schema"] = scrubbed.get("schema") or "chemdesk.youtube_comments.sift_scrubbed.v1"
    scrubbed["status"] = "sift_scrubbed_needs_cee_review"
    scrubbed["truth_status"] = "unverified"
    scrubbed["cee_review_required"] = True
    scrubbed["public_display"] = False
    scrubbed["public_rag_eligible"] = False
    scrubbed["pagefind_index"] = False

    lecture = scrubbed.get("lecture")
    if not isinstance(lecture, dict):
        lecture = {}
    lecture.update({
        "lecture_id": row.get("Lecture ID", ""),
        "lecture_title": row.get("Lecture title", ""),
        "source_video": row.get("YouTube URL", ""),
        "input_file": str(raw_path),
        "input_type": "raw_youtube_api_comments",
        "output_file": str(output_path),
        "generated_at": scrubbed.get("lecture", {}).get("generated_at") or now_iso(),
    })
    scrubbed["lecture"] = lecture

    # Ensure every correction claim stays unverified.
    for claim in scrubbed.get("correction_error_claims", []) or []:
        if isinstance(claim, dict):
            claim["cee_verification_required"] = True
            claim["truth_status"] = "unverified"

    return scrubbed


def update_status(status_path: Path, update: Dict[str, Any]) -> None:
    status_path.parent.mkdir(parents=True, exist_ok=True)
    fieldnames = [
        "updated_at",
        "lecture_id",
        "lecture_title",
        "video_id",
        "status",
        "raw_comments_path",
        "scrubbed_comments_path",
        "raw_top_level_count",
        "raw_reply_count",
        "model",
        "error",
    ]

    rows: List[Dict[str, Any]] = []
    if status_path.exists():
        rows = list(csv.DictReader(status_path.open(encoding="utf-8")))

    lecture_id = update.get("lecture_id")
    replaced = False
    for i, row in enumerate(rows):
        if row.get("lecture_id") == lecture_id:
            rows[i] = {k: str(update.get(k, "")) for k in fieldnames}
            replaced = True
            break
    if not replaced:
        rows.append({k: str(update.get(k, "")) for k in fieldnames})

    with status_path.open("w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(rows)


def main() -> int:
    parser = argparse.ArgumentParser(description="ChemDesk Sift Agent v1: one lecture raw comments -> scrubbed JSON.")
    parser.add_argument("--repo-root", default=".", help="ChemDesk repo root. Default: current directory.")
    parser.add_argument("--manifest", default=DEFAULT_MANIFEST, help=f"Manifest CSV path relative to repo root. Default: {DEFAULT_MANIFEST}")
    parser.add_argument("--lecture-id", help="Lecture ID to process, e.g. chemical-bonding-lecture-16")
    parser.add_argument("--row-index", type=int, help="1-based manifest row index, excluding header.")
    parser.add_argument("--status-file", default=DEFAULT_STATUS_FILE, help=f"Status CSV path relative to repo root. Default: {DEFAULT_STATUS_FILE}")
    parser.add_argument("--sift-knowledge-dir", default=DEFAULT_SIFT_KNOWLEDGE_DIR, help=f"Sift knowledge dir relative to repo root. Default: {DEFAULT_SIFT_KNOWLEDGE_DIR}")
    parser.add_argument("--model", default=os.environ.get("OPENAI_MODEL", "gpt-5.5"), help="OpenAI model. Can also set OPENAI_MODEL.")
    parser.add_argument("--order", choices=["relevance", "time"], default="relevance", help="YouTube comment order.")
    parser.add_argument("--max-pages", type=int, default=5, help="Max YouTube top-level comment pages, 100 comments per page.")
    parser.add_argument("--max-reply-pages", type=int, default=1, help="Max reply pages per parent comment.")
    parser.add_argument("--no-replies", action="store_true", help="Do not fetch replies.")
    parser.add_argument("--max-comments-to-model", type=int, default=900, help="Max flattened comments/replies sent to OpenAI.")
    parser.add_argument("--overwrite", action="store_true", help="Allow overwriting existing raw/scrubbed output files.")
    parser.add_argument("--reuse-raw", action="store_true", help="Reuse existing raw JSON if present instead of fetching again.")
    parser.add_argument("--export-chatgpt-input", action="store_true", help="Export a ChatGPT Plus-ready input file and stop before calling OpenAI API.")
    parser.add_argument("--chatgpt-input-path", help="Optional output path for --export-chatgpt-input. Relative to repo root unless absolute.")
    parser.add_argument("--raw-only", action="store_true", help="Fetch/save raw comments only; do not call OpenAI.")
    parser.add_argument("--dry-run", action="store_true", help="Show selected row and paths without fetching/writing.")
    parser.add_argument("--no-chat-fallback", action="store_true", help="Disable Chat Completions fallback if Responses API call fails.")

    args = parser.parse_args()

    repo_root = Path(args.repo_root).expanduser().resolve()
    manifest_path = repo_root / args.manifest
    status_path = repo_root / args.status_file

    try:
        row = load_manifest_row(manifest_path, args.lecture_id, args.row_index)
        lecture_id = row.get("Lecture ID", "")
        lecture_title = row.get("Lecture title", "")
        youtube_url = row.get("YouTube URL", "")
        video_id = row.get("Video ID") or video_id_from_url(youtube_url)
        raw_path = repo_root / row["Raw comments path"]
        scrubbed_path = repo_root / row["Scrubbed comments path"]
        if args.chatgpt_input_path:
            maybe_path = Path(args.chatgpt_input_path).expanduser()
            chatgpt_input_path = maybe_path if maybe_path.is_absolute() else repo_root / maybe_path
        else:
            chatgpt_input_path = default_chatgpt_input_path(scrubbed_path)

        print(f"Lecture: {lecture_id} — {lecture_title}")
        print(f"Video: {youtube_url}")
        print(f"Raw path: {raw_path}")
        print(f"Scrubbed path: {scrubbed_path}")
        if args.export_chatgpt_input:
            print(f"ChatGPT input path: {chatgpt_input_path}")

        if args.dry_run:
            print("Dry run complete. No files written.")
            return 0

        if raw_path.exists() and args.reuse_raw:
            print(f"Reusing existing raw JSON: {raw_path}")
            raw_data = read_json(raw_path)
        else:
            youtube_key = require_env("YOUTUBE_API_KEY")
            print("Fetching YouTube comments...")
            raw_comments = fetch_youtube_comments(
                video_id=video_id,
                api_key=youtube_key,
                order=args.order,
                max_pages=args.max_pages,
                include_replies=not args.no_replies,
                max_reply_pages=args.max_reply_pages,
            )

            raw_data = {
                **raw_comments,
                "lecture": {
                    "lecture_id": lecture_id,
                    "lecture_title": lecture_title,
                    "source_video": youtube_url,
                    "video_id": video_id,
                },
            }
            write_json(raw_path, raw_data, overwrite=args.overwrite)
            print(f"Saved raw JSON: {raw_path}")

        if args.raw_only:
            update_status(status_path, {
                "updated_at": now_iso(),
                "lecture_id": lecture_id,
                "lecture_title": lecture_title,
                "video_id": video_id,
                "status": "raw_saved",
                "raw_comments_path": raw_path,
                "scrubbed_comments_path": scrubbed_path,
                "raw_top_level_count": raw_data.get("counts", {}).get("top_level_comments", ""),
                "raw_reply_count": raw_data.get("counts", {}).get("replies", ""),
                "model": "",
                "error": "",
            })
            print("Raw-only mode complete.")
            return 0

        if not args.export_chatgpt_input and scrubbed_path.exists() and not args.overwrite:
            raise SiftAgentError(f"Refusing to overwrite existing scrubbed file without --overwrite: {scrubbed_path}")

        print("Loading Sift knowledge files...")
        knowledge = load_sift_knowledge(repo_root, args.sift_knowledge_dir)

        compact_comments = flatten_comments_for_model(raw_data, max_comments=args.max_comments_to_model)
        print(compact_comments["selection_note"])

        prompt = build_sift_prompt(row, compact_comments, knowledge)

        if args.export_chatgpt_input:
            chatgpt_doc = build_chatgpt_input_document(row, compact_comments, prompt)
            write_text_file(chatgpt_input_path, chatgpt_doc, overwrite=args.overwrite)
            print(f"Saved ChatGPT input: {chatgpt_input_path}")

            update_status(status_path, {
                "updated_at": now_iso(),
                "lecture_id": lecture_id,
                "lecture_title": lecture_title,
                "video_id": video_id,
                "status": "chatgpt_input_exported",
                "raw_comments_path": raw_path,
                "scrubbed_comments_path": scrubbed_path,
                "raw_top_level_count": raw_data.get("counts", {}).get("top_level_comments", ""),
                "raw_reply_count": raw_data.get("counts", {}).get("replies", ""),
                "model": "chatgpt_manual_bridge",
                "error": "",
            })
            print(f"Updated status: {status_path}")
            print("Manual bridge export complete. No OpenAI API call made.")
            print("Next: upload/paste the .chatgpt-input.md file into ChatGPT Plus and ask for scrubbed JSON only.")
            return 0

        print(f"Calling OpenAI model: {args.model}")
        scrubbed = call_openai_for_scrubbed_json(
            prompt=prompt,
            model=args.model,
            allow_chat_fallback=not args.no_chat_fallback,
        )
        scrubbed = enforce_safety_flags(scrubbed, row=row, raw_path=raw_path, output_path=scrubbed_path)

        write_json(scrubbed_path, scrubbed, overwrite=args.overwrite)
        print(f"Saved scrubbed JSON: {scrubbed_path}")

        update_status(status_path, {
            "updated_at": now_iso(),
            "lecture_id": lecture_id,
            "lecture_title": lecture_title,
            "video_id": video_id,
            "status": "scrubbed_saved",
            "raw_comments_path": raw_path,
            "scrubbed_comments_path": scrubbed_path,
            "raw_top_level_count": raw_data.get("counts", {}).get("top_level_comments", ""),
            "raw_reply_count": raw_data.get("counts", {}).get("replies", ""),
            "model": args.model,
            "error": "",
        })
        print(f"Updated status: {status_path}")
        print("Sift Agent v1 complete.")
        return 0

    except Exception as exc:
        eprint(f"ERROR: {exc}")
        try:
            update_status(status_path, {
                "updated_at": now_iso(),
                "lecture_id": locals().get("lecture_id", args.lecture_id or ""),
                "lecture_title": locals().get("lecture_title", ""),
                "video_id": locals().get("video_id", ""),
                "status": "error",
                "raw_comments_path": locals().get("raw_path", ""),
                "scrubbed_comments_path": locals().get("scrubbed_path", ""),
                "raw_top_level_count": "",
                "raw_reply_count": "",
                "model": args.model,
                "error": str(exc),
            })
        except Exception:
            pass
        return 1


if __name__ == "__main__":
    raise SystemExit(main())
