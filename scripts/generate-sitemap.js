/**
 * Generate sitemap.xml for blog posts
 * 
 * This script generates a sitemap.xml file that includes all published blog posts.
 * The sitemap helps search engines discover and index your blog posts.
 * 
 * Usage:
 * node scripts/generate-sitemap.js [--url=https://adsnow.vercel.app] [--output=public/sitemap.xml]
 */

import { getPublishedPosts } from '../src/Data/blogPosts.js';
import { writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const SITE_URL = process.env.SITE_URL || 'https://adsnow.vercel.app';

/**
 * Generate sitemap XML content
 */
function generateSitemap(posts, siteUrl) {
  const currentDate = new Date().toISOString().split('T')[0];
  
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
  
  <!-- Homepage -->
  <url>
    <loc>${siteUrl}/</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  
  <!-- Blog listing page -->
  <url>
    <loc>${siteUrl}/blog</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
  
  <!-- Blog posts -->
`;

  posts.forEach(post => {
    const postDate = new Date(post.date).toISOString().split('T')[0];
    xml += `  <url>
    <loc>${siteUrl}/blog/${post.slug}</loc>
    <lastmod>${postDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
`;
    
    // Add image if available
    if (post.image) {
      xml += `    <image:image>
      <image:loc>${siteUrl}${post.image}</image:loc>
      <image:title>${escapeXml(post.title)}</image:title>
    </image:image>
`;
    }
    
    xml += `  </url>
`;
  });

  xml += `</urlset>`;
  
  return xml;
}

/**
 * Escape XML special characters
 */
function escapeXml(text) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

/**
 * Main function
 */
function main() {
  const args = process.argv.slice(2);
  
  // Parse command line arguments
  const urlArg = args.find(arg => arg.startsWith('--url='));
  const outputArg = args.find(arg => arg.startsWith('--output='));
  
  const siteUrl = urlArg ? urlArg.split('=')[1] : SITE_URL;
  const outputPath = outputArg 
    ? outputArg.split('=')[1] 
    : join(__dirname, '..', 'public', 'sitemap.xml');

  console.log(`Site URL: ${siteUrl}`);
  console.log(`Output: ${outputPath}`);

  const posts = getPublishedPosts();
  console.log(`Found ${posts.length} published posts`);

  const sitemap = generateSitemap(posts, siteUrl);
  
  writeFileSync(outputPath, sitemap, 'utf8');
  console.log(`✓ Sitemap generated successfully: ${outputPath}`);
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { generateSitemap };
