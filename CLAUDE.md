# Context per a Claude / OpenCode

## Referències Ràpides
- **Agent:** PortaNext-Architect (veure `AGENTS.md`)
- **Arquitectura:** Next.js 16 App Router, TypeScript estricte, Tailwind v4, Framer Motion.
- **i18n:** `next-intl` v4 amb locales a `/locales` (ca, es, en, fr).
- **Tema:** `next-themes` amb `ThemeProvider` i `LocaleProvider` a `app/layout.tsx`.
- **Testing:** Jest + RTL. Cal fer mock de `next-intl`, `next-themes` i Framer Motion als tests unitaris.
- **Components:** RSC per defecte. Només `'use client'` per estat/efectes/animacions.
- **Convencions:**
  - Path alias `@/*` mapeja a `./`.
  - Colors corporatius: `brand-red` (#E34133), `brand-dark`, `brand-grey`.
  - No usar `any`. `strict: true` a `tsconfig.json`.
- **Fitxers clau:**
  - `app/layout.tsx` — Root layout amb Navbar + Footer + Providers.
  - `lib/constants.ts` — Dades hardcodejades del catàleg (pendent de migrar a CMS/BBDD).
  - `components/ui/MagicButton.tsx` — CTA principal. Usar variant `primary` (vermell corporatiu).

## Estat Actual (Auditoria)
- `middleware.ts` present però amb import incorrecte (ha de ser default export de `next-intl/middleware`).
- Falta configurar `NextIntlClientProvider` perquè `useTranslations` funcioni en runtime.
- No existeix `proxy.ts`; l'usuari ha indicat que s'hauria de migrar de `middleware.ts` a un proxy per i18n.
- Tests desfasats amb el codi actual (textos hardcodejats vs `useTranslations`, timeouts curts, expectatives d'alt text erronis).
- `package.json` conté versions inexistents o majors no compatibles (`framer-motion ^12.40.0`, `@types/jest ^30.0.0`, `lucide-react ^1.17.0`).
