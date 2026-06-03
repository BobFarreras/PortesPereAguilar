'use client';

import { useState, useRef, useEffect } from 'react';
import { useLocale } from 'next-intl';

// --- Components SVG Flags (36x24, disseny consistent) ---

function CatalanFlag({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 24" className={className} preserveAspectRatio="none">
      <rect width="36" height="24" fill="#FACC15" />
      <rect y="3" width="36" height="3" fill="#EF4444" />
      <rect y="9" width="36" height="3" fill="#EF4444" />
      <rect y="15" width="36" height="3" fill="#EF4444" />
      <rect y="21" width="36" height="3" fill="#EF4444" />
    </svg>
  );
}

function SpanishFlag({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 24" className={className} preserveAspectRatio="none">
      <rect width="36" height="6" fill="#AD1519" />
      <rect y="6" width="36" height="12" fill="#FABD00" />
      <rect y="18" width="36" height="6" fill="#AD1519" />
    </svg>
  );
}

function EnglishFlag({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 24" className={className} preserveAspectRatio="none">
      <rect width="36" height="24" fill="#B22234" />
      <rect y="2.18" width="36" height="2.18" fill="white" />
      <rect y="6.54" width="36" height="2.18" fill="white" />
      <rect y="10.9" width="36" height="2.18" fill="white" />
      <rect y="15.26" width="36" height="2.18" fill="white" />
      <rect y="19.62" width="36" height="2.18" fill="white" />
      <rect width="14.4" height="12.9" fill="#3C3B6E" />
      <circle cx="2.5" cy="2.5" r="1" fill="white" />
      <circle cx="7" cy="6" r="1" fill="white" />
      <circle cx="11.5" cy="10" r="1" fill="white" />
    </svg>
  );
}

function FrenchFlag({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 24" className={className} preserveAspectRatio="none">
      <rect width="12" height="24" fill="#002395" />
      <rect x="12" width="12" height="24" fill="#FFFFFF" />
      <rect x="24" width="12" height="24" fill="#ED2939" />
    </svg>
  );
}

// --- Configuració ---

const LANGUAGE_CONFIG = {
  ca: { Flag: CatalanFlag, label: 'Català' },
  es: { Flag: SpanishFlag, label: 'Español' },
  en: { Flag: EnglishFlag, label: 'English' },
  fr: { Flag: FrenchFlag, label: 'Français' },
} as const;

type SupportedLocale = keyof typeof LANGUAGE_CONFIG;
const LOCALES = Object.keys(LANGUAGE_CONFIG);

// --- Component Principal ---

export default function LanguageSwitcher() {
  const currentLocale = useLocale() as SupportedLocale;
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Tancar al fer click fora
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const changeLanguage = (nextLocale: string) => {
    setIsOpen(false);

    // Obtenir la ruta actual sense el prefix de locale
    const currentPath = window.location.pathname;

    // Treure el prefix de locale de la ruta actual
    let pathWithoutLocale = currentPath;
    for (const loc of LOCALES) {
      if (currentPath === `/${loc}` || currentPath.startsWith(`/${loc}/`)) {
        pathWithoutLocale = currentPath.slice(`/${loc}`.length) || '/';
        break;
      }
    }

    // Construir la nova ruta (tots els idiomes tenen prefix)
    const newPath = `/${nextLocale}${pathWithoutLocale === '/' ? '' : pathWithoutLocale}`;

    // Navegar
    window.location.href = newPath;
  };

  const CurrentFlag = LANGUAGE_CONFIG[currentLocale]?.Flag;

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="language"
        aria-expanded={isOpen}
        className="flex items-center justify-center w-10 h-10 rounded-md hover:bg-brand-dark/10 dark:hover:bg-white/10 transition-colors outline-none focus-visible:ring-2 focus-visible:ring-brand-red"
      >
        {CurrentFlag && <CurrentFlag className="w-6 h-4 rounded-[2px] shadow-sm border border-black/10" />}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-44 bg-white/95 dark:bg-brand-dark/95 backdrop-blur-md rounded-lg border border-brand-dark/10 dark:border-white/10 shadow-xl p-1.5 z-50">
          {Object.entries(LANGUAGE_CONFIG).map(([key, config]) => {
            const langKey = key as SupportedLocale;
            const { Flag, label } = config;
            const isActive = langKey === currentLocale;

            return (
              <button
                key={langKey}
                onClick={() => changeLanguage(langKey)}
                className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium flex items-center gap-3 transition-colors ${
                  isActive
                    ? 'text-brand-red bg-brand-red/10 font-bold'
                    : 'text-gray-600 dark:text-brand-grey hover:text-brand-dark hover:bg-brand-dark/5 dark:hover:text-white dark:hover:bg-white/5'
                }`}
              >
                <Flag className="w-6 h-4 rounded-[2px] shadow-sm border border-black/10 flex-shrink-0" />
                <span className="leading-none">{label}</span>
                {isActive && (
                  <span className="ml-auto w-1.5 h-1.5 rounded-full bg-brand-red" />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
