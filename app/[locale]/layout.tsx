import React from 'react';
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ThemeProvider } from "@/components/providers/theme-provider";
import LayoutGroupWrapper from "@/components/providers/layout-group-wrapper";
import PageTransition from "@/components/providers/page-transition";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <ThemeProvider attribute="class" enableSystem>
      <NextIntlClientProvider messages={messages} locale={locale}>
        <LayoutGroupWrapper>
          <Navbar />
          <div className="flex-grow">
            <PageTransition>{children}</PageTransition>
          </div>
          <Footer />
        </LayoutGroupWrapper>
      </NextIntlClientProvider>
    </ThemeProvider>
  );
}
