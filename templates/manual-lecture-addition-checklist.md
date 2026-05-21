# Manual Lecture Addition Checklist

Use this checklist before manually adding a lecture folder.

Manual additions are allowed only when they preserve ChemDesk’s stable-ID and metadata rules.

---

## Before adding

Confirm:

- The target category folder exists.
- The target chapter folder exists.
- The target chapter has a valid `chapter.meta.json`.
- The lecture source/title/list has been decided.
- This is a small/manual addition, not a large migration.
- If this is a JEE Wallah replacement lecture, the source has been identified for later Source Research review.

---

## Required folder structure

Each manually added lecture must follow this pattern:

```text
content/<ordered-category-folder>/<ordered-chapter-folder>/lectures/
  lecture-XX-slugified-title/
    README.md
    lecture.meta.json
    images/
      .gitkeep
```

Example:

content/02-inorganic/02-p-block-elements/lectures/
lecture-01-jee-wallah-topic-title/
README.md
lecture.meta.json
images/
.gitkeep
