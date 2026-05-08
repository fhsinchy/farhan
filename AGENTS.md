# AGENTS.md

Guidance for AI coding agents working in this repository.

## Agent Instructions

- **Fetch current docs**: When working with any library, framework, or API, use the `find-docs` skill to retrieve up-to-date documentation rather than relying on training data.
- **UI / styling work**: Use the `frontend-design` skill when creating or redesigning components, pages, or layouts.
- **Generated text**: Run any AI-generated copy through the `humanizer` skill to remove signs of AI writing.
- Always make precise, minimal edits. Prefer `edit` over `write` for existing files.
- Run `npm run build` after structural changes to verify nothing is broken.

## Project Overview

Personal portfolio website ([farhan.dev](https://farhan.dev)) built with **Astro 5.x**. Static site generator that fetches external RSS feeds at build time.

## Commands

Use `pnpm` if available, otherwise fall back to `npm`. Never use `yarn` or any other package manager even if present.

```bash
pnpm dev       # Start dev server at localhost:4321
pnpm build     # Build production site to ./dist/
pnpm preview   # Preview production build locally
```

No test framework. Deployment via GitHub Actions to GitHub Pages on push to `main`.

## Project Structure

```text
src/
├── pages/             # Astro file-based routes
│   ├── index.astro    # Homepage
│   ├── about.astro    # About page (experience & expertise from src/data/)
│   ├── articles.astro # Articles listing, client-side search/filter, ?publication= query param
│   ├── books.astro    # Bookshelf (Goodreads RSS via src/utils/goodreads.ts)
│   └── rss.xml.ts     # RSS feed endpoint
├── layouts/
│   └── Layout.astro   # Master layout: SEO meta (OG, Twitter Cards), global styles,
│                       # NES.css framework, Press Start 2P font, Navigation component
├── components/
│   └── Navigation.astro  # Nav bar with active-state detection based on URL path
├── utils/
│   ├── articles.ts    # Fetches freeCodeCamp RSS, merges with manual articles,
│   │                  # deduplicates by URL, sorts by date
│   └── goodreads.ts   # Parses Goodreads RSS, extracts book covers from images
├── data/
│   ├── articles.json            # Manually added articles
│   ├── professional-experience.json  # Work history (about page)
│   └── technical-expertise.json      # Skills/technologies (about page)
└── site.config.ts     # Non-secret site config (metadata, social links, RSS URLs)
```

### Data Flow

All RSS fetching and data loading happens at build time via `await` in page frontmatter. Pages import utilities from `src/utils/` and manual data from `src/data/`. Error handling in utilities returns empty arrays with `console.warn` — the site degrades gracefully if external APIs are unreachable.

## Architecture Patterns

- **Config**: `src/site.config.ts` is the single source of truth for non-secret config. Import as `import site from '../site.config'`.
- **Static-first**: Everything is pre-rendered at build time. No server-side runtime.
- **Client islands**: `articles.astro` uses client-side JS for search/filter interactions.
- **Scoped CSS**: Styles live inside `.astro` component `<style>` tags.

## Styling

- **NES.css** framework (retro gaming aesthetic)
- **Press Start 2P** font (Google Fonts)
- **Dark theme**: `#212529` background, `#92cc41` accent green
- **Mobile breakpoint**: 768px
