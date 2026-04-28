# The YaS Cast Page Plan

## Purpose

Create a dedicated page for The YaS Cast at `/podcasts/the-yas-cast/`.

The page should feel more alive than a static listen-links page, but still editorial and personal. The best version combines:

- Randy's own curation
- current episode data
- listener behavior from Transistor analytics
- clear paths to listen, suggest guests, suggest topics, or request to be a guest

The goal is not to build a full podcast CMS. The goal is a strong show page that helps people understand the show, start listening, and see what episodes are resonating.

## Current Context

The existing `/podcasts` page is a hub. It introduces The YaS Cast and links to Spotify, Apple Podcasts, and the podcast request form.

That hub should remain simple. The dedicated YaS Cast page can carry the richer show-specific experience.

## Page Positioning

The YaS Cast is Randy's way to connect with people and explore the Yuba-Sutter community through better conversations.

The page should not feel like a generic podcast archive. It should feel like:

- a local conversation hub
- a starting point for new listeners
- a living index of recent and popular conversations
- an invitation for the community to participate

## Recommended Route

Use:

```text
/podcasts/the-yas-cast/
```

Possible later routes:

```text
/podcasts/the-yas-cast/episodes/
/podcasts/the-yas-cast/[episode]/
```

Do not build individual episode pages until there is a clear need for show notes, transcripts, guest links, photos, or related writing.

## Recommended Page Structure

### 1. Show Hero

Purpose:

- make the show identity obvious immediately
- give new visitors a quick emotional reason to listen
- provide primary listen links

Recommended content:

- The YaS Cast name
- short personal description
- podcast artwork
- Apple Podcasts link
- Spotify link
- request form link

Tone:

- first-person when useful
- warm, local, curious
- less "about this podcast" and more "why I keep having these conversations"

### 2. Latest Episode

Purpose:

- keep the page fresh automatically
- give returning visitors an obvious next listen

Data source:

- Transistor RSS feed first
- Transistor API later if richer fields are needed

Recommended fields:

- episode title
- publish date
- short description
- Transistor episode URL or embed
- optional duration
- optional episode artwork from item-level RSS artwork

### 3. Start Here

Purpose:

- help new listeners avoid decision fatigue
- represent the show editorially, not just statistically

Data source:

- manual curated list in code or a small local data file

Recommended behavior:

- maintain a small curated pool of starter episodes
- show 3 picks at a time
- rotate the visible 3 weekly in browser JavaScript
- add or remove episodes manually when better starter episodes emerge
- pin starter picks by episode number when possible, especially when guests have appeared more than once

Why manual:

- "Most popular" is not always "best introduction"
- this keeps Randy's taste and intent in the page
- matching by episode number avoids duplicate-title ambiguity while keeping titles readable in code

Why client-side rotation:

- the visible starter picks can change weekly even when the site is not redeployed
- the pool stays editorial, not algorithmic
- visitors in the same week see the same 3 picks

### 4. Popular With Listeners

Purpose:

- surface episodes that are actually getting attention
- make the page feel dynamic and alive

Data source:

- Transistor analytics API

Possible ranking windows:

- all-time most downloaded
- last 30 days
- last 90 days

Recommended first version:

- "Popular with listeners" using the last 90 days if the analytics API supports the needed date range cleanly
- fall back to all-time if date-window data is awkward

Important wording:

- use "popular with listeners" or "most downloaded"
- avoid implying these are perfect human listens

Podcast analytics note:

- Transistor's core public metric is downloads, which is the podcast industry standard but not the same thing as confirmed completed listens.

### 5. Recent Conversations

Purpose:

- provide a browsable recent episode list
- make the page useful even if someone does not want the highlighted picks

Data source:

- RSS feed

Recommended behavior:

- show latest 6 to 12 episodes
- include title, date, short description, and listen link
- avoid infinite archives in the first version

### 6. Suggest A Guest Or Topic

Purpose:

- turn listeners into contributors
- connect the show page to the existing request flow

Use:

```text
/podcasts/request/?podcast=the-yas-cast
/podcasts/request/?podcast=the-yas-cast&type=guest_suggestion
/podcasts/request/?podcast=the-yas-cast&type=topic_suggestion
/podcasts/request/?podcast=the-yas-cast&type=guest_request
```

The current request form already supports this shape.

## Data Sources

### RSS Feed

Current feed:

```text
https://feeds.transistor.fm/the-yas-cast-yuba-and-sutter-podcast
```

Use for:

- latest episode
- recent episode list
- title, description, date, enclosure/audio fields, episode links, and item-level episode artwork when present

Pros:

- public
- no API key needed
- safe to fetch at build time for the current static page
- can be fetched dynamically later through a server-side endpoint

Cons:

- no private analytics
- field shape may require parsing and cleanup
- build-time fetching only updates when the site rebuilds

### Transistor API

Use for:

- episode metadata if RSS is not enough
- show-level analytics
- episode-level analytics
- most downloaded or recently popular episodes

Private environment variables needed:

```text
TRANSISTOR_API_KEY
TRANSISTOR_YAS_CAST_SHOW_ID
```

Potentially useful later:

```text
TRANSISTOR_YAS_CAST_FEED_ID
```

Security rule:

- never expose the Transistor API key to browser JavaScript
- fetch analytics through build-time scripts or Netlify Functions only

## Dynamic Strategy

Recommended approach:

