# CEE Learning Register — Chemical Bonding Lecture 01

Status: draft / agent_tagged  
Purpose: Track reusable CEE learning rules for Chemical Bonding Lecture 01.  
Boundary: This register captures Chemistry interpretation, lecture-flow logic, and project-safe handoff rules. It must not absorb old project architecture unless explicitly approved for current ChemDesk.

---

## Source status

### Confirmed current sources

- Navi 01 final page-experience constraint
- Raw transcript: Chemical Bonding Lecture 01
- Correct old notes HTML: `01_intro_to_chemical_bonds.html`
- Current ChemDesk project role rules

### Important correction

Earlier old-notes training was premature because the correct old notes had not been attached yet. Any learning claimed before the correct HTML upload should not be treated as owner-old-notes learning.

---

## Global-for-this-lecture rules

### Rule 01 — Learn flow, not old architecture

```json
{
  "rule_id": "cee_l01_learn_flow_not_architecture",
  "rule_text": "When reading old owner notes for Chemical Bonding Lecture 01, learn the Chemistry interpretation flow and timestamp logic only. Do not absorb old architecture, routing, schema, UI, metadata, implementation, or publication assumptions.",
  "applies_to": "CEE training from old notes, Anya handoff, Sia handoff",
  "confidence": "confirmed",
  "source_basis": "owner_instruction"
}
```

### Rule 02 — Preserve teacher-notes rhythm

```json
{
  "rule_id": "cee_l01_teacher_notes_rhythm",
  "rule_text": "Lecture 01 should preserve teacher-style study notes: direct heading, compact playlist or lecture context, 'Topics in this lecture' near the top, nested bullets where useful, and main notes visible by default. Do not convert it into a polished course module, landing page, chatbot-first page, or card-heavy lesson.",
  "applies_to": "Navi alignment, Anya handoff, Vera QA",
  "confidence": "confirmed",
  "source_basis": "owner_instruction + old_notes"
}
```

### Rule 03 — Split by student-logical units, not every transcript timestamp

```json
{
  "rule_id": "cee_l01_split_by_student_logical_units",
  "rule_text": "For Chemical Bonding Lecture 01, do not split notes at every raw transcript timestamp. Use student-logical units from the old notes: meaning of bond, types of bonds, roadmap blocks for ionic/covalent/theories, then the main cause-of-bonding section.",
  "applies_to": "Lecture 01 timestamp map, Anya planning, student webpage outline",
  "confidence": "confirmed",
  "source_basis": "old_notes + transcript"
}
```

### Rule 04 — Opening motivation is compact context

```json
{
  "rule_id": "cee_l01_opening_context_compact",
  "rule_text": "The video opening about chapter importance and exam relevance should be compressed into compact lecture/chapter context, not treated as a major timestamped teaching unit.",
  "applies_to": "Lecture 01 flow, Anya handoff",
  "confidence": "confirmed",
  "source_basis": "old_notes + transcript"
}
```

### Rule 05 — Introduction starts where Chemistry teaching begins

```json
{
  "rule_id": "cee_l01_intro_means_bond_meaning",
  "rule_text": "In the old notes, 'Introduction' refers to the meaning of chemical bond, starting around 01:48 / 108s, not the entire video opening from 00:08.",
  "applies_to": "Timestamp mapping, lecture outline",
  "confidence": "confirmed",
  "source_basis": "old_notes + transcript"
}
```

### Rule 06 — Types of bonds stay as one nested section

```json
{
  "rule_id": "cee_l01_bond_types_one_nested_section",
  "rule_text": "Group interatomic bonds, intermolecular forces, and strong/weak bond comparison under one broad 'Types of Chemical Bonds' section instead of splitting them into many product-like modules.",
  "applies_to": "Lecture 01 outline, Anya teacher-note flow",
  "confidence": "confirmed",
  "source_basis": "old_notes + transcript"
}
```

### Rule 07 — Cause pointer vs actual teaching

```json
{
  "rule_id": "cee_l01_cause_pointer_vs_actual_teaching",
  "rule_text": "When 'cause of chemical bonding' is first mentioned around 08:13 / 493s, treat it as a roadmap pointer only. The actual teaching of cause of chemical bonding begins later around 15:20 / 920s.",
  "applies_to": "Timestamp map, concept extraction, Anya handoff",
  "confidence": "confirmed",
  "source_basis": "old_notes + transcript"
}
```

### Rule 08 — Middle roadmap blocks are future-preview

```json
{
  "rule_id": "cee_l01_middle_roadmap_future_preview",
  "rule_text": "The middle sections on ionic bond topics, covalent bond topics, and theories of covalent bonding are roadmap/future-preview blocks, not full Lecture 01 explanations.",
  "applies_to": "Core vs optional classification, concept status, Anya scope control",
  "confidence": "confirmed",
  "source_basis": "old_notes + transcript"
}
```

### Rule 09 — Main conceptual core resumes at cause of bonding

```json
{
  "rule_id": "cee_l01_main_core_cause_of_bonding",
  "rule_text": "The main conceptual teaching core after the bond-types overview is the cause of chemical bonding section: octet rule first, then energy lowering, attraction/repulsion, bond length, and potential-energy curve.",
  "applies_to": "Concept extraction, Anya handoff, diagram planning",
  "confidence": "confirmed",
  "source_basis": "old_notes + transcript"
}
```

### Rule 10 — Octet rule is useful but limited

