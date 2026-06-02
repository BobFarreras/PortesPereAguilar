// __tests__/components/marketing/ProductDetailView.test.tsx
import { render, screen } from '@testing-library/react';
import ProductDetailView from '@/components/marketing/ProductDetailView';
import { ServiceCategory } from '@/types';
import { ImageProps } from 'next/image';

// Mock de Next/Image
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
    title: 'Porta de Prova',
    description: 'Descripció detallada de la porta de prova per assegurar la qualitat.',
    imageUrl: '/images/test.webp',
    slug: 'porta-de-prova',
  };

  it('renderitza el títol i la descripció del producte', () => {
    render(<ProductDetailView service={mockService} />);
    expect(screen.getByRole('heading', { level: 1, name: /Porta de Prova/i })).toBeInTheDocument();
    expect(screen.getByText(/Descripció detallada de la porta/i)).toBeInTheDocument();
  });

  it('renderitza la imatge amb l\'atribut alt correcte', () => {
    render(<ProductDetailView service={mockService} />);
    const image = screen.getByAltText(/Imatge detallada de Porta de Prova/i);
    expect(image).toHaveAttribute('src', '/images/test.webp');
  });

  it('renderitza els botons d\'acció (Tornar i Contactar)', () => {
    render(<ProductDetailView service={mockService} />);
    expect(screen.getByRole('link', { name: /Tornar al catàleg/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Demanar pressupost/i })).toBeInTheDocument();
  });
});