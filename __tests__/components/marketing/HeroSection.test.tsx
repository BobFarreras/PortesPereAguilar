// __tests__/components/marketing/HeroSection.test.tsx
import { render, screen, waitFor } from '@testing-library/react';
import HeroSection from '@/components/marketing/HeroSection';

// Mockem IntersectionObserver per simular que la secció és visible
beforeEach(() => {
  const mockIntersectionObserver = jest.fn();
  mockIntersectionObserver.mockReturnValue({
    observe: () => null,
    unobserve: () => null,
    disconnect: () => null,
  });
  window.IntersectionObserver = mockIntersectionObserver;

  // Simulem que la secció és visible (threshold 0.5)
  mockIntersectionObserver.mockImplementation((callback) => {
    setTimeout(() => {
      callback([{ isIntersecting: true } as IntersectionObserverEntry]);
    }, 0);
    return { observe: () => null, unobserve: () => null, disconnect: () => null };
  });
});

describe('HeroSection Component', () => {
  it('renderitza el titular principal quan la secció és visible', async () => {
    render(<HeroSection />);
    await waitFor(() => {
      const heading = screen.getByRole('heading', { level: 1 });
      expect(heading).toHaveTextContent(/title.part1/i);
    }, { timeout: 2000 });
  });

  it('renderitza el subtítol quan la secció és visible', async () => {
    render(<HeroSection />);
    await waitFor(() => {
      const subtitle = screen.getByText(/subtitle/i);
      expect(subtitle).toBeInTheDocument();
    }, { timeout: 2000 });
  });

  it('renderitza el video de fons', () => {
    render(<HeroSection />);
    const video = document.querySelector('video');
    expect(video).toBeInTheDocument();
    expect(video?.autoplay).toBe(true);
    expect(video?.loop).toBe(true);
    expect(video?.muted).toBe(true);
  });
});
