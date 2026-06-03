# Arquitectura de Software (AppWeb Portes Pere Aguilar)

## Visió General
L'aplicació utilitza una arquitectura basada en components i separació de responsabilitats (SOLID) sobre el framework Next.js amb App Router (`/app`).

## Estructura de Directoris (SDD - Software Design)
```text
/
├── app/                  # Rutes de Next.js (App Router)
│   ├── api/              # Endpoints del backend (Serverless Functions)
│   ├── contacte/         # Pàgina de contacte
│   ├── cataleg/          # Catàleg i detall de productes
│   ├── layout.tsx        # Layout principal amb Nav i Footer
│   ├── page.tsx          # Pàgina d'inici
│   └── globals.css       # Estils globals Tailwind v4
├── components/           # Components React reutilitzables
│   ├── ui/               # Components base (Botons, Inputs, Modals) -> Atom/Molecules
│   ├── layout/           # Components d'estructura (Navbar, Footer)
│   ├── doors/            # Components específics del domini (Llistat de portes, Detall)
│   ├── marketing/        # Seccions de màrqueting (Hero, Grid, Trust, ContactForm)
│   └── providers/        # Wrappers de Context (Tema, Locale)
├── lib/                  # Utilitats, helpers i configuració de llibreries
├── types/                # Definicions d'interfícies i tipus TypeScript globals
├── locales/              # Fitxers de traducció JSON (ca, es, en, fr)
├── services/             # Lògica d'accés a dades (APIs externes, CMS, Base de dades) [Pendent de crear]
└── __tests__/            # Fitxers de testing (TDD)
```

## Principis de Disseny i Desenvolupament
- **Domain-Driven Design (DDD) Lleuger:** La carpeta `components` separa la UI genèrica (`/ui`) de la UI de negoci (`/doors`, `/marketing`).
- **Server Components vs Client Components:** Maximitzar l'ús de React Server Components (RSC) per a SEO i rendiment. Utilitzar `'use client'` només on hi hagi interactivitat o animacions de Framer Motion.
- **Gestió d'Estat:** Zustand (si és un estat global complex) o Context API pur de React. Evitar sobreenginyeria. Estat del servidor gestionat per Next.js Fetch Caching.
- **i18n:** Utilitzar `next-intl` per a la internacionalització. Requereix configuració de `routing` i provider de missatges per funcionar correctament. Veure [`I18N.md`](./I18N.md) per al setup correcte amb next-intl v4 (postmortem inclòs).
