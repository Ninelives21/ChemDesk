// scripts/audit-content-scaffold.mjs
// ChemDesk Content Scaffold Audit
//
// Run from ChemDesk repo root:
//   node scripts/audit-content-scaffold.mjs
//
// Purpose:
// Validate the current ordered ChemDesk content scaffold.
//
// This script checks:
// - ordered category folders exist
// - legacy unprefixed category folders do not exist
// - expected metadata counts match
// - image placeholder count matches
// - Chemical Bonding is under Physical Chemistry
// - replacement-only chapters have no lectures/
// - chapter metadata uses source_plan_statuses
// - lecture metadata uses source_plan_status
// - data/content-registry.json exists and matches expected counts
//
// This script does NOT:
// - create files
// - delete files
// - modify metadata
// - add Chemistry content
// - regenerate registry

import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const CONTENT_ROOT = path.join(ROOT, 'content');
const DATA_ROOT = path.join(ROOT, 'data');
const REGISTRY_PATH = path.join(DATA_ROOT, 'content-registry.json');

const EXPECTED = {
	categories: 4,
	chapters: 25,
	lectures: 242,
	imageGitkeeps: 267,
};

const EXPECTED_CATEGORY_FOLDERS = [
	'content/01-physical',
	'content/02-inorganic',
	'content/03-organic',
	'content/04-practical',
];

const FORBIDDEN_LEGACY_FOLDERS = [
	'content/physical',
	'content/inorganic',
	'content/organic',
	'content/practical',
];

const EXPECTED_SPECIAL_PATHS = [
	'content/01-physical/03-chemical-bonding-and-molecular-structure',
	'content/02-inorganic/02-p-block-elements',
	'content/02-inorganic/03-d-and-f-block-elements',
	'content/02-inorganic/04-coordination-compounds',
];

const REPLACEMENT_ONLY_CHAPTERS = [
	'content/02-inorganic/02-p-block-elements',
	'content/02-inorganic/03-d-and-f-block-elements',
	'content/02-inorganic/04-coordination-compounds',
];

const errors = [];
const warnings = [];

function toPosix(filePath) {
	return filePath.replaceAll(path.sep, '/');
}

function relativeToRoot(filePath) {
	return toPosix(path.relative(ROOT, filePath));
}

function exists(relativePath) {
	return fs.existsSync(path.join(ROOT, relativePath));
}

