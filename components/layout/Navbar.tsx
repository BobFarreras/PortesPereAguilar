'use client';

import React, { useState } from 'react';
import LocaleLink from '@/components/ui/LocaleLink';
import Image from 'next/image';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import LanguageSwitcher from '@/components/ui/LanguageSwitcher';
import ThemeToggle from '@/components/ui/ThemeToggle';
import { useTranslations } from 'next-intl';

export default function Navbar() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const t = useTranslations('navbar');

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  const navLinks = [
    { href: '/', label: t('home') },
    { href: '/cataleg', label: t('catalog') },
    { href: '/pressupost', label: t('quote') },
    { href: '/contacte', label: t('contact') },
  ];

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

          {/* Enllaços de Navegació — Desktop */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map(link => (
              <LocaleLink key={link.href} href={link.href} className="text-sm font-medium text-brand-dark/70 dark:text-brand-grey hover:text-brand-dark dark:hover:text-white transition-colors outline-none focus-visible:text-brand-red">
                {link.label}
              </LocaleLink>
            ))}
          </nav>

          {/* Accions: Idioma + Tema + Menú Mòbil */}
          <div className="flex items-center gap-4">
            <LanguageSwitcher />
            <ThemeToggle />

            {/* Botó Menú Mòbil */}
            <button
              className="md:hidden text-brand-dark dark:text-white p-2 focus:outline-none"
              aria-label="Obrir menú"
              onClick={() => setIsMobileOpen(!isMobileOpen)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                {isMobileOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                )}
              </svg>
            </button>
          </div>
      </div>

      {/* Menú Mòbil — Dropdown */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-white/95 dark:bg-brand-dark/95 backdrop-blur-md border-b border-brand-dark/10 dark:border-white/10 overflow-hidden"
          >
            <div className="flex flex-col px-6 py-4 gap-1">
              {navLinks.map(link => (
                <LocaleLink
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileOpen(false)}
                  className="py-3 px-4 text-sm font-medium text-brand-dark/70 dark:text-brand-grey hover:text-brand-dark dark:hover:text-white hover:bg-brand-dark/5 dark:hover:bg-white/5 rounded-lg transition-colors"
                >
                  {link.label}
                </LocaleLink>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
