# ChemDesk Project Structure Manual

**Purpose:** This manual explains what each major folder/file area in the current ChemDesk workspace is for, what is safe to edit, what should not be edited casually, and how future changes should be handled.

**Current phase:** Architecture Slice 1 — content scaffold foundation.

ChemDesk is not yet an Astro app. It is not yet a finished student-facing website. The current workspace is a structured foundation for future Chemistry content, search, RAG, app/PWA support, personalization, and validation-safe publishing.

---

## 1. Core mental model

ChemDesk currently has three kinds of project material:

1. **Project governance and planning material** — mainly under `artifacts/` and `docs/`.
2. **Chemistry content scaffold** — under `content/`.
3. **Generated or machine-readable project indexes** — under `data/`.

The most important rule is:

```text
Folders are for humans.
Metadata is for machines.
Generated registry files are derived from metadata.
```

A simpler version:

```text
Do not treat folder names as the permanent identity.
Stable IDs inside metadata are the permanent identity.
```

Example:

```text
Folder:
content/01-physical/03-chemical-bonding-and-molecular-structure

Stable IDs:
category_id = physical
chapter_id = chemical-bonding-and-molecular-structure
```

The `01-` and `03-` prefixes are display/order helpers. They are not the identity.

---

## 2. Current top-level workspace

The current workspace contains these major areas:

```text
archive/
artifacts/
assets/
content/
data/
docs/
scripts/
```

Not all of these are equally important at the current phase. The most important current areas are:

```text
content/
data/
docs/
scripts/
artifacts/source-files/
```

---

## 3. `archive/`

### Purpose

`archive/` stores old or inactive material that may still be useful for reference.

Current examples:

```text
archive/
  generated-scripts-old/
  README.md
```

### What belongs here

- old generated scripts
- abandoned attempts
- previous versions kept for safety
- historical files that should not drive current behavior

### Safe to edit?

Mostly yes, but avoid deleting unless you are certain it is no longer needed.

### Do not

Do not make active workflow depend on anything inside `archive/`.

---

## 4. `artifacts/`

### Purpose

`artifacts/` is the internal project knowledge vault. It contains planning files, agent instructions, source files, decision records, drafts, old zips, and reference material.

It is not the live student-facing content folder.

Current examples include:

```text
artifacts/
  agents/
  decisions/
  docs/
  master-context/
  source-files/
  workflows/
  chemdesk_master_spec.md
  chemdesk_master_context_sync.md
```

### Safe to edit?

Safe for documentation updates, but use care. Many files here define project roles and long-term architecture.

---

## 5. `artifacts/agents/`

### Purpose

This folder stores the agent role specifications.

Current agent areas include:

```text
artifacts/agents/sia/
artifacts/agents/cee/
artifacts/agents/ira/
artifacts/agents/navi/
artifacts/agents/vera/
artifacts/agents/anya/
```

### Agent responsibilities

```text
Sia  = System Intelligence Architect
CEE  = Chemistry correctness
Ira  = source/copyright/source verification
Navi = UI/UX design direction
Vera = QA/release confidence
Anya = student voice/editorial tone
```

### What this means practically

These files explain who owns which decision.

For example:

- Sia can decide folder structure, metadata, schemas, validation workflows.
- CEE owns Chemistry correctness.
- Ira owns source/copyright verification.
- Navi owns final UI/UX direction.
- Vera owns QA and release confidence.

### Safe to edit?

Only when intentionally updating agent instructions.

### Do not

Do not casually rewrite agent roles, because that can blur ownership.

---

## 6. `artifacts/decisions/`

### Purpose

This stores architecture decisions and ADRs.

Current examples:

```text
artifacts/decisions/
  adr_slice_1_foundation_skeleton.md
  architecture_decisions.md
  README.md
```

### What belongs here

- why a structure was chosen
- what tradeoffs were accepted
- what was decided for a slice
- historical decision notes

### Safe to edit?

Yes, but prefer adding new notes instead of rewriting history.

### Good rule

```text
Add new decisions.
Do not erase old decisions unless clearly marked obsolete.
```

---

## 7. `artifacts/source-files/`

### Purpose

This stores original/reference source material.

Current examples:

```text
artifacts/source-files/
  chapter-drafts/
  old/
  spreadsheets/
  syllabus-pdfs/
```

Important examples:

```text
artifacts/source-files/spreadsheets/chemdesk_chemistry_lecture_master_UPDATED_SYNCED.xlsx
artifacts/source-files/syllabus-pdfs/JeeMains_2026.pdf
```

### What belongs here

