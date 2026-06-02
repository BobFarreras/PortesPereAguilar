// __tests__/components/layout/Footer.test.tsx
import { render, screen } from '@testing-library/react';
import Footer from '@/components/layout/Footer';

describe('Footer Component', () => {
  it('renderitza la informació de contacte principal', () => {
    render(<Footer />);
    expect(screen.getByText(/Girona, Catalunya/i)).toBeInTheDocument();
    expect(screen.getByText(/info@portespereaguilar.com/i)).toBeInTheDocument();
  });

  it('renderitza els enllaços ràpids de navegació', () => {
    render(<Footer />);
    expect(screen.getByRole('link', { name: /Catàleg de Portes/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Demanar Pressupost/i })).toBeInTheDocument();
  });

  it('inclou el copyright amb l\'any actual', () => {
    render(<Footer />);
    const currentYear = new Date().getFullYear().toString();
    const copyrightText = screen.getByText(new RegExp(`© ${currentYear} Portes Pere Aguilar`, 'i'));
    expect(copyrightText).toBeInTheDocument();
  });
});