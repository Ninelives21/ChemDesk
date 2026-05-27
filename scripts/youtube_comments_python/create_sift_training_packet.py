#!/usr/bin/env python3
"""
Create Sift training packet files from a ChemDesk raw YouTube comments JSON file.

Input:
  comments-XX-slug.raw.json

Outputs, in the same folder by default:
  sift-input-packet.md
  comments-XX-slug.human-review.md

Purpose:
  This script does NOT process comments.
  It only creates standardised template files for human-in-the-loop Sift training.
"""

from __future__ import annotations

import argparse
import json
import re
import sys
from pathlib import Path
from typing import Any


def read_json(path: Path) -> dict[str, Any]:
    try:
        return json.loads(path.read_text(encoding="utf-8"))
    except FileNotFoundError:
        raise SystemExit(f"ERROR: File not found: {path}")
    except json.JSONDecodeError as exc:
        raise SystemExit(f"ERROR: Invalid JSON in {path}: {exc}")


def strip_raw_suffix(filename: str) -> str:
    """
    comments-01-intro-to-chemical-bonds.raw.json
    -> comments-01-intro-to-chemical-bonds
    """
    if filename.endswith(".raw.json"):
        return filename[: -len(".raw.json")]
    return Path(filename).stem


def infer_subject(raw: dict[str, Any], default: str) -> str:
    # For now ChemDesk comment files are Chemistry by default.
    # Later this can infer from metadata/path when Physics/Math are added.
    return raw.get("subject") or default


def infer_chapter_id(raw_path: Path, raw: dict[str, Any], default: str) -> str:
    # Prefer explicit metadata if the raw file ever contains it.
    if raw.get("chapter_id"):
        return str(raw["chapter_id"])

    # Reasonable path-based fallback for current ChemDesk structure.
    parts = raw_path.parts
    for part in parts:
        if "chemical-bonding" in part:
            return "chemical-bonding"

    return default


def infer_notes_availability(folder: Path) -> str:
    """
    Detect whether the lecture folder seems to contain user notes / old ChemDesk notes.
    Conservative: returns unknown unless likely present.
    """
    html_files = list(folder.glob("*.html"))
    if html_files:
        return "user_notes_available"
    return "unknown"


def infer_transcript_availability(folder: Path) -> str:
    """
    Detect transcript/text files.
    Conservative: returns transcript_available if transcript.md or .txt files exist.
    """
    if (folder / "transcript.md").exists():
        return "transcript_available"

    txt_files = list(folder.glob("*.txt"))
    if txt_files:
        return "transcript_available"

    return "unknown"


def make_sift_input_packet(
    *,
    subject: str,
    chapter_id: str,
    lecture_id: str,
    lecture_title: str,
    source_video_url: str,
    raw_filename: str,
    final_md_filename: str,
    final_json_filename: str,
    human_review_filename: str,
    human_scrubbing_status: str,
    notes_availability: str,
    transcript_availability: str,
) -> str:
    return f"""# Sift Input Packet

## Task
Process this raw YouTube comments file for ChemDesk.

## Subject
{subject}

## Chapter ID
{chapter_id}

## Lecture ID
{lecture_id}

## Lecture Title
{lecture_title}

## Source Video URL
{source_video_url}

## Input Files
- Raw comments JSON: `{raw_filename}`
- Human review file: `{human_review_filename}`

## Output Files Required
- `{final_md_filename}`
- `{final_json_filename}`

## Human Scrubbing Status
{human_scrubbing_status}

## Notes Availability
{notes_availability}

## Transcript Availability
{transcript_availability}

## Sift’s Job
- read the attached raw comments JSON file
- read the attached human review file
- use the human review as training guidance
- remove noise
- cluster duplicate or related student signals
- rank the most useful signals first
- keep likes and replies as supporting signals only
- separate correction/error signals, conceptual doubts, missing-topic/resource gaps, and useful timeline comments
- mark all subject claims as requiring subject-expert verification
- do not decide Chemistry truth
- do not expose usernames or unnecessary personal data
- do not copy comments into public ChemDesk notes
- ensure the first Top Signal is the most useful signal for CEE, not merely the most liked comment

## Authority Rules
- Raw comments are student signals only.
- Human review is training guidance, not Chemistry truth.
- Sift does not decide subject correctness.
- CEE verifies Chemistry later.

## Output Rule
Create both:
1. a human-readable final Markdown report
2. a machine-readable final JSON report

## Required Markdown Output Headings
Sift’s `.final.md` report must use these headings:

1. Metadata
2. Executive Summary for CEE
3. Top Signals for CEE Verification
4. Possible Correction / Error Signals
5. Conceptual Doubts and Confusions
6. Missing Topic / Resource Gap Signals
7. Useful Timeline / Navigation Signals
8. Weak Signals
9. Generic Notes / PDF Requests
10. Noise Removed / Rejected Patterns
11. CEE Action Checklist
12. Human Review Notes

## Required JSON Output
Sift’s `.final.json` must follow the Sift final JSON schema defined in:
`docs/agents/sift/sift_output_contract.md`

If that file does not exist yet, use the current draft schema from the Sift operating instructions.
"""


