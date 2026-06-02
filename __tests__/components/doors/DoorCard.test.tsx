// __tests__/components/doors/DoorCard.test.tsx
import { render, screen } from '@testing-library/react';
import DoorCard from '@/components/doors/DoorCard';
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

describe('DoorCard Component', () => {
  const mockService: ServiceCategory = {
    id: '1',
    translationKey: 'portesSeccionals',
    imageUrl: '/images/seccional.jpg',
    slug: 'portes-seccionals',
    seoFallback: { title: '', description: '' },
  };

  it('renderitza el títol i la descripció del servei (passats pel pare)', () => {
    render(
      <DoorCard
        service={mockService}
        title="Porta Seccional"
        description="Aïllament i seguretat d'alta tecnologia."
      />
    );
    expect(screen.getByRole('heading', { level: 3, name: /Porta Seccional/i })).toBeInTheDocument();
    expect(screen.getByText(/Aïllament i seguretat d'alta tecnologia/i)).toBeInTheDocument();
  });

  it('renderitza la imatge amb l\'atribut alt correcte', () => {
    render(
      <DoorCard
        service={mockService}
        title="Porta Seccional"
        description="Aïllament i seguretat d'alta tecnologia."
      />
    );
    const image = screen.getByAltText(/Porta Seccional/i);
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', '/images/seccional.jpg');
  });

  it('conté un enllaç que apunta a la ruta del catàleg corresponent', () => {
    render(
      <DoorCard
        service={mockService}
        title="Porta Seccional"
        description="Aïllament i seguretat d'alta tecnologia."
      />
    );
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/cataleg/portes-seccionals');
  });
});
