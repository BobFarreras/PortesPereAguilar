// app/[locale]/page.tsx
import { use } from 'react';
import { setRequestLocale } from 'next-intl/server';
import HeroSection from '@/components/marketing/HeroSection';
import SolutionsGrid from '@/components/marketing/SolutionsGrid';
import TrustSection from '@/components/marketing/TrustSection';

export default function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = use(params);
  setRequestLocale(locale);

  return (
    <main className="flex min-h-screen flex-col bg-white dark:bg-brand-dark">
      <HeroSection />
      <SolutionsGrid />
      <TrustSection />
    </main>
  );
}
