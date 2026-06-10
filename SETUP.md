# Parate Kennis Trainer - SETUP GUIDE

## 🚀 Installatiegids

### Stap 1: Node.js Installeren
Download en installeer Node.js van https://nodejs.org (versie 18 of hoger)

### Stap 2: Project Klonen
```bash
git clone https://github.com/tijldebreuck44/Parate_Kennis-trainer.git
cd Parate_Kennis-trainer
```

### Stap 3: Dependencies Installeren
```bash
npm install
```

### Stap 4: Development Server Starten
```bash
npm run dev
```

De applicatie opent automatisch op `http://localhost:5173`

## 🌐 Deployment

### Vercel (Aanbevolen - Gratis)

1. Ga naar https://vercel.com
2. Log in met GitHub account
3. Klik "New Project"
4. Selecteer `Parate_Kennis-trainer` repository
5. Klik "Deploy"

De applicatie is nu live! Vercel bouwt en deploy automatisch bij elke push.

### Netlify (Alternatief - Gratis)

1. Ga naar https://netlify.com
2. Log in met GitHub
3. Klik "New site from Git"
4. Selecteer je repository
5. Build command: `npm run build`
6. Publish directory: `dist`
7. Klik "Deploy"

### GitHub Pages (Gratis, Basis)

1. Bewerk `vite.config.ts` en voeg toe:
```typescript
export default defineConfig({
  base: '/Parate_Kennis-trainer/',
  // ... rest config
})
```

2. Update `package.json`:
```json
{
  "homepage": "https://tijldebreuck44.github.io/Parate_Kennis-trainer"
}
```

3. Deploy:
```bash
npm run build
npm run deploy
```

## 📝 Development

### Build voor Productie
```bash
npm run build
```

Dit genereert een `dist` map met geoptimaliseerde bestanden.

### Type Checking
```bash
npm run type-check
```

### Linting
```bash
npm run lint
```

## 📚 Data Aanpassen

### Belgische Data
Edit `public/data/belgie.json`:
- Provincies
- Gewesten  
- Rivieren
- Havens
- Autosnelwegen

### Europese Data
Edit `public/data/europa.json`:
- 41 landen
- Rivieren
- Gebergten
- Zeeën

### Werelddata
Edit `public/data/wereld.json`:
- Continenten
- Oceanen
- Rivieren
- Gebergten

### Prestatieën
Edit `public/data/prestaties.json` voor badges en achievements.

## 🔗 Useful Links

- **React Docs**: https://react.dev
- **Tailwind CSS**: https://tailwindcss.com
- **TypeScript**: https://www.typescriptlang.org
- **Framer Motion**: https://www.framer.com/motion
- **Zustand**: https://github.com/pmndrs/zustand

## ❓ Troubleshooting

### Port 5173 is al in gebruik
```bash
npm run dev -- --port 5174
```

### Modules niet gevonden
```bash
rm -rf node_modules package-lock.json
npm install
```

### Build mislukt
```bash
npm run type-check
npm run lint
```

## 📱 PWA Features

De app ondersteunt:
- ✅ Offline modus
- ✅ Installeerbaar op telefoon
- ✅ Background sync
- ✅ Push notificaties (toekomstig)

## 🎯 Best Practices

1. **Commit regelmatig** - `git commit -m "Add feature"`
2. **Test lokaal** - `npm run dev` voor testen
3. **Build checken** - `npm run build` voor productie
4. **TypeScript** - Zorg voor type safety

## 🆘 Hulp Nodig?

- Check de README.md
- Kijk GitHub Issues
- Contact: tijl.debreuck@sintjozefhumaniora.be

---

Veel succes met je project! 🌍📚
