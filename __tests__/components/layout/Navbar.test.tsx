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
    // El mock de next-intl retorna la clé final (home, catalog, structures)
    // Usem getAllByRole perquè el logo també és un link amb accessible name "home"
    const links = screen.getAllByRole('link', { name: /^home$/i });
    expect(links.length).toBeGreaterThanOrEqual(1);
    expect(screen.getByRole('link', { name: /^catalog$/i })).toBeInTheDocument();
  });

  it('renderitza el botó de contacte (clau de traducció)', () => {
    render(<Navbar />);
    expect(screen.getByRole('button', { name: /^contact$/i })).toBeInTheDocument();
  });

  it('renderitza el botó per canviar d\'idioma (clau de traducció)', () => {
    render(<Navbar />);
    // Busquem l'element pel seu nom accessible (aria-label)
    const langSwitcher = screen.getByRole('button', { name: /^language$/i });
    expect(langSwitcher).toBeInTheDocument();
    expect(langSwitcher).toHaveTextContent('CA'); // El mock de useLocale retorna 'ca'
  });
});
