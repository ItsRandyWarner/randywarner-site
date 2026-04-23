# Components And Shared Layouts

## Purpose

Shared components keep repeated UI and logic consistent across pages. Use them when a pattern appears in more than one place or when a piece of UI has behavior that should stay centralized.

## Current Shared Pieces

### `src/layouts/BaseLayout.astro`

Use for normal public pages.

Responsibilities:

- HTML document shell
- Shared title and description metadata
- Open Graph and Twitter preview metadata
- Canonical URL when the production `site` URL is configured
- Favicon links
- Apple touch icon link
- Viewport meta tag
- Site-wide CSS variables
- Global background and link styling
- Shared `SiteHeader`
- Shared `SiteFooter`

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

Writing detail pages should pass `type="article"` so link previews identify them as articles. Other public pages can use the default `website` type.

The default social preview image is `public/social-preview.png`. It does not need to change every time homepage imagery changes; update it only when the site identity, share-card copy, or desired social preview visual changes.

Writing detail pages can also pass a post-level `image` prop to override the default social preview image. The current writing route uses the post frontmatter `image.src` when present, and falls back to `public/social-preview.png` when a post has no featured image.

### `src/components/SiteHeader.astro`

Use for the primary site navigation. This is already included by `BaseLayout`, so pages usually should not import it directly.

Current nav items:

- Home
- Writing
- Podcasts

The `current` prop controls the selected nav style.

On narrow screens, the nav collapses behind an accessible hamburger icon button so future links do not crowd the top bar. The breakpoint is intentionally a little wider than phone-only so it can be tested in desktop Safari's minimum window size.

### `src/components/SiteFooter.astro`

Use for the shared site footer. This is already included by `BaseLayout`, so pages usually should not import it directly.

Current footer content:

- A short return invitation
- Social links for Instagram and Facebook
- Copyright line below the black footer block

The footer started as the homepage's black return-note section. It now appears across public pages so interior pages do not end abruptly. Footer content should stay light until the site has clearer contact, newsletter, or about-page needs.

Do not add footer navigation links just to fill space. The header already carries the current primary navigation, and the footer should only grow when a real contact path, newsletter, about page, or future section deserves a persistent link.

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

The same frontmatter `image` can also drive the social preview for the individual writing post page, so content authors do not need to maintain a second image field for sharing.

## Shared Helpers

### `src/lib/writing.ts`

Use for writing-related logic:

- Load all writing for local draft previews
- Load published writing
- Format writing dates
- Convert writing type slugs into display labels
- Generate writing slugs and URLs

Keep repeated content logic here instead of duplicating it in pages.

## Repeated Styles To Watch

Buttons, bordered panels, and large section headings currently repeat in page-local CSS. That is acceptable while the design is still changing, but if another page uses the same patterns, consider extracting a small shared component or global utility style so spacing, hover states, and borders stay consistent.

## When To Create A New Component

Create a component when:

- The same UI appears on more than one page.
- A piece of UI has multiple states or behavior.
- A change should update consistently across the site.
- The page file is becoming hard to scan because repeated markup is in the way.

Avoid making components too early for one-off homepage sections that are still changing quickly.
