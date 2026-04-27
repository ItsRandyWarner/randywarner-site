import { publishedWritingSlugs } from "./published-writing-slugs";

const publishedWritingSlugSet = new Set<string>(publishedWritingSlugs);

export function isPublishedWritingSlug(postSlug: string) {
	return publishedWritingSlugSet.has(postSlug);
}
