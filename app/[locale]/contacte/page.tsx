// app/[locale]/contacte/page.tsx
import React from 'react';
import { Metadata } from 'next';
import { use } from 'react';
import { setRequestLocale } from 'next-intl/server';
import ContactForm from '@/components/marketing/ContactForm';

export const metadata: Metadata = {
  title: 'Contacte | Portes Pere Aguilar',
  description: 'Demana pressupost per a la teva porta, automatisme o estructura metàl·lica a La Bisbal de l\'Empordà, Girona.',
};

export default function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = use(params);
  setRequestLocale(locale);

  return (
    <main className="min-h-screen bg-white dark:bg-brand-dark pt-32 pb-24 px-6 relative overflow-hidden">
      {/* Elements de fons (Il·luminació High-Tech) */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-red/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">

        {/* Informació a l'esquerra */}
        <div className="flex flex-col">
          <p className="text-brand-red text-sm font-bold tracking-widest uppercase mb-4">
            Parlem del teu projecte
          </p>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">
            Estem preparats per <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-red to-white">
              donar forma a la teva idea.
            </span>
          </h1>
          <p className="text-lg text-brand-grey mb-10 max-w-md">
            Des d&apos;una simple consulta fins a dissenys complexos d&apos;enginyeria estructural. El nostre equip t&apos;assessorarà sense compromís.
          </p>

          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-brand-red" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-brand-grey">Truca&apos;ns directament</p>
                <a href="tel:972640817" className="text-lg font-bold text-white hover:text-brand-red transition-colors outline-none focus-visible:text-brand-red">
                  972 64 08 17
                </a>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-brand-red" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-brand-grey">Visita&apos;ns a</p>
                <p className="text-lg font-bold text-white">
                  Carrer Aigüeta, 204 <br />
                  <span className="text-sm font-normal text-brand-grey">La Bisbal de l&apos;Empordà, Girona</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Formulari a la dreta */}
        <div className="flex justify-center lg:justify-end">
          <ContactForm />
        </div>

      </div>
    </main>
  );
}