```json
{
  "rule_id": "cee_l01_octet_not_universal",
  "rule_text": "Teach octet rule as an early/simple explanation for many cases, but do not state it as universal. Energy lowering is the more general reason for bond formation.",
  "applies_to": "Cause of chemical combination, misconception warnings",
  "confidence": "confirmed",
  "source_basis": "transcript + chemistry_reasoning"
}
```

### Rule 11 — Covalent bond safe wording

```json
{
  "rule_id": "cee_l01_covalent_safe_wording",
  "rule_text": "Define covalent bond as sharing of electron pair(s) between atoms. Do not preserve informal transcript wording that suggests electrons simply keep moving around between atoms.",
  "applies_to": "Covalent bond explanation, Anya wording, concept definitions",
  "confidence": "confirmed",
  "source_basis": "transcript + chemistry_reasoning"
}
```

### Rule 12 — Potential-energy curve placement

```json
{
  "rule_id": "cee_l01_pe_curve_near_cause",
  "rule_text": "Place the potential-energy curve directly near the cause of chemical bonding explanation, because it explains energy lowering, stability, attraction/repulsion, and bond length together.",
  "applies_to": "Diagram planning, Anya handoff, Vera QA",
  "confidence": "confirmed",
  "source_basis": "transcript + chemistry_reasoning"
}
```

---

## Preferred logical split for Lecture 01

```text
00:08–01:39
Compact lecture/chapter context. Not a main timestamp unit unless needed.

01:39–02:29
Introduction: meaning of chemical bond. Old notes timestamp: 01:48 / 108s.

02:29–08:13
Types of Chemical Bonds. Old notes timestamp: 02:34 / 154s.
Nested teacher-note section:
- Interatomic bonds
- Intermolecular forces
- Strong vs weak comparison

08:13–08:26
Cause of Chemical Bonds pointer only. Old notes timestamp: 08:13 / 493s.

08:26–09:32
Topics to be Studied in Ionic Bonds. Old notes timestamp: 08:26 / 506s. Future-preview.

09:32–11:06
Topics to be Studied in Covalent Bonds. Old notes timestamp: 09:32 / 572s. Future-preview.

11:06–15:20
Theories of Covalent Bonds. Old notes timestamp: 11:06 / 666s. Future-preview.

15:20–end
Cause of Chemical Bonding / Combination. Old notes timestamp: 15:20 / 920s. Main explanation.
```

---

## Lecture 02 additions — Ionic Bonds

### Source status

- Old notes HTML: `02_ionic_bonds.html`
- Raw transcript: `02_ionic_bond.txt`
- Training mode: compare owner timestamp split against transcript and learn logical unit boundaries.

### Rule 13 — Lecture 02 split uses large conceptual teaching blocks

```json
{
  "rule_id": "cee_l02_large_conceptual_blocks",
  "rule_text": "For Ionic Bonds Lecture 02, use large conceptual teaching blocks rather than every transcript timestamp: ionic/electrovalent bond definition, Lewis dot structures, electrovalency, energy terms/favourable conditions, stronger ionic bond comparison, and properties of ionic compounds.",
  "applies_to": "Lecture 02 timestamp map, Anya handoff, concept extraction",
  "confidence": "confirmed",
  "source_basis": "old_notes + transcript"
}
```

### Rule 14 — Opening agenda is not a separate main note unit

```json
{
  "rule_id": "cee_l02_opening_agenda_compact",
  "rule_text": "The opening agenda from about 00:05–00:45 should be compact lecture context. The first main teaching unit begins with ionic/electrovalent bond around 00:45.",
  "applies_to": "Lecture 02 outline and timestamp split",
  "confidence": "confirmed",
  "source_basis": "old_notes + transcript"
}
```

### Rule 15 — Lewis dot structure is its own example block

```json
{
  "rule_id": "cee_l02_lds_example_block",
  "rule_text": "Lewis dot structure examples in ionic bonding should be separated as their own example/practice block, because the old notes isolate NaCl and MgCl2 examples from the bond-definition section.",
  "applies_to": "Lecture 02 concept extraction, Anya example placement",
  "confidence": "confirmed",
  "source_basis": "old_notes + transcript"
}
```

### Rule 16 — Energy terms and favourable conditions belong together

```json
{
  "rule_id": "cee_l02_energy_terms_conditions_combined",
  "rule_text": "Ionization energy, electron affinity, and lattice energy should be grouped under one section: energy terms involved in ionic bond formation / favourable conditions for ionic bond formation.",
  "applies_to": "Lecture 02 split, formula/concept map, Anya handoff",
  "confidence": "confirmed",
  "source_basis": "old_notes + transcript"
}
```

### Rule 17 — Properties may have sub-timestamps inside one parent section

```json
{
  "rule_id": "cee_l02_properties_parent_with_subtimestamps",
  "rule_text": "For long property runs, keep one parent section called Properties of Ionic Compounds, but allow sub-timestamps for physical state, melting/boiling point, conductivity, isomerism, isomorphism, reaction type, and solubility.",
  "applies_to": "Lecture 02 timestamp map, student page planning",
  "confidence": "confirmed",
  "source_basis": "old_notes + transcript"
}
```

### Rule 18 — Future topics inside Lecture 02 should stay previewed

