import { readFile, readdir } from "node:fs/promises";
import path from "node:path";

const dataFiles = {
  exams: "data/exams.json",
  domains: "data/chemistry-domains.json",
  chapters: "data/chapters.json",
  lectures: "data/lectures.json",
  concepts: "data/concepts.json",
  lectureSectionMap: "data/lecture-section-map.json",
  traps: "data/traps.json",
  formulas: "data/formulas.json",
  diagrams: "data/diagrams.json",
  syllabusMap: "data/syllabus-map.json",
  sourceStatus: "data/source-status.json",
  statusEnums: "data/status-enums.json",
  globalIdRegistry: "data/global-id-registry.json",
  pyqs: "data/pyqs.json",
  pyqConceptMap: "data/pyq-concept-map.json"
};

const mdxRoots = [
  "src/content/chapters",
  "src/content/lectures",
  "src/content/concepts",
  "src/content/pages"
];

const draftOnlyPublicStatuses = new Set([
  "raw",
  "draft",
  "cee_processed",
  "content_edited",
  "needs_update",
  "deprecated",
  "rejected"
]);

const errors = [];

async function readJson(file) {
  try {
    return JSON.parse(await readFile(file, "utf8"));
  } catch (error) {
    errors.push(`${file}: invalid or unreadable JSON (${error.message})`);
    return { items: [] };
  }
}

function items(data, file) {
  if (!Array.isArray(data.items)) {
    errors.push(`${file}: expected an items array`);
    return [];
  }
  return data.items;
}

function requireFields(file, label, item, fields) {
  for (const field of fields) {
    if (item[field] === undefined || item[field] === null || item[field] === "") {
      errors.push(`${file}: ${label} is missing required field ${field}`);
    }
  }
}

function validateStatusVisibility(file, label, item, statuses, visibilities) {
  if (item.status !== undefined && !statuses.has(item.status)) {
    errors.push(`${file}: ${label} has invalid status ${item.status}`);
  }

  if (item.visibility !== undefined && !visibilities.has(item.visibility)) {
    errors.push(`${file}: ${label} has invalid visibility ${item.visibility}`);
  }

  if (item.visibility === "public" && draftOnlyPublicStatuses.has(item.status)) {
    errors.push(`${file}: ${label} cannot be public while status is ${item.status}`);
  }

  if (item.visibility === "public" && item.status !== "published") {
    errors.push(`${file}: ${label} public exposure requires status published`);
  }
}

function hasExplicitPyqTaggingStart(data) {
  return data.tagging_started === true || ["started", "in_progress", "approved"].includes(data.tagging_status);
}

async function listMdxFiles(root) {
  const found = [];

  async function walk(dir) {
    let entries = [];
    try {
      entries = await readdir(dir, { withFileTypes: true });
    } catch (error) {
      if (error.code !== "ENOENT") {
        errors.push(`${dir}: unable to inspect MDX files (${error.message})`);
      }
      return;
    }

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        await walk(fullPath);
      } else if (entry.isFile() && entry.name.endsWith(".mdx")) {
        found.push(fullPath);
      }
    }
  }

  await walk(root);
  return found;
}

function parseFrontmatter(content, file) {
  if (!content.startsWith("---\n")) {
    errors.push(`${file}: missing frontmatter block`);
    return new Map();
  }

  const endIndex = content.indexOf("\n---", 4);
  if (endIndex === -1) {
    errors.push(`${file}: frontmatter block is not closed`);
    return new Map();
  }

  const frontmatter = content.slice(4, endIndex);
  const fields = new Map();
  for (const line of frontmatter.split("\n")) {
    const match = line.match(/^([A-Za-z0-9_-]+):(?:\s*(.*))?$/);
    if (match) {
      fields.set(match[1], match[2] ?? "");
    }
  }
  return fields;
}

function validateMdxFrontmatter(file, fields) {
  for (const field of ["id", "title", "route_slug", "status", "visibility"]) {
    if (!fields.has(field) || fields.get(field) === "") {
      errors.push(`${file}: frontmatter is missing required field ${field}`);
    }
  }

  if (fields.has("slug")) {
    errors.push(`${file}: frontmatter uses reserved field slug; use route_slug instead`);
  }
}

const data = Object.fromEntries(
  await Promise.all(Object.entries(dataFiles).map(async ([key, file]) => [key, await readJson(file)]))
);

const statuses = new Set(data.statusEnums.status ?? []);
const visibilities = new Set(data.statusEnums.visibility ?? []);
if (statuses.size === 0) {
  errors.push(`${dataFiles.statusEnums}: expected non-empty status enum`);
}
if (visibilities.size === 0) {
  errors.push(`${dataFiles.statusEnums}: expected non-empty visibility enum`);
}

const domainIds = new Set(items(data.domains, dataFiles.domains).map((item) => item.domain_id));
const chapterIds = new Set(items(data.chapters, dataFiles.chapters).map((item) => item.chapter_id));
const lectureIds = new Set(items(data.lectures, dataFiles.lectures).map((item) => item.lecture_id));
const conceptIds = new Set(items(data.concepts, dataFiles.concepts).map((item) => item.concept_id));

