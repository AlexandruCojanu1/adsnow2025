import { getPublishedPosts, loadPosts } from './blogPosts';

// Format date helper
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('ro-RO', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
};

// Convert blogPosts to blogs format for backward compatibility
// This function is called dynamically to always use latest data from localStorage
export const getBlogs = () => {
  return getPublishedPosts().map(post => ({
    id: post.id,
    image: post.image,
    date: formatDate(post.date),
    category: post.category,
    title: post.title,
    excerpt: post.excerpt,
    link: `/blog/${post.slug}`,
    slug: post.slug
  }));
};

// For backward compatibility, export as function that returns current blogs
export const blogs = getBlogs();  