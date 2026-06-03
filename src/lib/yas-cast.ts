export type PodcastEpisode = {
	id: string;
	title: string;
	description: string;
	publishedAt: string;
	url: string;
	duration?: string;
	episodeNumber?: string;
	image?: string;
};

export type StarterEpisode = {
	title: string;
	episodeNumber?: string;
	note: string;
};

const feedUrl = "https://feeds.transistor.fm/the-yas-cast-yuba-and-sutter-podcast";

export const yasCastLinks = {
	apple: "https://podcasts.apple.com/us/podcast/the-yas-cast-yuba-and-sutter-podcast/id1730875855",
	spotify: "https://open.spotify.com/show/0bjdNEYKS5Zacs32XanGdk",
	rss: feedUrl,
	request: "/podcasts/request/?podcast=the-yas-cast",
};

export const starterEpisodes: StarterEpisode[] = [
	{
		title: "Jenna McKaye",
		episodeNumber: "25",
		note: "The life of a trafficked wife.",
	},
	{
		title: "Sherry Lavone #2",
		episodeNumber: "56",
		note: "Listen to her mind-expanding journey into ayahuasca.",
	},
	{
		title: "Shiloh Warner",
		episodeNumber: "55",
		note: "Always the first guest when I launch, relaunch, and re-relaunch my podcast. This one was from the relaunch.",
	},
	{
		title: "Rocci Raccoon",
		episodeNumber: "22",
		note: "A peek into the interesting life of a woman who technically was a hobo.",
	},
	{
		title: "Erin Lynch",
		episodeNumber: "26",
		note: "My chat with a paranormal investigator!",
	},
	{
		title: "Jennifer Chaplin",
		episodeNumber: "19",
		note: "Stories of solo travel from Japan to a bunch of places east of Japan.",
	},
];

export const fallbackEpisodes: PodcastEpisode[] = [
	{
		id: "230659eb-95c7-4de5-86fa-8ae035b3ca71",
		title: "ONOFF",
		description: "",
		publishedAt: "2024-02-14T05:00:00.000Z",
		url: "https://share.transistor.fm/s/1848b576",
		duration: "48 min",
		episodeNumber: "57",
	},
	{
		id: "94bc6403-b59e-45c6-b8e8-90edd37f3e64",
		title: "Sherry Lavone #2",
		description: "",
		publishedAt: "2024-01-10T05:00:00.000Z",
		url: "https://share.transistor.fm/s/7490f64b",
		duration: "1 hr 45 min",
		episodeNumber: "56",
	},
	{
		id: "ce72e03f-50de-4d3c-93f9-53b1c861bef3",
		title: "Shiloh Warner",
		description: "",
		publishedAt: "2024-01-02T05:00:00.000Z",
		url: "https://share.transistor.fm/s/a5642629",
		duration: "1 hr 4 min",
		episodeNumber: "55",
	},
	{
		id: "5845b954-c7f2-4964-b791-293da6b7b650",
		title: "Zachary Cross",
		description: "",
		publishedAt: "2022-05-23T04:00:00.000Z",
		url: "https://share.transistor.fm/s/55308127",
		duration: "1 hr 16 min",
		episodeNumber: "54",
	},
	{
		id: "f7bedb1e-4451-4966-a260-5be44a3503dd",
		title: "Kristina Cruz",
		description: "",
		publishedAt: "2022-05-12T04:00:00.000Z",
		url: "https://share.transistor.fm/s/91e263d5",
		duration: "1 hr 48 min",
		episodeNumber: "53",
	},
	{
		id: "bb228922-699e-4607-837b-c6bbf594e464",
		title: "Sherry Lavone",
		description: "",
		publishedAt: "2022-05-01T04:00:00.000Z",
		url: "https://share.transistor.fm/s/ec024349",
		duration: "1 hr 20 min",
		episodeNumber: "52",
	},
	{
		id: "c1a4cf1e-0f45-4898-ab28-ab430f64d67b",
		title: "Erin Lynch",
		description: "",
		publishedAt: "2020-09-19T04:00:00.000Z",
		url: "https://share.transistor.fm/s/2b35523d",
		duration: "1 hr 17 min",
		episodeNumber: "26",
	},
	{
		id: "be0a1b11-a6cf-44f7-a27a-961db3a0f201",
		title: "Jenna McKaye",
		description: "",
		publishedAt: "2020-09-09T04:00:00.000Z",
		url: "https://share.transistor.fm/s/e50f2427",
		duration: "1 hr 40 min",
		episodeNumber: "25",
	},
	{
		id: "4ac56ea0-4e17-4f41-8b1f-bbdbf3fc75ab",
		title: "Rocci Raccoon",
		description: "",
		publishedAt: "2020-08-29T04:00:00.000Z",
		url: "https://share.transistor.fm/s/dd010518",
		duration: "1 hr 14 min",
		episodeNumber: "22",
	},
	{
		id: "4a34eb72-2490-4f47-9218-00006766d640",
		title: "Jennifer Chaplin",
		description: "",
		publishedAt: "2020-08-19T04:00:00.000Z",
		url: "https://share.transistor.fm/s/582316ff",
		duration: "1 hr 20 min",
		episodeNumber: "19",
	},
];

