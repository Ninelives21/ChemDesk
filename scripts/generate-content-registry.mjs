// scripts/generate-content-registry.mjs
// ChemDesk Content Registry Generator
//
// Run from ChemDesk repo root:
//   node scripts/generate-content-registry.mjs
//
// Purpose:
// Generate data/content-registry.json from existing chapter.meta.json
// and lecture.meta.json files.
//
// This script:
// - reads content metadata
// - validates basic required fields
// - sorts by category_order, chapter_order, lecture_number
// - writes data/content-registry.json
//
// This script does NOT:
// - create content folders
// - modify content metadata
// - add Chemistry content
// - set up Astro/UI/search/RAG

import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const CONTENT_ROOT = path.join(ROOT, 'content');
const OUTPUT_PATH = path.join(ROOT, 'data', 'content-registry.json');

const EXPECTED = {
	categories: 4,
	chapters: 25,
	lectures: 242,
};

const errors = [];

function toPosix(filePath) {
	return filePath.replaceAll(path.sep, '/');
}

function rel(filePath) {
	return toPosix(path.relative(ROOT, filePath));
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

function requireField(meta, field, filePath) {
	if (
		meta[field] === undefined ||
		meta[field] === null ||
		String(meta[field]).trim() === ''
	) {
		errors.push(`Missing required field "${field}" in ${rel(filePath)}`);
		return false;
	}

	return true;
}

function compareNullableNumber(a, b) {
	const left = Number.isFinite(Number(a)) ? Number(a) : Number.MAX_SAFE_INTEGER;
	const right = Number.isFinite(Number(b))
		? Number(b)
		: Number.MAX_SAFE_INTEGER;
	return left - right;
}

function sortCategories(categories) {
	return categories.sort((a, b) => {
		return (
			compareNullableNumber(a.category_order, b.category_order) ||
			String(a.category_id).localeCompare(String(b.category_id))
		);
	});
}

function sortChapters(chapters) {
	return chapters.sort((a, b) => {
		return (
			compareNullableNumber(a.category_order, b.category_order) ||
			compareNullableNumber(a.chapter_order, b.chapter_order) ||
			String(a.chapter_id).localeCompare(String(b.chapter_id))
		);
	});
}

function sortLectures(lectures) {
	return lectures.sort((a, b) => {
		return (
			compareNullableNumber(a.category_order, b.category_order) ||
			compareNullableNumber(a.chapter_order, b.chapter_order) ||
			compareNullableNumber(a.lecture_number, b.lecture_number) ||
			String(a.lecture_id).localeCompare(String(b.lecture_id))
		);
	});
}

function buildCategoryMap(chapters) {
	const categories = new Map();

	for (const chapter of chapters) {
		if (!categories.has(chapter.category_id)) {
			categories.set(chapter.category_id, {
				category_order: chapter.category_order,
				category_order_text: chapter.category_order_text,
				category_id: chapter.category_id,
				category_folder: chapter.category_folder,
				category_title: chapter.category_title,
				canonical_path: `content/${chapter.category_folder}`,
			});
		}
	}

	return sortCategories([...categories.values()]);
}

function collectChapters(files) {
	const chapterMetaFiles = files.filter(
		filePath => path.basename(filePath) === 'chapter.meta.json',
	);

	const seenChapterIds = new Map();

	const chapters = chapterMetaFiles
		.map(filePath => {
			const meta = readJson(filePath);
			if (!meta) return null;

			const requiredFields = [
				'category_order',
				'category_id',
				'category_folder',
				'category_title',
				'chapter_order',
				'chapter_id',
				'chapter_folder',
				'title',
				'canonical_path',
				'status',
				'source_status',
				'review_status',
			];

			for (const field of requiredFields) {
				requireField(meta, field, filePath);
			}

			const key = `${meta.category_id}/${meta.chapter_id}`;
			if (seenChapterIds.has(key)) {
				errors.push(
					`Duplicate chapter identity "${key}" in ${rel(filePath)} and ${seenChapterIds.get(key)}`,
				);
			} else {
				seenChapterIds.set(key, rel(filePath));
			}

			return {
				global_chapter_order: meta.global_chapter_order ?? null,

				category_order: meta.category_order,
				category_order_text: meta.category_order_text ?? null,
				category_id: meta.category_id,
				category_folder: meta.category_folder,
				category_title: meta.category_title,

				chapter_order: meta.chapter_order,
				chapter_order_text: meta.chapter_order_text ?? null,
				chapter_id: meta.chapter_id,
				chapter_folder: meta.chapter_folder,
				title: meta.title,

				canonical_path: meta.canonical_path,
				metadata_path: rel(filePath),

				status: meta.status,
				source_status: meta.source_status,
				review_status: meta.review_status,

				source_plan_mode: meta.source_plan_mode ?? null,
				source_plan_statuses: meta.source_plan_statuses ?? [],
				replace_standardize_to_jee_wallah: Boolean(
					meta.replace_standardize_to_jee_wallah,
				),

				planned_lecture_count: meta.planned_lecture_count ?? null,
				original_master_lecture_row_count:
					meta.original_master_lecture_row_count ?? null,

				current_playlist_urls: meta.current_playlist_urls ?? [],

				jee_syllabus_units: meta.jee_syllabus_units ?? [],
				jee_syllabus_unit_names: meta.jee_syllabus_unit_names ?? [],
				syllabus_mapping_confidences: meta.syllabus_mapping_confidences ?? [],

				recommended_primary_sources: meta.recommended_primary_sources ?? [],
				recommended_source_urls: meta.recommended_source_urls ?? [],
				source_plan_notes: meta.source_plan_notes ?? [],

				exam_scope: meta.exam_scope ?? [],
			};
		})
		.filter(Boolean);

	return sortChapters(chapters);
}

function collectLectures(files) {
	const lectureMetaFiles = files.filter(
		filePath => path.basename(filePath) === 'lecture.meta.json',
	);

	const seenLectureIds = new Map();

	const lectures = lectureMetaFiles
		.map(filePath => {
			const meta = readJson(filePath);
			if (!meta) return null;

			const requiredFields = [
				'lecture_id',
				'category_order',
				'category_id',
				'category_folder',
				'chapter_order',
				'chapter_id',
				'chapter_folder',
				'lecture_number',
				'lecture_number_text',
				'title',
				'folder',
				'canonical_path',
				'status',
				'source_status',
				'copyright_review_status',
			];

			for (const field of requiredFields) {
				requireField(meta, field, filePath);
			}

			if (seenLectureIds.has(meta.lecture_id)) {
				errors.push(
					`Duplicate lecture_id "${meta.lecture_id}" in ${rel(filePath)} and ${seenLectureIds.get(meta.lecture_id)}`,
				);
			} else {
				seenLectureIds.set(meta.lecture_id, rel(filePath));
			}

			return {
				lecture_id: meta.lecture_id,

				global_chapter_order: meta.global_chapter_order ?? null,

				category_order: meta.category_order,
				category_order_text: meta.category_order_text ?? null,
				category_id: meta.category_id,
				category_folder: meta.category_folder,

				chapter_order: meta.chapter_order,
				chapter_order_text: meta.chapter_order_text ?? null,
				chapter_id: meta.chapter_id,
				chapter_folder: meta.chapter_folder,

				lecture_number: meta.lecture_number,
				lecture_number_text: meta.lecture_number_text,
				title: meta.title,
				folder: meta.folder,

				canonical_path: meta.canonical_path,
				metadata_path: rel(filePath),

				spreadsheet_row_number: meta.spreadsheet_row_number ?? null,

				current_youtube_url: meta.current_youtube_url ?? '',
				current_playlist_urls: meta.current_playlist_urls ?? [],
				mynotes_url: meta.mynotes_url ?? '',
				mynotes_old_url: meta.mynotes_old_url ?? '',

				jee_syllabus_unit: meta.jee_syllabus_unit ?? '',
				jee_syllabus_unit_name: meta.jee_syllabus_unit_name ?? '',
				syllabus_mapping_confidence: meta.syllabus_mapping_confidence ?? '',

				source_plan_status: meta.source_plan_status ?? '',
				recommended_primary_source: meta.recommended_primary_source ?? '',
				recommended_source_url: meta.recommended_source_url ?? '',
				source_plan_notes: meta.source_plan_notes ?? '',

				status: meta.status,
				source_status: meta.source_status,
				transcript_status: meta.transcript_status ?? 'not_started',
				timestamp_map_status: meta.timestamp_map_status ?? 'not_started',
				concept_map_status: meta.concept_map_status ?? 'not_started',
				copyright_review_status: meta.copyright_review_status,
			};
		})
		.filter(Boolean);

	return sortLectures(lectures);
}

function validateCounts(categories, chapters, lectures) {
	if (categories.length !== EXPECTED.categories) {
		errors.push(
			`Expected ${EXPECTED.categories} categories, found ${categories.length}`,
		);
	}

	if (chapters.length !== EXPECTED.chapters) {
		errors.push(
			`Expected ${EXPECTED.chapters} chapters, found ${chapters.length}`,
		);
	}

	if (lectures.length !== EXPECTED.lectures) {
		errors.push(
			`Expected ${EXPECTED.lectures} lectures, found ${lectures.length}`,
		);
	}
}

function validateLectureChapterLinks(chapters, lectures) {
	const chapterKeys = new Set(
		chapters.map(chapter => `${chapter.category_id}/${chapter.chapter_id}`),
	);

	for (const lecture of lectures) {
		const key = `${lecture.category_id}/${lecture.chapter_id}`;

		if (!chapterKeys.has(key)) {
			errors.push(
				`Lecture references missing chapter "${key}": ${lecture.metadata_path}`,
			);
		}
	}
}

function validateReplacementChapters(chapters, lectures) {
	const lectureCountsByChapter = new Map();

	for (const lecture of lectures) {
		const key = `${lecture.category_id}/${lecture.chapter_id}`;
		lectureCountsByChapter.set(key, (lectureCountsByChapter.get(key) ?? 0) + 1);
	}

	for (const chapter of chapters) {
		const key = `${chapter.category_id}/${chapter.chapter_id}`;
		const lectureCount = lectureCountsByChapter.get(key) ?? 0;

		if (chapter.replace_standardize_to_jee_wallah && lectureCount !== 0) {
			errors.push(
				`Replacement-only chapter has lecture entries: ${chapter.canonical_path}`,
			);
		}

		if (!chapter.replace_standardize_to_jee_wallah) {
			const planned = Number(chapter.planned_lecture_count);

			if (Number.isFinite(planned) && planned !== lectureCount) {
				errors.push(
					`Lecture count mismatch for ${chapter.canonical_path}: planned ${planned}, found ${lectureCount}`,
				);
			}
		}
	}
}

function validateKnownPaths(chapters) {
	const expectedPaths = [
		'content/01-physical',
		'content/02-inorganic',
		'content/03-organic',
		'content/04-practical',
		'content/01-physical/03-chemical-bonding-and-molecular-structure',
		'content/02-inorganic/02-p-block-elements',
		'content/02-inorganic/03-d-and-f-block-elements',
		'content/02-inorganic/04-coordination-compounds',
	];

	for (const expectedPath of expectedPaths) {
		if (!fs.existsSync(path.join(ROOT, expectedPath))) {
			errors.push(`Missing expected path: ${expectedPath}`);
		}
	}

	const forbiddenPaths = [
		'content/physical',
		'content/inorganic',
		'content/organic',
		'content/practical',
		'content/02-inorganic/chemical-bonding',
		'content/01-physical/chemical-bonding-and-molecular-structure',
	];

	for (const forbiddenPath of forbiddenPaths) {
		if (fs.existsSync(path.join(ROOT, forbiddenPath))) {
			errors.push(`Forbidden legacy path exists: ${forbiddenPath}`);
		}
	}
}

function writeRegistry(registry) {
	fs.mkdirSync(path.dirname(OUTPUT_PATH), { recursive: true });
	fs.writeFileSync(
		OUTPUT_PATH,
		`${JSON.stringify(registry, null, 2)}\n`,
		'utf8',
	);
}

function main() {
	if (!fs.existsSync(CONTENT_ROOT)) {
		console.error('Missing content/ folder.');
		process.exit(1);
	}

	const files = walk(CONTENT_ROOT);

	const chapters = collectChapters(files);
	const categories = buildCategoryMap(chapters);
	const lectures = collectLectures(files);

	validateCounts(categories, chapters, lectures);
	validateLectureChapterLinks(chapters, lectures);
	validateReplacementChapters(chapters, lectures);
	validateKnownPaths(chapters);

	if (errors.length > 0) {
		console.log('');
		console.log('ChemDesk content registry generation failed.');
		console.log('--------------------------------------------');
		for (const error of errors) {
			console.log(`- ${error}`);
		}
		console.log('');
		process.exit(1);
	}

	const registry = {
		schema_version: 1,
		generated_at: new Date().toISOString(),
		source: {
			content_root: 'content',
			generated_from: ['chapter.meta.json', 'lecture.meta.json'],
		},
		counts: {
			categories: categories.length,
			chapters: chapters.length,
			lectures: lectures.length,
		},
		categories,
		chapters,
		lectures,
	};

	writeRegistry(registry);

	console.log('');
	console.log('ChemDesk content registry generated.');
	console.log('------------------------------------');
	console.log(`Output: ${rel(OUTPUT_PATH)}`);
	console.log(`Categories: ${categories.length}`);
	console.log(`Chapters: ${chapters.length}`);
	console.log(`Lectures: ${lectures.length}`);
	console.log('');
	console.log('PASS: data/content-registry.json is up to date.');
}

main();
