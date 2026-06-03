'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';

const DEFAULT_LOCALE = 'ca';

export default function LanguageSwitcher() {
  const t = useTranslations('navbar');
  const pathname = usePathname();
  const currentLocale = useLocale();
  const [isOpen, setIsOpen] = useState(false);

  const locales = [
    { code: 'ca', nativeName: 'Català', flag: '🏴' },
    { code: 'es', nativeName: 'Español', flag: '🇪🇸' },
    { code: 'en', nativeName: 'English', flag: '🇬🇧' },
    { code: 'fr', nativeName: 'Français', flag: '🇫🇷' },
  ];

  const changeLanguage = (locale: string) => {
    setIsOpen(false);

    const pathSegments = pathname.split('/').filter(Boolean);
    // Detecta si el primer segment és un locale
    const currentLocalePrefix = locales.find(l => l.code === pathSegments[0]);
    const pathWithoutLocale = currentLocalePrefix
      ? pathSegments.slice(1).join('/')
      : pathSegments.join('/');

    let newPath: string;
    if (locale === DEFAULT_LOCALE) {
      // El locale per defecte (ca) NO porta prefix
      newPath = '/' + pathWithoutLocale;
    } else {
      newPath = '/' + locale + '/' + pathWithoutLocale;
    }

    if (newPath.endsWith('/')) {
      newPath = newPath.slice(0, -1);
    }
    if (newPath === '') {
      newPath = '/';
    }

    window.location.assign(newPath);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label={t('language')}
        aria-expanded={isOpen}
        className="flex items-center gap-1.5 w-auto h-10 px-3 rounded-md text-sm font-bold text-brand-grey hover:text-brand-dark hover:bg-brand-dark/10 dark:hover:text-white dark:hover:bg-white/10 transition-colors outline-none focus-visible:ring-2 focus-visible:ring-brand-red"
      >
        <span className="text-base">{locales.find(l => l.code === currentLocale)?.flag}</span>
        <span className="text-xs">{currentLocale.toUpperCase()}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white/90 dark:bg-brand-dark/80 backdrop-blur-md rounded-lg border border-brand-dark/10 dark:border-white/10 p-2 z-50">
          {locales.map(locale => (
            <button
              key={locale.code}
              onClick={() => changeLanguage(locale.code)}
              className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium flex items-center gap-2 ${
                locale.code === currentLocale
                  ? 'text-brand-red bg-brand-red/10'
                  : 'text-gray-600 dark:text-brand-grey hover:text-brand-dark hover:bg-brand-dark/10 dark:hover:text-white dark:hover:bg-white/10'
              }`}
            >
              <span className="text-base">{locale.flag}</span>
              <span>{locale.nativeName}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
