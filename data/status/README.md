# ChemDesk Status Reference Maps

This folder stores controlled status labels for ChemDesk metadata.

These files prevent inconsistent status naming across chapters, lectures, source review, copyright review, transcript work, concept mapping, syllabus mapping, and future publishing.

---

## Why this exists

ChemDesk metadata appears in:

```text
content/**/chapter.meta.json
content/**/lecture.meta.json
data/content-registry.json
data/syllabus/*.json
future concept maps
future RAG indexes
future app/user progress systems
```

If status labels are inconsistent, validation, search, RAG filtering, publishing, and QA become unreliable.

---

## Core rule

Use controlled status values.

Do not invent new status labels casually.

If a new status is needed, add it here first and document why.

---

## Files

```text
content-status.json
review-status.json
source-status.json
copyright-review-status.json
workflow-status.json
status-map-template.json
```

---

## Current usage

Chapter metadata currently uses fields such as:

```text
status
source_status
review_status
```

Lecture metadata currently uses fields such as:

```text
status
source_status
transcript_status
timestamp_map_status
concept_map_status
copyright_review_status
```

Syllabus maps currently use fields such as:

```text
status
source_status
review_status
mapping_status
mapping_confidence
```

---

## Public/RAG safety rule

Only approved and published content may ever become eligible for public RAG.

Draft, raw, needs-review, source-review, and copyright-review content must not be retrieved by public AI features.

---

## Editing rule

Do not rename existing status IDs after they are used in metadata.

If a status must be retired, mark it deprecated instead of deleting it.
