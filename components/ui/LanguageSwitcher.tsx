'use client';

import { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';

export default function LanguageSwitcher() {
  const t = useTranslations('navbar');
  const pathname = usePathname();
  const router = useRouter();
  const currentLocale = useLocale();
  const [isOpen, setIsOpen] = useState(false);

  const locales = [
    { code: 'ca', nativeName: 'Català' },
    { code: 'es', nativeName: 'Español' },
    { code: 'en', nativeName: 'English' },
    { code: 'fr', nativeName: 'Français' },
  ];

  const changeLanguage = (locale: string) => {
    setIsOpen(false);

    const pathSegments = pathname.split('/').filter(Boolean);
    const hasLocalePrefix = locales.map(l => l.code).includes(pathSegments[0]);

    let newPath = pathname;
    if (hasLocalePrefix) {
      newPath = `/${locale}/${pathSegments.slice(1).join('/')}`;
    } else {
      newPath = `/${locale}${pathname}`;
    }

    if (newPath.endsWith('/')) {
      newPath = newPath.slice(0, -1);
    }
    if (newPath === '') {
      newPath = `/${locale}`;
    }

    // eslint-disable-next-line react-hooks/immutability
    window.location.href = newPath;
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label={t('language')}
        aria-expanded={isOpen}
        className="flex items-center justify-center w-10 h-10 rounded-md text-xs font-bold text-brand-grey hover:text-white hover:bg-white/10 transition-colors outline-none focus-visible:ring-2 focus-visible:ring-brand-red"
      >
        {currentLocale.toUpperCase()}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white/90 dark:bg-brand-dark/80 backdrop-blur-md rounded-lg border border-brand-dark/10 dark:border-white/10 p-2 z-50">
          {locales.map(locale => (
            <button
              key={locale.code}
              onClick={() => changeLanguage(locale.code)}
              className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium ${
                locale.code === currentLocale
                  ? 'text-brand-red bg-white/10'
                  : 'text-brand-grey hover:text-white hover:bg-white/10'
              }`}
            >
              {locale.nativeName}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
