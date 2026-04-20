import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const writing = defineCollection({
	loader: glob({
		base: "./src/content/writing",
		pattern: ["published/**/*.md", "drafts/**/*.md"],
		generateId: ({ entry, data }) => entry.replace(/\.md$/, ""),
	}),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		date: z.coerce.date(),
		updated: z.coerce.date().optional(),
		type: z.enum(["essay", "note", "story", "list"]),
		topics: z.array(z.string()).default([]),
		draft: z.boolean(),
		featured: z.boolean().default(false),
		slug: z.string().optional(),
		image: z
			.object({
				src: z.string(),
				alt: z.string(),
			})
			.optional(),
		canonicalUrl: z.string().url().optional(),
	}),
});

export const collections = { writing };
