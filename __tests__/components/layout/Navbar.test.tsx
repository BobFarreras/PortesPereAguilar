// __tests__/components/layout/Navbar.test.tsx
import { render, screen } from '@testing-library/react';
import Navbar from '@/components/layout/Navbar';

describe('Navbar Component', () => {
  it('renderitza el logotip de l\'empresa', () => {
    render(<Navbar />);
    const logo = screen.getByAltText(/Logotip Portes Pere Aguilar/i);
    expect(logo).toBeInTheDocument();
  });

  it('renderitza els enllaços de navegació principals', () => {
    render(<Navbar />);
    expect(screen.getByRole('link', { name: /Inici/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Catàleg/i })).toBeInTheDocument();
  });

  it('renderitza el botó de contacte', () => {
    render(<Navbar />);
    expect(screen.getByRole('button', { name: /Contactar/i })).toBeInTheDocument();
  });
  
  it('renderitza el botó per canviar d\'idioma', () => {
    render(<Navbar />);
    // Busquem l'element pel seu nom accessible (aria-label)
    const langSwitcher = screen.getByRole('button', { name: /Canviar idioma/i });
    expect(langSwitcher).toBeInTheDocument();
    expect(langSwitcher).toHaveTextContent('CA');
  });
});