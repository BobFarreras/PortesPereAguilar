# Context per a Claude / OpenCode

## Referències Ràpides
- **Agent:** PortaNext-Architect (veure `AGENTS.md`)
- **Arquitectura:** Next.js 16 App Router, TypeScript estricte, Tailwind v4, Framer Motion v12.
- **i18n:** `next-intl` v4 amb locales a `/locales` (ca, es, en, fr). `localePrefix: 'always'`.
- **Tema:** `next-themes` amb `ThemeProvider` (defaultTheme="light").
- **Testing:** Jest 30 + RTL. Cal fer mock de `next-intl`, `next-themes`, `Audio` i Framer Motion als tests.
- **Components:** RSC per defecte. Només `'use client'` per estat/efectes/animacions.
- **Validació:** Zod per formularis (client + server) i API routes.
- **Convencions:**
  - Path alias `@/*` mapeja a l'arrel del projecte.
  - Colors corporatius: `brand-red` (#E34133), `brand-dark` (#121218), `brand-grey`.
  - No usar `any`. `strict: true` a `tsconfig.json`.
  - Utilitzar `LocaleLink` en lloc de `next/link` per afegir prefix de locale automàtic.
  - Sense `backdrop-blur` a les targetes de la pàgina principal.
  - Dark mode: `#121218` (no negre pur).

## Verificació Obligatòria
```bash
pnpm check  # test + lint + typecheck + build
```

## Fitxers Clau
- `app/[locale]/layout.tsx` — Layout amb NextIntlClientProvider + setRequestLocale.
- `app/[locale]/page.tsx` — Pàgina d'inici (HeroSection + SolutionsGrid + TrustSection).
- `app/[locale]/pressupost/page.tsx` — Assistent de pressupost (lead capture).
- `components/marketing/HeroSection.tsx` — Hero amb video + àudio ambiental + text auto-hide.
- `components/marketing/QuoteWizard.tsx` — Wizard multi-step amb floating buttons.
- `lib/constants.ts` — SERVICES_DATA (6 serveis).
- `lib/constants/quoteOptions.ts` — Opcions del configurador (productes, tipus, colors, dimensions).
- `components/ui/LocaleLink.tsx` — Link amb prefix de locale automàtic.
- `components/ui/MagicButton.tsx` — CTA principal (variant primary vermell).
- `proxy.ts` — Middleware Next.js (next-intl/middleware).

## Estructura de Components
```text
components/
├── ui/                    # LocaleLink, MagicButton, LanguageSwitcher, ThemeToggle, ImageCarousel
├── layout/                # Navbar, Footer
├── doors/                 # DoorCard
├── marketing/             # HeroSection, SolutionsGrid, TrustSection, CatalogView, ProductDetailView, ContactForm, QuoteWizard
│   └── quote/             # StepProduct, StepType, StepStructure, StepAutomation, StepDimensions, StepColors, StepAccessories, StepContact
└── providers/             # theme-provider, layout-group-wrapper
```

## Configurador de Pressupost (/pressupost)
- **Lead capture**, NO calculador de preus. Mai mostrar preus.
- Resposta genèrica: "ens posarem en contacte amb vostè".
- Flux per categoria:
  - **Portes** → tipus de porta → dimensions → colors → accessoris → contacte
  - **Estructures** → tipus d'estructura → dimensions → colors → accessoris → contacte
  - **Automatismes** → quina porta automatitzar → dimensions → colors → accessoris → contacte
- Dimensions en **mm** (step 1mm, rang 500-12000 x 500-5000).
- SVG del diagrama dibuixa el tipus de porta seleccionada.
- Botons flotants fixats a baix amb `backdrop-blur-md`.

## Hero Section
- **Video:** `hero-youtube.mp4` (720p, ~8MB, CRF 28).
- **Àudio:** MP3 auto-play, pausa/resum amb IntersectionObserver, mute toggle.
- **Text:** Apareix després de 3s al primer load, 11s visible. Scroll-back instantani.
- **Disseny:** Sense `backdrop-blur`, text amb `text-shadow` per llegibilitat.

## i18n (next-intl v4)
- `localePrefix: 'always'` — Tots els locales porten prefix (/ca, /es, /en, /fr).
- `LocaleLink` per tots els enllaços interns.
- `setRequestLocale(locale)` obligatori a layout i pàgines.
- Veure `I18N.md` per setup complet i checklist.

## API Routes
- `/api/contact` — Formulari de contacte (Zod + honeypot anti-bot).
- `/api/quote` — Formulari de pressupost (Zod + honeypot anti-bot).
- Camp `website` com honeypot: si té valor, la request és un bot.

## Estat Actual (03/06/2026)
- ✅ i18n configurat i funcionant (next-intl v4, 4 locales).
- ✅ 35 tests passant (12 suites).
- ✅ ESLint: 0 errors.
- ✅ TypeScript: OK.
- ✅ Build: 45 pàgines generades.
- ✅ Hero amb video + àudio auto-play.
- ✅ Configurador de pressupost complet (8 steps).
- ✅ Formulari de contacte amb Zod.
- ✅ Dark mode (defaultTheme="light").
- ✅ LocaleLink per enllaços interns.
- ⏳ SEO pendent (sitemap, robots.txt, OpenGraph).
- ⏳ Integració email pendent (Resend/SendGrid).
- ⏳ E2E tests pendent (Playwright).
