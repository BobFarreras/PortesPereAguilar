import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async ({ locale }) => {
  const resolvedLocale = locale || 'ca';
  const messages = (await import(`@/locales/${resolvedLocale}.json`)).default;
  return { locale: resolvedLocale, messages };
});
