# Decision Log

Use this file to record meaningful project decisions as the site takes shape. Keep entries short and dated so future changes have context.

## Template

```text
Date: YYYY-MM-DD
Decision:
Context:
Consequences:
```

## Decisions

Date: 2026-04-19
Decision: Homepage v1 will use a warm, ordered, colorful, personal visual direction.
Context: Randy liked the recommendation to start from Eames/Girard order and warmth, add a little Corita Kent color and typographic spirit, and use only a small dash of David Carson looseness.
Consequences: The first homepage should use clean composition, alignment, color, pattern, and selective typographic play. It should avoid sterile minimalism, corporate portfolio language, and chaotic experimental design.

Date: 2026-04-19
Decision: Community and giveaway ideas stay hidden for v1.
Context: Those ideas are important to the long-term vision, but the first version should focus on exploration, writing, and The YaS Cast.
Consequences: The homepage can imply that the site will keep changing, but should not promise accounts, comments, giveaways, or community mechanics yet.

Date: 2026-04-20
Decision: Do not add Tailwind for the homepage v1 stage.
Context: The current site is a small Astro project with one highly art-directed page. Randy wants the project to remain maintainable with basic coding and design experience.
Consequences: Keep styling in Astro-scoped CSS for now. Revisit Tailwind if the site grows into repeated components, shared layouts, and larger-scale styling needs.

Date: 2026-04-20
Decision: Use Netlify as the deployment target.
Context: Randy expects to host the Astro site on Netlify.
Consequences: Add `netlify.toml` with the Astro static build command and publish directory.

Date: 2026-04-20
Decision: Use Astro content collections with Markdown for writing.
Context: Randy wants a maintainable writing system and has had friction with one flat folder of Markdown files in earlier projects.
Consequences: Plan for `src/content/writing/published/` and `src/content/writing/drafts/`, while keeping `draft` frontmatter as the code-level source of truth for publication state.

Date: 2026-04-20
Decision: Start the writing index as a hybrid of featured pieces and a newest-first list.
Context: Randy felt a hybrid writing page was probably the right direction.
Consequences: `/writing` should open with curated featured writing, then show the rest of the published writing in a simple chronological list or grid.

Date: 2026-04-20
Decision: Support optional featured images in writing frontmatter.
Context: Randy wants the option to add a featured image to writing posts.
Consequences: Add an optional `image` object with `src` and `alt`; begin with shared assets in `src/assets/writing/` and only move to per-post asset folders if image-heavy posts justify it.

Date: 2026-04-20
Decision: Use a light shared layout/component system.
Context: Navigation and writing cards started repeating across pages, and Randy wanted consistency without making the site hard to maintain.
Consequences: Use `BaseLayout`, `SiteHeader`, `WritingCard`, and writing helpers. Add more components only when patterns repeat or page files become hard to scan.

Date: 2026-04-20
Decision: Build `/podcasts` as a hub, not a single-show-only page.
Context: The YaS Cast is the clear v1 feature, but Randy wants room for produced podcasts, future shows, and guest appearances.
Consequences: `/podcasts` features The YaS Cast now, keeps future categories invisible until real content exists, and can expand into individual show or episode routes later.

Date: 2026-04-20
Decision: Use one shared podcast request form.
Context: Randy wants people to suggest guests/topics and request to be a guest. Future podcasts may need the same request flow.
Consequences: `/podcasts/request` uses one Netlify form with `podcast` and `request_type` fields, so future podcast pages can link to the same form and preselect the relevant show.

Date: 2026-04-20
Decision: Do not push or deploy site changes unless Randy explicitly asks.
Context: The site is connected to GitHub and Netlify, but Randy wants to control when changes go live instead of deploying after every local update.
Consequences: Local development should use build and visual checks first. Commit, push, and Netlify deploy steps should only happen after an explicit deploy/publish request.

Date: 2026-04-20
Decision: Collapse the primary nav behind a hamburger button on narrower screens.
Context: The mobile nav was starting to crowd the top bar, and more links may be added later.
Consequences: `SiteHeader` owns the responsive navigation behavior. The desktop nav remains visible on wider screens, while narrow screens show a compact icon button that opens the same nav links.

