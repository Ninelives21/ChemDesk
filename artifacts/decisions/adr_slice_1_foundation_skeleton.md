## Recommendation

Create **Architecture Slice 1: ChemDesk Foundation Skeleton**.

This first slice should give Codex a safe repo structure, one real chapter sandbox, metadata rules, validation placeholders, and agent/project memory folders — without generating hundreds of pages yet.

ChemDesk should start with:

```text
Astro + MDX for pages and notes
JSON for metadata, IDs, maps, review status, and source status
Pagefind-ready static structure
RAG-ready approved/draft separation
Chemical Bonding as the first controlled chapter sandbox
```

This follows Sia’s core rule: content must remain portable, stable-ID driven, modular, validation-safe, and not trapped inside framework-specific layouts.

---

## Why this fits ChemDesk

This slice is the safest first move because ChemDesk is planned as a structured Chemistry knowledge system, not just a website. The uploaded specs require modular Chemistry data, stable IDs, draft/approved separation, validation before publishing, Pagefind before public RAG, and future app/personalization readiness.

It also respects agent boundaries: Sia designs the structure, Codex implements it, CEE owns Chemistry truth, UI/UX owns visual taste, QA verifies release confidence, and the user gives final approval.

---

## Proposed structure

```text
ChemDesk/
├── src/
│   ├── pages/
│   │   ├── index.astro
│   │   ├── exams/
│   │   │   ├── jee.astro
│   │   │   ├── bitsat.astro
│   │   │   ├── tg-eapcet.astro
│   │   │   ├── cbse.astro
│   │   │   └── tgipe.astro
│   │   └── chapters/
│   │       └── [chapterId].astro
│   ├── layouts/
│   │   ├── BaseLayout.astro
│   │   └── ChapterLayout.astro
│   ├── components/
│   │   ├── ExamCard.astro
│   │   ├── ChapterHeader.astro
│   │   ├── StatusBadge.astro
│   │   └── ContentBlock.astro
│   └── styles/
│       ├── global.css
│       └── tokens.css
│
├── content/
│   ├── physical/
│   ├── inorganic/
│   │   └── chemical-bonding/
│   │       ├── chapter.md
│   │       ├── chapter.meta.json
│   │       ├── concepts/
│   │       │   └── _template.concept.mdx
│   │       ├── formulas/
│   │       │   └── formulas.json
│   │       ├── reactions/
│   │       │   └── reactions.json
│   │       ├── traps/
│   │       │   └── traps.json
│   │       ├── diagrams/
│   │       │   ├── diagrams.json
│   │       │   └── images/
│   │       ├── lectures/
│   │       │   ├── lecture-01-intro-to-chemical-bonding/
│   │       │   │   ├── index.mdx
│   │       │   │   ├── lecture.meta.json
│   │       │   │   ├── transcript.md
│   │       │   │   ├── cee-notes.md
│   │       │   │   └── images/
│   │       │   └── _lecture-template/
│   │       │       ├── index.mdx
│   │       │       ├── lecture.meta.json
│   │       │       ├── transcript.md
│   │       │       ├── cee-notes.md
│   │       │       └── images/
│   │       ├── syllabus-map/
│   │       │   └── syllabus-map.json
│   │       ├── source-status/
│   │       │   └── source-status.json
│   │       └── review/
│   │           └── review-status.json
│   ├── organic/
│   └── practical/
│
├── data/
│   ├── exams.json
│   ├── navigation.json
│   ├── status-labels.json
│   └── routes.json
│
├── schemas/
│   ├── chapter.schema.json
│   ├── concept.schema.json
│   ├── lecture.schema.json
│   ├── diagram.schema.json
│   ├── source.schema.json
│   └── review.schema.json
│
├── scripts/
│   ├── validate-content.mjs
│   ├── validate-ids.mjs
│   ├── validate-status.mjs
│   └── check-links.mjs
│
├── tests/
│   └── architecture/
│       └── content-structure.test.md
│
├── docs/
│   ├── architecture.md
│   ├── publishing-rules.md
│   └── validation-rules.md
│
├── artifacts/
│   ├── master-context/
│   ├── agents/
│   ├── decisions/
│   │   └── architecture_decisions.md
│   └── workflows/
│
└── README.md
```

Chemical Bonding is the first chapter sandbox because the project already has a special rule that Chemical Bonding has 16 lectures, every lecture must live in its own folder, and every lecture folder must have its own `images/` subfolder.

---

## Slice 1 rules

### 1. MDX/Markdown explains; JSON connects

Use MDX/Markdown for readable chapter, concept, and lecture notes. Use JSON for IDs, metadata, maps, status, source status, and relationships.

No giant `chemistry.json`. No random HTML pages. No content buried only inside layouts.

### 2. Stable ID format

All IDs must be:

```text
lowercase
hyphen-separated
human-readable
stable over time
not dependent on page order
not dependent on display title changes
```

Examples:

```text
chemical-bonding
chemical-bonding-vsepr-theory
chemical-bonding-formal-charge
lecture-chemical-bonding-01
diagram-chemical-bonding-vsepr-shapes
```

Stable IDs are necessary now because future bookmarks, saved hard PYQs, weak-topic tracking, revision logs, and app/PWA features will depend on them.

### 3. Status gates

Allowed status values:

```text
raw
draft
cee_processed
user_reviewed
approved
published
deprecated
needs_update
```

Public pages and future public RAG may use only:

```text
approved
published
```

Draft/internal material must not appear in public output. This is non-negotiable.

### 4. Theory first; PYQs later

Create the `pyqs/` folder only as a placeholder if needed, but do not begin PYQ tagging in Slice 1. Theory is the spine, and PYQs should map onto the concept base later.

