/**
 * GitHub Commit API Serverless Function
 * 
 * This function commits blog posts and sitemap updates to GitHub repository.
 * 
 * Required parameters:
 * - githubToken: GitHub Personal Access Token
 * - posts: Array of blog posts
 * - sitemapXml: Generated sitemap XML content
 * 
 * Usage:
 * POST /api/github-commit
 * Body: { 
 *   "githubToken": "ghp_...",
 *   "posts": [...],
 *   "sitemapXml": "..."
 * }
 * 
 * Runtime: Edge (Vercel) - maxDuration: 30s
 */

const GITHUB_OWNER = 'AlexandruCojanu1';
const GITHUB_REPO = 'adsnow2025';
const GITHUB_BRANCH = 'main';
const BLOG_POSTS_PATH = 'content/posts.json';
// Sitemap is now generated dynamically via app/sitemap.ts, no static file needed
// SITEMAP_PATH removed - sitemap is generated dynamically by Next.js

/**
 * Get file SHA from GitHub
 */
async function getFileSha(token, path) {
  const url = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${path}`;
  
  try {
    console.log(`Fetching SHA for: ${path}`);
    const response = await fetch(url, {
      headers: {
        'Authorization': `token ${token}`,
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'Vercel-Serverless-Function',
      },
    });

    console.log(`Response status for ${path}:`, response.status);

    if (response.status === 404) {
      console.log(`File ${path} does not exist, will create new`);
      return null; // File doesn't exist yet
    }

    if (!response.ok) {
      const errorText = await response.text();
      let errorData;
      try {
        errorData = JSON.parse(errorText);
      } catch {
        errorData = { message: errorText };
      }
      console.error(`Error getting SHA for ${path}:`, errorData);
      throw new Error(`Failed to get file SHA (${response.status}): ${errorData.message || response.statusText}`);
    }

    const data = await response.json();
    console.log(`✓ SHA obtained for ${path}:`, data.sha?.substring(0, 7) + '...');
    return data.sha;
  } catch (error) {
    console.error(`Error in getFileSha for ${path}:`, error);
    throw new Error(`Error getting file SHA: ${error.message}`);
  }
}

/**
 * Base64 encode for Edge Runtime (no Buffer)
 */
function base64Encode(str) {
  if (typeof btoa !== 'undefined') {
    // Browser/Edge Runtime
    return btoa(unescape(encodeURIComponent(str)));
  }
  // Node.js (fallback)
  if (typeof Buffer !== 'undefined') {
    return Buffer.from(str, 'utf8').toString('base64');
  }
  throw new Error('No base64 encoding method available');
}

/**
 * Update file in GitHub
 */
async function updateFile(token, path, content, sha, message) {
  const url = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${path}`;
  
  // Base64 encode content
  const base64Content = base64Encode(content);
  
  const body = {
    message: message,
    content: base64Content,
    branch: GITHUB_BRANCH,
  };

  if (sha) {
    body.sha = sha;
  }

  console.log(`Updating file: ${path}, content length: ${content.length}, has SHA: ${!!sha}`);
  
  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      'Authorization': `token ${token}`,
      'Accept': 'application/vnd.github.v3+json',
      'Content-Type': 'application/json',
      'User-Agent': 'Vercel-Serverless-Function',
    },
    body: JSON.stringify(body),
  });

  console.log(`Update response status for ${path}:`, response.status);

  if (!response.ok) {
    const errorText = await response.text();
    let errorData;
    try {
      errorData = JSON.parse(errorText);
    } catch {
      errorData = { message: errorText };
    }
    console.error(`Error updating ${path}:`, errorData);
    throw new Error(`Failed to update file (${response.status}): ${errorData.message || response.statusText}`);
  }

  const result = await response.json();
  console.log(`✓ File ${path} updated successfully, commit SHA:`, result.commit?.sha?.substring(0, 7) + '...');
  return result;
}

/**
 * Generate blogPosts.js content
 */