```json
{
  "rule_id": "cee_l02_future_topics_preview",
  "rule_text": "Lattice energy factors/Born-Haber cycle, hydration or solvation energy details, and Fajan's rule are mentioned in Lecture 02 but should remain future-preview unless taught in detail in later lectures.",
  "applies_to": "Lecture 02 scope control, cross-lecture boundary map",
  "confidence": "confirmed",
  "source_basis": "transcript + old_notes"
}
```

### Preferred logical split for Lecture 02

```text
00:05–00:45
Compact lecture agenda/context. Not a main teaching unit.

00:45–02:59
Ionic bond / electrovalent bond. Old notes: start=45 end=179.
Main explanation:
- metal + non-metal
- complete transfer of electron
- octet/stability
- gaseous ion formation
- electrostatic attraction
- non-directional nature
- Coulomb force idea

06:02–09:00
Lewis Dot Structure in ionic bonds. Old notes: start=362 end=540.
Example/practice block:
- NaCl
- MgCl2

09:00–12:46
Electrovalency. Old notes: start=540 end=766.
Main explanation:
- number of electrons lost/gained in electrovalent bond formation
- always positive
- groupwise electrovalencies
- variable electrovalency for d-block as light mention

12:58–18:14
Energy terms / favourable conditions. Old notes: start=778 end=1094.
Main explanation:
- ionization energy minimum
- electron affinity maximum
- lattice energy maximum
- gaseous cation + gaseous anion to solid ionic compound

18:17–20:39
Which is a stronger ionic bond? Old notes: start=1097 end=1239.
Application block:
- more metallic metal
- more non-metallic non-metal
- NaF/NaCl/NaBr/NaI trend
- LiCl/NaCl/KCl/RbCl trend

20:47–33:25
Properties of ionic compounds. Old notes parent: start=1247 end=2005.
Parent section with subtopics:
- physical state
- high melting and boiling point
- conductivity in solid/molten/aqueous state
- isomerism not shown
- isomorphism shown
- ionic reactions fast
- solubility as hydration/solvation preview
```

---

## Lecture 03 additions — Lattice Energy and Born-Haber Cycle

### Source status

- Old notes HTML: `03_lattice_energy_and_born_haber_cycle.html`
- Raw transcript: `03_lattice_energy.txt`
- Training mode: compare owner timestamp split against transcript and learn logical unit boundaries.

### Rule 19 — Lecture 03 starts main teaching quickly after agenda

```json
{
  "rule_id": "cee_l03_opening_agenda_compact",
  "rule_text": "For Lattice Energy Lecture 03, the opening agenda from about 00:07–00:39 is compact context. The first main teaching unit begins around 00:39 with lattice energy definition and stability framing.",
  "applies_to": "Lecture 03 outline and timestamp split",
  "confidence": "confirmed",
  "source_basis": "old_notes + transcript"
}
```

### Rule 20 — Lattice energy definition includes forward and reverse meanings

```json
{
  "rule_id": "cee_l03_lattice_energy_definition_bidirectional",
  "rule_text": "The Lattice Energy unit should include both meanings together: energy released when one mole of ionic compound forms from gaseous cation and gaseous anion, and energy required to break one mole of ionic compound into gaseous ions.",
  "applies_to": "Lecture 03 concept extraction, Anya explanation, formula map",
  "confidence": "confirmed",
  "source_basis": "old_notes + transcript"
}
```

### Rule 21 — Born-Haber is a method section with nested energy-term subunits

```json
{
  "rule_id": "cee_l03_born_haber_parent_with_energy_subunits",
  "rule_text": "Treat Born-Haber Cycle of NaCl as a parent method section. Nest heat of formation and the stepwise relation to lattice energy inside it instead of splitting them into unrelated modules.",
  "applies_to": "Lecture 03 timestamp map, Anya handoff, concept map",
  "confidence": "confirmed",
  "source_basis": "old_notes + transcript"
}
```

### Rule 22 — Hess’s law is supporting logic, not a full thermodynamics lesson

```json
{
  "rule_id": "cee_l03_hess_law_supporting_logic",
  "rule_text": "In Lecture 03, Hess’s law should be treated as supporting logic for the Born-Haber equation: total enthalpy change is same whether reaction occurs directly or through multiple steps. Do not expand it into a full thermodynamics lesson.",
  "applies_to": "Lecture 03 scope control, Anya handoff",
  "confidence": "confirmed",
  "source_basis": "old_notes + transcript"
}
```

### Rule 23 — MgO Born-Haber cycle is an extension/example block

```json
{
  "rule_id": "cee_l03_mgo_extension_example",
  "rule_text": "Born-Haber Cycle of MgO should be treated as an extension/example block showing successive ionization energies and successive electron affinities, not as a separate new theory.",
  "applies_to": "Lecture 03 split, example planning, trap extraction",
  "confidence": "confirmed",
  "source_basis": "old_notes + transcript"
}
```

### Rule 24 — Factors affecting lattice energy are a new conceptual block

```json
{
  "rule_id": "cee_l03_lattice_energy_factors_block",
  "rule_text": "After Born-Haber cycle examples, start a new conceptual block for factors affecting lattice energy: charge and ionic size/internuclear distance.",
  "applies_to": "Lecture 03 concept extraction and timestamp split",
  "confidence": "confirmed",
  "source_basis": "old_notes + transcript"
}
```

### Rule 25 — Numericals form an application block after factor rules

