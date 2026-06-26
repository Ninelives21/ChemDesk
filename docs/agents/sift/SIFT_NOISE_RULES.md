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
