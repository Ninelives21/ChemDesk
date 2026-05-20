// setup-chemdesk-content-from-master-lectures.mjs
// ChemDesk content scaffold generator from Master Lectures TSV.
//
// Run from ChemDesk repo root:
//   node setup-chemdesk-content-from-master-lectures.mjs
//
// Expected input:
//   data/master-lectures.tsv
//
// To create the TSV:
//   1. Open chemdesk_chemistry_lecture_master.xlsx
//   2. Go to the "Master Lectures" sheet
//   3. Copy all rows including the header row
//   4. Paste into data/master-lectures.tsv
//
// This script creates ordered category and chapter folders:
//   content/<category-order>-<category>/<chapter-order>-<chapter>/README.md
//   content/<category-order>-<category>/<chapter-order>-<chapter>/chapter.meta.json
//   content/<category-order>-<category>/<chapter-order>-<chapter>/images/.gitkeep
//
// For normal rows:
//   content/<category-order>-<category>/<chapter-order>-<chapter>/lectures/<lecture-folder>/README.md
//   content/<category-order>-<category>/<chapter-order>-<chapter>/lectures/<lecture-folder>/lecture.meta.json
//   content/<category-order>-<category>/<chapter-order>-<chapter>/lectures/<lecture-folder>/images/.gitkeep
//
// For rows where Source Plan Status is exactly:
//   Replace/standardize to JEE Wallah
//
// It creates only:
//   content/<category-order>-<category>/<chapter-order>-<chapter>/README.md
//   content/<category-order>-<category>/<chapter-order>-<chapter>/chapter.meta.json
//   content/<category-order>-<category>/<chapter-order>-<chapter>/images/.gitkeep
//
// It does NOT create HTML files.
// It does NOT create Astro files.
// It does NOT add Chemistry teaching content.
// It does NOT overwrite existing metadata unless --force is used.

import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const FORCE = process.argv.includes('--force');

const INPUT_TSV = path.join(ROOT, 'data', 'master-lectures.tsv');
const CONTENT_ROOT = path.join(ROOT, 'content');

const REPLACE_STATUS = 'Replace/standardize to JEE Wallah';

const CATEGORY_MAP = {
	'Physical Chemistry': {
		category_order: 1,
		category_order_text: '01',
		category_id: 'physical',
		category_folder: '01-physical',
		category_title: 'Physical Chemistry',
	},
	'Inorganic Chemistry': {
		category_order: 2,
		category_order_text: '02',
		category_id: 'inorganic',
		category_folder: '02-inorganic',
		category_title: 'Inorganic Chemistry',
	},
	'Organic Chemistry': {
		category_order: 3,
		category_order_text: '03',
		category_id: 'organic',
		category_folder: '03-organic',
		category_title: 'Organic Chemistry',
	},
	'Practical Chemistry': {
		category_order: 4,
		category_order_text: '04',
		category_id: 'practical',
		category_folder: '04-practical',
		category_title: 'Practical Chemistry',
	},
};

const REQUIRED_HEADERS = [
	'Category',
	'Topic / Chapter',
	'Lecture # in Topic',
	'Lecture Title',
	'Current YouTube URL',
	'Current Playlist URL(s)',
	'MyNotes URL',
	'MyNotes_old URL',
	'JEE Syllabus Unit',
	'JEE Syllabus Unit Name',
	'Syllabus Mapping Confidence',
	'Source Plan Status',
	'Recommended Primary Source',
	'Recommended Source URL',
	'Source Plan Notes',
];

function normalizeText(value) {
	return String(value ?? '')
		.replace(/\r/g, ' ')
		.replace(/\n/g, ' ')
		.replace(/\s+/g, ' ')
		.trim();
}