def make_human_review_template(
    *,
    subject: str,
    chapter_id: str,
    lecture_id: str,
    lecture_title: str,
    raw_filename: str,
    comment_count: int,
) -> str:
    return f"""# Human Review: YouTube Comments

## Metadata

Subject: {subject}  
Chapter ID: {chapter_id}  
Lecture ID: {lecture_id}  
Lecture Title: {lecture_title}  
Raw File: {raw_filename}  
Raw Comment Rows: {comment_count}  
Review Status: human_gold_scrubbed  

---

## How to Fill This File

This file is for human-in-the-loop Sift training.

Do not rewrite every comment.

Only capture comments/signals that Sift should learn to keep, weaken, classify, or reject.

Do not decide Chemistry truth here. Mark possible Chemistry issues for CEE verification.

---

## Top Signals to Keep

Use this section for the most useful comments/signals Sift must not miss.

### Signal 1

Type: possible_error / conceptual_confusion / missing_topic / useful_timeline / weak_signal  
Priority: high / medium / low  
Reason to keep:  
Evidence summary:  
CEE action needed:  
Related timestamp, if any:  
Notes:  

### Signal 2

Type: possible_error / conceptual_confusion / missing_topic / useful_timeline / weak_signal  
Priority: high / medium / low  
Reason to keep:  
Evidence summary:  
CEE action needed:  
Related timestamp, if any:  
Notes:  

---

## Weak Signals to Keep Separately

Use this section for one-off or uncertain claims that may still be useful.

### Weak Signal 1

Type: weak_possible_error / weak_confusion / vague_request / low_confidence_timeline  
Reason to keep weak:  
Evidence summary:  
CEE action needed:  
Notes:  

---

## Useful Timeline / Navigation Comments

Use this section for timestamps or navigation comments that may help lecture mapping.

### Timeline Signal 1

Timestamp or range:  
Reason useful:  
Confidence: timestamp_candidate_needs_review  
Notes:  

---

## Generic Notes / PDF Requests

Keep this short. Summarise patterns only.

Example:
- Several students requested notes/PDF.
- One or two students requested a specific missing resource.

---

## Noise / Reject Patterns

List the types of comments you rejected. Do not list every rejected comment.

Common reject categories:
- praise-only comments
- attendance/year-check comments
- emoji-only comments
- pure timestamp dumps without useful context
- spam/promo
- unrelated emotional chatter
- personal chatter not useful for ChemDesk

---

## Human Instructions to Sift

- Keep the Top Signals near the top of the final report.
- Do not treat any student claim as Chemistry truth.
- Mark all Chemistry claims as requiring CEE verification.
- Keep weak one-off claims in Weak Signals.
- Do not overvalue likes.
- Do not copy usernames.
- Do not copy raw comments into public ChemDesk notes.
- Do not expose personal data.
- The first Top Signal must be the most useful CEE signal, not merely the most liked comment.
"""


