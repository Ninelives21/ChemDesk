## Thread Integrity Rule

A YouTube parent comment and its replies form one evidence unit.

Sift must never classify, rank, or summarize a retained Chemistry question, doubt, correction claim, or timestamp-specific signal before reviewing all replies available in the input.

### Bridge selection requirements

When a parent comment is selected for the `.chatgpt-input.md` because it contains a Chemistry signal, question, correction claim, timestamp, or useful resource-gap signal:

- include the parent comment;
- include all available replies to that parent;
- preserve `comment_id`, `parent_id`, reply order, likes, author, timestamps, and text.

Replies must be included even when they would not independently pass the bridge pre-selection rules. Sift, not the bridge pre-selector, decides whether each reply is useful or noise.

When a reply is selected independently, also include its parent comment and the available thread context.

Selection must therefore be thread-safe:

```text
selected parent → include complete available reply thread
selected reply → include parent + complete available reply thread
```

### Sift processing requirements

Before keeping or classifying a parent comment, inspect its reply thread for replies that:

- confirm the claimed issue;
- challenge or reject the claimed issue;
- suggest the parent commenter misunderstood the lecture;
- add Chemistry reasoning;
- provide another timestamp;
- mention that the teacher corrected the point later;
- clarify or narrow the original question;
- show repeated confusion or disagreement.

Preserve every reply that materially changes how CEE should interpret the parent signal.

Do not preserve replies that are only agreement, emojis, jokes, fights, thanks, or unrelated chatter.

### Interpretation rule

Replies are comment evidence only.

A reply may strengthen, weaken, challenge, or contextualize a student signal, but Sift must never treat the reply as Chemistry truth.

All Chemistry claims remain:

```text
truth_status: unverified
cee_verification_required: true
```

### Thread completeness rule

Sift must never silently treat a parent comment as fully reviewed when replies are known to exist but are absent from the bridge input.

When reply metadata indicates that replies exist but they were not supplied, mark the signal as having incomplete thread context and warn CEE that interpretation may change after reply review.

### Final validation rule

Before returning the JSON, verify:

- every retained parent question, doubt, or correction was checked against its available replies;
- substantive confirming replies were preserved;
- substantive challenging replies were preserved;
- replies that alter interpretation were reflected in the signal summary;
- no Chemistry truth was decided from either the parent or its replies;
- no retained signal with known missing replies was presented as thread-complete.
