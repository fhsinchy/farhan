# Farhan.dev - Personal Portfolio

A retro-styled personal portfolio built with Astro, featuring automated content from RSS feeds and a classic NES.css aesthetic.

## 🎮 Features

- **Retro Gaming Design**: Built with NES.css for a nostalgic pixel-art look
- **Automated Content**: RSS integration for Goodreads books and freeCodeCamp articles
- **Professional Portfolio**: Showcases engineering work, technical writing, and reading habits
- **SEO Optimized**: Comprehensive meta tags, sitemap generation, and Open Graph support
- **Type Safe**: Built with TypeScript for reliability
- **Static Site**: Fast, secure, and easy to deploy

## 🚀 Project Structure

```text
/
├── public/
│   ├── images/          # Static images and assets
│   └── robots.txt       # Search engine crawler instructions
├── src/
│   ├── components/      # Reusable Astro components
│   │   └── Navigation.astro
│   ├── content/         # Content collections (if any)
│   ├── data/           # Static JSON data
│   │   ├── articles.json       # Manual article entries
│   │   └── publications.json   # Publication metadata
│   ├── layouts/        # Page layouts
│   │   └── Layout.astro
│   ├── pages/          # File-based routing
│   │   ├── index.astro      # Homepage
│   │   ├── about.astro      # About page
│   │   ├── writing.astro    # Articles listing (/articles redirects here)
│   │   └── books.astro      # Reading list
│   └── utils/          # Utility functions
│       ├── goodreads.ts     # Goodreads RSS parser
│       └── articles.ts      # Article RSS parser
├── .env                # Environment variables (git-ignored)
├── .env.example        # Environment variables template
└── package.json
```

## 🔧 Configuration

### Environment Variables

Copy `.env.example` to `.env` and configure:

```bash
# Site Configuration
SITE_TITLE=Farhan.dev
SITE_AUTHOR=Farhan Hasin Chowdhury
SITE_EMAIL=your@email.com

# Social Links
GITHUB_URL=https://github.com/yourusername
TWITTER_URL=https://twitter.com/yourusername
LINKEDIN_URL=https://linkedin.com/in/yourusername

# Goodreads Configuration
GOODREADS_USER_ID=your_goodreads_user_id

# freeCodeCamp Configuration
FREECODECAMP_AUTHOR_RSS=https://www.freecodecamp.org/news/author/yourusername/rss/
```

### RSS Feeds

The site automatically fetches content from:
- **Goodreads RSS**: Currently reading and finished books
- **freeCodeCamp RSS**: Published articles

Manual articles can be added to `src/data/articles.json`:

```json
{
  "id": "unique-slug",
  "title": "Article Title",
  "url": "https://example.com/article",
  "publication": "Publication Name",
  "publicationUrl": "https://example.com",
  "date": "Month Day, Year",
  "description": "Brief description of the article"
}
```

## 🧞 Commands

| Command | Action |
| :------------------------ | :----------------------------------------------- |
| `npm install` | Install dependencies |
| `npm run dev` | Start dev server at `localhost:4321` |
| `npm run build` | Build production site to `./dist/` |
| `npm run preview` | Preview build locally before deploying |
| `npm run astro ...` | Run Astro CLI commands |

## 📦 Dependencies

- **Astro**: Static site generator
- **NES.css**: Retro gaming CSS framework
- **fast-xml-parser**: RSS feed parsing
- **@astrojs/sitemap**: Automatic sitemap generation
- **TypeScript**: Type safety and better DX

## 🎨 Design Philosophy

This site combines professional portfolio presentation with personal interests:
- **Engineering**: Showcases technical expertise and work at freeCodeCamp
- **Writing**: Highlights handbooks and articles reaching 500K+ developers
- **Reading**: Personal touch showing fiction reading habits

The retro NES aesthetic makes it memorable while maintaining professionalism.

## 🚢 Deployment

The site is configured for static deployment. Build output goes to `./dist/`:

```bash
npm run build
```

Deploy to any static hosting provider:
- Vercel
- Netlify
- GitHub Pages
- Cloudflare Pages
- Any CDN/web server

## 📄 License

Feel free to use this as a template for your own portfolio. Just update the content and environment variables!

## 🤝 Author

**Farhan Hasin Chowdhury**
- Software Engineer at freeCodeCamp
- Technical writer with 500K+ readers
- Author of Docker, Kubernetes, NGINX, and Arch Linux handbooks
