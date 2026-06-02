// app/page.tsx
import HeroSection from '@/components/marketing/HeroSection';
import SolutionsGrid from '@/components/marketing/SolutionsGrid';
import TrustSection from '@/components/marketing/TrustSection';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-white dark:bg-brand-dark">
      <HeroSection />
      <SolutionsGrid />
      <TrustSection />
    </main>
  );
}