import type { MetadataRoute } from 'next';
import { SERVICES_DATA } from '@/lib/constants';
import { routing } from '@/i18n/routing';

const SITE_URL = 'https://portespereaguilar.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const locales = routing.locales;

  const staticPages = ['', '/cataleg', '/contacte', '/pressupost'];

  const staticEntries: MetadataRoute.Sitemap = staticPages.flatMap((page) =>
    locales.map((locale) => ({
      url: `${SITE_URL}/${locale}${page}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: page === '' ? 1.0 : 0.8,
    }))
  );

  const catalogEntries: MetadataRoute.Sitemap = SERVICES_DATA.flatMap((service) =>
    locales.map((locale) => ({
      url: `${SITE_URL}/${locale}/cataleg/${service.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }))
  );

  return [...staticEntries, ...catalogEntries];
}