type EpisodeFetchOptions = {
	fallbackOnError?: boolean;
};

export async function getYasCastEpisodes({ fallbackOnError = import.meta.env.DEV }: EpisodeFetchOptions = {}) {
	try {
		return await fetchYasCastEpisodes();
	} catch (error) {
		if (!fallbackOnError) throw error;
		console.warn(`Using fallback YaS Cast episodes: ${error instanceof Error ? error.message : String(error)}`);
		return fallbackEpisodes;
	}
}

export async function fetchYasCastEpisodes() {
	const xml = await fetchYasCastFeed();
	const episodes = parseEpisodeRss(xml);

	if (!episodes.length) {
		throw new Error("No episodes found in YaS Cast RSS feed");
	}

	return episodes;
}

export async function fetchYasCastFeed() {
	const response = await fetch(feedUrl);
	if (!response.ok) throw new Error(`RSS fetch failed with ${response.status}`);

	return response.text();
}

export function starterEpisodeCards(episodes: PodcastEpisode[]) {
	return starterEpisodes.map((starter, index) => ({
		...starter,
		index,
		episode: findStarterEpisode(episodes, starter),
	}));
}

function findStarterEpisode(episodes: PodcastEpisode[], starter: StarterEpisode) {
	if (starter.episodeNumber) {
		const episodeMatch = episodes.find((episode) => episode.episodeNumber === starter.episodeNumber);
		if (episodeMatch) return episodeMatch;
	}

	return episodes.find((episode) => episode.title.toLowerCase() === starter.title.toLowerCase());
}

function parseEpisodeRss(xml: string) {
	const itemBlocks = xml.match(/<item>[\s\S]*?<\/item>/g) ?? [];

	return itemBlocks
		.flatMap((item) => {
			const title = decodeXml(textTag(item, "title") ?? textTag(item, "itunes:title") ?? "Untitled episode");
			const description = cleanDescription(textTag(item, "description") ?? textTag(item, "itunes:summary") ?? "");
			const publishedAt = dateIsoString(textTag(item, "pubDate"));
			if (!publishedAt) return [];

			const duration = formatDuration(textTag(item, "itunes:duration"));
			const image = attributeValue(item, "itunes:image", "href");

			return {
				id: decodeXml(textTag(item, "guid") ?? title),
				title,
				description,
				publishedAt,
				url: decodeXml(textTag(item, "link") ?? yasCastLinks.spotify),
				duration,
				episodeNumber: textTag(item, "itunes:episode") ?? textTag(item, "podcast:episode") ?? undefined,
				image,
			};
		})
		.filter((episode) => episode.title);
}

function textTag(source: string, tagName: string) {
	const match = source.match(new RegExp(`<${escapeRegExp(tagName)}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/${escapeRegExp(tagName)}>`, "i"));
	return match?.[1]?.trim().replace(/^<!\[CDATA\[/, "").replace(/\]\]>$/, "").trim() ?? null;
}

function attributeValue(source: string, tagName: string, attributeName: string) {
	const match = source.match(
		new RegExp(`<${escapeRegExp(tagName)}\\s+[^>]*${escapeRegExp(attributeName)}=["']([^"']+)["'][^>]*\\/?>`, "i"),
	);

	return match?.[1] ? decodeXml(match[1]) : undefined;
}

function cleanDescription(value: string) {
	return decodeXml(value)
		.replace(/<[^>]+>/g, "")
		.replace(/\s+/g, " ")
		.trim();
}

function decodeXml(value: string) {
	return value
		.replaceAll("&amp;", "&")
		.replaceAll("&lt;", "<")
		.replaceAll("&gt;", ">")
		.replaceAll("&quot;", '"')
		.replaceAll("&#39;", "'");
}

function formatDuration(value: string | null) {
	if (!value) return undefined;

	const seconds = Number.parseInt(value, 10);
	if (!Number.isFinite(seconds)) return value;

	const hours = Math.floor(seconds / 3600);
	const minutes = Math.round((seconds % 3600) / 60);

	if (hours && minutes) return `${hours} hr ${minutes} min`;
	if (hours) return `${hours} hr`;
	return `${minutes} min`;
}

function dateIsoString(value: string | null) {
	if (!value) return null;

	const date = new Date(value);
	if (Number.isNaN(date.getTime())) return null;

	return date.toISOString();
}

function escapeRegExp(value: string) {
	return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
