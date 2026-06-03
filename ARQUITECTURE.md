# Arquitectura de Software (AppWeb Portes Pere Aguilar)

## Visió General
L'aplicació utilitza una arquitectura basada en components i separació de responsabilitats (SOLID) sobre el framework Next.js 16 amb App Router (`/app`).

## Estructura de Directoris (SDD - Software Design)
```text
/
├── app/                          # Rutes de Next.js (App Router)
│   ├── api/                      # Endpoints del backend (Serverless Functions)
│   │   ├── contact/route.ts      # Formulari de contacte (Zod + honeypot)
│   │   └── quote/route.ts        # Formulari de pressupost (Zod + honeypot)
│   ├── [locale]/                 # Rutes amb prefix d'idioma (ca/es/en/fr)
│   │   ├── cataleg/              # Catàleg de productes
│   │   │   ├── page.tsx          # Llistat de productes
│   │   │   └── [slug]/page.tsx   # Detall de producte (SSG dinàmic)
│   │   ├── contacte/page.tsx     # Pàgina de contacte
│   │   ├── pressupost/page.tsx   # Assistent de pressupost (lead capture)
│   │   ├── layout.tsx            # Layout amb NextIntlClientProvider
│   │   └── page.tsx              # Pàgina d'inici
│   ├── layout.tsx                # Root layout (Navbar + Footer + Providers)
│   └── globals.css               # Estils globals Tailwind v4
├── components/                   # Components React reutilitzables
│   ├── ui/                       # Components base (Atom/Molecules)
│   │   ├── LocaleLink.tsx        # Link amb prefix de locale automàtic
│   │   ├── MagicButton.tsx       # CTA principal (variant primary vermell)
│   │   ├── LanguageSwitcher.tsx  # Selector d'idioma amb SVG flags
│   │   ├── ThemeToggle.tsx       # Toggle dark/light mode
│   │   └── ImageCarousel.tsx     # Carrusel d'imatges amb animació spring
│   ├── layout/                   # Components d'estructura
│   │   ├── Navbar.tsx            # Navegació principal (usa LocaleLink)
│   │   └── Footer.tsx            # Peu de pàgina (usa LocaleLink)
│   ├── doors/                    # Components del domini
│   │   └── DoorCard.tsx          # Targeta de porta (usa LocaleLink)
│   ├── marketing/                # Seccions de màrqueting
│   │   ├── HeroSection.tsx       # Hero amb video + àudio ambiental
│   │   ├── SolutionsGrid.tsx     # Graella de serveis
│   │   ├── TrustSection.tsx      # Secció de confiança
│   │   ├── CatalogView.tsx       # Vista de catàleg
│   │   ├── ProductDetailView.tsx # Detall de producte
│   │   ├── ContactForm.tsx       # Formulari de contacte (Zod)
│   │   ├── QuoteWizard.tsx       # Assistent de pressupost (lead capture)
│   │   └── quote/               # Steps del configurador
│   │       ├── StepProduct.tsx   # Seleccionar categoria
│   │       ├── StepType.tsx      # Seleccionar tipus de porta
│   │       ├── StepStructure.tsx # Seleccionar tipus d'estructura
│   │       ├── StepAutomation.tsx # Quina porta automatitzar
│   │       ├── StepDimensions.tsx # Dimensions en mm + SVG
│   │       ├── StepColors.tsx    # Material + acabat + RAL
│   │       ├── StepAccessories.tsx # Accessoris
│   │       └── StepContact.tsx   # Dades de contacte
│   └── providers/                # Wrappers de Context
│       ├── theme-provider.tsx    # next-themes ThemeProvider
│       └── layout-group-wrapper.tsx # Framer Motion LayoutGroup
├── lib/                          # Utilitats, helpers i configuració
│   ├── constants.ts              # SERVICES_DATA (6 serveis)
│   ├── constants/
│   │   └── quoteOptions.ts       # Opcions del configurador (productes, tipus, colors...)
│   └── validations/
│       ├── contact.ts            # Zod schema per contacte
│       └── quote.ts              # Zod schema per pressupost
├── types/                        # Definicions TypeScript globals
├── locales/                      # Fitxers de traducció JSON (ca, es, en, fr)
├── i18n/                         # Configuració next-intl v4
│   ├── routing.ts                # defineRouting (locales, defaultLocale, localePrefix)
│   └── request.ts                # getRequestConfig (requestLocale + hasLocale)
├── public/                       # Assets estàtics
│   ├── audio/                    # Fitxers MP3 (hero ambient audio)
│   └── images/                   # Imatges del catàleg
├── __tests__/                    # Suites de proves (TDD)
├── proxy.ts                      # Middleware Next.js (next-intl/middleware)
├── next.config.ts                # Configuració Next.js + plugin next-intl
├── tailwind.config.ts            # Configuració Tailwind CSS v4
└── tsconfig.json                 # TypeScript strict mode
```