Date: 2026-04-21
Decision: Support local draft previews without changing public publishing behavior.
Context: Randy wanted to review draft writing in the dev environment without setting `draft: false` or moving the piece into the published workflow.
Consequences: `/writing/?drafts=1` includes all writing entries only in local development, and individual draft routes are generated only in dev. Production builds still publish only entries where `draft: false`.

Date: 2026-04-21
Decision: Keep highlight authoring lightweight with `==highlighted text==`.
Context: Randy tried using common Markdown-style highlight syntax in a writing piece, but plain Astro Markdown does not support it by default.
Consequences: A local Remark transform in `astro.config.mjs` converts `==...==` text into `<mark>` elements, and writing posts style those highlights.

Date: 2026-04-21
Decision: Tune the visual rhythm before extracting a larger design system.
Context: Heading sizes, eyebrow spacing, and section spacing needed multiple design passes after seeing the pages rendered.
Consequences: Keep page-local CSS for now, but use consistent spacing ranges and heading rhythm across pages. Extract shared button or panel styles only when the repeated patterns stabilize further.

Date: 2026-04-21
Decision: Promote the homepage return note into a shared footer.
Context: The black return-note section was effectively acting as a footer on the homepage, while interior pages ended abruptly.
Consequences: `SiteFooter` now renders from `BaseLayout` on public pages. The footer content remains intentionally light until contact, about, newsletter, or other footer needs are clearer.

Date: 2026-04-22
Decision: Add shared social preview metadata and artwork.
Context: Randy wanted help with social previews and metadata after the final visual pass.
Consequences: `BaseLayout` now renders Open Graph and Twitter card tags with a default 1200x630 social preview image. Writing detail pages identify as articles, and canonical/image URLs become absolute once the production `site` URL is configured.

Date: 2026-04-22
Decision: Use `https://randywarner.com` as the production site URL.
Context: Randy confirmed the launch domain.
Consequences: Astro can render absolute canonical URLs and social preview image URLs in production builds.

Date: 2026-04-22
Decision: Use a personal photo grid for the homepage hero.
Context: Randy did not want the homepage hero to depend on one perfect portrait, and a photo grid better matched the site's personal, creative, collage-like direction.
Consequences: The homepage imports `src/assets/homepage/hero-photo-grid.jpg` through Astro's image pipeline and renders it inside the existing framed hero-card treatment. The social preview image remains a separate share-card asset and only needs updating when the desired preview visual changes.

Date: 2026-04-22
Decision: Keep the footer light for launch.
Context: Randy preferred the large "this place is meant to keep changing" footer idea and removed duplicate footer navigation links.
Consequences: The footer stays focused on a return invitation, social links, and a copyright line. New footer links should wait until contact, newsletter, about, or future section paths are real and useful.

Date: 2026-04-22
Decision: Use the RW mark for launch icon assets.
Context: The launch-readiness pass found that the favicon and Apple touch icon were still the default Astro mark.
Consequences: `public/favicon.svg`, `public/favicon-32.png`, `public/favicon.ico`, and `public/apple-touch-icon.png` now use a simple RW mark aligned with the site header.

Date: 2026-04-22
Decision: Keep Netlify form detection enabled.
Context: A preview form submission returned a Netlify 404 even though the thank-you page existed. The project setting `processing_settings.ignore_html_forms` was enabled, so Netlify was not registering HTML forms.
Consequences: Form detection was re-enabled in Netlify, the podcast request form was redeployed, and a test submission confirmed the `podcast-request` form is registered.

Date: 2026-04-22
Decision: Hide the homepage future-path cards in production.
Context: The Explore More section has a useful direction, but the Photos, Projects, and Shop cards are still filler content.
Consequences: The section remains in the homepage code for local development, but production builds omit it until those paths have real content.

