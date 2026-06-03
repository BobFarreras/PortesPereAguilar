import { useLocale } from 'next-intl';
import Link from 'next/link';

/**
 * Link que afegeix automàticament el prefix de locale.
 * Ex: /cataleg → /ca/cataleg
 */
export default function LocaleLink({
  href,
  children,
  ...props
}: {
  href: string;
  children: React.ReactNode;
  [key: string]: unknown;
}) {
  const locale = useLocale();

  // Si ja té prefix de locale, no afegir
  const locales = ['ca', 'es', 'en', 'fr'];
  const hasLocalePrefix = locales.some(l => href === `/${l}` || href.startsWith(`/${l}/`));

  const localizedHref = hasLocalePrefix ? href : `/${locale}${href}`;

  return (
    <Link href={localizedHref} {...props}>
      {children}
    </Link>
  );
}
