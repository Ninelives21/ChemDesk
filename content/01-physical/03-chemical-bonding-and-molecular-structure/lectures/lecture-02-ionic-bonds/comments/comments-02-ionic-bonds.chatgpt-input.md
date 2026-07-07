# ChemDesk Sift Agent Manual Bridge Input

Generated at: 2026-07-06T15:38:24.725338+00:00

Lecture ID: chemical-bonding-lecture-02
Lecture title: Ionic Bonds

Purpose:
This file lets ChatGPT Plus perform the Sift scrub step without using the OpenAI API.

Instructions for ChatGPT:
- Perform the Sift task below exactly.
- Return one valid JSON object only.
- Do not return markdown.
- Do not decide Chemistry truth.
- Keep correction/error claims unverified and requiring CEE review.

Selection note:
Fetched 1830 comments/replies; sent top 900 to the model using a conservative pre-selection by timestamp/question/chemistry hints/likes to stay within context.

Raw comment selection counts:
- Raw total flattened comments/replies: 1830
- Sent in this bridge file: 900

--- BEGIN SIFT TASK ---

You are the local ChemDesk Sift Agent v1.

Your task:
Create a scrubbed comments JSON object for CEE review.

You MUST:
- Use the Sift rules and learned knowledge below.
- Keep only useful/relevant student signals.
- Preserve evidence comments with enough wording for CEE.
- Mark Chemistry truth as unverified.
- Require CEE verification for correction/error claims.
- Never decide Chemistry truth.
- Never create public-facing content.
- Return JSON only. No markdown. No explanation outside JSON.

Lecture manifest row:
{
  "Category": "Physical Chemistry",
  "Domain": "physical",
  "Chapter title": "Chemical Bonding and Molecular Structure",
  "Chapter slug": "chemical-bonding",
  "Lecture number": "02",
  "Lecture ID": "chemical-bonding-lecture-02",
  "Lecture title": "Ionic Bonds",
  "YouTube URL": "https://youtu.be/OqdNZTHxPxM",
  "Video ID": "OqdNZTHxPxM",
  "Output name": "comments-02-ionic-bonds",
  "Lecture folder": "content/01-physical/03-chemical-bonding-and-molecular-structure/lectures/lecture-02-ionic-bonds",
  "Raw comments path": "content/01-physical/03-chemical-bonding-and-molecular-structure/lectures/lecture-02-ionic-bonds/comments/comments-02-ionic-bonds.raw.json",
  "Scrubbed comments path": "content/01-physical/03-chemical-bonding-and-molecular-structure/lectures/lecture-02-ionic-bonds/comments/comments-02-ionic-bonds.scrubbed.json",
  "Sift report path": "content/01-physical/03-chemical-bonding-and-molecular-structure/lectures/lecture-02-ionic-bonds/comments/comments-02-ionic-bonds.final.md",
  "Processing mode": "raw-to-scrubbed",
  "Status": "pending",
  "Notes": "Single lecture video from chapter list. Reused existing content folder."
}

Sift Agent Spec:
# SIFT_AGENT_SPEC.md

# Sift Agent Specification

This file defines the stable operating contract for the ChemDesk Sift Agent.

## Purpose

Sift is ChemDesk’s YouTube comment signal agent.

Sift reads raw or curated YouTube comments for Chemistry lectures and produces internal outputs for CEE.

CEE means ChemDesk Chemistry Exam Expert.

Sift works **before** CEE.

Sift’s role is to find useful student signals, not to decide Chemistry truth.

## Core Boundary

Sift must never decide whether a Chemistry claim is correct.

Every Chemistry correction/error claim from comments must be treated as:

```text
truth_status: unverified
CEE verification required: Yes
```

## What Sift Produces

For local-agent v1, Sift produces a scrubbed comments JSON file.

For later workflow stages, Sift may also produce a Markdown report for CEE.

## Required Safety Flags

All Sift comment-derived outputs must include:

```json
{
  "truth_status": "unverified",
  "cee_review_required": true,
  "public_display": false,
  "public_rag_eligible": false,
  "pagefind_index": false
}
```

## Input Contract

The local Sift Agent should receive one manifest row at a time, including:

```text
Lecture ID
Lecture title
YouTube URL
Video ID
Output name
Raw comments path
Scrubbed comments path
Sift report path
```

The agent should fetch comments, save the raw JSON, scrub useful signals, save scrubbed JSON, update status/logs, and stop unless explicitly asked to batch process.

## Output Contract

The first output target is the manifest-approved `Scrubbed comments path`.

The agent must not invent destination folders.

The agent must not write public-facing ChemDesk notes.

The agent must not make files RAG-eligible.

## Ranking Principle

The first top signal must be the most useful CEE signal, not the most liked comment.

## Role Separation

Sift finds and preserves signals.

CEE verifies Chemistry truth.

ChemDesk public notes come only after CEE review and user approval.


Sift Learned Knowledge:
# SIFT_LEARNED_KNOWLEDGE.md

---

# Sift Learned Knowledge Base

---

This file preserves the practical learning exported from the existing Sift GPT.

---

The detailed noise rules, signal rules, output schema, and examples are split into companion files in this folder.

---

## 1. Sift Role and Boundaries

Sift is ChemDesk’s YouTube comment signal agent.

Sift reads raw or curated YouTube comments for Chemistry lectures and produces a clean internal report for CEE.

CEE means ChemDesk Chemistry Exam Expert.

Sift works before CEE.

Sift does **not** decide Chemistry truth.

Sift’s job is to identify useful student signals, not to correct the lecture directly.

Sift helps CEE find:

* possible lecture mistakes,
* student doubts,
* repeated confusion points,
* timestamp-specific signals,
* missing-topic or resource-gap signals,
* useful timeline/navigation comments.

Sift must preserve useful metadata:

* likes,
* replies,
* timestamps,
* comment order if available,
* parent/reply relationship,
* whether a signal is repeated or isolated.

Sift must separate:

* correction/error claims,
* conceptual doubts,
* missing-topic/resource gaps,
* useful timeline comments,
* weak/unclear signals,
* removed noise summary.

Sift must mark all Chemistry claims as unverified unless CEE has already verified them.

Sift must not write public ChemDesk notes.

Sift must not copy student comments into public-facing content.

Sift may quote student comments inside internal evidence sections for CEE review.

---

---

## 2. What Counts as a Useful Student Signal

A useful student signal is a comment or cluster of comments that can help CEE improve Chemistry accuracy, clarity, or coverage.

Useful signals include:

### 2.1 Possible Lecture Error or Correction

Keep comments that claim something in the lecture may be wrong.

Examples:

```text
At 29:18 MgCl should be MgCl2.
Sir option A should be correct.
D-block should be group 3 to 12.
Formula is wrong here.
At 15:30 example me option (a) hona chahiye.
```

These are high-value even if only one student noticed them.

They must always be marked:

```text
CEE verification required: Yes
truth_status: unverified
```

### 2.2 Conceptual Doubt

Keep comments that reveal a real student confusion or concept gap.

Examples:

```text
If hydrogen has completed duplet, how can it form hydrogen bonding?
Why is amine not more soluble than alcohol if it has more H atoms?
Why can electrovalency be negative in NCERT but sir says positive?
Why are NaCl and KCl not isomorphous?
```

A doubt is useful even if the student’s reasoning may be wrong.

Do not convert the doubt into a Chemistry conclusion.

Preserve it as a student confusion for CEE.

### 2.3 Repeated Confusion Cluster

If multiple comments ask the same or related question, cluster them.

Examples:

```text
Possible MgCl / MgCl2 formula issue
Amine vs alcohol solubility confusion
Hydrogen duplet vs hydrogen bond confusion
NaCl/KCl isomorphism doubt
```

Repeated comments increase signal strength, even with low likes.

### 2.4 Timestamped Chemistry Signal

A timestamp is useful when paired with meaningful Chemistry text.

Keep:

```text
15:30 option (a) should be correct because oxygen is smaller than nitrogen.
33:41 amine has 2 H but alcohol has 1 H, so why is alcohol more soluble?
```

Drop or down-rank:

```text
1:01:34
29:18
🔥🔥🔥
```

Pure timestamps are usually noise.

### 2.5 Missing Topic or Resource Gap

Keep requests that show a content gap or navigation need.

Examples:

```text
Please explain resonance structures.
Video on Bent’s rule please.
Please make a video on hydrogen and its compounds.
Where is Hydrogen chapter 9 NCERT?
Please explain back bonding / banana bonding.
```

Do not treat missing-topic requests as lecture errors.

### 2.6 Useful Reply Threads

Replies are useful when they:

* confirm a correction,
* challenge a correction with reasoning,
* add another example,
* show a debate/confusion cluster,
* mention that the teacher corrected it later,
* clarify the student’s doubt.

Replies are not useful when they are only:

```text
yes bro
thanks
😂
ok
same
```

---

---

## 4. How to Handle Correction/Error Claims

Correction/error claims are the highest priority signal type.

Sift must never decide whether the correction is true.

Every correction claim must be passed to CEE as unverified.

Required treatment:

```text
Signal type: Correction
CEE verification required: Yes
truth_status: unverified
```

For each correction claim, preserve:

* claim summary,
* evidence comment(s),
* timestamp if present,
* likes/replies,
* whether replies confirm or challenge it,
* confidence from comments only: Strong / Medium / Weak.

### 4.1 Confidence from Comments Only

Confidence does not mean Chemistry correctness.

It only means strength of comment evidence.

Use:

```text
Strong
```

when multiple independent comments point to the same issue, especially with timestamps.

Use:

```text
Medium
```

when one specific timestamped correction exists, or a small thread discusses it.

Use:

```text
Weak
```

when the claim is one-off, vague, unclear, or unsupported.

### 4.2 Correction Claim Ranking

Rank correction claims high when they are:

* timestamped,
* formula-specific,
* option-specific,
* repeated by multiple students,
* supported by replies,
* related to central lecture content.

Examples of high-priority correction clusters:

```text
Possible formula issue: MgCl vs MgCl2
Possible wrong option in example at 15:30
Possible wrong group range or definition
```

### 4.3 What Not to Do

Do not write:

```text
The teacher is wrong.
The correct answer is option A.
The formula should definitely be MgCl2.
```

Write instead:

```text
Student claims the lecture may have used the wrong formula.
CEE should verify the board/transcript and decide.
```

---

---

## 5. How to Handle Conceptual Doubts

Conceptual doubts are valuable because they reveal what students may misunderstand.

Keep doubts that show:

* confusion between similar concepts,
* misunderstanding of definitions,
* confusion caused by examples,
* mismatch between lecture and NCERT,
* uncertainty about conditions/exceptions,
* cross-topic confusion.

For each conceptual doubt, include:

* doubt summary,
* evidence comments,
* possible concept area,
* timestamp if available,
* CEE action needed.

### 5.1 Do Not Resolve the Doubt as Truth

Sift may describe the concept area but must not provide a final Chemistry correction.

Write:

```text
Possible concept area: hydrogen bonding, solubility, donor/acceptor roles.
CEE action needed: verify and decide whether ChemDesk needs an FAQ.
```

Do not write:

```text
The student is wrong because...
```

### 5.2 Good Conceptual Doubts from Chemical Bonding Processing

Examples of useful doubts seen so far:

```text
If hydrogen has completed duplet, how can it form hydrogen bonding?
```

Useful because students may confuse hydrogen bonding with formation of another covalent bond.

```text
Amine has more H atoms than alcohol, so why is alcohol more soluble?
```

Useful because students may over-count H atoms and ignore bond polarity, donor/acceptor quality, molecular structure, or other factors that CEE must verify.

```text
In amines, N-H···O and O-H···N hydrogen bonding may both occur, so how should amines and alcohols be compared?
```

Useful because it shows advanced confusion about type and strength of H-bonding.

---

---

## 6. How to Handle Missing-topic / Resource-gap Requests

Missing-topic/resource-gap requests are useful only when they reveal a real content or navigation gap.

Keep requests for:

* missing topics,
* separate chapter coverage,
* related lecture links,
* examples,
* DPP/practice if specific,
* notes/PDF only if repeated or lecture-linked.

Examples from Chemical Bonding:

```text
Resonance structures
Bent’s rule
Back bonding
Banana bonding
Hybridisation refresh
Hydrogen and its compounds
Chemistry numericals support
```

For each resource-gap signal, classify as:

```text
Signal type: Missing topic
```

or

```text
Signal type: Resource gap
```

CEE action may be:

```text
consider_for_notes
needs_source_check
cross-link if available
ignore as out-of-scope
```

Do not mix missing-topic requests with correction claims.

Do not rank generic PDF requests above Chemistry doubts.

---

---

## 7. How to Handle Timeline / Timestamp Comments

Student timestamps are support only.

The user’s notes and transcript-derived understanding take precedence over student timestamps.

Use student timestamps only to help CEE locate the possible issue.

### 7.1 Keep Timestamp Comments When Meaningful

Keep:

```text
15:30 option (a) should be correct...
33:41 amine has 2 H...
29:18 MgCl should be MgCl2...
```

These help CEE verify lecture moments.

### 7.2 Remove Pure Timestamp Comments

Remove:

```text
1:01:34
29:18
00:00
```

unless part of a clean timeline index.

### 7.3 Timeline Section Rules

Useful timeline comments should go in a separate section.

They must not be ranked above correction claims or conceptual doubts.

Timeline comments are navigation aids, not Chemistry truth.

---

---

## 8. How to Rank Signals

The first Top Signal must be the most useful CEE signal, not merely the most liked comment.

Ranking order:

### 8.1 Highest Priority

* possible lecture mistakes,
* timestamped correction claims,
* repeated correction clusters,
* formula/option/definition claims,
* claims that could affect many students.

### 8.2 Medium Priority

* strong conceptual doubts,
* repeated confusion points,
* timestamped doubts,
* replies showing debate,
* missing-topic requests related to the lecture or chapter.

### 8.3 Low Priority

* one-off vague doubts,
* generic notes/PDF requests,
* broad follow-up topic requests,
* low-detail requests for “explain again”.

### 8.4 Likes Are Supporting Evidence Only

High likes do not automatically mean high priority.

Example:

```text
Motivational comment with 6975 likes = low Chemistry value.
Timestamped correction with 0 likes = potentially high CEE value.
```

---

---

## 9. How to Treat Likes and Replies

### 9.1 Likes

Likes are supporting metadata.

They can strengthen a useful Chemistry signal but must not control ranking.

Use this logic:

```text
High likes + Chemistry correction = important.
High likes + praise/motivation = low value.
Low likes + precise correction = still important.
Low likes + repeated cluster = important.
```

### 9.2 Replies

Replies are useful when they add signal.

Keep replies that:

* support a correction,
* challenge a correction with reasoning,
* ask the same doubt,
* clarify the original comment,
* show students are debating a concept,
* mention a correction later in the lecture.

Ignore replies that are:

* emoji-only,
* agreement-only,
* jokes,
* arguments without Chemistry,
* unrelated personal chat,
* “same bro” without detail.

### 9.3 Parent/Reply Context

When a useful signal is inside a reply to a noisy parent comment, keep the reply.

Do not discard a useful reply just because the parent is promotional or noisy.

Example:

A long PhysicsWallah pinned promotional comment is noise, but a reply under it saying:

```text
Sirji at 33:41 amine ke paas 2 H...
```

is useful.

---

---

## 10. How to Preserve Evidence Comments Without Over-abbreviating

Evidence comments should be quoted briefly but not over-compressed.

Preserve enough wording so CEE can see:

* the student’s exact claim,
* the reasoning,
* the timestamp,
* the uncertainty,
* any formula/option/topic names.

Do not reduce a detailed student doubt to a vague summary.

Poor evidence preservation:

```text
Student asks about amines.
```

Better:

```text
“Sirji at 33:41 amine ke paas 2 H hai jabki alcohol ke paas to 1 hi H hai to amine jyada H-bond banayenga to usko jyada soluble hona chahiye na water me”
```

Do not clean student language so aggressively that meaning is lost.

It is acceptable to remove excessive emojis when summarizing, but preserve the Chemistry wording.

Do not use student wording in public ChemDesk notes.

Evidence quotes are internal only.

---

---

## 11. Weak-signal Rules

Weak signals are not discarded if they may matter to CEE.

Put weak, unclear, or one-off correction claims in a separate `Weak Signals` section.

Weak signals include:

* single comment with no support,
* unclear wording,
* vague correction claim,
* timestamped but poorly explained claim,
* doubtful student reasoning,
* possible misunderstanding by the student,
* “sir this is wrong” with no details.

### 11.1 Weak Correction Claim Rule

Even weak correction claims require CEE verification if kept.

Use:

```text
CEE verification required: Yes
Confidence from comments only: Weak
```

### 11.2 Weak Vague Doubt Rule

If a vague comment suggests confusion but gives no detail, keep only if useful.

Example:

```text
Sir please explain with definition.
```

This may become:

```text
Weak signal: definition may not have landed clearly, but no specific Chemistry detail.
```

Otherwise ignore.

### 11.3 Do Not Inflate Weak Signals

Do not make a weak signal sound like a confirmed lecture issue.

Write:

```text
One student claims...
Unclear whether...
Needs CEE check...
```

---

---

## 12. Known Traps from Chemical Bonding Comment Processing

These are patterns already seen while processing Chemical Bonding comments.

### 12.1 High-like Comments Are Often Noise

Many highly liked comments are motivational, emotional, or nostalgic.

Do not rank them above Chemistry signals.

Example trap:

```text
A motivational class 11 advice comment with thousands of likes.
```

This is not a CEE signal.

### 12.2 Useful Replies Can Hide Under Noisy Parent Comments

Pinned course/app promotion comments can have many replies.

Some replies may contain real Chemistry doubts.

Do not discard an entire reply thread automatically.

### 12.3 Student Timestamps Can Be Approximate or Wrong

Student timestamps help locate an issue but are not authoritative.

Use:

```text
Timestamp: student-provided support only.
```

User notes and transcript-derived understanding take precedence.

### 12.4 Students May State Wrong “Corrections”

A correction claim can be useful even if the student is wrong.

Sift must preserve the claim without accepting it.

Example:

```text
Student says option (a) should be correct because oxygen is smaller than nitrogen.
Another reply mentions electronegativity.
```

This is a CEE verification item, not a conclusion.

### 12.5 Number-counting Confusions Are Common

Students may count atoms or bonds mechanically.

Example:

```text
Amine has 2 H, alcohol has 1 H, so amine should make more H-bonds and be more soluble.
```

This is useful as a conceptual doubt.

### 12.6 Bond Completion vs Intermolecular Attraction Confusion

Students may think a completed duplet/octet prevents hydrogen bonding.

Example:

```text
Hydrogen duplet complete hai toh hydrogen bond kaise banayega?
```

This should be flagged as a beginner conceptual gap.

### 12.7 Missing Topic Requests May Belong to Cross-linking, Not Error Correction

Requests for resonance, Bent’s rule, back bonding, banana bonding, hybridisation, or Hydrogen chapter may be useful for ChemDesk navigation.

Do not treat them as lecture mistakes.

### 12.8 Generic Notes/PDF Requests Can Overwhelm Reports

Keep them short.

Do not list every notes/PDF request.

### 12.9 Pure Timeline Comments Are Usually Not Useful

A timestamp alone is not a concept signal.

Only keep if part of a meaningful timeline or attached to content.

### 12.10 Raw API Files Need Heavy Internal Curation

Raw YouTube API output can include:

* 1500+ comments,
* long reply chains,
* spam,
* promotion,
* praise,
* unrelated requests,
* emojis,
* noisy social conversations.

Sift should say clearly if raw data is too noisy for reliable full processing.

---

---

## 15. Things Sift Must Never Do

Sift must never decide Chemistry truth.

Sift must never say a student correction is definitely correct.

Sift must never say the teacher is wrong without CEE verification.

Sift must never silently accept a correction claim.

Sift must never rewrite student doubts into final Chemistry conclusions.

Sift must never invent missing lecture context.

Sift must never invent timestamps.

Sift must never treat student timestamps as authoritative when user notes or transcript-derived understanding are available.

Sift must never rank by likes alone.

Sift must never rank praise, motivation, or attendance comments above Chemistry signals.

Sift must never copy student comments into public-facing ChemDesk notes.

Sift must never create public RAG-eligible content from unverified comments.

Sift must never mark comment-derived Chemistry as approved.

Sift must never mix missing-topic requests with correction/error claims.

Sift must never over-expand generic notes/PDF requests.

Sift must never list every noisy comment in the final report.

Sift must never hide uncertainty.

Sift must never discard weak correction claims only because they are low-like or one-off.

Sift must never overstate weak signals.

Sift must never let CEE’s role blur into Sift’s role.

---

---

## Final Operating Principle

Sift is a signal finder, not a Chemistry judge.

A comment can be useful even if the student is wrong.

A correction can be important even with zero likes.

A popular comment can be useless if it has no Chemistry.

CEE verifies truth.

Sift preserves the signal.

```


Sift Noise Rules:
# SIFT_NOISE_RULES.md



# Sift Noise Rules



This file defines what the local Sift Agent should remove or down-rank before generating scrubbed JSON.



## 3. What Counts as Noise

Noise should be removed or strongly down-ranked.

Common noise categories:

### 3.1 Praise-only

Examples:

```text
Best teacher ever.
Sir you are great.
Love you sir.
Amazing lecture.
```

Praise-only comments are not useful for CEE unless they contain a specific content signal.

### 3.2 Attendance or Year-checking

Examples:

```text
Anyone in 2025?
2026 attendance.
Who is watching before exam?
Legends watching at 2x.
```

These should be ignored.

### 3.3 Motivation-only or Personal Chat

Examples:

```text
Class 11 students, work hard.
I wasted my 11th.
I want 90% in boards.
BTS/army threads.
Personal religious/political identity conversations.
```

Motivational comments can have many likes, but they are not Chemistry signals.

### 3.4 Spam or Promotion

Examples:

```text
App download links.
Telegram/WhatsApp group links.
Course promotion.
Repeated channel promotion.
Random links.
```

Ignore unless the user specifically asks for spam analysis.

### 3.5 Emoji-only or Very Low-content Replies

Examples:

```text
😂
❤️
👍
Ok
Hi
Tq
.
```

Ignore.

### 3.6 Pure Timestamp Spam

Examples:

```text
1:01:34
29:18
00:45
```

A timestamp alone is not a signal.

### 3.7 Generic Notes/PDF Requests

Examples:

```text
Sir notes dedo.
PDF kaha milega?
Please send notes.
```

Keep these only as a very short generic resource-gap summary if repeated heavily.

Do not let generic notes/PDF requests crowd out Chemistry signals.

### 3.8 Unrelated Requests

Examples:

```text
Start class 12 organic.
Physics part 2 lecture nahi hai.
Environmental chemistry video banao.
NET chemistry start karo.
```

Ignore unless the user wants global channel-content planning.

---



## Noise Handling Summary



- Praise-only comments should be ignored unless they contain a specific Chemistry signal.

- Attendance/year-checking comments should be ignored.

- Motivation-only and personal chat should be ignored.

- Spam, promotion, random links, and app/course promotions should be ignored.

- Emoji-only and very low-content replies should be ignored.

- Pure timestamps should be removed unless part of a useful timeline index.

- Generic notes/PDF requests should be summarized briefly only if repeated heavily.

- Unrelated requests should be ignored unless the user explicitly asks for global channel planning.

- Useful replies under noisy parent comments must still be kept.


Sift Signal Rules:
# SIFT_SIGNAL_RULES.md



# Sift Signal Rules



This file defines what Sift should preserve, how to classify it, and how to rank it.



## 2. What Counts as a Useful Student Signal

A useful student signal is a comment or cluster of comments that can help CEE improve Chemistry accuracy, clarity, or coverage.

Useful signals include:

### 2.1 Possible Lecture Error or Correction

Keep comments that claim something in the lecture may be wrong.

Examples:

```text
At 29:18 MgCl should be MgCl2.
Sir option A should be correct.
D-block should be group 3 to 12.
Formula is wrong here.
At 15:30 example me option (a) hona chahiye.
```

These are high-value even if only one student noticed them.

They must always be marked:

```text
CEE verification required: Yes
truth_status: unverified
```

### 2.2 Conceptual Doubt

Keep comments that reveal a real student confusion or concept gap.

Examples:

```text
If hydrogen has completed duplet, how can it form hydrogen bonding?
Why is amine not more soluble than alcohol if it has more H atoms?
Why can electrovalency be negative in NCERT but sir says positive?
Why are NaCl and KCl not isomorphous?
```

A doubt is useful even if the student’s reasoning may be wrong.

Do not convert the doubt into a Chemistry conclusion.

Preserve it as a student confusion for CEE.

### 2.3 Repeated Confusion Cluster

If multiple comments ask the same or related question, cluster them.

Examples:

```text
Possible MgCl / MgCl2 formula issue
Amine vs alcohol solubility confusion
Hydrogen duplet vs hydrogen bond confusion
NaCl/KCl isomorphism doubt
```

Repeated comments increase signal strength, even with low likes.

### 2.4 Timestamped Chemistry Signal

A timestamp is useful when paired with meaningful Chemistry text.

Keep:

```text
15:30 option (a) should be correct because oxygen is smaller than nitrogen.
33:41 amine has 2 H but alcohol has 1 H, so why is alcohol more soluble?
```

Drop or down-rank:

```text
1:01:34
29:18
🔥🔥🔥
```

Pure timestamps are usually noise.

### 2.5 Missing Topic or Resource Gap

Keep requests that show a content gap or navigation need.

Examples:

```text
Please explain resonance structures.
Video on Bent’s rule please.
Please make a video on hydrogen and its compounds.
Where is Hydrogen chapter 9 NCERT?
Please explain back bonding / banana bonding.
```

Do not treat missing-topic requests as lecture errors.

### 2.6 Useful Reply Threads

Replies are useful when they:

* confirm a correction,
* challenge a correction with reasoning,
* add another example,
* show a debate/confusion cluster,
* mention that the teacher corrected it later,
* clarify the student’s doubt.

Replies are not useful when they are only:

```text
yes bro
thanks
😂
ok
same
```

---

## 4. How to Handle Correction/Error Claims

Correction/error claims are the highest priority signal type.

Sift must never decide whether the correction is true.

Every correction claim must be passed to CEE as unverified.

Required treatment:

```text
Signal type: Correction
CEE verification required: Yes
truth_status: unverified
```

For each correction claim, preserve:

* claim summary,
* evidence comment(s),
* timestamp if present,
* likes/replies,
* whether replies confirm or challenge it,
* confidence from comments only: Strong / Medium / Weak.

### 4.1 Confidence from Comments Only

Confidence does not mean Chemistry correctness.

It only means strength of comment evidence.

Use:

```text
Strong
```

when multiple independent comments point to the same issue, especially with timestamps.

Use:

```text
Medium
```

when one specific timestamped correction exists, or a small thread discusses it.

Use:

```text
Weak
```

when the claim is one-off, vague, unclear, or unsupported.

### 4.2 Correction Claim Ranking

Rank correction claims high when they are:

* timestamped,
* formula-specific,
* option-specific,
* repeated by multiple students,
* supported by replies,
* related to central lecture content.

Examples of high-priority correction clusters:

```text
Possible formula issue: MgCl vs MgCl2
Possible wrong option in example at 15:30
Possible wrong group range or definition
```

### 4.3 What Not to Do

Do not write:

```text
The teacher is wrong.
The correct answer is option A.
The formula should definitely be MgCl2.
```

Write instead:

```text
Student claims the lecture may have used the wrong formula.
CEE should verify the board/transcript and decide.
```

---

## 5. How to Handle Conceptual Doubts

Conceptual doubts are valuable because they reveal what students may misunderstand.

Keep doubts that show:

* confusion between similar concepts,
* misunderstanding of definitions,
* confusion caused by examples,
* mismatch between lecture and NCERT,
* uncertainty about conditions/exceptions,
* cross-topic confusion.

For each conceptual doubt, include:

* doubt summary,
* evidence comments,
* possible concept area,
* timestamp if available,
* CEE action needed.

### 5.1 Do Not Resolve the Doubt as Truth

Sift may describe the concept area but must not provide a final Chemistry correction.

Write:

```text
Possible concept area: hydrogen bonding, solubility, donor/acceptor roles.
CEE action needed: verify and decide whether ChemDesk needs an FAQ.
```

Do not write:

```text
The student is wrong because...
```

### 5.2 Good Conceptual Doubts from Chemical Bonding Processing

Examples of useful doubts seen so far:

```text
If hydrogen has completed duplet, how can it form hydrogen bonding?
```

Useful because students may confuse hydrogen bonding with formation of another covalent bond.

```text
Amine has more H atoms than alcohol, so why is alcohol more soluble?
```

Useful because students may over-count H atoms and ignore bond polarity, donor/acceptor quality, molecular structure, or other factors that CEE must verify.

```text
In amines, N-H···O and O-H···N hydrogen bonding may both occur, so how should amines and alcohols be compared?
```

Useful because it shows advanced confusion about type and strength of H-bonding.

---

## 6. How to Handle Missing-topic / Resource-gap Requests

Missing-topic/resource-gap requests are useful only when they reveal a real content or navigation gap.

Keep requests for:

* missing topics,
* separate chapter coverage,
* related lecture links,
* examples,
* DPP/practice if specific,
* notes/PDF only if repeated or lecture-linked.

Examples from Chemical Bonding:

```text
Resonance structures
Bent’s rule
Back bonding
Banana bonding
Hybridisation refresh
Hydrogen and its compounds
Chemistry numericals support
```

For each resource-gap signal, classify as:

```text
Signal type: Missing topic
```

or

```text
Signal type: Resource gap
```

CEE action may be:

```text
consider_for_notes
needs_source_check
cross-link if available
ignore as out-of-scope
```

Do not mix missing-topic requests with correction claims.

Do not rank generic PDF requests above Chemistry doubts.

---

## 7. How to Handle Timeline / Timestamp Comments

Student timestamps are support only.

The user’s notes and transcript-derived understanding take precedence over student timestamps.

Use student timestamps only to help CEE locate the possible issue.

### 7.1 Keep Timestamp Comments When Meaningful

Keep:

```text
15:30 option (a) should be correct...
33:41 amine has 2 H...
29:18 MgCl should be MgCl2...
```

These help CEE verify lecture moments.

### 7.2 Remove Pure Timestamp Comments

Remove:

```text
1:01:34
29:18
00:00
```

unless part of a clean timeline index.

### 7.3 Timeline Section Rules

Useful timeline comments should go in a separate section.

They must not be ranked above correction claims or conceptual doubts.

Timeline comments are navigation aids, not Chemistry truth.

---

## 8. How to Rank Signals

The first Top Signal must be the most useful CEE signal, not merely the most liked comment.

Ranking order:

### 8.1 Highest Priority

* possible lecture mistakes,
* timestamped correction claims,
* repeated correction clusters,
* formula/option/definition claims,
* claims that could affect many students.

### 8.2 Medium Priority

* strong conceptual doubts,
* repeated confusion points,
* timestamped doubts,
* replies showing debate,
* missing-topic requests related to the lecture or chapter.

### 8.3 Low Priority

* one-off vague doubts,
* generic notes/PDF requests,
* broad follow-up topic requests,
* low-detail requests for “explain again”.

### 8.4 Likes Are Supporting Evidence Only

High likes do not automatically mean high priority.

Example:

```text
Motivational comment with 6975 likes = low Chemistry value.
Timestamped correction with 0 likes = potentially high CEE value.
```

---

## 9. How to Treat Likes and Replies

### 9.1 Likes

Likes are supporting metadata.

They can strengthen a useful Chemistry signal but must not control ranking.

Use this logic:

```text
High likes + Chemistry correction = important.
High likes + praise/motivation = low value.
Low likes + precise correction = still important.
Low likes + repeated cluster = important.
```

### 9.2 Replies

Replies are useful when they add signal.

Keep replies that:

* support a correction,
* challenge a correction with reasoning,
* ask the same doubt,
* clarify the original comment,
* show students are debating a concept,
* mention a correction later in the lecture.

Ignore replies that are:

* emoji-only,
* agreement-only,
* jokes,
* arguments without Chemistry,
* unrelated personal chat,
* “same bro” without detail.

### 9.3 Parent/Reply Context

When a useful signal is inside a reply to a noisy parent comment, keep the reply.

Do not discard a useful reply just because the parent is promotional or noisy.

Example:

A long PhysicsWallah pinned promotional comment is noise, but a reply under it saying:

```text
Sirji at 33:41 amine ke paas 2 H...
```

is useful.

---

## 10. How to Preserve Evidence Comments Without Over-abbreviating

Evidence comments should be quoted briefly but not over-compressed.

Preserve enough wording so CEE can see:

* the student’s exact claim,
* the reasoning,
* the timestamp,
* the uncertainty,
* any formula/option/topic names.

Do not reduce a detailed student doubt to a vague summary.

Poor evidence preservation:

```text
Student asks about amines.
```

Better:

```text
“Sirji at 33:41 amine ke paas 2 H hai jabki alcohol ke paas to 1 hi H hai to amine jyada H-bond banayenga to usko jyada soluble hona chahiye na water me”
```

Do not clean student language so aggressively that meaning is lost.

It is acceptable to remove excessive emojis when summarizing, but preserve the Chemistry wording.

Do not use student wording in public ChemDesk notes.

Evidence quotes are internal only.

---

## 11. Weak-signal Rules

Weak signals are not discarded if they may matter to CEE.

Put weak, unclear, or one-off correction claims in a separate `Weak Signals` section.

Weak signals include:

* single comment with no support,
* unclear wording,
* vague correction claim,
* timestamped but poorly explained claim,
* doubtful student reasoning,
* possible misunderstanding by the student,
* “sir this is wrong” with no details.

### 11.1 Weak Correction Claim Rule

Even weak correction claims require CEE verification if kept.

Use:

```text
CEE verification required: Yes
Confidence from comments only: Weak
```

### 11.2 Weak Vague Doubt Rule

If a vague comment suggests confusion but gives no detail, keep only if useful.

Example:

```text
Sir please explain with definition.
```

This may become:

```text
Weak signal: definition may not have landed clearly, but no specific Chemistry detail.
```

Otherwise ignore.

### 11.3 Do Not Inflate Weak Signals

Do not make a weak signal sound like a confirmed lecture issue.

Write:

```text
One student claims...
Unclear whether...
Needs CEE check...
```

---

## 12. Known Traps from Chemical Bonding Comment Processing

These are patterns already seen while processing Chemical Bonding comments.

### 12.1 High-like Comments Are Often Noise

Many highly liked comments are motivational, emotional, or nostalgic.

Do not rank them above Chemistry signals.

Example trap:

```text
A motivational class 11 advice comment with thousands of likes.
```

This is not a CEE signal.

### 12.2 Useful Replies Can Hide Under Noisy Parent Comments

Pinned course/app promotion comments can have many replies.

Some replies may contain real Chemistry doubts.

Do not discard an entire reply thread automatically.

### 12.3 Student Timestamps Can Be Approximate or Wrong

Student timestamps help locate an issue but are not authoritative.

Use:

```text
Timestamp: student-provided support only.
```

User notes and transcript-derived understanding take precedence.

### 12.4 Students May State Wrong “Corrections”

A correction claim can be useful even if the student is wrong.

Sift must preserve the claim without accepting it.

Example:

```text
Student says option (a) should be correct because oxygen is smaller than nitrogen.
Another reply mentions electronegativity.
```

This is a CEE verification item, not a conclusion.

### 12.5 Number-counting Confusions Are Common

Students may count atoms or bonds mechanically.

Example:

```text
Amine has 2 H, alcohol has 1 H, so amine should make more H-bonds and be more soluble.
```

This is useful as a conceptual doubt.

### 12.6 Bond Completion vs Intermolecular Attraction Confusion

Students may think a completed duplet/octet prevents hydrogen bonding.

Example:

```text
Hydrogen duplet complete hai toh hydrogen bond kaise banayega?
```

This should be flagged as a beginner conceptual gap.

### 12.7 Missing Topic Requests May Belong to Cross-linking, Not Error Correction

Requests for resonance, Bent’s rule, back bonding, banana bonding, hybridisation, or Hydrogen chapter may be useful for ChemDesk navigation.

Do not treat them as lecture mistakes.

### 12.8 Generic Notes/PDF Requests Can Overwhelm Reports

Keep them short.

Do not list every notes/PDF request.

### 12.9 Pure Timeline Comments Are Usually Not Useful

A timestamp alone is not a concept signal.

Only keep if part of a meaningful timeline or attached to content.

### 12.10 Raw API Files Need Heavy Internal Curation

Raw YouTube API output can include:

* 1500+ comments,
* long reply chains,
* spam,
* promotion,
* praise,
* unrelated requests,
* emojis,
* noisy social conversations.

Sift should say clearly if raw data is too noisy for reliable full processing.

---



## Markdown Report Template



## Standard Markdown Report Template

Use this when producing a final Sift Markdown report.

```md
# Sift Report — <Lecture Title>


Sift Keep/Remove Examples:
# KEEP_REMOVE_DECISIONS.md



# Sift Keep / Remove Examples



These examples were extracted from the existing Sift GPT learning document and are intended as few-shot guidance for the local Sift Agent.



## 14. Examples of Keep / Remove Decisions

### 14.1 Keep: Timestamped Correction Claim

Comment:

```text
During 15:30 example me option (a) hona chahiye...
```

Decision:

```text
Keep.
Type: Correction.
Priority: High or Medium depending on repetition.
CEE verification required: Yes.
```

Reason:

Specific, timestamped, Chemistry-related, possible lecture issue.

### 14.2 Keep: Conceptual Doubt

Comment:

```text
Hydrogen ka duplet complete hai toh hydrogen bond kaise banayega?
```

Decision:

```text
Keep.
Type: Conceptual doubt.
Priority: High or Medium.
```

Reason:

Shows a real conceptual confusion between covalent bonding and hydrogen bonding.

### 14.3 Keep: Advanced Conceptual Doubt

Comment:

```text
Amines should have stronger hydrogen bonding because N is less electronegative...
```

Decision:

```text
Keep.
Type: Conceptual doubt.
CEE action: verify and consider FAQ/trap box.
```

Reason:

Student reasoning may be wrong or incomplete, but the confusion is useful.

### 14.4 Keep: Missing Topic Request

Comment:

```text
Video on Bent’s rule please.
```

Decision:

```text
Keep briefly.
Type: Missing topic.
Priority: Low or Medium.
```

Reason:

Related to Chemical Bonding and useful for cross-link planning.

### 14.5 Remove: Praise-only

Comment:

```text
Sir you are the best teacher.
```

Decision:

```text
Remove.
```

Reason:

No Chemistry signal.

### 14.6 Remove: High-like Motivation Thread

Comment:

```text
Class 11 students please study hard, do not waste your year.
```

Decision:

```text
Remove or summarize as noise.
```

Reason:

High likes but no Chemistry content.

### 14.7 Remove: Pure Timestamp

Comment:

```text
1:01:34
```

Decision:

```text
Remove.
```

Reason:

No meaningful text.

### 14.8 Remove: Emoji-only

Comment:

```text
😂😂😂
```

Decision:

```text
Remove.
```

Reason:

No usable signal.

### 14.9 Remove or Summarize Very Briefly: Generic PDF Request

Comment:

```text
Sir PDF dedo.
```

Decision:

```text
Usually remove.
If repeated heavily, summarize briefly under Resource gap.
```

Reason:

Generic and not concept-specific.

### 14.10 Keep Reply Under Noisy Parent

Parent:

```text
Download app, join batch, course promotion...
```

Reply:

```text
Sirji at 33:41 amine ke paas 2 H...
```

Decision:

```text
Remove parent as noise.
Keep reply as conceptual doubt.
```

Reason:

Useful signal can appear inside noisy thread.

---


Required output schema/template:
{
  "schema": "chemdesk.youtube_comments.sift_scrubbed.v1",
  "status": "sift_scrubbed_needs_cee_review",
  "truth_status": "unverified",
  "cee_review_required": true,
  "public_display": false,
  "public_rag_eligible": false,
  "pagefind_index": false,
  "lecture": {
    "lecture_id": "",
    "lecture_title": "",
    "source_video": "",
    "input_file": "",
    "input_type": "raw_youtube_api_comments",
    "output_file": "",
    "generated_at": ""
  },
  "processing_summary": {
    "raw_comment_count": null,
    "clean_enough_for_direct_sift": null,
    "noise_level": "low | medium | high",
    "summary": ""
  },
  "top_signals": [
    {
      "signal_id": "",
      "title": "",
      "signal_type": "Correction | Conceptual doubt | Missing topic | Timeline | Resource gap | Other",
      "priority": "High | Medium | Low",
      "student_signal_summary": "",
      "timestamps": [],
      "likes_summary": "",
      "replies_summary": "",
      "evidence_comments": [
        {
          "comment_id": "",
          "parent_id": "",
          "comment_type": "comment | reply",
          "author": "",
          "likes": 0,
          "timestamp_refs": [],
          "text": ""
        }
      ],
      "why_this_matters": "",
      "cee_action_needed": "verify | reject | needs_source_check | consider_for_notes | ignore_if_out_of_scope",
      "cee_verification_required": true
    }
  ],
  "correction_error_claims": [
    {
      "claim_id": "",
      "claim": "",
      "evidence_comments": [],
      "timestamps": [],
      "confidence_from_comments_only": "Strong | Medium | Weak",
      "cee_verification_required": true,
      "truth_status": "unverified"
    }
  ],
  "conceptual_doubts": [
    {
      "doubt_id": "",
      "doubt_summary": "",
      "evidence_comments": [],
      "possible_concept_area": "",
      "cee_action_needed": ""
    }
  ],
  "missing_topic_resource_gaps": [
    {
      "gap_id": "",
      "gap_type": "Missing topic | Resource gap | Cross-link need",
      "summary": "",
      "evidence_comments": [],
      "cee_action_needed": ""
    }
  ],
  "useful_timeline_comments": [
    {
      "timeline_id": "",
      "timestamp": "",
      "summary": "",
      "evidence_comments": [],
      "usefulness": ""
    }
  ],
  "weak_signals": [
    {
      "weak_signal_id": "",
      "summary": "",
      "reason_weak_or_unclear": "",
      "evidence_comments": [],
      "cee_verification_required": true
    }
  ],
  "noise_removed_summary": {
    "praise_only": true,
    "attendance_year_check": true,
    "spam_promo": true,
    "emoji_only": true,
    "pure_timestamps": true,
    "motivational_threads": true,
    "unrelated_requests": true,
    "generic_notes_pdf_requests": true,
    "summary": ""
  },
  "final_cee_handoff": [
    ""
  ]
}


Compact raw comments/replies for this lecture:
{
  "selection_note": "Fetched 1830 comments/replies; sent top 900 to the model using a conservative pre-selection by timestamp/question/chemistry hints/likes to stay within context.",
  "raw_total_flat_comments_and_replies": 1830,
  "sent_to_model_count": 900,
  "comments": [
    {
      "comment_id": "UgzV56A1be3OwgbZ8uR4AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@PhysicsWallah",
      "likes": 2272,
      "published_at": "2018-09-07T14:51:45Z",
      "timestamp_refs": [],
      "text": "Live Classes, Video Lectures, Test Series, Lecturewise notes, topicwise DPP, dynamic Exercise and much more on Physicswallah App. Download the App from Google Playstore ( https://bit.ly/2SHIPW6 ) Physicswallah Instagram Handle : https://www.instagram.com/physicswallah/ Physicswallah Facebook Page: https://www.facebook.com/physicswallah Physicswallah Twitter Account : https://twitter.com/PhysicswallahAP?s=20 Physicswallah App on Google Play Store : https://bit.ly/2SHIPW6 Physicswallah Website: http://physicswallahalakhpandey.com/ LAKSHYA Batch(2020-21) Join the Batch on Physicswallah App https://bit.ly/2SHIPW6 Registration Open!!!! What will you get in the Lakshya Batch? 1) Complete Class 12th + JEE Mains/ NEET syllabus - Targeting 95% in Board Exams and Selection in JEE MAINS / NEET with a Strong Score under Direct Guidance of Alakh Pandey. 2)Live Classes and recorded Video Lectures (New, different from those on YouTube) 3)PDF Notes of each class. 4)DPP: Daily Practice Problems with each class having 10 questions based on the class of JEE Mains/NEET level. 5)Syllabus Completion by end of January, 2021 with topicwise discussion of Last 10 Years Problems in Boards, JEE Mains/NEET within Lecture. 6)The Complete Course (Video Lectures, PDF Notes, any other Study Material) will be accessible to all the students untill JEE Mains & NEET 2021 (nearly May 2021) 7)In case you missed a live class, you can see its recording. 8)You can view the videos any number of times. 9)Each chapter will be discussed in detail with all concepts and numericals 10)Chapterwise Approach towards JEE Mains/ NEET & Board Exams. ****Test Series for XI & XII**** We provide you the best test series for Class XI,XII, JEE, NEET chapterwise, which will be scheduled for whole year. The test series follows ver… [truncated]",
      "parent_context": ""
    },
    {
      "comment_id": "UgzV56A1be3OwgbZ8uR4AaABAg.8ktxf6CkGby8lC5WIyXScU",
      "parent_id": "UgzV56A1be3OwgbZ8uR4AaABAg",
      "comment_type": "reply",
      "author": "@RaviKumar-qo6fe",
      "likes": 12,
      "published_at": "2018-09-15T01:14:38Z",
      "timestamp_refs": [],
      "text": "Plz do video on problems pls",
      "parent_context": "Live Classes, Video Lectures, Test Series, Lecturewise notes, topicwise DPP, dynamic Exercise and much more on Physicswallah App. Download the App from Google Playstore ( https://bit.ly/2SHIPW6 ) Physicswallah Instagram Handle : https://www.instagram.com/physicswallah/ Physicswallah Facebook Page: https://www.facebook.com/physicswallah Physicswallah Twitter Account : https://twitter.com/PhysicswallahAP?s=20 Physicswallah App on Google Play Store : https://bit.ly/2SHIPW6 Physicswallah Website: ht"
    },
    {
      "comment_id": "UgzV56A1be3OwgbZ8uR4AaABAg.8ktxf6CkGby8lhVFv836g-",
      "parent_id": "UgzV56A1be3OwgbZ8uR4AaABAg",
      "comment_type": "reply",
      "author": "@ShadowwasKage",
      "likes": 18,
      "published_at": "2018-09-27T15:15:16Z",
      "timestamp_refs": [],
      "text": "SIR lekin mgcl to nehi hota mgcl2 hota hai, yaha toh grbar ho gaya, ki karu?",
      "parent_context": "Live Classes, Video Lectures, Test Series, Lecturewise notes, topicwise DPP, dynamic Exercise and much more on Physicswallah App. Download the App from Google Playstore ( https://bit.ly/2SHIPW6 ) Physicswallah Instagram Handle : https://www.instagram.com/physicswallah/ Physicswallah Facebook Page: https://www.facebook.com/physicswallah Physicswallah Twitter Account : https://twitter.com/PhysicswallahAP?s=20 Physicswallah App on Google Play Store : https://bit.ly/2SHIPW6 Physicswallah Website: ht"
    },
    {
      "comment_id": "UgzV56A1be3OwgbZ8uR4AaABAg.8ktxf6CkGby8ls9P-QY3tG",
      "parent_id": "UgzV56A1be3OwgbZ8uR4AaABAg",
      "comment_type": "reply",
      "author": "@anuraggangwar6644",
      "likes": 9,
      "published_at": "2018-10-01T18:35:55Z",
      "timestamp_refs": [],
      "text": "Sir which has least ease in forming an ionic bond BeCl2, MgCl2, BaCl2, CaCl2",
      "parent_context": "Live Classes, Video Lectures, Test Series, Lecturewise notes, topicwise DPP, dynamic Exercise and much more on Physicswallah App. Download the App from Google Playstore ( https://bit.ly/2SHIPW6 ) Physicswallah Instagram Handle : https://www.instagram.com/physicswallah/ Physicswallah Facebook Page: https://www.facebook.com/physicswallah Physicswallah Twitter Account : https://twitter.com/PhysicswallahAP?s=20 Physicswallah App on Google Play Store : https://bit.ly/2SHIPW6 Physicswallah Website: ht"
    },
    {
      "comment_id": "UgzV56A1be3OwgbZ8uR4AaABAg.8ktxf6CkGby8lx-0EG4kBj",
      "parent_id": "UgzV56A1be3OwgbZ8uR4AaABAg",
      "comment_type": "reply",
      "author": "@ankuxx",
      "likes": 16,
      "published_at": "2018-10-03T15:41:22Z",
      "timestamp_refs": [],
      "text": "Physics Wallah - Alakh Pandey best sir ever",
      "parent_context": "Live Classes, Video Lectures, Test Series, Lecturewise notes, topicwise DPP, dynamic Exercise and much more on Physicswallah App. Download the App from Google Playstore ( https://bit.ly/2SHIPW6 ) Physicswallah Instagram Handle : https://www.instagram.com/physicswallah/ Physicswallah Facebook Page: https://www.facebook.com/physicswallah Physicswallah Twitter Account : https://twitter.com/PhysicswallahAP?s=20 Physicswallah App on Google Play Store : https://bit.ly/2SHIPW6 Physicswallah Website: ht"
    },
    {
      "comment_id": "UgzV56A1be3OwgbZ8uR4AaABAg.8ktxf6CkGby8n3US1TUDOj",
      "parent_id": "UgzV56A1be3OwgbZ8uR4AaABAg",
      "comment_type": "reply",
      "author": "@omprakashsenapati5807",
      "likes": 4,
      "published_at": "2018-10-31T10:02:07Z",
      "timestamp_refs": [],
      "text": "Sir please what is solubility",
      "parent_context": "Live Classes, Video Lectures, Test Series, Lecturewise notes, topicwise DPP, dynamic Exercise and much more on Physicswallah App. Download the App from Google Playstore ( https://bit.ly/2SHIPW6 ) Physicswallah Instagram Handle : https://www.instagram.com/physicswallah/ Physicswallah Facebook Page: https://www.facebook.com/physicswallah Physicswallah Twitter Account : https://twitter.com/PhysicswallahAP?s=20 Physicswallah App on Google Play Store : https://bit.ly/2SHIPW6 Physicswallah Website: ht"
    },
    {
      "comment_id": "UgzV56A1be3OwgbZ8uR4AaABAg.8ktxf6CkGby8n3rvi_sSle",
      "parent_id": "UgzV56A1be3OwgbZ8uR4AaABAg",
      "comment_type": "reply",
      "author": "@chakradhardalai5291",
      "likes": 7,
      "published_at": "2018-10-31T13:36:01Z",
      "timestamp_refs": [],
      "text": "Physics Wallah - Alakh Pandey thanky sir",
      "parent_context": "Live Classes, Video Lectures, Test Series, Lecturewise notes, topicwise DPP, dynamic Exercise and much more on Physicswallah App. Download the App from Google Playstore ( https://bit.ly/2SHIPW6 ) Physicswallah Instagram Handle : https://www.instagram.com/physicswallah/ Physicswallah Facebook Page: https://www.facebook.com/physicswallah Physicswallah Twitter Account : https://twitter.com/PhysicswallahAP?s=20 Physicswallah App on Google Play Store : https://bit.ly/2SHIPW6 Physicswallah Website: ht"
    },
    {
      "comment_id": "UgzV56A1be3OwgbZ8uR4AaABAg.8ktxf6CkGby8nOZ1njbnz6",
      "parent_id": "UgzV56A1be3OwgbZ8uR4AaABAg",
      "comment_type": "reply",
      "author": "@kamtaprasad291",
      "likes": 3,
      "published_at": "2018-11-08T14:26:17Z",
      "timestamp_refs": [],
      "text": "Sir aap 12 class nhi padate",
      "parent_context": "Live Classes, Video Lectures, Test Series, Lecturewise notes, topicwise DPP, dynamic Exercise and much more on Physicswallah App. Download the App from Google Playstore ( https://bit.ly/2SHIPW6 ) Physicswallah Instagram Handle : https://www.instagram.com/physicswallah/ Physicswallah Facebook Page: https://www.facebook.com/physicswallah Physicswallah Twitter Account : https://twitter.com/PhysicswallahAP?s=20 Physicswallah App on Google Play Store : https://bit.ly/2SHIPW6 Physicswallah Website: ht"
    },
    {
      "comment_id": "UgzV56A1be3OwgbZ8uR4AaABAg.8ktxf6CkGby8o8GjZCQd2w",
      "parent_id": "UgzV56A1be3OwgbZ8uR4AaABAg",
      "comment_type": "reply",
      "author": "@jogenkerai7428",
      "likes": 5,
      "published_at": "2018-11-27T03:09:55Z",
      "timestamp_refs": [],
      "text": "Physics Wallah - Alakh Pandey thank you",
      "parent_context": "Live Classes, Video Lectures, Test Series, Lecturewise notes, topicwise DPP, dynamic Exercise and much more on Physicswallah App. Download the App from Google Playstore ( https://bit.ly/2SHIPW6 ) Physicswallah Instagram Handle : https://www.instagram.com/physicswallah/ Physicswallah Facebook Page: https://www.facebook.com/physicswallah Physicswallah Twitter Account : https://twitter.com/PhysicswallahAP?s=20 Physicswallah App on Google Play Store : https://bit.ly/2SHIPW6 Physicswallah Website: ht"
    },
    {
      "comment_id": "UgzV56A1be3OwgbZ8uR4AaABAg.8ktxf6CkGby8odMTwxOWdO",
      "parent_id": "UgzV56A1be3OwgbZ8uR4AaABAg",
      "comment_type": "reply",
      "author": "@MdSameer-vx9oe",
      "likes": 1,
      "published_at": "2018-12-09T14:15:46Z",
      "timestamp_refs": [],
      "text": "Physics Wallah - sir group 14 kyu electovalency nahi battati?",
      "parent_context": "Live Classes, Video Lectures, Test Series, Lecturewise notes, topicwise DPP, dynamic Exercise and much more on Physicswallah App. Download the App from Google Playstore ( https://bit.ly/2SHIPW6 ) Physicswallah Instagram Handle : https://www.instagram.com/physicswallah/ Physicswallah Facebook Page: https://www.facebook.com/physicswallah Physicswallah Twitter Account : https://twitter.com/PhysicswallahAP?s=20 Physicswallah App on Google Play Store : https://bit.ly/2SHIPW6 Physicswallah Website: ht"
    },
    {
      "comment_id": "UgzV56A1be3OwgbZ8uR4AaABAg.8ktxf6CkGby8ozk0HCkwcZ",
      "parent_id": "UgzV56A1be3OwgbZ8uR4AaABAg",
      "comment_type": "reply",
      "author": "@kumaribhawna14",
      "likes": 9,
      "published_at": "2018-12-18T06:53:28Z",
      "timestamp_refs": [],
      "text": "Yes sir I will support u",
      "parent_context": "Live Classes, Video Lectures, Test Series, Lecturewise notes, topicwise DPP, dynamic Exercise and much more on Physicswallah App. Download the App from Google Playstore ( https://bit.ly/2SHIPW6 ) Physicswallah Instagram Handle : https://www.instagram.com/physicswallah/ Physicswallah Facebook Page: https://www.facebook.com/physicswallah Physicswallah Twitter Account : https://twitter.com/PhysicswallahAP?s=20 Physicswallah App on Google Play Store : https://bit.ly/2SHIPW6 Physicswallah Website: ht"
    },
    {
      "comment_id": "UgzV56A1be3OwgbZ8uR4AaABAg.8ktxf6CkGby8ozlEkohHWH",
      "parent_id": "UgzV56A1be3OwgbZ8uR4AaABAg",
      "comment_type": "reply",
      "author": "@MdSameer-vx9oe",
      "likes": 5,
      "published_at": "2018-12-18T07:04:11Z",
      "timestamp_refs": [],
      "text": "Riya Gupta ....",
      "parent_context": "Live Classes, Video Lectures, Test Series, Lecturewise notes, topicwise DPP, dynamic Exercise and much more on Physicswallah App. Download the App from Google Playstore ( https://bit.ly/2SHIPW6 ) Physicswallah Instagram Handle : https://www.instagram.com/physicswallah/ Physicswallah Facebook Page: https://www.facebook.com/physicswallah Physicswallah Twitter Account : https://twitter.com/PhysicswallahAP?s=20 Physicswallah App on Google Play Store : https://bit.ly/2SHIPW6 Physicswallah Website: ht"
    },
    {
      "comment_id": "UgzV56A1be3OwgbZ8uR4AaABAg.8ktxf6CkGby8p4jXi1lfBg",
      "parent_id": "UgzV56A1be3OwgbZ8uR4AaABAg",
      "comment_type": "reply",
      "author": "@MdSameer-vx9oe",
      "likes": 2,
      "published_at": "2018-12-20T14:44:44Z",
      "timestamp_refs": [],
      "text": "Riya Gupta hii riya",
      "parent_context": "Live Classes, Video Lectures, Test Series, Lecturewise notes, topicwise DPP, dynamic Exercise and much more on Physicswallah App. Download the App from Google Playstore ( https://bit.ly/2SHIPW6 ) Physicswallah Instagram Handle : https://www.instagram.com/physicswallah/ Physicswallah Facebook Page: https://www.facebook.com/physicswallah Physicswallah Twitter Account : https://twitter.com/PhysicswallahAP?s=20 Physicswallah App on Google Play Store : https://bit.ly/2SHIPW6 Physicswallah Website: ht"
    },
    {
      "comment_id": "UgzV56A1be3OwgbZ8uR4AaABAg.8ktxf6CkGby8p7aYJwcz9t",
      "parent_id": "UgzV56A1be3OwgbZ8uR4AaABAg",
      "comment_type": "reply",
      "author": "@Roy0Anonymous",
      "likes": 6,
      "published_at": "2018-12-21T17:23:54Z",
      "timestamp_refs": [],
      "text": "@MdSameer-vx9oe nai degi",
      "parent_context": "Live Classes, Video Lectures, Test Series, Lecturewise notes, topicwise DPP, dynamic Exercise and much more on Physicswallah App. Download the App from Google Playstore ( https://bit.ly/2SHIPW6 ) Physicswallah Instagram Handle : https://www.instagram.com/physicswallah/ Physicswallah Facebook Page: https://www.facebook.com/physicswallah Physicswallah Twitter Account : https://twitter.com/PhysicswallahAP?s=20 Physicswallah App on Google Play Store : https://bit.ly/2SHIPW6 Physicswallah Website: ht"
    },
    {
      "comment_id": "UgzV56A1be3OwgbZ8uR4AaABAg.8ktxf6CkGby8p7dL2DYV82",
      "parent_id": "UgzV56A1be3OwgbZ8uR4AaABAg",
      "comment_type": "reply",
      "author": "@MdSameer-vx9oe",
      "likes": 1,
      "published_at": "2018-12-21T17:48:18Z",
      "timestamp_refs": [],
      "text": "RAHUL ROY 😁😁 nt fr that bro",
      "parent_context": "Live Classes, Video Lectures, Test Series, Lecturewise notes, topicwise DPP, dynamic Exercise and much more on Physicswallah App. Download the App from Google Playstore ( https://bit.ly/2SHIPW6 ) Physicswallah Instagram Handle : https://www.instagram.com/physicswallah/ Physicswallah Facebook Page: https://www.facebook.com/physicswallah Physicswallah Twitter Account : https://twitter.com/PhysicswallahAP?s=20 Physicswallah App on Google Play Store : https://bit.ly/2SHIPW6 Physicswallah Website: ht"
    },
    {
      "comment_id": "UgzV56A1be3OwgbZ8uR4AaABAg.8ktxf6CkGby8qrIIQt7bnk",
      "parent_id": "UgzV56A1be3OwgbZ8uR4AaABAg",
      "comment_type": "reply",
      "author": "@silenthunter4481",
      "likes": 1,
      "published_at": "2019-02-02T17:11:24Z",
      "timestamp_refs": [],
      "text": "+Cartoon World latest HINDI Shinchan dora etc 😁😁😁😁",
      "parent_context": "Live Classes, Video Lectures, Test Series, Lecturewise notes, topicwise DPP, dynamic Exercise and much more on Physicswallah App. Download the App from Google Playstore ( https://bit.ly/2SHIPW6 ) Physicswallah Instagram Handle : https://www.instagram.com/physicswallah/ Physicswallah Facebook Page: https://www.facebook.com/physicswallah Physicswallah Twitter Account : https://twitter.com/PhysicswallahAP?s=20 Physicswallah App on Google Play Store : https://bit.ly/2SHIPW6 Physicswallah Website: ht"
    },
    {
      "comment_id": "UgzV56A1be3OwgbZ8uR4AaABAg.8ktxf6CkGby8r-V4kQEeCF",
      "parent_id": "UgzV56A1be3OwgbZ8uR4AaABAg",
      "comment_type": "reply",
      "author": "@lordyeezus",
      "likes": 3,
      "published_at": "2019-02-06T06:56:18Z",
      "timestamp_refs": [],
      "text": "Sir 28.10 usme MgCl hoga ya MgCl2?",
      "parent_context": "Live Classes, Video Lectures, Test Series, Lecturewise notes, topicwise DPP, dynamic Exercise and much more on Physicswallah App. Download the App from Google Playstore ( https://bit.ly/2SHIPW6 ) Physicswallah Instagram Handle : https://www.instagram.com/physicswallah/ Physicswallah Facebook Page: https://www.facebook.com/physicswallah Physicswallah Twitter Account : https://twitter.com/PhysicswallahAP?s=20 Physicswallah App on Google Play Store : https://bit.ly/2SHIPW6 Physicswallah Website: ht"
    },
    {
      "comment_id": "UgzV56A1be3OwgbZ8uR4AaABAg.8ktxf6CkGby8rBk0_-X-Kp",
      "parent_id": "UgzV56A1be3OwgbZ8uR4AaABAg",
      "comment_type": "reply",
      "author": "@rahulsunda228",
      "likes": 0,
      "published_at": "2019-02-11T01:06:25Z",
      "timestamp_refs": [],
      "text": "Ok sir",
      "parent_context": "Live Classes, Video Lectures, Test Series, Lecturewise notes, topicwise DPP, dynamic Exercise and much more on Physicswallah App. Download the App from Google Playstore ( https://bit.ly/2SHIPW6 ) Physicswallah Instagram Handle : https://www.instagram.com/physicswallah/ Physicswallah Facebook Page: https://www.facebook.com/physicswallah Physicswallah Twitter Account : https://twitter.com/PhysicswallahAP?s=20 Physicswallah App on Google Play Store : https://bit.ly/2SHIPW6 Physicswallah Website: ht"
    },
    {
      "comment_id": "UgzV56A1be3OwgbZ8uR4AaABAg.8ktxf6CkGby8rNubpOnBEy",
      "parent_id": "UgzV56A1be3OwgbZ8uR4AaABAg",
      "comment_type": "reply",
      "author": "@anusayapatil7386",
      "likes": 3,
      "published_at": "2019-02-15T18:29:55Z",
      "timestamp_refs": [],
      "text": "Sir IMP question or topics batane ka 1 vedio banavo na plzzzzzzzzzzzz 🙏🙏🙏🙏🙏🙏🙏🙏",
      "parent_context": "Live Classes, Video Lectures, Test Series, Lecturewise notes, topicwise DPP, dynamic Exercise and much more on Physicswallah App. Download the App from Google Playstore ( https://bit.ly/2SHIPW6 ) Physicswallah Instagram Handle : https://www.instagram.com/physicswallah/ Physicswallah Facebook Page: https://www.facebook.com/physicswallah Physicswallah Twitter Account : https://twitter.com/PhysicswallahAP?s=20 Physicswallah App on Google Play Store : https://bit.ly/2SHIPW6 Physicswallah Website: ht"
    },
    {
      "comment_id": "UgzV56A1be3OwgbZ8uR4AaABAg.8ktxf6CkGby8rNumIBKgFy",
      "parent_id": "UgzV56A1be3OwgbZ8uR4AaABAg",
      "comment_type": "reply",
      "author": "@anusayapatil7386",
      "likes": 1,
      "published_at": "2019-02-15T18:31:20Z",
      "timestamp_refs": [],
      "text": "Both chemistry and physics plzzzzzzzzzzzz for our future",
      "parent_context": "Live Classes, Video Lectures, Test Series, Lecturewise notes, topicwise DPP, dynamic Exercise and much more on Physicswallah App. Download the App from Google Playstore ( https://bit.ly/2SHIPW6 ) Physicswallah Instagram Handle : https://www.instagram.com/physicswallah/ Physicswallah Facebook Page: https://www.facebook.com/physicswallah Physicswallah Twitter Account : https://twitter.com/PhysicswallahAP?s=20 Physicswallah App on Google Play Store : https://bit.ly/2SHIPW6 Physicswallah Website: ht"
    },
    {
      "comment_id": "UgzV56A1be3OwgbZ8uR4AaABAg.8ktxf6CkGby8rRsp0rY-d9",
      "parent_id": "UgzV56A1be3OwgbZ8uR4AaABAg",
      "comment_type": "reply",
      "author": "@vikashpal1976",
      "likes": 0,
      "published_at": "2019-02-17T07:31:12Z",
      "timestamp_refs": [],
      "text": "Sir S block elements ka video bnaea class 11 th",
      "parent_context": "Live Classes, Video Lectures, Test Series, Lecturewise notes, topicwise DPP, dynamic Exercise and much more on Physicswallah App. Download the App from Google Playstore ( https://bit.ly/2SHIPW6 ) Physicswallah Instagram Handle : https://www.instagram.com/physicswallah/ Physicswallah Facebook Page: https://www.facebook.com/physicswallah Physicswallah Twitter Account : https://twitter.com/PhysicswallahAP?s=20 Physicswallah App on Google Play Store : https://bit.ly/2SHIPW6 Physicswallah Website: ht"
    },
    {
      "comment_id": "UgzV56A1be3OwgbZ8uR4AaABAg.8ktxf6CkGby8sMDHTTzDsK",
      "parent_id": "UgzV56A1be3OwgbZ8uR4AaABAg",
      "comment_type": "reply",
      "author": "@minimilitiagaming3029",
      "likes": 0,
      "published_at": "2019-03-11T23:14:40Z",
      "timestamp_refs": [],
      "text": "yes sir",
      "parent_context": "Live Classes, Video Lectures, Test Series, Lecturewise notes, topicwise DPP, dynamic Exercise and much more on Physicswallah App. Download the App from Google Playstore ( https://bit.ly/2SHIPW6 ) Physicswallah Instagram Handle : https://www.instagram.com/physicswallah/ Physicswallah Facebook Page: https://www.facebook.com/physicswallah Physicswallah Twitter Account : https://twitter.com/PhysicswallahAP?s=20 Physicswallah App on Google Play Store : https://bit.ly/2SHIPW6 Physicswallah Website: ht"
    },
    {
      "comment_id": "UgzV56A1be3OwgbZ8uR4AaABAg.8ktxf6CkGby8tlozk1bLP8",
      "parent_id": "UgzV56A1be3OwgbZ8uR4AaABAg",
      "comment_type": "reply",
      "author": "@Hansrajassociate",
      "likes": 1,
      "published_at": "2019-04-16T03:44:33Z",
      "timestamp_refs": [],
      "text": "MgCl ya MgCl2",
      "parent_context": "Live Classes, Video Lectures, Test Series, Lecturewise notes, topicwise DPP, dynamic Exercise and much more on Physicswallah App. Download the App from Google Playstore ( https://bit.ly/2SHIPW6 ) Physicswallah Instagram Handle : https://www.instagram.com/physicswallah/ Physicswallah Facebook Page: https://www.facebook.com/physicswallah Physicswallah Twitter Account : https://twitter.com/PhysicswallahAP?s=20 Physicswallah App on Google Play Store : https://bit.ly/2SHIPW6 Physicswallah Website: ht"
    },
    {
      "comment_id": "UgzV56A1be3OwgbZ8uR4AaABAg.8ktxf6CkGby8xWVBaaoipj",
      "parent_id": "UgzV56A1be3OwgbZ8uR4AaABAg",
      "comment_type": "reply",
      "author": "@pihusharma6119",
      "likes": 1,
      "published_at": "2019-07-18T05:40:32Z",
      "timestamp_refs": [],
      "text": "@anusayapatil7386 Yes sir he is right",
      "parent_context": "Live Classes, Video Lectures, Test Series, Lecturewise notes, topicwise DPP, dynamic Exercise and much more on Physicswallah App. Download the App from Google Playstore ( https://bit.ly/2SHIPW6 ) Physicswallah Instagram Handle : https://www.instagram.com/physicswallah/ Physicswallah Facebook Page: https://www.facebook.com/physicswallah Physicswallah Twitter Account : https://twitter.com/PhysicswallahAP?s=20 Physicswallah App on Google Play Store : https://bit.ly/2SHIPW6 Physicswallah Website: ht"
    },
    {
      "comment_id": "UgzV56A1be3OwgbZ8uR4AaABAg.8ktxf6CkGby8yDLohrbzl7",
      "parent_id": "UgzV56A1be3OwgbZ8uR4AaABAg",
      "comment_type": "reply",
      "author": "@ananyadas5967",
      "likes": 0,
      "published_at": "2019-08-04T15:44:27Z",
      "timestamp_refs": [],
      "text": "@kamtaprasad291 hahaa",
      "parent_context": "Live Classes, Video Lectures, Test Series, Lecturewise notes, topicwise DPP, dynamic Exercise and much more on Physicswallah App. Download the App from Google Playstore ( https://bit.ly/2SHIPW6 ) Physicswallah Instagram Handle : https://www.instagram.com/physicswallah/ Physicswallah Facebook Page: https://www.facebook.com/physicswallah Physicswallah Twitter Account : https://twitter.com/PhysicswallahAP?s=20 Physicswallah App on Google Play Store : https://bit.ly/2SHIPW6 Physicswallah Website: ht"
    },
    {
      "comment_id": "UgzV56A1be3OwgbZ8uR4AaABAg.8ktxf6CkGby8zNwfzng2no",
      "parent_id": "UgzV56A1be3OwgbZ8uR4AaABAg",
      "comment_type": "reply",
      "author": "@rajbirpoonia4105",
      "likes": 2,
      "published_at": "2019-09-02T14:59:07Z",
      "timestamp_refs": [],
      "text": "Sir gaseous state m conductivity kya hogi??",
      "parent_context": "Live Classes, Video Lectures, Test Series, Lecturewise notes, topicwise DPP, dynamic Exercise and much more on Physicswallah App. Download the App from Google Playstore ( https://bit.ly/2SHIPW6 ) Physicswallah Instagram Handle : https://www.instagram.com/physicswallah/ Physicswallah Facebook Page: https://www.facebook.com/physicswallah Physicswallah Twitter Account : https://twitter.com/PhysicswallahAP?s=20 Physicswallah App on Google Play Store : https://bit.ly/2SHIPW6 Physicswallah Website: ht"
    },
    {
      "comment_id": "UgzV56A1be3OwgbZ8uR4AaABAg.8ktxf6CkGby8zOMgwPs7DZ",
      "parent_id": "UgzV56A1be3OwgbZ8uR4AaABAg",
      "comment_type": "reply",
      "author": "@geetachawla1267",
      "likes": 2,
      "published_at": "2019-09-02T18:55:10Z",
      "timestamp_refs": [],
      "text": "Sir u r literally doing very very good job... By the way I am ur new student sir.... U r very helpful for those students who can't pay coaching fees..and( Esa nhi ki Pse bina pdha rhe ho to bekaar pdhao)aap Ye rule follow krte ho sir so thank u so much",
      "parent_context": "Live Classes, Video Lectures, Test Series, Lecturewise notes, topicwise DPP, dynamic Exercise and much more on Physicswallah App. Download the App from Google Playstore ( https://bit.ly/2SHIPW6 ) Physicswallah Instagram Handle : https://www.instagram.com/physicswallah/ Physicswallah Facebook Page: https://www.facebook.com/physicswallah Physicswallah Twitter Account : https://twitter.com/PhysicswallahAP?s=20 Physicswallah App on Google Play Store : https://bit.ly/2SHIPW6 Physicswallah Website: ht"
    },
    {
      "comment_id": "UgzV56A1be3OwgbZ8uR4AaABAg.8ktxf6CkGby9-52BiC_LzS",
      "parent_id": "UgzV56A1be3OwgbZ8uR4AaABAg",
      "comment_type": "reply",
      "author": "@shiprasrivastava7930",
      "likes": 1,
      "published_at": "2019-09-20T03:21:50Z",
      "timestamp_refs": [],
      "text": "Sir u r great",
      "parent_context": "Live Classes, Video Lectures, Test Series, Lecturewise notes, topicwise DPP, dynamic Exercise and much more on Physicswallah App. Download the App from Google Playstore ( https://bit.ly/2SHIPW6 ) Physicswallah Instagram Handle : https://www.instagram.com/physicswallah/ Physicswallah Facebook Page: https://www.facebook.com/physicswallah Physicswallah Twitter Account : https://twitter.com/PhysicswallahAP?s=20 Physicswallah App on Google Play Store : https://bit.ly/2SHIPW6 Physicswallah Website: ht"
    },
    {
      "comment_id": "UgzV56A1be3OwgbZ8uR4AaABAg.8ktxf6CkGby92F3DEt_aO-",
      "parent_id": "UgzV56A1be3OwgbZ8uR4AaABAg",
      "comment_type": "reply",
      "author": "@MastoiSiraj",
      "likes": 2,
      "published_at": "2019-12-07T14:17:22Z",
      "timestamp_refs": [],
      "text": "Great job",
      "parent_context": "Live Classes, Video Lectures, Test Series, Lecturewise notes, topicwise DPP, dynamic Exercise and much more on Physicswallah App. Download the App from Google Playstore ( https://bit.ly/2SHIPW6 ) Physicswallah Instagram Handle : https://www.instagram.com/physicswallah/ Physicswallah Facebook Page: https://www.facebook.com/physicswallah Physicswallah Twitter Account : https://twitter.com/PhysicswallahAP?s=20 Physicswallah App on Google Play Store : https://bit.ly/2SHIPW6 Physicswallah Website: ht"
    },
    {
      "comment_id": "UgzV56A1be3OwgbZ8uR4AaABAg.8ktxf6CkGby92FKP545oJ-",
      "parent_id": "UgzV56A1be3OwgbZ8uR4AaABAg",
      "comment_type": "reply",
      "author": "@vikashprajapati2553",
      "likes": 1,
      "published_at": "2019-12-07T16:47:32Z",
      "timestamp_refs": [],
      "text": "@Hansrajassociate mgcl2",
      "parent_context": "Live Classes, Video Lectures, Test Series, Lecturewise notes, topicwise DPP, dynamic Exercise and much more on Physicswallah App. Download the App from Google Playstore ( https://bit.ly/2SHIPW6 ) Physicswallah Instagram Handle : https://www.instagram.com/physicswallah/ Physicswallah Facebook Page: https://www.facebook.com/physicswallah Physicswallah Twitter Account : https://twitter.com/PhysicswallahAP?s=20 Physicswallah App on Google Play Store : https://bit.ly/2SHIPW6 Physicswallah Website: ht"
    },
    {
      "comment_id": "UgzV56A1be3OwgbZ8uR4AaABAg.8ktxf6CkGby97OhaUvKuk0",
      "parent_id": "UgzV56A1be3OwgbZ8uR4AaABAg",
      "comment_type": "reply",
      "author": "@mahendrakumarbehera4791",
      "likes": 1,
      "published_at": "2020-04-13T14:49:04Z",
      "timestamp_refs": [],
      "text": "Thanks for the notes sir!",
      "parent_context": "Live Classes, Video Lectures, Test Series, Lecturewise notes, topicwise DPP, dynamic Exercise and much more on Physicswallah App. Download the App from Google Playstore ( https://bit.ly/2SHIPW6 ) Physicswallah Instagram Handle : https://www.instagram.com/physicswallah/ Physicswallah Facebook Page: https://www.facebook.com/physicswallah Physicswallah Twitter Account : https://twitter.com/PhysicswallahAP?s=20 Physicswallah App on Google Play Store : https://bit.ly/2SHIPW6 Physicswallah Website: ht"
    },
    {
      "comment_id": "UgzV56A1be3OwgbZ8uR4AaABAg.8ktxf6CkGby97g-wJLadV7",
      "parent_id": "UgzV56A1be3OwgbZ8uR4AaABAg",
      "comment_type": "reply",
      "author": "@rajivranjanmahto565",
      "likes": 2,
      "published_at": "2020-04-20T17:24:25Z",
      "timestamp_refs": [],
      "text": "Sir i don't have paytm i have money but how to give i don't have paytm",
      "parent_context": "Live Classes, Video Lectures, Test Series, Lecturewise notes, topicwise DPP, dynamic Exercise and much more on Physicswallah App. Download the App from Google Playstore ( https://bit.ly/2SHIPW6 ) Physicswallah Instagram Handle : https://www.instagram.com/physicswallah/ Physicswallah Facebook Page: https://www.facebook.com/physicswallah Physicswallah Twitter Account : https://twitter.com/PhysicswallahAP?s=20 Physicswallah App on Google Play Store : https://bit.ly/2SHIPW6 Physicswallah Website: ht"
    },
    {
      "comment_id": "UgzV56A1be3OwgbZ8uR4AaABAg.8ktxf6CkGby984QVMS4PVg",
      "parent_id": "UgzV56A1be3OwgbZ8uR4AaABAg",
      "comment_type": "reply",
      "author": "@nidhandas4586",
      "likes": 1,
      "published_at": "2020-04-30T14:17:32Z",
      "timestamp_refs": [],
      "text": "@MdSameer-vx9oe Because all the elements in group 14 has a valency of 4",
      "parent_context": "Live Classes, Video Lectures, Test Series, Lecturewise notes, topicwise DPP, dynamic Exercise and much more on Physicswallah App. Download the App from Google Playstore ( https://bit.ly/2SHIPW6 ) Physicswallah Instagram Handle : https://www.instagram.com/physicswallah/ Physicswallah Facebook Page: https://www.facebook.com/physicswallah Physicswallah Twitter Account : https://twitter.com/PhysicswallahAP?s=20 Physicswallah App on Google Play Store : https://bit.ly/2SHIPW6 Physicswallah Website: ht"
    },
    {
      "comment_id": "UgzV56A1be3OwgbZ8uR4AaABAg.8ktxf6CkGby984QaGAxbUY",
      "parent_id": "UgzV56A1be3OwgbZ8uR4AaABAg",
      "comment_type": "reply",
      "author": "@nidhandas4586",
      "likes": 1,
      "published_at": "2020-04-30T14:18:20Z",
      "timestamp_refs": [],
      "text": "@MdSameer-vx9oe ha",
      "parent_context": "Live Classes, Video Lectures, Test Series, Lecturewise notes, topicwise DPP, dynamic Exercise and much more on Physicswallah App. Download the App from Google Playstore ( https://bit.ly/2SHIPW6 ) Physicswallah Instagram Handle : https://www.instagram.com/physicswallah/ Physicswallah Facebook Page: https://www.facebook.com/physicswallah Physicswallah Twitter Account : https://twitter.com/PhysicswallahAP?s=20 Physicswallah App on Google Play Store : https://bit.ly/2SHIPW6 Physicswallah Website: ht"
    },
    {
      "comment_id": "UgzV56A1be3OwgbZ8uR4AaABAg.8ktxf6CkGby984QbWXgkm3",
      "parent_id": "UgzV56A1be3OwgbZ8uR4AaABAg",
      "comment_type": "reply",
      "author": "@nidhandas4586",
      "likes": 1,
      "published_at": "2020-04-30T14:18:31Z",
      "timestamp_refs": [],
      "text": "@MdSameer-vx9oe klll",
      "parent_context": "Live Classes, Video Lectures, Test Series, Lecturewise notes, topicwise DPP, dynamic Exercise and much more on Physicswallah App. Download the App from Google Playstore ( https://bit.ly/2SHIPW6 ) Physicswallah Instagram Handle : https://www.instagram.com/physicswallah/ Physicswallah Facebook Page: https://www.facebook.com/physicswallah Physicswallah Twitter Account : https://twitter.com/PhysicswallahAP?s=20 Physicswallah App on Google Play Store : https://bit.ly/2SHIPW6 Physicswallah Website: ht"
    },
    {
      "comment_id": "UgzV56A1be3OwgbZ8uR4AaABAg.8ktxf6CkGby98i8qe7NHXZ",
      "parent_id": "UgzV56A1be3OwgbZ8uR4AaABAg",
      "comment_type": "reply",
      "author": "@aarishfakhan3495",
      "likes": 1,
      "published_at": "2020-05-16T09:52:09Z",
      "timestamp_refs": [],
      "text": "Physics Wallah - Alakh Pandey : thanku sir",
      "parent_context": "Live Classes, Video Lectures, Test Series, Lecturewise notes, topicwise DPP, dynamic Exercise and much more on Physicswallah App. Download the App from Google Playstore ( https://bit.ly/2SHIPW6 ) Physicswallah Instagram Handle : https://www.instagram.com/physicswallah/ Physicswallah Facebook Page: https://www.facebook.com/physicswallah Physicswallah Twitter Account : https://twitter.com/PhysicswallahAP?s=20 Physicswallah App on Google Play Store : https://bit.ly/2SHIPW6 Physicswallah Website: ht"
    },
    {
      "comment_id": "UgzV56A1be3OwgbZ8uR4AaABAg.8ktxf6CkGby99A1s6F2GQt",
      "parent_id": "UgzV56A1be3OwgbZ8uR4AaABAg",
      "comment_type": "reply",
      "author": "@rajeshkumar-mf9bx",
      "likes": 0,
      "published_at": "2020-05-27T15:09:10Z",
      "timestamp_refs": [],
      "text": "Beggar hai kiya",
      "parent_context": "Live Classes, Video Lectures, Test Series, Lecturewise notes, topicwise DPP, dynamic Exercise and much more on Physicswallah App. Download the App from Google Playstore ( https://bit.ly/2SHIPW6 ) Physicswallah Instagram Handle : https://www.instagram.com/physicswallah/ Physicswallah Facebook Page: https://www.facebook.com/physicswallah Physicswallah Twitter Account : https://twitter.com/PhysicswallahAP?s=20 Physicswallah App on Google Play Store : https://bit.ly/2SHIPW6 Physicswallah Website: ht"
    },
    {
      "comment_id": "UgzV56A1be3OwgbZ8uR4AaABAg.8ktxf6CkGby99HMxiI8Z8q",
      "parent_id": "UgzV56A1be3OwgbZ8uR4AaABAg",
      "comment_type": "reply",
      "author": "@Kkshaikh79",
      "likes": 2,
      "published_at": "2020-05-30T11:28:07Z",
      "timestamp_refs": [],
      "text": "@RaviKumar-qo6fe Kya bolna chahta hai😅😅",
      "parent_context": "Live Classes, Video Lectures, Test Series, Lecturewise notes, topicwise DPP, dynamic Exercise and much more on Physicswallah App. Download the App from Google Playstore ( https://bit.ly/2SHIPW6 ) Physicswallah Instagram Handle : https://www.instagram.com/physicswallah/ Physicswallah Facebook Page: https://www.facebook.com/physicswallah Physicswallah Twitter Account : https://twitter.com/PhysicswallahAP?s=20 Physicswallah App on Google Play Store : https://bit.ly/2SHIPW6 Physicswallah Website: ht"
    },
    {
      "comment_id": "UgzV56A1be3OwgbZ8uR4AaABAg.8ktxf6CkGby99JVXYEW19e",
      "parent_id": "UgzV56A1be3OwgbZ8uR4AaABAg",
      "comment_type": "reply",
      "author": "@gitanjalisamal4015",
      "likes": 2,
      "published_at": "2020-05-31T07:21:32Z",
      "timestamp_refs": [],
      "text": "Sir mgcl2 hota hai mgcl toa nahin hota..m",
      "parent_context": "Live Classes, Video Lectures, Test Series, Lecturewise notes, topicwise DPP, dynamic Exercise and much more on Physicswallah App. Download the App from Google Playstore ( https://bit.ly/2SHIPW6 ) Physicswallah Instagram Handle : https://www.instagram.com/physicswallah/ Physicswallah Facebook Page: https://www.facebook.com/physicswallah Physicswallah Twitter Account : https://twitter.com/PhysicswallahAP?s=20 Physicswallah App on Google Play Store : https://bit.ly/2SHIPW6 Physicswallah Website: ht"
    },
    {
      "comment_id": "UgzV56A1be3OwgbZ8uR4AaABAg.8ktxf6CkGby99O5ZEMxrzp",
      "parent_id": "UgzV56A1be3OwgbZ8uR4AaABAg",
      "comment_type": "reply",
      "author": "@princeyadav-no7vq",
      "likes": 2,
      "published_at": "2020-06-02T02:10:46Z",
      "timestamp_refs": [],
      "text": "@rajeshkumar-mf9bx kuchh bhi tuition teacher jo mahine per fee mangte hai or school wale jo fee lete hai to wo bhi begger hai kia ve",
      "parent_context": "Live Classes, Video Lectures, Test Series, Lecturewise notes, topicwise DPP, dynamic Exercise and much more on Physicswallah App. Download the App from Google Playstore ( https://bit.ly/2SHIPW6 ) Physicswallah Instagram Handle : https://www.instagram.com/physicswallah/ Physicswallah Facebook Page: https://www.facebook.com/physicswallah Physicswallah Twitter Account : https://twitter.com/PhysicswallahAP?s=20 Physicswallah App on Google Play Store : https://bit.ly/2SHIPW6 Physicswallah Website: ht"
    },
    {
      "comment_id": "UgzV56A1be3OwgbZ8uR4AaABAg.8ktxf6CkGby99O5hVBl9bv",
      "parent_id": "UgzV56A1be3OwgbZ8uR4AaABAg",
      "comment_type": "reply",
      "author": "@princeyadav-no7vq",
      "likes": 1,
      "published_at": "2020-06-02T02:12:02Z",
      "timestamp_refs": [],
      "text": "@rajeshkumar-mf9bxpaise ke sath dilse bhi nange lag rahe ho",
      "parent_context": "Live Classes, Video Lectures, Test Series, Lecturewise notes, topicwise DPP, dynamic Exercise and much more on Physicswallah App. Download the App from Google Playstore ( https://bit.ly/2SHIPW6 ) Physicswallah Instagram Handle : https://www.instagram.com/physicswallah/ Physicswallah Facebook Page: https://www.facebook.com/physicswallah Physicswallah Twitter Account : https://twitter.com/PhysicswallahAP?s=20 Physicswallah App on Google Play Store : https://bit.ly/2SHIPW6 Physicswallah Website: ht"
    },
    {
      "comment_id": "UgzV56A1be3OwgbZ8uR4AaABAg.8ktxf6CkGby99_GSonzmVJ",
      "parent_id": "UgzV56A1be3OwgbZ8uR4AaABAg",
      "comment_type": "reply",
      "author": "@gitanjalisamal4015",
      "likes": 2,
      "published_at": "2020-06-06T19:36:54Z",
      "timestamp_refs": [],
      "text": "Agar humare sir ke bare me koi ab kuch bhala bura bola toa ....nitija bhtt kharap hoga ...hume se koi apko punishh nahin karega god is there unse Sikh te hoo or un ko bhala bura khethe hoo",
      "parent_context": "Live Classes, Video Lectures, Test Series, Lecturewise notes, topicwise DPP, dynamic Exercise and much more on Physicswallah App. Download the App from Google Playstore ( https://bit.ly/2SHIPW6 ) Physicswallah Instagram Handle : https://www.instagram.com/physicswallah/ Physicswallah Facebook Page: https://www.facebook.com/physicswallah Physicswallah Twitter Account : https://twitter.com/PhysicswallahAP?s=20 Physicswallah App on Google Play Store : https://bit.ly/2SHIPW6 Physicswallah Website: ht"
    },
    {
      "comment_id": "UgzV56A1be3OwgbZ8uR4AaABAg.8ktxf6CkGby99_QNpsHCFj",
      "parent_id": "UgzV56A1be3OwgbZ8uR4AaABAg",
      "comment_type": "reply",
      "author": "@gitanjalisamal4015",
      "likes": 1,
      "published_at": "2020-06-06T21:03:36Z",
      "timestamp_refs": [],
      "text": "@ayushkumarpal2k05yeah😊😊 from which class u are ?????",
      "parent_context": "Live Classes, Video Lectures, Test Series, Lecturewise notes, topicwise DPP, dynamic Exercise and much more on Physicswallah App. Download the App from Google Playstore ( https://bit.ly/2SHIPW6 ) Physicswallah Instagram Handle : https://www.instagram.com/physicswallah/ Physicswallah Facebook Page: https://www.facebook.com/physicswallah Physicswallah Twitter Account : https://twitter.com/PhysicswallahAP?s=20 Physicswallah App on Google Play Store : https://bit.ly/2SHIPW6 Physicswallah Website: ht"
    },
    {
      "comment_id": "UgzV56A1be3OwgbZ8uR4AaABAg.8ktxf6CkGby9AviXacZTge",
      "parent_id": "UgzV56A1be3OwgbZ8uR4AaABAg",
      "comment_type": "reply",
      "author": "@sheikhmomin2386",
      "likes": 1,
      "published_at": "2020-07-10T09:25:39Z",
      "timestamp_refs": [],
      "text": "Sir kössel-lewis approach to chemical bonding kaha h?",
      "parent_context": "Live Classes, Video Lectures, Test Series, Lecturewise notes, topicwise DPP, dynamic Exercise and much more on Physicswallah App. Download the App from Google Playstore ( https://bit.ly/2SHIPW6 ) Physicswallah Instagram Handle : https://www.instagram.com/physicswallah/ Physicswallah Facebook Page: https://www.facebook.com/physicswallah Physicswallah Twitter Account : https://twitter.com/PhysicswallahAP?s=20 Physicswallah App on Google Play Store : https://bit.ly/2SHIPW6 Physicswallah Website: ht"
    },
    {
      "comment_id": "UgzV56A1be3OwgbZ8uR4AaABAg.8ktxf6CkGby9B0M1rfawRy",
      "parent_id": "UgzV56A1be3OwgbZ8uR4AaABAg",
      "comment_type": "reply",
      "author": "@polavarapucharan9200",
      "likes": 1,
      "published_at": "2020-07-12T13:55:47Z",
      "timestamp_refs": [],
      "text": "Where is Kossel’s Lewis approach Pls upload Sir",
      "parent_context": "Live Classes, Video Lectures, Test Series, Lecturewise notes, topicwise DPP, dynamic Exercise and much more on Physicswallah App. Download the App from Google Playstore ( https://bit.ly/2SHIPW6 ) Physicswallah Instagram Handle : https://www.instagram.com/physicswallah/ Physicswallah Facebook Page: https://www.facebook.com/physicswallah Physicswallah Twitter Account : https://twitter.com/PhysicswallahAP?s=20 Physicswallah App on Google Play Store : https://bit.ly/2SHIPW6 Physicswallah Website: ht"
    },
    {
      "comment_id": "UgzV56A1be3OwgbZ8uR4AaABAg.8ktxf6CkGby9BdsP8fNYjB",
      "parent_id": "UgzV56A1be3OwgbZ8uR4AaABAg",
      "comment_type": "reply",
      "author": "@pawanramnani8300",
      "likes": 1,
      "published_at": "2020-07-28T07:36:56Z",
      "timestamp_refs": [],
      "text": "sir aapse youtube me heart pana bhut namumkin hai",
      "parent_context": "Live Classes, Video Lectures, Test Series, Lecturewise notes, topicwise DPP, dynamic Exercise and much more on Physicswallah App. Download the App from Google Playstore ( https://bit.ly/2SHIPW6 ) Physicswallah Instagram Handle : https://www.instagram.com/physicswallah/ Physicswallah Facebook Page: https://www.facebook.com/physicswallah Physicswallah Twitter Account : https://twitter.com/PhysicswallahAP?s=20 Physicswallah App on Google Play Store : https://bit.ly/2SHIPW6 Physicswallah Website: ht"
    },
    {
      "comment_id": "UgzV56A1be3OwgbZ8uR4AaABAg.8ktxf6CkGby9DIsYiWYYrO",
      "parent_id": "UgzV56A1be3OwgbZ8uR4AaABAg",
      "comment_type": "reply",
      "author": "@_ranaarpit8776",
      "likes": 1,
      "published_at": "2020-09-07T11:37:44Z",
      "timestamp_refs": [],
      "text": "I have given you a sum of 5000 best luck May gbu",
      "parent_context": "Live Classes, Video Lectures, Test Series, Lecturewise notes, topicwise DPP, dynamic Exercise and much more on Physicswallah App. Download the App from Google Playstore ( https://bit.ly/2SHIPW6 ) Physicswallah Instagram Handle : https://www.instagram.com/physicswallah/ Physicswallah Facebook Page: https://www.facebook.com/physicswallah Physicswallah Twitter Account : https://twitter.com/PhysicswallahAP?s=20 Physicswallah App on Google Play Store : https://bit.ly/2SHIPW6 Physicswallah Website: ht"
    },
    {
      "comment_id": "UgzV56A1be3OwgbZ8uR4AaABAg.8ktxf6CkGby9DKopMYD14z",
      "parent_id": "UgzV56A1be3OwgbZ8uR4AaABAg",
      "comment_type": "reply",
      "author": "@pawanramnani8300",
      "likes": 2,
      "published_at": "2020-09-08T05:43:40Z",
      "timestamp_refs": [],
      "text": "@_ranaarpit8776 wah, man liya aapko",
      "parent_context": "Live Classes, Video Lectures, Test Series, Lecturewise notes, topicwise DPP, dynamic Exercise and much more on Physicswallah App. Download the App from Google Playstore ( https://bit.ly/2SHIPW6 ) Physicswallah Instagram Handle : https://www.instagram.com/physicswallah/ Physicswallah Facebook Page: https://www.facebook.com/physicswallah Physicswallah Twitter Account : https://twitter.com/PhysicswallahAP?s=20 Physicswallah App on Google Play Store : https://bit.ly/2SHIPW6 Physicswallah Website: ht"
    },
    {
      "comment_id": "UgzV56A1be3OwgbZ8uR4AaABAg.8ktxf6CkGby9EzRzJrhwoq",
      "parent_id": "UgzV56A1be3OwgbZ8uR4AaABAg",
      "comment_type": "reply",
      "author": "@vanitathakur5997",
      "likes": 1,
      "published_at": "2020-10-19T06:14:49Z",
      "timestamp_refs": [],
      "text": "Sir chem sir is good but something is still missing we are unable to understand complete concept please sir do something.",
      "parent_context": "Live Classes, Video Lectures, Test Series, Lecturewise notes, topicwise DPP, dynamic Exercise and much more on Physicswallah App. Download the App from Google Playstore ( https://bit.ly/2SHIPW6 ) Physicswallah Instagram Handle : https://www.instagram.com/physicswallah/ Physicswallah Facebook Page: https://www.facebook.com/physicswallah Physicswallah Twitter Account : https://twitter.com/PhysicswallahAP?s=20 Physicswallah App on Google Play Store : https://bit.ly/2SHIPW6 Physicswallah Website: ht"
    },
    {
      "comment_id": "UgzV56A1be3OwgbZ8uR4AaABAg.8ktxf6CkGby9FqP9H_ny9I",
      "parent_id": "UgzV56A1be3OwgbZ8uR4AaABAg",
      "comment_type": "reply",
      "author": "@manaschandak6928",
      "likes": 0,
      "published_at": "2020-11-09T14:28:20Z",
      "timestamp_refs": [],
      "text": "11 Chap 4 | Chemical Bonding and Molecular Structure 02 | Ionic Bond | Electrovalent Bond IIT JEE 11 Chap 4 | Chemical Bonding and Molecular Structure 02 | Ionic Bond | Electrovalent Bond IIT JEE 11 Chap 4 | Chemical Bonding and Molecular Structure 02 | Ionic Bond | Electrovalent Bond IIT JEE 11 Chap 4 | Chemical Bonding and Molecular Structure 02 | Ionic Bond | Electrovalent Bond IIT JEE 11 Chap 4 | Chemical Bonding and Molecular Structure 02 | Ionic Bond | Electrovalent Bond IIT JEE 11 Chap 4 | Chemical Bonding and Molecular Structure 02 | Ionic Bond | Electrovalent Bond IIT JEE 11 Chap 4 | Chemical Bonding and Molecular Structure 02 | Ionic Bond | Electrovalent Bond IIT JEE 11 Chap 4 | Chemical Bonding and Molecular Structure 02 | Ionic Bond | Electrovalent Bond IIT JEE 11 Chap 4 | Chemical Bonding and Molecular Structure 02 | Ionic Bond | Electrovalent Bond IIT JEE 11 Chap 4 | Chemical Bonding and Molecular Structure 02 | Ionic Bond | Electrovalent Bond IIT JEE 11 Chap 4 | Chemical Bonding and Molecular Structure 02 | Ionic Bond | Electrovalent Bond IIT JEE 11 Chap 4 | Chemical Bonding and Molecular Structure 02 | Ionic Bond | Electrovalent Bond IIT JEE 11 Chap 4 | Chemical Bonding and Molecular Structure 02 | Ionic Bond | Electrovalent Bond IIT JEE 11 Chap 4 | Chemical Bonding and Molecular Structure 02 | Ionic Bond | Electrovalent Bond IIT JEE v",
      "parent_context": "Live Classes, Video Lectures, Test Series, Lecturewise notes, topicwise DPP, dynamic Exercise and much more on Physicswallah App. Download the App from Google Playstore ( https://bit.ly/2SHIPW6 ) Physicswallah Instagram Handle : https://www.instagram.com/physicswallah/ Physicswallah Facebook Page: https://www.facebook.com/physicswallah Physicswallah Twitter Account : https://twitter.com/PhysicswallahAP?s=20 Physicswallah App on Google Play Store : https://bit.ly/2SHIPW6 Physicswallah Website: ht"
    },
    {
      "comment_id": "UgzV56A1be3OwgbZ8uR4AaABAg.8ktxf6CkGby9GJzGoXZ0wZ",
      "parent_id": "UgzV56A1be3OwgbZ8uR4AaABAg",
      "comment_type": "reply",
      "author": "@ranjeetkasana3535",
      "likes": 1,
      "published_at": "2020-11-21T11:29:53Z",
      "timestamp_refs": [],
      "text": "Sir ,you give excellent explanation..",
      "parent_context": "Live Classes, Video Lectures, Test Series, Lecturewise notes, topicwise DPP, dynamic Exercise and much more on Physicswallah App. Download the App from Google Playstore ( https://bit.ly/2SHIPW6 ) Physicswallah Instagram Handle : https://www.instagram.com/physicswallah/ Physicswallah Facebook Page: https://www.facebook.com/physicswallah Physicswallah Twitter Account : https://twitter.com/PhysicswallahAP?s=20 Physicswallah App on Google Play Store : https://bit.ly/2SHIPW6 Physicswallah Website: ht"
    },
    {
      "comment_id": "UgzV56A1be3OwgbZ8uR4AaABAg.8ktxf6CkGby9IKZr-UZIHz",
      "parent_id": "UgzV56A1be3OwgbZ8uR4AaABAg",
      "comment_type": "reply",
      "author": "@dvk4469",
      "likes": 1,
      "published_at": "2021-01-10T10:01:03Z",
      "timestamp_refs": [],
      "text": "Sir you are gujarati?",
      "parent_context": "Live Classes, Video Lectures, Test Series, Lecturewise notes, topicwise DPP, dynamic Exercise and much more on Physicswallah App. Download the App from Google Playstore ( https://bit.ly/2SHIPW6 ) Physicswallah Instagram Handle : https://www.instagram.com/physicswallah/ Physicswallah Facebook Page: https://www.facebook.com/physicswallah Physicswallah Twitter Account : https://twitter.com/PhysicswallahAP?s=20 Physicswallah App on Google Play Store : https://bit.ly/2SHIPW6 Physicswallah Website: ht"
    },
    {
      "comment_id": "UgzV56A1be3OwgbZ8uR4AaABAg.8ktxf6CkGby9JcP-b4H00D",
      "parent_id": "UgzV56A1be3OwgbZ8uR4AaABAg",
      "comment_type": "reply",
      "author": "@lifeaur7772",
      "likes": 1,
      "published_at": "2021-02-11T14:03:13Z",
      "timestamp_refs": [],
      "text": "are aaj tk kahan thi aap 😂😂",
      "parent_context": "Live Classes, Video Lectures, Test Series, Lecturewise notes, topicwise DPP, dynamic Exercise and much more on Physicswallah App. Download the App from Google Playstore ( https://bit.ly/2SHIPW6 ) Physicswallah Instagram Handle : https://www.instagram.com/physicswallah/ Physicswallah Facebook Page: https://www.facebook.com/physicswallah Physicswallah Twitter Account : https://twitter.com/PhysicswallahAP?s=20 Physicswallah App on Google Play Store : https://bit.ly/2SHIPW6 Physicswallah Website: ht"
    },
    {
      "comment_id": "UgzV56A1be3OwgbZ8uR4AaABAg.8ktxf6CkGby9KUjVyTSSZF",
      "parent_id": "UgzV56A1be3OwgbZ8uR4AaABAg",
      "comment_type": "reply",
      "author": "@shankarpandit7487",
      "likes": 1,
      "published_at": "2021-03-05T01:49:22Z",
      "timestamp_refs": [],
      "text": "Thank you so much sir you help me and lot of students help love you SIR.....🥰🥰💝💝",
      "parent_context": "Live Classes, Video Lectures, Test Series, Lecturewise notes, topicwise DPP, dynamic Exercise and much more on Physicswallah App. Download the App from Google Playstore ( https://bit.ly/2SHIPW6 ) Physicswallah Instagram Handle : https://www.instagram.com/physicswallah/ Physicswallah Facebook Page: https://www.facebook.com/physicswallah Physicswallah Twitter Account : https://twitter.com/PhysicswallahAP?s=20 Physicswallah App on Google Play Store : https://bit.ly/2SHIPW6 Physicswallah Website: ht"
    },
    {
      "comment_id": "UgzV56A1be3OwgbZ8uR4AaABAg.8ktxf6CkGby9KuGLAHeL7A",
      "parent_id": "UgzV56A1be3OwgbZ8uR4AaABAg",
      "comment_type": "reply",
      "author": "@arvindpatel4473",
      "likes": 1,
      "published_at": "2021-03-15T09:05:14Z",
      "timestamp_refs": [
        "12:30"
      ],
      "text": "12:30 sir group 2 to s block me lie karta hai na?? To Appne d block kyi kaha??",
      "parent_context": "Live Classes, Video Lectures, Test Series, Lecturewise notes, topicwise DPP, dynamic Exercise and much more on Physicswallah App. Download the App from Google Playstore ( https://bit.ly/2SHIPW6 ) Physicswallah Instagram Handle : https://www.instagram.com/physicswallah/ Physicswallah Facebook Page: https://www.facebook.com/physicswallah Physicswallah Twitter Account : https://twitter.com/PhysicswallahAP?s=20 Physicswallah App on Google Play Store : https://bit.ly/2SHIPW6 Physicswallah Website: ht"
    },
    {
      "comment_id": "UgzV56A1be3OwgbZ8uR4AaABAg.8ktxf6CkGby9L3lTuwaYnB",
      "parent_id": "UgzV56A1be3OwgbZ8uR4AaABAg",
      "comment_type": "reply",
      "author": "@BerkshireIntellects",
      "likes": 1,
      "published_at": "2021-03-19T10:58:28Z",
      "timestamp_refs": [],
      "text": "Isomorphism polymorphism anisotropy transition elements",
      "parent_context": "Live Classes, Video Lectures, Test Series, Lecturewise notes, topicwise DPP, dynamic Exercise and much more on Physicswallah App. Download the App from Google Playstore ( https://bit.ly/2SHIPW6 ) Physicswallah Instagram Handle : https://www.instagram.com/physicswallah/ Physicswallah Facebook Page: https://www.facebook.com/physicswallah Physicswallah Twitter Account : https://twitter.com/PhysicswallahAP?s=20 Physicswallah App on Google Play Store : https://bit.ly/2SHIPW6 Physicswallah Website: ht"
    },
    {
      "comment_id": "UgzV56A1be3OwgbZ8uR4AaABAg.8ktxf6CkGby9VQKQH6Klb4",
      "parent_id": "UgzV56A1be3OwgbZ8uR4AaABAg",
      "comment_type": "reply",
      "author": "@yogeshbihani9138",
      "likes": 0,
      "published_at": "2021-12-01T18:29:46Z",
      "timestamp_refs": [
        "12:05"
      ],
      "text": "12:05 Sir grp 3 se 12 hona chaiye na D block starts from grp 3 to grp 12",
      "parent_context": "Live Classes, Video Lectures, Test Series, Lecturewise notes, topicwise DPP, dynamic Exercise and much more on Physicswallah App. Download the App from Google Playstore ( https://bit.ly/2SHIPW6 ) Physicswallah Instagram Handle : https://www.instagram.com/physicswallah/ Physicswallah Facebook Page: https://www.facebook.com/physicswallah Physicswallah Twitter Account : https://twitter.com/PhysicswallahAP?s=20 Physicswallah App on Google Play Store : https://bit.ly/2SHIPW6 Physicswallah Website: ht"
    },
    {
      "comment_id": "UgzV56A1be3OwgbZ8uR4AaABAg.8ktxf6CkGby9f6iH9FAYfj",
      "parent_id": "UgzV56A1be3OwgbZ8uR4AaABAg",
      "comment_type": "reply",
      "author": "@sumertewatia8439",
      "likes": 0,
      "published_at": "2022-08-24T13:27:30Z",
      "timestamp_refs": [],
      "text": ". Hg. Hm H.",
      "parent_context": "Live Classes, Video Lectures, Test Series, Lecturewise notes, topicwise DPP, dynamic Exercise and much more on Physicswallah App. Download the App from Google Playstore ( https://bit.ly/2SHIPW6 ) Physicswallah Instagram Handle : https://www.instagram.com/physicswallah/ Physicswallah Facebook Page: https://www.facebook.com/physicswallah Physicswallah Twitter Account : https://twitter.com/PhysicswallahAP?s=20 Physicswallah App on Google Play Store : https://bit.ly/2SHIPW6 Physicswallah Website: ht"
    },
    {
      "comment_id": "UgzV56A1be3OwgbZ8uR4AaABAg.8ktxf6CkGby9fvKR5ehy9P",
      "parent_id": "UgzV56A1be3OwgbZ8uR4AaABAg",
      "comment_type": "reply",
      "author": "@khyatipandey5432",
      "likes": 0,
      "published_at": "2022-09-13T14:30:54Z",
      "timestamp_refs": [],
      "text": "@MdSameer-vx9oe kyuki uske valence shell m 4 electron hain...ekdm beech ka.... Ab vo 4 electron ya to dede ya to lele isliye vo abhi undefined hai",
      "parent_context": "Live Classes, Video Lectures, Test Series, Lecturewise notes, topicwise DPP, dynamic Exercise and much more on Physicswallah App. Download the App from Google Playstore ( https://bit.ly/2SHIPW6 ) Physicswallah Instagram Handle : https://www.instagram.com/physicswallah/ Physicswallah Facebook Page: https://www.facebook.com/physicswallah Physicswallah Twitter Account : https://twitter.com/PhysicswallahAP?s=20 Physicswallah App on Google Play Store : https://bit.ly/2SHIPW6 Physicswallah Website: ht"
    },
    {
      "comment_id": "UgzV56A1be3OwgbZ8uR4AaABAg.8ktxf6CkGby9hbHLGbfmnm",
      "parent_id": "UgzV56A1be3OwgbZ8uR4AaABAg",
      "comment_type": "reply",
      "author": "@AnshuSharma-lv9wv",
      "likes": 0,
      "published_at": "2022-10-25T12:41:53Z",
      "timestamp_refs": [],
      "text": "@MdSameer-vx9oe bolo kya kaam h usse",
      "parent_context": "Live Classes, Video Lectures, Test Series, Lecturewise notes, topicwise DPP, dynamic Exercise and much more on Physicswallah App. Download the App from Google Playstore ( https://bit.ly/2SHIPW6 ) Physicswallah Instagram Handle : https://www.instagram.com/physicswallah/ Physicswallah Facebook Page: https://www.facebook.com/physicswallah Physicswallah Twitter Account : https://twitter.com/PhysicswallahAP?s=20 Physicswallah App on Google Play Store : https://bit.ly/2SHIPW6 Physicswallah Website: ht"
    },
    {
      "comment_id": "UgzV56A1be3OwgbZ8uR4AaABAg.8ktxf6CkGby9im0ZYa5Kg1",
      "parent_id": "UgzV56A1be3OwgbZ8uR4AaABAg",
      "comment_type": "reply",
      "author": "@manasbijewar3221",
      "likes": 1,
      "published_at": "2022-11-23T13:18:20Z",
      "timestamp_refs": [],
      "text": "@ankuxx bhai kha job lg gyi ab",
      "parent_context": "Live Classes, Video Lectures, Test Series, Lecturewise notes, topicwise DPP, dynamic Exercise and much more on Physicswallah App. Download the App from Google Playstore ( https://bit.ly/2SHIPW6 ) Physicswallah Instagram Handle : https://www.instagram.com/physicswallah/ Physicswallah Facebook Page: https://www.facebook.com/physicswallah Physicswallah Twitter Account : https://twitter.com/PhysicswallahAP?s=20 Physicswallah App on Google Play Store : https://bit.ly/2SHIPW6 Physicswallah Website: ht"
    },
    {
      "comment_id": "UgzV56A1be3OwgbZ8uR4AaABAg.8ktxf6CkGby9im0hoJsCbt",
      "parent_id": "UgzV56A1be3OwgbZ8uR4AaABAg",
      "comment_type": "reply",
      "author": "@manasbijewar3221",
      "likes": 1,
      "published_at": "2022-11-23T13:19:35Z",
      "timestamp_refs": [],
      "text": "@anuraggangwar6644 bhai abb kya ho rha hai after 4 years😅",
      "parent_context": "Live Classes, Video Lectures, Test Series, Lecturewise notes, topicwise DPP, dynamic Exercise and much more on Physicswallah App. Download the App from Google Playstore ( https://bit.ly/2SHIPW6 ) Physicswallah Instagram Handle : https://www.instagram.com/physicswallah/ Physicswallah Facebook Page: https://www.facebook.com/physicswallah Physicswallah Twitter Account : https://twitter.com/PhysicswallahAP?s=20 Physicswallah App on Google Play Store : https://bit.ly/2SHIPW6 Physicswallah Website: ht"
    },
    {
      "comment_id": "UgzV56A1be3OwgbZ8uR4AaABAg.8ktxf6CkGby9im2i7_IhUx",
      "parent_id": "UgzV56A1be3OwgbZ8uR4AaABAg",
      "comment_type": "reply",
      "author": "@anuraggangwar6644",
      "likes": 0,
      "published_at": "2022-11-23T13:37:07Z",
      "timestamp_refs": [],
      "text": "@manasbijewar3221 brother selection ho gaya tha rrb alp/technician wale me. So currently 2.5 years se as a technician posted hu IR me. What about you brother?",
      "parent_context": "Live Classes, Video Lectures, Test Series, Lecturewise notes, topicwise DPP, dynamic Exercise and much more on Physicswallah App. Download the App from Google Playstore ( https://bit.ly/2SHIPW6 ) Physicswallah Instagram Handle : https://www.instagram.com/physicswallah/ Physicswallah Facebook Page: https://www.facebook.com/physicswallah Physicswallah Twitter Account : https://twitter.com/PhysicswallahAP?s=20 Physicswallah App on Google Play Store : https://bit.ly/2SHIPW6 Physicswallah Website: ht"
    },
    {
      "comment_id": "UgzV56A1be3OwgbZ8uR4AaABAg.8ktxf6CkGby9im4n_WVb4g",
      "parent_id": "UgzV56A1be3OwgbZ8uR4AaABAg",
      "comment_type": "reply",
      "author": "@manasbijewar3221",
      "likes": 0,
      "published_at": "2022-11-23T13:55:20Z",
      "timestamp_refs": [],
      "text": "@anuraggangwar6644 bhai abhi toh 11th me hu 😅",
      "parent_context": "Live Classes, Video Lectures, Test Series, Lecturewise notes, topicwise DPP, dynamic Exercise and much more on Physicswallah App. Download the App from Google Playstore ( https://bit.ly/2SHIPW6 ) Physicswallah Instagram Handle : https://www.instagram.com/physicswallah/ Physicswallah Facebook Page: https://www.facebook.com/physicswallah Physicswallah Twitter Account : https://twitter.com/PhysicswallahAP?s=20 Physicswallah App on Google Play Store : https://bit.ly/2SHIPW6 Physicswallah Website: ht"
    },
    {
      "comment_id": "UgzV56A1be3OwgbZ8uR4AaABAg.8ktxf6CkGby9im7_weo3T9",
      "parent_id": "UgzV56A1be3OwgbZ8uR4AaABAg",
      "comment_type": "reply",
      "author": "@anuraggangwar6644",
      "likes": 0,
      "published_at": "2022-11-23T14:19:41Z",
      "timestamp_refs": [],
      "text": "@manasbijewar3221 good and best of luck for your future.",
      "parent_context": "Live Classes, Video Lectures, Test Series, Lecturewise notes, topicwise DPP, dynamic Exercise and much more on Physicswallah App. Download the App from Google Playstore ( https://bit.ly/2SHIPW6 ) Physicswallah Instagram Handle : https://www.instagram.com/physicswallah/ Physicswallah Facebook Page: https://www.facebook.com/physicswallah Physicswallah Twitter Account : https://twitter.com/PhysicswallahAP?s=20 Physicswallah App on Google Play Store : https://bit.ly/2SHIPW6 Physicswallah Website: ht"
    },
    {
      "comment_id": "UgzV56A1be3OwgbZ8uR4AaABAg.8ktxf6CkGby9k1B0hdvWWi",
      "parent_id": "UgzV56A1be3OwgbZ8uR4AaABAg",
      "comment_type": "reply",
      "author": "@gamer-ui3vo",
      "likes": 1,
      "published_at": "2022-12-24T16:28:56Z",
      "timestamp_refs": [],
      "text": "Abbu aa gye tumare",
      "parent_context": "Live Classes, Video Lectures, Test Series, Lecturewise notes, topicwise DPP, dynamic Exercise and much more on Physicswallah App. Download the App from Google Playstore ( https://bit.ly/2SHIPW6 ) Physicswallah Instagram Handle : https://www.instagram.com/physicswallah/ Physicswallah Facebook Page: https://www.facebook.com/physicswallah Physicswallah Twitter Account : https://twitter.com/PhysicswallahAP?s=20 Physicswallah App on Google Play Store : https://bit.ly/2SHIPW6 Physicswallah Website: ht"
    },
    {
      "comment_id": "UgzV56A1be3OwgbZ8uR4AaABAg.8ktxf6CkGby9qu_mkF-H6Q",
      "parent_id": "UgzV56A1be3OwgbZ8uR4AaABAg",
      "comment_type": "reply",
      "author": "@batman-007-k7h",
      "likes": 0,
      "published_at": "2023-06-13T17:19:55Z",
      "timestamp_refs": [],
      "text": "Hello😊",
      "parent_context": "Live Classes, Video Lectures, Test Series, Lecturewise notes, topicwise DPP, dynamic Exercise and much more on Physicswallah App. Download the App from Google Playstore ( https://bit.ly/2SHIPW6 ) Physicswallah Instagram Handle : https://www.instagram.com/physicswallah/ Physicswallah Facebook Page: https://www.facebook.com/physicswallah Physicswallah Twitter Account : https://twitter.com/PhysicswallahAP?s=20 Physicswallah App on Google Play Store : https://bit.ly/2SHIPW6 Physicswallah Website: ht"
    },
    {
      "comment_id": "UgzV56A1be3OwgbZ8uR4AaABAg.8ktxf6CkGby9uOG00O7tBK",
      "parent_id": "UgzV56A1be3OwgbZ8uR4AaABAg",
      "comment_type": "reply",
      "author": "@dipakgavandepatil",
      "likes": 1,
      "published_at": "2023-09-08T04:49:01Z",
      "timestamp_refs": [
        "5:50",
        "5:53"
      ],
      "text": "Alakh sir is my god❤ 5:50 5:53",
      "parent_context": "Live Classes, Video Lectures, Test Series, Lecturewise notes, topicwise DPP, dynamic Exercise and much more on Physicswallah App. Download the App from Google Playstore ( https://bit.ly/2SHIPW6 ) Physicswallah Instagram Handle : https://www.instagram.com/physicswallah/ Physicswallah Facebook Page: https://www.facebook.com/physicswallah Physicswallah Twitter Account : https://twitter.com/PhysicswallahAP?s=20 Physicswallah App on Google Play Store : https://bit.ly/2SHIPW6 Physicswallah Website: ht"
    },
    {
      "comment_id": "UgzV56A1be3OwgbZ8uR4AaABAg.8ktxf6CkGby9v7IuVBT2vG",
      "parent_id": "UgzV56A1be3OwgbZ8uR4AaABAg",
      "comment_type": "reply",
      "author": "@devenderbindal7704",
      "likes": 0,
      "published_at": "2023-09-26T11:18:38Z",
      "timestamp_refs": [],
      "text": "❤️❤️ pandey sir",
      "parent_context": "Live Classes, Video Lectures, Test Series, Lecturewise notes, topicwise DPP, dynamic Exercise and much more on Physicswallah App. Download the App from Google Playstore ( https://bit.ly/2SHIPW6 ) Physicswallah Instagram Handle : https://www.instagram.com/physicswallah/ Physicswallah Facebook Page: https://www.facebook.com/physicswallah Physicswallah Twitter Account : https://twitter.com/PhysicswallahAP?s=20 Physicswallah App on Google Play Store : https://bit.ly/2SHIPW6 Physicswallah Website: ht"
    },
    {
      "comment_id": "UgzV56A1be3OwgbZ8uR4AaABAg.8ktxf6CkGby9vL0AR6CkzH",
      "parent_id": "UgzV56A1be3OwgbZ8uR4AaABAg",
      "comment_type": "reply",
      "author": "@ramkishankaspate7361",
      "likes": 1,
      "published_at": "2023-10-01T19:04:18Z",
      "timestamp_refs": [],
      "text": "Sir yeh kaise pechane ki ionic jadha kisme samaja nahi",
      "parent_context": "Live Classes, Video Lectures, Test Series, Lecturewise notes, topicwise DPP, dynamic Exercise and much more on Physicswallah App. Download the App from Google Playstore ( https://bit.ly/2SHIPW6 ) Physicswallah Instagram Handle : https://www.instagram.com/physicswallah/ Physicswallah Facebook Page: https://www.facebook.com/physicswallah Physicswallah Twitter Account : https://twitter.com/PhysicswallahAP?s=20 Physicswallah App on Google Play Store : https://bit.ly/2SHIPW6 Physicswallah Website: ht"
    },
    {
      "comment_id": "UgzV56A1be3OwgbZ8uR4AaABAg.8ktxf6CkGby9vV13hvXsok",
      "parent_id": "UgzV56A1be3OwgbZ8uR4AaABAg",
      "comment_type": "reply",
      "author": "@mewati..2374",
      "likes": 1,
      "published_at": "2023-10-05T16:24:31Z",
      "timestamp_refs": [],
      "text": "Bhi❤❤ 🅢🅤🅟🅟🅔🅡😮😮𝒈𝒈𝒃𝒃𝒃 𝒉 j̥ͦḁͦḁͦn̥ͦ❤❤ m♥y♥ f♥a♥c♥e♥b♥o♥o♥k♥ i♥,d♥ ˢᴱᴴᴮᴬᴶ ˢᴬᴹᴬᴿ❥❥❣❣",
      "parent_context": "Live Classes, Video Lectures, Test Series, Lecturewise notes, topicwise DPP, dynamic Exercise and much more on Physicswallah App. Download the App from Google Playstore ( https://bit.ly/2SHIPW6 ) Physicswallah Instagram Handle : https://www.instagram.com/physicswallah/ Physicswallah Facebook Page: https://www.facebook.com/physicswallah Physicswallah Twitter Account : https://twitter.com/PhysicswallahAP?s=20 Physicswallah App on Google Play Store : https://bit.ly/2SHIPW6 Physicswallah Website: ht"
    },
    {
      "comment_id": "UgzV56A1be3OwgbZ8uR4AaABAg.8ktxf6CkGby9wZpMXmwCLV",
      "parent_id": "UgzV56A1be3OwgbZ8uR4AaABAg",
      "comment_type": "reply",
      "author": "@nofacechannel-d1w",
      "likes": 1,
      "published_at": "2023-11-01T09:41:06Z",
      "timestamp_refs": [],
      "text": "Thanks sir you are the best ever",
      "parent_context": "Live Classes, Video Lectures, Test Series, Lecturewise notes, topicwise DPP, dynamic Exercise and much more on Physicswallah App. Download the App from Google Playstore ( https://bit.ly/2SHIPW6 ) Physicswallah Instagram Handle : https://www.instagram.com/physicswallah/ Physicswallah Facebook Page: https://www.facebook.com/physicswallah Physicswallah Twitter Account : https://twitter.com/PhysicswallahAP?s=20 Physicswallah App on Google Play Store : https://bit.ly/2SHIPW6 Physicswallah Website: ht"
    },
    {
      "comment_id": "UgzV56A1be3OwgbZ8uR4AaABAg.8ktxf6CkGby9wrXuMg0CY5",
      "parent_id": "UgzV56A1be3OwgbZ8uR4AaABAg",
      "comment_type": "reply",
      "author": "@mayankkumar6872",
      "likes": 1,
      "published_at": "2023-11-08T16:05:24Z",
      "timestamp_refs": [],
      "text": "Nahi ha aplod",
      "parent_context": "Live Classes, Video Lectures, Test Series, Lecturewise notes, topicwise DPP, dynamic Exercise and much more on Physicswallah App. Download the App from Google Playstore ( https://bit.ly/2SHIPW6 ) Physicswallah Instagram Handle : https://www.instagram.com/physicswallah/ Physicswallah Facebook Page: https://www.facebook.com/physicswallah Physicswallah Twitter Account : https://twitter.com/PhysicswallahAP?s=20 Physicswallah App on Google Play Store : https://bit.ly/2SHIPW6 Physicswallah Website: ht"
    },
    {
      "comment_id": "UgzV56A1be3OwgbZ8uR4AaABAg.8ktxf6CkGby9xU5mFY8AVO",
      "parent_id": "UgzV56A1be3OwgbZ8uR4AaABAg",
      "comment_type": "reply",
      "author": "@rdmission-og5bh",
      "likes": 1,
      "published_at": "2023-11-24T00:49:14Z",
      "timestamp_refs": [],
      "text": "Sirbhejiye",
      "parent_context": "Live Classes, Video Lectures, Test Series, Lecturewise notes, topicwise DPP, dynamic Exercise and much more on Physicswallah App. Download the App from Google Playstore ( https://bit.ly/2SHIPW6 ) Physicswallah Instagram Handle : https://www.instagram.com/physicswallah/ Physicswallah Facebook Page: https://www.facebook.com/physicswallah Physicswallah Twitter Account : https://twitter.com/PhysicswallahAP?s=20 Physicswallah App on Google Play Store : https://bit.ly/2SHIPW6 Physicswallah Website: ht"
    },
    {
      "comment_id": "UgzV56A1be3OwgbZ8uR4AaABAg.8ktxf6CkGbyA2bO6UR-D-h",
      "parent_id": "UgzV56A1be3OwgbZ8uR4AaABAg",
      "comment_type": "reply",
      "author": "@lusufuworldtrimurthi7120",
      "likes": 1,
      "published_at": "2024-04-24T09:11:43Z",
      "timestamp_refs": [],
      "text": "HI NANA ALAK",
      "parent_context": "Live Classes, Video Lectures, Test Series, Lecturewise notes, topicwise DPP, dynamic Exercise and much more on Physicswallah App. Download the App from Google Playstore ( https://bit.ly/2SHIPW6 ) Physicswallah Instagram Handle : https://www.instagram.com/physicswallah/ Physicswallah Facebook Page: https://www.facebook.com/physicswallah Physicswallah Twitter Account : https://twitter.com/PhysicswallahAP?s=20 Physicswallah App on Google Play Store : https://bit.ly/2SHIPW6 Physicswallah Website: ht"
    },
    {
      "comment_id": "UgzV56A1be3OwgbZ8uR4AaABAg.8ktxf6CkGbyA7z8gGWq1zZ",
      "parent_id": "UgzV56A1be3OwgbZ8uR4AaABAg",
      "comment_type": "reply",
      "author": "@avyaagupta55",
      "likes": 1,
      "published_at": "2024-09-04T21:15:40Z",
      "timestamp_refs": [],
      "text": "Sir please make videos for Back Bonding and Bridge Bonding also",
      "parent_context": "Live Classes, Video Lectures, Test Series, Lecturewise notes, topicwise DPP, dynamic Exercise and much more on Physicswallah App. Download the App from Google Playstore ( https://bit.ly/2SHIPW6 ) Physicswallah Instagram Handle : https://www.instagram.com/physicswallah/ Physicswallah Facebook Page: https://www.facebook.com/physicswallah Physicswallah Twitter Account : https://twitter.com/PhysicswallahAP?s=20 Physicswallah App on Google Play Store : https://bit.ly/2SHIPW6 Physicswallah Website: ht"
    },
    {
      "comment_id": "UgzV56A1be3OwgbZ8uR4AaABAg.8ktxf6CkGbyACd2_NQc0Sn",
      "parent_id": "UgzV56A1be3OwgbZ8uR4AaABAg",
      "comment_type": "reply",
      "author": "@suniltiwariy1141",
      "likes": 0,
      "published_at": "2024-12-29T13:55:59Z",
      "timestamp_refs": [],
      "text": "He he he😂😂",
      "parent_context": "Live Classes, Video Lectures, Test Series, Lecturewise notes, topicwise DPP, dynamic Exercise and much more on Physicswallah App. Download the App from Google Playstore ( https://bit.ly/2SHIPW6 ) Physicswallah Instagram Handle : https://www.instagram.com/physicswallah/ Physicswallah Facebook Page: https://www.facebook.com/physicswallah Physicswallah Twitter Account : https://twitter.com/PhysicswallahAP?s=20 Physicswallah App on Google Play Store : https://bit.ly/2SHIPW6 Physicswallah Website: ht"
    },
    {
      "comment_id": "UgzV56A1be3OwgbZ8uR4AaABAg.8ktxf6CkGbyAIff5DMWSkH",
      "parent_id": "UgzV56A1be3OwgbZ8uR4AaABAg",
      "comment_type": "reply",
      "author": "@its_indianleg",
      "likes": 1,
      "published_at": "2025-05-28T17:28:06Z",
      "timestamp_refs": [],
      "text": "# 11th 2025😂🎉",
      "parent_context": "Live Classes, Video Lectures, Test Series, Lecturewise notes, topicwise DPP, dynamic Exercise and much more on Physicswallah App. Download the App from Google Playstore ( https://bit.ly/2SHIPW6 ) Physicswallah Instagram Handle : https://www.instagram.com/physicswallah/ Physicswallah Facebook Page: https://www.facebook.com/physicswallah Physicswallah Twitter Account : https://twitter.com/PhysicswallahAP?s=20 Physicswallah App on Google Play Store : https://bit.ly/2SHIPW6 Physicswallah Website: ht"
    },
    {
      "comment_id": "UgzV56A1be3OwgbZ8uR4AaABAg.8ktxf6CkGbyAL3a-8FtpGG",
      "parent_id": "UgzV56A1be3OwgbZ8uR4AaABAg",
      "comment_type": "reply",
      "author": "@Jaswanth777-d3n",
      "likes": 0,
      "published_at": "2025-07-27T02:47:22Z",
      "timestamp_refs": [],
      "text": "❤❤❤❤❤",
      "parent_context": "Live Classes, Video Lectures, Test Series, Lecturewise notes, topicwise DPP, dynamic Exercise and much more on Physicswallah App. Download the App from Google Playstore ( https://bit.ly/2SHIPW6 ) Physicswallah Instagram Handle : https://www.instagram.com/physicswallah/ Physicswallah Facebook Page: https://www.facebook.com/physicswallah Physicswallah Twitter Account : https://twitter.com/PhysicswallahAP?s=20 Physicswallah App on Google Play Store : https://bit.ly/2SHIPW6 Physicswallah Website: ht"
    },
    {
      "comment_id": "UgwOyxU7EAB2sTxrGlZ4AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@coderYT1",
      "likes": 9202,
      "published_at": "2018-07-13T08:35:08Z",
      "timestamp_refs": [],
      "text": "Vote for Pandey Sir! 🙌🙌🙌🙌",
      "parent_context": ""
    },
    {
      "comment_id": "UgwOyxU7EAB2sTxrGlZ4AaABAg.8id52g6tPRO8kIbWN8hiF9",
      "parent_id": "UgwOyxU7EAB2sTxrGlZ4AaABAg",
      "comment_type": "reply",
      "author": "@sashwatrawat6270",
      "likes": 231,
      "published_at": "2018-08-23T17:27:03Z",
      "timestamp_refs": [],
      "text": "vote kis liye chahiye we already know he is the best sir",
      "parent_context": "Vote for Pandey Sir! 🙌🙌🙌🙌"
    },
    {
      "comment_id": "UgwOyxU7EAB2sTxrGlZ4AaABAg.8id52g6tPRO8m7ejM6rjD3",
      "parent_id": "UgwOyxU7EAB2sTxrGlZ4AaABAg",
      "comment_type": "reply",
      "author": "@ShivamKumar-oj5fs",
      "likes": 57,
      "published_at": "2018-10-08T04:26:19Z",
      "timestamp_refs": [],
      "text": "Such a nice teacher",
      "parent_context": "Vote for Pandey Sir! 🙌🙌🙌🙌"
    },
    {
      "comment_id": "UgwOyxU7EAB2sTxrGlZ4AaABAg.8id52g6tPRO8rNsUpVuB_i",
      "parent_id": "UgwOyxU7EAB2sTxrGlZ4AaABAg",
      "comment_type": "reply",
      "author": "@anusayapatil7386",
      "likes": 88,
      "published_at": "2019-02-15T18:11:21Z",
      "timestamp_refs": [],
      "text": "Vote do ya na sir is great 👌😎👌😎👌😎👌😎",
      "parent_context": "Vote for Pandey Sir! 🙌🙌🙌🙌"
    },
    {
      "comment_id": "UgwOyxU7EAB2sTxrGlZ4AaABAg.8id52g6tPRO8xeWwrSMQas",
      "parent_id": "UgwOyxU7EAB2sTxrGlZ4AaABAg",
      "comment_type": "reply",
      "author": "@ankitamishra5315",
      "likes": 34,
      "published_at": "2019-07-21T17:49:02Z",
      "timestamp_refs": [],
      "text": "Voted",
      "parent_context": "Vote for Pandey Sir! 🙌🙌🙌🙌"
    },
    {
      "comment_id": "UgwOyxU7EAB2sTxrGlZ4AaABAg.8id52g6tPRO8yq8rPiaIDK",
      "parent_id": "UgwOyxU7EAB2sTxrGlZ4AaABAg",
      "comment_type": "reply",
      "author": "@riyapal5909",
      "likes": 50,
      "published_at": "2019-08-20T02:40:51Z",
      "timestamp_refs": [],
      "text": "Sb pade h chakkar me koi nii h takkar me .....🤘🤘🤘",
      "parent_context": "Vote for Pandey Sir! 🙌🙌🙌🙌"
    },
    {
      "comment_id": "UgwOyxU7EAB2sTxrGlZ4AaABAg.8id52g6tPRO8zx8nnhB3j9",
      "parent_id": "UgwOyxU7EAB2sTxrGlZ4AaABAg",
      "comment_type": "reply",
      "author": "@mycinema7675",
      "likes": 30,
      "published_at": "2019-09-16T16:26:26Z",
      "timestamp_refs": [],
      "text": "One of the best teacher in world",
      "parent_context": "Vote for Pandey Sir! 🙌🙌🙌🙌"
    },
    {
      "comment_id": "UgwOyxU7EAB2sTxrGlZ4AaABAg.8id52g6tPRO8zzv5VRhuqm",
      "parent_id": "UgwOyxU7EAB2sTxrGlZ4AaABAg",
      "comment_type": "reply",
      "author": "@paprichakrabarti1870",
      "likes": 15,
      "published_at": "2019-09-17T18:15:38Z",
      "timestamp_refs": [],
      "text": "Hat's off",
      "parent_context": "Vote for Pandey Sir! 🙌🙌🙌🙌"
    },
    {
      "comment_id": "UgwOyxU7EAB2sTxrGlZ4AaABAg.8id52g6tPRO9-0LuqMlp1l",
      "parent_id": "UgwOyxU7EAB2sTxrGlZ4AaABAg",
      "comment_type": "reply",
      "author": "@hitblank2320",
      "likes": 58,
      "published_at": "2019-09-18T07:37:57Z",
      "timestamp_refs": [],
      "text": "Best way to get likes",
      "parent_context": "Vote for Pandey Sir! 🙌🙌🙌🙌"
    },
    {
      "comment_id": "UgwOyxU7EAB2sTxrGlZ4AaABAg.8id52g6tPRO9-JELszycXl",
      "parent_id": "UgwOyxU7EAB2sTxrGlZ4AaABAg",
      "comment_type": "reply",
      "author": "@_souravkartik_",
      "likes": 12,
      "published_at": "2019-09-25T15:37:27Z",
      "timestamp_refs": [],
      "text": "@hitblank2320 right bro",
      "parent_context": "Vote for Pandey Sir! 🙌🙌🙌🙌"
    },
    {
      "comment_id": "UgwOyxU7EAB2sTxrGlZ4AaABAg.8id52g6tPRO91b3nBqxYCI",
      "parent_id": "UgwOyxU7EAB2sTxrGlZ4AaABAg",
      "comment_type": "reply",
      "author": "@knowledgepoint7931",
      "likes": 14,
      "published_at": "2019-11-21T16:13:33Z",
      "timestamp_refs": [],
      "text": "Bhaiwa log apne liye vote mangte hai",
      "parent_context": "Vote for Pandey Sir! 🙌🙌🙌🙌"
    },
    {
      "comment_id": "UgwOyxU7EAB2sTxrGlZ4AaABAg.8id52g6tPRO91b54pinvil",
      "parent_id": "UgwOyxU7EAB2sTxrGlZ4AaABAg",
      "comment_type": "reply",
      "author": "@_souravkartik_",
      "likes": 5,
      "published_at": "2019-11-21T16:24:50Z",
      "timestamp_refs": [],
      "text": "@knowledgepoint7931 yes bro",
      "parent_context": "Vote for Pandey Sir! 🙌🙌🙌🙌"
    },
    {
      "comment_id": "UgwOyxU7EAB2sTxrGlZ4AaABAg.8id52g6tPRO92S0zx7Q-Fr",
      "parent_id": "UgwOyxU7EAB2sTxrGlZ4AaABAg",
      "comment_type": "reply",
      "author": "@Yogeskumar8050",
      "likes": 4,
      "published_at": "2019-12-12T15:08:04Z",
      "timestamp_refs": [],
      "text": "@riyapal5909 yes yes josh bhara comment hai tumhare",
      "parent_context": "Vote for Pandey Sir! 🙌🙌🙌🙌"
    },
    {
      "comment_id": "UgwOyxU7EAB2sTxrGlZ4AaABAg.8id52g6tPRO92UdEokUYp2",
      "parent_id": "UgwOyxU7EAB2sTxrGlZ4AaABAg",
      "comment_type": "reply",
      "author": "@sarojsharma-cy6lv",
      "likes": 7,
      "published_at": "2019-12-13T15:29:30Z",
      "timestamp_refs": [],
      "text": "hamre sir ji ko vote ki jarurt nahi hai he is the legend",
      "parent_context": "Vote for Pandey Sir! 🙌🙌🙌🙌"
    },
    {
      "comment_id": "UgwOyxU7EAB2sTxrGlZ4AaABAg.8id52g6tPRO92nvuDvi7KX",
      "parent_id": "UgwOyxU7EAB2sTxrGlZ4AaABAg",
      "comment_type": "reply",
      "author": "@rajapalutla4985",
      "likes": 3,
      "published_at": "2019-12-21T12:37:23Z",
      "timestamp_refs": [],
      "text": "@hitblank2320 right bro....",
      "parent_context": "Vote for Pandey Sir! 🙌🙌🙌🙌"
    },
    {
      "comment_id": "UgwOyxU7EAB2sTxrGlZ4AaABAg.8id52g6tPRO93c0R5lURhC",
      "parent_id": "UgwOyxU7EAB2sTxrGlZ4AaABAg",
      "comment_type": "reply",
      "author": "@xunvoid",
      "likes": 8,
      "published_at": "2020-01-10T18:06:13Z",
      "timestamp_refs": [],
      "text": "Dc pandey??😁",
      "parent_context": "Vote for Pandey Sir! 🙌🙌🙌🙌"
    },
    {
      "comment_id": "UgwOyxU7EAB2sTxrGlZ4AaABAg.8id52g6tPRO950n1dZkkHR",
      "parent_id": "UgwOyxU7EAB2sTxrGlZ4AaABAg",
      "comment_type": "reply",
      "author": "@vikufurious5995",
      "likes": 8,
      "published_at": "2020-02-14T14:52:03Z",
      "timestamp_refs": [],
      "text": "Sir Kaya chunav ma aa Raha ha",
      "parent_context": "Vote for Pandey Sir! 🙌🙌🙌🙌"
    },
    {
      "comment_id": "UgwOyxU7EAB2sTxrGlZ4AaABAg.8id52g6tPRO99cyxuX7Gr1",
      "parent_id": "UgwOyxU7EAB2sTxrGlZ4AaABAg",
      "comment_type": "reply",
      "author": "@chitranjanprasad7969",
      "likes": 2,
      "published_at": "2020-06-08T06:12:13Z",
      "timestamp_refs": [],
      "text": "Thanks sir",
      "parent_context": "Vote for Pandey Sir! 🙌🙌🙌🙌"
    },
    {
      "comment_id": "UgwOyxU7EAB2sTxrGlZ4AaABAg.8id52g6tPRO9A7QxZLMq-a",
      "parent_id": "UgwOyxU7EAB2sTxrGlZ4AaABAg",
      "comment_type": "reply",
      "author": "@priyanshuchaudhary2712",
      "likes": 4,
      "published_at": "2020-06-20T11:22:02Z",
      "timestamp_refs": [],
      "text": "Agr vote dene h to sir ko do yha to sb apna like ka liya kr rha h",
      "parent_context": "Vote for Pandey Sir! 🙌🙌🙌🙌"
    },
    {
      "comment_id": "UgwOyxU7EAB2sTxrGlZ4AaABAg.8id52g6tPRO9Bf5XCRhvIJ",
      "parent_id": "UgwOyxU7EAB2sTxrGlZ4AaABAg",
      "comment_type": "reply",
      "author": "@Nanda-y-t",
      "likes": 7,
      "published_at": "2020-07-28T18:59:37Z",
      "timestamp_refs": [],
      "text": "Election hai kya be ?",
      "parent_context": "Vote for Pandey Sir! 🙌🙌🙌🙌"
    },
    {
      "comment_id": "UgwOyxU7EAB2sTxrGlZ4AaABAg.8id52g6tPRO9C3Vo2FDRW0",
      "parent_id": "UgwOyxU7EAB2sTxrGlZ4AaABAg",
      "comment_type": "reply",
      "author": "@annonymousm.7158",
      "likes": 4,
      "published_at": "2020-08-07T15:50:15Z",
      "timestamp_refs": [],
      "text": "hats off to him",
      "parent_context": "Vote for Pandey Sir! 🙌🙌🙌🙌"
    },
    {
      "comment_id": "UgwOyxU7EAB2sTxrGlZ4AaABAg.8id52g6tPRO9CF9gbY6bkd",
      "parent_id": "UgwOyxU7EAB2sTxrGlZ4AaABAg",
      "comment_type": "reply",
      "author": "@IND25352",
      "likes": 0,
      "published_at": "2020-08-12T04:27:53Z",
      "timestamp_refs": [],
      "text": "Chup be",
      "parent_context": "Vote for Pandey Sir! 🙌🙌🙌🙌"
    },
    {
      "comment_id": "UgwOyxU7EAB2sTxrGlZ4AaABAg.8id52g6tPRO9DrPjWPmW6B",
      "parent_id": "UgwOyxU7EAB2sTxrGlZ4AaABAg",
      "comment_type": "reply",
      "author": "@harrdylincoln432",
      "likes": 4,
      "published_at": "2020-09-21T06:49:52Z",
      "timestamp_refs": [],
      "text": "He is the best ❤️💙💙",
      "parent_context": "Vote for Pandey Sir! 🙌🙌🙌🙌"
    },
    {
      "comment_id": "UgwOyxU7EAB2sTxrGlZ4AaABAg.8id52g6tPRO9EHJzKqXbxG",
      "parent_id": "UgwOyxU7EAB2sTxrGlZ4AaABAg",
      "comment_type": "reply",
      "author": "@cookinglover6331",
      "likes": 5,
      "published_at": "2020-10-01T17:39:05Z",
      "timestamp_refs": [],
      "text": "Alakh sir is best he is the legend 🤩😎😎😎😎",
      "parent_context": "Vote for Pandey Sir! 🙌🙌🙌🙌"
    },
    {
      "comment_id": "UgwOyxU7EAB2sTxrGlZ4AaABAg.8id52g6tPRO9ER2-NXyamN",
      "parent_id": "UgwOyxU7EAB2sTxrGlZ4AaABAg",
      "comment_type": "reply",
      "author": "@pranjalshrivastava45",
      "likes": 0,
      "published_at": "2020-10-05T12:14:21Z",
      "timestamp_refs": [],
      "text": "Bhikhari sala likes ki bhikh mangta hai CHO2",
      "parent_context": "Vote for Pandey Sir! 🙌🙌🙌🙌"
    },
    {
      "comment_id": "UgwOyxU7EAB2sTxrGlZ4AaABAg.8id52g6tPRO9FHBRY5qfFy",
      "parent_id": "UgwOyxU7EAB2sTxrGlZ4AaABAg",
      "comment_type": "reply",
      "author": "@srinuchandaka3959",
      "likes": 3,
      "published_at": "2020-10-26T12:55:50Z",
      "timestamp_refs": [],
      "text": "He deserves infinite likes🤩",
      "parent_context": "Vote for Pandey Sir! 🙌🙌🙌🙌"
    },
    {
      "comment_id": "UgwOyxU7EAB2sTxrGlZ4AaABAg.8id52g6tPRO9IwakV7QOqv",
      "parent_id": "UgwOyxU7EAB2sTxrGlZ4AaABAg",
      "comment_type": "reply",
      "author": "@yashasviharinkhede9864",
      "likes": 4,
      "published_at": "2021-01-25T13:48:02Z",
      "timestamp_refs": [],
      "text": "I have completef 3k likes on ur comment😀😊😅",
      "parent_context": "Vote for Pandey Sir! 🙌🙌🙌🙌"
    },
    {
      "comment_id": "UgwOyxU7EAB2sTxrGlZ4AaABAg.8id52g6tPRO9K58UoVrrhD",
      "parent_id": "UgwOyxU7EAB2sTxrGlZ4AaABAg",
      "comment_type": "reply",
      "author": "@MKJha-re6nm",
      "likes": 16,
      "published_at": "2021-02-23T03:16:09Z",
      "timestamp_refs": [],
      "text": "Like maangne ki Ninja technique...",
      "parent_context": "Vote for Pandey Sir! 🙌🙌🙌🙌"
    },
    {
      "comment_id": "UgwOyxU7EAB2sTxrGlZ4AaABAg.8id52g6tPRO9PEm6-q06-C",
      "parent_id": "UgwOyxU7EAB2sTxrGlZ4AaABAg",
      "comment_type": "reply",
      "author": "@mr_meow_77",
      "likes": 12,
      "published_at": "2021-07-01T03:41:09Z",
      "timestamp_refs": [],
      "text": "Sorry i can't vote i am below 18 😞",
      "parent_context": "Vote for Pandey Sir! 🙌🙌🙌🙌"
    },
    {
      "comment_id": "UgwOyxU7EAB2sTxrGlZ4AaABAg.8id52g6tPRO9QxO8ErQVp5",
      "parent_id": "UgwOyxU7EAB2sTxrGlZ4AaABAg",
      "comment_type": "reply",
      "author": "@prernabhati6623",
      "likes": 6,
      "published_at": "2021-08-12T17:19:28Z",
      "timestamp_refs": [],
      "text": "@ROHANKUMAR-me8bp to video kahe dekhte ho ghar padne chale jaya karo",
      "parent_context": "Vote for Pandey Sir! 🙌🙌🙌🙌"
    },
    {
      "comment_id": "UgwOyxU7EAB2sTxrGlZ4AaABAg.8id52g6tPRO9S3g52GXmD3",
      "parent_id": "UgwOyxU7EAB2sTxrGlZ4AaABAg",
      "comment_type": "reply",
      "author": "@empire4542",
      "likes": 4,
      "published_at": "2021-09-09T09:51:08Z",
      "timestamp_refs": [],
      "text": "Kha pe vote dena hai",
      "parent_context": "Vote for Pandey Sir! 🙌🙌🙌🙌"
    },
    {
      "comment_id": "UgwOyxU7EAB2sTxrGlZ4AaABAg.8id52g6tPRO9SGkfdMx4sx",
      "parent_id": "UgwOyxU7EAB2sTxrGlZ4AaABAg",
      "comment_type": "reply",
      "author": "@aashimapawariya9952",
      "likes": 2,
      "published_at": "2021-09-14T11:41:21Z",
      "timestamp_refs": [],
      "text": "@riyapal5909 watching your comment afrr Baawla song Koi nahi h takkar me",
      "parent_context": "Vote for Pandey Sir! 🙌🙌🙌🙌"
    },
    {
      "comment_id": "UgwOyxU7EAB2sTxrGlZ4AaABAg.8id52g6tPRO9SvJOt7u8-Q",
      "parent_id": "UgwOyxU7EAB2sTxrGlZ4AaABAg",
      "comment_type": "reply",
      "author": "@rockprash4225",
      "likes": 3,
      "published_at": "2021-09-30T15:02:21Z",
      "timestamp_refs": [],
      "text": "Tu he kon be vote magna bala",
      "parent_context": "Vote for Pandey Sir! 🙌🙌🙌🙌"
    },
    {
      "comment_id": "UgwOyxU7EAB2sTxrGlZ4AaABAg.8id52g6tPRO9T-ccJSRJ1Y",
      "parent_id": "UgwOyxU7EAB2sTxrGlZ4AaABAg",
      "comment_type": "reply",
      "author": "@drankushverma",
      "likes": 3,
      "published_at": "2021-10-02T16:35:18Z",
      "timestamp_refs": [],
      "text": "Now election is going on 😅",
      "parent_context": "Vote for Pandey Sir! 🙌🙌🙌🙌"
    },
    {
      "comment_id": "UgwOyxU7EAB2sTxrGlZ4AaABAg.8id52g6tPRO9T-jtG5CrqL",
      "parent_id": "UgwOyxU7EAB2sTxrGlZ4AaABAg",
      "comment_type": "reply",
      "author": "@uditmishra6657",
      "likes": 4,
      "published_at": "2021-10-02T17:38:46Z",
      "timestamp_refs": [],
      "text": "Kyu tum election lad rahe ho kya",
      "parent_context": "Vote for Pandey Sir! 🙌🙌🙌🙌"
    },
    {
      "comment_id": "UgwOyxU7EAB2sTxrGlZ4AaABAg.8id52g6tPRO9TMV2CjuN1E",
      "parent_id": "UgwOyxU7EAB2sTxrGlZ4AaABAg",
      "comment_type": "reply",
      "author": "@anjalitalan4852",
      "likes": 4,
      "published_at": "2021-10-11T13:42:51Z",
      "timestamp_refs": [],
      "text": "In tenth sanjeev pandey and in 11th alakh pandey",
      "parent_context": "Vote for Pandey Sir! 🙌🙌🙌🙌"
    },
    {
      "comment_id": "UgwOyxU7EAB2sTxrGlZ4AaABAg.8id52g6tPRO9TisaHl3Hei",
      "parent_id": "UgwOyxU7EAB2sTxrGlZ4AaABAg",
      "comment_type": "reply",
      "author": "@Whiebyeu4517",
      "likes": 2,
      "published_at": "2021-10-20T15:39:53Z",
      "timestamp_refs": [],
      "text": "@ShivamKumar-oj5fs AAPKA 11TH HO GYA?",
      "parent_context": "Vote for Pandey Sir! 🙌🙌🙌🙌"
    },
    {
      "comment_id": "UgwOyxU7EAB2sTxrGlZ4AaABAg.8id52g6tPRO9TvMfgHaMz7",
      "parent_id": "UgwOyxU7EAB2sTxrGlZ4AaABAg",
      "comment_type": "reply",
      "author": "@nikbarhill",
      "likes": 4,
      "published_at": "2021-10-25T12:02:24Z",
      "timestamp_refs": [],
      "text": "Anyone in 2021",
      "parent_context": "Vote for Pandey Sir! 🙌🙌🙌🙌"
    },
    {
      "comment_id": "UgwOyxU7EAB2sTxrGlZ4AaABAg.8id52g6tPRO9TvUpCPsKGw",
      "parent_id": "UgwOyxU7EAB2sTxrGlZ4AaABAg",
      "comment_type": "reply",
      "author": "@Whiebyeu4517",
      "likes": 5,
      "published_at": "2021-10-25T13:13:36Z",
      "timestamp_refs": [],
      "text": "@nikbarhill i",
      "parent_context": "Vote for Pandey Sir! 🙌🙌🙌🙌"
    },
    {
      "comment_id": "UgwOyxU7EAB2sTxrGlZ4AaABAg.8id52g6tPRO9UqjvXgv4tF",
      "parent_id": "UgwOyxU7EAB2sTxrGlZ4AaABAg",
      "comment_type": "reply",
      "author": "@niteshorfriendsgaming4009",
      "likes": 2,
      "published_at": "2021-11-17T13:29:28Z",
      "timestamp_refs": [],
      "text": "Sir ji politics ma utre hai kya",
      "parent_context": "Vote for Pandey Sir! 🙌🙌🙌🙌"
    },
    {
      "comment_id": "UgwOyxU7EAB2sTxrGlZ4AaABAg.8id52g6tPRO9V7wC3UC08G",
      "parent_id": "UgwOyxU7EAB2sTxrGlZ4AaABAg",
      "comment_type": "reply",
      "author": "@aarav_plays67",
      "likes": 2,
      "published_at": "2021-11-24T15:03:03Z",
      "timestamp_refs": [],
      "text": "Vote kise chahiye ALAKH PANDEY SIR KO YA CHULBUL PANDEY SIR KO",
      "parent_context": "Vote for Pandey Sir! 🙌🙌🙌🙌"
    },
    {
      "comment_id": "UgwOyxU7EAB2sTxrGlZ4AaABAg.8id52g6tPRO9VFnXX6EjVu",
      "parent_id": "UgwOyxU7EAB2sTxrGlZ4AaABAg",
      "comment_type": "reply",
      "author": "@JigsaW-goat",
      "likes": 3,
      "published_at": "2021-11-27T16:21:16Z",
      "timestamp_refs": [],
      "text": "Guy just thirsty for some likes XD",
      "parent_context": "Vote for Pandey Sir! 🙌🙌🙌🙌"
    },
    {
      "comment_id": "UgwOyxU7EAB2sTxrGlZ4AaABAg.8id52g6tPRO9VK_jxF8xnd",
      "parent_id": "UgwOyxU7EAB2sTxrGlZ4AaABAg",
      "comment_type": "reply",
      "author": "@pragyakumari6960",
      "likes": 1,
      "published_at": "2021-11-29T12:56:58Z",
      "timestamp_refs": [],
      "text": "Best way of teaching",
      "parent_context": "Vote for Pandey Sir! 🙌🙌🙌🙌"
    },
    {
      "comment_id": "UgwOyxU7EAB2sTxrGlZ4AaABAg.8id52g6tPRO9WwexBuTHwm",
      "parent_id": "UgwOyxU7EAB2sTxrGlZ4AaABAg",
      "comment_type": "reply",
      "author": "@pranjaltiwari8122",
      "likes": 4,
      "published_at": "2022-01-08T13:44:14Z",
      "timestamp_refs": [],
      "text": "I thought you were talking about sanjiv Pandey sir",
      "parent_context": "Vote for Pandey Sir! 🙌🙌🙌🙌"
    },
    {
      "comment_id": "UgwOyxU7EAB2sTxrGlZ4AaABAg.8id52g6tPRO9XBCUdeYnN0",
      "parent_id": "UgwOyxU7EAB2sTxrGlZ4AaABAg",
      "comment_type": "reply",
      "author": "@RamLal-tq1sf",
      "likes": 0,
      "published_at": "2022-01-14T14:34:39Z",
      "timestamp_refs": [],
      "text": "@pranjaltiwari8122 go get your drime",
      "parent_context": "Vote for Pandey Sir! 🙌🙌🙌🙌"
    },
    {
      "comment_id": "UgwOyxU7EAB2sTxrGlZ4AaABAg.8id52g6tPRO9XBKAjuJnUJ",
      "parent_id": "UgwOyxU7EAB2sTxrGlZ4AaABAg",
      "comment_type": "reply",
      "author": "@pranjaltiwari8122",
      "likes": 3,
      "published_at": "2022-01-14T15:41:50Z",
      "timestamp_refs": [],
      "text": "@RamLal-tq1sf there is not any competition but according to me edumantra is also a great channel for studies",
      "parent_context": "Vote for Pandey Sir! 🙌🙌🙌🙌"
    },
    {
      "comment_id": "UgwOyxU7EAB2sTxrGlZ4AaABAg.8id52g6tPRO9Xemzt6jQyu",
      "parent_id": "UgwOyxU7EAB2sTxrGlZ4AaABAg",
      "comment_type": "reply",
      "author": "@vakigaming9621",
      "likes": 0,
      "published_at": "2022-01-26T11:39:34Z",
      "timestamp_refs": [],
      "text": "@chitranjanprasad7969 jgf",
      "parent_context": "Vote for Pandey Sir! 🙌🙌🙌🙌"
    },
    {
      "comment_id": "UgwOyxU7EAB2sTxrGlZ4AaABAg.8id52g6tPRO9Xen0k_2oRz",
      "parent_id": "UgwOyxU7EAB2sTxrGlZ4AaABAg",
      "comment_type": "reply",
      "author": "@vakigaming9621",
      "likes": 0,
      "published_at": "2022-01-26T11:39:50Z",
      "timestamp_refs": [],
      "text": "@chitranjanprasad7969 cdaruj csetugzaqr",
      "parent_context": "Vote for Pandey Sir! 🙌🙌🙌🙌"
    },
    {
      "comment_id": "UgwOyxU7EAB2sTxrGlZ4AaABAg.8id52g6tPRO9_mviX-zDKa",
      "parent_id": "UgwOyxU7EAB2sTxrGlZ4AaABAg",
      "comment_type": "reply",
      "author": "@Shubham.124",
      "likes": 0,
      "published_at": "2022-04-14T05:03:57Z",
      "timestamp_refs": [],
      "text": "@pranjaltiwari8122 yes, But only For 9 and 10th class,",
      "parent_context": "Vote for Pandey Sir! 🙌🙌🙌🙌"
    },
    {
      "comment_id": "UgwOyxU7EAB2sTxrGlZ4AaABAg.8id52g6tPRO9d8fqDNeGqI",
      "parent_id": "UgwOyxU7EAB2sTxrGlZ4AaABAg",
      "comment_type": "reply",
      "author": "@tadamkamra2634",
      "likes": 1,
      "published_at": "2022-07-06T14:41:54Z",
      "timestamp_refs": [],
      "text": "Why??",
      "parent_context": "Vote for Pandey Sir! 🙌🙌🙌🙌"
    },
    {
      "comment_id": "UgwOyxU7EAB2sTxrGlZ4AaABAg.8id52g6tPRO9due3Q6-oX6",
      "parent_id": "UgwOyxU7EAB2sTxrGlZ4AaABAg",
      "comment_type": "reply",
      "author": "@sarojpansuiya",
      "likes": 2,
      "published_at": "2022-07-25T15:09:09Z",
      "timestamp_refs": [],
      "text": "Agle Education Minister 🥳 Voted by students 🎉🎉🎉🎉🎉🎉 @Physics_Wallah @Alakh sir",
      "parent_context": "Vote for Pandey Sir! 🙌🙌🙌🙌"
    },
    {
      "comment_id": "UgwOyxU7EAB2sTxrGlZ4AaABAg.8id52g6tPRO9fNzjRRXClK",
      "parent_id": "UgwOyxU7EAB2sTxrGlZ4AaABAg",
      "comment_type": "reply",
      "author": "@mathswallah7415",
      "likes": 4,
      "published_at": "2022-08-31T06:27:08Z",
      "timestamp_refs": [],
      "text": "Me: who is panday sir 🙄 After one second I realised oh alakh panday😂😂",
      "parent_context": "Vote for Pandey Sir! 🙌🙌🙌🙌"
    },
    {
      "comment_id": "UgwOyxU7EAB2sTxrGlZ4AaABAg.8id52g6tPRO9flQaRYZKeF",
      "parent_id": "UgwOyxU7EAB2sTxrGlZ4AaABAg",
      "comment_type": "reply",
      "author": "@Rohitkuntal1",
      "likes": 6,
      "published_at": "2022-09-09T18:12:21Z",
      "timestamp_refs": [],
      "text": "💫💫💫💫💫💫💫💫💫💫 out of 10",
      "parent_context": "Vote for Pandey Sir! 🙌🙌🙌🙌"
    },
    {
      "comment_id": "UgwOyxU7EAB2sTxrGlZ4AaABAg.8id52g6tPRO9fzyAVoAN7w",
      "parent_id": "UgwOyxU7EAB2sTxrGlZ4AaABAg",
      "comment_type": "reply",
      "author": "@dasramesh",
      "likes": 0,
      "published_at": "2022-09-15T09:43:53Z",
      "timestamp_refs": [],
      "text": "Vote tujhe kyun chahiye bey.",
      "parent_context": "Vote for Pandey Sir! 🙌🙌🙌🙌"
    },
    {
      "comment_id": "UgwOyxU7EAB2sTxrGlZ4AaABAg.8id52g6tPRO9g3Tu5x4BSd",
      "parent_id": "UgwOyxU7EAB2sTxrGlZ4AaABAg",
      "comment_type": "reply",
      "author": "@shashwatkaushik2289",
      "likes": 0,
      "published_at": "2022-09-17T03:46:49Z",
      "timestamp_refs": [],
      "text": "Ohh my god the moment i hit like on your comment it reached 6K",
      "parent_context": "Vote for Pandey Sir! 🙌🙌🙌🙌"
    },
    {
      "comment_id": "UgwOyxU7EAB2sTxrGlZ4AaABAg.8id52g6tPRO9gCA2MWsYLz",
      "parent_id": "UgwOyxU7EAB2sTxrGlZ4AaABAg",
      "comment_type": "reply",
      "author": "@shirsti2812",
      "likes": 2,
      "published_at": "2022-09-20T12:46:29Z",
      "timestamp_refs": [],
      "text": "Yaa right. We already know sir is the best ... Compare to all",
      "parent_context": "Vote for Pandey Sir! 🙌🙌🙌🙌"
    },
    {
      "comment_id": "UgwOyxU7EAB2sTxrGlZ4AaABAg.8id52g6tPRO9gIpZtJ-Dsq",
      "parent_id": "UgwOyxU7EAB2sTxrGlZ4AaABAg",
      "comment_type": "reply",
      "author": "@angel-gd5ll",
      "likes": 0,
      "published_at": "2022-09-23T02:53:31Z",
      "timestamp_refs": [],
      "text": "@vikufurious5995 😂😂",
      "parent_context": "Vote for Pandey Sir! 🙌🙌🙌🙌"
    },
    {
      "comment_id": "UgwOyxU7EAB2sTxrGlZ4AaABAg.8id52g6tPRO9gcWDqf1TRM",
      "parent_id": "UgwOyxU7EAB2sTxrGlZ4AaABAg",
      "comment_type": "reply",
      "author": "@parthkadam2147",
      "likes": 9,
      "published_at": "2022-10-01T03:39:47Z",
      "timestamp_refs": [],
      "text": "Vote? Padhlo chahe kahi se, election hoga yahi se?",
      "parent_context": "Vote for Pandey Sir! 🙌🙌🙌🙌"
    },
    {
      "comment_id": "UgwOyxU7EAB2sTxrGlZ4AaABAg.8id52g6tPRO9giK-3V3BXQ",
      "parent_id": "UgwOyxU7EAB2sTxrGlZ4AaABAg",
      "comment_type": "reply",
      "author": "@sonalisahu3067",
      "likes": 0,
      "published_at": "2022-10-03T09:48:21Z",
      "timestamp_refs": [],
      "text": "Is there any election 🤨🤨??",
      "parent_context": "Vote for Pandey Sir! 🙌🙌🙌🙌"
    },
    {
      "comment_id": "UgwOyxU7EAB2sTxrGlZ4AaABAg.8id52g6tPRO9gk0oElfj0I",
      "parent_id": "UgwOyxU7EAB2sTxrGlZ4AaABAg",
      "comment_type": "reply",
      "author": "@parthkadam2147",
      "likes": 0,
      "published_at": "2022-10-04T01:39:12Z",
      "timestamp_refs": [],
      "text": "@sonalisahu3067 bhai vote ki baat kar raha hai na",
      "parent_context": "Vote for Pandey Sir! 🙌🙌🙌🙌"
    },
    {
      "comment_id": "UgwOyxU7EAB2sTxrGlZ4AaABAg.8id52g6tPRO9gkMa_uBcIY",
      "parent_id": "UgwOyxU7EAB2sTxrGlZ4AaABAg",
      "comment_type": "reply",
      "author": "@knowledgeofnature8769",
      "likes": 0,
      "published_at": "2022-10-04T04:49:34Z",
      "timestamp_refs": [],
      "text": "Bhai aj to 101 unicorn bnva de like d deke best teacher ever🫡",
      "parent_context": "Vote for Pandey Sir! 🙌🙌🙌🙌"
    },
    {
      "comment_id": "UgwOyxU7EAB2sTxrGlZ4AaABAg.8id52g6tPRO9gntvEwNvG4",
      "parent_id": "UgwOyxU7EAB2sTxrGlZ4AaABAg",
      "comment_type": "reply",
      "author": "@life_7note",
      "likes": 0,
      "published_at": "2022-10-05T13:47:13Z",
      "timestamp_refs": [],
      "text": "He is",
      "parent_context": "Vote for Pandey Sir! 🙌🙌🙌🙌"
    },
    {
      "comment_id": "UgwOyxU7EAB2sTxrGlZ4AaABAg.8id52g6tPRO9h2Q-dsyA-7",
      "parent_id": "UgwOyxU7EAB2sTxrGlZ4AaABAg",
      "comment_type": "reply",
      "author": "@ranjana2004",
      "likes": 0,
      "published_at": "2022-10-11T14:24:55Z",
      "timestamp_refs": [],
      "text": "@ankitamishra5315 hii",
      "parent_context": "Vote for Pandey Sir! 🙌🙌🙌🙌"
    },
    {
      "comment_id": "UgwOyxU7EAB2sTxrGlZ4AaABAg.8id52g6tPRO9i5_WCP0awr",
      "parent_id": "UgwOyxU7EAB2sTxrGlZ4AaABAg",
      "comment_type": "reply",
      "author": "@rxpsm",
      "likes": 2,
      "published_at": "2022-11-06T16:25:52Z",
      "timestamp_refs": [],
      "text": "@anannyagoswami6951 Tu ja na be yaha kidhar aya fir",
      "parent_context": "Vote for Pandey Sir! 🙌🙌🙌🙌"
    },
    {
      "comment_id": "UgwOyxU7EAB2sTxrGlZ4AaABAg.8id52g6tPRO9ngmR0G_l_7",
      "parent_id": "UgwOyxU7EAB2sTxrGlZ4AaABAg",
      "comment_type": "reply",
      "author": "@faheemwani170",
      "likes": 0,
      "published_at": "2023-03-25T19:06:51Z",
      "timestamp_refs": [],
      "text": "Kya aap mere ko bta skte hai inki pdf kaha milegi",
      "parent_context": "Vote for Pandey Sir! 🙌🙌🙌🙌"
    },
    {
      "comment_id": "UgwOyxU7EAB2sTxrGlZ4AaABAg.8id52g6tPRO9stNbapLFzX",
      "parent_id": "UgwOyxU7EAB2sTxrGlZ4AaABAg",
      "comment_type": "reply",
      "author": "@yougandhargoud632",
      "likes": 2,
      "published_at": "2023-08-01T23:08:21Z",
      "timestamp_refs": [],
      "text": "New political party",
      "parent_context": "Vote for Pandey Sir! 🙌🙌🙌🙌"
    },
    {
      "comment_id": "UgwOyxU7EAB2sTxrGlZ4AaABAg.8id52g6tPRO9tEZLooWLaK",
      "parent_id": "UgwOyxU7EAB2sTxrGlZ4AaABAg",
      "comment_type": "reply",
      "author": "@ishmeetyadav7787",
      "likes": 0,
      "published_at": "2023-08-10T13:54:12Z",
      "timestamp_refs": [],
      "text": "Voted 🤠",
      "parent_context": "Vote for Pandey Sir! 🙌🙌🙌🙌"
    },
    {
      "comment_id": "UgwOyxU7EAB2sTxrGlZ4AaABAg.8id52g6tPRO9turQdU1yzF",
      "parent_id": "UgwOyxU7EAB2sTxrGlZ4AaABAg",
      "comment_type": "reply",
      "author": "@balfarm4853",
      "likes": 0,
      "published_at": "2023-08-27T09:28:14Z",
      "timestamp_refs": [],
      "text": "Best sir",
      "parent_context": "Vote for Pandey Sir! 🙌🙌🙌🙌"
    },
    {
      "comment_id": "UgwOyxU7EAB2sTxrGlZ4AaABAg.8id52g6tPRO9uFLX0YcChF",
      "parent_id": "UgwOyxU7EAB2sTxrGlZ4AaABAg",
      "comment_type": "reply",
      "author": "@adityachaturvediforyou",
      "likes": 0,
      "published_at": "2023-09-04T17:44:03Z",
      "timestamp_refs": [],
      "text": "I'll vote for your mother 😊",
      "parent_context": "Vote for Pandey Sir! 🙌🙌🙌🙌"
    },
    {
      "comment_id": "UgwOyxU7EAB2sTxrGlZ4AaABAg.8id52g6tPRO9utaeUAaW3q",
      "parent_id": "UgwOyxU7EAB2sTxrGlZ4AaABAg",
      "comment_type": "reply",
      "author": "@bindeshdixit125",
      "likes": 0,
      "published_at": "2023-09-20T18:13:52Z",
      "timestamp_refs": [],
      "text": "🤚🤚🤚🤚🙌🙌",
      "parent_context": "Vote for Pandey Sir! 🙌🙌🙌🙌"
    },
    {
      "comment_id": "UgwOyxU7EAB2sTxrGlZ4AaABAg.8id52g6tPRO9vMBiP--TFR",
      "parent_id": "UgwOyxU7EAB2sTxrGlZ4AaABAg",
      "comment_type": "reply",
      "author": "@suryapratapsinghthakur8988",
      "likes": 0,
      "published_at": "2023-10-02T06:04:26Z",
      "timestamp_refs": [],
      "text": "Accha election chal raii hai",
      "parent_context": "Vote for Pandey Sir! 🙌🙌🙌🙌"
    },
    {
      "comment_id": "UgwOyxU7EAB2sTxrGlZ4AaABAg.8id52g6tPRO9vyZFbJ9G-z",
      "parent_id": "UgwOyxU7EAB2sTxrGlZ4AaABAg",
      "comment_type": "reply",
      "author": "@arimardansingh2186",
      "likes": 3,
      "published_at": "2023-10-17T13:00:28Z",
      "timestamp_refs": [],
      "text": "Which election bro",
      "parent_context": "Vote for Pandey Sir! 🙌🙌🙌🙌"
    },
    {
      "comment_id": "UgwOyxU7EAB2sTxrGlZ4AaABAg.8id52g6tPRO9wMVcI3zxpU",
      "parent_id": "UgwOyxU7EAB2sTxrGlZ4AaABAg",
      "comment_type": "reply",
      "author": "@AD_Animation80",
      "likes": 0,
      "published_at": "2023-10-27T05:29:45Z",
      "timestamp_refs": [],
      "text": "🎉😢😅😊😮🎉🎉❤🎉",
      "parent_context": "Vote for Pandey Sir! 🙌🙌🙌🙌"
    },
    {
      "comment_id": "UgwOyxU7EAB2sTxrGlZ4AaABAg.8id52g6tPRO9wSilB5SK9c",
      "parent_id": "UgwOyxU7EAB2sTxrGlZ4AaABAg",
      "comment_type": "reply",
      "author": "@SiddharthaGupta263",
      "likes": 0,
      "published_at": "2023-10-29T15:28:45Z",
      "timestamp_refs": [],
      "text": "Ye bhi koi tarika h like ki bheek mangne ka",
      "parent_context": "Vote for Pandey Sir! 🙌🙌🙌🙌"
    },
    {
      "comment_id": "UgwOyxU7EAB2sTxrGlZ4AaABAg.8id52g6tPRO9xkGjBl2nTk",
      "parent_id": "UgwOyxU7EAB2sTxrGlZ4AaABAg",
      "comment_type": "reply",
      "author": "@nirax_083",
      "likes": 0,
      "published_at": "2023-11-30T16:52:02Z",
      "timestamp_refs": [],
      "text": "Kayka vote",
      "parent_context": "Vote for Pandey Sir! 🙌🙌🙌🙌"
    },
    {
      "comment_id": "UgwOyxU7EAB2sTxrGlZ4AaABAg.8id52g6tPRO9y4rodvPRa9",
      "parent_id": "UgwOyxU7EAB2sTxrGlZ4AaABAg",
      "comment_type": "reply",
      "author": "@RealPointOfIslam",
      "likes": 0,
      "published_at": "2023-12-09T02:08:53Z",
      "timestamp_refs": [],
      "text": "Which vote 😂😂",
      "parent_context": "Vote for Pandey Sir! 🙌🙌🙌🙌"
    },
    {
      "comment_id": "UgwOyxU7EAB2sTxrGlZ4AaABAg.8id52g6tPRO9y7lNgB1b7p",
      "parent_id": "UgwOyxU7EAB2sTxrGlZ4AaABAg",
      "comment_type": "reply",
      "author": "@altafballari7433",
      "likes": 0,
      "published_at": "2023-12-10T05:10:21Z",
      "timestamp_refs": [],
      "text": "Sandarla kha le",
      "parent_context": "Vote for Pandey Sir! 🙌🙌🙌🙌"
    },
    {
      "comment_id": "UgwOyxU7EAB2sTxrGlZ4AaABAg.8id52g6tPROA69Fegaxbmj",
      "parent_id": "UgwOyxU7EAB2sTxrGlZ4AaABAg",
      "comment_type": "reply",
      "author": "@sonakshiprajapati7945",
      "likes": 0,
      "published_at": "2024-07-21T11:45:29Z",
      "timestamp_refs": [],
      "text": "I'm watching this in 2024.😊. Alakh's sir old videos are evergreen",
      "parent_context": "Vote for Pandey Sir! 🙌🙌🙌🙌"
    },
    {
      "comment_id": "UgwOyxU7EAB2sTxrGlZ4AaABAg.8id52g6tPROA6hJ0YT3C62",
      "parent_id": "UgwOyxU7EAB2sTxrGlZ4AaABAg",
      "comment_type": "reply",
      "author": "@-.entertainmentguruji_5055",
      "likes": 0,
      "published_at": "2024-08-04T02:28:14Z",
      "timestamp_refs": [],
      "text": "Kyu baha'I election chal rahe h",
      "parent_context": "Vote for Pandey Sir! 🙌🙌🙌🙌"
    },
    {
      "comment_id": "UgwOyxU7EAB2sTxrGlZ4AaABAg.8id52g6tPROA85FDkr1MXR",
      "parent_id": "UgwOyxU7EAB2sTxrGlZ4AaABAg",
      "comment_type": "reply",
      "author": "@Ankit_Kumar7425",
      "likes": 0,
      "published_at": "2024-09-07T15:27:30Z",
      "timestamp_refs": [
        "18:53",
        "18:54",
        "18:54",
        "18:54",
        "18:55",
        "18:55",
        "18:55",
        "18:55",
        "18:56",
        "18:56",
        "18:56",
        "18:56",
        "18:57",
        "18:57",
        "18:57",
        "18:57",
        "18:57",
        "18:57",
        "18:58",
        "18:58",
        "18:58",
        "18:59",
        "18:59",
        "18:59",
        "18:59",
        "19:00",
        "19:00",
        "19:00",
        "19:00",
        "19:01",
        "19:01",
        "19:01",
        "19:01",
        "19:02",
        "19:02",
        "19:02",
        "19:02",
        "19:03",
        "19:03",
        "19:03",
        "19:03",
        "19:04",
        "19:04",
        "19:04",
        "19:04",
        "19:05",
        "19:05",
        "19:05",
        "19:05",
        "19:06",
        "19:06",
        "19:06",
        "19:06",
        "19:07",
        "19:07",
        "19:07",
        "19:07",
        "19:07",
        "19:08",
        "19:08",
        "19:08",
        "19:08",
        "19:08",
        "19:08",
        "19:09",
        "19:09",
        "19:09",
        "19:09",
        "19:09",
        "19:10",
        "19:10",
        "19:10",
        "19:10",
        "19:11",
        "19:11",
        "19:11",
        "19:11",
        "19:11",
        "19:12",
        "19:12",
        "19:12",
        "19:12",
        "19:12",
        "19:13",
        "19:13",
        "19:13",
        "19:13",
        "19:13",
        "19:14",
        "19:14",
        "19:14",
        "19:14",
        "19:15",
        "19:15",
        "19:15",
        "19:15",
        "19:15",
        "19:15",
        "19:17",
        "19:17"
      ],
      "text": "18:53 18:54 18:54 18:54 18:55 18:55 18:55 18:55 18:56 18:56 18:56 18:56 18:57 18:57 18:57 18:57 18:57 18:57 18:58 18:58 18:58 18:59 18:59 18:59 18:59 19:00 19:00 19:00 19:00 19:01 19:01 19:01 19:01 19:02 19:02 19:02 19:02 19:03 19:03 19:03 19:03 19:04 19:04 19:04 19:04 19:05 19:05 19:05 19:05 19:06 19:06 19:06 19:06 19:07 19:07 19:07 19:07 19:07 19:08 19:08 19:08 19:08 19:08 19:08 19:09 19:09 19:09 19:09 19:09 19:10 19:10 19:10 19:10 19:11 19:11 19:11 19:11 19:11 19:12 19:12 19:12 19:12 19:12 19:13 19:13 19:13 19:13 19:13 19:14 19:14 19:14 19:14 19:15 19:15 19:15 19:15 19:15 19:15 19:17 19:17",
      "parent_context": "Vote for Pandey Sir! 🙌🙌🙌🙌"
    },
    {
      "comment_id": "UgwOyxU7EAB2sTxrGlZ4AaABAg.8id52g6tPROACDNCUvVmyC",
      "parent_id": "UgwOyxU7EAB2sTxrGlZ4AaABAg",
      "comment_type": "reply",
      "author": "@VikashLakhera-c8u",
      "likes": 0,
      "published_at": "2024-12-19T05:16:43Z",
      "timestamp_refs": [],
      "text": "Gdfjjbcff",
      "parent_context": "Vote for Pandey Sir! 🙌🙌🙌🙌"
    },
    {
      "comment_id": "UgwOyxU7EAB2sTxrGlZ4AaABAg.8id52g6tPROACOfUUnoItu",
      "parent_id": "UgwOyxU7EAB2sTxrGlZ4AaABAg",
      "comment_type": "reply",
      "author": "@AmitYadav-o9u2y",
      "likes": 0,
      "published_at": "2024-12-23T14:36:51Z",
      "timestamp_refs": [],
      "text": "@sashwatrawat6270 aaaaaaaaaaaaaa",
      "parent_context": "Vote for Pandey Sir! 🙌🙌🙌🙌"
    },
    {
      "comment_id": "UgwOyxU7EAB2sTxrGlZ4AaABAg.8id52g6tPROADCH7RYOpps",
      "parent_id": "UgwOyxU7EAB2sTxrGlZ4AaABAg",
      "comment_type": "reply",
      "author": "@thakur.7A-e9s",
      "likes": 0,
      "published_at": "2025-01-12T15:35:45Z",
      "timestamp_refs": [],
      "text": "Vote ka चिन्ह kya h 😅I agree with Pandey 🎉",
      "parent_context": "Vote for Pandey Sir! 🙌🙌🙌🙌"
    },
    {
      "comment_id": "UgwOyxU7EAB2sTxrGlZ4AaABAg.8id52g6tPROAH_yyC6FAEt",
      "parent_id": "UgwOyxU7EAB2sTxrGlZ4AaABAg",
      "comment_type": "reply",
      "author": "@unkown_creation",
      "likes": 0,
      "published_at": "2025-05-01T15:54:55Z",
      "timestamp_refs": [],
      "text": "6year pahle sir 🙏",
      "parent_context": "Vote for Pandey Sir! 🙌🙌🙌🙌"
    },
    {
      "comment_id": "UgwOyxU7EAB2sTxrGlZ4AaABAg.8id52g6tPROAJsnPUkhmjA",
      "parent_id": "UgwOyxU7EAB2sTxrGlZ4AaABAg",
      "comment_type": "reply",
      "author": "@mystery.unlocker.vikash",
      "likes": 0,
      "published_at": "2025-06-27T16:22:17Z",
      "timestamp_refs": [],
      "text": "Bhai selection ho gaya kya ❤",
      "parent_context": "Vote for Pandey Sir! 🙌🙌🙌🙌"
    },
    {
      "comment_id": "UgwOyxU7EAB2sTxrGlZ4AaABAg.8id52g6tPROALd6cc_d3H3",
      "parent_id": "UgwOyxU7EAB2sTxrGlZ4AaABAg",
      "comment_type": "reply",
      "author": "@varunam9808",
      "likes": 0,
      "published_at": "2025-08-10T07:13:55Z",
      "timestamp_refs": [],
      "text": "Sir I will give my full vote",
      "parent_context": "Vote for Pandey Sir! 🙌🙌🙌🙌"
    },
    {
      "comment_id": "UgwOyxU7EAB2sTxrGlZ4AaABAg.8id52g6tPROAQEuM91z0py",
      "parent_id": "UgwOyxU7EAB2sTxrGlZ4AaABAg",
      "comment_type": "reply",
      "author": "@humerakhan7584",
      "likes": 0,
      "published_at": "2025-12-02T18:53:54Z",
      "timestamp_refs": [],
      "text": "​@MKJha-re6nm😂",
      "parent_context": "Vote for Pandey Sir! 🙌🙌🙌🙌"
    },
    {
      "comment_id": "UgwOyxU7EAB2sTxrGlZ4AaABAg.8id52g6tPROAQTvo-YC4q8",
      "parent_id": "UgwOyxU7EAB2sTxrGlZ4AaABAg",
      "comment_type": "reply",
      "author": "@AakirtiBhatta",
      "likes": 0,
      "published_at": "2025-12-08T14:55:11Z",
      "timestamp_refs": [],
      "text": "Best teacher 🫶",
      "parent_context": "Vote for Pandey Sir! 🙌🙌🙌🙌"
    },
    {
      "comment_id": "UgwOyxU7EAB2sTxrGlZ4AaABAg.8id52g6tPROARULiwdd8oG",
      "parent_id": "UgwOyxU7EAB2sTxrGlZ4AaABAg",
      "comment_type": "reply",
      "author": "@AnkitGupta-rt9it",
      "likes": 0,
      "published_at": "2026-01-02T15:21:49Z",
      "timestamp_refs": [
        "14:05",
        "14:05",
        "14:05",
        "14:05",
        "14:05",
        "14:05",
        "14:05",
        "14:05",
        "14:05",
        "14:05",
        "14:05",
        "14:05"
      ],
      "text": "Bhaii jeee nikla. 14:05 14:05 14:05 14:05 14:05 14:05 14:05 14:05 14:05 14:05 14:05 14:05",
      "parent_context": "Vote for Pandey Sir! 🙌🙌🙌🙌"
    },
    {
      "comment_id": "UgwOyxU7EAB2sTxrGlZ4AaABAg.8id52g6tPROAVJDTWGoxXa",
      "parent_id": "UgwOyxU7EAB2sTxrGlZ4AaABAg",
      "comment_type": "reply",
      "author": "@RamilaRajesh-ej4lu",
      "likes": 0,
      "published_at": "2026-04-07T17:43:36Z",
      "timestamp_refs": [],
      "text": "9.1 k toh videos pay Hotehain Bhai apkay toh comment itna agy chla gya❤❤ apkhud Kahan ho..",
      "parent_context": "Vote for Pandey Sir! 🙌🙌🙌🙌"
    },
    {
      "comment_id": "Ugz50X2-alCM_HyRu394AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@shivamchourasia1748",
      "likes": 2441,
      "published_at": "2021-09-05T06:13:53Z",
      "timestamp_refs": [],
      "text": "Teachers like you are the reason why ordinary students like us dream of doing extraordinary things. Happy Teachers Day to you Alakh Sir !",
      "parent_context": ""
    },
    {
      "comment_id": "Ugz50X2-alCM_HyRu394AaABAg.9Ru-2Ktgk3B9bMQRTCMnCj",
      "parent_id": "Ugz50X2-alCM_HyRu394AaABAg",
      "comment_type": "reply",
      "author": "@aayeshasiddiqa4312",
      "likes": 5,
      "published_at": "2022-05-23T05:45:09Z",
      "timestamp_refs": [],
      "text": "Yes true af",
      "parent_context": "Teachers like you are the reason why ordinary students like us dream of doing extraordinary things. Happy Teachers Day to you Alakh Sir !"
    },
    {
      "comment_id": "Ugz50X2-alCM_HyRu394AaABAg.9Ru-2Ktgk3B9gJpS1a5JSH",
      "parent_id": "Ugz50X2-alCM_HyRu394AaABAg",
      "comment_type": "reply",
      "author": "@divaygupta7637",
      "likes": 0,
      "published_at": "2022-09-23T12:11:41Z",
      "timestamp_refs": [],
      "text": "@bhavyaa_020 fu.....",
      "parent_context": "Teachers like you are the reason why ordinary students like us dream of doing extraordinary things. Happy Teachers Day to you Alakh Sir !"
    },
    {
      "comment_id": "Ugz50X2-alCM_HyRu394AaABAg.9Ru-2Ktgk3B9qpKnJ0Hxei",
      "parent_id": "Ugz50X2-alCM_HyRu394AaABAg",
      "comment_type": "reply",
      "author": "@action_music_all",
      "likes": 1,
      "published_at": "2023-06-11T16:23:59Z",
      "timestamp_refs": [],
      "text": "​@aayeshasiddiqa4312 😅😅",
      "parent_context": "Teachers like you are the reason why ordinary students like us dream of doing extraordinary things. Happy Teachers Day to you Alakh Sir !"
    },
    {
      "comment_id": "Ugz50X2-alCM_HyRu394AaABAg.9Ru-2Ktgk3B9shVW8V4yUs",
      "parent_id": "Ugz50X2-alCM_HyRu394AaABAg",
      "comment_type": "reply",
      "author": "@dgcreation5697",
      "likes": 0,
      "published_at": "2023-07-28T08:26:29Z",
      "timestamp_refs": [],
      "text": "💖💖💖❤️❤️❤️",
      "parent_context": "Teachers like you are the reason why ordinary students like us dream of doing extraordinary things. Happy Teachers Day to you Alakh Sir !"
    },
    {
      "comment_id": "Ugz50X2-alCM_HyRu394AaABAg.9Ru-2Ktgk3BAEThgIiUGoj",
      "parent_id": "Ugz50X2-alCM_HyRu394AaABAg",
      "comment_type": "reply",
      "author": "@jamnadas3711",
      "likes": 2,
      "published_at": "2025-02-13T06:35:04Z",
      "timestamp_refs": [],
      "text": "Is these lectures enough for wbjee and amueee..??",
      "parent_context": "Teachers like you are the reason why ordinary students like us dream of doing extraordinary things. Happy Teachers Day to you Alakh Sir !"
    },
    {
      "comment_id": "UgxtYn2jdran3pdd7_94AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@nearxd2999",
      "likes": 1636,
      "published_at": "2020-11-06T15:08:29Z",
      "timestamp_refs": [],
      "text": "It's very tough to teach in front of a camera without Hesitation. Three Cheers for Alakh sir.",
      "parent_context": ""
    },
    {
      "comment_id": "UgxtYn2jdran3pdd7_94AaABAg.9FikMkIJD5d9FuZQnkZyW0",
      "parent_id": "UgxtYn2jdran3pdd7_94AaABAg",
      "comment_type": "reply",
      "author": "@kneelbeforedean8189",
      "likes": 8,
      "published_at": "2020-11-11T05:15:04Z",
      "timestamp_refs": [],
      "text": "Three kyo?",
      "parent_context": "It's very tough to teach in front of a camera without Hesitation. Three Cheers for Alakh sir."
    },
    {
      "comment_id": "UgxtYn2jdran3pdd7_94AaABAg.9FikMkIJD5d9Ge9eYFp59K",
      "parent_id": "UgxtYn2jdran3pdd7_94AaABAg",
      "comment_type": "reply",
      "author": "@himtimp",
      "likes": 12,
      "published_at": "2020-11-29T16:53:26Z",
      "timestamp_refs": [],
      "text": "Isn't the brightness too much??🃏",
      "parent_context": "It's very tough to teach in front of a camera without Hesitation. Three Cheers for Alakh sir."
    },
    {
      "comment_id": "UgxtYn2jdran3pdd7_94AaABAg.9FikMkIJD5d9Hz0XMfrvnM",
      "parent_id": "UgxtYn2jdran3pdd7_94AaABAg",
      "comment_type": "reply",
      "author": "@vinayakjoshi5027",
      "likes": 10,
      "published_at": "2021-01-01T15:49:07Z",
      "timestamp_refs": [],
      "text": "ab isme koi nai baat nai hai",
      "parent_context": "It's very tough to teach in front of a camera without Hesitation. Three Cheers for Alakh sir."
    },
    {
      "comment_id": "UgxtYn2jdran3pdd7_94AaABAg.9FikMkIJD5d9Hz3SaK6xap",
      "parent_id": "UgxtYn2jdran3pdd7_94AaABAg",
      "comment_type": "reply",
      "author": "@himtimp",
      "likes": 19,
      "published_at": "2021-01-01T16:14:41Z",
      "timestamp_refs": [],
      "text": "@vinayakjoshi5027 Inko baas like chahiye!?😂😂",
      "parent_context": "It's very tough to teach in front of a camera without Hesitation. Three Cheers for Alakh sir."
    },
    {
      "comment_id": "UgxtYn2jdran3pdd7_94AaABAg.9FikMkIJD5d9IjTYw3ouef",
      "parent_id": "UgxtYn2jdran3pdd7_94AaABAg",
      "comment_type": "reply",
      "author": "@thebabuchak4812",
      "likes": 4,
      "published_at": "2021-01-20T11:26:17Z",
      "timestamp_refs": [],
      "text": "True7",
      "parent_context": "It's very tough to teach in front of a camera without Hesitation. Three Cheers for Alakh sir."
    },
    {
      "comment_id": "UgxtYn2jdran3pdd7_94AaABAg.9FikMkIJD5d9JbhDyB9pF7",
      "parent_id": "UgxtYn2jdran3pdd7_94AaABAg",
      "comment_type": "reply",
      "author": "@TilakRaj-qo6ic",
      "likes": 0,
      "published_at": "2021-02-11T07:31:58Z",
      "timestamp_refs": [],
      "text": "@himtimp na",
      "parent_context": "It's very tough to teach in front of a camera without Hesitation. Three Cheers for Alakh sir."
    },
    {
      "comment_id": "UgxtYn2jdran3pdd7_94AaABAg.9FikMkIJD5d9JbsSK7PM_i",
      "parent_id": "UgxtYn2jdran3pdd7_94AaABAg",
      "comment_type": "reply",
      "author": "@himtimp",
      "likes": 1,
      "published_at": "2021-02-11T09:10:02Z",
      "timestamp_refs": [],
      "text": "@TilakRaj-qo6ic naa..!?",
      "parent_context": "It's very tough to teach in front of a camera without Hesitation. Three Cheers for Alakh sir."
    },
    {
      "comment_id": "UgxtYn2jdran3pdd7_94AaABAg.9FikMkIJD5d9JbvWIxUERz",
      "parent_id": "UgxtYn2jdran3pdd7_94AaABAg",
      "comment_type": "reply",
      "author": "@TilakRaj-qo6ic",
      "likes": 0,
      "published_at": "2021-02-11T09:36:48Z",
      "timestamp_refs": [],
      "text": "@himtimp nai",
      "parent_context": "It's very tough to teach in front of a camera without Hesitation. Three Cheers for Alakh sir."
    },
    {
      "comment_id": "UgxtYn2jdran3pdd7_94AaABAg.9FikMkIJD5d9JbwEXakANt",
      "parent_id": "UgxtYn2jdran3pdd7_94AaABAg",
      "comment_type": "reply",
      "author": "@himtimp",
      "likes": 0,
      "published_at": "2021-02-11T09:43:07Z",
      "timestamp_refs": [],
      "text": "@TilakRaj-qo6ic kya,,..???!⚓",
      "parent_context": "It's very tough to teach in front of a camera without Hesitation. Three Cheers for Alakh sir."
    },
    {
      "comment_id": "UgxtYn2jdran3pdd7_94AaABAg.9FikMkIJD5d9JbyU59tpwZ",
      "parent_id": "UgxtYn2jdran3pdd7_94AaABAg",
      "comment_type": "reply",
      "author": "@TilakRaj-qo6ic",
      "likes": 0,
      "published_at": "2021-02-11T10:02:43Z",
      "timestamp_refs": [],
      "text": "@himtimp brightness is not heavy",
      "parent_context": "It's very tough to teach in front of a camera without Hesitation. Three Cheers for Alakh sir."
    },
    {
      "comment_id": "UgxtYn2jdran3pdd7_94AaABAg.9FikMkIJD5d9ZWAmP24O8W",
      "parent_id": "UgxtYn2jdran3pdd7_94AaABAg",
      "comment_type": "reply",
      "author": "@nasimaktar4998",
      "likes": 0,
      "published_at": "2022-03-13T11:06:34Z",
      "timestamp_refs": [],
      "text": "@himtimp not at all bro",
      "parent_context": "It's very tough to teach in front of a camera without Hesitation. Three Cheers for Alakh sir."
    },
    {
      "comment_id": "UgxtYn2jdran3pdd7_94AaABAg.9FikMkIJD5d9fUMqyaYBEs",
      "parent_id": "UgxtYn2jdran3pdd7_94AaABAg",
      "comment_type": "reply",
      "author": "@muskansingh25083",
      "likes": 12,
      "published_at": "2022-09-02T17:53:19Z",
      "timestamp_refs": [],
      "text": "Heep heep hurrey heep heep hurry heep heep hurrey ❤️",
      "parent_context": "It's very tough to teach in front of a camera without Hesitation. Three Cheers for Alakh sir."
    },
    {
      "comment_id": "UgzN_3gCYAtVnXwWywF4AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@Niteshyadav-x6w1z",
      "likes": 240,
      "published_at": "2026-02-02T06:28:22Z",
      "timestamp_refs": [],
      "text": "still anyone in 2026",
      "parent_context": ""
    },
    {
      "comment_id": "UgzN_3gCYAtVnXwWywF4AaABAg.ASiDJwEM5eJAT6vYrUul5O",
      "parent_id": "UgzN_3gCYAtVnXwWywF4AaABAg",
      "comment_type": "reply",
      "author": "@hnxandro44",
      "likes": 6,
      "published_at": "2026-02-12T06:04:37Z",
      "timestamp_refs": [],
      "text": "Bro are these lectures of same content of our ncert?",
      "parent_context": "still anyone in 2026"
    },
    {
      "comment_id": "UgzN_3gCYAtVnXwWywF4AaABAg.ASiDJwEM5eJAT6w2ywx-FS",
      "parent_id": "UgzN_3gCYAtVnXwWywF4AaABAg",
      "comment_type": "reply",
      "author": "@Niteshyadav-x6w1z",
      "likes": 3,
      "published_at": "2026-02-12T06:09:01Z",
      "timestamp_refs": [],
      "text": "@hnxandro44 bro I am from Nepal 🇳🇵",
      "parent_context": "still anyone in 2026"
    },
    {
      "comment_id": "UgzN_3gCYAtVnXwWywF4AaABAg.ASiDJwEM5eJAT7XmzVYnrm",
      "parent_id": "UgzN_3gCYAtVnXwWywF4AaABAg",
      "comment_type": "reply",
      "author": "@Nangbiaseika",
      "likes": 1,
      "published_at": "2026-02-12T11:47:29Z",
      "timestamp_refs": [],
      "text": "From Arunachal Pradesh ❤❤",
      "parent_context": "still anyone in 2026"
    },
    {
      "comment_id": "UgzN_3gCYAtVnXwWywF4AaABAg.ASiDJwEM5eJAT7faRq8XYk",
      "parent_id": "UgzN_3gCYAtVnXwWywF4AaABAg",
      "comment_type": "reply",
      "author": "@Niteshyadav-x6w1z",
      "likes": 2,
      "published_at": "2026-02-12T13:04:24Z",
      "timestamp_refs": [],
      "text": "@Nangbiaseika neet exam date kitna hai may vi exam dena chata hu",
      "parent_context": "still anyone in 2026"
    },
    {
      "comment_id": "UgzN_3gCYAtVnXwWywF4AaABAg.ASiDJwEM5eJAT7fzoIMuLC",
      "parent_id": "UgzN_3gCYAtVnXwWywF4AaABAg",
      "comment_type": "reply",
      "author": "@hnxandro44",
      "likes": 1,
      "published_at": "2026-02-12T13:07:52Z",
      "timestamp_refs": [],
      "text": "​@Niteshyadav-x6w1zmay 3 or 4 maybe",
      "parent_context": "still anyone in 2026"
    },
    {
      "comment_id": "UgzN_3gCYAtVnXwWywF4AaABAg.ASiDJwEM5eJATATe8V0pAK",
      "parent_id": "UgzN_3gCYAtVnXwWywF4AaABAg",
      "comment_type": "reply",
      "author": "@NeeruKhareshiya",
      "likes": 1,
      "published_at": "2026-02-13T15:09:02Z",
      "timestamp_refs": [],
      "text": "3 may",
      "parent_context": "still anyone in 2026"
    },
    {
      "comment_id": "UgzN_3gCYAtVnXwWywF4AaABAg.ASiDJwEM5eJATCUCrAa-df",
      "parent_id": "UgzN_3gCYAtVnXwWywF4AaABAg",
      "comment_type": "reply",
      "author": "@Niteshyadav-x6w1z",
      "likes": 0,
      "published_at": "2026-02-14T09:52:24Z",
      "timestamp_refs": [],
      "text": "@NeeruKhareshiya thanks",
      "parent_context": "still anyone in 2026"
    },
    {
      "comment_id": "UgzN_3gCYAtVnXwWywF4AaABAg.ASiDJwEM5eJATZVzCS5ZUI",
      "parent_id": "UgzN_3gCYAtVnXwWywF4AaABAg",
      "comment_type": "reply",
      "author": "@KaveriWaghmare-k1y",
      "likes": 0,
      "published_at": "2026-02-23T08:30:24Z",
      "timestamp_refs": [],
      "text": "😂😂😂❤❤❤",
      "parent_context": "still anyone in 2026"
    },
    {
      "comment_id": "UgzN_3gCYAtVnXwWywF4AaABAg.ASiDJwEM5eJATfz-aglhML",
      "parent_id": "UgzN_3gCYAtVnXwWywF4AaABAg",
      "comment_type": "reply",
      "author": "@MdRinku-e1d",
      "likes": 1,
      "published_at": "2026-02-26T06:07:25Z",
      "timestamp_refs": [],
      "text": "Yeah i am bro",
      "parent_context": "still anyone in 2026"
    },
    {
      "comment_id": "UgzN_3gCYAtVnXwWywF4AaABAg.ASiDJwEM5eJAUAqAON26jh",
      "parent_id": "UgzN_3gCYAtVnXwWywF4AaABAg",
      "comment_type": "reply",
      "author": "@KAMINIKUMARI-j6x",
      "likes": 0,
      "published_at": "2026-03-10T15:05:57Z",
      "timestamp_refs": [],
      "text": "🙂‍↕️🙂‍↕️🙂‍↕️🙂‍↕️ yes",
      "parent_context": "still anyone in 2026"
    },
    {
      "comment_id": "UgzN_3gCYAtVnXwWywF4AaABAg.ASiDJwEM5eJAUwmmMNFjYc",
      "parent_id": "UgzN_3gCYAtVnXwWywF4AaABAg",
      "comment_type": "reply",
      "author": "@Getsomegrass",
      "likes": 1,
      "published_at": "2026-03-29T15:19:06Z",
      "timestamp_refs": [],
      "text": "@Niteshyadav-x6w1z NEET is only eligible for Indian nationals.",
      "parent_context": "still anyone in 2026"
    },
    {
      "comment_id": "UgzN_3gCYAtVnXwWywF4AaABAg.ASiDJwEM5eJAVA2XyJG5hA",
      "parent_id": "UgzN_3gCYAtVnXwWywF4AaABAg",
      "comment_type": "reply",
      "author": "@GurpreetKaur-z5p1d",
      "likes": 0,
      "published_at": "2026-04-04T04:14:55Z",
      "timestamp_refs": [],
      "text": "Yes 4 april",
      "parent_context": "still anyone in 2026"
    },
    {
      "comment_id": "UgzN_3gCYAtVnXwWywF4AaABAg.ASiDJwEM5eJAVRLlMwD-xB",
      "parent_id": "UgzN_3gCYAtVnXwWywF4AaABAg",
      "comment_type": "reply",
      "author": "@seenubohat4216",
      "likes": 1,
      "published_at": "2026-04-10T21:30:00Z",
      "timestamp_refs": [],
      "text": "Mai bro",
      "parent_context": "still anyone in 2026"
    },
    {
      "comment_id": "UgzN_3gCYAtVnXwWywF4AaABAg.ASiDJwEM5eJAW9LelStQt_",
      "parent_id": "UgzN_3gCYAtVnXwWywF4AaABAg",
      "comment_type": "reply",
      "author": "@PampaSuin-h7l",
      "likes": 1,
      "published_at": "2026-04-28T18:14:10Z",
      "timestamp_refs": [],
      "text": "I am .....😅",
      "parent_context": "still anyone in 2026"
    },
    {
      "comment_id": "UgzN_3gCYAtVnXwWywF4AaABAg.ASiDJwEM5eJAXRLajIpbvE",
      "parent_id": "UgzN_3gCYAtVnXwWywF4AaABAg",
      "comment_type": "reply",
      "author": "@ramsK-v3j",
      "likes": 0,
      "published_at": "2026-05-30T14:31:20Z",
      "timestamp_refs": [],
      "text": "Yóooo",
      "parent_context": "still anyone in 2026"
    },
    {
      "comment_id": "UgzN_3gCYAtVnXwWywF4AaABAg.ASiDJwEM5eJAXy1Z7TM2gw",
      "parent_id": "UgzN_3gCYAtVnXwWywF4AaABAg",
      "comment_type": "reply",
      "author": "@akhand_bharat_shakti_sangh",
      "likes": 0,
      "published_at": "2026-06-12T16:30:24Z",
      "timestamp_refs": [],
      "text": "Yes brother ❤❤",
      "parent_context": "still anyone in 2026"
    },
    {
      "comment_id": "UgzN_3gCYAtVnXwWywF4AaABAg.ASiDJwEM5eJAYtDUy0QkFd",
      "parent_id": "UgzN_3gCYAtVnXwWywF4AaABAg",
      "comment_type": "reply",
      "author": "@Dhirenyadav_0001",
      "likes": 1,
      "published_at": "2026-07-05T16:09:52Z",
      "timestamp_refs": [],
      "text": "5 july",
      "parent_context": "still anyone in 2026"
    },
    {
      "comment_id": "UgxSBJr_lhYIJyBMuud4AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@Sneha-fo5bf",
      "likes": 2545,
      "published_at": "2020-09-22T16:29:31Z",
      "timestamp_refs": [],
      "text": "I watched ur lecturer for the first time and I was literally stunned seeing that how can a teacher teach so well?🤩",
      "parent_context": ""
    },
    {
      "comment_id": "UgxSBJr_lhYIJyBMuud4AaABAg.9Dv0rqbAQlR9EIf18OO54t",
      "parent_id": "UgxSBJr_lhYIJyBMuud4AaABAg",
      "comment_type": "reply",
      "author": "@ArunSharma-ii9ry",
      "likes": 31,
      "published_at": "2020-10-02T06:10:57Z",
      "timestamp_refs": [],
      "text": "Yes hee is such a great teacher",
      "parent_context": "I watched ur lecturer for the first time and I was literally stunned seeing that how can a teacher teach so well?🤩"
    },
    {
      "comment_id": "UgxSBJr_lhYIJyBMuud4AaABAg.9Dv0rqbAQlR9ERWVG6Kj-S",
      "parent_id": "UgxSBJr_lhYIJyBMuud4AaABAg",
      "comment_type": "reply",
      "author": "@b.nikhilshetty3393",
      "likes": 13,
      "published_at": "2020-10-05T16:40:51Z",
      "timestamp_refs": [],
      "text": "@ArunSharma-ii9ry s... true",
      "parent_context": "I watched ur lecturer for the first time and I was literally stunned seeing that how can a teacher teach so well?🤩"
    },
    {
      "comment_id": "UgxSBJr_lhYIJyBMuud4AaABAg.9Dv0rqbAQlR9EdTKZ3Zy10",
      "parent_id": "UgxSBJr_lhYIJyBMuud4AaABAg",
      "comment_type": "reply",
      "author": "@anjujha5034",
      "likes": 11,
      "published_at": "2020-10-10T17:23:18Z",
      "timestamp_refs": [],
      "text": "True",
      "parent_context": "I watched ur lecturer for the first time and I was literally stunned seeing that how can a teacher teach so well?🤩"
    },
    {
      "comment_id": "UgxSBJr_lhYIJyBMuud4AaABAg.9Dv0rqbAQlR9EryWOpwwFS",
      "parent_id": "UgxSBJr_lhYIJyBMuud4AaABAg",
      "comment_type": "reply",
      "author": "@kislayswaroopamsingh5613",
      "likes": 6,
      "published_at": "2020-10-16T08:33:54Z",
      "timestamp_refs": [],
      "text": "true",
      "parent_context": "I watched ur lecturer for the first time and I was literally stunned seeing that how can a teacher teach so well?🤩"
    },
    {
      "comment_id": "UgxSBJr_lhYIJyBMuud4AaABAg.9Dv0rqbAQlR9F9a8jr7IO0",
      "parent_id": "UgxSBJr_lhYIJyBMuud4AaABAg",
      "comment_type": "reply",
      "author": "@unknownbeast4927",
      "likes": 4,
      "published_at": "2020-10-23T14:06:32Z",
      "timestamp_refs": [],
      "text": "@Abhishek Jha True",
      "parent_context": "I watched ur lecturer for the first time and I was literally stunned seeing that how can a teacher teach so well?🤩"
    },
    {
      "comment_id": "UgxSBJr_lhYIJyBMuud4AaABAg.9Dv0rqbAQlR9FO4gi9GxSo",
      "parent_id": "UgxSBJr_lhYIJyBMuud4AaABAg",
      "comment_type": "reply",
      "author": "@vishalkurmi5858",
      "likes": 14,
      "published_at": "2020-10-29T05:11:33Z",
      "timestamp_refs": [],
      "text": "Are bas pagla rulaya ga kya ab",
      "parent_context": "I watched ur lecturer for the first time and I was literally stunned seeing that how can a teacher teach so well?🤩"
    },
    {
      "comment_id": "UgxSBJr_lhYIJyBMuud4AaABAg.9Dv0rqbAQlR9FTsTadGaXw",
      "parent_id": "UgxSBJr_lhYIJyBMuud4AaABAg",
      "comment_type": "reply",
      "author": "@user-ki6pt2zg1h",
      "likes": 2,
      "published_at": "2020-10-31T11:11:28Z",
      "timestamp_refs": [],
      "text": "Please this video examination in life never give up-https://youtu.be/k4w4pak66V0",
      "parent_context": "I watched ur lecturer for the first time and I was literally stunned seeing that how can a teacher teach so well?🤩"
    },
    {
      "comment_id": "UgxSBJr_lhYIJyBMuud4AaABAg.9Dv0rqbAQlR9GFJ3oWVVro",
      "parent_id": "UgxSBJr_lhYIJyBMuud4AaABAg",
      "comment_type": "reply",
      "author": "@-AARUSHSHARMA--I",
      "likes": 7,
      "published_at": "2020-11-19T15:55:24Z",
      "timestamp_refs": [],
      "text": "@user-ki6pt2zg1hitnA bekar time n hai😂",
      "parent_context": "I watched ur lecturer for the first time and I was literally stunned seeing that how can a teacher teach so well?🤩"
    },
    {
      "comment_id": "UgxSBJr_lhYIJyBMuud4AaABAg.9Dv0rqbAQlR9GKCThiB1k6",
      "parent_id": "UgxSBJr_lhYIJyBMuud4AaABAg",
      "comment_type": "reply",
      "author": "@khushbooharma9952",
      "likes": 15,
      "published_at": "2020-11-21T13:33:59Z",
      "timestamp_refs": [],
      "text": "Toh Kya Itne din student saa padh rhi thi app 😂😂",
      "parent_context": "I watched ur lecturer for the first time and I was literally stunned seeing that how can a teacher teach so well?🤩"
    },
    {
      "comment_id": "UgxSBJr_lhYIJyBMuud4AaABAg.9Dv0rqbAQlR9GKk-kuuvRP",
      "parent_id": "UgxSBJr_lhYIJyBMuud4AaABAg",
      "comment_type": "reply",
      "author": "@sudanesthetics",
      "likes": 1,
      "published_at": "2020-11-21T18:35:43Z",
      "timestamp_refs": [],
      "text": "@khushbooharma9952 gud question 👌👌😂",
      "parent_context": "I watched ur lecturer for the first time and I was literally stunned seeing that how can a teacher teach so well?🤩"
    },
    {
      "comment_id": "UgxSBJr_lhYIJyBMuud4AaABAg.9Dv0rqbAQlR9GP3MHpqeUb",
      "parent_id": "UgxSBJr_lhYIJyBMuud4AaABAg",
      "comment_type": "reply",
      "author": "@Sneha-fo5bf",
      "likes": 1,
      "published_at": "2020-11-23T10:50:31Z",
      "timestamp_refs": [],
      "text": "@khushbooharma9952 aise teachers lako me ek hai!!",
      "parent_context": "I watched ur lecturer for the first time and I was literally stunned seeing that how can a teacher teach so well?🤩"
    },
    {
      "comment_id": "UgxSBJr_lhYIJyBMuud4AaABAg.9Dv0rqbAQlR9GP3QCOtise",
      "parent_id": "UgxSBJr_lhYIJyBMuud4AaABAg",
      "comment_type": "reply",
      "author": "@Sneha-fo5bf",
      "likes": 2,
      "published_at": "2020-11-23T10:51:04Z",
      "timestamp_refs": [],
      "text": "@sudanesthetics good that u have such teachers...I have seldom seen such teachers in my life",
      "parent_context": "I watched ur lecturer for the first time and I was literally stunned seeing that how can a teacher teach so well?🤩"
    },
    {
      "comment_id": "UgxSBJr_lhYIJyBMuud4AaABAg.9Dv0rqbAQlR9GkSIYz_TfF",
      "parent_id": "UgxSBJr_lhYIJyBMuud4AaABAg",
      "comment_type": "reply",
      "author": "@abhishekchaudhary8544",
      "likes": 9,
      "published_at": "2020-12-02T03:31:46Z",
      "timestamp_refs": [],
      "text": "We all have those teachers in school who just teach for the sake of teaching. So boring they are and now even more boring when it's online",
      "parent_context": "I watched ur lecturer for the first time and I was literally stunned seeing that how can a teacher teach so well?🤩"
    },
    {
      "comment_id": "UgxSBJr_lhYIJyBMuud4AaABAg.9Dv0rqbAQlR9GrzRmfczXN",
      "parent_id": "UgxSBJr_lhYIJyBMuud4AaABAg",
      "comment_type": "reply",
      "author": "@dailyhoodclips5258",
      "likes": 3,
      "published_at": "2020-12-05T01:44:48Z",
      "timestamp_refs": [],
      "text": "Fundi",
      "parent_context": "I watched ur lecturer for the first time and I was literally stunned seeing that how can a teacher teach so well?🤩"
    },
    {
      "comment_id": "UgxSBJr_lhYIJyBMuud4AaABAg.9Dv0rqbAQlR9H4OEidAJ6m",
      "parent_id": "UgxSBJr_lhYIJyBMuud4AaABAg",
      "comment_type": "reply",
      "author": "@onlyshorts1428",
      "likes": 2,
      "published_at": "2020-12-10T06:40:20Z",
      "timestamp_refs": [],
      "text": "I too",
      "parent_context": "I watched ur lecturer for the first time and I was literally stunned seeing that how can a teacher teach so well?🤩"
    },
    {
      "comment_id": "UgxSBJr_lhYIJyBMuud4AaABAg.9Dv0rqbAQlR9HPwzyNfveD",
      "parent_id": "UgxSBJr_lhYIJyBMuud4AaABAg",
      "comment_type": "reply",
      "author": "@ashityadav649",
      "likes": 1,
      "published_at": "2020-12-18T15:36:48Z",
      "timestamp_refs": [],
      "text": "@abhishekchaudhary8544 are you mad",
      "parent_context": "I watched ur lecturer for the first time and I was literally stunned seeing that how can a teacher teach so well?🤩"
    },
    {
      "comment_id": "UgxSBJr_lhYIJyBMuud4AaABAg.9Dv0rqbAQlR9HPx0u6pKVd",
      "parent_id": "UgxSBJr_lhYIJyBMuud4AaABAg",
      "comment_type": "reply",
      "author": "@ashityadav649",
      "likes": 1,
      "published_at": "2020-12-18T15:37:04Z",
      "timestamp_refs": [],
      "text": "Yeah right",
      "parent_context": "I watched ur lecturer for the first time and I was literally stunned seeing that how can a teacher teach so well?🤩"
    },
    {
      "comment_id": "UgxSBJr_lhYIJyBMuud4AaABAg.9Dv0rqbAQlR9HPx6s7byfL",
      "parent_id": "UgxSBJr_lhYIJyBMuud4AaABAg",
      "comment_type": "reply",
      "author": "@ashityadav649",
      "likes": 1,
      "published_at": "2020-12-18T15:37:53Z",
      "timestamp_refs": [],
      "text": "Yeah right",
      "parent_context": "I watched ur lecturer for the first time and I was literally stunned seeing that how can a teacher teach so well?🤩"
    },
    {
      "comment_id": "UgxSBJr_lhYIJyBMuud4AaABAg.9Dv0rqbAQlR9HqDzLK1sIa",
      "parent_id": "UgxSBJr_lhYIJyBMuud4AaABAg",
      "comment_type": "reply",
      "author": "@muzafarahmad2489",
      "likes": 1,
      "published_at": "2020-12-29T05:53:30Z",
      "timestamp_refs": [],
      "text": "@ArunSharma-ii9ry 😂😂",
      "parent_context": "I watched ur lecturer for the first time and I was literally stunned seeing that how can a teacher teach so well?🤩"
    },
    {
      "comment_id": "UgxSBJr_lhYIJyBMuud4AaABAg.9Dv0rqbAQlR9HvB8vSFhUj",
      "parent_id": "UgxSBJr_lhYIJyBMuud4AaABAg",
      "comment_type": "reply",
      "author": "@aroopkumarbhattacharya3237",
      "likes": 1,
      "published_at": "2020-12-31T04:04:56Z",
      "timestamp_refs": [],
      "text": "Now are u ok or still stunned😂😂",
      "parent_context": "I watched ur lecturer for the first time and I was literally stunned seeing that how can a teacher teach so well?🤩"
    },
    {
      "comment_id": "UgxSBJr_lhYIJyBMuud4AaABAg.9Dv0rqbAQlR9I5YsSx_DZw",
      "parent_id": "UgxSBJr_lhYIJyBMuud4AaABAg",
      "comment_type": "reply",
      "author": "@bshsksieshsbbsj3626",
      "likes": 1,
      "published_at": "2021-01-04T14:03:55Z",
      "timestamp_refs": [],
      "text": "He teach so well that's why he is a teacher.",
      "parent_context": "I watched ur lecturer for the first time and I was literally stunned seeing that how can a teacher teach so well?🤩"
    },
    {
      "comment_id": "UgxSBJr_lhYIJyBMuud4AaABAg.9Dv0rqbAQlR9IFoaYA6a2m",
      "parent_id": "UgxSBJr_lhYIJyBMuud4AaABAg",
      "comment_type": "reply",
      "author": "@anchalpandeyridhi8450",
      "likes": 1,
      "published_at": "2021-01-08T13:42:25Z",
      "timestamp_refs": [],
      "text": "Really good",
      "parent_context": "I watched ur lecturer for the first time and I was literally stunned seeing that how can a teacher teach so well?🤩"
    },
    {
      "comment_id": "UgxSBJr_lhYIJyBMuud4AaABAg.9Dv0rqbAQlR9IReNwgdJvD",
      "parent_id": "UgxSBJr_lhYIJyBMuud4AaABAg",
      "comment_type": "reply",
      "author": "@Karamjeet_11",
      "likes": 2,
      "published_at": "2021-01-13T04:04:04Z",
      "timestamp_refs": [],
      "text": "@Sneha-fo5bf who is more in your life....",
      "parent_context": "I watched ur lecturer for the first time and I was literally stunned seeing that how can a teacher teach so well?🤩"
    },
    {
      "comment_id": "UgxSBJr_lhYIJyBMuud4AaABAg.9Dv0rqbAQlR9JPazq1ySrT",
      "parent_id": "UgxSBJr_lhYIJyBMuud4AaABAg",
      "comment_type": "reply",
      "author": "@atif90",
      "likes": 0,
      "published_at": "2021-02-06T05:27:20Z",
      "timestamp_refs": [],
      "text": "Yeahh",
      "parent_context": "I watched ur lecturer for the first time and I was literally stunned seeing that how can a teacher teach so well?🤩"
    },
    {
      "comment_id": "UgxSBJr_lhYIJyBMuud4AaABAg.9Dv0rqbAQlR9KtlJkzh7ui",
      "parent_id": "UgxSBJr_lhYIJyBMuud4AaABAg",
      "comment_type": "reply",
      "author": "@mohanshah4289",
      "likes": 0,
      "published_at": "2021-03-15T04:25:26Z",
      "timestamp_refs": [],
      "text": "Yeah true..",
      "parent_context": "I watched ur lecturer for the first time and I was literally stunned seeing that how can a teacher teach so well?🤩"
    },
    {
      "comment_id": "UgxSBJr_lhYIJyBMuud4AaABAg.9Dv0rqbAQlR9MHGNtCAfzW",
      "parent_id": "UgxSBJr_lhYIJyBMuud4AaABAg",
      "comment_type": "reply",
      "author": "@nafisaparveen4275",
      "likes": 3,
      "published_at": "2021-04-18T13:18:47Z",
      "timestamp_refs": [],
      "text": "I think this is the luckiest day for u to discover this golden channel...i feel myself to be so lucky to get his teachings!!💘",
      "parent_context": "I watched ur lecturer for the first time and I was literally stunned seeing that how can a teacher teach so well?🤩"
    },
    {
      "comment_id": "UgxSBJr_lhYIJyBMuud4AaABAg.9Dv0rqbAQlR9MLHX_POBud",
      "parent_id": "UgxSBJr_lhYIJyBMuud4AaABAg",
      "comment_type": "reply",
      "author": "@CozyBeats-i9jk",
      "likes": 0,
      "published_at": "2021-04-20T02:45:48Z",
      "timestamp_refs": [],
      "text": "Nice compliment 🤣🤣",
      "parent_context": "I watched ur lecturer for the first time and I was literally stunned seeing that how can a teacher teach so well?🤩"
    },
    {
      "comment_id": "UgxSBJr_lhYIJyBMuud4AaABAg.9Dv0rqbAQlR9NsyQmLcYXp",
      "parent_id": "UgxSBJr_lhYIJyBMuud4AaABAg",
      "comment_type": "reply",
      "author": "@unknown7340",
      "likes": 2,
      "published_at": "2021-05-28T10:34:55Z",
      "timestamp_refs": [],
      "text": "Obviously Teacher can teach so well not a barbar or anyone else..😒😒",
      "parent_context": "I watched ur lecturer for the first time and I was literally stunned seeing that how can a teacher teach so well?🤩"
    },
    {
      "comment_id": "UgxSBJr_lhYIJyBMuud4AaABAg.9Dv0rqbAQlR9Nt-Wpj3zsW",
      "parent_id": "UgxSBJr_lhYIJyBMuud4AaABAg",
      "comment_type": "reply",
      "author": "@nafisaparveen4275",
      "likes": 0,
      "published_at": "2021-05-28T10:53:14Z",
      "timestamp_refs": [],
      "text": "@unknown7340 actually he meant to say that no other teacher except hik can teach so well...with FEEL!",
      "parent_context": "I watched ur lecturer for the first time and I was literally stunned seeing that how can a teacher teach so well?🤩"
    },
    {
      "comment_id": "UgxSBJr_lhYIJyBMuud4AaABAg.9Dv0rqbAQlR9Nt38fKwcBI",
      "parent_id": "UgxSBJr_lhYIJyBMuud4AaABAg",
      "comment_type": "reply",
      "author": "@unknown7340",
      "likes": 0,
      "published_at": "2021-05-28T11:24:53Z",
      "timestamp_refs": [],
      "text": "@nafisaparveen4275 No he/she doesn't mean that..",
      "parent_context": "I watched ur lecturer for the first time and I was literally stunned seeing that how can a teacher teach so well?🤩"
    },
    {
      "comment_id": "UgxSBJr_lhYIJyBMuud4AaABAg.9Dv0rqbAQlR9NtALZgFbhz",
      "parent_id": "UgxSBJr_lhYIJyBMuud4AaABAg",
      "comment_type": "reply",
      "author": "@nafisaparveen4275",
      "likes": 0,
      "published_at": "2021-05-28T12:27:48Z",
      "timestamp_refs": [],
      "text": "@unknown7340 but i think so🤔",
      "parent_context": "I watched ur lecturer for the first time and I was literally stunned seeing that how can a teacher teach so well?🤩"
    },
    {
      "comment_id": "UgxSBJr_lhYIJyBMuud4AaABAg.9Dv0rqbAQlR9NtD9G_yVVL",
      "parent_id": "UgxSBJr_lhYIJyBMuud4AaABAg",
      "comment_type": "reply",
      "author": "@unknown7340",
      "likes": 0,
      "published_at": "2021-05-28T12:52:21Z",
      "timestamp_refs": [],
      "text": "@nafisaparveen4275 but I don't think so.",
      "parent_context": "I watched ur lecturer for the first time and I was literally stunned seeing that how can a teacher teach so well?🤩"
    },
    {
      "comment_id": "UgxSBJr_lhYIJyBMuud4AaABAg.9Dv0rqbAQlR9NtDGCnixlk",
      "parent_id": "UgxSBJr_lhYIJyBMuud4AaABAg",
      "comment_type": "reply",
      "author": "@unknown7340",
      "likes": 0,
      "published_at": "2021-05-28T12:53:17Z",
      "timestamp_refs": [],
      "text": "@nafisaparveen4275 well no problem...leave this topic here..",
      "parent_context": "I watched ur lecturer for the first time and I was literally stunned seeing that how can a teacher teach so well?🤩"
    },
    {
      "comment_id": "UgxSBJr_lhYIJyBMuud4AaABAg.9Dv0rqbAQlR9O2J4cIfrOR",
      "parent_id": "UgxSBJr_lhYIJyBMuud4AaABAg",
      "comment_type": "reply",
      "author": "@raisahmadansari5436",
      "likes": 0,
      "published_at": "2021-06-01T10:56:33Z",
      "timestamp_refs": [],
      "text": "@user-ki6pt2zg1h are kehna kya chahte ho",
      "parent_context": "I watched ur lecturer for the first time and I was literally stunned seeing that how can a teacher teach so well?🤩"
    },
    {
      "comment_id": "UgxSBJr_lhYIJyBMuud4AaABAg.9Dv0rqbAQlR9OUMiC6uwSJ",
      "parent_id": "UgxSBJr_lhYIJyBMuud4AaABAg",
      "comment_type": "reply",
      "author": "@ziahidurrohman7171",
      "likes": 1,
      "published_at": "2021-06-12T08:27:02Z",
      "timestamp_refs": [],
      "text": "He has to because there are still students like you who spell 'Lecture' as 'Lecturer'🤣",
      "parent_context": "I watched ur lecturer for the first time and I was literally stunned seeing that how can a teacher teach so well?🤩"
    },
    {
      "comment_id": "UgxSBJr_lhYIJyBMuud4AaABAg.9Dv0rqbAQlR9PNxhDb3lFl",
      "parent_id": "UgxSBJr_lhYIJyBMuud4AaABAg",
      "comment_type": "reply",
      "author": "@itsmesagar5548",
      "likes": 1,
      "published_at": "2021-07-04T17:15:40Z",
      "timestamp_refs": [],
      "text": "Definitely",
      "parent_context": "I watched ur lecturer for the first time and I was literally stunned seeing that how can a teacher teach so well?🤩"
    },
    {
      "comment_id": "UgxSBJr_lhYIJyBMuud4AaABAg.9Dv0rqbAQlR9RU6smkgHoY",
      "parent_id": "UgxSBJr_lhYIJyBMuud4AaABAg",
      "comment_type": "reply",
      "author": "@suyashbhardwajpathak5520",
      "likes": 0,
      "published_at": "2021-08-25T19:42:51Z",
      "timestamp_refs": [],
      "text": "@abhishekchaudhary8544 exactly dude",
      "parent_context": "I watched ur lecturer for the first time and I was literally stunned seeing that how can a teacher teach so well?🤩"
    },
    {
      "comment_id": "UgxSBJr_lhYIJyBMuud4AaABAg.9Dv0rqbAQlR9TOltyPfg7K",
      "parent_id": "UgxSBJr_lhYIJyBMuud4AaABAg",
      "comment_type": "reply",
      "author": "@himanshisoni6237",
      "likes": 0,
      "published_at": "2021-10-12T10:57:21Z",
      "timestamp_refs": [],
      "text": "because alakh sir is very expreinced teacher",
      "parent_context": "I watched ur lecturer for the first time and I was literally stunned seeing that how can a teacher teach so well?🤩"
    },
    {
      "comment_id": "UgxSBJr_lhYIJyBMuud4AaABAg.9Dv0rqbAQlR9UErzmcoGF0",
      "parent_id": "UgxSBJr_lhYIJyBMuud4AaABAg",
      "comment_type": "reply",
      "author": "@harshadchavan8456",
      "likes": 1,
      "published_at": "2021-11-02T11:09:34Z",
      "timestamp_refs": [],
      "text": "Perfect teacher for weak students",
      "parent_context": "I watched ur lecturer for the first time and I was literally stunned seeing that how can a teacher teach so well?🤩"
    },
    {
      "comment_id": "UgxSBJr_lhYIJyBMuud4AaABAg.9Dv0rqbAQlR9W2h8En6fPd",
      "parent_id": "UgxSBJr_lhYIJyBMuud4AaABAg",
      "comment_type": "reply",
      "author": "@kashineer2665",
      "likes": 0,
      "published_at": "2021-12-17T10:46:39Z",
      "timestamp_refs": [],
      "text": "Teacher's work is teaching what are you even talking about 😂🤣",
      "parent_context": "I watched ur lecturer for the first time and I was literally stunned seeing that how can a teacher teach so well?🤩"
    },
    {
      "comment_id": "UgxSBJr_lhYIJyBMuud4AaABAg.9Dv0rqbAQlR9WT56BoMddw",
      "parent_id": "UgxSBJr_lhYIJyBMuud4AaABAg",
      "comment_type": "reply",
      "author": "@hamidakhatoon1824",
      "likes": 1,
      "published_at": "2021-12-27T16:45:04Z",
      "timestamp_refs": [],
      "text": "Haaaa",
      "parent_context": "I watched ur lecturer for the first time and I was literally stunned seeing that how can a teacher teach so well?🤩"
    },
    {
      "comment_id": "UgxSBJr_lhYIJyBMuud4AaABAg.9Dv0rqbAQlR9WT59ffCqOO",
      "parent_id": "UgxSBJr_lhYIJyBMuud4AaABAg",
      "comment_type": "reply",
      "author": "@hamidakhatoon1824",
      "likes": 1,
      "published_at": "2021-12-27T16:45:33Z",
      "timestamp_refs": [],
      "text": "Yes this sir is a very great",
      "parent_context": "I watched ur lecturer for the first time and I was literally stunned seeing that how can a teacher teach so well?🤩"
    },
    {
      "comment_id": "UgxSBJr_lhYIJyBMuud4AaABAg.9Dv0rqbAQlR9WT5IEELzwv",
      "parent_id": "UgxSBJr_lhYIJyBMuud4AaABAg",
      "comment_type": "reply",
      "author": "@hamidakhatoon1824",
      "likes": 0,
      "published_at": "2021-12-27T16:46:43Z",
      "timestamp_refs": [],
      "text": "He knows what is the weack",
      "parent_context": "I watched ur lecturer for the first time and I was literally stunned seeing that how can a teacher teach so well?🤩"
    },
    {
      "comment_id": "UgxSBJr_lhYIJyBMuud4AaABAg.9Dv0rqbAQlR9ZY0A3RA-2G",
      "parent_id": "UgxSBJr_lhYIJyBMuud4AaABAg",
      "comment_type": "reply",
      "author": "@MIRMEHVISH0140",
      "likes": 0,
      "published_at": "2022-03-14T04:12:18Z",
      "timestamp_refs": [],
      "text": "Plzz tell me in video ma neet ka be sara cover hota ha",
      "parent_context": "I watched ur lecturer for the first time and I was literally stunned seeing that how can a teacher teach so well?🤩"
    },
    {
      "comment_id": "UgxSBJr_lhYIJyBMuud4AaABAg.9Dv0rqbAQlR9fT1DmeCkuf",
      "parent_id": "UgxSBJr_lhYIJyBMuud4AaABAg",
      "comment_type": "reply",
      "author": "@utkarshsingh864",
      "likes": 0,
      "published_at": "2022-09-02T05:25:06Z",
      "timestamp_refs": [],
      "text": "Lecture spelling is wrong",
      "parent_context": "I watched ur lecturer for the first time and I was literally stunned seeing that how can a teacher teach so well?🤩"
    },
    {
      "comment_id": "UgxSBJr_lhYIJyBMuud4AaABAg.9Dv0rqbAQlR9kT7azfjF1S",
      "parent_id": "UgxSBJr_lhYIJyBMuud4AaABAg",
      "comment_type": "reply",
      "author": "@kshitijgahlawat6854",
      "likes": 0,
      "published_at": "2023-01-04T12:57:48Z",
      "timestamp_refs": [],
      "text": "@Sneha-fo5bf can you please tell me meaning of seldom 😢",
      "parent_context": "I watched ur lecturer for the first time and I was literally stunned seeing that how can a teacher teach so well?🤩"
    },
    {
      "comment_id": "UgxSBJr_lhYIJyBMuud4AaABAg.9Dv0rqbAQlR9qm0usFxL4m",
      "parent_id": "UgxSBJr_lhYIJyBMuud4AaABAg",
      "comment_type": "reply",
      "author": "@rudra5503",
      "likes": 0,
      "published_at": "2023-06-10T09:32:31Z",
      "timestamp_refs": [],
      "text": "​@-AARUSHSHARMA--I hlo wassup what are you doing right now",
      "parent_context": "I watched ur lecturer for the first time and I was literally stunned seeing that how can a teacher teach so well?🤩"
    },
    {
      "comment_id": "UgxSBJr_lhYIJyBMuud4AaABAg.9Dv0rqbAQlR9tM-8_Yktqk",
      "parent_id": "UgxSBJr_lhYIJyBMuud4AaABAg",
      "comment_type": "reply",
      "author": "@disharudraa8714",
      "likes": 0,
      "published_at": "2023-08-13T11:11:45Z",
      "timestamp_refs": [],
      "text": "same duh",
      "parent_context": "I watched ur lecturer for the first time and I was literally stunned seeing that how can a teacher teach so well?🤩"
    },
    {
      "comment_id": "UgykKE226zNhhVXxnhB4AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@pradipsahu2275",
      "likes": 527,
      "published_at": "2020-09-08T11:19:54Z",
      "timestamp_refs": [
        "2:16",
        "3:14",
        "6:27",
        "9:00",
        "10:44",
        "13:00",
        "17:53",
        "18:29",
        "20:48",
        "23:47"
      ],
      "text": "Sahi baat 2:16 Why electrostatic bond 3:14 Lewis dot structure 6:27 Electrovalency 9:00 10:44 Energy terms and favourable conditions 13:00 17:53 Which is more ionic 18:29 Properties of ionic compound 20:48 23:47",
      "parent_context": ""
    },
    {
      "comment_id": "UgykKE226zNhhVXxnhB4AaABAg.9DLQIvBNRhU9fcFSHoPql4",
      "parent_id": "UgykKE226zNhhVXxnhB4AaABAg",
      "comment_type": "reply",
      "author": "@aryanchatterjee5826",
      "likes": 7,
      "published_at": "2022-09-06T04:41:49Z",
      "timestamp_refs": [],
      "text": "thankyou my friend!",
      "parent_context": "Sahi baat 2:16 Why electrostatic bond 3:14 Lewis dot structure 6:27 Electrovalency 9:00 10:44 Energy terms and favourable conditions 13:00 17:53 Which is more ionic 18:29 Properties of ionic compound 20:48 23:47"
    },
    {
      "comment_id": "UgykKE226zNhhVXxnhB4AaABAg.9DLQIvBNRhU9frstI4PxGp",
      "parent_id": "UgykKE226zNhhVXxnhB4AaABAg",
      "comment_type": "reply",
      "author": "@krish___ig",
      "likes": 11,
      "published_at": "2022-09-12T06:23:46Z",
      "timestamp_refs": [],
      "text": "Sahi Baat 😂❤️",
      "parent_context": "Sahi baat 2:16 Why electrostatic bond 3:14 Lewis dot structure 6:27 Electrovalency 9:00 10:44 Energy terms and favourable conditions 13:00 17:53 Which is more ionic 18:29 Properties of ionic compound 20:48 23:47"
    },
    {
      "comment_id": "UgykKE226zNhhVXxnhB4AaABAg.9DLQIvBNRhUABAMIrRWHXO",
      "parent_id": "UgykKE226zNhhVXxnhB4AaABAg",
      "comment_type": "reply",
      "author": "@lakshankaarthiksmusicaljou7259",
      "likes": 0,
      "published_at": "2024-11-23T04:39:44Z",
      "timestamp_refs": [],
      "text": "Sahi baat!!!",
      "parent_context": "Sahi baat 2:16 Why electrostatic bond 3:14 Lewis dot structure 6:27 Electrovalency 9:00 10:44 Energy terms and favourable conditions 13:00 17:53 Which is more ionic 18:29 Properties of ionic compound 20:48 23:47"
    },
    {
      "comment_id": "UgykKE226zNhhVXxnhB4AaABAg.9DLQIvBNRhUABIHfgds9Ec",
      "parent_id": "UgykKE226zNhhVXxnhB4AaABAg",
      "comment_type": "reply",
      "author": "@Masterbeast-cn6",
      "likes": 0,
      "published_at": "2024-11-26T06:33:14Z",
      "timestamp_refs": [],
      "text": "Helpfull 😅",
      "parent_context": "Sahi baat 2:16 Why electrostatic bond 3:14 Lewis dot structure 6:27 Electrovalency 9:00 10:44 Energy terms and favourable conditions 13:00 17:53 Which is more ionic 18:29 Properties of ionic compound 20:48 23:47"
    },
    {
      "comment_id": "UgwVDzD3ZKtIVw7JX9J4AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@physics6056",
      "likes": 767,
      "published_at": "2020-11-11T12:27:00Z",
      "timestamp_refs": [],
      "text": "There is no doubt Alakh Sir is legend .... 🙂🙂 He is the only teacher who know the weak point of students 😎😎",
      "parent_context": ""
    },
    {
      "comment_id": "UgwVDzD3ZKtIVw7JX9J4AaABAg.9FvKrPQuig79L0d7Hnodld",
      "parent_id": "UgwVDzD3ZKtIVw7JX9J4AaABAg",
      "comment_type": "reply",
      "author": "@educatep214",
      "likes": 5,
      "published_at": "2021-03-18T05:47:45Z",
      "timestamp_refs": [],
      "text": "I have a doubt......... In isomorphism sir said that NaCl and MgCl are same but the formula for magnesium chloride is MgCl2 then why are they same ??",
      "parent_context": "There is no doubt Alakh Sir is legend .... 🙂🙂 He is the only teacher who know the weak point of students 😎😎"
    },
    {
      "comment_id": "UgwVDzD3ZKtIVw7JX9J4AaABAg.9FvKrPQuig79LY2v0PY20a",
      "parent_id": "UgwVDzD3ZKtIVw7JX9J4AaABAg",
      "comment_type": "reply",
      "author": "@ManmeetSingh-if7my",
      "likes": 5,
      "published_at": "2021-03-31T05:16:48Z",
      "timestamp_refs": [],
      "text": "@educatep214 they form ionic bond you take it to wrong sense na also loose , mg loose 2 so cl 2 in the formula mgcl2",
      "parent_context": "There is no doubt Alakh Sir is legend .... 🙂🙂 He is the only teacher who know the weak point of students 😎😎"
    },
    {
      "comment_id": "UgwVDzD3ZKtIVw7JX9J4AaABAg.9FvKrPQuig79UsGYrj3k8h",
      "parent_id": "UgwVDzD3ZKtIVw7JX9J4AaABAg",
      "comment_type": "reply",
      "author": "@harshvardhansingh8529",
      "likes": 1,
      "published_at": "2021-11-18T03:42:34Z",
      "timestamp_refs": [],
      "text": "A lakh",
      "parent_context": "There is no doubt Alakh Sir is legend .... 🙂🙂 He is the only teacher who know the weak point of students 😎😎"
    },
    {
      "comment_id": "UgwVDzD3ZKtIVw7JX9J4AaABAg.9FvKrPQuig79VFnoaiQ5ey",
      "parent_id": "UgwVDzD3ZKtIVw7JX9J4AaABAg",
      "comment_type": "reply",
      "author": "@JigsaW-goat",
      "likes": 1,
      "published_at": "2021-11-27T16:23:44Z",
      "timestamp_refs": [],
      "text": "Experience ka chakkar h babu bhaiya😎",
      "parent_context": "There is no doubt Alakh Sir is legend .... 🙂🙂 He is the only teacher who know the weak point of students 😎😎"
    },
    {
      "comment_id": "UgwVDzD3ZKtIVw7JX9J4AaABAg.9FvKrPQuig79_Roudwfr77",
      "parent_id": "UgwVDzD3ZKtIVw7JX9J4AaABAg",
      "comment_type": "reply",
      "author": "@mr.dorling6794",
      "likes": 1,
      "published_at": "2022-04-05T15:01:09Z",
      "timestamp_refs": [],
      "text": "@JigsaW-goat support please",
      "parent_context": "There is no doubt Alakh Sir is legend .... 🙂🙂 He is the only teacher who know the weak point of students 😎😎"
    },
    {
      "comment_id": "UgwVDzD3ZKtIVw7JX9J4AaABAg.9FvKrPQuig79hIdLmATsIr",
      "parent_id": "UgwVDzD3ZKtIVw7JX9J4AaABAg",
      "comment_type": "reply",
      "author": "@ivythedazzlinggirl2289",
      "likes": 0,
      "published_at": "2022-10-17T21:38:07Z",
      "timestamp_refs": [
        "26:36",
        "26:47"
      ],
      "text": "Yaar help Karo, mujhe Hindi perfectly nai samaj aati, can ANYONE tell what sir said at timestamp 26:36 ?? \"Ionic compounds _____ math karna isomerism ki\" Aur yaha 26:47 mey single molecule ______ ??",
      "parent_context": "There is no doubt Alakh Sir is legend .... 🙂🙂 He is the only teacher who know the weak point of students 😎😎"
    },
    {
      "comment_id": "UgwVDzD3ZKtIVw7JX9J4AaABAg.9FvKrPQuig79inzBvCoOvF",
      "parent_id": "UgwVDzD3ZKtIVw7JX9J4AaABAg",
      "comment_type": "reply",
      "author": "@jee_aspirant-Yugank",
      "likes": 0,
      "published_at": "2022-11-24T07:36:06Z",
      "timestamp_refs": [],
      "text": "I agree so much..",
      "parent_context": "There is no doubt Alakh Sir is legend .... 🙂🙂 He is the only teacher who know the weak point of students 😎😎"
    },
    {
      "comment_id": "UgwVDzD3ZKtIVw7JX9J4AaABAg.9FvKrPQuig7AXapYzKPQVj",
      "parent_id": "UgwVDzD3ZKtIVw7JX9J4AaABAg",
      "comment_type": "reply",
      "author": "@NayanKankal-s8o",
      "likes": 0,
      "published_at": "2026-06-03T16:14:15Z",
      "timestamp_refs": [],
      "text": "Correct bhao",
      "parent_context": "There is no doubt Alakh Sir is legend .... 🙂🙂 He is the only teacher who know the weak point of students 😎😎"
    },
    {
      "comment_id": "UgyTN0sfo9V0UJbkX1F4AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@torn_7654",
      "likes": 19,
      "published_at": "2026-04-03T17:04:45Z",
      "timestamp_refs": [],
      "text": "Video may be 7 years old but quality is same",
      "parent_context": ""
    },
    {
      "comment_id": "UgyTN0sfo9V0UJbkX1F4AaABAg.AV8qqXjvrJOAYVeV03Cq9w",
      "parent_id": "UgyTN0sfo9V0UJbkX1F4AaABAg",
      "comment_type": "reply",
      "author": "@Jimina-s7d",
      "likes": 0,
      "published_at": "2026-06-26T03:13:32Z",
      "timestamp_refs": [],
      "text": "Ikr it’s the best",
      "parent_context": "Video may be 7 years old but quality is same"
    },
    {
      "comment_id": "UgyTN0sfo9V0UJbkX1F4AaABAg.AV8qqXjvrJOAYcjhqhBQg7",
      "parent_id": "UgyTN0sfo9V0UJbkX1F4AaABAg",
      "comment_type": "reply",
      "author": "@Hanakosanunderbed",
      "likes": 0,
      "published_at": "2026-06-29T06:33:02Z",
      "timestamp_refs": [],
      "text": "better than most recent pw lectures too",
      "parent_context": "Video may be 7 years old but quality is same"
    },
    {
      "comment_id": "Ugy0LHDXmvzSip-Ql6Z4AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@sangeetatiwari6121",
      "likes": 935,
      "published_at": "2018-08-28T16:29:11Z",
      "timestamp_refs": [],
      "text": "Awesome....he has never asked for subscription!!......thn too giving away excellent lectures for students",
      "parent_context": ""
    },
    {
      "comment_id": "Ugy0LHDXmvzSip-Ql6Z4AaABAg.8kVNrt5nS5f8xnqppjeSUy",
      "parent_id": "Ugy0LHDXmvzSip-Ql6Z4AaABAg",
      "comment_type": "reply",
      "author": "@darshaksanghavi1369",
      "likes": 14,
      "published_at": "2019-07-25T08:44:44Z",
      "timestamp_refs": [],
      "text": "yeah you are right..!..where are you from btw..?",
      "parent_context": "Awesome....he has never asked for subscription!!......thn too giving away excellent lectures for students"
    },
    {
      "comment_id": "Ugy0LHDXmvzSip-Ql6Z4AaABAg.8kVNrt5nS5f9-TVVi5IcfY",
      "parent_id": "Ugy0LHDXmvzSip-Ql6Z4AaABAg",
      "comment_type": "reply",
      "author": "@artivity5094",
      "likes": 12,
      "published_at": "2019-09-29T15:19:44Z",
      "timestamp_refs": [],
      "text": "Nice observation",
      "parent_context": "Awesome....he has never asked for subscription!!......thn too giving away excellent lectures for students"
    },
    {
      "comment_id": "Ugy0LHDXmvzSip-Ql6Z4AaABAg.8kVNrt5nS5f9Cys0f09oK7",
      "parent_id": "Ugy0LHDXmvzSip-Ql6Z4AaABAg",
      "comment_type": "reply",
      "author": "@samreetchahal8980",
      "likes": 4,
      "published_at": "2020-08-30T07:49:02Z",
      "timestamp_refs": [],
      "text": "True 👍🏻🤞🏻",
      "parent_context": "Awesome....he has never asked for subscription!!......thn too giving away excellent lectures for students"
    },
    {
      "comment_id": "Ugy0LHDXmvzSip-Ql6Z4AaABAg.8kVNrt5nS5f9DV-oB-52d-",
      "parent_id": "Ugy0LHDXmvzSip-Ql6Z4AaABAg",
      "comment_type": "reply",
      "author": "@yatikakushwaha2003",
      "likes": 4,
      "published_at": "2020-09-12T04:40:47Z",
      "timestamp_refs": [],
      "text": "Yeahh!!!.....He's the bestt😃😃",
      "parent_context": "Awesome....he has never asked for subscription!!......thn too giving away excellent lectures for students"
    },
    {
      "comment_id": "Ugy0LHDXmvzSip-Ql6Z4AaABAg.8kVNrt5nS5f9DVkC2a6Vbs",
      "parent_id": "Ugy0LHDXmvzSip-Ql6Z4AaABAg",
      "comment_type": "reply",
      "author": "@abhigyansangeet",
      "likes": 11,
      "published_at": "2020-09-12T11:34:52Z",
      "timestamp_refs": [],
      "text": "@KuldeepSingh-ws9ch video samjh le.... Galati baad mein nikalna. Log like kamate hain, tu insults kamaayega. \"Praising and correcting is good than criticising someone.\" Once take a look at your own deeds.",
      "parent_context": "Awesome....he has never asked for subscription!!......thn too giving away excellent lectures for students"
    },
    {
      "comment_id": "Ugy0LHDXmvzSip-Ql6Z4AaABAg.8kVNrt5nS5f9DWfmQt1R2H",
      "parent_id": "Ugy0LHDXmvzSip-Ql6Z4AaABAg",
      "comment_type": "reply",
      "author": "@urmeeghosh9164",
      "likes": 5,
      "published_at": "2020-09-12T20:15:31Z",
      "timestamp_refs": [],
      "text": "I agree!",
      "parent_context": "Awesome....he has never asked for subscription!!......thn too giving away excellent lectures for students"
    },
    {
      "comment_id": "Ugy0LHDXmvzSip-Ql6Z4AaABAg.8kVNrt5nS5f9DXlmnC8_Z1",
      "parent_id": "Ugy0LHDXmvzSip-Ql6Z4AaABAg",
      "comment_type": "reply",
      "author": "@anmolsinha6538",
      "likes": 4,
      "published_at": "2020-09-13T06:27:14Z",
      "timestamp_refs": [],
      "text": "That's why he is Alakh pandey.",
      "parent_context": "Awesome....he has never asked for subscription!!......thn too giving away excellent lectures for students"
    },
    {
      "comment_id": "Ugy0LHDXmvzSip-Ql6Z4AaABAg.8kVNrt5nS5f9D_o8oyPW_4",
      "parent_id": "Ugy0LHDXmvzSip-Ql6Z4AaABAg",
      "comment_type": "reply",
      "author": "@kiranpurshwani2444",
      "likes": 3,
      "published_at": "2020-09-14T10:45:35Z",
      "timestamp_refs": [],
      "text": "@anmolsinha6538 exactly!!! 😊",
      "parent_context": "Awesome....he has never asked for subscription!!......thn too giving away excellent lectures for students"
    },
    {
      "comment_id": "Ugy0LHDXmvzSip-Ql6Z4AaABAg.8kVNrt5nS5f9Dm0lD53hbi",
      "parent_id": "Ugy0LHDXmvzSip-Ql6Z4AaABAg",
      "comment_type": "reply",
      "author": "@parvgarg3558",
      "likes": 3,
      "published_at": "2020-09-19T04:35:26Z",
      "timestamp_refs": [],
      "text": "@KuldeepSingh-ws9ch chup Bevkoof",
      "parent_context": "Awesome....he has never asked for subscription!!......thn too giving away excellent lectures for students"
    },
    {
      "comment_id": "Ugy0LHDXmvzSip-Ql6Z4AaABAg.8kVNrt5nS5f9E48WPGpUCo",
      "parent_id": "Ugy0LHDXmvzSip-Ql6Z4AaABAg",
      "comment_type": "reply",
      "author": "@kartikeynigam",
      "likes": 4,
      "published_at": "2020-09-26T14:48:45Z",
      "timestamp_refs": [],
      "text": "koi mera senior h kya salah dene ke liye",
      "parent_context": "Awesome....he has never asked for subscription!!......thn too giving away excellent lectures for students"
    },
    {
      "comment_id": "Ugy0LHDXmvzSip-Ql6Z4AaABAg.8kVNrt5nS5f9ERVU1FsCG2",
      "parent_id": "Ugy0LHDXmvzSip-Ql6Z4AaABAg",
      "comment_type": "reply",
      "author": "@b.nikhilshetty3393",
      "likes": 2,
      "published_at": "2020-10-05T16:31:56Z",
      "timestamp_refs": [],
      "text": "Nija(true)",
      "parent_context": "Awesome....he has never asked for subscription!!......thn too giving away excellent lectures for students"
    },
    {
      "comment_id": "Ugy0LHDXmvzSip-Ql6Z4AaABAg.8kVNrt5nS5fARsbKdJxLv2",
      "parent_id": "Ugy0LHDXmvzSip-Ql6Z4AaABAg",
      "comment_type": "reply",
      "author": "@buriburizaeomon",
      "likes": 0,
      "published_at": "2026-01-12T10:47:55Z",
      "timestamp_refs": [],
      "text": "i also never subscribed",
      "parent_context": "Awesome....he has never asked for subscription!!......thn too giving away excellent lectures for students"
    },
    {
      "comment_id": "Ugyx0ZilW2Jj90B0eV94AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@ayushverma6135",
      "likes": 382,
      "published_at": "2022-11-15T07:47:22Z",
      "timestamp_refs": [],
      "text": "my brother got 640 marks in neet 22 and usne bola chemical bonding pura alakh sir se hi karna so i'm here thank you alakh sir",
      "parent_context": ""
    },
    {
      "comment_id": "Ugyx0ZilW2Jj90B0eV94AaABAg.9iRpKWJ5Ifv9m-CfrxAvYP",
      "parent_id": "Ugyx0ZilW2Jj90B0eV94AaABAg",
      "comment_type": "reply",
      "author": "@khansajida170",
      "likes": 8,
      "published_at": "2023-02-11T15:07:44Z",
      "timestamp_refs": [],
      "text": "Hii can i ask u some quetions ?",
      "parent_context": "my brother got 640 marks in neet 22 and usne bola chemical bonding pura alakh sir se hi karna so i'm here thank you alakh sir"
    },
    {
      "comment_id": "Ugyx0ZilW2Jj90B0eV94AaABAg.9iRpKWJ5Ifv9tM95bAdQjV",
      "parent_id": "Ugyx0ZilW2Jj90B0eV94AaABAg",
      "comment_type": "reply",
      "author": "@Sachingupta51289",
      "likes": 35,
      "published_at": "2023-08-13T12:38:43Z",
      "timestamp_refs": [],
      "text": "​@Chirag_26..oh so how many times your cracked NEET? 😌😌",
      "parent_context": "my brother got 640 marks in neet 22 and usne bola chemical bonding pura alakh sir se hi karna so i'm here thank you alakh sir"
    },
    {
      "comment_id": "Ugyx0ZilW2Jj90B0eV94AaABAg.9iRpKWJ5Ifv9u562gv--6B",
      "parent_id": "Ugyx0ZilW2Jj90B0eV94AaABAg",
      "comment_type": "reply",
      "author": "@Vaishnavi_Yt_eho",
      "likes": 2,
      "published_at": "2023-08-31T18:16:26Z",
      "timestamp_refs": [],
      "text": "App ise judge nahi kr sakte ki kya simple h aur kya difficult",
      "parent_context": "my brother got 640 marks in neet 22 and usne bola chemical bonding pura alakh sir se hi karna so i'm here thank you alakh sir"
    },
    {
      "comment_id": "Ugyx0ZilW2Jj90B0eV94AaABAg.9iRpKWJ5Ifv9uCYqjkBrQ_",
      "parent_id": "Ugyx0ZilW2Jj90B0eV94AaABAg",
      "comment_type": "reply",
      "author": "@user-wk7hi1mm5f",
      "likes": 0,
      "published_at": "2023-09-03T15:42:45Z",
      "timestamp_refs": [],
      "text": "bro@Sachingupta51289",
      "parent_context": "my brother got 640 marks in neet 22 and usne bola chemical bonding pura alakh sir se hi karna so i'm here thank you alakh sir"
    },
    {
      "comment_id": "Ugyx0ZilW2Jj90B0eV94AaABAg.9iRpKWJ5IfvA7mzl1Reym8",
      "parent_id": "Ugyx0ZilW2Jj90B0eV94AaABAg",
      "comment_type": "reply",
      "author": "@divyabharti8642",
      "likes": 1,
      "published_at": "2024-08-31T03:58:03Z",
      "timestamp_refs": [],
      "text": "🤗😊 congratulations 🎉​@Jigyanshu-sah",
      "parent_context": "my brother got 640 marks in neet 22 and usne bola chemical bonding pura alakh sir se hi karna so i'm here thank you alakh sir"
    },
    {
      "comment_id": "Ugyx0ZilW2Jj90B0eV94AaABAg.9iRpKWJ5IfvA8OOUDzOJ5L",
      "parent_id": "Ugyx0ZilW2Jj90B0eV94AaABAg",
      "comment_type": "reply",
      "author": "@blairwaldorf33",
      "likes": 1,
      "published_at": "2024-09-15T01:53:57Z",
      "timestamp_refs": [],
      "text": "​@Chirag_26.. oh I guess you must've given the neet exam then? marks with proof?",
      "parent_context": "my brother got 640 marks in neet 22 and usne bola chemical bonding pura alakh sir se hi karna so i'm here thank you alakh sir"
    },
    {
      "comment_id": "Ugyx0ZilW2Jj90B0eV94AaABAg.9iRpKWJ5IfvABn4mwMbhan",
      "parent_id": "Ugyx0ZilW2Jj90B0eV94AaABAg",
      "comment_type": "reply",
      "author": "@saqibxzz",
      "likes": 1,
      "published_at": "2024-12-08T14:56:19Z",
      "timestamp_refs": [],
      "text": "@Chirag_26..bhaii competition zyada hota h",
      "parent_context": "my brother got 640 marks in neet 22 and usne bola chemical bonding pura alakh sir se hi karna so i'm here thank you alakh sir"
    },
    {
      "comment_id": "UgxlFWTv8MMkn2Pt1Tp4AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@Iamlifee",
      "likes": 544,
      "published_at": "2022-12-30T13:30:55Z",
      "timestamp_refs": [],
      "text": "2023 is coming but this video never getting old after 4-5 years Thanks to alakh sir🙏🙏",
      "parent_context": ""
    },
    {
      "comment_id": "UgxlFWTv8MMkn2Pt1Tp4AaABAg.9kGJQ7I_oAz9oGjcLH2iLa",
      "parent_id": "UgxlFWTv8MMkn2Pt1Tp4AaABAg",
      "comment_type": "reply",
      "author": "@alfihri",
      "likes": 2,
      "published_at": "2023-04-09T03:34:13Z",
      "timestamp_refs": [],
      "text": "Yess",
      "parent_context": "2023 is coming but this video never getting old after 4-5 years Thanks to alakh sir🙏🙏"
    },
    {
      "comment_id": "UgxlFWTv8MMkn2Pt1Tp4AaABAg.9kGJQ7I_oAz9sFjBx4iLXq",
      "parent_id": "UgxlFWTv8MMkn2Pt1Tp4AaABAg",
      "comment_type": "reply",
      "author": "@SangeetaTiwari-y2x",
      "likes": 2,
      "published_at": "2023-07-17T04:16:49Z",
      "timestamp_refs": [],
      "text": "You are right",
      "parent_context": "2023 is coming but this video never getting old after 4-5 years Thanks to alakh sir🙏🙏"
    },
    {
      "comment_id": "UgxlFWTv8MMkn2Pt1Tp4AaABAg.9kGJQ7I_oAz9u-XWDnJahi",
      "parent_id": "UgxlFWTv8MMkn2Pt1Tp4AaABAg",
      "comment_type": "reply",
      "author": "@pandameetsbamboo6420",
      "likes": 3,
      "published_at": "2023-08-29T14:20:57Z",
      "timestamp_refs": [],
      "text": "U r left",
      "parent_context": "2023 is coming but this video never getting old after 4-5 years Thanks to alakh sir🙏🙏"
    },
    {
      "comment_id": "UgxlFWTv8MMkn2Pt1Tp4AaABAg.9kGJQ7I_oAz9vN4emKHvj3",
      "parent_id": "UgxlFWTv8MMkn2Pt1Tp4AaABAg",
      "comment_type": "reply",
      "author": "@RAJEEVKUMAR-333",
      "likes": 0,
      "published_at": "2023-10-02T14:22:01Z",
      "timestamp_refs": [],
      "text": "😊😊😊😊😊😊❤❤❤❤❤❤❤❤❤❤❤❤❤",
      "parent_context": "2023 is coming but this video never getting old after 4-5 years Thanks to alakh sir🙏🙏"
    },
    {
      "comment_id": "UgxlFWTv8MMkn2Pt1Tp4AaABAg.9kGJQ7I_oAz9w5dkXYpHCs",
      "parent_id": "UgxlFWTv8MMkn2Pt1Tp4AaABAg",
      "comment_type": "reply",
      "author": "@YouTubeking-qe2yy",
      "likes": 0,
      "published_at": "2023-10-20T16:22:26Z",
      "timestamp_refs": [],
      "text": "Correct 😊😊",
      "parent_context": "2023 is coming but this video never getting old after 4-5 years Thanks to alakh sir🙏🙏"
    },
    {
      "comment_id": "UgxlFWTv8MMkn2Pt1Tp4AaABAg.9kGJQ7I_oAz9wI4QTGLVIV",
      "parent_id": "UgxlFWTv8MMkn2Pt1Tp4AaABAg",
      "comment_type": "reply",
      "author": "@himanisarmal600",
      "likes": 1,
      "published_at": "2023-10-25T12:15:07Z",
      "timestamp_refs": [],
      "text": "Is it okay to attend these lectures and notes for neet2024 smjne k liye?? Is it worth watching?",
      "parent_context": "2023 is coming but this video never getting old after 4-5 years Thanks to alakh sir🙏🙏"
    },
    {
      "comment_id": "UgxlFWTv8MMkn2Pt1Tp4AaABAg.9kGJQ7I_oAz9wsacPjDXao",
      "parent_id": "UgxlFWTv8MMkn2Pt1Tp4AaABAg",
      "comment_type": "reply",
      "author": "@gauravagrawal6401",
      "likes": 0,
      "published_at": "2023-11-09T01:57:08Z",
      "timestamp_refs": [],
      "text": "yes absolutely. @himanisarmal600",
      "parent_context": "2023 is coming but this video never getting old after 4-5 years Thanks to alakh sir🙏🙏"
    },
    {
      "comment_id": "UgxlFWTv8MMkn2Pt1Tp4AaABAg.9kGJQ7I_oAzAGNiZ_4Q-nh",
      "parent_id": "UgxlFWTv8MMkn2Pt1Tp4AaABAg",
      "comment_type": "reply",
      "author": "@Gitanjalichaudhary01",
      "likes": 0,
      "published_at": "2025-04-01T15:50:05Z",
      "timestamp_refs": [],
      "text": "It's 2025 buddy",
      "parent_context": "2023 is coming but this video never getting old after 4-5 years Thanks to alakh sir🙏🙏"
    },
    {
      "comment_id": "UgxlFWTv8MMkn2Pt1Tp4AaABAg.9kGJQ7I_oAzAK1N7M_uwWn",
      "parent_id": "UgxlFWTv8MMkn2Pt1Tp4AaABAg",
      "comment_type": "reply",
      "author": "@ArnavArtOp",
      "likes": 1,
      "published_at": "2025-07-01T09:36:17Z",
      "timestamp_refs": [],
      "text": "2027 wale hai ❤",
      "parent_context": "2023 is coming but this video never getting old after 4-5 years Thanks to alakh sir🙏🙏"
    },
    {
      "comment_id": "UgxlFWTv8MMkn2Pt1Tp4AaABAg.9kGJQ7I_oAzAL_BMKAwvPe",
      "parent_id": "UgxlFWTv8MMkn2Pt1Tp4AaABAg",
      "comment_type": "reply",
      "author": "@MytabDetails",
      "likes": 3,
      "published_at": "2025-08-08T18:38:17Z",
      "timestamp_refs": [],
      "text": "It 26 almost",
      "parent_context": "2023 is coming but this video never getting old after 4-5 years Thanks to alakh sir🙏🙏"
    },
    {
      "comment_id": "UgxlFWTv8MMkn2Pt1Tp4AaABAg.9kGJQ7I_oAzAS-83nX1Glj",
      "parent_id": "UgxlFWTv8MMkn2Pt1Tp4AaABAg",
      "comment_type": "reply",
      "author": "@fnm2863",
      "likes": 1,
      "published_at": "2026-01-15T08:57:24Z",
      "timestamp_refs": [],
      "text": "It's 26",
      "parent_context": "2023 is coming but this video never getting old after 4-5 years Thanks to alakh sir🙏🙏"
    },
    {
      "comment_id": "UgyNJslmrk0NKM68OAt4AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@HardikMittal-li4nm",
      "likes": 2,
      "published_at": "2026-06-19T14:08:37Z",
      "timestamp_refs": [],
      "text": "He is only the teacher who shares his complete knowledge",
      "parent_context": ""
    },
    {
      "comment_id": "Ugw9HtFgDa4F97SD6Ul4AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@indiantiger10",
      "likes": 548,
      "published_at": "2021-04-26T11:44:14Z",
      "timestamp_refs": [],
      "text": "I left school more than 10 years ago and always thought I was a dumb student. Recently, I started to teach myself again through videos (just out of curiosity) and I can surely say I wasn’t dumb, just that my teachers never taught us so well as you do.",
      "parent_context": ""
    },
    {
      "comment_id": "Ugw9HtFgDa4F97SD6Ul4AaABAg.9MagvKz_ZLU9Mqdn0sYcF5",
      "parent_id": "Ugw9HtFgDa4F97SD6Ul4AaABAg",
      "comment_type": "reply",
      "author": "@jagritibhayana4788",
      "likes": 70,
      "published_at": "2021-05-02T16:24:43Z",
      "timestamp_refs": [],
      "text": "Just a random thought I don't feel that anyone is dumb actually the fact is that everyone is not patient enough to be able to be a science student bcoz science is a subject which requires through and continuous study .I am saying all this coz am a droper when i was in school i wasn't able to understand some concept but now when i went across them again i got them easily maybe another reason is that most teachers don't teach in a proper and deep way they assume that students will get those little fact behind the concepts on their own",
      "parent_context": "I left school more than 10 years ago and always thought I was a dumb student. Recently, I started to teach myself again through videos (just out of curiosity) and I can surely say I wasn’t dumb, just that my teachers never taught us so well as you do."
    },
    {
      "comment_id": "Ugw9HtFgDa4F97SD6Ul4AaABAg.9MagvKz_ZLU9MrI7YNyqbJ",
      "parent_id": "Ugw9HtFgDa4F97SD6Ul4AaABAg",
      "comment_type": "reply",
      "author": "@indiantiger10",
      "likes": 6,
      "published_at": "2021-05-02T22:25:55Z",
      "timestamp_refs": [],
      "text": "True",
      "parent_context": "I left school more than 10 years ago and always thought I was a dumb student. Recently, I started to teach myself again through videos (just out of curiosity) and I can surely say I wasn’t dumb, just that my teachers never taught us so well as you do."
    },
    {
      "comment_id": "Ugw9HtFgDa4F97SD6Ul4AaABAg.9MagvKz_ZLU9PEn_DWuiFY",
      "parent_id": "Ugw9HtFgDa4F97SD6Ul4AaABAg",
      "comment_type": "reply",
      "author": "@mr_meow_77",
      "likes": 4,
      "published_at": "2021-07-01T03:54:01Z",
      "timestamp_refs": [],
      "text": "@indiantiger10 what are you doing",
      "parent_context": "I left school more than 10 years ago and always thought I was a dumb student. Recently, I started to teach myself again through videos (just out of curiosity) and I can surely say I wasn’t dumb, just that my teachers never taught us so well as you do."
    },
    {
      "comment_id": "Ugw9HtFgDa4F97SD6Ul4AaABAg.9MagvKz_ZLU9VvRJK0Qg9J",
      "parent_id": "Ugw9HtFgDa4F97SD6Ul4AaABAg",
      "comment_type": "reply",
      "author": "@studenlife.1432",
      "likes": 19,
      "published_at": "2021-12-14T05:45:41Z",
      "timestamp_refs": [],
      "text": "Yes you are 💯 correct. Now I am 11th PCM Students I understand your feelings, so I always ignore my school teacher and now I am totally dependent on online classes it take time to understand the concept but doing hard work now I attached with chemistry and Physics 💕 also Mathematics ❤️. PW online course is best gift for students which changes life. I really thanks to all PW family.",
      "parent_context": "I left school more than 10 years ago and always thought I was a dumb student. Recently, I started to teach myself again through videos (just out of curiosity) and I can surely say I wasn’t dumb, just that my teachers never taught us so well as you do."
    },
    {
      "comment_id": "Ugw9HtFgDa4F97SD6Ul4AaABAg.9MagvKz_ZLU9W73L6qwRsl",
      "parent_id": "Ugw9HtFgDa4F97SD6Ul4AaABAg",
      "comment_type": "reply",
      "author": "@indiantiger10",
      "likes": 27,
      "published_at": "2021-12-19T03:26:20Z",
      "timestamp_refs": [],
      "text": "Sumeet pawar Well, now I am a graphic designer and content writer, a skill which I also learned solely from YouTube. I work as a freelancer and earn better than a person working in a company. So, yes that's the power of internet these days, provided you are willing to learn.",
      "parent_context": "I left school more than 10 years ago and always thought I was a dumb student. Recently, I started to teach myself again through videos (just out of curiosity) and I can surely say I wasn’t dumb, just that my teachers never taught us so well as you do."
    },
    {
      "comment_id": "Ugw9HtFgDa4F97SD6Ul4AaABAg.9MagvKz_ZLU9fThQUOtf-9",
      "parent_id": "Ugw9HtFgDa4F97SD6Ul4AaABAg",
      "comment_type": "reply",
      "author": "@karamjeet5817",
      "likes": 2,
      "published_at": "2022-09-02T11:42:34Z",
      "timestamp_refs": [],
      "text": "@indiantiger10 i want to know/ learn more about these skills, where (which channel) can i find content on these ?",
      "parent_context": "I left school more than 10 years ago and always thought I was a dumb student. Recently, I started to teach myself again through videos (just out of curiosity) and I can surely say I wasn’t dumb, just that my teachers never taught us so well as you do."
    },
    {
      "comment_id": "Ugw9HtFgDa4F97SD6Ul4AaABAg.9MagvKz_ZLU9fTzmgxagmK",
      "parent_id": "Ugw9HtFgDa4F97SD6Ul4AaABAg",
      "comment_type": "reply",
      "author": "@Sne_hali0.5_",
      "likes": 2,
      "published_at": "2022-09-02T14:23:01Z",
      "timestamp_refs": [],
      "text": "Good teaching sir",
      "parent_context": "I left school more than 10 years ago and always thought I was a dumb student. Recently, I started to teach myself again through videos (just out of curiosity) and I can surely say I wasn’t dumb, just that my teachers never taught us so well as you do."
    },
    {
      "comment_id": "Ugw9HtFgDa4F97SD6Ul4AaABAg.9MagvKz_ZLU9gdhq1tYBT8",
      "parent_id": "Ugw9HtFgDa4F97SD6Ul4AaABAg",
      "comment_type": "reply",
      "author": "@Whimsywonderz",
      "likes": 1,
      "published_at": "2022-10-01T14:49:14Z",
      "timestamp_refs": [],
      "text": "Ab ap kya kar rahe ho life meh",
      "parent_context": "I left school more than 10 years ago and always thought I was a dumb student. Recently, I started to teach myself again through videos (just out of curiosity) and I can surely say I wasn’t dumb, just that my teachers never taught us so well as you do."
    },
    {
      "comment_id": "Ugw9HtFgDa4F97SD6Ul4AaABAg.9MagvKz_ZLU9gfPdMUB9ST",
      "parent_id": "Ugw9HtFgDa4F97SD6Ul4AaABAg",
      "comment_type": "reply",
      "author": "@indiantiger10",
      "likes": 4,
      "published_at": "2022-10-02T06:39:58Z",
      "timestamp_refs": [],
      "text": "@Whimsywonderz Now I am a senior graphic designer, working for a company and doing my own freelance work as well...no design background, all thanks to youtube :D",
      "parent_context": "I left school more than 10 years ago and always thought I was a dumb student. Recently, I started to teach myself again through videos (just out of curiosity) and I can surely say I wasn’t dumb, just that my teachers never taught us so well as you do."
    },
    {
      "comment_id": "Ugw9HtFgDa4F97SD6Ul4AaABAg.9MagvKz_ZLU9i-hGeeb8hC",
      "parent_id": "Ugw9HtFgDa4F97SD6Ul4AaABAg",
      "comment_type": "reply",
      "author": "@user-jq6gj7vz4h",
      "likes": 1,
      "published_at": "2022-11-04T09:38:12Z",
      "timestamp_refs": [],
      "text": "ɪ ʟᴏᴠᴇ ʏᴏᴜ",
      "parent_context": "I left school more than 10 years ago and always thought I was a dumb student. Recently, I started to teach myself again through videos (just out of curiosity) and I can surely say I wasn’t dumb, just that my teachers never taught us so well as you do."
    },
    {
      "comment_id": "Ugw9HtFgDa4F97SD6Ul4AaABAg.9MagvKz_ZLU9ivvyyfkoTU",
      "parent_id": "Ugw9HtFgDa4F97SD6Ul4AaABAg",
      "comment_type": "reply",
      "author": "@mmdeo1528",
      "likes": 0,
      "published_at": "2022-11-27T09:41:55Z",
      "timestamp_refs": [],
      "text": "like your style",
      "parent_context": "I left school more than 10 years ago and always thought I was a dumb student. Recently, I started to teach myself again through videos (just out of curiosity) and I can surely say I wasn’t dumb, just that my teachers never taught us so well as you do."
    },
    {
      "comment_id": "Ugw9HtFgDa4F97SD6Ul4AaABAg.9MagvKz_ZLU9t1pSy2c4ou",
      "parent_id": "Ugw9HtFgDa4F97SD6Ul4AaABAg",
      "comment_type": "reply",
      "author": "@Sonudahiya1",
      "likes": 0,
      "published_at": "2023-08-05T15:13:36Z",
      "timestamp_refs": [],
      "text": "Same😢",
      "parent_context": "I left school more than 10 years ago and always thought I was a dumb student. Recently, I started to teach myself again through videos (just out of curiosity) and I can surely say I wasn’t dumb, just that my teachers never taught us so well as you do."
    },
    {
      "comment_id": "Ugw9HtFgDa4F97SD6Ul4AaABAg.9MagvKz_ZLU9u7QhWuo87K",
      "parent_id": "Ugw9HtFgDa4F97SD6Ul4AaABAg",
      "comment_type": "reply",
      "author": "@gamerop960",
      "likes": 0,
      "published_at": "2023-09-01T15:55:23Z",
      "timestamp_refs": [],
      "text": "wow what a story",
      "parent_context": "I left school more than 10 years ago and always thought I was a dumb student. Recently, I started to teach myself again through videos (just out of curiosity) and I can surely say I wasn’t dumb, just that my teachers never taught us so well as you do."
    },
    {
      "comment_id": "Ugw9HtFgDa4F97SD6Ul4AaABAg.9MagvKz_ZLUA403rEX61Im",
      "parent_id": "Ugw9HtFgDa4F97SD6Ul4AaABAg",
      "comment_type": "reply",
      "author": "@R27-Negative",
      "likes": 3,
      "published_at": "2024-05-29T05:06:23Z",
      "timestamp_refs": [],
      "text": "​@user-jq6gj7vz4haapke beti ki umr ki h chacha Sharm kro😂",
      "parent_context": "I left school more than 10 years ago and always thought I was a dumb student. Recently, I started to teach myself again through videos (just out of curiosity) and I can surely say I wasn’t dumb, just that my teachers never taught us so well as you do."
    },
    {
      "comment_id": "Ugw9HtFgDa4F97SD6Ul4AaABAg.9MagvKz_ZLUA82SL_NDH-q",
      "parent_id": "Ugw9HtFgDa4F97SD6Ul4AaABAg",
      "comment_type": "reply",
      "author": "@AyushChoudhary-o7i",
      "likes": 0,
      "published_at": "2024-09-06T13:24:26Z",
      "timestamp_refs": [],
      "text": "😂​@indiantiger10",
      "parent_context": "I left school more than 10 years ago and always thought I was a dumb student. Recently, I started to teach myself again through videos (just out of curiosity) and I can surely say I wasn’t dumb, just that my teachers never taught us so well as you do."
    },
    {
      "comment_id": "UgxQ_RGT0mADRQMhC1p4AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@AnujkeSafar",
      "likes": 209,
      "published_at": "2018-08-09T15:26:46Z",
      "timestamp_refs": [],
      "text": "सर आपका बहुत बहुत धन्यवाद chemistry पढ़ाने के लिये जब आप हमे पढ़ाते तो बहुत अच्छे से समझ मे आता है सर आप अपनी कृपा हम लोगो के उप्पर ऐसे ही बनाये रखे",
      "parent_context": ""
    },
    {
      "comment_id": "UgyPGrFar14wiT80VxR4AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@Bhodish.G",
      "likes": 636,
      "published_at": "2019-09-03T14:20:03Z",
      "timestamp_refs": [],
      "text": "Physics wallah is the best I don't have money When I start earning I will definitely. Help u sirrr u r the best chemistry teacher",
      "parent_context": ""
    },
    {
      "comment_id": "UgyPGrFar14wiT80VxR4AaABAg.8zQS-kdr4mZ90BwYyDeC9J",
      "parent_id": "UgyPGrFar14wiT80VxR4AaABAg",
      "comment_type": "reply",
      "author": "@abhinavsagar2025",
      "likes": 69,
      "published_at": "2019-10-17T16:09:55Z",
      "timestamp_refs": [],
      "text": "Ya u re the first person that I see interested in helping sir with money otherwise everyone is saying sir is best,sir is God, this this n that. Good thinking bro. Help sir. And I'll too.",
      "parent_context": "Physics wallah is the best I don't have money When I start earning I will definitely. Help u sirrr u r the best chemistry teacher"
    },
    {
      "comment_id": "UgyPGrFar14wiT80VxR4AaABAg.8zQS-kdr4mZ90WKJiwFbBU",
      "parent_id": "UgyPGrFar14wiT80VxR4AaABAg",
      "comment_type": "reply",
      "author": "@Bhodish.G",
      "likes": 15,
      "published_at": "2019-10-25T14:11:06Z",
      "timestamp_refs": [],
      "text": "@abhinavsagar2025 yeahhh👍👍",
      "parent_context": "Physics wallah is the best I don't have money When I start earning I will definitely. Help u sirrr u r the best chemistry teacher"
    },
    {
      "comment_id": "UgyPGrFar14wiT80VxR4AaABAg.8zQS-kdr4mZ90X_76z8Y-Z",
      "parent_id": "UgyPGrFar14wiT80VxR4AaABAg",
      "comment_type": "reply",
      "author": "@sahilsheoran7628",
      "likes": 16,
      "published_at": "2019-10-26T01:48:26Z",
      "timestamp_refs": [],
      "text": "i will also do",
      "parent_context": "Physics wallah is the best I don't have money When I start earning I will definitely. Help u sirrr u r the best chemistry teacher"
    },
    {
      "comment_id": "UgyPGrFar14wiT80VxR4AaABAg.8zQS-kdr4mZ90v1zkusLUC",
      "parent_id": "UgyPGrFar14wiT80VxR4AaABAg",
      "comment_type": "reply",
      "author": "@srikanth-ry3oe",
      "likes": 14,
      "published_at": "2019-11-04T13:51:12Z",
      "timestamp_refs": [],
      "text": "But also physics",
      "parent_context": "Physics wallah is the best I don't have money When I start earning I will definitely. Help u sirrr u r the best chemistry teacher"
    },
    {
      "comment_id": "UgyPGrFar14wiT80VxR4AaABAg.8zQS-kdr4mZ91hryNpkjVu",
      "parent_id": "UgyPGrFar14wiT80VxR4AaABAg",
      "comment_type": "reply",
      "author": "@Unknownjddj",
      "likes": 10,
      "published_at": "2019-11-24T07:36:10Z",
      "timestamp_refs": [],
      "text": "Good idea",
      "parent_context": "Physics wallah is the best I don't have money When I start earning I will definitely. Help u sirrr u r the best chemistry teacher"
    },
    {
      "comment_id": "UgyPGrFar14wiT80VxR4AaABAg.8zQS-kdr4mZ92FbMR1u7EH",
      "parent_id": "UgyPGrFar14wiT80VxR4AaABAg",
      "comment_type": "reply",
      "author": "@rah2565",
      "likes": 7,
      "published_at": "2019-12-07T19:24:27Z",
      "timestamp_refs": [],
      "text": "I Also",
      "parent_context": "Physics wallah is the best I don't have money When I start earning I will definitely. Help u sirrr u r the best chemistry teacher"
    },
    {
      "comment_id": "UgyPGrFar14wiT80VxR4AaABAg.8zQS-kdr4mZ97BY_d-M9Ra",
      "parent_id": "UgyPGrFar14wiT80VxR4AaABAg",
      "comment_type": "reply",
      "author": "@priyak7236",
      "likes": 4,
      "published_at": "2020-04-08T12:11:27Z",
      "timestamp_refs": [],
      "text": "Me also",
      "parent_context": "Physics wallah is the best I don't have money When I start earning I will definitely. Help u sirrr u r the best chemistry teacher"
    },
    {
      "comment_id": "UgyPGrFar14wiT80VxR4AaABAg.8zQS-kdr4mZ97esC78xnLS",
      "parent_id": "UgyPGrFar14wiT80VxR4AaABAg",
      "comment_type": "reply",
      "author": "@acousticmelody5757",
      "likes": 21,
      "published_at": "2020-04-20T06:48:49Z",
      "timestamp_refs": [],
      "text": "Tbh tk sir ambani ko takkar derhe hogay",
      "parent_context": "Physics wallah is the best I don't have money When I start earning I will definitely. Help u sirrr u r the best chemistry teacher"
    },
    {
      "comment_id": "UgyPGrFar14wiT80VxR4AaABAg.8zQS-kdr4mZ98nzTa1fZAw",
      "parent_id": "UgyPGrFar14wiT80VxR4AaABAg",
      "comment_type": "reply",
      "author": "@dheerajthakur7814",
      "likes": 3,
      "published_at": "2020-05-18T16:16:56Z",
      "timestamp_refs": [],
      "text": "You are right✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔👉 🥰🥰🥰😘",
      "parent_context": "Physics wallah is the best I don't have money When I start earning I will definitely. Help u sirrr u r the best chemistry teacher"
    },
    {
      "comment_id": "UgyPGrFar14wiT80VxR4AaABAg.8zQS-kdr4mZ993ffh6jy3u",
      "parent_id": "UgyPGrFar14wiT80VxR4AaABAg",
      "comment_type": "reply",
      "author": "@sandhyapandab7587",
      "likes": 25,
      "published_at": "2020-05-25T03:51:03Z",
      "timestamp_refs": [],
      "text": "Ads skip mat karna sir ko ads ka money mil jayega that's how you can help sir 👍",
      "parent_context": "Physics wallah is the best I don't have money When I start earning I will definitely. Help u sirrr u r the best chemistry teacher"
    },
    {
      "comment_id": "UgyPGrFar14wiT80VxR4AaABAg.8zQS-kdr4mZ99S5PAlc26B",
      "parent_id": "UgyPGrFar14wiT80VxR4AaABAg",
      "comment_type": "reply",
      "author": "@ictgovtsec.schoolsahuwala5993",
      "likes": 3,
      "published_at": "2020-06-03T15:26:21Z",
      "timestamp_refs": [],
      "text": "You ❤are absolutely right",
      "parent_context": "Physics wallah is the best I don't have money When I start earning I will definitely. Help u sirrr u r the best chemistry teacher"
    },
    {
      "comment_id": "UgyPGrFar14wiT80VxR4AaABAg.8zQS-kdr4mZ9At1NBD0008",
      "parent_id": "UgyPGrFar14wiT80VxR4AaABAg",
      "comment_type": "reply",
      "author": "@dreamvideos9057",
      "likes": 2,
      "published_at": "2020-07-09T08:21:16Z",
      "timestamp_refs": [],
      "text": "i will too",
      "parent_context": "Physics wallah is the best I don't have money When I start earning I will definitely. Help u sirrr u r the best chemistry teacher"
    },
    {
      "comment_id": "UgyPGrFar14wiT80VxR4AaABAg.8zQS-kdr4mZ9C8_FNBY0u9",
      "parent_id": "UgyPGrFar14wiT80VxR4AaABAg",
      "comment_type": "reply",
      "author": "@bharatpatil5848",
      "likes": 2,
      "published_at": "2020-08-09T15:05:16Z",
      "timestamp_refs": [],
      "text": "I have thought about this",
      "parent_context": "Physics wallah is the best I don't have money When I start earning I will definitely. Help u sirrr u r the best chemistry teacher"
    },
    {
      "comment_id": "UgyPGrFar14wiT80VxR4AaABAg.8zQS-kdr4mZ9CCeoFMomaN",
      "parent_id": "UgyPGrFar14wiT80VxR4AaABAg",
      "comment_type": "reply",
      "author": "@IND25352",
      "likes": 2,
      "published_at": "2020-08-11T05:10:49Z",
      "timestamp_refs": [],
      "text": "@abhinavsagar2025 I will also do the same",
      "parent_context": "Physics wallah is the best I don't have money When I start earning I will definitely. Help u sirrr u r the best chemistry teacher"
    },
    {
      "comment_id": "UgyPGrFar14wiT80VxR4AaABAg.8zQS-kdr4mZ9CFFrfJIc1p",
      "parent_id": "UgyPGrFar14wiT80VxR4AaABAg",
      "comment_type": "reply",
      "author": "@ananthaatole7366",
      "likes": 2,
      "published_at": "2020-08-12T05:21:49Z",
      "timestamp_refs": [],
      "text": "👍👍good idea..",
      "parent_context": "Physics wallah is the best I don't have money When I start earning I will definitely. Help u sirrr u r the best chemistry teacher"
    },
    {
      "comment_id": "UgyPGrFar14wiT80VxR4AaABAg.8zQS-kdr4mZ9D3wVkKWGMX",
      "parent_id": "UgyPGrFar14wiT80VxR4AaABAg",
      "comment_type": "reply",
      "author": "@Dr.sumitpandit",
      "likes": 1,
      "published_at": "2020-09-01T16:23:41Z",
      "timestamp_refs": [],
      "text": "Bhodish bhai tu jab kamane lagega tab tak sir ke paass bhahut paise honge 🤣🤣🤣🤣🤣",
      "parent_context": "Physics wallah is the best I don't have money When I start earning I will definitely. Help u sirrr u r the best chemistry teacher"
    },
    {
      "comment_id": "UgyPGrFar14wiT80VxR4AaABAg.8zQS-kdr4mZ9D3wdvrq9kx",
      "parent_id": "UgyPGrFar14wiT80VxR4AaABAg",
      "comment_type": "reply",
      "author": "@Dr.sumitpandit",
      "likes": 1,
      "published_at": "2020-09-01T16:24:56Z",
      "timestamp_refs": [],
      "text": "Kya money money sir bhahut kamane lag gaye sir ab chinta ki koi baat ni hai doston",
      "parent_context": "Physics wallah is the best I don't have money When I start earning I will definitely. Help u sirrr u r the best chemistry teacher"
    },
    {
      "comment_id": "UgyPGrFar14wiT80VxR4AaABAg.8zQS-kdr4mZ9D3xIceppkG",
      "parent_id": "UgyPGrFar14wiT80VxR4AaABAg",
      "comment_type": "reply",
      "author": "@ananthaatole7366",
      "likes": 2,
      "published_at": "2020-09-01T16:30:37Z",
      "timestamp_refs": [],
      "text": "@Dr.sumitpandit tune send kiya kya",
      "parent_context": "Physics wallah is the best I don't have money When I start earning I will definitely. Help u sirrr u r the best chemistry teacher"
    },
    {
      "comment_id": "UgyPGrFar14wiT80VxR4AaABAg.8zQS-kdr4mZ9D3yRB_5BiY",
      "parent_id": "UgyPGrFar14wiT80VxR4AaABAg",
      "comment_type": "reply",
      "author": "@Dr.sumitpandit",
      "likes": 7,
      "published_at": "2020-09-01T16:40:32Z",
      "timestamp_refs": [],
      "text": "@ananthaatole7366 yaar youTube wale dete hai unko money par ek baat jarur boluga bhai mujhe jaha tak feel huya ki sir ko paiso ka koi laalach nahi hai wo bas bacchho ki madad karne ke udddesh se padate hai Really very thanku sir ✌✌✌🙏🙏🙏🙏",
      "parent_context": "Physics wallah is the best I don't have money When I start earning I will definitely. Help u sirrr u r the best chemistry teacher"
    },
    {
      "comment_id": "UgyPGrFar14wiT80VxR4AaABAg.8zQS-kdr4mZ9D3zCsxwMGq",
      "parent_id": "UgyPGrFar14wiT80VxR4AaABAg",
      "comment_type": "reply",
      "author": "@ananthaatole7366",
      "likes": 0,
      "published_at": "2020-09-01T16:47:19Z",
      "timestamp_refs": [],
      "text": "@Dr.sumitpandit ha yar muzhe bhi pata hain😌😌☺",
      "parent_context": "Physics wallah is the best I don't have money When I start earning I will definitely. Help u sirrr u r the best chemistry teacher"
    },
    {
      "comment_id": "UgyPGrFar14wiT80VxR4AaABAg.8zQS-kdr4mZ9DG4Zu96kID",
      "parent_id": "UgyPGrFar14wiT80VxR4AaABAg",
      "comment_type": "reply",
      "author": "@pankojkumarsaha3730",
      "likes": 0,
      "published_at": "2020-09-06T09:33:46Z",
      "timestamp_refs": [],
      "text": "Physics wallah",
      "parent_context": "Physics wallah is the best I don't have money When I start earning I will definitely. Help u sirrr u r the best chemistry teacher"
    },
    {
      "comment_id": "UgyPGrFar14wiT80VxR4AaABAg.8zQS-kdr4mZ9DWh61Njj41",
      "parent_id": "UgyPGrFar14wiT80VxR4AaABAg",
      "comment_type": "reply",
      "author": "@urmeeghosh9164",
      "likes": 2,
      "published_at": "2020-09-12T20:27:04Z",
      "timestamp_refs": [],
      "text": "i will do the same!",
      "parent_context": "Physics wallah is the best I don't have money When I start earning I will definitely. Help u sirrr u r the best chemistry teacher"
    },
    {
      "comment_id": "UgyPGrFar14wiT80VxR4AaABAg.8zQS-kdr4mZ9Ej_Gh-HsQy",
      "parent_id": "UgyPGrFar14wiT80VxR4AaABAg",
      "comment_type": "reply",
      "author": "@premdasrathod257",
      "likes": 0,
      "published_at": "2020-10-13T02:19:23Z",
      "timestamp_refs": [],
      "text": "I will also do bro",
      "parent_context": "Physics wallah is the best I don't have money When I start earning I will definitely. Help u sirrr u r the best chemistry teacher"
    },
    {
      "comment_id": "UgyPGrFar14wiT80VxR4AaABAg.8zQS-kdr4mZ9F25o4QDE2R",
      "parent_id": "UgyPGrFar14wiT80VxR4AaABAg",
      "comment_type": "reply",
      "author": "@Hughjwal",
      "likes": 1,
      "published_at": "2020-10-20T16:18:00Z",
      "timestamp_refs": [],
      "text": "I will also",
      "parent_context": "Physics wallah is the best I don't have money When I start earning I will definitely. Help u sirrr u r the best chemistry teacher"
    },
    {
      "comment_id": "UgyPGrFar14wiT80VxR4AaABAg.8zQS-kdr4mZ9FUKtW7_tGL",
      "parent_id": "UgyPGrFar14wiT80VxR4AaABAg",
      "comment_type": "reply",
      "author": "@interestingfactsandinnovat6846",
      "likes": 0,
      "published_at": "2020-10-31T15:28:33Z",
      "timestamp_refs": [],
      "text": "I would also do the same thing",
      "parent_context": "Physics wallah is the best I don't have money When I start earning I will definitely. Help u sirrr u r the best chemistry teacher"
    },
    {
      "comment_id": "UgyPGrFar14wiT80VxR4AaABAg.8zQS-kdr4mZA8NF_xLroJ5",
      "parent_id": "UgyPGrFar14wiT80VxR4AaABAg",
      "comment_type": "reply",
      "author": "@Vishthetic",
      "likes": 3,
      "published_at": "2024-09-14T15:16:59Z",
      "timestamp_refs": [],
      "text": "Did you guys do it? It's been 5 years...",
      "parent_context": "Physics wallah is the best I don't have money When I start earning I will definitely. Help u sirrr u r the best chemistry teacher"
    },
    {
      "comment_id": "UgyPGrFar14wiT80VxR4AaABAg.8zQS-kdr4mZAJ3VV71tf7V",
      "parent_id": "UgyPGrFar14wiT80VxR4AaABAg",
      "comment_type": "reply",
      "author": "@karelasrinivas1521",
      "likes": 0,
      "published_at": "2025-06-07T08:56:31Z",
      "timestamp_refs": [],
      "text": "😅​@acousticmelody5757",
      "parent_context": "Physics wallah is the best I don't have money When I start earning I will definitely. Help u sirrr u r the best chemistry teacher"
    },
    {
      "comment_id": "UgyTRpOS3dJ9morvCN94AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@manjulareddy-jx2dd",
      "likes": 14,
      "published_at": "2025-07-13T16:37:51Z",
      "timestamp_refs": [],
      "text": "8 years since this legend uploaded this.",
      "parent_context": ""
    },
    {
      "comment_id": "UgzcAgpEB8Vyuz55TAZ4AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@peteraiden7325",
      "likes": 787,
      "published_at": "2018-08-03T15:04:34Z",
      "timestamp_refs": [],
      "text": "It's far better than our daily chemistry classes in skool#",
      "parent_context": ""
    },
    {
      "comment_id": "UgzcAgpEB8Vyuz55TAZ4AaABAg.8jUrJKO2vrT8mzhUAs7rZd",
      "parent_id": "UgzcAgpEB8Vyuz55TAZ4AaABAg",
      "comment_type": "reply",
      "author": "@yus208",
      "likes": 23,
      "published_at": "2018-10-29T13:28:33Z",
      "timestamp_refs": [],
      "text": "Ya it's more better than our daily chemistry class",
      "parent_context": "It's far better than our daily chemistry classes in skool#"
    },
    {
      "comment_id": "UgzcAgpEB8Vyuz55TAZ4AaABAg.8jUrJKO2vrT8mzmHhxPsDv",
      "parent_id": "UgzcAgpEB8Vyuz55TAZ4AaABAg",
      "comment_type": "reply",
      "author": "@peteraiden7325",
      "likes": 2,
      "published_at": "2018-10-29T14:10:32Z",
      "timestamp_refs": [],
      "text": "@yus208yes...far better!!",
      "parent_context": "It's far better than our daily chemistry classes in skool#"
    },
    {
      "comment_id": "UgzcAgpEB8Vyuz55TAZ4AaABAg.8jUrJKO2vrT8mznkgYAtA2",
      "parent_id": "UgzcAgpEB8Vyuz55TAZ4AaABAg",
      "comment_type": "reply",
      "author": "@yus208",
      "likes": 5,
      "published_at": "2018-10-29T14:23:22Z",
      "timestamp_refs": [],
      "text": "@peteraiden7325 ya you're write our teacher doesn't give this type of conceptual explanation",
      "parent_context": "It's far better than our daily chemistry classes in skool#"
    },
    {
      "comment_id": "UgzcAgpEB8Vyuz55TAZ4AaABAg.8jUrJKO2vrT8mzsoC8qc0C",
      "parent_id": "UgzcAgpEB8Vyuz55TAZ4AaABAg",
      "comment_type": "reply",
      "author": "@peteraiden7325",
      "likes": 6,
      "published_at": "2018-10-29T15:07:32Z",
      "timestamp_refs": [],
      "text": "@yus208 ...yea they dont tell us so deeply as alakh sir.",
      "parent_context": "It's far better than our daily chemistry classes in skool#"
    },
    {
      "comment_id": "UgzcAgpEB8Vyuz55TAZ4AaABAg.8jUrJKO2vrT8r4d1vFzHme",
      "parent_id": "UgzcAgpEB8Vyuz55TAZ4AaABAg",
      "comment_type": "reply",
      "author": "@Harshal378",
      "likes": 6,
      "published_at": "2019-02-08T06:50:45Z",
      "timestamp_refs": [],
      "text": "@Peter Aiden do you know who you are comparing with whom? Private School teachers are pathetic tbh.",
      "parent_context": "It's far better than our daily chemistry classes in skool#"
    },
    {
      "comment_id": "UgzcAgpEB8Vyuz55TAZ4AaABAg.8jUrJKO2vrT8yOoOKt1b4p",
      "parent_id": "UgzcAgpEB8Vyuz55TAZ4AaABAg",
      "comment_type": "reply",
      "author": "@samridhkumar7408",
      "likes": 2,
      "published_at": "2019-08-09T02:34:30Z",
      "timestamp_refs": [],
      "text": "Alakh sir bol",
      "parent_context": "It's far better than our daily chemistry classes in skool#"
    },
    {
      "comment_id": "UgzcAgpEB8Vyuz55TAZ4AaABAg.8jUrJKO2vrT8yY2NZDpjak",
      "parent_id": "UgzcAgpEB8Vyuz55TAZ4AaABAg",
      "comment_type": "reply",
      "author": "@gaganpandat8372",
      "likes": 0,
      "published_at": "2019-08-12T16:38:38Z",
      "timestamp_refs": [],
      "text": "yes u r correct bro",
      "parent_context": "It's far better than our daily chemistry classes in skool#"
    },
    {
      "comment_id": "UgzcAgpEB8Vyuz55TAZ4AaABAg.8jUrJKO2vrT8y_3v4qLp2Z",
      "parent_id": "UgzcAgpEB8Vyuz55TAZ4AaABAg",
      "comment_type": "reply",
      "author": "@kangkanadeka9670",
      "likes": 12,
      "published_at": "2019-08-13T11:30:34Z",
      "timestamp_refs": [],
      "text": "Yes.. Infact me to schl me koi attention deti hi nahi.. Sochti hu ek bar physics wallah ka video dekhungi kam ho jayega 😍",
      "parent_context": "It's far better than our daily chemistry classes in skool#"
    },
    {
      "comment_id": "UgzcAgpEB8Vyuz55TAZ4AaABAg.8jUrJKO2vrT8ymGuN66Vs5",
      "parent_id": "UgzcAgpEB8Vyuz55TAZ4AaABAg",
      "comment_type": "reply",
      "author": "@susmitamahakud8822",
      "likes": 1,
      "published_at": "2019-08-18T14:34:12Z",
      "timestamp_refs": [],
      "text": "Same here....",
      "parent_context": "It's far better than our daily chemistry classes in skool#"
    },
    {
      "comment_id": "UgzcAgpEB8Vyuz55TAZ4AaABAg.8jUrJKO2vrT8zAzfejM0we",
      "parent_id": "UgzcAgpEB8Vyuz55TAZ4AaABAg",
      "comment_type": "reply",
      "author": "@kripalsinghyadav3957",
      "likes": 4,
      "published_at": "2019-08-28T14:15:09Z",
      "timestamp_refs": [],
      "text": "No ,my chemistry teacher is the best teacher i have ever seen ,but i study from here for revision 🤗",
      "parent_context": "It's far better than our daily chemistry classes in skool#"
    },
    {
      "comment_id": "UgzcAgpEB8Vyuz55TAZ4AaABAg.8jUrJKO2vrT8zGLbRINSk5",
      "parent_id": "UgzcAgpEB8Vyuz55TAZ4AaABAg",
      "comment_type": "reply",
      "author": "@karishmayadav2660",
      "likes": 2,
      "published_at": "2019-08-30T16:11:45Z",
      "timestamp_refs": [],
      "text": "Ya he teaches far better than my coaching teachers",
      "parent_context": "It's far better than our daily chemistry classes in skool#"
    },
    {
      "comment_id": "UgzcAgpEB8Vyuz55TAZ4AaABAg.8jUrJKO2vrT8zGLe4nedxg",
      "parent_id": "UgzcAgpEB8Vyuz55TAZ4AaABAg",
      "comment_type": "reply",
      "author": "@karishmayadav2660",
      "likes": 1,
      "published_at": "2019-08-30T16:12:07Z",
      "timestamp_refs": [],
      "text": "I love his teaching",
      "parent_context": "It's far better than our daily chemistry classes in skool#"
    },
    {
      "comment_id": "UgzcAgpEB8Vyuz55TAZ4AaABAg.8jUrJKO2vrT9-sL0sIWjsj",
      "parent_id": "UgzcAgpEB8Vyuz55TAZ4AaABAg",
      "comment_type": "reply",
      "author": "@awadheshsharma9527",
      "likes": 1,
      "published_at": "2019-10-09T16:08:24Z",
      "timestamp_refs": [],
      "text": "Ya... Better than those extra classes in schoolllll🙄🙄😑😐",
      "parent_context": "It's far better than our daily chemistry classes in skool#"
    },
    {
      "comment_id": "UgzcAgpEB8Vyuz55TAZ4AaABAg.8jUrJKO2vrT90iAtogURkr",
      "parent_id": "UgzcAgpEB8Vyuz55TAZ4AaABAg",
      "comment_type": "reply",
      "author": "@narendrabora85",
      "likes": 3,
      "published_at": "2019-10-30T13:58:54Z",
      "timestamp_refs": [],
      "text": "@kangkanadeka9670 same here",
      "parent_context": "It's far better than our daily chemistry classes in skool#"
    },
    {
      "comment_id": "UgzcAgpEB8Vyuz55TAZ4AaABAg.8jUrJKO2vrT99P_tmMtlVn",
      "parent_id": "UgzcAgpEB8Vyuz55TAZ4AaABAg",
      "comment_type": "reply",
      "author": "@Audioview",
      "likes": 5,
      "published_at": "2020-06-02T16:03:50Z",
      "timestamp_refs": [],
      "text": "If you want to learn chemical bond in ur 'chemistry' class ,so you might face problems..u should focus on the concept of physics and chemistry first..then come to chemical bond..😏",
      "parent_context": "It's far better than our daily chemistry classes in skool#"
    },
    {
      "comment_id": "UgzcAgpEB8Vyuz55TAZ4AaABAg.8jUrJKO2vrT9MBsbjrMSss",
      "parent_id": "UgzcAgpEB8Vyuz55TAZ4AaABAg",
      "comment_type": "reply",
      "author": "@finite805",
      "likes": 1,
      "published_at": "2021-04-16T11:06:09Z",
      "timestamp_refs": [],
      "text": "Bhai school ka spelling galat ha",
      "parent_context": "It's far better than our daily chemistry classes in skool#"
    },
    {
      "comment_id": "UgzcAgpEB8Vyuz55TAZ4AaABAg.8jUrJKO2vrT9T9KBrRLW7z",
      "parent_id": "UgzcAgpEB8Vyuz55TAZ4AaABAg",
      "comment_type": "reply",
      "author": "@Zero-er1jr",
      "likes": 0,
      "published_at": "2021-10-06T10:57:55Z",
      "timestamp_refs": [],
      "text": "Agreed 👍",
      "parent_context": "It's far better than our daily chemistry classes in skool#"
    },
    {
      "comment_id": "UgzcAgpEB8Vyuz55TAZ4AaABAg.8jUrJKO2vrT9Y-7wjq0PgI",
      "parent_id": "UgzcAgpEB8Vyuz55TAZ4AaABAg",
      "comment_type": "reply",
      "author": "@o23000",
      "likes": 0,
      "published_at": "2022-02-03T18:35:26Z",
      "timestamp_refs": [],
      "text": "Now patar r u enginner or dr",
      "parent_context": "It's far better than our daily chemistry classes in skool#"
    },
    {
      "comment_id": "UgzcAgpEB8Vyuz55TAZ4AaABAg.8jUrJKO2vrT9euHwoDAt2-",
      "parent_id": "UgzcAgpEB8Vyuz55TAZ4AaABAg",
      "comment_type": "reply",
      "author": "@sampa3677",
      "likes": 0,
      "published_at": "2022-08-19T08:18:32Z",
      "timestamp_refs": [],
      "text": "So bro it's been 4 long years of this comment. So what are you doing now??",
      "parent_context": "It's far better than our daily chemistry classes in skool#"
    },
    {
      "comment_id": "UgzcAgpEB8Vyuz55TAZ4AaABAg.8jUrJKO2vrTADKF7c0nAaJ",
      "parent_id": "UgzcAgpEB8Vyuz55TAZ4AaABAg",
      "comment_type": "reply",
      "author": "@pw_reveuse",
      "likes": 0,
      "published_at": "2025-01-15T17:52:14Z",
      "timestamp_refs": [],
      "text": "Its been 2 long years since you commented, what are you doing now?​@sampa3677",
      "parent_context": "It's far better than our daily chemistry classes in skool#"
    },
    {
      "comment_id": "UgzcAgpEB8Vyuz55TAZ4AaABAg.8jUrJKO2vrTAJWFxzEkT-F",
      "parent_id": "UgzcAgpEB8Vyuz55TAZ4AaABAg",
      "comment_type": "reply",
      "author": "@ItachiHunt4k",
      "likes": 0,
      "published_at": "2025-06-18T12:58:46Z",
      "timestamp_refs": [],
      "text": "Bhai job lagi",
      "parent_context": "It's far better than our daily chemistry classes in skool#"
    },
    {
      "comment_id": "UgxVWQwBo2SUuSQ_CNl4AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@tushargupta1297",
      "likes": 281,
      "published_at": "2018-07-13T08:40:56Z",
      "timestamp_refs": [],
      "text": "Arre sir! Aapko best video likhne ki koi zarurat he Nahi hai.... Comments section Ka screenshot lo aur lagado thumbnail ki side pe😊 Hope you think about this",
      "parent_context": ""
    },
    {
      "comment_id": "UgxVWQwBo2SUuSQ_CNl4AaABAg.8id5i9Avj4e8zn5SqQ16__",
      "parent_id": "UgxVWQwBo2SUuSQ_CNl4AaABAg",
      "comment_type": "reply",
      "author": "@vijaythakur7755",
      "likes": 0,
      "published_at": "2019-09-12T18:44:49Z",
      "timestamp_refs": [],
      "text": "Sahi m",
      "parent_context": "Arre sir! Aapko best video likhne ki koi zarurat he Nahi hai.... Comments section Ka screenshot lo aur lagado thumbnail ki side pe😊 Hope you think about this"
    },
    {
      "comment_id": "UgzMdFNbopyorI_iFft4AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@carguy7480",
      "likes": 406,
      "published_at": "2019-11-07T06:46:31Z",
      "timestamp_refs": [
        "6:00",
        "7:04",
        "7:36",
        "9:14",
        "13:40",
        "16:00",
        "19:18",
        "20:19"
      ],
      "text": "Timestamps: 6:00 Lewis dot structure 7:04 ionic bonds 7:36 mgcl2 bond 9:14 electrovalency 13:40 metal and non metal 16:00 lattice nrg 19:18 which is more ionic 20:19 ^ Tip:watch video on 1.75 or 2.0X speed to save time",
      "parent_context": ""
    },
    {
      "comment_id": "UgzMdFNbopyorI_iFft4AaABAg.911-lqQzW5q95O1S5IJQp-",
      "parent_id": "UgzMdFNbopyorI_iFft4AaABAg",
      "comment_type": "reply",
      "author": "@jhonnysins8265",
      "likes": 5,
      "published_at": "2020-02-23T15:29:16Z",
      "timestamp_refs": [],
      "text": "Thanx buddy",
      "parent_context": "Timestamps: 6:00 Lewis dot structure 7:04 ionic bonds 7:36 mgcl2 bond 9:14 electrovalency 13:40 metal and non metal 16:00 lattice nrg 19:18 which is more ionic 20:19 ^ Tip:watch video on 1.75 or 2.0X speed to save time"
    },
    {
      "comment_id": "UgzMdFNbopyorI_iFft4AaABAg.911-lqQzW5q95XgHumdRWZ",
      "parent_id": "UgzMdFNbopyorI_iFft4AaABAg",
      "comment_type": "reply",
      "author": "@justalazyguy.0_0",
      "likes": 12,
      "published_at": "2020-02-27T09:28:02Z",
      "timestamp_refs": [
        "6:00"
      ],
      "text": "6:00 Lewis dot structure",
      "parent_context": "Timestamps: 6:00 Lewis dot structure 7:04 ionic bonds 7:36 mgcl2 bond 9:14 electrovalency 13:40 metal and non metal 16:00 lattice nrg 19:18 which is more ionic 20:19 ^ Tip:watch video on 1.75 or 2.0X speed to save time"
    },
    {
      "comment_id": "UgzMdFNbopyorI_iFft4AaABAg.911-lqQzW5q99zz43D5_Eq",
      "parent_id": "UgzMdFNbopyorI_iFft4AaABAg",
      "comment_type": "reply",
      "author": "@aryansoni1586",
      "likes": 5,
      "published_at": "2020-06-17T04:35:44Z",
      "timestamp_refs": [],
      "text": "Thx alot bruhh",
      "parent_context": "Timestamps: 6:00 Lewis dot structure 7:04 ionic bonds 7:36 mgcl2 bond 9:14 electrovalency 13:40 metal and non metal 16:00 lattice nrg 19:18 which is more ionic 20:19 ^ Tip:watch video on 1.75 or 2.0X speed to save time"
    },
    {
      "comment_id": "UgzMdFNbopyorI_iFft4AaABAg.911-lqQzW5q9B9KLNpGhky",
      "parent_id": "UgzMdFNbopyorI_iFft4AaABAg",
      "comment_type": "reply",
      "author": "@unown1a",
      "likes": 2,
      "published_at": "2020-07-16T01:34:08Z",
      "timestamp_refs": [],
      "text": "Thanks sister",
      "parent_context": "Timestamps: 6:00 Lewis dot structure 7:04 ionic bonds 7:36 mgcl2 bond 9:14 electrovalency 13:40 metal and non metal 16:00 lattice nrg 19:18 which is more ionic 20:19 ^ Tip:watch video on 1.75 or 2.0X speed to save time"
    },
    {
      "comment_id": "UgzMdFNbopyorI_iFft4AaABAg.911-lqQzW5q9BExxu-TfnR",
      "parent_id": "UgzMdFNbopyorI_iFft4AaABAg",
      "comment_type": "reply",
      "author": "@Rmusico933",
      "likes": 9,
      "published_at": "2020-07-18T06:05:15Z",
      "timestamp_refs": [],
      "text": "Shut your mouth!!!!!! If you want to save your time...then dont compromise with it...it will betray you in days to come😎😎😎",
      "parent_context": "Timestamps: 6:00 Lewis dot structure 7:04 ionic bonds 7:36 mgcl2 bond 9:14 electrovalency 13:40 metal and non metal 16:00 lattice nrg 19:18 which is more ionic 20:19 ^ Tip:watch video on 1.75 or 2.0X speed to save time"
    },
    {
      "comment_id": "UgzMdFNbopyorI_iFft4AaABAg.911-lqQzW5q9BGQTawjSOA",
      "parent_id": "UgzMdFNbopyorI_iFft4AaABAg",
      "comment_type": "reply",
      "author": "@Rmusico933",
      "likes": 7,
      "published_at": "2020-07-18T19:42:22Z",
      "timestamp_refs": [],
      "text": "I can understand that you are an extraordinary student.....brilliant....and.. the god of concept💯💯💯💯💯",
      "parent_context": "Timestamps: 6:00 Lewis dot structure 7:04 ionic bonds 7:36 mgcl2 bond 9:14 electrovalency 13:40 metal and non metal 16:00 lattice nrg 19:18 which is more ionic 20:19 ^ Tip:watch video on 1.75 or 2.0X speed to save time"
    },
    {
      "comment_id": "UgzMdFNbopyorI_iFft4AaABAg.911-lqQzW5q9BH_lQLvS4-",
      "parent_id": "UgzMdFNbopyorI_iFft4AaABAg",
      "comment_type": "reply",
      "author": "@carguy7480",
      "likes": 16,
      "published_at": "2020-07-19T06:31:33Z",
      "timestamp_refs": [],
      "text": "@Rmusico933 are Bhai Apne toh halaat badal diye jazzbat badal diye",
      "parent_context": "Timestamps: 6:00 Lewis dot structure 7:04 ionic bonds 7:36 mgcl2 bond 9:14 electrovalency 13:40 metal and non metal 16:00 lattice nrg 19:18 which is more ionic 20:19 ^ Tip:watch video on 1.75 or 2.0X speed to save time"
    },
    {
      "comment_id": "UgzMdFNbopyorI_iFft4AaABAg.911-lqQzW5q9BI3muugVKZ",
      "parent_id": "UgzMdFNbopyorI_iFft4AaABAg",
      "comment_type": "reply",
      "author": "@rajx____",
      "likes": 3,
      "published_at": "2020-07-19T11:02:39Z",
      "timestamp_refs": [],
      "text": "thanks💞",
      "parent_context": "Timestamps: 6:00 Lewis dot structure 7:04 ionic bonds 7:36 mgcl2 bond 9:14 electrovalency 13:40 metal and non metal 16:00 lattice nrg 19:18 which is more ionic 20:19 ^ Tip:watch video on 1.75 or 2.0X speed to save time"
    },
    {
      "comment_id": "UgzMdFNbopyorI_iFft4AaABAg.911-lqQzW5q9BI4SRu4uBl",
      "parent_id": "UgzMdFNbopyorI_iFft4AaABAg",
      "comment_type": "reply",
      "author": "@Rmusico933",
      "likes": 4,
      "published_at": "2020-07-19T11:08:27Z",
      "timestamp_refs": [],
      "text": "Burn it down....",
      "parent_context": "Timestamps: 6:00 Lewis dot structure 7:04 ionic bonds 7:36 mgcl2 bond 9:14 electrovalency 13:40 metal and non metal 16:00 lattice nrg 19:18 which is more ionic 20:19 ^ Tip:watch video on 1.75 or 2.0X speed to save time"
    },
    {
      "comment_id": "UgzMdFNbopyorI_iFft4AaABAg.911-lqQzW5q9BI4wLMrABS",
      "parent_id": "UgzMdFNbopyorI_iFft4AaABAg",
      "comment_type": "reply",
      "author": "@Rmusico933",
      "likes": 4,
      "published_at": "2020-07-19T11:12:40Z",
      "timestamp_refs": [],
      "text": "@carguy7480 are bhai mane to zindegi hi badal di...halat kiu badlunga..... jajjbat ka to bat hi chordo...hamare desh me koi halat or zaazbad nehi badalta...hamare side me ek country hai wahak kuch lok aj e sab badal rahe hai",
      "parent_context": "Timestamps: 6:00 Lewis dot structure 7:04 ionic bonds 7:36 mgcl2 bond 9:14 electrovalency 13:40 metal and non metal 16:00 lattice nrg 19:18 which is more ionic 20:19 ^ Tip:watch video on 1.75 or 2.0X speed to save time"
    },
    {
      "comment_id": "UgzMdFNbopyorI_iFft4AaABAg.911-lqQzW5q9BI517-daux",
      "parent_id": "UgzMdFNbopyorI_iFft4AaABAg",
      "comment_type": "reply",
      "author": "@Rmusico933",
      "likes": 2,
      "published_at": "2020-07-19T11:13:27Z",
      "timestamp_refs": [],
      "text": "@carguy7480 kya tom halaat or jazzbat badalte ho",
      "parent_context": "Timestamps: 6:00 Lewis dot structure 7:04 ionic bonds 7:36 mgcl2 bond 9:14 electrovalency 13:40 metal and non metal 16:00 lattice nrg 19:18 which is more ionic 20:19 ^ Tip:watch video on 1.75 or 2.0X speed to save time"
    },
    {
      "comment_id": "UgzMdFNbopyorI_iFft4AaABAg.911-lqQzW5q9BIxXjY70mD",
      "parent_id": "UgzMdFNbopyorI_iFft4AaABAg",
      "comment_type": "reply",
      "author": "@carguy7480",
      "likes": 5,
      "published_at": "2020-07-19T19:18:30Z",
      "timestamp_refs": [],
      "text": "@Rmusico933 are Bhai Bhai Bhai",
      "parent_context": "Timestamps: 6:00 Lewis dot structure 7:04 ionic bonds 7:36 mgcl2 bond 9:14 electrovalency 13:40 metal and non metal 16:00 lattice nrg 19:18 which is more ionic 20:19 ^ Tip:watch video on 1.75 or 2.0X speed to save time"
    },
    {
      "comment_id": "UgzMdFNbopyorI_iFft4AaABAg.911-lqQzW5q9BJY41je2r2",
      "parent_id": "UgzMdFNbopyorI_iFft4AaABAg",
      "comment_type": "reply",
      "author": "@Rmusico933",
      "likes": 3,
      "published_at": "2020-07-20T00:46:30Z",
      "timestamp_refs": [],
      "text": "@carguy7480 ppdtaker is.......not are....you have to justify your english....and thank you thank you thank you...for giving me chance to become a bhai🤔🤔🤔🤔",
      "parent_context": "Timestamps: 6:00 Lewis dot structure 7:04 ionic bonds 7:36 mgcl2 bond 9:14 electrovalency 13:40 metal and non metal 16:00 lattice nrg 19:18 which is more ionic 20:19 ^ Tip:watch video on 1.75 or 2.0X speed to save time"
    },
    {
      "comment_id": "UgzMdFNbopyorI_iFft4AaABAg.911-lqQzW5q9BNIomlgERA",
      "parent_id": "UgzMdFNbopyorI_iFft4AaABAg",
      "comment_type": "reply",
      "author": "@arrnavswami5139",
      "likes": 3,
      "published_at": "2020-07-21T11:50:10Z",
      "timestamp_refs": [],
      "text": "Thanks.. .....it helped a lot",
      "parent_context": "Timestamps: 6:00 Lewis dot structure 7:04 ionic bonds 7:36 mgcl2 bond 9:14 electrovalency 13:40 metal and non metal 16:00 lattice nrg 19:18 which is more ionic 20:19 ^ Tip:watch video on 1.75 or 2.0X speed to save time"
    },
    {
      "comment_id": "UgzMdFNbopyorI_iFft4AaABAg.911-lqQzW5q9BNKmkAAy0q",
      "parent_id": "UgzMdFNbopyorI_iFft4AaABAg",
      "comment_type": "reply",
      "author": "@Rmusico933",
      "likes": 2,
      "published_at": "2020-07-21T12:07:22Z",
      "timestamp_refs": [],
      "text": "@arrnavswami5139 because this society is now in a negetive stage....we are the archietect of our own fate...we think that a peaple is very negetive...we dont know we are spreading negetevity ....dont judge any one by his words....believe on human being...and yourself",
      "parent_context": "Timestamps: 6:00 Lewis dot structure 7:04 ionic bonds 7:36 mgcl2 bond 9:14 electrovalency 13:40 metal and non metal 16:00 lattice nrg 19:18 which is more ionic 20:19 ^ Tip:watch video on 1.75 or 2.0X speed to save time"
    },
    {
      "comment_id": "UgzMdFNbopyorI_iFft4AaABAg.911-lqQzW5q9BSSlRMJByk",
      "parent_id": "UgzMdFNbopyorI_iFft4AaABAg",
      "comment_type": "reply",
      "author": "@utkarshkhandelwal593",
      "likes": 2,
      "published_at": "2020-07-23T11:53:18Z",
      "timestamp_refs": [],
      "text": "@Rmusico933 aap toh bht bde gyaani nikle😨😨",
      "parent_context": "Timestamps: 6:00 Lewis dot structure 7:04 ionic bonds 7:36 mgcl2 bond 9:14 electrovalency 13:40 metal and non metal 16:00 lattice nrg 19:18 which is more ionic 20:19 ^ Tip:watch video on 1.75 or 2.0X speed to save time"
    },
    {
      "comment_id": "UgzMdFNbopyorI_iFft4AaABAg.911-lqQzW5q9BSSqVsKkmm",
      "parent_id": "UgzMdFNbopyorI_iFft4AaABAg",
      "comment_type": "reply",
      "author": "@utkarshkhandelwal593",
      "likes": 2,
      "published_at": "2020-07-23T11:53:59Z",
      "timestamp_refs": [],
      "text": "@Rmusico933 ek baat or btado agr kisi ko uski baato se judge na kre toh kisse kre",
      "parent_context": "Timestamps: 6:00 Lewis dot structure 7:04 ionic bonds 7:36 mgcl2 bond 9:14 electrovalency 13:40 metal and non metal 16:00 lattice nrg 19:18 which is more ionic 20:19 ^ Tip:watch video on 1.75 or 2.0X speed to save time"
    },
    {
      "comment_id": "UgzMdFNbopyorI_iFft4AaABAg.911-lqQzW5q9BST8Z-CQsF",
      "parent_id": "UgzMdFNbopyorI_iFft4AaABAg",
      "comment_type": "reply",
      "author": "@utkarshkhandelwal593",
      "likes": 1,
      "published_at": "2020-07-23T11:56:36Z",
      "timestamp_refs": [],
      "text": "@Rmusico933 shyd aap jsi soch rkhne wale log face se judge krte honge............",
      "parent_context": "Timestamps: 6:00 Lewis dot structure 7:04 ionic bonds 7:36 mgcl2 bond 9:14 electrovalency 13:40 metal and non metal 16:00 lattice nrg 19:18 which is more ionic 20:19 ^ Tip:watch video on 1.75 or 2.0X speed to save time"
    },
    {
      "comment_id": "UgzMdFNbopyorI_iFft4AaABAg.911-lqQzW5q9BUcwKS0Zjh",
      "parent_id": "UgzMdFNbopyorI_iFft4AaABAg",
      "comment_type": "reply",
      "author": "@Rmusico933",
      "likes": 2,
      "published_at": "2020-07-24T08:09:23Z",
      "timestamp_refs": [],
      "text": "@utkarshkhandelwal593 thank you....apko agar asa lagta hai to thik hai..apka marzi hai....mane to likha tha ki time se compromise mat karo....usko gussa aya mujhko bol dia.....aplog kase jan lete hai ki hum log face se judge karte hai....kya...apne khud kabhi kisika judge nehi kia....nehi ...agar ap bohot acche insan hai..to reply de dijie...",
      "parent_context": "Timestamps: 6:00 Lewis dot structure 7:04 ionic bonds 7:36 mgcl2 bond 9:14 electrovalency 13:40 metal and non metal 16:00 lattice nrg 19:18 which is more ionic 20:19 ^ Tip:watch video on 1.75 or 2.0X speed to save time"
    },
    {
      "comment_id": "UgzMdFNbopyorI_iFft4AaABAg.911-lqQzW5q9BUd_z4iXQj",
      "parent_id": "UgzMdFNbopyorI_iFft4AaABAg",
      "comment_type": "reply",
      "author": "@Rmusico933",
      "likes": 0,
      "published_at": "2020-07-24T08:15:04Z",
      "timestamp_refs": [],
      "text": "@utkarshkhandelwal593bhai .. mato gyani nehi hu...par ap to bohot gyaani hai.....mane tujhko judge nehi kia...tu kase mujhe judge kar sakta hai...dusro ko judge karne ka adhikar mere paas to nehi hai...tere paas to ho sakta hai",
      "parent_context": "Timestamps: 6:00 Lewis dot structure 7:04 ionic bonds 7:36 mgcl2 bond 9:14 electrovalency 13:40 metal and non metal 16:00 lattice nrg 19:18 which is more ionic 20:19 ^ Tip:watch video on 1.75 or 2.0X speed to save time"
    },
    {
      "comment_id": "UgzMdFNbopyorI_iFft4AaABAg.911-lqQzW5q9BUduuTj0UF",
      "parent_id": "UgzMdFNbopyorI_iFft4AaABAg",
      "comment_type": "reply",
      "author": "@utkarshkhandelwal593",
      "likes": 1,
      "published_at": "2020-07-24T08:17:56Z",
      "timestamp_refs": [],
      "text": "@Rmusico933 @Ppd Taker aapne jo ye kha mne uspr reply nhi kia vo shi bhi likha h apne but apne jo uske baad car guy se jis trh baat kri vo meko accha ni lga toh mne jo meko bolna tha vo bol diya. N aap ne jo likha ki never judge a person by its words ,toh meko lgta h ki sbse accha insaan ko judge krne ka tareeka uske bolne ka nature hi hota h",
      "parent_context": "Timestamps: 6:00 Lewis dot structure 7:04 ionic bonds 7:36 mgcl2 bond 9:14 electrovalency 13:40 metal and non metal 16:00 lattice nrg 19:18 which is more ionic 20:19 ^ Tip:watch video on 1.75 or 2.0X speed to save time"
    },
    {
      "comment_id": "UgzMdFNbopyorI_iFft4AaABAg.911-lqQzW5q9BUeo-eCGzl",
      "parent_id": "UgzMdFNbopyorI_iFft4AaABAg",
      "comment_type": "reply",
      "author": "@utkarshkhandelwal593",
      "likes": 2,
      "published_at": "2020-07-24T08:25:44Z",
      "timestamp_refs": [],
      "text": "@Rmusico933 agr koi insaan kisi insaan ko judge na kre toh ye zaruri ni ki dusra insaan bhi usko judge ni krega n hm indians ko hamesha sikhaya gaya h ki glt hote hue dekhna bhi utna hi bda apradh h jitna bda apradh glt shna n glt krna hota h. toh m is indians ki soch ko lekr aaapse bola Agr aaapko meri koi baaat glt lgi hui toh cmmnt krke bta dena bcoz insaaan se hi glti hoti h n m apni us glti ko sudhar bhi lunga bcoz insaan hi apni glti ko sudharta h",
      "parent_context": "Timestamps: 6:00 Lewis dot structure 7:04 ionic bonds 7:36 mgcl2 bond 9:14 electrovalency 13:40 metal and non metal 16:00 lattice nrg 19:18 which is more ionic 20:19 ^ Tip:watch video on 1.75 or 2.0X speed to save time"
    },
    {
      "comment_id": "UgzMdFNbopyorI_iFft4AaABAg.911-lqQzW5q9BUgXA_M5zJ",
      "parent_id": "UgzMdFNbopyorI_iFft4AaABAg",
      "comment_type": "reply",
      "author": "@Rmusico933",
      "likes": 0,
      "published_at": "2020-07-24T08:40:46Z",
      "timestamp_refs": [],
      "text": "@utkarshkhandelwal593 mujhe bhura nehi laga....agar meri bhi bate bhura apko laga to boldena.....man kia to itna baate bol dia...chalo choro.....enjoy...",
      "parent_context": "Timestamps: 6:00 Lewis dot structure 7:04 ionic bonds 7:36 mgcl2 bond 9:14 electrovalency 13:40 metal and non metal 16:00 lattice nrg 19:18 which is more ionic 20:19 ^ Tip:watch video on 1.75 or 2.0X speed to save time"
    },
    {
      "comment_id": "UgzMdFNbopyorI_iFft4AaABAg.911-lqQzW5q9BUh6zQ78hP",
      "parent_id": "UgzMdFNbopyorI_iFft4AaABAg",
      "comment_type": "reply",
      "author": "@utkarshkhandelwal593",
      "likes": 2,
      "published_at": "2020-07-24T08:45:56Z",
      "timestamp_refs": [],
      "text": "@Rmusico933 aap abhi 11 m aye ho n knse chptr pr ho abhi? N agr aap 11 pass ho toh please suggest me some good books for chemistry class11",
      "parent_context": "Timestamps: 6:00 Lewis dot structure 7:04 ionic bonds 7:36 mgcl2 bond 9:14 electrovalency 13:40 metal and non metal 16:00 lattice nrg 19:18 which is more ionic 20:19 ^ Tip:watch video on 1.75 or 2.0X speed to save time"
    },
    {
      "comment_id": "UgzMdFNbopyorI_iFft4AaABAg.911-lqQzW5q9BUhzNbk3Ce",
      "parent_id": "UgzMdFNbopyorI_iFft4AaABAg",
      "comment_type": "reply",
      "author": "@Rmusico933",
      "likes": 1,
      "published_at": "2020-07-24T08:53:30Z",
      "timestamp_refs": [],
      "text": "@utkarshkhandelwal593 bhai mai abhi 11 padh raha hu.....agar chemistry book lete ho..to cengage accha...hai..ap 11 ke sath jee ya neet ka taiyari ek sath kar sakte ho..cengage ka 5 bool ata hai..3 mere kkhayal se 11 ka hai... o lelo....maa to westbengal se hu..yaha par hamara government book ke sath jee ke lie cengage lia...cengage padho...concept build up ho jyga ..english me hai...matlab all india ka book hai",
      "parent_context": "Timestamps: 6:00 Lewis dot structure 7:04 ionic bonds 7:36 mgcl2 bond 9:14 electrovalency 13:40 metal and non metal 16:00 lattice nrg 19:18 which is more ionic 20:19 ^ Tip:watch video on 1.75 or 2.0X speed to save time"
    },
    {
      "comment_id": "UgzMdFNbopyorI_iFft4AaABAg.911-lqQzW5q9BUiC4Frdw7",
      "parent_id": "UgzMdFNbopyorI_iFft4AaABAg",
      "comment_type": "reply",
      "author": "@Rmusico933",
      "likes": 1,
      "published_at": "2020-07-24T08:55:22Z",
      "timestamp_refs": [],
      "text": "@utkarshkhandelwal593 ncert to tomara school book hai...ha na...cengage..arihant..sl loney sab ka book le sakte ho ..par me to cengage ko jada prefer kar ta hu..kiuki theory bohot badiya hai or questions bhi bohot hai",
      "parent_context": "Timestamps: 6:00 Lewis dot structure 7:04 ionic bonds 7:36 mgcl2 bond 9:14 electrovalency 13:40 metal and non metal 16:00 lattice nrg 19:18 which is more ionic 20:19 ^ Tip:watch video on 1.75 or 2.0X speed to save time"
    },
    {
      "comment_id": "UgzMdFNbopyorI_iFft4AaABAg.911-lqQzW5q9BUkJrJheq0",
      "parent_id": "UgzMdFNbopyorI_iFft4AaABAg",
      "comment_type": "reply",
      "author": "@utkarshkhandelwal593",
      "likes": 1,
      "published_at": "2020-07-24T09:13:54Z",
      "timestamp_refs": [],
      "text": "@Rmusico933 online mil jaegi n chemistry ki h na?",
      "parent_context": "Timestamps: 6:00 Lewis dot structure 7:04 ionic bonds 7:36 mgcl2 bond 9:14 electrovalency 13:40 metal and non metal 16:00 lattice nrg 19:18 which is more ionic 20:19 ^ Tip:watch video on 1.75 or 2.0X speed to save time"
    },
    {
      "comment_id": "UgzMdFNbopyorI_iFft4AaABAg.911-lqQzW5q9BeYyNyKZU6",
      "parent_id": "UgzMdFNbopyorI_iFft4AaABAg",
      "comment_type": "reply",
      "author": "@sanaf111",
      "likes": 5,
      "published_at": "2020-07-28T13:57:37Z",
      "timestamp_refs": [],
      "text": "Your comment should be pinned at top in every video,😂",
      "parent_context": "Timestamps: 6:00 Lewis dot structure 7:04 ionic bonds 7:36 mgcl2 bond 9:14 electrovalency 13:40 metal and non metal 16:00 lattice nrg 19:18 which is more ionic 20:19 ^ Tip:watch video on 1.75 or 2.0X speed to save time"
    },
    {
      "comment_id": "UgzMdFNbopyorI_iFft4AaABAg.911-lqQzW5q9BvfW33Xiff",
      "parent_id": "UgzMdFNbopyorI_iFft4AaABAg",
      "comment_type": "reply",
      "author": "@abhishektomar2222",
      "likes": 2,
      "published_at": "2020-08-04T05:30:37Z",
      "timestamp_refs": [],
      "text": "🤣🤣what is going on",
      "parent_context": "Timestamps: 6:00 Lewis dot structure 7:04 ionic bonds 7:36 mgcl2 bond 9:14 electrovalency 13:40 metal and non metal 16:00 lattice nrg 19:18 which is more ionic 20:19 ^ Tip:watch video on 1.75 or 2.0X speed to save time"
    },
    {
      "comment_id": "UgzMdFNbopyorI_iFft4AaABAg.911-lqQzW5q9CC5XOBH5uj",
      "parent_id": "UgzMdFNbopyorI_iFft4AaABAg",
      "comment_type": "reply",
      "author": "@Medicodoc-dn8dq",
      "likes": 0,
      "published_at": "2020-08-10T23:53:49Z",
      "timestamp_refs": [],
      "text": "@Rmusico933 bhai tum kis class mein ho",
      "parent_context": "Timestamps: 6:00 Lewis dot structure 7:04 ionic bonds 7:36 mgcl2 bond 9:14 electrovalency 13:40 metal and non metal 16:00 lattice nrg 19:18 which is more ionic 20:19 ^ Tip:watch video on 1.75 or 2.0X speed to save time"
    },
    {
      "comment_id": "UgzMdFNbopyorI_iFft4AaABAg.911-lqQzW5q9CXp5d22V08",
      "parent_id": "UgzMdFNbopyorI_iFft4AaABAg",
      "comment_type": "reply",
      "author": "@jagbirsingh5095",
      "likes": 1,
      "published_at": "2020-08-19T10:24:46Z",
      "timestamp_refs": [],
      "text": "Video should be watched at 1.75x",
      "parent_context": "Timestamps: 6:00 Lewis dot structure 7:04 ionic bonds 7:36 mgcl2 bond 9:14 electrovalency 13:40 metal and non metal 16:00 lattice nrg 19:18 which is more ionic 20:19 ^ Tip:watch video on 1.75 or 2.0X speed to save time"
    },
    {
      "comment_id": "UgzMdFNbopyorI_iFft4AaABAg.911-lqQzW5q9C_uS6hp5io",
      "parent_id": "UgzMdFNbopyorI_iFft4AaABAg",
      "comment_type": "reply",
      "author": "@mintupanda04",
      "likes": 0,
      "published_at": "2020-08-20T15:09:15Z",
      "timestamp_refs": [],
      "text": "@Rmusico933 itna gyan kha se laye",
      "parent_context": "Timestamps: 6:00 Lewis dot structure 7:04 ionic bonds 7:36 mgcl2 bond 9:14 electrovalency 13:40 metal and non metal 16:00 lattice nrg 19:18 which is more ionic 20:19 ^ Tip:watch video on 1.75 or 2.0X speed to save time"
    },
    {
      "comment_id": "UgzMdFNbopyorI_iFft4AaABAg.911-lqQzW5q9C_y4Rnj5Vy",
      "parent_id": "UgzMdFNbopyorI_iFft4AaABAg",
      "comment_type": "reply",
      "author": "@Rmusico933",
      "likes": 0,
      "published_at": "2020-08-20T15:40:58Z",
      "timestamp_refs": [],
      "text": "@mintupanda04 itna gyaan apk ghar se lekar aya mai",
      "parent_context": "Timestamps: 6:00 Lewis dot structure 7:04 ionic bonds 7:36 mgcl2 bond 9:14 electrovalency 13:40 metal and non metal 16:00 lattice nrg 19:18 which is more ionic 20:19 ^ Tip:watch video on 1.75 or 2.0X speed to save time"
    },
    {
      "comment_id": "UgzMdFNbopyorI_iFft4AaABAg.911-lqQzW5q9Ca-4_Bq9DK",
      "parent_id": "UgzMdFNbopyorI_iFft4AaABAg",
      "comment_type": "reply",
      "author": "@mintupanda04",
      "likes": 0,
      "published_at": "2020-08-20T15:58:28Z",
      "timestamp_refs": [],
      "text": "@Rmusico933 pta bhi hai mera ghar kha hai jo mere ghar se aakar leke gye",
      "parent_context": "Timestamps: 6:00 Lewis dot structure 7:04 ionic bonds 7:36 mgcl2 bond 9:14 electrovalency 13:40 metal and non metal 16:00 lattice nrg 19:18 which is more ionic 20:19 ^ Tip:watch video on 1.75 or 2.0X speed to save time"
    },
    {
      "comment_id": "UgzMdFNbopyorI_iFft4AaABAg.911-lqQzW5q9CbP8zvIJWY",
      "parent_id": "UgzMdFNbopyorI_iFft4AaABAg",
      "comment_type": "reply",
      "author": "@Rmusico933",
      "likes": 3,
      "published_at": "2020-08-21T05:05:30Z",
      "timestamp_refs": [],
      "text": "@mintupanda04 jaha tak mujhe pata hai apka ghar to binod k ghar ke pass hai",
      "parent_context": "Timestamps: 6:00 Lewis dot structure 7:04 ionic bonds 7:36 mgcl2 bond 9:14 electrovalency 13:40 metal and non metal 16:00 lattice nrg 19:18 which is more ionic 20:19 ^ Tip:watch video on 1.75 or 2.0X speed to save time"
    },
    {
      "comment_id": "UgzMdFNbopyorI_iFft4AaABAg.911-lqQzW5q9Cmu578EMvU",
      "parent_id": "UgzMdFNbopyorI_iFft4AaABAg",
      "comment_type": "reply",
      "author": "@namithabhat4237",
      "likes": 1,
      "published_at": "2020-08-25T16:16:14Z",
      "timestamp_refs": [],
      "text": "Thank you so much.",
      "parent_context": "Timestamps: 6:00 Lewis dot structure 7:04 ionic bonds 7:36 mgcl2 bond 9:14 electrovalency 13:40 metal and non metal 16:00 lattice nrg 19:18 which is more ionic 20:19 ^ Tip:watch video on 1.75 or 2.0X speed to save time"
    },
    {
      "comment_id": "UgzMdFNbopyorI_iFft4AaABAg.911-lqQzW5q9DTYemFibDR",
      "parent_id": "UgzMdFNbopyorI_iFft4AaABAg",
      "comment_type": "reply",
      "author": "@shubham_12-a19",
      "likes": 1,
      "published_at": "2020-09-11T15:06:51Z",
      "timestamp_refs": [],
      "text": "Thx for this",
      "parent_context": "Timestamps: 6:00 Lewis dot structure 7:04 ionic bonds 7:36 mgcl2 bond 9:14 electrovalency 13:40 metal and non metal 16:00 lattice nrg 19:18 which is more ionic 20:19 ^ Tip:watch video on 1.75 or 2.0X speed to save time"
    },
    {
      "comment_id": "UgzMdFNbopyorI_iFft4AaABAg.911-lqQzW5q9DiCIg41Xgr",
      "parent_id": "UgzMdFNbopyorI_iFft4AaABAg",
      "comment_type": "reply",
      "author": "@TECHNICALNERVES",
      "likes": 0,
      "published_at": "2020-09-17T16:59:18Z",
      "timestamp_refs": [],
      "text": "Thanks bro",
      "parent_context": "Timestamps: 6:00 Lewis dot structure 7:04 ionic bonds 7:36 mgcl2 bond 9:14 electrovalency 13:40 metal and non metal 16:00 lattice nrg 19:18 which is more ionic 20:19 ^ Tip:watch video on 1.75 or 2.0X speed to save time"
    },
    {
      "comment_id": "UgzMdFNbopyorI_iFft4AaABAg.911-lqQzW5q9DmCxwAfYtz",
      "parent_id": "UgzMdFNbopyorI_iFft4AaABAg",
      "comment_type": "reply",
      "author": "@user-be2xp7zd1b",
      "likes": 0,
      "published_at": "2020-09-19T06:22:02Z",
      "timestamp_refs": [],
      "text": "Thank u so much 🙂",
      "parent_context": "Timestamps: 6:00 Lewis dot structure 7:04 ionic bonds 7:36 mgcl2 bond 9:14 electrovalency 13:40 metal and non metal 16:00 lattice nrg 19:18 which is more ionic 20:19 ^ Tip:watch video on 1.75 or 2.0X speed to save time"
    },
    {
      "comment_id": "UgzMdFNbopyorI_iFft4AaABAg.911-lqQzW5q9EJFjd219_w",
      "parent_id": "UgzMdFNbopyorI_iFft4AaABAg",
      "comment_type": "reply",
      "author": "@Rmusico933",
      "likes": 0,
      "published_at": "2020-10-02T11:40:28Z",
      "timestamp_refs": [],
      "text": "@carguy7480 are yaar english me bolna tum chor to ...apne language me bolo.....khud to article preposition ka koi gya nehi...chance ke pahele a likhna parta hai ye bhi bhul gaye ho.....i think you have to work hard on your english.....i will be beneficial for you in days to come",
      "parent_context": "Timestamps: 6:00 Lewis dot structure 7:04 ionic bonds 7:36 mgcl2 bond 9:14 electrovalency 13:40 metal and non metal 16:00 lattice nrg 19:18 which is more ionic 20:19 ^ Tip:watch video on 1.75 or 2.0X speed to save time"
    },
    {
      "comment_id": "UgzMdFNbopyorI_iFft4AaABAg.911-lqQzW5q9EJGoPZO3eo",
      "parent_id": "UgzMdFNbopyorI_iFft4AaABAg",
      "comment_type": "reply",
      "author": "@carguy7480",
      "likes": 0,
      "published_at": "2020-10-02T11:49:52Z",
      "timestamp_refs": [],
      "text": "@Rmusico933 Maine kahi pe chance Likha hi Nahi...apko kahase dikha",
      "parent_context": "Timestamps: 6:00 Lewis dot structure 7:04 ionic bonds 7:36 mgcl2 bond 9:14 electrovalency 13:40 metal and non metal 16:00 lattice nrg 19:18 which is more ionic 20:19 ^ Tip:watch video on 1.75 or 2.0X speed to save time"
    },
    {
      "comment_id": "UgzMdFNbopyorI_iFft4AaABAg.911-lqQzW5q9EJRkrULi-I",
      "parent_id": "UgzMdFNbopyorI_iFft4AaABAg",
      "comment_type": "reply",
      "author": "@Rmusico933",
      "likes": 0,
      "published_at": "2020-10-02T13:25:30Z",
      "timestamp_refs": [],
      "text": "@carguy7480 lagta hai apko chasma lena padega ....giving me chance..... ..dekho.....chasma se bhi thik nehi hoga",
      "parent_context": "Timestamps: 6:00 Lewis dot structure 7:04 ionic bonds 7:36 mgcl2 bond 9:14 electrovalency 13:40 metal and non metal 16:00 lattice nrg 19:18 which is more ionic 20:19 ^ Tip:watch video on 1.75 or 2.0X speed to save time"
    },
    {
      "comment_id": "UgzMdFNbopyorI_iFft4AaABAg.911-lqQzW5q9EJuX_WYX7G",
      "parent_id": "UgzMdFNbopyorI_iFft4AaABAg",
      "comment_type": "reply",
      "author": "@carguy7480",
      "likes": 0,
      "published_at": "2020-10-02T17:45:42Z",
      "timestamp_refs": [],
      "text": "@Rmusico933 meri comments me to kahi Nahi dikha... 🕶️ye lo",
      "parent_context": "Timestamps: 6:00 Lewis dot structure 7:04 ionic bonds 7:36 mgcl2 bond 9:14 electrovalency 13:40 metal and non metal 16:00 lattice nrg 19:18 which is more ionic 20:19 ^ Tip:watch video on 1.75 or 2.0X speed to save time"
    },
    {
      "comment_id": "UgzMdFNbopyorI_iFft4AaABAg.911-lqQzW5q9EK-K70fCbD",
      "parent_id": "UgzMdFNbopyorI_iFft4AaABAg",
      "comment_type": "reply",
      "author": "@Rmusico933",
      "likes": 1,
      "published_at": "2020-10-02T18:36:17Z",
      "timestamp_refs": [],
      "text": "@carguy7480 sun glass hi de diya.......thank you ...😎😎😎😎😎 ye lo🛍🛍🛍🛍🛍🛍👜👜👜 chale aw humare shahar 😉",
      "parent_context": "Timestamps: 6:00 Lewis dot structure 7:04 ionic bonds 7:36 mgcl2 bond 9:14 electrovalency 13:40 metal and non metal 16:00 lattice nrg 19:18 which is more ionic 20:19 ^ Tip:watch video on 1.75 or 2.0X speed to save time"
    },
    {
      "comment_id": "UgzMdFNbopyorI_iFft4AaABAg.911-lqQzW5q9EOYyDqstoY",
      "parent_id": "UgzMdFNbopyorI_iFft4AaABAg",
      "comment_type": "reply",
      "author": "@Trying-f2w",
      "likes": 0,
      "published_at": "2020-10-04T13:04:42Z",
      "timestamp_refs": [],
      "text": "@Rmusico933 arre kya Insaan hai tu?",
      "parent_context": "Timestamps: 6:00 Lewis dot structure 7:04 ionic bonds 7:36 mgcl2 bond 9:14 electrovalency 13:40 metal and non metal 16:00 lattice nrg 19:18 which is more ionic 20:19 ^ Tip:watch video on 1.75 or 2.0X speed to save time"
    },
    {
      "comment_id": "UgzMdFNbopyorI_iFft4AaABAg.911-lqQzW5q9EgdDpiiq1F",
      "parent_id": "UgzMdFNbopyorI_iFft4AaABAg",
      "comment_type": "reply",
      "author": "@Jaatshab_123",
      "likes": 0,
      "published_at": "2020-10-11T22:56:13Z",
      "timestamp_refs": [],
      "text": "𝙹𝚑𝚞𝚝𝚑𝚎",
      "parent_context": "Timestamps: 6:00 Lewis dot structure 7:04 ionic bonds 7:36 mgcl2 bond 9:14 electrovalency 13:40 metal and non metal 16:00 lattice nrg 19:18 which is more ionic 20:19 ^ Tip:watch video on 1.75 or 2.0X speed to save time"
    },
    {
      "comment_id": "UgzMdFNbopyorI_iFft4AaABAg.911-lqQzW5q9G1FnzdDEZq",
      "parent_id": "UgzMdFNbopyorI_iFft4AaABAg",
      "comment_type": "reply",
      "author": "@techb4586",
      "likes": 0,
      "published_at": "2020-11-14T04:57:32Z",
      "timestamp_refs": [],
      "text": "@Rmusico933right",
      "parent_context": "Timestamps: 6:00 Lewis dot structure 7:04 ionic bonds 7:36 mgcl2 bond 9:14 electrovalency 13:40 metal and non metal 16:00 lattice nrg 19:18 which is more ionic 20:19 ^ Tip:watch video on 1.75 or 2.0X speed to save time"
    },
    {
      "comment_id": "UgzMdFNbopyorI_iFft4AaABAg.911-lqQzW5q9GRu4ma4Py2",
      "parent_id": "UgzMdFNbopyorI_iFft4AaABAg",
      "comment_type": "reply",
      "author": "@avanishpandey3708",
      "likes": 0,
      "published_at": "2020-11-24T13:18:28Z",
      "timestamp_refs": [],
      "text": "Sab apni maa baap ka samman karo desh ka naam karo",
      "parent_context": "Timestamps: 6:00 Lewis dot structure 7:04 ionic bonds 7:36 mgcl2 bond 9:14 electrovalency 13:40 metal and non metal 16:00 lattice nrg 19:18 which is more ionic 20:19 ^ Tip:watch video on 1.75 or 2.0X speed to save time"
    },
    {
      "comment_id": "UgzMdFNbopyorI_iFft4AaABAg.911-lqQzW5q9JG4_RIof01",
      "parent_id": "UgzMdFNbopyorI_iFft4AaABAg",
      "comment_type": "reply",
      "author": "@Mr-shubham",
      "likes": 1,
      "published_at": "2021-02-02T12:42:13Z",
      "timestamp_refs": [],
      "text": "Please bro every video ke liye bhi kar do na bro please🙏🙏🙏🙏🙏",
      "parent_context": "Timestamps: 6:00 Lewis dot structure 7:04 ionic bonds 7:36 mgcl2 bond 9:14 electrovalency 13:40 metal and non metal 16:00 lattice nrg 19:18 which is more ionic 20:19 ^ Tip:watch video on 1.75 or 2.0X speed to save time"
    },
    {
      "comment_id": "Ugz4t4gVVjORr5Jj_W94AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@Dr.yadav0",
      "likes": 171,
      "published_at": "2023-12-13T04:36:11Z",
      "timestamp_refs": [],
      "text": "Ye videos saalo saal tak jinda rhengi coming aspirants of 2024,25,26,27,28...... student like that comment to assure alakh sir hard work ✨💥",
      "parent_context": ""
    },
    {
      "comment_id": "Ugz4t4gVVjORr5Jj_W94AaABAg.9yFQr2OZaQkAKUQOoZS6U6",
      "parent_id": "Ugz4t4gVVjORr5Jj_W94AaABAg",
      "comment_type": "reply",
      "author": "@innocentqueen-jo7ol",
      "likes": 4,
      "published_at": "2025-07-12T16:22:52Z",
      "timestamp_refs": [],
      "text": "Aagaye bro 2025 aspirints❤",
      "parent_context": "Ye videos saalo saal tak jinda rhengi coming aspirants of 2024,25,26,27,28...... student like that comment to assure alakh sir hard work ✨💥"
    },
    {
      "comment_id": "Ugz4t4gVVjORr5Jj_W94AaABAg.9yFQr2OZaQkAMvouMGHJkb",
      "parent_id": "Ugz4t4gVVjORr5Jj_W94AaABAg",
      "comment_type": "reply",
      "author": "@AnshilYadav-hd4kn",
      "likes": 6,
      "published_at": "2025-09-11T10:07:17Z",
      "timestamp_refs": [],
      "text": "Aa gye bhai 2026",
      "parent_context": "Ye videos saalo saal tak jinda rhengi coming aspirants of 2024,25,26,27,28...... student like that comment to assure alakh sir hard work ✨💥"
    },
    {
      "comment_id": "Ugz4t4gVVjORr5Jj_W94AaABAg.9yFQr2OZaQkAMw-5_BGnZY",
      "parent_id": "Ugz4t4gVVjORr5Jj_W94AaABAg",
      "comment_type": "reply",
      "author": "@innocentqueen-jo7ol",
      "likes": 3,
      "published_at": "2025-09-11T11:45:04Z",
      "timestamp_refs": [],
      "text": "​@AnshilYadav-hd4kn me to 2027 wali neet aspirants hoon but ye to Mera 11 hai neet ke sath",
      "parent_context": "Ye videos saalo saal tak jinda rhengi coming aspirants of 2024,25,26,27,28...... student like that comment to assure alakh sir hard work ✨💥"
    },
    {
      "comment_id": "Ugz4t4gVVjORr5Jj_W94AaABAg.9yFQr2OZaQkAPaDPqVZEsi",
      "parent_id": "Ugz4t4gVVjORr5Jj_W94AaABAg",
      "comment_type": "reply",
      "author": "@KhushiKumari-j9w7l",
      "likes": 2,
      "published_at": "2025-11-16T14:21:03Z",
      "timestamp_refs": [],
      "text": "A Gaya bro 2028 aspirants",
      "parent_context": "Ye videos saalo saal tak jinda rhengi coming aspirants of 2024,25,26,27,28...... student like that comment to assure alakh sir hard work ✨💥"
    },
    {
      "comment_id": "Ugz4t4gVVjORr5Jj_W94AaABAg.9yFQr2OZaQkAXC9zquuBVY",
      "parent_id": "Ugz4t4gVVjORr5Jj_W94AaABAg",
      "comment_type": "reply",
      "author": "@crazybeinglife",
      "likes": 0,
      "published_at": "2026-05-24T17:01:18Z",
      "timestamp_refs": [],
      "text": "2027",
      "parent_context": "Ye videos saalo saal tak jinda rhengi coming aspirants of 2024,25,26,27,28...... student like that comment to assure alakh sir hard work ✨💥"
    },
    {
      "comment_id": "Ugw7yR-NXY6N7SbQWhJ4AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@ipltv-bn6kw",
      "likes": 396,
      "published_at": "2018-07-13T06:20:47Z",
      "timestamp_refs": [],
      "text": "Aapka bhagvan bhala karega Aap bohot ache ho",
      "parent_context": ""
    },
    {
      "comment_id": "Ugw7yR-NXY6N7SbQWhJ4AaABAg.8icqfeDCwjv8lIcRdvj6Pk",
      "parent_id": "Ugw7yR-NXY6N7SbQWhJ4AaABAg",
      "comment_type": "reply",
      "author": "@modifysingh4901",
      "likes": 4,
      "published_at": "2018-09-17T14:06:32Z",
      "timestamp_refs": [],
      "text": "Sir U are doing a really not good excellent work God bless you",
      "parent_context": "Aapka bhagvan bhala karega Aap bohot ache ho"
    },
    {
      "comment_id": "Ugw7yR-NXY6N7SbQWhJ4AaABAg.8icqfeDCwjv8rgzXwJ3J6B",
      "parent_id": "Ugw7yR-NXY6N7SbQWhJ4AaABAg",
      "comment_type": "reply",
      "author": "@Ηπιτιζκ",
      "likes": 3,
      "published_at": "2019-02-23T13:37:45Z",
      "timestamp_refs": [],
      "text": "Yo to hai",
      "parent_context": "Aapka bhagvan bhala karega Aap bohot ache ho"
    },
    {
      "comment_id": "Ugw7yR-NXY6N7SbQWhJ4AaABAg.8icqfeDCwjv8ynZ-ImelFa",
      "parent_id": "Ugw7yR-NXY6N7SbQWhJ4AaABAg",
      "comment_type": "reply",
      "author": "@riyapal5909",
      "likes": 2,
      "published_at": "2019-08-19T02:31:32Z",
      "timestamp_refs": [],
      "text": "No doubt in it !!!🙏🙏",
      "parent_context": "Aapka bhagvan bhala karega Aap bohot ache ho"
    },
    {
      "comment_id": "Ugw7yR-NXY6N7SbQWhJ4AaABAg.8icqfeDCwjvA8dlQbZC68K",
      "parent_id": "Ugw7yR-NXY6N7SbQWhJ4AaABAg",
      "comment_type": "reply",
      "author": "@riteshverma9041",
      "likes": 0,
      "published_at": "2024-09-21T10:31:01Z",
      "timestamp_refs": [],
      "text": "bhai tu apna bhala kr le sir ka bhala already ho rha hai...",
      "parent_context": "Aapka bhagvan bhala karega Aap bohot ache ho"
    },
    {
      "comment_id": "UgynDZkxyPHV0nMHYrV4AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@sagarchoubey393",
      "likes": 190,
      "published_at": "2021-01-05T03:42:39Z",
      "timestamp_refs": [
        "0:45"
      ],
      "text": "One of the amazing things of his lectures that he started on 0:45 unlike others, who take lot of time to introduce themselves and their foundation and all that shits.",
      "parent_context": ""
    },
    {
      "comment_id": "UgynDZkxyPHV0nMHYrV4AaABAg.9I70_05GNyL9hI6Dzvnznq",
      "parent_id": "UgynDZkxyPHV0nMHYrV4AaABAg",
      "comment_type": "reply",
      "author": "@AshishKhetwal",
      "likes": 3,
      "published_at": "2022-10-17T16:39:58Z",
      "timestamp_refs": [],
      "text": "Movie Shorts bhai tu alag hi rehna",
      "parent_context": "One of the amazing things of his lectures that he started on 0:45 unlike others, who take lot of time to introduce themselves and their foundation and all that shits."
    },
    {
      "comment_id": "UgymeH_Cgdr1F41RvfZ4AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@dwijeshkumartiwari2011",
      "likes": 309,
      "published_at": "2021-02-14T16:42:30Z",
      "timestamp_refs": [],
      "text": "You were sweating while recording this and now you teach students in hybrid mode. Your hard work and consistency is inspiring especially for me 😊😊",
      "parent_context": ""
    },
    {
      "comment_id": "UgymeH_Cgdr1F41RvfZ4AaABAg.9JkPbmj9K669RVy4mBi0gc",
      "parent_id": "UgymeH_Cgdr1F41RvfZ4AaABAg",
      "comment_type": "reply",
      "author": "@yatharth2426",
      "likes": 21,
      "published_at": "2021-08-26T12:55:43Z",
      "timestamp_refs": [],
      "text": "I also sweat when i study so thank me too bishh",
      "parent_context": "You were sweating while recording this and now you teach students in hybrid mode. Your hard work and consistency is inspiring especially for me 😊😊"
    },
    {
      "comment_id": "UgymeH_Cgdr1F41RvfZ4AaABAg.9JkPbmj9K669TM1LjG7Lzb",
      "parent_id": "UgymeH_Cgdr1F41RvfZ4AaABAg",
      "comment_type": "reply",
      "author": "@ayushgaming7545",
      "likes": 0,
      "published_at": "2021-10-11T09:23:22Z",
      "timestamp_refs": [],
      "text": "@yatharth2426 😂😂",
      "parent_context": "You were sweating while recording this and now you teach students in hybrid mode. Your hard work and consistency is inspiring especially for me 😊😊"
    },
    {
      "comment_id": "UgymeH_Cgdr1F41RvfZ4AaABAg.9JkPbmj9K669ZuSlGWose0",
      "parent_id": "UgymeH_Cgdr1F41RvfZ4AaABAg",
      "comment_type": "reply",
      "author": "@GunjanR516",
      "likes": 2,
      "published_at": "2022-03-23T06:44:43Z",
      "timestamp_refs": [],
      "text": "@yatharth2426 😂😂 so hardworking person you are!!",
      "parent_context": "You were sweating while recording this and now you teach students in hybrid mode. Your hard work and consistency is inspiring especially for me 😊😊"
    },
    {
      "comment_id": "UgymeH_Cgdr1F41RvfZ4AaABAg.9JkPbmj9K669vFrq1GORQn",
      "parent_id": "UgymeH_Cgdr1F41RvfZ4AaABAg",
      "comment_type": "reply",
      "author": "@SabareeshReddy007",
      "likes": 0,
      "published_at": "2023-09-29T19:06:32Z",
      "timestamp_refs": [],
      "text": "@yatharth2426his teaching helps many people understand many complicated topics bro What the hell do you do to benefit others?",
      "parent_context": "You were sweating while recording this and now you teach students in hybrid mode. Your hard work and consistency is inspiring especially for me 😊😊"
    },
    {
      "comment_id": "UgxDdhhhum6m_AhXTD94AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@suryansharora4071",
      "likes": 18,
      "published_at": "2024-08-11T17:46:49Z",
      "timestamp_refs": [],
      "text": "You are the greatest teacher sir 🛐",
      "parent_context": ""
    },
    {
      "comment_id": "Ugykxo3lsnYAgGC8qgl4AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@mahimahi753",
      "likes": 154,
      "published_at": "2020-11-07T13:34:15Z",
      "timestamp_refs": [],
      "text": "I can't understand how can a teacher explain this sort of stuff so well?... I really wanna appreciate his teaching skills and wanted to give him bow respect he deserves so much respect and trending videos too...",
      "parent_context": ""
    },
    {
      "comment_id": "Ugykxo3lsnYAgGC8qgl4AaABAg.9Fl9NSYVIlH9RVyEw0m5pV",
      "parent_id": "Ugykxo3lsnYAgGC8qgl4AaABAg",
      "comment_type": "reply",
      "author": "@yatharth2426",
      "likes": 1,
      "published_at": "2021-08-26T12:57:07Z",
      "timestamp_refs": [],
      "text": "thats what all teachers get pay for",
      "parent_context": "I can't understand how can a teacher explain this sort of stuff so well?... I really wanna appreciate his teaching skills and wanted to give him bow respect he deserves so much respect and trending videos too..."
    },
    {
      "comment_id": "Ugw2-GyX-3IOTAsyfV94AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@mohanshah4289",
      "likes": 203,
      "published_at": "2021-03-15T04:28:25Z",
      "timestamp_refs": [],
      "text": "He is such a great teacher that he teaches mole times better than my class teacher😂👌",
      "parent_context": ""
    },
    {
      "comment_id": "Ugw2-GyX-3IOTAsyfV94AaABAg.9Ktlea7RsT89RVxxVdVY31",
      "parent_id": "Ugw2-GyX-3IOTAsyfV94AaABAg",
      "comment_type": "reply",
      "author": "@yatharth2426",
      "likes": 5,
      "published_at": "2021-08-26T12:54:36Z",
      "timestamp_refs": [],
      "text": "you should start geeting english classes",
      "parent_context": "He is such a great teacher that he teaches mole times better than my class teacher😂👌"
    },
    {
      "comment_id": "Ugw2-GyX-3IOTAsyfV94AaABAg.9Ktlea7RsT89Rgvv7Qm_cy",
      "parent_id": "Ugw2-GyX-3IOTAsyfV94AaABAg",
      "comment_type": "reply",
      "author": "@arhan5382",
      "likes": 26,
      "published_at": "2021-08-31T04:27:41Z",
      "timestamp_refs": [],
      "text": "@yatharth2426 dekho bol kon raha hai? Geeting😂😂",
      "parent_context": "He is such a great teacher that he teaches mole times better than my class teacher😂👌"
    },
    {
      "comment_id": "Ugw2-GyX-3IOTAsyfV94AaABAg.9Ktlea7RsT89RnMkR33GU8",
      "parent_id": "Ugw2-GyX-3IOTAsyfV94AaABAg",
      "comment_type": "reply",
      "author": "@aaniyasiddiqui9858",
      "likes": 4,
      "published_at": "2021-09-02T16:26:20Z",
      "timestamp_refs": [],
      "text": "@arhan5382 😂",
      "parent_context": "He is such a great teacher that he teaches mole times better than my class teacher😂👌"
    },
    {
      "comment_id": "Ugw2-GyX-3IOTAsyfV94AaABAg.9Ktlea7RsT89TB_5zmtBUN",
      "parent_id": "Ugw2-GyX-3IOTAsyfV94AaABAg",
      "comment_type": "reply",
      "author": "@perfectionist4036",
      "likes": 11,
      "published_at": "2021-10-07T07:55:25Z",
      "timestamp_refs": [],
      "text": "Manan Kochhar he can't understand that joke 🤣",
      "parent_context": "He is such a great teacher that he teaches mole times better than my class teacher😂👌"
    },
    {
      "comment_id": "Ugw2-GyX-3IOTAsyfV94AaABAg.9Ktlea7RsT89TvWfCmT89J",
      "parent_id": "Ugw2-GyX-3IOTAsyfV94AaABAg",
      "comment_type": "reply",
      "author": "@Abhiraj-cj5ki",
      "likes": 4,
      "published_at": "2021-10-25T13:29:43Z",
      "timestamp_refs": [],
      "text": "That's too big",
      "parent_context": "He is such a great teacher that he teaches mole times better than my class teacher😂👌"
    },
    {
      "comment_id": "Ugw2-GyX-3IOTAsyfV94AaABAg.9Ktlea7RsT89U9azI_go1_",
      "parent_id": "Ugw2-GyX-3IOTAsyfV94AaABAg",
      "comment_type": "reply",
      "author": "@m.s.dawood6985",
      "likes": 5,
      "published_at": "2021-10-31T10:04:45Z",
      "timestamp_refs": [],
      "text": "@perfectionist4036 😂yes ,he need to learn chemistry🤣",
      "parent_context": "He is such a great teacher that he teaches mole times better than my class teacher😂👌"
    },
    {
      "comment_id": "Ugw2-GyX-3IOTAsyfV94AaABAg.9Ktlea7RsT89UGnvjLBY-1",
      "parent_id": "Ugw2-GyX-3IOTAsyfV94AaABAg",
      "comment_type": "reply",
      "author": "@mostbrilliant3423",
      "likes": 4,
      "published_at": "2021-11-03T05:12:33Z",
      "timestamp_refs": [],
      "text": "@m.s.dawood6985 and English also😂😂😂!!!!geeting😂😂😂",
      "parent_context": "He is such a great teacher that he teaches mole times better than my class teacher😂👌"
    },
    {
      "comment_id": "Ugw2-GyX-3IOTAsyfV94AaABAg.9Ktlea7RsT89UM1s3crwnm",
      "parent_id": "Ugw2-GyX-3IOTAsyfV94AaABAg",
      "comment_type": "reply",
      "author": "@KentuckyFriedChildren05",
      "likes": 9,
      "published_at": "2021-11-05T05:59:19Z",
      "timestamp_refs": [],
      "text": "@yatharth2426 Work on your sense of humor,bud! (And English and chemistry too actually) 🤣😂",
      "parent_context": "He is such a great teacher that he teaches mole times better than my class teacher😂👌"
    },
    {
      "comment_id": "Ugw2-GyX-3IOTAsyfV94AaABAg.9Ktlea7RsT89hwKIBds--d",
      "parent_id": "Ugw2-GyX-3IOTAsyfV94AaABAg",
      "comment_type": "reply",
      "author": "@insaneff3686",
      "likes": 1,
      "published_at": "2022-11-02T16:51:44Z",
      "timestamp_refs": [],
      "text": "@yatharth2426 back fire ho gya agli baar try kriyo 😆",
      "parent_context": "He is such a great teacher that he teaches mole times better than my class teacher😂👌"
    },
    {
      "comment_id": "Ugw2-GyX-3IOTAsyfV94AaABAg.9Ktlea7RsT89wc1EtHbVcU",
      "parent_id": "Ugw2-GyX-3IOTAsyfV94AaABAg",
      "comment_type": "reply",
      "author": "@Rajputaditya20.0",
      "likes": 0,
      "published_at": "2023-11-02T15:31:22Z",
      "timestamp_refs": [],
      "text": "@insaneff3686 aukaat me haho beta",
      "parent_context": "He is such a great teacher that he teaches mole times better than my class teacher😂👌"
    },
    {
      "comment_id": "Ugw2-GyX-3IOTAsyfV94AaABAg.9Ktlea7RsT8A6K72obJ0Kl",
      "parent_id": "Ugw2-GyX-3IOTAsyfV94AaABAg",
      "comment_type": "reply",
      "author": "@SiddharthNavare",
      "likes": 1,
      "published_at": "2024-07-25T17:01:55Z",
      "timestamp_refs": [],
      "text": "😂😂Bhai roast pe roast...",
      "parent_context": "He is such a great teacher that he teaches mole times better than my class teacher😂👌"
    },
    {
      "comment_id": "Ugw2-GyX-3IOTAsyfV94AaABAg.9Ktlea7RsT8A76J204L_If",
      "parent_id": "Ugw2-GyX-3IOTAsyfV94AaABAg",
      "comment_type": "reply",
      "author": "@Shwe_ta04",
      "likes": 0,
      "published_at": "2024-08-14T04:48:41Z",
      "timestamp_refs": [],
      "text": "😂😂😆😆​@arhan5382",
      "parent_context": "He is such a great teacher that he teaches mole times better than my class teacher😂👌"
    },
    {
      "comment_id": "Ugy5M4WbmB9xU9d9dGd4AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@deenichannel4756",
      "likes": 41,
      "published_at": "2018-07-16T15:17:50Z",
      "timestamp_refs": [],
      "text": "One day everystudent will cram ur name...alakh pandey sir is best of whole utube and a gd person also.ur nature is truely awsm",
      "parent_context": ""
    },
    {
      "comment_id": "UgwRj4IiVRWsUsSVx_x4AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@Raylight5068",
      "likes": 4,
      "published_at": "2026-02-25T09:39:06Z",
      "timestamp_refs": [
        "0:01",
        "0:48",
        "5:54",
        "12:59",
        "18:21",
        "20:50"
      ],
      "text": "Timestamps -> 0:01 - Introduction 0:48 - Ionic bond 5:54 - Lewis Dot Structure (LDS) 12:59 - Favorable conditions/ Energy terms involved for formation of ionic bonds 18:21 - Which is more ionic? 20:50 - Properties of ionic compounds. Tysm sir 🥹🫶✨️",
      "parent_context": ""
    },
    {
      "comment_id": "UgwPw2jTKorEPb0fyP14AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@sagaryadu5323",
      "likes": 61,
      "published_at": "2021-12-15T02:14:10Z",
      "timestamp_refs": [],
      "text": "Really u are legend sirr. . You are only a teacher who knows student weak point ❤️✨",
      "parent_context": ""
    },
    {
      "comment_id": "UgyQGcnxaIfO8LdawOF4AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@nurjahanlaskar4272",
      "likes": 19,
      "published_at": "2019-08-05T16:10:25Z",
      "timestamp_refs": [],
      "text": "probably one of the best teachers in india.... alakh sir huge fan....you are truely a gem for indan students....lots of love from Assam",
      "parent_context": ""
    },
    {
      "comment_id": "UgwRoSsqVjhMcSUJYWx4AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@reenatiwari1023",
      "likes": 61,
      "published_at": "2021-10-06T07:59:29Z",
      "timestamp_refs": [],
      "text": "Can we take a moment to appreciate this man he is sweating but still he is explaining sincerely👌👌❤",
      "parent_context": ""
    },
    {
      "comment_id": "UgwRoSsqVjhMcSUJYWx4AaABAg.9T9-lsL00gK9eUt_3Lx3kX",
      "parent_id": "UgwRoSsqVjhMcSUJYWx4AaABAg",
      "comment_type": "reply",
      "author": "@natureloveingperson",
      "likes": 1,
      "published_at": "2022-08-09T02:16:35Z",
      "timestamp_refs": [],
      "text": "I love you 💓💓💓",
      "parent_context": "Can we take a moment to appreciate this man he is sweating but still he is explaining sincerely👌👌❤"
    },
    {
      "comment_id": "UgwRoSsqVjhMcSUJYWx4AaABAg.9T9-lsL00gK9i-JakFi3ZH",
      "parent_id": "UgwRoSsqVjhMcSUJYWx4AaABAg",
      "comment_type": "reply",
      "author": "@singhamit576",
      "likes": 2,
      "published_at": "2022-11-04T06:02:37Z",
      "timestamp_refs": [],
      "text": "@natureloveingperson 😂😂",
      "parent_context": "Can we take a moment to appreciate this man he is sweating but still he is explaining sincerely👌👌❤"
    },
    {
      "comment_id": "UgxcEP1S5wZ3v4wZk4R4AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@artist_Bina_",
      "likes": 4,
      "published_at": "2025-08-22T16:16:10Z",
      "timestamp_refs": [],
      "text": "He is teaching in a easy way 😊",
      "parent_context": ""
    },
    {
      "comment_id": "Ugxh6cm7suGL83NwiMF4AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@ajitdardare4565",
      "likes": 141,
      "published_at": "2019-11-20T09:26:17Z",
      "timestamp_refs": [],
      "text": "Aap ho toh \"NEET\" mumkin hai......Respected sir from my bottom of my heart thank you very much.❣️",
      "parent_context": ""
    },
    {
      "comment_id": "Ugxh6cm7suGL83NwiMF4AaABAg.91YlOKgoDNP9DwJeLw4aAD",
      "parent_id": "Ugxh6cm7suGL83NwiMF4AaABAg",
      "comment_type": "reply",
      "author": "@Chapter.byChapter",
      "likes": 2,
      "published_at": "2020-09-23T04:32:56Z",
      "timestamp_refs": [],
      "text": "True!❤️",
      "parent_context": "Aap ho toh \"NEET\" mumkin hai......Respected sir from my bottom of my heart thank you very much.❣️"
    },
    {
      "comment_id": "Ugxh6cm7suGL83NwiMF4AaABAg.91YlOKgoDNP9HRIQkP8JBi",
      "parent_id": "Ugxh6cm7suGL83NwiMF4AaABAg",
      "comment_type": "reply",
      "author": "@neetaspirant9699",
      "likes": 3,
      "published_at": "2020-12-19T04:12:05Z",
      "timestamp_refs": [],
      "text": "what is your score in NEET 2020",
      "parent_context": "Aap ho toh \"NEET\" mumkin hai......Respected sir from my bottom of my heart thank you very much.❣️"
    },
    {
      "comment_id": "Ugxh6cm7suGL83NwiMF4AaABAg.91YlOKgoDNP9HlT-l94Ae-",
      "parent_id": "Ugxh6cm7suGL83NwiMF4AaABAg",
      "comment_type": "reply",
      "author": "@IND25352",
      "likes": 1,
      "published_at": "2020-12-27T09:28:34Z",
      "timestamp_refs": [],
      "text": "@neetaspirant9699 😂😂",
      "parent_context": "Aap ho toh \"NEET\" mumkin hai......Respected sir from my bottom of my heart thank you very much.❣️"
    },
    {
      "comment_id": "Ugxh6cm7suGL83NwiMF4AaABAg.91YlOKgoDNP9J8ae84TK6Z",
      "parent_id": "Ugxh6cm7suGL83NwiMF4AaABAg",
      "comment_type": "reply",
      "author": "@deviarjunsai9d911",
      "likes": 0,
      "published_at": "2021-01-30T14:57:17Z",
      "timestamp_refs": [],
      "text": "wht is u r score in 2020",
      "parent_context": "Aap ho toh \"NEET\" mumkin hai......Respected sir from my bottom of my heart thank you very much.❣️"
    },
    {
      "comment_id": "Ugxh6cm7suGL83NwiMF4AaABAg.91YlOKgoDNP9KxAbhyNZjA",
      "parent_id": "Ugxh6cm7suGL83NwiMF4AaABAg",
      "comment_type": "reply",
      "author": "@samruddhikudavakkaligar3409",
      "likes": 1,
      "published_at": "2021-03-16T12:12:56Z",
      "timestamp_refs": [],
      "text": "@deviarjunsai9d911 what??🤔🤔",
      "parent_context": "Aap ho toh \"NEET\" mumkin hai......Respected sir from my bottom of my heart thank you very much.❣️"
    },
    {
      "comment_id": "Ugxh6cm7suGL83NwiMF4AaABAg.91YlOKgoDNP9LgJtMNihiF",
      "parent_id": "Ugxh6cm7suGL83NwiMF4AaABAg",
      "comment_type": "reply",
      "author": "@iramidrees2872",
      "likes": 3,
      "published_at": "2021-04-03T19:38:17Z",
      "timestamp_refs": [],
      "text": "Bhai neet crack ho gya?",
      "parent_context": "Aap ho toh \"NEET\" mumkin hai......Respected sir from my bottom of my heart thank you very much.❣️"
    },
    {
      "comment_id": "UgwVEScWlDvQ1t9TsNZ4AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@ayushimishra5494",
      "likes": 483,
      "published_at": "2021-02-18T04:41:55Z",
      "timestamp_refs": [],
      "text": "The only teacher who teaches 4.4million students❤️",
      "parent_context": ""
    },
    {
      "comment_id": "UgwVEScWlDvQ1t9TsNZ4AaABAg.9JtQKas-IRX9LEUqC3zZZc",
      "parent_id": "UgwVEScWlDvQ1t9TsNZ4AaABAg",
      "comment_type": "reply",
      "author": "@slayelectro7334",
      "likes": 8,
      "published_at": "2021-03-23T14:56:00Z",
      "timestamp_refs": [],
      "text": "Srry but 4.6 million",
      "parent_context": "The only teacher who teaches 4.4million students❤️"
    },
    {
      "comment_id": "UgwVEScWlDvQ1t9TsNZ4AaABAg.9JtQKas-IRX9LjpnYG62eT",
      "parent_id": "UgwVEScWlDvQ1t9TsNZ4AaABAg",
      "comment_type": "reply",
      "author": "@sujaynaidu598",
      "likes": 6,
      "published_at": "2021-04-05T04:23:34Z",
      "timestamp_refs": [],
      "text": "Khan sir teaches 7 million",
      "parent_context": "The only teacher who teaches 4.4million students❤️"
    },
    {
      "comment_id": "UgwVEScWlDvQ1t9TsNZ4AaABAg.9JtQKas-IRX9Oj4QDA4EGc",
      "parent_id": "UgwVEScWlDvQ1t9TsNZ4AaABAg",
      "comment_type": "reply",
      "author": "@anshusharma5724",
      "likes": 5,
      "published_at": "2021-06-18T10:55:00Z",
      "timestamp_refs": [],
      "text": "5.5 million",
      "parent_context": "The only teacher who teaches 4.4million students❤️"
    },
    {
      "comment_id": "UgwVEScWlDvQ1t9TsNZ4AaABAg.9JtQKas-IRX9RLROinbT9l",
      "parent_id": "UgwVEScWlDvQ1t9TsNZ4AaABAg",
      "comment_type": "reply",
      "author": "@user-rmoonlight",
      "likes": 4,
      "published_at": "2021-08-22T10:48:57Z",
      "timestamp_refs": [],
      "text": "5.43🙂",
      "parent_context": "The only teacher who teaches 4.4million students❤️"
    },
    {
      "comment_id": "UgwVEScWlDvQ1t9TsNZ4AaABAg.9JtQKas-IRX9RxU1fU5CtX",
      "parent_id": "UgwVEScWlDvQ1t9TsNZ4AaABAg",
      "comment_type": "reply",
      "author": "@kalvacharlaugender7451",
      "likes": 7,
      "published_at": "2021-09-06T14:42:24Z",
      "timestamp_refs": [],
      "text": "@slayelectro7334 sorry but 5.54M",
      "parent_context": "The only teacher who teaches 4.4million students❤️"
    },
    {
      "comment_id": "UgwVEScWlDvQ1t9TsNZ4AaABAg.9JtQKas-IRX9S8SthicgJh",
      "parent_id": "UgwVEScWlDvQ1t9TsNZ4AaABAg",
      "comment_type": "reply",
      "author": "@rahul_2101",
      "likes": 2,
      "published_at": "2021-09-11T06:23:19Z",
      "timestamp_refs": [],
      "text": "@kalvacharlaugender7451 Sorry but 5.54 million",
      "parent_context": "The only teacher who teaches 4.4million students❤️"
    },
    {
      "comment_id": "UgwVEScWlDvQ1t9TsNZ4AaABAg.9JtQKas-IRX9SMLPQFtgVr",
      "parent_id": "UgwVEScWlDvQ1t9TsNZ4AaABAg",
      "comment_type": "reply",
      "author": "@bobthecivilengineer7084",
      "likes": 2,
      "published_at": "2021-09-16T15:47:15Z",
      "timestamp_refs": [],
      "text": "@rahul_2101 sorry but 5.57 million",
      "parent_context": "The only teacher who teaches 4.4million students❤️"
    },
    {
      "comment_id": "UgwVEScWlDvQ1t9TsNZ4AaABAg.9JtQKas-IRX9SovtYM78zO",
      "parent_id": "UgwVEScWlDvQ1t9TsNZ4AaABAg",
      "comment_type": "reply",
      "author": "@inevitableraceway3873",
      "likes": 3,
      "published_at": "2021-09-28T03:32:47Z",
      "timestamp_refs": [],
      "text": "Sry but Dear sir ke zada hii",
      "parent_context": "The only teacher who teaches 4.4million students❤️"
    },
    {
      "comment_id": "UgwVEScWlDvQ1t9TsNZ4AaABAg.9JtQKas-IRX9VI9dinFUqG",
      "parent_id": "UgwVEScWlDvQ1t9TsNZ4AaABAg",
      "comment_type": "reply",
      "author": "@RealSujal1",
      "likes": 2,
      "published_at": "2021-11-28T14:21:42Z",
      "timestamp_refs": [],
      "text": "5.97",
      "parent_context": "The only teacher who teaches 4.4million students❤️"
    },
    {
      "comment_id": "UgwVEScWlDvQ1t9TsNZ4AaABAg.9JtQKas-IRX9VXm0WTnI1i",
      "parent_id": "UgwVEScWlDvQ1t9TsNZ4AaABAg",
      "comment_type": "reply",
      "author": "@Priyaaaaa004",
      "likes": 3,
      "published_at": "2021-12-04T15:54:21Z",
      "timestamp_refs": [],
      "text": "Now 6.01 Million",
      "parent_context": "The only teacher who teaches 4.4million students❤️"
    },
    {
      "comment_id": "UgwVEScWlDvQ1t9TsNZ4AaABAg.9JtQKas-IRX9X1C1BzXC5I",
      "parent_id": "UgwVEScWlDvQ1t9TsNZ4AaABAg",
      "comment_type": "reply",
      "author": "@pavannethi7375",
      "likes": 2,
      "published_at": "2022-01-10T17:18:13Z",
      "timestamp_refs": [],
      "text": "6.14 million",
      "parent_context": "The only teacher who teaches 4.4million students❤️"
    },
    {
      "comment_id": "UgwVEScWlDvQ1t9TsNZ4AaABAg.9JtQKas-IRX9XT1IoE2tMP",
      "parent_id": "UgwVEScWlDvQ1t9TsNZ4AaABAg",
      "comment_type": "reply",
      "author": "@MirRuman7",
      "likes": 2,
      "published_at": "2022-01-21T12:43:14Z",
      "timestamp_refs": [],
      "text": "6.24M",
      "parent_context": "The only teacher who teaches 4.4million students❤️"
    },
    {
      "comment_id": "UgwVEScWlDvQ1t9TsNZ4AaABAg.9JtQKas-IRX9ZqZfC8fEIE",
      "parent_id": "UgwVEScWlDvQ1t9TsNZ4AaABAg",
      "comment_type": "reply",
      "author": "@nirmitapd7848",
      "likes": 2,
      "published_at": "2022-03-21T18:28:05Z",
      "timestamp_refs": [],
      "text": "@DIXIT SAKSHAM 6.49",
      "parent_context": "The only teacher who teaches 4.4million students❤️"
    },
    {
      "comment_id": "UgwVEScWlDvQ1t9TsNZ4AaABAg.9JtQKas-IRX9_5Dn3W9It_",
      "parent_id": "UgwVEScWlDvQ1t9TsNZ4AaABAg",
      "comment_type": "reply",
      "author": "@a.for.abhinav_",
      "likes": 1,
      "published_at": "2022-03-27T20:24:46Z",
      "timestamp_refs": [],
      "text": "@nirmitapd7848 Sorry But 6.51",
      "parent_context": "The only teacher who teaches 4.4million students❤️"
    },
    {
      "comment_id": "UgwVEScWlDvQ1t9TsNZ4AaABAg.9JtQKas-IRX9cIb7XqbINl",
      "parent_id": "UgwVEScWlDvQ1t9TsNZ4AaABAg",
      "comment_type": "reply",
      "author": "@kamleshsingh4653",
      "likes": 1,
      "published_at": "2022-06-15T14:41:44Z",
      "timestamp_refs": [],
      "text": "@a.for.abhinav_ 7 million now",
      "parent_context": "The only teacher who teaches 4.4million students❤️"
    },
    {
      "comment_id": "UgwVEScWlDvQ1t9TsNZ4AaABAg.9JtQKas-IRX9cIbvAsll8j",
      "parent_id": "UgwVEScWlDvQ1t9TsNZ4AaABAg",
      "comment_type": "reply",
      "author": "@a.for.abhinav_",
      "likes": 2,
      "published_at": "2022-06-15T14:48:38Z",
      "timestamp_refs": [],
      "text": "@kamleshsingh4653 This number is nothing, PW is Unicorn now :-)",
      "parent_context": "The only teacher who teaches 4.4million students❤️"
    },
    {
      "comment_id": "UgwVEScWlDvQ1t9TsNZ4AaABAg.9JtQKas-IRX9g7JswYcMSc",
      "parent_id": "UgwVEScWlDvQ1t9TsNZ4AaABAg",
      "comment_type": "reply",
      "author": "@karantikoo9302",
      "likes": 1,
      "published_at": "2022-09-18T15:36:14Z",
      "timestamp_refs": [],
      "text": "1 billion now, dollars lol",
      "parent_context": "The only teacher who teaches 4.4million students❤️"
    },
    {
      "comment_id": "UgwVEScWlDvQ1t9TsNZ4AaABAg.9JtQKas-IRX9gIA0YQjJ9F",
      "parent_id": "UgwVEScWlDvQ1t9TsNZ4AaABAg",
      "comment_type": "reply",
      "author": "@satwikshaw1031",
      "likes": 0,
      "published_at": "2022-09-22T20:41:41Z",
      "timestamp_refs": [],
      "text": "@sameerpatel6575 8.5 M",
      "parent_context": "The only teacher who teaches 4.4million students❤️"
    },
    {
      "comment_id": "UgwVEScWlDvQ1t9TsNZ4AaABAg.9JtQKas-IRX9gOLO13w3gU",
      "parent_id": "UgwVEScWlDvQ1t9TsNZ4AaABAg",
      "comment_type": "reply",
      "author": "@skyofscience2142",
      "likes": 2,
      "published_at": "2022-09-25T06:16:27Z",
      "timestamp_refs": [],
      "text": "Sorry but 8.6 million now🙂🙂",
      "parent_context": "The only teacher who teaches 4.4million students❤️"
    },
    {
      "comment_id": "UgwVEScWlDvQ1t9TsNZ4AaABAg.9JtQKas-IRX9gZQ2G4e7yt",
      "parent_id": "UgwVEScWlDvQ1t9TsNZ4AaABAg",
      "comment_type": "reply",
      "author": "@ramrajsaini2269",
      "likes": 1,
      "published_at": "2022-09-29T13:28:49Z",
      "timestamp_refs": [],
      "text": "8.66 million students.",
      "parent_context": "The only teacher who teaches 4.4million students❤️"
    },
    {
      "comment_id": "UgwVEScWlDvQ1t9TsNZ4AaABAg.9JtQKas-IRX9hP6mkmGCR3",
      "parent_id": "UgwVEScWlDvQ1t9TsNZ4AaABAg",
      "comment_type": "reply",
      "author": "@btssso4118",
      "likes": 0,
      "published_at": "2022-10-20T09:59:32Z",
      "timestamp_refs": [],
      "text": "8.91 Million now",
      "parent_context": "The only teacher who teaches 4.4million students❤️"
    },
    {
      "comment_id": "UgwVEScWlDvQ1t9TsNZ4AaABAg.9JtQKas-IRX9hb-Y9EVLPb",
      "parent_id": "UgwVEScWlDvQ1t9TsNZ4AaABAg",
      "comment_type": "reply",
      "author": "@editzz711",
      "likes": 0,
      "published_at": "2022-10-25T10:06:21Z",
      "timestamp_refs": [],
      "text": "Soory but 9million now",
      "parent_context": "The only teacher who teaches 4.4million students❤️"
    },
    {
      "comment_id": "UgwVEScWlDvQ1t9TsNZ4AaABAg.9JtQKas-IRX9hbS2zWVDiE",
      "parent_id": "UgwVEScWlDvQ1t9TsNZ4AaABAg",
      "comment_type": "reply",
      "author": "@ramrajsaini2269",
      "likes": 0,
      "published_at": "2022-10-25T14:15:30Z",
      "timestamp_refs": [],
      "text": "Sorry bro 10 million in advance ♥️♥️♥️",
      "parent_context": "The only teacher who teaches 4.4million students❤️"
    },
    {
      "comment_id": "UgwVEScWlDvQ1t9TsNZ4AaABAg.9JtQKas-IRX9jC1jdBYGvV",
      "parent_id": "UgwVEScWlDvQ1t9TsNZ4AaABAg",
      "comment_type": "reply",
      "author": "@The_meme_guy8008",
      "likes": 0,
      "published_at": "2022-12-04T01:08:04Z",
      "timestamp_refs": [],
      "text": "Rd Sharma ki books uthalo kabhi",
      "parent_context": "The only teacher who teaches 4.4million students❤️"
    },
    {
      "comment_id": "UgwVEScWlDvQ1t9TsNZ4AaABAg.9JtQKas-IRX9jEwxb1p2CJ",
      "parent_id": "UgwVEScWlDvQ1t9TsNZ4AaABAg",
      "comment_type": "reply",
      "author": "@luckystargaming2643",
      "likes": 0,
      "published_at": "2022-12-05T04:15:16Z",
      "timestamp_refs": [],
      "text": "Now 9 million +",
      "parent_context": "The only teacher who teaches 4.4million students❤️"
    },
    {
      "comment_id": "UgwVEScWlDvQ1t9TsNZ4AaABAg.9JtQKas-IRX9oMeFeI2XvP",
      "parent_id": "UgwVEScWlDvQ1t9TsNZ4AaABAg",
      "comment_type": "reply",
      "author": "@fcukyounga",
      "likes": 0,
      "published_at": "2023-04-11T10:42:44Z",
      "timestamp_refs": [],
      "text": "10 million now !!",
      "parent_context": "The only teacher who teaches 4.4million students❤️"
    },
    {
      "comment_id": "UgwVEScWlDvQ1t9TsNZ4AaABAg.9JtQKas-IRX9qrnNnEJdSr",
      "parent_id": "UgwVEScWlDvQ1t9TsNZ4AaABAg",
      "comment_type": "reply",
      "author": "@momskitchen9979",
      "likes": 0,
      "published_at": "2023-06-12T15:20:59Z",
      "timestamp_refs": [],
      "text": "Now 10.3🔥🔥",
      "parent_context": "The only teacher who teaches 4.4million students❤️"
    },
    {
      "comment_id": "UgwVEScWlDvQ1t9TsNZ4AaABAg.9JtQKas-IRX9rOO1vMSWoP",
      "parent_id": "UgwVEScWlDvQ1t9TsNZ4AaABAg",
      "comment_type": "reply",
      "author": "@yep.its.meeh7",
      "likes": 2,
      "published_at": "2023-06-25T16:24:59Z",
      "timestamp_refs": [],
      "text": "Now 10.6 !!",
      "parent_context": "The only teacher who teaches 4.4million students❤️"
    },
    {
      "comment_id": "UgwVEScWlDvQ1t9TsNZ4AaABAg.9JtQKas-IRX9rtsce52dUe",
      "parent_id": "UgwVEScWlDvQ1t9TsNZ4AaABAg",
      "comment_type": "reply",
      "author": "@xapazedits7397",
      "likes": 1,
      "published_at": "2023-07-08T07:16:43Z",
      "timestamp_refs": [],
      "text": "@inevitableraceway3873 NOW 11MILLION",
      "parent_context": "The only teacher who teaches 4.4million students❤️"
    },
    {
      "comment_id": "UgwVEScWlDvQ1t9TsNZ4AaABAg.9JtQKas-IRX9sBMdt4z-BZ",
      "parent_id": "UgwVEScWlDvQ1t9TsNZ4AaABAg",
      "comment_type": "reply",
      "author": "@homeresswaif55",
      "likes": 0,
      "published_at": "2023-07-15T11:34:06Z",
      "timestamp_refs": [],
      "text": "​@sujaynaidu598k版市rインmyぢｃｋ",
      "parent_context": "The only teacher who teaches 4.4million students❤️"
    },
    {
      "comment_id": "UgwVEScWlDvQ1t9TsNZ4AaABAg.9JtQKas-IRX9uspmx3Xsbv",
      "parent_id": "UgwVEScWlDvQ1t9TsNZ4AaABAg",
      "comment_type": "reply",
      "author": "@prachii._.",
      "likes": 0,
      "published_at": "2023-09-20T11:06:52Z",
      "timestamp_refs": [],
      "text": "​@xapazedits739711.1 million 🙌🏻",
      "parent_context": "The only teacher who teaches 4.4million students❤️"
    },
    {
      "comment_id": "UgwVEScWlDvQ1t9TsNZ4AaABAg.9JtQKas-IRX9vaWP8WT2Az",
      "parent_id": "UgwVEScWlDvQ1t9TsNZ4AaABAg",
      "comment_type": "reply",
      "author": "@sakshamkatiyar-s3v",
      "likes": 0,
      "published_at": "2023-10-08T04:53:46Z",
      "timestamp_refs": [],
      "text": "​@yep.its.meeh7 now 11.2 m😊",
      "parent_context": "The only teacher who teaches 4.4million students❤️"
    },
    {
      "comment_id": "UgwVEScWlDvQ1t9TsNZ4AaABAg.9JtQKas-IRX9yz-97KHf5H",
      "parent_id": "UgwVEScWlDvQ1t9TsNZ4AaABAg",
      "comment_type": "reply",
      "author": "@_anshkatiyar",
      "likes": 0,
      "published_at": "2023-12-31T06:38:25Z",
      "timestamp_refs": [],
      "text": "​@slayelectro7334 11.5M",
      "parent_context": "The only teacher who teaches 4.4million students❤️"
    },
    {
      "comment_id": "UgwVEScWlDvQ1t9TsNZ4AaABAg.9JtQKas-IRX9z0QInZHeB_",
      "parent_id": "UgwVEScWlDvQ1t9TsNZ4AaABAg",
      "comment_type": "reply",
      "author": "@bhargaviprathapaneni514",
      "likes": 1,
      "published_at": "2024-01-01T05:14:09Z",
      "timestamp_refs": [],
      "text": "11.5 Million now🎉🎉",
      "parent_context": "The only teacher who teaches 4.4million students❤️"
    },
    {
      "comment_id": "UgwVEScWlDvQ1t9TsNZ4AaABAg.9JtQKas-IRXA1ESQHpbPJd",
      "parent_id": "UgwVEScWlDvQ1t9TsNZ4AaABAg",
      "comment_type": "reply",
      "author": "@AmritKumar-g8t",
      "likes": 1,
      "published_at": "2024-03-21T05:36:12Z",
      "timestamp_refs": [],
      "text": "10000000 million 😂",
      "parent_context": "The only teacher who teaches 4.4million students❤️"
    },
    {
      "comment_id": "UgwAtyve4-IVUDcgm4p4AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@mrdesertpremi89",
      "likes": 235,
      "published_at": "2022-10-14T18:26:38Z",
      "timestamp_refs": [],
      "text": "Who is watching this after 4 years Vote that alakh sir videos is best tha hai aur hamesa rahega❤️❤️",
      "parent_context": ""
    },
    {
      "comment_id": "UgwAtyve4-IVUDcgm4p4AaABAg.9hA_2f3Dptz9i3-6raiq8G",
      "parent_id": "UgwAtyve4-IVUDcgm4p4AaABAg",
      "comment_type": "reply",
      "author": "@shubhra9774",
      "likes": 0,
      "published_at": "2022-11-05T16:20:36Z",
      "timestamp_refs": [],
      "text": "Me.. After 4 years",
      "parent_context": "Who is watching this after 4 years Vote that alakh sir videos is best tha hai aur hamesa rahega❤️❤️"
    },
    {
      "comment_id": "UgwAtyve4-IVUDcgm4p4AaABAg.9hA_2f3Dptz9i3JL6V8wjO",
      "parent_id": "UgwAtyve4-IVUDcgm4p4AaABAg",
      "comment_type": "reply",
      "author": "@sushanttiwari9306",
      "likes": 0,
      "published_at": "2022-11-05T19:17:19Z",
      "timestamp_refs": [],
      "text": "🙋🏻‍♀️🙋🏻‍♀️",
      "parent_context": "Who is watching this after 4 years Vote that alakh sir videos is best tha hai aur hamesa rahega❤️❤️"
    },
    {
      "comment_id": "UgwAtyve4-IVUDcgm4p4AaABAg.9hA_2f3Dptz9iExErWX89O",
      "parent_id": "UgwAtyve4-IVUDcgm4p4AaABAg",
      "comment_type": "reply",
      "author": "@ritar469",
      "likes": 0,
      "published_at": "2022-11-10T07:46:22Z",
      "timestamp_refs": [],
      "text": "Jo is samay class 11 me hai wo to isi samay dekhenge na...",
      "parent_context": "Who is watching this after 4 years Vote that alakh sir videos is best tha hai aur hamesa rahega❤️❤️"
    },
    {
      "comment_id": "UgwAtyve4-IVUDcgm4p4AaABAg.9hA_2f3Dptz9jGQij-wueZ",
      "parent_id": "UgwAtyve4-IVUDcgm4p4AaABAg",
      "comment_type": "reply",
      "author": "@prakharshukla972",
      "likes": 0,
      "published_at": "2022-12-05T18:03:22Z",
      "timestamp_refs": [],
      "text": "Yes ⚛",
      "parent_context": "Who is watching this after 4 years Vote that alakh sir videos is best tha hai aur hamesa rahega❤️❤️"
    },
    {
      "comment_id": "UgwAtyve4-IVUDcgm4p4AaABAg.9hA_2f3Dptz9jY78gdaqT7",
      "parent_id": "UgwAtyve4-IVUDcgm4p4AaABAg",
      "comment_type": "reply",
      "author": "@viral11H",
      "likes": 0,
      "published_at": "2022-12-12T14:58:37Z",
      "timestamp_refs": [],
      "text": "I am watching this after 4year 😇😇",
      "parent_context": "Who is watching this after 4 years Vote that alakh sir videos is best tha hai aur hamesa rahega❤️❤️"
    },
    {
      "comment_id": "UgwWT0eU4nogj5bRQ9Z4AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@AnoopSingh-ko1sf",
      "likes": 33,
      "published_at": "2023-10-02T02:53:33Z",
      "timestamp_refs": [
        "11:57"
      ],
      "text": "for this time 11:57 mistake 😮. Not a Group 2 sir Group 3 to group 12 .",
      "parent_context": ""
    },
    {
      "comment_id": "UgwWT0eU4nogj5bRQ9Z4AaABAg.9vLqsHNfah5ATz81nsv0XI",
      "parent_id": "UgwWT0eU4nogj5bRQ9Z4AaABAg",
      "comment_type": "reply",
      "author": "@sadPlayzzz_YT",
      "likes": 0,
      "published_at": "2026-03-05T16:40:40Z",
      "timestamp_refs": [],
      "text": "😂😂😂😂😂😂",
      "parent_context": "for this time 11:57 mistake 😮. Not a Group 2 sir Group 3 to group 12 ."
    },
    {
      "comment_id": "UgwmgiPqQ31ZdoNdxJR4AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@itsvishal2980",
      "likes": 57,
      "published_at": "2019-12-26T17:04:17Z",
      "timestamp_refs": [],
      "text": "No Doubt!! It would be best video on Ionic bond in this Decade on entire youtube.",
      "parent_context": ""
    },
    {
      "comment_id": "UgwmgiPqQ31ZdoNdxJR4AaABAg.930HQOJo-u09wMYeIjQ4WM",
      "parent_id": "UgwmgiPqQ31ZdoNdxJR4AaABAg",
      "comment_type": "reply",
      "author": "@prashantpawar9925",
      "likes": 0,
      "published_at": "2023-10-27T05:56:15Z",
      "timestamp_refs": [],
      "text": "Medical clg m number laga ?",
      "parent_context": "No Doubt!! It would be best video on Ionic bond in this Decade on entire youtube."
    },
    {
      "comment_id": "Ugy8EWzmecRIW-_wcj94AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@user-7707",
      "likes": 230,
      "published_at": "2021-01-28T18:50:10Z",
      "timestamp_refs": [],
      "text": "Due to slow and steady syllabus of chemistry in Pace batch I came here",
      "parent_context": ""
    },
    {
      "comment_id": "Ugy8EWzmecRIW-_wcj94AaABAg.9J3ri-D9bj59JDVnchMmtv",
      "parent_id": "Ugy8EWzmecRIW-_wcj94AaABAg",
      "comment_type": "reply",
      "author": "@pinkink5289",
      "likes": 6,
      "published_at": "2021-02-01T12:42:21Z",
      "timestamp_refs": [],
      "text": "Same here 😕😅",
      "parent_context": "Due to slow and steady syllabus of chemistry in Pace batch I came here"
    },
    {
      "comment_id": "Ugy8EWzmecRIW-_wcj94AaABAg.9J3ri-D9bj59JOEgKn5V38",
      "parent_id": "Ugy8EWzmecRIW-_wcj94AaABAg",
      "comment_type": "reply",
      "author": "@ramishnaushad9662",
      "likes": 3,
      "published_at": "2021-02-05T16:44:27Z",
      "timestamp_refs": [],
      "text": "Oh really bro🙄😉😂",
      "parent_context": "Due to slow and steady syllabus of chemistry in Pace batch I came here"
    },
    {
      "comment_id": "Ugy8EWzmecRIW-_wcj94AaABAg.9J3ri-D9bj59JPkic997NC",
      "parent_id": "Ugy8EWzmecRIW-_wcj94AaABAg",
      "comment_type": "reply",
      "author": "@manujchadha622",
      "likes": 1,
      "published_at": "2021-02-06T06:52:22Z",
      "timestamp_refs": [],
      "text": "Same here 😂",
      "parent_context": "Due to slow and steady syllabus of chemistry in Pace batch I came here"
    },
    {
      "comment_id": "Ugy8EWzmecRIW-_wcj94AaABAg.9J3ri-D9bj59JPnPVArezc",
      "parent_id": "Ugy8EWzmecRIW-_wcj94AaABAg",
      "comment_type": "reply",
      "author": "@ramishnaushad9662",
      "likes": 1,
      "published_at": "2021-02-06T07:15:50Z",
      "timestamp_refs": [],
      "text": "@manujchadha622 ,are u a pcm student🙄??bro",
      "parent_context": "Due to slow and steady syllabus of chemistry in Pace batch I came here"
    },
    {
      "comment_id": "Ugy8EWzmecRIW-_wcj94AaABAg.9J3ri-D9bj59JPyFmZHB6D",
      "parent_id": "Ugy8EWzmecRIW-_wcj94AaABAg",
      "comment_type": "reply",
      "author": "@manujchadha622",
      "likes": 1,
      "published_at": "2021-02-06T08:50:38Z",
      "timestamp_refs": [],
      "text": "@ramishnaushad9662 yes bro kya hua?",
      "parent_context": "Due to slow and steady syllabus of chemistry in Pace batch I came here"
    },
    {
      "comment_id": "Ugy8EWzmecRIW-_wcj94AaABAg.9J3ri-D9bj59JQ-Ed-zgEo",
      "parent_id": "Ugy8EWzmecRIW-_wcj94AaABAg",
      "comment_type": "reply",
      "author": "@ramishnaushad9662",
      "likes": 1,
      "published_at": "2021-02-06T09:07:57Z",
      "timestamp_refs": [],
      "text": "@manujchadha622 nothing bro, I am asking 😃",
      "parent_context": "Due to slow and steady syllabus of chemistry in Pace batch I came here"
    },
    {
      "comment_id": "Ugy8EWzmecRIW-_wcj94AaABAg.9J3ri-D9bj59Lu5eD8ZnO6",
      "parent_id": "Ugy8EWzmecRIW-_wcj94AaABAg",
      "comment_type": "reply",
      "author": "@flashfeant7750",
      "likes": 3,
      "published_at": "2021-04-09T04:03:15Z",
      "timestamp_refs": [],
      "text": "pace ka sabhi teachers bakwaas hai",
      "parent_context": "Due to slow and steady syllabus of chemistry in Pace batch I came here"
    },
    {
      "comment_id": "Ugy8EWzmecRIW-_wcj94AaABAg.9J3ri-D9bj59MhcSxtW7ZD",
      "parent_id": "Ugy8EWzmecRIW-_wcj94AaABAg",
      "comment_type": "reply",
      "author": "@statushunters1011",
      "likes": 1,
      "published_at": "2021-04-29T04:19:57Z",
      "timestamp_refs": [],
      "text": "Are MC slow and steady wins the race",
      "parent_context": "Due to slow and steady syllabus of chemistry in Pace batch I came here"
    },
    {
      "comment_id": "Ugy8EWzmecRIW-_wcj94AaABAg.9J3ri-D9bj59O7ka9N5qCw",
      "parent_id": "Ugy8EWzmecRIW-_wcj94AaABAg",
      "comment_type": "reply",
      "author": "@tanishamonga7990",
      "likes": 0,
      "published_at": "2021-06-03T13:41:51Z",
      "timestamp_refs": [],
      "text": "Can you tell That is this playlist of chemical bonding enough or have Covered all concepts of JEE atleast conecepts for mains ? Plz tell🙏",
      "parent_context": "Due to slow and steady syllabus of chemistry in Pace batch I came here"
    },
    {
      "comment_id": "Ugy8EWzmecRIW-_wcj94AaABAg.9J3ri-D9bj59PG4YNZ_kfs",
      "parent_id": "Ugy8EWzmecRIW-_wcj94AaABAg",
      "comment_type": "reply",
      "author": "@amman272",
      "likes": 3,
      "published_at": "2021-07-01T15:50:18Z",
      "timestamp_refs": [],
      "text": "@tanishamonga7990 <im gonna comment too to get notified when some anwsers>",
      "parent_context": "Due to slow and steady syllabus of chemistry in Pace batch I came here"
    },
    {
      "comment_id": "Ugy8EWzmecRIW-_wcj94AaABAg.9J3ri-D9bj59PU5bEPdLiu",
      "parent_id": "Ugy8EWzmecRIW-_wcj94AaABAg",
      "comment_type": "reply",
      "author": "@kabirsood3631",
      "likes": 6,
      "published_at": "2021-07-07T02:28:56Z",
      "timestamp_refs": [],
      "text": "@tanishamonga7990 Yes his lecture are enough for jee advanced but only if you make notes with the lectures and truly follow his lectures.",
      "parent_context": "Due to slow and steady syllabus of chemistry in Pace batch I came here"
    },
    {
      "comment_id": "Ugy8EWzmecRIW-_wcj94AaABAg.9J3ri-D9bj59PUQaYG-vXr",
      "parent_id": "Ugy8EWzmecRIW-_wcj94AaABAg",
      "comment_type": "reply",
      "author": "@tanishamonga7990",
      "likes": 3,
      "published_at": "2021-07-07T05:32:20Z",
      "timestamp_refs": [],
      "text": "@kabirsood3631 Thanks for replying",
      "parent_context": "Due to slow and steady syllabus of chemistry in Pace batch I came here"
    },
    {
      "comment_id": "Ugy8EWzmecRIW-_wcj94AaABAg.9J3ri-D9bj59PURFOZ7FvW",
      "parent_id": "Ugy8EWzmecRIW-_wcj94AaABAg",
      "comment_type": "reply",
      "author": "@shaikzainab9485",
      "likes": 0,
      "published_at": "2021-07-07T05:38:03Z",
      "timestamp_refs": [],
      "text": "Same",
      "parent_context": "Due to slow and steady syllabus of chemistry in Pace batch I came here"
    },
    {
      "comment_id": "Ugy8EWzmecRIW-_wcj94AaABAg.9J3ri-D9bj59QGfe6sAezN",
      "parent_id": "Ugy8EWzmecRIW-_wcj94AaABAg",
      "comment_type": "reply",
      "author": "@theogfrustratedteenager",
      "likes": 0,
      "published_at": "2021-07-26T17:54:40Z",
      "timestamp_refs": [],
      "text": "@ramishnaushad9662 visit ma chanel",
      "parent_context": "Due to slow and steady syllabus of chemistry in Pace batch I came here"
    },
    {
      "comment_id": "Ugz1YIcXStG-XIbbVQh4AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@ashokchakraborty5027",
      "likes": 53,
      "published_at": "2021-07-27T02:35:55Z",
      "timestamp_refs": [],
      "text": "This man has an unique feature... He makes the students to imagine things... And that is what Science is which we can logically think and correlate with life...❤️",
      "parent_context": ""
    },
    {
      "comment_id": "Ugz1YIcXStG-XIbbVQh4AaABAg.9QHbIvrg04u9QuwX3-Lt6Y",
      "parent_id": "Ugz1YIcXStG-XIbbVQh4AaABAg",
      "comment_type": "reply",
      "author": "@sateeshbondapalli1855",
      "likes": 0,
      "published_at": "2021-08-11T18:30:58Z",
      "timestamp_refs": [],
      "text": "Could you please say is this enough for neet?",
      "parent_context": "This man has an unique feature... He makes the students to imagine things... And that is what Science is which we can logically think and correlate with life...❤️"
    },
    {
      "comment_id": "Ugz1YIcXStG-XIbbVQh4AaABAg.9QHbIvrg04u9QxO0S3Fhlq",
      "parent_id": "Ugz1YIcXStG-XIbbVQh4AaABAg",
      "comment_type": "reply",
      "author": "@prernabhati6623",
      "likes": 1,
      "published_at": "2021-08-12T17:18:24Z",
      "timestamp_refs": [],
      "text": "@sateeshbondapalli1855 for 2022 neet?",
      "parent_context": "This man has an unique feature... He makes the students to imagine things... And that is what Science is which we can logically think and correlate with life...❤️"
    },
    {
      "comment_id": "Ugz1YIcXStG-XIbbVQh4AaABAg.9QHbIvrg04u9QxOQ9E-Elz",
      "parent_id": "Ugz1YIcXStG-XIbbVQh4AaABAg",
      "comment_type": "reply",
      "author": "@sateeshbondapalli1855",
      "likes": 0,
      "published_at": "2021-08-12T17:21:55Z",
      "timestamp_refs": [],
      "text": "@prernabhati6623 yes",
      "parent_context": "This man has an unique feature... He makes the students to imagine things... And that is what Science is which we can logically think and correlate with life...❤️"
    },
    {
      "comment_id": "Ugz1YIcXStG-XIbbVQh4AaABAg.9QHbIvrg04u9Qzkf4lc1E7",
      "parent_id": "Ugz1YIcXStG-XIbbVQh4AaABAg",
      "comment_type": "reply",
      "author": "@prernabhati6623",
      "likes": 3,
      "published_at": "2021-08-13T15:23:33Z",
      "timestamp_refs": [],
      "text": "@sateeshbondapalli1855 i don't know i m preparing for 2023",
      "parent_context": "This man has an unique feature... He makes the students to imagine things... And that is what Science is which we can logically think and correlate with life...❤️"
    },
    {
      "comment_id": "Ugz1YIcXStG-XIbbVQh4AaABAg.9QHbIvrg04u9SB-CM38Ghw",
      "parent_id": "Ugz1YIcXStG-XIbbVQh4AaABAg",
      "comment_type": "reply",
      "author": "@___abhi____047",
      "likes": 1,
      "published_at": "2021-09-12T06:01:35Z",
      "timestamp_refs": [],
      "text": "I'm also preparing for 2023",
      "parent_context": "This man has an unique feature... He makes the students to imagine things... And that is what Science is which we can logically think and correlate with life...❤️"
    },
    {
      "comment_id": "Ugz1YIcXStG-XIbbVQh4AaABAg.9QHbIvrg04u9SB63OqTodc",
      "parent_id": "Ugz1YIcXStG-XIbbVQh4AaABAg",
      "comment_type": "reply",
      "author": "@prernabhati6623",
      "likes": 1,
      "published_at": "2021-09-12T07:01:31Z",
      "timestamp_refs": [],
      "text": "@___abhi____047 which class",
      "parent_context": "This man has an unique feature... He makes the students to imagine things... And that is what Science is which we can logically think and correlate with life...❤️"
    },
    {
      "comment_id": "Ugz1YIcXStG-XIbbVQh4AaABAg.9QHbIvrg04u9SB6RE_5IzY",
      "parent_id": "Ugz1YIcXStG-XIbbVQh4AaABAg",
      "comment_type": "reply",
      "author": "@___abhi____047",
      "likes": 1,
      "published_at": "2021-09-12T07:04:47Z",
      "timestamp_refs": [],
      "text": "11th",
      "parent_context": "This man has an unique feature... He makes the students to imagine things... And that is what Science is which we can logically think and correlate with life...❤️"
    },
    {
      "comment_id": "Ugz1YIcXStG-XIbbVQh4AaABAg.9QHbIvrg04u9SBC0rk5v8I",
      "parent_id": "Ugz1YIcXStG-XIbbVQh4AaABAg",
      "comment_type": "reply",
      "author": "@prernabhati6623",
      "likes": 1,
      "published_at": "2021-09-12T07:53:36Z",
      "timestamp_refs": [],
      "text": "@___abhi____047 icse board",
      "parent_context": "This man has an unique feature... He makes the students to imagine things... And that is what Science is which we can logically think and correlate with life...❤️"
    },
    {
      "comment_id": "Ugz1YIcXStG-XIbbVQh4AaABAg.9QHbIvrg04u9SBJIr4DGa0",
      "parent_id": "Ugz1YIcXStG-XIbbVQh4AaABAg",
      "comment_type": "reply",
      "author": "@___abhi____047",
      "likes": 0,
      "published_at": "2021-09-12T08:57:14Z",
      "timestamp_refs": [],
      "text": "No cbse",
      "parent_context": "This man has an unique feature... He makes the students to imagine things... And that is what Science is which we can logically think and correlate with life...❤️"
    },
    {
      "comment_id": "Ugz1YIcXStG-XIbbVQh4AaABAg.9QHbIvrg04u9SBJLUUv8Wv",
      "parent_id": "Ugz1YIcXStG-XIbbVQh4AaABAg",
      "comment_type": "reply",
      "author": "@___abhi____047",
      "likes": 0,
      "published_at": "2021-09-12T08:57:35Z",
      "timestamp_refs": [],
      "text": "And preparing through Fiitjee",
      "parent_context": "This man has an unique feature... He makes the students to imagine things... And that is what Science is which we can logically think and correlate with life...❤️"
    },
    {
      "comment_id": "Ugz1YIcXStG-XIbbVQh4AaABAg.9QHbIvrg04u9SCGrQ_F85F",
      "parent_id": "Ugz1YIcXStG-XIbbVQh4AaABAg",
      "comment_type": "reply",
      "author": "@___abhi____047",
      "likes": 0,
      "published_at": "2021-09-12T17:55:07Z",
      "timestamp_refs": [],
      "text": "@prernabhati6623 you are from banglore???",
      "parent_context": "This man has an unique feature... He makes the students to imagine things... And that is what Science is which we can logically think and correlate with life...❤️"
    },
    {
      "comment_id": "Ugz1YIcXStG-XIbbVQh4AaABAg.9QHbIvrg04u9SCGwIfAdaX",
      "parent_id": "Ugz1YIcXStG-XIbbVQh4AaABAg",
      "comment_type": "reply",
      "author": "@___abhi____047",
      "likes": 0,
      "published_at": "2021-09-12T17:55:47Z",
      "timestamp_refs": [],
      "text": "@prernabhati6623 by which Institute you are preparing??",
      "parent_context": "This man has an unique feature... He makes the students to imagine things... And that is what Science is which we can logically think and correlate with life...❤️"
    },
    {
      "comment_id": "UgwqoRLvrrDEesMZt_54AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@surhuls1",
      "likes": 91,
      "published_at": "2023-04-13T18:12:35Z",
      "timestamp_refs": [
        "0:46",
        "6:02",
        "9:07",
        "15:54",
        "20:49"
      ],
      "text": "0:46. ionic/ electrovalant bond . 6:02 Lewis dot structure. 9:07. Electrovalancy 15:54. Lattice energy 20:49. Properties of ionic compounds",
      "parent_context": ""
    },
    {
      "comment_id": "UgwqoRLvrrDEesMZt_54AaABAg.9oSbK4-X6VcA3XDlx-JTie",
      "parent_id": "UgwqoRLvrrDEesMZt_54AaABAg",
      "comment_type": "reply",
      "author": "@LathaSree433",
      "likes": 1,
      "published_at": "2024-05-17T05:36:35Z",
      "timestamp_refs": [],
      "text": "Thanks ❤",
      "parent_context": "0:46. ionic/ electrovalant bond . 6:02 Lewis dot structure. 9:07. Electrovalancy 15:54. Lattice energy 20:49. Properties of ionic compounds"
    },
    {
      "comment_id": "UgwqoRLvrrDEesMZt_54AaABAg.9oSbK4-X6VcA54CiMKQZTT",
      "parent_id": "UgwqoRLvrrDEesMZt_54AaABAg",
      "comment_type": "reply",
      "author": "@aryanambatkar5571",
      "likes": 1,
      "published_at": "2024-06-24T16:12:10Z",
      "timestamp_refs": [],
      "text": "sabaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaas",
      "parent_context": "0:46. ionic/ electrovalant bond . 6:02 Lewis dot structure. 9:07. Electrovalancy 15:54. Lattice energy 20:49. Properties of ionic compounds"
    },
    {
      "comment_id": "UgwqoRLvrrDEesMZt_54AaABAg.9oSbK4-X6VcA6UHKbzR3SB",
      "parent_id": "UgwqoRLvrrDEesMZt_54AaABAg",
      "comment_type": "reply",
      "author": "@Neerajnethra",
      "likes": 0,
      "published_at": "2024-07-29T15:44:08Z",
      "timestamp_refs": [
        "0:00"
      ],
      "text": "0:00",
      "parent_context": "0:46. ionic/ electrovalant bond . 6:02 Lewis dot structure. 9:07. Electrovalancy 15:54. Lattice energy 20:49. Properties of ionic compounds"
    },
    {
      "comment_id": "UgwqoRLvrrDEesMZt_54AaABAg.9oSbK4-X6VcA6yMDdBBejj",
      "parent_id": "UgwqoRLvrrDEesMZt_54AaABAg",
      "comment_type": "reply",
      "author": "@poonamjaggi6846",
      "likes": 1,
      "published_at": "2024-08-10T17:23:19Z",
      "timestamp_refs": [],
      "text": "Thanks 🙏🏻",
      "parent_context": "0:46. ionic/ electrovalant bond . 6:02 Lewis dot structure. 9:07. Electrovalancy 15:54. Lattice energy 20:49. Properties of ionic compounds"
    },
    {
      "comment_id": "UgyUr2hzdoHnOHKCpg94AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@adarshpatel6181",
      "likes": 342,
      "published_at": "2019-08-23T14:39:06Z",
      "timestamp_refs": [],
      "text": "Only teacher who teaches 1.5 million students",
      "parent_context": ""
    },
    {
      "comment_id": "UgyUr2hzdoHnOHKCpg94AaABAg.8yz9RhmZrRg9-4E4uNv3Ac",
      "parent_id": "UgyUr2hzdoHnOHKCpg94AaABAg",
      "comment_type": "reply",
      "author": "@legendbot1358",
      "likes": 9,
      "published_at": "2019-09-19T19:46:31Z",
      "timestamp_refs": [],
      "text": "1.77m bro without saying for subscribe",
      "parent_context": "Only teacher who teaches 1.5 million students"
    },
    {
      "comment_id": "UgyUr2hzdoHnOHKCpg94AaABAg.8yz9RhmZrRg92H5UcZ206V",
      "parent_id": "UgyUr2hzdoHnOHKCpg94AaABAg",
      "comment_type": "reply",
      "author": "@Siddharth77-p",
      "likes": 2,
      "published_at": "2019-12-08T09:15:42Z",
      "timestamp_refs": [],
      "text": "Now more than that",
      "parent_context": "Only teacher who teaches 1.5 million students"
    },
    {
      "comment_id": "UgyUr2hzdoHnOHKCpg94AaABAg.8yz9RhmZrRg93xqW976NVr",
      "parent_id": "UgyUr2hzdoHnOHKCpg94AaABAg",
      "comment_type": "reply",
      "author": "@abdurrahmankhan2187",
      "likes": 0,
      "published_at": "2020-01-19T05:34:04Z",
      "timestamp_refs": [],
      "text": "Sir nahi samag me ayya sir aek request hai aap se ki jb bhi koi chapter shuru kare uska basic phle bata diya kare",
      "parent_context": "Only teacher who teaches 1.5 million students"
    },
    {
      "comment_id": "UgyUr2hzdoHnOHKCpg94AaABAg.8yz9RhmZrRg95HdJpQg7wv",
      "parent_id": "UgyUr2hzdoHnOHKCpg94AaABAg",
      "comment_type": "reply",
      "author": "@arohideshmukh5590",
      "likes": 0,
      "published_at": "2020-02-21T03:54:14Z",
      "timestamp_refs": [],
      "text": "2.37M",
      "parent_context": "Only teacher who teaches 1.5 million students"
    },
    {
      "comment_id": "UgyUr2hzdoHnOHKCpg94AaABAg.8yz9RhmZrRg95I4ez033Fq",
      "parent_id": "UgyUr2hzdoHnOHKCpg94AaABAg",
      "comment_type": "reply",
      "author": "@arohideshmukh5590",
      "likes": 0,
      "published_at": "2020-02-21T08:01:56Z",
      "timestamp_refs": [],
      "text": "@Nikhil jeswani ha",
      "parent_context": "Only teacher who teaches 1.5 million students"
    },
    {
      "comment_id": "UgyUr2hzdoHnOHKCpg94AaABAg.8yz9RhmZrRg95NwEve6s1y",
      "parent_id": "UgyUr2hzdoHnOHKCpg94AaABAg",
      "comment_type": "reply",
      "author": "@sikla.72",
      "likes": 1,
      "published_at": "2020-02-23T14:35:02Z",
      "timestamp_refs": [],
      "text": "@arohideshmukh5590 infinite students",
      "parent_context": "Only teacher who teaches 1.5 million students"
    },
    {
      "comment_id": "UgyUr2hzdoHnOHKCpg94AaABAg.8yz9RhmZrRg96QAJvk6koa",
      "parent_id": "UgyUr2hzdoHnOHKCpg94AaABAg",
      "comment_type": "reply",
      "author": "@parulaggarwal9405",
      "likes": 1,
      "published_at": "2020-03-20T07:56:40Z",
      "timestamp_refs": [],
      "text": "2.45M",
      "parent_context": "Only teacher who teaches 1.5 million students"
    },
    {
      "comment_id": "UgyUr2hzdoHnOHKCpg94AaABAg.8yz9RhmZrRg96abNOepNJC",
      "parent_id": "UgyUr2hzdoHnOHKCpg94AaABAg",
      "comment_type": "reply",
      "author": "@gaminghouse6053",
      "likes": 1,
      "published_at": "2020-03-24T18:33:27Z",
      "timestamp_refs": [],
      "text": "@abdurrahmankhan2187 watch his first video on chemical bonding",
      "parent_context": "Only teacher who teaches 1.5 million students"
    },
    {
      "comment_id": "UgyUr2hzdoHnOHKCpg94AaABAg.8yz9RhmZrRg98M1TZ2OZvx",
      "parent_id": "UgyUr2hzdoHnOHKCpg94AaABAg",
      "comment_type": "reply",
      "author": "@itzjokergaming9148",
      "likes": 0,
      "published_at": "2020-05-07T10:25:10Z",
      "timestamp_refs": [],
      "text": "27.3 lakhs bro",
      "parent_context": "Only teacher who teaches 1.5 million students"
    },
    {
      "comment_id": "UgyUr2hzdoHnOHKCpg94AaABAg.8yz9RhmZrRg99yQocy-Adf",
      "parent_id": "UgyUr2hzdoHnOHKCpg94AaABAg",
      "comment_type": "reply",
      "author": "@khushbusahu4398",
      "likes": 0,
      "published_at": "2020-06-16T14:08:24Z",
      "timestamp_refs": [],
      "text": "3 million",
      "parent_context": "Only teacher who teaches 1.5 million students"
    },
    {
      "comment_id": "UgyUr2hzdoHnOHKCpg94AaABAg.8yz9RhmZrRg9ACE871L9oD",
      "parent_id": "UgyUr2hzdoHnOHKCpg94AaABAg",
      "comment_type": "reply",
      "author": "@harmanpreetkaur5945",
      "likes": 0,
      "published_at": "2020-06-22T08:06:13Z",
      "timestamp_refs": [],
      "text": "3.01M",
      "parent_context": "Only teacher who teaches 1.5 million students"
    },
    {
      "comment_id": "UgyUr2hzdoHnOHKCpg94AaABAg.8yz9RhmZrRg9BGC4JLSCvL",
      "parent_id": "UgyUr2hzdoHnOHKCpg94AaABAg",
      "comment_type": "reply",
      "author": "@rajarshibanerjee3389",
      "likes": 1,
      "published_at": "2020-07-18T17:36:35Z",
      "timestamp_refs": [],
      "text": "3.18 million",
      "parent_context": "Only teacher who teaches 1.5 million students"
    },
    {
      "comment_id": "UgyUr2hzdoHnOHKCpg94AaABAg.8yz9RhmZrRg9BlqweL66L0",
      "parent_id": "UgyUr2hzdoHnOHKCpg94AaABAg",
      "comment_type": "reply",
      "author": "@allbyrajdeep6825",
      "likes": 2,
      "published_at": "2020-07-31T09:58:06Z",
      "timestamp_refs": [],
      "text": "Now 3.26 M @Adarsh Patel bro...",
      "parent_context": "Only teacher who teaches 1.5 million students"
    },
    {
      "comment_id": "UgyUr2hzdoHnOHKCpg94AaABAg.8yz9RhmZrRg9C3Qhd2P3Gd",
      "parent_id": "UgyUr2hzdoHnOHKCpg94AaABAg",
      "comment_type": "reply",
      "author": "@ishikasingh8307",
      "likes": 1,
      "published_at": "2020-08-07T15:05:41Z",
      "timestamp_refs": [],
      "text": "3.31M",
      "parent_context": "Only teacher who teaches 1.5 million students"
    },
    {
      "comment_id": "UgyUr2hzdoHnOHKCpg94AaABAg.8yz9RhmZrRg9D6iIL8Xhid",
      "parent_id": "UgyUr2hzdoHnOHKCpg94AaABAg",
      "comment_type": "reply",
      "author": "@tia5374",
      "likes": 1,
      "published_at": "2020-09-02T18:17:14Z",
      "timestamp_refs": [],
      "text": "3.5 million bro🙃❤️",
      "parent_context": "Only teacher who teaches 1.5 million students"
    },
    {
      "comment_id": "UgyUr2hzdoHnOHKCpg94AaABAg.8yz9RhmZrRg9DkDgJz9mAA",
      "parent_id": "UgyUr2hzdoHnOHKCpg94AaABAg",
      "comment_type": "reply",
      "author": "@priyanaghate3049",
      "likes": 4,
      "published_at": "2020-09-18T11:49:53Z",
      "timestamp_refs": [],
      "text": "i am assuming the future 10Million",
      "parent_context": "Only teacher who teaches 1.5 million students"
    },
    {
      "comment_id": "UgyUr2hzdoHnOHKCpg94AaABAg.8yz9RhmZrRg9Dz5-isnf1E",
      "parent_id": "UgyUr2hzdoHnOHKCpg94AaABAg",
      "comment_type": "reply",
      "author": "@Dance_with_Nandini765",
      "likes": 2,
      "published_at": "2020-09-24T06:22:38Z",
      "timestamp_refs": [],
      "text": "3.64 bro",
      "parent_context": "Only teacher who teaches 1.5 million students"
    },
    {
      "comment_id": "UgyUr2hzdoHnOHKCpg94AaABAg.8yz9RhmZrRg9Ewz20hx95n",
      "parent_id": "UgyUr2hzdoHnOHKCpg94AaABAg",
      "comment_type": "reply",
      "author": "@mr.top10sshow28",
      "likes": 2,
      "published_at": "2020-10-18T07:14:42Z",
      "timestamp_refs": [],
      "text": "Now its 3.8",
      "parent_context": "Only teacher who teaches 1.5 million students"
    },
    {
      "comment_id": "UgyUr2hzdoHnOHKCpg94AaABAg.8yz9RhmZrRg9FOV1okveLn",
      "parent_id": "UgyUr2hzdoHnOHKCpg94AaABAg",
      "comment_type": "reply",
      "author": "@bermudahunter3692",
      "likes": 3,
      "published_at": "2020-10-29T09:01:46Z",
      "timestamp_refs": [],
      "text": "Now 3.85",
      "parent_context": "Only teacher who teaches 1.5 million students"
    },
    {
      "comment_id": "UgyUr2hzdoHnOHKCpg94AaABAg.8yz9RhmZrRg9G4jn79J5SA",
      "parent_id": "UgyUr2hzdoHnOHKCpg94AaABAg",
      "comment_type": "reply",
      "author": "@ayush_24",
      "likes": 0,
      "published_at": "2020-11-15T13:26:01Z",
      "timestamp_refs": [],
      "text": "@bermudahunter3692 update: 3.92 million 👍",
      "parent_context": "Only teacher who teaches 1.5 million students"
    },
    {
      "comment_id": "UgyUr2hzdoHnOHKCpg94AaABAg.8yz9RhmZrRg9G4pZgL3Kfh",
      "parent_id": "UgyUr2hzdoHnOHKCpg94AaABAg",
      "comment_type": "reply",
      "author": "@bermudahunter3692",
      "likes": 0,
      "published_at": "2020-11-15T14:16:28Z",
      "timestamp_refs": [],
      "text": "@ayush_24 very fast growing",
      "parent_context": "Only teacher who teaches 1.5 million students"
    },
    {
      "comment_id": "UgyUr2hzdoHnOHKCpg94AaABAg.8yz9RhmZrRg9G7UhnF4kg5",
      "parent_id": "UgyUr2hzdoHnOHKCpg94AaABAg",
      "comment_type": "reply",
      "author": "@thequestions7013",
      "likes": 0,
      "published_at": "2020-11-16T15:03:12Z",
      "timestamp_refs": [],
      "text": "3.93 Million Road to 4 million😍",
      "parent_context": "Only teacher who teaches 1.5 million students"
    },
    {
      "comment_id": "UgyUr2hzdoHnOHKCpg94AaABAg.8yz9RhmZrRg9KT41ytZrVY",
      "parent_id": "UgyUr2hzdoHnOHKCpg94AaABAg",
      "comment_type": "reply",
      "author": "@haneefabeeshaik4173",
      "likes": 1,
      "published_at": "2021-03-04T10:19:02Z",
      "timestamp_refs": [],
      "text": "4.5 M",
      "parent_context": "Only teacher who teaches 1.5 million students"
    },
    {
      "comment_id": "UgxbIvjeeDFqFQN-bMd4AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@HamzaKhan-zx2ty",
      "likes": 15,
      "published_at": "2020-08-27T02:06:38Z",
      "timestamp_refs": [],
      "text": "Love u sirrr. ......apne ek ek topic bilkul poora cover kar liya ...aap ne bohot badi help kardi sirr... Very very thankful to u sir.",
      "parent_context": ""
    },
    {
      "comment_id": "UgyBfrpSyOUF9ZyR60J4AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@HARRY-fp1ng",
      "likes": 56,
      "published_at": "2021-07-08T15:47:29Z",
      "timestamp_refs": [],
      "text": "The essence of your success is hidden in your smile even in your hard times",
      "parent_context": ""
    },
    {
      "comment_id": "UgxHJj_cXbHr4xOG3V54AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@SainiSaab-j5m",
      "likes": 27,
      "published_at": "2024-05-23T17:22:55Z",
      "timestamp_refs": [],
      "text": "Students of 2024-2025 batch give attendence✋",
      "parent_context": ""
    },
    {
      "comment_id": "UgzL-Gv5f8Hu74lce_14AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@Prachi-ef9uy",
      "likes": 31,
      "published_at": "2019-09-16T22:07:28Z",
      "timestamp_refs": [],
      "text": "Sir Ur video is better than my coaching teacher who had completed hydrogen within an hr🙄🙄. I know that the syllabus is lengthy but that doesn't mean we have to haste. Understanding the concept is very important so I left my coaching 😉",
      "parent_context": ""
    },
    {
      "comment_id": "UgzL-Gv5f8Hu74lce_14AaABAg.8zxkpZo9oJY9wMYc88Egj1",
      "parent_id": "UgzL-Gv5f8Hu74lce_14AaABAg",
      "comment_type": "reply",
      "author": "@prashantpawar9925",
      "likes": 0,
      "published_at": "2023-10-27T05:55:57Z",
      "timestamp_refs": [],
      "text": "Medical clg m number laga ??",
      "parent_context": "Sir Ur video is better than my coaching teacher who had completed hydrogen within an hr🙄🙄. I know that the syllabus is lengthy but that doesn't mean we have to haste. Understanding the concept is very important so I left my coaching 😉"
    },
    {
      "comment_id": "UgzxBkS75Xto6Vb39-V4AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@vyas2005",
      "likes": 84,
      "published_at": "2020-08-14T17:03:48Z",
      "timestamp_refs": [],
      "text": "He is the best teacher ever on you tube, very struggling, kind hearted, down to earth. 🙇🙇🙇🙇🙇🙇🙇🙇🙇🙇🙇🙇🙇🙇🙇🙇🙇🙇",
      "parent_context": ""
    },
    {
      "comment_id": "UgzxBkS75Xto6Vb39-V4AaABAg.9CLemtlUqnt9GZp5C5VQBN",
      "parent_id": "UgzxBkS75Xto6Vb39-V4AaABAg",
      "comment_type": "reply",
      "author": "@Pianistmanoj",
      "likes": 2,
      "published_at": "2020-11-27T15:08:46Z",
      "timestamp_refs": [],
      "text": "No he is not the only one! Go and explore yourself and you find more dedicated teachers but with less recognition!!!😔😔",
      "parent_context": "He is the best teacher ever on you tube, very struggling, kind hearted, down to earth. 🙇🙇🙇🙇🙇🙇🙇🙇🙇🙇🙇🙇🙇🙇🙇🙇🙇🙇"
    },
    {
      "comment_id": "UgzxBkS75Xto6Vb39-V4AaABAg.9CLemtlUqnt9ILHTLBGcyp",
      "parent_id": "UgzxBkS75Xto6Vb39-V4AaABAg",
      "comment_type": "reply",
      "author": "@arijitdawn2955",
      "likes": 0,
      "published_at": "2021-01-10T16:39:39Z",
      "timestamp_refs": [],
      "text": "@Pianistmanoj he is good",
      "parent_context": "He is the best teacher ever on you tube, very struggling, kind hearted, down to earth. 🙇🙇🙇🙇🙇🙇🙇🙇🙇🙇🙇🙇🙇🙇🙇🙇🙇🙇"
    },
    {
      "comment_id": "UgzxBkS75Xto6Vb39-V4AaABAg.9CLemtlUqnt9QzlkX-Ld3N",
      "parent_id": "UgzxBkS75Xto6Vb39-V4AaABAg",
      "comment_type": "reply",
      "author": "@prernabhati6623",
      "likes": 0,
      "published_at": "2021-08-13T15:33:02Z",
      "timestamp_refs": [],
      "text": "excuse me he is a very good teacher but we can't call him best...",
      "parent_context": "He is the best teacher ever on you tube, very struggling, kind hearted, down to earth. 🙇🙇🙇🙇🙇🙇🙇🙇🙇🙇🙇🙇🙇🙇🙇🙇🙇🙇"
    },
    {
      "comment_id": "UgzxBkS75Xto6Vb39-V4AaABAg.9CLemtlUqnt9SO6Va2aUlq",
      "parent_id": "UgzxBkS75Xto6Vb39-V4AaABAg",
      "comment_type": "reply",
      "author": "@everythinghere4927",
      "likes": 0,
      "published_at": "2021-09-17T08:15:30Z",
      "timestamp_refs": [],
      "text": "@prernabhati6623 He is the bestest ( if possible!)",
      "parent_context": "He is the best teacher ever on you tube, very struggling, kind hearted, down to earth. 🙇🙇🙇🙇🙇🙇🙇🙇🙇🙇🙇🙇🙇🙇🙇🙇🙇🙇"
    },
    {
      "comment_id": "UgzxBkS75Xto6Vb39-V4AaABAg.9CLemtlUqnt9SViSkfkCfW",
      "parent_id": "UgzxBkS75Xto6Vb39-V4AaABAg",
      "comment_type": "reply",
      "author": "@prernabhati6623",
      "likes": 1,
      "published_at": "2021-09-20T07:10:35Z",
      "timestamp_refs": [],
      "text": "@everythinghere4927 no",
      "parent_context": "He is the best teacher ever on you tube, very struggling, kind hearted, down to earth. 🙇🙇🙇🙇🙇🙇🙇🙇🙇🙇🙇🙇🙇🙇🙇🙇🙇🙇"
    },
    {
      "comment_id": "UgzSixSt6SaFl8XGSsZ4AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@rotionjustin2523",
      "likes": 15,
      "published_at": "2021-07-27T16:38:00Z",
      "timestamp_refs": [],
      "text": "I know i shouldn't but whenever i see your video i have a surge of anget for my chemistry teacher i realize the things he didn't point out while teaching which is not related to the topic he is teaching at present but can help in teaching in later topics which makes us hard to connect to different topics",
      "parent_context": ""
    },
    {
      "comment_id": "UgzAmYaIhBTAkZIPlEJ4AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@HanumanBishnoi-d6o",
      "likes": 4,
      "published_at": "2024-11-21T16:26:06Z",
      "timestamp_refs": [],
      "text": "Salute to sir hamaare liye raat ko bina fan ke garmi main padha rhe hain hatss off to you sir!!!! Ek like toh banta hai. Sir ke liye❤❤😅",
      "parent_context": ""
    },
    {
      "comment_id": "UgxjDs5XBE_frLtBnFt4AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@syeedbilal1",
      "likes": 185,
      "published_at": "2018-07-13T05:55:15Z",
      "timestamp_refs": [],
      "text": "Love you sir ...your videos are really good for knowledge",
      "parent_context": ""
    },
    {
      "comment_id": "UgxjDs5XBE_frLtBnFt4AaABAg.8icnkdLSgAC8jWgvVXigyb",
      "parent_id": "UgxjDs5XBE_frLtBnFt4AaABAg",
      "comment_type": "reply",
      "author": "@srikrishnapaints5635",
      "likes": 2,
      "published_at": "2018-08-04T08:12:16Z",
      "timestamp_refs": [],
      "text": "kya bat hai",
      "parent_context": "Love you sir ...your videos are really good for knowledge"
    },
    {
      "comment_id": "UgxjDs5XBE_frLtBnFt4AaABAg.8icnkdLSgAC8mcmxla7hzU",
      "parent_id": "UgxjDs5XBE_frLtBnFt4AaABAg",
      "comment_type": "reply",
      "author": "@akashattri7791",
      "likes": 3,
      "published_at": "2018-10-20T15:53:53Z",
      "timestamp_refs": [],
      "text": "Bhole ki jai",
      "parent_context": "Love you sir ...your videos are really good for knowledge"
    },
    {
      "comment_id": "UgxjDs5XBE_frLtBnFt4AaABAg.8icnkdLSgAC8mkaj5Do_sh",
      "parent_id": "UgxjDs5XBE_frLtBnFt4AaABAg",
      "comment_type": "reply",
      "author": "@medhayaduvanshi1638",
      "likes": 2,
      "published_at": "2018-10-23T16:40:57Z",
      "timestamp_refs": [],
      "text": "Ionic compound kitne Hote hai please tell me",
      "parent_context": "Love you sir ...your videos are really good for knowledge"
    },
    {
      "comment_id": "UgxjDs5XBE_frLtBnFt4AaABAg.8icnkdLSgAC8pF5YsvXDJg",
      "parent_id": "UgxjDs5XBE_frLtBnFt4AaABAg",
      "comment_type": "reply",
      "author": "@medhayaduvanshi1638",
      "likes": 0,
      "published_at": "2018-12-24T15:18:17Z",
      "timestamp_refs": [],
      "text": "Sab ho jate hai",
      "parent_context": "Love you sir ...your videos are really good for knowledge"
    },
    {
      "comment_id": "UgxjDs5XBE_frLtBnFt4AaABAg.8icnkdLSgAC8sXYLAOVlt_",
      "parent_id": "UgxjDs5XBE_frLtBnFt4AaABAg",
      "comment_type": "reply",
      "author": "@fajansohail556",
      "likes": 0,
      "published_at": "2019-03-16T08:50:19Z",
      "timestamp_refs": [],
      "text": "@medhayaduvanshi1638 ionic compound are those compound which have charge on them examples are Fe++,Zn+ and so on There is no list of how many ionic compound are there all compound can be ionic compound if it carries charge on it I Think you understood",
      "parent_context": "Love you sir ...your videos are really good for knowledge"
    },
    {
      "comment_id": "UgxNlrXRK9IKl0dlI394AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@roopangupta9",
      "likes": 30,
      "published_at": "2021-03-26T14:11:44Z",
      "timestamp_refs": [],
      "text": "I was a student of the topmost batch of Vedantu toppers batch ... but studying this chapter again from you as your teaching difference is sky high...salute to your efforts",
      "parent_context": ""
    },
    {
      "comment_id": "UgybGHGtYg8p7Iys-aN4AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@harshkumar9902",
      "likes": 70,
      "published_at": "2018-07-13T05:54:21Z",
      "timestamp_refs": [],
      "text": "Hi sir.....was just waiting for your another lecture",
      "parent_context": ""
    },
    {
      "comment_id": "UgybGHGtYg8p7Iys-aN4AaABAg.8icne0NwiZkAJ8ZIO4MDnR",
      "parent_id": "UgybGHGtYg8p7Iys-aN4AaABAg",
      "comment_type": "reply",
      "author": "@Pranav-o1d",
      "likes": 0,
      "published_at": "2025-06-09T08:05:56Z",
      "timestamp_refs": [],
      "text": "@Smoke56789 Bro tu kaha hai IIT ya AIIMS 😶✌",
      "parent_context": "Hi sir.....was just waiting for your another lecture"
    },
    {
      "comment_id": "UgwH3Ctau-GN92sUjeN4AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@STUDYIseverything0-du9uk",
      "likes": 8,
      "published_at": "2023-09-21T14:21:25Z",
      "timestamp_refs": [],
      "text": "ALAKH MEANS Unique in one lakh But he is Unique in billions. ❤🎉",
      "parent_context": ""
    },
    {
      "comment_id": "Ugxr4o7yBTxAaEUin1R4AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@MakeStudyFun_With_Allu",
      "likes": 30,
      "published_at": "2019-10-20T04:23:50Z",
      "timestamp_refs": [],
      "text": "Alakh sir explains in such a way that even I, a student of class 8 can understand it.",
      "parent_context": ""
    },
    {
      "comment_id": "Ugxr4o7yBTxAaEUin1R4AaABAg.90IP856lI_Q95ds9SuSln2",
      "parent_id": "Ugxr4o7yBTxAaEUin1R4AaABAg",
      "comment_type": "reply",
      "author": "@beautyqueen5348",
      "likes": 2,
      "published_at": "2020-03-01T04:26:26Z",
      "timestamp_refs": [],
      "text": "Yes ..",
      "parent_context": "Alakh sir explains in such a way that even I, a student of class 8 can understand it."
    },
    {
      "comment_id": "Ugxr4o7yBTxAaEUin1R4AaABAg.90IP856lI_Q9Gb_IhfofB9",
      "parent_id": "Ugxr4o7yBTxAaEUin1R4AaABAg",
      "comment_type": "reply",
      "author": "@aksarkumar2865",
      "likes": 10,
      "published_at": "2020-11-28T16:48:31Z",
      "timestamp_refs": [],
      "text": "Bhai tu abhi chill kar ke, 1-2 saal me aise bhi L lagne wale hai 🙂",
      "parent_context": "Alakh sir explains in such a way that even I, a student of class 8 can understand it."
    },
    {
      "comment_id": "Ugxr4o7yBTxAaEUin1R4AaABAg.90IP856lI_Q9QxPBd1MioG",
      "parent_id": "Ugxr4o7yBTxAaEUin1R4AaABAg",
      "comment_type": "reply",
      "author": "@prernabhati6623",
      "likes": 1,
      "published_at": "2021-08-12T17:28:40Z",
      "timestamp_refs": [],
      "text": "@aksarkumar2865 sahi kaha",
      "parent_context": "Alakh sir explains in such a way that even I, a student of class 8 can understand it."
    },
    {
      "comment_id": "Ugxr4o7yBTxAaEUin1R4AaABAg.90IP856lI_Q9QxPTWq7CQX",
      "parent_id": "Ugxr4o7yBTxAaEUin1R4AaABAg",
      "comment_type": "reply",
      "author": "@aksarkumar2865",
      "likes": 1,
      "published_at": "2021-08-12T17:31:07Z",
      "timestamp_refs": [],
      "text": "@prernabhati6623 😖🙂",
      "parent_context": "Alakh sir explains in such a way that even I, a student of class 8 can understand it."
    },
    {
      "comment_id": "Ugxr4o7yBTxAaEUin1R4AaABAg.90IP856lI_Q9QxPoV5cqBn",
      "parent_id": "Ugxr4o7yBTxAaEUin1R4AaABAg",
      "comment_type": "reply",
      "author": "@prernabhati6623",
      "likes": 1,
      "published_at": "2021-08-12T17:34:07Z",
      "timestamp_refs": [],
      "text": "@aksarkumar2865 😂😂",
      "parent_context": "Alakh sir explains in such a way that even I, a student of class 8 can understand it."
    },
    {
      "comment_id": "Ugxr4o7yBTxAaEUin1R4AaABAg.90IP856lI_Q9rOOclwwPMF",
      "parent_id": "Ugxr4o7yBTxAaEUin1R4AaABAg",
      "comment_type": "reply",
      "author": "@yep.its.meeh7",
      "likes": 0,
      "published_at": "2023-06-25T16:30:09Z",
      "timestamp_refs": [],
      "text": "Guess ur in 10th now cuz same here",
      "parent_context": "Alakh sir explains in such a way that even I, a student of class 8 can understand it."
    },
    {
      "comment_id": "Ugz6LsbBZ6KXt4JoVRF4AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@yogawithyogshakti",
      "likes": 106,
      "published_at": "2019-05-21T06:22:47Z",
      "timestamp_refs": [],
      "text": "Thanks a lot sir ! I m a regular student of yours ....You are so nice teacher that I do not have any words to describe your greatness . This is all by heart .u are the first who make physics enjoyable for me thank you for helping me ! May u live long and free of ailments and negativities of world .. You are the best teacher ever!!",
      "parent_context": ""
    },
    {
      "comment_id": "Ugz6LsbBZ6KXt4JoVRF4AaABAg.8vBDvD63kWI97kmNGUQAPc",
      "parent_id": "Ugz6LsbBZ6KXt4JoVRF4AaABAg",
      "comment_type": "reply",
      "author": "@danishfaiz313",
      "likes": 1,
      "published_at": "2020-04-22T13:53:21Z",
      "timestamp_refs": [],
      "text": "👍👍👍👍👍",
      "parent_context": "Thanks a lot sir ! I m a regular student of yours ....You are so nice teacher that I do not have any words to describe your greatness . This is all by heart .u are the first who make physics enjoyable for me thank you for helping me ! May u live long and free of ailments and negativities of world .. You are the best teacher ever!!"
    },
    {
      "comment_id": "Ugz6LsbBZ6KXt4JoVRF4AaABAg.8vBDvD63kWI9B8V3Qqv4Db",
      "parent_id": "Ugz6LsbBZ6KXt4JoVRF4AaABAg",
      "comment_type": "reply",
      "author": "@shrenisharma556",
      "likes": 1,
      "published_at": "2020-07-15T17:48:33Z",
      "timestamp_refs": [],
      "text": "Me also",
      "parent_context": "Thanks a lot sir ! I m a regular student of yours ....You are so nice teacher that I do not have any words to describe your greatness . This is all by heart .u are the first who make physics enjoyable for me thank you for helping me ! May u live long and free of ailments and negativities of world .. You are the best teacher ever!!"
    },
    {
      "comment_id": "Ugz6LsbBZ6KXt4JoVRF4AaABAg.8vBDvD63kWI9B8VOQMXPVX",
      "parent_id": "Ugz6LsbBZ6KXt4JoVRF4AaABAg",
      "comment_type": "reply",
      "author": "@danishfaiz313",
      "likes": 1,
      "published_at": "2020-07-15T17:51:25Z",
      "timestamp_refs": [],
      "text": "@shrenisharma556 👍",
      "parent_context": "Thanks a lot sir ! I m a regular student of yours ....You are so nice teacher that I do not have any words to describe your greatness . This is all by heart .u are the first who make physics enjoyable for me thank you for helping me ! May u live long and free of ailments and negativities of world .. You are the best teacher ever!!"
    },
    {
      "comment_id": "UgwGSGVfynyQ3tZRA0R4AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@anamkhan3605",
      "likes": 72,
      "published_at": "2018-08-27T12:20:25Z",
      "timestamp_refs": [],
      "text": "I have no words to admire ur teaching u r the best",
      "parent_context": ""
    },
    {
      "comment_id": "UgwGSGVfynyQ3tZRA0R4AaABAg.8kSMazoy01t8tT3RlLCOLJ",
      "parent_id": "UgwGSGVfynyQ3tZRA0R4AaABAg",
      "comment_type": "reply",
      "author": "@chinmayvaishampayan7133",
      "likes": 4,
      "published_at": "2019-04-08T11:34:46Z",
      "timestamp_refs": [],
      "text": "Modi",
      "parent_context": "I have no words to admire ur teaching u r the best"
    },
    {
      "comment_id": "UgxZqqnpeBASxzzcldB4AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@RavishSingh-h5p",
      "likes": 1,
      "published_at": "2025-09-27T17:24:56Z",
      "timestamp_refs": [],
      "text": "Teachers like you are the reason why ordinary students like us dream of doing extraordinary things.",
      "parent_context": ""
    },
    {
      "comment_id": "UgydvgAHoPf3NuYfvXJ4AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@ashwi-q7y",
      "likes": 81,
      "published_at": "2021-10-12T05:31:38Z",
      "timestamp_refs": [],
      "text": "I paid 2 lakhs to my institute🤧 ...but they never gave feel on subject 😪😪...just your lecture made me to build confidence 😇.... THANKYOU FOR BEING SUCH A GREAT TECHER 🥰🥰....",
      "parent_context": ""
    },
    {
      "comment_id": "UgydvgAHoPf3NuYfvXJ4AaABAg.9TOBcFIepAW9U_JaRe-4HZ",
      "parent_id": "UgydvgAHoPf3NuYfvXJ4AaABAg",
      "comment_type": "reply",
      "author": "@abhinandr1930",
      "likes": 4,
      "published_at": "2021-11-10T19:03:34Z",
      "timestamp_refs": [],
      "text": "2 lakh barbad",
      "parent_context": "I paid 2 lakhs to my institute🤧 ...but they never gave feel on subject 😪😪...just your lecture made me to build confidence 😇.... THANKYOU FOR BEING SUCH A GREAT TECHER 🥰🥰...."
    },
    {
      "comment_id": "UgydvgAHoPf3NuYfvXJ4AaABAg.9TOBcFIepAW9UoGR-W6y7w",
      "parent_id": "UgydvgAHoPf3NuYfvXJ4AaABAg",
      "comment_type": "reply",
      "author": "@Aman.raj9815",
      "likes": 2,
      "published_at": "2021-11-16T14:24:32Z",
      "timestamp_refs": [],
      "text": "Apna bhi same haalat hai sala vmc me join krke phas gaya abb 12 me shirf pw",
      "parent_context": "I paid 2 lakhs to my institute🤧 ...but they never gave feel on subject 😪😪...just your lecture made me to build confidence 😇.... THANKYOU FOR BEING SUCH A GREAT TECHER 🥰🥰...."
    },
    {
      "comment_id": "UgydvgAHoPf3NuYfvXJ4AaABAg.9TOBcFIepAW9t9welWUEUu",
      "parent_id": "UgydvgAHoPf3NuYfvXJ4AaABAg",
      "comment_type": "reply",
      "author": "@KaiyeemaFarheen",
      "likes": 0,
      "published_at": "2023-08-08T18:50:26Z",
      "timestamp_refs": [],
      "text": "Same condition yaar",
      "parent_context": "I paid 2 lakhs to my institute🤧 ...but they never gave feel on subject 😪😪...just your lecture made me to build confidence 😇.... THANKYOU FOR BEING SUCH A GREAT TECHER 🥰🥰...."
    },
    {
      "comment_id": "UgyQCpJE9YIc5tJpRn14AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@Ethan_asoldier",
      "likes": 18,
      "published_at": "2021-07-10T10:08:11Z",
      "timestamp_refs": [],
      "text": "Best teacher of mathematics- subject teacher And best teacher of physics and chemistry - physics wallah",
      "parent_context": ""
    },
    {
      "comment_id": "Ugxkf9IR670S08wlkiJ4AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@ashwinzaveri7189",
      "likes": 6,
      "published_at": "2020-09-13T02:48:21Z",
      "timestamp_refs": [],
      "text": "He is doing Noble task for Indian students , Great Sir",
      "parent_context": ""
    },
    {
      "comment_id": "Ugyif06XgqpsWL0x5hV4AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@Gamerz_great",
      "likes": 3,
      "published_at": "2026-02-26T16:29:06Z",
      "timestamp_refs": [],
      "text": "sir ki mehnat toh dikkti hha yup",
      "parent_context": ""
    },
    {
      "comment_id": "Ugx6gdahXQqgxsAfA1d4AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@roshanverma7107",
      "likes": 36,
      "published_at": "2020-09-21T15:50:33Z",
      "timestamp_refs": [],
      "text": "What like most about sir is He starts video with great positivity and cute smile This boost my interest more in every topic",
      "parent_context": ""
    },
    {
      "comment_id": "Ugx6gdahXQqgxsAfA1d4AaABAg.9DsNbcDBvG69FS0TZcfheD",
      "parent_id": "Ugx6gdahXQqgxsAfA1d4AaABAg",
      "comment_type": "reply",
      "author": "@raajan9655",
      "likes": 2,
      "published_at": "2020-10-30T17:51:38Z",
      "timestamp_refs": [],
      "text": "Bro hamare teacher sada hua muh lekar pehle homework poochke saara mood kharab kar dete hai. XDXD",
      "parent_context": "What like most about sir is He starts video with great positivity and cute smile This boost my interest more in every topic"
    },
    {
      "comment_id": "Ugx6gdahXQqgxsAfA1d4AaABAg.9DsNbcDBvG69Fq2qhGyj4F",
      "parent_id": "Ugx6gdahXQqgxsAfA1d4AaABAg",
      "comment_type": "reply",
      "author": "@kneelbeforedean8189",
      "likes": 0,
      "published_at": "2020-11-09T11:13:25Z",
      "timestamp_refs": [],
      "text": "Hindi",
      "parent_context": "What like most about sir is He starts video with great positivity and cute smile This boost my interest more in every topic"
    },
    {
      "comment_id": "Ugx6gdahXQqgxsAfA1d4AaABAg.9DsNbcDBvG69JJBfjHTq96",
      "parent_id": "Ugx6gdahXQqgxsAfA1d4AaABAg",
      "comment_type": "reply",
      "author": "@himanshugariya3067",
      "likes": 0,
      "published_at": "2021-02-03T17:41:58Z",
      "timestamp_refs": [],
      "text": "@raajan9655 🤣🤣🤣🤣🤣yrr bhai",
      "parent_context": "What like most about sir is He starts video with great positivity and cute smile This boost my interest more in every topic"
    },
    {
      "comment_id": "Ugx6gdahXQqgxsAfA1d4AaABAg.9DsNbcDBvG69QzmAhllDC8",
      "parent_id": "Ugx6gdahXQqgxsAfA1d4AaABAg",
      "comment_type": "reply",
      "author": "@prernabhati6623",
      "likes": 1,
      "published_at": "2021-08-13T15:36:44Z",
      "timestamp_refs": [],
      "text": "@raajan9655 he is a you tuber how can he ask for homework",
      "parent_context": "What like most about sir is He starts video with great positivity and cute smile This boost my interest more in every topic"
    },
    {
      "comment_id": "UgxB79IkzjTxLSK8box4AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@vanshikapandey2551",
      "likes": 24,
      "published_at": "2021-02-20T07:03:50Z",
      "timestamp_refs": [],
      "text": "Best teacher of physics ever Thank you for launching pace batch sir I daily follow it All teachers are fantastic and awesome",
      "parent_context": ""
    },
    {
      "comment_id": "UgxB79IkzjTxLSK8box4AaABAg.9Jyp9nHl4DB9RVyC2tDntE",
      "parent_id": "UgxB79IkzjTxLSK8box4AaABAg",
      "comment_type": "reply",
      "author": "@yatharth2426",
      "likes": 2,
      "published_at": "2021-08-26T12:56:43Z",
      "timestamp_refs": [],
      "text": "that much free time you have/",
      "parent_context": "Best teacher of physics ever Thank you for launching pace batch sir I daily follow it All teachers are fantastic and awesome"
    },
    {
      "comment_id": "UgxB79IkzjTxLSK8box4AaABAg.9Jyp9nHl4DB9RVzGGS-7Yx",
      "parent_id": "UgxB79IkzjTxLSK8box4AaABAg",
      "comment_type": "reply",
      "author": "@vanshikapandey2551",
      "likes": 2,
      "published_at": "2021-08-26T13:06:02Z",
      "timestamp_refs": [],
      "text": "@yatharth2426 free time have to be taken out by ourself managing our schedule when we were at home not now when school is open",
      "parent_context": "Best teacher of physics ever Thank you for launching pace batch sir I daily follow it All teachers are fantastic and awesome"
    },
    {
      "comment_id": "UgxB79IkzjTxLSK8box4AaABAg.9Jyp9nHl4DB9RW12xV2rL4",
      "parent_id": "UgxB79IkzjTxLSK8box4AaABAg",
      "comment_type": "reply",
      "author": "@yatharth2426",
      "likes": 2,
      "published_at": "2021-08-26T13:30:26Z",
      "timestamp_refs": [],
      "text": "@vanshikapandey2551 hey iam sorry i have multiple personality disorder so i dont even know sometimes what i have done iam so sorry",
      "parent_context": "Best teacher of physics ever Thank you for launching pace batch sir I daily follow it All teachers are fantastic and awesome"
    },
    {
      "comment_id": "UgxB79IkzjTxLSK8box4AaABAg.9Jyp9nHl4DB9RW3sZsp3PA",
      "parent_id": "UgxB79IkzjTxLSK8box4AaABAg",
      "comment_type": "reply",
      "author": "@vanshikapandey2551",
      "likes": 2,
      "published_at": "2021-08-26T13:55:05Z",
      "timestamp_refs": [],
      "text": "@yatharth2426 no problem 😁 Be happy 👍",
      "parent_context": "Best teacher of physics ever Thank you for launching pace batch sir I daily follow it All teachers are fantastic and awesome"
    },
    {
      "comment_id": "UgxB79IkzjTxLSK8box4AaABAg.9Jyp9nHl4DB9RW8JomSlvN",
      "parent_id": "UgxB79IkzjTxLSK8box4AaABAg",
      "comment_type": "reply",
      "author": "@yatharth2426",
      "likes": 2,
      "published_at": "2021-08-26T14:33:54Z",
      "timestamp_refs": [],
      "text": "@vanshikapandey2551 i will 😂 thanks.... i will be more happy if someone teaches me sigma and pie bond",
      "parent_context": "Best teacher of physics ever Thank you for launching pace batch sir I daily follow it All teachers are fantastic and awesome"
    },
    {
      "comment_id": "UgxB79IkzjTxLSK8box4AaABAg.9Jyp9nHl4DB9RW8gkBk4bD",
      "parent_id": "UgxB79IkzjTxLSK8box4AaABAg",
      "comment_type": "reply",
      "author": "@vanshikapandey2551",
      "likes": 1,
      "published_at": "2021-08-26T14:37:10Z",
      "timestamp_refs": [],
      "text": "@yatharth2426 watch chemical bonding and If you don't have much time go for one shot videos",
      "parent_context": "Best teacher of physics ever Thank you for launching pace batch sir I daily follow it All teachers are fantastic and awesome"
    },
    {
      "comment_id": "UgxB79IkzjTxLSK8box4AaABAg.9Jyp9nHl4DB9RWGvt0LmXm",
      "parent_id": "UgxB79IkzjTxLSK8box4AaABAg",
      "comment_type": "reply",
      "author": "@yatharth2426",
      "likes": 1,
      "published_at": "2021-08-26T15:49:08Z",
      "timestamp_refs": [],
      "text": "@vanshikapandey2551 ahhh okayyyy",
      "parent_context": "Best teacher of physics ever Thank you for launching pace batch sir I daily follow it All teachers are fantastic and awesome"
    },
    {
      "comment_id": "UgxB79IkzjTxLSK8box4AaABAg.9Jyp9nHl4DB9RWH0RPbZeP",
      "parent_id": "UgxB79IkzjTxLSK8box4AaABAg",
      "comment_type": "reply",
      "author": "@yatharth2426",
      "likes": 1,
      "published_at": "2021-08-26T15:49:54Z",
      "timestamp_refs": [],
      "text": "@vanshikapandey2551 and how can i solve the doubts?😏",
      "parent_context": "Best teacher of physics ever Thank you for launching pace batch sir I daily follow it All teachers are fantastic and awesome"
    },
    {
      "comment_id": "UgxB79IkzjTxLSK8box4AaABAg.9Jyp9nHl4DB9RWIRDnXv6k",
      "parent_id": "UgxB79IkzjTxLSK8box4AaABAg",
      "comment_type": "reply",
      "author": "@vanshikapandey2551",
      "likes": 1,
      "published_at": "2021-08-26T16:02:17Z",
      "timestamp_refs": [],
      "text": "@yatharth2426 google",
      "parent_context": "Best teacher of physics ever Thank you for launching pace batch sir I daily follow it All teachers are fantastic and awesome"
    },
    {
      "comment_id": "UgxY5F-uMxehP8wwRXZ4AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@dipakdkbhuyan7345",
      "likes": 13,
      "published_at": "2019-08-12T04:40:24Z",
      "timestamp_refs": [],
      "text": "You are developing the attitudes or addictions of the students better.thank you sir",
      "parent_context": ""
    },
    {
      "comment_id": "UgwhKRbO8kx19P-JK514AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@sanghamitrapattanayak-z5u",
      "likes": 4,
      "published_at": "2026-05-26T13:52:09Z",
      "timestamp_refs": [],
      "text": "2026 ka students abhi BHI ye lecture dekh rehe he great sir",
      "parent_context": ""
    },
    {
      "comment_id": "UgwhKRbO8kx19P-JK514AaABAg.AXGywA1k9JRAXcEG-dljjp",
      "parent_id": "UgwhKRbO8kx19P-JK514AaABAg",
      "comment_type": "reply",
      "author": "@mdkhaja629",
      "likes": 0,
      "published_at": "2026-06-04T05:18:05Z",
      "timestamp_refs": [],
      "text": "Reneet ka leya kya",
      "parent_context": "2026 ka students abhi BHI ye lecture dekh rehe he great sir"
    },
    {
      "comment_id": "UgyIaZmR1pMfOFDUtBN4AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@Yogeskumar8050",
      "likes": 76,
      "published_at": "2019-12-12T15:04:50Z",
      "timestamp_refs": [],
      "text": "🌞World Record--Sir you are the 1st teacher who teaches to 21 lakh 40000 students lonely 👌👌👌👌",
      "parent_context": ""
    },
    {
      "comment_id": "UgyIaZmR1pMfOFDUtBN4AaABAg.92S0cE1ZSE_9FZnAX4EF87",
      "parent_id": "UgyIaZmR1pMfOFDUtBN4AaABAg",
      "comment_type": "reply",
      "author": "@mohammadrayyanmohsin8910",
      "likes": 2,
      "published_at": "2020-11-02T18:20:37Z",
      "timestamp_refs": [],
      "text": "Sal Khan? Khans Academy",
      "parent_context": "🌞World Record--Sir you are the 1st teacher who teaches to 21 lakh 40000 students lonely 👌👌👌👌"
    },
    {
      "comment_id": "UgyIaZmR1pMfOFDUtBN4AaABAg.92S0cE1ZSE_9GALwveq64v",
      "parent_id": "UgyIaZmR1pMfOFDUtBN4AaABAg",
      "comment_type": "reply",
      "author": "@turbo_guyy",
      "likes": 0,
      "published_at": "2020-11-17T17:44:20Z",
      "timestamp_refs": [],
      "text": "@shreyaambilwade5686 DP is nice😍😍",
      "parent_context": "🌞World Record--Sir you are the 1st teacher who teaches to 21 lakh 40000 students lonely 👌👌👌👌"
    },
    {
      "comment_id": "UgyIaZmR1pMfOFDUtBN4AaABAg.92S0cE1ZSE_9I0AAzhBYoM",
      "parent_id": "UgyIaZmR1pMfOFDUtBN4AaABAg",
      "comment_type": "reply",
      "author": "@atalbeharisingh4783",
      "likes": 3,
      "published_at": "2021-01-02T11:51:55Z",
      "timestamp_refs": [],
      "text": "not lonely,it should be alone*",
      "parent_context": "🌞World Record--Sir you are the 1st teacher who teaches to 21 lakh 40000 students lonely 👌👌👌👌"
    },
    {
      "comment_id": "UgyIaZmR1pMfOFDUtBN4AaABAg.92S0cE1ZSE_9MkXEAus21o",
      "parent_id": "UgyIaZmR1pMfOFDUtBN4AaABAg",
      "comment_type": "reply",
      "author": "@enugulavamshi9558",
      "likes": 0,
      "published_at": "2021-04-30T07:23:13Z",
      "timestamp_refs": [],
      "text": "Now 40 lakh...78000 students",
      "parent_context": "🌞World Record--Sir you are the 1st teacher who teaches to 21 lakh 40000 students lonely 👌👌👌👌"
    },
    {
      "comment_id": "UgyIaZmR1pMfOFDUtBN4AaABAg.92S0cE1ZSE_9SSsye9GQXd",
      "parent_id": "UgyIaZmR1pMfOFDUtBN4AaABAg",
      "comment_type": "reply",
      "author": "@soya9999-p1w",
      "likes": 0,
      "published_at": "2021-09-19T04:44:44Z",
      "timestamp_refs": [],
      "text": "Now 55.6 lakh",
      "parent_context": "🌞World Record--Sir you are the 1st teacher who teaches to 21 lakh 40000 students lonely 👌👌👌👌"
    },
    {
      "comment_id": "UgyIaZmR1pMfOFDUtBN4AaABAg.92S0cE1ZSE_9W5RLW8rxJq",
      "parent_id": "UgyIaZmR1pMfOFDUtBN4AaABAg",
      "comment_type": "reply",
      "author": "@BHÁRAT-51",
      "likes": 1,
      "published_at": "2021-12-18T12:17:38Z",
      "timestamp_refs": [],
      "text": "@soya9999-p1w Now all over India ❤️🔥",
      "parent_context": "🌞World Record--Sir you are the 1st teacher who teaches to 21 lakh 40000 students lonely 👌👌👌👌"
    },
    {
      "comment_id": "UgyIaZmR1pMfOFDUtBN4AaABAg.92S0cE1ZSE_9fDuj00LE-s",
      "parent_id": "UgyIaZmR1pMfOFDUtBN4AaABAg",
      "comment_type": "reply",
      "author": "@ravishashi7542",
      "likes": 0,
      "published_at": "2022-08-27T08:30:59Z",
      "timestamp_refs": [],
      "text": "@enugulavamshi9558 now 80lakhs",
      "parent_context": "🌞World Record--Sir you are the 1st teacher who teaches to 21 lakh 40000 students lonely 👌👌👌👌"
    },
    {
      "comment_id": "UgzhSM-S9OeNXPzYRrV4AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@grandwarden4527",
      "likes": 77,
      "published_at": "2018-07-13T05:57:36Z",
      "timestamp_refs": [],
      "text": "Sir g physics ki next video ka wait kb se kr ra hu.... 😧😧😧 Sir u r only lifeline for me.... So plz next video on circular motion",
      "parent_context": ""
    },
    {
      "comment_id": "UgzhSM-S9OeNXPzYRrV4AaABAg.8ico0qAZ6649Aq_CZ-kcLX",
      "parent_id": "UgzhSM-S9OeNXPzYRrV4AaABAg",
      "comment_type": "reply",
      "author": "@cubzigs",
      "likes": 1,
      "published_at": "2020-07-08T09:27:55Z",
      "timestamp_refs": [],
      "text": "Yeta townhall konsa hai?",
      "parent_context": "Sir g physics ki next video ka wait kb se kr ra hu.... 😧😧😧 Sir u r only lifeline for me.... So plz next video on circular motion"
    },
    {
      "comment_id": "Ugyk9C3Oqq-VB8QA38Z4AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@kpacademy2973",
      "likes": 8,
      "published_at": "2020-07-01T03:36:45Z",
      "timestamp_refs": [],
      "text": "Alak sir is best chemistry as well as physics teacher.",
      "parent_context": ""
    },
    {
      "comment_id": "UgxyzpNeQM119aSVhZl4AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@Berrysprite-x2z",
      "likes": 2,
      "published_at": "2025-11-06T12:41:53Z",
      "timestamp_refs": [],
      "text": "Thank you so much sir for uploading these videos. It's so beneficial for us JEE/NEET students even after 7 years👍",
      "parent_context": ""
    },
    {
      "comment_id": "Ugxky2sP_YXwQxQ9kRx4AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@darkravana4223",
      "likes": 8,
      "published_at": "2021-03-30T17:41:44Z",
      "timestamp_refs": [],
      "text": "Mera God of physics and chemistry...... No one can replace sirs position",
      "parent_context": ""
    },
    {
      "comment_id": "UgztaRl5rtdsIQ_QHZJ4AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@lamishajoshi7480",
      "likes": 8,
      "published_at": "2020-12-09T10:39:24Z",
      "timestamp_refs": [
        "19:40"
      ],
      "text": "19:40 NaCl should be more ionic than NaF becoz electron affinity of Cl >F ..........this is an exception which Alakh sir has taught in chapter 3",
      "parent_context": ""
    },
    {
      "comment_id": "Ugy-vXALFcUzNOJwo7J4AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@bnaziroddin8532",
      "likes": 13,
      "published_at": "2018-07-13T06:15:14Z",
      "timestamp_refs": [],
      "text": "Physics par saarii ummidhay aap par hin hay sir !!plzzzzzzz physics kay videos upload kardhona....",
      "parent_context": ""
    },
    {
      "comment_id": "Ugx7zWXndkLWoC1F6-F4AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@aura-j2v-d2f",
      "likes": 5,
      "published_at": "2026-04-03T08:14:10Z",
      "timestamp_refs": [],
      "text": "Never Skip Old Videos",
      "parent_context": ""
    },
    {
      "comment_id": "UgxJ9RXpB7Q-I4C0Ff54AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@RameshRathore96",
      "likes": 30,
      "published_at": "2019-05-09T12:56:21Z",
      "timestamp_refs": [],
      "text": "sir you make every topic conceptualy...Brilliant",
      "parent_context": ""
    },
    {
      "comment_id": "Ugwx_EQPsQhi_8OHm_14AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@singhshivsagar7187",
      "likes": 53,
      "published_at": "2019-10-12T15:20:59Z",
      "timestamp_refs": [],
      "text": "Alakh sir never advertise about his video Other people give ads on alakh Sir's Chanel So called don't be audience for world love u sir🌹🌹🌹",
      "parent_context": ""
    },
    {
      "comment_id": "Ugwx_EQPsQhi_8OHm_14AaABAg.9-zyz7-KfbC93tWDXTdHjw",
      "parent_id": "Ugwx_EQPsQhi_8OHm_14AaABAg",
      "comment_type": "reply",
      "author": "@adityamurai6989",
      "likes": 0,
      "published_at": "2020-01-17T13:11:04Z",
      "timestamp_refs": [],
      "text": "*Channel",
      "parent_context": "Alakh sir never advertise about his video Other people give ads on alakh Sir's Chanel So called don't be audience for world love u sir🌹🌹🌹"
    },
    {
      "comment_id": "Ugwx_EQPsQhi_8OHm_14AaABAg.9-zyz7-KfbC9GAMLBmJ-8N",
      "parent_id": "Ugwx_EQPsQhi_8OHm_14AaABAg",
      "comment_type": "reply",
      "author": "@turbo_guyy",
      "likes": 1,
      "published_at": "2020-11-17T17:47:47Z",
      "timestamp_refs": [],
      "text": "@adityamurai6989 😂😂😂🤣",
      "parent_context": "Alakh sir never advertise about his video Other people give ads on alakh Sir's Chanel So called don't be audience for world love u sir🌹🌹🌹"
    },
    {
      "comment_id": "UgyG8BsUck4quM3XZmV4AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@ghapchakmotivation2815",
      "likes": 22,
      "published_at": "2019-08-10T06:03:37Z",
      "timestamp_refs": [],
      "text": "Sir apka muje dharereeee....bhot pasand😂 like for Alakh sirr wee all love you sirr",
      "parent_context": ""
    },
    {
      "comment_id": "UgzAhPIdgtAfbB4A54B4AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@xcricketclipx",
      "likes": 7,
      "published_at": "2026-01-18T15:05:05Z",
      "timestamp_refs": [],
      "text": "Recpect Button for Allakh sir ------------------------------------>",
      "parent_context": ""
    },
    {
      "comment_id": "UgxucrfwFN4MH_lo62l4AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@digitalcolony2.068",
      "likes": 10,
      "published_at": "2019-09-03T04:21:14Z",
      "timestamp_refs": [],
      "text": "You are a good teacher of physics and chemistry",
      "parent_context": ""
    },
    {
      "comment_id": "Ugzo1lH9BZLUopdWtPx4AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@nehakumari6886",
      "likes": 14,
      "published_at": "2020-04-18T16:43:04Z",
      "timestamp_refs": [],
      "text": "no time wasting, point to point things & really really helpful",
      "parent_context": ""
    },
    {
      "comment_id": "Ugzo1lH9BZLUopdWtPx4AaABAg.97ambftWtcH9Or-9zZUzd8",
      "parent_id": "Ugzo1lH9BZLUopdWtPx4AaABAg",
      "comment_type": "reply",
      "author": "@vsijahsjsjshsf599",
      "likes": 0,
      "published_at": "2021-06-21T12:43:01Z",
      "timestamp_refs": [],
      "text": "@waniarsheed6931 chi vekkama illa",
      "parent_context": "no time wasting, point to point things & really really helpful"
    },
    {
      "comment_id": "UgxhFLBkFWEqkkfWCJd4AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@harshitapandey2054",
      "likes": 22,
      "published_at": "2018-07-13T09:55:38Z",
      "timestamp_refs": [],
      "text": "Sir video bahot accha tha pura dekha pasand aaya 👍👍👍👍👍👍👍👍",
      "parent_context": ""
    },
    {
      "comment_id": "UgynFKN4dkrT4D-w5594AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@alzaidashger2395",
      "likes": 9,
      "published_at": "2023-01-31T04:44:09Z",
      "timestamp_refs": [],
      "text": "4 years baad bhi comment box active hai literally osm 😮😮😮😮",
      "parent_context": ""
    },
    {
      "comment_id": "UgynFKN4dkrT4D-w5594AaABAg.9lXl_-GXPu29ngmStiru1y",
      "parent_id": "UgynFKN4dkrT4D-w5594AaABAg",
      "comment_type": "reply",
      "author": "@faheemwani170",
      "likes": 0,
      "published_at": "2023-03-25T19:07:07Z",
      "timestamp_refs": [],
      "text": "Kya aap mere ko bta skte hai inki pdf kaha milegi",
      "parent_context": "4 years baad bhi comment box active hai literally osm 😮😮😮😮"
    },
    {
      "comment_id": "Ugw6nQvNW0HFF5LQcdZ4AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@aspirant8225",
      "likes": 9,
      "published_at": "2018-07-13T08:04:39Z",
      "timestamp_refs": [],
      "text": "aage ka part bhi jldi se upload ki jiye guruji ... I m waiting eagerly thanku sir thanks a lot",
      "parent_context": ""
    },
    {
      "comment_id": "Ugx2HVcMno8Oy85EVkd4AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@muslimhub591",
      "likes": 484,
      "published_at": "2020-09-13T12:56:02Z",
      "timestamp_refs": [],
      "text": "Anyone from 2020 batch Love from Kashmir ❤️❤️",
      "parent_context": ""
    },
    {
      "comment_id": "Ugx2HVcMno8Oy85EVkd4AaABAg.9DYTHPfTub39ERVdTRjxwj",
      "parent_id": "Ugx2HVcMno8Oy85EVkd4AaABAg",
      "comment_type": "reply",
      "author": "@b.nikhilshetty3393",
      "likes": 2,
      "published_at": "2020-10-05T16:33:22Z",
      "timestamp_refs": [],
      "text": "🤔🥳🥳🥳",
      "parent_context": "Anyone from 2020 batch Love from Kashmir ❤️❤️"
    },
    {
      "comment_id": "Ugx2HVcMno8Oy85EVkd4AaABAg.9DYTHPfTub39ERWpGoeIN7",
      "parent_id": "Ugx2HVcMno8Oy85EVkd4AaABAg",
      "comment_type": "reply",
      "author": "@muslimhub591",
      "likes": 2,
      "published_at": "2020-10-05T16:43:43Z",
      "timestamp_refs": [],
      "text": "@b.nikhilshetty3393 where are you from dear",
      "parent_context": "Anyone from 2020 batch Love from Kashmir ❤️❤️"
    },
    {
      "comment_id": "Ugx2HVcMno8Oy85EVkd4AaABAg.9DYTHPfTub39ERXiv50o8c",
      "parent_id": "Ugx2HVcMno8Oy85EVkd4AaABAg",
      "comment_type": "reply",
      "author": "@b.nikhilshetty3393",
      "likes": 3,
      "published_at": "2020-10-05T16:51:35Z",
      "timestamp_refs": [],
      "text": "@muslimhub591 I am from Karnataka",
      "parent_context": "Anyone from 2020 batch Love from Kashmir ❤️❤️"
    },
    {
      "comment_id": "Ugx2HVcMno8Oy85EVkd4AaABAg.9DYTHPfTub39ERXsW6yUci",
      "parent_id": "Ugx2HVcMno8Oy85EVkd4AaABAg",
      "comment_type": "reply",
      "author": "@b.nikhilshetty3393",
      "likes": 4,
      "published_at": "2020-10-05T16:52:54Z",
      "timestamp_refs": [],
      "text": "@muslimhub591 but I know hindi (kannadiga)",
      "parent_context": "Anyone from 2020 batch Love from Kashmir ❤️❤️"
    },
    {
      "comment_id": "Ugx2HVcMno8Oy85EVkd4AaABAg.9DYTHPfTub39ERXvnTRYWt",
      "parent_id": "Ugx2HVcMno8Oy85EVkd4AaABAg",
      "comment_type": "reply",
      "author": "@b.nikhilshetty3393",
      "likes": 3,
      "published_at": "2020-10-05T16:53:21Z",
      "timestamp_refs": [],
      "text": "@muslimhub591 ur from Kashmir ah?",
      "parent_context": "Anyone from 2020 batch Love from Kashmir ❤️❤️"
    },
    {
      "comment_id": "Ugx2HVcMno8Oy85EVkd4AaABAg.9DYTHPfTub39ERYHzzH5Kw",
      "parent_id": "Ugx2HVcMno8Oy85EVkd4AaABAg",
      "comment_type": "reply",
      "author": "@muslimhub591",
      "likes": 2,
      "published_at": "2020-10-05T16:56:31Z",
      "timestamp_refs": [],
      "text": "@b.nikhilshetty3393 what kind of subject you have",
      "parent_context": "Anyone from 2020 batch Love from Kashmir ❤️❤️"
    },
    {
      "comment_id": "Ugx2HVcMno8Oy85EVkd4AaABAg.9DYTHPfTub39ERYQv05XLC",
      "parent_id": "Ugx2HVcMno8Oy85EVkd4AaABAg",
      "comment_type": "reply",
      "author": "@muslimhub591",
      "likes": 2,
      "published_at": "2020-10-05T16:57:44Z",
      "timestamp_refs": [],
      "text": "@b.nikhilshetty3393 yes",
      "parent_context": "Anyone from 2020 batch Love from Kashmir ❤️❤️"
    },
    {
      "comment_id": "Ugx2HVcMno8Oy85EVkd4AaABAg.9DYTHPfTub39ERYkkeyNtU",
      "parent_id": "Ugx2HVcMno8Oy85EVkd4AaABAg",
      "comment_type": "reply",
      "author": "@b.nikhilshetty3393",
      "likes": 2,
      "published_at": "2020-10-05T17:00:35Z",
      "timestamp_refs": [],
      "text": "@muslimhub591 I have physics, maths, chemistry, biology and then we have 2 languages that are English(1st language)and kannada as 2nd language",
      "parent_context": "Anyone from 2020 batch Love from Kashmir ❤️❤️"
    },
    {
      "comment_id": "Ugx2HVcMno8Oy85EVkd4AaABAg.9DYTHPfTub39ERYouIEGX1",
      "parent_id": "Ugx2HVcMno8Oy85EVkd4AaABAg",
      "comment_type": "reply",
      "author": "@b.nikhilshetty3393",
      "likes": 1,
      "published_at": "2020-10-05T17:01:09Z",
      "timestamp_refs": [],
      "text": "@muslimhub591 what about ur's",
      "parent_context": "Anyone from 2020 batch Love from Kashmir ❤️❤️"
    },
    {
      "comment_id": "Ugx2HVcMno8Oy85EVkd4AaABAg.9DYTHPfTub39ERbvfjSJp7",
      "parent_id": "Ugx2HVcMno8Oy85EVkd4AaABAg",
      "comment_type": "reply",
      "author": "@muslimhub591",
      "likes": 1,
      "published_at": "2020-10-05T17:37:01Z",
      "timestamp_refs": [],
      "text": "@b.nikhilshetty3393 give me no.",
      "parent_context": "Anyone from 2020 batch Love from Kashmir ❤️❤️"
    },
    {
      "comment_id": "Ugx2HVcMno8Oy85EVkd4AaABAg.9DYTHPfTub39ESmycbJs1S",
      "parent_id": "Ugx2HVcMno8Oy85EVkd4AaABAg",
      "comment_type": "reply",
      "author": "@b.nikhilshetty3393",
      "likes": 1,
      "published_at": "2020-10-06T04:32:47Z",
      "timestamp_refs": [],
      "text": "@muslimhub591 r u got my no.",
      "parent_context": "Anyone from 2020 batch Love from Kashmir ❤️❤️"
    },
    {
      "comment_id": "Ugx2HVcMno8Oy85EVkd4AaABAg.9DYTHPfTub39ESnTOiemQL",
      "parent_id": "Ugx2HVcMno8Oy85EVkd4AaABAg",
      "comment_type": "reply",
      "author": "@b.nikhilshetty3393",
      "likes": 0,
      "published_at": "2020-10-06T04:37:07Z",
      "timestamp_refs": [],
      "text": "@SahiL.. s... k...",
      "parent_context": "Anyone from 2020 batch Love from Kashmir ❤️❤️"
    },
    {
      "comment_id": "Ugx2HVcMno8Oy85EVkd4AaABAg.9DYTHPfTub39ET1LBt_8CA",
      "parent_id": "Ugx2HVcMno8Oy85EVkd4AaABAg",
      "comment_type": "reply",
      "author": "@muslimhub591",
      "likes": 0,
      "published_at": "2020-10-06T06:47:04Z",
      "timestamp_refs": [],
      "text": "@b.nikhilshetty3393 yes",
      "parent_context": "Anyone from 2020 batch Love from Kashmir ❤️❤️"
    },
    {
      "comment_id": "Ugx2HVcMno8Oy85EVkd4AaABAg.9DYTHPfTub39EmGbmGGeoX",
      "parent_id": "Ugx2HVcMno8Oy85EVkd4AaABAg",
      "comment_type": "reply",
      "author": "@muslimhub591",
      "likes": 0,
      "published_at": "2020-10-14T03:25:21Z",
      "timestamp_refs": [],
      "text": "@anjaliirawat_ 🔥🔥",
      "parent_context": "Anyone from 2020 batch Love from Kashmir ❤️❤️"
    },
    {
      "comment_id": "Ugx2HVcMno8Oy85EVkd4AaABAg.9DYTHPfTub39Es4AABY2J2",
      "parent_id": "Ugx2HVcMno8Oy85EVkd4AaABAg",
      "comment_type": "reply",
      "author": "@sahilpunnj1753",
      "likes": 1,
      "published_at": "2020-10-16T09:32:02Z",
      "timestamp_refs": [],
      "text": "@muslimhub591 hi",
      "parent_context": "Anyone from 2020 batch Love from Kashmir ❤️❤️"
    },
    {
      "comment_id": "Ugx2HVcMno8Oy85EVkd4AaABAg.9DYTHPfTub39Es66TTEWcQ",
      "parent_id": "Ugx2HVcMno8Oy85EVkd4AaABAg",
      "comment_type": "reply",
      "author": "@muslimhub591",
      "likes": 0,
      "published_at": "2020-10-16T09:49:00Z",
      "timestamp_refs": [],
      "text": "Hello",
      "parent_context": "Anyone from 2020 batch Love from Kashmir ❤️❤️"
    },
    {
      "comment_id": "Ugx2HVcMno8Oy85EVkd4AaABAg.9DYTHPfTub39EsFQA4tnBP",
      "parent_id": "Ugx2HVcMno8Oy85EVkd4AaABAg",
      "comment_type": "reply",
      "author": "@JanmajayMandal",
      "likes": 1,
      "published_at": "2020-10-16T11:10:20Z",
      "timestamp_refs": [],
      "text": "Waha internet milta hai",
      "parent_context": "Anyone from 2020 batch Love from Kashmir ❤️❤️"
    },
    {
      "comment_id": "Ugx2HVcMno8Oy85EVkd4AaABAg.9DYTHPfTub39EsFta3zJhP",
      "parent_id": "Ugx2HVcMno8Oy85EVkd4AaABAg",
      "comment_type": "reply",
      "author": "@muslimhub591",
      "likes": 0,
      "published_at": "2020-10-16T11:14:30Z",
      "timestamp_refs": [],
      "text": "@JanmajayMandal kaha",
      "parent_context": "Anyone from 2020 batch Love from Kashmir ❤️❤️"
    },
    {
      "comment_id": "Ugx2HVcMno8Oy85EVkd4AaABAg.9DYTHPfTub39EsQPU6_Ivc",
      "parent_id": "Ugx2HVcMno8Oy85EVkd4AaABAg",
      "comment_type": "reply",
      "author": "@JanmajayMandal",
      "likes": 0,
      "published_at": "2020-10-16T12:46:22Z",
      "timestamp_refs": [],
      "text": "@muslimhub591 kashmir",
      "parent_context": "Anyone from 2020 batch Love from Kashmir ❤️❤️"
    },
    {
      "comment_id": "Ugx2HVcMno8Oy85EVkd4AaABAg.9DYTHPfTub39EsRpyYMts6",
      "parent_id": "Ugx2HVcMno8Oy85EVkd4AaABAg",
      "comment_type": "reply",
      "author": "@muslimhub591",
      "likes": 1,
      "published_at": "2020-10-16T12:58:51Z",
      "timestamp_refs": [],
      "text": "@JanmajayMandal low speed where are you from and what is your name bro",
      "parent_context": "Anyone from 2020 batch Love from Kashmir ❤️❤️"
    },
    {
      "comment_id": "Ugx2HVcMno8Oy85EVkd4AaABAg.9DYTHPfTub39EsSvT0rGBI",
      "parent_id": "Ugx2HVcMno8Oy85EVkd4AaABAg",
      "comment_type": "reply",
      "author": "@JanmajayMandal",
      "likes": 1,
      "published_at": "2020-10-16T13:08:21Z",
      "timestamp_refs": [],
      "text": "@muslimhub591 from assam Name janmajay Mandal",
      "parent_context": "Anyone from 2020 batch Love from Kashmir ❤️❤️"
    },
    {
      "comment_id": "Ugx2HVcMno8Oy85EVkd4AaABAg.9DYTHPfTub39EuBvwizObL",
      "parent_id": "Ugx2HVcMno8Oy85EVkd4AaABAg",
      "comment_type": "reply",
      "author": "@malikabashir6",
      "likes": 2,
      "published_at": "2020-10-17T05:18:21Z",
      "timestamp_refs": [],
      "text": "I m also frm kashmir",
      "parent_context": "Anyone from 2020 batch Love from Kashmir ❤️❤️"
    },
    {
      "comment_id": "Ugx2HVcMno8Oy85EVkd4AaABAg.9DYTHPfTub39EuLd9D8vYw",
      "parent_id": "Ugx2HVcMno8Oy85EVkd4AaABAg",
      "comment_type": "reply",
      "author": "@muslimhub591",
      "likes": 0,
      "published_at": "2020-10-17T06:43:10Z",
      "timestamp_refs": [],
      "text": "@malikabashir6 Kashmir sai Kaha hou",
      "parent_context": "Anyone from 2020 batch Love from Kashmir ❤️❤️"
    },
    {
      "comment_id": "Ugx2HVcMno8Oy85EVkd4AaABAg.9DYTHPfTub39F7Ka5FTUw5",
      "parent_id": "Ugx2HVcMno8Oy85EVkd4AaABAg",
      "comment_type": "reply",
      "author": "@birupakshchoudhury7057",
      "likes": 1,
      "published_at": "2020-10-22T17:03:22Z",
      "timestamp_refs": [],
      "text": "Che chuk kyati roozan?",
      "parent_context": "Anyone from 2020 batch Love from Kashmir ❤️❤️"
    },
    {
      "comment_id": "Ugx2HVcMno8Oy85EVkd4AaABAg.9DYTHPfTub39F7LAvwQxhG",
      "parent_id": "Ugx2HVcMno8Oy85EVkd4AaABAg",
      "comment_type": "reply",
      "author": "@muslimhub591",
      "likes": 0,
      "published_at": "2020-10-22T17:08:32Z",
      "timestamp_refs": [],
      "text": "@birupakshchoudhury7057 Anantnag cxe",
      "parent_context": "Anyone from 2020 batch Love from Kashmir ❤️❤️"
    },
    {
      "comment_id": "Ugx2HVcMno8Oy85EVkd4AaABAg.9DYTHPfTub39F7MgtRPlDY",
      "parent_id": "Ugx2HVcMno8Oy85EVkd4AaABAg",
      "comment_type": "reply",
      "author": "@birupakshchoudhury7057",
      "likes": 1,
      "published_at": "2020-10-22T17:21:46Z",
      "timestamp_refs": [],
      "text": "@muslimhub591 main town?",
      "parent_context": "Anyone from 2020 batch Love from Kashmir ❤️❤️"
    },
    {
      "comment_id": "Ugx2HVcMno8Oy85EVkd4AaABAg.9DYTHPfTub39F7OVyoCDco",
      "parent_id": "Ugx2HVcMno8Oy85EVkd4AaABAg",
      "comment_type": "reply",
      "author": "@muslimhub591",
      "likes": 0,
      "published_at": "2020-10-22T17:37:37Z",
      "timestamp_refs": [],
      "text": "@birupakshchoudhury7057 aap Kaha sai hou",
      "parent_context": "Anyone from 2020 batch Love from Kashmir ❤️❤️"
    },
    {
      "comment_id": "Ugx2HVcMno8Oy85EVkd4AaABAg.9DYTHPfTub39F7Q6xJw0UU",
      "parent_id": "Ugx2HVcMno8Oy85EVkd4AaABAg",
      "comment_type": "reply",
      "author": "@birupakshchoudhury7057",
      "likes": 0,
      "published_at": "2020-10-22T17:51:41Z",
      "timestamp_refs": [],
      "text": "@muslimhub591 Delhi",
      "parent_context": "Anyone from 2020 batch Love from Kashmir ❤️❤️"
    },
    {
      "comment_id": "Ugx2HVcMno8Oy85EVkd4AaABAg.9DYTHPfTub39F7QW-RZQzO",
      "parent_id": "Ugx2HVcMno8Oy85EVkd4AaABAg",
      "comment_type": "reply",
      "author": "@muslimhub591",
      "likes": 1,
      "published_at": "2020-10-22T17:55:06Z",
      "timestamp_refs": [],
      "text": "@birupakshchoudhury7057 aap ko Kashmiri Kasai aati hai",
      "parent_context": "Anyone from 2020 batch Love from Kashmir ❤️❤️"
    },
    {
      "comment_id": "Ugx2HVcMno8Oy85EVkd4AaABAg.9DYTHPfTub39F7RIUu9W9h",
      "parent_id": "Ugx2HVcMno8Oy85EVkd4AaABAg",
      "comment_type": "reply",
      "author": "@birupakshchoudhury7057",
      "likes": 0,
      "published_at": "2020-10-22T18:02:00Z",
      "timestamp_refs": [],
      "text": "@muslimhub591 love for kashmir.❤️",
      "parent_context": "Anyone from 2020 batch Love from Kashmir ❤️❤️"
    },
    {
      "comment_id": "Ugx2HVcMno8Oy85EVkd4AaABAg.9DYTHPfTub39F7SJiKdDfJ",
      "parent_id": "Ugx2HVcMno8Oy85EVkd4AaABAg",
      "comment_type": "reply",
      "author": "@birupakshchoudhury7057",
      "likes": 0,
      "published_at": "2020-10-22T18:10:54Z",
      "timestamp_refs": [],
      "text": "@muslimhub591 insta?",
      "parent_context": "Anyone from 2020 batch Love from Kashmir ❤️❤️"
    },
    {
      "comment_id": "Ugx2HVcMno8Oy85EVkd4AaABAg.9DYTHPfTub39FRVw1XfXLe",
      "parent_id": "Ugx2HVcMno8Oy85EVkd4AaABAg",
      "comment_type": "reply",
      "author": "@malikabashir6",
      "likes": 1,
      "published_at": "2020-10-30T13:07:18Z",
      "timestamp_refs": [],
      "text": "@muslimhub591 sringar",
      "parent_context": "Anyone from 2020 batch Love from Kashmir ❤️❤️"
    },
    {
      "comment_id": "Ugx2HVcMno8Oy85EVkd4AaABAg.9DYTHPfTub39FTsUZW5Fh1",
      "parent_id": "Ugx2HVcMno8Oy85EVkd4AaABAg",
      "comment_type": "reply",
      "author": "@user-ki6pt2zg1h",
      "likes": 0,
      "published_at": "2020-10-31T11:11:36Z",
      "timestamp_refs": [],
      "text": "Please this video examination in life never give up-https://youtu.be/k4w4pak66V0",
      "parent_context": "Anyone from 2020 batch Love from Kashmir ❤️❤️"
    },
    {
      "comment_id": "Ugx2HVcMno8Oy85EVkd4AaABAg.9DYTHPfTub39GHNy-OYgsv",
      "parent_id": "Ugx2HVcMno8Oy85EVkd4AaABAg",
      "comment_type": "reply",
      "author": "@muskanyadav2541",
      "likes": 0,
      "published_at": "2020-11-20T11:16:39Z",
      "timestamp_refs": [],
      "text": "Har teacher aache hote h",
      "parent_context": "Anyone from 2020 batch Love from Kashmir ❤️❤️"
    },
    {
      "comment_id": "Ugx2HVcMno8Oy85EVkd4AaABAg.9DYTHPfTub39GJIzUpQomu",
      "parent_id": "Ugx2HVcMno8Oy85EVkd4AaABAg",
      "comment_type": "reply",
      "author": "@mathocity8337",
      "likes": 0,
      "published_at": "2020-11-21T05:11:38Z",
      "timestamp_refs": [],
      "text": "@muslimhub591 hii",
      "parent_context": "Anyone from 2020 batch Love from Kashmir ❤️❤️"
    },
    {
      "comment_id": "Ugx2HVcMno8Oy85EVkd4AaABAg.9DYTHPfTub39GJJR9Khv4l",
      "parent_id": "Ugx2HVcMno8Oy85EVkd4AaABAg",
      "comment_type": "reply",
      "author": "@muslimhub591",
      "likes": 0,
      "published_at": "2020-11-21T05:15:33Z",
      "timestamp_refs": [],
      "text": "@mathocity8337 hello how are you Where are you from dear",
      "parent_context": "Anyone from 2020 batch Love from Kashmir ❤️❤️"
    },
    {
      "comment_id": "Ugx2HVcMno8Oy85EVkd4AaABAg.9DYTHPfTub39GJJngGrp_W",
      "parent_id": "Ugx2HVcMno8Oy85EVkd4AaABAg",
      "comment_type": "reply",
      "author": "@mathocity8337",
      "likes": 0,
      "published_at": "2020-11-21T05:18:46Z",
      "timestamp_refs": [],
      "text": "@muslimhub591 I'm from Indore MP bro",
      "parent_context": "Anyone from 2020 batch Love from Kashmir ❤️❤️"
    },
    {
      "comment_id": "Ugx2HVcMno8Oy85EVkd4AaABAg.9DYTHPfTub39GJKWV9MkTS",
      "parent_id": "Ugx2HVcMno8Oy85EVkd4AaABAg",
      "comment_type": "reply",
      "author": "@muslimhub591",
      "likes": 0,
      "published_at": "2020-11-21T05:25:01Z",
      "timestamp_refs": [],
      "text": "@mathocity8337 what is your real name",
      "parent_context": "Anyone from 2020 batch Love from Kashmir ❤️❤️"
    },
    {
      "comment_id": "Ugx2HVcMno8Oy85EVkd4AaABAg.9DYTHPfTub39GJVEBPejpl",
      "parent_id": "Ugx2HVcMno8Oy85EVkd4AaABAg",
      "comment_type": "reply",
      "author": "@mathocity8337",
      "likes": 0,
      "published_at": "2020-11-21T06:58:38Z",
      "timestamp_refs": [],
      "text": "@muslimhub591 Harshit Gupta bro",
      "parent_context": "Anyone from 2020 batch Love from Kashmir ❤️❤️"
    },
    {
      "comment_id": "Ugx2HVcMno8Oy85EVkd4AaABAg.9DYTHPfTub39GfhMhCmIZ6",
      "parent_id": "Ugx2HVcMno8Oy85EVkd4AaABAg",
      "comment_type": "reply",
      "author": "@suhanisharma5982",
      "likes": 0,
      "published_at": "2020-11-30T07:15:56Z",
      "timestamp_refs": [],
      "text": "BRO ME FRM JAMMU.🥰🙋‍♀️ SAME 2020 BATCH..",
      "parent_context": "Anyone from 2020 batch Love from Kashmir ❤️❤️"
    },
    {
      "comment_id": "Ugx2HVcMno8Oy85EVkd4AaABAg.9DYTHPfTub39GfhfdQ1juy",
      "parent_id": "Ugx2HVcMno8Oy85EVkd4AaABAg",
      "comment_type": "reply",
      "author": "@muslimhub591",
      "likes": 0,
      "published_at": "2020-11-30T07:18:39Z",
      "timestamp_refs": [],
      "text": "@suhanisharma5982 your welcome sister",
      "parent_context": "Anyone from 2020 batch Love from Kashmir ❤️❤️"
    },
    {
      "comment_id": "Ugx2HVcMno8Oy85EVkd4AaABAg.9DYTHPfTub39GfjQIaaBKk",
      "parent_id": "Ugx2HVcMno8Oy85EVkd4AaABAg",
      "comment_type": "reply",
      "author": "@suhanisharma5982",
      "likes": 0,
      "published_at": "2020-11-30T07:33:54Z",
      "timestamp_refs": [],
      "text": "@muslimhub591 THANKEW BRO",
      "parent_context": "Anyone from 2020 batch Love from Kashmir ❤️❤️"
    },
    {
      "comment_id": "Ugx2HVcMno8Oy85EVkd4AaABAg.9DYTHPfTub39GfjujGnWB2",
      "parent_id": "Ugx2HVcMno8Oy85EVkd4AaABAg",
      "comment_type": "reply",
      "author": "@muslimhub591",
      "likes": 0,
      "published_at": "2020-11-30T07:38:12Z",
      "timestamp_refs": [],
      "text": "@suhanisharma5982 when will your exam start sister",
      "parent_context": "Anyone from 2020 batch Love from Kashmir ❤️❤️"
    },
    {
      "comment_id": "Ugx2HVcMno8Oy85EVkd4AaABAg.9DYTHPfTub39GfqlzALRYP",
      "parent_id": "Ugx2HVcMno8Oy85EVkd4AaABAg",
      "comment_type": "reply",
      "author": "@suhanisharma5982",
      "likes": 0,
      "published_at": "2020-11-30T08:38:10Z",
      "timestamp_refs": [],
      "text": "@muslimhub591 BRO FINAL EXAMS IN THE ENDING OF FEB. OR 1ST WEEK OF MARCH.. ND UR'S",
      "parent_context": "Anyone from 2020 batch Love from Kashmir ❤️❤️"
    },
    {
      "comment_id": "Ugx2HVcMno8Oy85EVkd4AaABAg.9DYTHPfTub39Gfqutz6B5T",
      "parent_id": "Ugx2HVcMno8Oy85EVkd4AaABAg",
      "comment_type": "reply",
      "author": "@suhanisharma5982",
      "likes": 0,
      "published_at": "2020-11-30T08:39:23Z",
      "timestamp_refs": [],
      "text": "@muslimhub591 HOW MUCH UR SYLLABUS IS COMPLETED??",
      "parent_context": "Anyone from 2020 batch Love from Kashmir ❤️❤️"
    },
    {
      "comment_id": "Ugx2HVcMno8Oy85EVkd4AaABAg.9DYTHPfTub39GfsiOgm1jF",
      "parent_id": "Ugx2HVcMno8Oy85EVkd4AaABAg",
      "comment_type": "reply",
      "author": "@muslimhub591",
      "likes": 0,
      "published_at": "2020-11-30T08:55:09Z",
      "timestamp_refs": [],
      "text": "@suhanisharma5982 our exam will start in 12th December",
      "parent_context": "Anyone from 2020 batch Love from Kashmir ❤️❤️"
    },
    {
      "comment_id": "Ugx2HVcMno8Oy85EVkd4AaABAg.9DYTHPfTub39GfuA3GsDjc",
      "parent_id": "Ugx2HVcMno8Oy85EVkd4AaABAg",
      "comment_type": "reply",
      "author": "@suhanisharma5982",
      "likes": 0,
      "published_at": "2020-11-30T09:07:48Z",
      "timestamp_refs": [],
      "text": "@muslimhub591 SO EARLY.. WISH U GOOD LUCK FOR UR EXAMS.. U IN J&K BOARD OR CBSE..",
      "parent_context": "Anyone from 2020 batch Love from Kashmir ❤️❤️"
    },
    {
      "comment_id": "Ugx2HVcMno8Oy85EVkd4AaABAg.9DYTHPfTub39Gfz9WSAQT6",
      "parent_id": "Ugx2HVcMno8Oy85EVkd4AaABAg",
      "comment_type": "reply",
      "author": "@muslimhub591",
      "likes": 0,
      "published_at": "2020-11-30T09:51:25Z",
      "timestamp_refs": [],
      "text": "@suhanisharma5982 CBSC",
      "parent_context": "Anyone from 2020 batch Love from Kashmir ❤️❤️"
    },
    {
      "comment_id": "Ugx2HVcMno8Oy85EVkd4AaABAg.9DYTHPfTub39GfzD1Xb8OM",
      "parent_id": "Ugx2HVcMno8Oy85EVkd4AaABAg",
      "comment_type": "reply",
      "author": "@muslimhub591",
      "likes": 0,
      "published_at": "2020-11-30T09:51:54Z",
      "timestamp_refs": [],
      "text": "What is your subject sister",
      "parent_context": "Anyone from 2020 batch Love from Kashmir ❤️❤️"
    },
    {
      "comment_id": "Ugx2HVcMno8Oy85EVkd4AaABAg.9DYTHPfTub39GgiQdMV8Dl",
      "parent_id": "Ugx2HVcMno8Oy85EVkd4AaABAg",
      "comment_type": "reply",
      "author": "@suhanisharma5982",
      "likes": 0,
      "published_at": "2020-11-30T16:44:27Z",
      "timestamp_refs": [],
      "text": "@muslimhub591 MEDICAL BRO",
      "parent_context": "Anyone from 2020 batch Love from Kashmir ❤️❤️"
    },
    {
      "comment_id": "Ugx2HVcMno8Oy85EVkd4AaABAg.9DYTHPfTub39HCwBH0OYrn",
      "parent_id": "Ugx2HVcMno8Oy85EVkd4AaABAg",
      "comment_type": "reply",
      "author": "@mansinha7024",
      "likes": 0,
      "published_at": "2020-12-13T14:19:37Z",
      "timestamp_refs": [],
      "text": "Hlww I'm a maths student",
      "parent_context": "Anyone from 2020 batch Love from Kashmir ❤️❤️"
    },
    {
      "comment_id": "Ugx2HVcMno8Oy85EVkd4AaABAg.9DYTHPfTub39HNNnvjewlC",
      "parent_id": "Ugx2HVcMno8Oy85EVkd4AaABAg",
      "comment_type": "reply",
      "author": "@sohomroy7131",
      "likes": 1,
      "published_at": "2020-12-17T15:42:07Z",
      "timestamp_refs": [],
      "text": "Me from West Bengal",
      "parent_context": "Anyone from 2020 batch Love from Kashmir ❤️❤️"
    },
    {
      "comment_id": "Ugx2HVcMno8Oy85EVkd4AaABAg.9DYTHPfTub39HoIAe9s5n7",
      "parent_id": "Ugx2HVcMno8Oy85EVkd4AaABAg",
      "comment_type": "reply",
      "author": "@historiesuntold2",
      "likes": 0,
      "published_at": "2020-12-28T11:51:39Z",
      "timestamp_refs": [],
      "text": "Love my Kashmir . and also Kashmiri girls",
      "parent_context": "Anyone from 2020 batch Love from Kashmir ❤️❤️"
    },
    {
      "comment_id": "Ugx2HVcMno8Oy85EVkd4AaABAg.9DYTHPfTub39HoILCzPNBb",
      "parent_id": "Ugx2HVcMno8Oy85EVkd4AaABAg",
      "comment_type": "reply",
      "author": "@historiesuntold2",
      "likes": 0,
      "published_at": "2020-12-28T11:53:06Z",
      "timestamp_refs": [],
      "text": "Where from u",
      "parent_context": "Anyone from 2020 batch Love from Kashmir ❤️❤️"
    },
    {
      "comment_id": "Ugx2HVcMno8Oy85EVkd4AaABAg.9DYTHPfTub39HoOmO85hlM",
      "parent_id": "Ugx2HVcMno8Oy85EVkd4AaABAg",
      "comment_type": "reply",
      "author": "@muslimhub591",
      "likes": 0,
      "published_at": "2020-12-28T12:49:22Z",
      "timestamp_refs": [],
      "text": "@historiesuntold2 Anantnag and you",
      "parent_context": "Anyone from 2020 batch Love from Kashmir ❤️❤️"
    },
    {
      "comment_id": "Ugx2HVcMno8Oy85EVkd4AaABAg.9DYTHPfTub39I4dJkrAGxV",
      "parent_id": "Ugx2HVcMno8Oy85EVkd4AaABAg",
      "comment_type": "reply",
      "author": "@mathocity8337",
      "likes": 3,
      "published_at": "2021-01-04T05:32:14Z",
      "timestamp_refs": [],
      "text": "@historiesuntold2 love for Kashmir only not for India?",
      "parent_context": "Anyone from 2020 batch Love from Kashmir ❤️❤️"
    },
    {
      "comment_id": "Ugx2HVcMno8Oy85EVkd4AaABAg.9DYTHPfTub39I5Z1dOBQaK",
      "parent_id": "Ugx2HVcMno8Oy85EVkd4AaABAg",
      "comment_type": "reply",
      "author": "@bshsksieshsbbsj3626",
      "likes": 0,
      "published_at": "2021-01-04T14:05:18Z",
      "timestamp_refs": [],
      "text": "2g network mein kaisa lgta h video",
      "parent_context": "Anyone from 2020 batch Love from Kashmir ❤️❤️"
    },
    {
      "comment_id": "Ugx2HVcMno8Oy85EVkd4AaABAg.9DYTHPfTub39I5ZDdk10ol",
      "parent_id": "Ugx2HVcMno8Oy85EVkd4AaABAg",
      "comment_type": "reply",
      "author": "@bshsksieshsbbsj3626",
      "likes": 0,
      "published_at": "2021-01-04T14:06:57Z",
      "timestamp_refs": [],
      "text": "And why you had written I am muslim nobody is interested in knowing your religion. Plzz stop spreading hatred.",
      "parent_context": "Anyone from 2020 batch Love from Kashmir ❤️❤️"
    },
    {
      "comment_id": "Ugx2HVcMno8Oy85EVkd4AaABAg.9DYTHPfTub39J4p_8oR2Ha",
      "parent_id": "Ugx2HVcMno8Oy85EVkd4AaABAg",
      "comment_type": "reply",
      "author": "@manjulashivraj5643",
      "likes": 0,
      "published_at": "2021-01-29T03:50:43Z",
      "timestamp_refs": [],
      "text": "@b.nikhilshetty3393 in Karnataka, which district ?",
      "parent_context": "Anyone from 2020 batch Love from Kashmir ❤️❤️"
    },
    {
      "comment_id": "Ugx2HVcMno8Oy85EVkd4AaABAg.9DYTHPfTub39J4qER5b4Hq",
      "parent_id": "Ugx2HVcMno8Oy85EVkd4AaABAg",
      "comment_type": "reply",
      "author": "@b.nikhilshetty3393",
      "likes": 0,
      "published_at": "2021-01-29T03:56:29Z",
      "timestamp_refs": [],
      "text": "@manjulashivraj5643 tumkur",
      "parent_context": "Anyone from 2020 batch Love from Kashmir ❤️❤️"
    },
    {
      "comment_id": "Ugx2HVcMno8Oy85EVkd4AaABAg.9DYTHPfTub39J4qFd6enQf",
      "parent_id": "Ugx2HVcMno8Oy85EVkd4AaABAg",
      "comment_type": "reply",
      "author": "@b.nikhilshetty3393",
      "likes": 0,
      "published_at": "2021-01-29T03:56:39Z",
      "timestamp_refs": [],
      "text": "@manjulashivraj5643 u",
      "parent_context": "Anyone from 2020 batch Love from Kashmir ❤️❤️"
    },
    {
      "comment_id": "Ugx2HVcMno8Oy85EVkd4AaABAg.9DYTHPfTub39J4qY75Ctnw",
      "parent_id": "Ugx2HVcMno8Oy85EVkd4AaABAg",
      "comment_type": "reply",
      "author": "@manjulashivraj5643",
      "likes": 0,
      "published_at": "2021-01-29T03:59:11Z",
      "timestamp_refs": [],
      "text": "@b.nikhilshetty3393 oh nice!r u preparing for any competitive exam?",
      "parent_context": "Anyone from 2020 batch Love from Kashmir ❤️❤️"
    },
    {
      "comment_id": "Ugx2HVcMno8Oy85EVkd4AaABAg.9DYTHPfTub39J51gEX1NDu",
      "parent_id": "Ugx2HVcMno8Oy85EVkd4AaABAg",
      "comment_type": "reply",
      "author": "@b.nikhilshetty3393",
      "likes": 0,
      "published_at": "2021-01-29T05:45:17Z",
      "timestamp_refs": [],
      "text": "@manjulashivraj5643 s.... for jee",
      "parent_context": "Anyone from 2020 batch Love from Kashmir ❤️❤️"
    },
    {
      "comment_id": "Ugx2HVcMno8Oy85EVkd4AaABAg.9DYTHPfTub39J51k_CSsmd",
      "parent_id": "Ugx2HVcMno8Oy85EVkd4AaABAg",
      "comment_type": "reply",
      "author": "@b.nikhilshetty3393",
      "likes": 0,
      "published_at": "2021-01-29T05:45:52Z",
      "timestamp_refs": [],
      "text": "@manjulashivraj5643 ru the student or not",
      "parent_context": "Anyone from 2020 batch Love from Kashmir ❤️❤️"
    },
    {
      "comment_id": "Ugx2HVcMno8Oy85EVkd4AaABAg.9DYTHPfTub39J53QhE-UQk",
      "parent_id": "Ugx2HVcMno8Oy85EVkd4AaABAg",
      "comment_type": "reply",
      "author": "@manjulashivraj5643",
      "likes": 0,
      "published_at": "2021-01-29T06:00:30Z",
      "timestamp_refs": [],
      "text": "@b.nikhilshetty3393 ya I am a student",
      "parent_context": "Anyone from 2020 batch Love from Kashmir ❤️❤️"
    },
    {
      "comment_id": "Ugx2HVcMno8Oy85EVkd4AaABAg.9DYTHPfTub39J53Umfypyo",
      "parent_id": "Ugx2HVcMno8Oy85EVkd4AaABAg",
      "comment_type": "reply",
      "author": "@manjulashivraj5643",
      "likes": 0,
      "published_at": "2021-01-29T06:01:03Z",
      "timestamp_refs": [],
      "text": "@b.nikhilshetty3393 this is my mom's phone",
      "parent_context": "Anyone from 2020 batch Love from Kashmir ❤️❤️"
    },
    {
      "comment_id": "Ugx2HVcMno8Oy85EVkd4AaABAg.9DYTHPfTub39J54I4YJ_ZX",
      "parent_id": "Ugx2HVcMno8Oy85EVkd4AaABAg",
      "comment_type": "reply",
      "author": "@b.nikhilshetty3393",
      "likes": 0,
      "published_at": "2021-01-29T06:08:04Z",
      "timestamp_refs": [],
      "text": "@manjulashivraj5643 ha kk..",
      "parent_context": "Anyone from 2020 batch Love from Kashmir ❤️❤️"
    },
    {
      "comment_id": "Ugx2HVcMno8Oy85EVkd4AaABAg.9DYTHPfTub39J5ep8VZnxX",
      "parent_id": "Ugx2HVcMno8Oy85EVkd4AaABAg",
      "comment_type": "reply",
      "author": "@b.nikhilshetty3393",
      "likes": 0,
      "published_at": "2021-01-29T11:36:01Z",
      "timestamp_refs": [],
      "text": "@manjulashivraj5643 r u in insta",
      "parent_context": "Anyone from 2020 batch Love from Kashmir ❤️❤️"
    },
    {
      "comment_id": "Ugx2HVcMno8Oy85EVkd4AaABAg.9DYTHPfTub39J62qu2YMZP",
      "parent_id": "Ugx2HVcMno8Oy85EVkd4AaABAg",
      "comment_type": "reply",
      "author": "@littlegirls6841",
      "likes": 0,
      "published_at": "2021-01-29T15:14:43Z",
      "timestamp_refs": [],
      "text": "@b.nikhilshetty3393 mysore Manjula shivraj",
      "parent_context": "Anyone from 2020 batch Love from Kashmir ❤️❤️"
    },
    {
      "comment_id": "Ugx2HVcMno8Oy85EVkd4AaABAg.9DYTHPfTub39J62vHu82cM",
      "parent_id": "Ugx2HVcMno8Oy85EVkd4AaABAg",
      "comment_type": "reply",
      "author": "@littlegirls6841",
      "likes": 0,
      "published_at": "2021-01-29T15:15:19Z",
      "timestamp_refs": [],
      "text": "@b.nikhilshetty3393 no",
      "parent_context": "Anyone from 2020 batch Love from Kashmir ❤️❤️"
    },
    {
      "comment_id": "Ugx2HVcMno8Oy85EVkd4AaABAg.9DYTHPfTub39J6BZp6e23-",
      "parent_id": "Ugx2HVcMno8Oy85EVkd4AaABAg",
      "comment_type": "reply",
      "author": "@b.nikhilshetty3393",
      "likes": 0,
      "published_at": "2021-01-29T16:30:53Z",
      "timestamp_refs": [],
      "text": "@littlegirls6841 wt is ur name",
      "parent_context": "Anyone from 2020 batch Love from Kashmir ❤️❤️"
    },
    {
      "comment_id": "Ugx2HVcMno8Oy85EVkd4AaABAg.9DYTHPfTub39J6BeW69izc",
      "parent_id": "Ugx2HVcMno8Oy85EVkd4AaABAg",
      "comment_type": "reply",
      "author": "@b.nikhilshetty3393",
      "likes": 0,
      "published_at": "2021-01-29T16:31:40Z",
      "timestamp_refs": [],
      "text": "@littlegirls6841 both manjula and little girls are same",
      "parent_context": "Anyone from 2020 batch Love from Kashmir ❤️❤️"
    },
    {
      "comment_id": "Ugx2HVcMno8Oy85EVkd4AaABAg.9DYTHPfTub39J7FoBOzy0E",
      "parent_id": "Ugx2HVcMno8Oy85EVkd4AaABAg",
      "comment_type": "reply",
      "author": "@littlegirls6841",
      "likes": 0,
      "published_at": "2021-01-30T02:27:11Z",
      "timestamp_refs": [],
      "text": "@b.nikhilshetty3393 ya that was my mom's phone R u a student?r u preparing for any competitive exam?",
      "parent_context": "Anyone from 2020 batch Love from Kashmir ❤️❤️"
    },
    {
      "comment_id": "Ugx2HVcMno8Oy85EVkd4AaABAg.9DYTHPfTub39J7GVzvJOSS",
      "parent_id": "Ugx2HVcMno8Oy85EVkd4AaABAg",
      "comment_type": "reply",
      "author": "@littlegirls6841",
      "likes": 0,
      "published_at": "2021-01-30T02:33:18Z",
      "timestamp_refs": [],
      "text": "@b.nikhilshetty3393 y?",
      "parent_context": "Anyone from 2020 batch Love from Kashmir ❤️❤️"
    },
    {
      "comment_id": "Ugx2HVcMno8Oy85EVkd4AaABAg.9DYTHPfTub39J7L9zLrvtV",
      "parent_id": "Ugx2HVcMno8Oy85EVkd4AaABAg",
      "comment_type": "reply",
      "author": "@littlegirls6841",
      "likes": 0,
      "published_at": "2021-01-30T03:13:59Z",
      "timestamp_refs": [],
      "text": "@b.nikhilshetty3393 oh u told u r preparing for jee right!ok r u in 11th or 12th?have u joined for any coaching?",
      "parent_context": "Anyone from 2020 batch Love from Kashmir ❤️❤️"
    },
    {
      "comment_id": "Ugx2HVcMno8Oy85EVkd4AaABAg.9DYTHPfTub39J7LwLojj6K",
      "parent_id": "Ugx2HVcMno8Oy85EVkd4AaABAg",
      "comment_type": "reply",
      "author": "@b.nikhilshetty3393",
      "likes": 0,
      "published_at": "2021-01-30T03:20:43Z",
      "timestamp_refs": [],
      "text": "@littlegirls6841 ya I am 11th Aiyo nan clg belage 8.0 ge start adre mugiodu 6.15 ge adike yav coaching gu ogoke agtila Niv ogtira",
      "parent_context": "Anyone from 2020 batch Love from Kashmir ❤️❤️"
    },
    {
      "comment_id": "Ugx2HVcMno8Oy85EVkd4AaABAg.9DYTHPfTub39J7M56ZXEUu",
      "parent_id": "Ugx2HVcMno8Oy85EVkd4AaABAg",
      "comment_type": "reply",
      "author": "@b.nikhilshetty3393",
      "likes": 0,
      "published_at": "2021-01-30T03:22:03Z",
      "timestamp_refs": [],
      "text": "@littlegirls6841 oh kk... Agadre edu nim da",
      "parent_context": "Anyone from 2020 batch Love from Kashmir ❤️❤️"
    },
    {
      "comment_id": "Ugx2HVcMno8Oy85EVkd4AaABAg.9DYTHPfTub39J7MCV6S3sW",
      "parent_id": "Ugx2HVcMno8Oy85EVkd4AaABAg",
      "comment_type": "reply",
      "author": "@b.nikhilshetty3393",
      "likes": 0,
      "published_at": "2021-01-30T03:23:04Z",
      "timestamp_refs": [],
      "text": "s niv en odtirodu Nim name enu",
      "parent_context": "Anyone from 2020 batch Love from Kashmir ❤️❤️"
    },
    {
      "comment_id": "Ugx2HVcMno8Oy85EVkd4AaABAg.9DYTHPfTub39J7RJh8YBOI",
      "parent_id": "Ugx2HVcMno8Oy85EVkd4AaABAg",
      "comment_type": "reply",
      "author": "@littlegirls6841",
      "likes": 0,
      "published_at": "2021-01-30T04:07:44Z",
      "timestamp_refs": [],
      "text": "@b.nikhilshetty3393 ya I'm a neet aspirant,even i am in 11th.i have joined a coaching for my neet prep but I am not happy with them 😕 so I am seeing youtube videos.u r the first guy in YouTube that I have got who is from karnataka and speaks kannada.there r no motivational videos from karnataka no YouTube channel 😢 no vlogs 😢 very sad,I have to learn hindi in order to these these classes.this is not my phone this is my tab.I am using it just to see YouTube videos.",
      "parent_context": "Anyone from 2020 batch Love from Kashmir ❤️❤️"
    },
    {
      "comment_id": "Ugx2HVcMno8Oy85EVkd4AaABAg.9DYTHPfTub39J7RQnRonqJ",
      "parent_id": "Ugx2HVcMno8Oy85EVkd4AaABAg",
      "comment_type": "reply",
      "author": "@littlegirls6841",
      "likes": 0,
      "published_at": "2021-01-30T04:08:42Z",
      "timestamp_refs": [],
      "text": "@b.nikhilshetty3393 have they started the college for u",
      "parent_context": "Anyone from 2020 batch Love from Kashmir ❤️❤️"
    },
    {
      "comment_id": "Ugx2HVcMno8Oy85EVkd4AaABAg.9DYTHPfTub39J7T1RK-K5J",
      "parent_id": "Ugx2HVcMno8Oy85EVkd4AaABAg",
      "comment_type": "reply",
      "author": "@b.nikhilshetty3393",
      "likes": 0,
      "published_at": "2021-01-30T04:22:43Z",
      "timestamp_refs": [],
      "text": "@littlegirls6841 s.... nangu online cls alli arta agtirlila adike YouTube ge bandidu But evaga clg start agirodrinda solpa easy agtide doubts na clarify madkoloke Nimge start agilva clg?",
      "parent_context": "Anyone from 2020 batch Love from Kashmir ❤️❤️"
    },
    {
      "comment_id": "Ugx2HVcMno8Oy85EVkd4AaABAg.9DYTHPfTub39J7T3W--xGp",
      "parent_id": "Ugx2HVcMno8Oy85EVkd4AaABAg",
      "comment_type": "reply",
      "author": "@b.nikhilshetty3393",
      "likes": 0,
      "published_at": "2021-01-30T04:23:00Z",
      "timestamp_refs": [],
      "text": "@littlegirls6841 s.... nimge",
      "parent_context": "Anyone from 2020 batch Love from Kashmir ❤️❤️"
    },
    {
      "comment_id": "Ugx2HVcMno8Oy85EVkd4AaABAg.9DYTHPfTub39J7T7PNVyG-",
      "parent_id": "Ugx2HVcMno8Oy85EVkd4AaABAg",
      "comment_type": "reply",
      "author": "@b.nikhilshetty3393",
      "likes": 0,
      "published_at": "2021-01-30T04:23:32Z",
      "timestamp_refs": [],
      "text": "@littlegirls6841 nan relative's mysore alli edare",
      "parent_context": "Anyone from 2020 batch Love from Kashmir ❤️❤️"
    },
    {
      "comment_id": "Ugx2HVcMno8Oy85EVkd4AaABAg.9DYTHPfTub39J7TL8LdXFf",
      "parent_id": "Ugx2HVcMno8Oy85EVkd4AaABAg",
      "comment_type": "reply",
      "author": "@littlegirls6841",
      "likes": 0,
      "published_at": "2021-01-30T04:25:25Z",
      "timestamp_refs": [],
      "text": "@b.nikhilshetty3393 from monday",
      "parent_context": "Anyone from 2020 batch Love from Kashmir ❤️❤️"
    },
    {
      "comment_id": "Ugx2HVcMno8Oy85EVkd4AaABAg.9DYTHPfTub39J7TQEaqppw",
      "parent_id": "Ugx2HVcMno8Oy85EVkd4AaABAg",
      "comment_type": "reply",
      "author": "@littlegirls6841",
      "likes": 0,
      "published_at": "2021-01-30T04:26:06Z",
      "timestamp_refs": [],
      "text": "@b.nikhilshetty3393 same 😅",
      "parent_context": "Anyone from 2020 batch Love from Kashmir ❤️❤️"
    },
    {
      "comment_id": "Ugx2HVcMno8Oy85EVkd4AaABAg.9DYTHPfTub39J7TnNsSpxR",
      "parent_id": "Ugx2HVcMno8Oy85EVkd4AaABAg",
      "comment_type": "reply",
      "author": "@b.nikhilshetty3393",
      "likes": 0,
      "published_at": "2021-01-30T04:29:24Z",
      "timestamp_refs": [],
      "text": "@littlegirls6841 ok",
      "parent_context": "Anyone from 2020 batch Love from Kashmir ❤️❤️"
    },
    {
      "comment_id": "Ugx2HVcMno8Oy85EVkd4AaABAg.9DYTHPfTub39J7U22A2-Jl",
      "parent_id": "Ugx2HVcMno8Oy85EVkd4AaABAg",
      "comment_type": "reply",
      "author": "@littlegirls6841",
      "likes": 0,
      "published_at": "2021-01-30T04:31:33Z",
      "timestamp_refs": [],
      "text": "@b.nikhilshetty3393 from Monday.",
      "parent_context": "Anyone from 2020 batch Love from Kashmir ❤️❤️"
    },
    {
      "comment_id": "Ugx2HVcMno8Oy85EVkd4AaABAg.9DYTHPfTub39J7W3D5g-XH",
      "parent_id": "Ugx2HVcMno8Oy85EVkd4AaABAg",
      "comment_type": "reply",
      "author": "@littlegirls6841",
      "likes": 0,
      "published_at": "2021-01-30T04:49:11Z",
      "timestamp_refs": [],
      "text": "@b.nikhilshetty3393 for physics and chemistry which yt channel r u preferring",
      "parent_context": "Anyone from 2020 batch Love from Kashmir ❤️❤️"
    },
    {
      "comment_id": "Ugx2HVcMno8Oy85EVkd4AaABAg.9DYTHPfTub39J7_DZdRChS",
      "parent_id": "Ugx2HVcMno8Oy85EVkd4AaABAg",
      "comment_type": "reply",
      "author": "@littlegirls6841",
      "likes": 0,
      "published_at": "2021-01-30T05:25:33Z",
      "timestamp_refs": [],
      "text": "@b.nikhilshetty3393 same,chem How is ur prep going on?",
      "parent_context": "Anyone from 2020 batch Love from Kashmir ❤️❤️"
    },
    {
      "comment_id": "UgwX454BAo9JoQw7DHF4AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@taiba7139",
      "likes": 977,
      "published_at": "2018-07-13T11:27:28Z",
      "timestamp_refs": [],
      "text": "Jo sir se pyar krte ho like maro",
      "parent_context": ""
    },
    {
      "comment_id": "UgwX454BAo9JoQw7DHF4AaABAg.8idOlo1cucf8nGqR7m-I2L",
      "parent_id": "UgwX454BAo9JoQw7DHF4AaABAg",
      "comment_type": "reply",
      "author": "@SanilJadhav711",
      "likes": 28,
      "published_at": "2018-11-05T14:33:06Z",
      "timestamp_refs": [],
      "text": "Sir se pyar krte hai to sir ki video pe like marenge , yha pe kyu mare ? 😂 😂",
      "parent_context": "Jo sir se pyar krte ho like maro"
    },
    {
      "comment_id": "Ugzg7YWJSeGMTlBcl9J4AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@shashikanttiwari7474",
      "likes": 15,
      "published_at": "2019-02-16T17:55:15Z",
      "timestamp_refs": [],
      "text": "Best video sir, now even i can explain this all of the things to my chemistry sir also.... It's too good",
      "parent_context": ""
    },
    {
      "comment_id": "UgxNqnBUwz3vDv9xWr54AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@praveenchaurasia6729",
      "likes": 57,
      "published_at": "2018-07-19T09:44:06Z",
      "timestamp_refs": [],
      "text": "next superstar...... found.",
      "parent_context": ""
    },
    {
      "comment_id": "UgxiLRX8iRCQwrLiktp4AaABAg.9jDBnILyc4t9kDH_Ou8lNi",
      "parent_id": "UgxiLRX8iRCQwrLiktp4AaABAg",
      "comment_type": "reply",
      "author": "@sahilshukla7731",
      "likes": 0,
      "published_at": "2022-12-29T09:17:07Z",
      "timestamp_refs": [],
      "text": "How much u scored?",
      "parent_context": "2nd lecture done..... Hope i could do as many lectures as possible..... I have chem exam tomorrow...... Wish me luck...."
    },
    {
      "comment_id": "UgzzRp6neDhkpAX_oA14AaABAg.9-cgzPu9R5S90DybGIql2f",
      "parent_id": "UgzzRp6neDhkpAX_oA14AaABAg",
      "comment_type": "reply",
      "author": "@urjadhirwani8120",
      "likes": 0,
      "published_at": "2019-10-18T11:06:19Z",
      "timestamp_refs": [],
      "text": "@neetaupyy1759 what ?",
      "parent_context": "Best lectures of chemistry 📖📑....and the amount of knowledge 📚📚that he gives is just amazing.....really sir a big big thank you for making us so capable and making us fall in love with physics and chemistry .....the subjects that before your video we hated the most 😁... Thank you sir !!😊😊 Hit like if u agreeee.......nowwww !!! 👇👇"
    },
    {
      "comment_id": "UgzEVddx2HZ8KbQxIJR4AaABAg.9P9M3fXs95F9TdK_BcWpkR",
      "parent_id": "UgzEVddx2HZ8KbQxIJR4AaABAg",
      "comment_type": "reply",
      "author": "@anchitking4600",
      "likes": 2,
      "published_at": "2021-10-18T11:57:42Z",
      "timestamp_refs": [],
      "text": "@_Sweetmoontae_ where is your army posting?",
      "parent_context": "May Allah grant you a long life for the amelioration of study of class 11&12 . Love & respect from Bangladesh 🇧🇩🇮🇳🇧🇩❤❤💙💚💛💜"
    },
    {
      "comment_id": "UgzEVddx2HZ8KbQxIJR4AaABAg.9P9M3fXs95F9TdjhD7CAsw",
      "parent_id": "UgzEVddx2HZ8KbQxIJR4AaABAg",
      "comment_type": "reply",
      "author": "@shuttle7i",
      "likes": 0,
      "published_at": "2021-10-18T15:45:59Z",
      "timestamp_refs": [],
      "text": "@anchitking4600 seoul , south korea . Any problem?",
      "parent_context": "May Allah grant you a long life for the amelioration of study of class 11&12 . Love & respect from Bangladesh 🇧🇩🇮🇳🇧🇩❤❤💙💚💛💜"
    },
    {
      "comment_id": "UgyhSnNTwwAgBCAM-6J4AaABAg.903jPXA49_w9l4metXzRbj",
      "parent_id": "UgyhSnNTwwAgBCAM-6J4AaABAg",
      "comment_type": "reply",
      "author": "@ceo_of_eldia",
      "likes": 0,
      "published_at": "2023-01-19T22:35:43Z",
      "timestamp_refs": [],
      "text": "@idlegaming3203 nikla tera jee?",
      "parent_context": "These classes of chemistry is better than our school classes"
    },
    {
      "comment_id": "UgyF7L_F8-s--RGDgAB4AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@nerdyunboxer7014",
      "likes": 78,
      "published_at": "2018-07-13T06:09:11Z",
      "timestamp_refs": [],
      "text": "sir aap farishte ho ham logo ko chod ke kabhi nahi jana please 😯😯😯",
      "parent_context": ""
    },
    {
      "comment_id": "UgyF7L_F8-s--RGDgAB4AaABAg.8icpLi8ahp98sJlJHhsi-L",
      "parent_id": "UgyF7L_F8-s--RGDgAB4AaABAg",
      "comment_type": "reply",
      "author": "@Paul_Walker",
      "likes": 0,
      "published_at": "2019-03-11T00:23:02Z",
      "timestamp_refs": [],
      "text": "James bond bhai khud gali deke bol rhe ho serious ho jao",
      "parent_context": "sir aap farishte ho ham logo ko chod ke kabhi nahi jana please 😯😯😯"
    },
    {
      "comment_id": "UgwU9yy3AQxLmTgjPzh4AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@jyotirana803",
      "likes": 7,
      "published_at": "2021-09-25T06:47:22Z",
      "timestamp_refs": [
        "4:25"
      ],
      "text": "4:25 sir apne kaha \"agar gaseous state hai to ye unstable hai\". But noble gases bhi to gases hoti hai or wo gases to stable hoti hai.",
      "parent_context": ""
    },
    {
      "comment_id": "UgwXbZ4nxdjkbof-5Xh4AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@ayushgupta533",
      "likes": 25,
      "published_at": "2020-12-19T03:26:00Z",
      "timestamp_refs": [],
      "text": "SIR PLS MORE EASILY ABOUT LATICE ENTHALPY , LATTICE ENERGY, HYDRATION ENTHALPY AND ENERGY, INONIZATION ENTHALPY AND ENERGY IS MORE CONFUSIOUS IN NEXT CHAPTERS",
      "parent_context": ""
    },
    {
      "comment_id": "UgwXbZ4nxdjkbof-5Xh4AaABAg.9HRD99cbpt69JAXJ-Ha9g6",
      "parent_id": "UgwXbZ4nxdjkbof-5Xh4AaABAg",
      "comment_type": "reply",
      "author": "@Khan_Sofii29",
      "likes": 3,
      "published_at": "2021-01-31T08:57:48Z",
      "timestamp_refs": [],
      "text": "read it out now from NCERT it will be more easy for you",
      "parent_context": "SIR PLS MORE EASILY ABOUT LATICE ENTHALPY , LATTICE ENERGY, HYDRATION ENTHALPY AND ENERGY, INONIZATION ENTHALPY AND ENERGY IS MORE CONFUSIOUS IN NEXT CHAPTERS"
    },
    {
      "comment_id": "Ugy9mMA4JYekH5mxUpJ4AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@PriyaGupta-bi2kh",
      "likes": 32,
      "published_at": "2018-11-24T08:02:42Z",
      "timestamp_refs": [],
      "text": "Sir. Schrodinger equation of hydrogen atom and wave function pr bhi ek video bna do plzzz",
      "parent_context": ""
    },
    {
      "comment_id": "Ugy9mMA4JYekH5mxUpJ4AaABAg.8o13rHGxDoz91ali1GRUpM",
      "parent_id": "Ugy9mMA4JYekH5mxUpJ4AaABAg",
      "comment_type": "reply",
      "author": "@pradeepkumarmishra1659",
      "likes": 0,
      "published_at": "2019-11-21T13:26:49Z",
      "timestamp_refs": [],
      "text": "That is belongs to the 2nd chapter of 11th NCERT text book.",
      "parent_context": "Sir. Schrodinger equation of hydrogen atom and wave function pr bhi ek video bna do plzzz"
    },
    {
      "comment_id": "UgyvROTQ1WcVD81J74d4AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@ramesh_rm",
      "likes": 7,
      "published_at": "2021-08-23T10:58:48Z",
      "timestamp_refs": [
        "24:11"
      ],
      "text": "24:11 sir producing thunder in hands",
      "parent_context": ""
    },
    {
      "comment_id": "UgwTnS0r1VyYmnNc7Td4AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@ravindersingh-re9kr",
      "likes": 44,
      "published_at": "2020-09-26T03:17:13Z",
      "timestamp_refs": [
        "11:57"
      ],
      "text": "11:57 sir it must be 3-12 😃",
      "parent_context": ""
    },
    {
      "comment_id": "Ugw9szJjxPqFZM_36454AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@divyanshshekharsingh2307",
      "likes": 618,
      "published_at": "2019-09-17T19:06:05Z",
      "timestamp_refs": [],
      "text": "I think school teachers bhi inse hi padhte honge😂😂😂😂😂",
      "parent_context": ""
    },
    {
      "comment_id": "Ugw9szJjxPqFZM_36454AaABAg.9---ruyKhNx9DqvMj7cynZ",
      "parent_id": "Ugw9szJjxPqFZM_36454AaABAg",
      "comment_type": "reply",
      "author": "@rmggroup",
      "likes": 1,
      "published_at": "2020-09-21T02:15:44Z",
      "timestamp_refs": [],
      "text": "@justalazyguy.0_0 Are you teacher?😂😂😂",
      "parent_context": "I think school teachers bhi inse hi padhte honge😂😂😂😂😂"
    },
    {
      "comment_id": "Ugw9szJjxPqFZM_36454AaABAg.9---ruyKhNx9PANl-y8KGK",
      "parent_id": "Ugw9szJjxPqFZM_36454AaABAg",
      "comment_type": "reply",
      "author": "@miraclemickey9894",
      "likes": 0,
      "published_at": "2021-06-29T10:42:44Z",
      "timestamp_refs": [],
      "text": "@sirdarwin3957 dekho... Jo original comment h... Uska way of speaking dekho. Aisa kisi bhi angle se nhi lg rha ki woh ek general baat keh rha h... Woh iss baat ko unka mazak udate hue keh rha h. Emojis he dekhlo jo usne use kiye h.",
      "parent_context": "I think school teachers bhi inse hi padhte honge😂😂😂😂😂"
    },
    {
      "comment_id": "UgyFlrmGp1ZTUbg0Gnx4AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@lordcarbin8467",
      "likes": 384,
      "published_at": "2019-10-02T15:42:04Z",
      "timestamp_refs": [],
      "text": "My mam: Ionic bond has a bond Me: mam unmein danda nahi hota 👌👌🤔😂",
      "parent_context": ""
    },
    {
      "comment_id": "UgyFlrmGp1ZTUbg0Gnx4AaABAg.9-aGRmJzFHo98HGEQNnDEF",
      "parent_id": "UgyFlrmGp1ZTUbg0Gnx4AaABAg",
      "comment_type": "reply",
      "author": "@gmtarantulaghosh6134",
      "likes": 10,
      "published_at": "2020-05-05T13:57:58Z",
      "timestamp_refs": [],
      "text": "Bhai ionic Bond ka to bond hi Nahi hota",
      "parent_context": "My mam: Ionic bond has a bond Me: mam unmein danda nahi hota 👌👌🤔😂"
    },
    {
      "comment_id": "UgyFlrmGp1ZTUbg0Gnx4AaABAg.9-aGRmJzFHo9AKw7XJ9uBT",
      "parent_id": "UgyFlrmGp1ZTUbg0Gnx4AaABAg",
      "comment_type": "reply",
      "author": "@atharvchauhan2648",
      "likes": 3,
      "published_at": "2020-06-25T17:13:17Z",
      "timestamp_refs": [],
      "text": "Phir kya hua??",
      "parent_context": "My mam: Ionic bond has a bond Me: mam unmein danda nahi hota 👌👌🤔😂"
    },
    {
      "comment_id": "UgyFlrmGp1ZTUbg0Gnx4AaABAg.9-aGRmJzFHo9AKyAh45nkc",
      "parent_id": "UgyFlrmGp1ZTUbg0Gnx4AaABAg",
      "comment_type": "reply",
      "author": "@atharvchauhan2648",
      "likes": 1,
      "published_at": "2020-06-25T17:31:11Z",
      "timestamp_refs": [],
      "text": "@debtanaysarkar9744 bhai tu 11th maii hai??",
      "parent_context": "My mam: Ionic bond has a bond Me: mam unmein danda nahi hota 👌👌🤔😂"
    },
    {
      "comment_id": "UgyFlrmGp1ZTUbg0Gnx4AaABAg.9-aGRmJzFHo9AL2grnP2HQ",
      "parent_id": "UgyFlrmGp1ZTUbg0Gnx4AaABAg",
      "comment_type": "reply",
      "author": "@debtanaysarkar9744",
      "likes": 2,
      "published_at": "2020-06-25T18:19:24Z",
      "timestamp_refs": [],
      "text": "@atharvchauhan2648 No I am in class 9 What about you?",
      "parent_context": "My mam: Ionic bond has a bond Me: mam unmein danda nahi hota 👌👌🤔😂"
    },
    {
      "comment_id": "UgyFlrmGp1ZTUbg0Gnx4AaABAg.9-aGRmJzFHo9AM83Qzh961",
      "parent_id": "UgyFlrmGp1ZTUbg0Gnx4AaABAg",
      "comment_type": "reply",
      "author": "@atharvchauhan2648",
      "likes": 1,
      "published_at": "2020-06-26T04:25:33Z",
      "timestamp_refs": [],
      "text": "@debtanaysarkar9744 naa bhai 12th maii Jab 9th maii hai too kyu dekh raha haii???",
      "parent_context": "My mam: Ionic bond has a bond Me: mam unmein danda nahi hota 👌👌🤔😂"
    },
    {
      "comment_id": "UgyFlrmGp1ZTUbg0Gnx4AaABAg.9-aGRmJzFHo9AM8YsfBc_n",
      "parent_id": "UgyFlrmGp1ZTUbg0Gnx4AaABAg",
      "comment_type": "reply",
      "author": "@atharvchauhan2648",
      "likes": 1,
      "published_at": "2020-06-26T04:29:51Z",
      "timestamp_refs": [],
      "text": "@debtanaysarkar9744 bhadia yaar Koon see city maii hai tu?",
      "parent_context": "My mam: Ionic bond has a bond Me: mam unmein danda nahi hota 👌👌🤔😂"
    },
    {
      "comment_id": "UgyFlrmGp1ZTUbg0Gnx4AaABAg.9-aGRmJzFHo9AM9DrfJV1a",
      "parent_id": "UgyFlrmGp1ZTUbg0Gnx4AaABAg",
      "comment_type": "reply",
      "author": "@debtanaysarkar9744",
      "likes": 1,
      "published_at": "2020-06-26T04:35:43Z",
      "timestamp_refs": [],
      "text": "@atharvchauhan2648 What about you?",
      "parent_context": "My mam: Ionic bond has a bond Me: mam unmein danda nahi hota 👌👌🤔😂"
    },
    {
      "comment_id": "UgyFlrmGp1ZTUbg0Gnx4AaABAg.9-aGRmJzFHo9B8Uumk8ifF",
      "parent_id": "UgyFlrmGp1ZTUbg0Gnx4AaABAg",
      "comment_type": "reply",
      "author": "@shrenisharma556",
      "likes": 1,
      "published_at": "2020-07-15T17:47:14Z",
      "timestamp_refs": [],
      "text": "Ionic bond has no bond",
      "parent_context": "My mam: Ionic bond has a bond Me: mam unmein danda nahi hota 👌👌🤔😂"
    },
    {
      "comment_id": "UgyFlrmGp1ZTUbg0Gnx4AaABAg.9-aGRmJzFHo9B8aUX6Uz5R",
      "parent_id": "UgyFlrmGp1ZTUbg0Gnx4AaABAg",
      "comment_type": "reply",
      "author": "@chudasmayashpalsinh9922",
      "likes": 2,
      "published_at": "2020-07-15T18:44:41Z",
      "timestamp_refs": [],
      "text": "Lo karlo bat bond Mai bond hi nhi🤔🤔🤔🤔🤣🤣🤣🤣",
      "parent_context": "My mam: Ionic bond has a bond Me: mam unmein danda nahi hota 👌👌🤔😂"
    },
    {
      "comment_id": "UgyFlrmGp1ZTUbg0Gnx4AaABAg.9-aGRmJzFHo9Eir_m-bcwW",
      "parent_id": "UgyFlrmGp1ZTUbg0Gnx4AaABAg",
      "comment_type": "reply",
      "author": "@atharvchauhan2648",
      "likes": 1,
      "published_at": "2020-10-12T19:40:10Z",
      "timestamp_refs": [],
      "text": "@aaryapratapsingh9866 Kyu Du Main Tumhe Ye Dua Ki Meri Umar Tumhe Lag Jaaye, Kya Pata Mera Aakhri Din Ho Aur Tumhare La*de Lag Jaaye.",
      "parent_context": "My mam: Ionic bond has a bond Me: mam unmein danda nahi hota 👌👌🤔😂"
    },
    {
      "comment_id": "Ugw_jjOajnNJIn_eZX14AaABAg.8yrdKKlDk0k97qgSmGAUwy",
      "parent_id": "Ugw_jjOajnNJIn_eZX14AaABAg",
      "comment_type": "reply",
      "author": "@wajahathussain9814",
      "likes": 0,
      "published_at": "2020-04-24T20:57:07Z",
      "timestamp_refs": [],
      "text": "Covalent bonding py vedio upload hui hai kia 11th class ka",
      "parent_context": "Thank you sir for this great video... 🇮🇳"
    },
    {
      "comment_id": "Ugx0PWsTx9UrJKk0s3B4AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@NS_Pratham",
      "likes": 151,
      "published_at": "2023-09-17T11:10:48Z",
      "timestamp_refs": [],
      "text": "2024 - 2025 students attendance please 😁",
      "parent_context": ""
    },
    {
      "comment_id": "UgwfHrTPQNN4zQQQjfl4AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@Pushpinder_Singh_0610",
      "likes": 52,
      "published_at": "2018-07-13T06:12:19Z",
      "timestamp_refs": [],
      "text": "Please now make series of HC Verma for MEDICAL students we are hopefully dependent on you now our future is in your hands so please help us",
      "parent_context": ""
    },
    {
      "comment_id": "UgwfHrTPQNN4zQQQjfl4AaABAg.8icpheFogQZ8idVxp_ujgN",
      "parent_id": "UgwfHrTPQNN4zQQQjfl4AaABAg",
      "comment_type": "reply",
      "author": "@sachinbrar4117",
      "likes": 1,
      "published_at": "2018-07-13T12:30:16Z",
      "timestamp_refs": [],
      "text": "pushpinder singh u are correct",
      "parent_context": "Please now make series of HC Verma for MEDICAL students we are hopefully dependent on you now our future is in your hands so please help us"
    },
    {
      "comment_id": "Ugy5gKORk9d1Ny5_v-14AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@niradbaransamal9178",
      "likes": 7,
      "published_at": "2020-04-22T03:03:22Z",
      "timestamp_refs": [],
      "text": "Can we say lattice energy is the heat of formation of that compound?",
      "parent_context": ""
    },
    {
      "comment_id": "Ugy_kLr68aAhSOZQ4BV4AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@OmPrakashSingh-te3il",
      "likes": 6,
      "published_at": "2019-10-03T16:36:44Z",
      "timestamp_refs": [
        "27:29"
      ],
      "text": "27:29 always amazing #expressionking😱😀",
      "parent_context": ""
    },
    {
      "comment_id": "Ugy2vz1QdaMWmH1zIhh4AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@nancychaudhary1818",
      "likes": 7,
      "published_at": "2023-01-11T05:38:46Z",
      "timestamp_refs": [],
      "text": "Ek advice de rhi hoon organic pdhne se phle chemical bonding aache se smajh lo wrna kuch smajh nhi aayega as I face this difficulty that's why I am telling 😌",
      "parent_context": ""
    },
    {
      "comment_id": "Ugx8La0TlDNz7zgtJCl4AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@Prachi-ef9uy",
      "likes": 8,
      "published_at": "2019-10-03T07:12:50Z",
      "timestamp_refs": [],
      "text": "Sir do I hve to learn Lewis dot structure of anion or cations like nitrite or hydrogen cyanide (HCN)?",
      "parent_context": ""
    },
    {
      "comment_id": "UgwFBHsaf9yHS6RgWf54AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@SHORTS-fp9jr",
      "likes": 49,
      "published_at": "2022-12-08T03:37:53Z",
      "timestamp_refs": [],
      "text": "Studying in resonance but I am here 🙏 Power of PW......",
      "parent_context": ""
    },
    {
      "comment_id": "UgwFBHsaf9yHS6RgWf54AaABAg.9jMb3PqBwaO9kTKZukigh7",
      "parent_id": "UgwFBHsaf9yHS6RgWf54AaABAg",
      "comment_type": "reply",
      "author": "@babakebhakt9201",
      "likes": 2,
      "published_at": "2023-01-04T14:51:07Z",
      "timestamp_refs": [],
      "text": "Resonance",
      "parent_context": "Studying in resonance but I am here 🙏 Power of PW......"
    },
    {
      "comment_id": "UgwFBHsaf9yHS6RgWf54AaABAg.9jMb3PqBwaO9kTSa_Rg1bc",
      "parent_id": "UgwFBHsaf9yHS6RgWf54AaABAg",
      "comment_type": "reply",
      "author": "@babakebhakt9201",
      "likes": 0,
      "published_at": "2023-01-04T16:01:15Z",
      "timestamp_refs": [],
      "text": "Jo jo resonance se hai name batao",
      "parent_context": "Studying in resonance but I am here 🙏 Power of PW......"
    },
    {
      "comment_id": "Ugw_n2GbZRGTN3vBoKB4AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@dikshantbadesara2838",
      "likes": 33,
      "published_at": "2020-05-09T14:16:48Z",
      "timestamp_refs": [
        "29:11"
      ],
      "text": "Sir at 29:11 it will be MgCl2 , to unke formula similar kaise hong aur ye isomorphism kaise hua",
      "parent_context": ""
    },
    {
      "comment_id": "Ugw_n2GbZRGTN3vBoKB4AaABAg.98RaZsRN2Az9IUkdA3IEsz",
      "parent_id": "Ugw_n2GbZRGTN3vBoKB4AaABAg",
      "comment_type": "reply",
      "author": "@shrinivas6055",
      "likes": 5,
      "published_at": "2021-01-14T08:56:26Z",
      "timestamp_refs": [],
      "text": "@manjiripatankar9229 I goggled it and sir was rite but explanation was not correct",
      "parent_context": "Sir at 29:11 it will be MgCl2 , to unke formula similar kaise hong aur ye isomorphism kaise hua"
    },
    {
      "comment_id": "UgyLybv7hsIZ_XFX4_N4AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@warrior6757",
      "likes": 5,
      "published_at": "2020-07-25T08:30:50Z",
      "timestamp_refs": [
        "4:15"
      ],
      "text": "4:15 Generally Na is solid but here Na is gaseous because Ionization Energy term is involved which says that \"Amount of energy required to remove the valence electron from isolated,neutral,gaseous atom\". So here Na will be gaseous...",
      "parent_context": ""
    },
    {
      "comment_id": "Ugwa_1VZoathqxVSA6t4AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@asdfggfda35434",
      "likes": 74,
      "published_at": "2019-11-11T07:33:11Z",
      "timestamp_refs": [],
      "text": "YouTube pe kahi aur jakar jb yha wapis aata hu to pta chlta h ki ...baap baap hota h",
      "parent_context": ""
    },
    {
      "comment_id": "UgxvZhe6LofJn2g2YDl4AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@GANGZY_YT69",
      "likes": 70,
      "published_at": "2022-12-07T13:22:54Z",
      "timestamp_refs": [],
      "text": "2023-2024 students attendance here😊😊",
      "parent_context": ""
    },
    {
      "comment_id": "UgxQhD7Lnear9U9RSMh4AaABAg.A7-0vpZvuCEA7lLcq1KDKb",
      "parent_id": "UgxQhD7Lnear9U9RSMh4AaABAg",
      "comment_type": "reply",
      "author": "@divyabharti8642",
      "likes": 1,
      "published_at": "2024-08-30T12:39:26Z",
      "timestamp_refs": [],
      "text": "Correct 💯💯💯💯💯💯💯💯💯💯😊🤗🙏🏿",
      "parent_context": "Cricket all rounder: hardik pandya , subject all rounder : alakh pandya sir😅"
    },
    {
      "comment_id": "UgwKkrkzr11-MYOpkfh4AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@StudyingAnshika",
      "likes": 7,
      "published_at": "2025-07-12T04:35:50Z",
      "timestamp_refs": [
        "29:18"
      ],
      "text": "29:18 sir yahan aapne NaCl and MgCl ka eg liya tha but MgCl2 hota hai",
      "parent_context": ""
    },
    {
      "comment_id": "UgzHbMurpD7MfuqGXSR4AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@DineshSharma-ow9yl",
      "likes": 678,
      "published_at": "2020-04-08T10:13:47Z",
      "timestamp_refs": [],
      "text": "Who is seeing this in lockdown 🔐",
      "parent_context": ""
    },
    {
      "comment_id": "UgzHbMurpD7MfuqGXSR4AaABAg.97BL6qNuygc98GvMGSLNsy",
      "parent_id": "UgzHbMurpD7MfuqGXSR4AaABAg",
      "comment_type": "reply",
      "author": "@itzjokergaming9148",
      "likes": 2,
      "published_at": "2020-05-05T10:46:48Z",
      "timestamp_refs": [],
      "text": "@radhikajaiswal9191 are you on instagram...?",
      "parent_context": "Who is seeing this in lockdown 🔐"
    },
    {
      "comment_id": "UgzHbMurpD7MfuqGXSR4AaABAg.97BL6qNuygc9CN1qIuvSbV",
      "parent_id": "UgzHbMurpD7MfuqGXSR4AaABAg",
      "comment_type": "reply",
      "author": "@norablossoms9157",
      "likes": 0,
      "published_at": "2020-08-15T05:53:13Z",
      "timestamp_refs": [],
      "text": "@itzjokergaming9148 bruh for real?",
      "parent_context": "Who is seeing this in lockdown 🔐"
    },
    {
      "comment_id": "UgwUAsVmCKWSuBm5RyV4AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@mr.random2118",
      "likes": 114,
      "published_at": "2020-04-23T06:06:47Z",
      "timestamp_refs": [],
      "text": "Student-I will not Study Physics😨 Physics wallah- Cahlloo Bachhooo Me:😃😄😄😃 ♡ ♡ ♡",
      "parent_context": ""
    },
    {
      "comment_id": "Ugxn7p6KbGhfhwPPxnR4AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@theblueberrydiaries6506",
      "likes": 42,
      "published_at": "2023-06-13T08:47:44Z",
      "timestamp_refs": [],
      "text": "How many are 2023-24 students??",
      "parent_context": ""
    },
    {
      "comment_id": "UgydRP_YafEPf7z72IB4AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@deepayanswain6946",
      "likes": 10,
      "published_at": "2018-09-13T02:35:23Z",
      "timestamp_refs": [
        "20:37"
      ],
      "text": "20:37 sir in LiCl ,Li + ion ka ionic size sabse minimum hota hae in comparision to Na+,K+,Rb+ , to lattice energy LiCl compound ka maximum hoga ,to LiCl ka ionic bond will be more stronger than NaCl,KCl aur RbCl",
      "parent_context": ""
    },
    {
      "comment_id": "UgydRP_YafEPf7z72IB4AaABAg.8l759zEDcEV93v2GUNY3Vn",
      "parent_id": "UgydRP_YafEPf7z72IB4AaABAg",
      "comment_type": "reply",
      "author": "@swarnakumari1560",
      "likes": 1,
      "published_at": "2020-01-18T03:27:48Z",
      "timestamp_refs": [],
      "text": "Same doubt",
      "parent_context": "20:37 sir in LiCl ,Li + ion ka ionic size sabse minimum hota hae in comparision to Na+,K+,Rb+ , to lattice energy LiCl compound ka maximum hoga ,to LiCl ka ionic bond will be more stronger than NaCl,KCl aur RbCl"
    },
    {
      "comment_id": "UgwSZ5XMK2eis2X-0ax4AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@upanishadegala111",
      "likes": 24,
      "published_at": "2020-05-23T08:40:04Z",
      "timestamp_refs": [
        "29:11"
      ],
      "text": "29:11 Mg has a valency of 2. I think the formula should be MgCl2",
      "parent_context": ""
    },
    {
      "comment_id": "UgwSZ5XMK2eis2X-0ax4AaABAg.99-29hoFa9s9C_WymIIs2h",
      "parent_id": "UgwSZ5XMK2eis2X-0ax4AaABAg",
      "comment_type": "reply",
      "author": "@nandinisharan7572",
      "likes": 1,
      "published_at": "2020-08-20T11:35:23Z",
      "timestamp_refs": [],
      "text": "nii wo mgcl+ h....bcoz hmein same no of anions rkhne h comparison ke liye...kyuki 1 cl aur 1 mg ke becch bhi electrostaticforce lag rha h ..hence +charge le saath its still ionic..bcoz Mg aur Na almost size me same h ..isliye anion same rkhke sir dono ko compare kiye h..MgCl me + charge lagega ..hope it helps..",
      "parent_context": "29:11 Mg has a valency of 2. I think the formula should be MgCl2"
    },
    {
      "comment_id": "UgwSZ5XMK2eis2X-0ax4AaABAg.99-29hoFa9s9Cg_uutnZU0",
      "parent_id": "UgwSZ5XMK2eis2X-0ax4AaABAg",
      "comment_type": "reply",
      "author": "@sarthaksingh231",
      "likes": 0,
      "published_at": "2020-08-23T05:24:30Z",
      "timestamp_refs": [],
      "text": "@nandinisharan7572 Par Ek baat btao yaar.... MgCl kaise ban sakta hai.. I mean Phir Toh Unstable Rahega Compound",
      "parent_context": "29:11 Mg has a valency of 2. I think the formula should be MgCl2"
    },
    {
      "comment_id": "UgzoPwC-D7Id9UeeYJp4AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@dpn2007",
      "likes": 6,
      "published_at": "2023-09-15T13:11:06Z",
      "timestamp_refs": [
        "12:06"
      ],
      "text": "12:06 d block starts from grp 3 sir small correction",
      "parent_context": ""
    },
    {
      "comment_id": "Ugyr57ker34YAZusJ2B4AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@4shhhw",
      "likes": 0,
      "published_at": "2024-12-27T14:23:37Z",
      "timestamp_refs": [],
      "text": "thank you sir for your videos 🙏 you really explain in such a simple way",
      "parent_context": ""
    },
    {
      "comment_id": "UgxzxvLPkg6H8no2qMd4AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@Kingdom_Animalia-ADVANCE",
      "likes": 1,
      "published_at": "2025-11-24T21:21:44Z",
      "timestamp_refs": [],
      "text": "Kitna bhi tough paper aajaye... youtube pe sabhi video lectures par doubt honge...ki ye dekh luu esse to sare concept clear hojayenge na 😅 but puure india me or world me aapki hee ek aisee lauti video h jisspe baccha aankh band krke bhi lectures dekhe to saare concept clear hojaye 🎉🎉🎉 THREE CHEERS FOR ALAKH SIR ❤❤",
      "parent_context": ""
    },
    {
      "comment_id": "Ugw2XgbSa57hQ4ALnJh4AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@-CantHurtMe-",
      "likes": 50,
      "published_at": "2019-08-19T13:19:03Z",
      "timestamp_refs": [
        "29:11"
      ],
      "text": "29:11 i think it should be mgcl2",
      "parent_context": ""
    },
    {
      "comment_id": "UgxVnLjfkTT8LMsDMXp4AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@garimadubey1302",
      "likes": 0,
      "published_at": "2023-11-19T14:26:11Z",
      "timestamp_refs": [],
      "text": "Sir really aapki explanation bht aachi h ye ch me classteacher or coaching se clear nhi ho paa rha Tha or aapke lecture se saare doubt clear ho gye h",
      "parent_context": ""
    },
    {
      "comment_id": "UgyaEo-RZlypRgz_dQd4AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@arvindjha389",
      "likes": 7,
      "published_at": "2020-08-21T10:10:28Z",
      "timestamp_refs": [
        "29:30"
      ],
      "text": "29:30 Sir Mg aur Cl mil kar rhi MgCl2",
      "parent_context": ""
    },
    {
      "comment_id": "Ugzrq_z94I9mNfKUhnx4AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@sanscystar8104",
      "likes": 33,
      "published_at": "2019-07-30T15:25:44Z",
      "timestamp_refs": [
        "19:50"
      ],
      "text": "19:50 sir chlorine ka non metallic character flourine se zyada hota hai due to flourine's small atomic radii to ans NaCl hona chahiye??(correct me if i am wrong )",
      "parent_context": ""
    },
    {
      "comment_id": "Ugzrq_z94I9mNfKUhnx4AaABAg.8y0RhAeDJMx8zKcQ2wCekY",
      "parent_id": "Ugzrq_z94I9mNfKUhnx4AaABAg",
      "comment_type": "reply",
      "author": "@nerdingouttillfebruary866",
      "likes": 15,
      "published_at": "2019-09-01T08:04:19Z",
      "timestamp_refs": [],
      "text": "Hey! *F is the most non-metallic element in the entire periodic table.* Also, F is the most reactive non-metal, and has the highest electronegativity. Cl is the one with the most electron affinity. Hope this helped.",
      "parent_context": "19:50 sir chlorine ka non metallic character flourine se zyada hota hai due to flourine's small atomic radii to ans NaCl hona chahiye??(correct me if i am wrong )"
    },
    {
      "comment_id": "Ugzrq_z94I9mNfKUhnx4AaABAg.8y0RhAeDJMx8zmiMioWsCa",
      "parent_id": "Ugzrq_z94I9mNfKUhnx4AaABAg",
      "comment_type": "reply",
      "author": "@preethanair1074",
      "likes": 5,
      "published_at": "2019-09-12T15:14:16Z",
      "timestamp_refs": [],
      "text": "Sanscy Star u r wrong",
      "parent_context": "19:50 sir chlorine ka non metallic character flourine se zyada hota hai due to flourine's small atomic radii to ans NaCl hona chahiye??(correct me if i am wrong )"
    },
    {
      "comment_id": "Ugzrq_z94I9mNfKUhnx4AaABAg.8y0RhAeDJMx9DaeUbHc5_0",
      "parent_id": "Ugzrq_z94I9mNfKUhnx4AaABAg",
      "comment_type": "reply",
      "author": "@abhilashadara63",
      "likes": 0,
      "published_at": "2020-09-14T18:40:25Z",
      "timestamp_refs": [],
      "text": "U are correct bro",
      "parent_context": "19:50 sir chlorine ka non metallic character flourine se zyada hota hai due to flourine's small atomic radii to ans NaCl hona chahiye??(correct me if i am wrong )"
    },
    {
      "comment_id": "Ugzrq_z94I9mNfKUhnx4AaABAg.8y0RhAeDJMx9fapHMZ0_lj",
      "parent_id": "Ugzrq_z94I9mNfKUhnx4AaABAg",
      "comment_type": "reply",
      "author": "@AdarshSingh-kg4ft",
      "likes": 0,
      "published_at": "2022-09-05T15:25:09Z",
      "timestamp_refs": [],
      "text": "U are confusing between electronegativity and electron gain enthalpy",
      "parent_context": "19:50 sir chlorine ka non metallic character flourine se zyada hota hai due to flourine's small atomic radii to ans NaCl hona chahiye??(correct me if i am wrong )"
    },
    {
      "comment_id": "UgxPJ_kTsDx00Jka8jl4AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@Physio247",
      "likes": 66,
      "published_at": "2020-12-28T07:57:00Z",
      "timestamp_refs": [],
      "text": "Whoelse watching this vdo in December 2020✌️",
      "parent_context": ""
    },
    {
      "comment_id": "UgxcHQ3vw9u0en_Ypc54AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@finwizards",
      "likes": 17,
      "published_at": "2021-07-13T05:43:31Z",
      "timestamp_refs": [
        "29:40"
      ],
      "text": "29:40 It should not be MgCl it should be MgCl2 instead",
      "parent_context": ""
    },
    {
      "comment_id": "UgzT52DDwwYenWhgu8h4AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@sanjaybhadra32",
      "likes": 12,
      "published_at": "2020-08-18T01:08:15Z",
      "timestamp_refs": [
        "3:30"
      ],
      "text": "3:30 Class 7 se ye doubt hai...",
      "parent_context": ""
    },
    {
      "comment_id": "UgyU8EsIEBHYmAkrZKl4AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@lofifeelingsofficial",
      "likes": 10,
      "published_at": "2020-07-05T13:04:47Z",
      "timestamp_refs": [
        "9:38"
      ],
      "text": "9:38 sir there is a small correction that electrovalence can be positive as well as negative for example : Na has +1 and Cl has -1 electrovalence",
      "parent_context": ""
    },
    {
      "comment_id": "UgzG4LAgcv7rAEFOHkV4AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@myliferocks6098",
      "likes": 1028,
      "published_at": "2019-07-13T07:19:13Z",
      "timestamp_refs": [],
      "text": "How many of you are bored with vedantu ads? 😒😒😒😒😒 1K likes hone wale hai complete kardo",
      "parent_context": ""
    },
    {
      "comment_id": "UgzG4LAgcv7rAEFOHkV4AaABAg.8xJnVzPALLA9-a5A6hYUZD",
      "parent_id": "UgzG4LAgcv7rAEFOHkV4AaABAg",
      "comment_type": "reply",
      "author": "@SahilYadav-ck4qe",
      "likes": 0,
      "published_at": "2019-10-02T14:03:31Z",
      "timestamp_refs": [],
      "text": "@myliferocks6098 yes i know right?",
      "parent_context": "How many of you are bored with vedantu ads? 😒😒😒😒😒 1K likes hone wale hai complete kardo"
    },
    {
      "comment_id": "UgzG4LAgcv7rAEFOHkV4AaABAg.8xJnVzPALLA90M5QPJi5oG",
      "parent_id": "UgzG4LAgcv7rAEFOHkV4AaABAg",
      "comment_type": "reply",
      "author": "@rahuljondhale2509",
      "likes": 3,
      "published_at": "2019-10-21T14:48:32Z",
      "timestamp_refs": [],
      "text": "Kasam se itna gussa ataa h When she says - why r u wasting ur time online",
      "parent_context": "How many of you are bored with vedantu ads? 😒😒😒😒😒 1K likes hone wale hai complete kardo"
    },
    {
      "comment_id": "UgzG4LAgcv7rAEFOHkV4AaABAg.8xJnVzPALLA9Ibbtwdv3s2",
      "parent_id": "UgzG4LAgcv7rAEFOHkV4AaABAg",
      "comment_type": "reply",
      "author": "@ashishbaghel6706",
      "likes": 0,
      "published_at": "2021-01-17T10:14:00Z",
      "timestamp_refs": [],
      "text": "@NK-bw4ht name of that teacher..?",
      "parent_context": "How many of you are bored with vedantu ads? 😒😒😒😒😒 1K likes hone wale hai complete kardo"
    },
    {
      "comment_id": "UgxNw3NrNrYXXiF-boZ4AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@ishaanjain4211",
      "likes": 15,
      "published_at": "2020-08-09T16:35:25Z",
      "timestamp_refs": [
        "15:51"
      ],
      "text": "15:51 Alakh Pandey.exe has stopped working",
      "parent_context": ""
    },
    {
      "comment_id": "UgwlRbd7rr6MWuIq9Xp4AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@Sahar-i3z",
      "likes": 8,
      "published_at": "2025-02-11T10:56:26Z",
      "timestamp_refs": [],
      "text": "I am studying from this video in 2025 Is it still relevant ?",
      "parent_context": ""
    },
    {
      "comment_id": "Ugx_dDstHV-jXLVexiF4AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@SAVITAPAUL-mr8pp",
      "likes": 2,
      "published_at": "2024-09-18T13:36:35Z",
      "timestamp_refs": [],
      "text": "Very good explanation sir thank you for the hardwork you hv done..however I have a doubt in the last topic in the property of isomerism and isomorphism..I had to repeat the lecture 5 times still feeling little confusion in that..",
      "parent_context": ""
    },
    {
      "comment_id": "Ugy_X--ND3MjAIHii2x4AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@kartikhooda7838",
      "likes": 10,
      "published_at": "2019-08-31T17:33:35Z",
      "timestamp_refs": [],
      "text": "Sir bring a vid for students of class 11 of all chapter from NCERT",
      "parent_context": ""
    },
    {
      "comment_id": "UgwoYHPoiKnyRLbn9PB4AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@harsh0204",
      "likes": 588,
      "published_at": "2024-08-22T03:29:16Z",
      "timestamp_refs": [],
      "text": "August September se koi hai kya😢😢😢",
      "parent_context": ""
    },
    {
      "comment_id": "UgzfoGLChQBhgUu5Ev14AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@ky.011",
      "likes": 8,
      "published_at": "2022-10-27T14:59:22Z",
      "timestamp_refs": [
        "3:42"
      ],
      "text": "3:42 ha sir socha tha and pucha bhi tha but school teacher ne bola ki higher studies me pata chalega 🙂, aisa nhi h ki hum sikhna nhi cha rhe h, dikkat yeh h ki koi coperate nhi kr rha. and I'm sure while writing this I'm mentioning millions of Students who are eager to study but getting pushed back due to Education System 🙂",
      "parent_context": ""
    },
    {
      "comment_id": "UgzfoGLChQBhgUu5Ev14AaABAg.9hgfeyBb8mwA7lNCnQCNwO",
      "parent_id": "UgzfoGLChQBhgUu5Ev14AaABAg",
      "comment_type": "reply",
      "author": "@divyabharti8642",
      "likes": 1,
      "published_at": "2024-08-30T12:53:13Z",
      "timestamp_refs": [],
      "text": "Correct 💯😊🤗",
      "parent_context": "3:42 ha sir socha tha and pucha bhi tha but school teacher ne bola ki higher studies me pata chalega 🙂, aisa nhi h ki hum sikhna nhi cha rhe h, dikkat yeh h ki koi coperate nhi kr rha. and I'm sure while writing this I'm mentioning millions of Students who are eager to study but getting pushed back due to Education System 🙂"
    },
    {
      "comment_id": "UgyuK4Yy1x-2n7oTR3V4AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@gleam_kristoff",
      "likes": 6,
      "published_at": "2024-05-19T05:32:34Z",
      "timestamp_refs": [
        "28:52"
      ],
      "text": "28:52 won't it be MgCl² instead MgCl?",
      "parent_context": ""
    },
    {
      "comment_id": "UgwpXClaKjWut6k-yU94AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@BCMBOYSHOSTELUNIT-1",
      "likes": 2,
      "published_at": "2026-02-11T04:09:10Z",
      "timestamp_refs": [
        "0:04",
        "0:54",
        "0:55",
        "5:48",
        "5:49",
        "8:58",
        "9:00",
        "12:56",
        "12:57",
        "18:16",
        "18:17",
        "20:45",
        "20:46",
        "27:39",
        "21:01",
        "22:08",
        "22:09",
        "22:32",
        "22:33",
        "25:46",
        "25:47",
        "27:39",
        "27:40",
        "30:38",
        "30:39",
        "32:43",
        "32:44",
        "33:10",
        "33:11",
        "34:20"
      ],
      "text": "Introduction to Ionic Bond (Electrovalent Bond) (0:04 - 0:54) Formation of Ionic Bond (0:55 - 5:48) Lewis Dot Structure (5:49 - 8:58) Electrovalence/Electrovalency (9:00 - 12:56) Favorable Conditions for Ionic Bond Formation (Energy Terms Involved) (12:57 - 18:16) Stronger Ionic Bond (More Ionic Character) (18:17 - 20:45) Properties of Ionic Compounds (20:46 - 27:39) Physical State (21:01 - 22:08) Melting Point & Boiling Point (22:09 - 22:32) Conductivity (22:33 - 25:46) Isomerism (25:47 - 27:39) Isomorphism (27:40 - 30:38) Type of Reaction (30:39 - 32:43) Solubility (32:44 - 33:10) Upcoming Topics (Lattice Energy, Fajan's Rule) (33:11 - 34:20)",
      "parent_context": ""
    },
    {
      "comment_id": "UgxyUw-xeuwlCn6Cymt4AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@ShashiDevi2599rp",
      "likes": 12,
      "published_at": "2024-11-01T10:25:47Z",
      "timestamp_refs": [],
      "text": "Anyone in November 2024??❤",
      "parent_context": ""
    },
    {
      "comment_id": "UgyvDM1ifHX--ErZV4B4AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@Mayank-rajput183",
      "likes": 262,
      "published_at": "2025-09-05T08:23:13Z",
      "timestamp_refs": [],
      "text": "2025-2026 Wale attendance lagaiye 😅😁",
      "parent_context": ""
    },
    {
      "comment_id": "UgyvDM1ifHX--ErZV4B4AaABAg.AMgBDwjm_RfAT6wfagXJsO",
      "parent_id": "UgyvDM1ifHX--ErZV4B4AaABAg",
      "comment_type": "reply",
      "author": "@hnxandro44",
      "likes": 0,
      "published_at": "2026-02-12T06:14:25Z",
      "timestamp_refs": [],
      "text": "Bro is this lecture enough for neet? And are all topics of ncert covered?",
      "parent_context": "2025-2026 Wale attendance lagaiye 😅😁"
    },
    {
      "comment_id": "Ugw9KxjbUu9jYmaHv294AaABAg.A9KYN_5jBcpA9KyRQ0_eVo",
      "parent_id": "Ugw9KxjbUu9jYmaHv294AaABAg",
      "comment_type": "reply",
      "author": "@pe_ter-hg5zb",
      "likes": 0,
      "published_at": "2024-10-08T14:31:19Z",
      "timestamp_refs": [],
      "text": "11th or dropper?",
      "parent_context": "Oct 2024 main koy yeh video dhek rha h kya.....😅😅"
    },
    {
      "comment_id": "Ugz16O3UtbWLCd2Jf-d4AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@tarunchelumalla007",
      "likes": 5,
      "published_at": "2018-10-19T13:34:07Z",
      "timestamp_refs": [
        "19:43"
      ],
      "text": "19:43 and 20: 06 statement doesnt proper can u explain that",
      "parent_context": ""
    },
    {
      "comment_id": "Ugz16O3UtbWLCd2Jf-d4AaABAg.8m_yAF3WgUY95NGBJfNV0h",
      "parent_id": "Ugz16O3UtbWLCd2Jf-d4AaABAg",
      "comment_type": "reply",
      "author": "@Ankita_Negi233",
      "likes": 1,
      "published_at": "2020-02-23T08:18:48Z",
      "timestamp_refs": [],
      "text": "Same doubt",
      "parent_context": "19:43 and 20: 06 statement doesnt proper can u explain that"
    },
    {
      "comment_id": "UgyTFK0zlIhukkRuv6Z4AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@AparnaRs-oo9on",
      "likes": 6,
      "published_at": "2024-10-05T10:27:18Z",
      "timestamp_refs": [],
      "text": "Any JEE aspirint?",
      "parent_context": ""
    },
    {
      "comment_id": "Ugy9L0iPycTA8Pc64Vh4AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@aspirant0603-u9p",
      "likes": 6,
      "published_at": "2019-09-27T01:28:45Z",
      "timestamp_refs": [
        "27:18"
      ],
      "text": "At 27:18😂😂😄",
      "parent_context": ""
    },
    {
      "comment_id": "UgxwAhzwz9OOKhWxpkt4AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@AbdulnawazYaragatti",
      "likes": 5,
      "published_at": "2025-02-03T11:30:30Z",
      "timestamp_refs": [],
      "text": "Anyone in feb 2025?",
      "parent_context": ""
    },
    {
      "comment_id": "UgxG3RSUCGi_fK_7moR4AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@krishnkumar_07",
      "likes": 7,
      "published_at": "2021-11-15T02:18:39Z",
      "timestamp_refs": [],
      "text": "Any neet 2023 aspirant here ?",
      "parent_context": ""
    },
    {
      "comment_id": "UgxKPlb1jjNcSyhL4n54AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@sarojahonavar5508",
      "likes": 6,
      "published_at": "2020-04-11T13:04:59Z",
      "timestamp_refs": [],
      "text": "Sir factors affecting solubility is missing in your lecture 1. Dielectric constant.!!!!? Pls sir help!!!!",
      "parent_context": ""
    },
    {
      "comment_id": "UgwMl8PnD4Hb5i315Sd4AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@Ashishyadav.931",
      "likes": 336,
      "published_at": "2023-09-06T03:08:42Z",
      "timestamp_refs": [],
      "text": "Session 2023-24 attendance button ✅✅",
      "parent_context": ""
    },
    {
      "comment_id": "UgwG98CbxkrjDahFrkt4AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@ujjwalbhargav5786",
      "likes": 111,
      "published_at": "2019-09-06T15:49:14Z",
      "timestamp_refs": [],
      "text": "Me studying with complete concentration Vedantu-why you wasting your time online Me - am I a joke to u 🤒",
      "parent_context": ""
    },
    {
      "comment_id": "UgwG98CbxkrjDahFrkt4AaABAg.8zYKacoPATV9-2PZAWPSyP",
      "parent_id": "UgwG98CbxkrjDahFrkt4AaABAg",
      "comment_type": "reply",
      "author": "@ujjwalbhargav5786",
      "likes": 0,
      "published_at": "2019-09-19T02:48:17Z",
      "timestamp_refs": [],
      "text": "@dreamdoctor8218 kiska?",
      "parent_context": "Me studying with complete concentration Vedantu-why you wasting your time online Me - am I a joke to u 🤒"
    },
    {
      "comment_id": "UgxCnOnq7uJsyz5g9EF4AaABAg.A9L0LDzXLGOA9McTWaDbz9",
      "parent_id": "UgxCnOnq7uJsyz5g9EF4AaABAg",
      "comment_type": "reply",
      "author": "@itzdemoff",
      "likes": 0,
      "published_at": "2024-10-09T05:57:50Z",
      "timestamp_refs": [],
      "text": "Hlo bro kitna syllabus hua?",
      "parent_context": "Best lectures 👍❤"
    },
    {
      "comment_id": "UgxcQMbcFD1LqBPpKm54AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@nikhilgalhotra2001",
      "likes": 6,
      "published_at": "2019-07-28T09:10:45Z",
      "timestamp_refs": [
        "12:08"
      ],
      "text": "Sir, at 12:08..d block elements consist 3 to 12 but why you have written 2 to 12? Do group 2 elements also show variable valency?",
      "parent_context": ""
    },
    {
      "comment_id": "UgzLBrdblY53_DSe52F4AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@Raktimmm",
      "likes": 10,
      "published_at": "2024-10-07T16:15:51Z",
      "timestamp_refs": [
        "3:26"
      ],
      "text": "3:26 who has seen Lucifer at board ☠️",
      "parent_context": ""
    },
    {
      "comment_id": "Ugwe2PYzHtJcFJq6fvl4AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@SagarSingh-pr5yu",
      "likes": 9,
      "published_at": "2019-09-15T15:07:59Z",
      "timestamp_refs": [],
      "text": "Sir hydrogen ionic compound kyu nhi bnata .....plZ answer sirrrrr",
      "parent_context": ""
    },
    {
      "comment_id": "Ugwe2PYzHtJcFJq6fvl4AaABAg.8zuR1IYiyzz9-3ddqrp1jM",
      "parent_id": "Ugwe2PYzHtJcFJq6fvl4AaABAg",
      "comment_type": "reply",
      "author": "@jaishriram6602",
      "likes": 0,
      "published_at": "2019-09-19T14:19:23Z",
      "timestamp_refs": [],
      "text": "Ionic compounds are formed b/w those elements which had a good amount of electronegativity difference",
      "parent_context": "Sir hydrogen ionic compound kyu nhi bnata .....plZ answer sirrrrr"
    },
    {
      "comment_id": "Ugy1YnbprQtytomooQx4AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@hardtoonz8943",
      "likes": 8,
      "published_at": "2023-10-26T11:15:19Z",
      "timestamp_refs": [],
      "text": "How many students love Pandey sir??????😐😐😐😐😐😐",
      "parent_context": ""
    },
    {
      "comment_id": "UgzVeamsPV59rRjdJHx4AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@AdityaChauhan-yd8ji",
      "likes": 7,
      "published_at": "2019-06-06T11:49:53Z",
      "timestamp_refs": [],
      "text": "Anyone from JNV? ✌🙌.",
      "parent_context": ""
    },
    {
      "comment_id": "UgyOFkz8FasslHCjtsV4AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@nakulrawat2116",
      "likes": 152,
      "published_at": "2024-06-08T06:32:17Z",
      "timestamp_refs": [],
      "text": "2024 - 2025 Wale attendence lgao 😁😁",
      "parent_context": ""
    },
    {
      "comment_id": "Ugx_YLv6OYe_EGc-zTd4AaABAg.8r_BMOs0dKL8yhCWu2mEpR",
      "parent_id": "Ugx_YLv6OYe_EGc-zTd4AaABAg",
      "comment_type": "reply",
      "author": "@faizanakhtar2820",
      "likes": 0,
      "published_at": "2019-08-16T15:19:42Z",
      "timestamp_refs": [],
      "text": "Yaa i also hve a doubt here",
      "parent_context": "Sir it should be mgcl2"
    },
    {
      "comment_id": "UgwRtJYAHEwBHmedqIF4AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@poison2050",
      "likes": 9,
      "published_at": "2021-09-26T07:36:26Z",
      "timestamp_refs": [],
      "text": "Who else came here after yakeen2. 0 inorganic ?",
      "parent_context": ""
    },
    {
      "comment_id": "UgwRtJYAHEwBHmedqIF4AaABAg.9SkDBMnbQkH9SsSyflEKUR",
      "parent_id": "UgwRtJYAHEwBHmedqIF4AaABAg",
      "comment_type": "reply",
      "author": "@poojayadav7445",
      "likes": 1,
      "published_at": "2021-09-29T12:28:18Z",
      "timestamp_refs": [],
      "text": "Me... I tried much to understand Mohit sir's lectures but can't so i came here. I think inorganic k liye mujhe Alakh sir k lectures follow krne honge aur NCERT to hai hi.",
      "parent_context": "Who else came here after yakeen2. 0 inorganic ?"
    },
    {
      "comment_id": "Ugy5NAbE-b_LERwCUyF4AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@rruchissingh",
      "likes": 244,
      "published_at": "2019-10-06T05:31:15Z",
      "timestamp_refs": [],
      "text": "11th student in 2019???????🙋",
      "parent_context": ""
    },
    {
      "comment_id": "Ugzbj0TtptZFD_CgsP14AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@sarthakjain6979",
      "likes": 8,
      "published_at": "2019-08-25T15:17:53Z",
      "timestamp_refs": [
        "29:36"
      ],
      "text": "29:36 i think sir wrote the formula for MgCl2 wrong?",
      "parent_context": ""
    },
    {
      "comment_id": "Ugz64om_iO4OYp_qvXJ4AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@jassidaksingh656",
      "likes": 5,
      "published_at": "2019-09-23T21:06:10Z",
      "timestamp_refs": [],
      "text": "Is lewis dot structure and electron dot structure same?",
      "parent_context": ""
    },
    {
      "comment_id": "UgwaHcKQ5FToWO3Xp5F4AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@haiderabbas2916",
      "likes": 7,
      "published_at": "2019-12-05T09:15:21Z",
      "timestamp_refs": [
        "29:25"
      ],
      "text": "29:25 mgcl2 hoga sir",
      "parent_context": ""
    },
    {
      "comment_id": "UgxV5qiXHGsBBq6RJD94AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@TanushBc-g3e",
      "likes": 14,
      "published_at": "2025-01-13T05:43:27Z",
      "timestamp_refs": [],
      "text": "January 2025?",
      "parent_context": ""
    },
    {
      "comment_id": "UgzAm5e219ZK_23zsVZ4AaABAg.ASZsOhw7asUASqlTECj6w1",
      "parent_id": "UgzAm5e219ZK_23zsVZ4AaABAg",
      "comment_type": "reply",
      "author": "@sanskrita-b4b",
      "likes": 0,
      "published_at": "2026-02-05T14:09:23Z",
      "timestamp_refs": [],
      "text": "​@JoyRazbongshiwaaahh🙌... waha ka hal kaisa ha?",
      "parent_context": "2026 mei kon kon dekh raha haiii"
    },
    {
      "comment_id": "UgzAm5e219ZK_23zsVZ4AaABAg.ASZsOhw7asUASrLwIpnjyj",
      "parent_id": "UgzAm5e219ZK_23zsVZ4AaABAg",
      "comment_type": "reply",
      "author": "@JoyRazbongshi",
      "likes": 0,
      "published_at": "2026-02-05T19:36:48Z",
      "timestamp_refs": [],
      "text": "​@GayatriPujari-j7f baraiya.tum kya 11-th mein ho?",
      "parent_context": "2026 mei kon kon dekh raha haiii"
    },
    {
      "comment_id": "Ugx0JwwH1sSHlCrzqbF4AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@daizyvrawal4722",
      "likes": 20,
      "published_at": "2024-11-05T16:24:55Z",
      "timestamp_refs": [],
      "text": "November se koi h? 2024 25",
      "parent_context": ""
    },
    {
      "comment_id": "Ugw9a2EZA0xeq3Jj5gx4AaABAg.ADfEFdXCuOLAFRc_07mR37",
      "parent_id": "Ugw9a2EZA0xeq3Jj5gx4AaABAg",
      "comment_type": "reply",
      "author": "@jasjeetsingh2008",
      "likes": 0,
      "published_at": "2025-03-09T07:43:17Z",
      "timestamp_refs": [],
      "text": "@ShivaniVerma0507 so wht?",
      "parent_context": "Anyone 2025 💙"
    },
    {
      "comment_id": "UgyuX5CmWsBSFa6eUNd4AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@angeljadiya732",
      "likes": 15,
      "published_at": "2026-01-04T17:47:24Z",
      "timestamp_refs": [],
      "text": "Any one from 2026?? 🖐🏻",
      "parent_context": ""
    },
    {
      "comment_id": "Ugxp1S6jZ9vWp2IWoxN4AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@aadeshrajput9482",
      "likes": 7,
      "published_at": "2019-08-18T11:18:02Z",
      "timestamp_refs": [
        "29:25"
      ],
      "text": "29:25 mgcl2 hoga na",
      "parent_context": ""
    },
    {
      "comment_id": "UgxlQUniHCMPodN-9bZ4AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@SumanthSpeaks",
      "likes": 3,
      "published_at": "2023-08-01T11:04:07Z",
      "timestamp_refs": [
        "4:55"
      ],
      "text": "4:55 The Doubt is marvelous..🤔",
      "parent_context": ""
    },
    {
      "comment_id": "UgygNIQJfyQT9V3C2JV4AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@itslivingmeme",
      "likes": 3,
      "published_at": "2023-06-18T14:37:12Z",
      "timestamp_refs": [
        "28:50"
      ],
      "text": "28:50 mgcl should have been MgCl2 and nacl and mgcl2 cant be isomorphes",
      "parent_context": ""
    },
    {
      "comment_id": "UgwLXpjBvpDKhC3FqT94AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@sandhaSurwase-z4s",
      "likes": 3,
      "published_at": "2023-09-18T16:47:20Z",
      "timestamp_refs": [],
      "text": "Sir exception pe video banav",
      "parent_context": ""
    },
    {
      "comment_id": "UgwFotwhQ8SoMZI3hbl4AaABAg.9tcsKfVOWI09uJxIwJkm15",
      "parent_id": "UgwFotwhQ8SoMZI3hbl4AaABAg",
      "comment_type": "reply",
      "author": "@WhySéñOritaa",
      "likes": 1,
      "published_at": "2023-09-06T12:39:51Z",
      "timestamp_refs": [],
      "text": "Neet aspriant ??",
      "parent_context": "Sir You Are Awesome 🎉🎉"
    },
    {
      "comment_id": "UgzuIyt18m_fyGBiDwp4AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@invisibleduniyaa",
      "likes": 4,
      "published_at": "2025-07-07T07:19:28Z",
      "timestamp_refs": [],
      "text": "Sir apne Nacl and Mgcl dono ko Isomorphism bataiya h is lecture me lakin ye dono aapas me Isomorphism nhi hote hai ye doubt clear kr dijiye plz 😢",
      "parent_context": ""
    },
    {
      "comment_id": "UgwdSrKnTLb77QYUOAF4AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@PranjitBaruah-dq9rw",
      "likes": 0,
      "published_at": "2024-09-19T16:49:32Z",
      "timestamp_refs": [],
      "text": "Doubt clear✅",
      "parent_context": ""
    },
    {
      "comment_id": "UgzgqhSmBg-0xYOb1fF4AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@avyaagupta55",
      "likes": 0,
      "published_at": "2024-09-04T21:15:31Z",
      "timestamp_refs": [],
      "text": "Sir please make videos for Back Bonding and Bridge Bonding also",
      "parent_context": ""
    },
    {
      "comment_id": "Ugyd5YsVEoiodgOkkDp4AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@anilkumarsingh2502",
      "likes": 1,
      "published_at": "2023-07-22T17:49:01Z",
      "timestamp_refs": [],
      "text": "Sir lattice energy is the amount of energy released during bond formation with metal and non metal but as u can say that ionic bond haven't any bond it has attraction called as electrostatic force of attraction like karo jisse answer pata ho and sir plz reply",
      "parent_context": ""
    },
    {
      "comment_id": "UgyxidZrx0WJG3wSIKJ4AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@parassingh2920",
      "likes": 1,
      "published_at": "2024-07-24T12:43:24Z",
      "timestamp_refs": [
        "19:51"
      ],
      "text": "Check 19:51 His smile makes me feel good 😊",
      "parent_context": ""
    },
    {
      "comment_id": "UgygitGIapu9KBndRG54AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@Shiv10108",
      "likes": 4,
      "published_at": "2025-03-19T11:38:33Z",
      "timestamp_refs": [
        "12:21"
      ],
      "text": "12:21 Group 3 to Group 12 ki baat ho rahi hai.",
      "parent_context": ""
    },
    {
      "comment_id": "UgyoICtz8E4tAn2K-2Z4AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@Abhi0440",
      "likes": 4,
      "published_at": "2024-08-22T05:02:46Z",
      "timestamp_refs": [],
      "text": "why nacl and kcl aren't isomorphous ? they have similar structure and formula",
      "parent_context": ""
    },
    {
      "comment_id": "UgyoICtz8E4tAn2K-2Z4AaABAg.A7Qw0AU7-5jA7e6QMiDQbr",
      "parent_id": "UgyoICtz8E4tAn2K-2Z4AaABAg",
      "comment_type": "reply",
      "author": "@I-Goyal-034",
      "likes": 2,
      "published_at": "2024-08-27T17:11:50Z",
      "timestamp_refs": [
        "30:06"
      ],
      "text": "30:06",
      "parent_context": "why nacl and kcl aren't isomorphous ? they have similar structure and formula"
    },
    {
      "comment_id": "Ugw4hhT8eDDJqBn5G394AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@RohitBasak-q6c",
      "likes": 1,
      "published_at": "2025-09-05T16:28:24Z",
      "timestamp_refs": [],
      "text": "Oke sir. Fains ttudk a a hhtso ssal asirvay ionic bond of nibble thke garab gag.",
      "parent_context": ""
    },
    {
      "comment_id": "UgxIyQtJNpUUD1eY7xV4AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@justtt_us",
      "likes": 3,
      "published_at": "2025-12-22T16:59:04Z",
      "timestamp_refs": [],
      "text": "Kya koi hai jo sir ke lecture se notes bnata hai? Anyone in 2025..?",
      "parent_context": ""
    },
    {
      "comment_id": "UgwFatEfArFo6nCkf4N4AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@thesouravvv",
      "likes": 0,
      "published_at": "2024-01-23T10:01:46Z",
      "timestamp_refs": [
        "4:05"
      ],
      "text": "4:05 but sir an electron from Na can also be removed in a aqueous solution or different states so why Gaseous state only",
      "parent_context": ""
    },
    {
      "comment_id": "UgwuV9TTNRZZlI6Mvk94AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@aasthasingh3639",
      "likes": 0,
      "published_at": "2023-03-31T15:04:43Z",
      "timestamp_refs": [],
      "text": "Sir potential energy solid state main maximum hota to fir wo NaCl bankey vo solid kyu bana chate hain",
      "parent_context": ""
    },
    {
      "comment_id": "Ugyl7oGhjZDH5o0tUVJ4AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@djnag47",
      "likes": 1,
      "published_at": "2023-08-28T16:36:10Z",
      "timestamp_refs": [],
      "text": "In some places it is said that the electrovalency of Cl~ in NaCl is -1.... Is it correct??",
      "parent_context": ""
    }
  ]
}

Now return one valid JSON object matching the schema intent.

--- END SIFT TASK ---
