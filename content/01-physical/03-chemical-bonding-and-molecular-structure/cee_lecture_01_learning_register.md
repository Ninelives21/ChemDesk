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

## Local Timestamp Evidence Rule for Chemical Bonding

For Chemical Bonding lectures where user notes HTML is available, the embedded notes HTML timestamp links are the primary timestamp/navigation source.

Timestamp evidence order:

1. User notes HTML timestamp links and video ranges.
2. Lecture transcript timestamps and CEE-derived lecture flow.
3. Sift/student timestamp comments as supporting candidates only.
4. CEE inference only as `timestamp_candidate_needs_review`.

Student timestamps are useful for identifying confusion hotspots, missing navigation sections, and possible review areas, but they do not override user notes HTML.

If notes HTML and student timestamps conflict, mark the conflict as `timestamp_conflict_needs_review`.

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

### Timestamp precedence note

For Lecture 01, notes HTML is available and contains timestamped YouTube links. Therefore, notes HTML timestamps should be treated as the primary navigation source. Transcript timestamps are used to verify and refine lecture flow. Sift/student timestamps such as 2:38, 8:20, and 15:30 are supporting navigation candidates only.

status: cee_processed  
timestamp_policy: notes_html_precedence  
student_timestamps_status: timestamp_candidate_needs_review

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

## 2. Timestamp / Lecture Flow Map

timestamp_policy: notes_html_precedence  
status: review_needed

Because notes HTML is available for Lecture 02, the embedded notes HTML video ranges are the primary timestamp/navigation source. Transcript timestamps are used to verify and derive the lecture flow. Sift/student timestamp comments are useful supporting candidates only and should not override notes HTML unless verified against the video.

If notes HTML, transcript, and student timestamps disagree, mark:
`timestamp_conflict_needs_review`.

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

LECTURE 03 : LATTICE ENERGY - BORN HABER

Using your **global sign rule** — **energy absorbed = positive, energy released = negative** — here is the full redone Lecture 03 markdown. Sources used: notes HTML, transcript, and Sift comments report.

````md
---
# Lecture 03 — Lattice Energy and Born–Haber Cycle

lecture_id: lecture-03-lattice-energy-and-born-haber-cycle
lecture_title: Lattice Energy and Born–Haber Cycle
chapter_id: chemical-bonding
source_video: https://youtu.be/ch9HorGagHE

source_files_used:
  - 03_lattice_energy.txt
  - 03_lattice_energy_and_born_haber_cycle.html
  - comments-03-lattice-energy-and-born-haber-cycle.final.md

source_status:
  - transcript: raw_hinglish_internal_source
  - notes_html: current_chemdesk_notes_state
  - comments: sift_final_student_signal_only_unverified

truth_status: review_needed
public_display: false
public_rag_eligible: false
pagefind_index: false
cee_review_required: true
overall_status: cee_processed
---

## 0. Local Evidence Rules Applied

### Timestamp policy

timestamp_policy: notes_html_precedence

Because notes HTML is available for Lecture 03, embedded notes HTML video ranges are the primary timestamp/navigation source.

Timestamp evidence order for this lecture:

1. Notes HTML timestamp links and video ranges.
2. Lecture transcript timestamps and CEE-derived lecture flow.
3. Sift/student timestamp comments as supporting candidates only.
4. CEE inference only as `timestamp_candidate_needs_review`.

Student timestamps must not override notes HTML unless verified against video.

If notes HTML, transcript, and student timestamps conflict, mark:

`timestamp_conflict_needs_review`

### Global energy sign convention

ChemDesk global rule:

- Energy absorbed by the system = positive.
- Energy released by the system = negative.

This applies to Lecture 03 Born–Haber cycle, lattice energy, ionization energy, electron gain steps, bond dissociation, sublimation/atomisation, and heat/enthalpy of formation.

Important:

- Do not mix signed thermochemical values with magnitude-only values.
- If a lecture/source uses “energy released” as a positive magnitude, convert or clearly label it before integrating into ChemDesk notes.
- If a supplied value is already signed, do not add another sign mechanically.
- If ambiguity remains, mark `sign_convention_needs_review`.

---

## 1. Lecture Concept Spine

### 1. Lattice energy definition

concept_id: new_concept_needed  
status: cee_processed  
confidence: confirmed  
source_evidence: notes_html + transcript

Lattice energy is introduced using the formation of an ionic solid from gaseous ions.

Forward process:

```text
Na⁺(g) + Cl⁻(g) → NaCl(s)
```
````

Under ChemDesk global sign convention, this process releases energy, so:

```text
lattice formation energy = negative
```

Concept meaning:

- When gaseous cation and gaseous anion combine to form one mole of ionic solid, energy is released.
- The ionic solid becomes more stable because the system loses energy.
- This released energy is commonly called lattice energy in the lecture.

Reverse process:

```text
NaCl(s) → Na⁺(g) + Cl⁻(g)
```

This requires energy, so:

```text
lattice dissociation energy = positive
```

Important public-note caution:
Many sources use “lattice energy” differently:

- as energy released during lattice formation
- or as energy required for lattice dissociation

ChemDesk should explicitly state the convention being used.

Recommended ChemDesk wording direction:
Use signed language:

- lattice formation enthalpy/energy: negative
- lattice dissociation enthalpy/energy: positive

Do not write final public wording yet.

---

### 2. No direct method for lattice energy

concept_id: new_concept_needed
status: cee_processed
confidence: confirmed
source_evidence: notes_html + transcript

Lecture teaches that lattice energy cannot be measured directly in a simple direct way. It is determined indirectly using the Born–Haber cycle.

Core use of Born–Haber cycle:

- indirect method to calculate lattice energy
- applies Hess’s law
- connects direct formation from elements with multi-step ionic formation path

Exam relevance:

- Common conceptual MCQ: Born–Haber cycle is used to determine lattice energy.
- Common numerical type: one thermochemical term is missing and must be calculated.

---

### 3. Heat / enthalpy of formation

concept_id: new_concept_needed
formula_id: new_concept_needed
status: cee_processed
confidence: confirmed
source_evidence: notes_html + transcript

Heat/enthalpy of formation is the enthalpy change when one mole of compound is formed from its elements in their pure and stable states.

Example:

```text
Na(s) + 1/2 Cl₂(g) → NaCl(s)
```

Under ChemDesk global sign convention:

- If energy is released, ΔHf is negative.
- If energy is absorbed, ΔHf is positive.

For NaCl formation, ΔHf is expected to be negative because formation is exothermic.

Important distinction:

- Heat of formation starts from elements in pure/stable states.
- Lattice energy starts from gaseous ions.
- Students strongly confuse these two.

Student confusion signal:
Several comments ask why heat of formation is not shown as negative if energy is released.

Decision:
useful_student_confusion + add_to_notes_later

---

### 4. Standard state vs gaseous atom/ion steps

concept_id: new_concept_needed
status: cee_processed
confidence: confirmed
source_evidence: transcript + comments_signal

Born–Haber cycle starts from standard/pure stable forms for heat of formation, then converts them step by step into gaseous atoms/ions.

For NaCl:

```text
Na(s)
```

is used because sodium’s pure stable elemental state is solid metal.

```text
1/2 Cl₂(g)
```

is used because chlorine’s elemental stable form is diatomic chlorine gas, and only one Cl atom is needed per NaCl formula unit.

Students asked:

- Why Cl₂ and not Cl?
- Why half Cl₂?
- How can sodium be gaseous if it is a metal?
- How can sodium be taken as pure when it is reactive in nature?

Chemistry clarification needed later:

- Standard state/pure state in thermochemistry is not the same as natural occurrence in ores.
- Gaseous Na(g) is created as a hypothetical thermochemical step using sublimation/atomisation energy.
- Fractional coefficients are allowed in thermochemical equations because values are per mole of product.

Decision:
useful_student_confusion + add_to_notes_later

---

### 5. Born–Haber cycle for NaCl

concept_id: new_concept_needed
status: cee_processed
confidence: confirmed
source_evidence: notes_html + transcript

Born–Haber steps for NaCl under ChemDesk global sign convention:

#### Direct formation route

```text
Na(s) + 1/2 Cl₂(g) → NaCl(s)
ΔHf = negative for exothermic formation
```

#### Stepwise route

1. Sublimation / atomisation of sodium:

```text
Na(s) → Na(g)
```

Energy absorbed:

```text
+ SE
```

2. Ionization of gaseous sodium:

```text
Na(g) → Na⁺(g) + e⁻
```

Energy absorbed:

```text
+ IE
```

3. Dissociation of chlorine:

```text
1/2 Cl₂(g) → Cl(g)
```

Energy absorbed:

```text
+ DE/2
```

4. Electron gain by chlorine:

```text
Cl(g) + e⁻ → Cl⁻(g)
```

Usually energy released:

```text
ΔHeg(Cl) = negative
```

If lecture notation uses EA as positive magnitude of energy released, then this appears as:

```text
- EA
```

5. Lattice formation:

```text
Na⁺(g) + Cl⁻(g) → NaCl(s)
```

Energy released:

```text
ΔHlattice_formation = negative
```

If lecture notation uses LE as positive magnitude of energy released, then this appears as:

```text
- LE
```

#### Signed ChemDesk-safe equation

Preferred internal ChemDesk equation:

```text
ΔHf = ΔHsub + IE + 1/2DE + ΔHeg + ΔHlattice_formation
```

Where:

- ΔHsub is positive
- IE is positive
- 1/2DE is positive
- ΔHeg may be negative or positive depending species
- ΔHlattice_formation is negative

#### Lecture-style magnitude equation

The current notes/lecture-style equation is:

```text
ΔHf = SE + IE + BE/2 - EA - LE
```

This is acceptable only if:

- EA means positive magnitude of energy released
- LE means positive magnitude of lattice formation energy released

Review note:
Public notes must not mix the signed equation and magnitude equation without explanation.

status: review_needed for final public formula wording

---

### 6. Hess’s law in Born–Haber cycle

concept_id: new_concept_needed
status: cee_processed
confidence: confirmed
source_evidence: notes_html + transcript

Hess’s law states that total enthalpy change for a reaction is independent of path. If the reaction occurs directly or through multiple steps, the total enthalpy change remains the same.

Application here:

```text
Direct formation enthalpy = sum of all Born–Haber step enthalpies
```

Concept importance:

- Born–Haber cycle is a Hess’s law application.
- It allows calculation of missing lattice energy or another missing thermochemical term.
- Students should understand path independence, not memorize formula blindly.

---

### 7. Born–Haber cycle for MgO

concept_id: new_concept_needed
status: review_needed
confidence: confirmed_for_topic_presence
source_evidence: notes_html + transcript + comments_signal

MgO requires two electrons to be removed from Mg and two electrons to be added to O.

#### Direct formation route

```text
Mg(s) + 1/2 O₂(g) → MgO(s)
```

For stable MgO formation, ΔHf is generally negative.

#### Stepwise route

1. Sublimation / atomisation of magnesium:

```text
Mg(s) → Mg(g)
```

Energy absorbed:

```text
+ SE
```

2. First ionization:

```text
Mg(g) → Mg⁺(g) + e⁻
```

Energy absorbed:

```text
+ IE₁
```

3. Second ionization:

```text
Mg⁺(g) → Mg²⁺(g) + e⁻
```

Energy absorbed:

```text
+ IE₂
```

4. Oxygen dissociation:

```text
1/2 O₂(g) → O(g)
```

Energy absorbed:

```text
+ DE/2
```

5. First electron gain:

```text
O(g) + e⁻ → O⁻(g)
```

Usually energy released:

```text
ΔHeg₁ = negative
```

In lecture magnitude notation:

```text
- EA₁
```

6. Second electron gain:

```text
O⁻(g) + e⁻ → O²⁻(g)
```

Energy absorbed because an electron is being added to an already negative ion:

```text
ΔHeg₂ = positive
```

In lecture notation:

```text
+ EA₂
```

7. Lattice formation:

```text
Mg²⁺(g) + O²⁻(g) → MgO(s)
```

Energy released:

```text
ΔHlattice_formation = negative
```

In lecture magnitude notation:

```text
- LE
```

#### Signed ChemDesk-safe equation

Preferred internal ChemDesk equation:

```text
ΔHf = ΔHsub + IE₁ + IE₂ + 1/2DE + ΔHeg₁ + ΔHeg₂ + ΔHlattice_formation
```

Where:

- ΔHsub is positive
- IE₁ is positive
- IE₂ is positive
- 1/2DE is positive
- ΔHeg₁ is usually negative for O → O⁻
- ΔHeg₂ is positive for O⁻ → O²⁻
- ΔHlattice_formation is negative

#### Lecture-style magnitude equation

If using lecture-style magnitudes:

```text
ΔHf = SE + IE₁ + IE₂ + DE/2 - EA₁ + EA₂ - LE
```

This is acceptable only when:

- EA₁ is positive magnitude of first electron affinity released
- EA₂ is energy absorbed for second electron addition
- LE is positive magnitude of energy released in lattice formation

Current notes HTML issue:
The MgO formula line appears to have formatting/notation issues, including possible extra parenthesis and inconsistent `LA`/`LE` notation.

Decision:
review_needed before public update.

---

### 8. First vs second electron addition

concept_id: new_concept_needed
trap_id: new_concept_needed
status: cee_processed
confidence: confirmed

First electron addition to many neutral non-metals is favourable/exothermic.

Example:

```text
O(g) + e⁻ → O⁻(g)
```

Energy usually released:

```text
negative under ChemDesk convention
```

Second electron addition is different:

```text
O⁻(g) + e⁻ → O²⁻(g)
```

Now the species is already negatively charged. Adding another electron is opposed by repulsion, so energy must be supplied.

Energy absorbed:

```text
positive under ChemDesk convention
```

Student confusion signal:
This is the strongest repeated comment cluster in Lecture 03. Students ask why EA₂ is positive and why another electron affinity video may have used different signs.

Decision:
useful_student_confusion + needs_source_check

Required trap box later:

- Electron affinity and electron gain enthalpy sign conventions can differ by textbook/teacher usage.
- Do not mix conventions.
- For ChemDesk: absorbed = positive, released = negative.

---

### 9. Lattice energy factors

concept_id: new_concept_needed
status: cee_processed
confidence: confirmed
source_evidence: notes_html + transcript

Lattice energy depends mainly on:

1. Magnitude of ionic charges.
2. Distance between ions / ionic sizes.

Coulombic attraction idea:

```text
F ∝ q₁q₂ / r²
```

For lattice energy comparison, lecture uses:

```text
LE ∝ charge product
LE ∝ 1/r
```

Important:

- Force and energy are related but not identical.
- Students may confuse force relation with lattice energy relation.
- Notes HTML already warns that force varies as 1/r² but LE is treated as 1/r in the simplified comparison framework.

Rules taught:

- Higher ionic charge → higher lattice energy.
- Smaller ionic size / smaller interionic distance → higher lattice energy.
- If charge and size factors conflict, charge usually dominates in these standard comparisons.

status:
confirmed for lecture framework
review_needed for public wording precision

---

### 10. Lattice energy comparison hierarchy

concept_id: new_concept_needed
trap_id: new_concept_needed
status: cee_processed
confidence: confirmed_for_lecture_framework

Use this decision hierarchy for standard exam-style comparisons:

1. Identify the ions.
2. Compare charge product first.
3. If charge product differs, higher charge product usually gives higher lattice energy.
4. If charges are same, compare ionic size/interionic distance.
5. Smaller ions / smaller distance give higher lattice energy.
6. If charge and size conflict, charge factor usually dominates in simple JEE/NEET-style comparisons unless data indicate otherwise.
7. Do not compare algebraic values of negative charges incorrectly; compare charge magnitude.

Examples taught:

- NaF < MgF₂ < AlF₃ in lattice energy
- Na₂O < MgO < Al₂O₃ in lattice energy
- Li₃N > Li₂O by charge dominance
- NaCl > KCl because Na⁺ is smaller than K⁺
- NaF > NaCl > NaBr because F⁻ is smallest
- MgCl₂ > NaF by charge dominance despite F⁻ being smaller

Student confusion:

- Li₂O vs Li₃N generated repeated comments.
- Students confused `-3` vs `-2` algebraic sign with charge magnitude.
- Add trap: N³⁻ has greater charge magnitude than O²⁻.

---

## 2. Timestamp / Lecture Flow Map

Primary source: notes HTML timestamp links.
Transcript used for verification/refinement.
Student timestamps are support-only.

### Notes HTML primary section map

- 00:39–03:40 — Lattice Energy
- 04:24–05:44 — Born–Haber Cycle of NaCl
- 05:44–08:20 — Heat/Enthalpy of Formation
- 08:24–13:05 — Relation between Lattice Energy and Heat of Formation
- 13:05–14:33 — Introduction to Hess’s Law
- 15:35–20:18 — Born–Haber Cycle of MgO
- 20:18–24:12 — Factors affecting Lattice Energy
- 24:12–31:26 — Lattice Energy Comparison Numericals

timestamp_policy: notes_html_precedence
confidence: confirmed_for_notes_navigation

### Transcript-supported refinement

- 00:07–00:42 — Lecture overview: lattice energy, Born–Haber cycle, factors, comparison questions.
- 00:42–03:14 — Lattice energy definition and reverse definition.
- 03:14–04:30 — No direct method; indirect method needed.
- 04:30–05:38 — Born–Haber cycle as indirect method for lattice energy.
- 05:52–08:21 — Heat of formation and distinction from lattice energy.
- 08:21–14:22 — NaCl Born–Haber derivation and Hess’s law equation.
- 14:22–15:59 — Numerical/use of equation; missing term style.
- 15:59–20:06 — MgO Born–Haber derivation with IE₁, IE₂, EA₁, EA₂.
- 20:38–23:57 — Factors affecting lattice energy: charge and size.
- 24:15–31:08 — Lattice energy comparison examples.
- 31:08–32:06 — Upcoming Fajan’s rule and Lewis dot structure.

confidence: confirmed_for_transcript_flow

### Student/Sift timeline candidates

Student timestamps are useful support only, not primary.

- 07:13 Important
- 08:10 Born Haber cycle
- 13:20 Hess’s law
- 14:34 Question
- 17:06 Question
- 18:04 2nd ionisation enthalpy
- 20:39 Factors on which L.E. depends
- 26:20 application of factors
- 29:14 Important

student_timestamps_status: timestamp_candidate_needs_review

---

## 3. Notes HTML Coverage Check

### Already covered

