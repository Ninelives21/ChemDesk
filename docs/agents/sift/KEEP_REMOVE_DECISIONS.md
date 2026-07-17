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
