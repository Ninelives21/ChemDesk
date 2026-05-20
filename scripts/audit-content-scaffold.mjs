// scripts/audit-content-scaffold.mjs
// ChemDesk Content Scaffold Audit
//
// Run from ChemDesk repo root:
//   node scripts/audit-content-scaffold.mjs
//
// Purpose:
// Verify the folder + metadata scaffold created from Master Lectures.
// This script does not create, delete, or modify files.

import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const CONTENT_ROOT = path.join(ROOT, 'content');

const EXPECTED = {
	chapterMetaCount: 25,
	lectureMetaCount: 242,
	imageGitkeepCount: 267,
	canonicalChemicalBondingPath: 'content/inorganic/chemical-bonding',
	forbiddenChemicalBondingPath:
		'content/physical/chemical-bonding-and-molecular-structure',
	replaceOnlyChapters: [
		'content/inorganic/p-block-elements',
		'content/inorganic/d-and-f-block-elements',
		'content/inorganic/coordination-compounds',
	],
};

const errors = [];
const warnings = [];

function rel(filePath) {
	return path.relative(ROOT, filePath).replaceAll(path.sep, '/');
}

function exists(relativePath) {
	return fs.existsSync(path.join(ROOT, relativePath));
}

function walk(dirPath) {
	if (!fs.existsSync(dirPath)) return [];

	const results = [];

	for (const entry of fs.readdirSync(dirPath, { withFileTypes: true })) {
		const fullPath = path.join(dirPath, entry.name);
		results.push(fullPath);

		if (entry.isDirectory()) {
			results.push(...walk(fullPath));
		}
	}

	return results;
}

function readJson(filePath) {
	try {
		return JSON.parse(fs.readFileSync(filePath, 'utf8'));
	} catch (error) {
		errors.push(`Invalid JSON: ${rel(filePath)} — ${error.message}`);
		return null;
	}
}

function countByBasename(files, basename) {
	return files.filter(filePath => path.basename(filePath) === basename).length;
}

function countImageGitkeeps(files) {
	return files.filter(filePath => {
		const normalized = rel(filePath);
		return normalized.endsWith('/images/.gitkeep');
	}).length;
}

function assertEqual(label, actual, expected) {
	if (actual !== expected) {
		errors.push(`${label}: expected ${expected}, found ${actual}`);
	}
}

function auditContentRoot() {
	if (!fs.existsSync(CONTENT_ROOT)) {
		errors.push('Missing content/ folder.');
		return [];
	}

	return walk(CONTENT_ROOT);
}

function auditExpectedCounts(files) {
	const chapterMetaCount = countByBasename(files, 'chapter.meta.json');
	const lectureMetaCount = countByBasename(files, 'lecture.meta.json');
	const imageGitkeepCount = countImageGitkeeps(files);

	assertEqual(
		'chapter.meta.json count',
		chapterMetaCount,
		EXPECTED.chapterMetaCount,
	);

	assertEqual(
		'lecture.meta.json count',
		lectureMetaCount,
		EXPECTED.lectureMetaCount,
	);

	assertEqual(
		'images/.gitkeep count',
		imageGitkeepCount,
		EXPECTED.imageGitkeepCount,
	);
}

function auditChemicalBondingPlacement(files) {
	if (!exists(EXPECTED.canonicalChemicalBondingPath)) {
		errors.push(
			`Missing canonical Chemical Bonding path: ${EXPECTED.canonicalChemicalBondingPath}`,
		);
	}

	if (exists(EXPECTED.forbiddenChemicalBondingPath)) {
		errors.push(
			`Forbidden duplicate Chemical Bonding path exists: ${EXPECTED.forbiddenChemicalBondingPath}`,
		);
	}

	const badChemicalBondingFiles = files
		.map(rel)
		.filter(filePath =>
			filePath.includes('physical/chemical-bonding-and-molecular-structure'),
		);

	if (badChemicalBondingFiles.length > 0) {
		errors.push(
			`Found ${badChemicalBondingFiles.length} Chemical Bonding files under Physical Chemistry.`,
		);
	}
}

function auditReplaceOnlyChapters() {
	for (const chapterPath of EXPECTED.replaceOnlyChapters) {
		if (!exists(chapterPath)) {
			errors.push(`Missing replace-standardize chapter folder: ${chapterPath}`);
			continue;
		}

		if (!exists(`${chapterPath}/chapter.meta.json`)) {
			errors.push(`Missing chapter.meta.json: ${chapterPath}`);
		}

		if (!exists(`${chapterPath}/images/.gitkeep`)) {
			errors.push(`Missing images/.gitkeep: ${chapterPath}`);
		}

		if (exists(`${chapterPath}/lectures`)) {
			errors.push(
				`Replace-standardize chapter should not have lectures/: ${chapterPath}`,
			);
		}
	}
}