- Lattice energy definition.
- Reverse definition of lattice energy.
- Born–Haber cycle as indirect method.
- Heat/enthalpy of formation.
- Distinction between heat of formation and lattice energy.
- NaCl Born–Haber steps.
- Hess’s law and Born–Haber equation.
- MgO Born–Haber cycle.
- Factors affecting lattice energy.
- Charge vs size relation.
- Warning that force has r² but lattice energy comparison uses r.
- Comparison numericals.
- Charge dominates over size when both conflict.

### Partially covered / needs refinement

#### A. Global sign convention not explicit

coverage_status: partially_covered
status: review_needed

Current notes use plus/minus signs, but do not clearly state the global rule:

```text
Energy absorbed = positive
Energy released = negative
```

Required update:
Add convention box before Born–Haber equations.

workflow_owner_next: CEE → Anya → Codex

#### B. EA / electron gain enthalpy sign ambiguity

coverage_status: partially_covered
status: add_to_notes_later

Current notes use EA notation. Students are confused about EA₁ and EA₂ signs.

Required update:
Add note distinguishing:

- electron affinity as “energy released” magnitude in some teaching styles
- electron gain enthalpy as signed enthalpy change
- ChemDesk convention: absorbed positive, released negative

workflow_owner_next: CEE → Anya

#### C. MgO formula formatting and notation

coverage_status: unclear
status: review_needed

Current notes HTML formula appears as:

```text
ΔHf = SE + IE1 + IE2 + DE/2 - EA1 + EA2 - LA))
```

Issues:

- possible extra closing parenthesis
- `LA` should probably be standardized as `LE` or explicitly defined
- sign convention needs to be stated before formula

Required update:
Review and replace only after CEE-approved sign convention block is finalized.

workflow_owner_next: CEE + Codex

#### D. Lattice energy comparison decision hierarchy

coverage_status: partially_covered
status: add_to_notes_later

Notes include examples but need a general decision tree.

Required update:
Add hierarchy:

1. charge product
2. size/distance
3. charge dominates when charge and size conflict
4. compare charge magnitude, not algebraic sign
5. moles/stoichiometry only matter in thermochemical equations, not simple per-formula-unit comparison unless question asks total energy for a specified amount

workflow_owner_next: CEE → Anya

#### E. Standard state and half Cl₂ explanation

coverage_status: missing_or_implicit
status: add_to_notes_later

Students are confused about why Na(s), Cl₂(g), 1/2 Cl₂, and Na(g) appear.

Required update:
Add small Born–Haber setup box.

workflow_owner_next: Anya

#### F. Per mole thermochemical equation clarification

coverage_status: missing_or_implicit
status: add_to_notes_later

Students are confused because equations show atoms/ions but lattice energy is per mole.

Required update:
Add note that thermochemical equations are molar equations; coefficients represent moles.

workflow_owner_next: Anya

---

## 4. Student Comment Signal Review

### Signal 1: EA₂ / electron affinity sign confusion

decision: useful_student_confusion + needs_source_check
priority: high
status: review_needed
timestamps: 18:27, 18:40–19:10, 19:38
student_signal_only: true

Student signal summary:
Multiple students ask why EA₂ is taken positive and why another electron affinity lecture may have used the opposite sign.

Chemistry check:

- First electron addition to oxygen is usually energy-releasing.
- Second electron addition to O⁻ is energy-absorbing.
- Under ChemDesk global convention:
  - released = negative
  - absorbed = positive

- Therefore EA₂/second electron gain for O⁻ → O²⁻ should be positive if written as a signed energy change.

Source check result:
Lecture and notes use `+ EA₂`, which is consistent with ChemDesk’s global sign rule if EA₂ represents energy absorbed for the second electron addition.

Remaining issue:
Possible conflict with another electron affinity video remains unverified.

Recommended action:

- Add sign-convention trap box.
- Mark cross-video consistency check as `needs_source_check`.

confidence: probable
workflow_owner_next: CEE

---

### Signal 2: Heat of formation sign confusion

decision: useful_student_confusion
priority: high
status: add_to_notes_later
timestamps: 14:28, 14:53, 15:05

Student signal summary:
Students ask why heat of formation is not negative if energy is released.

Chemistry check:
Under ChemDesk global sign convention, if formation releases energy, ΔHf is negative.

Recommended action:
Add a convention box:

- ΔHf can be negative or positive depending whether the formation reaction releases or absorbs energy.
- For NaCl formation, it is exothermic, so negative.
- Do not confuse the symbol ΔHf with a positive magnitude.

confidence: confirmed_as_student_confusion
workflow_owner_next: Anya

---

### Signal 3: Lattice energy sign confusion

decision: useful_student_confusion
priority: high
status: add_to_notes_later

Student signal summary:
Students ask why lattice energy sometimes appears positive and sometimes negative.

Chemistry check:
Under ChemDesk global sign convention:

- lattice formation from gaseous ions releases energy → negative
- lattice dissociation into gaseous ions absorbs energy → positive

Recommended action:
Add side-by-side comparison:

- lattice formation energy: negative
- lattice dissociation energy: positive

confidence: confirmed
workflow_owner_next: Anya

---

### Signal 4: Li₂O vs Li₃N lattice energy issue

decision: useful_student_confusion + needs_source_check
priority: high
status: review_needed
timestamps: 25:10, 26:20, 26:21, 26:48, 26:49

Student signal summary:
Students debate whether Li₂O or Li₃N has higher lattice energy and whether oxygen has greater charge than nitrogen.

Chemistry check:

- Cation is same: Li⁺.
- Anion charge magnitudes:
  - O²⁻ has charge magnitude 2.
  - N³⁻ has charge magnitude 3.

- N³⁻ is larger than O²⁻, which lowers lattice energy.
- But charge factor generally dominates in this simplified comparison.
- Therefore the lecture’s likely intended conclusion is Li₃N > Li₂O in lattice energy.

Common trap:
Students compare `-2` and `-3` as algebraic numbers. For lattice energy, use magnitude of charge.

Recommended action:

- Add trap box: charge magnitude, not algebraic sign.
- Verify exact board wording around 26:48.

confidence: probable
workflow_owner_next: CEE → Anya

---

### Signal 5: Standard states, gaseous atoms, and half Cl₂

decision: useful_student_confusion
priority: medium
status: add_to_notes_later
timestamps: 7:41, 7:52, 8:24

Student signal summary:
Students ask why Na is taken as solid/gaseous, why chlorine is Cl₂, why half Cl₂ appears, and how sodium can be pure/stable if reactive.

Chemistry check:
These are valid beginner doubts in Born–Haber setup.

Recommended action:
Add setup note:

- start with pure/stable elemental states for ΔHf
- convert to gaseous atoms/ions through steps
- use 1/2 Cl₂ to form one mole NaCl
- natural occurrence is not the same as standard thermochemical state

confidence: confirmed_as_student_confusion
workflow_owner_next: Anya

---

### Signal 6: Lattice energy comparison doubts

decision: useful_student_confusion
priority: medium
status: add_to_notes_later

Student signal summary:
Students ask about NaF vs MgI₂, LiCl/NaCl/KCl/RbCl, LiOH to CsOH, moles, and unusual comparisons.

Chemistry check:
These are useful exam-style application doubts.

Recommended action:
Add decision tree and practice examples.

confidence: confirmed_as_student_confusion
workflow_owner_next: CEE → Anya

---

### Signal 7: CBSE/board scope doubt

decision: needs_source_check
priority: medium
status: coverage_check_needed

Student signal summary:
Students ask whether Born–Haber cycle and lattice energy factors are needed for CBSE Class 11.

Chemistry check:
Not a Chemistry truth issue. Needs official syllabus/source check.

Recommended action:
Add exam-scope review task.

confidence: needs_review
workflow_owner_next: Source Research Agent / human_reviewer

---

### Signal 8: Bond parameters / chapter test / formation diagrams

decision: add_to_notes_later
priority: low
status: resource_planning_signal

Use:

- broader Chemical Bonding planning
- practice module planning
- diagram planning

Not a Lecture 03 correction.

---

## 5. Confirmed / Likely Lecture Issues to Verify or Correct

### Issue 1: EA₂ / electron gain sign convention

issue_id: cb-l03-issue-ea2-sign-convention
decision: needs_source_check
status: review_needed
priority: high

Evidence:

- Strong repeated student signal.
- Transcript says second electron addition needs energy.
- Notes formula uses `+ EA₂`.
- Student comments report possible conflict with another electron affinity video.

ChemDesk chemistry position:
Under global convention, second electron addition to O⁻ is energy absorbed and should be positive.

What to verify:

- Does the earlier electron affinity lecture use a different convention?
- Does the Lecture 03 board label EA₂ as energy absorbed or as electron affinity magnitude?
- Is ChemDesk using signed electron gain enthalpy or lecture-style EA magnitudes?

Recommended file update:

- Add sign-convention trap.
- Do not call Lecture 03 wrong unless cross-video conflict is confirmed.

---

### Issue 2: Heat of formation and lattice energy sign clarity

issue_id: cb-l03-issue-born-haber-sign-clarity
decision: accepted_for_notes_clarification
status: add_to_notes_later
priority: high

Evidence:

- Students repeatedly ask why released energies are not always shown negative.
- Notes currently do not explicitly state the global rule.

ChemDesk rule:

- Energy absorbed = positive.
- Energy released = negative.

Recommended file update:

- Add global sign convention box to Lecture 03 notes.
- Use signed thermochemical notation where possible.
- If magnitude notation is used, label it clearly.

---

### Issue 3: MgO formula formatting in notes HTML

