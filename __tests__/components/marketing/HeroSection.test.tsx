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
  it('renderitza el titular principal (clau de traducció)', () => {
    render(<HeroSection />);
    const heading = screen.getByRole('heading', { level: 1 });
    // useTranslations('hero') -> t('title.part1') retorna 'title.part1' amb el mock global
    expect(heading).toHaveTextContent(/title.part1/i);
  });

  it('renderitza el subtítol (clau de traducció)', () => {
    render(<HeroSection />);
    const subtitle = screen.getByText(/subtitle/i);
    expect(subtitle).toBeInTheDocument();
  });

  it('renderitza el botó de crida a l\'acció (MagicButton)', () => {
    render(<HeroSection />);
    const ctaButton = screen.getByTestId('magic-button-mock');
    expect(ctaButton).toHaveTextContent(/cta/i);
  });
});
