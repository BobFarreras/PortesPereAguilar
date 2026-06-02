// app/cataleg/page.tsx
import React from 'react';
import { Metadata } from 'next';

import { SERVICES_DATA } from '@/lib/constants';
import CatalogView from '@/components/marketing/CatalogoView';

export const metadata: Metadata = {
  title: 'Catàleg de Solucions | Portes Pere Aguilar',
  description: 'Descobreix la nostra selecció de portes seccionals, basculants, corredisses i estructures metàl·liques amb la millor artesania d\'alta tecnologia.',
};

export default function CatalogPage() {
  return (
    <main className="min-h-screen bg-brand-dark pt-32 pb-24 px-6 relative">
      {/* Efecte de fons subtil */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-brand-red/5 to-transparent pointer-events-none -z-10" />
      
      <div className="max-w-7xl mx-auto">
        <CatalogView items={SERVICES_DATA} />
      </div>
    </main>
  );
}