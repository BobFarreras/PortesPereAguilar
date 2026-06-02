// __tests__/components/marketing/ProductDetailView.test.tsx
import { render, screen } from '@testing-library/react';
import ProductDetailView from '@/components/marketing/ProductDetailView';
import { ServiceCategory } from '@/types';
import { ImageProps } from 'next/image';

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: ImageProps) => {
    const { fill, priority, sizes, blurDataURL, placeholder, ...imgProps } = props;
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    return <img {...(imgProps as React.ImgHTMLAttributes<HTMLImageElement>)} />;
  },
}));

describe('ProductDetailView Component', () => {
  const mockService: ServiceCategory = {
    id: '1',
    translationKey: 'portesSeccionals',
    imageUrl: '/images/test.webp',
    slug: 'porta-de-prova',
    seoFallback: { title: '', description: '' },
  };

  it('renderitza el títol i la descripció del producte (claus de traducció)', () => {
    // El mock de next-intl retorna la clau tal qual: t(`servicesList.${key}.title`) -> "servicesList.portesSeccionals.title"
    render(<ProductDetailView service={mockService} />);
    expect(screen.getByRole('heading', { level: 1, name: /title/i })).toBeInTheDocument();
    expect(screen.getByText('servicesList.portesSeccionals.description')).toBeInTheDocument();
  });

  it('renderitza la imatge amb l\'atribut alt correcte', () => {
    render(<ProductDetailView service={mockService} />);
    const image = screen.getByAltText(/title - Imatge 1/i);
    expect(image).toHaveAttribute('src', '/images/test.webp');
  });

  it('renderitza els botons d\'acció (Tornar i Contactar) amb claus de traducció', () => {
    render(<ProductDetailView service={mockService} />);
    expect(screen.getByRole('link', { name: /backToCatalog/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /requestQuote/i })).toBeInTheDocument();
  });
});