function auditChapterFolders(files) {
	const chapterMetaFiles = files.filter(
		filePath => path.basename(filePath) === 'chapter.meta.json',
	);

	const chapterIds = new Map();

	for (const metaPath of chapterMetaFiles) {
		const chapterDir = path.dirname(metaPath);
		const chapterRel = rel(chapterDir);

		if (!fs.existsSync(path.join(chapterDir, 'images', '.gitkeep'))) {
			errors.push(`Missing chapter images/.gitkeep: ${chapterRel}`);
		}

		const meta = readJson(metaPath);
		if (!meta) continue;

		if (!meta.chapter_id) {
			errors.push(`Missing chapter_id in ${rel(metaPath)}`);
		} else if (chapterIds.has(meta.chapter_id)) {
			errors.push(
				`Duplicate chapter_id "${meta.chapter_id}" in ${rel(metaPath)} and ${chapterIds.get(meta.chapter_id)}`,
			);
		} else {
			chapterIds.set(meta.chapter_id, rel(metaPath));
		}

		if (!meta.category_id) {
			errors.push(`Missing category_id in ${rel(metaPath)}`);
		}

		if (!meta.status) {
			errors.push(`Missing status in ${rel(metaPath)}`);
		}

		if (!meta.source_plan_status) {
			errors.push(`Missing source_plan_status in ${rel(metaPath)}`);
		}

		const isReplaceOnly = EXPECTED.replaceOnlyChapters.includes(chapterRel);
		const lecturesDir = path.join(chapterDir, 'lectures');

		if (!isReplaceOnly && !fs.existsSync(lecturesDir)) {
			errors.push(`Non-replacement chapter missing lectures/: ${chapterRel}`);
		}
	}
}

function auditLectureFolders(files) {
	const lectureMetaFiles = files.filter(
		filePath => path.basename(filePath) === 'lecture.meta.json',
	);

	const lectureIds = new Map();

	for (const metaPath of lectureMetaFiles) {
		const lectureDir = path.dirname(metaPath);
		const lectureRel = rel(lectureDir);

		if (!fs.existsSync(path.join(lectureDir, 'images', '.gitkeep'))) {
			errors.push(`Missing lecture images/.gitkeep: ${lectureRel}`);
		}

		const meta = readJson(metaPath);
		if (!meta) continue;

		if (!meta.lecture_id) {
			errors.push(`Missing lecture_id in ${rel(metaPath)}`);
		} else if (lectureIds.has(meta.lecture_id)) {
			errors.push(
				`Duplicate lecture_id "${meta.lecture_id}" in ${rel(metaPath)} and ${lectureIds.get(meta.lecture_id)}`,
			);
		} else {
			lectureIds.set(meta.lecture_id, rel(metaPath));
		}

		if (!meta.chapter_id) {
			errors.push(`Missing chapter_id in ${rel(metaPath)}`);
		}

		if (!meta.category_id) {
			errors.push(`Missing category_id in ${rel(metaPath)}`);
		}

		if (!meta.status) {
			errors.push(`Missing status in ${rel(metaPath)}`);
		}

		if (!meta.source_plan_status) {
			errors.push(`Missing source_plan_status in ${rel(metaPath)}`);
		}

		if (!meta.source_status) {
			errors.push(`Missing source_status in ${rel(metaPath)}`);
		}

		if (!meta.copyright_review_status) {
			errors.push(`Missing copyright_review_status in ${rel(metaPath)}`);
		}
	}
}

function auditForbiddenFiles(files) {
	const htmlFiles = files
		.map(rel)
		.filter(filePath => filePath.endsWith('.html'));
	const astroFiles = files
		.map(rel)
		.filter(filePath => filePath.endsWith('.astro'));

	if (htmlFiles.length > 0) {
		errors.push(`HTML files should not exist yet. Found ${htmlFiles.length}.`);
	}

	if (astroFiles.length > 0) {
		errors.push(
			`Astro files should not exist in content scaffold. Found ${astroFiles.length}.`,
		);
	}

	const transcriptFiles = files
		.map(rel)
		.filter(filePath => filePath.endsWith('transcript.md'));

	if (transcriptFiles.length > 0) {
		warnings.push(
			`Found ${transcriptFiles.length} transcript.md files. This is okay only if they are empty placeholders.`,
		);
	}
}

function printReport() {
	console.log('');
	console.log('ChemDesk Content Scaffold Audit');
	console.log('--------------------------------');

	if (warnings.length > 0) {
		console.log('');
		console.log('Warnings:');
		for (const warning of warnings) {
			console.log(`- ${warning}`);
		}
	}

	if (errors.length > 0) {
		console.log('');
		console.log('FAIL');
		console.log('');
		console.log('Errors:');
		for (const error of errors) {
			console.log(`- ${error}`);
		}
		process.exitCode = 1;
		return;
	}

	console.log('');
	console.log('PASS');
	console.log('');
	console.log('Verified:');
	console.log(`- ${EXPECTED.chapterMetaCount} chapter metadata files`);
	console.log(`- ${EXPECTED.lectureMetaCount} lecture metadata files`);
	console.log(`- ${EXPECTED.imageGitkeepCount} images/.gitkeep files`);
	console.log(
		'- Chemical Bonding canonical under content/inorganic/chemical-bonding',
	);
	console.log('- No Chemical Bonding duplicate under Physical Chemistry');
	console.log('- Replace-standardize topics have no lectures/ folders');
	console.log('- JSON metadata files parse successfully');
	console.log('- Required metadata fields exist');
}

function main() {
	const files = auditContentRoot();

	if (files.length > 0) {
		auditExpectedCounts(files);
		auditChemicalBondingPlacement(files);
		auditReplaceOnlyChapters();
		auditChapterFolders(files);
		auditLectureFolders(files);
		auditForbiddenFiles(files);
	}

	printReport();
}

main();
