import { useEffect } from "react";

const HeadTitle = ({ title, description, keywords, image, url }) => {
    useEffect(() => {
        // Set page title
        if (title) {
            document.title = title;
        }

        // Set or update meta description
        let metaDescription = document.querySelector('meta[name="description"]');
        if (!metaDescription) {
            metaDescription = document.createElement('meta');
            metaDescription.setAttribute('name', 'description');
            document.head.appendChild(metaDescription);
        }
        if (description) {
            metaDescription.setAttribute('content', description);
        }

        // Set or update meta keywords
        let metaKeywords = document.querySelector('meta[name="keywords"]');
        if (!metaKeywords) {
            metaKeywords = document.createElement('meta');
            metaKeywords.setAttribute('name', 'keywords');
            document.head.appendChild(metaKeywords);
        }
        if (keywords) {
            metaKeywords.setAttribute('content', keywords);
        }

        // Set Open Graph tags
        const setMetaProperty = (property, content) => {
            if (!content) return;
            let meta = document.querySelector(`meta[property="${property}"]`);
            if (!meta) {
                meta = document.createElement('meta');
                meta.setAttribute('property', property);
                document.head.appendChild(meta);
            }
            meta.setAttribute('content', content);
        };

        setMetaProperty('og:title', title);
        setMetaProperty('og:description', description);
        setMetaProperty('og:image', image || window.location.origin + '/assets/images/logo1.png');
        setMetaProperty('og:url', url || window.location.href);
        setMetaProperty('og:type', 'article');

        // Set Twitter Card tags
        const setMetaName = (name, content) => {
            if (!content) return;
            let meta = document.querySelector(`meta[name="${name}"]`);
            if (!meta) {
                meta = document.createElement('meta');
                meta.setAttribute('name', name);
                document.head.appendChild(meta);
            }
            meta.setAttribute('content', content);
        };

        setMetaName('twitter:card', 'summary_large_image');
        setMetaName('twitter:title', title);
        setMetaName('twitter:description', description);
        setMetaName('twitter:image', image || window.location.origin + '/assets/images/logo1.png');

    }, [title, description, keywords, image, url]);

    return null;
}

export default HeadTitle;
