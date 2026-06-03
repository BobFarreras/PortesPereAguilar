// __tests__/components/layout/Navbar.test.tsx
import { render, screen } from '@testing-library/react';
import Navbar from '@/components/layout/Navbar';

describe('Navbar Component', () => {
  it('renderitza el logotip de l\'empresa', () => {
    render(<Navbar />);
    // El mock de next-intl retorna 'home' per a t('home') del alt del logo
    const logo = screen.getByAltText(/home/i);
    expect(logo).toBeInTheDocument();
  });

  it('renderitza els enllaços de navegació principals (claus de traducció)', () => {
    render(<Navbar />);
    // El mock de next-intl retorna la clau final (home, catalog, contact)
    // Usem getAllByRole perquè el logo també és un link amb accessible name "home"
    const links = screen.getAllByRole('link', { name: /^home$/i });
    expect(links.length).toBeGreaterThanOrEqual(1);
    expect(screen.getByRole('link', { name: /^catalog$/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /^contact$/i })).toBeInTheDocument();
  });

  it('renderitza l\'enllaç de contacte a la navegació (clau de traducció)', () => {
    render(<Navbar />);
    // "contact" ja no és un botó CTA, és un enllaç dins el nav
    const links = screen.getAllByRole('link', { name: /^contact$/i });
    expect(links.length).toBeGreaterThanOrEqual(1);
  });

  it('renderitza el botó per canviar d\'idioma (clau de traducció)', () => {
    render(<Navbar />);
    const langSwitcher = screen.getByRole('button', { name: /^language$/i });
    expect(langSwitcher).toBeInTheDocument();
    // La bandera SVG és dins del botó
    expect(langSwitcher.querySelector('svg')).toBeInTheDocument();
  });
});
