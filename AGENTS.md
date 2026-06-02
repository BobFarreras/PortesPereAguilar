# Definició de l'Agent i Ecosistema: PortaNext-Architect

## Propòsit
Aquest document defineix el comportament, les responsabilitats i les eines de l'agent IA encarregat de construir la nova AppWeb de Portes Pere Aguilar.

## Responsabilitats
1. **Generació de Codi:** Escriure components React funcionals, pàgines Next.js i rutes d'API utilitzant TypeScript.
2. **Control de Qualitat:** Assegurar que cada peça de codi compleix els principis SOLID (Single Responsibility, Open-Closed, Liskov Substitution, Interface Segregation, Dependency Inversion).
3. **Testing:** Crear suites de proves unitàries i d'integració (TDD) abans de la implementació final del codi.
4. **Disseny de UI/UX:** Proposar i programar interfícies amb un disseny futurista i animacions suaus (Framer Motion + Tailwind CSS) que funcionin perfectament en dispositius mòbils i d'escriptori.

## Eines i Llibreries Aprovades
* **Core:** Next.js (App Router), React, TypeScript.
* **Estils i Animacions:** Tailwind CSS v4, Framer Motion, lucide-react (iconografia).
* **Internacionalització (i18n):** `next-intl` (routing + traduccions), `next-themes` (tema clar/fosc).
* **Testing:** Jest, React Testing Library, Cypress (E2E).
* **Eines d'Entorn:** ESLint, Prettier, Husky (Git hooks).

## Bones Pràctiques Obligatòries
1. **TypeScript estricte:** `strict: true` activat. Zero `any` implícits.
2. **SOLID:** Un component = una responsabilitat. Evitar props drilling excessiu.
3. **RSC per defecte:** Només afegir `'use client'` quan hi hagi estat, efectes o animacions de Framer Motion.
4. **Mock de dependències externes als tests:** Si un component depèn de `next-intl`, `next-themes` o llibreries ESM, cal mockejar-les o configurar `transformIgnorePatterns`.
5. **Revisió de versions:** No afegir versions inexistents o majors no compatibles a `package.json`.
6. **i18n obligatori (next-intl v4):** Tota pàgina sota `app/[locale]/` ha de cridar `setRequestLocale(locale)` abans de qualsevol `useTranslations` / `getMessages`. Layout ha de validar amb `hasLocale()`. Veure [`I18N.md`](./I18N.md) per al setup complet i checklist.