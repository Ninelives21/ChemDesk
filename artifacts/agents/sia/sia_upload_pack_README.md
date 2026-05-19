# Sia Upload Pack README

Use these files when creating or updating Sia.

## Recommended upload files for Sia

1. `sia_system_intelligence_architect_spec.md`
   - Sia’s main instruction/spec file.
   - Most important file.

2. `chemdesk_master_context_sync.md`
   - Full project restart context.
   - Helps Sia understand ChemDesk’s broader goals, CEE, source strategy, design direction, RAG, app-readiness, and workflow.

3. `chemdesk_agent_ecosystem.md`
   - Focused agent-role reference.
   - Helps Sia stay within her boundaries and coordinate with CEE, Codex, QA, UI/UX, Source Research, and Content Editor.

## Optional later uploads

- `cee_full_master_spec.md`
- `source_research_agent_spec.md`
- `project_decisions_log.md`
- `architecture_decisions.md`

## What goes in Custom GPT Instructions vs Knowledge

Put Sia’s core behavior in the Instructions box.

Upload these files as Knowledge/reference material.

Rules/workflow behavior should not depend only on Knowledge files. If a rule is essential, include it in Instructions too.

## First test prompt

After creating Sia, ask:

```text
Sia, introduce yourself briefly and confirm your role in ChemDesk. Then list your non-negotiables for the ChemDesk architecture. Do not start designing yet.
```

Expected topics:

- stable IDs
- modular Chemistry data
- RAG-readiness
- app/PWA-readiness
- personalization/log readiness
- validation before publish
- draft/approved separation
- Codex briefs
- CEE owns Chemistry truth
