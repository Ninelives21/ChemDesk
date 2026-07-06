# ChemDesk Sift Agent Manual Bridge Input

Generated at: 2026-06-27T17:34:03.920765+00:00

Lecture ID: chemical-bonding-lecture-16
Lecture title: Hydrogen Bonding

Purpose:
This file lets ChatGPT Plus perform the Sift scrub step without using the OpenAI API.

Instructions for ChatGPT:
- Perform the Sift task below exactly.
- Return one valid JSON object only.
- Do not return markdown.
- Do not decide Chemistry truth.
- Keep correction/error claims unverified and requiring CEE review.

Selection note:
Fetched 1530 comments/replies; sent top 900 to the model using a conservative pre-selection by timestamp/question/chemistry hints/likes to stay within context.

Raw comment selection counts:
- Raw total flattened comments/replies: 1530
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
  "Lecture number": "16",
  "Lecture ID": "chemical-bonding-lecture-16",
  "Lecture title": "Hydrogen Bonding",
  "YouTube URL": "https://youtu.be/k8tYXDKb2yE",
  "Video ID": "k8tYXDKb2yE",
  "Output name": "comments-16-hydrogen-bonding",
  "Lecture folder": "content/01-physical/03-chemical-bonding-and-molecular-structure/lectures/lecture-16-hydrogen-bonding",
  "Raw comments path": "content/01-physical/03-chemical-bonding-and-molecular-structure/lectures/lecture-16-hydrogen-bonding/comments/comments-16-hydrogen-bonding.raw.json",
  "Scrubbed comments path": "content/01-physical/03-chemical-bonding-and-molecular-structure/lectures/lecture-16-hydrogen-bonding/comments/comments-16-hydrogen-bonding.scrubbed.json",
  "Sift report path": "content/01-physical/03-chemical-bonding-and-molecular-structure/lectures/lecture-16-hydrogen-bonding/comments/comments-16-hydrogen-bonding.final.md",
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
  "selection_note": "Fetched 1530 comments/replies; sent top 900 to the model using a conservative pre-selection by timestamp/question/chemistry hints/likes to stay within context.",
  "raw_total_flat_comments_and_replies": 1530,
  "sent_to_model_count": 900,
  "comments": [
    {
      "comment_id": "UgyjlIQTYUfeoAvUISp4AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@PhysicsWallah",
      "likes": 1050,
      "published_at": "2018-09-07T14:50:41Z",
      "timestamp_refs": [],
      "text": "Live Classes, Video Lectures, Test Series, Lecturewise notes, topicwise DPP, dynamic Exercise and much more on Physicswallah App. Download the App from Google Playstore ( https://bit.ly/2SHIPW6 ) Physicswallah Instagram Handle : https://www.instagram.com/physicswallah/ Physicswallah Facebook Page: https://www.facebook.com/physicswallah Physicswallah Twitter Account : https://twitter.com/PhysicswallahAP?s=20 Physicswallah App on Google Play Store : https://bit.ly/2SHIPW6 Physicswallah Website: http://physicswallahalakhpandey.com/ LAKSHYA Batch(2020-21) Join the Batch on Physicswallah App https://bit.ly/2SHIPW6 Registration Open!!!! What will you get in the Lakshya Batch? 1) Complete Class 12th + JEE Mains/ NEET syllabus - Targeting 95% in Board Exams and Selection in JEE MAINS / NEET with a Strong Score under Direct Guidance of Alakh Pandey. 2)Live Classes and recorded Video Lectures (New, different from those on YouTube) 3)PDF Notes of each class. 4)DPP: Daily Practice Problems with each class having 10 questions based on the class of JEE Mains/NEET level. 5)Syllabus Completion by end of January, 2021 with topicwise discussion of Last 10 Years Problems in Boards, JEE Mains/NEET within Lecture. 6)The Complete Course (Video Lectures, PDF Notes, any other Study Material) will be accessible to all the students untill JEE Mains & NEET 2021 (nearly May 2021) 7)In case you missed a live class, you can see its recording. 8)You can view the videos any number of times. 9)Each chapter will be discussed in detail with all concepts and numericals 10)Chapterwise Approach towards JEE Mains/ NEET & Board Exams. ****Test Series for XI & XII**** We provide you the best test series for Class XI,XII, JEE, NEET chapterwise, which will be scheduled for whole year. The test series follows ver… [truncated]",
      "parent_context": ""
    },
    {
      "comment_id": "UgyjlIQTYUfeoAvUISp4AaABAg.8ktxYDlPuck8l0LixlQJEa",
      "parent_id": "UgyjlIQTYUfeoAvUISp4AaABAg",
      "comment_type": "reply",
      "author": "@sahilbajaj1715",
      "likes": 6,
      "published_at": "2018-09-10T11:45:25Z",
      "timestamp_refs": [],
      "text": "Thank U Sir!!",
      "parent_context": "Live Classes, Video Lectures, Test Series, Lecturewise notes, topicwise DPP, dynamic Exercise and much more on Physicswallah App. Download the App from Google Playstore ( https://bit.ly/2SHIPW6 ) Physicswallah Instagram Handle : https://www.instagram.com/physicswallah/ Physicswallah Facebook Page: https://www.facebook.com/physicswallah Physicswallah Twitter Account : https://twitter.com/PhysicswallahAP?s=20 Physicswallah App on Google Play Store : https://bit.ly/2SHIPW6 Physicswallah Website: ht"
    },
    {
      "comment_id": "UgyjlIQTYUfeoAvUISp4AaABAg.8ktxYDlPuck8lczPZ2h2sW",
      "parent_id": "UgyjlIQTYUfeoAvUISp4AaABAg",
      "comment_type": "reply",
      "author": "@tuhindey4833",
      "likes": 5,
      "published_at": "2018-09-25T21:11:16Z",
      "timestamp_refs": [],
      "text": "Sir organic chemistry start karo ...pls",
      "parent_context": "Live Classes, Video Lectures, Test Series, Lecturewise notes, topicwise DPP, dynamic Exercise and much more on Physicswallah App. Download the App from Google Playstore ( https://bit.ly/2SHIPW6 ) Physicswallah Instagram Handle : https://www.instagram.com/physicswallah/ Physicswallah Facebook Page: https://www.facebook.com/physicswallah Physicswallah Twitter Account : https://twitter.com/PhysicswallahAP?s=20 Physicswallah App on Google Play Store : https://bit.ly/2SHIPW6 Physicswallah Website: ht"
    },
    {
      "comment_id": "UgyjlIQTYUfeoAvUISp4AaABAg.8ktxYDlPuck8lhm6DhWkQn",
      "parent_id": "UgyjlIQTYUfeoAvUISp4AaABAg",
      "comment_type": "reply",
      "author": "@priyanshubehera2125",
      "likes": 4,
      "published_at": "2018-09-27T17:51:14Z",
      "timestamp_refs": [],
      "text": "Sir sp and sp2 and sp3 hybridisation Ka Naya plz plz plz plz",
      "parent_context": "Live Classes, Video Lectures, Test Series, Lecturewise notes, topicwise DPP, dynamic Exercise and much more on Physicswallah App. Download the App from Google Playstore ( https://bit.ly/2SHIPW6 ) Physicswallah Instagram Handle : https://www.instagram.com/physicswallah/ Physicswallah Facebook Page: https://www.facebook.com/physicswallah Physicswallah Twitter Account : https://twitter.com/PhysicswallahAP?s=20 Physicswallah App on Google Play Store : https://bit.ly/2SHIPW6 Physicswallah Website: ht"
    },
    {
      "comment_id": "UgyjlIQTYUfeoAvUISp4AaABAg.8ktxYDlPuck8mcXOlxmQV7",
      "parent_id": "UgyjlIQTYUfeoAvUISp4AaABAg",
      "comment_type": "reply",
      "author": "@shashankchaubey3729",
      "likes": 5,
      "published_at": "2018-10-20T13:29:09Z",
      "timestamp_refs": [],
      "text": "Sir 11 physics part 2 ka lecture nhi h",
      "parent_context": "Live Classes, Video Lectures, Test Series, Lecturewise notes, topicwise DPP, dynamic Exercise and much more on Physicswallah App. Download the App from Google Playstore ( https://bit.ly/2SHIPW6 ) Physicswallah Instagram Handle : https://www.instagram.com/physicswallah/ Physicswallah Facebook Page: https://www.facebook.com/physicswallah Physicswallah Twitter Account : https://twitter.com/PhysicswallahAP?s=20 Physicswallah App on Google Play Store : https://bit.ly/2SHIPW6 Physicswallah Website: ht"
    },
    {
      "comment_id": "UgyjlIQTYUfeoAvUISp4AaABAg.8ktxYDlPuck8mf37d438Gr",
      "parent_id": "UgyjlIQTYUfeoAvUISp4AaABAg",
      "comment_type": "reply",
      "author": "@abcxyz303",
      "likes": 7,
      "published_at": "2018-10-21T13:02:24Z",
      "timestamp_refs": [],
      "text": "Sir pls class 12 ka organic padhaye class 11 ke sath unke paas ek aur year abhi bhi hai...🤔🤔🤔🤔👍👍👍✌️✌️✌️✌️✌️😀😀😀",
      "parent_context": "Live Classes, Video Lectures, Test Series, Lecturewise notes, topicwise DPP, dynamic Exercise and much more on Physicswallah App. Download the App from Google Playstore ( https://bit.ly/2SHIPW6 ) Physicswallah Instagram Handle : https://www.instagram.com/physicswallah/ Physicswallah Facebook Page: https://www.facebook.com/physicswallah Physicswallah Twitter Account : https://twitter.com/PhysicswallahAP?s=20 Physicswallah App on Google Play Store : https://bit.ly/2SHIPW6 Physicswallah Website: ht"
    },
    {
      "comment_id": "UgyjlIQTYUfeoAvUISp4AaABAg.8ktxYDlPuck8mle_Vb5HFd",
      "parent_id": "UgyjlIQTYUfeoAvUISp4AaABAg",
      "comment_type": "reply",
      "author": "@deendayalmishra4951",
      "likes": 6,
      "published_at": "2018-10-24T02:33:50Z",
      "timestamp_refs": [],
      "text": "Sir chemistry ke numericals kaise lagaye usper thoda videos banaiye",
      "parent_context": "Live Classes, Video Lectures, Test Series, Lecturewise notes, topicwise DPP, dynamic Exercise and much more on Physicswallah App. Download the App from Google Playstore ( https://bit.ly/2SHIPW6 ) Physicswallah Instagram Handle : https://www.instagram.com/physicswallah/ Physicswallah Facebook Page: https://www.facebook.com/physicswallah Physicswallah Twitter Account : https://twitter.com/PhysicswallahAP?s=20 Physicswallah App on Google Play Store : https://bit.ly/2SHIPW6 Physicswallah Website: ht"
    },
    {
      "comment_id": "UgyjlIQTYUfeoAvUISp4AaABAg.8ktxYDlPuck8nEQltX7CxM",
      "parent_id": "UgyjlIQTYUfeoAvUISp4AaABAg",
      "comment_type": "reply",
      "author": "@sauravsharma1704",
      "likes": 5,
      "published_at": "2018-11-04T16:01:40Z",
      "timestamp_refs": [],
      "text": "Sir aek personal question aapne 12 k bad wale entrance Mai kya liya tha and aapko total kitna marks mile the",
      "parent_context": "Live Classes, Video Lectures, Test Series, Lecturewise notes, topicwise DPP, dynamic Exercise and much more on Physicswallah App. Download the App from Google Playstore ( https://bit.ly/2SHIPW6 ) Physicswallah Instagram Handle : https://www.instagram.com/physicswallah/ Physicswallah Facebook Page: https://www.facebook.com/physicswallah Physicswallah Twitter Account : https://twitter.com/PhysicswallahAP?s=20 Physicswallah App on Google Play Store : https://bit.ly/2SHIPW6 Physicswallah Website: ht"
    },
    {
      "comment_id": "UgyjlIQTYUfeoAvUISp4AaABAg.8ktxYDlPuck8nWNu6m-M3a",
      "parent_id": "UgyjlIQTYUfeoAvUISp4AaABAg",
      "comment_type": "reply",
      "author": "@AryanSingh-jy8fp",
      "likes": 3,
      "published_at": "2018-11-11T15:22:54Z",
      "timestamp_refs": [],
      "text": "Physics Wallah - Alakh Pandey bheje",
      "parent_context": "Live Classes, Video Lectures, Test Series, Lecturewise notes, topicwise DPP, dynamic Exercise and much more on Physicswallah App. Download the App from Google Playstore ( https://bit.ly/2SHIPW6 ) Physicswallah Instagram Handle : https://www.instagram.com/physicswallah/ Physicswallah Facebook Page: https://www.facebook.com/physicswallah Physicswallah Twitter Account : https://twitter.com/PhysicswallahAP?s=20 Physicswallah App on Google Play Store : https://bit.ly/2SHIPW6 Physicswallah Website: ht"
    },
    {
      "comment_id": "UgyjlIQTYUfeoAvUISp4AaABAg.8ktxYDlPuck8nbufociZ0i",
      "parent_id": "UgyjlIQTYUfeoAvUISp4AaABAg",
      "comment_type": "reply",
      "author": "@awdheshprajapati2866",
      "likes": 6,
      "published_at": "2018-11-14T04:13:29Z",
      "timestamp_refs": [],
      "text": "Sir ek topic reh gaya hai resonance structures ka jo ncert mei de rakha hai.....plz use bhi explain kar dijiye ...",
      "parent_context": "Live Classes, Video Lectures, Test Series, Lecturewise notes, topicwise DPP, dynamic Exercise and much more on Physicswallah App. Download the App from Google Playstore ( https://bit.ly/2SHIPW6 ) Physicswallah Instagram Handle : https://www.instagram.com/physicswallah/ Physicswallah Facebook Page: https://www.facebook.com/physicswallah Physicswallah Twitter Account : https://twitter.com/PhysicswallahAP?s=20 Physicswallah App on Google Play Store : https://bit.ly/2SHIPW6 Physicswallah Website: ht"
    },
    {
      "comment_id": "UgyjlIQTYUfeoAvUISp4AaABAg.8ktxYDlPuck8nmfCK25mlg",
      "parent_id": "UgyjlIQTYUfeoAvUISp4AaABAg",
      "comment_type": "reply",
      "author": "@Rishi-cv7by",
      "likes": 2,
      "published_at": "2018-11-18T08:29:54Z",
      "timestamp_refs": [],
      "text": "@Alya khan you are so smart",
      "parent_context": "Live Classes, Video Lectures, Test Series, Lecturewise notes, topicwise DPP, dynamic Exercise and much more on Physicswallah App. Download the App from Google Playstore ( https://bit.ly/2SHIPW6 ) Physicswallah Instagram Handle : https://www.instagram.com/physicswallah/ Physicswallah Facebook Page: https://www.facebook.com/physicswallah Physicswallah Twitter Account : https://twitter.com/PhysicswallahAP?s=20 Physicswallah App on Google Play Store : https://bit.ly/2SHIPW6 Physicswallah Website: ht"
    },
    {
      "comment_id": "UgyjlIQTYUfeoAvUISp4AaABAg.8ktxYDlPuck8o4a0koB1xv",
      "parent_id": "UgyjlIQTYUfeoAvUISp4AaABAg",
      "comment_type": "reply",
      "author": "@jitendrapulle1475",
      "likes": 1,
      "published_at": "2018-11-25T16:50:12Z",
      "timestamp_refs": [],
      "text": "Sir please make video on hydrogen and its compounds",
      "parent_context": "Live Classes, Video Lectures, Test Series, Lecturewise notes, topicwise DPP, dynamic Exercise and much more on Physicswallah App. Download the App from Google Playstore ( https://bit.ly/2SHIPW6 ) Physicswallah Instagram Handle : https://www.instagram.com/physicswallah/ Physicswallah Facebook Page: https://www.facebook.com/physicswallah Physicswallah Twitter Account : https://twitter.com/PhysicswallahAP?s=20 Physicswallah App on Google Play Store : https://bit.ly/2SHIPW6 Physicswallah Website: ht"
    },
    {
      "comment_id": "UgyjlIQTYUfeoAvUISp4AaABAg.8ktxYDlPuck8ov3eB_UxQr",
      "parent_id": "UgyjlIQTYUfeoAvUISp4AaABAg",
      "comment_type": "reply",
      "author": "@serendipityqueen",
      "likes": 1,
      "published_at": "2018-12-16T11:17:37Z",
      "timestamp_refs": [],
      "text": "Sir ..whr is video on hydrogen chap 9 of ncrt?",
      "parent_context": "Live Classes, Video Lectures, Test Series, Lecturewise notes, topicwise DPP, dynamic Exercise and much more on Physicswallah App. Download the App from Google Playstore ( https://bit.ly/2SHIPW6 ) Physicswallah Instagram Handle : https://www.instagram.com/physicswallah/ Physicswallah Facebook Page: https://www.facebook.com/physicswallah Physicswallah Twitter Account : https://twitter.com/PhysicswallahAP?s=20 Physicswallah App on Google Play Store : https://bit.ly/2SHIPW6 Physicswallah Website: ht"
    },
    {
      "comment_id": "UgyjlIQTYUfeoAvUISp4AaABAg.8ktxYDlPuck8uqVjKwcTji",
      "parent_id": "UgyjlIQTYUfeoAvUISp4AaABAg",
      "comment_type": "reply",
      "author": "@kishorsolanki4072",
      "likes": 1,
      "published_at": "2019-05-12T19:55:09Z",
      "timestamp_refs": [],
      "text": "Love you sir",
      "parent_context": "Live Classes, Video Lectures, Test Series, Lecturewise notes, topicwise DPP, dynamic Exercise and much more on Physicswallah App. Download the App from Google Playstore ( https://bit.ly/2SHIPW6 ) Physicswallah Instagram Handle : https://www.instagram.com/physicswallah/ Physicswallah Facebook Page: https://www.facebook.com/physicswallah Physicswallah Twitter Account : https://twitter.com/PhysicswallahAP?s=20 Physicswallah App on Google Play Store : https://bit.ly/2SHIPW6 Physicswallah Website: ht"
    },
    {
      "comment_id": "UgyjlIQTYUfeoAvUISp4AaABAg.8ktxYDlPuck8wN6TDEXPf-",
      "parent_id": "UgyjlIQTYUfeoAvUISp4AaABAg",
      "comment_type": "reply",
      "author": "@kinshukkumar2090",
      "likes": 0,
      "published_at": "2019-06-19T17:39:56Z",
      "timestamp_refs": [],
      "text": "Video on bents rule please (chemical bonding class 11)",
      "parent_context": "Live Classes, Video Lectures, Test Series, Lecturewise notes, topicwise DPP, dynamic Exercise and much more on Physicswallah App. Download the App from Google Playstore ( https://bit.ly/2SHIPW6 ) Physicswallah Instagram Handle : https://www.instagram.com/physicswallah/ Physicswallah Facebook Page: https://www.facebook.com/physicswallah Physicswallah Twitter Account : https://twitter.com/PhysicswallahAP?s=20 Physicswallah App on Google Play Store : https://bit.ly/2SHIPW6 Physicswallah Website: ht"
    },
    {
      "comment_id": "UgyjlIQTYUfeoAvUISp4AaABAg.8ktxYDlPuck8wdKRHUBPjp",
      "parent_id": "UgyjlIQTYUfeoAvUISp4AaABAg",
      "comment_type": "reply",
      "author": "@elianakaur4188",
      "likes": 2,
      "published_at": "2019-06-26T10:09:05Z",
      "timestamp_refs": [],
      "text": "Sir thankuuu soooooo much....... Finally my chemical bonding chapter is finished with only ur help🙂🙂🙂🙏🙏🙏🙏🙏🙏🙏🙏",
      "parent_context": "Live Classes, Video Lectures, Test Series, Lecturewise notes, topicwise DPP, dynamic Exercise and much more on Physicswallah App. Download the App from Google Playstore ( https://bit.ly/2SHIPW6 ) Physicswallah Instagram Handle : https://www.instagram.com/physicswallah/ Physicswallah Facebook Page: https://www.facebook.com/physicswallah Physicswallah Twitter Account : https://twitter.com/PhysicswallahAP?s=20 Physicswallah App on Google Play Store : https://bit.ly/2SHIPW6 Physicswallah Website: ht"
    },
    {
      "comment_id": "UgyjlIQTYUfeoAvUISp4AaABAg.8ktxYDlPuck8yraAgfikrQ",
      "parent_id": "UgyjlIQTYUfeoAvUISp4AaABAg",
      "comment_type": "reply",
      "author": "@AbhishekYadav-cl4cn",
      "likes": 0,
      "published_at": "2019-08-20T16:07:31Z",
      "timestamp_refs": [],
      "text": "Chemistry or physics video aapne sir bahut accha explain Kiya Hua hi hi Main Chahta Hoon sir aap aur nayi video banayan Jo topic nahi Bana Hoon",
      "parent_context": "Live Classes, Video Lectures, Test Series, Lecturewise notes, topicwise DPP, dynamic Exercise and much more on Physicswallah App. Download the App from Google Playstore ( https://bit.ly/2SHIPW6 ) Physicswallah Instagram Handle : https://www.instagram.com/physicswallah/ Physicswallah Facebook Page: https://www.facebook.com/physicswallah Physicswallah Twitter Account : https://twitter.com/PhysicswallahAP?s=20 Physicswallah App on Google Play Store : https://bit.ly/2SHIPW6 Physicswallah Website: ht"
    },
    {
      "comment_id": "UgyjlIQTYUfeoAvUISp4AaABAg.8ktxYDlPuck8zDjlwhVdqm",
      "parent_id": "UgyjlIQTYUfeoAvUISp4AaABAg",
      "comment_type": "reply",
      "author": "@rohitgupta1138",
      "likes": 1,
      "published_at": "2019-08-29T15:53:55Z",
      "timestamp_refs": [],
      "text": "Sir please explain with definition 👍",
      "parent_context": "Live Classes, Video Lectures, Test Series, Lecturewise notes, topicwise DPP, dynamic Exercise and much more on Physicswallah App. Download the App from Google Playstore ( https://bit.ly/2SHIPW6 ) Physicswallah Instagram Handle : https://www.instagram.com/physicswallah/ Physicswallah Facebook Page: https://www.facebook.com/physicswallah Physicswallah Twitter Account : https://twitter.com/PhysicswallahAP?s=20 Physicswallah App on Google Play Store : https://bit.ly/2SHIPW6 Physicswallah Website: ht"
    },
    {
      "comment_id": "UgyjlIQTYUfeoAvUISp4AaABAg.8ktxYDlPuck8zXCK9hR_5-",
      "parent_id": "UgyjlIQTYUfeoAvUISp4AaABAg",
      "comment_type": "reply",
      "author": "@rajranigupta4941",
      "likes": 2,
      "published_at": "2019-09-06T05:17:42Z",
      "timestamp_refs": [],
      "text": "Sir are u married or not??",
      "parent_context": "Live Classes, Video Lectures, Test Series, Lecturewise notes, topicwise DPP, dynamic Exercise and much more on Physicswallah App. Download the App from Google Playstore ( https://bit.ly/2SHIPW6 ) Physicswallah Instagram Handle : https://www.instagram.com/physicswallah/ Physicswallah Facebook Page: https://www.facebook.com/physicswallah Physicswallah Twitter Account : https://twitter.com/PhysicswallahAP?s=20 Physicswallah App on Google Play Store : https://bit.ly/2SHIPW6 Physicswallah Website: ht"
    },
    {
      "comment_id": "UgyjlIQTYUfeoAvUISp4AaABAg.8ktxYDlPuck8zt_27fpyw-",
      "parent_id": "UgyjlIQTYUfeoAvUISp4AaABAg",
      "comment_type": "reply",
      "author": "@GurdeepSingh-jb2li",
      "likes": 0,
      "published_at": "2019-09-15T07:07:30Z",
      "timestamp_refs": [],
      "text": "Sir de- mineralisation of water by ion exchange resin ka keya mean hai..??",
      "parent_context": "Live Classes, Video Lectures, Test Series, Lecturewise notes, topicwise DPP, dynamic Exercise and much more on Physicswallah App. Download the App from Google Playstore ( https://bit.ly/2SHIPW6 ) Physicswallah Instagram Handle : https://www.instagram.com/physicswallah/ Physicswallah Facebook Page: https://www.facebook.com/physicswallah Physicswallah Twitter Account : https://twitter.com/PhysicswallahAP?s=20 Physicswallah App on Google Play Store : https://bit.ly/2SHIPW6 Physicswallah Website: ht"
    },
    {
      "comment_id": "UgyjlIQTYUfeoAvUISp4AaABAg.8ktxYDlPuck9-ProFnNJGi",
      "parent_id": "UgyjlIQTYUfeoAvUISp4AaABAg",
      "comment_type": "reply",
      "author": "@deepikamaheshwari7179",
      "likes": 0,
      "published_at": "2019-09-28T05:26:25Z",
      "timestamp_refs": [],
      "text": "Sir please make video on Environmental Chemistry class 11 part 2",
      "parent_context": "Live Classes, Video Lectures, Test Series, Lecturewise notes, topicwise DPP, dynamic Exercise and much more on Physicswallah App. Download the App from Google Playstore ( https://bit.ly/2SHIPW6 ) Physicswallah Instagram Handle : https://www.instagram.com/physicswallah/ Physicswallah Facebook Page: https://www.facebook.com/physicswallah Physicswallah Twitter Account : https://twitter.com/PhysicswallahAP?s=20 Physicswallah App on Google Play Store : https://bit.ly/2SHIPW6 Physicswallah Website: ht"
    },
    {
      "comment_id": "UgyjlIQTYUfeoAvUISp4AaABAg.8ktxYDlPuck92NMxcaBRJx",
      "parent_id": "UgyjlIQTYUfeoAvUISp4AaABAg",
      "comment_type": "reply",
      "author": "@shanemohammad99",
      "likes": 0,
      "published_at": "2019-12-10T19:43:47Z",
      "timestamp_refs": [],
      "text": "Thnx sir",
      "parent_context": "Live Classes, Video Lectures, Test Series, Lecturewise notes, topicwise DPP, dynamic Exercise and much more on Physicswallah App. Download the App from Google Playstore ( https://bit.ly/2SHIPW6 ) Physicswallah Instagram Handle : https://www.instagram.com/physicswallah/ Physicswallah Facebook Page: https://www.facebook.com/physicswallah Physicswallah Twitter Account : https://twitter.com/PhysicswallahAP?s=20 Physicswallah App on Google Play Store : https://bit.ly/2SHIPW6 Physicswallah Website: ht"
    },
    {
      "comment_id": "UgyjlIQTYUfeoAvUISp4AaABAg.8ktxYDlPuck93NJ2C5K74s",
      "parent_id": "UgyjlIQTYUfeoAvUISp4AaABAg",
      "comment_type": "reply",
      "author": "@ayushmessi8209",
      "likes": 0,
      "published_at": "2020-01-04T15:40:59Z",
      "timestamp_refs": [],
      "text": "Thank you sir for such a nice explanation .",
      "parent_context": "Live Classes, Video Lectures, Test Series, Lecturewise notes, topicwise DPP, dynamic Exercise and much more on Physicswallah App. Download the App from Google Playstore ( https://bit.ly/2SHIPW6 ) Physicswallah Instagram Handle : https://www.instagram.com/physicswallah/ Physicswallah Facebook Page: https://www.facebook.com/physicswallah Physicswallah Twitter Account : https://twitter.com/PhysicswallahAP?s=20 Physicswallah App on Google Play Store : https://bit.ly/2SHIPW6 Physicswallah Website: ht"
    },
    {
      "comment_id": "UgyjlIQTYUfeoAvUISp4AaABAg.8ktxYDlPuck94sfAwjpoR6",
      "parent_id": "UgyjlIQTYUfeoAvUISp4AaABAg",
      "comment_type": "reply",
      "author": "@waleej.",
      "likes": 0,
      "published_at": "2020-02-11T01:50:15Z",
      "timestamp_refs": [],
      "text": "Muft main itna knowledge",
      "parent_context": "Live Classes, Video Lectures, Test Series, Lecturewise notes, topicwise DPP, dynamic Exercise and much more on Physicswallah App. Download the App from Google Playstore ( https://bit.ly/2SHIPW6 ) Physicswallah Instagram Handle : https://www.instagram.com/physicswallah/ Physicswallah Facebook Page: https://www.facebook.com/physicswallah Physicswallah Twitter Account : https://twitter.com/PhysicswallahAP?s=20 Physicswallah App on Google Play Store : https://bit.ly/2SHIPW6 Physicswallah Website: ht"
    },
    {
      "comment_id": "UgyjlIQTYUfeoAvUISp4AaABAg.8ktxYDlPuck96IW_oTDHLx",
      "parent_id": "UgyjlIQTYUfeoAvUISp4AaABAg",
      "comment_type": "reply",
      "author": "@harshitasingh5823",
      "likes": 0,
      "published_at": "2020-03-17T08:37:17Z",
      "timestamp_refs": [],
      "text": "Physics Wallah - Alakh Pandey",
      "parent_context": "Live Classes, Video Lectures, Test Series, Lecturewise notes, topicwise DPP, dynamic Exercise and much more on Physicswallah App. Download the App from Google Playstore ( https://bit.ly/2SHIPW6 ) Physicswallah Instagram Handle : https://www.instagram.com/physicswallah/ Physicswallah Facebook Page: https://www.facebook.com/physicswallah Physicswallah Twitter Account : https://twitter.com/PhysicswallahAP?s=20 Physicswallah App on Google Play Store : https://bit.ly/2SHIPW6 Physicswallah Website: ht"
    },
    {
      "comment_id": "UgyjlIQTYUfeoAvUISp4AaABAg.8ktxYDlPuck978nh9B3v80",
      "parent_id": "UgyjlIQTYUfeoAvUISp4AaABAg",
      "comment_type": "reply",
      "author": "@trybest5217",
      "likes": 1,
      "published_at": "2020-04-07T10:34:34Z",
      "timestamp_refs": [
        "33:41"
      ],
      "text": "Sirji at 33:41 amine ke paas 2 H hai jabki alcohol ke paas to 1 hi H hai to amine jyada H-bond banayenga to usko jyada soluble hona chahiye na water me🤔🤔🤔🤔",
      "parent_context": "Live Classes, Video Lectures, Test Series, Lecturewise notes, topicwise DPP, dynamic Exercise and much more on Physicswallah App. Download the App from Google Playstore ( https://bit.ly/2SHIPW6 ) Physicswallah Instagram Handle : https://www.instagram.com/physicswallah/ Physicswallah Facebook Page: https://www.facebook.com/physicswallah Physicswallah Twitter Account : https://twitter.com/PhysicswallahAP?s=20 Physicswallah App on Google Play Store : https://bit.ly/2SHIPW6 Physicswallah Website: ht"
    },
    {
      "comment_id": "UgyjlIQTYUfeoAvUISp4AaABAg.8ktxYDlPuck984BZLm9cZL",
      "parent_id": "UgyjlIQTYUfeoAvUISp4AaABAg",
      "comment_type": "reply",
      "author": "@movie...wallah",
      "likes": 0,
      "published_at": "2020-04-30T12:07:00Z",
      "timestamp_refs": [],
      "text": "Sir please make a video of banana bonding back bonding bent rule",
      "parent_context": "Live Classes, Video Lectures, Test Series, Lecturewise notes, topicwise DPP, dynamic Exercise and much more on Physicswallah App. Download the App from Google Playstore ( https://bit.ly/2SHIPW6 ) Physicswallah Instagram Handle : https://www.instagram.com/physicswallah/ Physicswallah Facebook Page: https://www.facebook.com/physicswallah Physicswallah Twitter Account : https://twitter.com/PhysicswallahAP?s=20 Physicswallah App on Google Play Store : https://bit.ly/2SHIPW6 Physicswallah Website: ht"
    },
    {
      "comment_id": "UgyjlIQTYUfeoAvUISp4AaABAg.8ktxYDlPuck9C4dArmYCNm",
      "parent_id": "UgyjlIQTYUfeoAvUISp4AaABAg",
      "comment_type": "reply",
      "author": "@aartii25",
      "likes": 0,
      "published_at": "2020-08-08T02:22:39Z",
      "timestamp_refs": [],
      "text": "\"{@\"+>;- >;#[>[<[~ :@; (@|{",
      "parent_context": "Live Classes, Video Lectures, Test Series, Lecturewise notes, topicwise DPP, dynamic Exercise and much more on Physicswallah App. Download the App from Google Playstore ( https://bit.ly/2SHIPW6 ) Physicswallah Instagram Handle : https://www.instagram.com/physicswallah/ Physicswallah Facebook Page: https://www.facebook.com/physicswallah Physicswallah Twitter Account : https://twitter.com/PhysicswallahAP?s=20 Physicswallah App on Google Play Store : https://bit.ly/2SHIPW6 Physicswallah Website: ht"
    },
    {
      "comment_id": "UgyjlIQTYUfeoAvUISp4AaABAg.8ktxYDlPuck9Cojw3I8KN1",
      "parent_id": "UgyjlIQTYUfeoAvUISp4AaABAg",
      "comment_type": "reply",
      "author": "@ashutoshchaturvedi7490",
      "likes": 0,
      "published_at": "2020-08-26T09:25:58Z",
      "timestamp_refs": [],
      "text": "@trybest5217 Bhai unhone h bond ki baat ki hai na ki no of h ki😀",
      "parent_context": "Live Classes, Video Lectures, Test Series, Lecturewise notes, topicwise DPP, dynamic Exercise and much more on Physicswallah App. Download the App from Google Playstore ( https://bit.ly/2SHIPW6 ) Physicswallah Instagram Handle : https://www.instagram.com/physicswallah/ Physicswallah Facebook Page: https://www.facebook.com/physicswallah Physicswallah Twitter Account : https://twitter.com/PhysicswallahAP?s=20 Physicswallah App on Google Play Store : https://bit.ly/2SHIPW6 Physicswallah Website: ht"
    },
    {
      "comment_id": "UgyjlIQTYUfeoAvUISp4AaABAg.8ktxYDlPuck9CyyR7Y3YeC",
      "parent_id": "UgyjlIQTYUfeoAvUISp4AaABAg",
      "comment_type": "reply",
      "author": "@papa_mugambo_CK",
      "likes": 1,
      "published_at": "2020-08-30T08:45:05Z",
      "timestamp_refs": [],
      "text": "Sir alcohol is more soluble in water 😂😂😂that's why it is easy to make peg 60 ml ,90 ml ect. 😂😂😂#peg op",
      "parent_context": "Live Classes, Video Lectures, Test Series, Lecturewise notes, topicwise DPP, dynamic Exercise and much more on Physicswallah App. Download the App from Google Playstore ( https://bit.ly/2SHIPW6 ) Physicswallah Instagram Handle : https://www.instagram.com/physicswallah/ Physicswallah Facebook Page: https://www.facebook.com/physicswallah Physicswallah Twitter Account : https://twitter.com/PhysicswallahAP?s=20 Physicswallah App on Google Play Store : https://bit.ly/2SHIPW6 Physicswallah Website: ht"
    },
    {
      "comment_id": "UgyjlIQTYUfeoAvUISp4AaABAg.8ktxYDlPuck9Cz-wwOmrCe",
      "parent_id": "UgyjlIQTYUfeoAvUISp4AaABAg",
      "comment_type": "reply",
      "author": "@papa_mugambo_CK",
      "likes": 0,
      "published_at": "2020-08-30T09:07:02Z",
      "timestamp_refs": [],
      "text": "@trybest5217 nahi because of hydrogen bonds it is not possible 😁😁",
      "parent_context": "Live Classes, Video Lectures, Test Series, Lecturewise notes, topicwise DPP, dynamic Exercise and much more on Physicswallah App. Download the App from Google Playstore ( https://bit.ly/2SHIPW6 ) Physicswallah Instagram Handle : https://www.instagram.com/physicswallah/ Physicswallah Facebook Page: https://www.facebook.com/physicswallah Physicswallah Twitter Account : https://twitter.com/PhysicswallahAP?s=20 Physicswallah App on Google Play Store : https://bit.ly/2SHIPW6 Physicswallah Website: ht"
    },
    {
      "comment_id": "UgyjlIQTYUfeoAvUISp4AaABAg.8ktxYDlPuck9DTcfyo1qN_",
      "parent_id": "UgyjlIQTYUfeoAvUISp4AaABAg",
      "comment_type": "reply",
      "author": "@Bhargab3",
      "likes": 0,
      "published_at": "2020-09-11T15:50:42Z",
      "timestamp_refs": [],
      "text": "Download physics wallah app ❤️❤️",
      "parent_context": "Live Classes, Video Lectures, Test Series, Lecturewise notes, topicwise DPP, dynamic Exercise and much more on Physicswallah App. Download the App from Google Playstore ( https://bit.ly/2SHIPW6 ) Physicswallah Instagram Handle : https://www.instagram.com/physicswallah/ Physicswallah Facebook Page: https://www.facebook.com/physicswallah Physicswallah Twitter Account : https://twitter.com/PhysicswallahAP?s=20 Physicswallah App on Google Play Store : https://bit.ly/2SHIPW6 Physicswallah Website: ht"
    },
    {
      "comment_id": "UgyjlIQTYUfeoAvUISp4AaABAg.8ktxYDlPuck9DmmkgaX6ya",
      "parent_id": "UgyjlIQTYUfeoAvUISp4AaABAg",
      "comment_type": "reply",
      "author": "@shraddhajindal1875",
      "likes": 0,
      "published_at": "2020-09-19T11:43:32Z",
      "timestamp_refs": [],
      "text": "@awdheshprajapati2866 resonance ka alag video hai broo !! Physics wallah search krke dekhlo",
      "parent_context": "Live Classes, Video Lectures, Test Series, Lecturewise notes, topicwise DPP, dynamic Exercise and much more on Physicswallah App. Download the App from Google Playstore ( https://bit.ly/2SHIPW6 ) Physicswallah Instagram Handle : https://www.instagram.com/physicswallah/ Physicswallah Facebook Page: https://www.facebook.com/physicswallah Physicswallah Twitter Account : https://twitter.com/PhysicswallahAP?s=20 Physicswallah App on Google Play Store : https://bit.ly/2SHIPW6 Physicswallah Website: ht"
    },
    {
      "comment_id": "UgyjlIQTYUfeoAvUISp4AaABAg.8ktxYDlPuck9ElQrZHGDlk",
      "parent_id": "UgyjlIQTYUfeoAvUISp4AaABAg",
      "comment_type": "reply",
      "author": "@text4music2.05",
      "likes": 0,
      "published_at": "2020-10-13T19:35:39Z",
      "timestamp_refs": [],
      "text": "Chhap liya bachchi \"mitaar de\" 😂😂😂",
      "parent_context": "Live Classes, Video Lectures, Test Series, Lecturewise notes, topicwise DPP, dynamic Exercise and much more on Physicswallah App. Download the App from Google Playstore ( https://bit.ly/2SHIPW6 ) Physicswallah Instagram Handle : https://www.instagram.com/physicswallah/ Physicswallah Facebook Page: https://www.facebook.com/physicswallah Physicswallah Twitter Account : https://twitter.com/PhysicswallahAP?s=20 Physicswallah App on Google Play Store : https://bit.ly/2SHIPW6 Physicswallah Website: ht"
    },
    {
      "comment_id": "UgyjlIQTYUfeoAvUISp4AaABAg.8ktxYDlPuck9F6E1w250P2",
      "parent_id": "UgyjlIQTYUfeoAvUISp4AaABAg",
      "comment_type": "reply",
      "author": "@TheModernWorld-fc6ys",
      "likes": 0,
      "published_at": "2020-10-22T06:46:54Z",
      "timestamp_refs": [],
      "text": "Off course",
      "parent_context": "Live Classes, Video Lectures, Test Series, Lecturewise notes, topicwise DPP, dynamic Exercise and much more on Physicswallah App. Download the App from Google Playstore ( https://bit.ly/2SHIPW6 ) Physicswallah Instagram Handle : https://www.instagram.com/physicswallah/ Physicswallah Facebook Page: https://www.facebook.com/physicswallah Physicswallah Twitter Account : https://twitter.com/PhysicswallahAP?s=20 Physicswallah App on Google Play Store : https://bit.ly/2SHIPW6 Physicswallah Website: ht"
    },
    {
      "comment_id": "UgyjlIQTYUfeoAvUISp4AaABAg.8ktxYDlPuck9Jr4pBKBiVg",
      "parent_id": "UgyjlIQTYUfeoAvUISp4AaABAg",
      "comment_type": "reply",
      "author": "@TSTUSHARSONI01",
      "likes": 1,
      "published_at": "2021-02-17T06:55:30Z",
      "timestamp_refs": [],
      "text": "Sir very confusing questions jab hydrogen ka duplete comple h toh yeh hydrogen bond kese banayega 🙄🙄🙄🙄🙄🙄🙄 please reply 🙏🙏🙏🙏🙏🙏🙏🙏🙏🙏",
      "parent_context": "Live Classes, Video Lectures, Test Series, Lecturewise notes, topicwise DPP, dynamic Exercise and much more on Physicswallah App. Download the App from Google Playstore ( https://bit.ly/2SHIPW6 ) Physicswallah Instagram Handle : https://www.instagram.com/physicswallah/ Physicswallah Facebook Page: https://www.facebook.com/physicswallah Physicswallah Twitter Account : https://twitter.com/PhysicswallahAP?s=20 Physicswallah App on Google Play Store : https://bit.ly/2SHIPW6 Physicswallah Website: ht"
    },
    {
      "comment_id": "UgyjlIQTYUfeoAvUISp4AaABAg.8ktxYDlPuck9JthNUJyZaW",
      "parent_id": "UgyjlIQTYUfeoAvUISp4AaABAg",
      "comment_type": "reply",
      "author": "@uniquesamar5197",
      "likes": 0,
      "published_at": "2021-02-18T07:19:35Z",
      "timestamp_refs": [],
      "text": "Sir plz gaseous state chapter start kijiye plz",
      "parent_context": "Live Classes, Video Lectures, Test Series, Lecturewise notes, topicwise DPP, dynamic Exercise and much more on Physicswallah App. Download the App from Google Playstore ( https://bit.ly/2SHIPW6 ) Physicswallah Instagram Handle : https://www.instagram.com/physicswallah/ Physicswallah Facebook Page: https://www.facebook.com/physicswallah Physicswallah Twitter Account : https://twitter.com/PhysicswallahAP?s=20 Physicswallah App on Google Play Store : https://bit.ly/2SHIPW6 Physicswallah Website: ht"
    },
    {
      "comment_id": "UgyjlIQTYUfeoAvUISp4AaABAg.8ktxYDlPuck9Q7dho8t6bf",
      "parent_id": "UgyjlIQTYUfeoAvUISp4AaABAg",
      "comment_type": "reply",
      "author": "@Bhi7777",
      "likes": 0,
      "published_at": "2021-07-23T05:44:31Z",
      "timestamp_refs": [
        "15:30"
      ],
      "text": "Sir Ek problem h During 15:30 example me Usme option (a) hona chahiye kyuki oxygen ka size is smaller than nitrogen Jaise ki apne video k start me kaha th ki ko ( A_H::::B )b ka jagah small atom hona chahiye",
      "parent_context": "Live Classes, Video Lectures, Test Series, Lecturewise notes, topicwise DPP, dynamic Exercise and much more on Physicswallah App. Download the App from Google Playstore ( https://bit.ly/2SHIPW6 ) Physicswallah Instagram Handle : https://www.instagram.com/physicswallah/ Physicswallah Facebook Page: https://www.facebook.com/physicswallah Physicswallah Twitter Account : https://twitter.com/PhysicswallahAP?s=20 Physicswallah App on Google Play Store : https://bit.ly/2SHIPW6 Physicswallah Website: ht"
    },
    {
      "comment_id": "UgyjlIQTYUfeoAvUISp4AaABAg.8ktxYDlPuck9T9wUDyAP07",
      "parent_id": "UgyjlIQTYUfeoAvUISp4AaABAg",
      "comment_type": "reply",
      "author": "@pwguide7.5kviews89",
      "likes": 0,
      "published_at": "2021-10-06T16:41:13Z",
      "timestamp_refs": [],
      "text": "Hi 🌹🌹",
      "parent_context": "Live Classes, Video Lectures, Test Series, Lecturewise notes, topicwise DPP, dynamic Exercise and much more on Physicswallah App. Download the App from Google Playstore ( https://bit.ly/2SHIPW6 ) Physicswallah Instagram Handle : https://www.instagram.com/physicswallah/ Physicswallah Facebook Page: https://www.facebook.com/physicswallah Physicswallah Twitter Account : https://twitter.com/PhysicswallahAP?s=20 Physicswallah App on Google Play Store : https://bit.ly/2SHIPW6 Physicswallah Website: ht"
    },
    {
      "comment_id": "UgyjlIQTYUfeoAvUISp4AaABAg.8ktxYDlPuck9TBk8dsPcm0",
      "parent_id": "UgyjlIQTYUfeoAvUISp4AaABAg",
      "comment_type": "reply",
      "author": "@CRAZYForMBBS",
      "likes": 0,
      "published_at": "2021-10-07T09:31:54Z",
      "timestamp_refs": [],
      "text": "Sir apko to padmbhusan milna chahiye,z🙂🙂",
      "parent_context": "Live Classes, Video Lectures, Test Series, Lecturewise notes, topicwise DPP, dynamic Exercise and much more on Physicswallah App. Download the App from Google Playstore ( https://bit.ly/2SHIPW6 ) Physicswallah Instagram Handle : https://www.instagram.com/physicswallah/ Physicswallah Facebook Page: https://www.facebook.com/physicswallah Physicswallah Twitter Account : https://twitter.com/PhysicswallahAP?s=20 Physicswallah App on Google Play Store : https://bit.ly/2SHIPW6 Physicswallah Website: ht"
    },
    {
      "comment_id": "UgyjlIQTYUfeoAvUISp4AaABAg.8ktxYDlPuck9eQwxmNLOlh",
      "parent_id": "UgyjlIQTYUfeoAvUISp4AaABAg",
      "comment_type": "reply",
      "author": "@vishalkumar-kt8fx",
      "likes": 0,
      "published_at": "2022-08-07T13:29:13Z",
      "timestamp_refs": [],
      "text": "Kash main pahale se aapse pada hota",
      "parent_context": "Live Classes, Video Lectures, Test Series, Lecturewise notes, topicwise DPP, dynamic Exercise and much more on Physicswallah App. Download the App from Google Playstore ( https://bit.ly/2SHIPW6 ) Physicswallah Instagram Handle : https://www.instagram.com/physicswallah/ Physicswallah Facebook Page: https://www.facebook.com/physicswallah Physicswallah Twitter Account : https://twitter.com/PhysicswallahAP?s=20 Physicswallah App on Google Play Store : https://bit.ly/2SHIPW6 Physicswallah Website: ht"
    },
    {
      "comment_id": "UgyjlIQTYUfeoAvUISp4AaABAg.8ktxYDlPuck9ih5hss5K_F",
      "parent_id": "UgyjlIQTYUfeoAvUISp4AaABAg",
      "comment_type": "reply",
      "author": "@LiaqatAli-ug2qr",
      "likes": 0,
      "published_at": "2022-11-21T15:27:05Z",
      "timestamp_refs": [],
      "text": "Dhehehe",
      "parent_context": "Live Classes, Video Lectures, Test Series, Lecturewise notes, topicwise DPP, dynamic Exercise and much more on Physicswallah App. Download the App from Google Playstore ( https://bit.ly/2SHIPW6 ) Physicswallah Instagram Handle : https://www.instagram.com/physicswallah/ Physicswallah Facebook Page: https://www.facebook.com/physicswallah Physicswallah Twitter Account : https://twitter.com/PhysicswallahAP?s=20 Physicswallah App on Google Play Store : https://bit.ly/2SHIPW6 Physicswallah Website: ht"
    },
    {
      "comment_id": "UgyjlIQTYUfeoAvUISp4AaABAg.8ktxYDlPuck9kd3mKo1_LP",
      "parent_id": "UgyjlIQTYUfeoAvUISp4AaABAg",
      "comment_type": "reply",
      "author": "@prakharsaxena63",
      "likes": 0,
      "published_at": "2023-01-08T18:56:03Z",
      "timestamp_refs": [],
      "text": "@Bhi7777 electronegativity to jada hai na oxygen ki ..",
      "parent_context": "Live Classes, Video Lectures, Test Series, Lecturewise notes, topicwise DPP, dynamic Exercise and much more on Physicswallah App. Download the App from Google Playstore ( https://bit.ly/2SHIPW6 ) Physicswallah Instagram Handle : https://www.instagram.com/physicswallah/ Physicswallah Facebook Page: https://www.facebook.com/physicswallah Physicswallah Twitter Account : https://twitter.com/PhysicswallahAP?s=20 Physicswallah App on Google Play Store : https://bit.ly/2SHIPW6 Physicswallah Website: ht"
    },
    {
      "comment_id": "UgyjlIQTYUfeoAvUISp4AaABAg.8ktxYDlPuck9oc7KDRYYM8",
      "parent_id": "UgyjlIQTYUfeoAvUISp4AaABAg",
      "comment_type": "reply",
      "author": "@rayyanparvez5568",
      "likes": 0,
      "published_at": "2023-04-17T20:13:21Z",
      "timestamp_refs": [],
      "text": "Ytttyyggf h to uski qadar goon h to uski qadar goon h to uski qadar goon h to uski qadar goon h to uski qadar goon h to uski qadar goon h to uski qadar goon h to uski qadar goon h to uski qadar goon h to uski qadar goon h",
      "parent_context": "Live Classes, Video Lectures, Test Series, Lecturewise notes, topicwise DPP, dynamic Exercise and much more on Physicswallah App. Download the App from Google Playstore ( https://bit.ly/2SHIPW6 ) Physicswallah Instagram Handle : https://www.instagram.com/physicswallah/ Physicswallah Facebook Page: https://www.facebook.com/physicswallah Physicswallah Twitter Account : https://twitter.com/PhysicswallahAP?s=20 Physicswallah App on Google Play Store : https://bit.ly/2SHIPW6 Physicswallah Website: ht"
    },
    {
      "comment_id": "UgyjlIQTYUfeoAvUISp4AaABAg.8ktxYDlPuck9sJmIstT6sh",
      "parent_id": "UgyjlIQTYUfeoAvUISp4AaABAg",
      "comment_type": "reply",
      "author": "@parisharma9369",
      "likes": 0,
      "published_at": "2023-07-18T18:00:56Z",
      "timestamp_refs": [],
      "text": "Sir plz start net chemistry classes in your chennal & plz you teach physical chemistry & inorganic chemistry",
      "parent_context": "Live Classes, Video Lectures, Test Series, Lecturewise notes, topicwise DPP, dynamic Exercise and much more on Physicswallah App. Download the App from Google Playstore ( https://bit.ly/2SHIPW6 ) Physicswallah Instagram Handle : https://www.instagram.com/physicswallah/ Physicswallah Facebook Page: https://www.facebook.com/physicswallah Physicswallah Twitter Account : https://twitter.com/PhysicswallahAP?s=20 Physicswallah App on Google Play Store : https://bit.ly/2SHIPW6 Physicswallah Website: ht"
    },
    {
      "comment_id": "UgyjlIQTYUfeoAvUISp4AaABAg.8ktxYDlPuck9sgvFQ3s34P",
      "parent_id": "UgyjlIQTYUfeoAvUISp4AaABAg",
      "comment_type": "reply",
      "author": "@re-techbind7993",
      "likes": 0,
      "published_at": "2023-07-28T03:00:53Z",
      "timestamp_refs": [],
      "text": "Class 😁",
      "parent_context": "Live Classes, Video Lectures, Test Series, Lecturewise notes, topicwise DPP, dynamic Exercise and much more on Physicswallah App. Download the App from Google Playstore ( https://bit.ly/2SHIPW6 ) Physicswallah Instagram Handle : https://www.instagram.com/physicswallah/ Physicswallah Facebook Page: https://www.facebook.com/physicswallah Physicswallah Twitter Account : https://twitter.com/PhysicswallahAP?s=20 Physicswallah App on Google Play Store : https://bit.ly/2SHIPW6 Physicswallah Website: ht"
    },
    {
      "comment_id": "UgyjlIQTYUfeoAvUISp4AaABAg.8ktxYDlPuckA8hnU0vpXnF",
      "parent_id": "UgyjlIQTYUfeoAvUISp4AaABAg",
      "comment_type": "reply",
      "author": "@missv007",
      "likes": 0,
      "published_at": "2024-09-23T00:05:56Z",
      "timestamp_refs": [
        "1:01:34"
      ],
      "text": "1:01:34",
      "parent_context": "Live Classes, Video Lectures, Test Series, Lecturewise notes, topicwise DPP, dynamic Exercise and much more on Physicswallah App. Download the App from Google Playstore ( https://bit.ly/2SHIPW6 ) Physicswallah Instagram Handle : https://www.instagram.com/physicswallah/ Physicswallah Facebook Page: https://www.facebook.com/physicswallah Physicswallah Twitter Account : https://twitter.com/PhysicswallahAP?s=20 Physicswallah App on Google Play Store : https://bit.ly/2SHIPW6 Physicswallah Website: ht"
    },
    {
      "comment_id": "UgzL8sUDoNVyTuqgbXV4AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@tumpi8051",
      "likes": 6974,
      "published_at": "2020-09-07T19:15:25Z",
      "timestamp_refs": [],
      "text": "To the one's studying in class 11 , please clear every topic of class 11 while you are in class 11. Don't be a fool like us. Don't think about drop year. Do it in a go. You get 2 years, put in your everything. Otherwise you'll regret it later. If any doubts, there are millions to help out there. Alakh Sir being one of the best in them. All the best!",
      "parent_context": ""
    },
    {
      "comment_id": "UgzL8sUDoNVyTuqgbXV4AaABAg.9DJgvr5184l9IbuNnrTdYG",
      "parent_id": "UgzL8sUDoNVyTuqgbXV4AaABAg",
      "comment_type": "reply",
      "author": "@electric_deer2007",
      "likes": 283,
      "published_at": "2021-01-17T12:55:30Z",
      "timestamp_refs": [],
      "text": "Bhai I dont even need JEE I only want to clear boards with 90 %",
      "parent_context": "To the one's studying in class 11 , please clear every topic of class 11 while you are in class 11. Don't be a fool like us. Don't think about drop year. Do it in a go. You get 2 years, put in your everything. Otherwise you'll regret it later. If any doubts, there are millions to help out there. Alakh Sir being one of the best in them. All the best!"
    },
    {
      "comment_id": "UgzL8sUDoNVyTuqgbXV4AaABAg.9DJgvr5184l9PVsaLnhfqa",
      "parent_id": "UgzL8sUDoNVyTuqgbXV4AaABAg",
      "comment_type": "reply",
      "author": "@avantikamishra3208",
      "likes": 28,
      "published_at": "2021-07-07T19:04:57Z",
      "timestamp_refs": [],
      "text": "@electric_deer2007 😁🙌",
      "parent_context": "To the one's studying in class 11 , please clear every topic of class 11 while you are in class 11. Don't be a fool like us. Don't think about drop year. Do it in a go. You get 2 years, put in your everything. Otherwise you'll regret it later. If any doubts, there are millions to help out there. Alakh Sir being one of the best in them. All the best!"
    },
    {
      "comment_id": "UgzL8sUDoNVyTuqgbXV4AaABAg.9DJgvr5184l9Pon250hYy4",
      "parent_id": "UgzL8sUDoNVyTuqgbXV4AaABAg",
      "comment_type": "reply",
      "author": "@saipriyabura5605",
      "likes": 56,
      "published_at": "2021-07-15T12:41:16Z",
      "timestamp_refs": [],
      "text": "Tq sister/brother",
      "parent_context": "To the one's studying in class 11 , please clear every topic of class 11 while you are in class 11. Don't be a fool like us. Don't think about drop year. Do it in a go. You get 2 years, put in your everything. Otherwise you'll regret it later. If any doubts, there are millions to help out there. Alakh Sir being one of the best in them. All the best!"
    },
    {
      "comment_id": "UgzL8sUDoNVyTuqgbXV4AaABAg.9DJgvr5184l9Q29xCsru2b",
      "parent_id": "UgzL8sUDoNVyTuqgbXV4AaABAg",
      "comment_type": "reply",
      "author": "@foreverot7195",
      "likes": 49,
      "published_at": "2021-07-21T02:39:32Z",
      "timestamp_refs": [],
      "text": "Tq ..i heard that thinh from many and and i m really tryinh best",
      "parent_context": "To the one's studying in class 11 , please clear every topic of class 11 while you are in class 11. Don't be a fool like us. Don't think about drop year. Do it in a go. You get 2 years, put in your everything. Otherwise you'll regret it later. If any doubts, there are millions to help out there. Alakh Sir being one of the best in them. All the best!"
    },
    {
      "comment_id": "UgzL8sUDoNVyTuqgbXV4AaABAg.9DJgvr5184l9QQje3YA0W1",
      "parent_id": "UgzL8sUDoNVyTuqgbXV4AaABAg",
      "comment_type": "reply",
      "author": "@learnoclub8513",
      "likes": 66,
      "published_at": "2021-07-30T15:42:01Z",
      "timestamp_refs": [],
      "text": "@electric_deer2007 me too focusing on board but if you will prepare for jee boards will automatically be cleared",
      "parent_context": "To the one's studying in class 11 , please clear every topic of class 11 while you are in class 11. Don't be a fool like us. Don't think about drop year. Do it in a go. You get 2 years, put in your everything. Otherwise you'll regret it later. If any doubts, there are millions to help out there. Alakh Sir being one of the best in them. All the best!"
    },
    {
      "comment_id": "UgzL8sUDoNVyTuqgbXV4AaABAg.9DJgvr5184l9QTkvWC5Hc2",
      "parent_id": "UgzL8sUDoNVyTuqgbXV4AaABAg",
      "comment_type": "reply",
      "author": "@rockworld7594",
      "likes": 134,
      "published_at": "2021-07-31T19:50:51Z",
      "timestamp_refs": [],
      "text": "@learnoclub8513 Nah, boards me definition ratni padti hai aur jee me sirf concept pata honi chahiye",
      "parent_context": "To the one's studying in class 11 , please clear every topic of class 11 while you are in class 11. Don't be a fool like us. Don't think about drop year. Do it in a go. You get 2 years, put in your everything. Otherwise you'll regret it later. If any doubts, there are millions to help out there. Alakh Sir being one of the best in them. All the best!"
    },
    {
      "comment_id": "UgzL8sUDoNVyTuqgbXV4AaABAg.9DJgvr5184l9QzdZUaqr6y",
      "parent_id": "UgzL8sUDoNVyTuqgbXV4AaABAg",
      "comment_type": "reply",
      "author": "@smileydiaries145",
      "likes": 60,
      "published_at": "2021-08-13T14:21:29Z",
      "timestamp_refs": [],
      "text": "Thanks for motivating. I am from the 2020 batch that suffered due to corona virus in class 10 and also suffering in 11th what to do what not which channel is good ... But have faith in alakh sir teaching ☺",
      "parent_context": "To the one's studying in class 11 , please clear every topic of class 11 while you are in class 11. Don't be a fool like us. Don't think about drop year. Do it in a go. You get 2 years, put in your everything. Otherwise you'll regret it later. If any doubts, there are millions to help out there. Alakh Sir being one of the best in them. All the best!"
    },
    {
      "comment_id": "UgzL8sUDoNVyTuqgbXV4AaABAg.9DJgvr5184l9R1LZCyHlEB",
      "parent_id": "UgzL8sUDoNVyTuqgbXV4AaABAg",
      "comment_type": "reply",
      "author": "@harshitaroutray5748",
      "likes": 13,
      "published_at": "2021-08-14T15:33:08Z",
      "timestamp_refs": [],
      "text": "Thanks for the advice",
      "parent_context": "To the one's studying in class 11 , please clear every topic of class 11 while you are in class 11. Don't be a fool like us. Don't think about drop year. Do it in a go. You get 2 years, put in your everything. Otherwise you'll regret it later. If any doubts, there are millions to help out there. Alakh Sir being one of the best in them. All the best!"
    },
    {
      "comment_id": "UgzL8sUDoNVyTuqgbXV4AaABAg.9DJgvr5184l9R7d03LNbjz",
      "parent_id": "UgzL8sUDoNVyTuqgbXV4AaABAg",
      "comment_type": "reply",
      "author": "@jagriti5246",
      "likes": 3,
      "published_at": "2021-08-17T02:09:48Z",
      "timestamp_refs": [],
      "text": "@smileydiaries145 same here😥",
      "parent_context": "To the one's studying in class 11 , please clear every topic of class 11 while you are in class 11. Don't be a fool like us. Don't think about drop year. Do it in a go. You get 2 years, put in your everything. Otherwise you'll regret it later. If any doubts, there are millions to help out there. Alakh Sir being one of the best in them. All the best!"
    },
    {
      "comment_id": "UgzL8sUDoNVyTuqgbXV4AaABAg.9DJgvr5184l9RWXZ_cDUgg",
      "parent_id": "UgzL8sUDoNVyTuqgbXV4AaABAg",
      "comment_type": "reply",
      "author": "@escherichiacoli9233",
      "likes": 38,
      "published_at": "2021-08-26T18:14:30Z",
      "timestamp_refs": [],
      "text": "I am also in regret like u ....Hope the present batch students are concerned about it",
      "parent_context": "To the one's studying in class 11 , please clear every topic of class 11 while you are in class 11. Don't be a fool like us. Don't think about drop year. Do it in a go. You get 2 years, put in your everything. Otherwise you'll regret it later. If any doubts, there are millions to help out there. Alakh Sir being one of the best in them. All the best!"
    },
    {
      "comment_id": "UgzL8sUDoNVyTuqgbXV4AaABAg.9DJgvr5184l9RYJerTw7hJ",
      "parent_id": "UgzL8sUDoNVyTuqgbXV4AaABAg",
      "comment_type": "reply",
      "author": "@iitdelhi9038",
      "likes": 4,
      "published_at": "2021-08-27T10:51:30Z",
      "timestamp_refs": [],
      "text": "@rockworld7594 YO YO🐱‍👤",
      "parent_context": "To the one's studying in class 11 , please clear every topic of class 11 while you are in class 11. Don't be a fool like us. Don't think about drop year. Do it in a go. You get 2 years, put in your everything. Otherwise you'll regret it later. If any doubts, there are millions to help out there. Alakh Sir being one of the best in them. All the best!"
    },
    {
      "comment_id": "UgzL8sUDoNVyTuqgbXV4AaABAg.9DJgvr5184l9R_AGGEiBD3",
      "parent_id": "UgzL8sUDoNVyTuqgbXV4AaABAg",
      "comment_type": "reply",
      "author": "@thecrazybatz",
      "likes": 4,
      "published_at": "2021-08-28T04:07:51Z",
      "timestamp_refs": [],
      "text": "Tyvm",
      "parent_context": "To the one's studying in class 11 , please clear every topic of class 11 while you are in class 11. Don't be a fool like us. Don't think about drop year. Do it in a go. You get 2 years, put in your everything. Otherwise you'll regret it later. If any doubts, there are millions to help out there. Alakh Sir being one of the best in them. All the best!"
    },
    {
      "comment_id": "UgzL8sUDoNVyTuqgbXV4AaABAg.9DJgvr5184l9RdVHZ5_ZKP",
      "parent_id": "UgzL8sUDoNVyTuqgbXV4AaABAg",
      "comment_type": "reply",
      "author": "@abdullah.3549",
      "likes": 15,
      "published_at": "2021-08-29T20:28:29Z",
      "timestamp_refs": [],
      "text": "Assalamualaikum I am Muslim ... I finally found great lecture in u tube that clear my concepts.... Jazak allah sir",
      "parent_context": "To the one's studying in class 11 , please clear every topic of class 11 while you are in class 11. Don't be a fool like us. Don't think about drop year. Do it in a go. You get 2 years, put in your everything. Otherwise you'll regret it later. If any doubts, there are millions to help out there. Alakh Sir being one of the best in them. All the best!"
    },
    {
      "comment_id": "UgzL8sUDoNVyTuqgbXV4AaABAg.9DJgvr5184l9Re71UC-h4L",
      "parent_id": "UgzL8sUDoNVyTuqgbXV4AaABAg",
      "comment_type": "reply",
      "author": "@iitdelhi9038",
      "likes": 71,
      "published_at": "2021-08-30T02:15:49Z",
      "timestamp_refs": [],
      "text": "@abdullah.3549 IT DOES*NT MATTER U R MUSLIM ,BUT IT MATTERS U R STUDENT. DON*T THINK ABOUT CAST JUST STUDY AND MAKE COUNTRY PROUD",
      "parent_context": "To the one's studying in class 11 , please clear every topic of class 11 while you are in class 11. Don't be a fool like us. Don't think about drop year. Do it in a go. You get 2 years, put in your everything. Otherwise you'll regret it later. If any doubts, there are millions to help out there. Alakh Sir being one of the best in them. All the best!"
    },
    {
      "comment_id": "UgzL8sUDoNVyTuqgbXV4AaABAg.9DJgvr5184l9RhjetbYTnr",
      "parent_id": "UgzL8sUDoNVyTuqgbXV4AaABAg",
      "comment_type": "reply",
      "author": "@nitesh7052",
      "likes": 11,
      "published_at": "2021-08-31T11:59:51Z",
      "timestamp_refs": [],
      "text": "@extreme2142 Thanks bhaiya, l want to clear jee main presently studying in 11th class, all topics are logical and hard😞😞",
      "parent_context": "To the one's studying in class 11 , please clear every topic of class 11 while you are in class 11. Don't be a fool like us. Don't think about drop year. Do it in a go. You get 2 years, put in your everything. Otherwise you'll regret it later. If any doubts, there are millions to help out there. Alakh Sir being one of the best in them. All the best!"
    },
    {
      "comment_id": "UgzL8sUDoNVyTuqgbXV4AaABAg.9DJgvr5184l9RkUhpHCJj_",
      "parent_id": "UgzL8sUDoNVyTuqgbXV4AaABAg",
      "comment_type": "reply",
      "author": "@RizzK452",
      "likes": 44,
      "published_at": "2021-09-01T13:38:09Z",
      "timestamp_refs": [],
      "text": "Dear my gut feelings are telling me that you have spent your class 11 fangirling over BTS 😁",
      "parent_context": "To the one's studying in class 11 , please clear every topic of class 11 while you are in class 11. Don't be a fool like us. Don't think about drop year. Do it in a go. You get 2 years, put in your everything. Otherwise you'll regret it later. If any doubts, there are millions to help out there. Alakh Sir being one of the best in them. All the best!"
    },
    {
      "comment_id": "UgzL8sUDoNVyTuqgbXV4AaABAg.9DJgvr5184l9Rktl163Mgw",
      "parent_id": "UgzL8sUDoNVyTuqgbXV4AaABAg",
      "comment_type": "reply",
      "author": "@tumpi8051",
      "likes": 25,
      "published_at": "2021-09-01T17:25:47Z",
      "timestamp_refs": [],
      "text": "@RizzK452 😳😳**profused sweating*** you're right😂",
      "parent_context": "To the one's studying in class 11 , please clear every topic of class 11 while you are in class 11. Don't be a fool like us. Don't think about drop year. Do it in a go. You get 2 years, put in your everything. Otherwise you'll regret it later. If any doubts, there are millions to help out there. Alakh Sir being one of the best in them. All the best!"
    },
    {
      "comment_id": "UgzL8sUDoNVyTuqgbXV4AaABAg.9DJgvr5184l9RrW4yT-jfv",
      "parent_id": "UgzL8sUDoNVyTuqgbXV4AaABAg",
      "comment_type": "reply",
      "author": "@rashmirekhasahu2453",
      "likes": 23,
      "published_at": "2021-09-04T07:04:53Z",
      "timestamp_refs": [],
      "text": "Yeah I know we need to concentrate 🙂..or else we'll be Jungshook by our results 😂🙃🙃",
      "parent_context": "To the one's studying in class 11 , please clear every topic of class 11 while you are in class 11. Don't be a fool like us. Don't think about drop year. Do it in a go. You get 2 years, put in your everything. Otherwise you'll regret it later. If any doubts, there are millions to help out there. Alakh Sir being one of the best in them. All the best!"
    },
    {
      "comment_id": "UgzL8sUDoNVyTuqgbXV4AaABAg.9DJgvr5184l9RxQ7RSvDMi",
      "parent_id": "UgzL8sUDoNVyTuqgbXV4AaABAg",
      "comment_type": "reply",
      "author": "@munmundas3947",
      "likes": 3,
      "published_at": "2021-09-06T14:08:14Z",
      "timestamp_refs": [],
      "text": "Chup",
      "parent_context": "To the one's studying in class 11 , please clear every topic of class 11 while you are in class 11. Don't be a fool like us. Don't think about drop year. Do it in a go. You get 2 years, put in your everything. Otherwise you'll regret it later. If any doubts, there are millions to help out there. Alakh Sir being one of the best in them. All the best!"
    },
    {
      "comment_id": "UgzL8sUDoNVyTuqgbXV4AaABAg.9DJgvr5184l9S2DaMdzuA0",
      "parent_id": "UgzL8sUDoNVyTuqgbXV4AaABAg",
      "comment_type": "reply",
      "author": "@homecookedgoodness6331",
      "likes": 2,
      "published_at": "2021-09-08T20:14:10Z",
      "timestamp_refs": [],
      "text": "😊thank you",
      "parent_context": "To the one's studying in class 11 , please clear every topic of class 11 while you are in class 11. Don't be a fool like us. Don't think about drop year. Do it in a go. You get 2 years, put in your everything. Otherwise you'll regret it later. If any doubts, there are millions to help out there. Alakh Sir being one of the best in them. All the best!"
    },
    {
      "comment_id": "UgzL8sUDoNVyTuqgbXV4AaABAg.9DJgvr5184l9S4TmGMLbRR",
      "parent_id": "UgzL8sUDoNVyTuqgbXV4AaABAg",
      "comment_type": "reply",
      "author": "@MrArora-gd7zh",
      "likes": 5,
      "published_at": "2021-09-09T17:14:04Z",
      "timestamp_refs": [],
      "text": "Well I will do my best",
      "parent_context": "To the one's studying in class 11 , please clear every topic of class 11 while you are in class 11. Don't be a fool like us. Don't think about drop year. Do it in a go. You get 2 years, put in your everything. Otherwise you'll regret it later. If any doubts, there are millions to help out there. Alakh Sir being one of the best in them. All the best!"
    },
    {
      "comment_id": "UgzL8sUDoNVyTuqgbXV4AaABAg.9DJgvr5184l9SJ6Vm5wou8",
      "parent_id": "UgzL8sUDoNVyTuqgbXV4AaABAg",
      "comment_type": "reply",
      "author": "@Shinosuke101",
      "likes": 4,
      "published_at": "2021-09-15T09:39:19Z",
      "timestamp_refs": [],
      "text": "❤️ u",
      "parent_context": "To the one's studying in class 11 , please clear every topic of class 11 while you are in class 11. Don't be a fool like us. Don't think about drop year. Do it in a go. You get 2 years, put in your everything. Otherwise you'll regret it later. If any doubts, there are millions to help out there. Alakh Sir being one of the best in them. All the best!"
    },
    {
      "comment_id": "UgzL8sUDoNVyTuqgbXV4AaABAg.9DJgvr5184l9SnDkdUSL-_",
      "parent_id": "UgzL8sUDoNVyTuqgbXV4AaABAg",
      "comment_type": "reply",
      "author": "@salonisharma1841",
      "likes": 4,
      "published_at": "2021-09-27T11:39:07Z",
      "timestamp_refs": [],
      "text": "you are right...!!!",
      "parent_context": "To the one's studying in class 11 , please clear every topic of class 11 while you are in class 11. Don't be a fool like us. Don't think about drop year. Do it in a go. You get 2 years, put in your everything. Otherwise you'll regret it later. If any doubts, there are millions to help out there. Alakh Sir being one of the best in them. All the best!"
    },
    {
      "comment_id": "UgzL8sUDoNVyTuqgbXV4AaABAg.9DJgvr5184l9SwrLW1wKno",
      "parent_id": "UgzL8sUDoNVyTuqgbXV4AaABAg",
      "comment_type": "reply",
      "author": "@rockprash4225",
      "likes": 1,
      "published_at": "2021-10-01T05:26:58Z",
      "timestamp_refs": [],
      "text": "Sahi khala ho",
      "parent_context": "To the one's studying in class 11 , please clear every topic of class 11 while you are in class 11. Don't be a fool like us. Don't think about drop year. Do it in a go. You get 2 years, put in your everything. Otherwise you'll regret it later. If any doubts, there are millions to help out there. Alakh Sir being one of the best in them. All the best!"
    },
    {
      "comment_id": "UgzL8sUDoNVyTuqgbXV4AaABAg.9DJgvr5184l9Sy2GG_Oal1",
      "parent_id": "UgzL8sUDoNVyTuqgbXV4AaABAg",
      "comment_type": "reply",
      "author": "@vanshika9845",
      "likes": 3,
      "published_at": "2021-10-01T16:30:21Z",
      "timestamp_refs": [],
      "text": "@electric_deer2007 same 🙄",
      "parent_context": "To the one's studying in class 11 , please clear every topic of class 11 while you are in class 11. Don't be a fool like us. Don't think about drop year. Do it in a go. You get 2 years, put in your everything. Otherwise you'll regret it later. If any doubts, there are millions to help out there. Alakh Sir being one of the best in them. All the best!"
    },
    {
      "comment_id": "UgzL8sUDoNVyTuqgbXV4AaABAg.9DJgvr5184l9T4KUFSg50U",
      "parent_id": "UgzL8sUDoNVyTuqgbXV4AaABAg",
      "comment_type": "reply",
      "author": "@snehathakur3334",
      "likes": 8,
      "published_at": "2021-10-04T12:24:14Z",
      "timestamp_refs": [],
      "text": "Are u bts army??",
      "parent_context": "To the one's studying in class 11 , please clear every topic of class 11 while you are in class 11. Don't be a fool like us. Don't think about drop year. Do it in a go. You get 2 years, put in your everything. Otherwise you'll regret it later. If any doubts, there are millions to help out there. Alakh Sir being one of the best in them. All the best!"
    },
    {
      "comment_id": "UgzL8sUDoNVyTuqgbXV4AaABAg.9DJgvr5184l9T4L9FY18nc",
      "parent_id": "UgzL8sUDoNVyTuqgbXV4AaABAg",
      "comment_type": "reply",
      "author": "@salonisharma1841",
      "likes": 8,
      "published_at": "2021-10-04T12:30:06Z",
      "timestamp_refs": [],
      "text": "@snehathakur3334 Yess ...💜 and uh ?",
      "parent_context": "To the one's studying in class 11 , please clear every topic of class 11 while you are in class 11. Don't be a fool like us. Don't think about drop year. Do it in a go. You get 2 years, put in your everything. Otherwise you'll regret it later. If any doubts, there are millions to help out there. Alakh Sir being one of the best in them. All the best!"
    },
    {
      "comment_id": "UgzL8sUDoNVyTuqgbXV4AaABAg.9DJgvr5184l9T4ORAWqA-p",
      "parent_id": "UgzL8sUDoNVyTuqgbXV4AaABAg",
      "comment_type": "reply",
      "author": "@snehathakur3334",
      "likes": 5,
      "published_at": "2021-10-04T12:58:46Z",
      "timestamp_refs": [],
      "text": "@salonisharma1841 i'm an army too💜💜",
      "parent_context": "To the one's studying in class 11 , please clear every topic of class 11 while you are in class 11. Don't be a fool like us. Don't think about drop year. Do it in a go. You get 2 years, put in your everything. Otherwise you'll regret it later. If any doubts, there are millions to help out there. Alakh Sir being one of the best in them. All the best!"
    },
    {
      "comment_id": "UgzL8sUDoNVyTuqgbXV4AaABAg.9DJgvr5184l9T5f0tuEczb",
      "parent_id": "UgzL8sUDoNVyTuqgbXV4AaABAg",
      "comment_type": "reply",
      "author": "@AloneBoy-bm6oo",
      "likes": 1,
      "published_at": "2021-10-05T00:51:42Z",
      "timestamp_refs": [],
      "text": "Thanks",
      "parent_context": "To the one's studying in class 11 , please clear every topic of class 11 while you are in class 11. Don't be a fool like us. Don't think about drop year. Do it in a go. You get 2 years, put in your everything. Otherwise you'll regret it later. If any doubts, there are millions to help out there. Alakh Sir being one of the best in them. All the best!"
    },
    {
      "comment_id": "UgzL8sUDoNVyTuqgbXV4AaABAg.9DJgvr5184l9T7k-URZ1ev",
      "parent_id": "UgzL8sUDoNVyTuqgbXV4AaABAg",
      "comment_type": "reply",
      "author": "@kenadams3069",
      "likes": 0,
      "published_at": "2021-10-05T20:13:41Z",
      "timestamp_refs": [],
      "text": "Ok thank-you ❤️",
      "parent_context": "To the one's studying in class 11 , please clear every topic of class 11 while you are in class 11. Don't be a fool like us. Don't think about drop year. Do it in a go. You get 2 years, put in your everything. Otherwise you'll regret it later. If any doubts, there are millions to help out there. Alakh Sir being one of the best in them. All the best!"
    },
    {
      "comment_id": "UgzL8sUDoNVyTuqgbXV4AaABAg.9DJgvr5184l9T90AHkn06l",
      "parent_id": "UgzL8sUDoNVyTuqgbXV4AaABAg",
      "comment_type": "reply",
      "author": "@snehathakur3334",
      "likes": 3,
      "published_at": "2021-10-06T08:02:57Z",
      "timestamp_refs": [],
      "text": "@iu3503 💜💜🥰🥰",
      "parent_context": "To the one's studying in class 11 , please clear every topic of class 11 while you are in class 11. Don't be a fool like us. Don't think about drop year. Do it in a go. You get 2 years, put in your everything. Otherwise you'll regret it later. If any doubts, there are millions to help out there. Alakh Sir being one of the best in them. All the best!"
    },
    {
      "comment_id": "UgzL8sUDoNVyTuqgbXV4AaABAg.9DJgvr5184l9T90VIgaCL2",
      "parent_id": "UgzL8sUDoNVyTuqgbXV4AaABAg",
      "comment_type": "reply",
      "author": "@snehathakur3334",
      "likes": 1,
      "published_at": "2021-10-06T08:05:49Z",
      "timestamp_refs": [],
      "text": "@iu3503 yeah I have",
      "parent_context": "To the one's studying in class 11 , please clear every topic of class 11 while you are in class 11. Don't be a fool like us. Don't think about drop year. Do it in a go. You get 2 years, put in your everything. Otherwise you'll regret it later. If any doubts, there are millions to help out there. Alakh Sir being one of the best in them. All the best!"
    },
    {
      "comment_id": "UgzL8sUDoNVyTuqgbXV4AaABAg.9DJgvr5184l9T9wVHHAiFh",
      "parent_id": "UgzL8sUDoNVyTuqgbXV4AaABAg",
      "comment_type": "reply",
      "author": "@pwguide7.5kviews89",
      "likes": 0,
      "published_at": "2021-10-06T16:41:22Z",
      "timestamp_refs": [],
      "text": "Hi 🌹🌹🌹",
      "parent_context": "To the one's studying in class 11 , please clear every topic of class 11 while you are in class 11. Don't be a fool like us. Don't think about drop year. Do it in a go. You get 2 years, put in your everything. Otherwise you'll regret it later. If any doubts, there are millions to help out there. Alakh Sir being one of the best in them. All the best!"
    },
    {
      "comment_id": "UgzL8sUDoNVyTuqgbXV4AaABAg.9DJgvr5184l9THXfM_0wCX",
      "parent_id": "UgzL8sUDoNVyTuqgbXV4AaABAg",
      "comment_type": "reply",
      "author": "@anurohithakakollu4372",
      "likes": 0,
      "published_at": "2021-10-09T15:29:37Z",
      "timestamp_refs": [],
      "text": "Thank you brother/sister",
      "parent_context": "To the one's studying in class 11 , please clear every topic of class 11 while you are in class 11. Don't be a fool like us. Don't think about drop year. Do it in a go. You get 2 years, put in your everything. Otherwise you'll regret it later. If any doubts, there are millions to help out there. Alakh Sir being one of the best in them. All the best!"
    },
    {
      "comment_id": "UgzL8sUDoNVyTuqgbXV4AaABAg.9DJgvr5184l9THiJu-r8uQ",
      "parent_id": "UgzL8sUDoNVyTuqgbXV4AaABAg",
      "comment_type": "reply",
      "author": "@tanisha5554",
      "likes": 1,
      "published_at": "2021-10-09T17:11:24Z",
      "timestamp_refs": [],
      "text": "Thanks much for sharing this!",
      "parent_context": "To the one's studying in class 11 , please clear every topic of class 11 while you are in class 11. Don't be a fool like us. Don't think about drop year. Do it in a go. You get 2 years, put in your everything. Otherwise you'll regret it later. If any doubts, there are millions to help out there. Alakh Sir being one of the best in them. All the best!"
    },
    {
      "comment_id": "UgzL8sUDoNVyTuqgbXV4AaABAg.9DJgvr5184l9TVkHOYhiaM",
      "parent_id": "UgzL8sUDoNVyTuqgbXV4AaABAg",
      "comment_type": "reply",
      "author": "@aiswaryapriyadarsindandia5098",
      "likes": 2,
      "published_at": "2021-10-15T03:57:54Z",
      "timestamp_refs": [],
      "text": "Achha he but i am in hostel so there phone is not allowed, how can i just make my concepts crystal clear. ???",
      "parent_context": "To the one's studying in class 11 , please clear every topic of class 11 while you are in class 11. Don't be a fool like us. Don't think about drop year. Do it in a go. You get 2 years, put in your everything. Otherwise you'll regret it later. If any doubts, there are millions to help out there. Alakh Sir being one of the best in them. All the best!"
    },
    {
      "comment_id": "UgzL8sUDoNVyTuqgbXV4AaABAg.9DJgvr5184l9TfNRQ3s5lF",
      "parent_id": "UgzL8sUDoNVyTuqgbXV4AaABAg",
      "comment_type": "reply",
      "author": "@aakanshakasera3168",
      "likes": 9,
      "published_at": "2021-10-19T07:01:12Z",
      "timestamp_refs": [],
      "text": "@nitesh7052 I am also in 11th class and now it seems difficult to study for jee ,and i am not even going to any coaching institute just taking lectures from sir's old videos . Sometimes i do study for 8hours straight and sometimes got distracted and don't study for even 1hour . Too much stressful 😣😔",
      "parent_context": "To the one's studying in class 11 , please clear every topic of class 11 while you are in class 11. Don't be a fool like us. Don't think about drop year. Do it in a go. You get 2 years, put in your everything. Otherwise you'll regret it later. If any doubts, there are millions to help out there. Alakh Sir being one of the best in them. All the best!"
    },
    {
      "comment_id": "UgzL8sUDoNVyTuqgbXV4AaABAg.9DJgvr5184l9TfO6Yj_3pl",
      "parent_id": "UgzL8sUDoNVyTuqgbXV4AaABAg",
      "comment_type": "reply",
      "author": "@nitesh7052",
      "likes": 1,
      "published_at": "2021-10-19T07:07:05Z",
      "timestamp_refs": [],
      "text": "@aakanshakasera3168 same here",
      "parent_context": "To the one's studying in class 11 , please clear every topic of class 11 while you are in class 11. Don't be a fool like us. Don't think about drop year. Do it in a go. You get 2 years, put in your everything. Otherwise you'll regret it later. If any doubts, there are millions to help out there. Alakh Sir being one of the best in them. All the best!"
    },
    {
      "comment_id": "UgzL8sUDoNVyTuqgbXV4AaABAg.9DJgvr5184l9TiXfz1B9LF",
      "parent_id": "UgzL8sUDoNVyTuqgbXV4AaABAg",
      "comment_type": "reply",
      "author": "@Its_verma_amn",
      "likes": 2,
      "published_at": "2021-10-20T12:28:26Z",
      "timestamp_refs": [],
      "text": "@saipriyabura5605 sahi keho gye",
      "parent_context": "To the one's studying in class 11 , please clear every topic of class 11 while you are in class 11. Don't be a fool like us. Don't think about drop year. Do it in a go. You get 2 years, put in your everything. Otherwise you'll regret it later. If any doubts, there are millions to help out there. Alakh Sir being one of the best in them. All the best!"
    },
    {
      "comment_id": "UgzL8sUDoNVyTuqgbXV4AaABAg.9DJgvr5184l9TptXqnY0Yc",
      "parent_id": "UgzL8sUDoNVyTuqgbXV4AaABAg",
      "comment_type": "reply",
      "author": "@aakanshakasera3168",
      "likes": 0,
      "published_at": "2021-10-23T09:02:51Z",
      "timestamp_refs": [],
      "text": "@Vaibhav Mishra tumhe lecture ke sath sath notes banane chahie",
      "parent_context": "To the one's studying in class 11 , please clear every topic of class 11 while you are in class 11. Don't be a fool like us. Don't think about drop year. Do it in a go. You get 2 years, put in your everything. Otherwise you'll regret it later. If any doubts, there are millions to help out there. Alakh Sir being one of the best in them. All the best!"
    },
    {
      "comment_id": "UgzL8sUDoNVyTuqgbXV4AaABAg.9DJgvr5184l9TqcSFi_ALU",
      "parent_id": "UgzL8sUDoNVyTuqgbXV4AaABAg",
      "comment_type": "reply",
      "author": "@vijaysharma4843",
      "likes": 1,
      "published_at": "2021-10-23T15:52:46Z",
      "timestamp_refs": [],
      "text": "Thanx bro 🤜",
      "parent_context": "To the one's studying in class 11 , please clear every topic of class 11 while you are in class 11. Don't be a fool like us. Don't think about drop year. Do it in a go. You get 2 years, put in your everything. Otherwise you'll regret it later. If any doubts, there are millions to help out there. Alakh Sir being one of the best in them. All the best!"
    },
    {
      "comment_id": "UgzL8sUDoNVyTuqgbXV4AaABAg.9DJgvr5184l9U6T7oqxVN4",
      "parent_id": "UgzL8sUDoNVyTuqgbXV4AaABAg",
      "comment_type": "reply",
      "author": "@ashugaming7462",
      "likes": 1,
      "published_at": "2021-10-30T04:49:41Z",
      "timestamp_refs": [],
      "text": "@extreme2142 Are chemistry and physics that r taught by alakh sir is sufficient for neet??",
      "parent_context": "To the one's studying in class 11 , please clear every topic of class 11 while you are in class 11. Don't be a fool like us. Don't think about drop year. Do it in a go. You get 2 years, put in your everything. Otherwise you'll regret it later. If any doubts, there are millions to help out there. Alakh Sir being one of the best in them. All the best!"
    },
    {
      "comment_id": "UgzL8sUDoNVyTuqgbXV4AaABAg.9DJgvr5184l9UBthoWNeBj",
      "parent_id": "UgzL8sUDoNVyTuqgbXV4AaABAg",
      "comment_type": "reply",
      "author": "@bang10sonyeondan25",
      "likes": 2,
      "published_at": "2021-11-01T07:26:52Z",
      "timestamp_refs": [],
      "text": "Tq for your advice 💜",
      "parent_context": "To the one's studying in class 11 , please clear every topic of class 11 while you are in class 11. Don't be a fool like us. Don't think about drop year. Do it in a go. You get 2 years, put in your everything. Otherwise you'll regret it later. If any doubts, there are millions to help out there. Alakh Sir being one of the best in them. All the best!"
    },
    {
      "comment_id": "UgzL8sUDoNVyTuqgbXV4AaABAg.9DJgvr5184l9UBu5Pwny4-",
      "parent_id": "UgzL8sUDoNVyTuqgbXV4AaABAg",
      "comment_type": "reply",
      "author": "@bang10sonyeondan25",
      "likes": 7,
      "published_at": "2021-11-01T07:30:14Z",
      "timestamp_refs": [],
      "text": "What do you do to not get distracted from kpop and concentrate on studies? 😂",
      "parent_context": "To the one's studying in class 11 , please clear every topic of class 11 while you are in class 11. Don't be a fool like us. Don't think about drop year. Do it in a go. You get 2 years, put in your everything. Otherwise you'll regret it later. If any doubts, there are millions to help out there. Alakh Sir being one of the best in them. All the best!"
    },
    {
      "comment_id": "UgzL8sUDoNVyTuqgbXV4AaABAg.9DJgvr5184l9UBxDmATNih",
      "parent_id": "UgzL8sUDoNVyTuqgbXV4AaABAg",
      "comment_type": "reply",
      "author": "@saritayadav1266",
      "likes": 0,
      "published_at": "2021-11-01T07:57:35Z",
      "timestamp_refs": [],
      "text": "Thank you ❤️",
      "parent_context": "To the one's studying in class 11 , please clear every topic of class 11 while you are in class 11. Don't be a fool like us. Don't think about drop year. Do it in a go. You get 2 years, put in your everything. Otherwise you'll regret it later. If any doubts, there are millions to help out there. Alakh Sir being one of the best in them. All the best!"
    },
    {
      "comment_id": "UgzL8sUDoNVyTuqgbXV4AaABAg.9DJgvr5184l9UCcLr8h8UH",
      "parent_id": "UgzL8sUDoNVyTuqgbXV4AaABAg",
      "comment_type": "reply",
      "author": "@snehagill5246",
      "likes": 0,
      "published_at": "2021-11-01T14:14:26Z",
      "timestamp_refs": [],
      "text": "Please tell me channel for s block and p block and other chapters which alakh sir is not teaching",
      "parent_context": "To the one's studying in class 11 , please clear every topic of class 11 while you are in class 11. Don't be a fool like us. Don't think about drop year. Do it in a go. You get 2 years, put in your everything. Otherwise you'll regret it later. If any doubts, there are millions to help out there. Alakh Sir being one of the best in them. All the best!"
    },
    {
      "comment_id": "UgzL8sUDoNVyTuqgbXV4AaABAg.9DJgvr5184l9URlQyPQ-5F",
      "parent_id": "UgzL8sUDoNVyTuqgbXV4AaABAg",
      "comment_type": "reply",
      "author": "@thelord-yx1nj",
      "likes": 0,
      "published_at": "2021-11-07T11:22:23Z",
      "timestamp_refs": [],
      "text": "tnq so much 😀",
      "parent_context": "To the one's studying in class 11 , please clear every topic of class 11 while you are in class 11. Don't be a fool like us. Don't think about drop year. Do it in a go. You get 2 years, put in your everything. Otherwise you'll regret it later. If any doubts, there are millions to help out there. Alakh Sir being one of the best in them. All the best!"
    },
    {
      "comment_id": "UgzL8sUDoNVyTuqgbXV4AaABAg.9DJgvr5184l9US2JY-GH7U",
      "parent_id": "UgzL8sUDoNVyTuqgbXV4AaABAg",
      "comment_type": "reply",
      "author": "@SilverGate007",
      "likes": 7,
      "published_at": "2021-11-07T13:58:39Z",
      "timestamp_refs": [],
      "text": "These bts bots ain't gonna make it ....... thanks to u...the competition reduces to a great extent",
      "parent_context": "To the one's studying in class 11 , please clear every topic of class 11 while you are in class 11. Don't be a fool like us. Don't think about drop year. Do it in a go. You get 2 years, put in your everything. Otherwise you'll regret it later. If any doubts, there are millions to help out there. Alakh Sir being one of the best in them. All the best!"
    },
    {
      "comment_id": "UgzL8sUDoNVyTuqgbXV4AaABAg.9DJgvr5184l9U_2Q39Hjfj",
      "parent_id": "UgzL8sUDoNVyTuqgbXV4AaABAg",
      "comment_type": "reply",
      "author": "@Ichigo-dh9rd",
      "likes": 9,
      "published_at": "2021-11-10T16:33:28Z",
      "timestamp_refs": [],
      "text": "@SilverGate007 there are bts fans in aiims delhi tho 🤔 saw few of them dancing to kpop at fests",
      "parent_context": "To the one's studying in class 11 , please clear every topic of class 11 while you are in class 11. Don't be a fool like us. Don't think about drop year. Do it in a go. You get 2 years, put in your everything. Otherwise you'll regret it later. If any doubts, there are millions to help out there. Alakh Sir being one of the best in them. All the best!"
    },
    {
      "comment_id": "UgzL8sUDoNVyTuqgbXV4AaABAg.9DJgvr5184l9Ug5_JeuPKJ",
      "parent_id": "UgzL8sUDoNVyTuqgbXV4AaABAg",
      "comment_type": "reply",
      "author": "@11sunamdas.xi.b.98",
      "likes": 1,
      "published_at": "2021-11-13T10:15:46Z",
      "timestamp_refs": [],
      "text": "Ekdom keep quit...and stop giving advice....if I see further any advice then u see.",
      "parent_context": "To the one's studying in class 11 , please clear every topic of class 11 while you are in class 11. Don't be a fool like us. Don't think about drop year. Do it in a go. You get 2 years, put in your everything. Otherwise you'll regret it later. If any doubts, there are millions to help out there. Alakh Sir being one of the best in them. All the best!"
    },
    {
      "comment_id": "UgzL8sUDoNVyTuqgbXV4AaABAg.9DJgvr5184l9UgXF2cCzp7",
      "parent_id": "UgzL8sUDoNVyTuqgbXV4AaABAg",
      "comment_type": "reply",
      "author": "@Anonymous-sf8mn",
      "likes": 0,
      "published_at": "2021-11-13T14:17:32Z",
      "timestamp_refs": [],
      "text": "Exactly 🥺",
      "parent_context": "To the one's studying in class 11 , please clear every topic of class 11 while you are in class 11. Don't be a fool like us. Don't think about drop year. Do it in a go. You get 2 years, put in your everything. Otherwise you'll regret it later. If any doubts, there are millions to help out there. Alakh Sir being one of the best in them. All the best!"
    },
    {
      "comment_id": "UgzL8sUDoNVyTuqgbXV4AaABAg.9DJgvr5184l9UlfHdXPtAM",
      "parent_id": "UgzL8sUDoNVyTuqgbXV4AaABAg",
      "comment_type": "reply",
      "author": "@bunnyuknow2033",
      "likes": 4,
      "published_at": "2021-11-15T14:12:44Z",
      "timestamp_refs": [],
      "text": "Army 😌💜",
      "parent_context": "To the one's studying in class 11 , please clear every topic of class 11 while you are in class 11. Don't be a fool like us. Don't think about drop year. Do it in a go. You get 2 years, put in your everything. Otherwise you'll regret it later. If any doubts, there are millions to help out there. Alakh Sir being one of the best in them. All the best!"
    },
    {
      "comment_id": "UgzL8sUDoNVyTuqgbXV4AaABAg.9DJgvr5184l9V5kfTSwotB",
      "parent_id": "UgzL8sUDoNVyTuqgbXV4AaABAg",
      "comment_type": "reply",
      "author": "@taniya1386",
      "likes": 0,
      "published_at": "2021-11-23T18:43:52Z",
      "timestamp_refs": [],
      "text": "U scared me",
      "parent_context": "To the one's studying in class 11 , please clear every topic of class 11 while you are in class 11. Don't be a fool like us. Don't think about drop year. Do it in a go. You get 2 years, put in your everything. Otherwise you'll regret it later. If any doubts, there are millions to help out there. Alakh Sir being one of the best in them. All the best!"
    },
    {
      "comment_id": "UgzL8sUDoNVyTuqgbXV4AaABAg.9DJgvr5184l9VSG2tr-6Tp",
      "parent_id": "UgzL8sUDoNVyTuqgbXV4AaABAg",
      "comment_type": "reply",
      "author": "@ronakjunwal7780",
      "likes": 0,
      "published_at": "2021-12-02T12:30:06Z",
      "timestamp_refs": [],
      "text": "THANK YOU BROTHER",
      "parent_context": "To the one's studying in class 11 , please clear every topic of class 11 while you are in class 11. Don't be a fool like us. Don't think about drop year. Do it in a go. You get 2 years, put in your everything. Otherwise you'll regret it later. If any doubts, there are millions to help out there. Alakh Sir being one of the best in them. All the best!"
    },
    {
      "comment_id": "UgzL8sUDoNVyTuqgbXV4AaABAg.9DJgvr5184l9Vk1qnGjvOw",
      "parent_id": "UgzL8sUDoNVyTuqgbXV4AaABAg",
      "comment_type": "reply",
      "author": "@moazzamalig1485",
      "likes": 0,
      "published_at": "2021-12-09T19:31:33Z",
      "timestamp_refs": [],
      "text": "Ok dear",
      "parent_context": "To the one's studying in class 11 , please clear every topic of class 11 while you are in class 11. Don't be a fool like us. Don't think about drop year. Do it in a go. You get 2 years, put in your everything. Otherwise you'll regret it later. If any doubts, there are millions to help out there. Alakh Sir being one of the best in them. All the best!"
    },
    {
      "comment_id": "UgzL8sUDoNVyTuqgbXV4AaABAg.9DJgvr5184l9VqS-t4nxFU",
      "parent_id": "UgzL8sUDoNVyTuqgbXV4AaABAg",
      "comment_type": "reply",
      "author": "@suyashpandey4367",
      "likes": 0,
      "published_at": "2021-12-12T07:15:34Z",
      "timestamp_refs": [],
      "text": "factos",
      "parent_context": "To the one's studying in class 11 , please clear every topic of class 11 while you are in class 11. Don't be a fool like us. Don't think about drop year. Do it in a go. You get 2 years, put in your everything. Otherwise you'll regret it later. If any doubts, there are millions to help out there. Alakh Sir being one of the best in them. All the best!"
    },
    {
      "comment_id": "UgzL8sUDoNVyTuqgbXV4AaABAg.9DJgvr5184l9WMyozjJkQi",
      "parent_id": "UgzL8sUDoNVyTuqgbXV4AaABAg",
      "comment_type": "reply",
      "author": "@sumanag7343",
      "likes": 0,
      "published_at": "2021-12-25T07:45:59Z",
      "timestamp_refs": [],
      "text": "@electric_deer2007 bro just from boards then science is waste go for neet or jee i try to write neet",
      "parent_context": "To the one's studying in class 11 , please clear every topic of class 11 while you are in class 11. Don't be a fool like us. Don't think about drop year. Do it in a go. You get 2 years, put in your everything. Otherwise you'll regret it later. If any doubts, there are millions to help out there. Alakh Sir being one of the best in them. All the best!"
    },
    {
      "comment_id": "UgzL8sUDoNVyTuqgbXV4AaABAg.9DJgvr5184l9WMzdTVLrCp",
      "parent_id": "UgzL8sUDoNVyTuqgbXV4AaABAg",
      "comment_type": "reply",
      "author": "@electric_deer2007",
      "likes": 0,
      "published_at": "2021-12-25T07:53:09Z",
      "timestamp_refs": [],
      "text": "@sumanag7343 I am going to the US for undergraduate , I don't need JEE or neet",
      "parent_context": "To the one's studying in class 11 , please clear every topic of class 11 while you are in class 11. Don't be a fool like us. Don't think about drop year. Do it in a go. You get 2 years, put in your everything. Otherwise you'll regret it later. If any doubts, there are millions to help out there. Alakh Sir being one of the best in them. All the best!"
    },
    {
      "comment_id": "UgzL8sUDoNVyTuqgbXV4AaABAg.9DJgvr5184l9WX6V9Wi3oM",
      "parent_id": "UgzL8sUDoNVyTuqgbXV4AaABAg",
      "comment_type": "reply",
      "author": "@Infinity_prime_207",
      "likes": 0,
      "published_at": "2021-12-29T06:14:11Z",
      "timestamp_refs": [],
      "text": "@electric_deer2007 same... Then what do understand want to become?",
      "parent_context": "To the one's studying in class 11 , please clear every topic of class 11 while you are in class 11. Don't be a fool like us. Don't think about drop year. Do it in a go. You get 2 years, put in your everything. Otherwise you'll regret it later. If any doubts, there are millions to help out there. Alakh Sir being one of the best in them. All the best!"
    },
    {
      "comment_id": "UgzL8sUDoNVyTuqgbXV4AaABAg.9DJgvr5184l9WpixzDZvtG",
      "parent_id": "UgzL8sUDoNVyTuqgbXV4AaABAg",
      "comment_type": "reply",
      "author": "@GAXER_",
      "likes": 0,
      "published_at": "2022-01-05T21:04:37Z",
      "timestamp_refs": [],
      "text": "@abdullah.3549 wksm",
      "parent_context": "To the one's studying in class 11 , please clear every topic of class 11 while you are in class 11. Don't be a fool like us. Don't think about drop year. Do it in a go. You get 2 years, put in your everything. Otherwise you'll regret it later. If any doubts, there are millions to help out there. Alakh Sir being one of the best in them. All the best!"
    },
    {
      "comment_id": "UgzL8sUDoNVyTuqgbXV4AaABAg.9DJgvr5184l9XBCoAZ3k4h",
      "parent_id": "UgzL8sUDoNVyTuqgbXV4AaABAg",
      "comment_type": "reply",
      "author": "@ManuAyu255",
      "likes": 0,
      "published_at": "2022-01-14T14:37:27Z",
      "timestamp_refs": [],
      "text": "Thanks",
      "parent_context": "To the one's studying in class 11 , please clear every topic of class 11 while you are in class 11. Don't be a fool like us. Don't think about drop year. Do it in a go. You get 2 years, put in your everything. Otherwise you'll regret it later. If any doubts, there are millions to help out there. Alakh Sir being one of the best in them. All the best!"
    },
    {
      "comment_id": "UgzL8sUDoNVyTuqgbXV4AaABAg.9DJgvr5184l9XpZuAmVae8",
      "parent_id": "UgzL8sUDoNVyTuqgbXV4AaABAg",
      "comment_type": "reply",
      "author": "@incognit.0",
      "likes": 0,
      "published_at": "2022-01-30T16:08:06Z",
      "timestamp_refs": [],
      "text": "Yeah actually I am regretting when i am in bsc 🤧 🤧🤧",
      "parent_context": "To the one's studying in class 11 , please clear every topic of class 11 while you are in class 11. Don't be a fool like us. Don't think about drop year. Do it in a go. You get 2 years, put in your everything. Otherwise you'll regret it later. If any doubts, there are millions to help out there. Alakh Sir being one of the best in them. All the best!"
    },
    {
      "comment_id": "UgzL8sUDoNVyTuqgbXV4AaABAg.9DJgvr5184l9XqXOBFgRCx",
      "parent_id": "UgzL8sUDoNVyTuqgbXV4AaABAg",
      "comment_type": "reply",
      "author": "@sourcandy234-v8j",
      "likes": 2,
      "published_at": "2022-01-31T01:05:22Z",
      "timestamp_refs": [],
      "text": "Golden words Wish I could have read this before.",
      "parent_context": "To the one's studying in class 11 , please clear every topic of class 11 while you are in class 11. Don't be a fool like us. Don't think about drop year. Do it in a go. You get 2 years, put in your everything. Otherwise you'll regret it later. If any doubts, there are millions to help out there. Alakh Sir being one of the best in them. All the best!"
    },
    {
      "comment_id": "UgzL8sUDoNVyTuqgbXV4AaABAg.9DJgvr5184l9Y84tda9lk7",
      "parent_id": "UgzL8sUDoNVyTuqgbXV4AaABAg",
      "comment_type": "reply",
      "author": "@iwantcheesecake63",
      "likes": 0,
      "published_at": "2022-02-07T06:01:58Z",
      "timestamp_refs": [],
      "text": "I realized this after a failure Trying to make this failure a part of my success and I know it I will get it !!",
      "parent_context": "To the one's studying in class 11 , please clear every topic of class 11 while you are in class 11. Don't be a fool like us. Don't think about drop year. Do it in a go. You get 2 years, put in your everything. Otherwise you'll regret it later. If any doubts, there are millions to help out there. Alakh Sir being one of the best in them. All the best!"
    },
    {
      "comment_id": "UgzL8sUDoNVyTuqgbXV4AaABAg.9DJgvr5184l9Z4R3eb-_qT",
      "parent_id": "UgzL8sUDoNVyTuqgbXV4AaABAg",
      "comment_type": "reply",
      "author": "@snehalsawrn3171",
      "likes": 2,
      "published_at": "2022-03-02T16:30:08Z",
      "timestamp_refs": [],
      "text": "To all those who are saying I'm an army, Kahan posting hai aaplogon ka 🙃🙃 Or agr army me posting ho rakhi hai to chemistry kyu padhre ho aaplog 🙃🙂",
      "parent_context": "To the one's studying in class 11 , please clear every topic of class 11 while you are in class 11. Don't be a fool like us. Don't think about drop year. Do it in a go. You get 2 years, put in your everything. Otherwise you'll regret it later. If any doubts, there are millions to help out there. Alakh Sir being one of the best in them. All the best!"
    },
    {
      "comment_id": "UgzL8sUDoNVyTuqgbXV4AaABAg.9DJgvr5184l9Z4aPW4J14n",
      "parent_id": "UgzL8sUDoNVyTuqgbXV4AaABAg",
      "comment_type": "reply",
      "author": "@iwantcheesecake63",
      "likes": 2,
      "published_at": "2022-03-02T18:00:30Z",
      "timestamp_refs": [],
      "text": "@snehalsawrn3171 damnnn u got them😂",
      "parent_context": "To the one's studying in class 11 , please clear every topic of class 11 while you are in class 11. Don't be a fool like us. Don't think about drop year. Do it in a go. You get 2 years, put in your everything. Otherwise you'll regret it later. If any doubts, there are millions to help out there. Alakh Sir being one of the best in them. All the best!"
    },
    {
      "comment_id": "UgzL8sUDoNVyTuqgbXV4AaABAg.9DJgvr5184l9ZmxnTjR5ns",
      "parent_id": "UgzL8sUDoNVyTuqgbXV4AaABAg",
      "comment_type": "reply",
      "author": "@exercisevibes7728",
      "likes": 0,
      "published_at": "2022-03-20T08:50:42Z",
      "timestamp_refs": [],
      "text": "You're correct",
      "parent_context": "To the one's studying in class 11 , please clear every topic of class 11 while you are in class 11. Don't be a fool like us. Don't think about drop year. Do it in a go. You get 2 years, put in your everything. Otherwise you'll regret it later. If any doubts, there are millions to help out there. Alakh Sir being one of the best in them. All the best!"
    },
    {
      "comment_id": "UgzL8sUDoNVyTuqgbXV4AaABAg.9DJgvr5184l9ZuR-KgvW2L",
      "parent_id": "UgzL8sUDoNVyTuqgbXV4AaABAg",
      "comment_type": "reply",
      "author": "@GunjanR516",
      "likes": 3,
      "published_at": "2022-03-23T06:29:17Z",
      "timestamp_refs": [],
      "text": "Actually we are already aware about this fact but when we enter 11th suddenly it completely seems a new world... Personally I faced problem in understanding stuffs and also in understanding *how to study* this took a lot of time of many students it's ok if you face problem in starting we are atleast aware now about how to study",
      "parent_context": "To the one's studying in class 11 , please clear every topic of class 11 while you are in class 11. Don't be a fool like us. Don't think about drop year. Do it in a go. You get 2 years, put in your everything. Otherwise you'll regret it later. If any doubts, there are millions to help out there. Alakh Sir being one of the best in them. All the best!"
    },
    {
      "comment_id": "UgzL8sUDoNVyTuqgbXV4AaABAg.9DJgvr5184l9ZxNCcPDZjj",
      "parent_id": "UgzL8sUDoNVyTuqgbXV4AaABAg",
      "comment_type": "reply",
      "author": "@iwantcheesecake63",
      "likes": 2,
      "published_at": "2022-03-24T09:53:52Z",
      "timestamp_refs": [],
      "text": "@GunjanR516 true asf Suddenly things get so conceptual in 11th I think it's cuz of teachers. They should have cleared our concepts in 9th and 10th rather than making us learnnn the concepts",
      "parent_context": "To the one's studying in class 11 , please clear every topic of class 11 while you are in class 11. Don't be a fool like us. Don't think about drop year. Do it in a go. You get 2 years, put in your everything. Otherwise you'll regret it later. If any doubts, there are millions to help out there. Alakh Sir being one of the best in them. All the best!"
    },
    {
      "comment_id": "UgzL8sUDoNVyTuqgbXV4AaABAg.9DJgvr5184l9_BdLqdzFeE",
      "parent_id": "UgzL8sUDoNVyTuqgbXV4AaABAg",
      "comment_type": "reply",
      "author": "@freaky_samosa",
      "likes": 0,
      "published_at": "2022-03-30T08:12:17Z",
      "timestamp_refs": [],
      "text": "My 11th wasted due to covid and I'm currently in 12th and revising 11th syllabus for JEE MAINS what's your opinion about my status?",
      "parent_context": "To the one's studying in class 11 , please clear every topic of class 11 while you are in class 11. Don't be a fool like us. Don't think about drop year. Do it in a go. You get 2 years, put in your everything. Otherwise you'll regret it later. If any doubts, there are millions to help out there. Alakh Sir being one of the best in them. All the best!"
    },
    {
      "comment_id": "UgzL8sUDoNVyTuqgbXV4AaABAg.9DJgvr5184l9_BiNg88iCT",
      "parent_id": "UgzL8sUDoNVyTuqgbXV4AaABAg",
      "comment_type": "reply",
      "author": "@GunjanR516",
      "likes": 1,
      "published_at": "2022-03-30T08:56:14Z",
      "timestamp_refs": [],
      "text": "@iwantcheesecake63 they taught us basics but here you can see how deep the chemistry has gone like seriously we never thought As compared to 10th the syllabus is so much vast and we were not habitual to study so conceptually in 10th",
      "parent_context": "To the one's studying in class 11 , please clear every topic of class 11 while you are in class 11. Don't be a fool like us. Don't think about drop year. Do it in a go. You get 2 years, put in your everything. Otherwise you'll regret it later. If any doubts, there are millions to help out there. Alakh Sir being one of the best in them. All the best!"
    },
    {
      "comment_id": "UgzL8sUDoNVyTuqgbXV4AaABAg.9DJgvr5184l9_DknERqpas",
      "parent_id": "UgzL8sUDoNVyTuqgbXV4AaABAg",
      "comment_type": "reply",
      "author": "@wolfz_gmr",
      "likes": 1,
      "published_at": "2022-03-31T03:55:49Z",
      "timestamp_refs": [],
      "text": "Bhai Mera 11 gaya firse usi ko kar raha hu surface reading",
      "parent_context": "To the one's studying in class 11 , please clear every topic of class 11 while you are in class 11. Don't be a fool like us. Don't think about drop year. Do it in a go. You get 2 years, put in your everything. Otherwise you'll regret it later. If any doubts, there are millions to help out there. Alakh Sir being one of the best in them. All the best!"
    },
    {
      "comment_id": "UgzL8sUDoNVyTuqgbXV4AaABAg.9DJgvr5184l9_azCv88FQx",
      "parent_id": "UgzL8sUDoNVyTuqgbXV4AaABAg",
      "comment_type": "reply",
      "author": "@payeldhar4346",
      "likes": 0,
      "published_at": "2022-04-09T13:43:34Z",
      "timestamp_refs": [],
      "text": "You are totally right. I also couldn't predict how large the syllabus is and many topics of 11th are left. Now I really regret it so much and I was full of courage and confidance in the starting but now I am in 12 and loosing hope that if I can crack NEET 2023 or not 😔. So for my sister/brothers please study hard from the very starting and if you don't know how to study you can get help from YouTube 😀. All the best 👍. For boards , NEET/JEE",
      "parent_context": "To the one's studying in class 11 , please clear every topic of class 11 while you are in class 11. Don't be a fool like us. Don't think about drop year. Do it in a go. You get 2 years, put in your everything. Otherwise you'll regret it later. If any doubts, there are millions to help out there. Alakh Sir being one of the best in them. All the best!"
    },
    {
      "comment_id": "UgzL8sUDoNVyTuqgbXV4AaABAg.9DJgvr5184l9bI5vJKbnPF",
      "parent_id": "UgzL8sUDoNVyTuqgbXV4AaABAg",
      "comment_type": "reply",
      "author": "@BhaveshKumar-my2sx",
      "likes": 0,
      "published_at": "2022-05-21T13:28:54Z",
      "timestamp_refs": [],
      "text": "@rockworld7594 lol😅if u know concept then u can create definition in ur own language 😅😅",
      "parent_context": "To the one's studying in class 11 , please clear every topic of class 11 while you are in class 11. Don't be a fool like us. Don't think about drop year. Do it in a go. You get 2 years, put in your everything. Otherwise you'll regret it later. If any doubts, there are millions to help out there. Alakh Sir being one of the best in them. All the best!"
    },
    {
      "comment_id": "UgzL8sUDoNVyTuqgbXV4AaABAg.9DJgvr5184l9bPNIRvZ0Zr",
      "parent_id": "UgzL8sUDoNVyTuqgbXV4AaABAg",
      "comment_type": "reply",
      "author": "@priyajasminetoppo",
      "likes": 0,
      "published_at": "2022-05-24T09:15:26Z",
      "timestamp_refs": [],
      "text": "So true!! I am in class 12 currently and my time is getting consumed completing my backlog of class 11th during my class 12th boards",
      "parent_context": "To the one's studying in class 11 , please clear every topic of class 11 while you are in class 11. Don't be a fool like us. Don't think about drop year. Do it in a go. You get 2 years, put in your everything. Otherwise you'll regret it later. If any doubts, there are millions to help out there. Alakh Sir being one of the best in them. All the best!"
    },
    {
      "comment_id": "UgzL8sUDoNVyTuqgbXV4AaABAg.9DJgvr5184l9cC7z1p-BSb",
      "parent_id": "UgzL8sUDoNVyTuqgbXV4AaABAg",
      "comment_type": "reply",
      "author": "@subhamsarkar2455",
      "likes": 0,
      "published_at": "2022-06-13T02:22:51Z",
      "timestamp_refs": [],
      "text": "Thank you",
      "parent_context": "To the one's studying in class 11 , please clear every topic of class 11 while you are in class 11. Don't be a fool like us. Don't think about drop year. Do it in a go. You get 2 years, put in your everything. Otherwise you'll regret it later. If any doubts, there are millions to help out there. Alakh Sir being one of the best in them. All the best!"
    },
    {
      "comment_id": "UgzL8sUDoNVyTuqgbXV4AaABAg.9DJgvr5184l9cWNxGSiMr9",
      "parent_id": "UgzL8sUDoNVyTuqgbXV4AaABAg",
      "comment_type": "reply",
      "author": "@Blackberry578",
      "likes": 0,
      "published_at": "2022-06-20T23:07:13Z",
      "timestamp_refs": [],
      "text": "Really",
      "parent_context": "To the one's studying in class 11 , please clear every topic of class 11 while you are in class 11. Don't be a fool like us. Don't think about drop year. Do it in a go. You get 2 years, put in your everything. Otherwise you'll regret it later. If any doubts, there are millions to help out there. Alakh Sir being one of the best in them. All the best!"
    },
    {
      "comment_id": "UgzL8sUDoNVyTuqgbXV4AaABAg.9DJgvr5184l9cekRDvQb0t",
      "parent_id": "UgzL8sUDoNVyTuqgbXV4AaABAg",
      "comment_type": "reply",
      "author": "@546-anushkashirawale3",
      "likes": 5,
      "published_at": "2022-06-24T14:25:35Z",
      "timestamp_refs": [],
      "text": "Pw is really one of the best source to study, and kook on ur pfp 💜",
      "parent_context": "To the one's studying in class 11 , please clear every topic of class 11 while you are in class 11. Don't be a fool like us. Don't think about drop year. Do it in a go. You get 2 years, put in your everything. Otherwise you'll regret it later. If any doubts, there are millions to help out there. Alakh Sir being one of the best in them. All the best!"
    },
    {
      "comment_id": "UgzL8sUDoNVyTuqgbXV4AaABAg.9DJgvr5184l9dNZ22koXHs",
      "parent_id": "UgzL8sUDoNVyTuqgbXV4AaABAg",
      "comment_type": "reply",
      "author": "@uzumaki_barrage",
      "likes": 0,
      "published_at": "2022-07-12T09:22:22Z",
      "timestamp_refs": [],
      "text": "Jee 2022?",
      "parent_context": "To the one's studying in class 11 , please clear every topic of class 11 while you are in class 11. Don't be a fool like us. Don't think about drop year. Do it in a go. You get 2 years, put in your everything. Otherwise you'll regret it later. If any doubts, there are millions to help out there. Alakh Sir being one of the best in them. All the best!"
    },
    {
      "comment_id": "UgzL8sUDoNVyTuqgbXV4AaABAg.9DJgvr5184l9dgx0zopmOL",
      "parent_id": "UgzL8sUDoNVyTuqgbXV4AaABAg",
      "comment_type": "reply",
      "author": "@asharmuzammil7355",
      "likes": 0,
      "published_at": "2022-07-20T07:25:29Z",
      "timestamp_refs": [],
      "text": "Thank you for guidance ❤️👍🏼",
      "parent_context": "To the one's studying in class 11 , please clear every topic of class 11 while you are in class 11. Don't be a fool like us. Don't think about drop year. Do it in a go. You get 2 years, put in your everything. Otherwise you'll regret it later. If any doubts, there are millions to help out there. Alakh Sir being one of the best in them. All the best!"
    },
    {
      "comment_id": "UgzL8sUDoNVyTuqgbXV4AaABAg.9DJgvr5184l9e1OlhjefhT",
      "parent_id": "UgzL8sUDoNVyTuqgbXV4AaABAg",
      "comment_type": "reply",
      "author": "@rahulsadaram5805",
      "likes": 0,
      "published_at": "2022-07-28T15:20:43Z",
      "timestamp_refs": [],
      "text": "@saipriyabura5605 dil se bora lagta hai",
      "parent_context": "To the one's studying in class 11 , please clear every topic of class 11 while you are in class 11. Don't be a fool like us. Don't think about drop year. Do it in a go. You get 2 years, put in your everything. Otherwise you'll regret it later. If any doubts, there are millions to help out there. Alakh Sir being one of the best in them. All the best!"
    },
    {
      "comment_id": "UgzL8sUDoNVyTuqgbXV4AaABAg.9DJgvr5184l9e6q_epzlb1",
      "parent_id": "UgzL8sUDoNVyTuqgbXV4AaABAg",
      "comment_type": "reply",
      "author": "@titiksha9641",
      "likes": 2,
      "published_at": "2022-07-30T18:08:41Z",
      "timestamp_refs": [],
      "text": "Seriously army.... You said the perfect things because now I am a teachership aspirant and now I have to face 11th chemistry ..but I literally waste my 11th at that time Now it takes more times All thanks to sir Because of him now I clearing all my doubts and I know I can achive a good score in chemistry Thank you sir",
      "parent_context": "To the one's studying in class 11 , please clear every topic of class 11 while you are in class 11. Don't be a fool like us. Don't think about drop year. Do it in a go. You get 2 years, put in your everything. Otherwise you'll regret it later. If any doubts, there are millions to help out there. Alakh Sir being one of the best in them. All the best!"
    },
    {
      "comment_id": "UgzL8sUDoNVyTuqgbXV4AaABAg.9DJgvr5184l9eOQn23IRec",
      "parent_id": "UgzL8sUDoNVyTuqgbXV4AaABAg",
      "comment_type": "reply",
      "author": "@swastikajaiswal5693",
      "likes": 0,
      "published_at": "2022-08-06T14:00:54Z",
      "timestamp_refs": [],
      "text": "no frr",
      "parent_context": "To the one's studying in class 11 , please clear every topic of class 11 while you are in class 11. Don't be a fool like us. Don't think about drop year. Do it in a go. You get 2 years, put in your everything. Otherwise you'll regret it later. If any doubts, there are millions to help out there. Alakh Sir being one of the best in them. All the best!"
    },
    {
      "comment_id": "UgzL8sUDoNVyTuqgbXV4AaABAg.9DJgvr5184l9eTpiD9TlAX",
      "parent_id": "UgzL8sUDoNVyTuqgbXV4AaABAg",
      "comment_type": "reply",
      "author": "@nishchhalsrivastava4479",
      "likes": 0,
      "published_at": "2022-08-08T16:23:38Z",
      "timestamp_refs": [],
      "text": "Thankyou for your advice sir",
      "parent_context": "To the one's studying in class 11 , please clear every topic of class 11 while you are in class 11. Don't be a fool like us. Don't think about drop year. Do it in a go. You get 2 years, put in your everything. Otherwise you'll regret it later. If any doubts, there are millions to help out there. Alakh Sir being one of the best in them. All the best!"
    },
    {
      "comment_id": "UgzL8sUDoNVyTuqgbXV4AaABAg.9DJgvr5184l9efncpW3oIN",
      "parent_id": "UgzL8sUDoNVyTuqgbXV4AaABAg",
      "comment_type": "reply",
      "author": "@krishanaffgaming8079",
      "likes": 4,
      "published_at": "2022-08-13T17:15:33Z",
      "timestamp_refs": [],
      "text": "Me reading this after looking jk on icon...🤣🤣..,.. And hatts of to me for doing same mistake like her.,....🤣🤣🤣 behen tera dard mein samz sakti hu😢😭😓😞",
      "parent_context": "To the one's studying in class 11 , please clear every topic of class 11 while you are in class 11. Don't be a fool like us. Don't think about drop year. Do it in a go. You get 2 years, put in your everything. Otherwise you'll regret it later. If any doubts, there are millions to help out there. Alakh Sir being one of the best in them. All the best!"
    },
    {
      "comment_id": "UgzL8sUDoNVyTuqgbXV4AaABAg.9DJgvr5184l9ekTGKYGDWx",
      "parent_id": "UgzL8sUDoNVyTuqgbXV4AaABAg",
      "comment_type": "reply",
      "author": "@kamalkavin2470",
      "likes": 0,
      "published_at": "2022-08-15T12:45:03Z",
      "timestamp_refs": [],
      "text": "@electric_deer2007 set you focus and dreams higher",
      "parent_context": "To the one's studying in class 11 , please clear every topic of class 11 while you are in class 11. Don't be a fool like us. Don't think about drop year. Do it in a go. You get 2 years, put in your everything. Otherwise you'll regret it later. If any doubts, there are millions to help out there. Alakh Sir being one of the best in them. All the best!"
    },
    {
      "comment_id": "UgzL8sUDoNVyTuqgbXV4AaABAg.9DJgvr5184l9f9L-y-jaZ0",
      "parent_id": "UgzL8sUDoNVyTuqgbXV4AaABAg",
      "comment_type": "reply",
      "author": "@manojkandle7628",
      "likes": 0,
      "published_at": "2022-08-25T13:53:10Z",
      "timestamp_refs": [],
      "text": "Yaa bro ❤️",
      "parent_context": "To the one's studying in class 11 , please clear every topic of class 11 while you are in class 11. Don't be a fool like us. Don't think about drop year. Do it in a go. You get 2 years, put in your everything. Otherwise you'll regret it later. If any doubts, there are millions to help out there. Alakh Sir being one of the best in them. All the best!"
    },
    {
      "comment_id": "UgzL8sUDoNVyTuqgbXV4AaABAg.9DJgvr5184l9fUDjHRQAMm",
      "parent_id": "UgzL8sUDoNVyTuqgbXV4AaABAg",
      "comment_type": "reply",
      "author": "@anujrajput041",
      "likes": 0,
      "published_at": "2022-09-02T16:33:38Z",
      "timestamp_refs": [],
      "text": "Mtlb lena chahiye ki nii",
      "parent_context": "To the one's studying in class 11 , please clear every topic of class 11 while you are in class 11. Don't be a fool like us. Don't think about drop year. Do it in a go. You get 2 years, put in your everything. Otherwise you'll regret it later. If any doubts, there are millions to help out there. Alakh Sir being one of the best in them. All the best!"
    },
    {
      "comment_id": "UgzL8sUDoNVyTuqgbXV4AaABAg.9DJgvr5184l9fYE_xtaaQC",
      "parent_id": "UgzL8sUDoNVyTuqgbXV4AaABAg",
      "comment_type": "reply",
      "author": "@lipikadas4777",
      "likes": 3,
      "published_at": "2022-09-04T05:58:04Z",
      "timestamp_refs": [],
      "text": "@smileydiaries145 are Bhai us batch ka hu class 11 th mein hu aab chinta NAHI Karne ka Sirf padte Jao alakh sir ke saath",
      "parent_context": "To the one's studying in class 11 , please clear every topic of class 11 while you are in class 11. Don't be a fool like us. Don't think about drop year. Do it in a go. You get 2 years, put in your everything. Otherwise you'll regret it later. If any doubts, there are millions to help out there. Alakh Sir being one of the best in them. All the best!"
    },
    {
      "comment_id": "UgzL8sUDoNVyTuqgbXV4AaABAg.9DJgvr5184l9gExoVc1QD4",
      "parent_id": "UgzL8sUDoNVyTuqgbXV4AaABAg",
      "comment_type": "reply",
      "author": "@greenedsnowball",
      "likes": 2,
      "published_at": "2022-09-21T14:48:35Z",
      "timestamp_refs": [],
      "text": "💜 army detected opinion rejected",
      "parent_context": "To the one's studying in class 11 , please clear every topic of class 11 while you are in class 11. Don't be a fool like us. Don't think about drop year. Do it in a go. You get 2 years, put in your everything. Otherwise you'll regret it later. If any doubts, there are millions to help out there. Alakh Sir being one of the best in them. All the best!"
    },
    {
      "comment_id": "UgzL8sUDoNVyTuqgbXV4AaABAg.9DJgvr5184l9gUW-fwKKE4",
      "parent_id": "UgzL8sUDoNVyTuqgbXV4AaABAg",
      "comment_type": "reply",
      "author": "@Herdiaries7",
      "likes": 0,
      "published_at": "2022-09-27T15:44:41Z",
      "timestamp_refs": [],
      "text": "Thanks bro/sis ☺️",
      "parent_context": "To the one's studying in class 11 , please clear every topic of class 11 while you are in class 11. Don't be a fool like us. Don't think about drop year. Do it in a go. You get 2 years, put in your everything. Otherwise you'll regret it later. If any doubts, there are millions to help out there. Alakh Sir being one of the best in them. All the best!"
    },
    {
      "comment_id": "UgzL8sUDoNVyTuqgbXV4AaABAg.9DJgvr5184l9gUmlq_vj21",
      "parent_id": "UgzL8sUDoNVyTuqgbXV4AaABAg",
      "comment_type": "reply",
      "author": "@crisscrossn96",
      "likes": 0,
      "published_at": "2022-09-27T18:19:57Z",
      "timestamp_refs": [],
      "text": "I can see the pain in the comment thankyou so much",
      "parent_context": "To the one's studying in class 11 , please clear every topic of class 11 while you are in class 11. Don't be a fool like us. Don't think about drop year. Do it in a go. You get 2 years, put in your everything. Otherwise you'll regret it later. If any doubts, there are millions to help out there. Alakh Sir being one of the best in them. All the best!"
    },
    {
      "comment_id": "UgzL8sUDoNVyTuqgbXV4AaABAg.9DJgvr5184l9gqHW4Zx_HN",
      "parent_id": "UgzL8sUDoNVyTuqgbXV4AaABAg",
      "comment_type": "reply",
      "author": "@snehagupta3264",
      "likes": 0,
      "published_at": "2022-10-06T12:00:34Z",
      "timestamp_refs": [],
      "text": "Thank you 🥰",
      "parent_context": "To the one's studying in class 11 , please clear every topic of class 11 while you are in class 11. Don't be a fool like us. Don't think about drop year. Do it in a go. You get 2 years, put in your everything. Otherwise you'll regret it later. If any doubts, there are millions to help out there. Alakh Sir being one of the best in them. All the best!"
    },
    {
      "comment_id": "UgzL8sUDoNVyTuqgbXV4AaABAg.9DJgvr5184l9gxCYbRQF4j",
      "parent_id": "UgzL8sUDoNVyTuqgbXV4AaABAg",
      "comment_type": "reply",
      "author": "@RakhiKumari-wj7ii",
      "likes": 0,
      "published_at": "2022-10-09T04:31:55Z",
      "timestamp_refs": [],
      "text": "Right",
      "parent_context": "To the one's studying in class 11 , please clear every topic of class 11 while you are in class 11. Don't be a fool like us. Don't think about drop year. Do it in a go. You get 2 years, put in your everything. Otherwise you'll regret it later. If any doubts, there are millions to help out there. Alakh Sir being one of the best in them. All the best!"
    },
    {
      "comment_id": "Ugz_gzXdlct9JrkG1rR4AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@ArvindKumar-rn7cu",
      "likes": 1542,
      "published_at": "2020-12-18T07:15:01Z",
      "timestamp_refs": [],
      "text": "Teachers: ye special case hai ratlo Alakh sir: ye special case hai chlo samjhte hai👍👍",
      "parent_context": ""
    },
    {
      "comment_id": "Ugz_gzXdlct9JrkG1rR4AaABAg.9HP2ZfInb0H9XtdQyPHSqG",
      "parent_id": "Ugz_gzXdlct9JrkG1rR4AaABAg",
      "comment_type": "reply",
      "author": "@ojhasaini4203",
      "likes": 7,
      "published_at": "2022-02-01T06:04:38Z",
      "timestamp_refs": [],
      "text": "But sir HF ka stable structure dekhe toh f bich m hoga 🤔",
      "parent_context": "Teachers: ye special case hai ratlo Alakh sir: ye special case hai chlo samjhte hai👍👍"
    },
    {
      "comment_id": "Ugz_gzXdlct9JrkG1rR4AaABAg.9HP2ZfInb0H9jnt8kYN4NO",
      "parent_id": "Ugz_gzXdlct9JrkG1rR4AaABAg",
      "comment_type": "reply",
      "author": "@gigahuga123",
      "likes": 0,
      "published_at": "2022-12-19T03:14:38Z",
      "timestamp_refs": [],
      "text": "@ojhasaini4203 bruh h and f can never be on central lmao get ur facts right dumbass",
      "parent_context": "Teachers: ye special case hai ratlo Alakh sir: ye special case hai chlo samjhte hai👍👍"
    },
    {
      "comment_id": "Ugz_gzXdlct9JrkG1rR4AaABAg.9HP2ZfInb0H9xYSLAVVRll",
      "parent_id": "Ugz_gzXdlct9JrkG1rR4AaABAg",
      "comment_type": "reply",
      "author": "@RANDOMXT0098",
      "likes": 2,
      "published_at": "2023-11-25T17:23:21Z",
      "timestamp_refs": [],
      "text": "Chlo ma ise 999 se 1k krdeta hu😊",
      "parent_context": "Teachers: ye special case hai ratlo Alakh sir: ye special case hai chlo samjhte hai👍👍"
    },
    {
      "comment_id": "Ugxhd3Kk6-4aF_OezhR4AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@shivagupta7876",
      "likes": 2757,
      "published_at": "2019-11-06T19:17:33Z",
      "timestamp_refs": [],
      "text": "Other teachers after a 20 min lecture mene aapko iss topic ko ekdum depth Mei pada Diya Hai ... Alakh sir after 1hour mene aapko basic pada Diya hai... This make him great.....",
      "parent_context": ""
    },
    {
      "comment_id": "Ugxhd3Kk6-4aF_OezhR4AaABAg.91-lviLIpy294_mNbS0tuL",
      "parent_id": "Ugxhd3Kk6-4aF_OezhR4AaABAg",
      "comment_type": "reply",
      "author": "@harshvardhangoswami7248",
      "likes": 17,
      "published_at": "2020-02-03T17:47:35Z",
      "timestamp_refs": [],
      "text": "True",
      "parent_context": "Other teachers after a 20 min lecture mene aapko iss topic ko ekdum depth Mei pada Diya Hai ... Alakh sir after 1hour mene aapko basic pada Diya hai... This make him great....."
    },
    {
      "comment_id": "Ugxhd3Kk6-4aF_OezhR4AaABAg.91-lviLIpy295VH7a1XTX1",
      "parent_id": "Ugxhd3Kk6-4aF_OezhR4AaABAg",
      "comment_type": "reply",
      "author": "@lavanyarajesh1710",
      "likes": 28,
      "published_at": "2020-02-26T11:00:57Z",
      "timestamp_refs": [],
      "text": "Haa yaar I agree with you",
      "parent_context": "Other teachers after a 20 min lecture mene aapko iss topic ko ekdum depth Mei pada Diya Hai ... Alakh sir after 1hour mene aapko basic pada Diya hai... This make him great....."
    },
    {
      "comment_id": "Ugxhd3Kk6-4aF_OezhR4AaABAg.91-lviLIpy2963GUJ7QnbX",
      "parent_id": "Ugxhd3Kk6-4aF_OezhR4AaABAg",
      "comment_type": "reply",
      "author": "@sakshichaurasia246",
      "likes": 15,
      "published_at": "2020-03-11T10:27:59Z",
      "timestamp_refs": [],
      "text": "Yeee",
      "parent_context": "Other teachers after a 20 min lecture mene aapko iss topic ko ekdum depth Mei pada Diya Hai ... Alakh sir after 1hour mene aapko basic pada Diya hai... This make him great....."
    },
    {
      "comment_id": "Ugxhd3Kk6-4aF_OezhR4AaABAg.91-lviLIpy297rgoMDMAD6",
      "parent_id": "Ugxhd3Kk6-4aF_OezhR4AaABAg",
      "comment_type": "reply",
      "author": "@dhananjaypandey647",
      "likes": 26,
      "published_at": "2020-04-25T06:19:27Z",
      "timestamp_refs": [],
      "text": "Areh Vai .....Kya baat bol diya❣️!!!! Jabardast",
      "parent_context": "Other teachers after a 20 min lecture mene aapko iss topic ko ekdum depth Mei pada Diya Hai ... Alakh sir after 1hour mene aapko basic pada Diya hai... This make him great....."
    },
    {
      "comment_id": "Ugxhd3Kk6-4aF_OezhR4AaABAg.91-lviLIpy297rpjlOPP50",
      "parent_id": "Ugxhd3Kk6-4aF_OezhR4AaABAg",
      "comment_type": "reply",
      "author": "@shivagupta7876",
      "likes": 13,
      "published_at": "2020-04-25T07:37:28Z",
      "timestamp_refs": [],
      "text": "@dhananjaypandey647 just the truth about his personality❤️❤️.....",
      "parent_context": "Other teachers after a 20 min lecture mene aapko iss topic ko ekdum depth Mei pada Diya Hai ... Alakh sir after 1hour mene aapko basic pada Diya hai... This make him great....."
    },
    {
      "comment_id": "Ugxhd3Kk6-4aF_OezhR4AaABAg.91-lviLIpy297sp0s6QnbW",
      "parent_id": "Ugxhd3Kk6-4aF_OezhR4AaABAg",
      "comment_type": "reply",
      "author": "@dhananjaypandey647",
      "likes": 10,
      "published_at": "2020-04-25T16:50:26Z",
      "timestamp_refs": [],
      "text": "@shivagupta7876 Haan ji Alakh Bhaiya-cum- SIR is gr8",
      "parent_context": "Other teachers after a 20 min lecture mene aapko iss topic ko ekdum depth Mei pada Diya Hai ... Alakh sir after 1hour mene aapko basic pada Diya hai... This make him great....."
    },
    {
      "comment_id": "Ugxhd3Kk6-4aF_OezhR4AaABAg.91-lviLIpy29C0ZN-_oZib",
      "parent_id": "Ugxhd3Kk6-4aF_OezhR4AaABAg",
      "comment_type": "reply",
      "author": "@simpleboy1338",
      "likes": 4,
      "published_at": "2020-08-06T12:23:39Z",
      "timestamp_refs": [],
      "text": "Reality of greatness of alakh sir",
      "parent_context": "Other teachers after a 20 min lecture mene aapko iss topic ko ekdum depth Mei pada Diya Hai ... Alakh sir after 1hour mene aapko basic pada Diya hai... This make him great....."
    },
    {
      "comment_id": "Ugxhd3Kk6-4aF_OezhR4AaABAg.91-lviLIpy29CVVn4Jxf3B",
      "parent_id": "Ugxhd3Kk6-4aF_OezhR4AaABAg",
      "comment_type": "reply",
      "author": "@jatinkapoor8653",
      "likes": 6,
      "published_at": "2020-08-18T12:48:51Z",
      "timestamp_refs": [],
      "text": "bhai mere teacher n to y topic 1 week chlwaya tha",
      "parent_context": "Other teachers after a 20 min lecture mene aapko iss topic ko ekdum depth Mei pada Diya Hai ... Alakh sir after 1hour mene aapko basic pada Diya hai... This make him great....."
    },
    {
      "comment_id": "Ugxhd3Kk6-4aF_OezhR4AaABAg.91-lviLIpy29CwZxhtqf-w",
      "parent_id": "Ugxhd3Kk6-4aF_OezhR4AaABAg",
      "comment_type": "reply",
      "author": "@anonymousboy498",
      "likes": 2,
      "published_at": "2020-08-29T10:24:00Z",
      "timestamp_refs": [],
      "text": "😋😋😋😋",
      "parent_context": "Other teachers after a 20 min lecture mene aapko iss topic ko ekdum depth Mei pada Diya Hai ... Alakh sir after 1hour mene aapko basic pada Diya hai... This make him great....."
    },
    {
      "comment_id": "Ugxhd3Kk6-4aF_OezhR4AaABAg.91-lviLIpy29Cwdv00sK7r",
      "parent_id": "Ugxhd3Kk6-4aF_OezhR4AaABAg",
      "comment_type": "reply",
      "author": "@shivagupta7876",
      "likes": 27,
      "published_at": "2020-08-29T11:07:19Z",
      "timestamp_refs": [],
      "text": "@jatinkapoor8653 aur phir bhi aap yaha ho😂😂😂....",
      "parent_context": "Other teachers after a 20 min lecture mene aapko iss topic ko ekdum depth Mei pada Diya Hai ... Alakh sir after 1hour mene aapko basic pada Diya hai... This make him great....."
    },
    {
      "comment_id": "Ugxhd3Kk6-4aF_OezhR4AaABAg.91-lviLIpy29Cx2dyuzWVX",
      "parent_id": "Ugxhd3Kk6-4aF_OezhR4AaABAg",
      "comment_type": "reply",
      "author": "@abhinavmg6500",
      "likes": 0,
      "published_at": "2020-08-29T14:52:11Z",
      "timestamp_refs": [],
      "text": "but its still less content",
      "parent_context": "Other teachers after a 20 min lecture mene aapko iss topic ko ekdum depth Mei pada Diya Hai ... Alakh sir after 1hour mene aapko basic pada Diya hai... This make him great....."
    },
    {
      "comment_id": "Ugxhd3Kk6-4aF_OezhR4AaABAg.91-lviLIpy29DKtghTdYfz",
      "parent_id": "Ugxhd3Kk6-4aF_OezhR4AaABAg",
      "comment_type": "reply",
      "author": "@kallolmandal8206",
      "likes": 5,
      "published_at": "2020-09-08T06:26:11Z",
      "timestamp_refs": [],
      "text": "@shivagupta7876 op bro",
      "parent_context": "Other teachers after a 20 min lecture mene aapko iss topic ko ekdum depth Mei pada Diya Hai ... Alakh sir after 1hour mene aapko basic pada Diya hai... This make him great....."
    },
    {
      "comment_id": "Ugxhd3Kk6-4aF_OezhR4AaABAg.91-lviLIpy29DLxY6FbW5X",
      "parent_id": "Ugxhd3Kk6-4aF_OezhR4AaABAg",
      "comment_type": "reply",
      "author": "@vandankhandelwal1805",
      "likes": 1,
      "published_at": "2020-09-08T16:19:04Z",
      "timestamp_refs": [],
      "text": "Truth",
      "parent_context": "Other teachers after a 20 min lecture mene aapko iss topic ko ekdum depth Mei pada Diya Hai ... Alakh sir after 1hour mene aapko basic pada Diya hai... This make him great....."
    },
    {
      "comment_id": "Ugxhd3Kk6-4aF_OezhR4AaABAg.91-lviLIpy29DeLDqJAmk1",
      "parent_id": "Ugxhd3Kk6-4aF_OezhR4AaABAg",
      "comment_type": "reply",
      "author": "@VinayYele2013",
      "likes": 5,
      "published_at": "2020-09-16T05:00:19Z",
      "timestamp_refs": [],
      "text": "@jatinkapoor8653 no teacher explains hydrogen bonding for 1 week...",
      "parent_context": "Other teachers after a 20 min lecture mene aapko iss topic ko ekdum depth Mei pada Diya Hai ... Alakh sir after 1hour mene aapko basic pada Diya hai... This make him great....."
    },
    {
      "comment_id": "Ugxhd3Kk6-4aF_OezhR4AaABAg.91-lviLIpy29DffOctr_QK",
      "parent_id": "Ugxhd3Kk6-4aF_OezhR4AaABAg",
      "comment_type": "reply",
      "author": "@vanshjais1777",
      "likes": 3,
      "published_at": "2020-09-16T17:24:32Z",
      "timestamp_refs": [],
      "text": "@harshvardhangoswami7248 oo bhai sahab aakdam rightty and unacademy jee wale teachers bhu boht achee hai🥰",
      "parent_context": "Other teachers after a 20 min lecture mene aapko iss topic ko ekdum depth Mei pada Diya Hai ... Alakh sir after 1hour mene aapko basic pada Diya hai... This make him great....."
    },
    {
      "comment_id": "Ugxhd3Kk6-4aF_OezhR4AaABAg.91-lviLIpy29EGuOtLtdKh",
      "parent_id": "Ugxhd3Kk6-4aF_OezhR4AaABAg",
      "comment_type": "reply",
      "author": "@Supremetechworld",
      "likes": 2,
      "published_at": "2020-10-01T13:46:47Z",
      "timestamp_refs": [],
      "text": "Yeah bro its true",
      "parent_context": "Other teachers after a 20 min lecture mene aapko iss topic ko ekdum depth Mei pada Diya Hai ... Alakh sir after 1hour mene aapko basic pada Diya hai... This make him great....."
    },
    {
      "comment_id": "Ugxhd3Kk6-4aF_OezhR4AaABAg.91-lviLIpy29EndRXV-T75",
      "parent_id": "Ugxhd3Kk6-4aF_OezhR4AaABAg",
      "comment_type": "reply",
      "author": "@fahad_idrshk",
      "likes": 2,
      "published_at": "2020-10-14T16:12:47Z",
      "timestamp_refs": [],
      "text": "Bro... He's not just great he's a living legend.... The most admirable and best Physics and chemistry teacher on the face of earth",
      "parent_context": "Other teachers after a 20 min lecture mene aapko iss topic ko ekdum depth Mei pada Diya Hai ... Alakh sir after 1hour mene aapko basic pada Diya hai... This make him great....."
    },
    {
      "comment_id": "Ugxhd3Kk6-4aF_OezhR4AaABAg.91-lviLIpy29FYzorAm_DG",
      "parent_id": "Ugxhd3Kk6-4aF_OezhR4AaABAg",
      "comment_type": "reply",
      "author": "@dhakadjaat5611",
      "likes": 1,
      "published_at": "2020-11-02T10:51:53Z",
      "timestamp_refs": [],
      "text": "Shi khaa",
      "parent_context": "Other teachers after a 20 min lecture mene aapko iss topic ko ekdum depth Mei pada Diya Hai ... Alakh sir after 1hour mene aapko basic pada Diya hai... This make him great....."
    },
    {
      "comment_id": "Ugxhd3Kk6-4aF_OezhR4AaABAg.91-lviLIpy29FqP2FCN7jx",
      "parent_id": "Ugxhd3Kk6-4aF_OezhR4AaABAg",
      "comment_type": "reply",
      "author": "@oldcartoon-y2",
      "likes": 1,
      "published_at": "2020-11-09T14:27:22Z",
      "timestamp_refs": [],
      "text": "@fahad_idrshk yeah",
      "parent_context": "Other teachers after a 20 min lecture mene aapko iss topic ko ekdum depth Mei pada Diya Hai ... Alakh sir after 1hour mene aapko basic pada Diya hai... This make him great....."
    },
    {
      "comment_id": "Ugxhd3Kk6-4aF_OezhR4AaABAg.91-lviLIpy29GilRt_PqCd",
      "parent_id": "Ugxhd3Kk6-4aF_OezhR4AaABAg",
      "comment_type": "reply",
      "author": "@HimanshuSingh-gl9qd",
      "likes": 0,
      "published_at": "2020-12-01T11:49:19Z",
      "timestamp_refs": [],
      "text": "BSS BUTTERING 😂😂🤣",
      "parent_context": "Other teachers after a 20 min lecture mene aapko iss topic ko ekdum depth Mei pada Diya Hai ... Alakh sir after 1hour mene aapko basic pada Diya hai... This make him great....."
    },
    {
      "comment_id": "Ugxhd3Kk6-4aF_OezhR4AaABAg.91-lviLIpy29GvRjHTx1K-",
      "parent_id": "Ugxhd3Kk6-4aF_OezhR4AaABAg",
      "comment_type": "reply",
      "author": "@HaiderAli-dp8ko",
      "likes": 1,
      "published_at": "2020-12-06T09:58:27Z",
      "timestamp_refs": [],
      "text": "Good you are right",
      "parent_context": "Other teachers after a 20 min lecture mene aapko iss topic ko ekdum depth Mei pada Diya Hai ... Alakh sir after 1hour mene aapko basic pada Diya hai... This make him great....."
    },
    {
      "comment_id": "Ugxhd3Kk6-4aF_OezhR4AaABAg.91-lviLIpy29H75crmuLNv",
      "parent_id": "Ugxhd3Kk6-4aF_OezhR4AaABAg",
      "comment_type": "reply",
      "author": "@raghavsharma260",
      "likes": 1,
      "published_at": "2020-12-11T07:55:28Z",
      "timestamp_refs": [],
      "text": "''Chaa gye guru'' Dil jeet liye bhai",
      "parent_context": "Other teachers after a 20 min lecture mene aapko iss topic ko ekdum depth Mei pada Diya Hai ... Alakh sir after 1hour mene aapko basic pada Diya hai... This make him great....."
    },
    {
      "comment_id": "Ugxhd3Kk6-4aF_OezhR4AaABAg.91-lviLIpy29HZ9zAMKM3t",
      "parent_id": "Ugxhd3Kk6-4aF_OezhR4AaABAg",
      "comment_type": "reply",
      "author": "@vapachedulashiva4294",
      "likes": 1,
      "published_at": "2020-12-22T05:32:12Z",
      "timestamp_refs": [],
      "text": "Chee",
      "parent_context": "Other teachers after a 20 min lecture mene aapko iss topic ko ekdum depth Mei pada Diya Hai ... Alakh sir after 1hour mene aapko basic pada Diya hai... This make him great....."
    },
    {
      "comment_id": "Ugxhd3Kk6-4aF_OezhR4AaABAg.91-lviLIpy29HZA4DKuUB4",
      "parent_id": "Ugxhd3Kk6-4aF_OezhR4AaABAg",
      "comment_type": "reply",
      "author": "@vapachedulashiva4294",
      "likes": 1,
      "published_at": "2020-12-22T05:33:01Z",
      "timestamp_refs": [],
      "text": "@vanshjais1777 W she",
      "parent_context": "Other teachers after a 20 min lecture mene aapko iss topic ko ekdum depth Mei pada Diya Hai ... Alakh sir after 1hour mene aapko basic pada Diya hai... This make him great....."
    },
    {
      "comment_id": "Ugxhd3Kk6-4aF_OezhR4AaABAg.91-lviLIpy29ItMx3EVewS",
      "parent_id": "Ugxhd3Kk6-4aF_OezhR4AaABAg",
      "comment_type": "reply",
      "author": "@pratibhabhaskar3656",
      "likes": 1,
      "published_at": "2021-01-24T07:40:57Z",
      "timestamp_refs": [],
      "text": "Veryy truee",
      "parent_context": "Other teachers after a 20 min lecture mene aapko iss topic ko ekdum depth Mei pada Diya Hai ... Alakh sir after 1hour mene aapko basic pada Diya hai... This make him great....."
    },
    {
      "comment_id": "Ugxhd3Kk6-4aF_OezhR4AaABAg.91-lviLIpy29IuOgVKi8zy",
      "parent_id": "Ugxhd3Kk6-4aF_OezhR4AaABAg",
      "comment_type": "reply",
      "author": "@btsarmygalaxy",
      "likes": 1,
      "published_at": "2021-01-24T17:15:24Z",
      "timestamp_refs": [],
      "text": "Ryt 👍",
      "parent_context": "Other teachers after a 20 min lecture mene aapko iss topic ko ekdum depth Mei pada Diya Hai ... Alakh sir after 1hour mene aapko basic pada Diya hai... This make him great....."
    },
    {
      "comment_id": "Ugxhd3Kk6-4aF_OezhR4AaABAg.91-lviLIpy29J0moBhtbng",
      "parent_id": "Ugxhd3Kk6-4aF_OezhR4AaABAg",
      "comment_type": "reply",
      "author": "@ankitakar5023",
      "likes": 1,
      "published_at": "2021-01-27T14:09:35Z",
      "timestamp_refs": [],
      "text": "Yess",
      "parent_context": "Other teachers after a 20 min lecture mene aapko iss topic ko ekdum depth Mei pada Diya Hai ... Alakh sir after 1hour mene aapko basic pada Diya hai... This make him great....."
    },
    {
      "comment_id": "Ugxhd3Kk6-4aF_OezhR4AaABAg.91-lviLIpy29K6EC5WXYNk",
      "parent_id": "Ugxhd3Kk6-4aF_OezhR4AaABAg",
      "comment_type": "reply",
      "author": "@gamerroyal2806",
      "likes": 1,
      "published_at": "2021-02-23T13:25:16Z",
      "timestamp_refs": [],
      "text": "True af❤",
      "parent_context": "Other teachers after a 20 min lecture mene aapko iss topic ko ekdum depth Mei pada Diya Hai ... Alakh sir after 1hour mene aapko basic pada Diya hai... This make him great....."
    },
    {
      "comment_id": "Ugxhd3Kk6-4aF_OezhR4AaABAg.91-lviLIpy29MeJPPO71zs",
      "parent_id": "Ugxhd3Kk6-4aF_OezhR4AaABAg",
      "comment_type": "reply",
      "author": "@grammarwala",
      "likes": 0,
      "published_at": "2021-04-27T21:26:58Z",
      "timestamp_refs": [],
      "text": "https://youtu.be/dhsh-doZ9d4",
      "parent_context": "Other teachers after a 20 min lecture mene aapko iss topic ko ekdum depth Mei pada Diya Hai ... Alakh sir after 1hour mene aapko basic pada Diya hai... This make him great....."
    },
    {
      "comment_id": "Ugxhd3Kk6-4aF_OezhR4AaABAg.91-lviLIpy29QQoEzrGyqY",
      "parent_id": "Ugxhd3Kk6-4aF_OezhR4AaABAg",
      "comment_type": "reply",
      "author": "@rajachandio79",
      "likes": 2,
      "published_at": "2021-07-30T16:22:09Z",
      "timestamp_refs": [],
      "text": "That's why i love sir alakh pandy ....from Pakistan ❤",
      "parent_context": "Other teachers after a 20 min lecture mene aapko iss topic ko ekdum depth Mei pada Diya Hai ... Alakh sir after 1hour mene aapko basic pada Diya hai... This make him great....."
    },
    {
      "comment_id": "Ugxhd3Kk6-4aF_OezhR4AaABAg.91-lviLIpy29T9wek_O6LS",
      "parent_id": "Ugxhd3Kk6-4aF_OezhR4AaABAg",
      "comment_type": "reply",
      "author": "@pwguide7.5kviews89",
      "likes": 0,
      "published_at": "2021-10-06T16:42:47Z",
      "timestamp_refs": [],
      "text": "Hi 🌹",
      "parent_context": "Other teachers after a 20 min lecture mene aapko iss topic ko ekdum depth Mei pada Diya Hai ... Alakh sir after 1hour mene aapko basic pada Diya hai... This make him great....."
    },
    {
      "comment_id": "Ugxhd3Kk6-4aF_OezhR4AaABAg.91-lviLIpy29TMTQ2z1ZyS",
      "parent_id": "Ugxhd3Kk6-4aF_OezhR4AaABAg",
      "comment_type": "reply",
      "author": "@shivagupta7876",
      "likes": 0,
      "published_at": "2021-10-11T13:28:38Z",
      "timestamp_refs": [],
      "text": "@pwguide7.5kviews89 hello 🙋‍♂️",
      "parent_context": "Other teachers after a 20 min lecture mene aapko iss topic ko ekdum depth Mei pada Diya Hai ... Alakh sir after 1hour mene aapko basic pada Diya hai... This make him great....."
    },
    {
      "comment_id": "Ugxhd3Kk6-4aF_OezhR4AaABAg.91-lviLIpy29X3HIGLQFGk",
      "parent_id": "Ugxhd3Kk6-4aF_OezhR4AaABAg",
      "comment_type": "reply",
      "author": "@phoenix_yt7750",
      "likes": 0,
      "published_at": "2022-01-11T12:42:43Z",
      "timestamp_refs": [],
      "text": "True,,hey are you alive after 2 years 😁😁",
      "parent_context": "Other teachers after a 20 min lecture mene aapko iss topic ko ekdum depth Mei pada Diya Hai ... Alakh sir after 1hour mene aapko basic pada Diya hai... This make him great....."
    },
    {
      "comment_id": "Ugxhd3Kk6-4aF_OezhR4AaABAg.91-lviLIpy29YG7irX_oGN",
      "parent_id": "Ugxhd3Kk6-4aF_OezhR4AaABAg",
      "comment_type": "reply",
      "author": "@hss-x5d",
      "likes": 0,
      "published_at": "2022-02-10T09:00:38Z",
      "timestamp_refs": [],
      "text": "Yeah absolutely right 😇😇🙂🙂",
      "parent_context": "Other teachers after a 20 min lecture mene aapko iss topic ko ekdum depth Mei pada Diya Hai ... Alakh sir after 1hour mene aapko basic pada Diya hai... This make him great....."
    },
    {
      "comment_id": "Ugxhd3Kk6-4aF_OezhR4AaABAg.91-lviLIpy29hZKBsadBor",
      "parent_id": "Ugxhd3Kk6-4aF_OezhR4AaABAg",
      "comment_type": "reply",
      "author": "@varsharai9853",
      "likes": 0,
      "published_at": "2022-10-24T09:09:06Z",
      "timestamp_refs": [],
      "text": "wywyey",
      "parent_context": "Other teachers after a 20 min lecture mene aapko iss topic ko ekdum depth Mei pada Diya Hai ... Alakh sir after 1hour mene aapko basic pada Diya hai... This make him great....."
    },
    {
      "comment_id": "Ugxhd3Kk6-4aF_OezhR4AaABAg.91-lviLIpy29ldiL7bxMHU",
      "parent_id": "Ugxhd3Kk6-4aF_OezhR4AaABAg",
      "comment_type": "reply",
      "author": "@kamran-0111",
      "likes": 0,
      "published_at": "2023-02-02T21:30:35Z",
      "timestamp_refs": [],
      "text": "Trueeeeeee",
      "parent_context": "Other teachers after a 20 min lecture mene aapko iss topic ko ekdum depth Mei pada Diya Hai ... Alakh sir after 1hour mene aapko basic pada Diya hai... This make him great....."
    },
    {
      "comment_id": "Ugxhd3Kk6-4aF_OezhR4AaABAg.91-lviLIpy29odM-enc_qY",
      "parent_id": "Ugxhd3Kk6-4aF_OezhR4AaABAg",
      "comment_type": "reply",
      "author": "@ShreeSwamiSamartBhakti",
      "likes": 0,
      "published_at": "2023-04-18T07:40:52Z",
      "timestamp_refs": [],
      "text": "Yesss",
      "parent_context": "Other teachers after a 20 min lecture mene aapko iss topic ko ekdum depth Mei pada Diya Hai ... Alakh sir after 1hour mene aapko basic pada Diya hai... This make him great....."
    },
    {
      "comment_id": "Ugxhd3Kk6-4aF_OezhR4AaABAg.91-lviLIpy2A7_ExM7tKFD",
      "parent_id": "Ugxhd3Kk6-4aF_OezhR4AaABAg",
      "comment_type": "reply",
      "author": "@Burn2rise",
      "likes": 0,
      "published_at": "2024-08-25T19:50:11Z",
      "timestamp_refs": [],
      "text": "9​@harshvardhangoswami7248",
      "parent_context": "Other teachers after a 20 min lecture mene aapko iss topic ko ekdum depth Mei pada Diya Hai ... Alakh sir after 1hour mene aapko basic pada Diya hai... This make him great....."
    },
    {
      "comment_id": "Ugxhd3Kk6-4aF_OezhR4AaABAg.91-lviLIpy2A9MyJ76NxrF",
      "parent_id": "Ugxhd3Kk6-4aF_OezhR4AaABAg",
      "comment_type": "reply",
      "author": "@Bipralab_chy_1213",
      "likes": 0,
      "published_at": "2024-10-09T09:08:40Z",
      "timestamp_refs": [],
      "text": "You r ryt",
      "parent_context": "Other teachers after a 20 min lecture mene aapko iss topic ko ekdum depth Mei pada Diya Hai ... Alakh sir after 1hour mene aapko basic pada Diya hai... This make him great....."
    },
    {
      "comment_id": "Ugxhd3Kk6-4aF_OezhR4AaABAg.91-lviLIpy2AOurWnTupc_",
      "parent_id": "Ugxhd3Kk6-4aF_OezhR4AaABAg",
      "comment_type": "reply",
      "author": "@ZainabKhan-q1d",
      "likes": 0,
      "published_at": "2025-10-30T18:13:41Z",
      "timestamp_refs": [],
      "text": "Yeah",
      "parent_context": "Other teachers after a 20 min lecture mene aapko iss topic ko ekdum depth Mei pada Diya Hai ... Alakh sir after 1hour mene aapko basic pada Diya hai... This make him great....."
    },
    {
      "comment_id": "UgyBwHKTF6cpxCN1LTV4AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@FOOdZone100",
      "likes": 203,
      "published_at": "2024-01-01T16:58:02Z",
      "timestamp_refs": [],
      "text": "Today it's 1st January 2024...... On first day of year I challenged myself to complete all lectures of chemical bonding at any cost... And see I am here writing comment down to last video!! Thanks to alakh sir for ur joyful teaching 🙏🏻🙏🏻",
      "parent_context": ""
    },
    {
      "comment_id": "UgyBwHKTF6cpxCN1LTV4AaABAg.9z1frC_ceXS9zgD-CUGTg1",
      "parent_id": "UgyBwHKTF6cpxCN1LTV4AaABAg",
      "comment_type": "reply",
      "author": "@Beast---",
      "likes": 8,
      "published_at": "2024-01-17T20:05:14Z",
      "timestamp_refs": [],
      "text": "16 vids in1 day ?",
      "parent_context": "Today it's 1st January 2024...... On first day of year I challenged myself to complete all lectures of chemical bonding at any cost... And see I am here writing comment down to last video!! Thanks to alakh sir for ur joyful teaching 🙏🏻🙏🏻"
    },
    {
      "comment_id": "UgyBwHKTF6cpxCN1LTV4AaABAg.9z1frC_ceXS9ziIPQQgX-v",
      "parent_id": "UgyBwHKTF6cpxCN1LTV4AaABAg",
      "comment_type": "reply",
      "author": "@FOOdZone100",
      "likes": 5,
      "published_at": "2024-01-18T15:30:59Z",
      "timestamp_refs": [],
      "text": "Yess broo!!!",
      "parent_context": "Today it's 1st January 2024...... On first day of year I challenged myself to complete all lectures of chemical bonding at any cost... And see I am here writing comment down to last video!! Thanks to alakh sir for ur joyful teaching 🙏🏻🙏🏻"
    },
    {
      "comment_id": "UgyBwHKTF6cpxCN1LTV4AaABAg.9z1frC_ceXS9zrtno12YGx",
      "parent_id": "UgyBwHKTF6cpxCN1LTV4AaABAg",
      "comment_type": "reply",
      "author": "@Devanshi-x7e",
      "likes": 2,
      "published_at": "2024-01-22T08:59:39Z",
      "timestamp_refs": [],
      "text": "Is it best for neet 2024",
      "parent_context": "Today it's 1st January 2024...... On first day of year I challenged myself to complete all lectures of chemical bonding at any cost... And see I am here writing comment down to last video!! Thanks to alakh sir for ur joyful teaching 🙏🏻🙏🏻"
    },
    {
      "comment_id": "UgyBwHKTF6cpxCN1LTV4AaABAg.9z1frC_ceXSA-KZIwdnupB",
      "parent_id": "UgyBwHKTF6cpxCN1LTV4AaABAg",
      "comment_type": "reply",
      "author": "@kewl7771",
      "likes": 6,
      "published_at": "2024-02-02T21:29:01Z",
      "timestamp_refs": [],
      "text": "props for such good focus, i get distracted easily so it took me a while to just finish from vsepr to end in 1 day",
      "parent_context": "Today it's 1st January 2024...... On first day of year I challenged myself to complete all lectures of chemical bonding at any cost... And see I am here writing comment down to last video!! Thanks to alakh sir for ur joyful teaching 🙏🏻🙏🏻"
    },
    {
      "comment_id": "UgyBwHKTF6cpxCN1LTV4AaABAg.9z1frC_ceXSA0J4ocOzn4J",
      "parent_id": "UgyBwHKTF6cpxCN1LTV4AaABAg",
      "comment_type": "reply",
      "author": "@saniashabbir4739",
      "likes": 0,
      "published_at": "2024-02-27T04:14:45Z",
      "timestamp_refs": [],
      "text": "Whole video in one day is the chapter very clear to you ???",
      "parent_context": "Today it's 1st January 2024...... On first day of year I challenged myself to complete all lectures of chemical bonding at any cost... And see I am here writing comment down to last video!! Thanks to alakh sir for ur joyful teaching 🙏🏻🙏🏻"
    },
    {
      "comment_id": "UgyBwHKTF6cpxCN1LTV4AaABAg.9z1frC_ceXSA0N8tXHxnb9",
      "parent_id": "UgyBwHKTF6cpxCN1LTV4AaABAg",
      "comment_type": "reply",
      "author": "@FOOdZone100",
      "likes": 0,
      "published_at": "2024-02-28T18:07:21Z",
      "timestamp_refs": [],
      "text": "@saniashabbir4739 yess today only I gave term 2 exam. After seeing this I prepared it for 2-3 hrs and then revised it.",
      "parent_context": "Today it's 1st January 2024...... On first day of year I challenged myself to complete all lectures of chemical bonding at any cost... And see I am here writing comment down to last video!! Thanks to alakh sir for ur joyful teaching 🙏🏻🙏🏻"
    },
    {
      "comment_id": "UgyBwHKTF6cpxCN1LTV4AaABAg.9z1frC_ceXSA4G5mhr7AbI",
      "parent_id": "UgyBwHKTF6cpxCN1LTV4AaABAg",
      "comment_type": "reply",
      "author": "@Aditi-dv2vg",
      "likes": 0,
      "published_at": "2024-06-04T10:31:05Z",
      "timestamp_refs": [],
      "text": "@F00dZone100. Have you completed yet",
      "parent_context": "Today it's 1st January 2024...... On first day of year I challenged myself to complete all lectures of chemical bonding at any cost... And see I am here writing comment down to last video!! Thanks to alakh sir for ur joyful teaching 🙏🏻🙏🏻"
    },
    {
      "comment_id": "UgyBwHKTF6cpxCN1LTV4AaABAg.9z1frC_ceXSAChU1T4wlHJ",
      "parent_id": "UgyBwHKTF6cpxCN1LTV4AaABAg",
      "comment_type": "reply",
      "author": "@GaurangiSahoo",
      "likes": 0,
      "published_at": "2024-12-31T07:12:50Z",
      "timestamp_refs": [],
      "text": "And tomorrow gonna be first day of 2025 .. How was your journey!",
      "parent_context": "Today it's 1st January 2024...... On first day of year I challenged myself to complete all lectures of chemical bonding at any cost... And see I am here writing comment down to last video!! Thanks to alakh sir for ur joyful teaching 🙏🏻🙏🏻"
    },
    {
      "comment_id": "UgyBwHKTF6cpxCN1LTV4AaABAg.9z1frC_ceXSAChjf3ZkH61",
      "parent_id": "UgyBwHKTF6cpxCN1LTV4AaABAg",
      "comment_type": "reply",
      "author": "@FOOdZone100",
      "likes": 0,
      "published_at": "2024-12-31T09:38:12Z",
      "timestamp_refs": [],
      "text": "@GaurangiSahoo now I am in class 12th, entering in 2025 with full of anxiety,stress and hoping to end this year with good deeds.",
      "parent_context": "Today it's 1st January 2024...... On first day of year I challenged myself to complete all lectures of chemical bonding at any cost... And see I am here writing comment down to last video!! Thanks to alakh sir for ur joyful teaching 🙏🏻🙏🏻"
    },
    {
      "comment_id": "UgyBwHKTF6cpxCN1LTV4AaABAg.9z1frC_ceXSAEMaDNv3pS2",
      "parent_id": "UgyBwHKTF6cpxCN1LTV4AaABAg",
      "comment_type": "reply",
      "author": "@PriyanshJoshi108",
      "likes": 1,
      "published_at": "2025-02-10T12:15:08Z",
      "timestamp_refs": [],
      "text": "​@FOOdZone100 All the best, Will meet you after on 1st Jan, 26",
      "parent_context": "Today it's 1st January 2024...... On first day of year I challenged myself to complete all lectures of chemical bonding at any cost... And see I am here writing comment down to last video!! Thanks to alakh sir for ur joyful teaching 🙏🏻🙏🏻"
    },
    {
      "comment_id": "UgyBwHKTF6cpxCN1LTV4AaABAg.9z1frC_ceXSAMFgzSyI7Of",
      "parent_id": "UgyBwHKTF6cpxCN1LTV4AaABAg",
      "comment_type": "reply",
      "author": "@tathaisardar3964",
      "likes": 1,
      "published_at": "2025-08-25T16:10:44Z",
      "timestamp_refs": [],
      "text": "I too completed in one day 🥲 Now my head paining 🥲",
      "parent_context": "Today it's 1st January 2024...... On first day of year I challenged myself to complete all lectures of chemical bonding at any cost... And see I am here writing comment down to last video!! Thanks to alakh sir for ur joyful teaching 🙏🏻🙏🏻"
    },
    {
      "comment_id": "UgyBwHKTF6cpxCN1LTV4AaABAg.9z1frC_ceXSAPAOaBk1gKb",
      "parent_id": "UgyBwHKTF6cpxCN1LTV4AaABAg",
      "comment_type": "reply",
      "author": "@PWHelpline",
      "likes": 0,
      "published_at": "2025-11-06T04:19:14Z",
      "timestamp_refs": [],
      "text": "@FOOdZone100 How is your 11th? What's mark u get in 11th?",
      "parent_context": "Today it's 1st January 2024...... On first day of year I challenged myself to complete all lectures of chemical bonding at any cost... And see I am here writing comment down to last video!! Thanks to alakh sir for ur joyful teaching 🙏🏻🙏🏻"
    },
    {
      "comment_id": "UgyBwHKTF6cpxCN1LTV4AaABAg.9z1frC_ceXSATy8T5l1psM",
      "parent_id": "UgyBwHKTF6cpxCN1LTV4AaABAg",
      "comment_type": "reply",
      "author": "@KartikeshPanigrahi",
      "likes": 0,
      "published_at": "2026-03-05T07:25:10Z",
      "timestamp_refs": [],
      "text": "so how was your 12th boards and jee result?",
      "parent_context": "Today it's 1st January 2024...... On first day of year I challenged myself to complete all lectures of chemical bonding at any cost... And see I am here writing comment down to last video!! Thanks to alakh sir for ur joyful teaching 🙏🏻🙏🏻"
    },
    {
      "comment_id": "UgyBwHKTF6cpxCN1LTV4AaABAg.9z1frC_ceXSAU3QWennckN",
      "parent_id": "UgyBwHKTF6cpxCN1LTV4AaABAg",
      "comment_type": "reply",
      "author": "@IrfanKhan-s8l8h",
      "likes": 0,
      "published_at": "2026-03-07T17:58:23Z",
      "timestamp_refs": [],
      "text": "​@PriyanshJoshi108 I am now 12th and same case - dipression, anxiety, distraction e.t.c😢",
      "parent_context": "Today it's 1st January 2024...... On first day of year I challenged myself to complete all lectures of chemical bonding at any cost... And see I am here writing comment down to last video!! Thanks to alakh sir for ur joyful teaching 🙏🏻🙏🏻"
    },
    {
      "comment_id": "UgyBwHKTF6cpxCN1LTV4AaABAg.9z1frC_ceXSAVXypjYWbsl",
      "parent_id": "UgyBwHKTF6cpxCN1LTV4AaABAg",
      "comment_type": "reply",
      "author": "@Ivan_00067",
      "likes": 1,
      "published_at": "2026-04-13T11:15:34Z",
      "timestamp_refs": [],
      "text": "Sybau",
      "parent_context": "Today it's 1st January 2024...... On first day of year I challenged myself to complete all lectures of chemical bonding at any cost... And see I am here writing comment down to last video!! Thanks to alakh sir for ur joyful teaching 🙏🏻🙏🏻"
    },
    {
      "comment_id": "UgyqSFZnCuTCLn4aIUN4AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@NarutoUzumaki-xg2fz",
      "likes": 2139,
      "published_at": "2020-08-15T07:21:54Z",
      "timestamp_refs": [],
      "text": "Alakh sir is aplogizing for bad sound quality😀 BUT WE ARE THANKING HIM FOR EXCELLENT STUDY QUALITY🥰😇",
      "parent_context": ""
    },
    {
      "comment_id": "UgyqSFZnCuTCLn4aIUN4AaABAg.9CNBzkc6e169Els-nbJB9e",
      "parent_id": "UgyqSFZnCuTCLn4aIUN4AaABAg",
      "comment_type": "reply",
      "author": "@paktv1842",
      "likes": 4,
      "published_at": "2020-10-13T23:41:35Z",
      "timestamp_refs": [],
      "text": "True😁",
      "parent_context": "Alakh sir is aplogizing for bad sound quality😀 BUT WE ARE THANKING HIM FOR EXCELLENT STUDY QUALITY🥰😇"
    },
    {
      "comment_id": "UgyqSFZnCuTCLn4aIUN4AaABAg.9CNBzkc6e169F2-cyInfNB",
      "parent_id": "UgyqSFZnCuTCLn4aIUN4AaABAg",
      "comment_type": "reply",
      "author": "@gyaneshwarkumar4458",
      "likes": 3,
      "published_at": "2020-10-20T15:24:04Z",
      "timestamp_refs": [],
      "text": "OP BRO💪💪💪💪",
      "parent_context": "Alakh sir is aplogizing for bad sound quality😀 BUT WE ARE THANKING HIM FOR EXCELLENT STUDY QUALITY🥰😇"
    },
    {
      "comment_id": "UgyqSFZnCuTCLn4aIUN4AaABAg.9CNBzkc6e169UgSMIrBmbN",
      "parent_id": "UgyqSFZnCuTCLn4aIUN4AaABAg",
      "comment_type": "reply",
      "author": "@11sunamdas.xi.b.98",
      "likes": 6,
      "published_at": "2021-11-13T13:34:50Z",
      "timestamp_refs": [],
      "text": "Why the sound should be bad?🤬🤬🤬",
      "parent_context": "Alakh sir is aplogizing for bad sound quality😀 BUT WE ARE THANKING HIM FOR EXCELLENT STUDY QUALITY🥰😇"
    },
    {
      "comment_id": "UgyqSFZnCuTCLn4aIUN4AaABAg.9CNBzkc6e169VD5YA-SEwk",
      "parent_id": "UgyqSFZnCuTCLn4aIUN4AaABAg",
      "comment_type": "reply",
      "author": "@payal5636",
      "likes": 8,
      "published_at": "2021-11-26T15:09:39Z",
      "timestamp_refs": [],
      "text": "@11sunamdas.xi.b.98 That's the point!! He is getting so many views, but he can't just give us a better sound quality. The new videos have better sound quality but poor study quality.",
      "parent_context": "Alakh sir is aplogizing for bad sound quality😀 BUT WE ARE THANKING HIM FOR EXCELLENT STUDY QUALITY🥰😇"
    },
    {
      "comment_id": "UgyqSFZnCuTCLn4aIUN4AaABAg.9CNBzkc6e169VD7oEXJiYo",
      "parent_id": "UgyqSFZnCuTCLn4aIUN4AaABAg",
      "comment_type": "reply",
      "author": "@11sunamdas.xi.b.98",
      "likes": 1,
      "published_at": "2021-11-26T15:29:27Z",
      "timestamp_refs": [],
      "text": "@payal5636 thanku...",
      "parent_context": "Alakh sir is aplogizing for bad sound quality😀 BUT WE ARE THANKING HIM FOR EXCELLENT STUDY QUALITY🥰😇"
    },
    {
      "comment_id": "UgyqSFZnCuTCLn4aIUN4AaABAg.9CNBzkc6e169VKTt8SIruI",
      "parent_id": "UgyqSFZnCuTCLn4aIUN4AaABAg",
      "comment_type": "reply",
      "author": "@Sakham007",
      "likes": 14,
      "published_at": "2021-11-29T11:57:03Z",
      "timestamp_refs": [
        "33:58",
        "34:00"
      ],
      "text": "@payal5636 the sound was perfect till 33:58 , it got echoed after 34:00 , maybe he forgot to turn on his mic and the audio got recorded by his phone itself, thatswhy he apoloized , and at that time , his views were not that high as they are now , get ur facts cleared before commenting :)",
      "parent_context": "Alakh sir is aplogizing for bad sound quality😀 BUT WE ARE THANKING HIM FOR EXCELLENT STUDY QUALITY🥰😇"
    },
    {
      "comment_id": "UgyqSFZnCuTCLn4aIUN4AaABAg.9CNBzkc6e169cqx4IfqoL7",
      "parent_id": "UgyqSFZnCuTCLn4aIUN4AaABAg",
      "comment_type": "reply",
      "author": "@vector3613",
      "likes": 9,
      "published_at": "2022-06-29T08:06:57Z",
      "timestamp_refs": [],
      "text": "@Sakham007 yeah, these guys just comment anything without thinking 🙄",
      "parent_context": "Alakh sir is aplogizing for bad sound quality😀 BUT WE ARE THANKING HIM FOR EXCELLENT STUDY QUALITY🥰😇"
    },
    {
      "comment_id": "UgyqSFZnCuTCLn4aIUN4AaABAg.9CNBzkc6e169g7I9kgIFjg",
      "parent_id": "UgyqSFZnCuTCLn4aIUN4AaABAg",
      "comment_type": "reply",
      "author": "@dhruv7777",
      "likes": 3,
      "published_at": "2022-09-18T15:21:12Z",
      "timestamp_refs": [],
      "text": "if your content is good no matter if anything is bad",
      "parent_context": "Alakh sir is aplogizing for bad sound quality😀 BUT WE ARE THANKING HIM FOR EXCELLENT STUDY QUALITY🥰😇"
    },
    {
      "comment_id": "UgyqSFZnCuTCLn4aIUN4AaABAg.9CNBzkc6e169h2CQleQVpz",
      "parent_id": "UgyqSFZnCuTCLn4aIUN4AaABAg",
      "comment_type": "reply",
      "author": "@Virat__18_",
      "likes": 10,
      "published_at": "2022-10-11T12:26:17Z",
      "timestamp_refs": [],
      "text": "@payal5636 this video is 3 years old, at that time alakh sir was not getting that much views, and the study quality is good but the main point is u r the one who don't want to study, people like u always critise everyone, and get ur facts cleared",
      "parent_context": "Alakh sir is aplogizing for bad sound quality😀 BUT WE ARE THANKING HIM FOR EXCELLENT STUDY QUALITY🥰😇"
    },
    {
      "comment_id": "UgyqSFZnCuTCLn4aIUN4AaABAg.9CNBzkc6e169hMsCdMcWGt",
      "parent_id": "UgyqSFZnCuTCLn4aIUN4AaABAg",
      "comment_type": "reply",
      "author": "@KIRA_THE_JUSTICE",
      "likes": 6,
      "published_at": "2022-10-19T13:04:54Z",
      "timestamp_refs": [],
      "text": "@payal5636 really? Poor study quality? How?? I've found all videos perfect.... Whether it's old or new, alakh sir teaching is still perfect... How did the quality goes bad when the teacher is still same? 🤔 I didn't get it 😂",
      "parent_context": "Alakh sir is aplogizing for bad sound quality😀 BUT WE ARE THANKING HIM FOR EXCELLENT STUDY QUALITY🥰😇"
    },
    {
      "comment_id": "UgyqSFZnCuTCLn4aIUN4AaABAg.9CNBzkc6e169lknZmSSawy",
      "parent_id": "UgyqSFZnCuTCLn4aIUN4AaABAg",
      "comment_type": "reply",
      "author": "@HarshSingh-mx8pl",
      "likes": 4,
      "published_at": "2023-02-05T15:30:58Z",
      "timestamp_refs": [],
      "text": "@payal5636 haters 🙃 Hi",
      "parent_context": "Alakh sir is aplogizing for bad sound quality😀 BUT WE ARE THANKING HIM FOR EXCELLENT STUDY QUALITY🥰😇"
    },
    {
      "comment_id": "UgyqSFZnCuTCLn4aIUN4AaABAg.9CNBzkc6e169xA8yCQo2M5",
      "parent_id": "UgyqSFZnCuTCLn4aIUN4AaABAg",
      "comment_type": "reply",
      "author": "@AshaMahavidyalaya-ve7xy",
      "likes": 0,
      "published_at": "2023-11-16T06:52:17Z",
      "timestamp_refs": [],
      "text": "😊😊😊😅😅😅😅😅😅😅😅😅😅😅",
      "parent_context": "Alakh sir is aplogizing for bad sound quality😀 BUT WE ARE THANKING HIM FOR EXCELLENT STUDY QUALITY🥰😇"
    },
    {
      "comment_id": "UgyqSFZnCuTCLn4aIUN4AaABAg.9CNBzkc6e16A-1aeCc2KkC",
      "parent_id": "UgyqSFZnCuTCLn4aIUN4AaABAg",
      "comment_type": "reply",
      "author": "@shaluthakral5616",
      "likes": 1,
      "published_at": "2024-01-26T12:43:58Z",
      "timestamp_refs": [],
      "text": "Tbh agr 2x p suno to sir seems so energetic.😂 just try once",
      "parent_context": "Alakh sir is aplogizing for bad sound quality😀 BUT WE ARE THANKING HIM FOR EXCELLENT STUDY QUALITY🥰😇"
    },
    {
      "comment_id": "UgyqSFZnCuTCLn4aIUN4AaABAg.9CNBzkc6e16A3wV1GfC3ic",
      "parent_id": "UgyqSFZnCuTCLn4aIUN4AaABAg",
      "comment_type": "reply",
      "author": "@NishaDevi-zq8sv",
      "likes": 0,
      "published_at": "2024-05-27T10:27:37Z",
      "timestamp_refs": [],
      "text": "​@payal5636hlo",
      "parent_context": "Alakh sir is aplogizing for bad sound quality😀 BUT WE ARE THANKING HIM FOR EXCELLENT STUDY QUALITY🥰😇"
    },
    {
      "comment_id": "UgzLIaaQS9JWoMss6S54AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@khushimittaliya3808",
      "likes": 2377,
      "published_at": "2019-08-01T13:16:27Z",
      "timestamp_refs": [],
      "text": "aisa chemical bonding kisi ne nahi padhaya cleared all concepts and covered all exceptions I watched full playlist of chemical bonding",
      "parent_context": ""
    },
    {
      "comment_id": "UgzLIaaQS9JWoMss6S54AaABAg.8y5MV4aE2AI8zQNg-ZA9yb",
      "parent_id": "UgzLIaaQS9JWoMss6S54AaABAg",
      "comment_type": "reply",
      "author": "@kumaripriya3336",
      "likes": 14,
      "published_at": "2019-09-03T13:42:16Z",
      "timestamp_refs": [],
      "text": "i also",
      "parent_context": "aisa chemical bonding kisi ne nahi padhaya cleared all concepts and covered all exceptions I watched full playlist of chemical bonding"
    },
    {
      "comment_id": "UgzLIaaQS9JWoMss6S54AaABAg.8y5MV4aE2AI8zUMEgkiAIq",
      "parent_id": "UgzLIaaQS9JWoMss6S54AaABAg",
      "comment_type": "reply",
      "author": "@anilmourya1152",
      "likes": 37,
      "published_at": "2019-09-05T02:46:37Z",
      "timestamp_refs": [],
      "text": "11th 12th = alakh pandy",
      "parent_context": "aisa chemical bonding kisi ne nahi padhaya cleared all concepts and covered all exceptions I watched full playlist of chemical bonding"
    },
    {
      "comment_id": "UgzLIaaQS9JWoMss6S54AaABAg.8y5MV4aE2AI8zZtto10igB",
      "parent_id": "UgzLIaaQS9JWoMss6S54AaABAg",
      "comment_type": "reply",
      "author": "@anusmitasamanta2608",
      "likes": 35,
      "published_at": "2019-09-07T06:25:40Z",
      "timestamp_refs": [],
      "text": "sara vdieos dekh li ho?? then i am sure top krogiii....bcz inse better oaur koi ni h ...inka videos mst h",
      "parent_context": "aisa chemical bonding kisi ne nahi padhaya cleared all concepts and covered all exceptions I watched full playlist of chemical bonding"
    },
    {
      "comment_id": "UgzLIaaQS9JWoMss6S54AaABAg.8y5MV4aE2AI8zavTO_FEwy",
      "parent_id": "UgzLIaaQS9JWoMss6S54AaABAg",
      "comment_type": "reply",
      "author": "@khushimittaliya3808",
      "likes": 12,
      "published_at": "2019-09-08T01:17:53Z",
      "timestamp_refs": [],
      "text": "H has made different videos for resonance and hydrogen bonding for organic",
      "parent_context": "aisa chemical bonding kisi ne nahi padhaya cleared all concepts and covered all exceptions I watched full playlist of chemical bonding"
    },
    {
      "comment_id": "UgzLIaaQS9JWoMss6S54AaABAg.8y5MV4aE2AI8zc2djtAatW",
      "parent_id": "UgzLIaaQS9JWoMss6S54AaABAg",
      "comment_type": "reply",
      "author": "@jassgill9999",
      "likes": 5,
      "published_at": "2019-09-08T11:48:35Z",
      "timestamp_refs": [],
      "text": "I too had watched",
      "parent_context": "aisa chemical bonding kisi ne nahi padhaya cleared all concepts and covered all exceptions I watched full playlist of chemical bonding"
    },
    {
      "comment_id": "UgzLIaaQS9JWoMss6S54AaABAg.8y5MV4aE2AI8ziGg9hA-Fi",
      "parent_id": "UgzLIaaQS9JWoMss6S54AaABAg",
      "comment_type": "reply",
      "author": "@MAYANKRAI07",
      "likes": 2,
      "published_at": "2019-09-10T21:46:41Z",
      "timestamp_refs": [],
      "text": "me to",
      "parent_context": "aisa chemical bonding kisi ne nahi padhaya cleared all concepts and covered all exceptions I watched full playlist of chemical bonding"
    },
    {
      "comment_id": "UgzLIaaQS9JWoMss6S54AaABAg.8y5MV4aE2AI9-3FjAnakm-",
      "parent_id": "UgzLIaaQS9JWoMss6S54AaABAg",
      "comment_type": "reply",
      "author": "@padmashrikandalkar755",
      "likes": 15,
      "published_at": "2019-09-19T10:41:39Z",
      "timestamp_refs": [],
      "text": "@Vaibhav Yadav hello..!!. Can you please tell me..how do you know that all exceptions are not covered? aap Konsi book se theory padhate ho? It will be helpfull to me...",
      "parent_context": "aisa chemical bonding kisi ne nahi padhaya cleared all concepts and covered all exceptions I watched full playlist of chemical bonding"
    },
    {
      "comment_id": "UgzLIaaQS9JWoMss6S54AaABAg.8y5MV4aE2AI91NuJxbF9p-",
      "parent_id": "UgzLIaaQS9JWoMss6S54AaABAg",
      "comment_type": "reply",
      "author": "@Ambassador7860",
      "likes": 9,
      "published_at": "2019-11-16T04:12:40Z",
      "timestamp_refs": [],
      "text": "Yes, I also see full lecture, 16 video, around 12 - hours..🔥",
      "parent_context": "aisa chemical bonding kisi ne nahi padhaya cleared all concepts and covered all exceptions I watched full playlist of chemical bonding"
    },
    {
      "comment_id": "UgzLIaaQS9JWoMss6S54AaABAg.8y5MV4aE2AI934k8lb-7x9",
      "parent_id": "UgzLIaaQS9JWoMss6S54AaABAg",
      "comment_type": "reply",
      "author": "@neerajchoprarealid3935",
      "likes": 3,
      "published_at": "2019-12-28T10:40:59Z",
      "timestamp_refs": [],
      "text": "I too bro...",
      "parent_context": "aisa chemical bonding kisi ne nahi padhaya cleared all concepts and covered all exceptions I watched full playlist of chemical bonding"
    },
    {
      "comment_id": "UgzLIaaQS9JWoMss6S54AaABAg.8y5MV4aE2AI944vOfpXEpz",
      "parent_id": "UgzLIaaQS9JWoMss6S54AaABAg",
      "comment_type": "reply",
      "author": "@parveenshaikh7800",
      "likes": 1,
      "published_at": "2020-01-22T08:50:40Z",
      "timestamp_refs": [],
      "text": "Same",
      "parent_context": "aisa chemical bonding kisi ne nahi padhaya cleared all concepts and covered all exceptions I watched full playlist of chemical bonding"
    },
    {
      "comment_id": "UgzLIaaQS9JWoMss6S54AaABAg.8y5MV4aE2AI94PAD2CREPT",
      "parent_id": "UgzLIaaQS9JWoMss6S54AaABAg",
      "comment_type": "reply",
      "author": "@reason1016",
      "likes": 0,
      "published_at": "2020-01-30T05:33:42Z",
      "timestamp_refs": [],
      "text": "Same here brother",
      "parent_context": "aisa chemical bonding kisi ne nahi padhaya cleared all concepts and covered all exceptions I watched full playlist of chemical bonding"
    },
    {
      "comment_id": "UgzLIaaQS9JWoMss6S54AaABAg.8y5MV4aE2AI954yoEZYsLh",
      "parent_id": "UgzLIaaQS9JWoMss6S54AaABAg",
      "comment_type": "reply",
      "author": "@himanshirathore8707",
      "likes": 0,
      "published_at": "2020-02-16T05:51:54Z",
      "timestamp_refs": [],
      "text": "meealso",
      "parent_context": "aisa chemical bonding kisi ne nahi padhaya cleared all concepts and covered all exceptions I watched full playlist of chemical bonding"
    },
    {
      "comment_id": "UgzLIaaQS9JWoMss6S54AaABAg.8y5MV4aE2AI9764BI5QaFj",
      "parent_id": "UgzLIaaQS9JWoMss6S54AaABAg",
      "comment_type": "reply",
      "author": "@flow_state2607",
      "likes": 7,
      "published_at": "2020-04-06T09:09:39Z",
      "timestamp_refs": [],
      "text": "Litrally a genuine truth I am able to solve all questions of bonding",
      "parent_context": "aisa chemical bonding kisi ne nahi padhaya cleared all concepts and covered all exceptions I watched full playlist of chemical bonding"
    },
    {
      "comment_id": "UgzLIaaQS9JWoMss6S54AaABAg.8y5MV4aE2AI97PZuCJzpa-",
      "parent_id": "UgzLIaaQS9JWoMss6S54AaABAg",
      "comment_type": "reply",
      "author": "@AmitSharma-qz1gz",
      "likes": 6,
      "published_at": "2020-04-13T22:52:22Z",
      "timestamp_refs": [],
      "text": "@padmashrikandalkar755 basic of all topic has covered Cencage me sare exceptions hn But wo 11th ke hisb se irrelevant hn Aur 12th me repeat ho jaige ,so don't worry",
      "parent_context": "aisa chemical bonding kisi ne nahi padhaya cleared all concepts and covered all exceptions I watched full playlist of chemical bonding"
    },
    {
      "comment_id": "UgzLIaaQS9JWoMss6S54AaABAg.8y5MV4aE2AI97QZ2dksDQn",
      "parent_id": "UgzLIaaQS9JWoMss6S54AaABAg",
      "comment_type": "reply",
      "author": "@padmashrikandalkar755",
      "likes": 1,
      "published_at": "2020-04-14T08:04:09Z",
      "timestamp_refs": [],
      "text": "@AmitSharma-qz1gz okay🤘thanks",
      "parent_context": "aisa chemical bonding kisi ne nahi padhaya cleared all concepts and covered all exceptions I watched full playlist of chemical bonding"
    },
    {
      "comment_id": "UgzLIaaQS9JWoMss6S54AaABAg.8y5MV4aE2AI97QjdIfK_jo",
      "parent_id": "UgzLIaaQS9JWoMss6S54AaABAg",
      "comment_type": "reply",
      "author": "@AmitSharma-qz1gz",
      "likes": 0,
      "published_at": "2020-04-14T09:45:25Z",
      "timestamp_refs": [],
      "text": "@padmashrikandalkar755 you are in 11th class or dropper..?",
      "parent_context": "aisa chemical bonding kisi ne nahi padhaya cleared all concepts and covered all exceptions I watched full playlist of chemical bonding"
    },
    {
      "comment_id": "UgzLIaaQS9JWoMss6S54AaABAg.8y5MV4aE2AI98wGQI7dIS4",
      "parent_id": "UgzLIaaQS9JWoMss6S54AaABAg",
      "comment_type": "reply",
      "author": "@manishayadav7194",
      "likes": 0,
      "published_at": "2020-05-21T21:27:42Z",
      "timestamp_refs": [],
      "text": "Is it the last one??",
      "parent_context": "aisa chemical bonding kisi ne nahi padhaya cleared all concepts and covered all exceptions I watched full playlist of chemical bonding"
    },
    {
      "comment_id": "UgzLIaaQS9JWoMss6S54AaABAg.8y5MV4aE2AI99MH-0cTgNO",
      "parent_id": "UgzLIaaQS9JWoMss6S54AaABAg",
      "comment_type": "reply",
      "author": "@manishayadav7194",
      "likes": 0,
      "published_at": "2020-06-01T09:12:12Z",
      "timestamp_refs": [],
      "text": "Is it this the complete content????",
      "parent_context": "aisa chemical bonding kisi ne nahi padhaya cleared all concepts and covered all exceptions I watched full playlist of chemical bonding"
    },
    {
      "comment_id": "UgzLIaaQS9JWoMss6S54AaABAg.8y5MV4aE2AI9BQZZ4gJ1wM",
      "parent_id": "UgzLIaaQS9JWoMss6S54AaABAg",
      "comment_type": "reply",
      "author": "@ashishkumarpurohit3809",
      "likes": 0,
      "published_at": "2020-07-22T18:14:10Z",
      "timestamp_refs": [],
      "text": "Total video no. ???",
      "parent_context": "aisa chemical bonding kisi ne nahi padhaya cleared all concepts and covered all exceptions I watched full playlist of chemical bonding"
    },
    {
      "comment_id": "UgzLIaaQS9JWoMss6S54AaABAg.8y5MV4aE2AI9BntfNyhXYE",
      "parent_id": "UgzLIaaQS9JWoMss6S54AaABAg",
      "comment_type": "reply",
      "author": "@flow_state2607",
      "likes": 1,
      "published_at": "2020-08-01T05:00:26Z",
      "timestamp_refs": [],
      "text": "Shuddhasattwa Chakrabarty yes .only becoz of Mr.Alak panday sir",
      "parent_context": "aisa chemical bonding kisi ne nahi padhaya cleared all concepts and covered all exceptions I watched full playlist of chemical bonding"
    },
    {
      "comment_id": "UgzLIaaQS9JWoMss6S54AaABAg.8y5MV4aE2AI9C7YtkD-mWX",
      "parent_id": "UgzLIaaQS9JWoMss6S54AaABAg",
      "comment_type": "reply",
      "author": "@deepkumargupta5628",
      "likes": 5,
      "published_at": "2020-08-09T05:34:12Z",
      "timestamp_refs": [],
      "text": "I also I am in class 10th and started preparation",
      "parent_context": "aisa chemical bonding kisi ne nahi padhaya cleared all concepts and covered all exceptions I watched full playlist of chemical bonding"
    },
    {
      "comment_id": "UgzLIaaQS9JWoMss6S54AaABAg.8y5MV4aE2AI9CN6jBOjOy6",
      "parent_id": "UgzLIaaQS9JWoMss6S54AaABAg",
      "comment_type": "reply",
      "author": "@NarutoUzumaki-xg2fz",
      "likes": 1,
      "published_at": "2020-08-15T06:35:57Z",
      "timestamp_refs": [],
      "text": "Me too😇",
      "parent_context": "aisa chemical bonding kisi ne nahi padhaya cleared all concepts and covered all exceptions I watched full playlist of chemical bonding"
    },
    {
      "comment_id": "UgzLIaaQS9JWoMss6S54AaABAg.8y5MV4aE2AI9CN6r0zYD_1",
      "parent_id": "UgzLIaaQS9JWoMss6S54AaABAg",
      "comment_type": "reply",
      "author": "@NarutoUzumaki-xg2fz",
      "likes": 15,
      "published_at": "2020-08-15T06:37:01Z",
      "timestamp_refs": [],
      "text": "@deepkumargupta5628 started preparation of 11th😲 Ruko jara, sabar kro😂",
      "parent_context": "aisa chemical bonding kisi ne nahi padhaya cleared all concepts and covered all exceptions I watched full playlist of chemical bonding"
    },
    {
      "comment_id": "UgzLIaaQS9JWoMss6S54AaABAg.8y5MV4aE2AI9CrjBovr9GG",
      "parent_id": "UgzLIaaQS9JWoMss6S54AaABAg",
      "comment_type": "reply",
      "author": "@soumya6337",
      "likes": 0,
      "published_at": "2020-08-27T13:17:14Z",
      "timestamp_refs": [],
      "text": "Sehi bola behen..alakh sir zindabad..salute to.u sir..u r great",
      "parent_context": "aisa chemical bonding kisi ne nahi padhaya cleared all concepts and covered all exceptions I watched full playlist of chemical bonding"
    },
    {
      "comment_id": "UgzLIaaQS9JWoMss6S54AaABAg.8y5MV4aE2AI9DC1gyaSCAB",
      "parent_id": "UgzLIaaQS9JWoMss6S54AaABAg",
      "comment_type": "reply",
      "author": "@visheshsingh2415",
      "likes": 0,
      "published_at": "2020-09-04T19:51:42Z",
      "timestamp_refs": [],
      "text": "Me too",
      "parent_context": "aisa chemical bonding kisi ne nahi padhaya cleared all concepts and covered all exceptions I watched full playlist of chemical bonding"
    },
    {
      "comment_id": "UgzLIaaQS9JWoMss6S54AaABAg.8y5MV4aE2AI9DTHDh5QWZe",
      "parent_id": "UgzLIaaQS9JWoMss6S54AaABAg",
      "comment_type": "reply",
      "author": "@priyanshudivyanshu",
      "likes": 0,
      "published_at": "2020-09-11T12:34:28Z",
      "timestamp_refs": [],
      "text": "Me too",
      "parent_context": "aisa chemical bonding kisi ne nahi padhaya cleared all concepts and covered all exceptions I watched full playlist of chemical bonding"
    },
    {
      "comment_id": "UgzLIaaQS9JWoMss6S54AaABAg.8y5MV4aE2AI9ECEH0qezCR",
      "parent_id": "UgzLIaaQS9JWoMss6S54AaABAg",
      "comment_type": "reply",
      "author": "@anshumanmishra5813",
      "likes": 1,
      "published_at": "2020-09-29T18:13:01Z",
      "timestamp_refs": [],
      "text": "Shuddhasattwa Chakrabarty I'm solving for mentors package and yes by watching these lectures",
      "parent_context": "aisa chemical bonding kisi ne nahi padhaya cleared all concepts and covered all exceptions I watched full playlist of chemical bonding"
    },
    {
      "comment_id": "UgzLIaaQS9JWoMss6S54AaABAg.8y5MV4aE2AI9F6Hqiq-2qD",
      "parent_id": "UgzLIaaQS9JWoMss6S54AaABAg",
      "comment_type": "reply",
      "author": "@o_0788",
      "likes": 1,
      "published_at": "2020-10-22T07:20:11Z",
      "timestamp_refs": [],
      "text": "Made Ur likes perfect 555😆😆 But ruined Ur perfect 33 replies to 34😝😂",
      "parent_context": "aisa chemical bonding kisi ne nahi padhaya cleared all concepts and covered all exceptions I watched full playlist of chemical bonding"
    },
    {
      "comment_id": "UgzLIaaQS9JWoMss6S54AaABAg.8y5MV4aE2AI9F6K9SJyjF7",
      "parent_id": "UgzLIaaQS9JWoMss6S54AaABAg",
      "comment_type": "reply",
      "author": "@kavvindelulu",
      "likes": 0,
      "published_at": "2020-10-22T07:40:21Z",
      "timestamp_refs": [],
      "text": "@o_0788 Then let's make it 44😁😂",
      "parent_context": "aisa chemical bonding kisi ne nahi padhaya cleared all concepts and covered all exceptions I watched full playlist of chemical bonding"
    },
    {
      "comment_id": "UgzLIaaQS9JWoMss6S54AaABAg.8y5MV4aE2AI9F6L1v6ZxE0",
      "parent_id": "UgzLIaaQS9JWoMss6S54AaABAg",
      "comment_type": "reply",
      "author": "@o_0788",
      "likes": 0,
      "published_at": "2020-10-22T07:48:04Z",
      "timestamp_refs": [],
      "text": "@kavvindelulu Yeah!! Nice idea 😂 We have already made it 36 So just wait for some more people to make it \"perfect 44\" Rather than replying 8 times more😅😂",
      "parent_context": "aisa chemical bonding kisi ne nahi padhaya cleared all concepts and covered all exceptions I watched full playlist of chemical bonding"
    },
    {
      "comment_id": "UgzLIaaQS9JWoMss6S54AaABAg.8y5MV4aE2AI9F6M3t01oHY",
      "parent_id": "UgzLIaaQS9JWoMss6S54AaABAg",
      "comment_type": "reply",
      "author": "@kavvindelulu",
      "likes": 1,
      "published_at": "2020-10-22T07:57:04Z",
      "timestamp_refs": [],
      "text": "@o_0788 Wait !!! We will make it😂😂😂",
      "parent_context": "aisa chemical bonding kisi ne nahi padhaya cleared all concepts and covered all exceptions I watched full playlist of chemical bonding"
    },
    {
      "comment_id": "UgzLIaaQS9JWoMss6S54AaABAg.8y5MV4aE2AI9F6O87lkIef",
      "parent_id": "UgzLIaaQS9JWoMss6S54AaABAg",
      "comment_type": "reply",
      "author": "@o_0788",
      "likes": 0,
      "published_at": "2020-10-22T08:15:08Z",
      "timestamp_refs": [],
      "text": "@kavvindelulu okayyy let's just make it😂 U just reply to my replies and we'll stop after that \"perfect 44\"😆",
      "parent_context": "aisa chemical bonding kisi ne nahi padhaya cleared all concepts and covered all exceptions I watched full playlist of chemical bonding"
    },
    {
      "comment_id": "UgzLIaaQS9JWoMss6S54AaABAg.8y5MV4aE2AI9F6ZOzJL1CS",
      "parent_id": "UgzLIaaQS9JWoMss6S54AaABAg",
      "comment_type": "reply",
      "author": "@kavvindelulu",
      "likes": 0,
      "published_at": "2020-10-22T09:53:33Z",
      "timestamp_refs": [],
      "text": "@o_0788 🤣🤣🤣🤣🤣Let's do so😂😂",
      "parent_context": "aisa chemical bonding kisi ne nahi padhaya cleared all concepts and covered all exceptions I watched full playlist of chemical bonding"
    },
    {
      "comment_id": "UgzLIaaQS9JWoMss6S54AaABAg.8y5MV4aE2AI9F6ZSGAxbG5",
      "parent_id": "UgzLIaaQS9JWoMss6S54AaABAg",
      "comment_type": "reply",
      "author": "@kavvindelulu",
      "likes": 0,
      "published_at": "2020-10-22T09:54:00Z",
      "timestamp_refs": [],
      "text": "@o_0788 reply me fast😂😂",
      "parent_context": "aisa chemical bonding kisi ne nahi padhaya cleared all concepts and covered all exceptions I watched full playlist of chemical bonding"
    },
    {
      "comment_id": "UgzLIaaQS9JWoMss6S54AaABAg.8y5MV4aE2AI9F6aOTpgMyf",
      "parent_id": "UgzLIaaQS9JWoMss6S54AaABAg",
      "comment_type": "reply",
      "author": "@o_0788",
      "likes": 1,
      "published_at": "2020-10-22T10:10:57Z",
      "timestamp_refs": [],
      "text": "@kavvindelulu okk done:-D But the perfect likes are already ruined😅😂",
      "parent_context": "aisa chemical bonding kisi ne nahi padhaya cleared all concepts and covered all exceptions I watched full playlist of chemical bonding"
    },
    {
      "comment_id": "UgzLIaaQS9JWoMss6S54AaABAg.8y5MV4aE2AI9F6aojfmx2S",
      "parent_id": "UgzLIaaQS9JWoMss6S54AaABAg",
      "comment_type": "reply",
      "author": "@kavvindelulu",
      "likes": 1,
      "published_at": "2020-10-22T10:14:41Z",
      "timestamp_refs": [],
      "text": "@o_0788 🤣🤣🤣Ohh nooo it's not fair..... It had went in to water😪🤣🤣🤣🤣",
      "parent_context": "aisa chemical bonding kisi ne nahi padhaya cleared all concepts and covered all exceptions I watched full playlist of chemical bonding"
    },
    {
      "comment_id": "UgzLIaaQS9JWoMss6S54AaABAg.8y5MV4aE2AI9F6bLWu0pjT",
      "parent_id": "UgzLIaaQS9JWoMss6S54AaABAg",
      "comment_type": "reply",
      "author": "@o_0788",
      "likes": 0,
      "published_at": "2020-10-22T10:19:17Z",
      "timestamp_refs": [],
      "text": "@kavvindelulu ohh it's just \"perfectly\" fine with me😂 Even I am not replying as much fast as u😅",
      "parent_context": "aisa chemical bonding kisi ne nahi padhaya cleared all concepts and covered all exceptions I watched full playlist of chemical bonding"
    },
    {
      "comment_id": "UgzLIaaQS9JWoMss6S54AaABAg.8y5MV4aE2AI9F6kssj6VRn",
      "parent_id": "UgzLIaaQS9JWoMss6S54AaABAg",
      "comment_type": "reply",
      "author": "@kavvindelulu",
      "likes": 0,
      "published_at": "2020-10-22T11:42:37Z",
      "timestamp_refs": [],
      "text": "@o_0788 ohh dont mind😅 its about to 44 😂",
      "parent_context": "aisa chemical bonding kisi ne nahi padhaya cleared all concepts and covered all exceptions I watched full playlist of chemical bonding"
    },
    {
      "comment_id": "UgzLIaaQS9JWoMss6S54AaABAg.8y5MV4aE2AI9F6lkt7l9KF",
      "parent_id": "UgzLIaaQS9JWoMss6S54AaABAg",
      "comment_type": "reply",
      "author": "@o_0788",
      "likes": 2,
      "published_at": "2020-10-22T11:50:16Z",
      "timestamp_refs": [],
      "text": "@kavvindelulu Yeah finally it's 44. I hope it doesn't get ruined as soon as likes😂 It was nice to meeting u😄 Thnx for helping me in order to achieve that \"perfect 44\"😂 Byiii 😊",
      "parent_context": "aisa chemical bonding kisi ne nahi padhaya cleared all concepts and covered all exceptions I watched full playlist of chemical bonding"
    },
    {
      "comment_id": "UgzLIaaQS9JWoMss6S54AaABAg.8y5MV4aE2AI9FEusHNJERp",
      "parent_id": "UgzLIaaQS9JWoMss6S54AaABAg",
      "comment_type": "reply",
      "author": "@smile-me2ik",
      "likes": 0,
      "published_at": "2020-10-25T15:43:51Z",
      "timestamp_refs": [],
      "text": "Tum 10-12 logo se padhne hi ku gye...🤣🤣🤣. Seedhe yhin aate ... Meri tarah😎😎😁😁",
      "parent_context": "aisa chemical bonding kisi ne nahi padhaya cleared all concepts and covered all exceptions I watched full playlist of chemical bonding"
    },
    {
      "comment_id": "UgzLIaaQS9JWoMss6S54AaABAg.8y5MV4aE2AI9FRYCVcMWIk",
      "parent_id": "UgzLIaaQS9JWoMss6S54AaABAg",
      "comment_type": "reply",
      "author": "@afzal636",
      "likes": 0,
      "published_at": "2020-10-30T13:27:09Z",
      "timestamp_refs": [],
      "text": "maine bhi saare dekh liye but main sab bhul gya Pehle ka kya Karu plz suggest something.it would be really helpful.",
      "parent_context": "aisa chemical bonding kisi ne nahi padhaya cleared all concepts and covered all exceptions I watched full playlist of chemical bonding"
    },
    {
      "comment_id": "UgzLIaaQS9JWoMss6S54AaABAg.8y5MV4aE2AI9FRgE653YhI",
      "parent_id": "UgzLIaaQS9JWoMss6S54AaABAg",
      "comment_type": "reply",
      "author": "@o_0788",
      "likes": 0,
      "published_at": "2020-10-30T14:46:01Z",
      "timestamp_refs": [],
      "text": "@afzal636 keep revising simultaneously with new concepts That's the only way😅",
      "parent_context": "aisa chemical bonding kisi ne nahi padhaya cleared all concepts and covered all exceptions I watched full playlist of chemical bonding"
    },
    {
      "comment_id": "UgzLIaaQS9JWoMss6S54AaABAg.8y5MV4aE2AI9FRv71Dmzmt",
      "parent_id": "UgzLIaaQS9JWoMss6S54AaABAg",
      "comment_type": "reply",
      "author": "@afzal636",
      "likes": 0,
      "published_at": "2020-10-30T16:56:07Z",
      "timestamp_refs": [],
      "text": "@o_0788 ok mujhe laga mere sath hi aisa horha",
      "parent_context": "aisa chemical bonding kisi ne nahi padhaya cleared all concepts and covered all exceptions I watched full playlist of chemical bonding"
    },
    {
      "comment_id": "UgzLIaaQS9JWoMss6S54AaABAg.8y5MV4aE2AI9GilNgA1H1y",
      "parent_id": "UgzLIaaQS9JWoMss6S54AaABAg",
      "comment_type": "reply",
      "author": "@HimanshuSingh-gl9qd",
      "likes": 0,
      "published_at": "2020-12-01T11:48:44Z",
      "timestamp_refs": [],
      "text": "@anusmitasamanta2608 koi sense hai is baat ka🤣🤣",
      "parent_context": "aisa chemical bonding kisi ne nahi padhaya cleared all concepts and covered all exceptions I watched full playlist of chemical bonding"
    },
    {
      "comment_id": "UgzLIaaQS9JWoMss6S54AaABAg.8y5MV4aE2AI9Gs3ghZwsqb",
      "parent_id": "UgzLIaaQS9JWoMss6S54AaABAg",
      "comment_type": "reply",
      "author": "@musicalhits1082",
      "likes": 0,
      "published_at": "2020-12-05T02:30:40Z",
      "timestamp_refs": [],
      "text": "Nhi bhai ....alakh sir ne best padhaya lekin .......silicates ,aur 6-7 topic rh gya ....",
      "parent_context": "aisa chemical bonding kisi ne nahi padhaya cleared all concepts and covered all exceptions I watched full playlist of chemical bonding"
    },
    {
      "comment_id": "UgzLIaaQS9JWoMss6S54AaABAg.8y5MV4aE2AI9Gs3pyk6Uph",
      "parent_id": "UgzLIaaQS9JWoMss6S54AaABAg",
      "comment_type": "reply",
      "author": "@musicalhits1082",
      "likes": 1,
      "published_at": "2020-12-05T02:31:56Z",
      "timestamp_refs": [],
      "text": "@anusmitasamanta2608 practice naam ki bhi koi cheez hoti hai....video dekho questions lagao practice kro revision kro ...tb selection hota hai ..",
      "parent_context": "aisa chemical bonding kisi ne nahi padhaya cleared all concepts and covered all exceptions I watched full playlist of chemical bonding"
    },
    {
      "comment_id": "UgzLIaaQS9JWoMss6S54AaABAg.8y5MV4aE2AI9Gt0fM3LjgB",
      "parent_id": "UgzLIaaQS9JWoMss6S54AaABAg",
      "comment_type": "reply",
      "author": "@anusmitasamanta2608",
      "likes": 1,
      "published_at": "2020-12-05T11:23:30Z",
      "timestamp_refs": [],
      "text": "@musicalhits1082 hn bhaii wo sabka pta h ki practice krna h hard work krna but uske saath saath concepts clear hona is very imp and this person is giving quality education that too free. This man had helped me a lot in concept clarity. So eventually when your concept is clear it becomes easy for you to solve questions and eventually you love solving. So bitch yahan gyan pelne maat aao!",
      "parent_context": "aisa chemical bonding kisi ne nahi padhaya cleared all concepts and covered all exceptions I watched full playlist of chemical bonding"
    },
    {
      "comment_id": "UgzLIaaQS9JWoMss6S54AaABAg.8y5MV4aE2AI9GyyqOTJJQZ",
      "parent_id": "UgzLIaaQS9JWoMss6S54AaABAg",
      "comment_type": "reply",
      "author": "@MasterMind-b3f",
      "likes": 0,
      "published_at": "2020-12-07T18:54:15Z",
      "timestamp_refs": [],
      "text": "You all are talking why don't we create a group for studying 😄😃",
      "parent_context": "aisa chemical bonding kisi ne nahi padhaya cleared all concepts and covered all exceptions I watched full playlist of chemical bonding"
    },
    {
      "comment_id": "UgzLIaaQS9JWoMss6S54AaABAg.8y5MV4aE2AI9H7CZm45WD9",
      "parent_id": "UgzLIaaQS9JWoMss6S54AaABAg",
      "comment_type": "reply",
      "author": "@aadishchakravorty5145",
      "likes": 2,
      "published_at": "2020-12-11T08:56:04Z",
      "timestamp_refs": [],
      "text": "Same",
      "parent_context": "aisa chemical bonding kisi ne nahi padhaya cleared all concepts and covered all exceptions I watched full playlist of chemical bonding"
    },
    {
      "comment_id": "UgzLIaaQS9JWoMss6S54AaABAg.8y5MV4aE2AI9H7Cr4kEgSb",
      "parent_id": "UgzLIaaQS9JWoMss6S54AaABAg",
      "comment_type": "reply",
      "author": "@aadishchakravorty5145",
      "likes": 0,
      "published_at": "2020-12-11T08:58:34Z",
      "timestamp_refs": [],
      "text": "@anilmourya1152 not only 11th and 12th for class 10th and jee also",
      "parent_context": "aisa chemical bonding kisi ne nahi padhaya cleared all concepts and covered all exceptions I watched full playlist of chemical bonding"
    },
    {
      "comment_id": "UgzLIaaQS9JWoMss6S54AaABAg.8y5MV4aE2AI9IHjSEUTaKJ",
      "parent_id": "UgzLIaaQS9JWoMss6S54AaABAg",
      "comment_type": "reply",
      "author": "@antiltamanna08",
      "likes": 1,
      "published_at": "2021-01-09T07:35:56Z",
      "timestamp_refs": [],
      "text": "Me 2😎😎",
      "parent_context": "aisa chemical bonding kisi ne nahi padhaya cleared all concepts and covered all exceptions I watched full playlist of chemical bonding"
    },
    {
      "comment_id": "UgzLIaaQS9JWoMss6S54AaABAg.8y5MV4aE2AI9IPpFtQTEli",
      "parent_id": "UgzLIaaQS9JWoMss6S54AaABAg",
      "comment_type": "reply",
      "author": "@storyguy2554",
      "likes": 2,
      "published_at": "2021-01-12T11:00:36Z",
      "timestamp_refs": [],
      "text": "mere teacher aapse jyada talented hai ,chemical bonding chapter 1 din me hi complete kar diye ,aur app 16 lecture me chemical bonding complete kare rahae hai. mere teacher J.N.Upadhyay hydrogen bonding 2 min me complete kar diye aur app 1 hour leliye😁😎😎😎😎😎😎😎😭😭😭😭 so in conclusion I would like to state you that continue caring towards us ,thanks for your hard work towards us ALAKH PANDER SIR....... we love you sir \"hello bachon\"..........😭😭😭😭😭😭😭😭😭😭",
      "parent_context": "aisa chemical bonding kisi ne nahi padhaya cleared all concepts and covered all exceptions I watched full playlist of chemical bonding"
    },
    {
      "comment_id": "UgzLIaaQS9JWoMss6S54AaABAg.8y5MV4aE2AI9JMYlg0pnbG",
      "parent_id": "UgzLIaaQS9JWoMss6S54AaABAg",
      "comment_type": "reply",
      "author": "@My_voice2002",
      "likes": 0,
      "published_at": "2021-02-05T01:01:28Z",
      "timestamp_refs": [],
      "text": "@storyguy2554 Alakh sir really a good teacher ❤️ for physics 🥰 n chemistry",
      "parent_context": "aisa chemical bonding kisi ne nahi padhaya cleared all concepts and covered all exceptions I watched full playlist of chemical bonding"
    },
    {
      "comment_id": "UgzLIaaQS9JWoMss6S54AaABAg.8y5MV4aE2AI9LIwLad86VM",
      "parent_id": "UgzLIaaQS9JWoMss6S54AaABAg",
      "comment_type": "reply",
      "author": "@pronaybhoumick1897",
      "likes": 0,
      "published_at": "2021-03-25T08:22:03Z",
      "timestamp_refs": [],
      "text": "I did in 3 days",
      "parent_context": "aisa chemical bonding kisi ne nahi padhaya cleared all concepts and covered all exceptions I watched full playlist of chemical bonding"
    },
    {
      "comment_id": "UgzLIaaQS9JWoMss6S54AaABAg.8y5MV4aE2AI9NRpDyItk-h",
      "parent_id": "UgzLIaaQS9JWoMss6S54AaABAg",
      "comment_type": "reply",
      "author": "@happiness5716",
      "likes": 1,
      "published_at": "2021-05-17T12:15:48Z",
      "timestamp_refs": [],
      "text": "Yes even I tried to solve JEE question ....and successfully able to solve them.....wow that's great sir thanku",
      "parent_context": "aisa chemical bonding kisi ne nahi padhaya cleared all concepts and covered all exceptions I watched full playlist of chemical bonding"
    },
    {
      "comment_id": "UgzLIaaQS9JWoMss6S54AaABAg.8y5MV4aE2AI9PShjsiBfkF",
      "parent_id": "UgzLIaaQS9JWoMss6S54AaABAg",
      "comment_type": "reply",
      "author": "@ritikagoyal6877",
      "likes": 0,
      "published_at": "2021-07-06T13:32:25Z",
      "timestamp_refs": [],
      "text": "If mene basic se kia means first time yeh chapter to yeh playlist enough hai kya?",
      "parent_context": "aisa chemical bonding kisi ne nahi padhaya cleared all concepts and covered all exceptions I watched full playlist of chemical bonding"
    },
    {
      "comment_id": "UgzLIaaQS9JWoMss6S54AaABAg.8y5MV4aE2AI9PShmaAhlx3",
      "parent_id": "UgzLIaaQS9JWoMss6S54AaABAg",
      "comment_type": "reply",
      "author": "@ritikagoyal6877",
      "likes": 0,
      "published_at": "2021-07-06T13:32:47Z",
      "timestamp_refs": [],
      "text": "Mtlb isme sb cover hai kya",
      "parent_context": "aisa chemical bonding kisi ne nahi padhaya cleared all concepts and covered all exceptions I watched full playlist of chemical bonding"
    },
    {
      "comment_id": "UgzLIaaQS9JWoMss6S54AaABAg.8y5MV4aE2AI9PSrvlZGB-9",
      "parent_id": "UgzLIaaQS9JWoMss6S54AaABAg",
      "comment_type": "reply",
      "author": "@khushimittaliya3808",
      "likes": 0,
      "published_at": "2021-07-06T15:01:25Z",
      "timestamp_refs": [],
      "text": "@ritikagoyal6877 yes and some questions practice for sure",
      "parent_context": "aisa chemical bonding kisi ne nahi padhaya cleared all concepts and covered all exceptions I watched full playlist of chemical bonding"
    },
    {
      "comment_id": "UgzLIaaQS9JWoMss6S54AaABAg.8y5MV4aE2AI9Q11JQQCxh5",
      "parent_id": "UgzLIaaQS9JWoMss6S54AaABAg",
      "comment_type": "reply",
      "author": "@geeteshpaidi200",
      "likes": 0,
      "published_at": "2021-07-20T16:04:50Z",
      "timestamp_refs": [],
      "text": "And i made your likes 1k",
      "parent_context": "aisa chemical bonding kisi ne nahi padhaya cleared all concepts and covered all exceptions I watched full playlist of chemical bonding"
    },
    {
      "comment_id": "UgzLIaaQS9JWoMss6S54AaABAg.8y5MV4aE2AI9T9wcJLytY_",
      "parent_id": "UgzLIaaQS9JWoMss6S54AaABAg",
      "comment_type": "reply",
      "author": "@pwguide7.5kviews89",
      "likes": 0,
      "published_at": "2021-10-06T16:42:28Z",
      "timestamp_refs": [],
      "text": "Hi 🌹🌹🌹🌹🌹",
      "parent_context": "aisa chemical bonding kisi ne nahi padhaya cleared all concepts and covered all exceptions I watched full playlist of chemical bonding"
    },
    {
      "comment_id": "UgzLIaaQS9JWoMss6S54AaABAg.8y5MV4aE2AI9TJyFyhEYFz",
      "parent_id": "UgzLIaaQS9JWoMss6S54AaABAg",
      "comment_type": "reply",
      "author": "@kavitagupta4166",
      "likes": 0,
      "published_at": "2021-10-10T14:09:09Z",
      "timestamp_refs": [],
      "text": "I too watched whole playlist",
      "parent_context": "aisa chemical bonding kisi ne nahi padhaya cleared all concepts and covered all exceptions I watched full playlist of chemical bonding"
    },
    {
      "comment_id": "UgzLIaaQS9JWoMss6S54AaABAg.8y5MV4aE2AI9TNW6Mx8qI1",
      "parent_id": "UgzLIaaQS9JWoMss6S54AaABAg",
      "comment_type": "reply",
      "author": "@Ayush-cs7eg",
      "likes": 0,
      "published_at": "2021-10-11T23:11:24Z",
      "timestamp_refs": [],
      "text": "Hello khushi",
      "parent_context": "aisa chemical bonding kisi ne nahi padhaya cleared all concepts and covered all exceptions I watched full playlist of chemical bonding"
    },
    {
      "comment_id": "UgzLIaaQS9JWoMss6S54AaABAg.8y5MV4aE2AI9eq9IvVnhgW",
      "parent_id": "UgzLIaaQS9JWoMss6S54AaABAg",
      "comment_type": "reply",
      "author": "@MoonLight-tr2gr",
      "likes": 0,
      "published_at": "2022-08-17T17:46:05Z",
      "timestamp_refs": [],
      "text": "Me too",
      "parent_context": "aisa chemical bonding kisi ne nahi padhaya cleared all concepts and covered all exceptions I watched full playlist of chemical bonding"
    },
    {
      "comment_id": "UgzLIaaQS9JWoMss6S54AaABAg.8y5MV4aE2AI9fDOdQJqAyF",
      "parent_id": "UgzLIaaQS9JWoMss6S54AaABAg",
      "comment_type": "reply",
      "author": "@sakshiineet",
      "likes": 0,
      "published_at": "2022-08-27T03:41:52Z",
      "timestamp_refs": [],
      "text": "Me too really loved it😍😍❤❤",
      "parent_context": "aisa chemical bonding kisi ne nahi padhaya cleared all concepts and covered all exceptions I watched full playlist of chemical bonding"
    },
    {
      "comment_id": "UgzLIaaQS9JWoMss6S54AaABAg.8y5MV4aE2AI9fDOnDTwWQt",
      "parent_id": "UgzLIaaQS9JWoMss6S54AaABAg",
      "comment_type": "reply",
      "author": "@sakshiineet",
      "likes": 0,
      "published_at": "2022-08-27T03:43:12Z",
      "timestamp_refs": [],
      "text": "@ashishkumarpurohit3809 16",
      "parent_context": "aisa chemical bonding kisi ne nahi padhaya cleared all concepts and covered all exceptions I watched full playlist of chemical bonding"
    },
    {
      "comment_id": "UgzLIaaQS9JWoMss6S54AaABAg.8y5MV4aE2AI9gzhXa6e7UH",
      "parent_id": "UgzLIaaQS9JWoMss6S54AaABAg",
      "comment_type": "reply",
      "author": "@Tsukito-luvs",
      "likes": 0,
      "published_at": "2022-10-10T03:49:53Z",
      "timestamp_refs": [],
      "text": "Me too",
      "parent_context": "aisa chemical bonding kisi ne nahi padhaya cleared all concepts and covered all exceptions I watched full playlist of chemical bonding"
    },
    {
      "comment_id": "UgzLIaaQS9JWoMss6S54AaABAg.8y5MV4aE2AI9okN8eqNTe_",
      "parent_id": "UgzLIaaQS9JWoMss6S54AaABAg",
      "comment_type": "reply",
      "author": "@SinghMITM",
      "likes": 0,
      "published_at": "2023-04-21T01:05:31Z",
      "timestamp_refs": [],
      "text": "​@anusmitasamanta2608 btw sirf dekhne se koi top nhi krta ...ushke baad v padhna padta h ....but chances Jayda hoti h",
      "parent_context": "aisa chemical bonding kisi ne nahi padhaya cleared all concepts and covered all exceptions I watched full playlist of chemical bonding"
    },
    {
      "comment_id": "UgzLIaaQS9JWoMss6S54AaABAg.8y5MV4aE2AI9xLfeG5T4y0",
      "parent_id": "UgzLIaaQS9JWoMss6S54AaABAg",
      "comment_type": "reply",
      "author": "@shiva_store",
      "likes": 0,
      "published_at": "2023-11-20T18:18:18Z",
      "timestamp_refs": [],
      "text": "I also",
      "parent_context": "aisa chemical bonding kisi ne nahi padhaya cleared all concepts and covered all exceptions I watched full playlist of chemical bonding"
    },
    {
      "comment_id": "UgzLIaaQS9JWoMss6S54AaABAg.8y5MV4aE2AIA7ySC5RpsWe",
      "parent_id": "UgzLIaaQS9JWoMss6S54AaABAg",
      "comment_type": "reply",
      "author": "@Rajputji119",
      "likes": 0,
      "published_at": "2024-09-04T14:46:56Z",
      "timestamp_refs": [],
      "text": "Pankaj sir",
      "parent_context": "aisa chemical bonding kisi ne nahi padhaya cleared all concepts and covered all exceptions I watched full playlist of chemical bonding"
    },
    {
      "comment_id": "UgzLIaaQS9JWoMss6S54AaABAg.8y5MV4aE2AIA9m-rkyplLl",
      "parent_id": "UgzLIaaQS9JWoMss6S54AaABAg",
      "comment_type": "reply",
      "author": "@AnmolKumar-cn5hg",
      "likes": 0,
      "published_at": "2024-10-19T11:51:15Z",
      "timestamp_refs": [],
      "text": "I also",
      "parent_context": "aisa chemical bonding kisi ne nahi padhaya cleared all concepts and covered all exceptions I watched full playlist of chemical bonding"
    },
    {
      "comment_id": "UgzLIaaQS9JWoMss6S54AaABAg.8y5MV4aE2AIAAdukMkfO3U",
      "parent_id": "UgzLIaaQS9JWoMss6S54AaABAg",
      "comment_type": "reply",
      "author": "@AnshPathak-nq7ul",
      "likes": 0,
      "published_at": "2024-11-10T04:55:17Z",
      "timestamp_refs": [],
      "text": "​@ritikagoyal6877which college you got?",
      "parent_context": "aisa chemical bonding kisi ne nahi padhaya cleared all concepts and covered all exceptions I watched full playlist of chemical bonding"
    },
    {
      "comment_id": "UgzLIaaQS9JWoMss6S54AaABAg.8y5MV4aE2AIAIbfsaMYgRt",
      "parent_id": "UgzLIaaQS9JWoMss6S54AaABAg",
      "comment_type": "reply",
      "author": "@VenuMadhaviDivi",
      "likes": 0,
      "published_at": "2025-05-27T04:18:00Z",
      "timestamp_refs": [],
      "text": "🎉​@jassgill9999",
      "parent_context": "aisa chemical bonding kisi ne nahi padhaya cleared all concepts and covered all exceptions I watched full playlist of chemical bonding"
    },
    {
      "comment_id": "Ugx191z89aY_JiejdGd4AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@shantiratha6276",
      "likes": 995,
      "published_at": "2020-04-18T11:27:05Z",
      "timestamp_refs": [
        "26:30"
      ],
      "text": "26:30 if you feel demotivated because of huge syllabus pls study because I am in class 12 th and i have to study this again..pls don't waste your time like me beçause like this many topics are correlated with class12th... Study your class 11th seriously... All the best guys 🙂👍thumbs up for sir who tell us side by side what will be used in class 12th",
      "parent_context": ""
    },
    {
      "comment_id": "Ugx191z89aY_JiejdGd4AaABAg.97aDSRpz9Gn99MUIP_LAVG",
      "parent_id": "Ugx191z89aY_JiejdGd4AaABAg",
      "comment_type": "reply",
      "author": "@manishayadav7194",
      "likes": 44,
      "published_at": "2020-06-01T11:08:27Z",
      "timestamp_refs": [],
      "text": "I did the same!! Didn't took these seriously in 11th Regreted a lot bt now releivied cos of him🙂🙂🙂",
      "parent_context": "26:30 if you feel demotivated because of huge syllabus pls study because I am in class 12 th and i have to study this again..pls don't waste your time like me beçause like this many topics are correlated with class12th... Study your class 11th seriously... All the best guys 🙂👍thumbs up for sir who tell us side by side what will be used in class 12th"
    },
    {
      "comment_id": "Ugx191z89aY_JiejdGd4AaABAg.97aDSRpz9Gn99qRSHg7FY2",
      "parent_id": "Ugx191z89aY_JiejdGd4AaABAg",
      "comment_type": "reply",
      "author": "@dhruvaetoor1553",
      "likes": 24,
      "published_at": "2020-06-13T11:40:02Z",
      "timestamp_refs": [],
      "text": "Same ,I'm also from 12th😭😭",
      "parent_context": "26:30 if you feel demotivated because of huge syllabus pls study because I am in class 12 th and i have to study this again..pls don't waste your time like me beçause like this many topics are correlated with class12th... Study your class 11th seriously... All the best guys 🙂👍thumbs up for sir who tell us side by side what will be used in class 12th"
    },
    {
      "comment_id": "Ugx191z89aY_JiejdGd4AaABAg.97aDSRpz9Gn9AHfclElVps",
      "parent_id": "Ugx191z89aY_JiejdGd4AaABAg",
      "comment_type": "reply",
      "author": "@Prachi-ef9uy",
      "likes": 19,
      "published_at": "2020-06-24T10:51:25Z",
      "timestamp_refs": [],
      "text": "Same here man I just don't know how do I complete this backlog which happened as I was demotivated throughout the year seeing 11th syllabus when I was in 11th and now I have to do all these 😞😓😔😔",
      "parent_context": "26:30 if you feel demotivated because of huge syllabus pls study because I am in class 12 th and i have to study this again..pls don't waste your time like me beçause like this many topics are correlated with class12th... Study your class 11th seriously... All the best guys 🙂👍thumbs up for sir who tell us side by side what will be used in class 12th"
    },
    {
      "comment_id": "Ugx191z89aY_JiejdGd4AaABAg.97aDSRpz9Gn9AHuKDzXQZC",
      "parent_id": "Ugx191z89aY_JiejdGd4AaABAg",
      "comment_type": "reply",
      "author": "@dhruvaetoor1553",
      "likes": 3,
      "published_at": "2020-06-24T12:59:49Z",
      "timestamp_refs": [],
      "text": "@Prachi-ef9uy u r from?",
      "parent_context": "26:30 if you feel demotivated because of huge syllabus pls study because I am in class 12 th and i have to study this again..pls don't waste your time like me beçause like this many topics are correlated with class12th... Study your class 11th seriously... All the best guys 🙂👍thumbs up for sir who tell us side by side what will be used in class 12th"
    },
    {
      "comment_id": "Ugx191z89aY_JiejdGd4AaABAg.97aDSRpz9Gn9AKfW-Sc6zk",
      "parent_id": "Ugx191z89aY_JiejdGd4AaABAg",
      "comment_type": "reply",
      "author": "@Prachi-ef9uy",
      "likes": 4,
      "published_at": "2020-06-25T14:48:04Z",
      "timestamp_refs": [],
      "text": "@dhruvaetoor1553 🤔🤔 gujarat . Btw how r u coping up with completing these concepts as well as of 12th😔😞😔",
      "parent_context": "26:30 if you feel demotivated because of huge syllabus pls study because I am in class 12 th and i have to study this again..pls don't waste your time like me beçause like this many topics are correlated with class12th... Study your class 11th seriously... All the best guys 🙂👍thumbs up for sir who tell us side by side what will be used in class 12th"
    },
    {
      "comment_id": "Ugx191z89aY_JiejdGd4AaABAg.97aDSRpz9Gn9AjutNwo7DM",
      "parent_id": "Ugx191z89aY_JiejdGd4AaABAg",
      "comment_type": "reply",
      "author": "@bhavyasaini6070",
      "likes": 10,
      "published_at": "2020-07-05T19:22:43Z",
      "timestamp_refs": [],
      "text": "Same here ... I am in 12 class and still watching this as my concepts are not clear , also it is important for NEET ... I am regretting it now 😢",
      "parent_context": "26:30 if you feel demotivated because of huge syllabus pls study because I am in class 12 th and i have to study this again..pls don't waste your time like me beçause like this many topics are correlated with class12th... Study your class 11th seriously... All the best guys 🙂👍thumbs up for sir who tell us side by side what will be used in class 12th"
    },
    {
      "comment_id": "Ugx191z89aY_JiejdGd4AaABAg.97aDSRpz9Gn9AkzGHeJuax",
      "parent_id": "Ugx191z89aY_JiejdGd4AaABAg",
      "comment_type": "reply",
      "author": "@dhruvaetoor1553",
      "likes": 4,
      "published_at": "2020-07-06T05:20:11Z",
      "timestamp_refs": [],
      "text": "@Prachi-ef9uy I'n just revising these bro I completed 11th syllabus ago. I need to start 12th syllabus",
      "parent_context": "26:30 if you feel demotivated because of huge syllabus pls study because I am in class 12 th and i have to study this again..pls don't waste your time like me beçause like this many topics are correlated with class12th... Study your class 11th seriously... All the best guys 🙂👍thumbs up for sir who tell us side by side what will be used in class 12th"
    },
    {
      "comment_id": "Ugx191z89aY_JiejdGd4AaABAg.97aDSRpz9Gn9Al-FbuwbN-",
      "parent_id": "Ugx191z89aY_JiejdGd4AaABAg",
      "comment_type": "reply",
      "author": "@Prachi-ef9uy",
      "likes": 4,
      "published_at": "2020-07-06T05:28:50Z",
      "timestamp_refs": [],
      "text": "@dhruvaetoor1553 that's gud even i worked on these concepts and asked seniors which parts are gonna be used in 12th n m done with most of them . Just a quick revision is mandatory 😅😁",
      "parent_context": "26:30 if you feel demotivated because of huge syllabus pls study because I am in class 12 th and i have to study this again..pls don't waste your time like me beçause like this many topics are correlated with class12th... Study your class 11th seriously... All the best guys 🙂👍thumbs up for sir who tell us side by side what will be used in class 12th"
    },
    {
      "comment_id": "Ugx191z89aY_JiejdGd4AaABAg.97aDSRpz9Gn9AlmLF6fNfG",
      "parent_id": "Ugx191z89aY_JiejdGd4AaABAg",
      "comment_type": "reply",
      "author": "@dhruvaetoor1553",
      "likes": 2,
      "published_at": "2020-07-06T12:46:30Z",
      "timestamp_refs": [],
      "text": "@Prachi-ef9uy toppers😏",
      "parent_context": "26:30 if you feel demotivated because of huge syllabus pls study because I am in class 12 th and i have to study this again..pls don't waste your time like me beçause like this many topics are correlated with class12th... Study your class 11th seriously... All the best guys 🙂👍thumbs up for sir who tell us side by side what will be used in class 12th"
    },
    {
      "comment_id": "Ugx191z89aY_JiejdGd4AaABAg.97aDSRpz9Gn9AlrpZ0qZHK",
      "parent_id": "Ugx191z89aY_JiejdGd4AaABAg",
      "comment_type": "reply",
      "author": "@Prachi-ef9uy",
      "likes": 4,
      "published_at": "2020-07-06T13:34:28Z",
      "timestamp_refs": [],
      "text": "@dhruvaetoor1553 I wish I were . Anyway thnks for virtually making me feel so 😆",
      "parent_context": "26:30 if you feel demotivated because of huge syllabus pls study because I am in class 12 th and i have to study this again..pls don't waste your time like me beçause like this many topics are correlated with class12th... Study your class 11th seriously... All the best guys 🙂👍thumbs up for sir who tell us side by side what will be used in class 12th"
    },
    {
      "comment_id": "Ugx191z89aY_JiejdGd4AaABAg.97aDSRpz9Gn9AojSTji0OH",
      "parent_id": "Ugx191z89aY_JiejdGd4AaABAg",
      "comment_type": "reply",
      "author": "@dhruvaetoor1553",
      "likes": 5,
      "published_at": "2020-07-07T16:19:00Z",
      "timestamp_refs": [],
      "text": "@Prachi-ef9uy 🤷 btw help me bro! I'm struck in math",
      "parent_context": "26:30 if you feel demotivated because of huge syllabus pls study because I am in class 12 th and i have to study this again..pls don't waste your time like me beçause like this many topics are correlated with class12th... Study your class 11th seriously... All the best guys 🙂👍thumbs up for sir who tell us side by side what will be used in class 12th"
    },
    {
      "comment_id": "Ugx191z89aY_JiejdGd4AaABAg.97aDSRpz9Gn9AomS18olQ3",
      "parent_id": "Ugx191z89aY_JiejdGd4AaABAg",
      "comment_type": "reply",
      "author": "@Prachi-ef9uy",
      "likes": 4,
      "published_at": "2020-07-07T16:45:09Z",
      "timestamp_refs": [],
      "text": "@dhruvaetoor1553 😸I m not pcm student . Sincere apologies 😔🙏if.i were , I would have definitely given u a hand in doing so☹️",
      "parent_context": "26:30 if you feel demotivated because of huge syllabus pls study because I am in class 12 th and i have to study this again..pls don't waste your time like me beçause like this many topics are correlated with class12th... Study your class 11th seriously... All the best guys 🙂👍thumbs up for sir who tell us side by side what will be used in class 12th"
    },
    {
      "comment_id": "Ugx191z89aY_JiejdGd4AaABAg.97aDSRpz9Gn9AqFzkhg4ig",
      "parent_id": "Ugx191z89aY_JiejdGd4AaABAg",
      "comment_type": "reply",
      "author": "@dhruvaetoor1553",
      "likes": 5,
      "published_at": "2020-07-08T06:31:17Z",
      "timestamp_refs": [],
      "text": "@Prachi-ef9uy accha it's ok😔 Wt abt phy?hw r u doing it?",
      "parent_context": "26:30 if you feel demotivated because of huge syllabus pls study because I am in class 12 th and i have to study this again..pls don't waste your time like me beçause like this many topics are correlated with class12th... Study your class 11th seriously... All the best guys 🙂👍thumbs up for sir who tell us side by side what will be used in class 12th"
    },
    {
      "comment_id": "Ugx191z89aY_JiejdGd4AaABAg.97aDSRpz9Gn9AqGQW6NJV1",
      "parent_id": "Ugx191z89aY_JiejdGd4AaABAg",
      "comment_type": "reply",
      "author": "@Prachi-ef9uy",
      "likes": 2,
      "published_at": "2020-07-08T06:35:04Z",
      "timestamp_refs": [],
      "text": "@dhruvaetoor1553 I m not doing too much for physics as for me working hard didn't give me as much results as I could have gotten if I had focused on other subjects so I m rather focusing on other subjects oflate 😔😔",
      "parent_context": "26:30 if you feel demotivated because of huge syllabus pls study because I am in class 12 th and i have to study this again..pls don't waste your time like me beçause like this many topics are correlated with class12th... Study your class 11th seriously... All the best guys 🙂👍thumbs up for sir who tell us side by side what will be used in class 12th"
    },
    {
      "comment_id": "Ugx191z89aY_JiejdGd4AaABAg.97aDSRpz9Gn9AqMS-Kdkso",
      "parent_id": "Ugx191z89aY_JiejdGd4AaABAg",
      "comment_type": "reply",
      "author": "@dhruvaetoor1553",
      "likes": 0,
      "published_at": "2020-07-08T07:27:42Z",
      "timestamp_refs": [],
      "text": "@Prachi-ef9uy so u r fcsng more on chem?",
      "parent_context": "26:30 if you feel demotivated because of huge syllabus pls study because I am in class 12 th and i have to study this again..pls don't waste your time like me beçause like this many topics are correlated with class12th... Study your class 11th seriously... All the best guys 🙂👍thumbs up for sir who tell us side by side what will be used in class 12th"
    },
    {
      "comment_id": "Ugx191z89aY_JiejdGd4AaABAg.97aDSRpz9Gn9AqS1SRSkz0",
      "parent_id": "Ugx191z89aY_JiejdGd4AaABAg",
      "comment_type": "reply",
      "author": "@Prachi-ef9uy",
      "likes": 0,
      "published_at": "2020-07-08T08:16:30Z",
      "timestamp_refs": [],
      "text": "@dhruvaetoor1553 yeah 😁ap kis me kar rahi ho 🙃?",
      "parent_context": "26:30 if you feel demotivated because of huge syllabus pls study because I am in class 12 th and i have to study this again..pls don't waste your time like me beçause like this many topics are correlated with class12th... Study your class 11th seriously... All the best guys 🙂👍thumbs up for sir who tell us side by side what will be used in class 12th"
    },
    {
      "comment_id": "Ugx191z89aY_JiejdGd4AaABAg.97aDSRpz9Gn9ArLX0RvbfM",
      "parent_id": "Ugx191z89aY_JiejdGd4AaABAg",
      "comment_type": "reply",
      "author": "@dhruvaetoor1553",
      "likes": 0,
      "published_at": "2020-07-08T16:38:53Z",
      "timestamp_refs": [],
      "text": "@Prachi-ef9uy bitsast book",
      "parent_context": "26:30 if you feel demotivated because of huge syllabus pls study because I am in class 12 th and i have to study this again..pls don't waste your time like me beçause like this many topics are correlated with class12th... Study your class 11th seriously... All the best guys 🙂👍thumbs up for sir who tell us side by side what will be used in class 12th"
    },
    {
      "comment_id": "Ugx191z89aY_JiejdGd4AaABAg.97aDSRpz9Gn9ArQ_h9vbc0",
      "parent_id": "Ugx191z89aY_JiejdGd4AaABAg",
      "comment_type": "reply",
      "author": "@Prachi-ef9uy",
      "likes": 0,
      "published_at": "2020-07-08T17:23:05Z",
      "timestamp_refs": [],
      "text": "@dhruvaetoor1553 accha 😄btw best of luck ❣️",
      "parent_context": "26:30 if you feel demotivated because of huge syllabus pls study because I am in class 12 th and i have to study this again..pls don't waste your time like me beçause like this many topics are correlated with class12th... Study your class 11th seriously... All the best guys 🙂👍thumbs up for sir who tell us side by side what will be used in class 12th"
    },
    {
      "comment_id": "Ugx191z89aY_JiejdGd4AaABAg.97aDSRpz9Gn9AsR89d_XuP",
      "parent_id": "Ugx191z89aY_JiejdGd4AaABAg",
      "comment_type": "reply",
      "author": "@dhruvaetoor1553",
      "likes": 1,
      "published_at": "2020-07-09T02:47:10Z",
      "timestamp_refs": [],
      "text": "@Prachi-ef9uyGonna stdy srsly nw ,woke up @7🥱",
      "parent_context": "26:30 if you feel demotivated because of huge syllabus pls study because I am in class 12 th and i have to study this again..pls don't waste your time like me beçause like this many topics are correlated with class12th... Study your class 11th seriously... All the best guys 🙂👍thumbs up for sir who tell us side by side what will be used in class 12th"
    },
    {
      "comment_id": "Ugx191z89aY_JiejdGd4AaABAg.97aDSRpz9Gn9As_Jj_TuSh",
      "parent_id": "Ugx191z89aY_JiejdGd4AaABAg",
      "comment_type": "reply",
      "author": "@Prachi-ef9uy",
      "likes": 2,
      "published_at": "2020-07-09T04:07:23Z",
      "timestamp_refs": [],
      "text": "@dhruvaetoor1553 great study hard dude 😄❣️",
      "parent_context": "26:30 if you feel demotivated because of huge syllabus pls study because I am in class 12 th and i have to study this again..pls don't waste your time like me beçause like this many topics are correlated with class12th... Study your class 11th seriously... All the best guys 🙂👍thumbs up for sir who tell us side by side what will be used in class 12th"
    },
    {
      "comment_id": "Ugx191z89aY_JiejdGd4AaABAg.97aDSRpz9Gn9AthNOT0dhi",
      "parent_id": "Ugx191z89aY_JiejdGd4AaABAg",
      "comment_type": "reply",
      "author": "@dhruvaetoor1553",
      "likes": 1,
      "published_at": "2020-07-09T14:37:02Z",
      "timestamp_refs": [],
      "text": "@Prachi-ef9uy Thnku,wish u d same💙",
      "parent_context": "26:30 if you feel demotivated because of huge syllabus pls study because I am in class 12 th and i have to study this again..pls don't waste your time like me beçause like this many topics are correlated with class12th... Study your class 11th seriously... All the best guys 🙂👍thumbs up for sir who tell us side by side what will be used in class 12th"
    },
    {
      "comment_id": "Ugx191z89aY_JiejdGd4AaABAg.97aDSRpz9Gn9Bcc2cnW1TE",
      "parent_id": "Ugx191z89aY_JiejdGd4AaABAg",
      "comment_type": "reply",
      "author": "@kumarutsav23",
      "likes": 14,
      "published_at": "2020-07-27T19:54:49Z",
      "timestamp_refs": [],
      "text": "@dhruvaetoor1553 I should get an award for reading random people chat at 1AM🙄. BTW in too in 12th and doing what I should have done 2 years back. Best Of Luck to you both",
      "parent_context": "26:30 if you feel demotivated because of huge syllabus pls study because I am in class 12 th and i have to study this again..pls don't waste your time like me beçause like this many topics are correlated with class12th... Study your class 11th seriously... All the best guys 🙂👍thumbs up for sir who tell us side by side what will be used in class 12th"
    },
    {
      "comment_id": "Ugx191z89aY_JiejdGd4AaABAg.97aDSRpz9Gn9BstKMthXkk",
      "parent_id": "Ugx191z89aY_JiejdGd4AaABAg",
      "comment_type": "reply",
      "author": "@heythere7230",
      "likes": 2,
      "published_at": "2020-08-03T03:33:38Z",
      "timestamp_refs": [],
      "text": "Thanqq for this helpful comment😄",
      "parent_context": "26:30 if you feel demotivated because of huge syllabus pls study because I am in class 12 th and i have to study this again..pls don't waste your time like me beçause like this many topics are correlated with class12th... Study your class 11th seriously... All the best guys 🙂👍thumbs up for sir who tell us side by side what will be used in class 12th"
    },
    {
      "comment_id": "Ugx191z89aY_JiejdGd4AaABAg.97aDSRpz9Gn9BtJPqMkVRD",
      "parent_id": "Ugx191z89aY_JiejdGd4AaABAg",
      "comment_type": "reply",
      "author": "@dhruvaetoor1553",
      "likes": 3,
      "published_at": "2020-08-03T07:30:18Z",
      "timestamp_refs": [],
      "text": "@kumarutsav23 I too do d same 😂",
      "parent_context": "26:30 if you feel demotivated because of huge syllabus pls study because I am in class 12 th and i have to study this again..pls don't waste your time like me beçause like this many topics are correlated with class12th... Study your class 11th seriously... All the best guys 🙂👍thumbs up for sir who tell us side by side what will be used in class 12th"
    },
    {
      "comment_id": "Ugx191z89aY_JiejdGd4AaABAg.97aDSRpz9Gn9CDJpP2TH27",
      "parent_id": "Ugx191z89aY_JiejdGd4AaABAg",
      "comment_type": "reply",
      "author": "@codehawkofficial",
      "likes": 3,
      "published_at": "2020-08-11T11:17:59Z",
      "timestamp_refs": [],
      "text": "@dhruvaetoor1553 i am also in 12th. i did backchodi in 11th. and from backchodi it became backlog.",
      "parent_context": "26:30 if you feel demotivated because of huge syllabus pls study because I am in class 12 th and i have to study this again..pls don't waste your time like me beçause like this many topics are correlated with class12th... Study your class 11th seriously... All the best guys 🙂👍thumbs up for sir who tell us side by side what will be used in class 12th"
    },
    {
      "comment_id": "Ugx191z89aY_JiejdGd4AaABAg.97aDSRpz9Gn9EECIsizd4s",
      "parent_id": "Ugx191z89aY_JiejdGd4AaABAg",
      "comment_type": "reply",
      "author": "@Stethogirlwithmoves",
      "likes": 1,
      "published_at": "2020-09-30T12:34:16Z",
      "timestamp_refs": [],
      "text": "m also in 12th",
      "parent_context": "26:30 if you feel demotivated because of huge syllabus pls study because I am in class 12 th and i have to study this again..pls don't waste your time like me beçause like this many topics are correlated with class12th... Study your class 11th seriously... All the best guys 🙂👍thumbs up for sir who tell us side by side what will be used in class 12th"
    },
    {
      "comment_id": "Ugx191z89aY_JiejdGd4AaABAg.97aDSRpz9Gn9EFgdwybPvp",
      "parent_id": "Ugx191z89aY_JiejdGd4AaABAg",
      "comment_type": "reply",
      "author": "@shantiratha6276",
      "likes": 0,
      "published_at": "2020-10-01T02:27:24Z",
      "timestamp_refs": [],
      "text": "@Stethogirlwithmoves all the best 👍💯for exams",
      "parent_context": "26:30 if you feel demotivated because of huge syllabus pls study because I am in class 12 th and i have to study this again..pls don't waste your time like me beçause like this many topics are correlated with class12th... Study your class 11th seriously... All the best guys 🙂👍thumbs up for sir who tell us side by side what will be used in class 12th"
    },
    {
      "comment_id": "Ugx191z89aY_JiejdGd4AaABAg.97aDSRpz9Gn9Ejoj_XliqI",
      "parent_id": "Ugx191z89aY_JiejdGd4AaABAg",
      "comment_type": "reply",
      "author": "@nature7334",
      "likes": 3,
      "published_at": "2020-10-13T04:34:32Z",
      "timestamp_refs": [],
      "text": "@manishayadav7194 I AM IN 11TH 🤤🙏",
      "parent_context": "26:30 if you feel demotivated because of huge syllabus pls study because I am in class 12 th and i have to study this again..pls don't waste your time like me beçause like this many topics are correlated with class12th... Study your class 11th seriously... All the best guys 🙂👍thumbs up for sir who tell us side by side what will be used in class 12th"
    },
    {
      "comment_id": "Ugx191z89aY_JiejdGd4AaABAg.97aDSRpz9Gn9Eju-m19v3j",
      "parent_id": "Ugx191z89aY_JiejdGd4AaABAg",
      "comment_type": "reply",
      "author": "@manishayadav7194",
      "likes": 0,
      "published_at": "2020-10-13T05:20:34Z",
      "timestamp_refs": [],
      "text": "@nature7334 good for uhh!!!don't do the mistake like I did!!",
      "parent_context": "26:30 if you feel demotivated because of huge syllabus pls study because I am in class 12 th and i have to study this again..pls don't waste your time like me beçause like this many topics are correlated with class12th... Study your class 11th seriously... All the best guys 🙂👍thumbs up for sir who tell us side by side what will be used in class 12th"
    },
    {
      "comment_id": "Ugx191z89aY_JiejdGd4AaABAg.97aDSRpz9Gn9FEvBaLBtsS",
      "parent_id": "Ugx191z89aY_JiejdGd4AaABAg",
      "comment_type": "reply",
      "author": "@smile-me2ik",
      "likes": 0,
      "published_at": "2020-10-25T15:46:37Z",
      "timestamp_refs": [],
      "text": "Tabhi hm padh rhe in class 11 #saveTears😁😁",
      "parent_context": "26:30 if you feel demotivated because of huge syllabus pls study because I am in class 12 th and i have to study this again..pls don't waste your time like me beçause like this many topics are correlated with class12th... Study your class 11th seriously... All the best guys 🙂👍thumbs up for sir who tell us side by side what will be used in class 12th"
    },
    {
      "comment_id": "Ugx191z89aY_JiejdGd4AaABAg.97aDSRpz9Gn9FH_ifKXstW",
      "parent_id": "Ugx191z89aY_JiejdGd4AaABAg",
      "comment_type": "reply",
      "author": "@nature7334",
      "likes": 0,
      "published_at": "2020-10-26T16:36:45Z",
      "timestamp_refs": [],
      "text": "@manishayadav7194 lagging very much 😥",
      "parent_context": "26:30 if you feel demotivated because of huge syllabus pls study because I am in class 12 th and i have to study this again..pls don't waste your time like me beçause like this many topics are correlated with class12th... Study your class 11th seriously... All the best guys 🙂👍thumbs up for sir who tell us side by side what will be used in class 12th"
    },
    {
      "comment_id": "Ugx191z89aY_JiejdGd4AaABAg.97aDSRpz9Gn9FHjdbNcP7V",
      "parent_id": "Ugx191z89aY_JiejdGd4AaABAg",
      "comment_type": "reply",
      "author": "@manishayadav7194",
      "likes": 0,
      "published_at": "2020-10-26T18:03:27Z",
      "timestamp_refs": [],
      "text": "@nature7334 uh can coverup don't worry",
      "parent_context": "26:30 if you feel demotivated because of huge syllabus pls study because I am in class 12 th and i have to study this again..pls don't waste your time like me beçause like this many topics are correlated with class12th... Study your class 11th seriously... All the best guys 🙂👍thumbs up for sir who tell us side by side what will be used in class 12th"
    },
    {
      "comment_id": "Ugx191z89aY_JiejdGd4AaABAg.97aDSRpz9Gn9FnQXNeO1L3",
      "parent_id": "Ugx191z89aY_JiejdGd4AaABAg",
      "comment_type": "reply",
      "author": "@brar5770",
      "likes": 0,
      "published_at": "2020-11-08T10:42:38Z",
      "timestamp_refs": [],
      "text": "is there a good teacher of maths on youtube please tell",
      "parent_context": "26:30 if you feel demotivated because of huge syllabus pls study because I am in class 12 th and i have to study this again..pls don't waste your time like me beçause like this many topics are correlated with class12th... Study your class 11th seriously... All the best guys 🙂👍thumbs up for sir who tell us side by side what will be used in class 12th"
    },
    {
      "comment_id": "Ugx191z89aY_JiejdGd4AaABAg.97aDSRpz9Gn9FsukoAHhzh",
      "parent_id": "Ugx191z89aY_JiejdGd4AaABAg",
      "comment_type": "reply",
      "author": "@manjuvij8807",
      "likes": 0,
      "published_at": "2020-11-10T13:51:41Z",
      "timestamp_refs": [],
      "text": "Try mcqhttps://www.youtube.com/playlist?list=PL-7DAAPdMJDxThJywnipCcA5DTHvsCYRt",
      "parent_context": "26:30 if you feel demotivated because of huge syllabus pls study because I am in class 12 th and i have to study this again..pls don't waste your time like me beçause like this many topics are correlated with class12th... Study your class 11th seriously... All the best guys 🙂👍thumbs up for sir who tell us side by side what will be used in class 12th"
    },
    {
      "comment_id": "Ugx191z89aY_JiejdGd4AaABAg.97aDSRpz9Gn9GgWkfwDg1P",
      "parent_id": "Ugx191z89aY_JiejdGd4AaABAg",
      "comment_type": "reply",
      "author": "@lakshyaaaaaahhhhh4903",
      "likes": 0,
      "published_at": "2020-11-30T14:53:43Z",
      "timestamp_refs": [],
      "text": "@SHREYASI KARMAKAR same goes with me🥺",
      "parent_context": "26:30 if you feel demotivated because of huge syllabus pls study because I am in class 12 th and i have to study this again..pls don't waste your time like me beçause like this many topics are correlated with class12th... Study your class 11th seriously... All the best guys 🙂👍thumbs up for sir who tell us side by side what will be used in class 12th"
    },
    {
      "comment_id": "Ugx191z89aY_JiejdGd4AaABAg.97aDSRpz9Gn9HyKysF560_",
      "parent_id": "Ugx191z89aY_JiejdGd4AaABAg",
      "comment_type": "reply",
      "author": "@bhupendhingra1436",
      "likes": 0,
      "published_at": "2021-01-01T09:28:32Z",
      "timestamp_refs": [],
      "text": "@Shanti Ratha Is this same in physics???",
      "parent_context": "26:30 if you feel demotivated because of huge syllabus pls study because I am in class 12 th and i have to study this again..pls don't waste your time like me beçause like this many topics are correlated with class12th... Study your class 11th seriously... All the best guys 🙂👍thumbs up for sir who tell us side by side what will be used in class 12th"
    },
    {
      "comment_id": "Ugx191z89aY_JiejdGd4AaABAg.97aDSRpz9Gn9Ibs2tXqy0Z",
      "parent_id": "Ugx191z89aY_JiejdGd4AaABAg",
      "comment_type": "reply",
      "author": "@electric_deer2007",
      "likes": 0,
      "published_at": "2021-01-17T12:35:10Z",
      "timestamp_refs": [],
      "text": "Hey what about 11 th physics is it important for 12 th ??!!",
      "parent_context": "26:30 if you feel demotivated because of huge syllabus pls study because I am in class 12 th and i have to study this again..pls don't waste your time like me beçause like this many topics are correlated with class12th... Study your class 11th seriously... All the best guys 🙂👍thumbs up for sir who tell us side by side what will be used in class 12th"
    },
    {
      "comment_id": "Ugx191z89aY_JiejdGd4AaABAg.97aDSRpz9Gn9IbuWe5pS67",
      "parent_id": "Ugx191z89aY_JiejdGd4AaABAg",
      "comment_type": "reply",
      "author": "@electric_deer2007",
      "likes": 0,
      "published_at": "2021-01-17T12:56:43Z",
      "timestamp_refs": [],
      "text": "@SHREYASI KARMAKAR I am not doing JEE or neet I am only concentrating on 12 th so does 11 th physics help in 12 ths or are the chapters not related ?!",
      "parent_context": "26:30 if you feel demotivated because of huge syllabus pls study because I am in class 12 th and i have to study this again..pls don't waste your time like me beçause like this many topics are correlated with class12th... Study your class 11th seriously... All the best guys 🙂👍thumbs up for sir who tell us side by side what will be used in class 12th"
    },
    {
      "comment_id": "Ugx191z89aY_JiejdGd4AaABAg.97aDSRpz9Gn9IgZYjTigMW",
      "parent_id": "Ugx191z89aY_JiejdGd4AaABAg",
      "comment_type": "reply",
      "author": "@4Ntertainment",
      "likes": 0,
      "published_at": "2021-01-19T08:20:58Z",
      "timestamp_refs": [],
      "text": "Mene 400wa like kia🤓",
      "parent_context": "26:30 if you feel demotivated because of huge syllabus pls study because I am in class 12 th and i have to study this again..pls don't waste your time like me beçause like this many topics are correlated with class12th... Study your class 11th seriously... All the best guys 🙂👍thumbs up for sir who tell us side by side what will be used in class 12th"
    },
    {
      "comment_id": "Ugx191z89aY_JiejdGd4AaABAg.97aDSRpz9Gn9IkEL7QBpfE",
      "parent_id": "Ugx191z89aY_JiejdGd4AaABAg",
      "comment_type": "reply",
      "author": "@twilight7713",
      "likes": 1,
      "published_at": "2021-01-20T18:32:34Z",
      "timestamp_refs": [],
      "text": "We r on same page",
      "parent_context": "26:30 if you feel demotivated because of huge syllabus pls study because I am in class 12 th and i have to study this again..pls don't waste your time like me beçause like this many topics are correlated with class12th... Study your class 11th seriously... All the best guys 🙂👍thumbs up for sir who tell us side by side what will be used in class 12th"
    },
    {
      "comment_id": "Ugx191z89aY_JiejdGd4AaABAg.97aDSRpz9Gn9Ir0CQbvfKr",
      "parent_id": "Ugx191z89aY_JiejdGd4AaABAg",
      "comment_type": "reply",
      "author": "@electric_deer2007",
      "likes": 0,
      "published_at": "2021-01-23T09:43:44Z",
      "timestamp_refs": [],
      "text": "@Ronit Sinha I am also in 11 th idk but some people say we need to study waves search for the answer on quora",
      "parent_context": "26:30 if you feel demotivated because of huge syllabus pls study because I am in class 12 th and i have to study this again..pls don't waste your time like me beçause like this many topics are correlated with class12th... Study your class 11th seriously... All the best guys 🙂👍thumbs up for sir who tell us side by side what will be used in class 12th"
    },
    {
      "comment_id": "Ugx191z89aY_JiejdGd4AaABAg.97aDSRpz9Gn9IrG5dEc26J",
      "parent_id": "Ugx191z89aY_JiejdGd4AaABAg",
      "comment_type": "reply",
      "author": "@shantiratha6276",
      "likes": 1,
      "published_at": "2021-01-23T12:02:37Z",
      "timestamp_refs": [],
      "text": "@Ronit Sinha yess you need to have a general idea of wave equations... In twelfth class you have to study wave optics",
      "parent_context": "26:30 if you feel demotivated because of huge syllabus pls study because I am in class 12 th and i have to study this again..pls don't waste your time like me beçause like this many topics are correlated with class12th... Study your class 11th seriously... All the best guys 🙂👍thumbs up for sir who tell us side by side what will be used in class 12th"
    },
    {
      "comment_id": "Ugx191z89aY_JiejdGd4AaABAg.97aDSRpz9Gn9LObs3zYQgj",
      "parent_id": "Ugx191z89aY_JiejdGd4AaABAg",
      "comment_type": "reply",
      "author": "@rajivadithyasaigorle2759",
      "likes": 1,
      "published_at": "2021-03-27T13:18:34Z",
      "timestamp_refs": [],
      "text": "Thank you for sharing your experience with us",
      "parent_context": "26:30 if you feel demotivated because of huge syllabus pls study because I am in class 12 th and i have to study this again..pls don't waste your time like me beçause like this many topics are correlated with class12th... Study your class 11th seriously... All the best guys 🙂👍thumbs up for sir who tell us side by side what will be used in class 12th"
    },
    {
      "comment_id": "Ugx191z89aY_JiejdGd4AaABAg.97aDSRpz9Gn9LkDU7cBC8J",
      "parent_id": "Ugx191z89aY_JiejdGd4AaABAg",
      "comment_type": "reply",
      "author": "@Anand-Boss_1234",
      "likes": 0,
      "published_at": "2021-04-05T07:59:14Z",
      "timestamp_refs": [],
      "text": "Not thanks for information",
      "parent_context": "26:30 if you feel demotivated because of huge syllabus pls study because I am in class 12 th and i have to study this again..pls don't waste your time like me beçause like this many topics are correlated with class12th... Study your class 11th seriously... All the best guys 🙂👍thumbs up for sir who tell us side by side what will be used in class 12th"
    },
    {
      "comment_id": "Ugx191z89aY_JiejdGd4AaABAg.97aDSRpz9Gn9OZPd_bqu7D",
      "parent_id": "Ugx191z89aY_JiejdGd4AaABAg",
      "comment_type": "reply",
      "author": "@sanepooja",
      "likes": 0,
      "published_at": "2021-06-14T07:28:49Z",
      "timestamp_refs": [],
      "text": "same situation",
      "parent_context": "26:30 if you feel demotivated because of huge syllabus pls study because I am in class 12 th and i have to study this again..pls don't waste your time like me beçause like this many topics are correlated with class12th... Study your class 11th seriously... All the best guys 🙂👍thumbs up for sir who tell us side by side what will be used in class 12th"
    },
    {
      "comment_id": "Ugx191z89aY_JiejdGd4AaABAg.97aDSRpz9Gn9P3YoK7Q6RO",
      "parent_id": "Ugx191z89aY_JiejdGd4AaABAg",
      "comment_type": "reply",
      "author": "@btw_its_me7199",
      "likes": 0,
      "published_at": "2021-06-26T19:04:38Z",
      "timestamp_refs": [],
      "text": "Kya apko 11th ke finals me ye realise nahi hua tha ya phir is topic se q he nahi ate school examination me??🙂🙂",
      "parent_context": "26:30 if you feel demotivated because of huge syllabus pls study because I am in class 12 th and i have to study this again..pls don't waste your time like me beçause like this many topics are correlated with class12th... Study your class 11th seriously... All the best guys 🙂👍thumbs up for sir who tell us side by side what will be used in class 12th"
    },
    {
      "comment_id": "Ugx191z89aY_JiejdGd4AaABAg.97aDSRpz9Gn9PPt-u--zsr",
      "parent_id": "Ugx191z89aY_JiejdGd4AaABAg",
      "comment_type": "reply",
      "author": "@jayb71",
      "likes": 0,
      "published_at": "2021-07-05T11:13:08Z",
      "timestamp_refs": [],
      "text": "Same bro",
      "parent_context": "26:30 if you feel demotivated because of huge syllabus pls study because I am in class 12 th and i have to study this again..pls don't waste your time like me beçause like this many topics are correlated with class12th... Study your class 11th seriously... All the best guys 🙂👍thumbs up for sir who tell us side by side what will be used in class 12th"
    },
    {
      "comment_id": "Ugx191z89aY_JiejdGd4AaABAg.97aDSRpz9Gn9Pb7tQ2r1C9",
      "parent_id": "Ugx191z89aY_JiejdGd4AaABAg",
      "comment_type": "reply",
      "author": "@jayeshb9323",
      "likes": 0,
      "published_at": "2021-07-10T05:22:49Z",
      "timestamp_refs": [],
      "text": "Yes bro I regret it now",
      "parent_context": "26:30 if you feel demotivated because of huge syllabus pls study because I am in class 12 th and i have to study this again..pls don't waste your time like me beçause like this many topics are correlated with class12th... Study your class 11th seriously... All the best guys 🙂👍thumbs up for sir who tell us side by side what will be used in class 12th"
    },
    {
      "comment_id": "Ugx191z89aY_JiejdGd4AaABAg.97aDSRpz9Gn9T9wgN2_iWB",
      "parent_id": "Ugx191z89aY_JiejdGd4AaABAg",
      "comment_type": "reply",
      "author": "@pwguide7.5kviews89",
      "likes": 0,
      "published_at": "2021-10-06T16:43:01Z",
      "timestamp_refs": [],
      "text": "Hi 🌹",
      "parent_context": "26:30 if you feel demotivated because of huge syllabus pls study because I am in class 12 th and i have to study this again..pls don't waste your time like me beçause like this many topics are correlated with class12th... Study your class 11th seriously... All the best guys 🙂👍thumbs up for sir who tell us side by side what will be used in class 12th"
    },
    {
      "comment_id": "Ugx191z89aY_JiejdGd4AaABAg.97aDSRpz9Gn9a2hklzcDdX",
      "parent_id": "Ugx191z89aY_JiejdGd4AaABAg",
      "comment_type": "reply",
      "author": "@notkidding2709",
      "likes": 0,
      "published_at": "2022-04-20T17:29:01Z",
      "timestamp_refs": [],
      "text": "yo i wasted my +1 now in +2 never studied half of chapters and got only 76 percent in 12 where are you now btw",
      "parent_context": "26:30 if you feel demotivated because of huge syllabus pls study because I am in class 12 th and i have to study this again..pls don't waste your time like me beçause like this many topics are correlated with class12th... Study your class 11th seriously... All the best guys 🙂👍thumbs up for sir who tell us side by side what will be used in class 12th"
    },
    {
      "comment_id": "Ugx191z89aY_JiejdGd4AaABAg.97aDSRpz9Gn9n2JJ7qNOKC",
      "parent_id": "Ugx191z89aY_JiejdGd4AaABAg",
      "comment_type": "reply",
      "author": "@connecttech4065",
      "likes": 0,
      "published_at": "2023-03-09T16:34:46Z",
      "timestamp_refs": [],
      "text": "@notkidding2709 are you preparing for neet",
      "parent_context": "26:30 if you feel demotivated because of huge syllabus pls study because I am in class 12 th and i have to study this again..pls don't waste your time like me beçause like this many topics are correlated with class12th... Study your class 11th seriously... All the best guys 🙂👍thumbs up for sir who tell us side by side what will be used in class 12th"
    },
    {
      "comment_id": "Ugx191z89aY_JiejdGd4AaABAg.97aDSRpz9Gn9vbSsIdNoRT",
      "parent_id": "Ugx191z89aY_JiejdGd4AaABAg",
      "comment_type": "reply",
      "author": "@aadityamishra4633",
      "likes": 0,
      "published_at": "2023-10-08T13:42:11Z",
      "timestamp_refs": [],
      "text": "It's been 3 yrs what about your result Btw , I'm in 11th preparing for jee",
      "parent_context": "26:30 if you feel demotivated because of huge syllabus pls study because I am in class 12 th and i have to study this again..pls don't waste your time like me beçause like this many topics are correlated with class12th... Study your class 11th seriously... All the best guys 🙂👍thumbs up for sir who tell us side by side what will be used in class 12th"
    },
    {
      "comment_id": "Ugx191z89aY_JiejdGd4AaABAg.97aDSRpz9GnAK3QLXgaOTo",
      "parent_id": "Ugx191z89aY_JiejdGd4AaABAg",
      "comment_type": "reply",
      "author": "@MUKUND-0_0",
      "likes": 0,
      "published_at": "2025-07-02T04:42:55Z",
      "timestamp_refs": [],
      "text": "5 saal hogaye is comment ko and maine bhi same kaam kiya 🙂 history repeats itself.",
      "parent_context": "26:30 if you feel demotivated because of huge syllabus pls study because I am in class 12 th and i have to study this again..pls don't waste your time like me beçause like this many topics are correlated with class12th... Study your class 11th seriously... All the best guys 🙂👍thumbs up for sir who tell us side by side what will be used in class 12th"
    },
    {
      "comment_id": "Ugx191z89aY_JiejdGd4AaABAg.97aDSRpz9GnALtkKt0ohES",
      "parent_id": "Ugx191z89aY_JiejdGd4AaABAg",
      "comment_type": "reply",
      "author": "@COLEPALMERUZAIR20",
      "likes": 0,
      "published_at": "2025-08-16T18:17:28Z",
      "timestamp_refs": [],
      "text": "Leaving my mark here",
      "parent_context": "26:30 if you feel demotivated because of huge syllabus pls study because I am in class 12 th and i have to study this again..pls don't waste your time like me beçause like this many topics are correlated with class12th... Study your class 11th seriously... All the best guys 🙂👍thumbs up for sir who tell us side by side what will be used in class 12th"
    },
    {
      "comment_id": "Ugwp2skyO7A4MuNefGB4AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@aparnaverma1562",
      "likes": 724,
      "published_at": "2021-06-15T04:07:08Z",
      "timestamp_refs": [],
      "text": "Physics - Density is less. Maths - How much is less density. Chemistry - why density is less.",
      "parent_context": ""
    },
    {
      "comment_id": "Ugwp2skyO7A4MuNefGB4AaABAg.9OacMDZ6kFs9Tx8pAHR-v7",
      "parent_id": "Ugwp2skyO7A4MuNefGB4AaABAg",
      "comment_type": "reply",
      "author": "@SynCarter",
      "likes": 7,
      "published_at": "2021-10-26T04:39:50Z",
      "timestamp_refs": [],
      "text": "@akhilyadav7478 what are you even saying? That's rubbish.",
      "parent_context": "Physics - Density is less. Maths - How much is less density. Chemistry - why density is less."
    },
    {
      "comment_id": "Ugwp2skyO7A4MuNefGB4AaABAg.9OacMDZ6kFs9U0Asf8Z93Z",
      "parent_id": "Ugwp2skyO7A4MuNefGB4AaABAg",
      "comment_type": "reply",
      "author": "@kyle7604",
      "likes": 3,
      "published_at": "2021-10-27T18:14:45Z",
      "timestamp_refs": [],
      "text": "@SynCarter thats a topic in p block.",
      "parent_context": "Physics - Density is less. Maths - How much is less density. Chemistry - why density is less."
    },
    {
      "comment_id": "Ugwp2skyO7A4MuNefGB4AaABAg.9OacMDZ6kFs9U0FPk40FiQ",
      "parent_id": "Ugwp2skyO7A4MuNefGB4AaABAg",
      "comment_type": "reply",
      "author": "@SynCarter",
      "likes": 2,
      "published_at": "2021-10-27T18:54:22Z",
      "timestamp_refs": [],
      "text": "@kyle7604 you still awake?!",
      "parent_context": "Physics - Density is less. Maths - How much is less density. Chemistry - why density is less."
    },
    {
      "comment_id": "Ugwp2skyO7A4MuNefGB4AaABAg.9OacMDZ6kFs9UxOUZ3TGt1",
      "parent_id": "Ugwp2skyO7A4MuNefGB4AaABAg",
      "comment_type": "reply",
      "author": "@payalsahani4666",
      "likes": 1,
      "published_at": "2021-11-20T03:28:05Z",
      "timestamp_refs": [],
      "text": "He might be saying.. Brigde bond smthng?!",
      "parent_context": "Physics - Density is less. Maths - How much is less density. Chemistry - why density is less."
    },
    {
      "comment_id": "Ugwp2skyO7A4MuNefGB4AaABAg.9OacMDZ6kFs9XlcqgM8SdK",
      "parent_id": "Ugwp2skyO7A4MuNefGB4AaABAg",
      "comment_type": "reply",
      "author": "@swapnil.suryawanshi2002",
      "likes": 0,
      "published_at": "2022-01-29T03:25:37Z",
      "timestamp_refs": [],
      "text": "@swapnil suryawanshi",
      "parent_context": "Physics - Density is less. Maths - How much is less density. Chemistry - why density is less."
    },
    {
      "comment_id": "Ugwp2skyO7A4MuNefGB4AaABAg.9OacMDZ6kFs9Xld1GA3ODs",
      "parent_id": "Ugwp2skyO7A4MuNefGB4AaABAg",
      "comment_type": "reply",
      "author": "@swapnil.suryawanshi2002",
      "likes": 0,
      "published_at": "2022-01-29T03:27:12Z",
      "timestamp_refs": [],
      "text": "@Swapnil suryawanshi",
      "parent_context": "Physics - Density is less. Maths - How much is less density. Chemistry - why density is less."
    },
    {
      "comment_id": "Ugwp2skyO7A4MuNefGB4AaABAg.9OacMDZ6kFs9XleL0jpgj-",
      "parent_id": "Ugwp2skyO7A4MuNefGB4AaABAg",
      "comment_type": "reply",
      "author": "@hiteshpatil648",
      "likes": 0,
      "published_at": "2022-01-29T03:38:38Z",
      "timestamp_refs": [],
      "text": "@swapnil.suryawanshi2002 hi",
      "parent_context": "Physics - Density is less. Maths - How much is less density. Chemistry - why density is less."
    },
    {
      "comment_id": "Ugwp2skyO7A4MuNefGB4AaABAg.9OacMDZ6kFs9eQiF9QKbwU",
      "parent_id": "Ugwp2skyO7A4MuNefGB4AaABAg",
      "comment_type": "reply",
      "author": "@sujals7108",
      "likes": 2,
      "published_at": "2022-08-07T11:20:39Z",
      "timestamp_refs": [],
      "text": "@SynCarter banana bond is a real thing",
      "parent_context": "Physics - Density is less. Maths - How much is less density. Chemistry - why density is less."
    },
    {
      "comment_id": "Ugwp2skyO7A4MuNefGB4AaABAg.9OacMDZ6kFs9gy_tcv10TX",
      "parent_id": "Ugwp2skyO7A4MuNefGB4AaABAg",
      "comment_type": "reply",
      "author": "@mr.allrounder9412",
      "likes": 1,
      "published_at": "2022-10-09T17:23:53Z",
      "timestamp_refs": [],
      "text": "@akhilyadav7478 its bridge bond not bride bond",
      "parent_context": "Physics - Density is less. Maths - How much is less density. Chemistry - why density is less."
    },
    {
      "comment_id": "Ugwp2skyO7A4MuNefGB4AaABAg.9OacMDZ6kFs9hAQUJU4u3w",
      "parent_id": "Ugwp2skyO7A4MuNefGB4AaABAg",
      "comment_type": "reply",
      "author": "@mr.comicalbanda8260",
      "likes": 5,
      "published_at": "2022-10-14T17:03:02Z",
      "timestamp_refs": [],
      "text": "bhai par suna hai physics fact bata rahi chemistry reson. Chemistry=logic😂😂😂😂😂😂😂, 1% logic nahi inorganic mein",
      "parent_context": "Physics - Density is less. Maths - How much is less density. Chemistry - why density is less."
    },
    {
      "comment_id": "Ugwp2skyO7A4MuNefGB4AaABAg.9OacMDZ6kFs9sWFXBFnRTN",
      "parent_id": "Ugwp2skyO7A4MuNefGB4AaABAg",
      "comment_type": "reply",
      "author": "@notmeespresso",
      "likes": 0,
      "published_at": "2023-07-23T14:15:55Z",
      "timestamp_refs": [],
      "text": "That's why. Bio best hai🙂",
      "parent_context": "Physics - Density is less. Maths - How much is less density. Chemistry - why density is less."
    },
    {
      "comment_id": "Ugwp2skyO7A4MuNefGB4AaABAg.9OacMDZ6kFs9u7E6c7riUW",
      "parent_id": "Ugwp2skyO7A4MuNefGB4AaABAg",
      "comment_type": "reply",
      "author": "@kennendabreo3900",
      "likes": 0,
      "published_at": "2023-09-01T14:05:21Z",
      "timestamp_refs": [],
      "text": "Bro is high AF",
      "parent_context": "Physics - Density is less. Maths - How much is less density. Chemistry - why density is less."
    },
    {
      "comment_id": "Ugwp2skyO7A4MuNefGB4AaABAg.9OacMDZ6kFs9vfcGZyayxL",
      "parent_id": "Ugwp2skyO7A4MuNefGB4AaABAg",
      "comment_type": "reply",
      "author": "@chandershekhar4612",
      "likes": 0,
      "published_at": "2023-10-10T04:29:58Z",
      "timestamp_refs": [],
      "text": "Density is exception that's why",
      "parent_context": "Physics - Density is less. Maths - How much is less density. Chemistry - why density is less."
    },
    {
      "comment_id": "UgztxivaXR0xi3t5BoV4AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@anithamidde3381",
      "likes": 3610,
      "published_at": "2020-10-20T16:17:40Z",
      "timestamp_refs": [],
      "text": "Who else watched the entire playlist ??",
      "parent_context": ""
    },
    {
      "comment_id": "UgztxivaXR0xi3t5BoV4AaABAg.9F25lbYbmBz9HyBajzTdvP",
      "parent_id": "UgztxivaXR0xi3t5BoV4AaABAg",
      "comment_type": "reply",
      "author": "@chaitanyasharma1159",
      "likes": 37,
      "published_at": "2021-01-01T08:06:36Z",
      "timestamp_refs": [],
      "text": "I am on the last video. And I feel motivated after watching his videos😁😁",
      "parent_context": "Who else watched the entire playlist ??"
    },
    {
      "comment_id": "UgztxivaXR0xi3t5BoV4AaABAg.9F25lbYbmBz9Isy9uwOn2G",
      "parent_id": "UgztxivaXR0xi3t5BoV4AaABAg",
      "comment_type": "reply",
      "author": "@akshay_ghate_1704",
      "likes": 12,
      "published_at": "2021-01-24T03:55:39Z",
      "timestamp_refs": [],
      "text": "Me .... Now going to joint with alakh pandey sir on app ✈️✈️✈️",
      "parent_context": "Who else watched the entire playlist ??"
    },
    {
      "comment_id": "UgztxivaXR0xi3t5BoV4AaABAg.9F25lbYbmBz9It-uqYzslZ",
      "parent_id": "UgztxivaXR0xi3t5BoV4AaABAg",
      "comment_type": "reply",
      "author": "@taqi5689",
      "likes": 3,
      "published_at": "2021-01-24T04:19:40Z",
      "timestamp_refs": [],
      "text": "@akshay_ghate_1704 did you finished full 1th syllabus 🙄",
      "parent_context": "Who else watched the entire playlist ??"
    },
    {
      "comment_id": "UgztxivaXR0xi3t5BoV4AaABAg.9F25lbYbmBz9It0asLPQ9X",
      "parent_id": "UgztxivaXR0xi3t5BoV4AaABAg",
      "comment_type": "reply",
      "author": "@akshay_ghate_1704",
      "likes": 7,
      "published_at": "2021-01-24T04:25:41Z",
      "timestamp_refs": [],
      "text": "@taqi5689 no abhi to sirf chemistry Ka 4th chapter end Kiya hai",
      "parent_context": "Who else watched the entire playlist ??"
    },
    {
      "comment_id": "UgztxivaXR0xi3t5BoV4AaABAg.9F25lbYbmBz9IwidP7BDL7",
      "parent_id": "UgztxivaXR0xi3t5BoV4AaABAg",
      "comment_type": "reply",
      "author": "@misteranonymous5616",
      "likes": 4,
      "published_at": "2021-01-25T14:56:58Z",
      "timestamp_refs": [],
      "text": "@akshay_ghate_1704 Same :(, gotta study it all in one month",
      "parent_context": "Who else watched the entire playlist ??"
    },
    {
      "comment_id": "UgztxivaXR0xi3t5BoV4AaABAg.9F25lbYbmBz9IwjHOerpLx",
      "parent_id": "UgztxivaXR0xi3t5BoV4AaABAg",
      "comment_type": "reply",
      "author": "@akshay_ghate_1704",
      "likes": 4,
      "published_at": "2021-01-25T15:02:34Z",
      "timestamp_refs": [],
      "text": "@misteranonymous5616 yes 😀 I joint with sir on their app wow that's too gorgeous. I'm too happy",
      "parent_context": "Who else watched the entire playlist ??"
    },
    {
      "comment_id": "UgztxivaXR0xi3t5BoV4AaABAg.9F25lbYbmBz9JE5yP5kxKK",
      "parent_id": "UgztxivaXR0xi3t5BoV4AaABAg",
      "comment_type": "reply",
      "author": "@gdarcuesyt9025",
      "likes": 7,
      "published_at": "2021-02-01T18:15:53Z",
      "timestamp_refs": [],
      "text": "@akshay_ghate_1704 Resonance Wala lecture chahiye Sirr ka",
      "parent_context": "Who else watched the entire playlist ??"
    },
    {
      "comment_id": "UgztxivaXR0xi3t5BoV4AaABAg.9F25lbYbmBz9JGsI_FndmX",
      "parent_id": "UgztxivaXR0xi3t5BoV4AaABAg",
      "comment_type": "reply",
      "author": "@missnelofar195",
      "likes": 4,
      "published_at": "2021-02-02T20:05:25Z",
      "timestamp_refs": [],
      "text": "Me 😍",
      "parent_context": "Who else watched the entire playlist ??"
    },
    {
      "comment_id": "UgztxivaXR0xi3t5BoV4AaABAg.9F25lbYbmBz9JHZvacZVVl",
      "parent_id": "UgztxivaXR0xi3t5BoV4AaABAg",
      "comment_type": "reply",
      "author": "@gdarcuesyt9025",
      "likes": 2,
      "published_at": "2021-02-03T02:35:22Z",
      "timestamp_refs": [],
      "text": "@missnelofar195 me to",
      "parent_context": "Who else watched the entire playlist ??"
    },
    {
      "comment_id": "UgztxivaXR0xi3t5BoV4AaABAg.9F25lbYbmBz9Jw0SZOjKqJ",
      "parent_id": "UgztxivaXR0xi3t5BoV4AaABAg",
      "comment_type": "reply",
      "author": "@vaziqahmed4913",
      "likes": 2,
      "published_at": "2021-02-19T04:53:32Z",
      "timestamp_refs": [],
      "text": "His Videos are such a addiction that we cant stop after watching one video in playlist...✌🏻",
      "parent_context": "Who else watched the entire playlist ??"
    },
    {
      "comment_id": "UgztxivaXR0xi3t5BoV4AaABAg.9F25lbYbmBz9LTC2n43T8g",
      "parent_id": "UgztxivaXR0xi3t5BoV4AaABAg",
      "comment_type": "reply",
      "author": "@educationonly3373",
      "likes": 2,
      "published_at": "2021-03-29T08:00:26Z",
      "timestamp_refs": [],
      "text": "meee",
      "parent_context": "Who else watched the entire playlist ??"
    },
    {
      "comment_id": "UgztxivaXR0xi3t5BoV4AaABAg.9F25lbYbmBz9LmVkx5bdcC",
      "parent_id": "UgztxivaXR0xi3t5BoV4AaABAg",
      "comment_type": "reply",
      "author": "@mayer651",
      "likes": 0,
      "published_at": "2021-04-06T05:17:26Z",
      "timestamp_refs": [],
      "text": "Me and pms",
      "parent_context": "Who else watched the entire playlist ??"
    },
    {
      "comment_id": "UgztxivaXR0xi3t5BoV4AaABAg.9F25lbYbmBz9M-h-We7v8Q",
      "parent_id": "UgztxivaXR0xi3t5BoV4AaABAg",
      "comment_type": "reply",
      "author": "@ganeshjaiswal1656",
      "likes": 1,
      "published_at": "2021-04-11T17:33:47Z",
      "timestamp_refs": [],
      "text": "I am also find last video to motive myself🤣😅😅",
      "parent_context": "Who else watched the entire playlist ??"
    },
    {
      "comment_id": "UgztxivaXR0xi3t5BoV4AaABAg.9F25lbYbmBz9M-jPMoIwKk",
      "parent_id": "UgztxivaXR0xi3t5BoV4AaABAg",
      "comment_type": "reply",
      "author": "@sarthaknigam1731",
      "likes": 6,
      "published_at": "2021-04-11T17:54:48Z",
      "timestamp_refs": [],
      "text": "Me to has completed all really mere to 100 pages ki book sirf aur sirf ALAKH sir ke paraye hue chemical bonding se bhar gayi AND I m not joking",
      "parent_context": "Who else watched the entire playlist ??"
    },
    {
      "comment_id": "UgztxivaXR0xi3t5BoV4AaABAg.9F25lbYbmBz9MK3mI3TTIk",
      "parent_id": "UgztxivaXR0xi3t5BoV4AaABAg",
      "comment_type": "reply",
      "author": "@sam-12145",
      "likes": 0,
      "published_at": "2021-04-19T15:26:22Z",
      "timestamp_refs": [],
      "text": "Present",
      "parent_context": "Who else watched the entire playlist ??"
    },
    {
      "comment_id": "UgztxivaXR0xi3t5BoV4AaABAg.9F25lbYbmBz9MKJZv-_W4t",
      "parent_id": "UgztxivaXR0xi3t5BoV4AaABAg",
      "comment_type": "reply",
      "author": "@saumyaa65",
      "likes": 2,
      "published_at": "2021-04-19T17:44:21Z",
      "timestamp_refs": [],
      "text": "@gdarcuesyt9025 Sir ne organic chemistry me GOC me Resonance ke 3-4 videos banaye hn. Just search for Resonance physics wallah.👍👍 But mujhe sir ka back bonding ke lecture ni mila.😔😔",
      "parent_context": "Who else watched the entire playlist ??"
    },
    {
      "comment_id": "UgztxivaXR0xi3t5BoV4AaABAg.9F25lbYbmBz9MOMeHAHnrJ",
      "parent_id": "UgztxivaXR0xi3t5BoV4AaABAg",
      "comment_type": "reply",
      "author": "@skshahidraza",
      "likes": 2,
      "published_at": "2021-04-21T07:28:16Z",
      "timestamp_refs": [],
      "text": "Me bruda❤️",
      "parent_context": "Who else watched the entire playlist ??"
    },
    {
      "comment_id": "UgztxivaXR0xi3t5BoV4AaABAg.9F25lbYbmBz9MnlBNywYbL",
      "parent_id": "UgztxivaXR0xi3t5BoV4AaABAg",
      "comment_type": "reply",
      "author": "@thevihaanmeister267",
      "likes": 0,
      "published_at": "2021-05-01T13:31:38Z",
      "timestamp_refs": [],
      "text": "Aisa laga ek web series dekh ra hu ♥️",
      "parent_context": "Who else watched the entire playlist ??"
    },
    {
      "comment_id": "UgztxivaXR0xi3t5BoV4AaABAg.9F25lbYbmBz9Myle076Tky",
      "parent_id": "UgztxivaXR0xi3t5BoV4AaABAg",
      "comment_type": "reply",
      "author": "@copyrightfreemusic882",
      "likes": 2,
      "published_at": "2021-05-05T20:07:19Z",
      "timestamp_refs": [],
      "text": "@Akash chopra fan club ladhki ka name dekhe nehi bakchodi start kar diya",
      "parent_context": "Who else watched the entire playlist ??"
    },
    {
      "comment_id": "UgztxivaXR0xi3t5BoV4AaABAg.9F25lbYbmBz9NkSREJ2J_x",
      "parent_id": "UgztxivaXR0xi3t5BoV4AaABAg",
      "comment_type": "reply",
      "author": "@SoulThunder",
      "likes": 0,
      "published_at": "2021-05-25T03:12:42Z",
      "timestamp_refs": [],
      "text": "YES PLAYLIST BY ASIRWAD IITIAN",
      "parent_context": "Who else watched the entire playlist ??"
    },
    {
      "comment_id": "UgztxivaXR0xi3t5BoV4AaABAg.9F25lbYbmBz9PHWi6yVCrN",
      "parent_id": "UgztxivaXR0xi3t5BoV4AaABAg",
      "comment_type": "reply",
      "author": "@kirtikapandey8492",
      "likes": 0,
      "published_at": "2021-07-02T05:15:40Z",
      "timestamp_refs": [],
      "text": "Mee to",
      "parent_context": "Who else watched the entire playlist ??"
    },
    {
      "comment_id": "UgztxivaXR0xi3t5BoV4AaABAg.9F25lbYbmBz9PVpo-P7cxj",
      "parent_id": "UgztxivaXR0xi3t5BoV4AaABAg",
      "comment_type": "reply",
      "author": "@avantikamishra3208",
      "likes": 1,
      "published_at": "2021-07-07T18:40:36Z",
      "timestamp_refs": [],
      "text": "Meeee 🙌",
      "parent_context": "Who else watched the entire playlist ??"
    },
    {
      "comment_id": "UgztxivaXR0xi3t5BoV4AaABAg.9F25lbYbmBz9Q8_UoBLcU0",
      "parent_id": "UgztxivaXR0xi3t5BoV4AaABAg",
      "comment_type": "reply",
      "author": "@AnshumanRajSingh13",
      "likes": 1,
      "published_at": "2021-07-23T14:26:54Z",
      "timestamp_refs": [],
      "text": "Who can solve all the questions associated with this chapter",
      "parent_context": "Who else watched the entire playlist ??"
    },
    {
      "comment_id": "UgztxivaXR0xi3t5BoV4AaABAg.9F25lbYbmBz9Q8_qtxfWbk",
      "parent_id": "UgztxivaXR0xi3t5BoV4AaABAg",
      "comment_type": "reply",
      "author": "@kirtikapandey8492",
      "likes": 1,
      "published_at": "2021-07-23T14:30:03Z",
      "timestamp_refs": [],
      "text": "Meee",
      "parent_context": "Who else watched the entire playlist ??"
    },
    {
      "comment_id": "UgztxivaXR0xi3t5BoV4AaABAg.9F25lbYbmBz9S6HSJvCJCv",
      "parent_id": "UgztxivaXR0xi3t5BoV4AaABAg",
      "comment_type": "reply",
      "author": "@kutuduru",
      "likes": 0,
      "published_at": "2021-09-10T10:04:50Z",
      "timestamp_refs": [],
      "text": "Meeeeeeee",
      "parent_context": "Who else watched the entire playlist ??"
    },
    {
      "comment_id": "UgztxivaXR0xi3t5BoV4AaABAg.9F25lbYbmBz9SIAHrcAruL",
      "parent_id": "UgztxivaXR0xi3t5BoV4AaABAg",
      "comment_type": "reply",
      "author": "@athishkiran1260",
      "likes": 2,
      "published_at": "2021-09-15T00:53:08Z",
      "timestamp_refs": [],
      "text": "Me whole playlist in 2 days",
      "parent_context": "Who else watched the entire playlist ??"
    },
    {
      "comment_id": "UgztxivaXR0xi3t5BoV4AaABAg.9F25lbYbmBz9SRD0GIAitv",
      "parent_id": "UgztxivaXR0xi3t5BoV4AaABAg",
      "comment_type": "reply",
      "author": "@Omkar-rk9uu",
      "likes": 2,
      "published_at": "2021-09-18T13:10:07Z",
      "timestamp_refs": [],
      "text": "@athishkiran1260 Ye Acchi Baat Nhi Hai Matlab Tumne Sirf Chemistry Ki 2 Din Jo Galat Hai You Should Do All Subjects In One Day I am Not saying To Do Chapter In One day Do 3 Chapters Of 3 Subjects Simultaneously 3-4hr per dayb",
      "parent_context": "Who else watched the entire playlist ??"
    },
    {
      "comment_id": "UgztxivaXR0xi3t5BoV4AaABAg.9F25lbYbmBz9T6fFzOzB-E",
      "parent_id": "UgztxivaXR0xi3t5BoV4AaABAg",
      "comment_type": "reply",
      "author": "@pwguide7.5kviews89",
      "likes": 0,
      "published_at": "2021-10-05T10:13:00Z",
      "timestamp_refs": [],
      "text": "Me also",
      "parent_context": "Who else watched the entire playlist ??"
    },
    {
      "comment_id": "UgztxivaXR0xi3t5BoV4AaABAg.9F25lbYbmBz9T9wWTQL_RU",
      "parent_id": "UgztxivaXR0xi3t5BoV4AaABAg",
      "comment_type": "reply",
      "author": "@pwguide7.5kviews89",
      "likes": 0,
      "published_at": "2021-10-06T16:41:32Z",
      "timestamp_refs": [],
      "text": "Hi 🌹❤️",
      "parent_context": "Who else watched the entire playlist ??"
    },
    {
      "comment_id": "UgztxivaXR0xi3t5BoV4AaABAg.9F25lbYbmBz9TExD9rG7Pq",
      "parent_id": "UgztxivaXR0xi3t5BoV4AaABAg",
      "comment_type": "reply",
      "author": "@archanaa....0612",
      "likes": 0,
      "published_at": "2021-10-08T15:23:50Z",
      "timestamp_refs": [],
      "text": "Meeee",
      "parent_context": "Who else watched the entire playlist ??"
    },
    {
      "comment_id": "UgztxivaXR0xi3t5BoV4AaABAg.9F25lbYbmBz9TGsCKlmE5k",
      "parent_id": "UgztxivaXR0xi3t5BoV4AaABAg",
      "comment_type": "reply",
      "author": "@strengthoveraesthetics239",
      "likes": 0,
      "published_at": "2021-10-09T09:18:30Z",
      "timestamp_refs": [],
      "text": "not me",
      "parent_context": "Who else watched the entire playlist ??"
    },
    {
      "comment_id": "UgztxivaXR0xi3t5BoV4AaABAg.9F25lbYbmBz9V7mv4en2Bd",
      "parent_id": "UgztxivaXR0xi3t5BoV4AaABAg",
      "comment_type": "reply",
      "author": "@ritambanerjee8039",
      "likes": 1,
      "published_at": "2021-11-24T13:41:57Z",
      "timestamp_refs": [],
      "text": "Meee",
      "parent_context": "Who else watched the entire playlist ??"
    },
    {
      "comment_id": "UgztxivaXR0xi3t5BoV4AaABAg.9F25lbYbmBz9VDH-Wt8_iz",
      "parent_id": "UgztxivaXR0xi3t5BoV4AaABAg",
      "comment_type": "reply",
      "author": "@im._.singhreya",
      "likes": 3,
      "published_at": "2021-11-26T16:49:47Z",
      "timestamp_refs": [],
      "text": "@vaziqahmed4913 it's true 💯😁😊",
      "parent_context": "Who else watched the entire playlist ??"
    },
    {
      "comment_id": "UgztxivaXR0xi3t5BoV4AaABAg.9F25lbYbmBz9W6HKvOEPF5",
      "parent_id": "UgztxivaXR0xi3t5BoV4AaABAg",
      "comment_type": "reply",
      "author": "@AbhishekGupta-fe3xc",
      "likes": 1,
      "published_at": "2021-12-18T20:09:25Z",
      "timestamp_refs": [],
      "text": "Present",
      "parent_context": "Who else watched the entire playlist ??"
    },
    {
      "comment_id": "UgztxivaXR0xi3t5BoV4AaABAg.9F25lbYbmBz9Wp9AQTYxip",
      "parent_id": "UgztxivaXR0xi3t5BoV4AaABAg",
      "comment_type": "reply",
      "author": "@priyanshukumar2438",
      "likes": 1,
      "published_at": "2022-01-05T15:43:08Z",
      "timestamp_refs": [],
      "text": "Me in 2022",
      "parent_context": "Who else watched the entire playlist ??"
    },
    {
      "comment_id": "UgztxivaXR0xi3t5BoV4AaABAg.9F25lbYbmBz9XDFzXIep-O",
      "parent_id": "UgztxivaXR0xi3t5BoV4AaABAg",
      "comment_type": "reply",
      "author": "@psycophile9588",
      "likes": 1,
      "published_at": "2022-01-15T09:43:41Z",
      "timestamp_refs": [],
      "text": "Meeee ✋✋✋✋✋",
      "parent_context": "Who else watched the entire playlist ??"
    },
    {
      "comment_id": "UgztxivaXR0xi3t5BoV4AaABAg.9F25lbYbmBz9e_Nmp650mh",
      "parent_id": "UgztxivaXR0xi3t5BoV4AaABAg",
      "comment_type": "reply",
      "author": "@Sangram281",
      "likes": 0,
      "published_at": "2022-08-11T05:25:33Z",
      "timestamp_refs": [],
      "text": "Maiiiiiiiiii",
      "parent_context": "Who else watched the entire playlist ??"
    },
    {
      "comment_id": "UgztxivaXR0xi3t5BoV4AaABAg.9F25lbYbmBz9h7cKXBwZQU",
      "parent_id": "UgztxivaXR0xi3t5BoV4AaABAg",
      "comment_type": "reply",
      "author": "@anjukhatri_00",
      "likes": 0,
      "published_at": "2022-10-13T14:57:34Z",
      "timestamp_refs": [],
      "text": "Whole chapter🤟🏻",
      "parent_context": "Who else watched the entire playlist ??"
    },
    {
      "comment_id": "UgztxivaXR0xi3t5BoV4AaABAg.9F25lbYbmBz9ht2b7ppopk",
      "parent_id": "UgztxivaXR0xi3t5BoV4AaABAg",
      "comment_type": "reply",
      "author": "@AreebaFarooqui",
      "likes": 0,
      "published_at": "2022-11-01T10:19:27Z",
      "timestamp_refs": [],
      "text": "Not mee",
      "parent_context": "Who else watched the entire playlist ??"
    },
    {
      "comment_id": "UgztxivaXR0xi3t5BoV4AaABAg.9F25lbYbmBz9jJ1_x-pl9q",
      "parent_id": "UgztxivaXR0xi3t5BoV4AaABAg",
      "comment_type": "reply",
      "author": "@josephjebrail6524",
      "likes": 0,
      "published_at": "2022-12-06T18:21:26Z",
      "timestamp_refs": [],
      "text": "Yes finally",
      "parent_context": "Who else watched the entire playlist ??"
    },
    {
      "comment_id": "UgztxivaXR0xi3t5BoV4AaABAg.9F25lbYbmBz9k3JpbB7UyI",
      "parent_id": "UgztxivaXR0xi3t5BoV4AaABAg",
      "comment_type": "reply",
      "author": "@hackthelife278",
      "likes": 2,
      "published_at": "2022-12-25T12:24:24Z",
      "timestamp_refs": [],
      "text": "*me too😁😁*",
      "parent_context": "Who else watched the entire playlist ??"
    },
    {
      "comment_id": "UgztxivaXR0xi3t5BoV4AaABAg.9F25lbYbmBz9lVe0rkDDML",
      "parent_id": "UgztxivaXR0xi3t5BoV4AaABAg",
      "comment_type": "reply",
      "author": "@RiyaYadav-bg4ew",
      "likes": 0,
      "published_at": "2023-01-30T08:59:42Z",
      "timestamp_refs": [],
      "text": "Me....",
      "parent_context": "Who else watched the entire playlist ??"
    },
    {
      "comment_id": "UgztxivaXR0xi3t5BoV4AaABAg.9F25lbYbmBz9m4V2cEq-ps",
      "parent_id": "UgztxivaXR0xi3t5BoV4AaABAg",
      "comment_type": "reply",
      "author": "@aryansingh1830",
      "likes": 0,
      "published_at": "2023-02-13T16:24:28Z",
      "timestamp_refs": [],
      "text": "It took me 7 days !!! 🤙",
      "parent_context": "Who else watched the entire playlist ??"
    },
    {
      "comment_id": "UgyspY9wk2pSEtkOshN4AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@findingstuff694",
      "likes": 845,
      "published_at": "2020-10-17T13:01:54Z",
      "timestamp_refs": [],
      "text": "If you are in class 11th and you are here then congrats you are on the right track don't lose focus don't be overconfident, don't panic about the syllabus, be consistent towards you study cuz, hard work needs energy and and energy neither be created nor be destroyed, the energy you are giving towards your goal will convert into victory ✌ All the best 🌸🌈 Enjoy the beautiful journey of learning 😍",
      "parent_context": ""
    },
    {
      "comment_id": "UgyspY9wk2pSEtkOshN4AaABAg.9Ev0z4Hkpog9F9ZT2hv842",
      "parent_id": "UgyspY9wk2pSEtkOshN4AaABAg",
      "comment_type": "reply",
      "author": "@mohittawale6677",
      "likes": 12,
      "published_at": "2020-10-23T13:51:50Z",
      "timestamp_refs": [],
      "text": "Well said, bro 🔥🔥🙏🙏",
      "parent_context": "If you are in class 11th and you are here then congrats you are on the right track don't lose focus don't be overconfident, don't panic about the syllabus, be consistent towards you study cuz, hard work needs energy and and energy neither be created nor be destroyed, the energy you are giving towards your goal will convert into victory ✌ All the best 🌸🌈 Enjoy the beautiful journey of learning 😍"
    },
    {
      "comment_id": "UgyspY9wk2pSEtkOshN4AaABAg.9Ev0z4Hkpog9Fsur-_NUwo",
      "parent_id": "UgyspY9wk2pSEtkOshN4AaABAg",
      "comment_type": "reply",
      "author": "@manjuvij8807",
      "likes": 0,
      "published_at": "2020-11-10T13:52:32Z",
      "timestamp_refs": [],
      "text": "Try mcqhttps://www.youtube.com/playlist?list=PL-7DAAPdMJDxThJywnipCcA5DTHvsCYRt",
      "parent_context": "If you are in class 11th and you are here then congrats you are on the right track don't lose focus don't be overconfident, don't panic about the syllabus, be consistent towards you study cuz, hard work needs energy and and energy neither be created nor be destroyed, the energy you are giving towards your goal will convert into victory ✌ All the best 🌸🌈 Enjoy the beautiful journey of learning 😍"
    },
    {
      "comment_id": "UgyspY9wk2pSEtkOshN4AaABAg.9Ev0z4Hkpog9IbsLht0-r6",
      "parent_id": "UgyspY9wk2pSEtkOshN4AaABAg",
      "comment_type": "reply",
      "author": "@electric_deer2007",
      "likes": 5,
      "published_at": "2021-01-17T12:37:45Z",
      "timestamp_refs": [],
      "text": "Nice relation mate !!",
      "parent_context": "If you are in class 11th and you are here then congrats you are on the right track don't lose focus don't be overconfident, don't panic about the syllabus, be consistent towards you study cuz, hard work needs energy and and energy neither be created nor be destroyed, the energy you are giving towards your goal will convert into victory ✌ All the best 🌸🌈 Enjoy the beautiful journey of learning 😍"
    },
    {
      "comment_id": "UgyspY9wk2pSEtkOshN4AaABAg.9Ev0z4Hkpog9JcqrZPLrkX",
      "parent_id": "UgyspY9wk2pSEtkOshN4AaABAg",
      "comment_type": "reply",
      "author": "@ishangupta7813",
      "likes": 18,
      "published_at": "2021-02-11T18:15:23Z",
      "timestamp_refs": [],
      "text": "bas kr rulayega kya pagle",
      "parent_context": "If you are in class 11th and you are here then congrats you are on the right track don't lose focus don't be overconfident, don't panic about the syllabus, be consistent towards you study cuz, hard work needs energy and and energy neither be created nor be destroyed, the energy you are giving towards your goal will convert into victory ✌ All the best 🌸🌈 Enjoy the beautiful journey of learning 😍"
    },
    {
      "comment_id": "UgyspY9wk2pSEtkOshN4AaABAg.9Ev0z4Hkpog9NdBA7p5YaI",
      "parent_id": "UgyspY9wk2pSEtkOshN4AaABAg",
      "comment_type": "reply",
      "author": "@firdos4857",
      "likes": 4,
      "published_at": "2021-05-22T07:27:08Z",
      "timestamp_refs": [],
      "text": "motivating❤",
      "parent_context": "If you are in class 11th and you are here then congrats you are on the right track don't lose focus don't be overconfident, don't panic about the syllabus, be consistent towards you study cuz, hard work needs energy and and energy neither be created nor be destroyed, the energy you are giving towards your goal will convert into victory ✌ All the best 🌸🌈 Enjoy the beautiful journey of learning 😍"
    },
    {
      "comment_id": "UgyspY9wk2pSEtkOshN4AaABAg.9Ev0z4Hkpog9QXl0823SFa",
      "parent_id": "UgyspY9wk2pSEtkOshN4AaABAg",
      "comment_type": "reply",
      "author": "@nishhhhhh8525",
      "likes": 1,
      "published_at": "2021-08-02T09:08:35Z",
      "timestamp_refs": [],
      "text": "Thanks bro for this motivational thought",
      "parent_context": "If you are in class 11th and you are here then congrats you are on the right track don't lose focus don't be overconfident, don't panic about the syllabus, be consistent towards you study cuz, hard work needs energy and and energy neither be created nor be destroyed, the energy you are giving towards your goal will convert into victory ✌ All the best 🌸🌈 Enjoy the beautiful journey of learning 😍"
    },
    {
      "comment_id": "UgyspY9wk2pSEtkOshN4AaABAg.9Ev0z4Hkpog9QYhHJo7UIo",
      "parent_id": "UgyspY9wk2pSEtkOshN4AaABAg",
      "comment_type": "reply",
      "author": "@mayanksrivastava7540",
      "likes": 4,
      "published_at": "2021-08-02T17:55:13Z",
      "timestamp_refs": [],
      "text": "Aaj to aapne humari teesri aakh kholdi",
      "parent_context": "If you are in class 11th and you are here then congrats you are on the right track don't lose focus don't be overconfident, don't panic about the syllabus, be consistent towards you study cuz, hard work needs energy and and energy neither be created nor be destroyed, the energy you are giving towards your goal will convert into victory ✌ All the best 🌸🌈 Enjoy the beautiful journey of learning 😍"
    },
    {
      "comment_id": "UgyspY9wk2pSEtkOshN4AaABAg.9Ev0z4Hkpog9QzdAOAKMhZ",
      "parent_id": "UgyspY9wk2pSEtkOshN4AaABAg",
      "comment_type": "reply",
      "author": "@smileydiaries145",
      "likes": 1,
      "published_at": "2021-08-13T14:18:03Z",
      "timestamp_refs": [],
      "text": "Thanks bro for motivating us ☺",
      "parent_context": "If you are in class 11th and you are here then congrats you are on the right track don't lose focus don't be overconfident, don't panic about the syllabus, be consistent towards you study cuz, hard work needs energy and and energy neither be created nor be destroyed, the energy you are giving towards your goal will convert into victory ✌ All the best 🌸🌈 Enjoy the beautiful journey of learning 😍"
    },
    {
      "comment_id": "UgyspY9wk2pSEtkOshN4AaABAg.9Ev0z4Hkpog9RbyBF2Xin1",
      "parent_id": "UgyspY9wk2pSEtkOshN4AaABAg",
      "comment_type": "reply",
      "author": "@ikabiir",
      "likes": 0,
      "published_at": "2021-08-29T06:11:17Z",
      "timestamp_refs": [],
      "text": "Nice bro ☺️",
      "parent_context": "If you are in class 11th and you are here then congrats you are on the right track don't lose focus don't be overconfident, don't panic about the syllabus, be consistent towards you study cuz, hard work needs energy and and energy neither be created nor be destroyed, the energy you are giving towards your goal will convert into victory ✌ All the best 🌸🌈 Enjoy the beautiful journey of learning 😍"
    },
    {
      "comment_id": "UgyspY9wk2pSEtkOshN4AaABAg.9Ev0z4Hkpog9Rx_Ie0_1So",
      "parent_id": "UgyspY9wk2pSEtkOshN4AaABAg",
      "comment_type": "reply",
      "author": "@Anonymous73580",
      "likes": 0,
      "published_at": "2021-09-06T15:37:08Z",
      "timestamp_refs": [],
      "text": "thankyou💕",
      "parent_context": "If you are in class 11th and you are here then congrats you are on the right track don't lose focus don't be overconfident, don't panic about the syllabus, be consistent towards you study cuz, hard work needs energy and and energy neither be created nor be destroyed, the energy you are giving towards your goal will convert into victory ✌ All the best 🌸🌈 Enjoy the beautiful journey of learning 😍"
    },
    {
      "comment_id": "UgyspY9wk2pSEtkOshN4AaABAg.9Ev0z4Hkpog9S6gWs-un4f",
      "parent_id": "UgyspY9wk2pSEtkOshN4AaABAg",
      "comment_type": "reply",
      "author": "@ewmod6977",
      "likes": 0,
      "published_at": "2021-09-10T13:52:39Z",
      "timestamp_refs": [],
      "text": "@ishangupta7813 lol",
      "parent_context": "If you are in class 11th and you are here then congrats you are on the right track don't lose focus don't be overconfident, don't panic about the syllabus, be consistent towards you study cuz, hard work needs energy and and energy neither be created nor be destroyed, the energy you are giving towards your goal will convert into victory ✌ All the best 🌸🌈 Enjoy the beautiful journey of learning 😍"
    },
    {
      "comment_id": "UgyspY9wk2pSEtkOshN4AaABAg.9Ev0z4Hkpog9h_F-Indpqk",
      "parent_id": "UgyspY9wk2pSEtkOshN4AaABAg",
      "comment_type": "reply",
      "author": "@ChessBrainGM",
      "likes": 0,
      "published_at": "2022-10-24T17:42:56Z",
      "timestamp_refs": [],
      "text": "Thanks for such a motivational message 😘😘❤️❤️",
      "parent_context": "If you are in class 11th and you are here then congrats you are on the right track don't lose focus don't be overconfident, don't panic about the syllabus, be consistent towards you study cuz, hard work needs energy and and energy neither be created nor be destroyed, the energy you are giving towards your goal will convert into victory ✌ All the best 🌸🌈 Enjoy the beautiful journey of learning 😍"
    },
    {
      "comment_id": "UgyspY9wk2pSEtkOshN4AaABAg.9Ev0z4Hkpog9lLjU2rZwit",
      "parent_id": "UgyspY9wk2pSEtkOshN4AaABAg",
      "comment_type": "reply",
      "author": "@me-uh1xk",
      "likes": 1,
      "published_at": "2023-01-26T12:34:58Z",
      "timestamp_refs": [],
      "text": "U made my day",
      "parent_context": "If you are in class 11th and you are here then congrats you are on the right track don't lose focus don't be overconfident, don't panic about the syllabus, be consistent towards you study cuz, hard work needs energy and and energy neither be created nor be destroyed, the energy you are giving towards your goal will convert into victory ✌ All the best 🌸🌈 Enjoy the beautiful journey of learning 😍"
    },
    {
      "comment_id": "UgyspY9wk2pSEtkOshN4AaABAg.9Ev0z4Hkpog9lONCTNAJPs",
      "parent_id": "UgyspY9wk2pSEtkOshN4AaABAg",
      "comment_type": "reply",
      "author": "@mrinalagarwal9735",
      "likes": 3,
      "published_at": "2023-01-27T13:09:19Z",
      "timestamp_refs": [],
      "text": "but energy can be transferred or can change form towards playing games or social media",
      "parent_context": "If you are in class 11th and you are here then congrats you are on the right track don't lose focus don't be overconfident, don't panic about the syllabus, be consistent towards you study cuz, hard work needs energy and and energy neither be created nor be destroyed, the energy you are giving towards your goal will convert into victory ✌ All the best 🌸🌈 Enjoy the beautiful journey of learning 😍"
    },
    {
      "comment_id": "UgyspY9wk2pSEtkOshN4AaABAg.9Ev0z4HkpogA8JOrBSOILw",
      "parent_id": "UgyspY9wk2pSEtkOshN4AaABAg",
      "comment_type": "reply",
      "author": "@Funsize-08",
      "likes": 0,
      "published_at": "2024-09-13T03:21:01Z",
      "timestamp_refs": [],
      "text": "Thank you so much ❤ really need this",
      "parent_context": "If you are in class 11th and you are here then congrats you are on the right track don't lose focus don't be overconfident, don't panic about the syllabus, be consistent towards you study cuz, hard work needs energy and and energy neither be created nor be destroyed, the energy you are giving towards your goal will convert into victory ✌ All the best 🌸🌈 Enjoy the beautiful journey of learning 😍"
    },
    {
      "comment_id": "UgxAcmooMYda571R0Mp4AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@norablossoms9157",
      "likes": 427,
      "published_at": "2020-08-23T13:05:56Z",
      "timestamp_refs": [],
      "text": "Me : distracted sir : SUN LO DHYAAAAN SE! me : 0_0 ROGER THAT!",
      "parent_context": ""
    },
    {
      "comment_id": "UgxAcmooMYda571R0Mp4AaABAg.9ChPiVc7T5E9NWu8GoH77W",
      "parent_id": "UgxAcmooMYda571R0Mp4AaABAg",
      "comment_type": "reply",
      "author": "@bedatrayeeray4786",
      "likes": 0,
      "published_at": "2021-05-19T11:34:55Z",
      "timestamp_refs": [],
      "text": "Lol yes",
      "parent_context": "Me : distracted sir : SUN LO DHYAAAAN SE! me : 0_0 ROGER THAT!"
    },
    {
      "comment_id": "UgxAcmooMYda571R0Mp4AaABAg.9ChPiVc7T5E9OhCUWYFO3S",
      "parent_id": "UgxAcmooMYda571R0Mp4AaABAg",
      "comment_type": "reply",
      "author": "@mihirjoshi9086",
      "likes": 0,
      "published_at": "2021-06-17T17:27:01Z",
      "timestamp_refs": [],
      "text": "Sooo true",
      "parent_context": "Me : distracted sir : SUN LO DHYAAAAN SE! me : 0_0 ROGER THAT!"
    },
    {
      "comment_id": "UgxAcmooMYda571R0Mp4AaABAg.9ChPiVc7T5E9Ry1M1phpGE",
      "parent_id": "UgxAcmooMYda571R0Mp4AaABAg",
      "comment_type": "reply",
      "author": "@vidhy7963",
      "likes": 1,
      "published_at": "2021-09-06T19:51:01Z",
      "timestamp_refs": [],
      "text": "Aha true I was looking somewhere else 😂",
      "parent_context": "Me : distracted sir : SUN LO DHYAAAAN SE! me : 0_0 ROGER THAT!"
    },
    {
      "comment_id": "UgyMpwp62bI9LreswkZ4AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@vaishnaviagrawal314",
      "likes": 27,
      "published_at": "2023-08-14T17:41:45Z",
      "timestamp_refs": [],
      "text": "This chapter is headache for me now I complete it I have getting huge amount of relief thanks sir it is great help for 11th student",
      "parent_context": ""
    },
    {
      "comment_id": "Ugx7gHc55i-5i0Dg-pV4AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@patelsmit2922",
      "likes": 687,
      "published_at": "2018-09-17T14:56:43Z",
      "timestamp_refs": [],
      "text": "0----->Hero in chemistry just because of alakh Pandey sir😍😍😍😍",
      "parent_context": ""
    },
    {
      "comment_id": "Ugx7gHc55i-5i0Dg-pV4AaABAg.8lIiBALEDhS9-g_Rwz1Nwc",
      "parent_id": "Ugx7gHc55i-5i0Dg-pV4AaABAg",
      "comment_type": "reply",
      "author": "@maheeadhikari9899",
      "likes": 2,
      "published_at": "2019-10-05T02:32:17Z",
      "timestamp_refs": [],
      "text": "@Patel Smit I'm fav. Student of my chemistry teacher",
      "parent_context": "0----->Hero in chemistry just because of alakh Pandey sir😍😍😍😍"
    },
    {
      "comment_id": "Ugx7gHc55i-5i0Dg-pV4AaABAg.8lIiBALEDhS92g_bsE8fwb",
      "parent_id": "Ugx7gHc55i-5i0Dg-pV4AaABAg",
      "comment_type": "reply",
      "author": "@thundergameclips7186",
      "likes": 1,
      "published_at": "2019-12-18T16:07:57Z",
      "timestamp_refs": [],
      "text": "such yaar such ma",
      "parent_context": "0----->Hero in chemistry just because of alakh Pandey sir😍😍😍😍"
    },
    {
      "comment_id": "Ugx7gHc55i-5i0Dg-pV4AaABAg.8lIiBALEDhS93tvp8zoNJP",
      "parent_id": "Ugx7gHc55i-5i0Dg-pV4AaABAg",
      "comment_type": "reply",
      "author": "@junaidahmedarik9847",
      "likes": 0,
      "published_at": "2020-01-17T17:03:32Z",
      "timestamp_refs": [],
      "text": "8=====D",
      "parent_context": "0----->Hero in chemistry just because of alakh Pandey sir😍😍😍😍"
    },
    {
      "comment_id": "Ugx7gHc55i-5i0Dg-pV4AaABAg.8lIiBALEDhS9Aow9AGOqNM",
      "parent_id": "Ugx7gHc55i-5i0Dg-pV4AaABAg",
      "comment_type": "reply",
      "author": "@explainedwithstick",
      "likes": 1,
      "published_at": "2020-07-07T18:09:57Z",
      "timestamp_refs": [],
      "text": "Bhai bhai same dp 😂",
      "parent_context": "0----->Hero in chemistry just because of alakh Pandey sir😍😍😍😍"
    },
    {
      "comment_id": "Ugx7gHc55i-5i0Dg-pV4AaABAg.8lIiBALEDhS9Jdo8epZqjx",
      "parent_id": "Ugx7gHc55i-5i0Dg-pV4AaABAg",
      "comment_type": "reply",
      "author": "@mr.indiangameryt9886",
      "likes": 0,
      "published_at": "2021-02-12T03:10:53Z",
      "timestamp_refs": [],
      "text": "Iam fav student of chemistry sir",
      "parent_context": "0----->Hero in chemistry just because of alakh Pandey sir😍😍😍😍"
    },
    {
      "comment_id": "Ugx7gHc55i-5i0Dg-pV4AaABAg.8lIiBALEDhS9KBkHhiGFDF",
      "parent_id": "Ugx7gHc55i-5i0Dg-pV4AaABAg",
      "comment_type": "reply",
      "author": "@dilipkumardey4434",
      "likes": 3,
      "published_at": "2021-02-25T16:50:35Z",
      "timestamp_refs": [],
      "text": "At first in class 11 I am thinking that I will fail in chemistry exam.....but now ..I am confident....i have achived 90+ in chem ...just for our PW sir....hats off..😎😎😎😎😎😎😎😎😎",
      "parent_context": "0----->Hero in chemistry just because of alakh Pandey sir😍😍😍😍"
    },
    {
      "comment_id": "Ugx7gHc55i-5i0Dg-pV4AaABAg.8lIiBALEDhS9KxsqG03V0H",
      "parent_id": "Ugx7gHc55i-5i0Dg-pV4AaABAg",
      "comment_type": "reply",
      "author": "@rahulsingh957",
      "likes": 1,
      "published_at": "2021-03-16T18:48:08Z",
      "timestamp_refs": [],
      "text": "Me tooooooooo",
      "parent_context": "0----->Hero in chemistry just because of alakh Pandey sir😍😍😍😍"
    },
    {
      "comment_id": "Ugx7gHc55i-5i0Dg-pV4AaABAg.8lIiBALEDhS9VqoEGwk_k_",
      "parent_id": "Ugx7gHc55i-5i0Dg-pV4AaABAg",
      "comment_type": "reply",
      "author": "@aayushkaushikbilha6460",
      "likes": 0,
      "published_at": "2021-12-12T10:38:30Z",
      "timestamp_refs": [],
      "text": "Me to",
      "parent_context": "0----->Hero in chemistry just because of alakh Pandey sir😍😍😍😍"
    },
    {
      "comment_id": "UgxwqjoY1JToaB5U_m54AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@digvijay3781",
      "likes": 134,
      "published_at": "2020-12-27T02:12:21Z",
      "timestamp_refs": [],
      "text": "Watching entire playlist gave more pleasure than watching faltu ka cinema😌😌.",
      "parent_context": ""
    },
    {
      "comment_id": "UgxUdQDSkRpY-5nWyLl4AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@devgupta8137",
      "likes": 389,
      "published_at": "2020-11-17T07:37:36Z",
      "timestamp_refs": [],
      "text": "I am in Allen Indore and u are better than my chemistry and physics teacher.",
      "parent_context": ""
    },
    {
      "comment_id": "UgxUdQDSkRpY-5nWyLl4AaABAg.9G9GW2frPVP9GJPst6ISkO",
      "parent_id": "UgxUdQDSkRpY-5nWyLl4AaABAg",
      "comment_type": "reply",
      "author": "@kuruvayellagi8154",
      "likes": 7,
      "published_at": "2020-11-21T06:11:54Z",
      "timestamp_refs": [],
      "text": "Nuvvu bacha sir mundhu",
      "parent_context": "I am in Allen Indore and u are better than my chemistry and physics teacher."
    },
    {
      "comment_id": "UgxUdQDSkRpY-5nWyLl4AaABAg.9G9GW2frPVP9GJPvBgu5lU",
      "parent_id": "UgxUdQDSkRpY-5nWyLl4AaABAg",
      "comment_type": "reply",
      "author": "@kuruvayellagi8154",
      "likes": 7,
      "published_at": "2020-11-21T06:12:13Z",
      "timestamp_refs": [],
      "text": "Alak sir thopu",
      "parent_context": "I am in Allen Indore and u are better than my chemistry and physics teacher."
    },
    {
      "comment_id": "UgxUdQDSkRpY-5nWyLl4AaABAg.9G9GW2frPVP9GoD-KTMOoj",
      "parent_id": "UgxUdQDSkRpY-5nWyLl4AaABAg",
      "comment_type": "reply",
      "author": "@Siddardha20",
      "likes": 1,
      "published_at": "2020-12-03T14:35:01Z",
      "timestamp_refs": [],
      "text": "@kuruvayellagi8154 ..😂😂thammudu akkad nunchi?",
      "parent_context": "I am in Allen Indore and u are better than my chemistry and physics teacher."
    },
    {
      "comment_id": "UgxUdQDSkRpY-5nWyLl4AaABAg.9G9GW2frPVP9GoDWilVB2H",
      "parent_id": "UgxUdQDSkRpY-5nWyLl4AaABAg",
      "comment_type": "reply",
      "author": "@kuruvayellagi8154",
      "likes": 1,
      "published_at": "2020-12-03T14:39:35Z",
      "timestamp_refs": [],
      "text": "@Siddardha20rayalasema kurnool Nunchi 😎😎😎",
      "parent_context": "I am in Allen Indore and u are better than my chemistry and physics teacher."
    },
    {
      "comment_id": "UgxUdQDSkRpY-5nWyLl4AaABAg.9G9GW2frPVP9GoDeD5mer_",
      "parent_id": "UgxUdQDSkRpY-5nWyLl4AaABAg",
      "comment_type": "reply",
      "author": "@Siddardha20",
      "likes": 0,
      "published_at": "2020-12-03T14:40:45Z",
      "timestamp_refs": [],
      "text": "@kuruvayellagi8154 ..😀😀..super nenu kakinada nunchi..neet dropper nuvu?",
      "parent_context": "I am in Allen Indore and u are better than my chemistry and physics teacher."
    },
    {
      "comment_id": "UgxUdQDSkRpY-5nWyLl4AaABAg.9G9GW2frPVP9GoE-IL8DsF",
      "parent_id": "UgxUdQDSkRpY-5nWyLl4AaABAg",
      "comment_type": "reply",
      "author": "@kuruvayellagi8154",
      "likes": 0,
      "published_at": "2020-12-03T14:43:45Z",
      "timestamp_refs": [],
      "text": "@Siddardha20 nenu 10 class anna",
      "parent_context": "I am in Allen Indore and u are better than my chemistry and physics teacher."
    },
    {
      "comment_id": "UgxUdQDSkRpY-5nWyLl4AaABAg.9G9GW2frPVP9GoE8sUGVsP",
      "parent_id": "UgxUdQDSkRpY-5nWyLl4AaABAg",
      "comment_type": "reply",
      "author": "@kuruvayellagi8154",
      "likes": 1,
      "published_at": "2020-12-03T14:45:04Z",
      "timestamp_refs": [],
      "text": "Malli rasthava neet anna",
      "parent_context": "I am in Allen Indore and u are better than my chemistry and physics teacher."
    },
    {
      "comment_id": "UgxUdQDSkRpY-5nWyLl4AaABAg.9G9GW2frPVP9GoEFYUYIEZ",
      "parent_id": "UgxUdQDSkRpY-5nWyLl4AaABAg",
      "comment_type": "reply",
      "author": "@kuruvayellagi8154",
      "likes": 2,
      "published_at": "2020-12-03T14:45:59Z",
      "timestamp_refs": [],
      "text": "Oka vela malli rasthay nuvvu pakka select kavalani korukuntunna",
      "parent_context": "I am in Allen Indore and u are better than my chemistry and physics teacher."
    },
    {
      "comment_id": "UgxUdQDSkRpY-5nWyLl4AaABAg.9G9GW2frPVP9GoEIjakUQN",
      "parent_id": "UgxUdQDSkRpY-5nWyLl4AaABAg",
      "comment_type": "reply",
      "author": "@Siddardha20",
      "likes": 2,
      "published_at": "2020-12-03T14:46:25Z",
      "timestamp_refs": [],
      "text": "@kuruvayellagi8154 ..ha rasta ra..1st attempt lo 390 vachai...without any coaching e sari longterm join avtunna",
      "parent_context": "I am in Allen Indore and u are better than my chemistry and physics teacher."
    },
    {
      "comment_id": "UgxUdQDSkRpY-5nWyLl4AaABAg.9G9GW2frPVP9GoEa4RIteB",
      "parent_id": "UgxUdQDSkRpY-5nWyLl4AaABAg",
      "comment_type": "reply",
      "author": "@Siddardha20",
      "likes": 1,
      "published_at": "2020-12-03T14:48:55Z",
      "timestamp_refs": [],
      "text": "@kuruvayellagi8154 🤩😍😊..thank you bro..nuvu kuda e 3 years bhaga chaduvu life set aypoddi",
      "parent_context": "I am in Allen Indore and u are better than my chemistry and physics teacher."
    },
    {
      "comment_id": "UgxUdQDSkRpY-5nWyLl4AaABAg.9G9GW2frPVP9GoEcDzZSSh",
      "parent_id": "UgxUdQDSkRpY-5nWyLl4AaABAg",
      "comment_type": "reply",
      "author": "@kuruvayellagi8154",
      "likes": 0,
      "published_at": "2020-12-03T14:49:13Z",
      "timestamp_refs": [],
      "text": "@Siddardha20 pakka select avuthav all the best 👍👍👍",
      "parent_context": "I am in Allen Indore and u are better than my chemistry and physics teacher."
    },
    {
      "comment_id": "UgxUdQDSkRpY-5nWyLl4AaABAg.9G9GW2frPVP9Gpe16DtYTo",
      "parent_id": "UgxUdQDSkRpY-5nWyLl4AaABAg",
      "comment_type": "reply",
      "author": "@kuruvayellagi8154",
      "likes": 0,
      "published_at": "2020-12-04T03:59:10Z",
      "timestamp_refs": [],
      "text": "Anna inter which collage chadhivavu",
      "parent_context": "I am in Allen Indore and u are better than my chemistry and physics teacher."
    },
    {
      "comment_id": "UgxUdQDSkRpY-5nWyLl4AaABAg.9G9GW2frPVP9GpeH9mPZNf",
      "parent_id": "UgxUdQDSkRpY-5nWyLl4AaABAg",
      "comment_type": "reply",
      "author": "@Siddardha20",
      "likes": 1,
      "published_at": "2020-12-04T04:01:22Z",
      "timestamp_refs": [],
      "text": "@kuruvayellagi8154 ...aprjc..bro..nimmakuru..Krishna district",
      "parent_context": "I am in Allen Indore and u are better than my chemistry and physics teacher."
    },
    {
      "comment_id": "UgxUdQDSkRpY-5nWyLl4AaABAg.9G9GW2frPVP9RrE_PtFIa4",
      "parent_id": "UgxUdQDSkRpY-5nWyLl4AaABAg",
      "comment_type": "reply",
      "author": "@nabendusc",
      "likes": 1,
      "published_at": "2021-09-04T04:31:53Z",
      "timestamp_refs": [],
      "text": "I m too in Allen Mumbai but prefer to study chem and physics from Alakh sir only....",
      "parent_context": "I am in Allen Indore and u are better than my chemistry and physics teacher."
    },
    {
      "comment_id": "UgxUdQDSkRpY-5nWyLl4AaABAg.9G9GW2frPVP9T9wYgQUoIL",
      "parent_id": "UgxUdQDSkRpY-5nWyLl4AaABAg",
      "comment_type": "reply",
      "author": "@pwguide7.5kviews89",
      "likes": 0,
      "published_at": "2021-10-06T16:41:50Z",
      "timestamp_refs": [],
      "text": "Hi 🌹",
      "parent_context": "I am in Allen Indore and u are better than my chemistry and physics teacher."
    },
    {
      "comment_id": "UgxUdQDSkRpY-5nWyLl4AaABAg.9G9GW2frPVP9TTbwAR8EfT",
      "parent_id": "UgxUdQDSkRpY-5nWyLl4AaABAg",
      "comment_type": "reply",
      "author": "@anyanair7321",
      "likes": 0,
      "published_at": "2021-10-14T08:06:29Z",
      "timestamp_refs": [],
      "text": "Same, he is better!!",
      "parent_context": "I am in Allen Indore and u are better than my chemistry and physics teacher."
    },
    {
      "comment_id": "UgxUdQDSkRpY-5nWyLl4AaABAg.9G9GW2frPVP9Tw5EiuCXv0",
      "parent_id": "UgxUdQDSkRpY-5nWyLl4AaABAg",
      "comment_type": "reply",
      "author": "@Legolas3300",
      "likes": 3,
      "published_at": "2021-10-25T18:49:16Z",
      "timestamp_refs": [],
      "text": "I am also in the best coaching of my state…I will not mention the name…And Sir is also better than my chemistry and physics teacher ♥️♥️",
      "parent_context": "I am in Allen Indore and u are better than my chemistry and physics teacher."
    },
    {
      "comment_id": "UgxUdQDSkRpY-5nWyLl4AaABAg.9G9GW2frPVP9_DwsJWWY4M",
      "parent_id": "UgxUdQDSkRpY-5nWyLl4AaABAg",
      "comment_type": "reply",
      "author": "@wolfz_gmr",
      "likes": 0,
      "published_at": "2022-03-31T05:41:22Z",
      "timestamp_refs": [],
      "text": "@Siddardha20 have you cracked neet",
      "parent_context": "I am in Allen Indore and u are better than my chemistry and physics teacher."
    },
    {
      "comment_id": "UgxUdQDSkRpY-5nWyLl4AaABAg.9G9GW2frPVP9crwg1qZcBD",
      "parent_id": "UgxUdQDSkRpY-5nWyLl4AaABAg",
      "comment_type": "reply",
      "author": "@charanm.h7712",
      "likes": 0,
      "published_at": "2022-06-29T17:22:44Z",
      "timestamp_refs": [],
      "text": "@Siddardha20 bro select ayyava?",
      "parent_context": "I am in Allen Indore and u are better than my chemistry and physics teacher."
    },
    {
      "comment_id": "UgxUdQDSkRpY-5nWyLl4AaABAg.9G9GW2frPVPABmhHyxbaZb",
      "parent_id": "UgxUdQDSkRpY-5nWyLl4AaABAg",
      "comment_type": "reply",
      "author": "@prachi08m",
      "likes": 0,
      "published_at": "2024-12-08T11:22:14Z",
      "timestamp_refs": [],
      "text": "Have you studied from saqlain sir?",
      "parent_context": "I am in Allen Indore and u are better than my chemistry and physics teacher."
    },
    {
      "comment_id": "UgxCn5u0pL2ZLoc5PPJ4AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@monibakhankhan",
      "likes": 96,
      "published_at": "2024-07-26T14:00:22Z",
      "timestamp_refs": [],
      "text": "the only distraction while watching your lectures is your comment section😂😂😂",
      "parent_context": ""
    },
    {
      "comment_id": "UgxCn5u0pL2ZLoc5PPJ4AaABAg.A6MN406dwz8A9yd_4eKosc",
      "parent_id": "UgxCn5u0pL2ZLoc5PPJ4AaABAg",
      "comment_type": "reply",
      "author": "@Anujjaiswal-s2s",
      "likes": 2,
      "published_at": "2024-10-24T09:37:51Z",
      "timestamp_refs": [],
      "text": "Tm jaiso ki wajah se",
      "parent_context": "the only distraction while watching your lectures is your comment section😂😂😂"
    },
    {
      "comment_id": "UgxCn5u0pL2ZLoc5PPJ4AaABAg.A6MN406dwz8AOwjojdo_Ik",
      "parent_id": "UgxCn5u0pL2ZLoc5PPJ4AaABAg",
      "comment_type": "reply",
      "author": "@rashmirekhanayak2792",
      "likes": 1,
      "published_at": "2025-10-31T11:44:51Z",
      "timestamp_refs": [],
      "text": "The only distraction in this video is you",
      "parent_context": "the only distraction while watching your lectures is your comment section😂😂😂"
    },
    {
      "comment_id": "UgyFcTFH535X-1CEm9V4AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@adt4039",
      "likes": 352,
      "published_at": "2021-04-10T17:14:28Z",
      "timestamp_refs": [],
      "text": "Finally All 16 lectures completed with proper notes 📝 🤗. Thank u ❤ so much sir..... Anyone else completing all lectures??",
      "parent_context": ""
    },
    {
      "comment_id": "UgyFcTFH535X-1CEm9V4AaABAg.9Ly5-4qb_zR9M-PYBmQP52",
      "parent_id": "UgyFcTFH535X-1CEm9V4AaABAg",
      "comment_type": "reply",
      "author": "@ananya1111",
      "likes": 4,
      "published_at": "2021-04-11T14:52:30Z",
      "timestamp_refs": [],
      "text": "Me too, sis",
      "parent_context": "Finally All 16 lectures completed with proper notes 📝 🤗. Thank u ❤ so much sir..... Anyone else completing all lectures??"
    },
    {
      "comment_id": "UgyFcTFH535X-1CEm9V4AaABAg.9Ly5-4qb_zR9fDP7xXhKX3",
      "parent_id": "UgyFcTFH535X-1CEm9V4AaABAg",
      "comment_type": "reply",
      "author": "@sakshiineet",
      "likes": 3,
      "published_at": "2022-08-27T03:46:10Z",
      "timestamp_refs": [],
      "text": "Yessss with notes ncert,pyq,practice",
      "parent_context": "Finally All 16 lectures completed with proper notes 📝 🤗. Thank u ❤ so much sir..... Anyone else completing all lectures??"
    },
    {
      "comment_id": "UgyFcTFH535X-1CEm9V4AaABAg.9Ly5-4qb_zR9hATjZ32ZkB",
      "parent_id": "UgyFcTFH535X-1CEm9V4AaABAg",
      "comment_type": "reply",
      "author": "@NURSINGBOYS12",
      "likes": 2,
      "published_at": "2022-10-14T17:31:28Z",
      "timestamp_refs": [],
      "text": "@Achintaya_ realyy bro",
      "parent_context": "Finally All 16 lectures completed with proper notes 📝 🤗. Thank u ❤ so much sir..... Anyone else completing all lectures??"
    },
    {
      "comment_id": "UgyFcTFH535X-1CEm9V4AaABAg.9Ly5-4qb_zR9hAV6UuduWP",
      "parent_id": "UgyFcTFH535X-1CEm9V4AaABAg",
      "comment_type": "reply",
      "author": "@NURSINGBOYS12",
      "likes": 1,
      "published_at": "2022-10-14T17:43:28Z",
      "timestamp_refs": [],
      "text": "@Achintaya_ bahi mujhe bato app in notes sa aur ncert ka badd Kiya aur kuch pardhta ho ??",
      "parent_context": "Finally All 16 lectures completed with proper notes 📝 🤗. Thank u ❤ so much sir..... Anyone else completing all lectures??"
    },
    {
      "comment_id": "UgyFcTFH535X-1CEm9V4AaABAg.9Ly5-4qb_zR9luknCzPSCt",
      "parent_id": "UgyFcTFH535X-1CEm9V4AaABAg",
      "comment_type": "reply",
      "author": "@aryansingh1830",
      "likes": 0,
      "published_at": "2023-02-09T12:19:07Z",
      "timestamp_refs": [],
      "text": "Yess I'm",
      "parent_context": "Finally All 16 lectures completed with proper notes 📝 🤗. Thank u ❤ so much sir..... Anyone else completing all lectures??"
    },
    {
      "comment_id": "UgyFcTFH535X-1CEm9V4AaABAg.9Ly5-4qb_zR9r5bD6L9Vfl",
      "parent_id": "UgyFcTFH535X-1CEm9V4AaABAg",
      "comment_type": "reply",
      "author": "@sarojdevi5077",
      "likes": 0,
      "published_at": "2023-06-18T09:23:16Z",
      "timestamp_refs": [],
      "text": "Me too",
      "parent_context": "Finally All 16 lectures completed with proper notes 📝 🤗. Thank u ❤ so much sir..... Anyone else completing all lectures??"
    },
    {
      "comment_id": "UgyFcTFH535X-1CEm9V4AaABAg.9Ly5-4qb_zR9raUuumAeqX",
      "parent_id": "UgyFcTFH535X-1CEm9V4AaABAg",
      "comment_type": "reply",
      "author": "@shauryahindustanigamerz7445",
      "likes": 0,
      "published_at": "2023-06-30T18:35:10Z",
      "timestamp_refs": [],
      "text": "Me too",
      "parent_context": "Finally All 16 lectures completed with proper notes 📝 🤗. Thank u ❤ so much sir..... Anyone else completing all lectures??"
    },
    {
      "comment_id": "UgyFcTFH535X-1CEm9V4AaABAg.9Ly5-4qb_zR9tT6wEzovLH",
      "parent_id": "UgyFcTFH535X-1CEm9V4AaABAg",
      "comment_type": "reply",
      "author": "@Trickricks-bio",
      "likes": 0,
      "published_at": "2023-08-16T05:34:31Z",
      "timestamp_refs": [],
      "text": "Same",
      "parent_context": "Finally All 16 lectures completed with proper notes 📝 🤗. Thank u ❤ so much sir..... Anyone else completing all lectures??"
    },
    {
      "comment_id": "UgyFcTFH535X-1CEm9V4AaABAg.9Ly5-4qb_zRA672veRMNnd",
      "parent_id": "UgyFcTFH535X-1CEm9V4AaABAg",
      "comment_type": "reply",
      "author": "@everythingpartofmyplan",
      "likes": 0,
      "published_at": "2024-07-20T15:15:43Z",
      "timestamp_refs": [],
      "text": "Konsa iit / nit mila 😂",
      "parent_context": "Finally All 16 lectures completed with proper notes 📝 🤗. Thank u ❤ so much sir..... Anyone else completing all lectures??"
    },
    {
      "comment_id": "Ugy572E3_JRGrFqmH_h4AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@priyanshu8363",
      "likes": 96,
      "published_at": "2020-10-01T03:40:41Z",
      "timestamp_refs": [],
      "text": "2 min silence for ending the chapter 😭",
      "parent_context": ""
    },
    {
      "comment_id": "Ugy9aPADenS6AJwKf794AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@blackwhite1620",
      "likes": 91,
      "published_at": "2019-10-14T13:44:59Z",
      "timestamp_refs": [],
      "text": "NCERT me ahe page ka hydrogen bonding hai aur aap ne pura 1 hour me explain kiya👏👏",
      "parent_context": ""
    },
    {
      "comment_id": "UgwMK2Nl9xV4F-u3aQF4AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@mirmuskan1049",
      "likes": 61,
      "published_at": "2021-06-14T14:02:12Z",
      "timestamp_refs": [],
      "text": "I felt pity on hydrogen when sir said \"bichara gareeb kaha se electron de\" 😂",
      "parent_context": ""
    },
    {
      "comment_id": "Ugz4zOCeJLJGwRvbubd4AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@dhritiranjan9453",
      "likes": 472,
      "published_at": "2019-08-27T20:03:09Z",
      "timestamp_refs": [],
      "text": "When you are ready to quit just remember how good you will look in that white coat of a doctor. Believe you can and you are Halfway there.ALAKH PANDEY SIR helps us in this journey. ⭐⭐",
      "parent_context": ""
    },
    {
      "comment_id": "Ugz4zOCeJLJGwRvbubd4AaABAg.8z91hZHDGke93Pg0VanFVb",
      "parent_id": "Ugz4zOCeJLJGwRvbubd4AaABAg",
      "comment_type": "reply",
      "author": "@codmlover6008",
      "likes": 28,
      "published_at": "2020-01-05T13:48:57Z",
      "timestamp_refs": [],
      "text": "But I wanna be an engineer",
      "parent_context": "When you are ready to quit just remember how good you will look in that white coat of a doctor. Believe you can and you are Halfway there.ALAKH PANDEY SIR helps us in this journey. ⭐⭐"
    },
    {
      "comment_id": "Ugz4zOCeJLJGwRvbubd4AaABAg.8z91hZHDGke98uf3KXH1pp",
      "parent_id": "Ugz4zOCeJLJGwRvbubd4AaABAg",
      "comment_type": "reply",
      "author": "@bharghavkv5757",
      "likes": 1,
      "published_at": "2020-05-21T06:33:16Z",
      "timestamp_refs": [],
      "text": "Bleedingreen 🤣🤣😂",
      "parent_context": "When you are ready to quit just remember how good you will look in that white coat of a doctor. Believe you can and you are Halfway there.ALAKH PANDEY SIR helps us in this journey. ⭐⭐"
    },
    {
      "comment_id": "Ugz4zOCeJLJGwRvbubd4AaABAg.8z91hZHDGke9C48zCTq_KG",
      "parent_id": "Ugz4zOCeJLJGwRvbubd4AaABAg",
      "comment_type": "reply",
      "author": "@vanishakumar3608",
      "likes": 3,
      "published_at": "2020-08-07T21:50:02Z",
      "timestamp_refs": [],
      "text": "Thanks for the inspiration",
      "parent_context": "When you are ready to quit just remember how good you will look in that white coat of a doctor. Believe you can and you are Halfway there.ALAKH PANDEY SIR helps us in this journey. ⭐⭐"
    },
    {
      "comment_id": "Ugz4zOCeJLJGwRvbubd4AaABAg.8z91hZHDGke9CAVSrZZUW0",
      "parent_id": "Ugz4zOCeJLJGwRvbubd4AaABAg",
      "comment_type": "reply",
      "author": "@rashmoninayek5019",
      "likes": 9,
      "published_at": "2020-08-10T09:01:54Z",
      "timestamp_refs": [],
      "text": "Every Hero May Not Be A Doctor But Every Doctor Is Definitely A Hero.I wish you will be the world famous doctor Dhriti.",
      "parent_context": "When you are ready to quit just remember how good you will look in that white coat of a doctor. Believe you can and you are Halfway there.ALAKH PANDEY SIR helps us in this journey. ⭐⭐"
    },
    {
      "comment_id": "Ugz4zOCeJLJGwRvbubd4AaABAg.8z91hZHDGke9C_wtMus0kf",
      "parent_id": "Ugz4zOCeJLJGwRvbubd4AaABAg",
      "comment_type": "reply",
      "author": "@jimhalpert9803",
      "likes": 5,
      "published_at": "2020-08-20T15:30:35Z",
      "timestamp_refs": [],
      "text": "Rip those who want to become engineers..",
      "parent_context": "When you are ready to quit just remember how good you will look in that white coat of a doctor. Believe you can and you are Halfway there.ALAKH PANDEY SIR helps us in this journey. ⭐⭐"
    },
    {
      "comment_id": "Ugz4zOCeJLJGwRvbubd4AaABAg.8z91hZHDGke9FEvQz3D0rM",
      "parent_id": "Ugz4zOCeJLJGwRvbubd4AaABAg",
      "comment_type": "reply",
      "author": "@smile-me2ik",
      "likes": 13,
      "published_at": "2020-10-25T15:48:43Z",
      "timestamp_refs": [],
      "text": "Asa comment mt likh ki engineer wale yhi sochkar fasi laga lein ki unka koi dress code hi nhi🤣🤣",
      "parent_context": "When you are ready to quit just remember how good you will look in that white coat of a doctor. Believe you can and you are Halfway there.ALAKH PANDEY SIR helps us in this journey. ⭐⭐"
    },
    {
      "comment_id": "Ugz4zOCeJLJGwRvbubd4AaABAg.8z91hZHDGke9F_TrWY0QzW",
      "parent_id": "Ugz4zOCeJLJGwRvbubd4AaABAg",
      "comment_type": "reply",
      "author": "@prasanuniyal9647",
      "likes": 0,
      "published_at": "2020-11-03T00:42:22Z",
      "timestamp_refs": [],
      "text": "Tq u sista for ur lovely motivation because some time i feel myself very depress but when I think about my dream then I am again become energetic 🥰",
      "parent_context": "When you are ready to quit just remember how good you will look in that white coat of a doctor. Believe you can and you are Halfway there.ALAKH PANDEY SIR helps us in this journey. ⭐⭐"
    },
    {
      "comment_id": "Ugz4zOCeJLJGwRvbubd4AaABAg.8z91hZHDGke9GrthRC2of9",
      "parent_id": "Ugz4zOCeJLJGwRvbubd4AaABAg",
      "comment_type": "reply",
      "author": "@zingurssa17",
      "likes": 0,
      "published_at": "2020-12-05T00:54:39Z",
      "timestamp_refs": [],
      "text": "Yes👍",
      "parent_context": "When you are ready to quit just remember how good you will look in that white coat of a doctor. Believe you can and you are Halfway there.ALAKH PANDEY SIR helps us in this journey. ⭐⭐"
    },
    {
      "comment_id": "Ugz4zOCeJLJGwRvbubd4AaABAg.8z91hZHDGke9Op73xi_kVJ",
      "parent_id": "Ugz4zOCeJLJGwRvbubd4AaABAg",
      "comment_type": "reply",
      "author": "@aasmamazumdar2750",
      "likes": 0,
      "published_at": "2021-06-20T19:13:37Z",
      "timestamp_refs": [],
      "text": "@smile-me2ik 😂😂😂😂",
      "parent_context": "When you are ready to quit just remember how good you will look in that white coat of a doctor. Believe you can and you are Halfway there.ALAKH PANDEY SIR helps us in this journey. ⭐⭐"
    },
    {
      "comment_id": "Ugz4zOCeJLJGwRvbubd4AaABAg.8z91hZHDGke9Op75kUr9pa",
      "parent_id": "Ugz4zOCeJLJGwRvbubd4AaABAg",
      "comment_type": "reply",
      "author": "@aasmamazumdar2750",
      "likes": 0,
      "published_at": "2021-06-20T19:13:52Z",
      "timestamp_refs": [],
      "text": "@smile-me2ik op",
      "parent_context": "When you are ready to quit just remember how good you will look in that white coat of a doctor. Believe you can and you are Halfway there.ALAKH PANDEY SIR helps us in this journey. ⭐⭐"
    },
    {
      "comment_id": "Ugz4zOCeJLJGwRvbubd4AaABAg.8z91hZHDGke9Q2I_-e2Q1U",
      "parent_id": "Ugz4zOCeJLJGwRvbubd4AaABAg",
      "comment_type": "reply",
      "author": "@priyachaubey5989",
      "likes": 0,
      "published_at": "2021-07-21T03:54:53Z",
      "timestamp_refs": [],
      "text": "Thanku sir",
      "parent_context": "When you are ready to quit just remember how good you will look in that white coat of a doctor. Believe you can and you are Halfway there.ALAKH PANDEY SIR helps us in this journey. ⭐⭐"
    },
    {
      "comment_id": "Ugz4zOCeJLJGwRvbubd4AaABAg.8z91hZHDGke9ZavanshrfU",
      "parent_id": "Ugz4zOCeJLJGwRvbubd4AaABAg",
      "comment_type": "reply",
      "author": "@meenasharma9609",
      "likes": 0,
      "published_at": "2022-03-15T16:40:37Z",
      "timestamp_refs": [],
      "text": "Is your name drishti????",
      "parent_context": "When you are ready to quit just remember how good you will look in that white coat of a doctor. Believe you can and you are Halfway there.ALAKH PANDEY SIR helps us in this journey. ⭐⭐"
    },
    {
      "comment_id": "UgxeKNX2u_BUcoCZfQ14AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@kumarirani9791",
      "likes": 236,
      "published_at": "2021-03-18T14:43:26Z",
      "timestamp_refs": [],
      "text": "Finally, after 4 days I completed this chapter , with 4 lectures per day. 😇😇😇😇😇",
      "parent_context": ""
    },
    {
      "comment_id": "UgxeKNX2u_BUcoCZfQ14AaABAg.9L1aQoAkLw19QGab1faNtC",
      "parent_id": "UgxeKNX2u_BUcoCZfQ14AaABAg",
      "comment_type": "reply",
      "author": "@r.vishnuvardhan3896",
      "likes": 15,
      "published_at": "2021-07-26T17:10:33Z",
      "timestamp_refs": [],
      "text": "Yo also got 4likes and you commented 4months ago😂",
      "parent_context": "Finally, after 4 days I completed this chapter , with 4 lectures per day. 😇😇😇😇😇"
    },
    {
      "comment_id": "UgxeKNX2u_BUcoCZfQ14AaABAg.9L1aQoAkLw19QGaf2NCx6c",
      "parent_id": "UgxeKNX2u_BUcoCZfQ14AaABAg",
      "comment_type": "reply",
      "author": "@r.vishnuvardhan3896",
      "likes": 4,
      "published_at": "2021-07-26T17:11:06Z",
      "timestamp_refs": [],
      "text": "Making 4comments also XD",
      "parent_context": "Finally, after 4 days I completed this chapter , with 4 lectures per day. 😇😇😇😇😇"
    },
    {
      "comment_id": "UgxeKNX2u_BUcoCZfQ14AaABAg.9L1aQoAkLw19QGahrTEXqO",
      "parent_id": "UgxeKNX2u_BUcoCZfQ14AaABAg",
      "comment_type": "reply",
      "author": "@r.vishnuvardhan3896",
      "likes": 7,
      "published_at": "2021-07-26T17:11:29Z",
      "timestamp_refs": [],
      "text": "Next comment 4u to make it 4😂",
      "parent_context": "Finally, after 4 days I completed this chapter , with 4 lectures per day. 😇😇😇😇😇"
    },
    {
      "comment_id": "UgxeKNX2u_BUcoCZfQ14AaABAg.9L1aQoAkLw19QeyCdkBZqg",
      "parent_id": "UgxeKNX2u_BUcoCZfQ14AaABAg",
      "comment_type": "reply",
      "author": "@jeevanreddy356",
      "likes": 2,
      "published_at": "2021-08-05T13:37:49Z",
      "timestamp_refs": [],
      "text": "@r.vishnuvardhan3896 yes",
      "parent_context": "Finally, after 4 days I completed this chapter , with 4 lectures per day. 😇😇😇😇😇"
    },
    {
      "comment_id": "UgxeKNX2u_BUcoCZfQ14AaABAg.9L1aQoAkLw19SNu0G2ngYy",
      "parent_id": "UgxeKNX2u_BUcoCZfQ14AaABAg",
      "comment_type": "reply",
      "author": "@vanshikasingh4905",
      "likes": 1,
      "published_at": "2021-09-17T06:17:38Z",
      "timestamp_refs": [],
      "text": "Same",
      "parent_context": "Finally, after 4 days I completed this chapter , with 4 lectures per day. 😇😇😇😇😇"
    },
    {
      "comment_id": "UgxeKNX2u_BUcoCZfQ14AaABAg.9L1aQoAkLw19XBOCQY8-AG",
      "parent_id": "UgxeKNX2u_BUcoCZfQ14AaABAg",
      "comment_type": "reply",
      "author": "@vaishnavimote7651",
      "likes": 18,
      "published_at": "2022-01-14T16:17:01Z",
      "timestamp_refs": [],
      "text": "It took me an entire month to complete this chapter..I really hate this kind of long and lengthy chapters..",
      "parent_context": "Finally, after 4 days I completed this chapter , with 4 lectures per day. 😇😇😇😇😇"
    },
    {
      "comment_id": "UgxeKNX2u_BUcoCZfQ14AaABAg.9L1aQoAkLw19XDoE9SHw8W",
      "parent_id": "UgxeKNX2u_BUcoCZfQ14AaABAg",
      "comment_type": "reply",
      "author": "@sumitonyt",
      "likes": 9,
      "published_at": "2022-01-15T14:51:39Z",
      "timestamp_refs": [],
      "text": "@vaishnavimote7651 ha ha mai vahi dekhney aaya tha ki koi to ho mere jaisa 😁 same pinch",
      "parent_context": "Finally, after 4 days I completed this chapter , with 4 lectures per day. 😇😇😇😇😇"
    },
    {
      "comment_id": "UgxeKNX2u_BUcoCZfQ14AaABAg.9L1aQoAkLw19_t96w7XTxC",
      "parent_id": "UgxeKNX2u_BUcoCZfQ14AaABAg",
      "comment_type": "reply",
      "author": "@sampadab.1788",
      "likes": 4,
      "published_at": "2022-04-16T15:05:12Z",
      "timestamp_refs": [],
      "text": "@vaishnavimote7651 is this lectures good for neet 2022.??",
      "parent_context": "Finally, after 4 days I completed this chapter , with 4 lectures per day. 😇😇😇😇😇"
    },
    {
      "comment_id": "UgxeKNX2u_BUcoCZfQ14AaABAg.9L1aQoAkLw19gmqWhvt-aL",
      "parent_id": "UgxeKNX2u_BUcoCZfQ14AaABAg",
      "comment_type": "reply",
      "author": "@suyashnegi8344",
      "likes": 2,
      "published_at": "2022-10-05T03:58:16Z",
      "timestamp_refs": [],
      "text": "Matlab kuch clear ni hua tera. Simple",
      "parent_context": "Finally, after 4 days I completed this chapter , with 4 lectures per day. 😇😇😇😇😇"
    },
    {
      "comment_id": "UgxeKNX2u_BUcoCZfQ14AaABAg.9L1aQoAkLw19jNQtbKGGvl",
      "parent_id": "UgxeKNX2u_BUcoCZfQ14AaABAg",
      "comment_type": "reply",
      "author": "@josephjebrail6524",
      "likes": 9,
      "published_at": "2022-12-08T11:19:32Z",
      "timestamp_refs": [],
      "text": "It took me 4-5 weeks to complete with doing a lot of questions",
      "parent_context": "Finally, after 4 days I completed this chapter , with 4 lectures per day. 😇😇😇😇😇"
    },
    {
      "comment_id": "UgyWebAIJ5_p-c3LwL54AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@erasoni7321",
      "likes": 297,
      "published_at": "2019-11-10T14:46:32Z",
      "timestamp_refs": [],
      "text": "Sir, initially I used to hate chemistry but now I have started loving it, this is just because of you sir.... So thank you so much 😊",
      "parent_context": ""
    },
    {
      "comment_id": "UgyWebAIJ5_p-c3LwL54AaABAg.919a5BkAm0Q9BP6aBzW2rP",
      "parent_id": "UgyWebAIJ5_p-c3LwL54AaABAg",
      "comment_type": "reply",
      "author": "@rajafaisal2997",
      "likes": 8,
      "published_at": "2020-07-22T04:41:48Z",
      "timestamp_refs": [],
      "text": "Same to me",
      "parent_context": "Sir, initially I used to hate chemistry but now I have started loving it, this is just because of you sir.... So thank you so much 😊"
    },
    {
      "comment_id": "UgyWebAIJ5_p-c3LwL54AaABAg.919a5BkAm0Q9C3A1Qm718P",
      "parent_id": "UgyWebAIJ5_p-c3LwL54AaABAg",
      "comment_type": "reply",
      "author": "@PratiksBiology",
      "likes": 3,
      "published_at": "2020-08-07T12:39:58Z",
      "timestamp_refs": [],
      "text": "I too",
      "parent_context": "Sir, initially I used to hate chemistry but now I have started loving it, this is just because of you sir.... So thank you so much 😊"
    },
    {
      "comment_id": "UgyWebAIJ5_p-c3LwL54AaABAg.919a5BkAm0Q9CN2k789cDZ",
      "parent_id": "UgyWebAIJ5_p-c3LwL54AaABAg",
      "comment_type": "reply",
      "author": "@শোর্য্যপাল",
      "likes": 3,
      "published_at": "2020-08-15T06:01:07Z",
      "timestamp_refs": [],
      "text": "Me too",
      "parent_context": "Sir, initially I used to hate chemistry but now I have started loving it, this is just because of you sir.... So thank you so much 😊"
    },
    {
      "comment_id": "UgyWebAIJ5_p-c3LwL54AaABAg.919a5BkAm0Q9CREgjBIPDe",
      "parent_id": "UgyWebAIJ5_p-c3LwL54AaABAg",
      "comment_type": "reply",
      "author": "@bharatpatil5848",
      "likes": 2,
      "published_at": "2020-08-16T21:02:29Z",
      "timestamp_refs": [],
      "text": "👌👌👌🔥🔥🔥🔥🔥🤗🤗",
      "parent_context": "Sir, initially I used to hate chemistry but now I have started loving it, this is just because of you sir.... So thank you so much 😊"
    },
    {
      "comment_id": "UgyWebAIJ5_p-c3LwL54AaABAg.919a5BkAm0Q9CpbyuQCddI",
      "parent_id": "UgyWebAIJ5_p-c3LwL54AaABAg",
      "comment_type": "reply",
      "author": "@kasturidas8307",
      "likes": 2,
      "published_at": "2020-08-26T17:35:41Z",
      "timestamp_refs": [],
      "text": "Me also",
      "parent_context": "Sir, initially I used to hate chemistry but now I have started loving it, this is just because of you sir.... So thank you so much 😊"
    },
    {
      "comment_id": "UgyWebAIJ5_p-c3LwL54AaABAg.919a5BkAm0Q9CrNI4ZR3lH",
      "parent_id": "UgyWebAIJ5_p-c3LwL54AaABAg",
      "comment_type": "reply",
      "author": "@aesthaticbts9491",
      "likes": 6,
      "published_at": "2020-08-27T09:57:07Z",
      "timestamp_refs": [],
      "text": "I still need some time to love this chem coz its weird I hope I get used to it asap.. I'm in class 11 right now",
      "parent_context": "Sir, initially I used to hate chemistry but now I have started loving it, this is just because of you sir.... So thank you so much 😊"
    },
    {
      "comment_id": "UgyWebAIJ5_p-c3LwL54AaABAg.919a5BkAm0Q9CwWIKpCd-a",
      "parent_id": "UgyWebAIJ5_p-c3LwL54AaABAg",
      "comment_type": "reply",
      "author": "@AnshMalhotra-i5v",
      "likes": 5,
      "published_at": "2020-08-29T09:52:00Z",
      "timestamp_refs": [],
      "text": "@aesthaticbts9491 Your comment is the latest one here and I honestly relate with you!!",
      "parent_context": "Sir, initially I used to hate chemistry but now I have started loving it, this is just because of you sir.... So thank you so much 😊"
    },
    {
      "comment_id": "UgyWebAIJ5_p-c3LwL54AaABAg.919a5BkAm0Q9D0Bh5ZQgOw",
      "parent_id": "UgyWebAIJ5_p-c3LwL54AaABAg",
      "comment_type": "reply",
      "author": "@desimehnat2429",
      "likes": 0,
      "published_at": "2020-08-31T05:28:13Z",
      "timestamp_refs": [],
      "text": "Hello soni",
      "parent_context": "Sir, initially I used to hate chemistry but now I have started loving it, this is just because of you sir.... So thank you so much 😊"
    },
    {
      "comment_id": "UgyWebAIJ5_p-c3LwL54AaABAg.919a5BkAm0Q9D39jLfyuy9",
      "parent_id": "UgyWebAIJ5_p-c3LwL54AaABAg",
      "comment_type": "reply",
      "author": "@aesthaticbts9491",
      "likes": 3,
      "published_at": "2020-09-01T09:08:46Z",
      "timestamp_refs": [],
      "text": "@AnshMalhotra-i5v ikr I'm just alive because of him😁 idk how Physics is weird for people but chem is like 🙄 for me . I hope I understand everything asap😁",
      "parent_context": "Sir, initially I used to hate chemistry but now I have started loving it, this is just because of you sir.... So thank you so much 😊"
    },
    {
      "comment_id": "UgyWebAIJ5_p-c3LwL54AaABAg.919a5BkAm0Q9D3AcCe2udL",
      "parent_id": "UgyWebAIJ5_p-c3LwL54AaABAg",
      "comment_type": "reply",
      "author": "@aesthaticbts9491",
      "likes": 3,
      "published_at": "2020-09-01T09:16:32Z",
      "timestamp_refs": [],
      "text": "@AnshMalhotra-i5v ok 😂😁👍🙏 hey bhagwan pleaseeee😂😂",
      "parent_context": "Sir, initially I used to hate chemistry but now I have started loving it, this is just because of you sir.... So thank you so much 😊"
    },
    {
      "comment_id": "UgyWebAIJ5_p-c3LwL54AaABAg.919a5BkAm0Q9D3EHV46jlC",
      "parent_id": "UgyWebAIJ5_p-c3LwL54AaABAg",
      "comment_type": "reply",
      "author": "@AnshMalhotra-i5v",
      "likes": 4,
      "published_at": "2020-09-01T09:48:31Z",
      "timestamp_refs": [],
      "text": "@aesthaticbts9491 Thanks..HOPE aapka COMPETETION bohot acha ho!!",
      "parent_context": "Sir, initially I used to hate chemistry but now I have started loving it, this is just because of you sir.... So thank you so much 😊"
    },
    {
      "comment_id": "UgyWebAIJ5_p-c3LwL54AaABAg.919a5BkAm0Q9D3EluyjZa5",
      "parent_id": "UgyWebAIJ5_p-c3LwL54AaABAg",
      "comment_type": "reply",
      "author": "@aesthaticbts9491",
      "likes": 2,
      "published_at": "2020-09-01T09:52:48Z",
      "timestamp_refs": [],
      "text": "@AnshMalhotra-i5v thanks and same to u!!",
      "parent_context": "Sir, initially I used to hate chemistry but now I have started loving it, this is just because of you sir.... So thank you so much 😊"
    },
    {
      "comment_id": "UgyWebAIJ5_p-c3LwL54AaABAg.919a5BkAm0Q9DGPiM4hJ_8",
      "parent_id": "UgyWebAIJ5_p-c3LwL54AaABAg",
      "comment_type": "reply",
      "author": "@Ankurrajput17",
      "likes": 4,
      "published_at": "2020-09-06T12:38:34Z",
      "timestamp_refs": [],
      "text": "Chal jhutti😉",
      "parent_context": "Sir, initially I used to hate chemistry but now I have started loving it, this is just because of you sir.... So thank you so much 😊"
    },
    {
      "comment_id": "UgyWebAIJ5_p-c3LwL54AaABAg.919a5BkAm0Q9DffH1Jv5qU",
      "parent_id": "UgyWebAIJ5_p-c3LwL54AaABAg",
      "comment_type": "reply",
      "author": "@vanshjais1777",
      "likes": 2,
      "published_at": "2020-09-16T17:23:30Z",
      "timestamp_refs": [],
      "text": "@Ankurrajput17 😂",
      "parent_context": "Sir, initially I used to hate chemistry but now I have started loving it, this is just because of you sir.... So thank you so much 😊"
    },
    {
      "comment_id": "UgyWebAIJ5_p-c3LwL54AaABAg.919a5BkAm0Q9HDIFdDpmQM",
      "parent_id": "UgyWebAIJ5_p-c3LwL54AaABAg",
      "comment_type": "reply",
      "author": "@turbo_guyy",
      "likes": 0,
      "published_at": "2020-12-13T17:41:12Z",
      "timestamp_refs": [],
      "text": "@aesthaticbts9491 what's happening??🙄",
      "parent_context": "Sir, initially I used to hate chemistry but now I have started loving it, this is just because of you sir.... So thank you so much 😊"
    },
    {
      "comment_id": "UgyWebAIJ5_p-c3LwL54AaABAg.919a5BkAm0Q9HDJALk950I",
      "parent_id": "UgyWebAIJ5_p-c3LwL54AaABAg",
      "comment_type": "reply",
      "author": "@aesthaticbts9491",
      "likes": 0,
      "published_at": "2020-12-13T17:49:13Z",
      "timestamp_refs": [],
      "text": "@turbo_guyy I hope u can read 😁 nothing much tho just describing my hatred towards chemistry 🙄",
      "parent_context": "Sir, initially I used to hate chemistry but now I have started loving it, this is just because of you sir.... So thank you so much 😊"
    },
    {
      "comment_id": "UgyWebAIJ5_p-c3LwL54AaABAg.919a5BkAm0Q9HDJtQDR3-W",
      "parent_id": "UgyWebAIJ5_p-c3LwL54AaABAg",
      "comment_type": "reply",
      "author": "@turbo_guyy",
      "likes": 3,
      "published_at": "2020-12-13T17:55:30Z",
      "timestamp_refs": [],
      "text": "@aesthaticbts9491 yeah but i was not understanding because of errors and spelling mistakes 😅😅 And you are right, i don't like chemistry more as much as i like physics, math In chemistry:- exception×100 😁",
      "parent_context": "Sir, initially I used to hate chemistry but now I have started loving it, this is just because of you sir.... So thank you so much 😊"
    },
    {
      "comment_id": "UgyWebAIJ5_p-c3LwL54AaABAg.919a5BkAm0Q9HEWKXfN2Xy",
      "parent_id": "UgyWebAIJ5_p-c3LwL54AaABAg",
      "comment_type": "reply",
      "author": "@aesthaticbts9491",
      "likes": 0,
      "published_at": "2020-12-14T05:03:26Z",
      "timestamp_refs": [],
      "text": "@turbo_guyy lmao ikr😂😂😂😂😂",
      "parent_context": "Sir, initially I used to hate chemistry but now I have started loving it, this is just because of you sir.... So thank you so much 😊"
    },
    {
      "comment_id": "UgyWebAIJ5_p-c3LwL54AaABAg.919a5BkAm0Q9HEY3qDyPAK",
      "parent_id": "UgyWebAIJ5_p-c3LwL54AaABAg",
      "comment_type": "reply",
      "author": "@turbo_guyy",
      "likes": 4,
      "published_at": "2020-12-14T05:18:38Z",
      "timestamp_refs": [],
      "text": "@aesthaticbts9491 yeah you know right, It reminds me kota factory's dialogue of vaibhav 😂😂 Every theory of chemistry is right untill u see next page 😂😂",
      "parent_context": "Sir, initially I used to hate chemistry but now I have started loving it, this is just because of you sir.... So thank you so much 😊"
    },
    {
      "comment_id": "UgyWebAIJ5_p-c3LwL54AaABAg.919a5BkAm0Q9HEYL86fIna",
      "parent_id": "UgyWebAIJ5_p-c3LwL54AaABAg",
      "comment_type": "reply",
      "author": "@aesthaticbts9491",
      "likes": 0,
      "published_at": "2020-12-14T05:21:00Z",
      "timestamp_refs": [],
      "text": "@turbo_guyy loll😂",
      "parent_context": "Sir, initially I used to hate chemistry but now I have started loving it, this is just because of you sir.... So thank you so much 😊"
    },
    {
      "comment_id": "UgyWebAIJ5_p-c3LwL54AaABAg.919a5BkAm0Q9HEYfPWmvQN",
      "parent_id": "UgyWebAIJ5_p-c3LwL54AaABAg",
      "comment_type": "reply",
      "author": "@turbo_guyy",
      "likes": 0,
      "published_at": "2020-12-14T05:23:54Z",
      "timestamp_refs": [],
      "text": "@aesthaticbts9491 by the way It's *lol* na.......",
      "parent_context": "Sir, initially I used to hate chemistry but now I have started loving it, this is just because of you sir.... So thank you so much 😊"
    },
    {
      "comment_id": "UgyWebAIJ5_p-c3LwL54AaABAg.919a5BkAm0Q9HE_mDKEzLX",
      "parent_id": "UgyWebAIJ5_p-c3LwL54AaABAg",
      "comment_type": "reply",
      "author": "@aesthaticbts9491",
      "likes": 0,
      "published_at": "2020-12-14T05:42:18Z",
      "timestamp_refs": [],
      "text": "@turbo_guyy yup but lolllll can also be used bro😁",
      "parent_context": "Sir, initially I used to hate chemistry but now I have started loving it, this is just because of you sir.... So thank you so much 😊"
    },
    {
      "comment_id": "UgyWebAIJ5_p-c3LwL54AaABAg.919a5BkAm0Q9HEbSViaKA2",
      "parent_id": "UgyWebAIJ5_p-c3LwL54AaABAg",
      "comment_type": "reply",
      "author": "@turbo_guyy",
      "likes": 0,
      "published_at": "2020-12-14T05:56:57Z",
      "timestamp_refs": [],
      "text": "@aesthaticbts9491 it can be used but bro should not be used 😂😂",
      "parent_context": "Sir, initially I used to hate chemistry but now I have started loving it, this is just because of you sir.... So thank you so much 😊"
    },
    {
      "comment_id": "UgyWebAIJ5_p-c3LwL54AaABAg.919a5BkAm0Q9HEbitV4T1s",
      "parent_id": "UgyWebAIJ5_p-c3LwL54AaABAg",
      "comment_type": "reply",
      "author": "@aesthaticbts9491",
      "likes": 0,
      "published_at": "2020-12-14T05:59:20Z",
      "timestamp_refs": [],
      "text": "@turbo_guyy why tho??anyway leave it 🙃",
      "parent_context": "Sir, initially I used to hate chemistry but now I have started loving it, this is just because of you sir.... So thank you so much 😊"
    },
    {
      "comment_id": "UgyWebAIJ5_p-c3LwL54AaABAg.919a5BkAm0Q9HEjqW5Khvi",
      "parent_id": "UgyWebAIJ5_p-c3LwL54AaABAg",
      "comment_type": "reply",
      "author": "@turbo_guyy",
      "likes": 0,
      "published_at": "2020-12-14T07:10:16Z",
      "timestamp_refs": [],
      "text": "@aesthaticbts9491 tho means ?? 🙄",
      "parent_context": "Sir, initially I used to hate chemistry but now I have started loving it, this is just because of you sir.... So thank you so much 😊"
    },
    {
      "comment_id": "UgyWebAIJ5_p-c3LwL54AaABAg.919a5BkAm0Q9HEkOOKN11c",
      "parent_id": "UgyWebAIJ5_p-c3LwL54AaABAg",
      "comment_type": "reply",
      "author": "@aesthaticbts9491",
      "likes": 0,
      "published_at": "2020-12-14T07:15:02Z",
      "timestamp_refs": [],
      "text": "@turbo_guyy umm bro tho means though 😂😂 u should know the shortcuts",
      "parent_context": "Sir, initially I used to hate chemistry but now I have started loving it, this is just because of you sir.... So thank you so much 😊"
    },
    {
      "comment_id": "UgyWebAIJ5_p-c3LwL54AaABAg.919a5BkAm0Q9HEkwb2jM6p",
      "parent_id": "UgyWebAIJ5_p-c3LwL54AaABAg",
      "comment_type": "reply",
      "author": "@turbo_guyy",
      "likes": 0,
      "published_at": "2020-12-14T07:19:51Z",
      "timestamp_refs": [],
      "text": "@aesthaticbts9491 it's not compulsory that we should know each shortcut of *whatsapp* University😉 But i tell again, don't use bro for other unknown boy 😂😂😂",
      "parent_context": "Sir, initially I used to hate chemistry but now I have started loving it, this is just because of you sir.... So thank you so much 😊"
    },
    {
      "comment_id": "UgyWebAIJ5_p-c3LwL54AaABAg.919a5BkAm0Q9HElK8GR8-b",
      "parent_id": "UgyWebAIJ5_p-c3LwL54AaABAg",
      "comment_type": "reply",
      "author": "@aesthaticbts9491",
      "likes": 1,
      "published_at": "2020-12-14T07:23:12Z",
      "timestamp_refs": [],
      "text": "@turbo_guyy dude I use bro not only for guys but also girls and we chill and u should too😌ok now go and study",
      "parent_context": "Sir, initially I used to hate chemistry but now I have started loving it, this is just because of you sir.... So thank you so much 😊"
    },
    {
      "comment_id": "UgyWebAIJ5_p-c3LwL54AaABAg.919a5BkAm0Q9HEobqsEXN9",
      "parent_id": "UgyWebAIJ5_p-c3LwL54AaABAg",
      "comment_type": "reply",
      "author": "@turbo_guyy",
      "likes": 0,
      "published_at": "2020-12-14T07:51:58Z",
      "timestamp_refs": [],
      "text": "@aesthaticbts9491 nope yrr You are senior and for your kind information, iam studying, ok I was kidding but you 🤷🤷🤦🤦🤦",
      "parent_context": "Sir, initially I used to hate chemistry but now I have started loving it, this is just because of you sir.... So thank you so much 😊"
    },
    {
      "comment_id": "UgyWebAIJ5_p-c3LwL54AaABAg.919a5BkAm0Q9ISLiFvOOP7",
      "parent_id": "UgyWebAIJ5_p-c3LwL54AaABAg",
      "comment_type": "reply",
      "author": "@AbhaySingh-nc2gq",
      "likes": 0,
      "published_at": "2021-01-13T10:31:27Z",
      "timestamp_refs": [],
      "text": "Jai Shree Ram",
      "parent_context": "Sir, initially I used to hate chemistry but now I have started loving it, this is just because of you sir.... So thank you so much 😊"
    },
    {
      "comment_id": "UgyWebAIJ5_p-c3LwL54AaABAg.919a5BkAm0Q9ISM3blYnFG",
      "parent_id": "UgyWebAIJ5_p-c3LwL54AaABAg",
      "comment_type": "reply",
      "author": "@turbo_guyy",
      "likes": 0,
      "published_at": "2021-01-13T10:34:30Z",
      "timestamp_refs": [],
      "text": "@aesthaticbts9491 bts ye sab log isme pagal kyu h🙄",
      "parent_context": "Sir, initially I used to hate chemistry but now I have started loving it, this is just because of you sir.... So thank you so much 😊"
    },
    {
      "comment_id": "UgyWebAIJ5_p-c3LwL54AaABAg.919a5BkAm0Q9J0mgyJfix5",
      "parent_id": "UgyWebAIJ5_p-c3LwL54AaABAg",
      "comment_type": "reply",
      "author": "@ankitakar5023",
      "likes": 0,
      "published_at": "2021-01-27T14:08:36Z",
      "timestamp_refs": [],
      "text": "Me too",
      "parent_context": "Sir, initially I used to hate chemistry but now I have started loving it, this is just because of you sir.... So thank you so much 😊"
    },
    {
      "comment_id": "UgyWebAIJ5_p-c3LwL54AaABAg.919a5BkAm0Q9JO2FWvzQyr",
      "parent_id": "UgyWebAIJ5_p-c3LwL54AaABAg",
      "comment_type": "reply",
      "author": "@darshan_lavu",
      "likes": 0,
      "published_at": "2021-02-05T14:55:48Z",
      "timestamp_refs": [],
      "text": "Me to",
      "parent_context": "Sir, initially I used to hate chemistry but now I have started loving it, this is just because of you sir.... So thank you so much 😊"
    },
    {
      "comment_id": "UgyWebAIJ5_p-c3LwL54AaABAg.919a5BkAm0Q9JRc3bYUOME",
      "parent_id": "UgyWebAIJ5_p-c3LwL54AaABAg",
      "comment_type": "reply",
      "author": "@chemistrymasti1842",
      "likes": 0,
      "published_at": "2021-02-07T00:15:13Z",
      "timestamp_refs": [],
      "text": "Me to",
      "parent_context": "Sir, initially I used to hate chemistry but now I have started loving it, this is just because of you sir.... So thank you so much 😊"
    },
    {
      "comment_id": "UgyWebAIJ5_p-c3LwL54AaABAg.919a5BkAm0Q9K9-Rn6sCw7",
      "parent_id": "UgyWebAIJ5_p-c3LwL54AaABAg",
      "comment_type": "reply",
      "author": "@AmanKumar-ek9ux",
      "likes": 2,
      "published_at": "2021-02-24T15:14:03Z",
      "timestamp_refs": [],
      "text": "Hello everyone! Please someone help me 😭 When I watch a video I get to understand everything . But i forget most of the important things in just a few days .",
      "parent_context": "Sir, initially I used to hate chemistry but now I have started loving it, this is just because of you sir.... So thank you so much 😊"
    },
    {
      "comment_id": "UgyWebAIJ5_p-c3LwL54AaABAg.919a5BkAm0Q9KBk1f574pq",
      "parent_id": "UgyWebAIJ5_p-c3LwL54AaABAg",
      "comment_type": "reply",
      "author": "@dilipkumardey4434",
      "likes": 0,
      "published_at": "2021-02-25T16:48:24Z",
      "timestamp_refs": [],
      "text": "Same",
      "parent_context": "Sir, initially I used to hate chemistry but now I have started loving it, this is just because of you sir.... So thank you so much 😊"
    },
    {
      "comment_id": "UgyWebAIJ5_p-c3LwL54AaABAg.919a5BkAm0Q9KO0nz2BlnM",
      "parent_id": "UgyWebAIJ5_p-c3LwL54AaABAg",
      "comment_type": "reply",
      "author": "@krishnamishra8106",
      "likes": 0,
      "published_at": "2021-03-02T11:14:34Z",
      "timestamp_refs": [],
      "text": "Pagal ldki",
      "parent_context": "Sir, initially I used to hate chemistry but now I have started loving it, this is just because of you sir.... So thank you so much 😊"
    },
    {
      "comment_id": "UgyWebAIJ5_p-c3LwL54AaABAg.919a5BkAm0Q9KOLUNPl3FZ",
      "parent_id": "UgyWebAIJ5_p-c3LwL54AaABAg",
      "comment_type": "reply",
      "author": "@AmanKumar-ek9ux",
      "likes": 1,
      "published_at": "2021-03-02T14:15:15Z",
      "timestamp_refs": [],
      "text": "@krishnamishra8106 haha 😂",
      "parent_context": "Sir, initially I used to hate chemistry but now I have started loving it, this is just because of you sir.... So thank you so much 😊"
    },
    {
      "comment_id": "UgyWebAIJ5_p-c3LwL54AaABAg.919a5BkAm0Q9KOLsU-M5Cg",
      "parent_id": "UgyWebAIJ5_p-c3LwL54AaABAg",
      "comment_type": "reply",
      "author": "@krishnamishra8106",
      "likes": 0,
      "published_at": "2021-03-02T14:18:41Z",
      "timestamp_refs": [],
      "text": "Are bhai",
      "parent_context": "Sir, initially I used to hate chemistry but now I have started loving it, this is just because of you sir.... So thank you so much 😊"
    },
    {
      "comment_id": "UgyWebAIJ5_p-c3LwL54AaABAg.919a5BkAm0Q9L1G-BTuHCM",
      "parent_id": "UgyWebAIJ5_p-c3LwL54AaABAg",
      "comment_type": "reply",
      "author": "@niksoni1014",
      "likes": 2,
      "published_at": "2021-03-18T11:36:10Z",
      "timestamp_refs": [],
      "text": "Same here.💯🌺",
      "parent_context": "Sir, initially I used to hate chemistry but now I have started loving it, this is just because of you sir.... So thank you so much 😊"
    },
    {
      "comment_id": "UgyWebAIJ5_p-c3LwL54AaABAg.919a5BkAm0Q9L1IRFg5LG3",
      "parent_id": "UgyWebAIJ5_p-c3LwL54AaABAg",
      "comment_type": "reply",
      "author": "@krishnamishra8106",
      "likes": 0,
      "published_at": "2021-03-18T11:57:28Z",
      "timestamp_refs": [],
      "text": "Pagl ldki",
      "parent_context": "Sir, initially I used to hate chemistry but now I have started loving it, this is just because of you sir.... So thank you so much 😊"
    },
    {
      "comment_id": "UgyWebAIJ5_p-c3LwL54AaABAg.919a5BkAm0Q9L1ITogz4IM",
      "parent_id": "UgyWebAIJ5_p-c3LwL54AaABAg",
      "comment_type": "reply",
      "author": "@niksoni1014",
      "likes": 1,
      "published_at": "2021-03-18T11:57:49Z",
      "timestamp_refs": [],
      "text": "Have you given jee.",
      "parent_context": "Sir, initially I used to hate chemistry but now I have started loving it, this is just because of you sir.... So thank you so much 😊"
    },
    {
      "comment_id": "UgyWebAIJ5_p-c3LwL54AaABAg.919a5BkAm0Q9M5AeTigLU2",
      "parent_id": "UgyWebAIJ5_p-c3LwL54AaABAg",
      "comment_type": "reply",
      "author": "@krapto3467",
      "likes": 1,
      "published_at": "2021-04-13T20:37:52Z",
      "timestamp_refs": [],
      "text": "Feels criminal to have only found this channel now, I'm in 12th 2021-22 now and I'm just speedrunning the 11th JEE chem part now.",
      "parent_context": "Sir, initially I used to hate chemistry but now I have started loving it, this is just because of you sir.... So thank you so much 😊"
    },
    {
      "comment_id": "UgyWebAIJ5_p-c3LwL54AaABAg.919a5BkAm0Q9QD0GZIiHrb",
      "parent_id": "UgyWebAIJ5_p-c3LwL54AaABAg",
      "comment_type": "reply",
      "author": "@nishkashrimali3012",
      "likes": 0,
      "published_at": "2021-07-25T07:46:35Z",
      "timestamp_refs": [],
      "text": "Same here 😭😭",
      "parent_context": "Sir, initially I used to hate chemistry but now I have started loving it, this is just because of you sir.... So thank you so much 😊"
    },
    {
      "comment_id": "UgyWebAIJ5_p-c3LwL54AaABAg.919a5BkAm0Q9yQTiTtLUaS",
      "parent_id": "UgyWebAIJ5_p-c3LwL54AaABAg",
      "comment_type": "reply",
      "author": "@KashifRahu-x3l",
      "likes": 0,
      "published_at": "2023-12-17T11:32:52Z",
      "timestamp_refs": [],
      "text": "Same 😊",
      "parent_context": "Sir, initially I used to hate chemistry but now I have started loving it, this is just because of you sir.... So thank you so much 😊"
    },
    {
      "comment_id": "UgyWebAIJ5_p-c3LwL54AaABAg.919a5BkAm0QA22fTmvqgid",
      "parent_id": "UgyWebAIJ5_p-c3LwL54AaABAg",
      "comment_type": "reply",
      "author": "@Homeraj_Diwekar",
      "likes": 0,
      "published_at": "2024-04-10T12:19:32Z",
      "timestamp_refs": [],
      "text": "में भी",
      "parent_context": "Sir, initially I used to hate chemistry but now I have started loving it, this is just because of you sir.... So thank you so much 😊"
    },
    {
      "comment_id": "UgxIbuu_ujgDGvYOBq14AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@HariSingh-hk4jf",
      "likes": 75,
      "published_at": "2021-08-04T12:29:21Z",
      "timestamp_refs": [],
      "text": "If the lecture is of one hour that means it is strictly one hour no minute is wasted in talking or promotion of channel every second contain so deep information...... Thankyou sir 😁😍😍😍😍",
      "parent_context": ""
    },
    {
      "comment_id": "UgxhCWdSClCkG6m6IY94AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@VanshSharma-bl1pc",
      "likes": 232,
      "published_at": "2018-09-05T05:07:29Z",
      "timestamp_refs": [],
      "text": "Thankyou sir. i am abig fan of your teaching skills",
      "parent_context": ""
    },
    {
      "comment_id": "UgxhCWdSClCkG6m6IY94AaABAg.8knlCwzDlmz9-gZp5wx52M",
      "parent_id": "UgxhCWdSClCkG6m6IY94AaABAg",
      "comment_type": "reply",
      "author": "@maheeadhikari9899",
      "likes": 2,
      "published_at": "2019-10-05T02:26:51Z",
      "timestamp_refs": [],
      "text": "@Ritik Ranjan Me... Also....✌️🙋",
      "parent_context": "Thankyou sir. i am abig fan of your teaching skills"
    },
    {
      "comment_id": "UgxhCWdSClCkG6m6IY94AaABAg.8knlCwzDlmz90Eat3ujXFI",
      "parent_id": "UgxhCWdSClCkG6m6IY94AaABAg",
      "comment_type": "reply",
      "author": "@anjumaurya3582",
      "likes": 1,
      "published_at": "2019-10-18T16:58:17Z",
      "timestamp_refs": [],
      "text": "Me also👌👌👌👌👍👍👍",
      "parent_context": "Thankyou sir. i am abig fan of your teaching skills"
    },
    {
      "comment_id": "UgxhCWdSClCkG6m6IY94AaABAg.8knlCwzDlmz914TwvR_yJv",
      "parent_id": "UgxhCWdSClCkG6m6IY94AaABAg",
      "comment_type": "reply",
      "author": "@hiddenrock87668",
      "likes": 1,
      "published_at": "2019-11-08T15:07:53Z",
      "timestamp_refs": [],
      "text": "I also 👆✊🙋",
      "parent_context": "Thankyou sir. i am abig fan of your teaching skills"
    },
    {
      "comment_id": "UgxhCWdSClCkG6m6IY94AaABAg.8knlCwzDlmz92yc-Eotfu9",
      "parent_id": "UgxhCWdSClCkG6m6IY94AaABAg",
      "comment_type": "reply",
      "author": "@divanshkr.6237",
      "likes": 5,
      "published_at": "2019-12-25T16:15:05Z",
      "timestamp_refs": [],
      "text": "teri profile picture dekhkar pta chal gya bhai i am also",
      "parent_context": "Thankyou sir. i am abig fan of your teaching skills"
    },
    {
      "comment_id": "UgxhCWdSClCkG6m6IY94AaABAg.8knlCwzDlmz95D0cT2Vh0d",
      "parent_id": "UgxhCWdSClCkG6m6IY94AaABAg",
      "comment_type": "reply",
      "author": "@aanchalsharma3014",
      "likes": 0,
      "published_at": "2020-02-19T08:50:26Z",
      "timestamp_refs": [],
      "text": "I am verry Verry big fan",
      "parent_context": "Thankyou sir. i am abig fan of your teaching skills"
    },
    {
      "comment_id": "Ugxw3x065g7HsVJLBWJ4AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@tharani0601",
      "likes": 418,
      "published_at": "2020-03-03T13:17:49Z",
      "timestamp_refs": [],
      "text": "Everything is amazing in this lecture..but we little kids literally miss the sounds that u do in Physics lectures..kuchukkkk....kuchukkk......turrrrrrrrrrr......😂",
      "parent_context": ""
    },
    {
      "comment_id": "Ugxw3x065g7HsVJLBWJ4AaABAg.95jyZDbYE689BQtuvRR4pp",
      "parent_id": "Ugxw3x065g7HsVJLBWJ4AaABAg",
      "comment_type": "reply",
      "author": "@indraniC.",
      "likes": 10,
      "published_at": "2020-07-22T21:20:47Z",
      "timestamp_refs": [],
      "text": "😂😂😂😂😂",
      "parent_context": "Everything is amazing in this lecture..but we little kids literally miss the sounds that u do in Physics lectures..kuchukkkk....kuchukkk......turrrrrrrrrrr......😂"
    },
    {
      "comment_id": "Ugxw3x065g7HsVJLBWJ4AaABAg.95jyZDbYE689CDPEG-IrHX",
      "parent_id": "Ugxw3x065g7HsVJLBWJ4AaABAg",
      "comment_type": "reply",
      "author": "@codehawkofficial",
      "likes": 2,
      "published_at": "2020-08-11T12:05:12Z",
      "timestamp_refs": [],
      "text": "@indraniC. oho tumi o er video dekho?!",
      "parent_context": "Everything is amazing in this lecture..but we little kids literally miss the sounds that u do in Physics lectures..kuchukkkk....kuchukkk......turrrrrrrrrrr......😂"
    },
    {
      "comment_id": "Ugxw3x065g7HsVJLBWJ4AaABAg.95jyZDbYE689CEzMl8TyFO",
      "parent_id": "Ugxw3x065g7HsVJLBWJ4AaABAg",
      "comment_type": "reply",
      "author": "@indraniC.",
      "likes": 2,
      "published_at": "2020-08-12T02:48:55Z",
      "timestamp_refs": [],
      "text": "@codehawkofficial ke tui ?",
      "parent_context": "Everything is amazing in this lecture..but we little kids literally miss the sounds that u do in Physics lectures..kuchukkkk....kuchukkk......turrrrrrrrrrr......😂"
    },
    {
      "comment_id": "Ugxw3x065g7HsVJLBWJ4AaABAg.95jyZDbYE689CoaHnmQ5-c",
      "parent_id": "Ugxw3x065g7HsVJLBWJ4AaABAg",
      "comment_type": "reply",
      "author": "@pooransinghattri105",
      "likes": 1,
      "published_at": "2020-08-26T08:01:41Z",
      "timestamp_refs": [],
      "text": "Ohhhh👍👍🤔🤣🤣🤣🤪",
      "parent_context": "Everything is amazing in this lecture..but we little kids literally miss the sounds that u do in Physics lectures..kuchukkkk....kuchukkk......turrrrrrrrrrr......😂"
    },
    {
      "comment_id": "Ugxw3x065g7HsVJLBWJ4AaABAg.95jyZDbYE689M1L0glfZ2K",
      "parent_id": "Ugxw3x065g7HsVJLBWJ4AaABAg",
      "comment_type": "reply",
      "author": "@JetPen",
      "likes": 2,
      "published_at": "2021-04-12T08:51:27Z",
      "timestamp_refs": [],
      "text": "@indraniC. Me too Chatterjee 😌",
      "parent_context": "Everything is amazing in this lecture..but we little kids literally miss the sounds that u do in Physics lectures..kuchukkkk....kuchukkk......turrrrrrrrrrr......😂"
    },
    {
      "comment_id": "Ugxw3x065g7HsVJLBWJ4AaABAg.95jyZDbYE689Q2N3oTZlyl",
      "parent_id": "Ugxw3x065g7HsVJLBWJ4AaABAg",
      "comment_type": "reply",
      "author": "@gameon4540",
      "likes": 1,
      "published_at": "2021-07-21T04:34:10Z",
      "timestamp_refs": [],
      "text": "@smile-me2ik 😂😂😂😂😂😂",
      "parent_context": "Everything is amazing in this lecture..but we little kids literally miss the sounds that u do in Physics lectures..kuchukkkk....kuchukkk......turrrrrrrrrrr......😂"
    },
    {
      "comment_id": "Ugxw3x065g7HsVJLBWJ4AaABAg.95jyZDbYE689Q3JeUjg8as",
      "parent_id": "Ugxw3x065g7HsVJLBWJ4AaABAg",
      "comment_type": "reply",
      "author": "@stranger4570",
      "likes": 1,
      "published_at": "2021-07-21T13:23:36Z",
      "timestamp_refs": [],
      "text": "absolutely 😂😂😂",
      "parent_context": "Everything is amazing in this lecture..but we little kids literally miss the sounds that u do in Physics lectures..kuchukkkk....kuchukkk......turrrrrrrrrrr......😂"
    },
    {
      "comment_id": "Ugxw3x065g7HsVJLBWJ4AaABAg.95jyZDbYE689QBAcdqaigL",
      "parent_id": "Ugxw3x065g7HsVJLBWJ4AaABAg",
      "comment_type": "reply",
      "author": "@notpossible108",
      "likes": 0,
      "published_at": "2021-07-24T14:38:38Z",
      "timestamp_refs": [],
      "text": "ajubhai94",
      "parent_context": "Everything is amazing in this lecture..but we little kids literally miss the sounds that u do in Physics lectures..kuchukkkk....kuchukkk......turrrrrrrrrrr......😂"
    },
    {
      "comment_id": "Ugxw3x065g7HsVJLBWJ4AaABAg.95jyZDbYE689QKWgHnw482",
      "parent_id": "Ugxw3x065g7HsVJLBWJ4AaABAg",
      "comment_type": "reply",
      "author": "@jagansingh3644",
      "likes": 1,
      "published_at": "2021-07-28T05:44:32Z",
      "timestamp_refs": [],
      "text": "Not little kids-chote nanne munne bacho hai",
      "parent_context": "Everything is amazing in this lecture..but we little kids literally miss the sounds that u do in Physics lectures..kuchukkkk....kuchukkk......turrrrrrrrrrr......😂"
    },
    {
      "comment_id": "Ugxw3x065g7HsVJLBWJ4AaABAg.95jyZDbYE689QVpmhCVSlH",
      "parent_id": "Ugxw3x065g7HsVJLBWJ4AaABAg",
      "comment_type": "reply",
      "author": "@jayatisadhu566",
      "likes": 6,
      "published_at": "2021-08-01T15:11:49Z",
      "timestamp_refs": [],
      "text": "No those sounds are ok for us but for viewing in front of parents becomes difficult.",
      "parent_context": "Everything is amazing in this lecture..but we little kids literally miss the sounds that u do in Physics lectures..kuchukkkk....kuchukkk......turrrrrrrrrrr......😂"
    },
    {
      "comment_id": "Ugxw3x065g7HsVJLBWJ4AaABAg.95jyZDbYE689T6WuB0wuhq",
      "parent_id": "Ugxw3x065g7HsVJLBWJ4AaABAg",
      "comment_type": "reply",
      "author": "@shri-2708",
      "likes": 0,
      "published_at": "2021-10-05T08:51:15Z",
      "timestamp_refs": [],
      "text": "@jagansingh3644 antar pantars",
      "parent_context": "Everything is amazing in this lecture..but we little kids literally miss the sounds that u do in Physics lectures..kuchukkkk....kuchukkk......turrrrrrrrrrr......😂"
    },
    {
      "comment_id": "Ugx2ywXEY_RTgMn-B0F4AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@Gangadevi1980T",
      "likes": 331,
      "published_at": "2019-08-08T15:11:25Z",
      "timestamp_refs": [],
      "text": "Sir , you are the king of physics and chemistry",
      "parent_context": ""
    },
    {
      "comment_id": "Ugx2ywXEY_RTgMn-B0F4AaABAg.8yNaDGsHavC9E6GTsIMKi1",
      "parent_id": "Ugx2ywXEY_RTgMn-B0F4AaABAg",
      "comment_type": "reply",
      "author": "@siddharthchauhan749",
      "likes": 10,
      "published_at": "2020-09-27T10:36:48Z",
      "timestamp_refs": [],
      "text": "@Aaradhya Joshi they teach just boards level they just want money",
      "parent_context": "Sir , you are the king of physics and chemistry"
    },
    {
      "comment_id": "Ugx2ywXEY_RTgMn-B0F4AaABAg.8yNaDGsHavC9EYfpdfCfuF",
      "parent_id": "Ugx2ywXEY_RTgMn-B0F4AaABAg",
      "comment_type": "reply",
      "author": "@pranavkanodia4269",
      "likes": 2,
      "published_at": "2020-10-08T11:25:50Z",
      "timestamp_refs": [],
      "text": "Paras thakur sir is great",
      "parent_context": "Sir , you are the king of physics and chemistry"
    },
    {
      "comment_id": "Ugx2ywXEY_RTgMn-B0F4AaABAg.8yNaDGsHavC9EYnEpwdm_6",
      "parent_id": "Ugx2ywXEY_RTgMn-B0F4AaABAg",
      "comment_type": "reply",
      "author": "@pranavkanodia4269",
      "likes": 1,
      "published_at": "2020-10-08T12:30:35Z",
      "timestamp_refs": [],
      "text": "@adityabagla5452 ok jiski Jaise thinking",
      "parent_context": "Sir , you are the king of physics and chemistry"
    },
    {
      "comment_id": "Ugx2ywXEY_RTgMn-B0F4AaABAg.8yNaDGsHavC9EbvjagzQ7R",
      "parent_id": "Ugx2ywXEY_RTgMn-B0F4AaABAg",
      "comment_type": "reply",
      "author": "@theromanre4530",
      "likes": 10,
      "published_at": "2020-10-10T03:01:47Z",
      "timestamp_refs": [],
      "text": "Guys everyone is great in their own ways..don't compare......but in my point of view Alakh sir will always be a legend....",
      "parent_context": "Sir , you are the king of physics and chemistry"
    },
    {
      "comment_id": "Ugx2ywXEY_RTgMn-B0F4AaABAg.8yNaDGsHavC9En_t4VvZ3A",
      "parent_id": "Ugx2ywXEY_RTgMn-B0F4AaABAg",
      "comment_type": "reply",
      "author": "@YashSingh-le8yi",
      "likes": 1,
      "published_at": "2020-10-14T15:41:43Z",
      "timestamp_refs": [],
      "text": "@adityabagla5452 bhai alakh sir ne Ortho, meta , para kis lec. Main pdhaya??",
      "parent_context": "Sir , you are the king of physics and chemistry"
    },
    {
      "comment_id": "Ugx2ywXEY_RTgMn-B0F4AaABAg.8yNaDGsHavC9FBz9YNjIN3",
      "parent_id": "Ugx2ywXEY_RTgMn-B0F4AaABAg",
      "comment_type": "reply",
      "author": "@mysticbj3378",
      "likes": 0,
      "published_at": "2020-10-24T12:23:34Z",
      "timestamp_refs": [],
      "text": "And i m gonna be king of pirates",
      "parent_context": "Sir , you are the king of physics and chemistry"
    },
    {
      "comment_id": "Ugx2ywXEY_RTgMn-B0F4AaABAg.8yNaDGsHavC9FEvMOMSFLl",
      "parent_id": "Ugx2ywXEY_RTgMn-B0F4AaABAg",
      "comment_type": "reply",
      "author": "@mysticbj3378",
      "likes": 1,
      "published_at": "2020-10-25T15:48:06Z",
      "timestamp_refs": [],
      "text": "@smile-me2ik queen of what🙄",
      "parent_context": "Sir , you are the king of physics and chemistry"
    },
    {
      "comment_id": "Ugx2ywXEY_RTgMn-B0F4AaABAg.8yNaDGsHavC9FEwiYJTRvJ",
      "parent_id": "Ugx2ywXEY_RTgMn-B0F4AaABAg",
      "comment_type": "reply",
      "author": "@smile-me2ik",
      "likes": 0,
      "published_at": "2020-10-25T16:00:00Z",
      "timestamp_refs": [],
      "text": "@mysticbj3378 i didnt referred to u so dont worry... U r in safe zone 😁🤣",
      "parent_context": "Sir , you are the king of physics and chemistry"
    },
    {
      "comment_id": "Ugx2ywXEY_RTgMn-B0F4AaABAg.8yNaDGsHavC9FExjArEf5-",
      "parent_id": "Ugx2ywXEY_RTgMn-B0F4AaABAg",
      "comment_type": "reply",
      "author": "@mysticbj3378",
      "likes": 0,
      "published_at": "2020-10-25T16:08:49Z",
      "timestamp_refs": [],
      "text": "@smile-me2ik my apology mam",
      "parent_context": "Sir , you are the king of physics and chemistry"
    },
    {
      "comment_id": "Ugx2ywXEY_RTgMn-B0F4AaABAg.8yNaDGsHavC9FiYhUS_4RA",
      "parent_id": "Ugx2ywXEY_RTgMn-B0F4AaABAg",
      "comment_type": "reply",
      "author": "@abdevilliers9430",
      "likes": 0,
      "published_at": "2020-11-06T13:17:51Z",
      "timestamp_refs": [],
      "text": "I am the king of cricket 😎😎",
      "parent_context": "Sir , you are the king of physics and chemistry"
    },
    {
      "comment_id": "Ugx2ywXEY_RTgMn-B0F4AaABAg.8yNaDGsHavC9FqBvJ4Kz77",
      "parent_id": "Ugx2ywXEY_RTgMn-B0F4AaABAg",
      "comment_type": "reply",
      "author": "@manjeetsingh-wo2wp",
      "likes": 0,
      "published_at": "2020-11-09T12:32:41Z",
      "timestamp_refs": [],
      "text": "Ya I am here to correct your statement in place of king there should be god and every teacher deserve respect so don't mess respect every opinion😊😊☺️",
      "parent_context": "Sir , you are the king of physics and chemistry"
    },
    {
      "comment_id": "Ugx2ywXEY_RTgMn-B0F4AaABAg.8yNaDGsHavC9FqCpKJhyvK",
      "parent_id": "Ugx2ywXEY_RTgMn-B0F4AaABAg",
      "comment_type": "reply",
      "author": "@manjeetsingh-wo2wp",
      "likes": 0,
      "published_at": "2020-11-09T12:40:37Z",
      "timestamp_refs": [],
      "text": "@YashSingh-le8yi sir have made a whole lecture on it",
      "parent_context": "Sir , you are the king of physics and chemistry"
    },
    {
      "comment_id": "Ugx2ywXEY_RTgMn-B0F4AaABAg.8yNaDGsHavC9FrdYpWjzJd",
      "parent_id": "Ugx2ywXEY_RTgMn-B0F4AaABAg",
      "comment_type": "reply",
      "author": "@YashSingh-le8yi",
      "likes": 0,
      "published_at": "2020-11-10T02:02:08Z",
      "timestamp_refs": [],
      "text": "@manjeetsingh-wo2wp chp. No? Or Lec. no.?",
      "parent_context": "Sir , you are the king of physics and chemistry"
    },
    {
      "comment_id": "Ugx2ywXEY_RTgMn-B0F4AaABAg.8yNaDGsHavC9Frp--yEckg",
      "parent_id": "Ugx2ywXEY_RTgMn-B0F4AaABAg",
      "comment_type": "reply",
      "author": "@manjeetsingh-wo2wp",
      "likes": 1,
      "published_at": "2020-11-10T03:42:06Z",
      "timestamp_refs": [],
      "text": "@YashSingh-le8yi https://youtu.be/DbLRZuwozuY this is link",
      "parent_context": "Sir , you are the king of physics and chemistry"
    },
    {
      "comment_id": "Ugx2ywXEY_RTgMn-B0F4AaABAg.8yNaDGsHavC9G5QMU2k0yp",
      "parent_id": "Ugx2ywXEY_RTgMn-B0F4AaABAg",
      "comment_type": "reply",
      "author": "@thrabitoffical",
      "likes": 1,
      "published_at": "2020-11-15T19:46:43Z",
      "timestamp_refs": [],
      "text": "Allakh sir is our friend",
      "parent_context": "Sir , you are the king of physics and chemistry"
    },
    {
      "comment_id": "Ugx2ywXEY_RTgMn-B0F4AaABAg.8yNaDGsHavC9G7_B997KM8",
      "parent_id": "Ugx2ywXEY_RTgMn-B0F4AaABAg",
      "comment_type": "reply",
      "author": "@ankitray6074",
      "likes": 1,
      "published_at": "2020-11-16T15:51:02Z",
      "timestamp_refs": [],
      "text": "He is not a king, he is a Leader",
      "parent_context": "Sir , you are the king of physics and chemistry"
    },
    {
      "comment_id": "Ugx2ywXEY_RTgMn-B0F4AaABAg.8yNaDGsHavC9GKV10IvFfQ",
      "parent_id": "Ugx2ywXEY_RTgMn-B0F4AaABAg",
      "comment_type": "reply",
      "author": "@namankothari4365",
      "likes": 0,
      "published_at": "2020-11-21T16:16:05Z",
      "timestamp_refs": [],
      "text": "@ajinkya6858 Mere channel ko check karlo aacha lage to subscribe and like nahi to dislike new channel need support",
      "parent_context": "Sir , you are the king of physics and chemistry"
    },
    {
      "comment_id": "Ugx2ywXEY_RTgMn-B0F4AaABAg.8yNaDGsHavC9GKV1ZFpoor",
      "parent_id": "Ugx2ywXEY_RTgMn-B0F4AaABAg",
      "comment_type": "reply",
      "author": "@namankothari4365",
      "likes": 0,
      "published_at": "2020-11-21T16:16:10Z",
      "timestamp_refs": [],
      "text": "@siddharthchauhan749 Mere channel ko check karlo aacha lage to subscribe and like nahi to dislike new channel need support",
      "parent_context": "Sir , you are the king of physics and chemistry"
    },
    {
      "comment_id": "Ugx2ywXEY_RTgMn-B0F4AaABAg.8yNaDGsHavC9GTp9XOQNoC",
      "parent_id": "Ugx2ywXEY_RTgMn-B0F4AaABAg",
      "comment_type": "reply",
      "author": "@basudebmondal5240",
      "likes": 0,
      "published_at": "2020-11-25T07:13:55Z",
      "timestamp_refs": [],
      "text": "King nahi god ka god😎😎",
      "parent_context": "Sir , you are the king of physics and chemistry"
    },
    {
      "comment_id": "Ugx2ywXEY_RTgMn-B0F4AaABAg.8yNaDGsHavC9GZcZPlqmp0",
      "parent_id": "Ugx2ywXEY_RTgMn-B0F4AaABAg",
      "comment_type": "reply",
      "author": "@proton04",
      "likes": 0,
      "published_at": "2020-11-27T13:19:18Z",
      "timestamp_refs": [],
      "text": "https://youtu.be/XFqjRE60AI4",
      "parent_context": "Sir , you are the king of physics and chemistry"
    },
    {
      "comment_id": "Ugx2ywXEY_RTgMn-B0F4AaABAg.8yNaDGsHavC9GilawKJdGg",
      "parent_id": "Ugx2ywXEY_RTgMn-B0F4AaABAg",
      "comment_type": "reply",
      "author": "@HimanshuSingh-gl9qd",
      "likes": 1,
      "published_at": "2020-12-01T11:50:41Z",
      "timestamp_refs": [],
      "text": "PLUS PE AAO VISHAL JOSHI SIR GOD OF IOC NEERAJ SIR GOD OF PHYSICS🙂",
      "parent_context": "Sir , you are the king of physics and chemistry"
    },
    {
      "comment_id": "Ugx2ywXEY_RTgMn-B0F4AaABAg.8yNaDGsHavC9GrtYjyew-_",
      "parent_id": "Ugx2ywXEY_RTgMn-B0F4AaABAg",
      "comment_type": "reply",
      "author": "@zingurssa17",
      "likes": 0,
      "published_at": "2020-12-05T00:53:19Z",
      "timestamp_refs": [],
      "text": "Now bio too 👍 he started teaching bio also 😁 👍",
      "parent_context": "Sir , you are the king of physics and chemistry"
    },
    {
      "comment_id": "Ugx2ywXEY_RTgMn-B0F4AaABAg.8yNaDGsHavC9Gs9mb4WMXJ",
      "parent_id": "Ugx2ywXEY_RTgMn-B0F4AaABAg",
      "comment_type": "reply",
      "author": "@musicalhits1082",
      "likes": 0,
      "published_at": "2020-12-05T03:23:54Z",
      "timestamp_refs": [],
      "text": "Zagda band kro. ...padh lo .... .",
      "parent_context": "Sir , you are the king of physics and chemistry"
    },
    {
      "comment_id": "Ugx2ywXEY_RTgMn-B0F4AaABAg.8yNaDGsHavC9Gs9qrIClcR",
      "parent_id": "Ugx2ywXEY_RTgMn-B0F4AaABAg",
      "comment_type": "reply",
      "author": "@musicalhits1082",
      "likes": 0,
      "published_at": "2020-12-05T03:24:29Z",
      "timestamp_refs": [],
      "text": "@YashSingh-le8yi ...organic ke lectures dekh aur ....",
      "parent_context": "Sir , you are the king of physics and chemistry"
    },
    {
      "comment_id": "Ugx2ywXEY_RTgMn-B0F4AaABAg.8yNaDGsHavC9GsAAv2WKbz",
      "parent_id": "Ugx2ywXEY_RTgMn-B0F4AaABAg",
      "comment_type": "reply",
      "author": "@musicalhits1082",
      "likes": 0,
      "published_at": "2020-12-05T03:27:21Z",
      "timestamp_refs": [],
      "text": "@HimanshuSingh-gl9qd koi god nhi hota yaar ....jinhone discover kiya vo god nhi hai m.... Jinko nobel milaa vo bhi god nhi unke subject....alakh sir is ultra legend ... ALL SUBJECTED ARE STRUCTURED BY GOD ,UNHONE HI LAWS BANAYE ...HUMNE EXP KIYE JO FIT BAITHE USKA EXPLAIN JISKA NHI USE EXCEPTION",
      "parent_context": "Sir , you are the king of physics and chemistry"
    },
    {
      "comment_id": "Ugx2ywXEY_RTgMn-B0F4AaABAg.8yNaDGsHavC9HINp5fIzz3",
      "parent_id": "Ugx2ywXEY_RTgMn-B0F4AaABAg",
      "comment_type": "reply",
      "author": "@abutalibahamad9876",
      "likes": 0,
      "published_at": "2020-12-15T17:06:04Z",
      "timestamp_refs": [],
      "text": "@pranavkanodia4269 By compairing the teachers u are hurting both teachers ..... Because everyone has its own of explanation.....",
      "parent_context": "Sir , you are the king of physics and chemistry"
    },
    {
      "comment_id": "Ugx2ywXEY_RTgMn-B0F4AaABAg.8yNaDGsHavC9HIOEdrggEy",
      "parent_id": "Ugx2ywXEY_RTgMn-B0F4AaABAg",
      "comment_type": "reply",
      "author": "@pranavkanodia4269",
      "likes": 0,
      "published_at": "2020-12-15T17:09:42Z",
      "timestamp_refs": [],
      "text": "@abutalibahamad9876 Maine kab Kiya compare",
      "parent_context": "Sir , you are the king of physics and chemistry"
    },
    {
      "comment_id": "Ugx2ywXEY_RTgMn-B0F4AaABAg.8yNaDGsHavC9I6zy2rjyAD",
      "parent_id": "Ugx2ywXEY_RTgMn-B0F4AaABAg",
      "comment_type": "reply",
      "author": "@snehakewat5213",
      "likes": 0,
      "published_at": "2021-01-05T03:28:35Z",
      "timestamp_refs": [],
      "text": "Bas bio ke queen ke need ha 😁😁😁😂😂",
      "parent_context": "Sir , you are the king of physics and chemistry"
    },
    {
      "comment_id": "Ugx2ywXEY_RTgMn-B0F4AaABAg.8yNaDGsHavC9IPI64ggV0K",
      "parent_id": "Ugx2ywXEY_RTgMn-B0F4AaABAg",
      "comment_type": "reply",
      "author": "@induraut4154",
      "likes": 0,
      "published_at": "2021-01-12T06:02:10Z",
      "timestamp_refs": [],
      "text": "No you are wrong",
      "parent_context": "Sir , you are the king of physics and chemistry"
    },
    {
      "comment_id": "Ugx2ywXEY_RTgMn-B0F4AaABAg.8yNaDGsHavC9IPI8oGR0jP",
      "parent_id": "Ugx2ywXEY_RTgMn-B0F4AaABAg",
      "comment_type": "reply",
      "author": "@induraut4154",
      "likes": 0,
      "published_at": "2021-01-12T06:02:33Z",
      "timestamp_refs": [],
      "text": "No you are wrong",
      "parent_context": "Sir , you are the king of physics and chemistry"
    },
    {
      "comment_id": "Ugxjt3lxzk646kFoH8V4AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@readwithsoham",
      "likes": 92,
      "published_at": "2022-10-06T16:33:49Z",
      "timestamp_refs": [],
      "text": "This is the last video completed all video in playlist All Concepts are crystal clear🔮. Notes✍✍ are ready Written In My Book. Those who Have done the same do like this comment👍 And Thanks a lot Alakh Sir For this Amazing Playlist and great Explanation🙏🙏",
      "parent_context": ""
    },
    {
      "comment_id": "Ugxjt3lxzk646kFoH8V4AaABAg.9gqlmJIid7k9q7QuPeEHcc",
      "parent_id": "Ugxjt3lxzk646kFoH8V4AaABAg",
      "comment_type": "reply",
      "author": "@0._prince_.7",
      "likes": 0,
      "published_at": "2023-05-25T05:51:33Z",
      "timestamp_refs": [],
      "text": "Kitna syllabus hua",
      "parent_context": "This is the last video completed all video in playlist All Concepts are crystal clear🔮. Notes✍✍ are ready Written In My Book. Those who Have done the same do like this comment👍 And Thanks a lot Alakh Sir For this Amazing Playlist and great Explanation🙏🙏"
    },
    {
      "comment_id": "UgyOucbFJJp0FkoboRh4AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@sM1LeY2409",
      "likes": 83,
      "published_at": "2019-08-28T14:17:31Z",
      "timestamp_refs": [],
      "text": "You are a hero of science stream students... 😍 You are our hope... ☺🙂",
      "parent_context": ""
    },
    {
      "comment_id": "UgyV97WZL7hgVMEb0fF4AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@zunairasuhaib8715",
      "likes": 291,
      "published_at": "2019-08-02T03:52:45Z",
      "timestamp_refs": [],
      "text": "My chemistry teacher had finished this chapter in 3 days and we couldn't understand a bit. By watching your video I have understood everything .Thank you.",
      "parent_context": ""
    },
    {
      "comment_id": "UgyV97WZL7hgVMEb0fF4AaABAg.8y6vmDOTbpO8yhKtwnb6S2",
      "parent_id": "UgyV97WZL7hgVMEb0fF4AaABAg",
      "comment_type": "reply",
      "author": "@sohitsingh9048",
      "likes": 20,
      "published_at": "2019-08-16T16:32:53Z",
      "timestamp_refs": [],
      "text": "School ke chutiye teachers Aisa hi krte hai",
      "parent_context": "My chemistry teacher had finished this chapter in 3 days and we couldn't understand a bit. By watching your video I have understood everything .Thank you."
    },
    {
      "comment_id": "UgyV97WZL7hgVMEb0fF4AaABAg.8y6vmDOTbpO8ymLLRInaKT",
      "parent_id": "UgyV97WZL7hgVMEb0fF4AaABAg",
      "comment_type": "reply",
      "author": "@zunairasuhaib8715",
      "likes": 26,
      "published_at": "2019-08-18T15:12:59Z",
      "timestamp_refs": [],
      "text": "@sohitsingh9048 teachers chahe jaise ho hame unki respect karni chahiye. Isliye nhi ki vo achhe hai balki hum achhe hai ok.",
      "parent_context": "My chemistry teacher had finished this chapter in 3 days and we couldn't understand a bit. By watching your video I have understood everything .Thank you."
    },
    {
      "comment_id": "UgyV97WZL7hgVMEb0fF4AaABAg.8y6vmDOTbpO8zL_zacGMrl",
      "parent_id": "UgyV97WZL7hgVMEb0fF4AaABAg",
      "comment_type": "reply",
      "author": "@GamesClashers",
      "likes": 27,
      "published_at": "2019-09-01T17:02:20Z",
      "timestamp_refs": [],
      "text": "@zunairasuhaib8715 agr kuch teachers chutiye hai toh woh chutiye hai isme koi shk ki baat nhi",
      "parent_context": "My chemistry teacher had finished this chapter in 3 days and we couldn't understand a bit. By watching your video I have understood everything .Thank you."
    },
    {
      "comment_id": "UgyV97WZL7hgVMEb0fF4AaABAg.8y6vmDOTbpO8zQWFTg-xcB",
      "parent_id": "UgyV97WZL7hgVMEb0fF4AaABAg",
      "comment_type": "reply",
      "author": "@Udit_here",
      "likes": 2,
      "published_at": "2019-09-03T14:57:09Z",
      "timestamp_refs": [],
      "text": "Same here bro",
      "parent_context": "My chemistry teacher had finished this chapter in 3 days and we couldn't understand a bit. By watching your video I have understood everything .Thank you."
    },
    {
      "comment_id": "UgyV97WZL7hgVMEb0fF4AaABAg.8y6vmDOTbpO8zT2jdrkn_T",
      "parent_id": "UgyV97WZL7hgVMEb0fF4AaABAg",
      "comment_type": "reply",
      "author": "@amrik9614",
      "likes": 5,
      "published_at": "2019-09-04T14:36:59Z",
      "timestamp_refs": [],
      "text": "@GamesClashers sahi baat",
      "parent_context": "My chemistry teacher had finished this chapter in 3 days and we couldn't understand a bit. By watching your video I have understood everything .Thank you."
    },
    {
      "comment_id": "UgyV97WZL7hgVMEb0fF4AaABAg.8y6vmDOTbpO8zY46By1j0o",
      "parent_id": "UgyV97WZL7hgVMEb0fF4AaABAg",
      "comment_type": "reply",
      "author": "@vivekkar5994",
      "likes": 2,
      "published_at": "2019-09-06T13:25:08Z",
      "timestamp_refs": [],
      "text": "Same here",
      "parent_context": "My chemistry teacher had finished this chapter in 3 days and we couldn't understand a bit. By watching your video I have understood everything .Thank you."
    },
    {
      "comment_id": "UgyV97WZL7hgVMEb0fF4AaABAg.8y6vmDOTbpO8ztz_o1p4Q2",
      "parent_id": "UgyV97WZL7hgVMEb0fF4AaABAg",
      "comment_type": "reply",
      "author": "@subhadiproy7043",
      "likes": 0,
      "published_at": "2019-09-15T10:59:25Z",
      "timestamp_refs": [],
      "text": "@zunairasuhaib8715 ,yes",
      "parent_context": "My chemistry teacher had finished this chapter in 3 days and we couldn't understand a bit. By watching your video I have understood everything .Thank you."
    },
    {
      "comment_id": "UgyV97WZL7hgVMEb0fF4AaABAg.8y6vmDOTbpO9-15OofXRB-",
      "parent_id": "UgyV97WZL7hgVMEb0fF4AaABAg",
      "comment_type": "reply",
      "author": "@abdullah-fn7fs",
      "likes": 1,
      "published_at": "2019-09-18T14:32:52Z",
      "timestamp_refs": [],
      "text": "Same hear",
      "parent_context": "My chemistry teacher had finished this chapter in 3 days and we couldn't understand a bit. By watching your video I have understood everything .Thank you."
    },
    {
      "comment_id": "UgyV97WZL7hgVMEb0fF4AaABAg.8y6vmDOTbpO9-GYE4Sreic",
      "parent_id": "UgyV97WZL7hgVMEb0fF4AaABAg",
      "comment_type": "reply",
      "author": "@arijitmohan3976",
      "likes": 5,
      "published_at": "2019-09-24T14:33:25Z",
      "timestamp_refs": [],
      "text": "itna bekaar to mera teacher bhi nhi bro",
      "parent_context": "My chemistry teacher had finished this chapter in 3 days and we couldn't understand a bit. By watching your video I have understood everything .Thank you."
    },
    {
      "comment_id": "UgyV97WZL7hgVMEb0fF4AaABAg.8y6vmDOTbpO90Y7bADlCDp",
      "parent_id": "UgyV97WZL7hgVMEb0fF4AaABAg",
      "comment_type": "reply",
      "author": "@anuradhadeka8446",
      "likes": 2,
      "published_at": "2019-10-26T06:58:30Z",
      "timestamp_refs": [],
      "text": "@Ravindra jat same😂😂",
      "parent_context": "My chemistry teacher had finished this chapter in 3 days and we couldn't understand a bit. By watching your video I have understood everything .Thank you."
    },
    {
      "comment_id": "UgyV97WZL7hgVMEb0fF4AaABAg.8y6vmDOTbpO90cIPJpvsZB",
      "parent_id": "UgyV97WZL7hgVMEb0fF4AaABAg",
      "comment_type": "reply",
      "author": "@ananyanayak167",
      "likes": 0,
      "published_at": "2019-10-28T07:09:04Z",
      "timestamp_refs": [],
      "text": "Same here bro",
      "parent_context": "My chemistry teacher had finished this chapter in 3 days and we couldn't understand a bit. By watching your video I have understood everything .Thank you."
    },
    {
      "comment_id": "UgyV97WZL7hgVMEb0fF4AaABAg.8y6vmDOTbpO92bZkrk5sAp",
      "parent_id": "UgyV97WZL7hgVMEb0fF4AaABAg",
      "comment_type": "reply",
      "author": "@bund6899",
      "likes": 5,
      "published_at": "2019-12-16T17:24:15Z",
      "timestamp_refs": [],
      "text": "Mere teacher ne to 2 din me khatam kiya chapter bhosdika",
      "parent_context": "My chemistry teacher had finished this chapter in 3 days and we couldn't understand a bit. By watching your video I have understood everything .Thank you."
    },
    {
      "comment_id": "UgyV97WZL7hgVMEb0fF4AaABAg.8y6vmDOTbpO94LJ6SWEBer",
      "parent_id": "UgyV97WZL7hgVMEb0fF4AaABAg",
      "comment_type": "reply",
      "author": "@rashidrazakhan9153",
      "likes": 2,
      "published_at": "2020-01-28T17:34:29Z",
      "timestamp_refs": [],
      "text": "@GamesClashers sawal ye hai chutiyo ko chutiyo kyu na bola jayen😜",
      "parent_context": "My chemistry teacher had finished this chapter in 3 days and we couldn't understand a bit. By watching your video I have understood everything .Thank you."
    },
    {
      "comment_id": "UgyV97WZL7hgVMEb0fF4AaABAg.8y6vmDOTbpO9BSB_76_AFW",
      "parent_id": "UgyV97WZL7hgVMEb0fF4AaABAg",
      "comment_type": "reply",
      "author": "@almost.a.reader",
      "likes": 1,
      "published_at": "2020-07-23T09:23:04Z",
      "timestamp_refs": [],
      "text": "@GamesClashers teachers ko aisa mt bolo bhai....vo respectable hote hai",
      "parent_context": "My chemistry teacher had finished this chapter in 3 days and we couldn't understand a bit. By watching your video I have understood everything .Thank you."
    },
    {
      "comment_id": "UgyV97WZL7hgVMEb0fF4AaABAg.8y6vmDOTbpO9BSBeytW2t9",
      "parent_id": "UgyV97WZL7hgVMEb0fF4AaABAg",
      "comment_type": "reply",
      "author": "@almost.a.reader",
      "likes": 3,
      "published_at": "2020-07-23T09:23:52Z",
      "timestamp_refs": [],
      "text": "Hame mahina ho gaya pr khatam nai hua kyunki ye bahut elaborated ch hai or hmare teacher bhi bahut acche hai",
      "parent_context": "My chemistry teacher had finished this chapter in 3 days and we couldn't understand a bit. By watching your video I have understood everything .Thank you."
    },
    {
      "comment_id": "UgyV97WZL7hgVMEb0fF4AaABAg.8y6vmDOTbpO9C2RI3s84Z1",
      "parent_id": "UgyV97WZL7hgVMEb0fF4AaABAg",
      "comment_type": "reply",
      "author": "@AhmadKhan-ok4oh",
      "likes": 3,
      "published_at": "2020-08-07T05:51:33Z",
      "timestamp_refs": [],
      "text": "@zunairasuhaib8715 thats the point thats the basic difference between MUSLIM AND NON MUSLIM community .Keep it up behna. muslims are always a source of pride for themselves.WE GIVE DUE RESPECT TO OUR TEACHERS WHETHER HE OR SHE IS MUSLIM OR NON MUSLIM.THATS THE REASON WE RULED OVER THREE SUB CONTINENTS",
      "parent_context": "My chemistry teacher had finished this chapter in 3 days and we couldn't understand a bit. By watching your video I have understood everything .Thank you."
    },
    {
      "comment_id": "UgyV97WZL7hgVMEb0fF4AaABAg.8y6vmDOTbpO9CPv236g2w2",
      "parent_id": "UgyV97WZL7hgVMEb0fF4AaABAg",
      "comment_type": "reply",
      "author": "@vparasharpawan9020",
      "likes": 5,
      "published_at": "2020-08-16T08:42:47Z",
      "timestamp_refs": [],
      "text": "@AhmadKhan-ok4oh wtf dude lmao 😂🤣🤦‍♂️",
      "parent_context": "My chemistry teacher had finished this chapter in 3 days and we couldn't understand a bit. By watching your video I have understood everything .Thank you."
    },
    {
      "comment_id": "UgyV97WZL7hgVMEb0fF4AaABAg.8y6vmDOTbpO9CPv4UWGTo2",
      "parent_id": "UgyV97WZL7hgVMEb0fF4AaABAg",
      "comment_type": "reply",
      "author": "@vparasharpawan9020",
      "likes": 7,
      "published_at": "2020-08-16T08:43:07Z",
      "timestamp_refs": [],
      "text": "@AhmadKhan-ok4oh Yahan bhi religion ghusa diya?",
      "parent_context": "My chemistry teacher had finished this chapter in 3 days and we couldn't understand a bit. By watching your video I have understood everything .Thank you."
    },
    {
      "comment_id": "UgyV97WZL7hgVMEb0fF4AaABAg.8y6vmDOTbpO9D0XoYi2QY1",
      "parent_id": "UgyV97WZL7hgVMEb0fF4AaABAg",
      "comment_type": "reply",
      "author": "@by7212",
      "likes": 0,
      "published_at": "2020-08-31T08:41:28Z",
      "timestamp_refs": [],
      "text": "Mere coaching main toh 1 mahine main bhadiya se samjhaya",
      "parent_context": "My chemistry teacher had finished this chapter in 3 days and we couldn't understand a bit. By watching your video I have understood everything .Thank you."
    },
    {
      "comment_id": "UgyV97WZL7hgVMEb0fF4AaABAg.8y6vmDOTbpO9DGdXa0I5co",
      "parent_id": "UgyV97WZL7hgVMEb0fF4AaABAg",
      "comment_type": "reply",
      "author": "@vpsjulani5134",
      "likes": 0,
      "published_at": "2020-09-06T14:48:02Z",
      "timestamp_refs": [],
      "text": "@zunairasuhaib8715 yes right bro.... 👍👍👍",
      "parent_context": "My chemistry teacher had finished this chapter in 3 days and we couldn't understand a bit. By watching your video I have understood everything .Thank you."
    },
    {
      "comment_id": "UgyV97WZL7hgVMEb0fF4AaABAg.8y6vmDOTbpO9Dwyq7mY73q",
      "parent_id": "UgyV97WZL7hgVMEb0fF4AaABAg",
      "comment_type": "reply",
      "author": "@rajugarain663",
      "likes": 0,
      "published_at": "2020-09-23T10:41:33Z",
      "timestamp_refs": [],
      "text": "@bund6899 😁",
      "parent_context": "My chemistry teacher had finished this chapter in 3 days and we couldn't understand a bit. By watching your video I have understood everything .Thank you."
    },
    {
      "comment_id": "UgyV97WZL7hgVMEb0fF4AaABAg.8y6vmDOTbpO9En0kSyROUF",
      "parent_id": "UgyV97WZL7hgVMEb0fF4AaABAg",
      "comment_type": "reply",
      "author": "@ssubhashini6121",
      "likes": 1,
      "published_at": "2020-10-14T10:25:58Z",
      "timestamp_refs": [],
      "text": "@GamesClashers Exactly! You are absolutely right. These people don't have the guts to say a wrong thing as wrong and gyaan baathe firthe hain. Pehle toh galat ko galat kehne ki Himmat Karo. Badme respect ki baat karna. Jo teachers kuch Padhate nhi Hai kya unhe galat kehna galat Hai guys?",
      "parent_context": "My chemistry teacher had finished this chapter in 3 days and we couldn't understand a bit. By watching your video I have understood everything .Thank you."
    },
    {
      "comment_id": "UgyV97WZL7hgVMEb0fF4AaABAg.8y6vmDOTbpO9En0sEp-NWk",
      "parent_id": "UgyV97WZL7hgVMEb0fF4AaABAg",
      "comment_type": "reply",
      "author": "@ssubhashini6121",
      "likes": 1,
      "published_at": "2020-10-14T10:27:02Z",
      "timestamp_refs": [],
      "text": "@vparasharpawan9020 wahi toh. Ye log nhi sudhrenge.",
      "parent_context": "My chemistry teacher had finished this chapter in 3 days and we couldn't understand a bit. By watching your video I have understood everything .Thank you."
    },
    {
      "comment_id": "UgyV97WZL7hgVMEb0fF4AaABAg.8y6vmDOTbpO9HHnlpZ36j0",
      "parent_id": "UgyV97WZL7hgVMEb0fF4AaABAg",
      "comment_type": "reply",
      "author": "@smithasmithasaji8848",
      "likes": 0,
      "published_at": "2020-12-15T11:42:19Z",
      "timestamp_refs": [],
      "text": "Same here 😨😨😨",
      "parent_context": "My chemistry teacher had finished this chapter in 3 days and we couldn't understand a bit. By watching your video I have understood everything .Thank you."
    },
    {
      "comment_id": "UgxtDAkTzlLe7ZakyZp4AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@delta_anushk",
      "likes": 190,
      "published_at": "2019-07-14T14:59:20Z",
      "timestamp_refs": [],
      "text": "Finally i complete my chemical bonding because of one great teacher i.e The graet Alakh Pandey sir thankyouuuuu so much",
      "parent_context": ""
    },
    {
      "comment_id": "UgxtDAkTzlLe7ZakyZp4AaABAg.8xNBxrBG-J_8xoG2cGuBn8",
      "parent_id": "UgxtDAkTzlLe7ZakyZp4AaABAg",
      "comment_type": "reply",
      "author": "@shubhamraj5820",
      "likes": 2,
      "published_at": "2019-07-25T12:33:48Z",
      "timestamp_refs": [],
      "text": "me too",
      "parent_context": "Finally i complete my chemical bonding because of one great teacher i.e The graet Alakh Pandey sir thankyouuuuu so much"
    },
    {
      "comment_id": "UgxtDAkTzlLe7ZakyZp4AaABAg.8xNBxrBG-J_9-5r-mRLi9F",
      "parent_id": "UgxtDAkTzlLe7ZakyZp4AaABAg",
      "comment_type": "reply",
      "author": "@kaanuveneekannada",
      "likes": 0,
      "published_at": "2019-09-20T10:54:35Z",
      "timestamp_refs": [],
      "text": "Is it enough or any concepts remaining still for neet??",
      "parent_context": "Finally i complete my chemical bonding because of one great teacher i.e The graet Alakh Pandey sir thankyouuuuu so much"
    },
    {
      "comment_id": "UgxtDAkTzlLe7ZakyZp4AaABAg.8xNBxrBG-J_9-AKv34_Xik",
      "parent_id": "UgxtDAkTzlLe7ZakyZp4AaABAg",
      "comment_type": "reply",
      "author": "@sameerahmed4166",
      "likes": 1,
      "published_at": "2019-09-22T04:41:39Z",
      "timestamp_refs": [],
      "text": "@kaanuveneekannada back bonding is still remaining...",
      "parent_context": "Finally i complete my chemical bonding because of one great teacher i.e The graet Alakh Pandey sir thankyouuuuu so much"
    },
    {
      "comment_id": "UgxtDAkTzlLe7ZakyZp4AaABAg.8xNBxrBG-J_9355yEEPjBk",
      "parent_id": "UgxtDAkTzlLe7ZakyZp4AaABAg",
      "comment_type": "reply",
      "author": "@neeruarora5435",
      "likes": 1,
      "published_at": "2019-12-28T14:00:23Z",
      "timestamp_refs": [],
      "text": "I complete this ch in one day and i am happy and i am getting clear with each and every concept of this ch. And i really enjoy each and every vedio of this ch..",
      "parent_context": "Finally i complete my chemical bonding because of one great teacher i.e The graet Alakh Pandey sir thankyouuuuu so much"
    },
    {
      "comment_id": "UgxtDAkTzlLe7ZakyZp4AaABAg.8xNBxrBG-J_989joBeRwI4",
      "parent_id": "UgxtDAkTzlLe7ZakyZp4AaABAg",
      "comment_type": "reply",
      "author": "@shivark1510",
      "likes": 1,
      "published_at": "2020-05-02T15:51:12Z",
      "timestamp_refs": [],
      "text": "@sameerahmed4166 watch organic, you'll get there",
      "parent_context": "Finally i complete my chemical bonding because of one great teacher i.e The graet Alakh Pandey sir thankyouuuuu so much"
    },
    {
      "comment_id": "UgxtDAkTzlLe7ZakyZp4AaABAg.8xNBxrBG-J_98wGUO_XnwM",
      "parent_id": "UgxtDAkTzlLe7ZakyZp4AaABAg",
      "comment_type": "reply",
      "author": "@manishayadav7194",
      "likes": 1,
      "published_at": "2020-05-21T21:28:15Z",
      "timestamp_refs": [],
      "text": "Is it the last video of this series @roy?",
      "parent_context": "Finally i complete my chemical bonding because of one great teacher i.e The graet Alakh Pandey sir thankyouuuuu so much"
    },
    {
      "comment_id": "UgxtDAkTzlLe7ZakyZp4AaABAg.8xNBxrBG-J_9Crb5PJu57q",
      "parent_id": "UgxtDAkTzlLe7ZakyZp4AaABAg",
      "comment_type": "reply",
      "author": "@anjaligupta8343",
      "likes": 0,
      "published_at": "2020-08-27T12:06:27Z",
      "timestamp_refs": [],
      "text": "@kaanuveneekannada yes",
      "parent_context": "Finally i complete my chemical bonding because of one great teacher i.e The graet Alakh Pandey sir thankyouuuuu so much"
    },
    {
      "comment_id": "UgxtDAkTzlLe7ZakyZp4AaABAg.8xNBxrBG-J_9D406dLJzcb",
      "parent_id": "UgxtDAkTzlLe7ZakyZp4AaABAg",
      "comment_type": "reply",
      "author": "@biology-physicsbylalitprin1147",
      "likes": 0,
      "published_at": "2020-09-01T17:03:56Z",
      "timestamp_refs": [],
      "text": "@sameerahmed4166 I don't think back bonding is in this chapter. It will come in organic",
      "parent_context": "Finally i complete my chemical bonding because of one great teacher i.e The graet Alakh Pandey sir thankyouuuuu so much"
    },
    {
      "comment_id": "UgxtDAkTzlLe7ZakyZp4AaABAg.8xNBxrBG-J_9D408qiFiOx",
      "parent_id": "UgxtDAkTzlLe7ZakyZp4AaABAg",
      "comment_type": "reply",
      "author": "@biology-physicsbylalitprin1147",
      "likes": 0,
      "published_at": "2020-09-01T17:04:14Z",
      "timestamp_refs": [],
      "text": "@kaanuveneekannada yes. But u should then read it from NCERT also",
      "parent_context": "Finally i complete my chemical bonding because of one great teacher i.e The graet Alakh Pandey sir thankyouuuuu so much"
    },
    {
      "comment_id": "UgwFPOFifuZOk75iIDR4AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@marcygam9314",
      "likes": 10,
      "published_at": "2022-12-14T12:49:45Z",
      "timestamp_refs": [],
      "text": "Oh God I have watched the whole 16 video 🥵 .",
      "parent_context": ""
    },
    {
      "comment_id": "UgydcuqAuG_9mgoluBd4AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@History-Geopolitics47",
      "likes": 195,
      "published_at": "2019-09-02T12:04:08Z",
      "timestamp_refs": [],
      "text": "The chptr is finally over now☺️😄😉🤘",
      "parent_context": ""
    },
    {
      "comment_id": "UgydcuqAuG_9mgoluBd4AaABAg.8zNceNWRhvc9AlQhJNZjhG",
      "parent_id": "UgydcuqAuG_9mgoluBd4AaABAg",
      "comment_type": "reply",
      "author": "@RavishKumar-vz1tq",
      "likes": 11,
      "published_at": "2020-07-06T09:28:41Z",
      "timestamp_refs": [],
      "text": "bete abhi to kahani shuru huyi hai",
      "parent_context": "The chptr is finally over now☺️😄😉🤘"
    },
    {
      "comment_id": "UgydcuqAuG_9mgoluBd4AaABAg.8zNceNWRhvc9C86zRW1qGZ",
      "parent_id": "UgydcuqAuG_9mgoluBd4AaABAg",
      "comment_type": "reply",
      "author": "@kshitizbaranwal2305",
      "likes": 0,
      "published_at": "2020-08-09T10:49:33Z",
      "timestamp_refs": [],
      "text": "@RavishKumar-vz1tq 🤣🔥",
      "parent_context": "The chptr is finally over now☺️😄😉🤘"
    },
    {
      "comment_id": "UgydcuqAuG_9mgoluBd4AaABAg.8zNceNWRhvc9CA_LbKxYUe",
      "parent_id": "UgydcuqAuG_9mgoluBd4AaABAg",
      "comment_type": "reply",
      "author": "@RavishKumar-vz1tq",
      "likes": 0,
      "published_at": "2020-08-10T09:44:36Z",
      "timestamp_refs": [],
      "text": "@kshitizbaranwal2305 thanks bhai 😆😆🥰",
      "parent_context": "The chptr is finally over now☺️😄😉🤘"
    },
    {
      "comment_id": "UgydcuqAuG_9mgoluBd4AaABAg.8zNceNWRhvc9EapcAB-xY3",
      "parent_id": "UgydcuqAuG_9mgoluBd4AaABAg",
      "comment_type": "reply",
      "author": "@shriyashpatil7247",
      "likes": 4,
      "published_at": "2020-10-09T16:49:06Z",
      "timestamp_refs": [],
      "text": "@RavishKumar-vz1tq Bhai ye Chapter khatam nhi ho raha Ye moti ki stability order revise karni padegi 🤣😂",
      "parent_context": "The chptr is finally over now☺️😄😉🤘"
    },
    {
      "comment_id": "UgydcuqAuG_9mgoluBd4AaABAg.8zNceNWRhvc9F3WC7gkrkT",
      "parent_id": "UgydcuqAuG_9mgoluBd4AaABAg",
      "comment_type": "reply",
      "author": "@MasterMind-b3f",
      "likes": 1,
      "published_at": "2020-10-21T05:27:51Z",
      "timestamp_refs": [],
      "text": "@shriyashpatil7247 hmm btw listen backbonding kya hai? J.D lee ma hai!!?",
      "parent_context": "The chptr is finally over now☺️😄😉🤘"
    },
    {
      "comment_id": "UgydcuqAuG_9mgoluBd4AaABAg.8zNceNWRhvc9FEvt05YKth",
      "parent_id": "UgydcuqAuG_9mgoluBd4AaABAg",
      "comment_type": "reply",
      "author": "@smile-me2ik",
      "likes": 5,
      "published_at": "2020-10-25T15:52:41Z",
      "timestamp_refs": [],
      "text": "Chatpr chadr odhkar so jao🤣🤣",
      "parent_context": "The chptr is finally over now☺️😄😉🤘"
    },
    {
      "comment_id": "UgydcuqAuG_9mgoluBd4AaABAg.8zNceNWRhvc9H0D-o3AwZr",
      "parent_id": "UgydcuqAuG_9mgoluBd4AaABAg",
      "comment_type": "reply",
      "author": "@DoubtsolverSC",
      "likes": 4,
      "published_at": "2020-12-08T15:45:13Z",
      "timestamp_refs": [],
      "text": "Khatarnak chapter hai ye!!",
      "parent_context": "The chptr is finally over now☺️😄😉🤘"
    },
    {
      "comment_id": "UgydcuqAuG_9mgoluBd4AaABAg.8zNceNWRhvc9Hs_lz51kBe",
      "parent_id": "UgydcuqAuG_9mgoluBd4AaABAg",
      "comment_type": "reply",
      "author": "@dona7491",
      "likes": 3,
      "published_at": "2020-12-30T03:51:08Z",
      "timestamp_refs": [],
      "text": "@RavishKumar-vz1tq aise type ke bacche he average baccho(Like me) ko heart attack dete he...😭😭😭",
      "parent_context": "The chptr is finally over now☺️😄😉🤘"
    },
    {
      "comment_id": "UgydcuqAuG_9mgoluBd4AaABAg.8zNceNWRhvc9ICsBTUhlI3",
      "parent_id": "UgydcuqAuG_9mgoluBd4AaABAg",
      "comment_type": "reply",
      "author": "@Aakash_2002",
      "likes": 1,
      "published_at": "2021-01-07T10:16:05Z",
      "timestamp_refs": [],
      "text": "@smile-me2ik 😁😁😁😁😂",
      "parent_context": "The chptr is finally over now☺️😄😉🤘"
    },
    {
      "comment_id": "UgzwscEymjfPVdoNzTB4AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@ravishsinghrajput9562",
      "likes": 125,
      "published_at": "2019-11-20T15:03:56Z",
      "timestamp_refs": [],
      "text": "Waoo Finally I watched ur all video of chemical Bonding Nd now I can say I know \"chemical bonding\" with better concept",
      "parent_context": ""
    },
    {
      "comment_id": "UgzwscEymjfPVdoNzTB4AaABAg.91ZN1Op0QRb9GF4DRd_Fri",
      "parent_id": "UgzwscEymjfPVdoNzTB4AaABAg",
      "comment_type": "reply",
      "author": "@preetisakshimahbubani5933",
      "likes": 2,
      "published_at": "2020-11-19T13:45:39Z",
      "timestamp_refs": [],
      "text": "Trueeee",
      "parent_context": "Waoo Finally I watched ur all video of chemical Bonding Nd now I can say I know \"chemical bonding\" with better concept"
    },
    {
      "comment_id": "UgzwscEymjfPVdoNzTB4AaABAg.91ZN1Op0QRb9GF4Ee255YV",
      "parent_id": "UgzwscEymjfPVdoNzTB4AaABAg",
      "comment_type": "reply",
      "author": "@preetisakshimahbubani5933",
      "likes": 2,
      "published_at": "2020-11-19T13:45:49Z",
      "timestamp_refs": [],
      "text": "I am now only seeing these videos :(",
      "parent_context": "Waoo Finally I watched ur all video of chemical Bonding Nd now I can say I know \"chemical bonding\" with better concept"
    },
    {
      "comment_id": "Ugy22rUpNFLu-ooUDlh4AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@arijitkumardas2613",
      "likes": 173,
      "published_at": "2020-07-16T16:16:47Z",
      "timestamp_refs": [],
      "text": "Chemistry is not a easy subject to teach. It requires sympathy as well as empathy. You are of the few teachers who can successfully teach it to students.",
      "parent_context": ""
    },
    {
      "comment_id": "Ugy22rUpNFLu-ooUDlh4AaABAg.9BAuM5088MF9QvwGWS9olZ",
      "parent_id": "Ugy22rUpNFLu-ooUDlh4AaABAg",
      "comment_type": "reply",
      "author": "@butterchicken7888",
      "likes": 13,
      "published_at": "2021-08-12T03:47:57Z",
      "timestamp_refs": [],
      "text": "sympathy and empathy????",
      "parent_context": "Chemistry is not a easy subject to teach. It requires sympathy as well as empathy. You are of the few teachers who can successfully teach it to students."
    },
    {
      "comment_id": "Ugy22rUpNFLu-ooUDlh4AaABAg.9BAuM5088MF9jwljWKYTb-",
      "parent_id": "Ugy22rUpNFLu-ooUDlh4AaABAg",
      "comment_type": "reply",
      "author": "@krishnaskid001",
      "likes": 2,
      "published_at": "2022-12-22T14:03:03Z",
      "timestamp_refs": [],
      "text": "why sympathy??",
      "parent_context": "Chemistry is not a easy subject to teach. It requires sympathy as well as empathy. You are of the few teachers who can successfully teach it to students."
    },
    {
      "comment_id": "Ugy22rUpNFLu-ooUDlh4AaABAg.9BAuM5088MF9pl7VZv0Y-e",
      "parent_id": "Ugy22rUpNFLu-ooUDlh4AaABAg",
      "comment_type": "reply",
      "author": "@strawberrybrowniesforfree",
      "likes": 10,
      "published_at": "2023-05-16T04:39:28Z",
      "timestamp_refs": [],
      "text": "sympathy? for whom? the poor electrons?",
      "parent_context": "Chemistry is not a easy subject to teach. It requires sympathy as well as empathy. You are of the few teachers who can successfully teach it to students."
    },
    {
      "comment_id": "Ugy22rUpNFLu-ooUDlh4AaABAg.9BAuM5088MF9zElvZQS-g0",
      "parent_id": "Ugy22rUpNFLu-ooUDlh4AaABAg",
      "comment_type": "reply",
      "author": "@Moon_Melody09",
      "likes": 0,
      "published_at": "2024-01-06T19:01:12Z",
      "timestamp_refs": [],
      "text": "​@strawberrybrowniesforfree😂",
      "parent_context": "Chemistry is not a easy subject to teach. It requires sympathy as well as empathy. You are of the few teachers who can successfully teach it to students."
    },
    {
      "comment_id": "Ugy22rUpNFLu-ooUDlh4AaABAg.9BAuM5088MFA0Ct813XxNn",
      "parent_id": "Ugy22rUpNFLu-ooUDlh4AaABAg",
      "comment_type": "reply",
      "author": "@Uehehdjdjsh",
      "likes": 0,
      "published_at": "2024-02-24T18:28:30Z",
      "timestamp_refs": [],
      "text": "@strawberrybrowniesforfree 😂",
      "parent_context": "Chemistry is not a easy subject to teach. It requires sympathy as well as empathy. You are of the few teachers who can successfully teach it to students."
    },
    {
      "comment_id": "Ugy22rUpNFLu-ooUDlh4AaABAg.9BAuM5088MFAB2fBC07024",
      "parent_id": "Ugy22rUpNFLu-ooUDlh4AaABAg",
      "comment_type": "reply",
      "author": "@PankajKumar-wo1ve",
      "likes": 0,
      "published_at": "2024-11-20T04:59:32Z",
      "timestamp_refs": [],
      "text": "@krishnaskid001 🥲🥲🥲🥲bacho ke liyee .... bechare hum 🙂🙂🙂🙂🙂🙂",
      "parent_context": "Chemistry is not a easy subject to teach. It requires sympathy as well as empathy. You are of the few teachers who can successfully teach it to students."
    },
    {
      "comment_id": "Ugy22rUpNFLu-ooUDlh4AaABAg.9BAuM5088MFAFX7npKTwKa",
      "parent_id": "Ugy22rUpNFLu-ooUDlh4AaABAg",
      "comment_type": "reply",
      "author": "@Einstein-o3f",
      "likes": 0,
      "published_at": "2025-03-11T11:01:08Z",
      "timestamp_refs": [],
      "text": "🤣🤣are u mad..",
      "parent_context": "Chemistry is not a easy subject to teach. It requires sympathy as well as empathy. You are of the few teachers who can successfully teach it to students."
    },
    {
      "comment_id": "UgyQbMY-fjGSWo3hC0V4AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@Sachingupta51289",
      "likes": 9,
      "published_at": "2023-08-17T04:59:43Z",
      "timestamp_refs": [],
      "text": "Just reached the last video of chemical bonding. And so glad to see physics wallah reached 11 million.",
      "parent_context": ""
    },
    {
      "comment_id": "UgyY4PMTVMaWbdUmosR4AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@knowaboutuniverse4490",
      "likes": 187,
      "published_at": "2018-08-15T05:21:10Z",
      "timestamp_refs": [],
      "text": "Happy independence day to all physics wallah family..🇮🇳🇮🇳🇮🇳🇮🇳🇮🇳🇮🇳🇮🇳🇮🇳🇮🇳🇮🇳🇮🇳🇮🇳🇮🇳🇮🇳🇮🇳",
      "parent_context": ""
    },
    {
      "comment_id": "UgyY4PMTVMaWbdUmosR4AaABAg.8jxi4rAXpcG8qczJ4Tiq3O",
      "parent_id": "UgyY4PMTVMaWbdUmosR4AaABAg",
      "comment_type": "reply",
      "author": "@riyamukherjee6926",
      "likes": 4,
      "published_at": "2019-01-28T03:47:22Z",
      "timestamp_refs": [],
      "text": "Amir Hussain why is it so to u??😑",
      "parent_context": "Happy independence day to all physics wallah family..🇮🇳🇮🇳🇮🇳🇮🇳🇮🇳🇮🇳🇮🇳🇮🇳🇮🇳🇮🇳🇮🇳🇮🇳🇮🇳🇮🇳🇮🇳"
    },
    {
      "comment_id": "UgyY4PMTVMaWbdUmosR4AaABAg.8jxi4rAXpcG8y_TC1XhXGi",
      "parent_id": "UgyY4PMTVMaWbdUmosR4AaABAg",
      "comment_type": "reply",
      "author": "@chikupradhan9054",
      "likes": 1,
      "published_at": "2019-08-13T15:11:28Z",
      "timestamp_refs": [],
      "text": "Abdul Kareem Wani every body should celebrate for each other's joy so be happy with us \"you are most welcome\"",
      "parent_context": "Happy independence day to all physics wallah family..🇮🇳🇮🇳🇮🇳🇮🇳🇮🇳🇮🇳🇮🇳🇮🇳🇮🇳🇮🇳🇮🇳🇮🇳🇮🇳🇮🇳🇮🇳"
    },
    {
      "comment_id": "UgyY4PMTVMaWbdUmosR4AaABAg.8jxi4rAXpcG8y_ewQ2AtIr",
      "parent_id": "UgyY4PMTVMaWbdUmosR4AaABAg",
      "comment_type": "reply",
      "author": "@nirmalakumari3750",
      "likes": 1,
      "published_at": "2019-08-13T17:02:48Z",
      "timestamp_refs": [],
      "text": "Happy independence day ...that is on Thursday",
      "parent_context": "Happy independence day to all physics wallah family..🇮🇳🇮🇳🇮🇳🇮🇳🇮🇳🇮🇳🇮🇳🇮🇳🇮🇳🇮🇳🇮🇳🇮🇳🇮🇳🇮🇳🇮🇳"
    },
    {
      "comment_id": "UgyY4PMTVMaWbdUmosR4AaABAg.8jxi4rAXpcG8yeQBjGK9td",
      "parent_id": "UgyY4PMTVMaWbdUmosR4AaABAg",
      "comment_type": "reply",
      "author": "@ausalishivani5479",
      "likes": 0,
      "published_at": "2019-08-15T13:21:25Z",
      "timestamp_refs": [],
      "text": "Happy independence day..!! After one year.. On same day..!",
      "parent_context": "Happy independence day to all physics wallah family..🇮🇳🇮🇳🇮🇳🇮🇳🇮🇳🇮🇳🇮🇳🇮🇳🇮🇳🇮🇳🇮🇳🇮🇳🇮🇳🇮🇳🇮🇳"
    },
    {
      "comment_id": "UgyY4PMTVMaWbdUmosR4AaABAg.8jxi4rAXpcG8z8UgQfSiDz",
      "parent_id": "UgyY4PMTVMaWbdUmosR4AaABAg",
      "comment_type": "reply",
      "author": "@ldady1370",
      "likes": 0,
      "published_at": "2019-08-27T14:57:09Z",
      "timestamp_refs": [],
      "text": "Abdul Kareem Wani 🤥🤥🤥🤥",
      "parent_context": "Happy independence day to all physics wallah family..🇮🇳🇮🇳🇮🇳🇮🇳🇮🇳🇮🇳🇮🇳🇮🇳🇮🇳🇮🇳🇮🇳🇮🇳🇮🇳🇮🇳🇮🇳"
    },
    {
      "comment_id": "UgyY4PMTVMaWbdUmosR4AaABAg.8jxi4rAXpcG90FcKGX1Btf",
      "parent_id": "UgyY4PMTVMaWbdUmosR4AaABAg",
      "comment_type": "reply",
      "author": "@tamannatripathi499",
      "likes": 1,
      "published_at": "2019-10-19T02:30:06Z",
      "timestamp_refs": [],
      "text": "Tu7ui",
      "parent_context": "Happy independence day to all physics wallah family..🇮🇳🇮🇳🇮🇳🇮🇳🇮🇳🇮🇳🇮🇳🇮🇳🇮🇳🇮🇳🇮🇳🇮🇳🇮🇳🇮🇳🇮🇳"
    },
    {
      "comment_id": "UgyY4PMTVMaWbdUmosR4AaABAg.8jxi4rAXpcG9CVUbF_Ry1Z",
      "parent_id": "UgyY4PMTVMaWbdUmosR4AaABAg",
      "comment_type": "reply",
      "author": "@raviupadhyay5989",
      "likes": 0,
      "published_at": "2020-08-18T12:38:30Z",
      "timestamp_refs": [],
      "text": "Amir Hussain#wariorsyou are a very bad boy",
      "parent_context": "Happy independence day to all physics wallah family..🇮🇳🇮🇳🇮🇳🇮🇳🇮🇳🇮🇳🇮🇳🇮🇳🇮🇳🇮🇳🇮🇳🇮🇳🇮🇳🇮🇳🇮🇳"
    },
    {
      "comment_id": "UgyfdrmsXDiJxOjYv7l4AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@rakshithr9070",
      "likes": 28,
      "published_at": "2020-10-21T12:04:43Z",
      "timestamp_refs": [],
      "text": "Uff... Finally finished entire 12 to 13 hour long lecture of Chemical Binding... I literally completed a new 200 pages entire book for just 1 chapter... Even if I go to Aakash... even during Aakash online classes I watch his lectures... A very big thank u to Alakh sir... THANK U SOOO MUCH sir...W love u sir 😍😍😘😘",
      "parent_context": ""
    },
    {
      "comment_id": "UgyfdrmsXDiJxOjYv7l4AaABAg.9F4Dbp2yk3a9FG8Pn8uCQI",
      "parent_id": "UgyfdrmsXDiJxOjYv7l4AaABAg",
      "comment_type": "reply",
      "author": "@kashishthakur8150",
      "likes": 16,
      "published_at": "2020-10-26T03:10:08Z",
      "timestamp_refs": [],
      "text": "You won't be able to revise those 200 pages. Even I studied from him but my notes are of 10 pages. Try watching Ishita Khurana's video and try to follow her method of note making. It was just a suggestion. In those 200 pages you must have written all the numericals, doubts and everything but if you revise your content on a daily basis then these will be of no use because you'll learn everything by heart. And numericals are meant to be solved not to be stored. Write down the Ques, the answer and the trick (if any) not the complete solution. This comment was not meant to point out your mistake, but network etiquettes taught me to help others and being a 12th grade student I can predict that maybe you'll suffer and feel depressed because of the psychological pressure that will develop. Thank you for reading my comment. Hope it helps❤️",
      "parent_context": "Uff... Finally finished entire 12 to 13 hour long lecture of Chemical Binding... I literally completed a new 200 pages entire book for just 1 chapter... Even if I go to Aakash... even during Aakash online classes I watch his lectures... A very big thank u to Alakh sir... THANK U SOOO MUCH sir...W love u sir 😍😍😘😘"
    },
    {
      "comment_id": "UgwG42c98QbD81YrFLZ4AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@animalwelfare1896",
      "likes": 30,
      "published_at": "2019-07-31T15:33:37Z",
      "timestamp_refs": [],
      "text": "you are just too AMAZING at teaching chemistry..your words go right into my head...great teacher...thanks..",
      "parent_context": ""
    },
    {
      "comment_id": "UgyIzX_O4ZOHWMbIhYh4AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@julisiddique6638",
      "likes": 19,
      "published_at": "2022-12-19T02:41:02Z",
      "timestamp_refs": [],
      "text": "What a journey! ✨ Tysm for giving a wonderful explanation✨🍁",
      "parent_context": ""
    },
    {
      "comment_id": "UgyUt7Kg4Aps2LYKVGl4AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@shubham8943",
      "likes": 45,
      "published_at": "2018-08-09T09:32:48Z",
      "timestamp_refs": [],
      "text": "Sir #resonance.. bhi please sir 👍👍",
      "parent_context": ""
    },
    {
      "comment_id": "UgxtDcBNwumBIn5n_Hx4AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@himanibhatt1170",
      "likes": 19,
      "published_at": "2020-03-19T12:29:09Z",
      "timestamp_refs": [],
      "text": "People like him are increasing the value of content on YouTube. This is literally the best education that you can gain here. Hats off to Alakh sir's efforts🎩",
      "parent_context": ""
    },
    {
      "comment_id": "UgwUpuSTRtGAeRZryeR4AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@jaspersheeran8236",
      "likes": 122,
      "published_at": "2018-10-14T10:45:29Z",
      "timestamp_refs": [],
      "text": "*Sir Coordination Compound (competitive level) pe video bana do if possible. Thanks*",
      "parent_context": ""
    },
    {
      "comment_id": "UgwUpuSTRtGAeRZryeR4AaABAg.8mNmtf-o1QA99MUMIfwmP7",
      "parent_id": "UgwUpuSTRtGAeRZryeR4AaABAg",
      "comment_type": "reply",
      "author": "@manishayadav7194",
      "likes": 0,
      "published_at": "2020-06-01T11:08:58Z",
      "timestamp_refs": [],
      "text": "Available Nahi Hain espe lecture??",
      "parent_context": "*Sir Coordination Compound (competitive level) pe video bana do if possible. Thanks*"
    },
    {
      "comment_id": "UgwUpuSTRtGAeRZryeR4AaABAg.8mNmtf-o1QA9B0F0oukN-4",
      "parent_id": "UgwUpuSTRtGAeRZryeR4AaABAg",
      "comment_type": "reply",
      "author": "@nitin2377",
      "likes": 0,
      "published_at": "2020-07-12T12:54:28Z",
      "timestamp_refs": [],
      "text": "@manishayadav7194 no bro",
      "parent_context": "*Sir Coordination Compound (competitive level) pe video bana do if possible. Thanks*"
    },
    {
      "comment_id": "UgwUpuSTRtGAeRZryeR4AaABAg.8mNmtf-o1QA9Bc6wqeCfDC",
      "parent_id": "UgwUpuSTRtGAeRZryeR4AaABAg",
      "comment_type": "reply",
      "author": "@thestudentsdiary8506",
      "likes": 0,
      "published_at": "2020-07-27T15:14:16Z",
      "timestamp_refs": [],
      "text": "@manishayadav7194 it's available but there's other teacher there not Alakh sir.",
      "parent_context": "*Sir Coordination Compound (competitive level) pe video bana do if possible. Thanks*"
    },
    {
      "comment_id": "UgwUpuSTRtGAeRZryeR4AaABAg.8mNmtf-o1QA9BdZoC-Nqhv",
      "parent_id": "UgwUpuSTRtGAeRZryeR4AaABAg",
      "comment_type": "reply",
      "author": "@manishayadav7194",
      "likes": 0,
      "published_at": "2020-07-28T04:45:44Z",
      "timestamp_refs": [],
      "text": "@thestudentsdiary8506 will you plz send meh the link?",
      "parent_context": "*Sir Coordination Compound (competitive level) pe video bana do if possible. Thanks*"
    },
    {
      "comment_id": "UgwUpuSTRtGAeRZryeR4AaABAg.8mNmtf-o1QA9Bd_RUkueQ0",
      "parent_id": "UgwUpuSTRtGAeRZryeR4AaABAg",
      "comment_type": "reply",
      "author": "@thestudentsdiary8506",
      "likes": 0,
      "published_at": "2020-07-28T04:51:14Z",
      "timestamp_refs": [],
      "text": "@manishayadav7194 https://www.youtube.com/playlist?list=PLF_7kfnwLFCFVII1I1paHKCtq5VhlmAaC",
      "parent_context": "*Sir Coordination Compound (competitive level) pe video bana do if possible. Thanks*"
    },
    {
      "comment_id": "UgwUpuSTRtGAeRZryeR4AaABAg.8mNmtf-o1QAAMPbDuPPTeG",
      "parent_id": "UgwUpuSTRtGAeRZryeR4AaABAg",
      "comment_type": "reply",
      "author": "@aepeiron",
      "likes": 0,
      "published_at": "2025-08-29T12:32:49Z",
      "timestamp_refs": [],
      "text": "nikla iit kisi ka",
      "parent_context": "*Sir Coordination Compound (competitive level) pe video bana do if possible. Thanks*"
    },
    {
      "comment_id": "UgwUpuSTRtGAeRZryeR4AaABAg.8mNmtf-o1QAAMVHFHdo-Fb",
      "parent_id": "UgwUpuSTRtGAeRZryeR4AaABAg",
      "comment_type": "reply",
      "author": "@SpunkinatorThanos",
      "likes": 0,
      "published_at": "2025-08-31T17:24:57Z",
      "timestamp_refs": [],
      "text": "​@aepeironyes Mera",
      "parent_context": "*Sir Coordination Compound (competitive level) pe video bana do if possible. Thanks*"
    },
    {
      "comment_id": "Ugz8kI_36BeiLN2OrTJ4AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@humjuri_2108",
      "likes": 21,
      "published_at": "2021-07-08T12:04:04Z",
      "timestamp_refs": [],
      "text": "The happiness on reaching this last lecture is on another level🎉",
      "parent_context": ""
    },
    {
      "comment_id": "UgycVMM99wYGwjv6HjR4AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@kastubhkumar2515",
      "likes": 31,
      "published_at": "2019-08-24T08:53:52Z",
      "timestamp_refs": [],
      "text": "sir i saw ur few chapters lecture and now i can say u r better then my aakash faculty....",
      "parent_context": ""
    },
    {
      "comment_id": "UgycVMM99wYGwjv6HjR4AaABAg.8z06ivG2YpY90d-f_tj912",
      "parent_id": "UgycVMM99wYGwjv6HjR4AaABAg",
      "comment_type": "reply",
      "author": "@elitedubey2738",
      "likes": 2,
      "published_at": "2019-10-28T13:44:38Z",
      "timestamp_refs": [],
      "text": "Aakash accha hai dude",
      "parent_context": "sir i saw ur few chapters lecture and now i can say u r better then my aakash faculty...."
    },
    {
      "comment_id": "UgycVMM99wYGwjv6HjR4AaABAg.8z06ivG2YpY90d-jIRasgm",
      "parent_id": "UgycVMM99wYGwjv6HjR4AaABAg",
      "comment_type": "reply",
      "author": "@elitedubey2738",
      "likes": 3,
      "published_at": "2019-10-28T13:45:09Z",
      "timestamp_refs": [],
      "text": "Ik AP sir is great but aakash is also good",
      "parent_context": "sir i saw ur few chapters lecture and now i can say u r better then my aakash faculty...."
    },
    {
      "comment_id": "UgycVMM99wYGwjv6HjR4AaABAg.8z06ivG2YpY9EapwhmlV8R",
      "parent_id": "UgycVMM99wYGwjv6HjR4AaABAg",
      "comment_type": "reply",
      "author": "@shriyashpatil7247",
      "likes": 1,
      "published_at": "2020-10-09T16:51:54Z",
      "timestamp_refs": [],
      "text": "Jhooth Safed Jhooth",
      "parent_context": "sir i saw ur few chapters lecture and now i can say u r better then my aakash faculty...."
    },
    {
      "comment_id": "UgycVMM99wYGwjv6HjR4AaABAg.8z06ivG2YpY9Ekm0iUwfTv",
      "parent_id": "UgycVMM99wYGwjv6HjR4AaABAg",
      "comment_type": "reply",
      "author": "@ssubhashini6121",
      "likes": 3,
      "published_at": "2020-10-13T13:30:02Z",
      "timestamp_refs": [],
      "text": "Kaustubh Kumar, Definitely. I know you are telling the truth. We are in the same boat.",
      "parent_context": "sir i saw ur few chapters lecture and now i can say u r better then my aakash faculty...."
    },
    {
      "comment_id": "UgycVMM99wYGwjv6HjR4AaABAg.8z06ivG2YpYA7yWoMCp3CP",
      "parent_id": "UgycVMM99wYGwjv6HjR4AaABAg",
      "comment_type": "reply",
      "author": "@AKASHJEEASPIRANT26",
      "likes": 0,
      "published_at": "2024-09-04T15:27:15Z",
      "timestamp_refs": [],
      "text": "In logo ka IIT kabhi nhi hota",
      "parent_context": "sir i saw ur few chapters lecture and now i can say u r better then my aakash faculty...."
    },
    {
      "comment_id": "UgzZKMOxnbcno4TaRv54AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@akuminlaaier7692",
      "likes": 15,
      "published_at": "2019-07-22T16:36:03Z",
      "timestamp_refs": [],
      "text": "Congrats guys! We have finally finished chapter 4!!!!!! Whewwww",
      "parent_context": ""
    },
    {
      "comment_id": "Ugzw-jOjSYq9mB2IsOl4AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@girijagiri9989",
      "likes": 39,
      "published_at": "2020-04-19T11:02:22Z",
      "timestamp_refs": [],
      "text": "I get soo focused in the lecture that i forget to like the video!! 😅",
      "parent_context": ""
    },
    {
      "comment_id": "UgxvbF1XgP_HIoMHMb14AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@dhanrajkakran3608",
      "likes": 22,
      "published_at": "2020-08-06T14:29:49Z",
      "timestamp_refs": [],
      "text": "Each and every concept explained that's why alakh sir is loved so much❤",
      "parent_context": ""
    },
    {
      "comment_id": "UgyDY5U-T5nz_FQ4Eyd4AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@nhsrinuvas",
      "likes": 40,
      "published_at": "2020-09-30T06:55:49Z",
      "timestamp_refs": [],
      "text": "oh....god...literally at the perfect time.....when i was listening class....got a mssg from frnd in wtsapp ...was checking that.... sir: phn idhar udhar chalana bandh karo aur dhyaan se suno......i was like shocked.......and frm that particular tym i started concentrating much....thnkewwwwwwwwwww.................sir..",
      "parent_context": ""
    },
    {
      "comment_id": "UgyDY5U-T5nz_FQ4Eyd4AaABAg.9EDaZxSTmob9PVhw5kR68W",
      "parent_id": "UgyDY5U-T5nz_FQ4Eyd4AaABAg",
      "comment_type": "reply",
      "author": "@avantikamishra3208",
      "likes": 1,
      "published_at": "2021-07-07T17:31:48Z",
      "timestamp_refs": [],
      "text": "Me too 😁😁😅",
      "parent_context": "oh....god...literally at the perfect time.....when i was listening class....got a mssg from frnd in wtsapp ...was checking that.... sir: phn idhar udhar chalana bandh karo aur dhyaan se suno......i was like shocked.......and frm that particular tym i started concentrating much....thnkewwwwwwwwwww.................sir.."
    },
    {
      "comment_id": "UgzOqdE7ycGcxrqfJvJ4AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@muntazirimam5550",
      "likes": 83,
      "published_at": "2020-03-30T09:35:54Z",
      "timestamp_refs": [],
      "text": "In my class 11th I completely lost hold in this chapter to the extent that o was unable to calculate hybridization but now in my semester holidays I completed all the 16 th lec now I am able to solve each and every question of chemical bonding sheet provided by the institute. Thank you alakh sir lots of love and respect.",
      "parent_context": ""
    },
    {
      "comment_id": "UgzOqdE7ycGcxrqfJvJ4AaABAg.96p5cPocXTQ9EapnCmBxsX",
      "parent_id": "UgzOqdE7ycGcxrqfJvJ4AaABAg",
      "comment_type": "reply",
      "author": "@shriyashpatil7247",
      "likes": 7,
      "published_at": "2020-10-09T16:50:36Z",
      "timestamp_refs": [],
      "text": "Back Bonding ka question kar liya 😂😂😂",
      "parent_context": "In my class 11th I completely lost hold in this chapter to the extent that o was unable to calculate hybridization but now in my semester holidays I completed all the 16 th lec now I am able to solve each and every question of chemical bonding sheet provided by the institute. Thank you alakh sir lots of love and respect."
    },
    {
      "comment_id": "UgzOqdE7ycGcxrqfJvJ4AaABAg.96p5cPocXTQ9Fsut7ZWwZL",
      "parent_id": "UgzOqdE7ycGcxrqfJvJ4AaABAg",
      "comment_type": "reply",
      "author": "@manjuvij8807",
      "likes": 0,
      "published_at": "2020-11-10T13:52:50Z",
      "timestamp_refs": [],
      "text": "Try mcqhttps://www.youtube.com/playlist?list=PL-7DAAPdMJDxThJywnipCcA5DTHvsCYRt",
      "parent_context": "In my class 11th I completely lost hold in this chapter to the extent that o was unable to calculate hybridization but now in my semester holidays I completed all the 16 th lec now I am able to solve each and every question of chemical bonding sheet provided by the institute. Thank you alakh sir lots of love and respect."
    },
    {
      "comment_id": "UgzOqdE7ycGcxrqfJvJ4AaABAg.96p5cPocXTQ9QPp0mX3aPx",
      "parent_id": "UgzOqdE7ycGcxrqfJvJ4AaABAg",
      "comment_type": "reply",
      "author": "@harjapansingh7548",
      "likes": 1,
      "published_at": "2021-07-30T07:09:42Z",
      "timestamp_refs": [],
      "text": "Inert pair effect ka krliya lol xd",
      "parent_context": "In my class 11th I completely lost hold in this chapter to the extent that o was unable to calculate hybridization but now in my semester holidays I completed all the 16 th lec now I am able to solve each and every question of chemical bonding sheet provided by the institute. Thank you alakh sir lots of love and respect."
    },
    {
      "comment_id": "Ugw0VOGSLQIOY1WpHAl4AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@AryanRaj-ho2kq",
      "likes": 7,
      "published_at": "2021-07-02T10:35:11Z",
      "timestamp_refs": [],
      "text": "Mai allen supath kota me padhta hoon believe allen ke online lecture ke pahle alakh sir ka lecture dekhta hoon mai hi nahi balki lagbhag saare bachhe aisa hi karte hai taki topic acche se samjh aa sake 🙏🙏🙏jai alakh sir g ki mouka mile toh mai aapka charan sparsh karna chahunga",
      "parent_context": ""
    },
    {
      "comment_id": "UgxkemOjHrcFR3RG9wJ4AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@soumyaranjanpanda9558",
      "likes": 47,
      "published_at": "2019-04-09T15:16:13Z",
      "timestamp_refs": [],
      "text": "Sir sir sir kahanse latahe etne content hamare coaching me sir to 15 min me khatam kardiya tha magar ap ka to 1 HOUR. SALUTE U SIR THANK U SO MUCH",
      "parent_context": ""
    },
    {
      "comment_id": "UgxkemOjHrcFR3RG9wJ4AaABAg.8tW1_WhnZ5M989GOI5tb0A",
      "parent_id": "UgxkemOjHrcFR3RG9wJ4AaABAg",
      "comment_type": "reply",
      "author": "@SachinYadav-fv4mo",
      "likes": 1,
      "published_at": "2020-05-02T11:25:23Z",
      "timestamp_refs": [],
      "text": "😂😂😂🤣😂😂😂😂😂",
      "parent_context": "Sir sir sir kahanse latahe etne content hamare coaching me sir to 15 min me khatam kardiya tha magar ap ka to 1 HOUR. SALUTE U SIR THANK U SO MUCH"
    },
    {
      "comment_id": "UgxkemOjHrcFR3RG9wJ4AaABAg.8tW1_WhnZ5M9A5Uf7TlpmZ",
      "parent_id": "UgxkemOjHrcFR3RG9wJ4AaABAg",
      "comment_type": "reply",
      "author": "@harmohansharma3808",
      "likes": 0,
      "published_at": "2020-06-19T17:15:59Z",
      "timestamp_refs": [],
      "text": "😘😘😘😘😘😘",
      "parent_context": "Sir sir sir kahanse latahe etne content hamare coaching me sir to 15 min me khatam kardiya tha magar ap ka to 1 HOUR. SALUTE U SIR THANK U SO MUCH"
    },
    {
      "comment_id": "UgyPWrDR-eL7EWwZvDx4AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@nan_dini1090",
      "likes": 15,
      "published_at": "2020-02-21T17:08:01Z",
      "timestamp_refs": [],
      "text": "🔥🔥concepts are crystal clear sir 🔥🔥 Love from haryana ♥️🤩",
      "parent_context": ""
    },
    {
      "comment_id": "UgymuNGD6YiIa2AybxN4AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@ashutoshshukla6986",
      "likes": 81,
      "published_at": "2018-08-10T17:02:12Z",
      "timestamp_refs": [],
      "text": "The best teacher on YouTube and one of the best in India.",
      "parent_context": ""
    },
    {
      "comment_id": "UgymuNGD6YiIa2AybxN4AaABAg.8jm5L0aS_1L8kjcIySEnY6",
      "parent_id": "UgymuNGD6YiIa2AybxN4AaABAg",
      "comment_type": "reply",
      "author": "@arshdeep011",
      "likes": 2,
      "published_at": "2018-09-03T14:32:41Z",
      "timestamp_refs": [],
      "text": "Ashutosh shukla oh yes",
      "parent_context": "The best teacher on YouTube and one of the best in India."
    },
    {
      "comment_id": "UgymuNGD6YiIa2AybxN4AaABAg.8jm5L0aS_1L8pLe7wHYP7i",
      "parent_id": "UgymuNGD6YiIa2AybxN4AaABAg",
      "comment_type": "reply",
      "author": "@anuduggal3522",
      "likes": 8,
      "published_at": "2018-12-27T04:24:37Z",
      "timestamp_refs": [],
      "text": "Why govt do'nt recognise such teachers nd give laurels to them bcz they r making the brilliant doctors nd engineers. Really they desrve a lot from govt....",
      "parent_context": "The best teacher on YouTube and one of the best in India."
    },
    {
      "comment_id": "UgymuNGD6YiIa2AybxN4AaABAg.8jm5L0aS_1L8pLeDpISDON",
      "parent_id": "UgymuNGD6YiIa2AybxN4AaABAg",
      "comment_type": "reply",
      "author": "@anuduggal3522",
      "likes": 3,
      "published_at": "2018-12-27T04:25:25Z",
      "timestamp_refs": [],
      "text": "Teachers like him r actually contributing to bright future of india",
      "parent_context": "The best teacher on YouTube and one of the best in India."
    },
    {
      "comment_id": "UgymuNGD6YiIa2AybxN4AaABAg.8jm5L0aS_1L8xVDzmJyNGo",
      "parent_id": "UgymuNGD6YiIa2AybxN4AaABAg",
      "comment_type": "reply",
      "author": "@vyomgarg3742",
      "likes": 4,
      "published_at": "2019-07-17T17:51:00Z",
      "timestamp_refs": [],
      "text": "Wow... you have a loyalty badge... awsm",
      "parent_context": "The best teacher on YouTube and one of the best in India."
    },
    {
      "comment_id": "UgymuNGD6YiIa2AybxN4AaABAg.8jm5L0aS_1L8y3-P9raa2w",
      "parent_id": "UgymuNGD6YiIa2AybxN4AaABAg",
      "comment_type": "reply",
      "author": "@animagusoc962",
      "likes": 0,
      "published_at": "2019-07-31T15:16:11Z",
      "timestamp_refs": [],
      "text": "@vyomgarg3742 what does it mean",
      "parent_context": "The best teacher on YouTube and one of the best in India."
    },
    {
      "comment_id": "UgymuNGD6YiIa2AybxN4AaABAg.8jm5L0aS_1L8y3LLdKWWuM",
      "parent_id": "UgymuNGD6YiIa2AybxN4AaABAg",
      "comment_type": "reply",
      "author": "@vyomgarg3742",
      "likes": 0,
      "published_at": "2019-07-31T18:27:56Z",
      "timestamp_refs": [],
      "text": "@animagusoc962 Near the subscribe there is a join button no? If you join physicswallah channel you get a loyalty badge with some premium features... The only downside is that it has to bought...",
      "parent_context": "The best teacher on YouTube and one of the best in India."
    },
    {
      "comment_id": "UgxD5tFRnYsQZANjSmB4AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@oreo1531",
      "likes": 12,
      "published_at": "2021-11-04T07:52:35Z",
      "timestamp_refs": [],
      "text": "U made me love this subject sir. I really enjoy studying from you❤❤❤",
      "parent_context": ""
    },
    {
      "comment_id": "UgztQ1Fj79lc7dJmzLl4AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@nandiniparolekar9831",
      "likes": 64,
      "published_at": "2019-08-01T11:50:18Z",
      "timestamp_refs": [],
      "text": "Chemistry was never so logical and interesting . Thnx sir",
      "parent_context": ""
    },
    {
      "comment_id": "UgztQ1Fj79lc7dJmzLl4AaABAg.8y5Cd1fugDbA7tLlVB7A8Q",
      "parent_id": "UgztQ1Fj79lc7dJmzLl4AaABAg",
      "comment_type": "reply",
      "author": "@divyabharti8642",
      "likes": 1,
      "published_at": "2024-09-02T15:14:32Z",
      "timestamp_refs": [],
      "text": "Kaise????😳😳😳😳😳🤔🤔",
      "parent_context": "Chemistry was never so logical and interesting . Thnx sir"
    },
    {
      "comment_id": "Ugy3-sa0JoROkwuQSCN4AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@Shruti.4558",
      "likes": 481,
      "published_at": "2019-06-17T13:30:10Z",
      "timestamp_refs": [],
      "text": "Physics wallah fans hit like 👍 Bkp fans comment ✍️",
      "parent_context": ""
    },
    {
      "comment_id": "Ugy3-sa0JoROkwuQSCN4AaABAg.8wHWIC1KE8X8xPv4Lc1ToF",
      "parent_id": "Ugy3-sa0JoROkwuQSCN4AaABAg",
      "comment_type": "reply",
      "author": "@sarvodayacomputer658",
      "likes": 14,
      "published_at": "2019-07-15T16:20:47Z",
      "timestamp_refs": [],
      "text": "Both are good",
      "parent_context": "Physics wallah fans hit like 👍 Bkp fans comment ✍️"
    },
    {
      "comment_id": "Ugy3-sa0JoROkwuQSCN4AaABAg.8wHWIC1KE8X8xeOT5dsAPl",
      "parent_id": "Ugy3-sa0JoROkwuQSCN4AaABAg",
      "comment_type": "reply",
      "author": "@dr.basuphysicslover7111",
      "likes": 29,
      "published_at": "2019-07-21T16:34:55Z",
      "timestamp_refs": [],
      "text": "Meri 10th unhone hi karai h bhaiiii so both are best at their places please no comparison 🙏🙏🙏",
      "parent_context": "Physics wallah fans hit like 👍 Bkp fans comment ✍️"
    },
    {
      "comment_id": "Ugy3-sa0JoROkwuQSCN4AaABAg.8wHWIC1KE8X8yImw-uxoYy",
      "parent_id": "Ugy3-sa0JoROkwuQSCN4AaABAg",
      "comment_type": "reply",
      "author": "@priyankasingh294",
      "likes": 10,
      "published_at": "2019-08-06T18:26:19Z",
      "timestamp_refs": [],
      "text": "@dr.basuphysicslover7111 shi bole bhai mai unhe bhi helpful manti hu meri sst me 96 unhi ki wajah se aayi...",
      "parent_context": "Physics wallah fans hit like 👍 Bkp fans comment ✍️"
    },
    {
      "comment_id": "Ugy3-sa0JoROkwuQSCN4AaABAg.8wHWIC1KE8X8yNYui7djK8",
      "parent_id": "Ugy3-sa0JoROkwuQSCN4AaABAg",
      "comment_type": "reply",
      "author": "@subhrajitroy1477",
      "likes": 4,
      "published_at": "2019-08-08T14:51:16Z",
      "timestamp_refs": [],
      "text": "both like and comment!",
      "parent_context": "Physics wallah fans hit like 👍 Bkp fans comment ✍️"
    },
    {
      "comment_id": "Ugy3-sa0JoROkwuQSCN4AaABAg.8wHWIC1KE8X8yS4NH0c5XL",
      "parent_id": "Ugy3-sa0JoROkwuQSCN4AaABAg",
      "comment_type": "reply",
      "author": "@vaibhavaggarwalvaibhavagga5268",
      "likes": 4,
      "published_at": "2019-08-10T09:00:38Z",
      "timestamp_refs": [],
      "text": "Bro they both are the great teachers",
      "parent_context": "Physics wallah fans hit like 👍 Bkp fans comment ✍️"
    },
    {
      "comment_id": "Ugy3-sa0JoROkwuQSCN4AaABAg.8wHWIC1KE8X8ycRcfZGdVD",
      "parent_id": "Ugy3-sa0JoROkwuQSCN4AaABAg",
      "comment_type": "reply",
      "author": "@jujutsu_kaisen_",
      "likes": 12,
      "published_at": "2019-08-14T18:55:29Z",
      "timestamp_refs": [],
      "text": "=>English or ss ke liye bkp best (10th) =>Physics or chemistry physics wallah best(10th,11th,12th) =>Maths - unacademy !!",
      "parent_context": "Physics wallah fans hit like 👍 Bkp fans comment ✍️"
    },
    {
      "comment_id": "Ugy3-sa0JoROkwuQSCN4AaABAg.8wHWIC1KE8X8z35F1hhH4P",
      "parent_id": "Ugy3-sa0JoROkwuQSCN4AaABAg",
      "comment_type": "reply",
      "author": "@drippybizzle4969",
      "likes": 5,
      "published_at": "2019-08-25T12:38:37Z",
      "timestamp_refs": [],
      "text": "@kunalgoswami5328 bhai ki padhai ytoutube pe class 9 or 10 ke students ka liya bakchodi krta krta padhai krwata ha, pr accha padhata tha 10 ma bhi usi se padhai krta tha me",
      "parent_context": "Physics wallah fans hit like 👍 Bkp fans comment ✍️"
    },
    {
      "comment_id": "Ugy3-sa0JoROkwuQSCN4AaABAg.8wHWIC1KE8X8z5yT-9hQQ5",
      "parent_id": "Ugy3-sa0JoROkwuQSCN4AaABAg",
      "comment_type": "reply",
      "author": "@viratfans2660",
      "likes": 1,
      "published_at": "2019-08-26T15:28:21Z",
      "timestamp_refs": [],
      "text": "Best",
      "parent_context": "Physics wallah fans hit like 👍 Bkp fans comment ✍️"
    },
    {
      "comment_id": "Ugy3-sa0JoROkwuQSCN4AaABAg.8wHWIC1KE8X8zFEMjmUjZL",
      "parent_id": "Ugy3-sa0JoROkwuQSCN4AaABAg",
      "comment_type": "reply",
      "author": "@prabhgunkaur5817",
      "likes": 2,
      "published_at": "2019-08-30T05:49:12Z",
      "timestamp_refs": [],
      "text": "Who is bkp ??",
      "parent_context": "Physics wallah fans hit like 👍 Bkp fans comment ✍️"
    },
    {
      "comment_id": "Ugy3-sa0JoROkwuQSCN4AaABAg.8wHWIC1KE8X8zNd1sp1rv7",
      "parent_id": "Ugy3-sa0JoROkwuQSCN4AaABAg",
      "comment_type": "reply",
      "author": "@GamesClashers",
      "likes": 4,
      "published_at": "2019-09-02T12:07:28Z",
      "timestamp_refs": [],
      "text": "Bhai aisa mt bol uski wajah se mere SST me 99 aaye or overall 91.6% both are best please don't compare don't create controversies",
      "parent_context": "Physics wallah fans hit like 👍 Bkp fans comment ✍️"
    },
    {
      "comment_id": "Ugy3-sa0JoROkwuQSCN4AaABAg.8wHWIC1KE8X8zUMNCBHLD1",
      "parent_id": "Ugy3-sa0JoROkwuQSCN4AaABAg",
      "comment_type": "reply",
      "author": "@anilmourya1152",
      "likes": 5,
      "published_at": "2019-09-05T02:47:47Z",
      "timestamp_refs": [],
      "text": "50% logo ka yahi hai 10th mai bkp 11th 12th mai physics wallah",
      "parent_context": "Physics wallah fans hit like 👍 Bkp fans comment ✍️"
    },
    {
      "comment_id": "Ugy3-sa0JoROkwuQSCN4AaABAg.8wHWIC1KE8X8zllG7BsPgZ",
      "parent_id": "Ugy3-sa0JoROkwuQSCN4AaABAg",
      "comment_type": "reply",
      "author": "@ashharhashmi",
      "likes": 0,
      "published_at": "2019-09-12T06:20:20Z",
      "timestamp_refs": [],
      "text": "@prabhgunkaur5817 bro itna nhi pta",
      "parent_context": "Physics wallah fans hit like 👍 Bkp fans comment ✍️"
    },
    {
      "comment_id": "Ugy3-sa0JoROkwuQSCN4AaABAg.8wHWIC1KE8X8zllplaut7L",
      "parent_id": "Ugy3-sa0JoROkwuQSCN4AaABAg",
      "comment_type": "reply",
      "author": "@prabhgunkaur5817",
      "likes": 0,
      "published_at": "2019-09-12T06:25:20Z",
      "timestamp_refs": [],
      "text": "@ashharhashmi sorry I really don't know that's y I asked and I m a girl not your bro",
      "parent_context": "Physics wallah fans hit like 👍 Bkp fans comment ✍️"
    },
    {
      "comment_id": "Ugy3-sa0JoROkwuQSCN4AaABAg.8wHWIC1KE8X8ztfaWUB9Xi",
      "parent_id": "Ugy3-sa0JoROkwuQSCN4AaABAg",
      "comment_type": "reply",
      "author": "@anjanirathore889",
      "likes": 1,
      "published_at": "2019-09-15T08:04:45Z",
      "timestamp_refs": [],
      "text": "Hey don't compare b/w physics wallah and bkp they teach different subject and are perfect",
      "parent_context": "Physics wallah fans hit like 👍 Bkp fans comment ✍️"
    },
    {
      "comment_id": "Ugy3-sa0JoROkwuQSCN4AaABAg.8wHWIC1KE8X8ztfmvFP05M",
      "parent_id": "Ugy3-sa0JoROkwuQSCN4AaABAg",
      "comment_type": "reply",
      "author": "@anjanirathore889",
      "likes": 0,
      "published_at": "2019-09-15T08:06:27Z",
      "timestamp_refs": [],
      "text": "@kunalgoswami5328 bkp is the teacher for English and sst I had ever seen",
      "parent_context": "Physics wallah fans hit like 👍 Bkp fans comment ✍️"
    },
    {
      "comment_id": "Ugy3-sa0JoROkwuQSCN4AaABAg.8wHWIC1KE8X9-DOKsoZpdZ",
      "parent_id": "Ugy3-sa0JoROkwuQSCN4AaABAg",
      "comment_type": "reply",
      "author": "@she_yummmmm",
      "likes": 0,
      "published_at": "2019-09-23T09:09:15Z",
      "timestamp_refs": [],
      "text": "@priyankasingh294 mere sst me 94 aaye but self study But I know ki bkp is best❤",
      "parent_context": "Physics wallah fans hit like 👍 Bkp fans comment ✍️"
    },
    {
      "comment_id": "Ugy3-sa0JoROkwuQSCN4AaABAg.8wHWIC1KE8X9-OuYAfL-8N",
      "parent_id": "Ugy3-sa0JoROkwuQSCN4AaABAg",
      "comment_type": "reply",
      "author": "@velociraptorAT",
      "likes": 1,
      "published_at": "2019-09-27T20:31:04Z",
      "timestamp_refs": [],
      "text": "Bhai and bhaiya both are good 😂😂",
      "parent_context": "Physics wallah fans hit like 👍 Bkp fans comment ✍️"
    },
    {
      "comment_id": "Ugy3-sa0JoROkwuQSCN4AaABAg.8wHWIC1KE8X9-OufiAxGSQ",
      "parent_id": "Ugy3-sa0JoROkwuQSCN4AaABAg",
      "comment_type": "reply",
      "author": "@velociraptorAT",
      "likes": 0,
      "published_at": "2019-09-27T20:32:14Z",
      "timestamp_refs": [],
      "text": "@priyankasingh294 aur meri 98 in english and 97 in sst",
      "parent_context": "Physics wallah fans hit like 👍 Bkp fans comment ✍️"
    },
    {
      "comment_id": "Ugy3-sa0JoROkwuQSCN4AaABAg.8wHWIC1KE8X9-Q02ZdAeN6",
      "parent_id": "Ugy3-sa0JoROkwuQSCN4AaABAg",
      "comment_type": "reply",
      "author": "@she_yummmmm",
      "likes": 0,
      "published_at": "2019-09-28T06:47:09Z",
      "timestamp_refs": [],
      "text": "@velociraptorAT mere 97 in english🤣",
      "parent_context": "Physics wallah fans hit like 👍 Bkp fans comment ✍️"
    },
    {
      "comment_id": "Ugy3-sa0JoROkwuQSCN4AaABAg.8wHWIC1KE8X9-T30_uqBE3",
      "parent_id": "Ugy3-sa0JoROkwuQSCN4AaABAg",
      "comment_type": "reply",
      "author": "@saumyaraj3689",
      "likes": 0,
      "published_at": "2019-09-29T11:10:49Z",
      "timestamp_refs": [],
      "text": "Both",
      "parent_context": "Physics wallah fans hit like 👍 Bkp fans comment ✍️"
    },
    {
      "comment_id": "Ugy3-sa0JoROkwuQSCN4AaABAg.8wHWIC1KE8X9-Uq9AZgftN",
      "parent_id": "Ugy3-sa0JoROkwuQSCN4AaABAg",
      "comment_type": "reply",
      "author": "@studiousboy644",
      "likes": 0,
      "published_at": "2019-09-30T03:48:08Z",
      "timestamp_refs": [],
      "text": "@priyankasingh294 Mera bkp k help se class 10 k SST mei 100% ae.",
      "parent_context": "Physics wallah fans hit like 👍 Bkp fans comment ✍️"
    },
    {
      "comment_id": "Ugy3-sa0JoROkwuQSCN4AaABAg.8wHWIC1KE8X9-eVa_IgUbN",
      "parent_id": "Ugy3-sa0JoROkwuQSCN4AaABAg",
      "comment_type": "reply",
      "author": "@snehakawal5176",
      "likes": 1,
      "published_at": "2019-10-04T07:11:26Z",
      "timestamp_refs": [],
      "text": "Bkp and phyics wallah both are best teacher and also favorite of students...,..",
      "parent_context": "Physics wallah fans hit like 👍 Bkp fans comment ✍️"
    },
    {
      "comment_id": "Ugy3-sa0JoROkwuQSCN4AaABAg.8wHWIC1KE8X9-gYReUjL8D",
      "parent_id": "Ugy3-sa0JoROkwuQSCN4AaABAg",
      "comment_type": "reply",
      "author": "@maheeadhikari9899",
      "likes": 1,
      "published_at": "2019-10-05T02:14:46Z",
      "timestamp_refs": [],
      "text": "Aditya Kumar @Both are best .....",
      "parent_context": "Physics wallah fans hit like 👍 Bkp fans comment ✍️"
    },
    {
      "comment_id": "Ugy3-sa0JoROkwuQSCN4AaABAg.8wHWIC1KE8X901VSzIcf_C",
      "parent_id": "Ugy3-sa0JoROkwuQSCN4AaABAg",
      "comment_type": "reply",
      "author": "@satyam16",
      "likes": 0,
      "published_at": "2019-10-13T14:52:02Z",
      "timestamp_refs": [],
      "text": "bhai bhai!!",
      "parent_context": "Physics wallah fans hit like 👍 Bkp fans comment ✍️"
    },
    {
      "comment_id": "Ugy3-sa0JoROkwuQSCN4AaABAg.8wHWIC1KE8X916Q4RexlBl",
      "parent_id": "Ugy3-sa0JoROkwuQSCN4AaABAg",
      "comment_type": "reply",
      "author": "@hiddenrock87668",
      "likes": 0,
      "published_at": "2019-11-09T09:12:35Z",
      "timestamp_refs": [],
      "text": "@jujutsu_kaisen_ maths ke liye unacademy verry best h And chemistry& physics ke liye to h hi hamare alakh sir is best",
      "parent_context": "Physics wallah fans hit like 👍 Bkp fans comment ✍️"
    },
    {
      "comment_id": "Ugy3-sa0JoROkwuQSCN4AaABAg.8wHWIC1KE8X91gQJ88tQVa",
      "parent_id": "Ugy3-sa0JoROkwuQSCN4AaABAg",
      "comment_type": "reply",
      "author": "@Thecontentlesspoorguy",
      "likes": 0,
      "published_at": "2019-11-23T18:06:29Z",
      "timestamp_refs": [],
      "text": "@kunalgoswami5328 bhai ki padhai",
      "parent_context": "Physics wallah fans hit like 👍 Bkp fans comment ✍️"
    },
    {
      "comment_id": "Ugy3-sa0JoROkwuQSCN4AaABAg.8wHWIC1KE8X92jEQjWRJ02",
      "parent_id": "Ugy3-sa0JoROkwuQSCN4AaABAg",
      "comment_type": "reply",
      "author": "@hritikjaiswal8860",
      "likes": 0,
      "published_at": "2019-12-19T16:51:47Z",
      "timestamp_refs": [],
      "text": "A great teacher of English and sst for class 8, 9, 10",
      "parent_context": "Physics wallah fans hit like 👍 Bkp fans comment ✍️"
    },
    {
      "comment_id": "Ugy3-sa0JoROkwuQSCN4AaABAg.8wHWIC1KE8X98TJoG5UOrO",
      "parent_id": "Ugy3-sa0JoROkwuQSCN4AaABAg",
      "comment_type": "reply",
      "author": "@aparnarajendran4392",
      "likes": 0,
      "published_at": "2020-05-10T06:20:06Z",
      "timestamp_refs": [],
      "text": "Arey bkp kaun hai",
      "parent_context": "Physics wallah fans hit like 👍 Bkp fans comment ✍️"
    },
    {
      "comment_id": "Ugy3-sa0JoROkwuQSCN4AaABAg.8wHWIC1KE8X9B2L8sM7Dfv",
      "parent_id": "Ugy3-sa0JoROkwuQSCN4AaABAg",
      "comment_type": "reply",
      "author": "@physicswallahstudentsgod625",
      "likes": 2,
      "published_at": "2020-07-13T08:26:29Z",
      "timestamp_refs": [],
      "text": "Jab bi dekho like if u like pe... Comment if u don't like him.... Karte ho kya likes te tera ghar mein bijli aati hai???",
      "parent_context": "Physics wallah fans hit like 👍 Bkp fans comment ✍️"
    },
    {
      "comment_id": "Ugy3-sa0JoROkwuQSCN4AaABAg.8wHWIC1KE8X9BUqe_JghY6",
      "parent_id": "Ugy3-sa0JoROkwuQSCN4AaABAg",
      "comment_type": "reply",
      "author": "@mithil_7984",
      "likes": 0,
      "published_at": "2020-07-24T10:09:18Z",
      "timestamp_refs": [],
      "text": "Both are Thope............",
      "parent_context": "Physics wallah fans hit like 👍 Bkp fans comment ✍️"
    },
    {
      "comment_id": "Ugy3-sa0JoROkwuQSCN4AaABAg.8wHWIC1KE8X9Dq08M9F50c",
      "parent_id": "Ugy3-sa0JoROkwuQSCN4AaABAg",
      "comment_type": "reply",
      "author": "@godgamer2258",
      "likes": 0,
      "published_at": "2020-09-20T17:46:58Z",
      "timestamp_refs": [],
      "text": "sir ke fan ha, to sir ki video like krenge na aapka comment kyu like kre",
      "parent_context": "Physics wallah fans hit like 👍 Bkp fans comment ✍️"
    },
    {
      "comment_id": "Ugy3-sa0JoROkwuQSCN4AaABAg.8wHWIC1KE8X9Fzizdjby0B",
      "parent_id": "Ugy3-sa0JoROkwuQSCN4AaABAg",
      "comment_type": "reply",
      "author": "@akdas6532",
      "likes": 0,
      "published_at": "2020-11-13T05:23:32Z",
      "timestamp_refs": [],
      "text": "@prabhgunkaur5817 bhai ki padhai",
      "parent_context": "Physics wallah fans hit like 👍 Bkp fans comment ✍️"
    },
    {
      "comment_id": "Ugy3-sa0JoROkwuQSCN4AaABAg.8wHWIC1KE8X9G1V0VMirRa",
      "parent_id": "Ugy3-sa0JoROkwuQSCN4AaABAg",
      "comment_type": "reply",
      "author": "@Roshankumar-kd4uw",
      "likes": 0,
      "published_at": "2020-11-14T07:10:27Z",
      "timestamp_refs": [],
      "text": "Bkp kaun hai",
      "parent_context": "Physics wallah fans hit like 👍 Bkp fans comment ✍️"
    },
    {
      "comment_id": "Ugy3-sa0JoROkwuQSCN4AaABAg.8wHWIC1KE8X9G9fP9HoH-T",
      "parent_id": "Ugy3-sa0JoROkwuQSCN4AaABAg",
      "comment_type": "reply",
      "author": "@The_Success_Catalyst01",
      "likes": 0,
      "published_at": "2020-11-17T11:23:51Z",
      "timestamp_refs": [],
      "text": "Who is bkp??.??",
      "parent_context": "Physics wallah fans hit like 👍 Bkp fans comment ✍️"
    },
    {
      "comment_id": "Ugy3-sa0JoROkwuQSCN4AaABAg.8wHWIC1KE8X9GruL6Lwj3O",
      "parent_id": "Ugy3-sa0JoROkwuQSCN4AaABAg",
      "comment_type": "reply",
      "author": "@zingurssa17",
      "likes": 1,
      "published_at": "2020-12-05T01:00:12Z",
      "timestamp_refs": [],
      "text": "Ye bkp kya h I listened this first time what bkp🙄",
      "parent_context": "Physics wallah fans hit like 👍 Bkp fans comment ✍️"
    },
    {
      "comment_id": "Ugy3-sa0JoROkwuQSCN4AaABAg.8wHWIC1KE8X9HCh8Al_zOv",
      "parent_id": "Ugy3-sa0JoROkwuQSCN4AaABAg",
      "comment_type": "reply",
      "author": "@Jeus28",
      "likes": 0,
      "published_at": "2020-12-13T12:08:08Z",
      "timestamp_refs": [],
      "text": "Both are best",
      "parent_context": "Physics wallah fans hit like 👍 Bkp fans comment ✍️"
    },
    {
      "comment_id": "UgynOfofbffxc1DrDDh4AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@aksalovely3542",
      "likes": 32,
      "published_at": "2020-12-12T14:40:59Z",
      "timestamp_refs": [],
      "text": "The best ever lecture I found on H-bonding....!",
      "parent_context": ""
    },
    {
      "comment_id": "UgwWE5AsLNOW07yCk2p4AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@pallavisaraswat5591",
      "likes": 9,
      "published_at": "2022-10-30T14:02:06Z",
      "timestamp_refs": [],
      "text": "Hurrah ! I completed all 16 viedios with proper notes .sir you are great and his teaching style is amazing . you are multi talented because you covers all the doubt of physic and exceptions of chemistry ......📝📝👍👍👍👍👍👍👍👍👍",
      "parent_context": ""
    },
    {
      "comment_id": "UgwHF2PPbasW0e5_DBR4AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@firdos4857",
      "likes": 14,
      "published_at": "2021-05-22T07:16:47Z",
      "timestamp_refs": [],
      "text": "Feeling full for the first time in chemistry just by attending only your 16 videos. Thank you so much sir..no words for your appreciation. You are my last hope ❤",
      "parent_context": ""
    },
    {
      "comment_id": "UgyvM22sTTHQ-6RU0594AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@deepanshu4694",
      "likes": 117,
      "published_at": "2018-08-09T08:52:10Z",
      "timestamp_refs": [],
      "text": "Sir very very very much congratulation for your 200k subscribers",
      "parent_context": ""
    },
    {
      "comment_id": "UgyvM22sTTHQ-6RU0594AaABAg.8jidT3rxnrx8joafJIfJvX",
      "parent_id": "UgyvM22sTTHQ-6RU0594AaABAg",
      "comment_type": "reply",
      "author": "@nikhilviswas6107",
      "likes": 4,
      "published_at": "2018-08-11T16:23:12Z",
      "timestamp_refs": [],
      "text": "Deepanshu Aggarwal yar sir ne back bonding bhi bahi bataye",
      "parent_context": "Sir very very very much congratulation for your 200k subscribers"
    },
    {
      "comment_id": "UgyvM22sTTHQ-6RU0594AaABAg.8jidT3rxnrx8jtWhasFUy0",
      "parent_id": "UgyvM22sTTHQ-6RU0594AaABAg",
      "comment_type": "reply",
      "author": "@sumaiyaansari3154",
      "likes": 2,
      "published_at": "2018-08-13T14:16:02Z",
      "timestamp_refs": [],
      "text": "Deepanshu Aggarwal sir itni late video kyu bnate h ????",
      "parent_context": "Sir very very very much congratulation for your 200k subscribers"
    },
    {
      "comment_id": "UgyvM22sTTHQ-6RU0594AaABAg.8jidT3rxnrx8jtXI6NiztC",
      "parent_id": "UgyvM22sTTHQ-6RU0594AaABAg",
      "comment_type": "reply",
      "author": "@deepanshu4694",
      "likes": 3,
      "published_at": "2018-08-13T14:21:09Z",
      "timestamp_refs": [],
      "text": "sumaiya masood Asal me mai bhi ye hi soch raha thaa sayad koi kam ho gaya hoga. Nahi mila hoga time,busy honge sir",
      "parent_context": "Sir very very very much congratulation for your 200k subscribers"
    },
    {
      "comment_id": "UgyvM22sTTHQ-6RU0594AaABAg.8jidT3rxnrx8jtXq35bwc8",
      "parent_id": "UgyvM22sTTHQ-6RU0594AaABAg",
      "comment_type": "reply",
      "author": "@sumaiyaansari3154",
      "likes": 1,
      "published_at": "2018-08-13T14:25:55Z",
      "timestamp_refs": [],
      "text": "Deepanshu Aggarwal may be 😢",
      "parent_context": "Sir very very very much congratulation for your 200k subscribers"
    },
    {
      "comment_id": "UgyvM22sTTHQ-6RU0594AaABAg.8jidT3rxnrx8jtYA9wEkSx",
      "parent_id": "UgyvM22sTTHQ-6RU0594AaABAg",
      "comment_type": "reply",
      "author": "@deepanshu4694",
      "likes": 4,
      "published_at": "2018-08-13T14:28:48Z",
      "timestamp_refs": [],
      "text": "Sir please next vidio daliye please sir.🙏🙏🙏🙏🙏🙏🙏🙏🙏🙏🙏🙏🙏",
      "parent_context": "Sir very very very much congratulation for your 200k subscribers"
    },
    {
      "comment_id": "UgyvM22sTTHQ-6RU0594AaABAg.8jidT3rxnrx8jypuxHmJio",
      "parent_id": "UgyvM22sTTHQ-6RU0594AaABAg",
      "comment_type": "reply",
      "author": "@ujjwalkumardwiwedi4859",
      "likes": 0,
      "published_at": "2018-08-15T15:48:49Z",
      "timestamp_refs": [],
      "text": "https://youtu.be/4JJM2HfaVf0 sir ka Naya video",
      "parent_context": "Sir very very very much congratulation for your 200k subscribers"
    },
    {
      "comment_id": "UgyvM22sTTHQ-6RU0594AaABAg.8jidT3rxnrx8k4MtC4UeSo",
      "parent_id": "UgyvM22sTTHQ-6RU0594AaABAg",
      "comment_type": "reply",
      "author": "@umarhamzakhan4021",
      "likes": 0,
      "published_at": "2018-08-18T04:41:07Z",
      "timestamp_refs": [],
      "text": "sumaiya masood ... I guess sir KO time nahi milra hai video banane ka",
      "parent_context": "Sir very very very much congratulation for your 200k subscribers"
    },
    {
      "comment_id": "UgyvM22sTTHQ-6RU0594AaABAg.8jidT3rxnrx8k4up4zU1Oh",
      "parent_id": "UgyvM22sTTHQ-6RU0594AaABAg",
      "comment_type": "reply",
      "author": "@deepanshu4694",
      "likes": 1,
      "published_at": "2018-08-18T09:46:24Z",
      "timestamp_refs": [],
      "text": "Umar Hamza Khan may be",
      "parent_context": "Sir very very very much congratulation for your 200k subscribers"
    },
    {
      "comment_id": "UgyvM22sTTHQ-6RU0594AaABAg.8jidT3rxnrx8ku0qsvKAVX",
      "parent_id": "UgyvM22sTTHQ-6RU0594AaABAg",
      "comment_type": "reply",
      "author": "@ayushjha7106",
      "likes": 0,
      "published_at": "2018-09-07T15:28:19Z",
      "timestamp_refs": [],
      "text": "I also have the same problem",
      "parent_context": "Sir very very very much congratulation for your 200k subscribers"
    },
    {
      "comment_id": "UgyvM22sTTHQ-6RU0594AaABAg.8jidT3rxnrx8rt_JvdGXHE",
      "parent_id": "UgyvM22sTTHQ-6RU0594AaABAg",
      "comment_type": "reply",
      "author": "@FaizKhan-xo8hj",
      "likes": 0,
      "published_at": "2019-02-28T10:58:46Z",
      "timestamp_refs": [],
      "text": "Jaake dekh re recard mei 200k hai ya 900k",
      "parent_context": "Sir very very very much congratulation for your 200k subscribers"
    },
    {
      "comment_id": "Ugz0FejJ_OJ4Y-KhG7N4AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@furious7346",
      "likes": 24,
      "published_at": "2019-09-24T20:09:31Z",
      "timestamp_refs": [],
      "text": "There is still lack of teachers like you in big and very reputed institute like KVS Its just your effort which made me understand this chapter in depth",
      "parent_context": ""
    },
    {
      "comment_id": "UgwEjii2zT4okflE00N4AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@saurav_kr18",
      "likes": 82,
      "published_at": "2022-09-22T16:56:39Z",
      "timestamp_refs": [
        "01:43",
        "15:58",
        "16:45",
        "50:40"
      ],
      "text": "Hydrogen Bonding - 01:43 Types of H-bonding - 15:58 Intermolecular H-bonding- 16:45 Intramolecular H-bonding- 50:40",
      "parent_context": ""
    },
    {
      "comment_id": "UgwEjii2zT4okflE00N4AaABAg.9gHlGJXV7QY9iVCWFX-9C5",
      "parent_id": "UgwEjii2zT4okflE00N4AaABAg",
      "comment_type": "reply",
      "author": "@itsmekalyani14",
      "likes": 5,
      "published_at": "2022-11-16T15:16:24Z",
      "timestamp_refs": [],
      "text": "Was finding this only.. Thanx🙏👍",
      "parent_context": "Hydrogen Bonding - 01:43 Types of H-bonding - 15:58 Intermolecular H-bonding- 16:45 Intramolecular H-bonding- 50:40"
    },
    {
      "comment_id": "UgwEjii2zT4okflE00N4AaABAg.9gHlGJXV7QY9lsa-8ssEOL",
      "parent_id": "UgwEjii2zT4okflE00N4AaABAg",
      "comment_type": "reply",
      "author": "@gourav.0709",
      "likes": 1,
      "published_at": "2023-02-08T16:06:17Z",
      "timestamp_refs": [],
      "text": "Me ye chapter complete hogya kya? Or agar nahi hua to iske baad ke lecture kha h",
      "parent_context": "Hydrogen Bonding - 01:43 Types of H-bonding - 15:58 Intermolecular H-bonding- 16:45 Intramolecular H-bonding- 50:40"
    },
    {
      "comment_id": "UgwEjii2zT4okflE00N4AaABAg.9gHlGJXV7QY9lsaKAAotpr",
      "parent_id": "UgwEjii2zT4okflE00N4AaABAg",
      "comment_type": "reply",
      "author": "@saurav_kr18",
      "likes": 3,
      "published_at": "2023-02-08T16:09:10Z",
      "timestamp_refs": [],
      "text": "@gourav.0709 last video hi hai",
      "parent_context": "Hydrogen Bonding - 01:43 Types of H-bonding - 15:58 Intermolecular H-bonding- 16:45 Intramolecular H-bonding- 50:40"
    },
    {
      "comment_id": "UgxvLVTtqUcKB9TmRk14AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@DSAMPATH",
      "likes": 12,
      "published_at": "2019-03-13T11:17:41Z",
      "timestamp_refs": [],
      "text": "your fluency and knowledge is fantastic god bless",
      "parent_context": ""
    },
    {
      "comment_id": "Ugw9A6TDD2nN68J3ZgZ4AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@omgupta3375",
      "likes": 53,
      "published_at": "2020-09-18T15:42:51Z",
      "timestamp_refs": [],
      "text": "Nobel prize should be given to sir for excellence in teaching and reaching the minds of students",
      "parent_context": ""
    },
    {
      "comment_id": "Ugw9A6TDD2nN68J3ZgZ4AaABAg.9DkdLa_rOyE9Y4DoNP-4cL",
      "parent_id": "Ugw9A6TDD2nN68J3ZgZ4AaABAg",
      "comment_type": "reply",
      "author": "@uddan955",
      "likes": 0,
      "published_at": "2022-02-05T18:02:55Z",
      "timestamp_refs": [],
      "text": "*Vo din ab door nahi hai*",
      "parent_context": "Nobel prize should be given to sir for excellence in teaching and reaching the minds of students"
    },
    {
      "comment_id": "Ugw9A6TDD2nN68J3ZgZ4AaABAg.9DkdLa_rOyE9xSWjG3wGd4",
      "parent_id": "Ugw9A6TDD2nN68J3ZgZ4AaABAg",
      "comment_type": "reply",
      "author": "@tryesports9482",
      "likes": 0,
      "published_at": "2023-11-23T10:06:17Z",
      "timestamp_refs": [],
      "text": "Noble prize is too far",
      "parent_context": "Nobel prize should be given to sir for excellence in teaching and reaching the minds of students"
    },
    {
      "comment_id": "Ugxo7PONdiLYwP-SiFB4AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@ushagurung3119",
      "likes": 7,
      "published_at": "2020-10-10T07:01:56Z",
      "timestamp_refs": [],
      "text": "Sir,Hats off to your unique teaching way . Now I am clear about hydrogen bonding. Thanks a lot sir😃 Always be happy 😃😃❤",
      "parent_context": ""
    },
    {
      "comment_id": "UgyL7BUJ4Rd2327cGd14AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@ishabel_valentina",
      "likes": 8,
      "published_at": "2021-05-23T15:44:47Z",
      "timestamp_refs": [],
      "text": "Before going to watch the video I will dead sure from my heart that I will surely learn smthg new from this video... Thx dear respected Sir for making this one... 😍",
      "parent_context": ""
    },
    {
      "comment_id": "Ugzh5ZeQj5va7RiWymB4AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@mohsinnmitt5626",
      "likes": 72,
      "published_at": "2020-08-04T05:30:49Z",
      "timestamp_refs": [],
      "text": "I started my 11 th class in the mid session and i was very disheartened ‘ all the time I was thinking about my syllabus’ totally depressed . Thanks to alakh sir ......now I have completed 50% syllabus in just one month in chemistry, for free even. Thank you sir thanks again",
      "parent_context": ""
    },
    {
      "comment_id": "Ugzh5ZeQj5va7RiWymB4AaABAg.9BvfXXanPOM9DpNoOzpjMB",
      "parent_id": "Ugzh5ZeQj5va7RiWymB4AaABAg",
      "comment_type": "reply",
      "author": "@rajveerkaur4640",
      "likes": 5,
      "published_at": "2020-09-20T11:54:34Z",
      "timestamp_refs": [],
      "text": "Me too l started studying in August",
      "parent_context": "I started my 11 th class in the mid session and i was very disheartened ‘ all the time I was thinking about my syllabus’ totally depressed . Thanks to alakh sir ......now I have completed 50% syllabus in just one month in chemistry, for free even. Thank you sir thanks again"
    },
    {
      "comment_id": "Ugzh5ZeQj5va7RiWymB4AaABAg.9BvfXXanPOM9FsuojmL91e",
      "parent_id": "Ugzh5ZeQj5va7RiWymB4AaABAg",
      "comment_type": "reply",
      "author": "@manjuvij8807",
      "likes": 1,
      "published_at": "2020-11-10T13:52:14Z",
      "timestamp_refs": [],
      "text": "Try mcqhttps://www.youtube.com/playlist?list=PL-7DAAPdMJDxThJywnipCcA5DTHvsCYRt",
      "parent_context": "I started my 11 th class in the mid session and i was very disheartened ‘ all the time I was thinking about my syllabus’ totally depressed . Thanks to alakh sir ......now I have completed 50% syllabus in just one month in chemistry, for free even. Thank you sir thanks again"
    },
    {
      "comment_id": "Ugzh5ZeQj5va7RiWymB4AaABAg.9BvfXXanPOM9ISIVnrwxpb",
      "parent_id": "Ugzh5ZeQj5va7RiWymB4AaABAg",
      "comment_type": "reply",
      "author": "@electric_deer2007",
      "likes": 3,
      "published_at": "2021-01-13T10:03:24Z",
      "timestamp_refs": [],
      "text": "Hey bro I also have serious backlogs in 11 th please help me and tell me how you did it 🤕",
      "parent_context": "I started my 11 th class in the mid session and i was very disheartened ‘ all the time I was thinking about my syllabus’ totally depressed . Thanks to alakh sir ......now I have completed 50% syllabus in just one month in chemistry, for free even. Thank you sir thanks again"
    },
    {
      "comment_id": "UgyvqCl_BQO7FpRQi194AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@MULTIOBSERVER",
      "likes": 82,
      "published_at": "2018-08-11T09:11:58Z",
      "timestamp_refs": [],
      "text": "Dhanyabad for help the poors like me..i am always under your blessing...i cant understand in institute but your video is a bright future for me",
      "parent_context": ""
    },
    {
      "comment_id": "UgyvqCl_BQO7FpRQi194AaABAg.8jnpJiqSIN_8jvBQ4eSkRj",
      "parent_id": "UgyvqCl_BQO7FpRQi194AaABAg",
      "comment_type": "reply",
      "author": "@cricketfans4681",
      "likes": 0,
      "published_at": "2018-08-14T05:48:29Z",
      "timestamp_refs": [],
      "text": "Sushant Sahoo hgcffx",
      "parent_context": "Dhanyabad for help the poors like me..i am always under your blessing...i cant understand in institute but your video is a bright future for me"
    },
    {
      "comment_id": "UgyvqCl_BQO7FpRQi194AaABAg.8jnpJiqSIN_8k2O11U1Ptx",
      "parent_id": "UgyvqCl_BQO7FpRQi194AaABAg",
      "comment_type": "reply",
      "author": "@mbbsstudent515",
      "likes": 0,
      "published_at": "2018-08-17T10:12:35Z",
      "timestamp_refs": [],
      "text": "Neel Kamal of crse",
      "parent_context": "Dhanyabad for help the poors like me..i am always under your blessing...i cant understand in institute but your video is a bright future for me"
    },
    {
      "comment_id": "UgyvqCl_BQO7FpRQi194AaABAg.8jnpJiqSIN_8kIDsaedHND",
      "parent_id": "UgyvqCl_BQO7FpRQi194AaABAg",
      "comment_type": "reply",
      "author": "@vinodkumar-ju6pv",
      "likes": 1,
      "published_at": "2018-08-23T13:51:46Z",
      "timestamp_refs": [],
      "text": "Sir I love you",
      "parent_context": "Dhanyabad for help the poors like me..i am always under your blessing...i cant understand in institute but your video is a bright future for me"
    },
    {
      "comment_id": "UgyvqCl_BQO7FpRQi194AaABAg.8jnpJiqSIN_8kjc88PD27N",
      "parent_id": "UgyvqCl_BQO7FpRQi194AaABAg",
      "comment_type": "reply",
      "author": "@arshdeep011",
      "likes": 1,
      "published_at": "2018-09-03T14:31:12Z",
      "timestamp_refs": [],
      "text": "correct ...sir khud nahi jantee k vo kitna aehsaan kr rhe hai hum pr 😊😊😊😊😊😊😊👧👦💕💕",
      "parent_context": "Dhanyabad for help the poors like me..i am always under your blessing...i cant understand in institute but your video is a bright future for me"
    },
    {
      "comment_id": "UgyvqCl_BQO7FpRQi194AaABAg.8jnpJiqSIN_8kjcCWsHHmQ",
      "parent_id": "UgyvqCl_BQO7FpRQi194AaABAg",
      "comment_type": "reply",
      "author": "@arshdeep011",
      "likes": 0,
      "published_at": "2018-09-03T14:31:48Z",
      "timestamp_refs": [],
      "text": "jmma sahi gl aa ...school ch kush ni smjh lggda",
      "parent_context": "Dhanyabad for help the poors like me..i am always under your blessing...i cant understand in institute but your video is a bright future for me"
    },
    {
      "comment_id": "UgyvqCl_BQO7FpRQi194AaABAg.8jnpJiqSIN_8kjcXV9dzJo",
      "parent_id": "UgyvqCl_BQO7FpRQi194AaABAg",
      "comment_type": "reply",
      "author": "@mbbsstudent515",
      "likes": 0,
      "published_at": "2018-09-03T14:34:40Z",
      "timestamp_refs": [],
      "text": "Ar sH laungage is dogrii na 😄😄😄",
      "parent_context": "Dhanyabad for help the poors like me..i am always under your blessing...i cant understand in institute but your video is a bright future for me"
    },
    {
      "comment_id": "UgyvqCl_BQO7FpRQi194AaABAg.8jnpJiqSIN_8lUXv1bHysq",
      "parent_id": "UgyvqCl_BQO7FpRQi194AaABAg",
      "comment_type": "reply",
      "author": "@Debasmita.Chowdhury",
      "likes": 0,
      "published_at": "2018-09-22T05:09:08Z",
      "timestamp_refs": [],
      "text": "Arre sir ki pic bhi lga di tumne as dp😂",
      "parent_context": "Dhanyabad for help the poors like me..i am always under your blessing...i cant understand in institute but your video is a bright future for me"
    },
    {
      "comment_id": "UgxYx8DySjHNqnQ2wdp4AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@yashpandey8466",
      "likes": 9,
      "published_at": "2020-11-02T23:31:29Z",
      "timestamp_refs": [],
      "text": "The feeling is great after completing the whole series.......I am in 10th and is very effected by it . No words to explain your legendary teaching . Thanks a lot.......",
      "parent_context": ""
    },
    {
      "comment_id": "Ugwk2lfUSeaCgbHWCKd4AaABAg.AO0_fFArME-APBlGBm5g3q",
      "parent_id": "Ugwk2lfUSeaCgbHWCKd4AaABAg",
      "comment_type": "reply",
      "author": "@prelockgaming126",
      "likes": 1,
      "published_at": "2025-11-06T17:05:19Z",
      "timestamp_refs": [],
      "text": "are you alive?",
      "parent_context": "Today was our holiday so I completed whole playlist in one day 😵‍💫😵‍💫"
    },
    {
      "comment_id": "Ugz1PVdCyyS9T-BgKLx4AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@sanjanasisodia7276",
      "likes": 135,
      "published_at": "2020-08-15T12:23:45Z",
      "timestamp_refs": [],
      "text": "I completed 7 lectures of chemical bonding in just one day it is so hectic man!!!!",
      "parent_context": ""
    },
    {
      "comment_id": "Ugz1PVdCyyS9T-BgKLx4AaABAg.9CNjXYwRchG9FsuwVFgZXE",
      "parent_id": "Ugz1PVdCyyS9T-BgKLx4AaABAg",
      "comment_type": "reply",
      "author": "@manjuvij8807",
      "likes": 1,
      "published_at": "2020-11-10T13:53:17Z",
      "timestamp_refs": [],
      "text": "Try mcqhttps://www.youtube.com/playlist?list=PL-7DAAPdMJDxThJywnipCcA5DTHvsCYRt",
      "parent_context": "I completed 7 lectures of chemical bonding in just one day it is so hectic man!!!!"
    },
    {
      "comment_id": "Ugz1PVdCyyS9T-BgKLx4AaABAg.9CNjXYwRchG9MMjC3kCcl9",
      "parent_id": "Ugz1PVdCyyS9T-BgKLx4AaABAg",
      "comment_type": "reply",
      "author": "@Vaishnavisaalunke",
      "likes": 0,
      "published_at": "2021-04-20T16:15:31Z",
      "timestamp_refs": [],
      "text": "@88_18 Monika with notes??",
      "parent_context": "I completed 7 lectures of chemical bonding in just one day it is so hectic man!!!!"
    },
    {
      "comment_id": "Ugz1PVdCyyS9T-BgKLx4AaABAg.9CNjXYwRchG9NpiaZ8W1k8",
      "parent_id": "Ugz1PVdCyyS9T-BgKLx4AaABAg",
      "comment_type": "reply",
      "author": "@atharvjagadale8342",
      "likes": 1,
      "published_at": "2021-05-27T04:18:52Z",
      "timestamp_refs": [],
      "text": "Notes banaye kya ??",
      "parent_context": "I completed 7 lectures of chemical bonding in just one day it is so hectic man!!!!"
    },
    {
      "comment_id": "Ugz1PVdCyyS9T-BgKLx4AaABAg.9CNjXYwRchG9OXWNlOVwjK",
      "parent_id": "Ugz1PVdCyyS9T-BgKLx4AaABAg",
      "comment_type": "reply",
      "author": "@atharvjagadale8342",
      "likes": 0,
      "published_at": "2021-06-13T13:49:12Z",
      "timestamp_refs": [],
      "text": "@ajay2552 do you made notes ???? and in which standard you are learning ???",
      "parent_context": "I completed 7 lectures of chemical bonding in just one day it is so hectic man!!!!"
    },
    {
      "comment_id": "Ugz1PVdCyyS9T-BgKLx4AaABAg.9CNjXYwRchG9OcXjlYLSnW",
      "parent_id": "Ugz1PVdCyyS9T-BgKLx4AaABAg",
      "comment_type": "reply",
      "author": "@ajay2552",
      "likes": 3,
      "published_at": "2021-06-15T21:56:32Z",
      "timestamp_refs": [],
      "text": "@atharvjagadale8342 yes bro I made notes. And I am in class 12th right now. Not doing enough practice and Revision earlier is the only reason I have to watch these lectures again. Btw, tum konsi class me ho?",
      "parent_context": "I completed 7 lectures of chemical bonding in just one day it is so hectic man!!!!"
    },
    {
      "comment_id": "Ugz1PVdCyyS9T-BgKLx4AaABAg.9CNjXYwRchG9R0R52rDpry",
      "parent_id": "Ugz1PVdCyyS9T-BgKLx4AaABAg",
      "comment_type": "reply",
      "author": "@fullyfocussed3914",
      "likes": 2,
      "published_at": "2021-08-14T07:02:13Z",
      "timestamp_refs": [],
      "text": "It's of no use to complete these many lectures.....better complete 1 lecture(2 if possible).....make notes .....refer the same theory in ncert....revise.....then go for the other one.....!!!! This revision in between really connects the 2 lectures",
      "parent_context": "I completed 7 lectures of chemical bonding in just one day it is so hectic man!!!!"
    },
    {
      "comment_id": "UgxjoCA2AKUkIGbAAop4AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@riyagaur6138",
      "likes": 8,
      "published_at": "2020-11-19T01:23:36Z",
      "timestamp_refs": [],
      "text": "After 16 video seens finally chapter chemical bonding has been finished 😌and all doubt is clear ✌️✌️fantastic sir 👌 👌",
      "parent_context": ""
    },
    {
      "comment_id": "Ugw2101KPg-ZIDKehM14AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@anuduggal3522",
      "likes": 148,
      "published_at": "2019-10-30T04:25:29Z",
      "timestamp_refs": [],
      "text": "Ortho,meta,para.......O M Prakash my father's name😂😂😂😂😂funny itis..i hv to keep my father'name learnt",
      "parent_context": ""
    },
    {
      "comment_id": "UgyXGaDO3lNPeruZQPx4AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@ashuverma708",
      "likes": 11,
      "published_at": "2018-08-09T08:48:06Z",
      "timestamp_refs": [],
      "text": "Very very congratulation sirji for 200k subscribers ❤️",
      "parent_context": ""
    },
    {
      "comment_id": "UgwBAPp9PU10YfVoY514AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@niteswarsingh4574",
      "likes": 13,
      "published_at": "2019-08-30T14:44:09Z",
      "timestamp_refs": [],
      "text": "Sir....you deserve the name *knowledge wala* 😊😊...lots of thanks....thanks word bhi boht Chhota hai electron se bhi zyada😛 From siya😊😊",
      "parent_context": ""
    },
    {
      "comment_id": "UgwJhsr_zPcZ90F8XB54AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@AnshikaSingh-jz6yj",
      "likes": 6,
      "published_at": "2024-11-11T12:26:41Z",
      "timestamp_refs": [
        "15:11"
      ],
      "text": "15:11 nanga bhukha hydrogen😂😂",
      "parent_context": ""
    },
    {
      "comment_id": "UgyAGVXy-46Q9s1cE8Z4AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@rahuldutta3172",
      "likes": 57,
      "published_at": "2020-07-15T15:36:36Z",
      "timestamp_refs": [],
      "text": "Sir really deserves a Nobel Prize !!!",
      "parent_context": ""
    },
    {
      "comment_id": "UgxrEgjWnsDtg49fVH94AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@amazingtechnology9393",
      "likes": 43,
      "published_at": "2018-08-09T08:43:41Z",
      "timestamp_refs": [],
      "text": "Love you sirji. Like if you love sir ❤️",
      "parent_context": ""
    },
    {
      "comment_id": "Ugx5Uez5HOC4PkaVGbZ4AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@sajalsinghal7054",
      "likes": 4,
      "published_at": "2024-09-27T14:47:35Z",
      "timestamp_refs": [],
      "text": "i am making notes of all the chapters he taught and seriously and only chemical bbonding taught by him took 120 pages of my copy because i write everything he write and explains that is why he is the greatest teacher ever!!!!!!!!!!!",
      "parent_context": ""
    },
    {
      "comment_id": "Ugx6fkhpDsGhfESbJTB4AaABAg.8pupmvDnTNz9-AgvMBKwLy",
      "parent_id": "Ugx6fkhpDsGhfESbJTB4AaABAg",
      "comment_type": "reply",
      "author": "@suryanshsingh9492",
      "likes": 0,
      "published_at": "2019-09-22T08:02:40Z",
      "timestamp_refs": [],
      "text": "@rashikaworld5954 sun mne koi gaali ni di tere ko to jyada aith mt ye hamaray yaha cmon h baat krne kaa tarika lekin tere kyu kida kaat raa h itna Pakistaniyo k liye",
      "parent_context": "Sir from Pakistan watching your lectures u ar doing grt job"
    },
    {
      "comment_id": "Ugx6fkhpDsGhfESbJTB4AaABAg.8pupmvDnTNz98hQTvbomOD",
      "parent_id": "Ugx6fkhpDsGhfESbJTB4AaABAg",
      "comment_type": "reply",
      "author": "@prathameshpatil4759",
      "likes": 0,
      "published_at": "2020-05-16T03:06:58Z",
      "timestamp_refs": [],
      "text": "Education me bhi Kashmir aa Gaya ?",
      "parent_context": "Sir from Pakistan watching your lectures u ar doing grt job"
    },
    {
      "comment_id": "Ugx6fkhpDsGhfESbJTB4AaABAg.8pupmvDnTNz9Bd5xi1lL4t",
      "parent_id": "Ugx6fkhpDsGhfESbJTB4AaABAg",
      "comment_type": "reply",
      "author": "@thestudentsdiary8506",
      "likes": 0,
      "published_at": "2020-07-28T00:24:53Z",
      "timestamp_refs": [],
      "text": "@rahuldubey3988 😂 😂😂😂😂...who told u???....",
      "parent_context": "Sir from Pakistan watching your lectures u ar doing grt job"
    },
    {
      "comment_id": "UgyW9e6VydVVL9fwyZx4AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@akshichauhan3625",
      "likes": 8,
      "published_at": "2020-07-28T17:37:20Z",
      "timestamp_refs": [
        "1:42"
      ],
      "text": "1:42👈🤣🤣 Sir aap hi shambhaliye Vrna hm to bhaar me dab jaayenge itna bda kaam lekr Thankyou apne baccho ko is kaabil samajne k liye",
      "parent_context": ""
    },
    {
      "comment_id": "Ugy6qqdI8JhO1C449-h4AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@uknowme4_5",
      "likes": 69,
      "published_at": "2019-06-19T10:23:32Z",
      "timestamp_refs": [],
      "text": "You are Great sir recently today only I read this topic in a coaching of Kota and you taught the exactly same thing in a great manner and I am I am able to understand everything u taught very nicely and my doubt are also cleared so thank you very very very much sir I am a big fan of you. 👏👏👏",
      "parent_context": ""
    },
    {
      "comment_id": "Ugy6qqdI8JhO1C449-h4AaABAg.8wMKWv770DB8yK5_V-j9gF",
      "parent_id": "Ugy6qqdI8JhO1C449-h4AaABAg",
      "comment_type": "reply",
      "author": "@dipanjansaha7249",
      "likes": 2,
      "published_at": "2019-08-07T06:37:15Z",
      "timestamp_refs": [],
      "text": "Which batch? MAZS???",
      "parent_context": "You are Great sir recently today only I read this topic in a coaching of Kota and you taught the exactly same thing in a great manner and I am I am able to understand everything u taught very nicely and my doubt are also cleared so thank you very very very much sir I am a big fan of you. 👏👏👏"
    },
    {
      "comment_id": "Ugy6qqdI8JhO1C449-h4AaABAg.8wMKWv770DB9EaptWMz7HB",
      "parent_id": "Ugy6qqdI8JhO1C449-h4AaABAg",
      "comment_type": "reply",
      "author": "@shriyashpatil7247",
      "likes": 0,
      "published_at": "2020-10-09T16:51:28Z",
      "timestamp_refs": [],
      "text": "Kota mein back Bonding padhaya hoga na 😀 uski baat kyu nahi kiye 😂🤣 Alakh sir ke chamche 😂",
      "parent_context": "You are Great sir recently today only I read this topic in a coaching of Kota and you taught the exactly same thing in a great manner and I am I am able to understand everything u taught very nicely and my doubt are also cleared so thank you very very very much sir I am a big fan of you. 👏👏👏"
    },
    {
      "comment_id": "Ugy6qqdI8JhO1C449-h4AaABAg.8wMKWv770DB9EklhkFB9i7",
      "parent_id": "Ugy6qqdI8JhO1C449-h4AaABAg",
      "comment_type": "reply",
      "author": "@ssubhashini6121",
      "likes": 2,
      "published_at": "2020-10-13T13:27:19Z",
      "timestamp_refs": [],
      "text": "@shriyashpatil7247 kyu tumhe problem kya Hai? Har jagah back bonding back bonding likhe jaa rhe ho. Jo sir ne itna kuch itne acche se padhaya Hai so many students have reaped its benefit.. Your Kota coaching loots so much of money but still it cannot match up to alakh Sir 's exceptional level of teaching - isn't that the reason even you are here to watch sir' s videos? If you don't know how to appreciate, at least refrain from saying something this insensitive and insensible.",
      "parent_context": "You are Great sir recently today only I read this topic in a coaching of Kota and you taught the exactly same thing in a great manner and I am I am able to understand everything u taught very nicely and my doubt are also cleared so thank you very very very much sir I am a big fan of you. 👏👏👏"
    },
    {
      "comment_id": "UgydamDX1ehhleJw4Sx4AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@srijanchakraborty635",
      "likes": 4,
      "published_at": "2023-01-19T12:05:29Z",
      "timestamp_refs": [],
      "text": "After full Completing Chemical bond, Structure of atom, and Hydrocarbon, I feel Like a Chemistry master.. 😆😆 Thank you sir ❤️❤️",
      "parent_context": ""
    },
    {
      "comment_id": "Ugwc3n1ib7nXT5xbWmt4AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@ManjeetKaur-pp5hn",
      "likes": 10,
      "published_at": "2019-08-02T07:40:23Z",
      "timestamp_refs": [],
      "text": "Sir if possible toh hydrogen bonding ke ek video jisme ache ache questions ho plss krwaiyee ..",
      "parent_context": ""
    },
    {
      "comment_id": "UgwTPibtSl0sGBwBb-x4AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@parthiv.2330",
      "likes": 2,
      "published_at": "2022-02-14T18:25:34Z",
      "timestamp_refs": [],
      "text": "Thanks a lot sir. Mere offline institute waalo ne explain Nahi Kiya sirf translate Kiya but sir aapki wajah se har concept clear ho gaya. ❤️❤️",
      "parent_context": ""
    },
    {
      "comment_id": "Ugy2YMFCSgVhtmij8aV4AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@divyaayadav",
      "likes": 6,
      "published_at": "2020-07-21T11:05:40Z",
      "timestamp_refs": [
        "51:18"
      ],
      "text": "@51:18 pls sir don't apologize for anything you are giving bestest things to us for free of cost so plz don't apologize and plz don't make us feel embarrassed. Sir thanku ❤",
      "parent_context": ""
    },
    {
      "comment_id": "Ugx71WtD1MoqFiqzEzJ4AaABAg.9EjwxuwKDBC9En_lP9rbJi",
      "parent_id": "Ugx71WtD1MoqFiqzEzJ4AaABAg",
      "comment_type": "reply",
      "author": "@YashSingh-le8yi",
      "likes": 0,
      "published_at": "2020-10-14T15:40:40Z",
      "timestamp_refs": [],
      "text": "Hey in which lec. Sir taught Ortho,meta para???",
      "parent_context": "Sir aap ek aaise teacher ho jisse bina kabhi mile itna strong attachment ho gya aur ek hamare teacher jo daily milte hai unse aajtak n hua.😂😂😂"
    },
    {
      "comment_id": "UgxchRuJ3oxqw-Ke4nt4AaABAg.91vXBaNi2pQ946Ax-RwJKL",
      "parent_id": "UgxchRuJ3oxqw-Ke4nt4AaABAg",
      "comment_type": "reply",
      "author": "@mudotage8257",
      "likes": 0,
      "published_at": "2020-01-22T20:34:32Z",
      "timestamp_refs": [],
      "text": "do you need to read from ncert too or videos are enough?",
      "parent_context": "Chemical bonding has been such a long chapter. I am glad it's over."
    },
    {
      "comment_id": "UgyppLn9On50eFgtahB4AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@itmatters-rk6en",
      "likes": 4,
      "published_at": "2021-10-18T14:38:31Z",
      "timestamp_refs": [
        "34:26"
      ],
      "text": "@34:26 sir your efforts are valuable for us . This sound problem is nothing🙋🙋🙋",
      "parent_context": ""
    },
    {
      "comment_id": "UgzArFm92vyT0BrKctx4AaABAg.9jdOquumEvC9kfdbSRfzac",
      "parent_id": "UgzArFm92vyT0BrKctx4AaABAg",
      "comment_type": "reply",
      "author": "@swamipatil1525",
      "likes": 4,
      "published_at": "2023-01-09T18:56:21Z",
      "timestamp_refs": [],
      "text": "@tkgknight4000 yes Bhai mene bhi chemical bonding shuru se padhi alakh sir ke video se or ek bar ncert bhi padh li abhi mere 95% pyq solve ho rahe hai chemical bonding ke btw I am preparing for jee mains 2023 session 1☺️☺️☺️",
      "parent_context": "Chemical bonding 11th completed 🎉 What a journey! 🎉🎉❤️"
    },
    {
      "comment_id": "UgzArFm92vyT0BrKctx4AaABAg.9jdOquumEvC9kx7lgZObMH",
      "parent_id": "UgzArFm92vyT0BrKctx4AaABAg",
      "comment_type": "reply",
      "author": "@samaira2327",
      "likes": 0,
      "published_at": "2023-01-16T13:55:43Z",
      "timestamp_refs": [],
      "text": "Does this playlist of Sir completes every topic according to the latest syllabus?",
      "parent_context": "Chemical bonding 11th completed 🎉 What a journey! 🎉🎉❤️"
    },
    {
      "comment_id": "UgzArFm92vyT0BrKctx4AaABAg.9jdOquumEvC9mTfDm1jz3C",
      "parent_id": "UgzArFm92vyT0BrKctx4AaABAg",
      "comment_type": "reply",
      "author": "@SINGHJI-ne6is",
      "likes": 0,
      "published_at": "2023-02-23T11:03:07Z",
      "timestamp_refs": [],
      "text": "​​@swamipatil1525 do you know in our current syllabus Vander wall and Drago's Rule is deleted or not ?",
      "parent_context": "Chemical bonding 11th completed 🎉 What a journey! 🎉🎉❤️"
    },
    {
      "comment_id": "UgzArFm92vyT0BrKctx4AaABAg.9jdOquumEvC9mTfETVZi2z",
      "parent_id": "UgzArFm92vyT0BrKctx4AaABAg",
      "comment_type": "reply",
      "author": "@SINGHJI-ne6is",
      "likes": 0,
      "published_at": "2023-02-23T11:03:13Z",
      "timestamp_refs": [],
      "text": "​​@samaira2327 do you know in our current syllabus Vander wall and Drago's Rule is deleted or not ?",
      "parent_context": "Chemical bonding 11th completed 🎉 What a journey! 🎉🎉❤️"
    },
    {
      "comment_id": "UgzRxg6itypaX9a99954AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@afrasaeed2952",
      "likes": 9,
      "published_at": "2020-09-06T14:00:50Z",
      "timestamp_refs": [],
      "text": "when sir says \"soch k bolo\" i go fr the one m not sure with and thn it went correct '",
      "parent_context": ""
    },
    {
      "comment_id": "UgzpuiwlATx_B_p8ckV4AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@itz_bihari2314",
      "likes": 5,
      "published_at": "2022-12-08T04:13:33Z",
      "timestamp_refs": [],
      "text": "Sir jaise aap total chapters ka full video ek sath offload kiya h chemistry or physics ka waise maths ke liye koi option nhi h kya . Maat me bahut problem h sir PLZZ help me . I need your help🙏",
      "parent_context": ""
    },
    {
      "comment_id": "UgwBT0Nr7rJfIzQpYwV4AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@poonamkaushal7119",
      "likes": 4,
      "published_at": "2018-12-11T14:40:30Z",
      "timestamp_refs": [],
      "text": "Sir resonance video plzzzzzzzzzzz..humble request..and thanks AA Lott💓💓💓",
      "parent_context": ""
    },
    {
      "comment_id": "Ugw-5MA1pmpxSMSNEL94AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@souravthakur2129",
      "likes": 5,
      "published_at": "2022-12-31T18:34:12Z",
      "timestamp_refs": [
        "12:00"
      ],
      "text": "It's 12:00 Am on the 31st of December. Welcome to 2023 ... Watching your lecture, I am celebrating it .😅",
      "parent_context": ""
    },
    {
      "comment_id": "Ugwntzh0L_ORveZi8654AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@knowaboutuniverse4490",
      "likes": 50,
      "published_at": "2018-08-09T08:43:30Z",
      "timestamp_refs": [],
      "text": "Kuch resonance structure bhi bta do naa please..",
      "parent_context": ""
    },
    {
      "comment_id": "Ugwntzh0L_ORveZi8654AaABAg.8jicT_jXffO8r2VpkYSx_s",
      "parent_id": "Ugwntzh0L_ORveZi8654AaABAg",
      "comment_type": "reply",
      "author": "@amrit5679",
      "likes": 0,
      "published_at": "2019-02-07T11:00:34Z",
      "timestamp_refs": [],
      "text": "Bhai ye resonance structure chemical bonding ka hi part hai Kya?",
      "parent_context": "Kuch resonance structure bhi bta do naa please.."
    },
    {
      "comment_id": "UgxktGH-4ZKh5kDqnSV4AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@Amjadkhan-lm3ro",
      "likes": 4,
      "published_at": "2019-02-12T05:42:10Z",
      "timestamp_refs": [],
      "text": "Sir vsepr theory ke according h2o Ka shape ase nhe hog fir Apne ki bhi tarike se shape Bana ke H-bonding Kar Diya kase kya vsepr theory Galt hai kya sir",
      "parent_context": ""
    },
    {
      "comment_id": "UgxNeXSQePQh-L_eCnJ4AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@sauravdani9542",
      "likes": 7,
      "published_at": "2019-04-11T03:38:30Z",
      "timestamp_refs": [
        "33:46"
      ],
      "text": "33:46 pe Jo structure bane hai unme hydrogen dono taraf oxygen hai To 1st structure me stability jyada kase hai .. App ke acc. H bonding directly proportional to A and inversely proportional to B",
      "parent_context": ""
    },
    {
      "comment_id": "UgxNeXSQePQh-L_eCnJ4AaABAg.8tZwK4EwKAU8ujoMkx_h61",
      "parent_id": "UgxNeXSQePQh-L_eCnJ4AaABAg",
      "comment_type": "reply",
      "author": "@tanyatiwari8724",
      "likes": 4,
      "published_at": "2019-05-10T05:32:00Z",
      "timestamp_refs": [],
      "text": "Dono structures me 'B' ki position pe Oxyzen hai to wahan compare karne ka sawal hi nahi banta hai... Aur 'A' ki position pe Alcohol me O hai Amine me N hai To bcz O is more electronegative than N, strength of H-bond is more in alcohol than in amine",
      "parent_context": "33:46 pe Jo structure bane hai unme hydrogen dono taraf oxygen hai To 1st structure me stability jyada kase hai .. App ke acc. H bonding directly proportional to A and inversely proportional to B"
    },
    {
      "comment_id": "UgxNeXSQePQh-L_eCnJ4AaABAg.8tZwK4EwKAU9EEcUjI0SrU",
      "parent_id": "UgxNeXSQePQh-L_eCnJ4AaABAg",
      "comment_type": "reply",
      "author": "@arceus36",
      "likes": 0,
      "published_at": "2020-09-30T16:31:49Z",
      "timestamp_refs": [],
      "text": "@tanyatiwari8724 what do u mean sir told us that O-H----O has weak h bond than O-H----N how is that possible??",
      "parent_context": "33:46 pe Jo structure bane hai unme hydrogen dono taraf oxygen hai To 1st structure me stability jyada kase hai .. App ke acc. H bonding directly proportional to A and inversely proportional to B"
    },
    {
      "comment_id": "UgyLFbNQ_OZYSXuAIGB4AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@tameemkhan7490",
      "likes": 21,
      "published_at": "2019-11-02T07:44:48Z",
      "timestamp_refs": [],
      "text": "sir *resonance* and*backbonding* ?? I know goc me resonance topic cover kiya apne but wht bout backbonding ???",
      "parent_context": ""
    },
    {
      "comment_id": "UgxZWq_te2b_q5Ut-bJ4AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@harshrajput2737",
      "likes": 7,
      "published_at": "2021-01-10T03:58:47Z",
      "timestamp_refs": [],
      "text": "Sir resonance nahi karaya😭",
      "parent_context": ""
    },
    {
      "comment_id": "UgzXidkr8wR9NDXn7_d4AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@panjaban5794",
      "likes": 5,
      "published_at": "2022-12-07T14:33:16Z",
      "timestamp_refs": [],
      "text": "Can ortho n para Nitro phenol make h bond...",
      "parent_context": ""
    },
    {
      "comment_id": "UgwDmMHccg8ZjrhRGNl4AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@RAJSINGH-td4ti",
      "likes": 5,
      "published_at": "2018-09-08T09:15:30Z",
      "timestamp_refs": [],
      "text": "sir please resonance pe vidoe banaye please sir reply",
      "parent_context": ""
    },
    {
      "comment_id": "UgyvoUKm-xsqqPBxc4h4AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@Bebo_status786",
      "likes": 6,
      "published_at": "2022-08-12T09:48:03Z",
      "timestamp_refs": [],
      "text": "Who like YouTube videos pw more than pw app ? Alakh sir op ❣️❣️ I m from arjunna jee batch 11th",
      "parent_context": ""
    },
    {
      "comment_id": "Ugw536SbYVzcQ51XmoB4AaABAg.9yV--Htksg39yfnJjufZTa",
      "parent_id": "Ugw536SbYVzcQ51XmoB4AaABAg",
      "comment_type": "reply",
      "author": "@stratasphorte",
      "likes": 0,
      "published_at": "2023-12-23T19:40:43Z",
      "timestamp_refs": [],
      "text": "which batch bro? 1.0?",
      "parent_context": "I have already complete these chapter's on my pw batch but my concepts not goes well... Then I come to this channel and my all concepts clear... Alak sir is king of physics and chemistry..... I recommend these vedios to all neet aspirants... ❤❤❤❤❤... Lots of love from kashmir"
    },
    {
      "comment_id": "Ugw536SbYVzcQ51XmoB4AaABAg.9yV--Htksg39z0rWcx7Tr2",
      "parent_id": "Ugw536SbYVzcQ51XmoB4AaABAg",
      "comment_type": "reply",
      "author": "@urmmm-s8z",
      "likes": 0,
      "published_at": "2024-01-01T09:20:43Z",
      "timestamp_refs": [],
      "text": "@stratasphorte not worse but my physics not goes well... I will make my 12th strong inshallah..... Where are you from??",
      "parent_context": "I have already complete these chapter's on my pw batch but my concepts not goes well... Then I come to this channel and my all concepts clear... Alak sir is king of physics and chemistry..... I recommend these vedios to all neet aspirants... ❤❤❤❤❤... Lots of love from kashmir"
    },
    {
      "comment_id": "Ugw536SbYVzcQ51XmoB4AaABAg.9yV--Htksg39z1ToZKVMIe",
      "parent_id": "Ugw536SbYVzcQ51XmoB4AaABAg",
      "comment_type": "reply",
      "author": "@stratasphorte",
      "likes": 0,
      "published_at": "2024-01-01T15:04:05Z",
      "timestamp_refs": [],
      "text": "@urmmm-s8z u r from wch place? In Kashmir",
      "parent_context": "I have already complete these chapter's on my pw batch but my concepts not goes well... Then I come to this channel and my all concepts clear... Alak sir is king of physics and chemistry..... I recommend these vedios to all neet aspirants... ❤❤❤❤❤... Lots of love from kashmir"
    },
    {
      "comment_id": "Ugw536SbYVzcQ51XmoB4AaABAg.9yV--Htksg39z1_KJRQans",
      "parent_id": "Ugw536SbYVzcQ51XmoB4AaABAg",
      "comment_type": "reply",
      "author": "@stratasphorte",
      "likes": 0,
      "published_at": "2024-01-01T16:00:59Z",
      "timestamp_refs": [],
      "text": "@urmmm-s8z nice 😄 Soo . Wht else?",
      "parent_context": "I have already complete these chapter's on my pw batch but my concepts not goes well... Then I come to this channel and my all concepts clear... Alak sir is king of physics and chemistry..... I recommend these vedios to all neet aspirants... ❤❤❤❤❤... Lots of love from kashmir"
    },
    {
      "comment_id": "Ugyqe5COXFHVndz-iV94AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@akashdeepsain3232",
      "likes": 76,
      "published_at": "2022-12-17T21:18:37Z",
      "timestamp_refs": [
        "01:43",
        "15:58",
        "16:45",
        "50:40"
      ],
      "text": "Hydrogen Bonding - 01:43 Types of H-bonding - 15:58 Intermolecular H-bonding- 16:45 Intramolecular H-bonding- 50:40",
      "parent_context": ""
    },
    {
      "comment_id": "Ugyqe5COXFHVndz-iV94AaABAg.9jkfbGhiVtN9lsa2Zd0GJD",
      "parent_id": "Ugyqe5COXFHVndz-iV94AaABAg",
      "comment_type": "reply",
      "author": "@gourav.0709",
      "likes": 2,
      "published_at": "2023-02-08T16:06:45Z",
      "timestamp_refs": [],
      "text": "Me ye chapter complete hogya kya? Or agar nahi hua to iske baad ke lecture kha h",
      "parent_context": "Hydrogen Bonding - 01:43 Types of H-bonding - 15:58 Intermolecular H-bonding- 16:45 Intramolecular H-bonding- 50:40"
    },
    {
      "comment_id": "Ugz-99X3p3wDGkKvlpd4AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@pwian3091",
      "likes": 3,
      "published_at": "2023-03-11T10:51:03Z",
      "timestamp_refs": [
        "01:43",
        "15:58",
        "16:45",
        "50:40"
      ],
      "text": "TIMESTAMPS: Hydrogen Bonding - 01:43 Types of H-bonding - 15:58 Intermolecular H-bonding- 16:45 Intramolecular H-bonding- 50:40",
      "parent_context": ""
    },
    {
      "comment_id": "UgzPTxkMa4lYDSEvqgN4AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@shruttiarya5189",
      "likes": 4,
      "published_at": "2019-01-12T17:58:32Z",
      "timestamp_refs": [],
      "text": "When new chapters will come on ur website like hydrogen an heat",
      "parent_context": ""
    },
    {
      "comment_id": "UgwqNu3sSDNKfQzbGm14AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@maryammfatimah",
      "likes": 3,
      "published_at": "2024-02-23T16:48:44Z",
      "timestamp_refs": [],
      "text": "This lecture helped me to understand the reason of anamolous behaviour of water as well as a natural phenomenon❤️. Did it help you too??😃",
      "parent_context": ""
    },
    {
      "comment_id": "UgzTKNK51xPWH3OCB-l4AaABAg.9jUFRnFmgYa9ls_ykEPahX",
      "parent_id": "UgzTKNK51xPWH3OCB-l4AaABAg",
      "comment_type": "reply",
      "author": "@gourav.0709",
      "likes": 0,
      "published_at": "2023-02-08T16:06:06Z",
      "timestamp_refs": [],
      "text": "Me ye chapter complete hogya kya? Or agar nahi hua to iske baad ke lecture kha h",
      "parent_context": "2022-2023 who see whole playlists put in comment section"
    },
    {
      "comment_id": "UgzFxpihuseqZrCZXed4AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@sakshishukla0603",
      "likes": 5,
      "published_at": "2019-01-09T10:30:20Z",
      "timestamp_refs": [
        "15:10"
      ],
      "text": "15:10 nanga bhookha hydrogen 😂😂😂",
      "parent_context": ""
    },
    {
      "comment_id": "UgyNvK8kphYShyr-QaB4AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@laxmifor",
      "likes": 3,
      "published_at": "2023-04-20T10:10:13Z",
      "timestamp_refs": [],
      "text": "Can anyone tell me how to make these structures?",
      "parent_context": ""
    },
    {
      "comment_id": "UgxFBELoKgOMzzsLD714AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@Aryan-my5oo",
      "likes": 4,
      "published_at": "2021-02-17T14:45:04Z",
      "timestamp_refs": [],
      "text": "Tomorrow is my..final exam and I am watching this...to learn H- bond...😂😂😂",
      "parent_context": ""
    },
    {
      "comment_id": "UgxBOYzyX5odvdkY2tl4AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@supriya1919",
      "likes": 5,
      "published_at": "2020-08-10T16:33:58Z",
      "timestamp_refs": [],
      "text": "Best lecture on H-bond ever!!",
      "parent_context": ""
    },
    {
      "comment_id": "Ugw6uyKKzmRU57Gmz0h4AaABAg.9CV74Ie_QNj9DEJWQaw_I7",
      "parent_id": "Ugw6uyKKzmRU57Gmz0h4AaABAg",
      "comment_type": "reply",
      "author": "@mikeshinoda2093",
      "likes": 0,
      "published_at": "2020-09-05T17:05:53Z",
      "timestamp_refs": [],
      "text": "Ab agar 2020 mein comment kiya hai to koi 2019 mein thodi na dekh raha hoga?",
      "parent_context": "Who is watching this video in 2020😅😅 during lockdown"
    },
    {
      "comment_id": "Ugzgq7gyspltsGgh7rR4AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@kabeersahu3017",
      "likes": 33,
      "published_at": "2020-09-22T14:39:12Z",
      "timestamp_refs": [],
      "text": "I wish that the hydrogen bonds may break inside the body of people who 'dislike'!!!🤣🤣🤣 . . . . Ouch!😳",
      "parent_context": ""
    },
    {
      "comment_id": "Ugzgq7gyspltsGgh7rR4AaABAg.9DupEuSEkuI9Duqvs9MvfW",
      "parent_id": "Ugzgq7gyspltsGgh7rR4AaABAg",
      "comment_type": "reply",
      "author": "@kabeersahu3017",
      "likes": 1,
      "published_at": "2020-09-22T14:53:56Z",
      "timestamp_refs": [],
      "text": "Why people even dislike! If they cannot appreciated then plz don't demotivate!",
      "parent_context": "I wish that the hydrogen bonds may break inside the body of people who 'dislike'!!!🤣🤣🤣 . . . . Ouch!😳"
    },
    {
      "comment_id": "Ugy7a8fxVSI0B0zABYF4AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@Aarav.com007",
      "likes": 4,
      "published_at": "2025-09-16T10:35:08Z",
      "timestamp_refs": [
        "12:57"
      ],
      "text": "12:57 sir yeh kya tha",
      "parent_context": ""
    },
    {
      "comment_id": "UgxFbIF-Y26mcuMHxJR4AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@neil3817",
      "likes": 4,
      "published_at": "2025-10-27T15:32:38Z",
      "timestamp_refs": [],
      "text": "Kon 2027 me Jee denge?",
      "parent_context": ""
    },
    {
      "comment_id": "UgyWKysycmTTPAnGZUJ4AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@RandomGuy-vq3gd",
      "likes": 6,
      "published_at": "2019-05-24T11:24:12Z",
      "timestamp_refs": [
        "51:53"
      ],
      "text": "51:53 😂😂😂. OMPrakash reminds me of Om Prakash Mishra(The Horny Sotter).",
      "parent_context": ""
    },
    {
      "comment_id": "Ugw4-0VfcGnmyWuVn1x4AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@vgashuthoshreddyp3818",
      "likes": 2,
      "published_at": "2021-09-25T04:42:47Z",
      "timestamp_refs": [],
      "text": "best ever lecture on hydrogen bond",
      "parent_context": ""
    },
    {
      "comment_id": "Ugx2yFohDXCIPKtKfAp4AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@shikhayadav2281",
      "likes": 2,
      "published_at": "2025-10-08T12:27:33Z",
      "timestamp_refs": [],
      "text": "Nothing left just back bonding and banana bond 😊",
      "parent_context": ""
    },
    {
      "comment_id": "UgzrwfnLMYU20yK4-Gt4AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@Wasifaaly02",
      "likes": 2,
      "published_at": "2024-05-20T02:46:49Z",
      "timestamp_refs": [
        "14:42"
      ],
      "text": "14:42 most funny part sir at their best ....best teacher ......love from pakistan",
      "parent_context": ""
    },
    {
      "comment_id": "UgzrwfnLMYU20yK4-Gt4AaABAg.A3ddjAhipMSA6C_a7QuA1t",
      "parent_id": "UgzrwfnLMYU20yK4-Gt4AaABAg",
      "comment_type": "reply",
      "author": "@FrostWater3036",
      "likes": 0,
      "published_at": "2024-07-22T18:46:05Z",
      "timestamp_refs": [],
      "text": "Aapke yaha engineering exam hote hai kya?",
      "parent_context": "14:42 most funny part sir at their best ....best teacher ......love from pakistan"
    },
    {
      "comment_id": "UgyDbSBh4nTkMRzXMXp4AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@arvindjangid63",
      "likes": 21,
      "published_at": "2019-08-28T10:01:49Z",
      "timestamp_refs": [],
      "text": "Sir!!! Two topics missing hain. 1. Resonance and 2. Back bonding. Please in pr bhi video banaiye.",
      "parent_context": ""
    },
    {
      "comment_id": "UgyDbSBh4nTkMRzXMXp4AaABAg.8zAXg6-l6wU8zSSKZs_a6C",
      "parent_id": "UgyDbSBh4nTkMRzXMXp4AaABAg",
      "comment_type": "reply",
      "author": "@The.Equity.Empire",
      "likes": 2,
      "published_at": "2019-09-04T09:01:22Z",
      "timestamp_refs": [],
      "text": "P block me backbanding padhayege Or resonance organic mai",
      "parent_context": "Sir!!! Two topics missing hain. 1. Resonance and 2. Back bonding. Please in pr bhi video banaiye."
    },
    {
      "comment_id": "UgyDbSBh4nTkMRzXMXp4AaABAg.8zAXg6-l6wU8zlnnT9_21n",
      "parent_id": "UgyDbSBh4nTkMRzXMXp4AaABAg",
      "comment_type": "reply",
      "author": "@rashmikarogal8157",
      "likes": 2,
      "published_at": "2019-09-12T06:42:30Z",
      "timestamp_refs": [],
      "text": "Sir ne resonance ko organic mein complete kiya hain",
      "parent_context": "Sir!!! Two topics missing hain. 1. Resonance and 2. Back bonding. Please in pr bhi video banaiye."
    },
    {
      "comment_id": "UgwLOaH1u3IpEzEBiFZ4AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@coffin_sinu6869",
      "likes": 4,
      "published_at": "2018-08-17T06:34:34Z",
      "timestamp_refs": [],
      "text": "Sir apki videos nh aa rh 😭 Aap ki health thik hai na sir?",
      "parent_context": ""
    },
    {
      "comment_id": "UgwCUIRX_Jvaszn-89J4AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@abhi-23.25",
      "likes": 4,
      "published_at": "2018-10-13T01:17:14Z",
      "timestamp_refs": [],
      "text": "Sir aapne kaha jab chlorine carbon se electron Apni Taraf attract kar lega tab carbon highly electronegative ban jayega But other molecules Me To Aisa nahi ho raha tha jaise ki HF Jab F electron Apni Taraf khich raha tha tab hydrogen electropositive ban raha tha Jab ki Yahan carbon highly electronegative Ban Ja Raha hai Yeh Kaise sir",
      "parent_context": ""
    },
    {
      "comment_id": "UgwCUIRX_Jvaszn-89J4AaABAg.8mKC3ohylZg8szuNaHD22Z",
      "parent_id": "UgwCUIRX_Jvaszn-89J4AaABAg",
      "comment_type": "reply",
      "author": "@surajbaishya7566",
      "likes": 0,
      "published_at": "2019-03-27T18:29:36Z",
      "timestamp_refs": [],
      "text": "carbon is becoming E.N in respect to Hydrogen bt H-F meh hydrogen kitna bhi electro -ve ho jaega bt flourine ko beat nahi kar paega. hope ur doubt is cleared.",
      "parent_context": "Sir aapne kaha jab chlorine carbon se electron Apni Taraf attract kar lega tab carbon highly electronegative ban jayega But other molecules Me To Aisa nahi ho raha tha jaise ki HF Jab F electron Apni Taraf khich raha tha tab hydrogen electropositive ban raha tha Jab ki Yahan carbon highly electronegative Ban Ja Raha hai Yeh Kaise sir"
    },
    {
      "comment_id": "UgyB6wE6tIsAcjGmQk14AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@atifakhan5995",
      "likes": 14,
      "published_at": "2018-09-21T08:33:43Z",
      "timestamp_refs": [],
      "text": "Sir plzzz explain the structure of compounds like..... H3po4,H3po3,Nh4Cl",
      "parent_context": ""
    },
    {
      "comment_id": "Ugy4pLM34XVC_mu-Jh54AaABAg.9jew47bwR_99jwla0u3yTi",
      "parent_id": "Ugy4pLM34XVC_mu-Jh54AaABAg",
      "comment_type": "reply",
      "author": "@krishnaskid001",
      "likes": 0,
      "published_at": "2022-12-22T14:01:45Z",
      "timestamp_refs": [],
      "text": "why? is there any topic of it??? plz tell",
      "parent_context": "I am in bsc 1 yr...and watching the lecture"
    },
    {
      "comment_id": "UgxijmJs6tZIj8FsanB4AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@imn8848",
      "likes": 5,
      "published_at": "2018-08-13T13:21:14Z",
      "timestamp_refs": [],
      "text": "Sir I’m from Kota resonance and mostly your lecture is similar but a little inconsiderable content is missing",
      "parent_context": ""
    },
    {
      "comment_id": "UgxijmJs6tZIj8FsanB4AaABAg.8jtQRG1D2vp8k2m4L6tlAk",
      "parent_id": "UgxijmJs6tZIj8FsanB4AaABAg",
      "comment_type": "reply",
      "author": "@rajyadav1257",
      "likes": 2,
      "published_at": "2018-08-17T13:51:29Z",
      "timestamp_refs": [],
      "text": "sir ki videos kyon nhi aa rhi bhai ???",
      "parent_context": "Sir I’m from Kota resonance and mostly your lecture is similar but a little inconsiderable content is missing"
    },
    {
      "comment_id": "UgxijmJs6tZIj8FsanB4AaABAg.8jtQRG1D2vp8mcRyFSQ_-p",
      "parent_id": "UgxijmJs6tZIj8FsanB4AaABAg",
      "comment_type": "reply",
      "author": "@arjit5923",
      "likes": 0,
      "published_at": "2018-10-20T12:41:42Z",
      "timestamp_refs": [],
      "text": "@ashuverma708 inconsiderable content kya hota h?",
      "parent_context": "Sir I’m from Kota resonance and mostly your lecture is similar but a little inconsiderable content is missing"
    },
    {
      "comment_id": "UgxijmJs6tZIj8FsanB4AaABAg.8jtQRG1D2vp8mclNUFw3BX",
      "parent_id": "UgxijmJs6tZIj8FsanB4AaABAg",
      "comment_type": "reply",
      "author": "@arjit5923",
      "likes": 1,
      "published_at": "2018-10-20T15:40:03Z",
      "timestamp_refs": [],
      "text": "@ashuverma708 na k barabar kaunsa content hota h hassi mazak?",
      "parent_context": "Sir I’m from Kota resonance and mostly your lecture is similar but a little inconsiderable content is missing"
    },
    {
      "comment_id": "UgxijmJs6tZIj8FsanB4AaABAg.8jtQRG1D2vp8mclSf-KQiD",
      "parent_id": "UgxijmJs6tZIj8FsanB4AaABAg",
      "comment_type": "reply",
      "author": "@arjit5923",
      "likes": 0,
      "published_at": "2018-10-20T15:40:46Z",
      "timestamp_refs": [],
      "text": "@ashuverma708 waise aap kahi coaching kr rhe h jee ki?",
      "parent_context": "Sir I’m from Kota resonance and mostly your lecture is similar but a little inconsiderable content is missing"
    },
    {
      "comment_id": "Ugz_i2R4Ttb-ivgMHVV4AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@Purnachheda",
      "likes": 3,
      "published_at": "2021-06-28T06:22:34Z",
      "timestamp_refs": [],
      "text": "kyu beta Shambhal nhi gaya aagaya chat padhne 😅🙃🙂😋",
      "parent_context": ""
    },
    {
      "comment_id": "Ugy5STQixxrawENcKht4AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@KrishnaPatel-yz2fk",
      "likes": 3,
      "published_at": "2023-05-25T19:27:26Z",
      "timestamp_refs": [],
      "text": "Who all are alakh sir fan??",
      "parent_context": ""
    },
    {
      "comment_id": "Ugw1azTyPyLMQxYHrcR4AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@malharpatil157",
      "likes": 4,
      "published_at": "2021-10-17T15:32:23Z",
      "timestamp_refs": [
        "31:51"
      ],
      "text": "31:51 sir ion-dipole strength is more and nh4+ is dipole dipole interaction (h bond) thus ion dipole will be strong and hence more soluble",
      "parent_context": ""
    },
    {
      "comment_id": "UgxfjpBnzAYKpRQg9GN4AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@anujakulkarni2755",
      "likes": 4,
      "published_at": "2020-04-23T19:37:20Z",
      "timestamp_refs": [],
      "text": "Sometimes i feel that why the hell on earth did i join classes in this day age of Internet",
      "parent_context": ""
    },
    {
      "comment_id": "UgxfjpBnzAYKpRQg9GN4AaABAg.97nyXVoM1WH98snMrHiA7I",
      "parent_id": "UgxfjpBnzAYKpRQg9GN4AaABAg",
      "comment_type": "reply",
      "author": "@sarthakchauhan9797",
      "likes": 0,
      "published_at": "2020-05-20T13:07:21Z",
      "timestamp_refs": [],
      "text": "@Nareshkumar-jb7sn well... about what?",
      "parent_context": "Sometimes i feel that why the hell on earth did i join classes in this day age of Internet"
    },
    {
      "comment_id": "UgwDVeD_BGDxwp3IcGt4AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@mayne4672",
      "likes": 8,
      "published_at": "2020-07-30T20:00:56Z",
      "timestamp_refs": [
        "30:56"
      ],
      "text": "30:56 positive charge must be on \"CENTRAL\" atom",
      "parent_context": ""
    },
    {
      "comment_id": "UgwDVeD_BGDxwp3IcGt4AaABAg.9BkM86YQipa9BlXEMe2v0I",
      "parent_id": "UgwDVeD_BGDxwp3IcGt4AaABAg",
      "comment_type": "reply",
      "author": "@ASHJIN-kx9ho",
      "likes": 0,
      "published_at": "2020-07-31T06:57:09Z",
      "timestamp_refs": [],
      "text": "Why we can't apply fajans rule here at 36.12 to find out boiling point. Large the size of anion more will be the covalent nature. So less will be bp. So hf>hcl>HBR>HI why this answer is not correct",
      "parent_context": "30:56 positive charge must be on \"CENTRAL\" atom"
    },
    {
      "comment_id": "UgwDVeD_BGDxwp3IcGt4AaABAg.9BkM86YQipa9DbZDIx61G7",
      "parent_id": "UgwDVeD_BGDxwp3IcGt4AaABAg",
      "comment_type": "reply",
      "author": "@deepanshgupta7738",
      "likes": 0,
      "published_at": "2020-09-15T03:04:52Z",
      "timestamp_refs": [],
      "text": "@ASHJIN-kx9ho fazans rule khud ek exception hai",
      "parent_context": "30:56 positive charge must be on \"CENTRAL\" atom"
    },
    {
      "comment_id": "UgzjTlytMbCpBslJiN14AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@The_creativeroom",
      "likes": 6,
      "published_at": "2024-08-02T19:43:01Z",
      "timestamp_refs": [],
      "text": "Other teacher:- ye special case hai or exception hai yad krlo Le alakh sir:- ye special case hai chlo smjhte h ye kaise hua Difference bhayiii💀",
      "parent_context": ""
    },
    {
      "comment_id": "UgxBdbMERqBlgmWMjLB4AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@harshilramani2837",
      "likes": 13,
      "published_at": "2019-09-09T10:30:00Z",
      "timestamp_refs": [
        "9:31"
      ],
      "text": "9:31 Baki browser kholna bandh kro 😂😂😂😂",
      "parent_context": ""
    },
    {
      "comment_id": "UgyGystbncayGNTHp6R4AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@tanishq7366",
      "likes": 5,
      "published_at": "2018-08-13T04:23:03Z",
      "timestamp_refs": [],
      "text": "Sir next video kyun nahi aarahi?????",
      "parent_context": ""
    },
    {
      "comment_id": "Ugy161NqlJFpGqN_vHx4AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@kartik.aiimsdl7676",
      "likes": 4,
      "published_at": "2023-11-11T03:58:11Z",
      "timestamp_refs": [],
      "text": "Sir where is Resonance??",
      "parent_context": ""
    },
    {
      "comment_id": "Ugy161NqlJFpGqN_vHx4AaABAg.9wxy3j4arCt9xQW6s_cx46",
      "parent_id": "Ugy161NqlJFpGqN_vHx4AaABAg",
      "comment_type": "reply",
      "author": "@Sivic984",
      "likes": 1,
      "published_at": "2023-11-22T15:22:25Z",
      "timestamp_refs": [],
      "text": "Also bond parameters",
      "parent_context": "Sir where is Resonance??"
    },
    {
      "comment_id": "Ugy161NqlJFpGqN_vHx4AaABAg.9wxy3j4arCt9yOGbH2r-uK",
      "parent_id": "Ugy161NqlJFpGqN_vHx4AaABAg",
      "comment_type": "reply",
      "author": "@princerai9142",
      "likes": 0,
      "published_at": "2023-12-16T14:59:49Z",
      "timestamp_refs": [],
      "text": "​@Sivic984bond angle h",
      "parent_context": "Sir where is Resonance??"
    },
    {
      "comment_id": "Ugzq08r0FCWn-iSATyZ4AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@ak_atrey",
      "likes": 6,
      "published_at": "2018-08-09T12:47:14Z",
      "timestamp_refs": [],
      "text": "Sir .aapke Channel ka name ..Chemistry Wallah ..hona chahiye tha because you Tought ,chemistry well .. .........how many of you agree with me ????",
      "parent_context": ""
    },
    {
      "comment_id": "Ugzq08r0FCWn-iSATyZ4AaABAg.8jj3Md10Dt78jnzGIy-nIz",
      "parent_id": "Ugzq08r0FCWn-iSATyZ4AaABAg",
      "comment_type": "reply",
      "author": "@ashuverma708",
      "likes": 0,
      "published_at": "2018-08-11T10:38:52Z",
      "timestamp_refs": [],
      "text": "Q bhai physics kharab padhate kya haan?? All-rounder hona chahie",
      "parent_context": "Sir .aapke Channel ka name ..Chemistry Wallah ..hona chahiye tha because you Tought ,chemistry well .. .........how many of you agree with me ????"
    },
    {
      "comment_id": "UgyaSKSb5WjCj5KAKwZ4AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@maqsoodahmad6378",
      "likes": 1,
      "published_at": "2022-02-01T09:03:17Z",
      "timestamp_refs": [],
      "text": "Very good video . Really best video on hydrogen bonding.",
      "parent_context": ""
    },
    {
      "comment_id": "UgwS2wAamqS--iecbtN4AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@gkgamingforfun3156",
      "likes": 0,
      "published_at": "2024-09-13T04:40:03Z",
      "timestamp_refs": [],
      "text": "Finally watch full video parts 🎉🎉🎉🎉 clear all consept and doubt ❤❤❤❤❤❤",
      "parent_context": ""
    },
    {
      "comment_id": "Ugz0thIvXLvMClkF7oN4AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@carguy7480",
      "likes": 12,
      "published_at": "2019-11-27T12:20:15Z",
      "timestamp_refs": [
        "51:25"
      ],
      "text": "Timestamps: 51:25 Intramolecular H bonding",
      "parent_context": ""
    },
    {
      "comment_id": "Ugz0thIvXLvMClkF7oN4AaABAg.91q5rdiJewh9CXdQghTcB5",
      "parent_id": "Ugz0thIvXLvMClkF7oN4AaABAg",
      "comment_type": "reply",
      "author": "@kingsclubgaming2284",
      "likes": 3,
      "published_at": "2020-08-19T08:42:47Z",
      "timestamp_refs": [
        "16:30"
      ],
      "text": "At 16:30 types of h bond",
      "parent_context": "Timestamps: 51:25 Intramolecular H bonding"
    },
    {
      "comment_id": "UgwxgUGZKiaoejlpbdt4AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@anshulkumar8571",
      "likes": 10,
      "published_at": "2018-08-09T08:44:16Z",
      "timestamp_refs": [],
      "text": "sir ek video resonance pr bhi",
      "parent_context": ""
    },
    {
      "comment_id": "UgwxgUGZKiaoejlpbdt4AaABAg.8jicZ70xjiK8jimkHIRaIc",
      "parent_id": "UgwxgUGZKiaoejlpbdt4AaABAg",
      "comment_type": "reply",
      "author": "@harshitsingh3644",
      "likes": 1,
      "published_at": "2018-08-09T10:13:18Z",
      "timestamp_refs": [],
      "text": "Ekdam sahi hai bhai Sir ko ek vedio resonance me banana chahiye",
      "parent_context": "sir ek video resonance pr bhi"
    },
    {
      "comment_id": "UgygDurDvIxpEQ2X4XJ4AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@learnsomethinew",
      "likes": 4,
      "published_at": "2020-10-10T04:24:07Z",
      "timestamp_refs": [],
      "text": "There is exception of ur rule that en of b indirectly proportional to strength of h bond.. F - H -- F And F - H --O Among these FH H Bond has more strength than FHO",
      "parent_context": ""
    },
    {
      "comment_id": "UgzJsfBPfFxvdHhKgYV4AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@AnanyamankiMishra",
      "likes": 2,
      "published_at": "2022-02-24T13:44:03Z",
      "timestamp_refs": [],
      "text": "I think my friend's are hydrogen 🤣🤣🤣 Hamesa kuchh na kuchh chahiye hi rahta hai 🤣🤣",
      "parent_context": ""
    },
    {
      "comment_id": "UgzJsfBPfFxvdHhKgYV4AaABAg.9YpgHz_BpWA9Yux_02a11z",
      "parent_id": "UgzJsfBPfFxvdHhKgYV4AaABAg",
      "comment_type": "reply",
      "author": "@realsavarkar9380",
      "likes": 0,
      "published_at": "2022-02-26T14:51:16Z",
      "timestamp_refs": [],
      "text": "I think these lectures are more than enough for jee What do you think?",
      "parent_context": "I think my friend's are hydrogen 🤣🤣🤣 Hamesa kuchh na kuchh chahiye hi rahta hai 🤣🤣"
    },
    {
      "comment_id": "UgzTukwSU9SqnfIRU454AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@ZukhrufImran-r5g",
      "likes": 0,
      "published_at": "2025-02-06T08:04:42Z",
      "timestamp_refs": [],
      "text": "Best lecture ever on hydrogen bonding ❤ 🎉.",
      "parent_context": ""
    },
    {
      "comment_id": "UgxQUITK9dHKHJ8LDdZ4AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@SarP3145",
      "likes": 2,
      "published_at": "2022-01-03T17:11:38Z",
      "timestamp_refs": [
        "41:27"
      ],
      "text": "41:27 man this question always haunted me . Thanks for clearing it",
      "parent_context": ""
    },
    {
      "comment_id": "Ugy6u-z-T2CFKdocLyZ4AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@nidhiguptablr1981",
      "likes": 1,
      "published_at": "2021-12-11T12:49:25Z",
      "timestamp_refs": [],
      "text": "Love Hydrogen Bonding. Literally almost all exceptions of organic chemistry and some of inorganic as well is explained by Hydrogen Bonding 😅😄",
      "parent_context": ""
    },
    {
      "comment_id": "Ugy8lNyoUF_1LvGJTAp4AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@anjalimishra7824",
      "likes": 2,
      "published_at": "2021-08-12T09:25:41Z",
      "timestamp_refs": [],
      "text": "Sir , you haven't talked about the concept of resonance in any of your videos of this chapter but this topic is there in the ncert in this chapter only.",
      "parent_context": ""
    },
    {
      "comment_id": "UgzRiJTcR8tPqIIECmh4AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@divyanshbalodhi5642",
      "likes": 1,
      "published_at": "2022-08-02T23:43:48Z",
      "timestamp_refs": [],
      "text": "Mazaa aa gayaa sirji🙏",
      "parent_context": ""
    },
    {
      "comment_id": "UgwchwtFmgQ1hLSFMrJ4AaABAg",
      "parent_id": "",
      "comment_type": "comment",
      "author": "@varun1702",
      "likes": 3,
      "published_at": "2021-10-22T07:24:46Z",
      "timestamp_refs": [],
      "text": "Friends dont doubt for this to be the best video on H bond 😘",
      "parent_context": ""
    }
  ]
}

Now return one valid JSON object matching the schema intent.

--- END SIFT TASK ---
