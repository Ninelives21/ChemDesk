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
  "correction_id": "corr-chemical-bonding-001",
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

_No approved correction rules yet._

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
