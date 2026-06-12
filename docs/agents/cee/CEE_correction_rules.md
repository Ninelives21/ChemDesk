# CEE Correction Rules

This file stores corrections given by the user/human reviewer.

CEE must treat approved corrections as higher authority in future tasks.

---

## How to Use This File

When CEE makes a mistake or the user corrects her, record it here.

Each correction should include:

- correction ID
- date
- chapter/topic
- what CEE did incorrectly
- corrected version
- reason for correction
- reusable rule learned
- whether the rule is approved

---

## Correction Template

```json
{
	"correction_id": "",
	"date": "",
	"chapter_id": "chemical-bonding",
	"topic_id": "",
	"source_task": "",
	"wrong_output": "",
	"correct_output": "",
	"correction_reason": "",
	"rule_learned": "",
	"applies_to": "",
	"status": "approved"
}
```

---

## Approved Correction Rules

```json
{
	"correction_id": "corr-chemical-bonding-001",
	"date": "2026-06-12",
	"chapter_id": "chemical-bonding",
	"topic_id": "concept-granularity",
	"source_task": "CEE calibration review for chemical-bonding-lecture-01-intro-to-chemical-bonds",
	"wrong_output": "CEE stated that concept IDs should be created only for reusable ideas, but still proposed standalone concept IDs for page roles and grouping labels such as chemical-bonding-introduction, chemical-bonding-interatomic-bonds, and chemical-bonding-intermolecular-forces.",
	"correct_output": "Do not treat lecture titles, introductions, page purposes, roadmap headings, or organizational groupings as standalone Chemistry concepts merely because they are prominent in the lecture. Classify proposed items before creating concept pages. Use core_now, supporting_now, prerequisite, future_link, grouping_only, or do_not_create. Items classified as grouping_only or do_not_create must not become standalone concept pages.",
	"correction_reason": "The Lecture 01 concept spine was broader than the actual Chemistry taught. Page roles and grouping labels were incorrectly treated as developed reusable concepts.",
	"rule_learned": "Prefer fewer stable and reusable Chemistry concepts. A topic mentioned as a roadmap item may receive future_link status, but it must not be treated as fully taught. Grouping labels may organize sections without becoming standalone concept pages.",
	"applies_to": "All CEE lecture-processing, concept-spine extraction, concept-ID proposals, student-page planning, and later Lecture-to-Concept mapping tasks.",
	"status": "approved"
}
```

```json
{
	"correction_id": "corr-chemical-bonding-002",
	"date": "2026-06-12",
	"chapter_id": "chemical-bonding",
	"topic_id": "chemical-bonding-bond-length",
	"source_task": "CEE calibration review for chemical-bonding-lecture-01-intro-to-chemical-bonds",
	"wrong_output": "The source notes used the wording that when potential energy is minimum, attraction is less than or equal to repulsion. This wording was identified as potentially confusing.",
	"correct_output": "At equilibrium bond length, attractive and repulsive forces balance, so the net force is zero. At this internuclear distance, the potential energy of the system is minimum.",
	"correction_reason": "Minimum potential energy should be explained using equilibrium and net-force language. Saying that attraction is less than or equal to repulsion can create an incorrect physical interpretation.",
	"rule_learned": "For potential-energy curves and bond length, state that attractive and repulsive forces balance at equilibrium, net force is zero, and potential energy is minimum. If a source uses unclear attraction-repulsion wording, mark chemistry_wording_needs_review and propose the equilibrium explanation.",
	"applies_to": "Chemical Bonding lectures and concept pages involving bond formation, equilibrium bond length, potential-energy curves, attractive forces, or repulsive forces.",
	"status": "approved"
}
```

---

## Pending Correction Rules

_No pending correction rules yet._

---

## General Standing Rules

1. Do not begin PYQ tagging until the concept base is built and the user explicitly allows PYQ tagging.

2. For lecture processing, always separate:
   - CEE training output
   - student webpage planning output

3. Do not invent concept IDs, lecture IDs, timestamps, syllabus claims, or PYQ metadata.

4. If transcript evidence is unclear, mark `needs_review`.

5. If a diagram appears to be needed but is missing from the transcript, mark `visual_context_needed`.

6. If a concept seems necessary but no approved ID exists, mark `new_concept_needed`.

7. Prefer incomplete but honest output over polished but unsupported output.
