# ChemDesk Project Planner & Architecture Design Document

**Working project name:** ChemDesk  
**Legacy reference name:** Pankusdesk  
**Current purpose:** Chemistry-only exam study companion for Indian students  
**Target exams:** JEE, BITSAT, TG EAPCET, CBSE, TGIPE  
**Core product spine:** `Lecture → Concept → PYQ` and `PYQ → Concept → Lecture`  
**Planner status:** Strategic design document for execution

---

## 1. Executive Summary

ChemDesk should not be built as “just another notes website.”

The strongest version of ChemDesk is a **lecture-aligned Chemistry exam intelligence system**.

Its public-facing value is:

> **PW/JEE Wallah lecture-aligned notes today; exact PYQ-to-concept-to-lecture mapping tomorrow.**

The central integration model is:

```text
Lecture → Concept → PYQ
PYQ → Concept → Lecture
```

A student should be able to enter ChemDesk from either direction:

1. **Lecture-first student**  
   “I watched this PW/JEE Wallah lecture. Give me clean notes, key timestamps, diagrams, traps, and relevant PYQs.”

2. **PYQ-first student**  
   “I got this PYQ wrong. Tell me which concept, trap, lecture, and timestamp I need to revise.”

The **concept layer** is the bridge between both journeys.

The project should therefore be built as a structured, validated, RAG-ready Chemistry knowledge system, published through a clean static-first website.

---

## 2. Core Problem ChemDesk Solves

### 2.1 Student pain points

Students following PW/JEE Wallah often face these problems:

- They watch long lectures but do not have clean usable notes.
- They do not know what to retain from a lecture.
- Lecture notes, if available, may be scattered, incomplete, too long, or not exam-ready.
- They solve PYQs but do not know which exact concept or lecture section explains the mistake.
- Many PYQs span multiple concepts, so simple chapter-wise filing is not enough.
- Popular education sites provide notes and PYQs, but they rarely connect lecture timestamp, concept, trap, PYQ, prerequisite, and exam pattern.

### 2.2 ChemDesk’s solution

ChemDesk should offer:

```text
concise lecture companion notes
+ concept spine
+ diagrams and traps
+ exact lecture-to-concept maps
+ later PYQ-to-concept-to-lecture maps
+ future search/RAG/personalised revision
```

The USP is not merely “free notes” or “PYQs.”

The USP is:

> **From lecture to PYQ. From PYQ back to lecture.**

---

## 3. Final Product Vision

A student should be able to:

1. Pick an exam: JEE, BITSAT, TG EAPCET, CBSE, or TGIPE.
2. Pick a Chemistry chapter.
3. Use one of three paths: Lecture Companion, Concept Spine, or PYQ Intelligence.
4. Study a short, useful lecture page with video link, important timestamps, concise notes, diagrams, traps, quick revision, related concepts, and later related PYQs.
5. Open a concept page with explanation, formula/rule, diagram, common mistake, lecture appearances, exam scope, and later related PYQs.
6. Open a PYQ page with question, answer, explanation, primary concept, secondary concepts, trap, difficulty, exam pattern, relevant lecture/timestamp, and similar PYQs.
7. Later, when login exists, mark hard PYQs, save bookmarks, track weak topics, revisit mistakes, and get personalised revision lists.

---

## 4. Product Layers

ChemDesk should be built in three major layers.

### 4.1 Layer 1: Lecture Companion

This layer solves the PW/JEE Wallah notes pain point.

It is for students who are following a lecture playlist and want usable notes.

Each lecture page should include:

```text
lecture title
video link
source ecosystem: PW/JEE Wallah/other
lecture snapshot
timestamp-based sections
collapsible notes under timestamps
concepts covered
diagrams needed/available
common traps
quick revision
exam relevance
later: related PYQs
```

Lecture notes must be concise, readable, exam-ready, not textbook-length, not copied from the teacher, and not simply a transcript.

The purpose is:

> “What should I retain from this lecture?”

Example lecture page structure:

```text
PW Lecture 01: Intro to Chemical Bonds

Snapshot:
This lecture explains why Chemical Bonding matters, types of bonds, and why bonds form.

Important timestamps:
00:08 — Why Chemical Bonding matters
02:29 — Types of bonds
06:46 — Strong vs weak bonds
15:26 — Why bonds form
21:44 — Potential energy graph and bond length

Concepts covered:
- chemical bond
- interatomic vs intermolecular forces
- ionic/covalent/coordinate/metallic bonds
- octet rule
- lower potential energy
- bond length

Common traps:
- Octet rule is not the deepest explanation for bond formation.
- Hydrogen bonding is weaker than normal interatomic bonds.
- Bond length corresponds to minimum potential energy.

Related PYQs:
Coming after concept review.
```

### 4.2 Layer 2: Concept Spine

This is the backbone of the entire site.

Every lecture section maps to concepts. Every PYQ maps to concepts. The concept layer is what makes the two-way bridge possible.

Each concept page should include:

```text
concept title
concept ID
chapter/topic
short explanation
formula/rule if any
diagram if useful
trap/common mistake
prerequisites
related concepts
lecture appearances
exam scope
later: related PYQs
status/review state
```

Example concept:

```text
concept_id: chemical-bonding-vsepr-lone-pair-repulsion
title: Lone Pair Repulsion in VSEPR

Explains:
Why lone pairs reduce bond angle and affect molecular shape.

Prerequisites:
- Lewis structures
- electron pairs
- central atom
- bond pair vs lone pair

Taught in:
- Chemical Bonding Lecture 09: VSEPR
- Chemical Bonding Lecture 13: Bond Angle

Common trap:
Hybridisation does not always equal visible molecular shape.

Later PYQs:
JEE/BITSAT/EAPCET bond-angle comparison questions.
```

Without concept IDs, ChemDesk becomes just a collection of pages. With concept IDs, ChemDesk becomes a searchable, relational knowledge system.

### 4.3 Layer 3: PYQ Intelligence

This is the long-term USP layer.

A PYQ should not just be filed under a chapter. It should be mapped to:

```text
primary concept
secondary concepts
prerequisite concepts
formula
trap
exam pattern
difficulty
lecture/timestamp
related notes
similar PYQs
```

Each PYQ page should include:

```text
question
exam/year/session
answer
stepwise explanation
primary concepts
secondary concepts
trap/common mistake
difficulty
speed requirement
exam pattern
relevant lecture/timestamp
related concept notes
similar PYQs
review status
```

Public rule:

> Only reviewed and approved PYQ mappings should appear publicly.

---

## 5. Core Architecture Principle

The central architecture is:

```text
Lecture sections map to concept IDs.
PYQs map to concept IDs.
The concept layer connects both.
```

This means:

```text
Lecture ↔ Concept ↔ PYQ
```

Do not build lecture pages and PYQ pages as separate silos.

---

## 6. Build Order

The correct order is:

```text
1. Official syllabus
2. Lecture source map
3. Lecture transcript processing
4. CEE concept extraction
5. User review
6. Concept map
7. Lecture companion page
8. Concept spine page
9. Validation
10. Static search
11. PYQ tagging
12. RAG
13. Personalisation
```

Do not start from PYQs immediately.

Do not create hundreds of pages before the schema/template is stable.

---

## 7. Current Phase

Current phase name:

> **Foundation Slice: ChemDesk content architecture + Chemical Bonding pilot**

Current goal:

```text
Prove that one chapter can move from:
raw transcript
→ CEE interpretation
→ reviewed concept map
→ lecture companion page
→ concept spine
→ validated structure
```

Chemical Bonding is the pilot chapter.

---

## 8. Project Roles and Agents

### 8.1 User / Product Owner

The user is the final authority.

Responsibilities:

- final product direction
- source choices
- final Chemistry approval
- correcting CEE
- approving concept maps
- approving PYQ mappings later
- deciding tone and student experience
- deciding what counts as useful

The user should not have to write all code manually.

### 8.2 This Chat / Master Orchestrator

Role:

- project planner
- architecture guide
- product strategist
- agent coordinator
- prompt designer
- guardrail keeper
- workflow designer
- decision tracker
- context sync generator

