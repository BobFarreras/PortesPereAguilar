'use client';

import React, { useState } from 'react';
import LocaleLink from '@/components/ui/LocaleLink';
import Image from 'next/image';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import LanguageSwitcher from '@/components/ui/LanguageSwitcher';
import ThemeToggle from '@/components/ui/ThemeToggle';
import { useTranslations } from 'next-intl';

export default function Navbar() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const t = useTranslations('navbar');

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        isScrolled ? 'bg-white/80 dark:bg-brand-dark/80 backdrop-blur-md border-b border-brand-dark/10 dark:border-white/10 shadow-lg' : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
          {/* Logotip */}
          <LocaleLink href="/" className="relative flex items-center gap-2 outline-none focus-visible:ring-2 focus-visible:ring-brand-red rounded-md">
            <div className="relative w-48 h-12">
              <Image 
                src="/logo.webp" 
                alt={t('home')} 
                fill
                className="object-contain"
                priority
              />
            </div>
          </LocaleLink>

          {/* Enllaços de Navegació */}
          <nav className="hidden md:flex items-center gap-8">
            <LocaleLink href="/" className="text-sm font-medium text-brand-dark/70 dark:text-brand-grey hover:text-brand-dark dark:hover:text-white transition-colors outline-none focus-visible:text-brand-red">
              {t('home')}
            </LocaleLink>
            <LocaleLink href="/cataleg" className="text-sm font-medium text-brand-dark/70 dark:text-brand-grey hover:text-brand-dark dark:hover:text-white transition-colors outline-none focus-visible:text-brand-red">
              {t('catalog')}
            </LocaleLink>
            <LocaleLink href="/contacte" className="text-sm font-medium text-brand-dark/70 dark:text-brand-grey hover:text-brand-dark dark:hover:text-white transition-colors outline-none focus-visible:text-brand-red">
              {t('contact')}
            </LocaleLink>
          </nav>

          {/* Accions: Idioma + Tema */}
          <div className="flex items-center gap-4">
            <LanguageSwitcher />
            <ThemeToggle />

            {/* Menú Mòbil */}
            <button className="md:hidden text-brand-dark dark:text-white p-2 focus:outline-none" aria-label="Obrir menú">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            </button>
          </div>
      </div>
    </motion.header>
  );
}