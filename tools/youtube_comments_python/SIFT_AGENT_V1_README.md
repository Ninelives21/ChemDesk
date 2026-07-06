# Sift Agent v1

## Files to place in repo

```text
tools/youtube_comments_python/sift_agent.py
tools/youtube_comments_python/requirements_sift_agent.txt
```

The script expects these to already exist:

```text
tools/youtube_comments_python/sift_agent_manifest_revised_paths.csv
docs/agents/sift/SIFT_AGENT_SPEC.md
docs/agents/sift/SIFT_LEARNED_KNOWLEDGE.md
docs/agents/sift/SIFT_NOISE_RULES.md
docs/agents/sift/SIFT_SIGNAL_RULES.md
docs/agents/sift/SIFT_OUTPUT_SCHEMA.json
docs/agents/sift/examples/KEEP_REMOVE_DECISIONS.md
```

## Install

From repo root:

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r tools/youtube_comments_python/requirements_sift_agent.txt
```

## Environment variables

```bash
export YOUTUBE_API_KEY="PASTE_YOUTUBE_API_KEY_HERE"
export OPENAI_API_KEY="PASTE_OPENAI_API_KEY_HERE"
```

Optional model override:

```bash
export OPENAI_MODEL="gpt-5.5"
```

## First dry run

```bash
python3 tools/youtube_comments_python/sift_agent.py \
  --lecture-id chemical-bonding-lecture-16 \
  --dry-run
```

## First safe real run: fetch raw only

```bash
python3 tools/youtube_comments_python/sift_agent.py \
  --lecture-id chemical-bonding-lecture-16 \
  --raw-only
```

## First full v1 run: raw JSON → scrubbed JSON

```bash
python3 tools/youtube_comments_python/sift_agent.py \
  --lecture-id chemical-bonding-lecture-16 \
  --reuse-raw
```

## Outputs

For the first Chemical Bonding v1 test, expected output path is based on the manifest row:

```text
content/01-physical/03-chemical-bonding-and-molecular-structure/lectures/lecture-16-hydrogen-bonding/comments/
```

The script saves:

```text
comments-16-hydrogen-bonding.raw.json
comments-16-hydrogen-bonding.scrubbed.json
```

It also creates/updates:

```text
tools/youtube_comments_python/sift_agent_status.csv
```

## Safety notes

- This v1 processes only one lecture per command.
- It does not generate public ChemDesk notes.
- It does not decide Chemistry truth.
- It refuses to overwrite files unless `--overwrite` is passed.
