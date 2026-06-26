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