## Principis de Disseny i Desenvolupament
- **Domain-Driven Design (DDD) Lleuger:** La carpeta `components` separa la UI genèrica (`/ui`) de la UI de negoci (`/doors`, `/marketing`).
- **Server Components vs Client Components:** Maximitzar l'ús de React Server Components (RSC) per a SEO i rendiment. Utilitzar `'use client'` només on hi hagi interactivitat o animacions de Framer Motion.
- **Gestió d'Estat:** Estat local amb `useState`/`useReducer`. Evitar sobreenginyeria. Estat del servidor gestionat per Next.js Fetch Caching.
- **i18n:** Utilitzar `next-intl` v4 per a la internacionalització. Requereix configuració de `routing` i provider de missatges. Veure [`I18N.md`](./I18N.md) per al setup correcte.
- **LocaleLink:** Utilitzar `components/ui/LocaleLink.tsx` en lloc de `next/link` per afegir automàticament el prefix de locale a les URLs.

## Arquitectura del Configurador de Pressupost
El configurador de pressupost (`/pressupost`) és un **lead capture**, NO un calculador de preus.
- **Mai mostrar preus** als clients (evita que competidors/comparin pressuposts).
- La resposta sempre és genèrica: "ens posarem en contacte amb vostè".
- Estat del wizard gestionat per `QuoteWizard.tsx` amb interfície `WizardData`.
- Cada categoria de producte té un flux diferent:
  - **Portes** → tipus de porta → dimensions → colors → accessoris → contacte
  - **Estructures** → tipus d'estructura → dimensions → colors → accessoris → contacte
  - **Automatismes** → quina porta automatitzar → dimensions → colors → accessoris → contacte
- Les dimensions fan servir **mm** (no cm), step de 1mm, rang 500-12000mm ample x 500-5000mm alt.
- L'SVG del diagrama de dimensions dibuixa **visualment** el tipus de porta seleccionada.
- Botons de navegació (enrere/seguent) fixats a la part inferior amb `backdrop-blur-md`.
- Barra de progrés mostra pas actual i percentatge.

## Rutes API
```text
/api/contact    # POST — Formulari de contacte (Zod + honeypot anti-bot)
/api/quote      # POST — Formulari de pressupost (Zod + honeypot anti-bot)
```
Ambdues rutes validen les dades amb Zod i utilitzen un camp `website` com honeypot anti-bot. Si el camp té valor, la request és un bot i es descarta.

## Gestió de Media
- **Video:** Compressió FFmpeg amb CRF 28, resolució 720p, mida ~8MB. Fitxer: `hero-youtube.mp4`.
- **Àudio:** Fitxers MP3 a `public/audio/`. Auto-play amb `HTMLAudioElement` + `IntersectionObserver` per pausa/resum quan el hero entra/surt del viewport.
- **Imatges:** `images.unoptimized: true` a `next.config.ts` (Vercel gestiona l'optimització).
