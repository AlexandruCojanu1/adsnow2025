// Blog posts data structure
// Each post should have: id, slug, title, excerpt, content, image, date, category, author, tags, seo

export const blogPosts = [
  {
    id: 1,
    slug: "mastering-instagram-facebook-ads",
    title: "Mastering Instagram and Facebook Ads",
    excerpt: "Descoperă cum să creezi campanii publicitare eficiente pe Instagram și Facebook care aduc rezultate reale pentru business-ul tău.",
    content: `
      <p>În lumea digitală de astăzi, rețelele sociale joacă un rol crucial în succesul oricărui business. Instagram și Facebook sunt două dintre cele mai puternice platforme pentru marketing digital, oferind acces la miliarde de utilizatori potențiali.</p>
      
      <h2>De ce Instagram și Facebook Ads?</h2>
      <p>Aceste platforme oferă targeting precis, analitici detaliate și multiple formate publicitare care te ajută să-ți atingi obiectivele de business.</p>
      
      <h3>Strategii Eficiente</h3>
      <ul>
        <li>Targeting precis bazat pe demografie și interese</li>
        <li>Utilizarea formatelor video pentru engagement mai mare</li>
        <li>Testarea continuă și optimizarea campaniilor</li>
        <li>Măsurarea ROI-ului pentru fiecare campanie</li>
      </ul>
      
      <p>Cu strategia corectă și execuție atentă, poți transforma investiția în publicitate într-un motor de creștere pentru business-ul tău.</p>
    `,
    image: "/assets/images/dummy-img-600x400.jpg",
    date: "2025-04-14",
    category: "Social Media",
    author: "Algo Digital Solutions",
    tags: ["Instagram", "Facebook", "Social Media", "Advertising"],
    seo: {
      metaTitle: "Mastering Instagram and Facebook Ads - Ghid Complet",
      metaDescription: "Învață cum să creezi campanii publicitare eficiente pe Instagram și Facebook. Strategii practice și sfaturi pentru rezultate reale.",
      keywords: "instagram ads, facebook ads, social media marketing, advertising"
    },
    published: true,
    featured: true
  },
  {
    id: 2,
    slug: "growth-strategies-digital-business",
    title: "Growth Strategies for Digital Business",
    excerpt: "Strategii dovedite pentru creșterea business-ului digital. De la brand positioning la performance marketing și customer retention.",
    content: `
      <p>Creșterea unui business digital necesită mai mult decât un website și câteva anunțuri. Este nevoie de o strategie integrată care să acopere toate aspectele digitale ale business-ului tău.</p>
      
      <h2>Piloni ai Creșterii Digitale</h2>
      <p>Pentru a crește sustenabil, business-urile digitale trebuie să se concentreze pe trei piloni principali:</p>
      
      <h3>1. Brand Positioning</h3>
      <p>Poziționarea corectă a brandului tău în mintea consumatorilor este esențială pentru succesul pe termen lung.</p>
      
      <h3>2. Performance Marketing</h3>
      <p>Marketing-ul bazat pe performanță te ajută să măsori și să optimizezi fiecare leu investit în publicitate.</p>
      
      <h3>3. Customer Retention</h3>
      <p>Păstrarea clienților existenți este adesea mai profitabilă decât atragerea de noi clienți.</p>
      
      <p>Implementând aceste strategii într-un mod integrat, poți crea un motor de creștere sustenabil pentru business-ul tău digital.</p>
    `,
    image: "/assets/images/dummy-img-600x400.jpg",
    date: "2025-04-14",
    category: "SEO",
    author: "Algo Digital Solutions",
    tags: ["Growth", "Digital Marketing", "Business Strategy", "SEO"],
    seo: {
      metaTitle: "Growth Strategies for Digital Business - Ghid Practic",
      metaDescription: "Descoperă strategii dovedite pentru creșterea business-ului digital. De la brand positioning la performance marketing.",
      keywords: "digital business growth, marketing strategy, business development"
    },
    published: true,
    featured: true
  }
];

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
