# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio website (farhan.dev) built with Astro 5.x. Static site generator that fetches external RSS feeds at build time.

## Commands

```bash
npm run dev       # Start dev server at localhost:4321
npm run build     # Build production site to ./dist/
npm run preview   # Preview production build locally
```

No test framework is configured. Deployment is automated via GitHub Actions to GitHub Pages on push to main.

## Architecture

### Data Flow

The site is a hybrid static/dynamic architecture:
- **Static content**: Pages in `src/pages/` using Astro's file-based routing
- **Manual data**: JSON files in `src/data/` (articles.json, publications.json)
- **External feeds**: Goodreads RSS (books) and freeCodeCamp RSS (articles) fetched at build time via utilities in `src/utils/`

### Key Files

- `src/layouts/Layout.astro` - Master layout with SEO meta tags (Open Graph, Twitter Cards)
- `src/components/Navigation.astro` - Navigation with active state detection
- `src/utils/goodreads.ts` - Parses Goodreads RSS, extracts book covers from image URLs
- `src/utils/articles.ts` - Fetches freeCodeCamp RSS, merges with manual articles, deduplicates by URL

### Styling

- NES.css framework (retro gaming aesthetic)
- Press Start 2P font (Google Fonts)
- Dark theme: #212529 background, #92cc41 accent
- Mobile breakpoint at 768px

### Environment Variables

See `.env.example` for required variables (site metadata, social links, Goodreads ID, RSS feed URL).

## Patterns

- All RSS fetching happens at build time via async functions in page frontmatter
- TypeScript interfaces defined in utility files (Book, Article types)
- Scoped CSS within Astro components
- Error handling in RSS parsers with console warnings and empty array fallbacks
