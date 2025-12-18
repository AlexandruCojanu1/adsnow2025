# 🧪 Ghid Testare API Endpoints

## 🌐 URL-ul Site-ului
**Site Live**: `https://adsnow.vercel.app`

---

## ✅ Metoda 1: Testare în Browser (Cea mai simplă)

### Pasul 1: Deschide Browser-ul
1. Deschide Chrome, Firefox sau Safari
2. Mergi la: `https://adsnow.vercel.app/api/test`

### Pasul 2: Verifică Răspunsul
**Răspuns așteptat**:
```json
{
  "success": true,
  "message": "API is working!",
  "timestamp": "2025-12-18T...",
  "method": "GET",
  "url": "/api/test"
}
```

**Dacă vezi acest răspuns** → ✅ Funcțiile API sunt deployate corect!

**Dacă vezi 404 sau eroare** → ❌ Funcțiile nu sunt deployate sau există o problemă

---

## ✅ Metoda 2: Testare cu curl (Terminal)

### Pasul 1: Deschide Terminal
- **Mac/Linux**: Terminal
- **Windows**: PowerShell sau Git Bash

### Pasul 2: Rulează Comanda
```bash
curl https://adsnow.vercel.app/api/test
```

### Pasul 3: Verifică Răspunsul
Ar trebui să vezi:
```json
{"success":true,"message":"API is working!","timestamp":"...","method":"GET","url":"/api/test"}
```

**Dacă vezi acest răspuns** → ✅ Funcțiile API funcționează!

**Dacă vezi eroare** → ❌ Verifică eroarea specifică

---

## ✅ Metoda 3: Testare în Vercel Dashboard

### Pasul 1: Accesează Vercel Dashboard
1. Mergi la: https://vercel.com/dashboard
2. Login cu contul tău

### Pasul 2: Verifică Deployments
1. Click pe proiectul **adsnow2025**
2. Mergi la tab-ul **Deployments**
3. Click pe ultimul deployment (cel mai recent)

### Pasul 3: Verifică Functions
1. Click pe tab-ul **Functions**
2. Verifică că există:
   - ✅ `/api/test`
   - ✅ `/api/github-commit`
   - ✅ `/api/test-github`
   - ✅ `/api/google-indexing`

### Pasul 4: Verifică Logs
1. Click pe `/api/test`
2. Click pe tab-ul **Logs**
3. Verifică că nu există erori

---

## ✅ Metoda 4: Testare cu Browser DevTools

### Pasul 1: Deschide Site-ul
1. Mergi la: `https://adsnow.vercel.app`
2. Deschide **DevTools** (F12 sau Cmd+Option+I)

### Pasul 2: Testează în Console
1. Mergi la tab-ul **Console**
2. Rulează:
```javascript
fetch('/api/test')
  .then(r => r.json())
  .then(data => console.log('✅ API Response:', data))
  .catch(err => console.error('❌ Error:', err));
```

### Pasul 3: Verifică Network Tab
1. Mergi la tab-ul **Network**
2. Rulează din nou comanda de mai sus
3. Click pe request-ul către `/api/test`
4. Verifică:
   - **Status**: 200 OK
   - **Response**: JSON cu success: true

---

## ✅ Metoda 5: Testare Local (Development)

### Pasul 1: Instalează Vercel CLI
```bash
npm install -g vercel
```

### Pasul 2: Rulează Local
```bash
cd /Users/alexandrucojanu/Desktop/adsnow2025
vercel dev
```

### Pasul 3: Testează Local
1. Deschide browser la: `http://localhost:3000/api/test`
2. Sau rulează:
```bash
curl http://localhost:3000/api/test
```

---

## 🧪 Teste Suplimentare

### Test 1: GitHub Test Endpoint
```bash
curl -X POST https://adsnow.vercel.app/api/test-github \
  -H "Content-Type: application/json" \
  -d '{"githubToken": "ghp_YOUR_TOKEN"}'
```

### Test 2: Verificare CORS
```bash
curl -X OPTIONS https://adsnow.vercel.app/api/github-commit \
  -H "Origin: https://adsnow.vercel.app" \
  -H "Access-Control-Request-Method: POST" \
  -v
```

### Test 3: Verificare Headers
```bash
curl -I https://adsnow.vercel.app/api/test
```

---

## ❌ Probleme Comune și Soluții

### Problema 1: 404 Not Found
**Cauză**: Funcțiile nu sunt deployate
**Soluție**: 
1. Verifică în Vercel Dashboard că deployment-ul este Successful
2. Verifică că folderul `api/` este în root-ul proiectului
3. Verifică că `vercel.json` este commit-at

### Problema 2: 500 Internal Server Error
**Cauză**: Eroare în codul funcției
**Soluție**:
1. Verifică **Function Logs** în Vercel Dashboard
2. Verifică erorile specifice
3. Corectează codul și redeploy

### Problema 3: CORS Error
**Cauză**: Headers CORS lipsesc
**Soluție**:
1. Verifică că funcțiile returnează headers CORS
2. Verifică că `Access-Control-Allow-Origin: *` este setat

### Problema 4: Timeout
**Cauză**: Funcția durează prea mult
**Soluție**:
1. Verifică că `maxDuration: 30` este setat în `vercel.json`
2. Optimizează codul pentru a fi mai rapid

---

## 📊 Checklist Complet

- [ ] Test `/api/test` în browser → ✅ Success
- [ ] Test `/api/test` cu curl → ✅ Success
- [ ] Verificat în Vercel Dashboard → ✅ Functions există
- [ ] Verificat Function Logs → ✅ Fără erori
- [ ] Test `/api/test-github` → ✅ Funcționează (cu token)
- [ ] Test CORS → ✅ Headers corecte

---

## 🎯 Rezultat Așteptat

După toate testele, ar trebui să ai:
- ✅ Toate endpoint-urile funcționează
- ✅ Fără erori în logs
- ✅ CORS configurat corect
- ✅ Timeout-uri configurate corect

---

## 🔗 Link-uri Utile

- **Site Live**: https://adsnow.vercel.app
- **API Test**: https://adsnow.vercel.app/api/test
- **Vercel Dashboard**: https://vercel.com/dashboard
- **Vercel Functions Docs**: https://vercel.com/docs/functions

