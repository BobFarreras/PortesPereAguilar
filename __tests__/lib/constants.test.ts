// __tests__/lib/constants.test.ts
import { SERVICES_DATA } from '@/lib/constants';

describe('Dades del Catàleg (SERVICES_DATA)', () => {
  it('totes les imatges han de començar amb una barra inclinada (/) per a Next.js', () => {
    SERVICES_DATA.forEach((service) => {
      expect(service.imageUrl.startsWith('/')).toBe(true);
    });
  });

  it('no hi ha d\'haver dobles punts en les extensions de les imatges', () => {
    SERVICES_DATA.forEach((service) => {
      expect(service.imageUrl).not.toMatch(/\.\.webp$/);
    });
  });
});