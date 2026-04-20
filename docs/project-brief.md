# Project Brief

## Snapshot

This repository is an Astro 6 static site for Randy Warner's personal creative hub. It now includes a homepage, writing routes, podcast routes, a Markdown-based writing content collection, shared layout/components, and Netlify build configuration.

## Current State

- Framework: Astro 6
- Runtime requirement: Node.js `>=22.12.0`
- Deployment target: Netlify
- Implemented routes:
  - `/`
  - `/writing`
  - `/writing/[slug]`
  - `/podcasts`
  - `/podcasts/request`
  - `/podcasts/request/thanks`
- Shared layout/components:
  - `src/layouts/BaseLayout.astro`
  - `src/components/SiteHeader.astro`
  - `src/components/WritingCard.astro`
- Content model:
  - Astro content collection for writing
  - Markdown files in `src/content/writing/drafts/` and `src/content/writing/published/`
- Styling approach:
  - Astro-scoped CSS and shared global variables in `BaseLayout`
  - Tailwind intentionally deferred

## Purpose

The site should feel like a personal creative hub centered on creativity, curiosity, and connection. The current version focuses on exploration, writing, The YaS Cast, and a visual/tone direction that can support future photography, projects, podcast pages, and community ideas.

## Current Goals

- Continue refining the homepage copy in Randy's voice.
- Add final imagery, especially a more personal hero image or portrait direction.
- Prepare launch basics: metadata, social preview, responsive QA, links, and Netlify preview/production workflow.

## Known Constraints

- Keep the site static unless a dynamic feature has a clear purpose.
- Prefer Astro-native pages, layouts, content collections, and components before adding heavier tooling.
- Keep the implementation maintainable for a user with basic coding/design experience.
- Avoid sales-funnel, course, or overly professional portfolio energy.
