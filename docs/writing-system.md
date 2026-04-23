# Writing System Plan

## Recommendation

Use Astro content collections with Markdown files and frontmatter.

Use a filesystem structure that separates published writing from drafts, while still keeping a `draft` frontmatter field as the source of truth for whether something should publish.

This gives two benefits:

- The folder structure is easy for a human to understand.
- The frontmatter gives the site reliable data to filter, sort, and validate.

## File Structure

```text
src/
└── content/
    └── writing/
        ├── published/
        │   ├── single-ply-ftw.md
        │   └── why-think-deep.md
        └── drafts/
            └── working-title.md
```

Published files live in `published/`. Drafts live in `drafts/`.

The site should only render posts where `draft: false`. This means a draft accidentally placed in `published/` still will not publish if its frontmatter says `draft: true`.

## Why Not One Flat Directory?

A single folder can work technically, but it becomes harder to maintain once there are many posts. It also makes it harder to visually answer simple questions:

- What is actually live?
- What is still in progress?
- What has been abandoned or parked?

For this site, maintainability matters more than theoretical purity. A clear folder structure is worth it.

## Why Keep The `draft` Field?

The folder helps Randy understand the content library. The `draft` field helps the code understand publication state.

Both are useful.

The rule should be:

- `draft: false` means eligible to publish.
- `draft: true` means never publish.
- Files in `drafts/` should normally have `draft: true`.
- Files in `published/` should normally have `draft: false`.

## Initial Frontmatter Fields

```yaml
---
title: "Post title"
description: "Short summary for cards, SEO, and previews."
date: 2026-04-20
updated: 2026-04-20
type: essay
topics:
  - life
  - relationships
draft: true
featured: false
image:
  src: "/src/assets/writing/example-image.jpg"
  alt: "Short description of the image."
---
```

## Field Details

### Required

- `title`: display title for the post.
- `description`: short summary used on writing cards and metadata.
- `date`: original publish date or intended publish date.
- `type`: writing format.
- `topics`: loose subject tags.
- `draft`: whether the post should be excluded from public pages.

### Optional

- `updated`: last meaningful revision date.
- `featured`: whether the post should be highlighted.
- `image`: optional featured image object with `src` and `alt`.
- `canonicalUrl`: optional original URL if a piece is cross-posted.

Practical workflow note: the starter draft template can include optional fields like `image` and `canonicalUrl` as reminders, even though real draft or published posts should remove them when they are not being used.

## Suggested Writing Types

Start with a small set:

- `essay`: a longer, more developed piece with a beginning, middle, and end. Use this when the idea has been shaped into something complete enough to stand as an article.
- `note`: a shorter reflection, observation, question, or partially formed thought. Use this when the piece does not need the weight or structure of an essay.
- `story`: a narrative piece where the main shape is something that happened. Use this for personal stories, funny incidents, memories, scenes, or retellings where the point comes through the event itself.
- `list`: a deliberately collected set of things. Use this for recommendations, favorites, links, lessons, resources, rankings, or "things I have been thinking about" posts.

Avoid over-classifying early. The system should help writing happen, not create paperwork.

If `story` or `list` starts to feel unnecessary, remove it later. The first version can support these types without forcing every post to use them.

## Featured Images

Each post should optionally support a featured image. This image can appear on:

- Featured cards on `/writing`.
- Post cards in the writing index.
- The top of an individual post page.
- Open Graph and Twitter preview images for that post when present.
- The site-wide default social preview image still acts as the fallback when a post has no `image`.

Recommended frontmatter:

```yaml
image:
  src: "/writing/example-image.jpg"
  alt: "Short description of the image."
```

Start with a shared public image folder:

```text
public/
└── writing/
    └── example-image.jpg
```

This keeps Markdown files easy to browse while making the image URL usable for both page rendering and social preview metadata.

If posts become image-heavy, consider switching to per-post folders later:

```text
src/content/writing/published/post-slug/
├── index.md
└── image.jpg
```

Do not start there unless the extra structure is clearly helpful.

Design rule: featured images should render inside a fixed-ratio slot. The image source can be large, but the card should constrain display with a stable `aspect-ratio`, maximum visual height, and `object-fit: cover` so one oversized image cannot disrupt the writing index layout.

Implementation rule: `image` should remain the single source of truth for post-level visuals. If a writing post has an `image`, the page uses that same image for the article header and social preview metadata. If the post has no `image`, the site falls back to the shared default social preview image.

## Suggested Topics

Initial topic vocabulary:

- `life`
- `relationships`
- `spirituality`
- `health`
- `stories`
- `comedy`

Topics should be lowercase slugs. Display labels can be made prettier in the UI later.

## URLs

Recommended public URL shape:

```text
/writing/post-slug/
```

Avoid including dates in public URLs at first. Dates can still appear in filenames and frontmatter, but clean URLs are easier to share and less tied to chronology.

## Writing Index Behavior

The `/writing` page should start simple:

- Featured writing at the top, if any.
- All published writing listed newest first.
- Filters or tabs by type can come later.
- Topics can display as labels before they become navigational filters.

Direction: use a hybrid index. The top should feel curated, with one or a few featured pieces. Below that, show a simple newest-first list or grid so the page stays easy to browse.

## Single Post Page

Each post page should include:

- Title
- Date
- Type
- Topics
- Main body content
- Link back to `/writing`

Later additions:

- Related posts
- Previous/next links
- Comments or reactions
- Audio or embedded media

## Draft Workflow

Recommended workflow:

1. Start new ideas in `src/content/writing/drafts/`.
2. Keep `draft: true` while writing.
3. When ready, move the file to `src/content/writing/published/`.
4. Set `draft: false`.
5. Run `npm run build` before publishing.

In local development, drafts can be previewed without publishing by running `npm run dev` and visiting `/writing/?drafts=1`. Drafts are only included in that dev-only view; production builds still generate public pages only for entries where `draft: false`.

Draft cards and draft detail pages show a `Draft` label in local preview so they are visually distinct from public writing.

## Markdown Highlights

The site supports a small Markdown extension for highlights:

```md
==Highlighted text==
```

This renders as a styled `<mark>` element in writing posts. The transform is implemented in `astro.config.mjs` so no extra authoring dependency is needed.

## Implementation Notes

- `src/content.config.ts` defines the `writing` collection.
- Both `published/**/*.md` and `drafts/**/*.md` are loaded so drafts are validated too.
- Public routes generate only for entries where `draft: false`.
- Local development routes can include drafts for preview.
- `src/lib/writing.ts` computes slugs from frontmatter `slug` when present, otherwise from the filename.
- `src/components/WritingCard.astro` renders writing previews.

## Markdown Or MDX?

Start with Markdown.

Markdown is easier to maintain and is enough for essays, notes, stories, and simple media. MDX can be introduced later if writing needs embedded custom components, interactive pieces, or richer layouts.

Changing to MDX later should be manageable if the system stays simple:

- Keep frontmatter fields the same.
- Keep URLs based on content slugs, not file extensions.
- Avoid Markdown-only assumptions in page templates.
- Add MDX support only when a real post needs custom components.

Astro can support both Markdown and MDX content, so this does not need to be an all-or-nothing decision now.

## Open Questions

- Should published filenames include dates, such as `2026-04-title.md`, or only slugs, such as `title.md`?
- Should short notes and long essays appear together by default below the featured area?
- Should there be a private `archive/` folder for abandoned drafts, or should old drafts stay in `drafts/`?
- What should the next 3-5 real writing pieces be?
