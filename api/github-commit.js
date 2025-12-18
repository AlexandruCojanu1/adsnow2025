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
  console.log('GitHub Commit API called:', req.method, req.url);
  
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
    console.log('Parsing request body...');
    const body = await req.json();
    const { githubToken, posts, sitemapXml } = body;
    
    console.log('Request received:', {
      hasToken: !!githubToken,
      tokenLength: githubToken?.length || 0,
      postsCount: posts?.length || 0,
      hasSitemap: !!sitemapXml,
      sitemapLength: sitemapXml?.length || 0
    });

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

    // Verify GitHub token first
    try {
      console.log('Verifying GitHub token...');
      const verifyResponse = await fetch(`https://api.github.com/user`, {
        headers: {
          'Authorization': `token ${githubToken}`,
          'Accept': 'application/vnd.github.v3+json',
        },
      });
      
      if (!verifyResponse.ok) {
        const errorData = await verifyResponse.json().catch(() => ({}));
        return new Response(
          JSON.stringify({ 
            error: 'Invalid GitHub token',
            message: errorData.message || 'Token-ul GitHub nu este valid sau nu are permisiunile necesare. Verifică că token-ul are scope "repo".',
            details: errorData
          }),
          {
            status: 401,
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*',
            },
          }
        );
      }
      
      const userData = await verifyResponse.json();
      console.log('✓ GitHub token verified for user:', userData.login);
    } catch (error) {
      return new Response(
        JSON.stringify({ 
          error: 'Failed to verify GitHub token',
          message: error.message 
        }),
        {
          status: 401,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        }
      );
    }

    const results = {
      blogPosts: { success: false, error: null },
      sitemap: { success: false, error: null },
    };

    // Update blogPosts.js
    try {
      console.log('=== Starting blogPosts.js update ===');
      console.log('Generating blogPosts.js content...');
      const blogPostsContent = generateBlogPostsJs(posts);
      console.log('Content generated, length:', blogPostsContent.length);
      
      console.log('Getting file SHA for blogPosts.js...');
      const blogPostsSha = await getFileSha(githubToken, BLOG_POSTS_PATH);
      console.log('BlogPosts SHA:', blogPostsSha || 'File does not exist, will create new');
      
      console.log('Updating blogPosts.js in GitHub...');
      const blogPostsResult = await updateFile(
        githubToken,
        BLOG_POSTS_PATH,
        blogPostsContent,
        blogPostsSha,
        `Update blog posts - ${new Date().toISOString()}`
      );
      
      console.log('GitHub API response:', JSON.stringify(blogPostsResult, null, 2));
      
      results.blogPosts.success = true;
      results.blogPosts.message = 'Blog posts updated successfully';
      results.blogPosts.commitSha = blogPostsResult.commit?.sha;
      results.blogPosts.commitUrl = blogPostsResult.commit?.html_url;
      console.log('✓ Blog posts updated successfully!');
      console.log('  Commit SHA:', blogPostsResult.commit?.sha);
      console.log('  Commit URL:', blogPostsResult.commit?.html_url);
    } catch (error) {
      results.blogPosts.error = error.message;
      results.blogPosts.details = error.stack;
      console.error('✗ Error updating blog posts:', error);
      console.error('  Error message:', error.message);
      console.error('  Error stack:', error.stack);
    }

    // Update sitemap.xml
    try {
      console.log('=== Starting sitemap.xml update ===');
      console.log('Getting file SHA for sitemap.xml...');
      const sitemapSha = await getFileSha(githubToken, SITEMAP_PATH);
      console.log('Sitemap SHA:', sitemapSha || 'File does not exist, will create new');
      
      console.log('Updating sitemap.xml in GitHub...');
      const sitemapResult = await updateFile(
        githubToken,
        SITEMAP_PATH,
        sitemapXml,
        sitemapSha,
        `Update sitemap - ${new Date().toISOString()}`
      );
      
      console.log('GitHub API response:', JSON.stringify(sitemapResult, null, 2));
      
      results.sitemap.success = true;
      results.sitemap.message = 'Sitemap updated successfully';
      results.sitemap.commitSha = sitemapResult.commit?.sha;
      results.sitemap.commitUrl = sitemapResult.commit?.html_url;
      console.log('✓ Sitemap updated successfully!');
      console.log('  Commit SHA:', sitemapResult.commit?.sha);
      console.log('  Commit URL:', sitemapResult.commit?.html_url);
    } catch (error) {
      results.sitemap.error = error.message;
      results.sitemap.details = error.stack;
      console.error('✗ Error updating sitemap:', error);
      console.error('  Error message:', error.message);
      console.error('  Error stack:', error.stack);
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
