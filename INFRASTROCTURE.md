# Infraestructura, Desplegament i Operacions (DevOps)

## Entorn de Desplegament
* **Proveïdor Principal:** Vercel.
* **Entorns:**
  * `Development`: Màquines locals dels desenvolupadors.
  * `Preview`: Desplegaments automàtics per cada Pull Request (Vercel Preview Deployments).
  * `Production`: Branca `main`, desplegada automàticament a Vercel vinculada al domini `portespereaguilar.com`.

## Monitorització i Observabilitat
1. **Sentry:** Integrat a nivell de client i de servidor per a la traçabilitat d'errors. *(Pendent d'implementar)*
   * Captura automàtica d'excepcions i alertes enviades als desenvolupadors.
2. **Vercel Analytics & Speed Insights:** Recopilació de mètriques de Core Web Vitals (LCP, FID, CLS).
   * Anàlisi de trànsit i retenció d'usuaris per iterar sobre l'UX.

## Integració Contínua / Desplegament Continu (CI/CD)
* **GitHub Actions:** *(Pendent de configurar)*
  * S'executarà un workflow en cada PR que validarà:
    1. Compilació de TypeScript (`tsc --noEmit`).
    2. Linter (`eslint`).
    3. Tests Unitaris (`jest`).
  * El codi no es pot fusionar a `main` si els tests fallen (TDD obligatori).

## Comandes de Verificació
```bash
pnpm check      # test + lint + typecheck + build (comanda principal)
pnpm test       # només tests
pnpm lint       # només ESLint
pnpm typecheck  # només TypeScript
pnpm build      # només build de producció
```

## Gestió de Media
### Video (Hero Section)
- **Fitxer:** `public/video/hero-youtube.mp4`
- **Mida:** ~8MB (optimitzat des de 38MB)
- **Resolució:** 720p (1280x720)
- **Codec:** H.264, CRF 28
- **Bitrate:** ~756kbps
- **Durada:** 89s
- **Comanda FFmpeg:**
  ```bash
  ffmpeg -i input.mp4 -vf "scale=1280:-2" -c:v libx264 -crf 28 -preset medium -an -movflags +faststart output.mp4
  ```

### Àudio (Hero Section)
- **Fitxer:** `public/audio/litesaturation-motivational-corporate-medium1-110677.mp3`
- **Mida:** ~1.7MB
- **Ús:** Àudio ambiental auto-play al hero, pausa/resum amb IntersectionObserver
- **IMPORTANT:** El proxy.ts exclou fitxers `.mp3/.wav/.ogg` del matcher d'i18n

### Imatges del Catàleg
- **Ubicació:** `public/images/` (subcarpetes per tipus: Seccionals, Basculants, Correderes, etc.)
- **Format:** WebP (optimitzat per Vercel)
- **Configuració:** `images.unoptimized: true` a `next.config.ts`

## Gestió de Dependencies
- **Gestor:** pnpm (fitxer `pnpm-lock.yaml`)
- **Versions crítiques:**
  - Next.js 16.2.7 (App Router)
  - React 19.2.4
  - next-intl v4
  - Framer Motion v12
  - Jest 30
  - Tailwind CSS v4
- **Restriccions:**
  - NO afegir versions inexistents o majors no compatibles
  - Verificar compatibilitat abans d'actualitzar

## Estat Actual de l'Entorn
- [x] Next.js 16 + React 19 configurats.
- [x] Tailwind CSS v4 + PostCSS configurats.
- [x] Jest + React Testing Library configurats (35 tests, 12 suites).
- [x] ESLint configurat (0 errors, warnings només).
- [x] Husky (Git hooks) configurat.
- [x] proxy.ts configurat (next-intl middleware).
- [x] next-intl v4 configurat (i18n/routing.ts + i18n/request.ts).
- [x] ThemeProvider configurat (next-themes, defaultTheme="light").
- [x] API routes configurades (/api/contact, /api/quote).
- [ ] Sentry no integrat.
- [ ] GitHub Actions no configurat.
- [ ] Integració email pendent (Resend/SendGrid).