- master lecture spreadsheets
- old source spreadsheets
- syllabus PDFs
- chapter drafts
- non-public reference material

### Important distinction

This is **not** the published content structure.

The relationship is:

```text
artifacts/source-files/  = source/reference/planning files
content/                 = structured content scaffold generated from source plans
```

### Safe to edit?

Carefully.

Changing source spreadsheets can later affect folder generation, metadata, registry data, or syllabus mappings.

---

## 8. `assets/`

### Purpose

`assets/` currently stores static frontend assets.

Current examples:

```text
assets/
  css/
    base.css
    components.css
    layout.css
    main.css
    reset.css
    tokens.css
    utilities.css
  js/
    app.js
```

### Current status

This is not yet the formal Astro frontend. Treat it as current/static/legacy frontend asset space until the Astro app is intentionally introduced.

### Safe to edit?

Only if working on the current static frontend.

### Do not

Do not assume this is the final frontend architecture.

When Astro is introduced later, some styling/scripts may move or be reorganized.

---

## 9. `content/`

### Purpose

`content/` is the most important current folder. It is the Chemistry content scaffold.

It currently holds the ordered category/chapter/lecture hierarchy.

Current main structure:

```text
content/
  01-physical/
  02-inorganic/
  03-organic/
  04-practical/
```

### Why the category folders are numbered

The numbers preserve the order you expect to see:

```text
01 = Physical Chemistry
02 = Inorganic Chemistry
03 = Organic Chemistry
04 = Practical Chemistry
```

The number is only a display/order prefix.

Stable category IDs remain:

```text
physical
inorganic
organic
practical
```

### Safe to edit?

Content folder edits are more sensitive than documentation edits.

Safe:

- editing README files
- adding images into the correct `images/` folder later
- adding new lecture folders only with checklist

Risky:

- renaming category folders
- renaming chapter folders
- renaming lecture folders
- changing metadata IDs
- deleting metadata
- editing generated registry instead of metadata

---

## 10. Anatomy of a category folder

Example:

```text
content/01-physical/
  01-some-basic-concepts-in-chemistry/
  02-atomic-structure/
  03-chemical-bonding-and-molecular-structure/
  ...
  README.md
```

### What it means

A category folder groups chapters by broad Chemistry category.

### `README.md`

The category `README.md` is a human explanation. It is safe to edit.

### Do not

Do not rename the category folder casually. If it changes, metadata and registry generation must be updated accordingly.

---

## 11. Anatomy of a chapter folder

Example:

```text
content/01-physical/03-chemical-bonding-and-molecular-structure/
  chapter.meta.json
  images/
  lectures/
  README.md
```

A chapter folder contains:

1. `README.md`
2. `chapter.meta.json`
3. `images/`
4. optionally `lectures/`

---

## 12. `chapter.meta.json`

### Purpose

`chapter.meta.json` is machine-readable metadata for a chapter.

It is one of the core source-of-truth files.

It may contain fields such as:

```text
category_order
category_order_text
category_id
category_folder
category_title
chapter_order
chapter_order_text
chapter_id
chapter_folder
title
canonical_path
status
source_status
review_status
source_plan_mode
source_plan_statuses
planned_lecture_count
current_playlist_urls
jee_syllabus_units
recommended_source_urls
exam_scope
```

### Why it exists

Future systems should not guess what a chapter is from the folder name alone. They should read metadata.

### Safe to edit?

Carefully.

Generally safe:

- source notes
- review status fields
- syllabus mapping fields when intentionally updated
- source URLs after verification

Risky:

- `category_id`
- `chapter_id`
- `chapter_folder`
- `canonical_path`
- order fields

### Rule

```text
If a folder path changes, metadata must be updated.
If metadata changes structurally, regenerate the registry.
```

---

## 13. Chapter `images/`

### Purpose

Chapter-level images go here.

Examples later:

```text
content/01-physical/03-chemical-bonding-and-molecular-structure/images/
```

Use this folder for images that apply to the whole chapter, such as:

- chapter overview diagrams
- summary charts
- broad concept maps

### Current status

These folders may contain only `.gitkeep`.

`.gitkeep` is a placeholder that allows Git to track an otherwise empty folder.

### Safe to edit?

Later, yes, images can be added here.

### Do not

Do not dump all images globally into one folder. Keep images near the chapter or lecture where they belong.

---

## 14. `lectures/`

### Purpose

`lectures/` contains individual lecture folders under a chapter.

Example:

