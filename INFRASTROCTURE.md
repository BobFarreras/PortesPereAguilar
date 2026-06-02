# Infraestructura, Desplegament i Operacions (DevOps)

## Entorn de Desplegament
* **Proveïdor Principal:** Vercel.
* **Entorns:** * `Development`: Màquines locals dels desenvolupadors.
    * `Preview`: Desplegaments automàtics per cada Pull Request (Vercel Preview Deployments).
    * `Production`: Branca `main`, desplegada automàticament a Vercel vinculada al domini `portespereaguilar.com`.

## Monitorització i Observabilitat
1. **Sentry:** * Integrat a nivell de client i de servidor per a la traçabilitat d'errors.
   * Captura automàtica d'excepcions i alertes enviades als desenvolupadors.
2. **Vercel Analytics & Speed Insights:** * Recopilació de mètriques de Core Web Vitals (LCP, FID, CLS).
   * Anàlisi de trànsit i retenció d'usuaris per iterar sobre l'UX "Disney futurista".

## Integració Contínua / Desplegament Continu (CI/CD)
* **GitHub Actions:** * S'executarà un workflow en cada PR que validarà:
        1. Compilació de TypeScript (`tsc --noEmit`).
        2. Linter (`eslint`).
        3. Tests Unitaris (`jest`).
    * El codi no es pot fusionar a `main` si els tests fallen (TDD obligatori).

## Serveis Externs Recomanats
* **Base de Dades / CMS:** Sanity.io o Supabase per gestionar el catàleg de portes fàcilment (opcional però recomanat per no hardcodejar els productes).
* **Emmagatzematge d'Imatges:** Cloudinary o Vercel Blob Storage per servir imatges en alta resolució (.webp) de manera ultraràpida.