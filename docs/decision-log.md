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
