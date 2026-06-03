import React from 'react';
import type { Metadata, Viewport } from 'next';
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ThemeProvider } from "@/components/providers/theme-provider";
import LayoutGroupWrapper from "@/components/providers/layout-group-wrapper";

const SITE_URL = 'https://portespereaguilar.com';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export function generateViewport(): Viewport {
  return {
    themeColor: '#E34133',
  };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    return {};
  }

  const messages = await getMessages();
  const metadata = messages.metadata as Record<string, string>;

  const title = metadata.homeTitle || 'Portes Pere Aguilar';
  const description = metadata.homeDescription || '';

  return {
    title: {
      default: title,
      template: '%s | Portes Pere Aguilar',
    },
    description,
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: `${SITE_URL}/${locale}`,
      languages: Object.fromEntries(
        routing.locales.map((loc) => [loc, `${SITE_URL}/${loc}`])
      ),
    },
    manifest: '/manifest.json',
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/${locale}`,
      siteName: 'Portes Pere Aguilar',
      locale,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
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
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <NextIntlClientProvider messages={messages} locale={locale}>
        <LayoutGroupWrapper>
          <Navbar />
          <div className="flex-grow">
            {children}
          </div>
          <Footer />
        </LayoutGroupWrapper>
      </NextIntlClientProvider>
    </ThemeProvider>
  );
}
