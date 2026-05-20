# Manual Content Update Rules

Manual content additions are allowed, but only when they preserve ChemDesk’s stable-ID and metadata rules.

## Core rule

Folders may change.
Stable IDs should not.
Metadata is the source of truth.

## When manual additions are allowed

Manual additions are acceptable for:

- adding a small number of new lecture folders
- adding replacement-source lecture scaffolds after source review
- adding images inside an existing lecture or chapter folder
- adding placeholder metadata when following the approved template

Manual additions are not recommended for:

- large chapter migrations
- renaming existing folders after real content exists
- changing stable IDs
- moving notes/images across chapters
- replacing many lectures at once

Large updates should use a migration or scaffold script.

## Manual lecture-add checklist

For every manually added lecture folder:

- Folder name starts with `lecture-01-`, `lecture-02-`, etc.
- Folder is placed under the correct ordered chapter folder.
- Folder contains `images/.gitkeep`.
- Folder contains `lecture.meta.json`.
- `lecture_id` is stable and unique.
- `chapter_id` matches the chapter’s `chapter.meta.json`.
- `category_id` matches the category.
- `category_folder` matches the ordered category folder.
- `chapter_folder` matches the ordered chapter folder.
- `canonical_path` matches the actual folder path.
- `source_plan_status` explains whether this is current, updated, or JEE Wallah replacement.
- `status` is `raw` or `draft`, not `approved` or `published`.
- `source_status` is `needs_review`.
- `copyright_review_status` is `needs_review`.

## Manual JEE Wallah replacement rule

For replacement-only chapters such as:

- `p-block-elements`
- `d-and-f-block-elements`
- `coordination-compounds`

lecture folders may be added later under:

```text
content/02-inorganic/<ordered-chapter-folder>/lectures/
```
