/**
 * HTML Parser Utility
 * Extracts metadata from HTML content for blog posts
 */

/**
 * Extract title from HTML
 */
export const extractTitle = (html) => {
  const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
  if (titleMatch) {
    return titleMatch[1].trim();
  }
  
  // Fallback: try h1
  const h1Match = html.match(/<h1[^>]*>([^<]+)<\/h1>/i);
  if (h1Match) {
    return h1Match[1].trim();
  }
  
  return '';
};

/**
 * Extract meta description from HTML
 */
export const extractMetaDescription = (html) => {
  const metaMatch = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']+)["']/i);
  if (metaMatch) {
    return metaMatch[1].trim();
  }
  
  // Fallback: extract first paragraph
  const pMatch = html.match(/<p[^>]*>([^<]+)<\/p>/i);
  if (pMatch) {
    return pMatch[1].trim().substring(0, 160);
  }
  
  return '';
};

/**
 * Extract excerpt from HTML (first paragraph or meta description)
 */
export const extractExcerpt = (html) => {
  const metaDesc = extractMetaDescription(html);
  if (metaDesc) return metaDesc;
  
  const pMatch = html.match(/<p[^>]*>([^<]+)<\/p>/i);
  if (pMatch) {
    return pMatch[1].trim().substring(0, 200);
  }
  
  return '';
};

/**
 * Extract keywords from HTML
 */
export const extractKeywords = (html) => {
  const keywordsMatch = html.match(/<meta[^>]*name=["']keywords["'][^>]*content=["']([^"']+)["']/i);
  if (keywordsMatch) {
    return keywordsMatch[1].trim();
  }
  return '';
};

/**
 * Extract image from HTML (first img tag or og:image)
 */
export const extractImage = (html) => {
  // Try og:image first
  const ogImageMatch = html.match(/<meta[^>]*property=["']og:image["'][^>]*content=["']([^"']+)["']/i);
  if (ogImageMatch) {
    return ogImageMatch[1].trim();
  }
  
  // Fallback: first img tag
  const imgMatch = html.match(/<img[^>]*src=["']([^"']+)["']/i);
  if (imgMatch) {
    return imgMatch[1].trim();
  }
  
  return '/assets/images/dummy-img-600x400.jpg';
};

/**
 * Generate slug from title
 */
export const generateSlug = (title) => {
  return title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
};

/**
 * Extract category from HTML (meta tag or default)
 */
export const extractCategory = (html) => {
  const categoryMatch = html.match(/<meta[^>]*name=["']category["'][^>]*content=["']([^"']+)["']/i);
  if (categoryMatch) {
    return categoryMatch[1].trim();
  }
  return 'Social Media';
};

/**
 * Extract tags from HTML
 */
export const extractTags = (html) => {
  const tagsMatch = html.match(/<meta[^>]*name=["']tags["'][^>]*content=["']([^"']+)["']/i);
  if (tagsMatch) {
    return tagsMatch[1].split(',').map(tag => tag.trim()).filter(tag => tag);
  }
  return [];
};

/**
 * Parse complete HTML and extract all metadata
 */
export const parseHTMLContent = (html) => {
  const title = extractTitle(html);
  const slug = generateSlug(title);
  const metaDescription = extractMetaDescription(html);
  const excerpt = extractExcerpt(html);
  const keywords = extractKeywords(html);
  const image = extractImage(html);
  const category = extractCategory(html);
  const tags = extractTags(html);
  
  return {
    title,
    slug,
    excerpt,
    content: html,
    image,
    category,
    tags,
    seo: {
      metaTitle: title,
      metaDescription,
      keywords
    }
  };
};
