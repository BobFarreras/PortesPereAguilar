// __tests__/components/marketing/HeroSection.test.tsx
import { render, screen } from '@testing-library/react';
import HeroSection from '@/components/marketing/HeroSection';

// Mockegem el MagicButton per aïllar el test de la Hero Section (Test Unitari pur)
jest.mock('@/components/ui/MagicButton', () => {
  return function DummyMagicButton({ children }: { children: React.ReactNode }) {
    return <button data-testid="magic-button-mock">{children}</button>;
  };
});

describe('HeroSection Component', () => {
  it('renderitza el titular principal', () => {
    render(<HeroSection />);
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveTextContent(/Enginyeria en cada tancament/i);
  });

  it('renderitza el subtítol explicatiu', () => {
    render(<HeroSection />);
    const subtitle = screen.getByText(/Artesania d'Alta Tecnologia/i);
    expect(subtitle).toBeInTheDocument();
  });

  it('renderitza el botó de crida a l\'acció (MagicButton)', () => {
    render(<HeroSection />);
    const ctaButton = screen.getByTestId('magic-button-mock');
    expect(ctaButton).toHaveTextContent(/Demana el teu Pressupost/i);
  });
});