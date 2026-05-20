# ChemDesk Change Management

ChemDesk content will evolve. Folders, metadata, sources, syllabus mappings, and generated registries may change over time.

This document defines how changes must be tracked so the project remains maintainable, searchable, RAG-ready, app-ready, and safe for future personalization.

---

## Core rule

Folders may evolve.

Stable IDs should not.

Metadata is the source of truth.

Generated files must be reproducible.

---

## What counts as a tracked change?

Create a change-management entry whenever any of these change:

- new category
- new chapter
- new lecture
- renamed folder
- moved folder
- changed `category_id`
- changed `chapter_id`
- changed `lecture_id`
- changed source URL
- changed playlist URL
- changed `Source Plan Status`
- added JEE Wallah replacement lectures
- changed syllabus mapping
- changed review/source/copyright status
- deleted or archived content
- regenerated `data/content-registry.json`

---

## Generated files

The following file is generated and should not be manually edited:

```text
data/content-registry.json
