// .setup-codex-task-1.mjs
// ChemDesk Codex Task 1 bootstrap + verifier
// Run from the ChemDesk workspace root:
//   node .setup-codex-task-1.mjs
//   node .setup-codex-task-1.mjs --check
//   node .setup-codex-task-1.mjs --force

import fs from 'node:fs';
import path from 'node:path';

const args = new Set(process.argv.slice(2));
const CHECK_ONLY = args.has('--check');
const FORCE = args.has('--force');

const root = process.cwd();

const files = {
	'content/README.md': `# ChemDesk Content

This folder stores portable Chemistry content.

Markdown/MDX explains.
JSON connects.

Do not place large monolithic Chemistry dumps here.
Do not hard-code student notes inside UI/layout files.
`,

	'content/physical/README.md': `# Physical Chemistry

Placeholder folder for Physical Chemistry chapters.

Do not add chapter content until the architecture and metadata pattern is approved.
`,

	'content/inorganic/README.md': `# Inorganic Chemistry

Inorganic Chemistry chapters live here.

Chemical Bonding is the first architecture sandbox.
`,

	'content/organic/README.md': `# Organic Chemistry

Placeholder folder for Organic Chemistry chapters.

Do not add chapter content yet.
`,

	'content/practical/README.md': `# Practical Chemistry

Placeholder folder for Practical Chemistry content.

Do not add chapter content yet.
`,

	'content/inorganic/chemical-bonding/README.md': `# Chemical Bonding

This is the first ChemDesk architecture sandbox chapter.

Rules:
- Keep notes in Markdown/MDX.
- Keep relationships and status metadata in JSON.
- Use stable IDs.
- Keep draft and approved content separate.
- Do not add PYQs yet.
- Do not publish draft material.
`,

	'content/inorganic/chemical-bonding/chapter.md': `---
chapter_id: chemical-bonding
title: Chemical Bonding
domain: inorganic
status: draft
---

# Chemical Bonding

Placeholder only.

Do not add Chemistry teaching content in Codex Task 1.
`,

	'content/inorganic/chemical-bonding/chapter.meta.json': `{
  "chapter_id": "chemical-bonding",
  "title": "Chemical Bonding",
  "domain": "inorganic",
  "status": "draft",
  "exam_scope": ["jee", "bitsat", "tg-eapcet", "cbse", "tgipe"],
  "source_status": "needs_review",
  "review_status": "not_started",
  "last_updated": "",
  "approved_by": "",
  "notes": "Placeholder metadata for Architecture Slice 1 / Codex Task 1."
}
`,

	'content/inorganic/chemical-bonding/concepts/README.md': `# Concepts

Concept-level MDX files will live here later.

Do not add Chemistry concepts in Codex Task 1.
`,

	'content/inorganic/chemical-bonding/formulas/README.md': `# Formulas

Formula metadata and formula-linked records will live here later.

Do not add real formulas in Codex Task 1.
`,

	'content/inorganic/chemical-bonding/formulas/formulas.json': `{
  "chapter_id": "chemical-bonding",
  "status": "draft",
  "items": []
}
`,

	'content/inorganic/chemical-bonding/reactions/README.md': `# Reactions

Reaction records will live here later if needed.

Do not add real reactions in Codex Task 1.
`,

	'content/inorganic/chemical-bonding/reactions/reactions.json': `{
  "chapter_id": "chemical-bonding",
  "status": "draft",
  "items": []
}
`,

	'content/inorganic/chemical-bonding/traps/README.md': `# Traps

Common misconception and exam-trap records will live here later.

Do not add Chemistry traps in Codex Task 1.
`,

	'content/inorganic/chemical-bonding/traps/traps.json': `{
  "chapter_id": "chemical-bonding",
  "status": "draft",
  "items": []
}
`,

	'content/inorganic/chemical-bonding/diagrams/README.md': `# Diagrams

Diagram metadata lives in diagrams.json.
Diagram assets live in images/.

Do not add real diagram files in Codex Task 1.
`,

	'content/inorganic/chemical-bonding/diagrams/diagrams.json': `{
  "chapter_id": "chemical-bonding",
  "status": "draft",
  "items": []
}
`,

	'content/inorganic/chemical-bonding/diagrams/images/README.md': `# Diagram Images

This folder keeps diagram image placeholders trackable in Git.

Do not add real diagram assets in Codex Task 1.
`,

	'content/inorganic/chemical-bonding/lectures/README.md': `# Chemical Bonding Lectures

Each lecture must live in its own folder.

Each lecture folder must contain its own images/ subfolder.

No shared dumping ground for lecture images.
`,

	'content/inorganic/chemical-bonding/lectures/lecture-01-intro-to-chemical-bonding/README.md': `# Lecture 01 — Intro to Chemical Bonding

Placeholder lecture folder.

This folder must keep its own images/ subfolder.
Do not add real Chemistry notes in Codex Task 1.
`,

	'content/inorganic/chemical-bonding/lectures/lecture-01-intro-to-chemical-bonding/index.mdx': `---
lecture_id: lecture-chemical-bonding-01
chapter_id: chemical-bonding
status: raw
---

# Lecture 01 — Intro to Chemical Bonding

Placeholder only.

Do not add Chemistry teaching content in Codex Task 1.
`,

	'content/inorganic/chemical-bonding/lectures/lecture-01-intro-to-chemical-bonding/lecture.meta.json': `{
  "lecture_id": "lecture-chemical-bonding-01",
  "chapter_id": "chemical-bonding",
  "lecture_number": 1,
  "title": "Intro to Chemical Bonding",
  "source_platform": "YouTube",
  "source_channel": "",
  "source_url": "",
  "primary_source": true,
  "status": "raw",
  "transcript_status": "not_started",
  "timestamp_map_status": "not_started",
  "concept_map_status": "not_started",
  "copyright_review_status": "needs_review",
  "notes": "Placeholder metadata only. Source details must be verified later by Source Research."
}
`,

	'content/inorganic/chemical-bonding/lectures/lecture-01-intro-to-chemical-bonding/transcript.md': `# Transcript

Placeholder only.

Do not paste or generate lecture transcript content in Codex Task 1.
`,

	'content/inorganic/chemical-bonding/lectures/lecture-01-intro-to-chemical-bonding/cee-notes.md': `# CEE Notes

Placeholder only.

CEE owns Chemistry interpretation later.
Do not add Chemistry notes in Codex Task 1.
`,

	'content/inorganic/chemical-bonding/lectures/lecture-01-intro-to-chemical-bonding/images/README.md': `# Lecture 01 Images

This folder is reserved for Lecture 01 images only.

No shared lecture-image dumping ground.
Do not add real images in Codex Task 1.
`,

	'content/inorganic/chemical-bonding/lectures/_lecture-template/README.md': `# Lecture Template

Copy this folder when creating a new lecture folder.

Every lecture folder must include:
- index.mdx
- lecture.meta.json
- transcript.md
- cee-notes.md
- images/
`,

	'content/inorganic/chemical-bonding/lectures/_lecture-template/index.mdx': `---
lecture_id: ""
chapter_id: chemical-bonding
status: raw
---

# Lecture Template

Placeholder only.

Replace metadata when creating a real lecture folder.
`,

	'content/inorganic/chemical-bonding/lectures/_lecture-template/lecture.meta.json': `{
  "lecture_id": "",
  "chapter_id": "chemical-bonding",
  "lecture_number": "",
  "title": "",
  "source_platform": "YouTube",
  "source_channel": "",
  "source_url": "",
  "primary_source": true,
  "status": "raw",
  "transcript_status": "not_started",
  "timestamp_map_status": "not_started",
  "concept_map_status": "not_started",
  "copyright_review_status": "needs_review",
  "notes": "Template metadata. Replace values before use."
}
`,

	'content/inorganic/chemical-bonding/lectures/_lecture-template/transcript.md': `# Transcript

Placeholder only.

Do not paste transcript content here unless source workflow allows it.
`,

	'content/inorganic/chemical-bonding/lectures/_lecture-template/cee-notes.md': `# CEE Notes

Placeholder only.

CEE-owned interpretation will go here later.
`,

	'content/inorganic/chemical-bonding/lectures/_lecture-template/images/README.md': `# Lecture Images

Each lecture must keep images inside its own images/ folder.

Do not use a shared image dumping folder.
`,

	'content/inorganic/chemical-bonding/syllabus-map/README.md': `# Syllabus Map

Syllabus relationship files will live here.

Do not add official syllabus mappings until Source Research verifies sources.
`,

	'content/inorganic/chemical-bonding/syllabus-map/syllabus-map.json': `{
  "chapter_id": "chemical-bonding",
  "status": "draft",
  "items": []
}
`,

	'content/inorganic/chemical-bonding/source-status/README.md': `# Source Status

Source verification metadata lives here.

Source Research owns source verification later.
`,

	'content/inorganic/chemical-bonding/source-status/source-status.json': `{
  "chapter_id": "chemical-bonding",
  "status": "needs_review",
  "sources": []
}
`,

	'content/inorganic/chemical-bonding/review/README.md': `# Review Status

Review and approval metadata lives here.

Draft content must not be treated as public content.
`,

	'content/inorganic/chemical-bonding/review/review-status.json': `{
  "chapter_id": "chemical-bonding",
  "overall_status": "draft",
  "cee_review": "not_started",
  "content_editor_review": "not_started",
  "source_research_review": "not_started",
  "qa_review": "not_started",
  "user_approval": "not_started",
  "notes": []
}
`,

	'data/README.md': `# ChemDesk Data

This folder stores site-level structured data.

Use this for exams, navigation, route metadata, and status labels.
Do not store large Chemistry content dumps here.
`,

	'data/exams.json': `{
  "items": [
    {
      "exam_id": "jee",
      "title": "JEE",
      "status": "draft"
    },
    {
      "exam_id": "bitsat",
      "title": "BITSAT",
      "status": "draft"
    },
    {
      "exam_id": "tg-eapcet",
      "title": "TG EAPCET",
      "status": "draft"
    },
    {
      "exam_id": "cbse",
      "title": "CBSE",
      "status": "draft"
    },
    {
      "exam_id": "tgipe",
      "title": "TGIPE",
      "status": "draft"
    }
  ]
}
`,

	'data/navigation.json': `{
  "status": "draft",
  "items": []
}
`,

	'data/routes.json': `{
  "status": "draft",
  "items": []
}
`,

	'data/status-labels.json': `{
  "allowed_statuses": [
    "raw",
    "draft",
    "cee_processed",
    "user_reviewed",
    "approved",
    "published",
    "deprecated",
    "needs_update"
  ],
  "public_allowed_statuses": [
    "approved",
    "published"
  ]
}
`,

	'schemas/README.md': `# Schemas

Schema files will define required metadata fields later.

Codex Task 1 creates placeholders only.
Do not implement full validation yet.
`,

	'schemas/chapter.schema.json': `{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "title": "ChemDesk Chapter Metadata Schema",
  "type": "object",
  "description": "Placeholder schema. Full validation comes later."
}
`,

	'schemas/concept.schema.json': `{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "title": "ChemDesk Concept Metadata Schema",
  "type": "object",
  "description": "Placeholder schema. Full validation comes later."
}
`,

	'schemas/diagram.schema.json': `{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "title": "ChemDesk Diagram Metadata Schema",
  "type": "object",
  "description": "Placeholder schema. Full validation comes later."
}
`,

	'schemas/lecture.schema.json': `{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "title": "ChemDesk Lecture Metadata Schema",
  "type": "object",
  "description": "Placeholder schema. Full validation comes later."
}
`,

	'schemas/review.schema.json': `{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "title": "ChemDesk Review Metadata Schema",
  "type": "object",
  "description": "Placeholder schema. Full validation comes later."
}
`,

	'schemas/source.schema.json': `{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "title": "ChemDesk Source Metadata Schema",
  "type": "object",
  "description": "Placeholder schema. Full validation comes later."
}
`,

	'scripts/README.md': `# Scripts

Validation and utility scripts will live here later.

Do not implement validation scripts in Codex Task 1.
`,

	'docs/README.md': `# ChemDesk Docs

Project architecture, publishing rules, validation rules, and implementation notes live here.
`,

	'docs/architecture.md': `# ChemDesk Architecture

Placeholder for architecture documentation.

Core principles:
- Content must outlive the framework.
- Markdown/MDX explains.
- JSON connects.
- Stable IDs are required.
- Draft and approved content stay separate.
- Public RAG must use only approved/published content.
`,

	'docs/publishing-rules.md': `# Publishing Rules

Placeholder for publishing workflow.

Initial rule:
No draft, raw, needs_update, deprecated, or unreviewed content should be treated as public-ready.
`,

	'docs/validation-rules.md': `# Validation Rules

Placeholder for future validation rules.

Future checks will include:
- duplicate IDs
- invalid ID formats
- missing status
- broken relationships
- missing source status
- lecture folders missing images/
- draft content exposed publicly
`,

	'artifacts/README.md': `# Artifacts

This folder stores long-term ChemDesk project memory.

Use it for master context, agent specs, architecture decisions, workflows, and handoff notes.
`,

	'artifacts/master-context/README.md': `# Master Context

Store project-wide context sync files here.
`,

	'artifacts/agents/README.md': `# Agents

Store agent specs and role-boundary documents here.
`,

	'artifacts/decisions/README.md': `# Decisions

Store architecture decision records here.
`,

	'artifacts/decisions/architecture_decisions.md': `# ChemDesk Architecture Decisions

## ADR 0001 — Foundation folder skeleton

Status: Proposed

Decision:
Create a minimal folder-first ChemDesk foundation before Astro setup, UI pages, validation scripts, or Chemistry content.

Reason:
This protects stable IDs, modular content, draft/approved separation, source-status tracking, and future app/RAG readiness before scale.
`,

	'artifacts/workflows/README.md': `# Workflows

Store workflow notes for CEE, Source Research, Content Editor, Codex, QA, and user approval here.
`,
};

