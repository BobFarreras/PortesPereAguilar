# Portes Pere Aguilar — AppWeb

Aplicació web corporativa per a **Portes Pere Aguilar**, especialistes en estructures metàl·liques, serralleria i portes d'alta tecnologia.

## Stack Tecnològic
- **Framework:** Next.js 16 (App Router)
- **Llenguatge:** TypeScript (estricte)
- **Estils:** Tailwind CSS v4
- **Animacions:** Framer Motion
- **i18n:** next-intl
- **Tema:** next-themes (clar/fosc)
- **Testing:** Jest + React Testing Library

## Estructura clau
- `app/` — Rutes i pàgines (Server Components per defecte).
- `components/` — Components React reutilitzables (`ui/`, `layout/`, `marketing/`, `doors/`).
- `lib/` — Constants, utilitats i helpers.
- `locales/` — Traduccions en `ca`, `es`, `en`, `fr`.
- `__tests__/` — Suites de proves unitàries i d'integració (TDD).

## Desenvolupament
```bash
# Instal·la dependencies
pnpm install

# Servidor de desenvolupament
pnpm dev

# Tests
pnpm test

# Linter
pnpm lint

# Type check
pnpm tsc --noEmit
```

## Desplegament
Configurat per a Vercel. Els pushes a `main` despleguen automàticament a producció.

---
*Documentació addicional:*
- `AGENTS.md` — Definició de l'agent IA i convencions de codi.
- `ARQUITECTURE.md` — Arquitectura de software i estructura de directoris.
- `INFRASTROCTURE.md` — Infraestructura, CI/CD i observabilitat.
- `PROJECTE.md` — Visió de disseny UX/UI "Disney Futurista".
