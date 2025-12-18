# ❌ Problemă: API Endpoints returnează 404

## 🔍 Diagnostic

Am testat endpoint-ul `/api/test` și returnează:
```
404 - NOT_FOUND
```

**Concluzie**: Funcțiile API nu sunt deployate corect pe Vercel.

---

## ✅ Soluții

### Soluția 1: Verifică în Vercel Dashboard (RECOMANDAT)

1. **Mergi în Vercel Dashboard**:
   - https://vercel.com/dashboard
   - Login cu contul tău
   - Click pe proiectul **adsnow2025**

2. **Verifică ultimul deployment**:
   - Mergi la tab-ul **Deployments**
   - Click pe ultimul deployment
   - Verifică status-ul:
     - ✅ **Ready** = OK
     - ❌ **Error** = Trebuie să vezi erorile
     - ⏳ **Building** = Așteaptă să se termine

3. **Verifică Functions**:
   - Click pe tab-ul **Functions**
   - Verifică dacă există:
     - `/api/test`
     - `/api/github-commit`
     - `/api/test-github`
     - `/api/google-indexing`

4. **Dacă funcțiile NU există**:
   - Verifică **Build Logs** pentru erori
   - Verifică că folderul `api/` este în root-ul proiectului
   - Verifică că `vercel.json` este commit-at

---

### Soluția 2: Redeploy Proiectul

1. **Trigger manual deployment**:
   - În Vercel Dashboard > Proiect > **Deployments**
   - Click pe **"..."** (three dots) > **Redeploy**
   - Sau fă un commit nou pe GitHub (Vercel va detecta automat)

2. **Sau fă un commit gol**:
   ```bash
   git commit --allow-empty -m "Trigger Vercel redeploy"
   git push
   ```

---

### Soluția 3: Verifică Structura Proiectului

Asigură-te că structura este corectă:

```
adsnow2025/
├── api/                    ← Folderul API trebuie să fie aici
│   ├── test.js
│   ├── github-commit.js
│   ├── test-github.js
│   └── google-indexing.js
├── vercel.json            ← Configurarea trebuie să fie aici
├── package.json
└── ...
```

---

### Soluția 4: Verifică vercel.json

Asigură-te că `vercel.json` conține:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "functions": {
    "api/**/*.js": {
      "runtime": "nodejs20.x",
      "maxDuration": 30
    }
  },
  "rewrites": [
    {
      "source": "/((?!api).*)",
      "destination": "/index.html"
    }
  ]
}
```

**Important**: `rewrites` trebuie să excludă `/api/*` pentru ca funcțiile să funcționeze!

---

### Soluția 5: Testare Local

Testează local pentru a verifica că funcțiile funcționează:

```bash
# Instalează Vercel CLI (dacă nu este instalat)
npm install -g vercel

# Rulează local
cd /Users/alexandrucojanu/Desktop/adsnow2025
vercel dev
```

Apoi testează:
```bash
curl http://localhost:3000/api/test
```

Dacă funcționează local dar nu pe production, problema este în configurarea Vercel.

---

## 🔍 Debug Pas cu Pas

### Pasul 1: Verifică că fișierele sunt commit-ate
```bash
git ls-files | grep api/
```

Ar trebui să vezi:
```
api/github-commit.js
api/google-indexing.js
api/test-github.js
api/test.js
```

### Pasul 2: Verifică că vercel.json este commit-at
```bash
git ls-files | grep vercel.json
```

Ar trebui să vezi:
```
vercel.json
```

### Pasul 3: Verifică ultimul commit
```bash
git log --oneline -1
```

Verifică că ultimul commit include modificările pentru API.

---

## 📝 Checklist Verificare

- [ ] Folderul `api/` există în root-ul proiectului
- [ ] Toate fișierele din `api/` sunt commit-ate
- [ ] `vercel.json` există și este commit-at
- [ ] `vercel.json` conține configurarea pentru `functions`
- [ ] `vercel.json` exclude `/api/*` din rewrites
- [ ] Ultimul deployment în Vercel este **Ready** (nu Error)
- [ ] Funcțiile apar în tab-ul **Functions** din Vercel Dashboard
- [ ] Nu există erori în **Build Logs**

---

## 🚀 Pași Următori

1. **Verifică Vercel Dashboard** (Soluția 1)
2. **Dacă funcțiile nu există**: Redeploy proiectul (Soluția 2)
3. **Dacă încă nu funcționează**: Verifică structura și configurația (Soluția 3-4)
4. **Testează local** pentru a izola problema (Soluția 5)

---

## 💡 Notă Importantă

Dacă ai făcut modificări recente la `vercel.json` sau la funcțiile API, asigură-te că:
1. Ai făcut commit și push pe GitHub
2. Vercel a detectat commit-ul și a făcut redeploy
3. Deployment-ul s-a terminat cu succes

**Timp de așteptare**: De obicei 1-3 minute pentru un redeploy.

