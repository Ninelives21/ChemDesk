# ChemDesk Master Context Sync

_Last updated: 2026-05-18_

Use this file to restart or sync ChemDesk / Pankusdesk context across chats and agents.

---

## 1. Project Identity

ChemDesk is a clean-start Chemistry-only Indian exam study companion, evolved from the older Pankusdesk prototype.

Chemistry is assumed throughout the site, so homepage/navigation should not repeatedly say “Chemistry.”

Target exams:

1. JEE
2. BITSAT
3. TG EAPCET
4. CBSE
5. TGIPE

The landing page should show five exam tiles/cards for these exams.

---

## 2. Core Product Philosophy

ChemDesk should be:

- student-first
- trust-first
- free-first in v1
- clean and self-explanatory
- warm, approachable, and useful
- built for tired students who want to start studying quickly
- different from cluttered exam/coaching sites

Avoid:

- heavy marketing copy
- large bold taglines
- unnecessary “how to use this site” boxes
- gimmicky/e-commerce feel
- over-designed glossy startup landing page style
- clutter

v1 decision:

- no login
- no paywall
- no locked cards
- full site free initially

Architecture should remain ready for future:

- login
- personalisation
- saved hard PYQs
- bookmarks
- weak-topic tracking
- progress tracking
- revision lists
- mistake notebook
- learning/activity log
- monetisation
- SEO
- premium PDFs/revision packs/practice mode later

---

## 3. Technical Direction

Clean repo:

https://github.com/Ninelives21/ChemDesk

The old Pankusdesk repo can be used only as private reference.

Repo rule:

- GitHub repo = source of truth
- local cloned folder = working copy
- GitHub Desktop = sync tool
- avoid manual edits directly on GitHub web unless necessary

Recommended long-term stack:

- Astro + MDX + structured JSON/YAML data
- modular CSS/design system
- static-first publishing
- Pagefind/static search before public RAG
- later RAG only over approved content

Key principle:

> ChemDesk content should outlive the framework.

Markdown/MDX explains. JSON/YAML connects.

---

## 4. Hosting Direction

GitHub Pages is acceptable for prototype/workshop use.

Recommended later production direction:

- GitHub repo + Netlify
- Cloudflare Pages remains a possible later option

Do not set up Netlify before the real Astro/MDX structure is ready.

Sia should define hosting/deployment rules first.

---

## 5. Design/UI Direction

Confirmed design direction:

- bold academic
- warm and trustworthy
- clean but not sleepy
- exam cards first
- minimal copy
- strong navigation
- restrained colour
- top nav + left nav
- no large tagline
- no explanatory boxes unless they serve real content

Inspiration:

- Crown Institute colour palette
- Glossar watercolour softness
- McMaster Engineering clean structure
- Boldium boldness without gimmicks

The site should communicate:

1. trust
2. adding value / worth the student’s time
3. welcoming/friendly
4. intuitive

---

## 6. Content Workflow

Core workflow:

official syllabus
→ complete Chemistry theory/notes
→ lecture alignment
→ concept IDs/maps
→ diagrams/formulas/traps
→ only later PYQ tagging

Major rule:

> Theory first. PYQs later.

Theory is the spine. PYQs map onto the spine.

PYQ tagging must not begin until the concept base is built because PYQs can span multiple topics, chapters, formulas, traps, or prerequisite concepts.

---

## 7. Language and Tone

ChemDesk notes should be:

- simple English
- student-friendly
- exam-focused
- warm and encouraging
- clear and direct
- not formal
- not patronising
- not Hindi/Hinglish by default

Tone reference:

> Alakh Pandey in English

Meaning: approachable, exam-useful, warm, and clear for Indian students across regions.

---

## 8. Copyright-Safe Content Policy

Lecture transcripts and teacher notes can be used for understanding, mapping, and concept extraction, but public ChemDesk content must be original.

Avoid:

- copying exact teacher wording
- reproducing lecture notes
- recreating exact diagrams too closely
- using branded material
- copying comments or user-generated content
- compressed transcript-style summaries

Create:

- original explanations
- fresh examples
- AI-generated original diagrams
- rewritten summaries
- ChemDesk-owned structure
- student-friendly notes

For PW/JEE Wallah:

> Stay true to the Chemistry and concept flow, not close to the teacher’s expression.

---

## 9. Diagram/Image Workflow

Preferred workflow:

concept understanding
→ user’s own rough hand sketch
→ AI clean redraw
→ chemistry correction
→ copyright/source-risk check
→ approved diagram metadata

Avoid tracing or closely copying:

- PW screenshots
- textbook diagrams
- Google images
- teacher board layouts
- coaching/commercial/blog visuals

