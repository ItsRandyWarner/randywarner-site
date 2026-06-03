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
- `/podcasts/the-yas-cast` - implemented dedicated show page with weekly rotating manual starter picks and RSS-powered latest/recent episodes.
- `/podcasts/request` - implemented shared podcast request form.
- `/podcasts/request/thanks` - implemented form success page.
- `/now` - implemented living snapshot page, manually authored and intentionally kept outside primary navigation for now.
- `/comments/moderate` - private moderation page for comment review and first-party replies.
- `/about` - possible later page.
- `/contact` - possible later page.
- `/photos` - future photography page.

See `docs/site-architecture.md` for page planning details.

## Content System Direction

Astro content collections are implemented for writing. The system uses Markdown files with frontmatter fields such as title, description, date, type, topics, draft status, featured status, optional slug, and optional image.

Drafts and published pieces should live in separate folders for human clarity, while `draft` remains the field used by code to decide whether content can render publicly. In local development, drafts can be previewed from `/writing/?drafts=1`; production builds still generate routes only for entries where `draft: false`. See `docs/writing-system.md`.

The writing system is implemented. Future changes should preserve the simple draft/published workflow unless a real content-management need appears. Markdown also supports lightweight highlight syntax with `==highlighted text==`, implemented as a local Remark plugin in `astro.config.mjs`.

When a writing post includes frontmatter `image`, the post page now uses that same image both in the article layout and in Open Graph/Twitter metadata. If no post-level image is present, the shared site social preview image remains the fallback. This keeps a single source of truth for post visuals and avoids a separate social-image field unless a real need appears later.

Podcast content starts as manually curated page content for the `/podcasts` hub. V1 does not fetch or render episode data on the hub. The dedicated YaS Cast page is implemented using a manual Start Here pool that rotates 3 visible picks weekly in the browser, plus RSS-powered latest/recent episodes. Current RSS data is fetched at build/deploy time, so new episodes appear after the next rebuild. A Netlify build hook named `Podcast RSS rebuild` exists at `https://api.netlify.com/build_hooks/6a206b3645c23c1a76dfd83c`; wire it to Zapier with a `Transistor.fm -> Episode Published` trigger and a `Webhooks by Zapier -> Custom Request` action that sends `POST` to the hook URL with `{}` as the body. Production builds should fail visibly if the RSS feed cannot be fetched or parsed, instead of silently publishing stale fallback data. Local development may still use fallback episodes. A later release should move public RSS fetching to a server-side endpoint/cache so Transistor feed updates can appear without deploying the site. Item-level RSS artwork is used when present, while older episodes without unique artwork stay text-only. Later Transistor analytics highlights should keep private API keys server-side.

Podcast request forms use Netlify Forms. The current implementation has a dedicated `/podcasts/request` page linked from `/podcasts`, with request-type-specific fields shown conditionally. All possible fields remain in the static form markup so Netlify can detect and accept submissions.

Netlify project form detection must stay enabled. If `processing_settings.ignore_html_forms` is true in Netlify, form submissions will return a Netlify 404 even when the thank-you page exists.

The comment system is documented in `docs/comment-system-plan.md`. The current first pass is implemented in code as a staged dynamic architecture: private live comment storage, server-side submission and moderation, approved comments rendered without redeploying the site, Randy's own public replies supported through the moderation flow, and moderation-side cleanup controls for deleting published comments or clearing one post's thread. Basic commenting does not require full upfront verification; the preferred path is cookie-based continuity for normal use, with email verification reserved for giveaway eligibility, trusted commenter promotion, or suspicious cases. The next likely moderation evolution is outlined separately in `docs/comment-moderation-dashboard-plan.md`.

The broader future interaction model is documented in `docs/interaction-and-giveaway-plan.md`. That plan separates public interaction, participant identity, rule evaluation, and giveaway entry tracking so the site can grow into lightweight community mechanics without taking on full accounts or a heavy platform architecture too early. The current preferred giveaway direction is one approved qualifying interaction per participant per month, with multiple small winners rather than volume-based odds. The actual rule shape is further defined in `docs/giveaway-rules-framework.md`.