function slugify(value) {
	return normalizeText(value)
		.normalize('NFKD')
		.replace(/[\u0300-\u036f]/g, '')
		.replace(/α/g, 'alpha')
		.replace(/β/g, 'beta')
		.replace(/γ/g, 'gamma')
		.replace(/δ/g, 'delta')
		.replace(/Δ/g, 'delta')
		.replace(/π/g, 'pi')
		.replace(/σ/g, 'sigma')
		.replace(/&/g, ' and ')
		.replace(/\+/g, ' plus ')
		.replace(/²/g, '2')
		.replace(/³/g, '3')
		.replace(/₀/g, '0')
		.replace(/₁/g, '1')
		.replace(/₂/g, '2')
		.replace(/₃/g, '3')
		.replace(/₄/g, '4')
		.replace(/₅/g, '5')
		.replace(/₆/g, '6')
		.replace(/₇/g, '7')
		.replace(/₈/g, '8')
		.replace(/₉/g, '9')
		.replace(/['’]/g, '')
		.replace(/["“”]/g, '')
		.replace(/\//g, ' ')
		.replace(/[^a-zA-Z0-9]+/g, '-')
		.replace(/^-+|-+$/g, '')
		.replace(/-{2,}/g, '-')
		.toLowerCase();
}

function splitUrls(value) {
	const text = normalizeText(value);
	if (!text) return [];

	return text
		.split(';')
		.map(item => item.trim())
		.filter(Boolean);
}

function mkdir(relativePath) {
	fs.mkdirSync(path.join(ROOT, relativePath), { recursive: true });
}

function writeFile(relativePath, content) {
	const absolutePath = path.join(ROOT, relativePath);
	fs.mkdirSync(path.dirname(absolutePath), { recursive: true });

	if (fs.existsSync(absolutePath) && !FORCE) {
		return false;
	}

	fs.writeFileSync(absolutePath, content, 'utf8');
	return true;
}

function writeJson(relativePath, data) {
	return writeFile(relativePath, JSON.stringify(data, null, 2) + '\n');
}

function gitkeep(relativeDir) {
	mkdir(relativeDir);
	writeFile(path.join(relativeDir, '.gitkeep'), '');
}

function readme(title, body) {
	return `# ${title}

${body.trim()}
`;
}

function assertInputExists() {
	if (!fs.existsSync(INPUT_TSV)) {
		console.error('');
		console.error('Missing input file:');
		console.error('  data/master-lectures.tsv');
		console.error('');
		console.error(
			'Create it by copying the full Master Lectures sheet, including the header row,',
		);
		console.error('and pasting it into data/master-lectures.tsv.');
		console.error('');
		process.exit(1);
	}
}

function parseTsvLine(line) {
	// This expects a clean tab-separated export/copy from the worksheet.
	// Wrapped spreadsheet cells are repaired before parsing.
	return line.split('\t').map(cell => normalizeText(cell));
}

function startsWithKnownCategory(line) {
	return Object.keys(CATEGORY_MAP).some(category =>
		line.startsWith(`${category}\t`),
	);
}

function repairWrappedTsvLines(lines) {
	const repaired = [];

	for (const line of lines) {
		if (!line.trim()) continue;

		if (repaired.length === 0) {
			repaired.push(line);
			continue;
		}

		const isHeader = line.startsWith('Category\t');
		const isNewDataRow = startsWithKnownCategory(line);

		if (isHeader || isNewDataRow) {
			repaired.push(line);
		} else {
			// Continuation of a wrapped spreadsheet cell.
			repaired[repaired.length - 1] += ` ${line.trim()}`;
		}
	}

	return repaired;
}

function loadRows() {
	assertInputExists();

	const raw = fs.readFileSync(INPUT_TSV, 'utf8').replace(/^\uFEFF/, '');

	const originalLines = raw
		.split(/\r?\n/)
		.filter(line => line.trim().length > 0);

	const lines = repairWrappedTsvLines(originalLines);

	if (lines.length < 2) {
		throw new Error(
			'data/master-lectures.tsv must include a header row and at least one data row.',
		);
	}

	const headers = parseTsvLine(lines[0]);

	const missingHeaders = REQUIRED_HEADERS.filter(
		header => !headers.includes(header),
	);

	if (missingHeaders.length > 0) {
		console.error('');
		console.error('Missing required TSV headers:');
		for (const header of missingHeaders) {
			console.error(`- ${header}`);
		}
		console.error('');
		process.exit(1);
	}

	return lines.slice(1).map((line, index) => {
		const cells = parseTsvLine(line);
		const row = {};

		headers.forEach((header, cellIndex) => {
			row[header] = cells[cellIndex] ?? '';
		});

		row.__row_number = index + 2;
		return row;
	});
}

function normalizeRow(row) {
	const categoryLabel = normalizeText(row['Category']);
	const category = CATEGORY_MAP[categoryLabel];

	if (!category) {
		throw new Error(
			`Unknown category "${categoryLabel}" at TSV row ${row.__row_number}`,
		);
	}

	const topicTitle = normalizeText(row['Topic / Chapter']);
	const lectureNumberRaw = normalizeText(row['Lecture # in Topic']);
	const lectureNumber = Number(lectureNumberRaw);
	const lectureTitle = normalizeText(row['Lecture Title']);
	const sourcePlanStatus = normalizeText(row['Source Plan Status']);

	if (!topicTitle) {
		throw new Error(`Missing Topic / Chapter at TSV row ${row.__row_number}`);
	}

	if (!lectureTitle) {
		throw new Error(`Missing Lecture Title at TSV row ${row.__row_number}`);
	}

	if (!Number.isFinite(lectureNumber)) {
		throw new Error(
			`Invalid Lecture # in Topic at TSV row ${row.__row_number}: "${lectureNumberRaw}"`,
		);
	}

	const chapterId = slugify(topicTitle);
	const lectureNumberText = String(lectureNumber).padStart(2, '0');
	const lectureSlug = slugify(lectureTitle);
	const lectureFolder = `lecture-${lectureNumberText}-${lectureSlug}`;

	return {
		spreadsheet_row_number: row.__row_number,

		category_label: categoryLabel,
		category_order: category.category_order,
		category_order_text: category.category_order_text,
		category_id: category.category_id,
		category_folder: category.category_folder,
		category_title: category.category_title,

		chapter_id: chapterId,
		chapter_title: topicTitle,

		lecture_number: lectureNumber,
		lecture_number_text: lectureNumberText,
		lecture_title: lectureTitle,
		lecture_folder: lectureFolder,

		current_youtube_url: normalizeText(row['Current YouTube URL']),
		current_playlist_urls: splitUrls(row['Current Playlist URL(s)']),
		mynotes_url: normalizeText(row['MyNotes URL']),
		mynotes_old_url: normalizeText(row['MyNotes_old URL']),

		jee_syllabus_unit: normalizeText(row['JEE Syllabus Unit']),
		jee_syllabus_unit_name: normalizeText(row['JEE Syllabus Unit Name']),
		syllabus_mapping_confidence: normalizeText(
			row['Syllabus Mapping Confidence'],
		),

		source_plan_status: sourcePlanStatus,
		recommended_primary_source: normalizeText(
			row['Recommended Primary Source'],
		),
		recommended_source_url: normalizeText(row['Recommended Source URL']),
		source_plan_notes: normalizeText(row['Source Plan Notes']),

		replace_standardize_to_jee_wallah: sourcePlanStatus === REPLACE_STATUS,
	};
}

function groupByChapter(rows) {
	const chapters = new Map();
	const categoryChapterCounters = new Map();
	let globalChapterOrder = 0;

	for (const row of rows) {
		const key = `${row.category_id}/${row.chapter_id}`;

		if (!chapters.has(key)) {
			globalChapterOrder += 1;

			const nextChapterOrder =
				(categoryChapterCounters.get(row.category_id) ?? 0) + 1;

			categoryChapterCounters.set(row.category_id, nextChapterOrder);

			const chapterOrderText = String(nextChapterOrder).padStart(2, '0');

			chapters.set(key, {
				global_chapter_order: globalChapterOrder,

				category_order: row.category_order,
				category_order_text: row.category_order_text,
				category_id: row.category_id,
				category_folder: row.category_folder,
				category_title: row.category_title,

				chapter_order: nextChapterOrder,
				chapter_order_text: chapterOrderText,
				chapter_id: row.chapter_id,
				chapter_folder: `${chapterOrderText}-${row.chapter_id}`,
				title: row.chapter_title,

				rows: [],
			});
		}

		chapters.get(key).rows.push(row);
	}

	return [...chapters.values()];
}

function unique(values) {
	return [
		...new Set(
			values.filter(value => {
				if (Array.isArray(value)) return value.length > 0;
				return (
					value !== undefined && value !== null && String(value).trim() !== ''
				);
			}),
		),
	];
}

function uniqueFlattened(arrays) {
	return unique(arrays.flat());
}

function createBaseFolders() {
	mkdir('content');

	writeFile(
		'content/README.md',
		readme(
			'ChemDesk Content',
			`Portable Chemistry content lives here.

Markdown/MDX explains.
JSON connects.
Folders preserve the Master Lectures playlist → lecture hierarchy.
Category folders and chapter folders are prefixed to preserve familiar TSV order.
Do not create one giant Chemistry data dump.`,
		),
	);

	for (const category of Object.values(CATEGORY_MAP)) {
		mkdir(`content/${category.category_folder}`);

		writeFile(
			`content/${category.category_folder}/README.md`,
			readme(
				category.category_title,
				`Generated category folder.

Category folder prefix preserves the main Chemistry order:
01 Physical, 02 Inorganic, 03 Organic, 04 Practical.

Chapter/topic folders are created from the Master Lectures sheet.
Chapter folder prefixes preserve the order from the TSV within this category.

Stable category_id remains unprefixed in metadata.`,
			),
		);
	}
}

function createChapter(chapter) {
	const chapterDir = `content/${chapter.category_folder}/${chapter.chapter_folder}`;
	const nonReplaceRows = chapter.rows.filter(
		row => !row.replace_standardize_to_jee_wallah,
	);
	const replaceRows = chapter.rows.filter(
		row => row.replace_standardize_to_jee_wallah,
	);
	const replaceOnly = nonReplaceRows.length === 0 && replaceRows.length > 0;

	mkdir(chapterDir);
	gitkeep(`${chapterDir}/images`);

	writeFile(
		`${chapterDir}/README.md`,
		readme(
			chapter.title,
			`Generated from the Master Lectures sheet.

Rules:
- Keep chapter-level assets in images/.
- Keep lecture-specific assets inside each lecture folder's images/.
- Metadata lives beside the folders.
- The category and chapter folder prefixes preserve TSV order.
- Stable IDs remain unprefixed in metadata.
- Do not add HTML files yet.
- Do not add Chemistry teaching content yet.`,
		),
	);

	const sourcePlanStatuses = unique(
		chapter.rows.map(row => row.source_plan_status),
	);
	const syllabusUnits = unique(chapter.rows.map(row => row.jee_syllabus_unit));
	const syllabusUnitNames = unique(
		chapter.rows.map(row => row.jee_syllabus_unit_name),
	);
	const syllabusMappingConfidences = unique(
		chapter.rows.map(row => row.syllabus_mapping_confidence),
	);
	const currentPlaylistUrls = uniqueFlattened(
		chapter.rows.map(row => row.current_playlist_urls),
	);
	const recommendedPrimarySources = unique(
		chapter.rows.map(row => row.recommended_primary_source),
	);
	const recommendedSourceUrls = unique(
		chapter.rows.map(row => row.recommended_source_url),
	);
	const sourcePlanNotes = unique(
		chapter.rows.map(row => row.source_plan_notes),
	);

	writeJson(`${chapterDir}/chapter.meta.json`, {
		global_chapter_order: chapter.global_chapter_order,

		category_order: chapter.category_order,
		category_order_text: chapter.category_order_text,
		category_id: chapter.category_id,
		category_folder: chapter.category_folder,
		category_title: chapter.category_title,

		chapter_order: chapter.chapter_order,
		chapter_order_text: chapter.chapter_order_text,
		chapter_id: chapter.chapter_id,
		chapter_folder: chapter.chapter_folder,
		title: chapter.title,

		canonical_path: chapterDir,

		status: 'draft',
		source_status: 'needs_review',
		review_status: 'not_started',

		source_plan_mode: replaceOnly
			? 'replace_standardize_to_jee_wallah_topic_only'
			: 'lecture_scaffold',

		source_plan_statuses: sourcePlanStatuses,
		replace_standardize_to_jee_wallah: replaceOnly,

		planned_lecture_count: replaceOnly ? 0 : nonReplaceRows.length,
		original_master_lecture_row_count: chapter.rows.length,

		current_playlist_urls: currentPlaylistUrls,

		jee_syllabus_units: syllabusUnits,
		jee_syllabus_unit_names: syllabusUnitNames,
		syllabus_mapping_confidences: syllabusMappingConfidences,

		recommended_primary_sources: recommendedPrimarySources,
		recommended_source_urls: recommendedSourceUrls,
		source_plan_notes: sourcePlanNotes,

		exam_scope: ['jee', 'bitsat', 'tg-eapcet', 'cbse', 'tgipe'],

		notes: replaceOnly
			? 'Lecture subfolders intentionally skipped because this chapter is marked Replace/standardize to JEE Wallah in Master Lectures.'
			: 'Lecture folders generated from non-replacement Master Lectures rows.',
	});

	if (!replaceOnly) {
		mkdir(`${chapterDir}/lectures`);

		writeFile(
			`${chapterDir}/lectures/README.md`,
			readme(
				`${chapter.title} Lectures`,
				`Each lecture must live in its own folder.
Each lecture folder must contain its own images/ subfolder.
No shared lecture image dumping ground.`,
			),
		);
	}

	return { chapterDir, nonReplaceRows, replaceOnly };
}

function createLecture(chapter, row) {
	const chapterDir = `content/${chapter.category_folder}/${chapter.chapter_folder}`;
	const lectureDir = `${chapterDir}/lectures/${row.lecture_folder}`;

	mkdir(lectureDir);
	gitkeep(`${lectureDir}/images`);

	writeFile(
		`${lectureDir}/README.md`,
		readme(
			`Lecture ${row.lecture_number_text} — ${row.lecture_title}`,
			`Generated lecture scaffold only.

Do not add Chemistry teaching content yet.
Keep lecture assets inside this folder's images/ subfolder.`,
		),
	);

	writeJson(`${lectureDir}/lecture.meta.json`, {
		lecture_id: `${chapter.chapter_id}-lecture-${row.lecture_number_text}`,

		global_chapter_order: chapter.global_chapter_order,

		category_order: chapter.category_order,
		category_order_text: chapter.category_order_text,
		category_id: chapter.category_id,
		category_folder: chapter.category_folder,

		chapter_order: chapter.chapter_order,
		chapter_order_text: chapter.chapter_order_text,
		chapter_id: chapter.chapter_id,
		chapter_folder: chapter.chapter_folder,

		lecture_number: row.lecture_number,
		lecture_number_text: row.lecture_number_text,
		title: row.lecture_title,
		folder: row.lecture_folder,
		canonical_path: lectureDir,

		spreadsheet_row_number: row.spreadsheet_row_number,

		current_youtube_url: row.current_youtube_url,
		current_playlist_urls: row.current_playlist_urls,
		mynotes_url: row.mynotes_url,
		mynotes_old_url: row.mynotes_old_url,

		jee_syllabus_unit: row.jee_syllabus_unit,
		jee_syllabus_unit_name: row.jee_syllabus_unit_name,
		syllabus_mapping_confidence: row.syllabus_mapping_confidence,

		source_plan_status: row.source_plan_status,
		recommended_primary_source: row.recommended_primary_source,
		recommended_source_url: row.recommended_source_url,
		source_plan_notes: row.source_plan_notes,

		status: 'raw',
		source_status: 'needs_review',
		transcript_status: 'not_started',
		timestamp_map_status: 'not_started',
		concept_map_status: 'not_started',
		copyright_review_status: 'needs_review',

		notes:
			'Generated scaffold metadata from Master Lectures. CEE and Source Research must review before content use.',
	});
}

function auditExpectedCounts(chapters, lectureCount, imageGitkeepCount) {
	const chapterCount = chapters.length;

	const replaceOnlyCount = chapters.filter(chapter =>
		chapter.rows.every(row => row.replace_standardize_to_jee_wallah),
	).length;

	const expectedLectureCount = chapters.reduce((count, chapter) => {
		return (
			count +
			chapter.rows.filter(row => !row.replace_standardize_to_jee_wallah).length
		);
	}, 0);

	const expectedImageGitkeepCount = chapterCount + expectedLectureCount;

	const errors = [];

	if (chapterCount !== 25) {
		errors.push(`Expected 25 chapter folders, found ${chapterCount}.`);
	}

	if (expectedLectureCount !== 242) {
		errors.push(
			`Expected 242 non-replacement lecture folders, found ${expectedLectureCount}.`,
		);
	}

	if (lectureCount !== expectedLectureCount) {
		errors.push(
			`Created ${lectureCount} lecture folders, expected ${expectedLectureCount}.`,
		);
	}

	if (imageGitkeepCount !== expectedImageGitkeepCount) {
		errors.push(
			`Expected ${expectedImageGitkeepCount} images/.gitkeep files, found ${imageGitkeepCount}.`,
		);
	}

	if (replaceOnlyCount !== 3) {
		errors.push(
			`Expected 3 replace-standardize topic-only chapters, found ${replaceOnlyCount}.`,
		);
	}

	return errors;
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

function main() {
	const rawRows = loadRows();
	const rows = rawRows.map(normalizeRow);
	const chapters = groupByChapter(rows);

	createBaseFolders();

	let lectureCount = 0;

	for (const chapter of chapters) {
		const { nonReplaceRows } = createChapter(chapter);

		for (const row of nonReplaceRows) {
			createLecture(chapter, row);
			lectureCount += 1;
		}
	}

	const chapterMetaCount = countFilesByName(CONTENT_ROOT, 'chapter.meta.json');
	const lectureMetaCount = countFilesByName(CONTENT_ROOT, 'lecture.meta.json');
	const imageGitkeepCount = countImageGitkeeps(CONTENT_ROOT);

	const countErrors = auditExpectedCounts(
		chapters,
		lectureCount,
		imageGitkeepCount,
	);

	console.log('');
	console.log('ChemDesk content scaffold complete.');
	console.log('-----------------------------------');
	console.log(`Master Lectures rows read: ${rows.length}`);
	console.log(`Chapter folders: ${chapters.length}`);
	console.log(`Lecture folders created: ${lectureCount}`);
	console.log(`chapter.meta.json files: ${chapterMetaCount}`);
	console.log(`lecture.meta.json files: ${lectureMetaCount}`);
	console.log(`images/.gitkeep files: ${imageGitkeepCount}`);
	console.log('');
	console.log('Expected top-level content order:');
	console.log('- content/01-physical');
	console.log('- content/02-inorganic');
	console.log('- content/03-organic');
	console.log('- content/04-practical');
	console.log('');
	console.log('Replacement-only chapters skipped at lecture level:');
	console.log('- content/02-inorganic/02-p-block-elements');
	console.log('- content/02-inorganic/03-d-and-f-block-elements');
	console.log('- content/02-inorganic/04-coordination-compounds');
	console.log('');
	console.log('Chemical Bonding path:');
	console.log(
		'- content/01-physical/03-chemical-bonding-and-molecular-structure',
	);
	console.log('');

	if (countErrors.length > 0) {
		console.log('WARNINGS:');
		for (const error of countErrors) {
			console.log(`- ${error}`);
		}
		console.log('');
	} else {
		console.log('PASS: Expected scaffold counts match.');
		console.log('');
	}

	console.log(
		'No HTML files, Chemistry notes, Astro setup, or validation scripts were created.',
	);
}

main();
