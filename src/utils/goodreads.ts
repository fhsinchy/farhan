import { XMLParser } from 'fast-xml-parser';

const GOODREADS_USER_ID = import.meta.env.GOODREADS_USER_ID;

export interface Book {
  title: string;
  author: string;
  rating?: number;
  review?: string;
  url: string;
  cover: string;
}

async function fetchRSS(shelf: 'read' | 'currently-reading'): Promise<string> {
  const url = `https://www.goodreads.com/review/list_rss/${GOODREADS_USER_ID}?shelf=${shelf}`;
  
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch Goodreads RSS: ${response.statusText}`);
    }
    return await response.text();
  } catch (error) {
    console.error(`Error fetching Goodreads ${shelf} RSS:`, error);
    return '';
  }
}

function parseRSSToBooks(rssXML: string): Book[] {
  if (!rssXML) return [];
  
  const parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: '@_'
  });
  
  try {
    const result = parser.parse(rssXML);
    const items = result.rss?.channel?.item || [];
    const bookItems = Array.isArray(items) ? items : [items];
    
    return bookItems.map((item: any) => {
      // Extract book details from the description HTML
      const description = item.description || '';
      
      // Extract cover image - look for higher quality version
      let cover = '';
      const imgMatch = description.match(/<img[^>]+src="([^"]+)"/);
      if (imgMatch) {
        cover = imgMatch[1]
          .replace(/_SY75_/, '_SX466_')
          .replace(/_SX50_/, '_SX466_')
          .replace(/_SY\d+_/, '_SX466_');
      }
      
      // Extract author name
      let author = '';
      const authorMatch = description.match(/author:\s*([^<]+)/i) || 
                         description.match(/by:\s*([^<]+)/i) ||
                         item.author_name;
      if (authorMatch) {
        author = typeof authorMatch === 'string' ? authorMatch : authorMatch[1].trim();
      }
      
      // Extract rating
      let rating = 0;
      const ratingMatch = description.match(/rating:\s*(\d+)/i) ||
                         description.match(/(\d+)\s*of\s*5\s*stars/i);
      if (ratingMatch) {
        rating = parseInt(ratingMatch[1], 10);
      }
      
      // Extract review text - it's in the description after "review:"
      let review = '';
      const reviewMatch = description.match(/review:\s*(.+?)(?:\n|$)/i);
      if (reviewMatch) {
        review = reviewMatch[1]
          .replace(/<br\s*\/?>/gi, ' ')
          .replace(/<[^>]+>/g, '')
          .replace(/\s+/g, ' ')
          .trim();
      }
      
      return {
        title: item.title || '',
        author,
        rating,
        review: review || '', // Empty string if no review found
        url: item.link || item.guid || '',
        cover
      };
    }).filter(book => book.title && book.cover); // Only include books with title and cover
    
  } catch (error) {
    console.error('Error parsing Goodreads RSS:', error);
    return [];
  }
}

export async function getCurrentlyReading(): Promise<Book[]> {
  try {
    const rss = await fetchRSS('currently-reading');
    const books = parseRSSToBooks(rss);
    
    // Return fallback if no books found
    if (books.length === 0) {
      console.warn('No currently reading books found from Goodreads RSS');
      return [];
    }
    
    return books;
  } catch (error) {
    console.error('Error fetching currently reading books:', error);
    return [];
  }
}

export async function getReadBooks(limit?: number): Promise<Book[]> {
  try {
    const rss = await fetchRSS('read');
    const books = parseRSSToBooks(rss);
    
    // Return fallback if no books found
    if (books.length === 0) {
      console.warn('No read books found from Goodreads RSS');
      return [];
    }
    
    return limit ? books.slice(0, limit) : books;
  } catch (error) {
    console.error('Error fetching read books:', error);
    return [];
  }
}
