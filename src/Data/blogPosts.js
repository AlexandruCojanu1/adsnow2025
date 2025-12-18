// Blog posts data structure
// Each post should have: id, slug, title, excerpt, content, image, date, category, author, tags, seo

export const blogPosts = [
  {
    "slug": "custom-code-vs-wordpress-2025-adsnow-design",
    "title": "Custom Code vs WordPress 2025 - AdsNow Design",
    "excerpt": "În 2025, un website nu mai este o simplă carte de vizită digitală. Este motorul tău de vânzări. Mulți antreprenori aleg WordPress pentru costul inițial redus, d",
    "content": "<!DOCTYPE html>\n<html lang=\"ro\">\n<head>\n    <meta charset=\"UTF-8\">\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n    <title>Custom Code vs WordPress 2025 - AdsNow Design</title>\n    <!-- Import Font Inter -->\n    <link rel=\"preconnect\" href=\"https://fonts.googleapis.com\">\n    <link rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin>\n    <link href=\"https://fonts.googleapis.com/css2?family=Inter:wght@400;700;800;900&display=swap\" rel=\"stylesheet\">\n    \n    <style>\n        /* --- RESET & BASE STYLES --- */\n        * {\n            box-sizing: border-box;\n            margin: 0;\n            padding: 0;\n        }\n\n        body {\n            font-family: 'Inter', sans-serif;\n            background-color: #ffffff;\n            color: #0D2440; /* Text Principal */\n            line-height: 1.6;\n        }\n\n        /* --- TYPOGRAPHY --- */\n        h1 { font-weight: 900; font-size: 2.5rem; line-height: 1.2; color: #0D2440; margin-bottom: 1.5rem; }\n        h2 { font-weight: 800; font-size: 2rem; line-height: 1.3; color: #0D2440; margin-bottom: 1.5rem; }\n        h3 { font-weight: 700; font-size: 1.5rem; line-height: 1.4; color: #0D2440; margin-bottom: 1rem; }\n        h4 { font-weight: 700; font-size: 1.2rem; line-height: 1.4; color: #0D2440; margin-bottom: 1rem; }\n        p { font-weight: 400; font-size: 1rem; line-height: 1.8; color: rgba(13, 36, 64, 0.8); margin-bottom: 1.5rem; }\n        ul, ol { margin-bottom: 1.5rem; padding-left: 1.5rem; color: rgba(13, 36, 64, 0.8); }\n        li { margin-bottom: 0.5rem; }\n\n        /* --- COMPONENTS --- */\n        .container { max-width: 1200px; margin: 0 auto; padding: 0 1.5rem; }\n        \n        .custom-card {\n            background: #ffffff;\n            border: 2px solid #E3EAFF;\n            border-radius: 16px;\n            padding: 2rem;\n            margin-bottom: 2rem;\n            box-shadow: 0 2px 12px rgba(13, 36, 64, 0.1);\n        }\n\n        .highlight-box {\n            background: #E3EAFF;\n            border-left: 4px solid #2E5E99;\n            padding: 1.5rem;\n            margin: 2rem 0;\n            border-radius: 8px;\n        }\n\n        .custom-button {\n            background: #2E5E99;\n            color: #ffffff;\n            border: none;\n            border-radius: 12px;\n            padding: 1rem 2rem;\n            font-family: 'Inter', sans-serif;\n            font-weight: 700;\n            font-size: 1rem;\n            cursor: pointer;\n            transition: all 0.3s ease;\n            text-decoration: none;\n            display: inline-block;\n        }\n\n        .custom-button:hover { background: #0D2440; transform: translateY(-2px); }\n        .custom-button.secondary { background: white; color: #2E5E99; border: 2px solid #E3EAFF; }\n        .custom-button.secondary:hover { background: #E3EAFF; color: #0D2440; }\n\n        .meta-tag {\n            background: #E3EAFF;\n            color: #2E5E99;\n            padding: 0.25rem 0.75rem;\n            border-radius: 99px;\n            font-size: 0.8rem;\n            font-weight: 700;\n            text-transform: uppercase;\n            letter-spacing: 0.05em;\n        }\n\n        /* --- TABLE --- */\n        .custom-table {\n            width: 100%;\n            border-collapse: collapse;\n            margin-bottom: 2rem;\n            font-size: 0.95rem;\n        }\n        .custom-table th { background: #0D2440; color: white; padding: 1rem; text-align: left; border: 1px solid #0D2440; }\n        .custom-table td { padding: 1rem; border: 1px solid #E3EAFF; color: rgba(13, 36, 64, 0.8); }\n        .custom-table tr:nth-child(even) { background: #F8FAFC; }\n\n        /* --- LAYOUT --- */\n        .section-spacer { margin-bottom: 3rem; }\n        .grid-2 { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.5rem; }\n        \n        @media (max-width: 768px) {\n            h1 { font-size: 1.8rem; }\n            h2 { font-size: 1.5rem; }\n            .grid-2 { grid-template-columns: 1fr; }\n            .custom-card { padding: 1.5rem; }\n        }\n    </style>\n</head>\n<body>\n\n    <div class=\"container section-spacer\" style=\"margin-top: 3rem;\">\n        \n        <!-- Breadcrumb / Nav (Simulated) -->\n        <div style=\"margin-bottom: 2rem;\">\n            <a href=\"#\" class=\"custom-button secondary\" style=\"padding: 0.5rem 1rem; font-size: 0.9rem;\">&larr; Înapoi la Blog</a>\n        </div>\n\n        <!-- Header Articol -->\n        <header class=\"section-spacer\">\n            <span class=\"meta-tag\">Web Development 2025</span>\n            <h1 style=\"margin-top: 1rem;\">Custom Code vs. WordPress: Ce alegi pentru afacerea ta în 2025?</h1>\n            <p style=\"font-size: 1.1rem; max-width: 800px;\">Dilema eternă a internetului: aleg un template rapid sau investesc într-o soluție personalizată? Răspunsul depinde de un singur lucru: <strong>performanța dorită</strong>.</p>\n            \n            <div style=\"display: flex; align-items: center; gap: 1rem; margin-top: 1.5rem;\">\n                <div style=\"width: 40px; height: 40px; background: #2E5E99; border-radius: 50%;\"></div>\n                <div>\n                    <strong style=\"display: block; color: #0D2440;\">Echipa AdsNow</strong>\n                    <span style=\"color: rgba(13,36,64,0.6); font-size: 0.9rem;\">16 Decembrie 2025 • 9 min citire</span>\n                </div>\n            </div>\n        </header>\n\n        <!-- Main Content -->\n        <div class=\"custom-card\">\n            <h2>Mitul \"Site-ului Ieftin\"</h2>\n            <p>În 2025, un website nu mai este o simplă carte de vizită digitală. Este motorul tău de vânzări. Mulți antreprenori aleg WordPress pentru costul inițial redus, dar ignoră \"datoria tehnică\": plugin-uri care încetinesc site-ul, breșe de securitate și dependența de actualizări constante.</p>\n            <p>Pe de altă parte, <strong>Custom Code</strong> (HTML/CSS/JS sau framework-uri moderne) oferă control total, dar necesită o investiție inițială mai mare. Cum decizi?</p>\n        </div>\n\n        <div class=\"grid-2\">\n            <div class=\"custom-card\">\n                <h3>Opțiunea A: WordPress</h3>\n                <p>WordPress alimentează peste 40% din internet. Este regele conținutului, dar vine cu bagaje grele.</p>\n                <ul style=\"margin-top: 1rem;\">\n                    <li><strong>PRO:</strong> Ușor de administrat fără cunoștințe tehnice (CMS).</li>\n                    <li><strong>PRO:</strong> Lansare rapidă (există teme pentru orice).</li>\n                    <li><strong>CONTRA:</strong> <strong>\"Plugin Bloat\"</strong> - fiecare funcționalitate adăugată încetinește site-ul.</li>\n                    <li><strong>CONTRA:</strong> Vulnerabilitate ridicată la hackeri dacă nu este întreținut lunar.</li>\n                </ul>\n            </div>\n            <div class=\"custom-card\">\n                <h3>Opțiunea B: Custom Code</h3>\n                <p>Site-urile scrise \"de la zero\" (sau folosind tehnologii precum Next.js/Astro) sunt standardul pentru performanță în 2025.</p>\n                <ul style=\"margin-top: 1rem;\">\n                    <li><strong>PRO:</strong> <strong>Viteză Supremă</strong> (Scor 95-100 pe Google PageSpeed).</li>\n                    <li><strong>PRO:</strong> Securitate maximă (nu există bază de date expusă direct).</li>\n                    <li><strong>PRO:</strong> Design unic, fără limitările unui template.</li>\n                    <li><strong>CONTRA:</strong> Modificările structurale necesită un programator.</li>\n                </ul>\n            </div>\n        </div>\n\n        <div class=\"custom-card\">\n            <h2>Bătălia Performanței: Tabel Comparativ</h2>\n            <p>Google a introdus Core Web Vitals ca factor de ranking. Un site lent nu doar că enervează utilizatorii, dar dispare din căutări.</p>\n            \n            <table class=\"custom-table\">\n                <thead>\n                    <tr>\n                        <th>Criteriu</th>\n                        <th>WordPress (Template)</th>\n                        <th>Custom Code (Optimizat)</th>\n                    </tr>\n                </thead>\n                <tbody>\n                    <tr>\n                        <td><strong>Viteză (PageSpeed)</strong></td>\n                        <td>Medie (50-80 puncte)</td>\n                        <td><strong>Excelentă (95-100 puncte)</strong></td>\n                    </tr>\n                    <tr>\n                        <td><strong>Securitate</strong></td>\n                        <td>Risc Mediu/Mare (Plugin-uri vulnerabile)</td>\n                        <td><strong>Risc Minim (Cod static/curat)</strong></td>\n                    </tr>\n                    <tr>\n                        <td><strong>Cost Inițial</strong></td>\n                        <td><strong>Scăzut (€)</strong></td>\n                        <td>Mediu/Ridicat (€€)</td>\n                    </tr>\n                    <tr>\n                        <td><strong>Cost Mentenanță (2 ani)</strong></td>\n                        <td>Ridicat (Update-uri, Plugin-uri Premium)</td>\n                        <td><strong>Scăzut (Doar hosting)</strong></td>\n                    </tr>\n                    <tr>\n                        <td><strong>Scalabilitate</strong></td>\n                        <td>Dificilă (site-ul devine lent)</td>\n                        <td>Nelimitată</td>\n                    </tr>\n                </tbody>\n            </table>\n        </div>\n\n        <div class=\"highlight-box\">\n            <h3>Când să alegi WordPress?</h3>\n            <p>Alege WordPress dacă ai nevoie de un <strong>Blog</strong> activ, un site de știri sau dacă bugetul de început este extrem de limitat (sub 1000€) și ești dispus să accepți compromisuri de viteză.</p>\n        </div>\n        \n        <div class=\"highlight-box\" style=\"border-left-color: #00C853; background-color: #E8F5E9;\">\n            <h3 style=\"color: #1B5E20;\">Când să alegi Custom Code?</h3>\n            <p style=\"color: #1B5E20;\">Alege Custom Code dacă ai nevoie de un <strong>Landing Page</strong> pentru reclame (unde fiecare secundă de încărcare = bani pierduți), un site de prezentare corporate premium sau o aplicație web complexă (SaaS).</p>\n        </div>\n\n        <div class=\"custom-card\">\n            <h3>Verdictul pentru 2025: Viteza câștigă</h3>\n            <p>În era TikTok și a atenției de 3 secunde, nimeni nu mai așteaptă să se încarce un \"slider\" greoi de WordPress. Dacă obiectivul tău este conversia (vânzarea), codul curat și optimizat este investiția care se amortizează cel mai rapid prin costuri mai mici la reclame (Google Ads favorizează site-urile rapide).</p>\n        </div>\n\n        <div style=\"text-align: center; margin-top: 3rem;\">\n            <h3 style=\"margin-bottom: 1.5rem;\">Nu știi ce tehnologie se potrivește proiectului tău?</h3>\n            <a href=\"#\" class=\"custom-button\">Solicită o Analiză Tehnică Gratuită</a>\n        </div>\n\n    </div>\n\n</body>\n</html>",
    "image": "/assets/images/dummy-img-600x400.jpg",
    "date": "2025-12-18",
    "category": "Social Media",
    "author": "Algo Digital Solutions",
    "tags": [],
    "seo": {
      "metaTitle": "Custom Code vs WordPress 2025 - AdsNow Design",
      "metaDescription": "În 2025, un website nu mai este o simplă carte de vizită digitală. Este motorul tău de vânzări. Mulți antreprenori aleg WordPress pentru costul inițial redus, d",
      "keywords": ""
    },
    "published": true,
    "featured": true,
    "id": 4
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