```json
{
  "rule_id": "cee_l03_numericals_application_block",
  "rule_text": "Lattice energy comparison numericals should be treated as an application/practice block after the factors are explained. They may use accordion-style hiding later, but CEE’s role is to preserve question concepts and solution logic, not UI.",
  "applies_to": "Lecture 03 Anya handoff, practice planning, PYQ-readiness",
  "confidence": "confirmed",
  "source_basis": "old_notes + transcript"
}
```

### Rule 26 — Charge dominates size when factors conflict

```json
{
  "rule_id": "cee_l03_charge_dominates_size",
  "rule_text": "For lattice energy comparison in this lecture, when charge and size factors conflict, charge should be treated as the dominating factor. This is an exam-useful trap and should be retained near comparison examples.",
  "applies_to": "Lecture 03 traps, numericals, Anya cautions, later PYQ tagging",
  "confidence": "confirmed",
  "source_basis": "old_notes + transcript"
}
```

### Rule 27 — Do not confuse force proportionality with lattice-energy proportionality

```json
{
  "rule_id": "cee_l03_force_vs_lattice_energy_proportionality",
  "rule_text": "Keep the distinction that electrostatic force varies with 1/r^2, while the simplified lattice energy comparison used in the lecture varies inversely with r. This is a student trap and should be flagged carefully.",
  "applies_to": "Lecture 03 traps, formula cautions, Anya wording",
  "confidence": "confirmed",
  "source_basis": "old_notes + transcript"
}
```

### Preferred logical split for Lecture 03

```text
00:07–00:39
Compact lecture agenda/context. Not a main teaching unit.

00:39–03:40
Lattice Energy. Old notes: start=39 end=220.
Main definition block:
- gaseous cation + gaseous anion form solid ionic compound
- energy released due to stability
- one mole condition
- reverse definition as energy required to break into gaseous ions
- no direct method; Born-Haber is indirect method

04:24–05:44
Born-Haber Cycle of NaCl introduction. Old notes: start=264 end=344.
Method-intro block:
- Born-Haber cycle as indirect method for lattice energy
- many energy terms will be used

05:44–08:20
Heat/Enthalpy of Formation. Old notes: start=344 end=500.
Nested subunit under Born-Haber:
- compound formed from elements in pure and stable states
- distinguish from lattice energy
- Na(s) + 1/2 Cl2(g) -> NaCl(s)

08:24–13:05
How lattice energy and heat of formation are related. Old notes: start=504 end=785.
Main method derivation:
- sublimation energy
- ionization energy
- bond dissociation energy / 2
- electron affinity
- lattice energy
- sign convention for absorbed vs released energy

13:05–14:33
Introduction to Hess’s Law. Old notes: start=785 end=873.
Supporting logic:
- one-step and multi-step enthalpy totals are same
- ΔHf = SE + IE + BE/2 - EA - LE

15:35–20:18
Born-Haber Cycle of MgO. Old notes: start=935 end=1218.
Extension/example block:
- two ionization energies
- first and second electron affinities
- second electron affinity can be positive
- analogous Born-Haber equation for MgO

20:18–24:12
Factors affecting Lattice Energy. Old notes: start=1218 end=1452.
New conceptual block:
- force between ions
- charge on cation/anion
- ionic size / distance
- LE directly related to charge
- LE inversely related to distance/size
- stability, melting point, hardness links

24:12–31:26
Lattice Energy comparison numericals. Old notes solutions: start=1452 onward.
Application block:
- NaF/MgF2/AlF3
- Na2O/MgO/Al2O3
- Li2O/Li3N
- NaCl/KCl
- NaF/NaCl/NaBr
- NaF/MgCl2 conflict case
- charge dominates size when they conflict

31:26–32:06
Closing roadmap. Future-preview:
- Fajan’s rule
- detailed Lewis dot structures
- then covalent bonding
```

---

## Lecture 04 additions — Fajan’s Rule

### Source status

- Old notes HTML: `04_fajans_rule.html`
- Raw transcript: `04_fajans_rule.txt`
- Training mode: compare owner timestamp split against transcript and learn logical unit boundaries.

### Rule 28 — Fajan’s Rule lecture is concept → factor framework → applications

```json
{
  "rule_id": "cee_l04_concept_factors_applications_flow",
  "rule_text": "For Fajan’s Rule Lecture 04, use the main flow: introduction/need for rule, polarization explanation, cation factors, anion factors, summary, applications, then examples. This lecture should not be split at every motivational or coaching-commentary timestamp.",
  "applies_to": "Lecture 04 timestamp map, Anya handoff, concept extraction",
  "confidence": "confirmed",
  "source_basis": "old_notes + transcript"
}
```

### Rule 29 — Fajan’s Rule intro includes qualitative limitation

```json
{
  "rule_id": "cee_l04_fajans_intro_qualitative_limit",
  "rule_text": "The introductory Fajan’s Rule block should include that no bond is perfectly ionic/covalent, Fajan’s Rule compares covalent character in ionic compounds, and it is qualitative rather than quantitative.",
  "applies_to": "Lecture 04 concept definition and Anya wording",
  "confidence": "confirmed",
  "source_basis": "old_notes + transcript"
}
```

### Rule 30 — Polarization explanation is its own conceptual unit

```json
{
  "rule_id": "cee_l04_polarization_own_unit",
  "rule_text": "The explanation of why ionic bonds have covalent character should be its own unit: cation distorts/polarizes the anion’s electron cloud, causing partial sharing-like character and therefore covalent character.",
  "applies_to": "Lecture 04 concept extraction, diagram planning, Anya explanation",
  "confidence": "confirmed",
  "source_basis": "old_notes + transcript"
}
```

