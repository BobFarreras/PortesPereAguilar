// app/page.tsx
import HeroSection from '@/components/marketing/HeroSection';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-[#0A0A0B]">
      {/* Muntem la nostra Hero Section com a primer bloc de la pàgina.
        En el futur, aquí a sota anirem afegint el catàleg de portes, 
        la secció de confiança, etc.
      */}
      <HeroSection />
    </main>
  );
}