## Technology Choices

- Astro remains the primary framework.
- Netlify is the intended hosting target.
- Use plain Astro-scoped CSS for the current homepage instead of Tailwind.
- Add Tailwind later only if the site grows into enough repeated UI patterns that utility classes would make maintenance easier.

## Components And Layout

Shared UI should become components when it appears on more than one route. The primary navigation is now `src/components/SiteHeader.astro` so homepage, writing index, and writing posts stay consistent.

The site now has a light shared layout and component system:

- `src/layouts/BaseLayout.astro` for the document shell, shared metadata, Open Graph/Twitter tags, global styling, header, and footer.
- `src/components/SiteHeader.astro` for primary navigation.
- `src/components/SiteFooter.astro` for the shared return invitation, social links, and copyright line.
- `src/components/WritingCard.astro` for writing previews.
- `src/lib/writing.ts` for writing collection helpers.

See `docs/components.md` before adding repeated UI or content helpers.

Homepage-specific visual assets currently live in `src/assets/homepage/` so Astro can optimize them at build time. The hero photo grid is `src/assets/homepage/hero-photo-grid.jpg`.

The homepage also includes a slim callout to `/now` above the shared footer. This keeps the page discoverable without adding it to primary navigation.

## Near-Term Implementation

1. Add new components only when UI repeats across pages or when a page becomes hard to scan.
2. Consider extracting shared button/panel styles if repeated CSS starts slowing down page work.
3. Keep `/now` manually authored unless a real update workflow need appears.
4. Revisit `/now` on a light 2 to 4 week rhythm, or sooner when Randy's real current focus changes.
5. Run `npm run build` before publishing changes.
6. Before meaningful work, review the most relevant planning docs.
7. After meaningful work, do a quick documentation consistency pass and update any stale planning notes.
8. Keep comments limited to published writing posts, keep moderation manual, and preserve live private storage so approved comments do not require deploys.
9. Use `npx netlify dev` for local runtime testing of comment endpoints and Blobs-backed storage.

## Quality Gates

- `npm run build` should pass before merge or deploy.
- Add `astro check` if TypeScript-heavy components or content collections are introduced.
- Use Playwright/browser screenshots for responsive visual smoke checks after layout, spacing, or typography changes.
- Add link checks before launch if the site includes outbound links or multiple internal routes.

## Deployment Notes

Deployment target: Netlify.

Production URL: `https://randywarner.com`.

The GitHub repository is connected to Netlify for builds, but deployment should be treated as an intentional release step. Do not push or deploy after every local change. Randy should ask for a deploy when changes are ready to publish.

The repository includes `netlify.toml` with:

- Build command: `npm run build`
- Publish directory: `dist`

Recommended local workflow:

1. Make local changes.
2. Run `npm run build`.
3. Do visual checks for responsive/layout changes.
4. Commit, push, or deploy only when Randy explicitly asks.

Production deployment workflow:

1. Run `npx netlify deploy` for a preview deploy.
2. Test the preview URL, including any changed forms.
3. Run `npx netlify deploy --prod` only when the preview is ready to publish.
4. If production needs to be rolled back, use Netlify's deploy history for the project and restore the previous good deploy.

Before production deploys that include form changes, confirm Netlify has registered the form and submit one test entry on a preview deploy.

Before production deploys that include comment-system changes:

1. Set `COMMENT_MODERATION_SECRET` in Netlify and in local development.
2. Test comment submission and comment rendering through `netlify dev` or a preview deploy.
3. Test the private moderation page and approval/reject flow on preview before publishing.

## Risks

- Homepage copy may continue to evolve after launch as Randy's voice settles.
- The visual system is emerging but not a full design system; repeated button and panel styles are still mostly page-local.
- Safari may still show the Astro favicon on the homepage even though shared favicon files and head tags point to the RW icon; revisit favicon asset/caching behavior later.
- A future dynamic comment system could create moderation and architecture burden if it goes live before there is a clear approval workflow, enough writing depth, and a realistic backend plan.
