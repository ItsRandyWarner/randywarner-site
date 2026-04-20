# Site Architecture

## Current Site Shape

Implemented:

- `/` - hybrid homepage for writing, The YaS Cast, and future creative paths.
- `/writing` - writing index backed by Astro content collections.
- `/writing/[slug]` - implemented individual writing route for published posts.
- `/podcasts` - podcast hub led by The YaS Cast.
- `/podcasts/request` - shared podcast request form for guest suggestions, topic suggestions, and guest requests.
- `/podcasts/request/thanks` - form success page.

The homepage should remain the front door. Future pages should deepen the main areas without turning the site into a heavy platform too early.

## Implemented Pages

### `/writing`

Purpose: a home for Randy's short and long-form writing.

Status: implemented.

The writing system uses Astro content collections with Markdown files and frontmatter. See `docs/writing-system.md`.

Current writing fields:

- `title`
- `description`
- `date`
- `type` such as `essay`, `note`, `story`, or `list`
- `topics` such as life, relationships, spirituality, health, stories, and comedy
- `draft`
- `featured`
- optional `image`
- optional `slug`
- optional `updated`
- optional `canonicalUrl`

Draft and published files can live in separate folders for human clarity, while `draft` remains the code-level source of truth for publication state.

### `/podcasts`

Purpose: a podcast hub led by The YaS Cast, with room for future podcast-related work.

Status: implemented. See `docs/podcast-page.md`.

This page can eventually include:

- The YaS Cast show description and links.
- Recent or featured episodes from the Transistor RSS feed.
- Podcasts Randy produces.
- Additional podcasts Randy starts.
- Episodes where Randy appears as a guest.

V1 shows The YaS Cast, Spotify and Apple Podcasts links, podcast artwork, and a path to the podcast request form. Future podcast categories should remain invisible until there is real content.

No required page-structure questions remain for v1.

Recommendation: keep `/podcasts` manually curated for now. Add RSS fetching only when the page needs current episode data.

### `/podcasts/request`

Purpose: one shared form for podcast-related submissions.

Status: implemented with Netlify Forms.

Current form supports:

- Guest suggestion
- Topic suggestion
- Guest request
- Other

The form includes a podcast field so future podcast pages can link to the same form and preselect the relevant show.

## Planned Pages

### `/about`

Purpose: a personal context page.

Status: pinned for later.

This page should not be built until the homepage voice and writing direction are clearer. It can eventually explain who Randy is, what he makes, what he is interested in, and why the site exists.

### `/contact`

Purpose: a simple connection path.

Status: pinned for later.

This page should wait until the desired contact behavior is clearer. The first version may only need social links or email. A form can come later if it solves a real need.

### `/photos`

Purpose: a photography/gallery surface.

Status: future version.

This page may need its own planning because image handling, galleries, captions, albums, and optimization choices can affect the technical structure.

## Future Pages To Consider

- `/projects` for creative experiments and things Randy makes.
- `/shop` for inexpensive creative projects, kept secondary and non-salesy.
- `/now` for current focus and recently updated things.

## Navigation Direction

Current primary navigation:

- Home
- Writing
- Podcasts

Avoid adding every future section to the main nav before content exists. The homepage can hint at future areas without turning them into empty destinations.

## Implementation Guidance

- Build pages only when their content and purpose are clear enough.
- Prefer Astro pages, layouts, and content collections before adding heavier tooling.
- Keep the homepage as a curated front door, not a dumping ground for every future idea.
- Revisit Tailwind only if repeated components and shared styles become hard to maintain with Astro-scoped CSS.
