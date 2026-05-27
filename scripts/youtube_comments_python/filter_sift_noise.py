#!/usr/bin/env python3
"""
ChemDesk / Sift Curated Comment Filter

Input:
  comments-XX-slug.raw.json

Output:
  comments-XX-slug.curated.json

Purpose:
  Create a smaller curated JSON for Sift by physically removing obvious junk,
  while preserving comments that may contain useful student signals.

Current policy:
  - Original .raw.json is never modified.
  - Rejected comments are NOT included in the curated output.
  - Likes alone do NOT save a comment.
  - All timestamp comments are kept.
  - Chemistry formula / ionic bond / electrovalency / correction signals are kept.
  - Short replies are usually removed, EXCEPT when they belong to a kept parent thread
    and look like useful explanation/answer/correction context.
  - Sift still ranks/clusters later.
  - CEE still verifies Chemistry truth later.
"""

from __future__ import annotations

import argparse
import json
import re
from datetime import datetime, timezone
from pathlib import Path
from typing import Any


REJECT_PATTERNS = [
    # Praise / fandom / emotional support only
    r"\bthank\b",
    r"\bthanks\b",
    r"\bthnx\b",
    r"\bthanku\b",
    r"\bthank you\b",
    r"\bbest sir\b",
    r"\bbest teacher\b",
    r"\bgreat sir\b",
    r"\byou are great\b",
    r"\byou are very best\b",
    r"\bawesome\b",
    r"\bamazing\b",
    r"\bnice video\b",
    r"\bsuperb\b",
    r"\bop sir\b",
    r"\blegend\b",
    r"\blove you\b",
    r"\blove u\b",
    r"\brespect\b",
    r"\bhuge respect\b",
    r"\bgoosebumps\b",
    r"\bwah\b",
    r"\bwaah\b",
    r"\bkya baat\b",
    r"\bkya dialog\b",
    r"\bdialog\b",
    r"\bpw jai\b",
    r"\bphysics wallah ki jai\b",

    # Attendance / year-check / nostalgia
    r"\battendance\b",
    r"\bpresent\b",
    r"\bkon kon\b",
    r"\bkaun kaun\b",
    r"\bkaun-kaun\b",
    r"\bwho is watching\b",
    r"\bwatching in\b",
    r"\bwatching from\b",
    r"\b2020\b",
    r"\b2021\b",
    r"\b2022\b",
    r"\b2023\b",
    r"\b2024\b",
    r"\b2025\b",
    r"\b2026\b",
    r"\b2027\b",
    r"\bafter .* years\b",
    r"\bold is gold\b",

    # Like/comment games
    r"\blike karo\b",
    r"\blike krdo\b",
    r"\blike do\b",
    r"\blike button\b",
    r"\bsubscribe\b",
    r"\bsubscribed\b",
    r"\bshare\b",
    r"\bpin\b",
    r"\bplease pin\b",
    r"\bfirst comment\b",
    r"\b1st comment\b",
    r"\bcomment section\b",
    r"\bscroll\b",
    r"\bstopped the video.*comment",

    # Social/payment/personal threads
    r"\bdonate\b",
    r"\bdonation\b",
    r"\bpaytm\b",
    r"\bpaytym\b",
    r"\bphone ?pe\b",
    r"\bwhatsapp\b",
    r"\bcall you\b",
    r"\bpersonally\b",
    r"\bneighbour\b",
    r"\bneighbor\b",
    r"\bwhere do you live\b",
    r"\bvisit\b",

    # Festival / casual status
    r"\bhappy diwali\b",
    r"\bcompleted \d+\b",

    # Generic self-promo / app-payment chatter
    r"\bpaid batch\b",
    r"\bpayment\b",
    r"\bpay kar\b",
    r"\bdownload app\b",
]


SHORT_JUNK_EXACT = {
    "yes",
    "ya",
    "yaa",
    "yeah",
    "yep",
    "no",
    "ok",
    "okay",
    "ok sir",
    "same",
    "me",
    "me too",
    "lol",
    "bro",
    "ya bro",
    "hii",
    "hi",
    "hello",
    "sir",
    "sir ji",
    "great",
    "nice",
    "thanks",
    "thank you",
    "op",
    "present",
    "oj",
    "ss",
    "hlw",
}


