# Roadmap

## Phase 1: Definition

Status: complete for v1.

- Site purpose and tone defined in `docs/site-direction.md`.
- Homepage v1 direction defined in `docs/homepage-v1-brief.md`.
- Page architecture captured in `docs/site-architecture.md`.
- Netlify selected as deployment target.

Next:

- Continue Randy copy pass as the live site evolves.

## Phase 2: Foundation

Status: complete for v1.

- Project-specific README added.
- First real homepage implemented.
- Shared metadata/layout shell added with `BaseLayout`.
- Shared navigation added with `SiteHeader`.
- Shared footer added with `SiteFooter`.
- Netlify build config added.
- RW favicons and Apple touch icon are present in `public/`.
- Social preview image and Open Graph/Twitter metadata are implemented.
- Writing posts now use their own featured image for social previews when one is present, with the shared site preview image as fallback.
- `package.json` has a project name.
- Footer direction is settled for launch as a light return invitation with social links and a copyright line.

Remaining:

- None for current foundation work.

## Phase 3: Content And Structure

Status: in progress.

- Writing system planned and implemented with Astro content collections.
- `/writing` and `/writing/[slug]` implemented.
- `WritingCard` and writing helpers added.
- Two published writing posts exist.
- Draft writing can be previewed locally at `/writing/?drafts=1` without publishing.
- Markdown highlight syntax using `==highlighted text==` is supported for writing.
- Homepage writing section now pulls from the writing collection.
- Homepage hero uses a personal photo-grid image through Astro's image pipeline.
- `/podcasts` hub direction documented.
- `/podcasts` hub implemented.
- `/podcasts/request` Netlify form implemented.
- The YaS Cast artwork is wired into `/podcasts` through Astro's image pipeline.
- The YaS Cast artwork is also used in the homepage podcast section with constrained sizing.
- Mobile navigation now collapses behind an accessible hamburger button on narrower screens.
- Shared footer now appears across public pages.
- Site-wide type and spacing have had an initial visual QA pass across desktop and mobile screenshots.
- Homepage future-path cards are kept out of production until those paths have real content.

Next:

- Add more real writing pieces.
- Review and tune podcast request form fields/copy.
- Consider extracting shared button/panel styles if the same CSS keeps repeating across new pages.
- Keep about/contact/photos pinned until their content and purpose are clearer.

## Phase 4: Launch Readiness

Status: complete for v1.

- Production deploy completed at `https://randywarner.com`.
- Production build passes.
- Responsive desktop/mobile visual pass completed before launch.
- Page titles, descriptions, canonical URLs, Open Graph/Twitter metadata, favicons, and social preview image checked.
- Netlify preview/production workflow used successfully.
- Podcast request form registered in Netlify and tested on preview and production.

Next:

- Use preview deploys for meaningful future changes before promoting to production.
- Keep a short manual rollback path through Netlify's deploy history.

## Backlog

- Homepage copy pass
- About page
- Contact path
- Photography page
- Projects page
- Shop concept
- Footer content refinement if contact, newsletter, about, or future section links become real paths
- SEO refinement
- Accessibility pass
- Analytics, if there is a clear reason to measure behavior
