# Sift Input Contract

## Purpose

This file defines the standard input format that Sift expects when processing YouTube comments for ChemDesk.

Sift’s job is to convert raw student comments into useful, privacy-safe, ranked student signals for CEE.

Sift does not decide Chemistry truth.

---

## Required Input Packet

Every Sift task should include a Sift Input Packet with the following fields.

```yaml
task: process_youtube_comments_for_chemdesk

subject: chemistry

chapter_id: ''
lecture_id: ''
lecture_title: ''

source_video_url: ''

input_files:
  raw_comments_json: ''

output_files_required:
  final_markdown: ''
  final_json: ''

human_scrubbing_status: raw_unscrubbed
notes_availability: unknown
transcript_availability: unknown

sift_status: draft
```

## Default Values

If these fields are not supplied, Sift must use the following defaults:

```yaml
human_scrubbing_status: raw_unscrubbed
notes_availability: unknown
transcript_availability: unknown
sift_status: draft
```
