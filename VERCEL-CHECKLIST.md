# ✅ Checklist Verificare Vercel

## 🔍 Ce să verifici în Vercel Dashboard

### 1. **Deployment Status**
- [ ] Mergi în **Vercel Dashboard** > **Deployments**
- [ ] Verifică că ultimul deployment este **Successful** (nu Failed sau Error)
- [ ] Dacă există erori, verifică **Build Logs** și **Function Logs**

### 2. **Functions (Serverless Functions)**
- [ ] Mergi în **Deployments** > Click pe ultimul deployment > **Functions** tab
- [ ] Verifică că există funcțiile:
  - ✅ `/api/github-commit`
  - ✅ `/api/test-github`
  - ✅ `/api/test`
  - ✅ `/api/google-indexing`
- [ ] Verifică că fiecare funcție are **Runtime: nodejs20.x**
- [ ] Verifică că fiecare funcție are **Max Duration: 30s**

### 3. **Function Logs**
- [ ] Mergi în **Deployments** > Click pe ultimul deployment > **Functions** > Click pe `/api/github-commit`
- [ ] Verifică **Logs** pentru erori
- [ ] Testează funcția:
  ```bash
  curl -X POST https://your-domain.vercel.app/api/test
  ```
  Ar trebui să returneze: `{"success": true, "message": "API is working!"}`

### 4. **Environment Variables**
- [ ] Mergi în **Settings** > **Environment Variables**
- [ ] Verifică că există (dacă sunt necesare):
  - `GOOGLE_CLIENT_EMAIL` (pentru Google Indexing)
  - `GOOGLE_PRIVATE_KEY` (pentru Google Indexing)
  - `SITE_URL` (opțional, default: https://adsnow.vercel.app)

### 5. **Build Configuration**
- [ ] Mergi în **Settings** > **General**
- [ ] Verifică că:
  - **Build Command**: `npm run build`
  - **Output Directory**: `dist`
  - **Install Command**: `npm install` (sau lasă gol pentru default)

### 6. **Routing**
- [ ] Verifică că `vercel.json` este commit-at în repository
- [ ] Verifică că routing-ul este corect:
  - `/api/*` → Serverless Functions
  - `/*` → React App (index.html)

## 🧪 Testare Funcții API

### Test 1: API Test Endpoint
```bash
curl https://your-domain.vercel.app/api/test
```
**Expected**: `{"success": true, "message": "API is working!"}`

### Test 2: GitHub Test Endpoint
```bash
curl -X POST https://your-domain.vercel.app/api/test-github \
  -H "Content-Type: application/json" \
  -d '{"githubToken": "ghp_YOUR_TOKEN"}'
```
**Expected**: `{"success": true, "tests": {...}}`

### Test 3: GitHub Commit Endpoint (din browser console)
```javascript
fetch('/api/github-commit', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    githubToken: 'ghp_YOUR_TOKEN',
    posts: [],
    sitemapXml: '<?xml version="1.0"?><urlset>...</urlset>'
  })
}).then(r => r.json()).then(console.log)
```

## 🐛 Probleme Comune și Soluții

### Problema 1: "Function not found" sau 404
**Cauză**: Funcțiile nu sunt deployate corect
**Soluție**: 
- Verifică că folderul `api/` este în root-ul proiectului
- Verifică că `vercel.json` are configurarea corectă pentru functions
- Re-deploy proiectul

### Problema 2: "Module not found" sau "Cannot find module"
**Cauză**: Dependențele nu sunt instalate sau runtime-ul este greșit
**Soluție**:
- Verifică că `package.json` are toate dependențele
- Verifică că runtime-ul este setat corect în `vercel.json` (nodejs20.x)
- Re-deploy proiectul

### Problema 3: "Timeout" sau "Function execution timeout"
**Cauză**: Funcția durează prea mult (>30s)
**Soluție**:
- Verifică că timeout-urile în cod sunt mai mici de 30s
- Optimizează codul pentru a fi mai rapid
- Verifică că `maxDuration: 30` este setat în `vercel.json`

### Problema 4: "CORS error"
**Cauză**: Headers CORS lipsesc sau sunt greșite
**Soluție**:
- Verifică că funcțiile returnează headers CORS corecte
- Verifică că `Access-Control-Allow-Origin: *` este setat

### Problema 5: "Internal Server Error"
**Cauză**: Eroare în cod sau în runtime
**Soluție**:
- Verifică **Function Logs** în Vercel Dashboard
- Verifică console.log-urile pentru detalii
- Testează funcția local cu `vercel dev`

## 📝 Pași pentru Debug

1. **Verifică Logs în Vercel**:
   - Mergi în **Deployments** > Click pe deployment > **Functions** > Click pe funcție > **Logs**

2. **Testează Local**:
   ```bash
   npm install -g vercel
   vercel dev
   ```
   Apoi testează: `http://localhost:3000/api/test`

3. **Verifică Request/Response**:
   - Deschide **Browser DevTools** > **Network** tab
   - Încearcă să publici un articol
   - Verifică request-ul către `/api/github-commit`
   - Verifică response-ul (status, body, headers)

4. **Verifică GitHub API Direct**:
   - Testează token-ul direct cu GitHub API:
   ```bash
   curl -H "Authorization: token ghp_YOUR_TOKEN" \
        https://api.github.com/user
   ```

## ✅ Verificare Finală

După ce ai verificat toate cele de mai sus, testează publicarea unui articol:

1. Intră în Admin Panel
2. Creează un articol nou
3. Adaugă token-ul GitHub
4. Marchează ca "Publicat"
5. Salvează
6. Verifică:
   - ✅ Mesajul de succes în UI
   - ✅ Commit-urile în GitHub
   - ✅ Fișierele actualizate (`blogPosts.js` și `sitemap.xml`)
   - ✅ Logs-urile în Vercel (fără erori)

## 🔗 Link-uri Utile

- **Vercel Dashboard**: https://vercel.com/dashboard
- **Vercel Functions Docs**: https://vercel.com/docs/functions
- **Vercel Logs**: https://vercel.com/docs/monitoring/logs