```text
content/01-physical/03-chemical-bonding-and-molecular-structure/lectures/
  lecture-01-intro-to-chemical-bonds/
  lecture-02-ionic-bonds/
  lecture-03-lattice-energy-and-born-haber-cycle/
```

### Why lecture folders are numbered

Lecture folders use:

```text
lecture-01-
lecture-02-
lecture-03-
```

This preserves lecture order.

### Safe to edit?

Adding new lecture folders is allowed only with the manual checklist.

Renaming existing lecture folders is risky once content exists.

---

## 15. Anatomy of a lecture folder

Example:

```text
lecture-01-intro-to-chemical-bonds/
  images/
  lecture.meta.json
  README.md
```

A lecture folder contains:

1. `README.md`
2. `lecture.meta.json`
3. `images/`

---

## 16. `lecture.meta.json`

### Purpose

`lecture.meta.json` is machine-readable metadata for one lecture.

It may include:

```text
lecture_id
category_id
category_folder
chapter_id
chapter_folder
lecture_number
lecture_number_text
title
folder
canonical_path
current_youtube_url
current_playlist_urls
mynotes_url
mynotes_old_url
jee_syllabus_unit
source_plan_status
recommended_primary_source
recommended_source_url
status
source_status
transcript_status
timestamp_map_status
concept_map_status
copyright_review_status
```

### Why it exists

It lets future systems know:

- which lecture this is
- where it belongs
- what source it came from
- what syllabus unit it maps to
- whether it is reviewed
- whether it is safe for future RAG/search/publishing

### Safe to edit?

Carefully.

Safe with intent:

- source URLs
- source plan notes
- review statuses
- syllabus mapping fields

Risky:

- `lecture_id`
- `category_id`
- `chapter_id`
- `canonical_path`
- `folder`
- `lecture_number`

### Important rule

Do not mark content as:

```text
approved
published
```

until the proper review workflow exists.

---

## 17. Lecture `images/`

### Purpose

Lecture-specific images go here.

Example:

```text
content/01-physical/03-chemical-bonding-and-molecular-structure/
  lectures/
    lecture-01-intro-to-chemical-bonds/
      images/
```

Use this for:

- diagrams used only in that lecture
- mechanism sketches
- screenshots or extracted visuals, if source-safe
- lecture-specific figures

### Current status

Most image folders are placeholders only.

### Future image rule

Later, we should prefer:

```text
SVG for clean diagrams
WebP for compressed raster images
no huge uncompressed image dumps
alt text metadata before publishing
```

---

## 18. `.gitkeep`

### Purpose

Git does not track empty folders.

So an empty folder like:

```text
images/
```

would disappear from Git unless it has a placeholder file.

`.gitkeep` is that placeholder.

Example:

```text
images/
  .gitkeep
```

### Does `.gitkeep` do anything in the website?

No. It is just a repository placeholder.

### Can it be removed?

Later, if real images are added, `.gitkeep` can stay or be removed. It does not matter much.

---

## 19. Replacement-only chapters

These chapters currently do not have lecture folders:

```text
content/02-inorganic/02-p-block-elements
content/02-inorganic/03-d-and-f-block-elements
content/02-inorganic/04-coordination-compounds
```

### Why

The Master Lectures source marked them as needing replacement/standardization to JEE Wallah.

So the scaffold intentionally created only:

```text
chapter.meta.json
images/
README.md
```

and skipped the old lecture subtopics.

### Future update

Later, once the replacement source list is finalized, lecture folders can be added manually or by script.

Example future structure:

```text
content/02-inorganic/02-p-block-elements/
  lectures/
    README.md
    lecture-01-jee-wallah-topic-title/
      README.md
      lecture.meta.json
      images/
        .gitkeep
```

### Safe to manually add later?

Yes, but only with the manual lecture checklist and after source verification.

---

## 20. Chemical Bonding placement

Current correct location:

```text
content/01-physical/03-chemical-bonding-and-molecular-structure
```

### Why

The Master Lectures hierarchy places Chemical Bonding under Physical Chemistry, and the scaffold follows that hierarchy.

This is intentional.

### Do not move it

Do not move Chemical Bonding to Inorganic without a formal decision and migration.

---

## 21. `data/`

### Purpose

`data/` holds structured machine-readable project data.

Current important files may include:

```text
data/content-registry.json
data/registry-generation-notes.md
master-lectures.tsv
```

---

## 22. `data/content-registry.json`

### Purpose

This is a generated table of contents.

It maps stable IDs to current paths.

It is generated from:

```text
content/**/chapter.meta.json
content/**/lecture.meta.json
```

### What it contains

It should contain:

