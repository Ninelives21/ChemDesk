import { readFile } from "node:fs/promises";

const files = [
  "data/chemistry-domains.json",
  "data/chapters.json",
  "data/lectures.json",
  "data/concepts.json",
  "data/lecture-section-map.json"
];

const seen = new Map();
const duplicates = [];

function addId(id, file) {
  const previous = seen.get(id);
  if (previous) {
    duplicates.push({ id, first: previous, duplicate: file });
  } else {
    seen.set(id, file);
  }
}

for (const file of files) {
  const parsed = JSON.parse(await readFile(file, "utf8"));
  for (const item of parsed.items ?? []) {
    if (file === "data/chemistry-domains.json") {
      addId(item.domain_id, file);
    }

    if (file === "data/chapters.json") {
      addId(item.chapter_id, file);
    }

    if (file === "data/lectures.json") {
      addId(item.lecture_id, file);
    }

    if (file === "data/concepts.json") {
      addId(item.concept_id, file);
    }

    if (file === "data/lecture-section-map.json") {
      for (const section of item.sections ?? []) {
        addId(section.section_id, file);
      }
    }
  }
}

const registry = JSON.parse(await readFile("data/global-id-registry.json", "utf8"));
const registryIds = new Set();
for (const item of registry.items ?? []) {
  if (registryIds.has(item.id)) {
    duplicates.push({
      id: item.id,
      first: "data/global-id-registry.json",
      duplicate: "data/global-id-registry.json"
    });
  }
  registryIds.add(item.id);
}

if (duplicates.length > 0) {
  console.error("Duplicate IDs found:");
  for (const duplicate of duplicates) {
    console.error(`- ${duplicate.id}: ${duplicate.first} and ${duplicate.duplicate}`);
  }
  process.exit(1);
}

console.log(`No duplicate primary IDs found across ${files.length} starter data files.`);