This chat helps decide what to build next, which agent to use, how to structure tasks, how to avoid chaos, and how to preserve long-term direction.

### 8.3 CEE — ChemDesk Chemistry Exam Expert

CEE is a dedicated Custom GPT and is a **she**.

Role:

- Chemistry subject expert
- Indian exam expert
- lecture interpreter
- concept extractor
- trap detector
- formula/rule identifier
- diagram-needs identifier
- lecture-to-concept mapper
- concept map builder
- later PYQ tagging assistant

CEE should not be treated as a casual chatbot.

CEE’s operating principle:

> Evidence over fluency. Reviewability over speed.

CEE must not tag PYQs until the concept base is built and the user explicitly starts PYQ tagging.

CEE comes in during:

```text
lecture transcript processing
concept extraction
concept map creation
student webpage planning
correction-rule creation
later PYQ tagging
later PYQ verification
```

For every lecture transcript, CEE should output:

1. Internal Training Output
2. Student Webpage Planning Output

CEE should not write final website code, publish anything, invent IDs/timestamps, copy teacher wording, or tag PYQs prematurely.

### 8.4 Codex — Coding Agent

Codex is the main coder.

Role:

- create Astro project
- build folder structure
- implement components
- implement templates
- create schemas
- write validation scripts
- create build scripts
- create search integration
- refactor code
- handle GitHub PR-style tasks
- debug build errors

Codex should not decide Chemistry correctness.

Codex comes in during:

```text
Astro setup
template creation
schema implementation
validation scripts
layout/component building
search integration
data-driven page generation
deployment setup
```

Codex should work in small tasks.

Good Codex tasks:

```text
Create initial Astro project structure.
Create lecture page template.
Create content collection schemas.
Add validation script for duplicate IDs.
Build top nav and left nav components.
```

Bad Codex task:

```text
Build the entire ChemDesk website.
```

### 8.5 Sia — System Intelligence Architect

Sia is the architecture/schema agent.

Role:

- folder architecture
- content schemas
- stable ID strategy
- metadata structure
- RAG-readiness
- validation gates
- data relationships
- future scalability
- app/PWA readiness

Sia comes in during schema design, data model design, folder structure decisions, content collection planning, RAG-ready architecture, knowledge graph planning, and approval/status workflow design.

### 8.6 Navi — UI/UX Agent

Navi owns student experience and interface design.

Role:

- page layout
- visual hierarchy
- student readability
- top nav/left nav
- lecture page experience
- concept page experience
- PYQ page experience
- mobile usability
- avoiding clutter
- avoiding overly polished course-module look

Navi comes in during homepage design, lecture page template design, concept page design, PYQ page design, student navigation design, and visual system decisions.

Navi should remember:

> ChemDesk should feel close to useful teacher notes, not like a corporate course module.

### 8.7 Ira — Source Research / Copyright Safety Agent

Ira owns source verification and copyright risk.

Role:

- official syllabus verification
- source status checks
- teacher/source classification
- copyright-risk flagging
- image reuse risk
- license checks
- warning against copied content

Ira comes in during source selection, syllabus updates, lecture source changes, image/source reuse decisions, and public content safety review.

### 8.8 Anya — Student Voice Editor

Anya owns student-facing wording.

Role:

- simplify explanations
- make notes warm and readable
- avoid dry textbook language
- avoid over-explaining
- keep English simple
- preserve exam focus

Anya comes in after CEE has produced accurate content. Anya should not change Chemistry meaning.

### 8.9 Vera — QA Agent

Vera owns quality assurance.

Role:

- broken links
- mobile testing
- accessibility
- consistency
- page performance
- content status checks
- release readiness
- regression testing

Vera comes in before publishing, before major commits, after Codex changes, and after template updates.

### 8.10 Sift — YouTube Comment Signal Agent

Sift reads YouTube comments and extracts student-signal insights.

Role:

- remove noise
- identify confusion points
- cluster repeated questions
- detect student pain points
- identify missing-topic requests
- detect comments about errors
- separate praise-only comments from useful comments
- produce student-signal reports