### Rule 31 — Separate cation polarizing power from anion polarizability

```json
{
  "rule_id": "cee_l04_cation_vs_anion_factors_separate",
  "rule_text": "Keep cation polarizing power factors and anion polarization/polarizability factors as separate sections. Cation: smaller size, higher charge, pseudo-noble-gas configuration. Anion: larger size, higher charge.",
  "applies_to": "Lecture 04 split, concept map, Anya teacher-note bullets",
  "confidence": "confirmed",
  "source_basis": "old_notes + transcript"
}
```

### Rule 32 — PNGC is a high-priority trap/example set

```json
{
  "rule_id": "cee_l04_pngc_high_priority_trap",
  "rule_text": "Pseudo Noble Gas Configuration should be treated as a high-priority Fajan’s Rule trap. Cations such as Cu+, Ag+, Au+ and Zn2+, Cd2+, Hg2+ show high polarizing power and increased covalent character.",
  "applies_to": "Lecture 04 traps, Anya cautions, later PYQ tagging",
  "confidence": "confirmed",
  "source_basis": "old_notes + transcript"
}
```

### Rule 33 — Summary block is worth preserving

```json
{
  "rule_id": "cee_l04_summary_block_preserve",
  "rule_text": "Preserve a compact Fajan’s Rule summary block after cation and anion factors, because the old notes explicitly summarize the usable exam rules before moving to applications.",
  "applies_to": "Lecture 04 Anya handoff and student page outline",
  "confidence": "confirmed",
  "source_basis": "old_notes"
}
```

### Rule 34 — Applications are separate from basic covalent-character comparison

```json
{
  "rule_id": "cee_l04_applications_separate_block",
  "rule_text": "Keep applications of Fajan’s Rule as a separate block: more covalent character means less ionic character, lower water solubility, lower melting/boiling point, weaker ionic nature, and greater colour-imparting nature.",
  "applies_to": "Lecture 04 split, Anya handoff, trap map",
  "confidence": "confirmed",
  "source_basis": "old_notes + transcript"
}
```

### Rule 35 — Examples after applications form practice/application block

```json
{
  "rule_id": "cee_l04_examples_application_block",
  "rule_text": "Examples after the applications section should be treated as a practice/application block. They test melting point, solubility, colour, and volatility using Fajan’s Rule rather than introducing separate new theory.",
  "applies_to": "Lecture 04 practice planning, later PYQ-readiness",
  "confidence": "confirmed",
  "source_basis": "old_notes + transcript"
}
```

### Rule 36 — Old notes may include incomplete/placeholder examples

```json
{
  "rule_id": "cee_l04_old_notes_placeholders_need_review",
  "rule_text": "Some older Fajan’s Rule example entries contain placeholders such as q6/a6 or incomplete compounds. Treat these as old-note incompleteness, not as valid content. Use transcript and completed newer examples for Chemistry interpretation.",
  "applies_to": "Lecture 04 old-note ingestion and review flags",
  "confidence": "confirmed",
  "source_basis": "old_notes"
}
```

### Preferred logical split for Lecture 04

```text
00:08–02:57
Intro to Fajan’s Rule. Old notes: start=19 end=177.
Main intro block:
- no bond is perfectly ionic/covalent
- ionic compounds have some covalent character
- Fajan’s Rule compares covalent character in ionic bonds
- qualitative, not quantitative
- connects to mp/bp and solubility questions

03:09–08:16
Why ionic bonds have covalent character. Old notes: start=189 end=496.
Main concept block:
- cation polarizes/distorts anion electron cloud
- polarization of anion
- polarizing power of cation
- greater polarization/polarizing power -> greater covalent character

08:16–19:18
Cation factors affecting polarizing power. Old notes: start=496 end=1158.
Main factor block:
- smaller cation size -> more polarizing power
- higher cation charge -> more polarizing power
- pseudo noble gas configuration -> high polarizing power
- Cu+, Ag+, Au+ and Zn2+, Cd2+, Hg2+ as key exception/trap set
- includes quick comparison examples for polarizing power

19:21–21:20
Anion factors affecting polarization. Old notes: start=1161 end=1280.
Main factor block:
- larger anion size -> more polarization
- higher anion charge -> more polarization

21:29–25:06
Fajan’s Rule summary. Old notes: start=1289 end=1506.
Summary block:
- covalent character increases with cation polarizing power
- covalent character increases with anion polarization
- concise list of cation and anion factors

26:48–29:09
Basic covalent-character comparison examples. Old notes older examples: start=1611, 1674, 1706.
Practice block:
- NaCl/KCl/RbCl
- BeCl2/MgCl2/CaCl2
- NaCl/NaBr/NaI

29:09–31:12
Applications of Fajan’s Rule. Old notes: start=1756 end=1874.
Application rule block:
- more covalent -> less ionic
- lower solubility in water
- lower melting/boiling point
- more colour-imparting nature

31:12–39:26
Application examples. Old notes newer examples start around 1881; older accordion timestamps continue.
Practice/application block:
- BeF2 vs MgF2 melting point
- CaCl2 vs CaBr2 melting point
- NaCl vs CuCl melting point
- KCl vs AgCl melting point
- Fe(OH)3 vs Fe(OH)2 solubility
- Ag2O vs Ag2S solubility
- AgF/AgCl/AgBr/AgI colour
- PbCl2 vs PbI2 colour
- SnCl4 volatile liquid vs SnCl2 solid
```

