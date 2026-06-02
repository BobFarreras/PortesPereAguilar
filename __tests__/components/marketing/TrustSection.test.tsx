// __tests__/components/marketing/TrustSection.test.tsx
import { render, screen } from '@testing-library/react';
import TrustSection from '@/components/marketing/TrustSection';

// El mock de l'IntersectionObserver ja el tenim a jest.setup.ts, així que whileInView no fallarà.

describe('TrustSection Component', () => {
  it('renderitza el títol principal de la secció', () => {
    render(<TrustSection />);
    expect(screen.getByRole('heading', { level: 2, name: /Confiança i Precisió/i })).toBeInTheDocument();
  });

  it('renderitza les mètriques clau d\'experiència', () => {
    render(<TrustSection />);
    // Comprovem que els números d'impacte existeixen
    expect(screen.getByText(/\+30/i)).toBeInTheDocument();
    expect(screen.getByText(/\+2000/i)).toBeInTheDocument();
    expect(screen.getByText(/100%/i)).toBeInTheDocument();
  });

  it('renderitza els textos descriptius de cada pilar', () => {
    render(<TrustSection />);
    expect(screen.getByText(/Anys d'Experiència/i)).toBeInTheDocument();
    expect(screen.getByText(/Projectes Realitzats/i)).toBeInTheDocument();
    expect(screen.getByText(/Garantia de Qualitat/i)).toBeInTheDocument();
  });
});