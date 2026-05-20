# ChemDesk Future Ideas / Product Backlog

This document stores future ideas that are important but not part of the current implementation slice.

Rule:
Do not implement anything from this file until Sia promotes it into a formal Codex task.

---

## Status labels

- `idea` — captured for later
- `needs decision` — user/product decision needed
- `needs research` — source, cost, technical, or legal research needed
- `approved later` — agreed direction, not current task
- `blocked` — should not proceed yet
- `promoted` — moved into an active Codex task

---

## 1. AI chatbot / student question assistant

Status: `approved later`

Idea:
Add an AI chatbot later so students can ask their own Chemistry questions.

Architecture notes:

- Do not implement public chatbot in v1.
- Public AI must retrieve only approved/published content.
- Draft, raw, CEE notes, source-review notes, and unapproved content must not be used in public RAG.
- Start with structured notes and Pagefind/static search first.
- Add internal RAG testing before public chatbot.
- Add usage limits before public release.

Possible monetization:

- Free users: limited quota.
- Paid users: higher quota, saved chats, weak-topic diagnosis, personalized revision support.

Risks:

- API cost can grow quickly if unlimited.
- Wrong answers can damage trust.
- RAG must be grounded only in approved ChemDesk content.

Decision needed later:

- Free-limited, paid-only, or mixed model?
- Which model/provider?
- Daily/monthly usage limits?
- Whether saved chat history requires login.

---

## 2. No downloadable PDFs for lectures/notes

Status: `approved later`

Idea:
Keep lectures/notes visible on the page only. Do not provide downloadable PDFs.

Architecture notes:

- Do not create PDF generation pipeline.
- Do not create PDF routes.
- Do not add “Download PDF” buttons.
- Notes should render as web pages from Markdown/MDX.
- Browser print/save/screenshot cannot be fully prevented.

Implementation stage:

- Add this rule when Astro/MDX page templates are created.

Decision needed later:

- Should print styling be neutral, discouraged, or blocked as much as practical?
- Should premium revision packs/PDFs be allowed much later as separate products?

---

## 3. Image size and asset bloat control

Status: `needs policy`

Idea:
Prevent the site from becoming heavy due to diagrams and lecture images.

Architecture notes:

- Every chapter and lecture can have its own `images/` folder.
- Published raster images should be compressed.
- Prefer SVG for original line diagrams.
- Prefer WebP for raster images.
- Avoid raw lecture screenshots in public content.
- Raw/source images should not be public unless reviewed.
- Every published image needs metadata and alt text later.

Possible future folder pattern:

```text
images/
  raw/
  published/
  image.meta.json
```
