// Server Component for Structured Data (JSON-LD)
// These schemas help search engines understand your content

interface SchemaProps {
  siteUrl?: string;
}

export function OrganizationSchema({ siteUrl = "https://adsnow.ro" }: SchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Algo Digital Solutions",
    "alternateName": "ADSNOW",
    "url": siteUrl,
    "logo": `${siteUrl}/assets/images/logo1.png`,
    "description": "Consultanță în Identitate Digitală și Marketing Online. Construim identități digitale pentru profesioniști și branduri care aduc valoare.",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Brașov",
      "addressCountry": "RO"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "email": "algodigitalsolutions@gmail.com",
      "telephone": "+40-771-587-498",
      "contactType": "customer service"
    },
    "sameAs": [
      "https://www.facebook.com/adsnow.ro",
      "https://www.instagram.com/adsnow.ro/",
      "https://www.tiktok.com/@adsnow.ro"
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function WebsiteSchema({ siteUrl = "https://adsnow.ro" }: SchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "ADSNOW - Your Online Identity Advisor",
    "url": siteUrl,
    "description": "Consultanță în Identitate Digitală și Marketing Online",
    "publisher": {
      "@type": "Organization",
      "name": "Algo Digital Solutions"
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${siteUrl}/blog?search={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface BlogPost {
  title: string;
  excerpt: string;
  image?: string;
  date: string;
  author?: string;
  category?: string;
  slug: string;
  tags?: string[];
  seo?: {
    keywords?: string;
  };
}

interface BlogPostSchemaProps {
  post: BlogPost;
  siteUrl?: string;
}

export function BlogPostSchema({ post, siteUrl = "https://adsnow.ro" }: BlogPostSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.excerpt,
    "image": post.image ? `${siteUrl}${post.image}` : `${siteUrl}/assets/images/logo1.png`,
    "datePublished": post.date,
    "dateModified": post.date,
    "author": {
      "@type": "Organization",
      "name": post.author || "Algo Digital Solutions",
      "url": siteUrl
    },
    "publisher": {
      "@type": "Organization",
      "name": "Algo Digital Solutions",
      "logo": {
        "@type": "ImageObject",
        "url": `${siteUrl}/assets/images/logo1.png`
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${siteUrl}/blog/${post.slug}`
    },
    "articleSection": post.category,
    "keywords": post.tags?.join(", ") || post.seo?.keywords || ""
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbSchemaProps {
  items: BreadcrumbItem[];
  siteUrl?: string;
}

export function BreadcrumbSchema({ items, siteUrl = "https://adsnow.ro" }: BreadcrumbSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": `${siteUrl}${item.url}`
    }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function ServiceSchema({ siteUrl = "https://adsnow.ro" }: SchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Digital Marketing Services",
    "provider": {
      "@type": "Organization",
      "name": "Algo Digital Solutions",
      "url": siteUrl
    },
    "areaServed": {
      "@type": "Country",
      "name": "Romania"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Digital Marketing Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Brand Strategy",
            "description": "Strategie de brand și poziționare digitală"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Performance Marketing",
            "description": "Marketing bazat pe performanță și conversii"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Social Media Marketing",
            "description": "Marketing pe rețelele sociale"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "SEO",
            "description": "Optimizare pentru motoarele de căutare"
          }
        }
      ]
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

