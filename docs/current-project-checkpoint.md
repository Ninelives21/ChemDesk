# ChemDesk Current Project Checkpoint

Last updated: 2026-05-21

## Slice 1 status

**Architecture Slice 1 is closed.**

Do not add more Slice 1 foundation tasks unless the slice is deliberately reopened.

Slice 1 created the structure, metadata, registry, audit, documentation, templates, syllabus placeholders, and status reference maps needed before real Chemistry content work begins.

---

## 1. Current phase

ChemDesk is at the end of **Architecture Slice 1: Foundation Scaffold**.

The project now has a structured Chemistry content library and control layer, but it is still **not** the final student-facing app.

Current status:

```text
Astro app: not set up yet
UI pages: not created yet
Student-facing Chemistry notes: not added yet
Public search: not added yet
RAG/chatbot: not added yet
Login/personalization: not added yet
PDF downloads: not added
```

---

## 2. Completed Slice 1 work

Completed:

- Ordered content scaffold
- Metadata-rich chapter and lecture placeholders
- Content registry generator
- Scaffold audit script
- Project structure manual
- Current checkpoint document
- Change-management documentation
- Manual content update rules
- Authoring templates
- Syllabus placeholder maps
- Status reference maps

---

## 3. Current content structure

The active Chemistry content scaffold lives in:

```text
content/
```

Current ordered category folders:

```text
content/
  01-physical/
  02-inorganic/
  03-organic/
  04-practical/
```

Folder number prefixes are for **human display order**.

Stable IDs remain unprefixed:

```text
01-physical   → category_id: physical
02-inorganic  → category_id: inorganic
03-organic    → category_id: organic
04-practical  → category_id: practical
```

Do not treat folder prefixes as identity. They are ordering helpers.

---

## 4. Current expected counts

The current scaffold should have:

```text
categories: 4
chapters: 25
lectures: 242
images/.gitkeep placeholders: 267
```

Verification commands:

```bash
find content -name "chapter.meta.json" | wc -l
find content -name "lecture.meta.json" | wc -l
find content -path "*/images/.gitkeep" | wc -l
```

Expected output:

```text
25
242
267
```

---

## 5. Current verified commands

Run these from the repo root:

```bash
node scripts/generate-content-registry.mjs
node scripts/audit-content-scaffold.mjs
```

Current expected result:

```text
Registry generator: PASS
Content scaffold audit: PASS
```

Both should pass after documentation/template/status-map changes.

---

## 6. Current special paths

### Chemical Bonding

Chemical Bonding currently belongs under Physical Chemistry:

```text
content/01-physical/03-chemical-bonding-and-molecular-structure
```

This follows the current Master Lectures organization.

### Replacement-only chapters

These chapters currently have chapter-level folders and metadata, but no lecture folders yet:

```text
content/02-inorganic/02-p-block-elements
content/02-inorganic/03-d-and-f-block-elements
content/02-inorganic/04-coordination-compounds
```

They are intentionally held at chapter level because their source plan is:

```text
Replace/standardize to JEE Wallah
```

Lecture folders should be added later only after the replacement source list is finalized.

---

## 7. Source of truth

The main source of truth for the content scaffold is:

```text
content/**/chapter.meta.json
content/**/lecture.meta.json
```

These metadata files define:

```text
category IDs
chapter IDs
lecture IDs
folder paths
source-plan status
syllabus mapping fields
review status
copyright/source status
```

The folder tree is important, but metadata is what future scripts, search, RAG, UI, and app features should trust.

---

## 8. Generated files

The generated content registry is:

```text
data/content-registry.json
```

This file should **not** be manually edited.

It is generated from:

```text
content/**/chapter.meta.json
content/**/lecture.meta.json
```

Regenerate it with:

```bash
node scripts/generate-content-registry.mjs
```

If `data/content-registry.json` changes, the commit should also include the content metadata or script change that caused it.

---

## 9. Important control folders

### `templates/`

Reusable authoring templates for future manual additions.

Current purpose:

```text
safe chapter README template
safe lecture README template
chapter metadata template
lecture metadata template
manual lecture addition checklist
```

Templates are not student-facing content.

### `data/syllabus/`

Placeholder syllabus mapping layer.

Current purpose:

```text
exam-specific placeholder maps
future syllabus-based navigation support
no public mapping claims yet
```

These files are not complete syllabus maps yet.

### `data/status/`

Controlled status reference maps.

Current purpose:

```text
standard content statuses
standard review statuses
standard source statuses
standard copyright-review statuses
standard workflow statuses
```

