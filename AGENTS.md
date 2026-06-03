# Definició de l'Agent i Ecosistema: PortaNext-Architect

## Propòsit
Aquest document defineix el comportament, les responsabilitats i les eines de l'agent IA encarregat de construir i mantenir la nova AppWeb de Portes Pere Aguilar.

## Responsabilitats
1. **Generació de Codi:** Escriure components React funcionals, pàgines Next.js i rutes d'API utilitzant TypeScript.
2. **Control de Qualitat:** Assegurar que cada peça de codi compleix els principis SOLID (Single Responsibility, Open-Closed, Liskov Substitution, Interface Segregation, Dependency Inversion).
3. **Testing:** Crear suites de proves unitàries i d'integració (TDD) abans de la implementació final del codi.
4. **Disseny de UI/UX:** Proposar i programar interfícies amb un disseny professional i animacions suaus (Framer Motion + Tailwind CSS) que funcionin perfectament en dispositius mòbils i d'escriptori.

## Eines i Llibreries Aprovades
* **Core:** Next.js 16 (App Router), React 19, TypeScript (strict mode).
* **Estils i Animacions:** Tailwind CSS v4, Framer Motion v12, lucide-react (iconografia).
* **Internacionalització (i18n):** `next-intl` v4 (routing + traduccions), `next-themes` (tema clar/fosc).
* **Testing:** Jest 30, React Testing Library, Cypress (E2E).
* **Validació:** Zod (formularis i API routes).
* **Eines d'Entorn:** ESLint, Prettier, Husky (Git hooks).

## Verificació Obligatòria
Abans de lliurar qualsevol canvi, executar:
```bash
pnpm check  # test + lint + typecheck + build
```
Si `pnpm check` falla, NO commitejar fins resoldre l'error.

## Bones Pràctiques Obligatòries
1. **TypeScript estricte:** `strict: true` activat. Zero `any` implícits.
2. **SOLID:** Un component = una responsabilitat. Evitar props drilling excessiu.
3. **RSC per defecte:** Només afegir `'use client'` quan hi hagi estat, efectes o animacions de Framer Motion.
4. **Mock de dependències externes als tests:**
   - Si un component depèn de `next-intl`, `next-themes` o llibreries ESM, cal mockejar-les o configurar `transformIgnorePatterns`.
   - Si un component usa `Audio` (HTMLMediaElement), cal mockejar-lo per jsdom:
     ```ts
     class MockAudio {
       src = '';
       volume = 1;
       muted = false;
       loop = false;
       play() { return Promise.resolve(); }
       pause() { /* noop */ }
       load() { /* noop */ }
     }
     (global as unknown as Record<string, unknown>).Audio = MockAudio;
     ```
5. **Revisió de versions:** No afegir versions inexistents o majors no compatibles a `package.json`.
6. **i18n obligatori (next-intl v4):** Tota pàgina sota `app/[locale]/` ha de cridar `setRequestLocale(locale)` abans de qualsevol `useTranslations` / `getMessages`. Layout ha de validar amb `hasLocale()`. Veure [`I18N.md`](./I18N.md) per al setup complet i checklist.
7. **LocaleLink:** Utilitzar `components/ui/LocaleLink.tsx` en lloc de `next/link` per afegir automàticament el prefix de locale a les URLs. mai fer `<Link href="/ca/...">`, sinó `<LocaleLink href="/cataleg">`.
8. **Sense backdrop-blur a les targetes:** Evitar `backdrop-blur` a les targetes de la pàgina principal (disseny net, sense efectes glassmorphism excessius).
9. **Sense textos "AI-generated":** El codi ha de semblar escrit per un equip humà professional. Evitar textos genèrics o repetitius.

## Arquitectura del Configurador de Pressupost
El configurador de pressupost (`/pressupost`) és un **lead capture**, NO un calculador de preus.
- **Mai mostrar preus** als clients (evita que competidors/comparin pressuposts).
- La resposta sempre és genèrica: "ens posarem en contacte amb vostè".
- Cada categoria de producte té un flux diferent:
  - **Portes** → tipus de porta → dimensions → colors → accessoris → contacte
  - **Estructures** → tipus d'estructura → dimensions → colors → accessoris → contacte
  - **Automatismes** → quina porta automatitzar → dimensions → colors → accessoris → contacte
- Les dimensions fan servir **mm** (no cm), step de 1mm, rang 500-12000mm ample x 500-5000mm alt.
- L'SVG del diagrama de dimensions dibuixa **visualment** el tipus de porta seleccionada (panells seccional, plegues basculant, etc.).

## Estructura de Components
```text
components/
├── ui/                    # Components base (Atom/Molecules)
│   ├── LocaleLink.tsx     # Link amb prefix de locale automàtic
│   ├── MagicButton.tsx    # CTA principal
│   ├── LanguageSwitcher.tsx # Selector d'idioma amb SVG flags
│   ├── ThemeToggle.tsx    # Toggle dark/light mode
│   └── ImageCarousel.tsx  # Carrusel d'imatges amb animació spring
├── layout/                # Components d'estructura
│   ├── Navbar.tsx         # Navegació principal (usa LocaleLink)
│   └── Footer.tsx         # Peu de pàgina (usa LocaleLink)
├── doors/                 # Components del domini
│   └── DoorCard.tsx       # Targeta de porta (usa LocaleLink)
├── marketing/             # Seccions de màrqueting
│   ├── HeroSection.tsx    # Hero amb video + àudio ambiental
│   ├── SolutionsGrid.tsx  # Graella de serveis
│   ├── TrustSection.tsx   # Secció de confiança
│   ├── CatalogView.tsx    # Vista de catàleg
│   ├── ProductDetailView.tsx # Detall de producte
│   ├── ContactForm.tsx    # Formulari de contacte (Zod)
│   ├── QuoteWizard.tsx    # Assistent de pressupost (lead capture)
│   └── quote/             # Steps del configurador
│       ├── StepProduct.tsx
│       ├── StepType.tsx
│       ├── StepStructure.tsx
│       ├── StepAutomation.tsx
│       ├── StepDimensions.tsx
│       ├── StepColors.tsx
│       ├── StepAccessories.tsx
│       └── StepContact.tsx
└── providers/             # Wrappers de Context
    ├── theme-provider.tsx # next-themes ThemeProvider
    └── layout-group-wrapper.tsx # Framer Motion LayoutGroup
```

## Convencions de Codi
- **Path alias:** `@/*` mapeja a l'arrel del projecte.
- **Colors corporatius:** `brand-red` (#E34133), `brand-dark` (#121218), `brand-grey`.
- **Dark mode:** Utilitzar classes `dark:` de Tailwind. El mode fosc és `#121218` (no negre pur).
- **Formularis:** Validació amb Zod tant al client (errors inline) com al servidor (API route). Incloure honeypot anti-bot.
- **Imatges:** `images.unoptimized: true` a `next.config.ts` (Vercel gestiona l'optimització).
- **Video:** Compressió FFmpeg amb CRF 28, resolució 720p, mida ~8MB per a hero sections.
- **Àudio:** Fitxers MP3 a `public/audio/`. Auto-play amb `HTMLAudioElement` + `IntersectionObserver` per pausa/resum.
