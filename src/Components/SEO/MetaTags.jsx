import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Meta Tags Component
 * Dynamically updates meta tags based on current route
 */
const MetaTags = ({ 
  title,
  description,
  keywords,
  image,
  type = "website"
}) => {
  const location = useLocation();
  const siteUrl = "https://adsnow.ro";
  const fullUrl = `${siteUrl}${location.pathname}`;
  const fullImage = image 
    ? (image.startsWith('http') ? image : `${siteUrl}${image}`)
    : `${siteUrl}/assets/images/logo1.png`;

  useEffect(() => {
    // Update title
    if (title) {
      document.title = title;
    }

    // Update or create meta tags
    const updateMetaTag = (name, content, isProperty = false) => {
      if (!content) return;
      
      const selector = isProperty 
        ? `meta[property="${name}"]`
        : `meta[name="${name}"]`;
      
      let meta = document.querySelector(selector);
      
      if (!meta) {
        meta = document.createElement('meta');
        if (isProperty) {
          meta.setAttribute('property', name);
        } else {
          meta.setAttribute('name', name);
        }
        document.head.appendChild(meta);
      }
      
      meta.setAttribute('content', content);
    };

    // Standard meta tags
    updateMetaTag('description', description);
    updateMetaTag('keywords', keywords);
    
    // Open Graph tags
    updateMetaTag('og:title', title, true);
    updateMetaTag('og:description', description, true);
    updateMetaTag('og:image', fullImage, true);
    updateMetaTag('og:url', fullUrl, true);
    updateMetaTag('og:type', type, true);
    updateMetaTag('og:locale', 'ro_RO', true);
    updateMetaTag('og:site_name', 'ADSNOW', true);
    
    // Twitter Card tags
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', title);
    updateMetaTag('twitter:description', description);
    updateMetaTag('twitter:image', fullImage);
    
    // Update canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', fullUrl);

  }, [title, description, keywords, image, type, fullUrl, fullImage]);

  return null;
};

export default MetaTags;
