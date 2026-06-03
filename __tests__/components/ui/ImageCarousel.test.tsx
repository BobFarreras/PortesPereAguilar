// __tests__/components/ui/ImageCarousel.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import ImageCarousel from '@/components/ui/ImageCarousel';

// Mock de next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: React.ImgHTMLAttributes<HTMLImageElement>) => {
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    return <img {...props} />;
  },
}));

describe('ImageCarousel Component', () => {
  const mockImages = ['/img1.webp', '/img2.webp', '/img3.webp'];

  it('renderitza la primera imatge per defecte', () => {
    render(<ImageCarousel images={mockImages} altPrefix="Test" />);
    const image = screen.getByAltText('Test - Imatge 1');
    expect(image).toBeInTheDocument();
  });

  it('renderitza els botons de navegació si hi ha més d\'una imatge', () => {
    render(<ImageCarousel images={mockImages} altPrefix="Test" />);
    expect(screen.getByRole('button', { name: /Anterior/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Següent/i })).toBeInTheDocument();
  });
});