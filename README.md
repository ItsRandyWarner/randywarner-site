# randywarner-site-3

Astro site scaffold for the next version of the Randy Warner website.

## Planning

- [Site direction](docs/site-direction.md)
- [Site architecture](docs/site-architecture.md)
- [Components](docs/components.md)
- [Writing system](docs/writing-system.md)
- [Podcast page](docs/podcast-page.md)
- [Homepage v1 brief](docs/homepage-v1-brief.md)
- [Project brief](docs/project-brief.md)
- [Technical plan](docs/technical-plan.md)
- [Roadmap](docs/roadmap.md)
- [Decision log](docs/decision-log.md)
- [Comment system plan](docs/comment-system-plan.md)
- [Interaction and giveaway plan](docs/interaction-and-giveaway-plan.md)
- [Giveaway rules framework](docs/giveaway-rules-framework.md)

## Project Structure

```text
/
├── docs/
├── public/
├── src/
│   ├── assets/
│   │   ├── podcasts/
│   │   └── writing/
│   ├── content/
│   │   └── writing/
│   │       ├── drafts/
│   │       └── published/
│   ├── components/
│   │   ├── SiteHeader.astro
│   │   └── WritingCard.astro
│   ├── layouts/
│   │   └── BaseLayout.astro
│   ├── lib/
│   │   └── writing.ts
│   └── pages/
│       ├── index.astro
│       ├── now.astro
│       ├── podcasts/
│       │   ├── index.astro
│       │   └── request/
│       │       ├── index.astro
│       │       └── thanks.astro
│       └── writing/
│           ├── index.astro
│           └── [slug].astro
├── astro.config.mjs
├── netlify.toml
├── src/content.config.ts
└── package.json
```

Astro exposes pages from `src/pages/`. Optimized source images live in `src/assets/`; files that should be served unchanged can live in `public/`.

Netlify is configured to run `npm run build` and publish `dist/`.

## Commands

| Command | Action |
| :-- | :-- |
| `npm install` | Install dependencies |
| `npm run dev` | Start the local dev server |
| `npm run build` | Build the production site to `./dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run astro -- --help` | Show Astro CLI help |
| `npx netlify dev` | Run local Netlify Functions + Blobs for comment-system testing |

## Requirements

- Node.js `>=22.12.0`

## Comment System Runtime Notes

- Writing comments use Netlify Functions and Netlify Blobs for live storage.
- `npm run dev` is fine for normal page work, but comment-system runtime testing should use `npx netlify dev`.
- Set `COMMENT_MODERATION_SECRET` before testing or deploying the private moderation flow.