Sift must not decide Chemistry truth.

Sift comes in after a lecture source is selected and comments are fetched.

Sift output feeds CEE review, student notes improvements, trap boxes, diagram requests, extra examples, and correction checks.

---

## 9. Technology Stack

### 9.1 GitHub

GitHub is the permanent source control system.

Use for:

- version control
- commit history
- rollback
- collaboration with Codex
- source of truth for project files

Do not rely on random local folders outside the cloned repo.

### 9.2 GitHub Desktop

Use for:

- commits
- push/pull
- simple visual diff
- avoiding terminal complexity

Daily workflow:

```text
Fetch origin
→ edit files
→ review changes
→ commit
→ push origin
```

### 9.3 Astro

Astro is the recommended website framework.

Role:

- static-first site
- content-driven pages
- layouts and components
- Markdown/MDX support
- future search integration
- deployment-friendly structure

Astro comes in when we are ready to build the site shell and templates.

Astro should be used as the publishing engine, not as the identity of ChemDesk. The content should remain portable.

### 9.4 Markdown / MDX

Use Markdown/MDX for:

- lecture pages
- concept pages
- student notes
- project docs
- CEE outputs after review
- correction rules

Markdown is the writing layer.

MDX can be used when we need reusable components such as:

```text
TrapBox
FormulaBlock
DiagramBlock
LectureTimestamp
ConceptChip
PYQLink
```

### 9.5 JSON / YAML

Use JSON/YAML for structured metadata.

Use for:

```text
lectures
concepts
lecture-concept maps
syllabus maps
traps
formulas
diagrams
PYQs later
source status
review status
```

Principle:

> Markdown explains. JSON connects.

### 9.6 Astro Content Collections

Astro Content Collections should be used to enforce structure.

They help ensure every content file has required fields:

```text
id
title
chapter_id
exam_scope
source_status
review_status
public_status
```

This prevents messy growth.

Content Collections should come in before creating many pages.

### 9.7 Validation Scripts

Validation scripts are essential.

They check:

- duplicate IDs
- missing IDs
- invalid concept references
- invalid lecture references
- broken links
- timestamp format errors
- missing status fields
- draft content accidentally public
- PYQs linked to non-existing concepts later
- orphan concepts
- missing syllabus mapping

Rule:

> No validation, no publish.

### 9.8 Static Search

Use static search before AI search.

Likely tool:

```text
Pagefind
```

Use after enough approved pages exist.

Search should help students find terms such as Fajan rule, VSEPR, bond angle, p-block trends, aldehyde test, and salt analysis.

### 9.9 RAG

RAG should be designed for from the start but implemented later.

RAG should retrieve only approved/public content for student-facing answers.

RAG can later answer:

```text
Where is VSEPR taught?
Which lecture explains this PYQ?
What should I revise for this mistake?
Show traps for Chemical Bonding.
```

Do not implement public RAG over raw transcripts or drafts.

### 9.10 GraphRAG / Knowledge Graph

Future advanced layer.

A knowledge graph stores relationships:

```text
concept requires concept
lecture explains concept
diagram illustrates concept
trap belongs to concept
PYQ tests concept
exam includes concept
```

Start with simple JSON relationships now. Full GraphRAG can come later.

### 9.11 Netlify / Hosting

Recommended hosting:

```text
GitHub repo + Netlify
```

GitHub remains source control. Netlify publishes the live site.

GitHub Pages can be used early, but Netlify is a better practical hosting target.

---

## 10. Data Model

The core data model should include these entities.

### 10.1 Exam

```json
{
  "exam_id": "jee",
  "name": "JEE",
  "status": "active"
}
```

### 10.2 Syllabus Unit

```json
{
  "syllabus_unit_id": "jee-main-2025-chem-unit-03",
  "exam_id": "jee",
  "year": "2025",
  "unit_number": 3,
  "title": "Chemical Bonding and Molecular Structure",
  "source_status": "official_pdf",
  "review_status": "reviewed"
}
```

### 10.3 Chapter