for (const item of items(data.domains, dataFiles.domains)) {
  const label = item.domain_id ?? "domain";
  validateStatusVisibility(dataFiles.domains, label, item, statuses, visibilities);
}

for (const item of items(data.chapters, dataFiles.chapters)) {
  const label = item.chapter_id ?? "chapter";
  requireFields(dataFiles.chapters, label, item, ["chapter_id", "title", "domain_id", "status", "visibility"]);
  validateStatusVisibility(dataFiles.chapters, label, item, statuses, visibilities);
  if (item.domain_id && !domainIds.has(item.domain_id)) {
    errors.push(`${dataFiles.chapters}: ${label} references missing domain_id ${item.domain_id}`);
  }
}

for (const item of items(data.lectures, dataFiles.lectures)) {
  const label = item.lecture_id ?? "lecture";
  requireFields(dataFiles.lectures, label, item, [
    "lecture_id",
    "title",
    "chapter_id",
    "domain_id",
    "status",
    "visibility"
  ]);
  validateStatusVisibility(dataFiles.lectures, label, item, statuses, visibilities);
  if (item.chapter_id && !chapterIds.has(item.chapter_id)) {
    errors.push(`${dataFiles.lectures}: ${label} references missing chapter_id ${item.chapter_id}`);
  }
  if (item.domain_id && !domainIds.has(item.domain_id)) {
    errors.push(`${dataFiles.lectures}: ${label} references missing domain_id ${item.domain_id}`);
  }
}

for (const item of items(data.concepts, dataFiles.concepts)) {
  const label = item.concept_id ?? "concept";
  requireFields(dataFiles.concepts, label, item, [
    "concept_id",
    "title",
    "chapter_id",
    "domain_id",
    "status",
    "visibility"
  ]);
  validateStatusVisibility(dataFiles.concepts, label, item, statuses, visibilities);
  if (item.chapter_id && !chapterIds.has(item.chapter_id)) {
    errors.push(`${dataFiles.concepts}: ${label} references missing chapter_id ${item.chapter_id}`);
  }
  if (item.domain_id && !domainIds.has(item.domain_id)) {
    errors.push(`${dataFiles.concepts}: ${label} references missing domain_id ${item.domain_id}`);
  }
}

for (const item of items(data.lectureSectionMap, dataFiles.lectureSectionMap)) {
  const label = item.lecture_id ?? "lecture-section-map entry";
  requireFields(dataFiles.lectureSectionMap, label, item, ["lecture_id"]);
  if (item.lecture_id && !lectureIds.has(item.lecture_id)) {
    errors.push(`${dataFiles.lectureSectionMap}: ${label} references missing lecture_id ${item.lecture_id}`);
  }
  if (!Array.isArray(item.sections)) {
    errors.push(`${dataFiles.lectureSectionMap}: ${label} is missing sections array`);
    continue;
  }
  for (const section of item.sections) {
    const sectionLabel = section.section_id ?? `${label} section`;
    requireFields(dataFiles.lectureSectionMap, sectionLabel, section, ["section_id"]);
    if (!Array.isArray(section.concept_ids)) {
      errors.push(`${dataFiles.lectureSectionMap}: ${sectionLabel} is missing concept_ids array`);
      continue;
    }
    for (const conceptId of section.concept_ids) {
      if (!conceptIds.has(conceptId)) {
        errors.push(`${dataFiles.lectureSectionMap}: ${sectionLabel} references missing concept_id ${conceptId}`);
      }
    }
  }
}

for (const [file, parsed] of [
  [dataFiles.pyqs, data.pyqs],
  [dataFiles.pyqConceptMap, data.pyqConceptMap]
]) {
  const pyqItems = items(parsed, file);
  if (pyqItems.length > 0 && !hasExplicitPyqTaggingStart(parsed)) {
    errors.push(`${file}: PYQ items or mappings require explicit tagging_started/tagging_status metadata`);
  }
}

for (const root of mdxRoots) {
  const files = await listMdxFiles(root);
  for (const file of files) {
    const content = await readFile(file, "utf8");
    const fields = parseFrontmatter(content, file);
    validateMdxFrontmatter(file, fields);
  }
}

const publicPyqContentFiles = [
  ...(await listMdxFiles("src/content/pages")),
  ...(await listMdxFiles("src/pages"))
].filter((file) => /pyq/i.test(file));
if (publicPyqContentFiles.length > 0) {
  for (const file of publicPyqContentFiles) {
    errors.push(`${file}: public PYQ pages are not allowed before PYQ tagging starts`);
  }
}

if (errors.length > 0) {
  console.error("Content validation failed:");
  for (const error of errors) {
    console.error(`- ${error}`);
  }
  process.exit(1);
}

console.log("Content metadata, references, public exposure, PYQ placeholders, and MDX frontmatter are valid.");
