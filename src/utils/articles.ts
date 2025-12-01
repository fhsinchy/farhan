import { XMLParser } from 'fast-xml-parser';

export interface Article {
  id: string;
  title: string;
  url: string;
  publication: string;
  publicationUrl: string;
  date: string;
  description: string;
}

async function fetchRSS(url: string): Promise<string> {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch RSS: ${response.statusText}`);
    }
    return await response.text();
  } catch (error) {
    console.error(`Error fetching RSS from ${url}:`, error);
    return '';
  }
}

function parseRSSToArticles(rssXML: string, publication: string, publicationUrl: string): Article[] {
  if (!rssXML) return [];
  
  const parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: '@_'
  });
  
  try {
    const result = parser.parse(rssXML);
    const items = result.rss?.channel?.item || [];
    const articleItems = Array.isArray(items) ? items : [items];
    
    return articleItems.map((item: any) => {
      // Extract description/summary
      let description = item.description || item['content:encoded'] || item.summary || '';
      
      // Clean HTML tags from description
      description = description
        .replace(/<[^>]+>/g, '')
        .replace(/\s+/g, ' ')
        .trim()
        .substring(0, 200); // Limit to 200 chars
      
      // Format date
      let date = '';
      if (item.pubDate) {
        const pubDate = new Date(item.pubDate);
        date = pubDate.toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        });
      }
      
      // Generate ID from URL or title
      const id = (item.link || item.title || '')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '')
        .substring(0, 50);
      
      return {
        id,
        title: item.title || '',
        url: item.link || '',
        publication,
        publicationUrl,
        date,
        description: description || 'Click to read more about this article.'
      };
    }).filter(article => article.title && article.url);
    
  } catch (error) {
    console.error('Error parsing RSS:', error);
    return [];
  }
}

export async function getFreeCodeCampArticles(): Promise<Article[]> {
  try {
    const rss = await fetchRSS(import.meta.env.FREECODECAMP_AUTHOR_RSS);
    const articles = parseRSSToArticles(rss, 'freeCodeCamp', 'https://www.freecodecamp.org/news');
    
    if (articles.length === 0) {
      console.warn('No freeCodeCamp articles found from RSS');
    }
    
    return articles;
  } catch (error) {
    console.error('Error fetching freeCodeCamp articles:', error);
    return [];
  }
}

// You can add more RSS sources here
export async function getAllArticles(manualArticles: Article[] = []): Promise<Article[]> {
  try {
    const fccArticles = await getFreeCodeCampArticles();
    
    // Combine manual and RSS articles, remove duplicates, and sort by date
    return [...manualArticles, ...fccArticles]
      .filter((article, index, self) => 
        index === self.findIndex(a => a.url === article.url)
      )
      .sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateB.getTime() - dateA.getTime();
      });
  } catch (error) {
    console.error('Error getting all articles:', error);
    // Return at least the manual articles if RSS fails
    return manualArticles;
  }
}