```json
{
  "chapter_id": "chemical-bonding",
  "title": "Chemical Bonding and Molecular Structure",
  "domain": "physical",
  "exam_scope": ["jee", "bitsat", "tg-eapcet", "cbse", "tgipe"]
}
```

### 10.4 Lecture

```json
{
  "lecture_id": "chemical-bonding-lecture-01",
  "chapter_id": "chemical-bonding",
  "title": "Intro to Chemical Bonds",
  "source_platform": "PW / Physics Wallah",
  "youtube_url": "",
  "notes_status": "draft",
  "transcript_status": "raw_available",
  "review_status": "cee_processed"
}
```

### 10.5 Lecture Section

```json
{
  "lecture_section_id": "chemical-bonding-lecture-01-sec-04",
  "lecture_id": "chemical-bonding-lecture-01",
  "timestamp_start": "15:26",
  "timestamp_end": "19:20",
  "title": "Why bonds form",
  "concept_ids": [
    "chemical-bonding-cause-of-bond-formation",
    "chemical-bonding-octet-rule",
    "chemical-bonding-lower-potential-energy"
  ],
  "status": "review_needed"
}
```

### 10.6 Concept

```json
{
  "concept_id": "chemical-bonding-lower-potential-energy",
  "chapter_id": "chemical-bonding",
  "title": "Bond Formation and Lower Potential Energy",
  "status": "draft",
  "exam_scope": ["jee", "bitsat", "cbse"],
  "prerequisite_concept_ids": [],
  "related_concept_ids": []
}
```

### 10.7 Trap

```json
{
  "trap_id": "trap-octet-rule-not-final-explanation",
  "concept_id": "chemical-bonding-cause-of-bond-formation",
  "description": "Students may think bonds form only to complete octet, but lower potential energy is the deeper reason.",
  "status": "draft"
}
```

### 10.8 Diagram

```json
{
  "diagram_id": "diagram-potential-energy-vs-distance",
  "concept_id": "chemical-bonding-bond-length",
  "title": "Potential Energy vs Interatomic Distance",
  "source": "AI-generated original",
  "status": "needs_chemistry_review"
}
```

### 10.9 PYQ

Later:

```json
{
  "pyq_id": "jee-main-2023-chem-q42",
  "exam_id": "jee",
  "year": "2023",
  "chapter_id": "chemical-bonding",
  "question_text": "",
  "answer": "",
  "status": "draft"
}
```

### 10.10 PYQ Concept Map

Later:

```json
{
  "pyq_id": "jee-main-2023-chem-q42",
  "primary_concept_ids": [],
  "secondary_concept_ids": [],
  "trap_ids": [],
  "lecture_refs": [],
  "confidence": "needs_review",
  "review_status": "agent_tagged"
}
```

---

## 11. File and Folder Structure

A future-proof structure may look like this:

```text
ChemDesk/
  README.md
  CHEMDESK_MASTER_CONTEXT_SYNC.md
  CEE_full_master_spec.md
  CEE_correction_rules.md

  docs/
    project-planner.md
    source-decisions.md
    architecture.md
    agent-workflows.md

  src/
    pages/
    layouts/
    components/
    content/
      lectures/
      concepts/
      notes/
      syllabus/
    data/

  public/
    assets/
      images/
      diagrams/

  data/
    exams.json
    chapters.json
    lectures.json
    concepts.json
    lecture_concept_map.json
    traps.json
    formulas.json
    diagrams.json
    syllabus_map.json
    source_status.json
    pyqs.json
    pyq_concept_map.json

  raw/
    transcripts/
    youtube-comments/

  processed/
    cee-outputs/
    sift-outputs/

  reviewed/
    lectures/
    concepts/

  templates/
    lecture-page-template.md
    concept-page-template.md
    pyq-page-template.md
```

This can be refined by Sia before Codex implements it.

---

## 12. Page Templates

### 12.1 Lecture Companion Template

Required sections:

```text
title
video/source
lecture snapshot
who this helps
important timestamps
collapsible timestamp notes
concepts covered
diagrams
common traps
exam relevance
quick revision
related concepts
related PYQs later
review status
```

