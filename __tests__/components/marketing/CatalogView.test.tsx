// __tests__/components/marketing/CatalogView.test.tsx
import { render, screen } from '@testing-library/react';

import { SERVICES_DATA } from '@/lib/constants';
import { ServiceCategory } from '@/types';
import CatalogView from '@/components/marketing/CatalogoView';

// Mockegem el component DoorCard per aïllar el test
jest.mock('@/components/doors/DoorCard', () => {
  return function DummyDoorCard({ service }: { service: ServiceCategory }) {
    return <div data-testid="catalog-door-card-mock">{service.title}</div>;
  };
});

describe('CatalogView Component', () => {
  it('renderitza el títol principal del catàleg', () => {
    render(<CatalogView items={SERVICES_DATA} />);
    expect(screen.getByRole('heading', { level: 1, name: /Catàleg de Solucions/i })).toBeInTheDocument();
  });

  it('renderitza tantes targetes com elements rep per les props', () => {
    render(<CatalogView items={SERVICES_DATA} />);
    const cards = screen.getAllByTestId('catalog-door-card-mock');
    expect(cards).toHaveLength(SERVICES_DATA.length);
  });

  it('mostra un missatge si el catàleg està buit', () => {
    render(<CatalogView items={[]} />);
    expect(screen.getByText(/Actualment no hi ha productes disponibles/i)).toBeInTheDocument();
  });
});