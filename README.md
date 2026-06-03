# Portes Pere Aguilar — AppWeb

Aplicació web corporativa per a **Portes Pere Aguilar**, especialistes en estructures metàl·liques, serralleria i portes d'alta tecnologia.

## Stack Tecnològic
- **Framework:** Next.js 16 (App Router)
- **Llenguatge:** TypeScript (estricte)
- **Estils:** Tailwind CSS v4
- **Animacions:** Framer Motion v12
- **i18n:** next-intl v4 (ca, es, en, fr)
- **Tema:** next-themes (clar/fosc)
- **Testing:** Jest 30 + React Testing Library
- **Validació:** Zod

## Estructura clau
- `app/[locale]/` — Rutes i pàgines (Server Components per defecte).
- `components/` — Components React reutilitzables (`ui/`, `layout/`, `marketing/`, `doors/`).
- `components/marketing/quote/` — Steps del configurador de pressupost.
- `lib/` — Constants, utilitats i helpers.
- `locales/` — Traduccions en `ca`, `es`, `en`, `fr`.
- `__tests__/` — Suites de proves unitàries i d'integració (TDD).

## Desenvolupament
```bash
# Instal·la dependencies
pnpm install

# Servidor de desenvolupament
pnpm dev

# Verificació completa (test + lint + typecheck + build)
pnpm check

# Tests
pnpm test

# Linter
pnpm lint

# Type check
pnpm typecheck

# Build de producció
pnpm build
```

## Desplegament
Configurat per a Vercel. Els pushes a `main` despleguen automàticament a producció.

---
*Documentació addicional:*
- `AGENTS.md` — Definició de l'agent IA i convencions de codi.
- `ARQUITECTURE.md` — Arquitectura de software i estructura de directoris.
- `INFRASTROCTURE.md` — Infraestructura, CI/CD i observabilitat.
- `I18N.md` — Configuració d'internacionalització (next-intl v4).
- `PROJECTE.md` — Visió de disseny UX/UI.
- `CLAUDE.md` — Context ràpid per a IA.