### 12.2 Concept Spine Template

Required sections:

```text
concept title
short explanation
why it matters
formula/rule
diagram
common traps
lecture appearances
prerequisites
related concepts
exam scope
related PYQs later
review status
```

### 12.3 PYQ Intelligence Template

Later required sections:

```text
question
exam/year
answer
explanation
primary concept
secondary concepts
trap
difficulty
exam pattern
speed requirement
revise these concepts
lecture/timestamp links
similar PYQs
status/confidence
```

---

## 13. Content Production Pipeline

### 13.1 Lecture Processing Pipeline

```text
Select lecture
→ collect video link
→ collect transcript
→ attach transcript to CEE
→ CEE Lecture Interpretation Mode
→ save CEE output
→ compare with user notes if available
→ user corrections
→ update CEE_correction_rules.md
→ update concept map
→ create lecture companion draft
→ validation
→ review
→ publish when ready
```

### 13.2 Comment Signal Pipeline

```text
video_id
→ fetch YouTube comments via API
→ raw comments file
→ filter/curate comments
→ Sift processes comments
→ student signal report
→ CEE uses signal report during lecture review
→ notes are improved indirectly
```

Do not copy comments directly.

Use comments to add trap boxes, common doubt sections, missing explanation, diagrams, and extra examples.

### 13.3 Diagram Pipeline

```text
diagram_needed
→ prompt drafted
→ AI-generated original image
→ chemistry check
→ label/spelling check
→ source/copyright check
→ approved diagram
→ saved with diagram_id
```

### 13.4 PYQ Pipeline

Later only:

```text
collect PYQ
→ create pyq_id
→ CEE suggests concept mapping
→ validation checks IDs
→ user reviews
→ approved mapping
→ public PYQ page
→ related lecture/concept links appear automatically
```

---

## 14. Source Strategy

Primary lecture ecosystem:

> **PW / JEE Wallah**

Reason:

- student familiarity
- popularity
- trust
- existing lecture flow
- easier positioning

Official syllabus/NCERT decides what must be covered.

PW/JEE Wallah provides lecture backbone.

CEE checks gaps.

ChemDesk content remains original and copyright-safe.

Cross-check sources may be used when needed:

- LearnoHub
- Pankaj Sir
- NCERT
- official syllabus
- other trusted sources

But public lecture flow should not look stitched from many teachers.

---

## 15. Current Source Decisions

### Chemical Bonding

Use OG Alakh Pandey / Physics Wallah playlist as primary.

Potential gaps to check:

- electronegativity
- resonance
- metallic bonding
- detailed MOT/LCAO
- bond order/bond length/bond energy
- hydrogen bonding applications

### Periodic Classification

OG Alakh/PW covered.

### Missing/weak inorganic units

Use JEE Wallah as primary for:

- p-block
- d/f-block
- coordination compounds

### Organic gaps

Use JEE Wallah for:

- Unit 13 Purification and Characterisation
- Unit 18 Amines / nitrogen compounds if OG Alakh coverage weak
- Unit 19 Biomolecules if current source uncertain
- Unit 20 Salt Analysis / practical chemistry where available

Unit 20 remains needs-review for preparations/titrations/experiments.

---

## 16. Review and Approval Statuses

Use consistent statuses everywhere:

```text
raw
draft
cee_processed
user_reviewed
approved
published
deprecated
needs_update
```

Public site should only show:

```text
approved
published
```

Draft and raw material must not accidentally appear publicly.

---

## 17. RAG Strategy

RAG should not be built immediately as a public chatbot.

Build RAG-readiness now.

This means:

- stable IDs
- clean metadata
- approved/draft separation
- structured content
- validation
- source maps
- concept maps
- lecture maps

Later phases:

```text
Phase 1: structured content
Phase 2: static search
Phase 3: internal RAG
Phase 4: public RAG assistant
Phase 5: GraphRAG/personalised assistant
```

Public RAG should retrieve only approved ChemDesk content.

---

## 18. Knowledge Graph Strategy

Start with simple JSON relationships.

Example relationships:

