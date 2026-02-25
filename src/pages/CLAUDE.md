# Pages

Astro file-based routing. Each `.astro` file becomes a route (e.g. `articles.astro` → `/articles`).

## Data Flow

All RSS fetching and data loading happens at build time via async functions in page frontmatter. Pages import utilities from `src/utils/` and manual data from `src/data/`.

## Files

- `index.astro` - Homepage
- `about.astro` - About page with professional experience and technical expertise (loaded from `src/data/`)
- `articles.astro` - Articles listing with client-side search/filter; supports `?publication=` query param for direct linking to filtered views
- `books.astro` - Bookshelf populated from Goodreads RSS via `src/utils/goodreads.ts`
- `rss.xml.ts` - RSS feed endpoint
