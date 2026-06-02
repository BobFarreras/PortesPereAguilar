'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import MagicButton from '@/components/ui/MagicButton';

export default function Navbar() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        isScrolled ? 'bg-brand-dark/80 backdrop-blur-md border-b border-white/10 shadow-lg' : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* Logotip */}
        <Link href="/" className="relative flex items-center gap-2 outline-none focus-visible:ring-2 focus-visible:ring-brand-red rounded-md">
          <div className="relative w-48 h-12">
            <Image 
              src="/logo.webp" 
              alt="Logotip Portes Pere Aguilar" 
              fill
              className="object-contain"
              priority
            />
          </div>
        </Link>

        {/* Enllaços de Navegació */}
        <nav className="hidden md:flex items-center gap-8">
          <Link href="/" className="text-sm font-medium text-brand-grey hover:text-white transition-colors outline-none focus-visible:text-brand-red">
            Inici
          </Link>
          <Link href="/cataleg" className="text-sm font-medium text-brand-grey hover:text-white transition-colors outline-none focus-visible:text-brand-red">
            Catàleg
          </Link>
          <Link href="/serveis" className="text-sm font-medium text-brand-grey hover:text-white transition-colors outline-none focus-visible:text-brand-red">
            Estructures
          </Link>
        </nav>

        {/* Accions: Idioma + CTA */}
        <div className="flex items-center gap-4">
          
          {/* Selector d'Idioma (Placeholder Funcional per i18n) */}
          <button 
            aria-label="Canviar idioma"
            className="flex items-center justify-center w-8 h-8 rounded-md text-xs font-bold text-brand-grey hover:text-white hover:bg-white/10 transition-colors outline-none focus-visible:ring-2 focus-visible:ring-brand-red"
          >
            CA
          </button>

          <Link href="/contacte" tabIndex={-1}>
            <MagicButton variant="primary" className="hidden md:block py-2 px-4 text-sm bg-brand-red/90 hover:bg-brand-red">
              Contactar
            </MagicButton>
          </Link>
          
          {/* Menú Mòbil */}
          <button className="md:hidden text-white p-2 focus:outline-none" aria-label="Obrir menú">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>
        </div>
      </div>
    </motion.header>
  );
}