```text
requires
explains
tests
illustrates
has_trap
appears_in_exam
is_prerequisite_for
```

Example:

```json
{
  "from": "chemical-bonding-vsepr-theory",
  "relation": "requires",
  "to": "chemical-bonding-lewis-structures"
}
```

Later this can evolve into full GraphRAG.

---

## 19. Search Strategy

Use static search first.

Search should support:

- concept lookup
- lecture lookup
- formula lookup
- trap lookup
- later PYQ lookup

RAG comes later.

---

## 20. Design Direction

The design should express the product spine.

### On lecture pages

Show:

```text
Concepts covered in this lecture
Important timestamps
Don’t miss this
Common traps
Related PYQs later
```

### On concept pages

Show:

```text
Taught in these lectures
Tested in these exams
Related traps
Related PYQs later
```

### On PYQ pages

Show:

```text
This tests these concepts
Revise these notes
Watch this timestamp
Avoid this trap
```

This makes the bridge visible.

---

## 21. What Not to Do

Do not:

- create 333 pages manually before schema/template
- write long textbook notes
- start PYQ tagging too early
- build public RAG over raw content
- let Codex decide Chemistry
- let CEE publish unreviewed mappings
- mix too many teacher sources into one public page
- depend on chat memory instead of files
- copy PW wording/notes/diagrams
- copy YouTube comments directly
- overbuild login/payment now

---

## 22. Immediate Next Steps

### Step 1: Save this planner

Save as:

```text
docs/project-planner.md
```

or:

```text
CHEMDESK_PROJECT_PLANNER.md
```

### Step 2: Ask Sia to refine architecture

Prompt:

```text
Sia, using the ChemDesk Project Planner, design the initial folder structure, content schemas, stable ID conventions, and validation gates for the Lecture → Concept → PYQ architecture.
```

### Step 3: Ask Codex to implement only the skeleton

Prompt:

```text
Codex, create the initial ChemDesk Astro skeleton with folders, sample data files, one lecture page template, one concept page template, and validation placeholders. Do not create hundreds of pages.
```

### Step 4: Continue Chemical Bonding pilot

For Lecture 01:

```text
CEE output
→ user review
→ correction rules
→ concept map update
→ lecture companion draft
```

### Step 5: Do not start PYQ tagging yet

PYQ tagging waits until the Chemical Bonding concept base is stable.

---

## 23. Milestones

### Milestone 1: One Chemical Bonding Lecture Fully Processed

This means:

```text
raw transcript exists
CEE interpretation exists
user-reviewed corrections exist
concept IDs exist
lecture sections map to concepts
student lecture page draft exists
diagram needs identified
validation passes
```

### Milestone 2: Chemical Bonding Concept Base Complete

This means:

```text
all Chemical Bonding lectures processed
concept map complete
lecture-to-concept map complete
trap list complete
diagram list complete
source gaps identified
student lecture pages drafted/reviewed
```

### Milestone 3: Chemical Bonding Website Pilot Published

This means:

```text
Astro site runs
lecture pages display
concept pages display
navigation works
search may be basic or pending
validation works
published content is approved
```

### Milestone 4: PYQ Mapping Begins for Chemical Bonding

Only after the concept base is ready.

---

## 24. Final Summary

ChemDesk should be built as:

> **A structured Chemistry knowledge system that turns PW/JEE Wallah lectures into concise notes, maps every lecture section to concepts, and later maps every PYQ back to the exact concept, trap, and lecture timestamp needed to solve it.**

The product spine:

```text
Lecture → Concept → PYQ
PYQ → Concept → Lecture
```

The three public layers:

```text
Lecture Companion
Concept Spine
PYQ Intelligence
```

The execution principle:

```text
Build structure first.
Pilot one chapter.
Validate everything.
Scale only after the system works.
```

The trust principle:

```text
A missing tag can be added later.
A wrong tag damages trust.
```

The content principle:

```text
Short, useful, exam-ready notes.
Not textbook dumps.
Not copied lecture transcripts.
```

The AI principle:

```text
Agents assist.
Files remember.
Validation protects.
User approves.
```
