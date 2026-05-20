# ChemDesk Current Project Checkpoint

Last updated: 2026-05-20

## 1. Current phase

ChemDesk is currently in **Architecture Slice 1: content scaffold foundation**.

This means the project has a structured Chemistry content library, metadata placeholders, and a generated registry plan. It is **not yet** the final student-facing app.

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

The current work is about making sure the content structure is stable, ordered, searchable later, and safe to expand.

---

## 2. Current content structure

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

The number prefixes are for **human display order**.

The stable IDs remain unprefixed:

```text
01-physical   → category_id: physical
02-inorganic  → category_id: inorganic
03-organic    → category_id: organic
04-practical  → category_id: practical
```

Do not treat folder prefixes as identity. They are ordering helpers.

---

## 3. Current expected counts

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

## 4. Current special paths

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

## 5. Source of truth

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

The folder tree is important, but metadata is what future scripts, search, RAG, and UI should trust.

---

## 6. Generated files

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

## 7. Safe manual edits

These are generally safe:

```text
docs/*.md
README.md files
artifacts/decisions/*.md
artifacts/workflows/*.md
future ideas/backlog documents
manual notes and project explanations
```

These are documentation or planning files. They do not usually affect the content scaffold or generated registry.

---

## 8. Manual edits that are allowed with checklist

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

Then regenerate the registry:

```bash
node scripts/generate-content-registry.mjs
```

---

## 9. Risky manual edits

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

## 10. Stable ID rule

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

## 11. What to do after content structure changes

If you add, rename, move, or modify content folders or metadata:

1. Regenerate the registry:

```bash
node scripts/generate-content-registry.mjs
```

2. Verify counts:

```bash
find content -name "chapter.meta.json" | wc -l
find content -name "lecture.meta.json" | wc -l
find content -path "*/images/.gitkeep" | wc -l
```

3. Expected current counts:

```text
25
242
267
```

If future JEE Wallah replacement lectures are added, these counts will change. When that happens, update this checkpoint document and `docs/change-management.md`.

---

## 12. What not to do right now

Do not proceed to these until the scaffold and documentation are accepted:

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

These will come later as separate architecture slices.

---

## 13. Current generated/utility scripts

Current important script:

```text
scripts/generate-content-registry.mjs
```

Purpose:

```text
Reads chapter.meta.json and lecture.meta.json
Builds data/content-registry.json
Checks expected category/chapter/lecture counts
Rejects known legacy paths
```

Do not casually edit scripts. Script changes can affect generated data.

---

## 14. Audit script status

The scaffold audit script was discussed as:

```text
scripts/audit-content-scaffold.mjs
```

But this should be paused until the current checkpoint is understood and accepted.

When created later, it should validate:

```text
ordered category folders exist
legacy unprefixed folders do not exist
chapter metadata count is correct
lecture metadata count is correct
images/.gitkeep count is correct
replacement-only chapters have no lectures
Chemical Bonding is under Physical Chemistry
registry and content metadata agree
```

---

## 15. Current manual-control rule

When unsure, use this rule:

```text
Documentation edits are safe.
Content metadata edits need care.
Generated registry should never be edited manually.
Folder renames need a migration note.
Stable IDs should not change.
```

---

## 16. Current next safe step

The next safe step is **not a new feature**.

Recommended next step:

```text
Review this checkpoint.
Confirm it matches the current workspace.
Only then continue to a formal audit script task.
```

The next architecture-safe implementation task, after this checkpoint is accepted, is likely:

```text
Create/update scripts/audit-content-scaffold.mjs for the ordered folder structure.
```
