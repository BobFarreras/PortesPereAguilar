# Arquitectura de Software (AppWeb Portes Pere Aguilar)

## Visió General
L'aplicació utilitza una arquitectura basada en components i separació de responsabilitats (SOLID) sobre el framework Next.js amb App Router (`/app`).

## Estructura de Directoris (SDD - Software Design)
```text
/
├── app/                  # Rutes de Next.js (App Router)
│   ├── (marketing)/      # Pàgines de presentació (Inici, Catàleg, Contacte)
│   ├── api/              # Endpoints del backend (Serverless Functions)
│   └── layout.tsx        # Layout principal amb Nav i Footer
├── components/           # Components React reutilitzables
│   ├── ui/               # Components base (Botons, Inputs, Modals) -> Atom/Molecules
│   ├── doors/            # Components específics del domini (Llistat de portes, Detall)
│   └── animations/       # Wrappers de Framer Motion per a efectes "Màgics"
├── lib/                  # Utilitats, helpers i configuració de llibreries (Sentry, etc.)
├── types/                # Definicions d'interfícies i tipus TypeScript globals
├── services/             # Lògica d'accés a dades (APIs externes, CMS, Base de dades)
└── __tests__/            # Fitxers de testing (TDD)
Principis de Disseny i Desenvolupament
Domain-Driven Design (DDD) Lleuger: La carpeta components separa la UI genèrica (/ui) de la UI de negoci (/doors).

Server Components vs Client Components: Maximitzar l'ús de React Server Components (RSC) per a SEO i rendiment. Utilitzar 'use client' només on hi hagi interactivitat o animacions de Framer Motion.

Gestió d'Estat: Zustand (si és un estat global complex) o Context API pur de React. Evitar sobreenginyeria. Estat del servidor gestionat per Next.js Fetch Caching i SWR/React Query si cal mutació a client.