KEEP_PATTERNS = [
    # Notes / PDF / lecture material access
    r"\b(pdf|notes?)\b.*\b(lecture|class|description|session|chemicalbonding|chemical bonding|get|where|kaha|mil|available|help)\b",
    r"\b(where|kaha|kidhar|how).*\b(pdf|notes?)\b",
    r"\b(pdf|notes?)\b.*\b(note|notes|dedo|send|milti|milta)\b",
    r"\bnotes? dedo\b",
    r"\bnotes? khud\b",

    # Missing topics / requested gaps
    r"\bvideo.*banao\b",
    r"\bvideo.*banaiye\b",
    r"\bplease.*video\b",
    r"\bplz.*video\b",
    r"\bmake.*video\b",
    r"\bnot covered\b",
    r"\bnot taught\b",
    r"\bmissing\b",
    r"\bimp questions?\b",
    r"\bimportant questions?\b",
    r"\bimp topics?\b",
    r"\bimportant topics?\b",

    # Ionic-bond / electrovalency specific signals
    r"\bionic bond\b",
    r"\bionic bonds\b",
    r"\belectrovalenc(?:y|e)\b",
    r"\belectovalenc(?:y|e)\b",
    r"\belectrovalant\b",
    r"\belectrovalent\b",
    r"\bgroup 14\b",
    r"\bgroup 2\b",
    r"\bgroup 3\b",
    r"\bgroup 12\b",
    r"\bleast ease\b",
    r"\bforming an ionic bond\b",
    r"\bmore ionic\b",
    r"\bless ionic\b",
    r"\belectron affinity\b",
    r"\belectron gain enthalpy\b",
    r"\bexception\b",

    # Lattice / Born-Haber / energy-cycle specific signals
    r"\blattice energy\b",
    r"\blatice energy\b",
    r"\bborn haber\b",
    r"\bheat of formation\b",
    r"\benthalpy of formation\b",
    r"\bdelta hf\b",
    r"\bdissociation energy\b",
    r"\bheat of atomisation\b",
    r"\bheat of atomization\b",
    r"\bea2\b",
    r"\bea 2\b",
    r"\be\.a\.2\b",
    r"\belectron affinity 2\b",
    r"\bsecond electron affinity\b",
    r"\bcharge dominating factor\b",
    r"\benergy release\b",
    r"\brelease ho\b",
    r"\brequired ho\b",

    # Chemical formula / compound comparison signals
    r"\bmgcl2?\b",
    r"\bbecl2\b",
    r"\bbacl2\b",
    r"\bcacl2\b",
    r"\bnacl\b",
    r"\bkcl\b",
    r"\brbcl\b",
    r"\blicl\b",
    r"\bnaf\b",
    r"\bmgi2\b",
    r"\bcl\b.*\b-?1\b",
    r"\bisomorphous\b",
    r"\bsimilar structure\b",
    r"\bsimilar formula\b",

    # Chemical Bonding / Chemistry topic signals
    r"\bshapes? of orbital\b",
    r"\borbital.*video\b",
    r"\bchemical bonding sums\b",
    r"\bbent rule\b",
    r"\bsidwick\b",
    r"\bsidgwick\b",
    r"\bmaximum covalency\b",
    r"\bback bonding\b",
    r"\bbridge bonding\b",
    r"\bhydrogen bonding\b",
    r"\benthalpy of sublimation\b",
    r"\bfajan\b",
    r"\bfajans\b",
    r"\bcovalent\b",
    r"\blewis\b",
    r"\boctet\b",
    r"\bformal charge\b",
    r"\bresonance\b",
    r"\bhybrid",
    r"\bvsepr\b",
    r"\bmot\b",
    r"\bmolecular orbital\b",
    r"\bdipole\b",
    r"\bbond angle\b",
    r"\blattice\b",
    r"\benthalpy\b",
    r"\bsign convention\b",

    # Correction / error signals
    r"\bmistake\b",
    r"\berror\b",
    r"\bwrong\b",
    r"\bcorrection\b",
    r"\bcorrect\b",
    r"\bnot a\b",
    r"\bshould be\b",
    r"\bgalat\b",
    r"\bgarbar\b",
    r"\bgrbar\b",
    r"\bgadbad\b",
    r"\bgadbadi\b",
    r"\bhota hai\b",
    r"\bnahi hota\b",
    r"\bnehi hota\b",
    r"\bnhi hota\b",

    # Genuine doubt/confusion/student struggle
    r"\bdoubt\b",
    r"\bconfus",
    r"\bnot clear\b",
    r"\bunclear\b",
    r"\bnahi samajh\b",
    r"\bnhi samajh\b",
    r"\bsamajh nahi\b",
    r"\bsamajh nhi\b",
    r"\bsamajh aa.*nahi\b",
    r"\bsamajh aa.*nhi\b",
    r"\bclear nahi\b",
    r"\bclear nhi\b",
    r"\bconcept samajh.*sheets solve\b",
    r"\bsheets solve\b",
    r"\bsheet.*solve\b",
    r"\bplease tell\b",
    r"\bis it correct\b",

    # Chapter completeness / exam sufficiency
    r"\b16(?:th)? videos?\b",
    r"\b16 lectures?\b",
    r"\bplaylist\b.*\b(enough|sufficient|complete|cover|topics?)\b",
    r"\b(enough|sufficient|complete)\b.*\b(neet|jee|cet|chapter|chemical bonding|lectures?|videos?|playlist)\b",
    r"\b(neet|jee|cet)\b.*\b(enough|sufficient|complete|aspirants?)\b",
    r"\bcomplete.*chemical bonding\b",
    r"\bchemical bonding.*complete\b",
    r"\bcover.*all topics\b",
    r"\ball topics.*cover\b",
    r"\bsare chemical bonding.*topic\b",
    r"\btopic complete\b",

    # Concept explanation / core Chemistry signal
    r"\bcause of chemical bonding\b",
    r"\bcause of chemical combination\b",
    r"\bnoble gas\b",
    r"\blower.*energy\b",
    r"\bminimum.*energy\b",
    r"\bpotential energy\b",
    r"\brepulsive force\b",
    r"\batoms?.*stable\b",
    r"\bstability\b.*energy\b",
    r"\bgraph\b.*\benergy\b",
    r"\bgaseous state\b",
    r"\bnoble gases\b",
    r"\bions?\b.*\bbaat\b",
    r"\bcarbon.*ionic bond\b",
    r"\bionic bond.*carbon\b",
    r"\bamines\b",
    r"\balcohols\b",
    r"\bmolecular level\b",
    r"\batomic.*molecular level\b",

    # Prerequisites / importance / sequencing
    r"\bprerequisites?\b",
    r"\bwithout.*structure of atom\b",
    r"\borganic chemistry without chemical bonding\b",
    r"\bsuper important chapter\b",
    r"\bimportant chapter\b",
    r"\bskipped.*chemical bonding\b",
    r"\bchemical bonding.*skipped\b",
    r"\bregret\b.*\bchemical bonding\b",
    r"\bchemical bonding\b.*\bregret\b",

    # Practice / solving / student-usefulness
    r"\bsolve mcqs\b",
    r"\bpractice\b.*\b(chapter|questions|mcqs|pyqs?)\b",
    r"\bpyqs?\b",
    r"\bquestion\b.*\bchemical bonding\b",
    r"\bchemical bonding\b.*\bquestion\b",
    r"\bncert\b",
    r"\bmodule\b",
    r"\barihant\b",
    r"\btheory\b",

    # Exam-year style signal, but not attendance
    r"\bneet 2026\b",
    r"\bneet 2027\b",
    r"\bfor cet\b",
    r"\bjee aspirant\b",
    r"\bneet aspirant\b",
    r"\bneet aspirants\b",
]