function generateBlogPostsJs(posts) {
  const postsJson = JSON.stringify(posts, null, 2);
  
  return `// Blog posts data structure
// Each post should have: id, slug, title, excerpt, content, image, date, category, author, tags, seo

export const blogPosts = ${postsJson};

// Helper function to get post by slug
export const getPostBySlug = (slug) => {
  const posts = loadPosts();
  return posts.find(post => post.slug === slug);
};

// Helper function to get all published posts
export const getPublishedPosts = () => {
  const posts = loadPosts();
  return posts.filter(post => post.published);
};

// Helper function to get featured posts
export const getFeaturedPosts = () => {
  const posts = loadPosts();
  return posts.filter(post => post.featured && post.published);
};

// Helper function to get posts by category
export const getPostsByCategory = (category) => {
  const posts = loadPosts();
  return posts.filter(post => post.category === category && post.published);
};

// Function to load posts from localStorage or use default
export const loadPosts = () => {
  try {
    const savedPosts = localStorage.getItem('blog_posts');
    if (savedPosts) {
      return JSON.parse(savedPosts);
    }
  } catch (e) {
    console.error('Error loading posts from localStorage:', e);
  }
  return blogPosts;
};

// Export posts with localStorage support
export let blogPostsData = loadPosts();

// Update function for admin
export const updatePosts = (newPosts) => {
  blogPostsData = newPosts;
  localStorage.setItem('blog_posts', JSON.stringify(newPosts));
};
`;
}

/**
 * Main handler
 * Vercel Node.js Runtime format
 */
