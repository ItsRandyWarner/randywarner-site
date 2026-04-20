# Roadmap

## Phase 1: Definition

Status: mostly complete.

- Site purpose and tone defined in `docs/site-direction.md`.
- Homepage v1 direction defined in `docs/homepage-v1-brief.md`.
- Page architecture captured in `docs/site-architecture.md`.
- Netlify selected as deployment target.

Remaining:

- Randy copy pass for launch-visible homepage and writing copy.
- Final hero image or portrait direction.

## Phase 2: Foundation

Status: mostly complete.

- Project-specific README added.
- First real homepage implemented.
- Shared metadata/layout shell added with `BaseLayout`.
- Shared navigation added with `SiteHeader`.
- Netlify build config added.

Remaining:

- Update `package.json` name.
- Add social preview image and final favicon direction if needed.
- Decide whether a shared footer is needed.

## Phase 3: Content And Structure

Status: in progress.

- Writing system planned and implemented with Astro content collections.
- `/writing` and `/writing/[slug]` implemented.
- `WritingCard` and writing helpers added.
- One published writing post exists.
- Homepage writing section now pulls from the writing collection.
- `/podcasts` hub direction documented.
- `/podcasts` hub implemented.
- `/podcasts/request` Netlify form implemented.
- The YaS Cast artwork is wired into `/podcasts` through Astro's image pipeline.

Next:

- Add more real writing pieces.
- Review and tune podcast request form fields/copy.
- Keep about/contact/photos pinned until their content and purpose are clearer.

## Phase 4: Launch Readiness

Status: not started.

- Validate responsive layouts across mobile, tablet, and desktop widths.
- Run production build.
- Check page titles, descriptions, links, and favicon behavior.
- Add Open Graph/social preview metadata and image.
- Configure Netlify preview/production workflow.
- Document launch and rollback steps if needed.

## Backlog

- Homepage copy pass
- Hero photo or portrait asset
- About page
- Contact path
- Photography page
- Projects page
- Shop concept
- Footer, if useful
- SEO and Open Graph metadata
- Accessibility pass
- Analytics, if there is a clear reason to measure behavior
