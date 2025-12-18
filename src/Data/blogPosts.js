// Blog posts data structure
// Each post should have: id, slug, title, excerpt, content, image, date, category, author, tags, seo

export const blogPosts = [];

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