WEAK_OFFTOPIC_PATTERNS = [
    r"\bvander\s*vall\b",
    r"\bvan der waal\b",
    r"\bvanderwaal\b",
]


# Replies under kept parent questions can be rescued if they look explanatory.
# This specifically catches the EA2 / electron-affinity thread style.
REPLY_EXPLANATION_PATTERNS = [
    r"\bea2\b",
    r"\bea 2\b",
    r"\be\.a\.2\b",
    r"\belectron affinity\b",
    r"\belectron gain enthalpy\b",
    r"\bgain e\b",
    r"\bgain electron\b",
    r"\btake electron\b",
    r"\bsecond electron\b",
    r"\be-\b",
    r"\belectron\b",
    r"\bcharge\b",
    r"\bnegative\b",
    r"\bpositive\b",
    r"\b-1\b",
    r"\b\+1\b",
    r"\brepel\b",
    r"\brepulsion\b",
    r"\brepulsive\b",
    r"\bforce\b",
    r"\benergy\b",
    r"\bprovide energy\b",
    r"\benergy lagani\b",
    r"\bgreater force\b",
    r"\bactual state\b",
    r"\bo actual state\b",
    r"\boxygen\b",
    r"\bo\b.*\bstate\b",
    r"\bbecause\b",
    r"\bbcs\b",
    r"\bkyuki\b",
    r"\bkyunki\b",
    r"\btherefore\b",
    r"\bso\b.*\benergy\b",

    # Other chemistry answer/context replies
    r"\blattice energy\b",
    r"\binversely proportional\b",
    r"\bsize of ions\b",
    r"\bLiCl\b",
    r"\bNaCl\b",
    r"\bKCl\b",
    r"\bRbCl\b",
    r"\b1/2\b",
    r"\bhalf\b",
    r"\bbalancing\b",
    r"\bdissociation energy\b",
    r"\bheat of formation\b",
    r"\bions?\b.*\bbaat\b",
    r"\bcorrect\b",
    r"\bgalat\b",
    r"\bsahi\b",
]