issue_id: cb-l03-issue-mgo-formula-format
decision: accepted_for_verification
status: review_needed
priority: medium

Evidence:
Current notes formula appears to contain:

- extra closing parenthesis
- possible `LA`/`LE` inconsistency
- no explicit sign convention nearby

Recommended action:

- Replace after CEE confirms final notation.
- Suggested lecture-style corrected formula:

```text
ΔHf = SE + IE₁ + IE₂ + DE/2 - EA₁ + EA₂ - LE
```

Only use this if EA₁ and LE are positive magnitudes of released energies, while EA₂ is energy absorbed.

Preferred signed formula:

```text
ΔHf = ΔHsub + IE₁ + IE₂ + 1/2DE + ΔHeg₁ + ΔHeg₂ + ΔHlattice_formation
```

---

### Issue 4: Li₂O vs Li₃N charge-magnitude confusion

issue_id: cb-l03-issue-li2o-li3n-comparison
decision: useful_student_confusion
status: add_to_notes_later
priority: medium

Evidence:
Repeated comments around 26:20–26:49.

Chemistry position:
Li₃N is expected to have higher lattice energy than Li₂O in the lecture’s charge-dominance framework because N³⁻ has greater charge magnitude than O²⁻.

Recommended update:
Add trap note:

- Compare magnitude of charge.
- `3` is greater than `2`; do not compare `-3` and `-2` as ordinary algebraic values.

---

## 6. Student Confusions to Address Later

### cb-l03-confusion-ea-vs-electron-gain-enthalpy-sign

priority: high
status: add_to_notes_later
note_type: sign-convention trap box
workflow_owner_next: CEE → Anya

Key idea:
Students need to know whether the value is being treated as signed enthalpy change or magnitude of energy released/absorbed.

---

### cb-l03-confusion-lattice-energy-vs-lattice-enthalpy

priority: high
status: add_to_notes_later
note_type: terminology comparison box
workflow_owner_next: CEE → Anya

Key idea:
Lattice formation is energy-releasing; lattice dissociation is energy-absorbing.

---

### cb-l03-confusion-heat-of-formation-sign

priority: high
status: add_to_notes_later
note_type: convention note + worked equation
workflow_owner_next: Anya

Key idea:
If formation releases energy, ΔHf is negative under ChemDesk convention.

---

### cb-l03-confusion-standard-state-vs-gaseous-atom

priority: medium
status: add_to_notes_later
note_type: Born–Haber setup box
workflow_owner_next: Anya

Key idea:
The direct route starts from elements in pure/stable states; the stepwise route creates gaseous atoms/ions through hypothetical thermochemical steps.

---

### cb-l03-confusion-half-cl2

priority: medium
status: add_to_notes_later
note_type: balancing note
workflow_owner_next: Anya

Key idea:
Use 1/2 Cl₂ because one mole of NaCl contains one mole of Cl atoms, while chlorine exists as Cl₂.

---

### cb-l03-confusion-per-mole-vs-symbolic-particles

priority: medium
status: add_to_notes_later
note_type: molar thermochemical equation note
workflow_owner_next: Anya

Key idea:
Thermochemical equations represent molar amounts, not one literal atom/ion.

---

### cb-l03-confusion-charge-magnitude-vs-negative-sign

priority: medium
status: add_to_notes_later
note_type: trap box
workflow_owner_next: Anya

Key idea:
For lattice energy, compare magnitude of ionic charge.

---

### cb-l03-confusion-lattice-energy-comparison-hierarchy

priority: medium
status: add_to_notes_later
note_type: decision tree + examples
workflow_owner_next: CEE → Anya

Key idea:
Charge first, size second, charge dominates conflict cases in standard comparisons.

---

## 7. Missing Topic / Source Gap Signals

### CBSE/JEE/BITSAT/TG EAPCET scope of Born–Haber cycle

gap_id: cb-l03-gap-exam-scope-born-haber
status: needs_source_check
priority: medium

Check:

- official CBSE scope
- JEE Main/Advanced relevance
- BITSAT relevance
- TG EAPCET / TGIPE relevance
- whether Born–Haber should be tagged as core, advanced, or optional per exam

workflow_owner_next: Source Research Agent / human_reviewer

---

### Bond parameters lecture request

gap_id: cb-l03-gap-bond-parameters
status: add_to_notes_later
priority: low

Likely belongs later in Chemical Bonding concept map, not Lecture 03.

---

### Chapter test / practice module

gap_id: cb-l03-gap-practice-test
status: resource_planning_signal
priority: low

Useful for later ChemDesk practice roadmap.

---

### Formation diagrams

gap_id: cb-l03-gap-formation-diagrams
status: add_to_notes_later
priority: low

Use through Born–Haber cycle diagrams and ionic formation visuals.

---

## 8. Diagram Needs

### cb-l03-diagram-lattice-energy-forward-reverse

status: needed
essential: yes
purpose:
Show gaseous ions forming ionic solid and reverse lattice dissociation.

Required labels:

- Na⁺(g)
- Cl⁻(g)
- NaCl(s)
- energy released for formation
- energy absorbed for dissociation

Sign labels:

- formation: negative
- dissociation: positive

---

### cb-l03-diagram-born-haber-nacl-cycle

status: needed
essential: yes
purpose:
Show NaCl Born–Haber cycle with direct and indirect paths.

Required labels:

- Na(s)
- 1/2 Cl₂(g)
- Na(g)
- Na⁺(g)
- Cl(g)
- Cl⁻(g)
- NaCl(s)
- SE / ΔHsub
- IE
- DE/2
- ΔHeg or EA note
- ΔHlattice formation
- ΔHf

---

### cb-l03-diagram-born-haber-mgo-cycle

status: needed
essential: yes
purpose:
Show MgO cycle with two ionization steps and two electron-gain steps.

Required labels:

- Mg(s)
- 1/2 O₂(g)
- Mg(g)
- Mg⁺(g)
- Mg²⁺(g)
- O(g)
- O⁻(g)
- O²⁻(g)
- MgO(s)
- IE₁
- IE₂
- ΔHeg₁ negative
- ΔHeg₂ positive
- lattice formation negative

---

### cb-l03-diagram-sign-convention-table

status: needed
essential: yes
purpose:
Prevent sign confusion.

Rows needed:

- sublimation/atomisation: absorbed, positive
- ionization: absorbed, positive
- bond dissociation: absorbed, positive
- first electron gain when released: negative
- second electron gain when absorbed: positive
- lattice formation: released, negative
- lattice dissociation: absorbed, positive
- heat of formation: depends on reaction

---

### cb-l03-diagram-lattice-energy-factor-tree

status: useful
essential: optional
purpose:
Show lattice energy comparison workflow.

Flow:

1. Compare charge product.
2. If same, compare size.
3. If charge and size conflict, charge usually dominates.
4. Watch charge magnitude trap.

---

## 9. Exact Updates Needed in Notes HTML Later

### A. Add global sign-convention box

target_area: before Born–Haber Cycle equations
change_type: insert
status: add_to_notes_later

Instruction:
Add a CEE-approved box:

```text
ChemDesk sign rule:
Energy absorbed = positive.
Energy released = negative.
Do not mix signed values with magnitude-only values.
```

Reason:
This is the central student confusion in Lecture 03.

workflow_owner_next: CEE → Anya → Codex

---

### B. Review and replace MgO formula line

target_area: Born–Haber Cycle of MgO
change_type: review/replace
status: review_needed

Instruction:
Fix formatting and notation after final sign convention wording is approved.

Preferred signed formula:

```text
ΔHf = ΔHsub + IE₁ + IE₂ + 1/2DE + ΔHeg₁ + ΔHeg₂ + ΔHlattice_formation
```

Allowed lecture-style magnitude formula only if explicitly labelled:

```text
ΔHf = SE + IE₁ + IE₂ + DE/2 - EA₁ + EA₂ - LE
```

Reason:
Current formula may confuse due to sign, `LA`, and extra parenthesis.

workflow_owner_next: CEE + Codex

---

### C. Add EA / electron gain enthalpy trap

target_area: Born–Haber Cycle of MgO
change_type: insert
status: add_to_notes_later

Instruction:
Add a trap note:

- first electron addition may release energy
- second electron addition to a negative ion requires energy
- ChemDesk signs: released negative, absorbed positive

workflow_owner_next: Anya

---

### D. Add Born–Haber setup clarification

target_area: Heat/Enthalpy of Formation and NaCl cycle
change_type: insert
status: add_to_notes_later

Instruction:
Add clarification for:

- pure/stable elemental states
- Na(s)
- Cl₂(g)
- 1/2 Cl₂
- conversion to gaseous atoms/ions
- thermochemical equations as molar equations

workflow_owner_next: Anya

---

### E. Add lattice energy comparison decision tree

target_area: Factors affecting Lattice Energy / Numericals
change_type: expand
status: add_to_notes_later

Instruction:
Add decision tree:

1. identify ions
2. compare charge product
3. if same charge, compare size
4. charge dominates when charge and size conflict
5. compare charge magnitude, not algebraic sign
6. do not use number of atoms/moles blindly unless question asks total energy

workflow_owner_next: CEE → Anya

---

### F. Add Li₂O vs Li₃N trap

target_area: Numerical 3 or comparison notes
change_type: insert
status: add_to_notes_later

Instruction:
Add trap note:
N³⁻ has greater charge magnitude than O²⁻. In standard lattice-energy comparison, charge dominance makes Li₃N higher than Li₂O despite N³⁻ being larger.