const forbiddenPaths = [
	'src',
	'astro.config.mjs',
	'package.json',
	'package-lock.json',
	'pnpm-lock.yaml',
	'yarn.lock',
];

function normalizeContent(value) {
	return value.replace(/\r\n/g, '\n');
}

function ensureDir(dirPath) {
	fs.mkdirSync(dirPath, { recursive: true });
}

function writeExpectedFile(relativePath, content) {
	const absolutePath = path.join(root, relativePath);
	ensureDir(path.dirname(absolutePath));

	if (fs.existsSync(absolutePath) && !FORCE) {
		return { path: relativePath, action: 'skipped-existing' };
	}

	fs.writeFileSync(absolutePath, content, 'utf8');
	return {
		path: relativePath,
		action: fs.existsSync(absolutePath) ? 'written' : 'created',
	};
}

function createFiles() {
	const results = [];

	for (const [relativePath, content] of Object.entries(files)) {
		results.push(writeExpectedFile(relativePath, content));
	}

	return results;
}

function verifyFiles() {
	const missing = [];
	const mismatched = [];
	const invalidJson = [];
	const forbiddenExisting = [];

	for (const forbidden of forbiddenPaths) {
		const absoluteForbiddenPath = path.join(root, forbidden);
		if (fs.existsSync(absoluteForbiddenPath)) {
			forbiddenExisting.push(forbidden);
		}
	}

	for (const [relativePath, expectedContent] of Object.entries(files)) {
		const absolutePath = path.join(root, relativePath);

		if (!fs.existsSync(absolutePath)) {
			missing.push(relativePath);
			continue;
		}

		const actualContent = normalizeContent(
			fs.readFileSync(absolutePath, 'utf8'),
		);
		const normalizedExpected = normalizeContent(expectedContent);

		if (actualContent !== normalizedExpected) {
			mismatched.push(relativePath);
		}

		if (relativePath.endsWith('.json')) {
			try {
				JSON.parse(actualContent);
			} catch (error) {
				invalidJson.push(`${relativePath}: ${error.message}`);
			}
		}
	}

	return {
		missing,
		mismatched,
		invalidJson,
		forbiddenExisting,
		ok:
			missing.length === 0 &&
			mismatched.length === 0 &&
			invalidJson.length === 0 &&
			forbiddenExisting.length === 0,
	};
}

