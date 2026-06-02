import React from 'react';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ThemeProvider } from "@/components/providers/theme-provider";

export function generateStaticParams() {
  return [
    { locale: 'ca' },
    { locale: 'es' },
    { locale: 'en' },
    { locale: 'fr' },
  ];
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getMessages();

  return (
    <ThemeProvider attribute="class" enableSystem>
      <NextIntlClientProvider messages={messages} locale={locale}>
        <Navbar />
        <div className="flex-grow">
          {children}
        </div>
        <Footer />
      </NextIntlClientProvider>
    </ThemeProvider>
  );
}
