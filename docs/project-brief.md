# Project Brief

## Snapshot

This repository is an Astro 6 static site for Randy Warner's personal creative hub. It is live at `https://randywarner.com` and includes a homepage, writing routes, podcast routes, a Markdown-based writing content collection, shared layout/components, and Netlify build configuration.

## Current State

- Framework: Astro 6
- Runtime requirement: Node.js `>=22.12.0`
- Deployment target: Netlify
- Production URL: `https://randywarner.com`
- Implemented routes:
  - `/`
  - `/now`
  - `/writing`
  - `/writing/[slug]`
  - `/podcasts`
  - `/podcasts/request`
  - `/podcasts/request/thanks`
- Private/admin route implemented in code:
  - `/comments/moderate`
- Shared layout/components:
  - `src/layouts/BaseLayout.astro`
  - `src/components/SiteHeader.astro`
  - `src/components/SiteFooter.astro`
  - `src/components/WritingCard.astro`
- Content model:
  - Astro content collection for writing
  - Markdown files in `src/content/writing/drafts/` and `src/content/writing/published/`
- Styling approach:
  - Astro-scoped CSS and shared global variables in `BaseLayout`
  - Tailwind intentionally deferred
- Current visual system uses bold editorial type, hand-built cards/panels, restrained section spacing, and a warm gridded paper background
- Comment system status:
  - initial dynamic v1 comment foundation is implemented in code
  - approved comments are intended to render live on writing posts without deploys
  - moderation uses a private route plus server-side endpoints
  - giveaway logic is still deferred
- Static assets:
  - RW favicon and Apple touch icon assets live in `public/`
  - Social preview artwork lives in `public/social-preview.svg` and `public/social-preview.png`
  - Homepage hero photo grid lives in `src/assets/homepage/hero-photo-grid.jpg`

## Purpose

The site should feel like a personal creative hub centered on creativity, curiosity, and connection. The current version focuses on exploration, writing, The YaS Cast, and a visual/tone direction that can support future photography, projects, podcast pages, and community ideas.

## Current Goals

- Continue refining the homepage copy in Randy's voice.
- Plan the next stage of content and site depth.
- Refine the copy of `/now` while keeping it current through the light freshness plan and reminder cadence.
- Keep `/now` discoverable without promoting it into primary navigation too early.
- Finish runtime QA of the new comment system before any deploy.
- Use Netlify preview deploys before publishing meaningful changes.
- Keep doing visual QA after spacing, type, or layout changes.

## Known Constraints

- Keep the site static unless a dynamic feature has a clear purpose.
- Prefer Astro-native pages, layouts, content collections, and components before adding heavier tooling.
- Keep the implementation maintainable for a user with basic coding/design experience.
- Avoid sales-funnel, course, or overly professional portfolio energy.
- Do not push or deploy changes unless Randy explicitly asks.

## Working Habits

- Before making a meaningful site change, check the most relevant planning docs so implementation stays aligned with the current direction.
- After making a meaningful site change, do a quick documentation pass and update any planning notes that are now out of date.
- Small typo fixes or tiny copy tweaks do not need a full doc sweep unless they change the direction, structure, or workflow.