function printCreateSummary(results) {
	const skipped = results.filter(
		item => item.action === 'skipped-existing',
	).length;
	const written = results.length - skipped;

	console.log('');
	console.log('ChemDesk Codex Task 1 bootstrap complete.');
	console.log(`Files expected: ${Object.keys(files).length}`);
	console.log(`Files written/created: ${written}`);
	console.log(`Existing files skipped: ${skipped}`);

	if (skipped > 0) {
		console.log('');
		console.log('Some files already existed and were not overwritten.');
		console.log(
			'Run with --force to overwrite placeholders with the exact expected content:',
		);
		console.log('  node .setup-codex-task-1.mjs --force');
	}
}

function printVerifySummary(report) {
	console.log('');
	console.log('ChemDesk Codex Task 1 verification');
	console.log('----------------------------------');

	if (report.ok) {
		console.log(
			'PASS: All expected folders/files exist and placeholder contents match.',
		);
		console.log('PASS: JSON placeholder files are valid JSON.');
		console.log('PASS: No forbidden Astro/UI setup files were detected.');
		return;
	}

	console.log('FAIL: Verification found issues.');

	if (report.missing.length > 0) {
		console.log('');
		console.log('Missing files:');
		for (const item of report.missing) console.log(`- ${item}`);
	}

	if (report.mismatched.length > 0) {
		console.log('');
		console.log('Files with content differences:');
		for (const item of report.mismatched) console.log(`- ${item}`);
	}

	if (report.invalidJson.length > 0) {
		console.log('');
		console.log('Invalid JSON files:');
		for (const item of report.invalidJson) console.log(`- ${item}`);
	}

	if (report.forbiddenExisting.length > 0) {
		console.log('');
		console.log('Forbidden files/folders detected for Codex Task 1:');
		for (const item of report.forbiddenExisting) console.log(`- ${item}`);
		console.log('');
		console.log(
			'Codex Task 1 should not set up Astro, UI pages, package files, or src/ yet.',
		);
	}

	console.log('');
	console.log('To repair placeholder content, run:');
	console.log('  node .setup-codex-task-1.mjs --force');
	process.exitCode = 1;
}

if (CHECK_ONLY) {
	const report = verifyFiles();
	printVerifySummary(report);
} else {
	const results = createFiles();
	printCreateSummary(results);

	const report = verifyFiles();
	printVerifySummary(report);
}