workflow_owner_next: Anya

---

## 10. Rejected or Weak Signals

- praise-only comments: rejected
- attendance/year-check comments: rejected
- app/batch/social-link promotion: rejected
- spam/self-promotion: rejected
- emoji-only or near-empty comments: rejected
- weak Na + Cl₂ vs Na + Cl correction claim: likely misunderstanding; keep only as standard-state/half-Cl₂ confusion
- “correct answer should be +788/-788” without timestamp: weak sign-convention signal only
- generic chapter test request: resource planning only
- generic notes/PDF request: no Chemistry action unless linked to usable content gap

---

## 11. Final Integration Summary

accepted_corrections:

- none approved yet

confirmed_internal_rules_applied:

- notes HTML takes timestamp precedence when available
- student timestamps are support-only
- energy absorbed = positive
- energy released = negative

likely_lecture_issues_to_verify:

- possible cross-video EA₂ / electron affinity / electron gain enthalpy sign inconsistency
- MgO formula formatting in notes HTML
- Li₂O vs Li₃N board wording around charge magnitude
- whether current notes formula uses signed convention or magnitude convention

needs_source_check:

- prior electron affinity lecture convention
- final ChemDesk notation for EA vs ΔHeg
- exact video wording at EA₂ confusion timestamps
- CBSE/JEE/BITSAT/TG EAPCET scope of Born–Haber cycle

student_confusions_to_add_later:

- EA₂ positive/negative confusion
- electron affinity vs electron gain enthalpy
- lattice energy vs lattice enthalpy
- heat of formation sign
- standard state vs gaseous atom
- why 1/2 Cl₂ is used
- per mole thermochemical equations
- charge magnitude vs signed negative numbers
- lattice energy comparison hierarchy

diagram_needs:

- forward/reverse lattice energy
- Born–Haber cycle for NaCl
- Born–Haber cycle for MgO
- sign convention table
- lattice energy comparison decision tree

overall_status: cee_processed

next_best_action:
CEE should standardize the final public Born–Haber notation before Anya writes student-facing prose or Codex edits the HTML. Use ChemDesk global sign convention: energy absorbed is positive; energy released is negative.

```

```

LECTURE 04 : FAJAN's RULE

Lecture 04 sources used: notes HTML as the primary notes/timestamp source, transcript for lecture flow and chemistry verification, and Sift comments as student-signal evidence only. The notes HTML covers Fajan’s rule, polarization, cation/anion factors, PNGC, applications, and examples; the Sift report flags thermal stability as the strongest missing-topic signal plus several high-value confusion clusters; the transcript confirms the lecture’s main flow and application examples.