function readJson(filePath) {
	try {
		return JSON.parse(fs.readFileSync(filePath, 'utf8'));
	} catch (error) {
		errors.push(`Invalid JSON: ${relativeToRoot(filePath)} — ${error.message}`);
		return null;
	}
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

function countFilesByName(rootDir, fileName) {
	if (!fs.existsSync(rootDir)) return 0;

	let count = 0;

	for (const entry of fs.readdirSync(rootDir, { withFileTypes: true })) {
		const fullPath = path.join(rootDir, entry.name);

		if (entry.isDirectory()) {
			count += countFilesByName(fullPath, fileName);
		} else if (entry.name === fileName) {
			count += 1;
		}
	}

	return count;
}

function countImageGitkeeps(rootDir) {
	if (!fs.existsSync(rootDir)) return 0;

	let count = 0;

	for (const entry of fs.readdirSync(rootDir, { withFileTypes: true })) {
		const fullPath = path.join(rootDir, entry.name);

		if (entry.isDirectory()) {
			count += countImageGitkeeps(fullPath);
		} else if (
			entry.name === '.gitkeep' &&
			fullPath.split(path.sep).includes('images')
		) {
			count += 1;
		}
	}

	return count;
}

function findFilesByName(rootDir, fileName) {
	return walk(rootDir).filter(filePath => path.basename(filePath) === fileName);
}

function requireField(meta, field, filePath) {
	if (
		meta[field] === undefined ||
		meta[field] === null ||
		String(meta[field]).trim() === ''
	) {
		errors.push(
			`Missing required field "${field}" in ${relativeToRoot(filePath)}`,
		);
		return false;
	}

	return true;
}

function requireArrayField(meta, field, filePath) {
	if (!Array.isArray(meta[field])) {
		errors.push(
			`Expected array field "${field}" in ${relativeToRoot(filePath)}`,
		);
		return false;
	}

	return true;
}

function validateContentRoot() {
	if (!fs.existsSync(CONTENT_ROOT)) {
		errors.push('Missing content/ folder.');
	}
}

function validateExpectedCategoryFolders() {
	for (const folder of EXPECTED_CATEGORY_FOLDERS) {
		if (!exists(folder)) {
			errors.push(`Missing expected category folder: ${folder}`);
		}
	}
}

function validateForbiddenLegacyFolders() {
	for (const folder of FORBIDDEN_LEGACY_FOLDERS) {
		if (exists(folder)) {
			errors.push(`Forbidden legacy folder exists: ${folder}`);
		}
	}
}

function validateSpecialPaths() {
	for (const folder of EXPECTED_SPECIAL_PATHS) {
		if (!exists(folder)) {
			errors.push(`Missing expected special path: ${folder}`);
		}
	}
}

function validateCounts() {
	const chapterMetaCount = countFilesByName(CONTENT_ROOT, 'chapter.meta.json');
	const lectureMetaCount = countFilesByName(CONTENT_ROOT, 'lecture.meta.json');
	const imageGitkeepCount = countImageGitkeeps(CONTENT_ROOT);

	if (chapterMetaCount !== EXPECTED.chapters) {
		errors.push(
			`Expected ${EXPECTED.chapters} chapter.meta.json files, found ${chapterMetaCount}`,
		);
	}

	if (lectureMetaCount !== EXPECTED.lectures) {
		errors.push(
			`Expected ${EXPECTED.lectures} lecture.meta.json files, found ${lectureMetaCount}`,
		);
	}

	if (imageGitkeepCount !== EXPECTED.imageGitkeeps) {
		errors.push(
			`Expected ${EXPECTED.imageGitkeeps} images/.gitkeep files, found ${imageGitkeepCount}`,
		);
	}

	return {
		chapterMetaCount,
		lectureMetaCount,
		imageGitkeepCount,
	};
}

function validateReplacementOnlyChapters() {
	for (const chapterPath of REPLACEMENT_ONLY_CHAPTERS) {
		const lecturesPath = path.join(ROOT, chapterPath, 'lectures');

		if (fs.existsSync(lecturesPath)) {
			errors.push(
				`Replacement-only chapter should not have lectures/ yet: ${chapterPath}`,
			);
		}

		const chapterMetaPath = path.join(ROOT, chapterPath, 'chapter.meta.json');
		const meta = readJson(chapterMetaPath);

		if (!meta) continue;

		if (meta.replace_standardize_to_jee_wallah !== true) {
			errors.push(
				`Replacement-only chapter must have replace_standardize_to_jee_wallah: true in ${relativeToRoot(chapterMetaPath)}`,
			);
		}

		if (meta.planned_lecture_count !== 0) {
			errors.push(
				`Replacement-only chapter must have planned_lecture_count: 0 in ${relativeToRoot(chapterMetaPath)}`,
			);
		}
	}
}

function validateChapterMetadata() {
	const chapterMetaFiles = findFilesByName(CONTENT_ROOT, 'chapter.meta.json');
	const seenChapterKeys = new Set();

	for (const filePath of chapterMetaFiles) {
		const meta = readJson(filePath);
		if (!meta) continue;

		const requiredFields = [
			'category_order',
			'category_order_text',
			'category_id',
			'category_folder',
			'category_title',
			'chapter_order',
			'chapter_order_text',
			'chapter_id',
			'chapter_folder',
			'title',
			'canonical_path',
			'status',
			'source_status',
			'review_status',
			'source_plan_mode',
			'planned_lecture_count',
			'original_master_lecture_row_count',
		];

		for (const field of requiredFields) {
			requireField(meta, field, filePath);
		}

		requireArrayField(meta, 'source_plan_statuses', filePath);
		requireArrayField(meta, 'current_playlist_urls', filePath);
		requireArrayField(meta, 'jee_syllabus_units', filePath);
		requireArrayField(meta, 'jee_syllabus_unit_names', filePath);
		requireArrayField(meta, 'syllabus_mapping_confidences', filePath);
		requireArrayField(meta, 'exam_scope', filePath);

		if (Object.prototype.hasOwnProperty.call(meta, 'source_plan_status')) {
			warnings.push(
				`Chapter metadata has singular source_plan_status; expected plural source_plan_statuses: ${relativeToRoot(filePath)}`,
			);
		}

		const key = `${meta.category_id}/${meta.chapter_id}`;
		if (seenChapterKeys.has(key)) {
			errors.push(`Duplicate chapter identity: ${key}`);
		}
		seenChapterKeys.add(key);

		const actualChapterDir = relativeToRoot(path.dirname(filePath));
		if (meta.canonical_path !== actualChapterDir) {
			errors.push(
				`canonical_path mismatch in ${relativeToRoot(filePath)}: expected "${actualChapterDir}", found "${meta.canonical_path}"`,
			);
		}

		if (!actualChapterDir.includes(`/${meta.chapter_folder}`)) {
			errors.push(
				`chapter_folder does not match folder path in ${relativeToRoot(filePath)}`,
			);
		}

		if (!actualChapterDir.includes(`content/${meta.category_folder}/`)) {
			errors.push(
				`category_folder does not match folder path in ${relativeToRoot(filePath)}`,
			);
		}
	}
}

function validateLectureMetadata() {
	const lectureMetaFiles = findFilesByName(CONTENT_ROOT, 'lecture.meta.json');
	const seenLectureIds = new Set();

	for (const filePath of lectureMetaFiles) {
		const meta = readJson(filePath);
		if (!meta) continue;

		const requiredFields = [
			'lecture_id',
			'category_order',
			'category_order_text',
			'category_id',
			'category_folder',
			'chapter_order',
			'chapter_order_text',
			'chapter_id',
			'chapter_folder',
			'lecture_number',
			'lecture_number_text',
			'title',
			'folder',
			'canonical_path',
			'source_plan_status',
			'status',
			'source_status',
			'transcript_status',
			'timestamp_map_status',
			'concept_map_status',
			'copyright_review_status',
		];

		for (const field of requiredFields) {
			requireField(meta, field, filePath);
		}

		if (Object.prototype.hasOwnProperty.call(meta, 'source_plan_statuses')) {
			warnings.push(
				`Lecture metadata has plural source_plan_statuses; expected singular source_plan_status: ${relativeToRoot(filePath)}`,
			);
		}

		if (seenLectureIds.has(meta.lecture_id)) {
			errors.push(`Duplicate lecture_id: ${meta.lecture_id}`);
		}
		seenLectureIds.add(meta.lecture_id);

		const actualLectureDir = relativeToRoot(path.dirname(filePath));
		if (meta.canonical_path !== actualLectureDir) {
			errors.push(
				`canonical_path mismatch in ${relativeToRoot(filePath)}: expected "${actualLectureDir}", found "${meta.canonical_path}"`,
			);
		}

		if (!actualLectureDir.endsWith(`/lectures/${meta.folder}`)) {
			errors.push(
				`lecture folder field does not match folder path in ${relativeToRoot(filePath)}`,
			);
		}

		if (!actualLectureDir.includes(`content/${meta.category_folder}/`)) {
			errors.push(
				`category_folder does not match lecture path in ${relativeToRoot(filePath)}`,
			);
		}

		if (!actualLectureDir.includes(`/${meta.chapter_folder}/lectures/`)) {
			errors.push(
				`chapter_folder does not match lecture path in ${relativeToRoot(filePath)}`,
			);
		}

		const imagesDir = path.join(path.dirname(filePath), 'images');
		const gitkeepPath = path.join(imagesDir, '.gitkeep');
		const readmePath = path.join(path.dirname(filePath), 'README.md');

		if (!fs.existsSync(imagesDir)) {
			errors.push(`Missing images/ folder for lecture: ${actualLectureDir}`);
		}

		if (!fs.existsSync(gitkeepPath)) {
			errors.push(`Missing images/.gitkeep for lecture: ${actualLectureDir}`);
		}

		if (!fs.existsSync(readmePath)) {
			errors.push(`Missing README.md for lecture: ${actualLectureDir}`);
		}
	}
}

function validateChapterFoldersHaveExpectedFiles() {
	const chapterMetaFiles = findFilesByName(CONTENT_ROOT, 'chapter.meta.json');

	for (const filePath of chapterMetaFiles) {
		const chapterDir = path.dirname(filePath);
		const relativeChapterDir = relativeToRoot(chapterDir);

		const readmePath = path.join(chapterDir, 'README.md');
		const imagesDir = path.join(chapterDir, 'images');
		const gitkeepPath = path.join(imagesDir, '.gitkeep');

		if (!fs.existsSync(readmePath)) {
			errors.push(`Missing README.md for chapter: ${relativeChapterDir}`);
		}

		if (!fs.existsSync(imagesDir)) {
			errors.push(`Missing images/ folder for chapter: ${relativeChapterDir}`);
		}

		if (!fs.existsSync(gitkeepPath)) {
			errors.push(`Missing images/.gitkeep for chapter: ${relativeChapterDir}`);
		}
	}
}

function validateNonReplacementChaptersHaveLectures() {
	const chapterMetaFiles = findFilesByName(CONTENT_ROOT, 'chapter.meta.json');

	for (const filePath of chapterMetaFiles) {
		const meta = readJson(filePath);
		if (!meta) continue;

		const chapterDir = path.dirname(filePath);
		const relativeChapterDir = relativeToRoot(chapterDir);
		const lecturesDir = path.join(chapterDir, 'lectures');

		if (meta.replace_standardize_to_jee_wallah === true) {
			continue;
		}

		if (!fs.existsSync(lecturesDir)) {
			errors.push(
				`Non-replacement chapter missing lectures/: ${relativeChapterDir}`,
			);
			continue;
		}

		const lectureMetaFiles = findFilesByName(lecturesDir, 'lecture.meta.json');

		if (lectureMetaFiles.length !== Number(meta.planned_lecture_count)) {
			errors.push(
				`Lecture count mismatch in ${relativeChapterDir}: planned ${meta.planned_lecture_count}, found ${lectureMetaFiles.length}`,
			);
		}

		const lecturesReadme = path.join(lecturesDir, 'README.md');
		if (!fs.existsSync(lecturesReadme)) {
			errors.push(`Missing lectures/README.md in ${relativeChapterDir}`);
		}
	}
}

function validateRegistry() {
	if (!fs.existsSync(REGISTRY_PATH)) {
		errors.push('Missing generated registry: data/content-registry.json');
		return;
	}

	const registry = readJson(REGISTRY_PATH);
	if (!registry) return;

	if (registry.counts?.categories !== EXPECTED.categories) {
		errors.push(
			`Registry category count mismatch: expected ${EXPECTED.categories}, found ${registry.counts?.categories}`,
		);
	}

	if (registry.counts?.chapters !== EXPECTED.chapters) {
		errors.push(
			`Registry chapter count mismatch: expected ${EXPECTED.chapters}, found ${registry.counts?.chapters}`,
		);
	}

	if (registry.counts?.lectures !== EXPECTED.lectures) {
		errors.push(
			`Registry lecture count mismatch: expected ${EXPECTED.lectures}, found ${registry.counts?.lectures}`,
		);
	}

	const chemicalBonding = registry.chapters?.find(
		chapter =>
			chapter.chapter_id === 'chemical-bonding-and-molecular-structure',
	);

	if (!chemicalBonding) {
		errors.push('Registry missing Chemical Bonding chapter.');
	} else if (
		chemicalBonding.canonical_path !==
		'content/01-physical/03-chemical-bonding-and-molecular-structure'
	) {
		errors.push(
			`Registry Chemical Bonding path mismatch: ${chemicalBonding.canonical_path}`,
		);
	}

	const replacementChapterIds = new Set([
		'p-block-elements',
		'd-and-f-block-elements',
		'coordination-compounds',
	]);

	for (const chapterId of replacementChapterIds) {
		const matchingLectures =
			registry.lectures?.filter(lecture => lecture.chapter_id === chapterId) ??
			[];

		if (matchingLectures.length > 0) {
			errors.push(
				`Registry should not contain lectures for replacement-only chapter yet: ${chapterId}`,
			);
		}
	}
}

function printSummary(counts) {
	console.log('');
	console.log('ChemDesk Content Scaffold Audit');
	console.log('===============================');
	console.log('');
	console.log(`Category folders expected: ${EXPECTED.categories}`);
	console.log(`chapter.meta.json files: ${counts.chapterMetaCount}`);
	console.log(`lecture.meta.json files: ${counts.lectureMetaCount}`);
	console.log(`images/.gitkeep files: ${counts.imageGitkeepCount}`);
	console.log('');
}

function main() {
	validateContentRoot();
	validateExpectedCategoryFolders();
	validateForbiddenLegacyFolders();
	validateSpecialPaths();

	const counts = validateCounts();

	validateChapterFoldersHaveExpectedFiles();
	validateChapterMetadata();
	validateLectureMetadata();
	validateNonReplacementChaptersHaveLectures();
	validateReplacementOnlyChapters();
	validateRegistry();

	printSummary(counts);

	if (warnings.length > 0) {
		console.log('Warnings:');
		for (const warning of warnings) {
			console.log(`- ${warning}`);
		}
		console.log('');
	}

	if (errors.length > 0) {
		console.log('FAIL');
		console.log('');
		console.log('Errors:');
		for (const error of errors) {
			console.log(`- ${error}`);
		}
		console.log('');
		process.exit(1);
	}

	console.log('PASS: ChemDesk content scaffold is valid.');
	console.log('');
}

main();
