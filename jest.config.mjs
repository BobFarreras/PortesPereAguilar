import nextJest from 'next/jest.js'

const createJestConfig = nextJest({
  // Proporciona el camí a la teva app Next.js per carregar next.config.js i fitxers .env
  dir: './',
})

/** @type {import('jest').Config} */
const config = {
  // Afegeix més opcions de configuració aquí
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
  },
  transformIgnorePatterns: [
    // Permet que Jest transformi els paquets ESM de next-intl i use-intl
    'node_modules/(?!(next-intl|use-intl|@intlify)/)',
  ],
}

// createJestConfig exporta la configuració de Jest per permetre que next/jest carregui els fitxers de manera asíncrona
export default createJestConfig(config)