```md id="lecture-04-fajans-rule-addendum"
---
# Lecture 04 — Fajan’s Rule

lecture_id: lecture-04-fajans-rule
lecture_title: Fajan’s Rule
chapter_id: chemical-bonding
source_video: https://youtu.be/d3iFlT8SlvA

source_files_used:
  - 04_fajans_rule.txt
  - 04_fajans_rule.html
  - comments-04-fajans-rule.final.md

source_status:
  - transcript: raw_hinglish_internal_source
  - notes_html: current_chemdesk_notes_state
  - comments: sift_final_student_signal_only_unverified

truth_status: review_needed
public_display: false
public_rag_eligible: false
pagefind_index: false
cee_review_required: true
overall_status: cee_processed
---

## 0. Local Evidence Rules Applied

timestamp_policy: notes_html_precedence

Because notes HTML is available for Lecture 04, embedded notes HTML video ranges are the primary timestamp/navigation source. Transcript timestamps are used to verify and refine lecture flow. Student/Sift timestamps are support-only navigation candidates and must not override notes HTML unless verified against video.

student_comments_policy: student_signal_only

Sift comments are used only to detect student confusion, likely missing topics, possible weak corrections, and navigation candidates. They are not Chemistry authority.

global_energy_sign_convention: not directly central in this lecture

No Born–Haber-style energy-sign convention is central here. However, Fajan’s rule is connected to lattice energy, melting point, solubility, and ionic/covalent character, so comparison rules must be kept separate and not overgeneralized.

---

## 1. Lecture Concept Spine

### 1. Fajan’s rule purpose

concept_id: new_concept_needed  
status: cee_processed  
confidence: confirmed  
source_evidence:

- transcript
- notes_html

Fajan’s rule is introduced as a qualitative rule used to compare covalent character in ionic compounds.

Core idea:

- No bond is perfectly ionic or perfectly covalent.
- Ionic compounds may show partial covalent character.
- Fajan’s rule helps compare which ionic compound has more covalent character.

Important limitation:

- It is qualitative, not quantitative.
- It cannot safely tell exact percentage covalent character.
- It compares relative covalent character between given compounds.

exam_relevance:

- JEE/NEET-style comparison questions.
- Melting point, boiling point, solubility, and colour trends based on covalent character.

---

### 2. Covalent character in ionic compounds

concept_id: new_concept_needed  
status: cee_processed  
confidence: confirmed  
source_evidence:

- transcript
- notes_html

Lecture explains covalent character in ionic compounds through distortion of anion electron cloud by the cation.

Mechanism:

- Cation attracts/distorts the electron cloud of the anion.
- Anion electron cloud becomes deformed/polarized.
- This distortion gives partial sharing-like character.
- More distortion means more covalent character.

Terminology:

- anion undergoes polarization
- cation has polarizing power

trap:
Do not say electrons are fully shared as in a pure covalent bond. It is partial covalent character due to polarization.

---

### 3. Polarization of anion

concept_id: new_concept_needed  
status: cee_processed  
confidence: confirmed

Polarization means deformation/distortion of the anion’s electron cloud due to attraction by the cation.

More polarization of anion → more covalent character.

Factors increasing anion polarization:

- larger anion size
- higher anion charge magnitude

diagram_needed:

- spherical anion electron cloud becoming distorted toward cation
- label cation, anion, electron cloud, polarization

---

### 4. Polarizing power of cation

concept_id: new_concept_needed  
status: cee_processed  
confidence: confirmed

Polarizing power is the ability of a cation to distort the electron cloud of the anion.

More polarizing power of cation → more covalent character.

Factors increasing cation polarizing power:

- smaller cation size
- higher cation charge
- pseudo noble gas configuration / d10 configuration in certain cations

---

### 5. Effect of cation size

concept_id: new_concept_needed  
status: cee_processed  
confidence: confirmed

Smaller cation has higher charge density and stronger polarizing power.

Trend examples:

- Li⁺ > Na⁺ > K⁺ > Rb⁺ in polarizing power
- Be²⁺ > Mg²⁺ > Ca²⁺ > Sr²⁺ in polarizing power

Application:
For same anion and same cation charge, smaller cation gives more covalent character.

---

### 6. Effect of cation charge

concept_id: new_concept_needed  
status: cee_processed  
confidence: confirmed

Higher cation charge increases polarizing power.

Example:
Na⁺ < Mg²⁺ < Al³⁺ in polarizing power, especially because they are nearby in the same period, so charge dominates over small size differences.

Student confusion link:
Students ask whether oxidation state affects polarizing power. Yes: higher positive charge/oxidation state generally increases polarizing power, when comparison is otherwise reasonable.

---

### 7. Pseudo noble gas configuration / PNGC

concept_id: new_concept_needed  
status: review_needed  
confidence: confirmed_for_topic_presence

Lecture teaches that some cations with pseudo noble gas configuration have unusually high polarizing power and hence high covalent character.

Configuration pattern taught:

- ns² np⁶ nd¹⁰ / d¹⁰-type pseudo noble gas configuration
- often referred to as 18-electron pseudo noble gas configuration

Important cation examples:

- Cu⁺, Ag⁺, Au⁺
- Zn²⁺, Cd²⁺, Hg²⁺

Chemistry note:

- The examples are important for JEE-style exception/trap questions.
- Copper electronic configuration should be checked carefully because Sift retained one weak comment claiming possible copper configuration issue.
- Transcript gives Cu as [Ar] 3d¹⁰ 4s¹ and Cu⁺ as [Ar] 3d¹⁰, which is chemically acceptable.

status:

- concept confirmed
- weak possible correction about copper configuration rejected unless video/board shows actual mismatch

trap:
Do not compare only size when PNGC cations like Cu⁺/Ag⁺ appear. Their polarizing power can make compounds more covalent than expected.

---

### 8. Effect of anion size

concept_id: new_concept_needed  
status: cee_processed  
confidence: confirmed

Larger anions are more easily polarized because their electron cloud is more diffuse and less tightly held.

Trend:

- I⁻ is more polarizable than Br⁻
- Br⁻ is more polarizable than Cl⁻
- Cl⁻ is more polarizable than F⁻

Application:
For same cation and same anion charge, larger anion gives more covalent character.

Notes HTML issue:
In the anion section, notes HTML says “larger the cation” under “Size of anion.” This is likely a typo. It should say “larger the anion.”

status:

- accepted_for_notes_correction
- public wording still to be handled by Anya/Codex

---

### 9. Effect of anion charge

concept_id: new_concept_needed  
status: cee_processed  
confidence: confirmed

Higher anion charge magnitude generally increases polarization.

Example principle:
O²⁻ is more polarizable than F⁻ if charge comparison is the key factor, but comparisons must consider actual ion size and context.

trap:
Compare charge magnitude, not algebraic negative value.

---

### 10. Fajan’s rule summary

concept_id: new_concept_needed  
status: cee_processed  
confidence: confirmed

Covalent character of an ionic compound increases when:

Cation side:

- smaller cation
- higher cation charge
- cation has PNGC / d¹⁰ configuration

Anion side:

- larger anion
- higher anion charge

Core summary:
More cation polarizing power + more anion polarization → more covalent character.

---

### 11. Applications of Fajan’s rule

concept_id: new_concept_needed  
status: review_needed  
confidence: confirmed_for_lecture_framework

Lecture applies Fajan’s rule to:

- melting point
- boiling point
- solubility in water
- colour / colour imparting nature
- volatility/physical state in examples like SnCl₄ vs SnCl₂

Lecture trend:
More covalent character usually implies:

- less ionic character
- lower melting/boiling point
- lower solubility in water
- greater colour imparting nature
- more volatile / less strongly ionic behaviour in suitable examples

Review note:
These are useful exam heuristics, but should not be overextended blindly. Melting point and solubility can depend on additional factors. Add boundary-condition warning later.

---

### 12. Melting point and boiling point applications

concept_id: new_concept_needed  
status: cee_processed  
confidence: probable

Lecture uses:

- BeF₂ vs MgF₂ → MgF₂ higher melting point because BeF₂ has more covalent character.
- CaCl₂ vs CaBr₂ → CaCl₂ higher melting point because CaBr₂ has more covalent character.
- NaCl vs CuCl → NaCl higher melting point because Cu⁺ PNGC increases covalent character in CuCl.
- KCl vs AgCl → KCl higher melting point because Ag⁺ PNGC increases covalent character in AgCl.

Student confusion:
Students ask why melting point, lattice energy, and covalent character do not always align as one simple rule.

Action:
Add comparison-boundary note later.

---

### 13. Solubility applications

concept_id: new_concept_needed  
status: cee_processed  
confidence: probable

Lecture uses:

- Fe(OH)₃ vs Fe(OH)₂ → Fe(OH)₂ more soluble because Fe³⁺ gives Fe(OH)₃ more covalent character.
- Ag₂O vs Ag₂S → Ag₂O more soluble because S²⁻ is larger and makes Ag₂S more covalent.

Student confusion:
Fe(OH)₃ vs Fe(OH)₂ caused a precise student doubt about treating three OH⁻ ions as total -3 charge. This is a useful trap.

Clarification needed later:
For Fajan-style comparison in Fe(OH)₃ vs Fe(OH)₂, compare Fe³⁺ vs Fe²⁺ cation polarizing power with OH⁻ as the relevant anion unit. Do not treat “three OH⁻” as one anion with -3 charge.

---

### 14. Colour applications

concept_id: new_concept_needed  
status: cee_processed  
confidence: probable

Lecture uses:

- AgF, AgCl, AgBr, AgI trend: AgI darkest due to largest anion and greatest covalent character.
- PbCl₂ vs PbI₂: PbI₂ darker/yellow due to iodide’s higher polarizability; PbCl₂ is white.

Review note:
Colour explanations can involve more advanced electronic effects. Keep Fajan’s rule as a qualitative exam-level heuristic unless source depth is added.

---

### 15. Volatility / physical state application

concept_id: new_concept_needed  
status: cee_processed  
confidence: probable

Lecture uses:

- SnCl₄ is volatile liquid while SnCl₂ is solid.
- Explanation: Sn⁴⁺ has higher charge than Sn²⁺, so SnCl₄ has more covalent character.

Review note:
This example is useful but should be handled carefully in final notes because “both are ionic but one more covalent” is a simplification. Mark as lecture-framework probable.

---

## 2. Timestamp / Lecture Flow Map

Primary source: notes HTML timestamp links.  
Transcript used for verification/refinement.  
Student timestamps are support-only.

### Notes HTML primary section map

- 00:19–02:57 — Intro to Fajan’s Rule
- 03:09–08:16 — Why ionic bonds have covalent character / polarization
- 08:16–19:18 — Cation factors affecting polarizing power
- 19:21–21:20 — Anion factors affecting polarization
- 21:29–25:06 — Fajan’s Rule summary
- 29:16–31:14 — Applications: covalent character vs solubility, MP/BP, colour
- 26:51–29:09 — Basic covalent-character comparison examples
- 31:11–39:26 — Application examples: MP, solubility, colour, volatility

timestamp_policy: notes_html_precedence  
confidence: confirmed_for_notes_navigation

### Transcript-supported refinement

- 00:08–02:57 — Fajan’s rule purpose, qualitative nature, relation to covalent character and applications.
- 03:12–08:13 — Polarization of anion by cation; origin of covalent character.
- 08:13–11:45 — Cation size and cation charge.
- 12:04–19:15 — PNGC / d10 cations: Cu⁺, Ag⁺, Au⁺, Zn²⁺, Cd²⁺, Hg²⁺.
- 19:15–21:20 — Anion size and charge.
- 21:29–26:48 — Summary of factors and lecture guidance.
- 26:48–29:09 — Covalent-character comparison examples: NaCl/KCl/RbCl, BeCl₂/MgCl₂/CaCl₂, NaCl/NaBr/NaI.
- 29:09–30:41 — Applications: solubility, melting/boiling point, colour.
- 31:12–33:18 — Melting point examples.
- 33:18–35:00 — Solubility examples.
- 35:00–37:12 — Colour examples.
- 37:12–39:26 — SnCl₄ vs SnCl₂ volatility/solid-state example.

confidence: confirmed_for_transcript_flow

### Student/Sift timeline candidates

Student/Sift timestamp candidates:

- 25:10 — possible key explanation point; support only.
- 33:20 — Fe(OH)₃ vs Fe(OH)₂ application doubt.

student_timestamps_status: timestamp_candidate_needs_review

---

## 3. Notes HTML Coverage Check

### Already covered

- Fajan’s rule introduction.
- Qualitative nature of Fajan’s rule.
- Ionic bonds having partial covalent character.
- Polarization of anion.
- Polarizing power of cation.
- Cation size and charge factors.
- PNGC/d10 examples.
- Anion size and charge factors.
- Summary of Fajan’s rule.
- Applications to melting/boiling point, solubility, colour, volatility.
- Multiple worked comparison examples.

### Partially covered / needs refinement

#### A. Anion size typo

coverage_status: unclear/error_in_notes  
status: review_needed

Current notes HTML says under anion factors:
“Size of anion → larger the cation...”

Likely correction:
“larger the anion...”

recommended_action:
Codex/Anya should correct after CEE/human review.

#### B. Spelling standardization

coverage_status: partially_covered  
status: add_to_notes_later

Standard spelling should be:
Fajan’s Rule

Do not use:
Fazan’s Rule

Comments report flags this as a weak metadata/search issue.

#### C. PNGC explanation

coverage_status: already_covered_but_needs_review  
status: review_needed

Notes cover PNGC and examples. Verify final wording:

- “PNGC is a configuration like noble gas” may confuse because it is not simply normal noble gas octet.
- Better internal concept: pseudo noble gas / 18-electron d10-type configuration that gives strong polarizing power.

No final prose yet.

#### D. Application boundary conditions

coverage_status: partially_covered  
status: add_to_notes_later

Notes state application trends. Add later warning:
Fajan’s rule gives qualitative covalent-character trends. Melting point, solubility, colour, and lattice energy may involve other factors. Do not collapse all trends into one universal rule.

#### E. Thermal stability / thermal decomposition

coverage_status: missing  
status: needs_source_check

Sift comments strongly flag thermal stability / thermal decomposition as missing application. Check exam scope and whether it belongs here or later.

#### F. Fe(OH)₃ vs Fe(OH)₂ trap

coverage_status: partially_covered  
status: add_to_notes_later

Notes include the example but should later add a trap:
Do not combine three OH⁻ into one “-3 anion” for Fajan’s rule. Compare Fe³⁺ vs Fe²⁺ with OH⁻ as common anion unit.

#### G. Older notes examples placeholders

coverage_status: unclear/incomplete  
status: review_needed

HTML contains older examples with placeholders like q6/a6/q7/a7 and one apparent malformed item “CaCl₂, Ca₂”. These should be reviewed before public polish.

recommended_action:
Codex should not blindly preserve placeholders in final student-facing notes.

---

## 4. Student Comment Signal Review

### Signal 1: Thermal stability / thermal decomposition missing

decision: needs_source_check + add_to_notes_later  
priority: high  
timestamps_if_any: none  
student_signal_summary:
Students repeatedly say thermal stability, thermal decomposition, and heating effect as applications of Fajan’s rule are missing.

chemistry_check:
Thermal stability/decomposition can be related to ionic/covalent character in some inorganic trends, but it needs scope checking. It should not be added blindly as a direct universal Fajan’s rule consequence.

source_check_result:
Not clearly covered in Lecture 04 notes/transcript. Student signal is strong enough to create a source-gap task.

recommended_action:
Add source gap: thermal stability/decomposition under Fajan’s rule applications.

confidence: probable_as_gap  
workflow_owner_next: CEE/source_research/human_reviewer

---

### Signal 2: Confusion linking covalent character, ionic character, lattice energy, and melting point

decision: useful_student_confusion  
priority: high  
timestamps_if_any: none  
student_signal_summary:
Students ask whether higher lattice energy means higher covalent character, whether ionic character is simply 100 minus covalent character, and why melting point trends do not always match expected covalent-character trends.

chemistry_check:
This is a real trap. Lattice energy depends strongly on charge and size. Fajan’s rule predicts covalent character through polarization. These concepts are related but not identical.

source_check_result:
Lecture applies Fajan’s rule to MP/BP and solubility. Student comments show students are overgeneralizing.

recommended_action:
Add a comparison framework:

- Fajan’s rule → covalent character
- lattice energy → charge/size electrostatic stabilization
- melting point → often follows ionic strength but can have additional factors
- ionic/covalent character percentages should not be assumed exact complements unless using a defined model

confidence: confirmed_as_student_confusion  
workflow_owner_next: CEE → Anya

---

### Signal 3: Both cation and anion changing in comparison

decision: useful_student_confusion  
priority: high  
timestamps_if_any: none  
student_signal_summary:
Students ask how to compare when both cation and anion differ.

chemistry_check:
Valid application gap. Fajan’s rule comparisons are safest when one ion is common. When both ions change, multiple factors compete and answer may need a hierarchy or data.

source_check_result:
Lecture mostly uses common-cation/common-anion examples, with some PNGC exceptions.

recommended_action:
Add boundary-condition note:
Use Fajan’s rule confidently when one ion is common; when both change, compare cation polarizing power and anion polarizability separately and mark uncertain if factors conflict.

confidence: confirmed_as_student_confusion  
workflow_owner_next: CEE → Anya

---

### Signal 4: Oxidation state affects polarizing power

decision: useful_student_confusion  
priority: medium  
timestamps_if_any: none  
student_signal_summary:
Student asks whether oxidation state affects polarising power.

chemistry_check:
Higher positive charge on cation generally increases polarizing power.

source_check_result:
Lecture explicitly teaches higher cation charge increases polarizing power.

recommended_action:
Add this as a small FAQ/trap under cation charge.

confidence: confirmed  
workflow_owner_next: Anya

---

### Signal 5: Fe(OH)₃ vs Fe(OH)₂ grouped-ion confusion

decision: useful_student_confusion  
priority: medium  
timestamps_if_any: 33:20  
student_signal_summary:
Student asks whether Fe(OH)₃ should be treated as having total -3 anion charge compared with Fe(OH)₂.

chemistry_check:
For this comparison, OH⁻ is the anion in both compounds; compare Fe³⁺ vs Fe²⁺. Do not treat multiple OH groups as one polyatomic anion of -3 for Fajan-style reasoning.

source_check_result:
Transcript includes Fe(OH)₃ vs Fe(OH)₂ solubility example around 33:18.

recommended_action:
Add trap note to example.

confidence: confirmed_as_useful_confusion  
workflow_owner_next: CEE → Anya

---

### Signal 6: Coordinate bond vs Fajan’s rule relation

decision: useful_student_confusion  
priority: low  
timestamps_if_any: none  
student_signal_summary:
Student asks whether coordinate bond and Fajan’s rule are related.

chemistry_check:
Both involve covalent character/sharing language, but Fajan’s rule explains partial covalent character in ionic compounds through polarization. Coordinate bond is a covalent bond type where both shared electrons come from one donor.

recommended_action:
Add cross-link only if students repeatedly ask; not a core Lecture 04 note.

confidence: probable  
workflow_owner_next: Anya

---

### Signal 7: Isomorphism, back bonding, ionic mobility, coordination number, lattice enthalpy

decision: needs_source_check  
priority: medium  
timestamps_if_any: none  
student_signal_summary:
Students request related or missing advanced topics.

chemistry_check:
These are mostly cross-links or later topics, not direct Lecture 04 corrections.

recommended_action:
Classify by destination:

- isomorphism → Lecture 02 / ionic crystal properties
- back bonding → advanced bonding/covalent discussion
- ionic mobility → electrochemistry/transport or ionic properties
- coordination number → solid state/crystal structure
- lattice enthalpy → Lecture 03 terminology

confidence: possible  
workflow_owner_next: CEE/source_research

---

### Signal 8: Fajan’s vs Fazan’s spelling

decision: accepted_for_metadata_cleanup  
priority: low  
timestamps_if_any: none  
student_signal_summary:
Student flags spelling.

chemistry_check:
Standard spelling is Fajan’s rule.

recommended_action:
Standardize title, metadata, aliases, and search terms to “Fajan’s Rule.” Keep “Fazan” only as possible search alias if useful.

confidence: confirmed  
workflow_owner_next: Codex/content_metadata

---

## 5. Confirmed / Likely Lecture Issues to Verify or Correct

### Issue 1: Notes HTML typo in anion size rule

issue_id: cb-l04-issue-anion-size-typo  
issue: Under anion factors, notes HTML appears to say larger cation instead of larger anion.  
decision: accepted_for_verification  
status: review_needed  
timestamp_candidates: notes_html section 19:21–21:20  
chemistry_reason:
For anion polarization, larger anion size increases polarizability and covalent character. “Larger cation” in that line is likely a typo.

source_evidence:

- notes_html
- transcript

what_to_verify:
Confirm exact HTML line and correct to “larger anion.”

recommended_file_update:
Correct notes HTML after review.

workflow_owner_next: CEE → Codex

---

### Issue 2: Fajan’s spelling standardization

issue_id: cb-l04-issue-fajans-spelling  
issue: Standardize spelling as Fajan’s Rule.  
decision: accepted_for_metadata_cleanup  
status: add_to_notes_later  
timestamp_candidates: none  
chemistry_reason:
Standard naming/search metadata should use Fajan’s, not Fazan’s.

source_evidence:

- comments_signal
- lecture/notes title already mostly uses Fajan’s

what_to_verify:
Check filenames, page titles, internal links, aliases.

recommended_file_update:
Use Fajan’s Rule consistently. Optional alias: Fazan’s Rule for search only.

workflow_owner_next: Codex

---

### Issue 3: Copper configuration weak claim

issue_id: cb-l04-issue-copper-configuration-weak  
issue: One student suggests Cu configuration in PNGC may be wrong.  
decision: rejected_or_low_priority_verify  
status: weak_signal  
timestamp_candidates: none  
chemistry_reason:
Transcript/notes use Cu = [Ar]3d¹⁰4s¹ and Cu⁺ = [Ar]3d¹⁰, which is chemically acceptable.

source_evidence:

- comments_signal
- transcript
- notes_html

what_to_verify:
Only verify if board screenshot/video review is already being done.

recommended_file_update:
No action unless video contradicts transcript/notes.

workflow_owner_next: CEE

---

### Issue 4: Incomplete older notes examples/placeholders

issue_id: cb-l04-issue-older-examples-placeholders  
issue: Notes HTML contains placeholder-looking entries such as q6/a6/q7/a7 and possibly malformed “CaCl₂, Ca₂.”  
decision: accepted_for_verification  
status: review_needed  
timestamp_candidates: older notes examples section  
chemistry_reason:
Placeholders should not be public-facing. Some examples may be incomplete or malformed.

source_evidence:

- notes_html

what_to_verify:
Check full HTML examples against transcript and intended notes.

recommended_file_update:
Codex should clean/remove placeholders only after CEE confirms intended examples.

workflow_owner_next: CEE → Codex

---

## 6. Student Confusions to Address Later

### cb-l04-confusion-covalent-vs-ionic-character-complement

priority: high  
source_signal: comments_md  
chemistry_basis:
Fajan’s rule is qualitative. Ionic and covalent character can be discussed as opposing trends, but exact percentage complement requires a defined quantitative model.

suggested_note_type: FAQ/trap box  
workflow_owner_next: Anya  
status: add_to_notes_later

---

### cb-l04-confusion-lattice-energy-vs-covalent-character

priority: high  
source_signal: comments_md  
chemistry_basis:
Lattice energy is mainly electrostatic charge/size stabilization; Fajan’s rule predicts polarization/covalent character. They should not be collapsed into one rule.

suggested_note_type: comparison table  
workflow_owner_next: CEE → Anya  
status: add_to_notes_later

---

### cb-l04-confusion-both-ions-changing

priority: high  
source_signal: comments_md  
chemistry_basis:
Comparisons are easiest when one ion is common. When both ions change, factors can compete and a strict answer may need deeper analysis or data.

suggested_note_type: decision framework + boundary warning  
workflow_owner_next: CEE → Anya  
status: add_to_notes_later

---

### cb-l04-confusion-polyatomic-ion-charge-in-fajans-rule

priority: medium  
source_signal: Fe(OH)₃ vs Fe(OH)₂ comment  
chemistry_basis:
Do not combine multiple identical anions into one artificial charge for Fajan’s rule; compare actual cation charge/polarizing power and anion polarizability.

suggested_note_type: trap note below Fe(OH)₃ vs Fe(OH)₂ example  
workflow_owner_next: Anya  
status: add_to_notes_later

---

### cb-l04-confusion-oxidation-state-and-polarizing-power

priority: medium  
source_signal: comments_md  
chemistry_basis:
Higher positive charge/oxidation state increases polarizing power.

suggested_note_type: FAQ under cation charge  
workflow_owner_next: Anya  
status: add_to_notes_later

---

### cb-l04-confusion-coordinate-bond-vs-fajans-rule

priority: low  
source_signal: comments_md  
chemistry_basis:
Coordinate bond is a covalent bond subtype; Fajan’s rule explains partial covalent character in ionic compounds through polarization.

suggested_note_type: cross-link note only if needed  
workflow_owner_next: Anya  
status: add_to_notes_later

---

## 7. Missing Topic / Source Gap Signals

### Thermal stability / thermal decomposition

gap_id: cb-l04-gap-thermal-stability-decomposition  
priority: high  
source_signal: repeated student comments, one high-like missing-topic signal  
why_it_matters:
Students expect Fajan’s rule application to thermal stability/heating/decomposition trends. This may be exam-relevant.

check_needed:
Check syllabus, notes sequence, and whether thermal stability belongs in Fajan’s rule page or a later inorganic trends page.

possible_destination:
Fajan’s rule applications addendum or separate “thermal stability trends” box.

workflow_owner_next: CEE/source_research/human_reviewer  
status: needs_source_check

---

### Isomorphism details and factors

gap_id: cb-l04-gap-isomorphism-details  
priority: medium  
source_signal: comments_md  
why_it_matters:
Could be relevant to Lecture 02 rather than Fajan’s rule.

check_needed:
Check Lecture 02 isomorphism section and whether a dedicated crystal-property explanation is needed.

possible_destination:
Lecture 02 addendum / ionic compound properties.

workflow_owner_next: CEE  
status: needs_source_check

---

### Back bonding

gap_id: cb-l04-gap-back-bonding  
priority: medium  
source_signal: comments_md  
why_it_matters:
Advanced bonding topic; likely not Lecture 04 core.

check_needed:
Check Chemical Bonding sequence for covalent/coordinate/back bonding coverage.

possible_destination:
Advanced bonding backlog.

workflow_owner_next: CEE/source_research  
status: needs_source_check

---

### Ionic mobility

gap_id: cb-l04-gap-ionic-mobility  
priority: low  
source_signal: comments_md  
why_it_matters:
May belong in electrochemistry, conductivity, or ionic properties rather than Fajan’s rule.

check_needed:
Classify correct chapter/location.

possible_destination:
Cross-link/backlog.

workflow_owner_next: CEE  
status: needs_source_check

---

### Coordination number

gap_id: cb-l04-gap-coordination-number  
priority: low  
source_signal: comments_md  
why_it_matters:
Likely belongs in solid state/crystal structure.

check_needed:
Check later lecture sequence.

possible_destination:
Solid state / ionic lattice cross-link.

workflow_owner_next: CEE  
status: needs_source_check

---

### Practice sheets / JEE Advanced examples

gap_id: cb-l04-gap-practice-advanced  
priority: low  
source_signal: comments_md  
why_it_matters:
Resource planning signal.

check_needed:
Later practice module planning.

possible_destination:
Chapter practice section.

workflow_owner_next: Anya/Codex  
status: add_to_notes_later

---

## 8. Diagram Needs

### cb-l04-diagram-polarization-of-anion

status: needed  
purpose:
Show spherical anion electron cloud distorted toward a cation.

required_labels:

- cation
- anion
- electron cloud before polarization
- polarized/deformed electron cloud
- direction of pull
- polarization of anion
- polarizing power of cation

common_incorrect_versions:

- showing full covalent bond instead of partial distortion
- showing cation being polarized instead of anion
- omitting electron cloud deformation

essential: yes  
workflow_owner_next: Diagram/Visual Agent → Codex

---

### cb-l04-diagram-fajans-rule-factor-tree

status: needed  
purpose:
Summarize factors increasing covalent character.

required_labels:

- cation polarizing power
- small cation size
- high cation charge
- PNGC/d10
- anion polarization
- large anion size
- high anion charge

common_incorrect_versions:

- mixing cation size rule with anion size rule
- saying larger cation increases polarizing power

essential: yes  
workflow_owner_next: Diagram/Visual Agent → Codex

---

### cb-l04-diagram-application-flow

status: useful  
purpose:
Show more covalent character leads to lower ionic character, lower MP/BP, lower water solubility, greater colour/volatility tendencies.

required_labels:

- more covalent character
- less ionic character
- lower MP/BP
- lower water solubility
- greater colour tendency
- qualitative only

common_incorrect_versions:

- presenting trends as absolute universal laws
- implying exact percentage complement without model

essential: no  
workflow_owner_next: Anya/Codex

---

## 9. Exact Updates Needed in Notes HTML Later

### A. Correct anion size typo

target_area: Anion - factors affecting polarisation  
change_type: replace  
instruction:
Replace “larger the cation” with “larger the anion” in the size of anion rule.

reason:
Chemically, larger anions are more polarizable.

depends_on:
CEE/human quick review

workflow_owner_next: Codex  
status: review_needed

---

### B. Standardize spelling

target_area: title, headings, metadata, search aliases  
change_type: review  
instruction:
Use “Fajan’s Rule” consistently. Do not use “Fazan’s Rule” except possibly as a search alias.

reason:
Standard spelling and search reliability.

depends_on:
metadata cleanup decision

workflow_owner_next: Codex  
status: add_to_notes_later

---

### C. Add application-boundary note

target_area: Applications section  
change_type: insert  
instruction:
Add a later Anya-written caution that Fajan’s rule is qualitative; MP/BP, solubility, colour, and lattice energy may involve additional factors.

reason:
Student comments show overgeneralization.

depends_on:
CEE-approved wording

workflow_owner_next: Anya  
status: add_to_notes_later

---

### D. Add Fajan vs lattice energy comparison note

target_area: Applications or trap section  
change_type: insert  
instruction:
Add comparison note distinguishing Fajan’s rule/covalent character from lattice energy/charge-size electrostatics.

reason:
High-value student confusion.

depends_on:
CEE concept approval

workflow_owner_next: CEE → Anya  
status: add_to_notes_later

---

### E. Add thermal stability source-gap marker

target_area: Applications section or source-gap backlog  
change_type: review  
instruction:
Do not add final public thermal stability explanation yet. First check scope and source support.

reason:
Strong student missing-topic signal but not verified in lecture/notes.

depends_on:
source research / human review

workflow_owner_next: CEE/source_research  
status: needs_source_check

---

### F. Add Fe(OH)₃ vs Fe(OH)₂ trap note

target_area: Fe(OH)₃ vs Fe(OH)₂ example  
change_type: insert  
instruction:
Add later trap note explaining not to treat three OH⁻ as one -3 anion for Fajan’s rule; compare Fe³⁺ vs Fe²⁺ with OH⁻ common.

reason:
Timestamped student confusion at 33:20.

depends_on:
Anya wording

workflow_owner_next: CEE → Anya  
status: add_to_notes_later

---

### G. Clean older examples placeholders

target_area: OLDER NOTES EXAMPLES accordion  
change_type: review/replace  
instruction:
Review placeholder entries such as q6/a6/q7/a7 and malformed-looking examples before public polish.

reason:
HTML appears incomplete in older examples.

depends_on:
CEE review of transcript and intended examples

workflow_owner_next: Codex  
status: review_needed

---

## 10. Rejected or Weak Signals

- praise-only comments: rejected
- attendance/year-check comments: rejected
- generic dependency/praise comments: rejected
- practice-sheet requests: resource_planning_signal only
- copper configuration issue: weak_signal; no action unless video review contradicts transcript/notes
- Fajan/Fazan spelling: metadata cleanup, not Chemistry correction
- 25:10 praised key section: timestamp_candidate_needs_review only
- “lattice enthalpy is missing”: likely Lecture 03 terminology cross-link, not Lecture 04 correction

---

## 11. Review Checklist for Human / CEE

- Verify notes HTML typo in anion factor.
- Verify full older examples section and remove placeholders.
- Decide whether thermal stability/decomposition belongs under Fajan’s rule for ChemDesk target exams.
- Check if Fajan’s rule applications need a “qualitative only” warning.
- Check colour examples for desired depth and avoid overclaiming.
- Check SnCl₄/SnCl₂ explanation for wording safety.
- Decide if “PNGC” should be named exactly this way or standardized as pseudo noble gas / d10 configuration.
- Add cross-links to Lecture 03 lattice energy and Lecture 02 ionic properties.
- Do not convert student comments into public wording.
- Do not mark anything approved without human review.

---

## 12. Final Integration Summary

accepted_corrections:

- notes_html anion-size typo likely correction: larger anion, not larger cation
- standardize spelling as Fajan’s Rule

likely_lecture_issues_to_verify:

- older notes examples placeholders/malformed entries
- copper configuration weak claim only if video review is done
- application examples should be checked for final wording safety

needs_source_check:

- thermal stability / thermal decomposition as Fajan’s rule application
- both-cation-and-anion-changing comparison rules
- isomorphism/back bonding/ionic mobility/coordination number destination
- colour/volatility application depth for target exams

student_confusions_to_add_later:

- lattice energy vs covalent character
- ionic character vs covalent character complement
- Fajan’s rule when both ions change
- oxidation state and polarizing power
- Fe(OH)₃ vs Fe(OH)₂ polyatomic-ion trap
- coordinate bond vs Fajan’s rule

missing_topics_or_gaps:

- thermal stability/decomposition
- practice/examples for advanced comparisons
- cross-links to isomorphism, lattice enthalpy, back bonding, coordination number

diagram_needs:

- polarization of anion
- Fajan’s rule factor tree
- application flow with qualitative warning

rejected_signals:

- praise/noise
- unsupported weak correction claims
- generic resource requests except planning signals

overall_status: cee_processed

next_best_action:
Before Anya/Codex update public notes, CEE should verify the anion-size typo, clean incomplete older examples, and decide whether thermal stability/decomposition should be added as a Fajan’s rule application or kept as a source-gap/backlog item.
```