Date: 2026-04-23
Decision: Reuse writing post `image` frontmatter for social previews.
Context: Randy wanted writing posts to share with their own featured image on Facebook and other platforms, without maintaining a second social-image field.
Consequences: Writing detail pages now pass `post.data.image?.src` into `BaseLayout` for Open Graph/Twitter metadata. Posts with an `image` use it both on-page and in social previews; posts without one fall back to the shared `public/social-preview.png` image.

Date: 2026-04-23
Decision: Prototype a `/now` page without committing it to primary navigation yet.
Context: A lightweight living snapshot page felt like a strong fit for the site's tone, but Randy is still evaluating whether it should become a permanent section.
Consequences: `/now` can be explored as a simple manually maintained page. It stays out of primary navigation until it proves useful and sustainable.

Date: 2026-04-23
Decision: Keep `/now` as a real page and remove the temporary concept routes.
Context: Randy reviewed multiple `/now` directions in the live site and chose a combined version with a strong hero, one boxed main note, lighter current-signal entries, and a proof-of-life section.
Consequences: `/now` is now part of the site as a manually maintained page. Temporary concept routes were removed, and the page remains out of primary navigation while its copy and upkeep rhythm continue to settle.

Date: 2026-04-23
Decision: Surface `/now` through a homepage callout instead of the shared footer or primary navigation.
Context: Randy liked `/now` feeling discoverable and special, but still wanted a clearer invitation than leaving it completely hidden.
Consequences: The homepage now includes a slim callout above the footer that links to `/now`. The shared footer stays focused on its return invitation, social links, and copyright line.

Date: 2026-04-23
Decision: Make homepage and podcast-page copy for The YaS Cast more personal and connection-driven.
Context: The earlier podcast description read more like general category copy than Randy's voice. Randy described the show as a way to connect with people, feel connected to the community, and explore Yuba-Sutter more deeply.
Consequences: The homepage and `/podcasts` page now describe The YaS Cast in more personal first-person terms, with less brochure-like framing.

Date: 2026-04-24
Decision: If comments are added later, start with a lightweight writing-only moderated model instead of a full dynamic community system.
Context: Randy wanted a future comment-system plan documented without committing to implementation yet. The site still aims to stay mostly static, personal, and manageable.
Consequences: The recommended first version is documented in `docs/comment-system-plan.md`: comments would begin on published writing posts only, use manual approval, avoid accounts and threading, and favor a curated workflow before any heavier dynamic system is considered.

Date: 2026-04-24
Decision: Future writing comments should default to all published posts and include Randy's own public replies, while lightweight identity and giveaway tracking stay as later layers.
Context: Randy clarified that comments should be broadly available across writing, that first-party replies matter from the start, that he does not want traditional accounts or logins, and that comments may eventually feed into a giveaway system.
Consequences: The comment plan now assumes comments on all published writing posts by default, includes a first-party reply model in v1, recommends no public website links at first, and treats verified identity plus giveaway tracking as future interaction-system work rather than part of the initial rollout.

Date: 2026-04-24
Decision: Document the broader interaction and giveaway system separately from the initial comment release.
Context: Randy wants lightweight identity and future giveaway mechanics, but not traditional accounts or a heavy platform. Those needs are bigger than the comment feature alone.
Consequences: `docs/interaction-and-giveaway-plan.md` now defines a layered future model: public interaction surfaces, private participant identity, interaction records, eligibility rules, and giveaway entry records. Comments remain the likely first interaction surface, while identity and giveaway logic stay planned for later phases.

Date: 2026-04-24
Decision: Future giveaway mechanics should prioritize fairness over activity volume.
Context: Randy wants multiple small winners and does not want highly active commenters to gain a meaningful advantage over people who simply participate.
Consequences: The planning docs now point toward a monthly giveaway model where one approved qualifying interaction gives a participant one entry, with additional same-month activity not stacking more odds by default. Public display names remain visible for community recognition, while participant tracking stays private behind the scenes.

Date: 2026-04-24
Decision: Define giveaway qualification through a dedicated rules framework.
Context: The broader interaction plan established the system layers, but future implementation also needs a simpler source of truth for what counts, what does not, and how fairness is preserved.
Consequences: `docs/giveaway-rules-framework.md` now defines the preferred default rule set: one approved qualifying interaction per participant per month, approval before eligibility where moderation applies, manual overrides, anti-abuse handling, and multiple small winners instead of activity-based odds stacking.

