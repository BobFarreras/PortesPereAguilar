// __tests__/components/marketing/SolutionsGrid.test.tsx
import { render, screen } from '@testing-library/react';
import SolutionsGrid from '@/components/marketing/SolutionsGrid';
import { ServiceCategory } from '@/types'; // Importem l'interfície estricta

// Mockegem el component fill eliminant l'ús de 'any'
jest.mock('@/components/doors/DoorCard', () => {
  return function DummyDoorCard({ service, title }: { service: ServiceCategory; title: string }) {
    return <div data-testid="door-card-mock">{title}</div>;
  };
});

describe('SolutionsGrid Component', () => {
  it('renderitza el títol de la secció', () => {
    render(<SolutionsGrid />);
    expect(screen.getByRole('heading', { level: 2, name: /title/i })).toBeInTheDocument();
  });

  it('renderitza exactament 6 targetes de serveis', () => {
    render(<SolutionsGrid />);
    const cards = screen.getAllByTestId('door-card-mock');
    // CORRECCIÓ: Ara el nostre catàleg té 6 serveis
    expect(cards).toHaveLength(6); 
  });
});