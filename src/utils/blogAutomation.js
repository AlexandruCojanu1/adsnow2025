/**
 * Blog Automation Utilities
 * Handles automatic sitemap generation and Google Indexing
 */

import { updatePosts, getPublishedPosts } from '../Data/blogPosts';

const SITE_URL = process.env.REACT_APP_SITE_URL || 'https://adsnow.vercel.app';

/**
 * Generate sitemap.xml
 */
export const generateSitemap = () => {
  try {
    const posts = getPublishedPosts();
    const currentDate = new Date().toISOString().split('T')[0];
    
    let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
  
  <!-- Homepage -->
  <url>
    <loc>${SITE_URL}/</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  
  <!-- Blog listing page -->
  <url>
    <loc>${SITE_URL}/blog</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
  
  <!-- Blog posts -->
`;

    posts.forEach(post => {
      const postDate = new Date(post.date).toISOString().split('T')[0];
      xml += `  <url>
    <loc>${SITE_URL}/blog/${post.slug}</loc>
    <lastmod>${postDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
`;
      
      if (post.image) {
        const imageUrl = post.image.startsWith('http') 
          ? post.image 
          : `${SITE_URL}${post.image}`;
        xml += `    <image:image>
      <image:loc>${imageUrl}</image:loc>
      <image:title>${escapeXml(post.title)}</image:title>
    </image:image>
`;
      }
      
      xml += `  </url>
`;
    });

    xml += `</urlset>`;
    
    // Store sitemap in localStorage for client-side access
    // In production, this should trigger a server-side rebuild
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('sitemap_xml', xml);
        console.log('Sitemap stored in localStorage');
      } catch (e) {
        console.warn('Could not store sitemap in localStorage:', e);
      }
    }
    
    return xml;
  } catch (error) {
    console.error('Error generating sitemap:', error);
    return null;
  }
};

/**
 * Escape XML special characters
 */
const escapeXml = (text) => {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
};

/**
 * Submit URL to Google Indexing API
 */
export const submitToGoogleIndexing = async (url) => {
  try {
    const apiEndpoint = `${SITE_URL}/api/google-indexing`;
    
    const response = await fetch(apiEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url })
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('Google Indexing API error:', error);
      return {
        success: false,
        error: error.error || 'Failed to submit to Google'
      };
    }

    const result = await response.json();
    return {
      success: true,
      result
    };
  } catch (error) {
    console.error('Error submitting to Google:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

/**
 * Automate blog post publishing
 * - Updates sitemap
 * - Submits to Google Indexing
 */
export const automatePostPublishing = async (post) => {
  const results = {
    sitemap: { success: false },
    googleIndexing: { success: false }
  };

  try {
    // Generate sitemap
    const sitemapXml = generateSitemap();
    if (sitemapXml) {
      results.sitemap.success = true;
      console.log('✓ Sitemap generated successfully');
      
      // Trigger sitemap regeneration script (if available)
      // In production, this should trigger a server-side rebuild
      if (typeof window !== 'undefined') {
        // Store flag to regenerate sitemap on next build
        localStorage.setItem('regenerate_sitemap', 'true');
      }
    }

    // Submit to Google Indexing if published
    if (post.published) {
      const postUrl = `${SITE_URL}/blog/${post.slug}`;
      
      // Wait a bit for the post to be saved
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const googleResult = await submitToGoogleIndexing(postUrl);
      results.googleIndexing = googleResult;
      
      if (googleResult.success) {
        console.log(`✓ Post submitted to Google: ${postUrl}`);
      } else {
        console.warn(`⚠ Google Indexing failed: ${googleResult.error}`);
        // Don't fail the whole process if Google Indexing fails
        // It might be a configuration issue
      }
    }

    return results;
  } catch (error) {
    console.error('Error in automation:', error);
    // Return partial success if sitemap worked but Google failed
    return results;
  }
};
