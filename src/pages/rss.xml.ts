import rss from '@astrojs/rss';
import site from '../site.config';
import type { APIContext } from 'astro';
import { getAllArticles } from '../utils/articles';
import manualArticles from '../data/articles.json';

function parseArticleDate(dateStr: string): Date {
  // Strip ordinal suffixes: "February 17th, 2026" → "February 17, 2026"
  const cleaned = dateStr.replace(/(\d+)(st|nd|rd|th)/, '$1');
  return new Date(cleaned);
}

export async function GET(context: APIContext) {
  const articles = await getAllArticles(manualArticles);

  return rss({
    title: site.title,
    description: `Articles by ${site.author}`,
    site: context.site!,
    items: articles.map((article) => ({
      title: article.title,
      link: article.url,
      description: article.description,
      pubDate: parseArticleDate(article.date),
    })),
  });
}