```text
categories
chapters
lectures
stable IDs
canonical paths
metadata paths
source-plan fields
syllabus mapping fields
counts
```

### Critical rule

Do not manually edit:

```text
data/content-registry.json
```

Instead:

1. Edit the relevant source metadata.
2. Regenerate the registry.

Command:

```bash
node scripts/generate-content-registry.mjs
```

### Why

The registry reflects the content. It should not become a separate competing source of truth.

---

## 23. `data/registry-generation-notes.md`

### Purpose

This explains how the registry is generated and when to regenerate it.

### Safe to edit?

Yes. It is documentation.

---

## 24. `docs/`

### Purpose

`docs/` should be the human control center for project operation.

Important docs may include:

```text
docs/change-management.md
docs/manual-content-update-rules.md
docs/current-project-checkpoint.md
docs/future-ideas.md
docs/project-structure-manual.md
```

### Safe to edit?

Yes. This is the safest area to edit.

If you feel lost, add documentation here rather than changing scripts or metadata.

---

## 25. `docs/change-management.md`

### Purpose

This records important structural changes.

Use it when:

- folders are renamed
- chapters are added
- lectures are added
- registry is regenerated
- source plan changes
- JEE Wallah replacement lectures are added
- syllabus mappings change

### Good entry format

```md
## YYYY-MM-DD — Short title

Changed:
- ...

Regenerated:
- ...

Verified:
- ...

Notes:
- ...
```

---

## 26. `docs/manual-content-update-rules.md`

### Purpose

This explains how manual changes are allowed.

Use it when manually adding:

- lecture folders
- lecture metadata
- images
- replacement-source scaffolds

### Key rule

Manual is allowed, but must preserve:

```text
stable IDs
metadata completeness
correct folder location
registry regeneration
```

---

## 27. `docs/current-project-checkpoint.md`

### Purpose

This should be the “where are we now?” document.

It should include:

- current phase
- current expected counts
- current content structure
- what is generated
- what is safe to edit
- what not to edit
- commands to run after changes

### Recommended current checkpoint

```text
Current phase:
Architecture Slice 1 — content scaffold foundation

Expected:
4 categories
25 chapters
242 lectures
267 images/.gitkeep placeholders
```

---

## 28. `scripts/`

### Purpose

`scripts/` contains automation utilities.

Current important script:

```text
scripts/generate-content-registry.mjs
```

Future possible script:

```text
scripts/audit-content-scaffold.mjs
```

### Safe to edit?

Not casually.

Scripts can affect or validate many files. Ask before changing them.

---

## 29. `scripts/generate-content-registry.mjs`

### Purpose

This reads:

```text
content/**/chapter.meta.json
content/**/lecture.meta.json
```

and writes:

```text
data/content-registry.json
```

### When to run

Run it after:

- adding a lecture
- adding a chapter
- changing metadata
- moving or renaming folders
- changing source URLs
- changing syllabus mappings
- adding JEE Wallah replacements

Command:

```bash
node scripts/generate-content-registry.mjs
```

### What not to do

Do not modify this script unless the registry rules need to change.

---

## 30. `scripts/audit-content-scaffold.mjs`

### Current status

This may not exist yet, or an older version may exist.

It should eventually validate:

```text
4 category folders
25 chapter metadata files
242 lecture metadata files
267 image placeholders
Chemical Bonding in Physical Chemistry
replacement-only chapters have no lectures
no legacy unprefixed folders
metadata paths match actual paths
```

### Why we paused it

We paused because the project was starting to feel too mechanical. The manual and checkpoint should come first.

---

## 31. Source of truth hierarchy

This is the project’s truth model:

```text
1. Planning/source files
   artifacts/source-files/

2. Content metadata
   content/**/chapter.meta.json
   content/**/lecture.meta.json

3. Generated registry
   data/content-registry.json

4. Future website/search/RAG/app
   built later from registry and approved content
```

The most important current source of truth for the scaffold is:

```text
content/**/chapter.meta.json
content/**/lecture.meta.json
```

---

## 32. Safe manual edits

### Safe

You can freely edit:

```text
docs/*.md
README.md files
artifacts/decisions/*.md
artifacts/workflows/*.md
```

### Usually safe

You can add:

```text
notes to README files
documentation clarifications
future ideas
change-management notes
```

### Safe with checklist

You can add:

```text
new lecture folders
new lecture.meta.json files
new images inside correct images folders
```

only when following the manual update rules.

---

## 33. Risky manual edits

Avoid doing these without review:

```text
renaming content folders
moving folders
changing category_id
changing chapter_id
changing lecture_id
editing canonical_path
deleting metadata files
editing data/content-registry.json manually
marking content approved
marking content published
```

