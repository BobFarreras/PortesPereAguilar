'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useEffect } from 'react';

export default function LanguageSwitcher() {
  const t = useTranslations('navbar');
  const pathname = usePathname();
  const router = useRouter();

  // Extract locale from pathname (if present)
  const [, currentLocale = 'ca'] = pathname.split('/').filter(Boolean);

  const locales = [
    { code: 'ca', name: 'Català', nativeName: 'Català' },
    { code: 'es', name: 'Español', nativeName: 'Español' },
    { code: 'en', name: 'English', nativeName: 'English' },
    { code: 'fr', name: 'Français', nativeName: 'Français' },
  ];

  // Function to change language
  const changeLanguage = (locale: string) => {
    // Remove any existing locale prefix and add the new one
    const pathSegments = pathname.split('/').filter(Boolean);
    const hasLocalePrefix = locales.map(l => l.code).includes(pathSegments[0]);
    
    let newPath = pathname;
    if (hasLocalePrefix) {
      // Replace the first segment (locale) with the new locale
      newPath = `/${locale}/${pathSegments.slice(1).join('/')}`;
    } else {
      // Add locale prefix
      newPath = `/${locale}/${pathname}`;
    }
    
    // Handle root path specially
    if (newPath === `/${locale}/`) {
      newPath = `/${locale}`;
    }
    
    router.push(newPath);
  };

  return (
    <div className="relative">
      <button
        onClick={() => changeLanguage(currentLocale)}
        aria-label={t('language')}
        className="flex items-center justify-center w-10 h-10 rounded-md text-xs font-bold text-brand-grey hover:text-white hover:bg-white/10 transition-colors outline-none focus-visible:ring-2 focus-visible:ring-brand-red"
      >
        {currentLocale.toUpperCase()}
      </button>
      
      {/* Dropdown menu */}
      <div className="absolute right-0 mt-2 w-48 bg-brand-dark/80 backdrop-blur-md rounded-lg border border-white/10 p-2 z-50 hidden md:block">
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
    </div>
  );
}