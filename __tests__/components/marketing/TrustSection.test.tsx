// __tests__/components/marketing/TrustSection.test.tsx
import { render, screen } from '@testing-library/react';
import TrustSection from '@/components/marketing/TrustSection';

describe('TrustSection Component', () => {
  it('renderitza el títol principal de la secció', () => {
    render(<TrustSection />);
    expect(screen.getByRole('heading', { level: 2, name: /title/i })).toBeInTheDocument();
  });

  it('renderitza les mètriques clau d\'experiència', () => {
    render(<TrustSection />);
    expect(screen.getByText(/items\.0\.metric/i)).toBeInTheDocument();
    expect(screen.getByText(/items\.1\.metric/i)).toBeInTheDocument();
    expect(screen.getByText(/items\.2\.metric/i)).toBeInTheDocument();
  });

  it('renderitza els textos descriptius de cada pilar', () => {
    render(<TrustSection />);
    expect(screen.getByText(/items\.0\.title/i)).toBeInTheDocument();
    expect(screen.getByText(/items\.1\.title/i)).toBeInTheDocument();
    expect(screen.getByText(/items\.2\.title/i)).toBeInTheDocument();
  });
});