### 5. Search before RAG

Slice 1 should prepare content for Pagefind/static search, but not implement public RAG. Public RAG comes only after approved structured content exists and must retrieve only approved/published content.

---

## Minimum metadata examples

### `chapter.meta.json`

```json
{
	"chapter_id": "chemical-bonding",
	"title": "Chemical Bonding",
	"domain": "inorganic",
	"status": "draft",
	"exam_scope": ["jee", "bitsat", "tg-eapcet", "cbse", "tgipe"],
	"source_status": "needs_review",
	"review_status": "not_started",
	"last_updated": "",
	"approved_by": "",
	"notes": ""
}
```

### `lecture.meta.json`

```json
{
	"lecture_id": "lecture-chemical-bonding-01",
	"chapter_id": "chemical-bonding",
	"lecture_number": 1,
	"title": "Intro to Chemical Bonding",
	"source_platform": "YouTube",
	"source_channel": "",
	"source_url": "",
	"primary_source": true,
	"status": "raw",
	"transcript_status": "not_started",
	"timestamp_map_status": "not_started",
	"concept_map_status": "not_started",
	"copyright_review_status": "needs_review",
	"notes": ""
}
```

### `_template.concept.mdx`

```mdx
---
concept_id: ''
chapter_id: 'chemical-bonding'
topic_id: ''
title: ''
status: 'draft'
exam_scope:
  - jee
  - bitsat
  - tg-eapcet
  - cbse
  - tgipe
prerequisites: []
related_concepts: []
formula_ids: []
trap_ids: []
diagram_ids: []
lecture_ids: []
syllabus_refs: []
review_notes: ''
---

## Concept explanation

Draft content goes here.

## Exam relevance

Draft content goes here.

## Common traps

Draft content goes here.
```

---

## What Codex should implement

# Codex Task Brief

## Goal

Create the first ChemDesk architecture skeleton with Astro/MDX-compatible folders, modular Chemistry content structure, metadata/schema placeholders, validation script placeholders, and Chemical Bonding as the first safe content sandbox.

## Files/folders to create or modify

Create the full folder structure listed above.

## Requirements

Codex should:

1. Set up the Astro + MDX skeleton.
2. Create homepage route with five exam cards: JEE, BITSAT, TG EAPCET, CBSE, TGIPE.
3. Create placeholder exam routes.
4. Create a generic chapter route that can later read chapter metadata.
5. Create `content/inorganic/chemical-bonding/` with the required internal folders.
6. Create `lecture-01-intro-to-chemical-bonding/` and `_lecture-template/`.
7. Add schema placeholder files in `schemas/`.
8. Add validation script placeholders in `scripts/`.
9. Add project memory folders under `artifacts/`.
10. Add `docs/architecture.md`, `docs/publishing-rules.md`, and `docs/validation-rules.md`.

## Validation checks

Initial validation can be basic but must check:

```text
missing IDs
invalid ID format
duplicate IDs
missing status
invalid status
draft content marked public
lecture folder missing images/
Chemical Bonding lecture folder rule
missing source_status where required
missing alt text for diagram metadata later
```

## Do not do

Codex should not:

```text
generate all 333 lecture pages
start PYQ tagging
invent Chemistry content
copy lecture wording
implement public RAG
add login/paywall/locked-card UI
decide visual design beyond basic placeholders
hard-code Chemistry notes into Astro layouts
create one giant chemistry.json
```

## Acceptance criteria

Slice 1 is accepted when:

```text
npm run build works
npm run validate exists
content folders are modular
Chemical Bonding lecture template exists
lecture-01 has its own images/ folder
metadata examples are present
draft/approved status rules are documented
public RAG is not implemented
Codex has not invented Chemistry content
QA has clear items to verify
```

---

## What QA should verify

QA should verify:

```text
repo builds successfully
homepage shows five exam cards
routes do not break
Chemical Bonding folder exists
lecture-01 has index.mdx, lecture.meta.json, transcript.md, cee-notes.md, and images/
no shared lecture image dumping folder is used
draft/internal content is not accidentally public
status labels are valid
schemas exist
validation scripts exist
no PYQ workflow has started
no public RAG feature exists
no login/paywall/locked-card UI appears
```

QA should also confirm the structure is compatible with future Pagefind, app/PWA, and personalization needs, but not require those features to be fully implemented in Slice 1.

---

## Architecture Decision Record

# ADR: ChemDesk Architecture Slice 1 — Foundation Skeleton

## Date

2026-05-19

## Status

Proposed

## Context

ChemDesk needs a clean architecture before large Chemistry content creation begins. The project must support Astro/MDX, modular content, stable IDs, validation, Pagefind/static search, future RAG, future app/PWA, future personalization, and hosting portability.

## Decision

Create a minimal foundation skeleton with:

```text
src/
content/
data/
schemas/
scripts/
tests/
docs/
artifacts/
```

Use Chemical Bonding as the first chapter sandbox. Keep Chemistry notes in Markdown/MDX and relationships/status/source metadata in JSON. Implement validation placeholders before content scale.

## Consequences

This slows down immediate page generation but prevents long-term chaos. Codex gets a clear build target. CEE can later add Chemistry truth safely. QA can test structure before release. Future RAG and app features remain possible without restructuring.

## Follow-up

After Slice 1 is implemented, Slice 2 should define the exact schema files and validation rules in detail before adding more chapters.

---

## User decision needed?

**No major decision needed.**

This is the correct first slice. It does not change product direction, monetization, source trust, or student-facing design. It simply gives ChemDesk a safe foundation before scale.