---

## Lecture 05 additions — Lewis Dot Structure

### Source status

- Old notes HTML: `05_lewis_dot_structure.html`
- Raw transcript: `05_lewis_dot.txt`
- Training mode: compare owner timestamp split against transcript and learn logical unit boundaries.

### Rule 37 — Lewis Dot Structure lecture is rules first, examples second

```json
{
  "rule_id": "cee_l05_rules_then_examples_flow",
  "rule_text": "For Lewis Dot Structure Lecture 05, preserve the owner split as rule framework first, then calculation/formal-charge rules, then a large worked-example table. Do not split every example into a separate page-level concept unless needed for practice indexing.",
  "applies_to": "Lecture 05 timestamp map, Anya handoff, practice planning",
  "confidence": "confirmed",
  "source_basis": "old_notes + transcript"
}
```

### Rule 38 — Opening motivation is not the first main unit

```json
{
  "rule_id": "cee_l05_opening_motivation_compact",
  "rule_text": "The opening discussion about why Lewis structures matter and examples like carbonate/sulphate should be compact context. The first main unit begins with Lewis Dot Structure intro around 02:13 / 133s.",
  "applies_to": "Lecture 05 split and Anya page outline",
  "confidence": "confirmed",
  "source_basis": "old_notes + transcript"
}
```

### Rule 39 — Central atom selection is a major rules block

```json
{
  "rule_id": "cee_l05_central_atom_rules_major_block",
  "rule_text": "Rules for selecting the central atom should be a major block: least number, least electronegativity, largest size, highest atomic number, H/F never central, corner-atom octet/duplet, central atom may have 8 or more electrons, and common central-atom covalencies.",
  "applies_to": "Lecture 05 concept extraction, Anya teacher-note bullets",
  "confidence": "confirmed",
  "source_basis": "old_notes + transcript"
}
```

### Rule 40 — Charge placement rule is its own short rule block

```json
{
  "rule_id": "cee_l05_charge_placement_short_block",
  "rule_text": "The rule for positive and negative charge placement should be a short separate block: positive charge on central atom, negative charge on corner atom, with later validation through formal charge.",
  "applies_to": "Lecture 05 split, Anya cautions, trap map",
  "confidence": "confirmed",
  "source_basis": "old_notes + transcript"
}
```

### Rule 41 — Q/BPE/LPE calculation rules are one method block

```json
{
  "rule_id": "cee_l05_q_bpe_lpe_method_block",
  "rule_text": "Keep Q, bond-pair electrons, and lone-pair electrons together as one calculation-method block: Q = total valence electrons + negative charge - positive charge; BPE = 2 × number of bonds; LPE = Q - BPE. LPE may remain as lone pairs or be used to form multiple bonds.",
  "applies_to": "Lecture 05 formula map, concept extraction, Anya handoff",
  "confidence": "confirmed",
  "source_basis": "old_notes + transcript"
}
```

### Rule 42 — Formal charge appears inside examples but deserves a rule entry

```json
{
  "rule_id": "cee_l05_formal_charge_inside_example_but_rule_entry",
  "rule_text": "Formal charge is introduced inside the nitrate example in the old notes, but should be captured as a distinct method rule because it is reusable across later Lewis-structure examples.",
  "applies_to": "Lecture 05 concept map, formula register, trap extraction",
  "confidence": "confirmed",
  "source_basis": "old_notes + transcript"
}
```

### Rule 43 — Worked examples are one large practice block with individual timestamps

```json
{
  "rule_id": "cee_l05_examples_large_practice_block",
  "rule_text": "Lewis Dot Structure examples should be grouped under one large examples/practice block, with individual timestamps for H2, O2, H3O+, NH4+, NO3-, NO2-, SO3^2-, SO4^2-, SO3, CO3^2-, and PO4^3-.",
  "applies_to": "Lecture 05 timestamp map, practice planning, future PYQ-readiness",
  "confidence": "confirmed",
  "source_basis": "old_notes + transcript"
}
```

### Rule 44 — Lewis structures require diagram/structure redraws

```json
{
  "rule_id": "cee_l05_original_structure_diagrams_needed",
  "rule_text": "Lecture 05 needs original ChemDesk redrawn Lewis structures for each worked example. Do not copy board drawings or screenshots. Structures should be reviewed for formal charges and resonance-equivalent placement.",
  "applies_to": "Diagram planning, Ira review, Vera QA",
  "confidence": "confirmed",
  "source_basis": "old_notes + transcript + project_rule"
}
```

### Rule 45 — Central atom can exceed octet, but corner atoms must complete octet/duplet

```json
{
  "rule_id": "cee_l05_central_expanded_octet_corner_octet",
  "rule_text": "For this lecture’s Lewis-structure method, corner atoms must satisfy octet/duplet, while the central atom may have 8 or more electrons but not fewer than 8 in the discussed examples. This is a key student trap.",
  "applies_to": "Lecture 05 traps, Anya cautions, example validation",
  "confidence": "confirmed",
  "source_basis": "old_notes + transcript"
}
```

### Preferred logical split for Lecture 05

