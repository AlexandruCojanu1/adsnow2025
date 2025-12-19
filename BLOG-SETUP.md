# Blog System Setup Guide

Acest ghid te ajută să configurezi și să folosești sistemul de blog cu automatizare Google Indexing.

## 📋 Structura Blog-ului

### Fișiere Principale

- **`src/Data/blogPosts.js`** - Baza de date a articolelor blog
- **`src/Components/Blog/BlogPostContent.jsx`** - Componenta pentru afișarea articolului complet
- **`src/Page/BlogPost/index.jsx`** - Pagina pentru articole individuale
- **`api/google-indexing.js`** - API endpoint pentru Google Indexing
- **`scripts/submit-to-google.js`** - Script pentru trimiterea articolelor către Google
- **`scripts/generate-sitemap.js`** - Script pentru generarea sitemap.xml

## 🚀 Configurare Inițială

### 1. Configurare Google Indexing API

Pentru a folosi Google Indexing API, ai nevoie de:

1. **Service Account** în Google Cloud Console
2. **Google Search Console** cu proprietatea site-ului verificată

#### Pași de configurare:

1. Mergi la [Google Cloud Console](https://console.cloud.google.com/)
2. Creează un proiect nou sau selectează unul existent
3. Activează **Indexing API** pentru proiectul tău
4. Creează un **Service Account**:
   - Mergi la "IAM & Admin" > "Service Accounts"
   - Click "Create Service Account"
   - Dă-i un nume (ex: "blog-indexing")
   - Click "Create and Continue"
   - Nu este nevoie de roluri, click "Continue"
   - Click "Done"
5. Generează cheia JSON:
   - Click pe service account-ul creat
   - Mergi la tab-ul "Keys"
   - Click "Add Key" > "Create new key"
   - Selectează "JSON"
   - Descarcă fișierul JSON
6. Verifică proprietatea în Google Search Console:
   - Mergi la [Google Search Console](https://search.google.com/search-console)
   - Adaugă proprietatea site-ului tău
   - Verifică proprietatea
7. Adaugă service account-ul ca proprietar:
   - În Search Console, mergi la "Settings" > "Users and permissions"
   - Adaugă email-ul service account-ului ca proprietar

### 2. Configurare Variabile de Mediu

Creează un fișier `.env` în root-ul proiectului:

```env
# Google Indexing API Credentials
GOOGLE_CLIENT_EMAIL=your-service-account@project-id.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"

# Site URL
SITE_URL=https://adsnow.ro

# API Endpoint (optional, defaults to SITE_URL/api/google-indexing)
API_ENDPOINT=https://adsnow.ro/api/google-indexing
```

**⚠️ Important:** 
- Nu comite fișierul `.env` în Git (este deja în `.gitignore`)
- Pentru Vercel, adaugă variabilele în dashboard-ul Vercel: Settings > Environment Variables

### 3. Configurare Vercel pentru API Routes

Pentru ca API routes să funcționeze pe Vercel, creează un fișier `vercel.json`:

```json
{
  "functions": {
    "api/**/*.js": {
      "runtime": "nodejs18.x"
    }
  }
}
```

## 📝 Adăugare Articole Noi

### Structura unui articol:

Editează `src/Data/blogPosts.js` și adaugă un nou articol:

```javascript
{
  id: 3, // ID unic
  slug: "titlu-articol-url-friendly", // URL-friendly slug
  title: "Titlul Articolului",
  excerpt: "Scurtă descriere pentru preview",
  content: `
    <p>Conținutul articolului în HTML...</p>
    <h2>Subtitlu</h2>
    <p>Mai mult conținut...</p>
  `,
  image: "/assets/images/imagine-articol.jpg",
  date: "2025-04-15", // Format: YYYY-MM-DD
  category: "Social Media",
  author: "Algo Digital Solutions",
  tags: ["tag1", "tag2", "tag3"],
  seo: {
    metaTitle: "Titlu SEO optimizat",
    metaDescription: "Descriere SEO pentru meta tag",
    keywords: "cuvinte, cheie, pentru, seo"
  },
  published: true, // Setează false pentru draft
  featured: true // Pentru articole featured
}
```

### Reguli pentru slug-uri:

- Folosește doar litere mici, cifre și cratime
- Fără spații sau caractere speciale
- Exemple: `"mastering-instagram-ads"`, `"growth-strategies-2025"`

## 🔄 Automatizare Google Indexing

### Trimite un articol specific:

```bash
npm run submit-post=article-slug
```

### Trimite toate articolele:

```bash
npm run submit-to-google
```

### Cu URL custom:

```bash
npm run submit-to-google -- --url=https://your-domain.com
```

## 🗺️ Generare Sitemap

Generează sitemap.xml pentru toate articolele:

```bash
npm run generate-sitemap
```

Sitemap-ul va fi generat în `public/sitemap.xml` și va include:
- Homepage
- Pagina de blog
- Toate articolele publicate

### Cu opțiuni custom:

```bash
node scripts/generate-sitemap.js --url=https://your-domain.com --output=public/sitemap.xml
```

## 🔧 Integrare în CI/CD

### GitHub Actions Example:

Creează `.github/workflows/submit-blog.yml`:

```yaml
name: Submit Blog Posts to Google

on:
  push:
    branches: [main]
    paths:
      - 'src/Data/blogPosts.js'

jobs:
  submit:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm install
      
      - name: Submit to Google
        env:
          GOOGLE_CLIENT_EMAIL: ${{ secrets.GOOGLE_CLIENT_EMAIL }}
          GOOGLE_PRIVATE_KEY: ${{ secrets.GOOGLE_PRIVATE_KEY }}
          SITE_URL: ${{ secrets.SITE_URL }}
        run: npm run submit-to-google
      
      - name: Generate Sitemap
        env:
          SITE_URL: ${{ secrets.SITE_URL }}
        run: npm run generate-sitemap
```

## 📊 SEO Best Practices

1. **Meta Tags**: Fiecare articol are meta tags SEO complet configurate
2. **Open Graph**: Tag-uri pentru sharing pe social media
3. **Structured Data**: Poți adăuga JSON-LD pentru articole (opțional)
4. **Sitemap**: Generat automat pentru toate articolele
5. **URL Structure**: Slug-uri SEO-friendly (`/blog/article-slug`)

## 🐛 Troubleshooting

### Eroare: "Google Indexing API credentials not configured"

- Verifică că variabilele de mediu sunt setate corect
- Pentru Vercel, verifică că variabilele sunt adăugate în dashboard

### Eroare: "URL does not belong to the configured site"

- Verifică că `SITE_URL` este setat corect
- Asigură-te că URL-ul articolului începe cu `SITE_URL`

### Eroare: "Failed to get access token"

- Verifică că `GOOGLE_PRIVATE_KEY` este setat corect (cu `\n` pentru newlines)
- Verifică că service account-ul are permisiuni pentru Indexing API

## 📚 Resurse Utile

- [Google Indexing API Documentation](https://developers.google.com/search/apis/indexing-api/v3/using-api)
- [Google Search Console](https://search.google.com/search-console)
- [Vercel Serverless Functions](https://vercel.com/docs/concepts/functions/serverless-functions)

## ✅ Checklist Setup

- [ ] Service Account creat în Google Cloud Console
- [ ] Indexing API activat
- [ ] Service Account adăugat ca proprietar în Search Console
- [ ] Variabile de mediu configurate (`.env` sau Vercel)
- [ ] Primul articol adăugat în `blogPosts.js`
- [ ] Sitemap generat (`npm run generate-sitemap`)
- [ ] Testat trimiterea către Google (`npm run submit-to-google`)