These prevent metadata drift.

Only `published` content status is public/RAG eligible by default.

---

## 10. Safe manual edits

These are generally safe:

```text
docs/*.md
README.md files
artifacts/decisions/*.md
artifacts/workflows/*.md
future ideas/backlog documents
manual notes and project explanations
templates/*.md
```

These are documentation or planning files. They do not usually affect the content scaffold or generated registry.

---

## 11. Manual edits allowed with checklist

These are allowed, but should be done carefully:

```text
adding a new lecture folder
adding a lecture.meta.json file
adding images inside the correct images/ folder
adding README.md notes inside a new folder
adding images/.gitkeep to preserve an empty image folder
```

For every manually added lecture folder, include:

```text
README.md
lecture.meta.json
images/.gitkeep
```

Then regenerate and audit:

```bash
node scripts/generate-content-registry.mjs
node scripts/audit-content-scaffold.mjs
```

---

## 12. Risky manual edits

Avoid these unless there is a clear migration plan:

```text
renaming category folders
renaming chapter folders
renaming lecture folders
changing category_id
changing chapter_id
changing lecture_id
editing canonical_path without updating the actual path
deleting metadata files
moving images between chapters or lectures
marking content as approved or published
editing data/content-registry.json directly
```

These can create downstream issues for future routing, search, RAG, bookmarks, weak-topic tracking, and app/PWA features.

---

## 13. Stable ID rule

Stable IDs are sacred.

Folder paths may evolve, but stable IDs should not change casually.

Example:

```json
{
  "category_id": "physical",
  "chapter_id": "chemical-bonding-and-molecular-structure",
  "lecture_id": "chemical-bonding-and-molecular-structure-lecture-01"
}
```

The visible folder may include order prefixes:

```text
content/01-physical/03-chemical-bonding-and-molecular-structure
```

But the stable IDs remain clean and unprefixed.

---

## 14. Status reference rule

Use controlled status values from:

```text
data/status/
```

Do not invent new status labels casually.

Examples of controlled values:

```text
raw
draft
ready_for_review
approved
published
needs_review
not_started
in_review
complete
blocked
rejected
```

Public/RAG safety rule:

```text
Only published content is public/RAG eligible by default.
Draft, raw, needs-review, source-review, and copyright-review content must not be used in public RAG.
```

---

## 15. What to do after content structure changes

If you add, rename, move, or modify content folders or metadata:

1. Regenerate the registry:

```bash
node scripts/generate-content-registry.mjs
```

2. Run scaffold audit:

```bash
node scripts/audit-content-scaffold.mjs
```

3. Verify expected counts if the change should not affect counts:

```bash
find content -name "chapter.meta.json" | wc -l
find content -name "lecture.meta.json" | wc -l
find content -path "*/images/.gitkeep" | wc -l
```

Current expected counts:

```text
25
242
267
```

If future JEE Wallah replacement lectures are added, these counts will change. When that happens, update this checkpoint document and `docs/change-management.md`.

---

## 16. What not to do right now

Do not proceed to these in Slice 1:

```text
Astro setup
UI page creation
public search
RAG embeddings
AI chatbot
login/personalization
PDF export/download features
student-facing Chemistry notes
bulk image import
```

These should come later as separate architecture slices.

---

## 17. Current scripts

Current important scripts:

```text
scripts/generate-content-registry.mjs
scripts/audit-content-scaffold.mjs
```

Purpose:

```text
generate-content-registry.mjs:
  reads chapter.meta.json and lecture.meta.json
  builds data/content-registry.json

audit-content-scaffold.mjs:
  validates ordered folders
  validates expected counts
  validates metadata shape
  validates replacement-only chapter behavior
  validates registry/content agreement
```

Do not casually edit scripts. Script changes can affect generated data and audit behavior.

---

## 18. Current committed checkpoints

Known committed project states:

```text
Complete Slice 1 content scaffold checkpoint
Add content authoring templates
Create syllabus mapping placeholder files
Add status reference maps and close Slice 1 foundation
```

Use GitHub Desktop to compare future changes against these commits if rollback or review is needed.

---

## 19. Current next safe step

Slice 1 is closed.

Recommended next architecture slice:

```text
Architecture Slice 2: First real content authoring workflow
```

Suggested focus:

```text
one chapter or one lecture only
probably Chemical Bonding Lecture 01
define how raw lecture/source material becomes safe student-facing content
do not build the full app yet
```

Do not begin Slice 2 until the user deliberately approves the next slice.