```text
00:23–02:13
Compact opening context/motivation. Not a main teaching unit.
- why Lewis dot structures matter
- carbonate/sulphate style examples previewed
- covalent/coordinate bond preview kept light

02:13–05:39
Lewis Dot Structure — Intro. Old notes: start=133 end=339.
Main intro block:
- show only valence/outermost electrons
- Lewis theory uses octet rule
- H follows duplet
- central atom can break octet upward; central atom can have 8 or more electrons
- link to old covalent-bond theories as context only

06:07–13:20
Rules for Selecting Central Atom. Old notes: start=367 end=800.
Major rule block:
- least in number
- least electronegativity
- largest size
- highest atomic number
- H and F cannot be central
- common central atoms: O, S, N, P, C, Si, Cl
- corner atom octet/duplet must be complete
- central atom tries to remain in maximum covalency
- common covalencies table

13:26–14:41
Rule for positive and negative charge. Old notes: start=806 end=881.
Short rule block:
- positive charge generally on central atom
- negative charge generally on corner atom
- later checked with formal charge

15:57–17:56
Calculation rules. Old notes: start=957 end=1076.
Method block:
- Q = total valence electrons + negative charge - positive charge
- BPE = 2 × number of bonds
- LPE = Q - BPE
- LPE can remain lone pairs or form double/triple bonds

18:10–25:42
Simple examples leading into method practice. Old notes example block begins at 1090.
Practice warm-up:
- H2
- O2
- H3O+
- NH4+

25:59–34:45
NO3- and formal charge. Old notes: NO3- start=1560 end=2082; formal charge noted at start=1748 end=1830.
Key method/example block:
- Q/BPE/LPE method
- multiple bond formation after octets
- formal charge formula
- charges may distribute by resonance; one drawn form is a formal structure

35:03–39:08
NO2- example. Old notes: start=2097 end=2361.
Practice block:
- Q/BPE/LPE method
- one double bond, one single bond
- formal charge check

40:02–46:00
SO3^2- example. Old notes: start=2372 end=2766.
Important example block:
- central S can exceed octet
- one double bond and two single-bonded O atoms in the taught structure
- formal charge minimization

46:00–50:21
SO4^2- example. Old notes: start=2803 end=3023.
Important example block:
- central S expanded octet
- two double bonds and two single-bonded O atoms in taught structure
- two negative charges on singly bonded oxygens

50:21–55:02 approx
SO3 example. Old notes: start=3033 end=3302.
Practice block:
- neutral sulphur trioxide structure
- expanded octet/resonance-aware representation

55:06–58:06 approx
CO3^2- example. Old notes: start=3306 end=3486.
Practice block:
- carbonate ion
- central carbon obeys octet
- one double bond, two single-bonded oxygens in one resonance form

58:21–01:00:51 approx
PO4^3- example. Old notes: start=3501 end=3651.
Practice block:
- phosphate ion
- central P can exceed octet
- formal charge check

01:00:51–end
Closing note. Transcript confirms the lecture closes after phosphate and reinforces that short shortcut videos are insufficient.
```

---

## Lecture 06 additions — Valence Bond Theory / VBT

### Source status

- Old notes HTML: `06_vbt.html`
- Raw transcript: `06_vbt.txt`
- Training mode: compare owner timestamp split against transcript and learn logical unit boundaries.

### Rule 46 — VBT lecture is theory framework → overlap types → counting → comparison

```json
{
  "rule_id": "cee_l06_vbt_framework_overlap_counting_comparison_flow",
  "rule_text": "For VBT Lecture 06, preserve the owner split as: VBT intro/main points, axial overlapping and sigma bond examples, lateral overlapping and pi bond examples, sigma/pi bond counting practice, then sigma-vs-pi comparison. Do not split every orbital example into a separate top-level unit.",
  "applies_to": "Lecture 06 timestamp map, Anya handoff, concept extraction",
  "confidence": "confirmed",
  "source_basis": "old_notes + transcript"
}
```

### Rule 47 — VBT intro contains failure of Lewis theory and main postulates

```json
{
  "rule_id": "cee_l06_vbt_intro_postulates_block",
  "rule_text": "The VBT intro should include why Lewis theory was insufficient, VBT as orbital-overlap theory of covalent bond formation, scientists credited, and the main postulates such as half-filled orbitals, opposite spin, less-than-50-percent overlap caution, extent of overlap, two overlap types, and same-sign orbital requirement.",
  "applies_to": "Lecture 06 concept extraction, Anya teacher-note outline",
  "confidence": "confirmed",
  "source_basis": "old_notes + transcript"
}
```

### Rule 48 — Axial overlap is a parent section with s-s, s-p, p-p subexamples

```json
{
  "rule_id": "cee_l06_axial_overlap_parent_subexamples",
  "rule_text": "Treat axial/head-on overlapping as one parent section that contains s-s, s-p, and p-p sigma-overlap examples, including H2, HF/HCl/HBr/HI trends, BF3 excitation example, and brief H2O/NH3/CH4 practice where relevant.",
  "applies_to": "Lecture 06 timestamp split, diagram planning, Anya handoff",
  "confidence": "confirmed",
  "source_basis": "old_notes + transcript"
}
```

### Rule 49 — Lateral overlap is a parent section for pi bonds

```json
{
  "rule_id": "cee_l06_lateral_overlap_parent",
  "rule_text": "Treat lateral/sidewise/parallel overlapping as one parent section for pi-bond formation. Keep O2 and N2 as examples showing that the first bond is sigma and subsequent bonds are pi.",
  "applies_to": "Lecture 06 timestamp split, diagram planning, trap extraction",
  "confidence": "confirmed",
  "source_basis": "old_notes + transcript"
}
```

