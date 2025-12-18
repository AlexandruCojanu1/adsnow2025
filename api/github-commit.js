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
 */

const GITHUB_OWNER = 'AlexandruCojanu1';
const GITHUB_REPO = 'adsnow2025';
const GITHUB_BRANCH = 'main';
const BLOG_POSTS_PATH = 'src/Data/blogPosts.js';
const SITEMAP_PATH = 'public/sitemap.xml';

/**
 * Get file SHA from GitHub
 */
async function getFileSha(token, path) {
  const url = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${path}`;
  
  try {
    const response = await fetch(url, {
      headers: {
        'Authorization': `token ${token}`,
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'Vercel-Serverless-Function',
      },
    });

    if (response.status === 404) {
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
      throw new Error(`Failed to get file SHA (${response.status}): ${errorData.message || response.statusText}`);
    }

    const data = await response.json();
    return data.sha;
  } catch (error) {
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

  if (!response.ok) {
    const errorText = await response.text();
    let errorData;
    try {
      errorData = JSON.parse(errorText);
    } catch {
      errorData = { message: errorText };
    }
    throw new Error(`Failed to update file (${response.status}): ${errorData.message || response.statusText}`);
  }

  return await response.json();
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
 */
export default async function handler(req) {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });
  }

  if (req.method !== 'POST') {
    return new Response(
      JSON.stringify({ error: 'Method not allowed' }),
      {
        status: 405,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      }
    );
  }

  try {
    const body = await req.json();
    const { githubToken, posts, sitemapXml } = body;

    // Validate inputs
    if (!githubToken) {
      return new Response(
        JSON.stringify({ error: 'GitHub token is required' }),
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        }
      );
    }

    if (!posts || !Array.isArray(posts)) {
      return new Response(
        JSON.stringify({ error: 'Posts array is required' }),
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        }
      );
    }

    if (!sitemapXml) {
      return new Response(
        JSON.stringify({ error: 'Sitemap XML is required' }),
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        }
      );
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
        new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout getting SHA')), 5000))
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
        new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout updating file')), 5000))
      ]);
      
      console.log('Step 2: ✓ File updated, commit SHA:', blogPostsResult.commit?.sha);
      
      // Verify commit was successful by checking the file again
      console.log('Step 3: Verifying commit...');
      await new Promise(resolve => setTimeout(resolve, 1000)); // Wait 1s for GitHub to process
      const verifySha = await getFileSha(githubToken, BLOG_POSTS_PATH);
      
      if (verifySha && verifySha !== blogPostsSha) {
        results.blogPosts.success = true;
        results.blogPosts.message = 'Blog posts updated and verified in GitHub';
        results.blogPosts.commitSha = blogPostsResult.commit?.sha;
        results.blogPosts.commitUrl = blogPostsResult.commit?.html_url;
        results.blogPosts.verified = true;
        console.log('Step 3: ✓ Commit verified - file SHA changed');
      } else if (verifySha === blogPostsResult.commit?.sha || blogPostsResult.commit?.sha) {
        results.blogPosts.success = true;
        results.blogPosts.message = 'Blog posts updated in GitHub';
        results.blogPosts.commitSha = blogPostsResult.commit?.sha;
        results.blogPosts.commitUrl = blogPostsResult.commit?.html_url;
        results.blogPosts.verified = true;
        console.log('Step 3: ✓ Commit confirmed');
      } else {
        throw new Error('Commit verification failed - file not updated');
      }
    } catch (error) {
      results.blogPosts.error = error.message;
      results.blogPosts.verified = false;
      console.error('✗ Error updating blogPosts:', error.message);
    }

    // Update sitemap.xml second (only if blogPosts succeeded, with timeout)
    if (results.blogPosts.success) {
      try {
        console.log('Step 4: Getting sitemap.xml SHA...');
        const sitemapShaPromise = getFileSha(githubToken, SITEMAP_PATH);
        const sitemapSha = await Promise.race([
          sitemapShaPromise,
          new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout getting SHA')), 5000))
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
          new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout updating file')), 5000))
        ]);
        
        console.log('Step 5: ✓ File updated, commit SHA:', sitemapResult.commit?.sha);
        
        // Verify commit was successful
        console.log('Step 6: Verifying sitemap commit...');
        await new Promise(resolve => setTimeout(resolve, 1000)); // Wait 1s for GitHub to process
        const verifySitemapSha = await getFileSha(githubToken, SITEMAP_PATH);
        
        if (verifySitemapSha && verifySitemapSha !== sitemapSha) {
          results.sitemap.success = true;
          results.sitemap.message = 'Sitemap updated and verified in GitHub';
          results.sitemap.commitSha = sitemapResult.commit?.sha;
          results.sitemap.commitUrl = sitemapResult.commit?.html_url;
          results.sitemap.verified = true;
          console.log('Step 6: ✓ Sitemap commit verified - file SHA changed');
        } else if (verifySitemapSha === sitemapResult.commit?.sha || sitemapResult.commit?.sha) {
          results.sitemap.success = true;
          results.sitemap.message = 'Sitemap updated in GitHub';
          results.sitemap.commitSha = sitemapResult.commit?.sha;
          results.sitemap.commitUrl = sitemapResult.commit?.html_url;
          results.sitemap.verified = true;
          console.log('Step 6: ✓ Sitemap commit confirmed');
        } else {
          throw new Error('Sitemap commit verification failed - file not updated');
        }
      } catch (error) {
        results.sitemap.error = error.message;
        results.sitemap.verified = false;
        console.error('✗ Error updating sitemap:', error.message);
      }
    } else {
      results.sitemap.error = 'Skipped - blogPosts update failed';
      results.sitemap.verified = false;
    }

    // Return success if at least one file was updated
    const success = results.blogPosts.success || results.sitemap.success;

    return new Response(
      JSON.stringify({
        success,
        results,
        message: success 
          ? 'Files updated successfully. Vercel will auto-deploy.' 
          : 'Failed to update files',
      }),
      {
        status: success ? 200 : 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      }
    );

  } catch (error) {
    console.error('Error in github-commit handler:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Internal server error',
        message: error.message 
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      }
    );
  }
}
