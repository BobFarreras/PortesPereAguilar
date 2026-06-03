// __tests__/components/marketing/CatalogView.test.tsx
import { render, screen } from '@testing-library/react';
import { SERVICES_DATA } from '@/lib/constants';
import { ServiceCategory } from '@/types';
import CatalogView from '@/components/marketing/CatalogoView';

jest.mock('@/components/doors/DoorCard', () => {
  return function DummyDoorCard({ service, title, description }: { service: ServiceCategory; title: string; description: string }) {
    return <div data-testid="catalog-door-card-mock">{title} - {description}</div>;
  };
});

describe('CatalogView Component', () => {
  it('renderitza el títol principal del catàleg (clau de traducció)', () => {
    render(<CatalogView items={SERVICES_DATA} />);
    // t('catalog.title') -> 'title'
    expect(screen.getByRole('heading', { level: 1, name: /title/i })).toBeInTheDocument();
  });

  it('renderitza tantes targetes com elements rep per les props', () => {
    render(<CatalogView items={SERVICES_DATA} />);
    const cards = screen.getAllByTestId('catalog-door-card-mock');
    expect(cards).toHaveLength(SERVICES_DATA.length);
  });

  it('mostra un missatge si el catàleg està buit (clau de traducció)', () => {
    render(<CatalogView items={[]} />);
    // t('catalog.empty') -> 'empty'
    expect(screen.getByText(/empty/i)).toBeInTheDocument();
  });
});