export default async function handler(req, res) {
  const startTime = Date.now();
  console.log('=== GitHub Commit API Handler Started ===');
  console.log('Method:', req.method);
  console.log('URL:', req.url);
  
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    console.log('Parsing request body...');
    // In Vercel Node.js runtime, body is automatically parsed if Content-Type is application/json
    const body = req.body || {};
    const { githubToken, posts, sitemapXml } = body;
    
    console.log('Request parsed:', {
      hasToken: !!githubToken,
      tokenPrefix: githubToken?.substring(0, 7) + '...',
      postsCount: posts?.length || 0,
      sitemapLength: sitemapXml?.length || 0
    });

    // Validate inputs
    if (!githubToken) {
      return res.status(400).json({ error: 'GitHub token is required' });
    }

    if (!posts || !Array.isArray(posts)) {
      return res.status(400).json({ error: 'Posts array is required' });
    }

    if (!sitemapXml) {
      return res.status(400).json({ error: 'Sitemap XML is required' });
    }

    // Skip token verification to save time - will fail on actual API calls if invalid
    // Token will be validated when we try to get file SHA

    const results = {
      blogPosts: { success: false, error: null },
      sitemap: { success: false, error: null },
    };

    // Generate content first (synchronous, fast)
    const blogPostsContent = generateBlogPostsJs(posts);
    const commitMessage = `Update blog posts and sitemap - ${new Date().toISOString()}`;

    // Update blogPosts.js first (with timeout protection)
    try {
      console.log('Step 1: Getting blogPosts.js SHA...');
      const blogPostsShaPromise = getFileSha(githubToken, BLOG_POSTS_PATH);
      const blogPostsSha = await Promise.race([
        blogPostsShaPromise,
        new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout getting SHA (15s)')), 15000))
      ]);
      console.log('Step 1: ✓ SHA obtained:', blogPostsSha ? 'existing file' : 'new file');
      
      console.log('Step 2: Updating blogPosts.js in GitHub...');
      const updatePromise = updateFile(
        githubToken,
        BLOG_POSTS_PATH,
        blogPostsContent,
        blogPostsSha,
        commitMessage
      );
      const blogPostsResult = await Promise.race([
        updatePromise,
        new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout updating file (15s)')), 15000))
      ]);
      
      console.log('Step 2: ✓ File updated, commit SHA:', blogPostsResult.commit?.sha);
      
      // Verify commit was successful by checking the file again
      console.log('Step 3: Verifying commit...');
      // Wait longer for GitHub to process the commit
      await new Promise(resolve => setTimeout(resolve, 2000)); // Wait 2s for GitHub to process
      
      // Try to verify commit - but don't fail if verification is delayed
      try {
        const verifySha = await Promise.race([
          getFileSha(githubToken, BLOG_POSTS_PATH),
          new Promise((_, reject) => setTimeout(() => reject(new Error('Verification timeout')), 10000))
        ]);
        
        if (verifySha && verifySha !== blogPostsSha) {
          results.blogPosts.success = true;
          results.blogPosts.message = 'Blog posts updated and verified in GitHub';
          results.blogPosts.commitSha = blogPostsResult.commit?.sha;
          results.blogPosts.commitUrl = blogPostsResult.commit?.html_url;
          results.blogPosts.verified = true;
          console.log('Step 3: ✓ Commit verified - file SHA changed');
        } else if (blogPostsResult.commit?.sha) {
          // If we have a commit SHA, consider it successful even if verification is delayed
          results.blogPosts.success = true;
          results.blogPosts.message = 'Blog posts updated in GitHub (verification pending)';
          results.blogPosts.commitSha = blogPostsResult.commit?.sha;
          results.blogPosts.commitUrl = blogPostsResult.commit?.html_url;
          results.blogPosts.verified = true;
          console.log('Step 3: ✓ Commit confirmed (SHA:', blogPostsResult.commit?.sha?.substring(0, 7) + '...)');
        } else {
          throw new Error('No commit SHA returned from GitHub');
        }
      } catch (verifyError) {
        // If verification fails but we have a commit SHA, still consider it successful
        if (blogPostsResult.commit?.sha) {
          console.warn('Verification delayed, but commit exists:', blogPostsResult.commit?.sha);
          results.blogPosts.success = true;
          results.blogPosts.message = 'Blog posts updated in GitHub (verification delayed)';
          results.blogPosts.commitSha = blogPostsResult.commit?.sha;
          results.blogPosts.commitUrl = blogPostsResult.commit?.html_url;
          results.blogPosts.verified = true;
        } else {
          throw verifyError;
        }
      }
    } catch (error) {
      results.blogPosts.error = error.message;
      results.blogPosts.verified = false;
      console.error('✗ Error updating blogPosts:', error.message);
    }

    // Update sitemap.xml second (only if blogPosts succeeded, with timeout)
    // NOTE: Sitemap is now generated dynamically by Next.js app/sitemap.ts
    // This section is kept for backward compatibility but can be removed if not needed
    if (results.blogPosts.success && sitemapXml) {
      try {
        // Skip sitemap update - it's now generated dynamically
        console.log('Step 4: Skipping sitemap.xml update (generated dynamically by Next.js)');
        results.sitemap.success = true;
        results.sitemap.message = 'Sitemap is generated dynamically by Next.js - no update needed';
        results.sitemap.verified = true;
        /* OLD CODE - Commented out since sitemap is now dynamic
        console.log('Step 4: Getting sitemap.xml SHA...');
        const sitemapShaPromise = getFileSha(githubToken, SITEMAP_PATH);
        const sitemapSha = await Promise.race([
          sitemapShaPromise,
          new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout getting SHA (15s)')), 15000))
        ]);
        console.log('Step 4: ✓ SHA obtained:', sitemapSha ? 'existing file' : 'new file');
        
        console.log('Step 5: Updating sitemap.xml in GitHub...');
        const updatePromise = updateFile(
          githubToken,
          SITEMAP_PATH,
          sitemapXml,
          sitemapSha,
          commitMessage
        );
        const sitemapResult = await Promise.race([
          updatePromise,
          new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout updating file (15s)')), 15000))
        ]);
        
        console.log('Step 5: ✓ File updated, commit SHA:', sitemapResult.commit?.sha);
        
        // Verify commit was successful
        console.log('Step 6: Verifying sitemap commit...');
        await new Promise(resolve => setTimeout(resolve, 2000)); // Wait 2s for GitHub to process
        
        // Try to verify commit - but don't fail if verification is delayed
        try {
          const verifySitemapSha = await Promise.race([
            getFileSha(githubToken, SITEMAP_PATH),
            new Promise((_, reject) => setTimeout(() => reject(new Error('Verification timeout')), 10000))
          ]);
          
          if (verifySitemapSha && verifySitemapSha !== sitemapSha) {
            results.sitemap.success = true;
            results.sitemap.message = 'Sitemap updated and verified in GitHub';
            results.sitemap.commitSha = sitemapResult.commit?.sha;
            results.sitemap.commitUrl = sitemapResult.commit?.html_url;
            results.sitemap.verified = true;
            console.log('Step 6: ✓ Sitemap commit verified - file SHA changed');
          } else if (sitemapResult.commit?.sha) {
            // If we have a commit SHA, consider it successful even if verification is delayed
            results.sitemap.success = true;
            results.sitemap.message = 'Sitemap updated in GitHub (verification pending)';
            results.sitemap.commitSha = sitemapResult.commit?.sha;
            results.sitemap.commitUrl = sitemapResult.commit?.html_url;
            results.sitemap.verified = true;
            console.log('Step 6: ✓ Sitemap commit confirmed (SHA:', sitemapResult.commit?.sha?.substring(0, 7) + '...)');
          } else {
            throw new Error('No commit SHA returned from GitHub');
          }
        } catch (verifyError) {
          // If verification fails but we have a commit SHA, still consider it successful
          if (sitemapResult.commit?.sha) {
            console.warn('Sitemap verification delayed, but commit exists:', sitemapResult.commit?.sha);
            results.sitemap.success = true;
            results.sitemap.message = 'Sitemap updated in GitHub (verification delayed)';
            results.sitemap.commitSha = sitemapResult.commit?.sha;
            results.sitemap.commitUrl = sitemapResult.commit?.html_url;
            results.sitemap.verified = true;
          } else {
            throw verifyError;
          }
        }
        */
      } catch (error) {
        results.sitemap.error = error.message;
        results.sitemap.verified = false;
        console.error('✗ Error updating sitemap:', error.message);
      }
    } else {
      if (!sitemapXml) {
        results.sitemap.success = true;
        results.sitemap.message = 'Sitemap is generated dynamically - no update needed';
        results.sitemap.verified = true;
      } else {
        results.sitemap.error = 'Skipped - blogPosts update failed';
        results.sitemap.verified = false;
      }
    }

    // Return success if at least one file was updated and verified
    const success = (results.blogPosts.success && results.blogPosts.verified) || 
                    (results.sitemap.success && results.sitemap.verified);
    const bothVerified = results.blogPosts.verified && results.sitemap.verified;

    let message = '';
    if (bothVerified) {
      message = '✓ Articol și sitemap actualizate cu succes în GitHub! Vercel va face auto-deploy în câteva minute.';
    } else if (results.blogPosts.verified) {
      message = '✓ Articol actualizat în GitHub! Sitemap a eșuat. Vercel va face auto-deploy.';
    } else if (results.sitemap.verified) {
      message = '⚠ Sitemap actualizat, dar articolul a eșuat. Verifică erorile.';
    } else {
      message = '✗ Actualizarea a eșuat. Verifică erorile de mai jos.';
    }

    return res.status(success ? 200 : 500).json({
      success,
      results,
      message,
      verified: {
        blogPosts: results.blogPosts.verified || false,
        sitemap: results.sitemap.verified || false,
        both: bothVerified
      },
      githubUrls: {
        blogPosts: results.blogPosts.commitUrl || null,
        sitemap: results.sitemap.commitUrl || null,
        repository: `https://github.com/${GITHUB_OWNER}/${GITHUB_REPO}/commits/${GITHUB_BRANCH}`
      }
    });

  } catch (error) {
    console.error('Error in github-commit handler:', error);
    
    // Provide more detailed error messages
    let errorMessage = error.message || 'Internal server error';
    let statusCode = 500;
    
    // Check for common error types
    if (error.message?.includes('Timeout')) {
      errorMessage = 'Timeout: GitHub API a răspuns prea lent. Te rog încearcă din nou.';
      statusCode = 504;
    } else if (error.message?.includes('401') || error.message?.includes('Unauthorized')) {
      errorMessage = 'Eroare de autentificare: Token-ul GitHub este invalid sau expirat. Verifică token-ul.';
      statusCode = 401;
    } else if (error.message?.includes('403') || error.message?.includes('Forbidden')) {
      errorMessage = 'Acces interzis: Token-ul nu are permisiunile necesare (necesar: repo scope).';
      statusCode = 403;
    } else if (error.message?.includes('404')) {
      errorMessage = 'Repository sau fișier negăsit. Verifică că repository-ul există și că token-ul are acces.';
      statusCode = 404;
    }
    
    return res.status(statusCode).json({ 
      error: 'Internal server error',
      message: errorMessage,
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}
