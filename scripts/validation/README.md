# Validation

ChemDesk validation protects stable IDs, metadata references, and public exposure rules while the Chemical Bonding pilot is still small.

## Commands

- `npm run validate:ids`
  Checks duplicate primary IDs across starter domain, chapter, lecture, concept, lecture-section, and global registry data.

- `npm run validate:content`
  Checks required metadata fields, valid references, status and visibility values, public exposure rules, PYQ placeholder protection, and MDX frontmatter route slug rules.

- `npm run validate`
  Runs both validators in sequence.

## What Is Protected

- duplicate ID validation
- missing required fields for chapters, lectures, concepts, and lecture sections
- invalid chapter, domain, lecture, and concept references
- status and visibility enum checks
- draft/internal content not published
- public exposure only when `status: published` and `visibility: public`
- `route_slug` required in MDX frontmatter because `slug` is reserved by Astro content collections
- failure when MDX frontmatter uses `slug` instead of `route_slug`
- PYQ placeholder protection until tagging explicitly starts
- public PYQ pages blocked before PYQ tagging starts
- future RAG export should only use published/public content
