# ChemDesk QA Starter Checklist

_Last updated: 2026-05-18_

## Purpose

This file gives Vera, the ChemDesk QA & Release Confidence Agent, a starter checklist.

It is not a substitute for real testing.
It is not a final automated test suite.
It is not an implementation spec.

Vera should use this as the first QA compass for release confidence.

---

## QA Core Promise

```text
Verify before publish.
Test what students actually use.
Catch regressions before they become public.
No draft leakage.
No broken study flow.
```

---

## 1. Release Gate Checks

Before public release, verify:

- validation scripts pass
- build succeeds
- no draft content appears publicly
- no unapproved content appears publicly
- no deprecated public content is linked as current
- no known critical blocker remains unresolved
- user has reviewed and approved release

Release confidence labels:

- `BLOCKED`
- `NEEDS FIXES`
- `READY FOR USER REVIEW`
- `READY TO PUBLISH`

Do not mark `READY TO PUBLISH` before user approval.

---

## 2. Device Layout Checks

Check core pages on:

- mobile
- tablet
- laptop
- desktop

Verify:

- no broken layout
- no unreadable text
- no clipped content
- no critical horizontal scrolling
- navigation remains usable
- cards stack sensibly
- formula blocks fit or scroll intentionally
- tables are mobile-safe
- diagrams remain readable or clearly expandable

---

## 3. Browser Compatibility Checks

Check core flows in:

- Chrome
- Safari
- Firefox
- Edge

Verify:

- layout consistency
- navigation behaviour
- accordion behaviour
- MathJax rendering
- table wrappers
- focus states
- page load behaviour
- no browser-specific broken styling

---

## 4. Navigation Checks

Verify students can answer:

- Where am I?
- Which exam/chapter/topic is this?
- How do I go back?
- What related concepts are nearby?
- What should I revise next?
- Can I reach search or index pages easily?

Check:

- header navigation
- mobile navigation
- breadcrumbs, if present
- chapter/topic links
- related concept links
- internal anchors
- back-to-index paths
- active states

---

## 5. Chemistry Rendering Checks

For Chemistry pages, verify:

- formulas render correctly
- reactions render correctly
- MathJax does not break page layout
- MathJax works inside accordions
- tables remain usable on small screens
- diagrams have useful alt text
- diagram labels are readable on mobile
- formula/reaction boxes are distinguishable from normal prose
- trap/quick-method/revision boxes are visually clear
- no important study content is hidden too deeply

Vera does not decide whether the Chemistry itself is correct. CEE owns Chemistry truth.

---

## 6. Accordion and Interaction Checks

Verify:

- accordions open and close reliably
- nested accordions remain understandable
- keyboard users can operate accordions
- focus order is logical
- state is visually clear
- important content is not unnecessarily hidden
- animations are not distracting
- reduced-motion preferences are respected where applicable

---

## 7. Accessibility Checks

Verify:

- sufficient contrast
- readable font sizes
- semantic heading order
- visible focus states
- keyboard navigation
- clear link styles
- no colour-only meaning
- meaningful alt text expectations for diagrams
- form/search controls are labelled, if present
- tap targets are comfortable
- reduced-motion friendliness

---

## 8. Link and Anchor Checks

Verify:

- no broken internal links
- no broken lecture links
- no broken image links
- no broken internal anchors
- no links to draft-only pages from public pages
- external links open/behave as expected
- source links are not falsely marked verified

Source Research owns source verification. Vera checks whether links behave and whether unsafe/draft exposure exists.

---

## 9. Search and Public Indexing Checks

For Pagefind/static search readiness, verify:

- only public approved/published content is indexed
- draft/internal content is excluded
- search results are useful and not cluttered
- titles and descriptions are readable
- search does not reveal private workflow files
- no source-risk or unapproved content appears in public search

---

## 10. Performance and Asset Checks

Verify:

- pages load reasonably
- images are not unnecessarily heavy
- diagrams are optimized for web
- no giant unused assets are shipped
- scripts are not excessive
- interaction remains smooth on mobile
- no avoidable layout shift harms reading

---

## 11. PWA/App-Readiness Checks

Vera should check, when relevant:

- mobile usability
- touch-friendly UI
- predictable routes
- reusable content behaviour
- no desktop-only interactions
- no hover-only core flows
- no content trapped in fragile visual hacks
- future offline/app shell is not blocked by UI decisions

Sia owns app-readiness structure. Navi owns app-like usability. Vera verifies behaviour.

---

## 12. Validation Report Expectations

When Codex provides validation output, Vera should check for:

- duplicate IDs
- missing IDs
- invalid ID formats
- missing metadata
- broken links
- invalid timestamps
- missing alt text
- draft content exposure
- unapproved source exposure
- missing relationship targets
- MathJax/render-risk warnings
- mobile table warnings
- build errors

Validation errors should not be waved away without a clear reason.

---

## 13. Regression Checks

After Codex changes, verify that previous working behaviour still works:

- navigation
- responsive layout
- accordions
- MathJax
- tables
- links
- search indexing
- draft/public separation
- build and validation commands

---

## 14. QA Report Template

Vera should report like this:

```md
## Release Confidence Status

BLOCKED / NEEDS FIXES / READY FOR USER REVIEW / READY TO PUBLISH

## What passed

...

## Blockers

...

## Non-blocking issues

...

## Risks

...

## What Codex should fix

...

## What Sia/Navi/CEE/Source Research should review

...

## User decision needed

Yes/No
```

---

## 15. Non-Negotiables

- No publish without validation.
- No public draft leakage.
- No Chemistry page that only works on desktop.
- No unreadable formulas or tables on mobile.
- No broken core navigation.
- No ignored accessibility blockers.
- No link-check failures left unexplained.
- No QA redesigning the product.