REPLY_CONTEXT_REJECT_PATTERNS = [
    r"\bthank\b",
    r"\bthanks\b",
    r"\bthnx\b",
    r"\bthanku\b",
    r"\blove\b",
    r"\bgreat\b",
    r"\bnice\b",
    r"\bhaha\b",
    r"\bhahaa\b",
    r"\blol\b",
    r"\bhlw\b",
    r"\bhello\b",
    r"\bsupport\b",
    r"\bwatch again\b",
    r"\bjust watch video\b",
    r"\bonce more\b",
]


TIMESTAMP_RE = re.compile(r"\b\d{1,2}:\d{2}(?::\d{2})?\b")


LONG_CONTEXT_TERMS = [
    r"\bchemical bonding\b",
    r"\bbonding\b",
    r"\bchemistry\b",
    r"\batoms?\b",
    r"\benergy\b",
    r"\bchapter\b",
    r"\bionic\b",
    r"\belectrovalency\b",
    r"\blattice\b",
    r"\bborn haber\b",
]


LONG_CONTEXT_VALUE_TERMS = [
    r"\bimportant\b",
    r"\bclear\b",
    r"\bunderstand\b",
    r"\bsamajh\b",
    r"\bsmjh\b",
    r"\bstudy\b",
    r"\bpadh\b",
    r"\bconcept\b",
    r"\bregret\b",
    r"\bskip",
    r"\bprerequisite\b",
    r"\bconfusion\b",
    r"\bdoubt\b",
]


EMOJI_RE = re.compile(
    "["
    "\U0001F300-\U0001FAFF"
    "\U00002700-\U000027BF"
    "]+",
    flags=re.UNICODE,
)


def normalise(text: str) -> str:
    text = (text or "").lower()
    text = re.sub(r"https?://\S+", " ", text)
    text = re.sub(r"@\S+", " ", text)
    # Keep digits, letters, colon, tilde, plus, minus, slash, dot because formula/sign comments use them.
    text = re.sub(r"[^a-z0-9:\s~\-\+\/\.]+", " ", text)
    text = re.sub(r"\s+", " ", text).strip()
    return text


def word_count(text: str) -> int:
    return len(re.findall(r"\w+", text or ""))


def has_pattern(text: str, patterns: list[str]) -> bool:
    return any(re.search(pattern, text, flags=re.IGNORECASE) for pattern in patterns)


def has_timestamp(comment: dict[str, Any], text: str) -> bool:
    return bool(comment.get("timestamps") or []) or bool(TIMESTAMP_RE.search(text or ""))


def mostly_emoji_or_empty(text: str) -> bool:
    cleaned = normalise(text)
    if not cleaned:
        return True

    without_emoji = EMOJI_RE.sub("", cleaned)
    without_punct = re.sub(r"[^\w\s]", "", without_emoji).strip()
    return not without_punct


def is_short_junk(text: str) -> bool:
    cleaned = normalise(text)
    cleaned_no_punct = re.sub(r"[^\w\s]", "", cleaned).strip()

    if cleaned_no_punct in SHORT_JUNK_EXACT:
        return True

    if word_count(cleaned_no_punct) <= 2:
        return True

    return False


