import { getCollection, type CollectionEntry } from "astro:content";

export type WritingPost = CollectionEntry<"writing">;

export async function getPublishedWriting() {
	return (await getCollection("writing"))
		.filter((post) => !post.data.draft)
		.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export function formatWritingDate(date: Date) {
	return new Intl.DateTimeFormat("en", {
		month: "long",
		day: "numeric",
		year: "numeric",
		timeZone: "UTC",
	}).format(date);
}

export function writingTypeLabel(type: string) {
	return type.charAt(0).toUpperCase() + type.slice(1);
}

export function writingSlug(post: WritingPost) {
	if (post.data.slug) return post.data.slug;

	const filename = post.id.split("/").pop() ?? post.id;
	return filename.replace(/^\d{4}-\d{2}-/, "");
}

export function writingUrl(post: WritingPost) {
	return `/writing/${writingSlug(post)}/`;
}
