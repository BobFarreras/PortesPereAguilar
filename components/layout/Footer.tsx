// components/layout/Footer.tsx
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-gray-100 dark:bg-black border-t border-brand-dark/5 dark:border-white/5 pt-16 pb-8 px-6">
      <div className="max-w-7xl mx-auto">
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          {/* Columna 1: Marca i Descripció */}
          <div className="flex flex-col">
            <Link href="/" className="relative w-48 h-12 mb-6 outline-none focus-visible:ring-2 focus-visible:ring-brand-red rounded-md block">
              <Image 
                src="/logo.webp" 
                alt="Logotip Portes Pere Aguilar" 
                fill
                className="object-contain object-left"
              />
            </Link>
            <p className="text-brand-grey text-sm leading-relaxed max-w-sm">
              Artesania d&apos;alta tecnologia en estructures metàl·liques i portes industrials o residencials. 
              Garantim seguretat, disseny i precisió en cada tancament.
            </p>
          </div>

          {/* Columna 2: Enllaços Ràpids */}
          <div className="flex flex-col">
            <h4 className="text-brand-dark dark:text-white font-bold mb-6 tracking-wide uppercase text-sm">Explora</h4>
            <nav className="flex flex-col gap-4">
              <Link href="/cataleg" className="text-brand-grey hover:text-brand-red transition-colors text-sm w-fit outline-none focus-visible:text-brand-red">
                Catàleg de Portes
              </Link>
              <Link href="/serveis" className="text-brand-grey hover:text-brand-red transition-colors text-sm w-fit outline-none focus-visible:text-brand-red">
                Estructures Metàl·liques
              </Link>
              <Link href="/contacte" className="text-brand-grey hover:text-brand-red transition-colors text-sm w-fit outline-none focus-visible:text-brand-red">
                Demanar Pressupost
              </Link>
            </nav>
          </div>

          {/* Columna 3: Contacte */}
          <div className="flex flex-col">
            <h4 className="text-brand-dark dark:text-white font-bold mb-6 tracking-wide uppercase text-sm">Contacte</h4>
            <address className="not-italic flex flex-col gap-4 text-sm text-brand-grey">
              <div className="flex items-start gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-brand-red shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>17100 La Bisbal de l’Empordà -Girona  ( Carrer Aigüeta, 204 )</span>
              </div>
              <a href="mailto:info@portespereaguilar.com" className="flex items-center gap-3 hover:text-brand-dark dark:hover:text-white transition-colors outline-none focus-visible:text-brand-red w-fit">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-brand-red shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                info@portespereaguilar.com
              </a>
              <a href="tel:+34900000000" className="flex items-center gap-3 hover:text-brand-dark dark:hover:text-white transition-colors outline-none focus-visible:text-brand-red w-fit">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-brand-red shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                972 64 08 17
              </a>
            </address>
          </div>
        </div>

        {/* Separador i Copyright */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-brand-grey/60">
            © {currentYear} Portes Pere Aguilar. Tots els drets reservats.
          </p>
          <div className="flex gap-4">
            <Link href="/avis-legal" className="text-xs text-brand-grey/60 hover:text-brand-grey transition-colors outline-none focus-visible:text-brand-red">
              Avís Legal
            </Link>
            <Link href="/privacitat" className="text-xs text-brand-grey/60 hover:text-brand-grey transition-colors outline-none focus-visible:text-brand-red">
              Política de Privacitat
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}