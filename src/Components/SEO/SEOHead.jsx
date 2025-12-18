import React from "react";
import { OrganizationSchema, WebsiteSchema } from "./StructuredData";

/**
 * SEO Head Component
 * Adds all SEO meta tags and structured data to the page
 */
const SEOHead = ({ 
  title,
  description,
  keywords,
  image,
  url,
  type = "website",
  siteUrl = "https://adsnow.vercel.app"
}) => {
  const fullTitle = title 
    ? `${title} | ADSNOW - Your Online Identity Advisor`
    : "ADSNOW - Your Online Identity Advisor | Consultanță în Identitate Digitală și Marketing Online";
  
  const fullDescription = description || 
    "Consultanță în Identitate Digitală și Marketing Online. Construim identități digitale pentru profesioniști și branduri care aduc valoare. Nu vindem servicii. Alegem parteneri.";
  
  const fullImage = image 
    ? (image.startsWith('http') ? image : `${siteUrl}${image}`)
    : `${siteUrl}/assets/images/logo1.png`;
  
  const fullUrl = url 
    ? (url.startsWith('http') ? url : `${siteUrl}${url}`)
    : siteUrl;

  return (
    <>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={fullDescription} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="author" content="Algo Digital Solutions" />
      <meta name="robots" content="index, follow" />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={fullDescription} />
      <meta property="og:image" content={fullImage} />
      <meta property="og:locale" content="ro_RO" />
      <meta property="og:site_name" content="ADSNOW" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={fullUrl} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={fullDescription} />
      <meta name="twitter:image" content={fullImage} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={fullUrl} />
      
      {/* Structured Data */}
      <OrganizationSchema siteUrl={siteUrl} />
      <WebsiteSchema siteUrl={siteUrl} />
    </>
  );
};

export default SEOHead;
