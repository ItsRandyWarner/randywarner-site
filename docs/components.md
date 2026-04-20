# Components And Shared Layouts

## Purpose

Shared components keep repeated UI and logic consistent across pages. Use them when a pattern appears in more than one place or when a piece of UI has behavior that should stay centralized.

## Current Shared Pieces

### `src/layouts/BaseLayout.astro`

Use for normal public pages.

Responsibilities:

- HTML document shell
- Shared metadata fields
- Favicon links
- Viewport meta tag
- Site-wide CSS variables
- Global background and link styling
- Shared `SiteHeader`

Typical usage:

```astro
---
import BaseLayout from "../layouts/BaseLayout.astro";
---

<BaseLayout title="Page Title" description="Page description." current="writing">
  <main>
    Page content
  </main>
</BaseLayout>
```

### `src/components/SiteHeader.astro`

Use for the primary site navigation. This is already included by `BaseLayout`, so pages usually should not import it directly.

Current nav items:

- Home
- Writing
- Podcasts

The `current` prop controls the selected nav style.

### `src/components/WritingCard.astro`

Use anywhere a writing entry needs to appear as a card, such as:

- `/writing`
- Homepage writing section
- Related posts later

Responsibilities:

- Optional featured image slot
- Type chip
- Date
- Title link
- Description
- Topic chips
- Read link

The image slot is fixed-ratio and constrained so oversized images cannot disrupt the page layout.

## Shared Helpers

### `src/lib/writing.ts`

Use for writing-related logic:

- Load published writing
- Format writing dates
- Convert writing type slugs into display labels
- Generate writing slugs and URLs

Keep repeated content logic here instead of duplicating it in pages.

## When To Create A New Component

Create a component when:

- The same UI appears on more than one page.
- A piece of UI has multiple states or behavior.
- A change should update consistently across the site.
- The page file is becoming hard to scan because repeated markup is in the way.

Avoid making components too early for one-off homepage sections that are still changing quickly.