External image risk:

- Green = public domain or compatible open/CC license, attribution as needed
- Yellow = unclear license; reference-only/internal use until reviewed
- Red = copyrighted textbook/coaching/blog/commercial image; do not reuse directly

If unclear: mark `needs_review` and do not publish.

---

## 10. CEE

CEE = ChemDesk Chemistry Exam Expert.

CEE is she.

CEE owns:

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

CEE must not tag PYQs until the user explicitly says PYQ tagging has begun.

Key CEE rule:

> A missing tag is better than a wrong tag.

Wrong PYQ tagging damages ChemDesk’s trust.

---

## 11. Sia

Sia = System Intelligence Architect.

Sia is she.

Sia owns:

- structure
- scalability
- app/PWA-readiness
- RAG-readiness
- schemas
- stable IDs
- metadata
- source-status workflow
- validation rules
- modular Chemistry data
- hosting portability
- personalization/log-module readiness
- Codex implementation briefs
- QA handoff requirements

Sia’s promise:

> Structure before scale. Schema before chaos. Validation before publish. Content portable forever.

---

## 12. Highly Modular Chemistry Data

Chemistry data must be highly modularized.

Avoid:

- one giant `chemistry.json`
- one huge notes file
- random HTML pages everywhere
- unstructured content dumps

Prefer:

- small files
- clean folders
- stable IDs
- clear metadata
- easy validation
- easy CEE review
- easy Codex implementation
- easy future search/RAG/app reuse

Top-level content direction:

```text
content/
├── physical/
├── inorganic/
├── organic/
└── practical/
```

Each chapter should have its own internal folder structure.

---

## 13. Chemical Bonding Lecture Folder Rule

Chemical Bonding has 16 lectures.

Each lecture must live in its own folder.

Each lecture folder must have its own `images/` subfolder.

Suggested pattern:

```text
content/
└── inorganic/
    └── chemical-bonding/
        ├── chapter.md
        ├── chapter.meta.json
        ├── concepts/
        ├── formulas/
        ├── traps/
        ├── diagrams/
        ├── lectures/
        │   ├── lecture-01-intro-to-chemical-bonding/
        │   │   ├── index.mdx
        │   │   ├── lecture.meta.json
        │   │   ├── transcript.md
        │   │   ├── cee-notes.md
        │   │   └── images/
        │   ├── lecture-02-ionic-bond/
        │   │   └── images/
        │   └── ...
        └── review/
```

No shared dumping ground for lecture images.

---

## 14. RAG Direction

ChemDesk should be RAG-ready from the start, but public RAG should come later.

Do not implement public RAG until approved structured content exists.

Future public RAG must retrieve only from approved/published content.

Static search first:

1. structured content
2. Pagefind/static search
3. internal RAG for user/CEE workflows
4. public RAG assistant later

---

## 15. Validation Scripts

Validation scripts are essential.

They should check:

- duplicate IDs
- missing IDs
- invalid ID formats
- broken lecture links
- invalid timestamps
- PYQs referencing missing concepts
- concepts not mapped to syllabus
- lectures not mapped to concepts
- diagrams without concept IDs
- pages missing status
- unpublished/draft material accidentally exposed
- source gaps
- broken internal links
- missing alt text
- copyright-risk assets in public pages

Before publishing:

```text
npm run validate
npm run build
npm run check-links
```

No validation, no publish.

---

## 16. Source Strategy

Primary lecture ecosystem:

- PW / Alakh Pandey where available
- JEE Wallah for missing/weak topics

Reasons:

- student familiarity
- trust/popularity
- consistent ecosystem
- easier sourcing decisions
- avoids too many teacher-style shifts
- easier public-facing lecture links

Content spine remains:

official syllabus / NCERT / ChemDesk concept map

PW/JEE Wallah provides lecture flow. Official syllabus decides required coverage. CEE checks gaps. ChemDesk notes remain original and copyright-safe.

---

## 17. Lecture Organisation

The uploaded lecture list had 333 YouTube lecture entries:

- Physical Chemistry: 99
- Inorganic Chemistry: 98
- Organic Chemistry: 120
- Practical Chemistry: 16
- Total: 333

Organize into:

```text
physical/
inorganic/
organic/
practical/
```

Before generating hundreds of pages, create one clean lecture template first.

---

## 18. Immediate Priorities

1. Create and configure Sia.
2. Ask Sia to define the architecture/folder structure.
3. Create UI/UX Expert.
4. Create QA Agent.
5. Create Content Editor / Student Voice Agent.
6. Create Source Research Agent.
7. Ask Codex to implement only after Sia creates clear briefs.
8. Continue Chemical Bonding CEE training later.
