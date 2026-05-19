# ChemDesk Architecture

## Current Architecture Slice

Current slice:

- Slice 1: Foundation Skeleton

Goal:

Create a clean foundation before large Chemistry content is added.

## Core Principles

- Content must outlive the framework.
- Markdown/MDX explains.
- JSON/YAML connects.
- Stable IDs are sacred.
- Chemistry data must be modular.
- Draft and approved content must stay separate.
- Validation before publish.
- Theory first, PYQs later.
- Search before public RAG.
- App/PWA/personalization readiness must not be blocked.

## Main Folders

```text
src/        Astro pages, layouts, components, styles
content/    Chemistry notes, lectures, concepts, diagrams
data/       Shared metadata and navigation data
schemas/    JSON schemas for validation
scripts/    Validation and build helper scripts
tests/      Architecture and QA notes/checks
docs/       Architecture, publishing, validation documentation
artifacts/  Master specs, agent specs, decisions, workflows
```
