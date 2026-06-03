// __tests__/components/marketing/HeroSection.test.tsx
import { render, screen } from '@testing-library/react';
import HeroSection from '@/components/marketing/HeroSection';

describe('HeroSection Component', () => {
  it('renderitza el titular principal (clau de traducció)', () => {
    render(<HeroSection />);
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveTextContent(/title.part1/i);
  });

  it('renderitza el subtítol (clau de traducció)', () => {
    render(<HeroSection />);
    const subtitle = screen.getByText(/subtitle/i);
    expect(subtitle).toBeInTheDocument();
  });

  it('renderitza el video de fons', () => {
    render(<HeroSection />);
    const video = document.querySelector('video');
    expect(video).toBeInTheDocument();
    expect(video?.autoplay).toBe(true);
    expect(video?.loop).toBe(true);
    expect(video?.muted).toBe(true);
    expect(video?.getAttribute('playsinline')).toBe('');
  });
});
