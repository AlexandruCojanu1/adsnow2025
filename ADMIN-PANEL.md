# Admin Panel - Gestionare Articole Blog

Acest ghid te ajută să folosești panoul de administrare pentru gestionarea articolelor blog.

## 🚀 Accesare Admin Panel

### URL
```
https://adsnow.ro/admin
```

### Autentificare
- **Parolă implicită**: `admin2025`
- Parola poate fi configurată prin variabila de mediu `REACT_APP_ADMIN_PASSWORD`

## 📋 Funcționalități

### 1. Lista Articolelor
- Vizualizează toate articolele
- Caută articole după titlu, excerpt sau categorie
- Filtrează după status (Toate, Publicate, Draft)
- Vezi statistici (Total, Publicate, Draft)

### 2. Creare Articol Nou
- Click pe butonul **"Articol Nou"**
- Completează formularul:
  - **Titlu** - Se generează automat slug-ul
  - **Slug** - URL-friendly (doar litere mici, cifre, cratime)
  - **Dată** - Data publicării
  - **Categorie** - Selectează din listă
  - **Excerpt** - Descriere scurtă pentru preview
  - **Conținut** - HTML content
  - **Imagine** - Path către imagine
  - **Autor** - Numele autorului
  - **Tags** - Separate prin virgulă
  - **SEO Settings** - Meta title, description, keywords
  - **Published** - Checkbox pentru publicare
  - **Featured** - Checkbox pentru articol featured

### 3. Editare Articol
- Click pe butonul **"Editează"** din lista de articole
- Modifică câmpurile necesare
- Click **"Salvează Articol"**

### 4. Ștergere Articol
- Click pe butonul **"Șterge"** din lista de articole
- Confirmă ștergerea

### 5. Vizualizare Articol
- Click pe butonul **"Vezi"** pentru a deschide articolul într-un tab nou

## 🔐 Securitate

### Configurare Parolă

#### Variabilă de Mediu
Creează un fișier `.env` sau configurează în Vercel:

```env
REACT_APP_ADMIN_PASSWORD=your-secure-password-here
REACT_APP_ADMIN_TOKEN=your-secure-token-here
```

#### Vercel Dashboard
1. Mergi la Settings > Environment Variables
2. Adaugă:
   - `REACT_APP_ADMIN_PASSWORD` = parola ta
   - `REACT_APP_ADMIN_TOKEN` = token-ul pentru autentificare

### Recomandări Securitate
- ⚠️ **Schimbă parola implicită** în producție
- ⚠️ **Folosește HTTPS** pentru admin panel
- ⚠️ **Limitează accesul** prin IP (opțional, în Vercel)
- ⚠️ **Consideră autentificare cu backend** pentru producție

## 💾 Stocare Date

### LocalStorage
Articolele sunt salvate în `localStorage` cu cheia `blog_posts`.

### Backup
Pentru backup, poți exporta datele din localStorage:
```javascript
localStorage.getItem('blog_posts')
```

### Restore
Pentru restore:
```javascript
localStorage.setItem('blog_posts', JSON.stringify(postsArray))
```

## 🔄 Sincronizare cu Blog

Articolele create/editate în admin panel sunt:
1. Salvate în `localStorage`
2. Disponibile imediat în blog
3. Funcțiile `getPublishedPosts()`, `getPostBySlug()` etc. folosesc automat datele din localStorage

## 📝 Format Conținut HTML

Poți folosi următoarele tag-uri HTML în conținut:

```html
<p>Paragraf</p>
<h2>Subtitlu H2</h2>
<h3>Subtitlu H3</h3>
<ul>
  <li>List item</li>
</ul>
<ol>
  <li>List item</li>
</ol>
<strong>Text bold</strong>
<em>Text italic</em>
<a href="url">Link</a>
```

## 🎨 Slug-uri SEO-Friendly

Reguli pentru slug-uri:
- Doar litere mici
- Cifre permise
- Cratime pentru spații
- Fără caractere speciale
- Exemple:
  - ✅ `mastering-instagram-ads`
  - ✅ `growth-strategies-2025`
  - ❌ `Mastering Instagram Ads!`
  - ❌ `growth_strategies`

## 🚨 Troubleshooting

### Nu pot să mă loghez
- Verifică că parola este corectă
- Verifică variabilele de mediu în Vercel
- Șterge cache-ul browser-ului

### Articolele nu apar în blog
- Verifică că articolul este marcat ca **"Publicat"**
- Verifică că slug-ul este corect formatat
- Verifică console pentru erori

### Datele se pierd
- Articolele sunt salvate în localStorage
- Dacă ștergi cache-ul browser-ului, datele se pierd
- **Recomandare**: Fă backup regulat sau migrează la backend

## 🔮 Îmbunătățiri Viitoare

Pentru producție, consideră:
1. **Backend API** pentru stocare persistentă
2. **Autentificare reală** (JWT, OAuth)
3. **Editor rich text** (TinyMCE, CKEditor)
4. **Upload imagini** direct în admin
5. **Versioning** pentru articole
6. **Draft preview** înainte de publicare
7. **Analytics** pentru articole

## 📞 Suport

Pentru probleme sau întrebări:
- Verifică console pentru erori
- Verifică Network tab pentru request-uri
- Contact: algodigitalsolutions@gmail.com