- Use build-time fetching for public RSS data in the current release.
- Move public RSS fetching to a small server-side endpoint/cache in a later release so the page can refresh after Transistor updates without requiring a deploy.
- Use a Netlify Function or scheduled/build-time script for private analytics.
- Cache analytics output into a small generated file if the page can tolerate stale data.

Why:

- the site stays mostly static
- the API key stays private
- the page can become dynamic enough without introducing a heavy CMS

First practical version:

1. Fetch RSS at build time.
2. Render Latest Episode and Recent Conversations.
3. Keep Start Here editorial, with client-side weekly rotation from the curated pool.
4. Leave Popular With Listeners manual or hidden until Transistor API details are confirmed.

Second practical version:

1. Fetch public RSS through a Netlify Function or equivalent server-side route.
2. Return normalized episode JSON for Latest Episode and Recent Conversations.
3. Cache the response long enough to avoid hitting the feed on every visitor request.
4. Keep the current build-time fallback data so the page still works if the RSS request fails.

Third practical version:

1. Add Transistor API integration behind a server-side script or function.
2. Generate a "popular episodes" data file.
3. Render Popular With Listeners from that generated data.

## Manual Vs Automatic

Manual:

- Start Here picks
- show description
- section copy
- any "Randy recommends" notes

Automatic:

- latest episode, currently refreshed at deploy/build time
- recent episode list, currently refreshed at deploy/build time
- popular episodes by download data
- episode publish dates, currently refreshed at deploy/build time
- episode-specific artwork when the RSS feed includes it, currently refreshed at deploy/build time

Hybrid:

- "Popular with listeners" can be automatic, but Randy can exclude an episode if it is not a good public highlight.
- "Start Here" uses a manual pool with automatic weekly rotation of the visible 3 picks.
- Later dynamic RSS fetching should update Latest Episode and Recent Conversations without changing the manual starter pool.

## Visual Direction

The page should use real show assets and episode information.

Recommended feel:

- editorial
- useful
- local
- a little playful
- not corporate podcast-network energy

Avoid:

- generic "listen now" landing-page fluff
- empty future sections
- a giant archive with no curation
- making analytics feel like a scoreboard

## Suggested Data Model

Possible local file for manual picks:

```ts
export const yasCastStarterEpisodes = [
  {
    transistorEpisodeId: "example",
    note: "A good first listen because..."
  }
];
```

Possible normalized episode shape:

```ts
type PodcastEpisode = {
  id: string;
  title: string;
  description: string;
  publishedAt: string;
  url: string;
  audioUrl?: string;
  duration?: string;
  image?: string;
};
```

Possible analytics shape:

```ts
type PodcastEpisodeAnalytics = {
  episodeId: string;
  downloads: number;
  window: "30d" | "90d" | "all_time";
};
```

## Build Stages

### Build 1: Static Dedicated Show Page

Status: implemented.

Scope:

- add `/podcasts/the-yas-cast/`
- reuse artwork and listen links
- add show hero
- add manual Start Here pool with client-side weekly rotation
- add request-form calls to action

Definition of done:

- the page is useful without any API integration
- `/podcasts` can link to it as the deeper show page
- the Start Here section can feel fresh between deploys

### Build 2: RSS-Powered Latest And Recent Episodes

Status: implemented with fallback data.

Scope:

- fetch RSS at build time
- render Latest Episode
- render Recent Conversations
- pull item-level episode artwork when the RSS feed includes it
- keep page working if RSS fetch fails by using fallback data

Definition of done:

- the page updates when new episodes publish
- unique episode artwork appears for newer episodes that include it
- older episodes without unique artwork stay text-only
- build does not fail permanently because of a temporary RSS issue

### Build 3: Dynamic RSS Refresh

Scope:

- add a Netlify Function or equivalent server-side route for public RSS fetching
- return normalized episode JSON for the show page
- cache RSS results to keep the page fast and avoid unnecessary feed requests
- keep fallback episode data for feed/network failures

Definition of done:

- new Transistor episodes can appear on the page without a site deploy
- Latest Episode and Recent Conversations use the same normalized episode shape as the current build-time parser
- the browser does not fetch or parse raw RSS directly

### Build 4: Transistor Analytics Highlights

Scope:

- add `TRANSISTOR_API_KEY`
- add `TRANSISTOR_YAS_CAST_SHOW_ID`
- fetch episode download data server-side
- render Popular With Listeners

Definition of done:

- popular episodes are driven by Transistor data
- API key stays private
- wording clearly frames downloads/listener popularity without overclaiming

### Build 5: Optional Episode Detail Pages

Scope:

- add individual episode routes only if needed
- support show notes, guest links, transcripts, related writing, and photos

Definition of done:

- an episode page adds real value beyond the Transistor page or embedded player

## Open Questions

- Should Popular With Listeners use all-time, last 90 days, or last 30 days?
- Does Randy want public download counts visible, or just ranking without numbers?
- Should the show page include an embedded player, or send people to Apple/Spotify/Transistor?
- Does Transistor API access on Randy's plan include the analytics endpoints needed for episode-level ranking?
- Should analytics be fetched at build time, on-demand through a Netlify Function, or through a scheduled cache update?
- Should dynamic RSS use a short cache window, like 15 minutes, or a longer one, like 1 to 6 hours?

## Recommendation

Start with Build 1 and Build 2 together if possible.

That would give the page enough life to justify existing, while keeping the analytics work separate until the Transistor API key and endpoint behavior are confirmed.
