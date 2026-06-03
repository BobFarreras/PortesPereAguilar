import React from 'react';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import QuoteWizard from '@/components/marketing/QuoteWizard';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });
  return {
    title: t('quoteTitle'),
    description: t('quoteDescription'),
  };
}

export default async function QuotePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <QuotePageContent locale={locale} />;
}

async function QuotePageContent({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: 'quote' });

  return (
    <main className="min-h-screen bg-white dark:bg-brand-dark pt-32 pb-24 px-6 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-brand-red/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-3xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <p className="text-brand-red text-sm font-bold tracking-widest uppercase mb-4">
            {t('hero.subtitle')}
          </p>
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-6 tracking-tight">
            {t('hero.title')}
          </h1>
          <p className="text-lg text-gray-500 dark:text-brand-grey max-w-2xl mx-auto">
            {t('hero.description')}
          </p>
        </div>

        <QuoteWizard />
      </div>
    </main>
  );
}
