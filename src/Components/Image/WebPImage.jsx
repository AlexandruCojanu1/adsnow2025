import React from "react";

/**
 * WebP Image Component with fallback
 * Automatically uses WebP if supported, falls back to original format
 */
const WebPImage = ({ 
  src, 
  webpSrc, 
  alt, 
  className, 
  ...props 
}) => {
  // If webpSrc is provided, use picture element with fallback
  if (webpSrc) {
    return (
      <picture>
        <source srcSet={webpSrc} type="image/webp" />
        <img src={src} alt={alt} className={className} {...props} />
      </picture>
    );
  }
  
  // If src already ends with .webp, use it directly
  if (src.endsWith('.webp')) {
    return <img src={src} alt={alt} className={className} {...props} />;
  }
  
  // Otherwise, try to use WebP version if it exists
  const webpPath = src.replace(/\.(jpg|jpeg|png)$/i, '.webp');
  
  return (
    <picture>
      <source srcSet={webpPath} type="image/webp" />
      <img src={src} alt={alt} className={className} {...props} />
    </picture>
  );
};

export default WebPImage;