def is_source_or_playlist_metadata(comment: dict[str, Any], text: str) -> bool:
    author = (comment.get("author") or "").lower()
    raw_text = (comment.get("raw_text") or "").lower()

    if "physicswallah" in author and "chemical bonding" in text:
        return True

    if "lecturewise notes" in text and "chemical bonding" in text and "youtu" in raw_text:
        return True

    return False


def is_long_context_comment(text: str) -> bool:
    if word_count(text) < 18:
        return False

    return has_pattern(text, LONG_CONTEXT_TERMS) and has_pattern(text, LONG_CONTEXT_VALUE_TERMS)


def classify_comment_initial(comment: dict[str, Any]) -> tuple[str, str]:
    raw_text = comment.get("raw_text") or ""
    clean_text = comment.get("clean_preview_text") or raw_text
    text = normalise(clean_text)

    # 1. Source / playlist metadata from official source.
    if is_source_or_playlist_metadata(comment, text):
        return "keep", "source_or_playlist_metadata"

    # 2. Keep all timestamp comments.
    if has_timestamp(comment, clean_text):
        return "keep", "timestamp_comment"

    # 3. Empty / emoji / very short junk.
    if mostly_emoji_or_empty(text):
        return "reject", "emoji_or_empty"

    if is_short_junk(text):
        return "reject", "short_junk"

    # 4. Known weak/off-topic chemistry-ish comments should not be kept unless timestamped.
    if has_pattern(text, WEAK_OFFTOPIC_PATTERNS):
        return "reject", "weak_offtopic_chemistry_noise"

    # 5. Strong useful Sift signal.
    if has_pattern(text, KEEP_PATTERNS):
        return "keep", "high_value_student_signal"

    # 6. Remove obvious universal noise.
    if has_pattern(text, REJECT_PATTERNS):
        return "reject", "reject_noise_pattern"

    # 7. Longer student-context comments may be useful.
    if is_long_context_comment(text):
        return "keep", "long_study_context_comment"

    # 8. Replies are usually junk unless already kept above or rescued later by parent-thread rule.
    if comment.get("type") == "reply":
        return "reject", "reply_without_signal"

    # 9. Default reject.
    return "reject", "default_no_useful_signal"


def should_keep_reply_for_kept_parent(reply: dict[str, Any], kept_parent_ids: set[str]) -> bool:
    parent_id = reply.get("parent_id") or ""
    if not parent_id or parent_id not in kept_parent_ids:
        return False

    raw_text = reply.get("raw_text") or ""
    clean_text = reply.get("clean_preview_text") or raw_text
    text = normalise(clean_text)

    if mostly_emoji_or_empty(text):
        return False

    # Avoid rescuing casual replies under an official playlist/source comment.
    if word_count(text) <= 3 and not has_pattern(text, REPLY_EXPLANATION_PATTERNS):
        return False

    # Exclude praise/casual replies unless they also contain a strong explanation marker.
    if has_pattern(text, REPLY_CONTEXT_REJECT_PATTERNS) and not has_pattern(text, REPLY_EXPLANATION_PATTERNS):
        return False

    # Rescue useful explanatory/corrective replies.
    if has_pattern(text, REPLY_EXPLANATION_PATTERNS):
        return True

    return False


def output_path_for(raw_path: Path, output_arg: str | None) -> Path:
    if output_arg:
        return Path(output_arg).expanduser().resolve()

    if raw_path.name.endswith(".raw.json"):
        return raw_path.with_name(raw_path.name.replace(".raw.json", ".curated.json"))

    return raw_path.with_name(raw_path.stem + ".curated.json")


