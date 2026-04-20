# Technical Plan

## Architecture

The site is a mostly static Astro application:

- `src/pages/` for route-level pages.
- `src/components/` for reusable UI sections.
- `src/layouts/` for shared page shells.
- `src/lib/` for shared helper logic.
- `src/content/` for structured Markdown content.
- `public/` for static files that should be served unchanged.

## Routes

- `/` - implemented homepage.
- `/writing` - implemented writing index backed by the writing content collection.
- `/writing/[slug]` - implemented individual writing route for published posts.
- `/podcasts` - implemented podcast hub for The YaS Cast, with future room for produced podcasts, future shows, and guest appearances.
- `/podcasts/request` - implemented shared podcast request form.
- `/podcasts/request/thanks` - implemented form success page.
- `/about` - possible later page.
- `/contact` - possible later page.
- `/photos` - future photography page.

See `docs/site-architecture.md` for page planning details.

## Content System Direction

Astro content collections are implemented for writing. The system uses Markdown files with frontmatter fields such as title, description, date, type, topics, draft status, featured status, optional slug, and optional image.

Drafts and published pieces should live in separate folders for human clarity, while `draft` remains the field used by code to decide whether content can render publicly. See `docs/writing-system.md`.

The writing system is implemented. Future changes should preserve the simple draft/published workflow unless a real content-management need appears.

Podcast content should start as manually curated page content for the `/podcasts` hub. V1 should not fetch or render episode data. Add a podcast content collection or RSS fetching from Transistor later if the page needs multiple shows, repeated episode cards, or current episode data.

Podcast request forms use Netlify Forms. The current implementation has a dedicated `/podcasts/request` page linked from `/podcasts`, with request-type-specific fields shown conditionally. All possible fields remain in the static form markup so Netlify can detect and accept submissions.

## Technology Choices

- Astro remains the primary framework.
- Netlify is the intended hosting target.
- Use plain Astro-scoped CSS for the current homepage instead of Tailwind.
- Add Tailwind later only if the site grows into enough repeated UI patterns that utility classes would make maintenance easier.

## Components And Layout

Shared UI should become components when it appears on more than one route. The primary navigation is now `src/components/SiteHeader.astro` so homepage, writing index, and writing posts stay consistent.

The site now has a light shared layout and component system:

- `src/layouts/BaseLayout.astro` for the document shell, shared metadata, global styling, and header.
- `src/components/SiteHeader.astro` for primary navigation.
- `src/components/WritingCard.astro` for writing previews.
- `src/lib/writing.ts` for writing collection helpers.

See `docs/components.md` before adding repeated UI or content helpers.

## Near-Term Implementation

1. Update metadata: title, description, favicon strategy, social preview image, and canonical URL once the launch identity is known.
2. Add new components only when UI repeats across pages or when a page becomes hard to scan.
3. Run `npm run build` before publishing changes.

## Quality Gates

- `npm run build` should pass before merge or deploy.
- Add `astro check` if TypeScript-heavy components or content collections are introduced.
- Add visual smoke checks for responsive layouts once the homepage has meaningful design.
- Add link checks before launch if the site includes outbound links or multiple internal routes.

## Deployment Notes

Deployment target: Netlify.

The repository includes `netlify.toml` with:

- Build command: `npm run build`
- Publish directory: `dist`

Still document before launch:

- Required environment variables
- Preview workflow
- Production release workflow

## Risks

- Homepage copy is still partly placeholder-like and needs Randy's voice pass before launch.
- The visual system is emerging but not a full design system.
- The package name is currently empty in `package.json`; set this before publishing or integrating tooling that depends on package metadata.