---

## 34. What to do after common changes

### If you edit docs only

No script needed.

### If you edit README only

Usually no script needed.

### If you add an image

No registry update needed yet, unless image metadata is introduced later.

### If you add a lecture folder

You must add:

```text
README.md
lecture.meta.json
images/.gitkeep
```

Then run:

```bash
node scripts/generate-content-registry.mjs
```

### If you change metadata

Run:

```bash
node scripts/generate-content-registry.mjs
```

### If you rename a folder

Update matching metadata first, then run:

```bash
node scripts/generate-content-registry.mjs
```

Also add a note to:

```text
docs/change-management.md
```

---

## 35. Current expected verification commands

From repo root:

```bash
find content -maxdepth 1 -type d | sort
```

Expected:

```text
content
content/01-physical
content/02-inorganic
content/03-organic
content/04-practical
```

Count chapter metadata:

```bash
find content -name "chapter.meta.json" | wc -l
```

Expected:

```text
25
```

Count lecture metadata:

```bash
find content -name "lecture.meta.json" | wc -l
```

Expected:

```text
242
```

Count image placeholders:

```bash
find content -path "*/images/.gitkeep" | wc -l
```

Expected:

```text
267
```

Regenerate registry:

```bash
node scripts/generate-content-registry.mjs
```

Expected summary:

```text
Categories: 4
Chapters: 25
Lectures: 242
PASS
```

---

## 36. Current special paths

### Chemical Bonding

```text
content/01-physical/03-chemical-bonding-and-molecular-structure
```

### Replacement-only chapters

```text
content/02-inorganic/02-p-block-elements
content/02-inorganic/03-d-and-f-block-elements
content/02-inorganic/04-coordination-compounds
```

### Ordered category folders

```text
content/01-physical
content/02-inorganic
content/03-organic
content/04-practical
```

---

## 37. Future JEE Wallah replacement update

When replacement source lists are finalized, the currently replacement-only chapters may receive lecture folders.

Do not add them casually from old source rows.

The future process should be:

```text
1. Finalize replacement source list.
2. Decide lecture titles/order.
3. Create lecture folders.
4. Add lecture.meta.json for each.
5. Keep status as raw/draft.
6. Keep source_status as needs_review.
7. Regenerate content-registry.json.
8. Add change-management entry.
9. Run audit when available.
```

---

## 38. Future Astro/UI relationship

Astro is not set up yet.

When Astro is introduced, it should read from:

```text
content/
data/content-registry.json
```

It should not require restructuring the content folders.

Future website pages may use routes like:

```text
/chemistry/physical/chemical-bonding-and-molecular-structure/
/chemistry/physical/chemical-bonding-and-molecular-structure/lecture-01/
```

But route design is not final yet.

---

## 39. Future search/RAG relationship

Public search and RAG must use only approved/published content later.

Current metadata statuses help prepare for this.

Important future rule:

```text
Public RAG must not retrieve raw/draft/unreviewed content.
```

Right now, most content is scaffold-only and should not be treated as published.

---

## 40. Future PDF rule

Current architecture does not create PDFs.

Lecture pages should be visible on-page later, not offered as downloadable PDFs unless a future product decision changes that.

Current rule:

```text
No PDF generation pipeline.
No PDF download buttons.
No downloadable notes yet.
```

---

## 41. Future image-size rule

Images will eventually need a policy.

Recommended future rules:

```text
Prefer SVG for diagrams.
Prefer WebP for raster images.
Avoid huge uncompressed PNG/JPEG dumps.
Keep images beside the relevant chapter/lecture.
Add alt text before publishing.
```

---

## 42. The one-page rule for you

When unsure, use this:

```text
Safe:
- edit docs
- edit README notes
- add future ideas

Careful:
- edit metadata
- add lectures
- add source URLs

Do not casually:
- rename folders
- change IDs
- edit generated registry
- mark content published
```

If you make a content structure change:

```text
Update metadata.
Regenerate registry.
Record change.
```

---

## 43. Current project state summary

ChemDesk currently has:

```text
ordered content scaffold
metadata-rich chapter files
metadata-rich lecture files
image placeholder folders
replacement-only chapter placeholders
generated content registry
source/planning artifacts
agent governance docs
```

ChemDesk does not yet have:

```text
Astro app
student-facing note pages
public search
RAG/chatbot
login
bookmarks
progress tracking
published Chemistry content
PDF downloads
```

That is expected.

The current foundation is meant to keep future work organized and safe.