### Rule 50 — Sigma/pi counting is an application block

```json
{
  "rule_id": "cee_l06_sigma_pi_counting_application_block",
  "rule_text": "The section on finding the number of sigma and pi bonds should be treated as an application/practice block that depends on Lewis structures and the rule: single bond = sigma, double bond = sigma + pi, triple bond = sigma + 2 pi.",
  "applies_to": "Lecture 06 practice planning, future PYQ-readiness, Anya handoff",
  "confidence": "confirmed",
  "source_basis": "old_notes + transcript"
}
```

### Rule 51 — Difference between sigma and pi is a summary/comparison block

```json
{
  "rule_id": "cee_l06_sigma_vs_pi_comparison_block",
  "rule_text": "The difference between sigma and pi bonds should be a final comparison block summarising overlap type, participating orbitals, extent of overlap, bond strength, bond energy, bond length, number possible between two atoms, independent existence, and rotation restriction.",
  "applies_to": "Lecture 06 Anya handoff, summary table planning, exam trap extraction",
  "confidence": "confirmed",
  "source_basis": "old_notes + transcript"
}
```

### Rule 52 — pπ-dπ and dπ-dπ are deferred to next lecture

```json
{
  "rule_id": "cee_l06_p_pi_d_pi_deferred",
  "rule_text": "In Lecture 06, pπ-dπ and dπ-dπ bonding are mentioned as higher-level/future topics and should be treated as deferred to the next lecture, not fully taught in this lecture.",
  "applies_to": "Lecture 06 scope control, Lecture 07 boundary, Anya handoff",
  "confidence": "confirmed",
  "source_basis": "transcript"
}
```

### Rule 53 — Sigma/pi diagrams are essential and must be original

```json
{
  "rule_id": "cee_l06_original_overlap_diagrams_needed",
  "rule_text": "Lecture 06 requires original ChemDesk diagrams for s-s, s-p, p-p axial overlap, p-p lateral overlap, O2 and N2 overlap diagrams, and sigma/pi comparison. Do not copy lecture board drawings or exact visual layouts.",
  "applies_to": "Diagram planning, Ira review, Vera QA",
  "confidence": "confirmed",
  "source_basis": "old_notes + transcript + project_rule"
}
```

### Preferred logical split for Lecture 06

```text
00:07–01:40
Compact opening context/motivation. Not a separate old-notes main unit.
- Lewis theory failed to explain geometry
- sequence of theories previewed
- sigma/pi introduced as important VBT output

01:40–14:11
VBT Intro. Old notes: start=100 end=851.
Main theory framework:
- covalent bond through overlap of atomic orbitals
- Pauling/Slater; Heitler/London
- half-filled orbitals with opposite spins
- overlap less than 50 percent caution
- extent of overlap controls bond strength, bond energy, bond length
- axial vs lateral overlap
- same-sign/orientation condition

14:27–35:46
Two types of overlapping: Axial Overlapping. Old notes: start=867; subanchors: s-s 890, s-p 1122, p-p 1540, BF3 1649.
Parent section with subexamples:
- s-s sigma, H2
- s-p sigma, HF/HCl/HBr/HI trends
- bond energy/bond length trend questions
- p-p sigma
- BF3 excitation example
- first bond between two atoms is always sigma
- s orbital never forms pi bond

35:46–46:27
Two types of overlapping: Lateral Overlapping. Old notes: start=2146.
Parent section:
- sidewise/parallel/lateral overlap
- pi bond formation
- sigma stronger than pi due to greater overlap
- O2: one sigma + one pi
- N2: one sigma + two pi
- pπ-dπ and dπ-dπ only previewed/deferred

46:27–52:43
Find number of sigma and pi bonds. Old notes: start=2787.
Application/practice block:
- H2O, NH3, C2H2, C2H4, CH3COOH, SO3, H2SO4, C2(CN)4, benzene
- relies on Lewis structures first

52:43–end
Difference between sigma and pi bonds. Old notes: start=3163.
Comparison/summary block:
- axial vs sidewise
- s-s/s-p/p-p vs p-p/p-d/d-d
- sigma stronger, shorter, higher bond energy
- pi weaker, longer, lower bond energy
- only one sigma between two atoms; one or two pi possible
- pi cannot exist independently before sigma
- rotation around pi bond restricted
- closing note says pπ-dπ and dπ-dπ will be in next video
```

---

## Open uncertainties / review needs

```json
[
  {
    "uncertainty_id": "cee_l01_approved_concept_ids_missing",
    "note": "No approved ChemDesk concept IDs have been supplied. Any proposed IDs must remain new_concept_needed.",
    "status": "needs_review"
  },
  {
    "uncertainty_id": "cee_l01_official_syllabus_not_loaded",
    "note": "Official syllabus mapping has not been loaded for this lecture, so syllabus claims should not be marked confirmed.",
    "status": "needs_review"
  },
  {
    "uncertainty_id": "cee_l01_domain_review",
    "note": "Current transcript metadata says domain: physical, while Chemical Bonding may also be treated under inorganic in older project context. Sia/user should lock the current project placement.",
    "status": "needs_review"
  }
]
```

---

## Update protocol

Whenever CEE learns a new durable rule, append it here with:

- rule_id
- rule_text
- applies_to
- confidence
- source_basis
- date/context if useful

Do not mark any rule as approved/published unless the user explicitly approves it.

