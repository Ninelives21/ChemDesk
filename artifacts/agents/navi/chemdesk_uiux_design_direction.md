# ChemDesk UI/UX Design Direction

_Last updated: 2026-05-18_

## Purpose

This file gives Navi, the ChemDesk UI/UX Experience Architect, a starter design direction.

It is not a final design system.  
It is not a screen-by-screen layout brief.  
It is not an implementation spec.

Navi should use this as a visual and experience compass while keeping Sia’s architecture intact.

---

## Product Feel

ChemDesk should feel like:

- a serious but warm Chemistry study companion
- clean, structured, and trustworthy
- exam-focused without looking like a coaching ad
- academic but not boring
- modern but not glossy
- calm enough for long study sessions
- clear enough for quick revision before exams

Core feeling:

```text
Bold academic with warmth, trust, strong navigation, restrained colour, and low clutter.
```

---

## Design Promises

```text
Clarity before decoration.
Readable before impressive.
Mobile-first before desktop polish.
Navigation before novelty.
Student focus before visual ego.
```

---

## Primary Student Context

ChemDesk is for students preparing for:

- JEE
- BITSAT
- TG EAPCET
- CBSE
- TGIPE

Students may use ChemDesk:

- on mobile during daily study
- on laptop for deeper revision
- before tests for quick review
- while comparing related concepts
- while revising formulas, reactions, traps, and quick methods

The UI must support both slow learning and fast revision.

---

## Visual Direction

ChemDesk should lean toward:

- strong but calm academic structure
- restrained colour palette
- readable typography
- spacious content blocks
- card-based organization where useful
- clear section hierarchy
- soft emphasis boxes
- minimal visual noise
- purposeful icons only
- subtle microinteractions

Avoid making ChemDesk look like:

- a generic SaaS startup landing page
- an e-commerce website
- a flashy coaching institute homepage
- a childish learning app
- a cluttered notes dump
- a sleepy textbook scan
- a heavy dashboard before personalization exists

---

## Inspiration References

These are inspiration signals, not things to copy.

### Crown Institute colour palette

Use as inspiration for calm, mature, academic colour restraint.

### Glossar watercolour softness

Use as inspiration for gentle human warmth and softness.

### McMaster Engineering structure

Use as inspiration for clean hierarchy, organization, and trust.

### Boldium boldness

Use as inspiration for confidence and visual strength, but avoid gimmicks.

Do not copy layouts, assets, wording, screenshots, or brand identity from any reference.

---

## ChemDesk Content Needs

The UI must handle Chemistry study content gracefully, including:

- theory explanations
- formulas
- reactions
- mechanisms
- inorganic tables
- physical chemistry equations
- organic reaction flows
- examples
- common traps
- quick methods
- revision blocks
- prerequisites
- cross-links
- diagrams
- later PYQs
- later bookmarks and saved hard questions

The interface should make dense Chemistry content easier to scan, not more decorative.

---

## Mobile-First Rules

ChemDesk should be designed mobile-first.

Navi should protect:

- readable line lengths
- comfortable spacing
- tap-friendly buttons and accordions
- sticky or easy-to-reach navigation where appropriate
- formulas and tables that do not break small screens
- minimal horizontal scrolling
- simple chapter/topic navigation
- clear backtracking paths

Desktop can enhance the experience, but mobile must never feel like an afterthought.

---

## Navigation Direction

Navigation should help students answer:

- Where am I?
- What chapter am I in?
- What topic am I studying?
- What should I revise next?
- What are the prerequisites?
- What related concepts are nearby?
- Can I return to the chapter index easily?

Navigation should be clear, not clever.

---

## Readability Direction

ChemDesk pages should be comfortable for long reading.

Navi should prioritize:

- strong headings
- visible section breaks
- generous spacing
- readable font sizes
- good contrast
- clear hierarchy between main content and support boxes
- scannable revision sections
- calm page rhythm

Avoid dense walls of text.

---

## Component Direction

Likely useful components include:

- chapter cards
- topic cards
- concept summary blocks
- formula boxes
- reaction boxes
- common trap boxes
- quick method boxes
- prerequisite chips
- related concept links
- collapsible accordions
- revision checklists
- diagram callouts
- table wrappers for mobile
- exam relevance tags

Components should be reusable, accessible, and easy for Codex to implement.

---

## Interaction Direction

Microinteractions should be subtle.

Good:

- smooth accordion open/close
- clear hover/focus states
- active navigation states
- lightweight progress cues later
- simple search interaction

Avoid:

- flashy animations
- distracting transitions
- unnecessary motion
- hidden content that students need frequently
- interaction patterns that hurt accessibility

---

## Accessibility Direction

ChemDesk must be accessible from the start.

Navi should protect:

- sufficient colour contrast
- readable type sizes
- keyboard navigation
- visible focus states
- semantic headings
- clear link styles
- reduced motion friendliness
- useful alt text expectations for diagrams
- not relying on colour alone

---

## App/PWA Readiness

Navi should avoid UI choices that block a future app/PWA.

Preferred:

- app-like navigation patterns where appropriate
- reusable components
- touch-friendly spacing
- offline-friendly content thinking
- simple layouts that can port to app shells later

Avoid:

- desktop-only assumptions
- hover-only interactions
- overly complex page-specific layouts
- fragile visual hacks

---

## Personalization Readiness

ChemDesk v1 is free, no login, no locked cards.

But Navi should leave room for future:

- bookmarks
- saved hard PYQs
- weak-topic tracking
- learning logs
- progress tracking
- revision history

Do not design these as active v1 features unless asked.  
Just avoid layouts that would make them hard to add later.

---

## Navi Boundaries

Navi owns UI/UX experience.

Navi does not own:

- Chemistry correctness
- content architecture
- schemas
- stable IDs
- source verification
- copyright/source-risk
- implementation
- QA approval
- final product approval

Sia owns structure.  
CEE owns Chemistry truth.  
Codex implements.  
QA verifies.  
User approves.

---

## First-Phase Instruction

In the first phase, Navi should not design complete screens.

She should first produce:

- UI/UX non-negotiables
- student experience principles
- mobile-first rules
- navigation principles
- readability rules
- component candidates
- QA expectations

Full screen designs should come only after Sia has clarified the initial content architecture.
