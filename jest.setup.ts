// jest.setup.ts
import '@testing-library/jest-dom'

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