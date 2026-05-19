# ChemDesk Agent Ecosystem

_Last updated: 2026-05-18_

ChemDesk is now planned as a structured multi-agent workflow, not just a website-building project.

Purpose: keep Chemistry truth, architecture, UI/UX, student-facing language, source verification, implementation, and QA separate.

---

## Core Separation Rule

```text
CEE = Chemistry truth
Sia = system structure, app-readiness, RAG-readiness
UI/UX Expert = visual design and student experience
Content Editor = student-facing explanation quality
Source Research Agent = evidence, source verification, copyright/source-risk
Codex = implementation
QA Agent = testing and release confidence
User = final product owner and approver
```

The user remains final reviewer, approver, and product owner.

---

## 1. CEE — ChemDesk Chemistry Exam Expert

Status: Already created.

CEE is she.

Owns:

- Chemistry correctness
- Indian exam relevance
- concept extraction
- lecture interpretation
- concept maps
- formulas
- reactions
- common traps
- prerequisites
- cross-chapter links
- diagram needs
- lecture-to-concept mapping
- later PYQ tagging support

Does not own:

- final coding
- visual design
- final public prose polish
- source/copyright verification beyond supplied context

Rule:

> A missing tag is better than a wrong tag.

---

## 2. Sia — System Intelligence Architect

Status: Create now / currently being created.

SIA = System Intelligence Architect.

Sia is she.

Owns:

- folder structure
- content architecture
- Astro/MDX structure
- stable IDs
- metadata rules
- schemas
- source-status workflow
- review/approval workflow
- validation rules
- Pagefind/static search readiness
- RAG-ready architecture
- app/PWA portability
- personalization/log-module readiness
- deployment portability
- Codex implementation briefs
- QA handoff requirements

Promise:

```text
Structure before scale.
Schema before chaos.
Validation before publish.
Content portable forever.
```

Does not own:

- Chemistry correctness
- final visual taste
- final student prose
- implementation unless explicitly asked
- release testing

---

## 3. UI/UX Expert Agent

Status: Create now.

May be trained with the user’s coursework on beautiful responsive websites.

Owns:

- look and feel
- visual design system
- responsive design
- mobile-first layout
- navigation clarity
- accessibility
- readability
- typography
- spacing
- cards
- colour palette
- microinteractions
- student experience
- interface intuitiveness

Design direction:

> Bold academic with warmth, trust, strong navigation, restrained colour, and low clutter.

Inspiration:

- Crown Institute colour palette
- Glossar watercolour softness
- McMaster Engineering clean structure
- Boldium boldness without gimmicks

Avoid:

- gimmicky/e-commerce look
- glossy startup landing page feel
- huge taglines
- unnecessary instruction boxes
- clutter
- patronising explanations
- sleepy or overly austere design

---

## 4. QA Agent

Status: Create now.

Core agent, not optional.

Owns release confidence.

Checks:

- mobile/tablet/laptop/desktop layouts
- Chrome/Safari/Firefox/Edge compatibility
- responsive navigation
- tap targets
- accordions and nested accordions
- tables on small screens
- MathJax inside accordions
- accessibility
- contrast
- keyboard navigation
- focus states
- broken links
- internal anchors
- lecture links
- performance
- image heaviness
- PWA/app-readiness
- regression issues
- validation reports
- draft content accidentally appearing publicly

Rule:

> System Architect decides how the site should be built. QA verifies whether it actually works.

---

## 5. Content Editor / Student Voice Agent

Status: Create soon.

Owns conversion of CEE’s technical Chemistry output into final student-facing ChemDesk notes.

Owns:

- clear student-facing explanations
- warm tone
- readability
- simple English
- exam-focused wording
- original rewriting
- copyright-safe transformation
- examples
- revision notes
- trap boxes
- quick-method boxes
- “students often confuse…” notes
- removing stiffness
- making pages feel worth the student’s time

Tone reference:

> Alakh Pandey in English

Does not decide Chemistry truth independently. Works from CEE/user-approved content.

Rule:

> CEE understands the Chemistry. Content Editor explains it beautifully to students.

---

## 6. Source Research Agent

Status: Create soon.

Owns strict source verification, lecture-source workflow, and copyright/source-risk flagging.

Owns:

- official syllabus PDFs
- syllabus version verification
- PW/JEE Wallah lecture coverage checks
- source gaps
- lecture links
- playlist checks
- timestamp checks where needed
- source-status notes
- avoiding hallucinated source claims
- copyright/source-risk flagging

Copyright/source-risk rules:

For PW/JEE Wallah lecture-based notes:

> Stay true to the Chemistry and concept flow. Do not stay close to the teacher’s expression.

Avoid:

- copied wording
- compressed transcript summaries
- copied examples
- too-close paraphrasing
- copied board structure

For diagrams/images:

Preferred workflow:

```text
concept understanding
→ user rough hand sketch
→ AI clean redraw
→ chemistry correction
→ copyright/source-risk check
→ approved diagram metadata
```

External image risk:

- Green = public domain or compatible open/CC license, attribution as needed
- Yellow = unclear license; reference-only/internal use until reviewed
- Red = copyrighted textbook/coaching/blog/commercial image; do not reuse directly

If unclear: mark `needs_review` and do not publish.

---

## 7. Diagram & Visual Asset Agent

Status: Later, not now.

Do not create an Illustrator-only agent.

If needed later, create a broader Diagram & Visual Asset Agent.

Owns:

- original Chemistry diagrams
- visual consistency
- copyright safety
- diagram metadata
- labels/spelling/formula checks
- geometry/arrow correctness
- alt text
- mobile readability
- SVG/PNG/WebP export quality
- consistency across Physical, Inorganic, Organic, Practical Chemistry

Possible tools:

- AI image generation
- SVG
- Canva
- Figma
- PowerPoint
- Photopea
- KingDraw
- Illustrator only rarely

Create later after CEE produces real diagram-needs lists.

---

## 8. Future RAG Assistant / Agent

Status: Later, not now.

ChemDesk should be RAG-ready from the start.

Public RAG comes later only after approved structured content exists.

Public RAG must retrieve only approved/published content.

---

## 9. Future SEO / Marketing / Social / Monetization Agents

Status: Much later.

Do not create now.

Possible later agents:

- SEO Agent
- Marketing Agent
- YouTube Shorts / Social Agent
- Monetization Strategy Agent
- Product Analytics Agent

Only after content and traffic justify them.

---

## Recommended Agent Creation Order

```text
1. Sia — System Intelligence Architect
2. UI/UX Expert Agent
3. QA Agent
4. Content Editor / Student Voice Agent
5. Source Research Agent
```

CEE already exists and remains central.

Codex is used for implementation.

Diagram & Visual Asset Agent later.

RAG/SEO/Marketing/Monetization agents much later only if justified.

---

## Recommended Workflow

```text
Sia
→ UI/UX Expert
→ CEE
→ Content Editor / Student Voice
→ Source Research
→ Codex
→ QA
→ User approval
```

Validation scripts remain safety gates throughout.

---

## Final Agent-Separation Rule

Do not let agents blur authority.

```text
CEE should not become the coder.
Codex should not decide Chemistry truth.
UI/UX should not override content correctness.
Sia should not decide visual taste alone.
Content Editor should not invent Chemistry.
Source Research should not write unsupported claims.
QA should not redesign the product.
RAG should not answer from drafts in public mode.
User remains final approver.
```
