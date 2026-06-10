import { defineCollection, z } from "astro:content";

const statusEnum = z.enum([
  "raw",
  "draft",
  "cee_processed",
  "content_edited",
  "source_reviewed",
  "user_reviewed",
  "approved",
  "published",
  "needs_update",
  "deprecated",
  "rejected"
]);

const visibilityEnum = z.enum(["internal", "preview", "public", "archived"]);

const baseSchema = z.object({
  id: z.string(),
  title: z.string(),
  route_slug: z.string(),
  status: statusEnum,
  visibility: visibilityEnum,
  chapter_id: z.string().optional(),
  domain_id: z.string().optional(),
  exam_scope: z.array(z.string()).optional(),
  source_status: z.string().optional(),
  review_status: z.string().optional()
});

export const collections = {
  chapters: defineCollection({ schema: baseSchema }),
  lectures: defineCollection({ schema: baseSchema }),
  concepts: defineCollection({ schema: baseSchema }),
  pages: defineCollection({ schema: baseSchema })
};