Date: 2026-04-24
Decision: Plan for trusted commenters as a future moderation upgrade path.
Context: Randy liked the idea of regular trusted participants being able to interact more naturally than first-time commenters, without opening comments fully from day one.
Consequences: The comment and interaction planning docs now treat trusted commenter status as a likely future step after the initial moderated release, potentially allowing lighter review or selective auto-publishing while keeping manual override and trust revocation available.

Date: 2026-04-24
Decision: Design the future comment system around a staged dynamic backend rather than a static publish-and-deploy workflow.
Context: Randy would be unlikely to use a comment system that required a site deploy every time a comment was approved. He prefers the more complex backend path if it can be built in smaller stages.
Consequences: The comment plan now treats live private storage, server-side moderation, and deploy-free public approvals as the primary architecture. Simpler fully static publication is no longer the recommended default, though the rollout should still stay incremental and manually moderated at first.

Date: 2026-04-24
Decision: Keep basic commenting low-friction by using cookie continuity first, with email verification only when the system needs higher-confidence identity.
Context: Randy wants to avoid accounts, passwords, and unnecessary friction. He is open to verification, but does not want every commenter to go through it up front if normal commenting can stay simple.
Consequences: The first comment implementation uses unsigned cookie continuity only for low-stakes repeat-commenter convenience. The planning docs now reserve signed cookie continuity plus email verification for giveaway eligibility, trusted commenter promotion, suspicious cases, or any higher-confidence identity work.

Date: 2026-04-24
Decision: Build the first pass of the comment system now, but keep giveaway automation out of scope.
Context: Randy is ready to start on v1 comments and is comfortable waiting on the giveaway layer until the interaction model is better understood.
Consequences: The repo now includes an initial dynamic comment foundation in code: writing-post comments, private live storage, manual moderation, a private moderation page, first-party replies, and cookie-based continuity. Giveaway logic remains deferred.

Date: 2026-04-24
Decision: Keep rejected comments restorable and allow replies within a simple conversation layout.
Context: Randy wanted the option to undo a rejection later if needed and wanted commenters to be able to reply to each other without the UI turning into a full forum.
Consequences: The comment system now keeps rejected comments in storage with a reversible status instead of deleting them, and the public comment UI supports replies while keeping the conversation structure intentionally lightweight.

Date: 2026-04-24
Decision: Add moderation-side cleanup tools for published comments and whole post threads.
Context: Once the first pass of the live comment system was tested, Randy wanted a practical way to remove production test comments without dropping into raw Netlify Blobs commands.
Consequences: The moderation page now surfaces published comments, supports deleting an individual published comment thread, and includes a protected clear-by-post-slug action for wiping all comments on one writing post without a deploy.

Date: 2026-04-24
Decision: Plan the next moderation upgrade as a lightweight dashboard, not a heavier public-facing system.
Context: Randy noticed that even a modest number of comments across a few posts would make the current single-page moderation flow harder to manage.
Consequences: `docs/comment-moderation-dashboard-plan.md` now outlines the preferred next step: a small moderation inbox with clearer status views, per-post management, filters, and later commenter history, while keeping the reader-facing comment experience low-friction.

Date: 2026-04-24
Decision: Prioritize moderation upgrades around structure first, then post context, then history.
Context: Randy wanted a concrete build sequence rather than just a broad moderation-dashboard concept.
Consequences: The dashboard plan now recommends building in this order: clearer status modes first, then a `By post` index, then a post-specific moderation view, with search and commenter history later.

Date: 2026-04-24
Decision: Implement the first moderation dashboard build as an inbox-style status view.
Context: The moderation page needed to stop feeling like several stacked queues while preserving the existing backend and moderation actions.
Consequences: `/comments/moderate` now has status tabs for Needs review, Published, and Rejected, count badges for each status, and a simple post-slug filter. Approve, reject, restore, reply, delete, and clear-post actions remain on the same private moderation surface.
