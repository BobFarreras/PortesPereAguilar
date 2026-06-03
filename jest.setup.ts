// jest.setup.ts
import '@testing-library/jest-dom'
// jest és global en aquest fitxer gràcies a l'entorn de test

// Mock global de l'IntersectionObserver per evitar que Framer Motion (whileInView) faci petar els tests de JSDOM
const mockIntersectionObserver = class {
  constructor() {}
  observe() {}
  unobserve() {}
  disconnect() {}
};

Object.defineProperty(window, 'IntersectionObserver', {
  writable: true,
  configurable: true,
  value: mockIntersectionObserver,
});

Object.defineProperty(global, 'IntersectionObserver', {
  writable: true,
  configurable: true,
  value: mockIntersectionObserver,
});

// Mock global de next-intl per evitar problemes d'ESM a Jest
jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
  useLocale: () => 'ca',
  useMessages: () => ({}),
  NextIntlClientProvider: ({ children }: { children: React.ReactNode }) => children,
}));

// Mock global de next-themes
jest.mock('next-themes', () => ({
  useTheme: () => ({ theme: 'dark', setTheme: jest.fn(), resolvedTheme: 'dark' }),
  ThemeProvider: ({ children }: { children: React.ReactNode }) => children,
}));

// Mock global de next/navigation (per si algun component fa servir useRouter/usePathname)
jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: jest.fn(), replace: jest.fn(), refresh: jest.fn(), back: jest.fn(), forward: jest.fn(), prefetch: jest.fn() }),
  usePathname: () => '/',
  useSearchParams: () => new URLSearchParams(),
}));

// Mock global de fetch per evitar errors a jsdom
Object.defineProperty(global, 'fetch', {
  writable: true,
  configurable: true,
  value: jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve({ success: true }),
    } as Response)
  ),
});