def build_curated_payload(
    original_payload: dict[str, Any],
    kept_comments: list[dict[str, Any]],
    *,
    raw_path: Path,
    keep_counts: dict[str, int],
    reject_counts: dict[str, int],
    original_count: int,
    rejected_count: int,
) -> dict[str, Any]:
    payload = dict(original_payload)

    payload["schema"] = "chemdesk.youtube_comments.curated.v1"
    payload["status"] = "curated_for_sift"
    payload["curated_at"] = datetime.now(timezone.utc).isoformat()

    payload["curation_metadata"] = {
        "raw_source_file": raw_path.name,
        "curation_method": "filter_sift_noise.py",
        "curation_version": "v6_kept_parent_explanatory_reply_rescue",
        "rejected_comments_physically_removed": True,
        "likes_alone_do_not_keep_comment": True,
        "all_timestamp_comments_kept": True,
        "parent_reply_rescue_enabled": True,
        "explanatory_reply_rescue_enabled": True,
        "original_comment_count": original_count,
        "curated_comment_count": len(kept_comments),
        "removed_comment_count": rejected_count,
        "keep_reason_counts": keep_counts,
        "reject_reason_counts": reject_counts,
        "review_note": (
            "This curated file is intended as Sift input. "
            "Rejected/noise comments are not included. "
            "This version keeps all timestamp comments, preserves chemistry/formula/energy signals, "
            "and rescues explanatory replies under kept parent questions."
        ),
    }

    payload["notes"] = [
        "This is curated Sift input.",
        "Obvious low-signal noise has been physically removed.",
        "All timestamp comments were kept.",
        "Likes alone were not used as a keep reason.",
        "Selected explanatory replies under kept parent questions may be preserved for context.",
        "This file does not decide Chemistry truth.",
        "Sift should scrub, cluster, prioritize, and create the .final report.",
        "CEE must verify Chemistry truth later.",
    ]

    payload["comments"] = kept_comments
    payload["comment_count"] = len(kept_comments)

    return payload


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Create ChemDesk Sift .curated.json by physically removing obvious YouTube comment noise."
    )
    parser.add_argument("raw_json", help="Path to comments-XX-slug.raw.json")
    parser.add_argument("--output", default=None, help="Output path. Default: comments-XX-slug.curated.json")
    parser.add_argument("--dry-run", action="store_true", help="Print counts but do not write output file.")
    return parser.parse_args()


def main() -> int:
    args = parse_args()

    raw_path = Path(args.raw_json).expanduser().resolve()
    if not raw_path.exists():
        raise SystemExit(f"ERROR: File not found: {raw_path}")

    payload = json.loads(raw_path.read_text(encoding="utf-8"))
    comments = payload.get("comments", [])

    if not isinstance(comments, list):
        raise SystemExit("ERROR: JSON does not contain a list at key 'comments'.")

    first_pass: list[tuple[dict[str, Any], str, str]] = []
    kept_parent_ids: set[str] = set()

    for comment in comments:
        decision, reason = classify_comment_initial(comment)
        first_pass.append((comment, decision, reason))

        if decision == "keep" and comment.get("type") == "comment":
            cid = comment.get("comment_id") or ""
            if cid:
                kept_parent_ids.add(cid)

    kept: list[dict[str, Any]] = []
    rejected_count = 0

    keep_counts: dict[str, int] = {}
    reject_counts: dict[str, int] = {}

    for comment, decision, reason in first_pass:
        final_decision = decision
        final_reason = reason

        if decision == "reject" and comment.get("type") == "reply":
            if should_keep_reply_for_kept_parent(comment, kept_parent_ids):
                final_decision = "keep"
                final_reason = "explanatory_reply_context_for_kept_parent"

        if final_decision == "keep":
            comment_copy = dict(comment)
            comment_copy["curation_decision"] = "keep"
            comment_copy["curation_reason"] = final_reason
            kept.append(comment_copy)
            keep_counts[final_reason] = keep_counts.get(final_reason, 0) + 1
        else:
            rejected_count += 1
            reject_counts[final_reason] = reject_counts.get(final_reason, 0) + 1

    out_path = output_path_for(raw_path, args.output)

    print(f"Input file: {raw_path}")
    print(f"Original comments: {len(comments)}")
    print(f"Kept in curated file: {len(kept)}")
    print(f"Removed as noise: {rejected_count}")

    print("\nKeep reasons:")
    for reason, count in sorted(keep_counts.items()):
        print(f"  {reason}: {count}")

    print("\nReject reasons:")
    for reason, count in sorted(reject_counts.items()):
        print(f"  {reason}: {count}")

    if args.dry_run:
        print("\nDRY RUN: no file written.")
        return 0

    curated_payload = build_curated_payload(
        payload,
        kept,
        raw_path=raw_path,
        keep_counts=keep_counts,
        reject_counts=reject_counts,
        original_count=len(comments),
        rejected_count=rejected_count,
    )

    out_path.write_text(
        json.dumps(curated_payload, ensure_ascii=False, indent=2),
        encoding="utf-8",
    )

    print(f"\nWrote curated file: {out_path}")
    print("Rejected comments are NOT included in the curated JSON.")

    return 0


if __name__ == "__main__":
    raise SystemExit(main())