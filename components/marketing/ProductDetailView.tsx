'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import MagicButton from '@/components/ui/MagicButton';
import ImageCarousel from '@/components/ui/ImageCarousel';
import { ServiceCategory } from '@/types';

interface ProductDetailViewProps {
  service: ServiceCategory;
}

export default function ProductDetailView({ service }: ProductDetailViewProps) {
  const t = useTranslations('solutions');
  const tCommon = useTranslations('productDetail');

  const imagesToDisplay = service.gallery?.length ? service.gallery : [service.imageUrl];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
      {/* Columna: Carrusel d'Imatges */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
      >
        <ImageCarousel images={imagesToDisplay} altPrefix={t(`servicesList.${service.translationKey}.title`)} />
      </motion.div>

      {/* Columna: Contingut Enriquit */}
      <motion.div
        className="flex flex-col"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.2 }}
      >
        <Link
          href="/cataleg"
          className="inline-flex items-center text-sm font-bold text-gray-500 dark:text-brand-grey hover:text-brand-red transition-colors mb-8 outline-none focus-visible:text-brand-red w-fit"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          {tCommon('backToCatalog')}
        </Link>

        <h1 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-6 tracking-tight">
          {t(`servicesList.${service.translationKey}.title`)}
        </h1>

        <div className="w-20 h-1 bg-brand-red mb-8 rounded-full" />

        <p className="text-lg text-gray-500 dark:text-brand-grey mb-10 leading-relaxed">
          {t(`servicesList.${service.translationKey}.description`)}
        </p>

        {/* Llistat de Característiques Tècniques */}
        {service.features && service.features.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
            {service.features.map((featureId) => (
              <div key={featureId} className="bg-white/[0.02] border border-white/5 p-5 rounded-xl backdrop-blur-sm hover:border-brand-red/30 transition-colors duration-300">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-2 h-2 rounded-full bg-brand-red" />
                  <p className="text-gray-900 dark:text-white font-bold text-sm uppercase tracking-wide">
                    {t(`servicesList.${service.translationKey}.features.${featureId}.title`)}
                  </p>
                </div>
                <p className="text-xs text-gray-500 dark:text-brand-grey leading-relaxed">
                  {t(`servicesList.${service.translationKey}.features.${featureId}.description`)}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Fallback visual si no hi ha features */}
        {(!service.features || service.features.length === 0) && (
          <div className="grid grid-cols-2 gap-6 mb-12">
            <div className="bg-gray-50 dark:bg-white/[0.02] border border-gray-200 dark:border-white/5 p-4 rounded-xl backdrop-blur-sm">
              <p className="text-brand-red font-bold mb-1">{tCommon('fallback.premiumTitle')}</p>
              <p className="text-xs text-gray-500 dark:text-brand-grey">{tCommon('fallback.premiumDescription')}</p>
            </div>
            <div className="bg-gray-50 dark:bg-white/[0.02] border border-gray-200 dark:border-white/5 p-4 rounded-xl backdrop-blur-sm">
              <p className="text-brand-red font-bold mb-1">{tCommon('fallback.customTitle')}</p>
              <p className="text-xs text-gray-500 dark:text-brand-grey">{tCommon('fallback.customDescription')}</p>
            </div>
          </div>
        )}

        <Link href="/contacte" tabIndex={-1}>
          <MagicButton className="w-full sm:w-auto px-8 py-4 text-lg">
            {tCommon('requestQuote')}
          </MagicButton>
        </Link>
      </motion.div>
    </div>
  );
}