def parse_args(argv: list[str]) -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Create Sift input packet and human-review template from a raw YouTube comments JSON file."
    )
    parser.add_argument(
        "raw_json",
        help="Path to comments-XX-slug.raw.json",
    )
    parser.add_argument(
        "--subject",
        default="Chemistry",
        help="Subject name. Default: Chemistry",
    )
    parser.add_argument(
        "--chapter-id",
        default="unknown",
        help="Chapter ID. If omitted, script tries simple inference.",
    )
    parser.add_argument(
        "--human-scrubbing-status",
        default="human_gold_scrubbed",
        choices=["raw_unscrubbed", "human_light_scrubbed", "human_gold_scrubbed"],
        help="Default for first 10 training lectures should usually be human_gold_scrubbed after you fill the review file.",
    )
    parser.add_argument(
        "--force",
        action="store_true",
        help="Overwrite existing sift-input-packet.md or human-review.md files.",
    )
    return parser.parse_args(argv)


def write_file(path: Path, content: str, force: bool) -> None:
    if path.exists() and not force:
        print(f"SKIP: {path} already exists. Use --force to overwrite.")
        return

    path.write_text(content, encoding="utf-8")
    print(f"WROTE: {path}")


def main(argv: list[str]) -> int:
    args = parse_args(argv)

    raw_path = Path(args.raw_json).expanduser().resolve()
    folder = raw_path.parent
    raw = read_json(raw_path)

    if raw.get("schema") != "chemdesk.youtube_comments.raw.v1":
        print(
            f"WARNING: Unexpected schema: {raw.get('schema')!r}. Continuing anyway.",
            file=sys.stderr,
        )

    stem = strip_raw_suffix(raw_path.name)

    subject = infer_subject(raw, args.subject)
    chapter_id = infer_chapter_id(raw_path, raw, args.chapter_id)
    lecture_id = raw.get("lecture_id") or ""
    lecture_title = raw.get("lecture_title") or ""
    source_video_url = raw.get("source") or ""
    comment_count = int(raw.get("comment_count") or len(raw.get("comments", [])))

    final_md_filename = f"{stem}.final.md"
    final_json_filename = f"{stem}.final.json"
    human_review_filename = f"{stem}.human-review.md"

    notes_availability = infer_notes_availability(folder)
    transcript_availability = infer_transcript_availability(folder)

    sift_packet_path = folder / "sift-input-packet.md"
    human_review_path = folder / human_review_filename

    sift_packet = make_sift_input_packet(
        subject=subject,
        chapter_id=chapter_id,
        lecture_id=lecture_id,
        lecture_title=lecture_title,
        source_video_url=source_video_url,
        raw_filename=raw_path.name,
        final_md_filename=final_md_filename,
        final_json_filename=final_json_filename,
        human_review_filename=human_review_filename,
        human_scrubbing_status=args.human_scrubbing_status,
        notes_availability=notes_availability,
        transcript_availability=transcript_availability,
    )

    human_review = make_human_review_template(
        subject=subject,
        chapter_id=chapter_id,
        lecture_id=lecture_id,
        lecture_title=lecture_title,
        raw_filename=raw_path.name,
        comment_count=comment_count,
    )

    write_file(sift_packet_path, sift_packet, args.force)
    write_file(human_review_path, human_review, args.force)

    print("\nNext steps:")
    print(f"1. Open and fill: {human_review_path}")
    print("2. Open Sift.")
    print(f"3. Attach: {raw_path.name}")
    print(f"4. Attach or paste: {human_review_filename}")
    print("5. Paste the contents of sift-input-packet.md as the prompt.")
    print("6. Save Sift outputs as:")
    print(f"   - {final_md_filename}")
    print(f"   - {final_json_filename}")

    return 0


if __name__ == "__main__":
    raise SystemExit(main(sys.argv[1:]))