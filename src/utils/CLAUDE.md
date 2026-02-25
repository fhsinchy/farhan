# Utilities

Build-time helpers for fetching and processing external data. TypeScript interfaces for data types (Book, Article) are defined here.

## Files

- `articles.ts` - Fetches freeCodeCamp RSS, merges with manual articles from `src/data/articles.json`, deduplicates by URL, sorts by date
- `goodreads.ts` - Parses Goodreads RSS, extracts book covers from image URLs

## Patterns

- Error handling returns empty arrays with `console.warn` on failure
- All functions are async and called from page frontmatter at build time
