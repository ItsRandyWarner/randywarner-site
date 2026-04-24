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
