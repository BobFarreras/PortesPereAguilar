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

// Icones SVG per rotar a les característiques
const FEATURE_ICONS = [
  // 0: Enginyeria / Configuració
  <svg key="0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-brand-red">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.212 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>,
  // 1: Escut / Seguretat
  <svg key="1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-brand-red">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
  </svg>,
  // 2: Llamp / Velocitat
  <svg key="2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-brand-red">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
  </svg>,
  // 3: Medalla / Qualitat
  <svg key="3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-brand-red">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.745 3.745 0 013.296-1.043A3.745 3.745 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
  </svg>,
  // 4: Eina / Fabricació
  <svg key="4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-brand-red">
    <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 01-3.381.255l-.447-.32a2.548 2.548 0 01-.84-3.388l4.3-6.645M16.5 6.5l-1.449 1.449A4.473 4.473 0 0013.5 9c-1.23 0-2.418.498-3.275 1.38l-.366.373a.75.75 0 00.53 1.28h.003l.11-.004a3.013 3.013 0 012.22 1.04l.003.005 1.617 2.19a.75.75 0 00.94.237l.135-.059a.68.68 0 01.89.22l.008.01a.68.68 0 00.185.483l.004.005.75.983a.75.75 0 101.198-.912l-.75-.983-.004-.005a2.18 2.18 0 00-.59-1.535l-.015-.013a2.18 2.18 0 00-1.675-.524h-.003l-.108.004a3.013 3.013 0 01-2.22-1.04l-.003-.005-1.617-2.19a.75.75 0 00-.94-.237l-.135.059a.68.68 0 01-.89-.22l-.008-.01a.68.68 0 00-.185-.483l-.004-.005-.75-.983a.75.75 0 10-1.198.912l.75.983.004.005a2.18 2.18 0 00.59 1.535l.015.013a2.18 2.18 0 001.675.524h.003l.108-.004a3.013 3.013 0 012.22 1.04l.003.005z" />
  </svg>,
  // 5: Capes / Estructura
  <svg key="5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-brand-red">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
  </svg>,
];

// Dades del procés (keys per traducció)
const PROCESS_STEPS = ['consulta', 'enginyeria', 'fabricacio', 'instalacio'];

export default function ProductDetailView({ service }: ProductDetailViewProps) {
  const t = useTranslations('solutions');
  const tCommon = useTranslations('productDetail');

  const imagesToDisplay = service.gallery?.length ? service.gallery : [service.imageUrl];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.1 } as const,
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring' as const, stiffness: 300, damping: 24 },
    },
  };

  return (
    <div className="w-full">
      {/* Header: 2 Columnes — Imatge + Info */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start mb-20">
        {/* Esquerra: Carrusel */}
        <motion.div
          layoutId={`product-image-${service.slug}`}
          layout="position"
          className="relative overflow-hidden rounded-2xl"
          transition={{ type: 'spring', stiffness: 350, damping: 30 }}
        >
          <ImageCarousel
            images={imagesToDisplay}
            altPrefix={t(`servicesList.${service.translationKey}.title`)}
          />
        </motion.div>

        {/* Dreta: Contingut */}
        <motion.div
          className="flex flex-col pt-2"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 20, delay: 0.15 }}
        >
          <Link
            href="/cataleg"
            className="inline-flex items-center text-sm font-bold text-gray-500 dark:text-brand-grey hover:text-brand-red transition-colors mb-6 outline-none focus-visible:text-brand-red w-fit"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            {tCommon('backToCatalog')}
          </Link>

          <h1 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-4 tracking-tight">
            {t(`servicesList.${service.translationKey}.title`)}
          </h1>

          <div className="w-20 h-1.5 bg-brand-red mb-6 rounded-full" />

          <p className="text-lg md:text-xl text-gray-600 dark:text-brand-grey mb-8 leading-relaxed">
            {t(`servicesList.${service.translationKey}.description`)}
          </p>

          <Link href="/contacte" tabIndex={-1} className="self-start">
            <MagicButton className="px-8 py-4 text-base">
              {tCommon('requestQuote')}
            </MagicButton>
          </Link>

          {/* Teaser de característiques (Highlights) */}
          {service.features && service.features.length > 0 && (
            <div className="mt-8 pt-8 border-t border-gray-200 dark:border-white/10">
              <p className="text-xs font-bold text-gray-400 dark:text-brand-grey/60 uppercase tracking-widest mb-4">
                {tCommon('highlightsLabel')}
              </p>
              <div className="grid grid-cols-2 gap-3">
                {service.features.slice(0, 4).map((featureId, index) => (
                  <button
                    key={featureId}
                    onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
                    className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-white/[0.03] border border-gray-200 dark:border-white/5 hover:border-brand-red/30 hover:bg-brand-red/5 dark:hover:bg-brand-red/10 transition-all duration-300 text-left group"
                  >
                    <div className="shrink-0 w-8 h-8 rounded-lg bg-brand-red/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <div className="scale-75">{FEATURE_ICONS[index % FEATURE_ICONS.length]}</div>
                    </div>
                    <span className="text-sm font-semibold text-gray-700 dark:text-brand-grey group-hover:text-brand-red transition-colors line-clamp-2">
                      {t(`servicesList.${service.translationKey}.features.${featureId}.title`)}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      {service.features && service.features.length > 0 && (
        <motion.div
          className="flex flex-col items-center mb-16 cursor-pointer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
        >
          <span className="text-xs font-bold text-gray-400 dark:text-brand-grey/60 uppercase tracking-widest mb-3">
            {tCommon('scrollToExplore')}
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-brand-red">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" />
            </svg>
          </motion.div>
        </motion.div>
      )}

      {/* Secció: Característiques Tècniques */}
      {service.features && service.features.length > 0 && (
        <section id="features" className="mb-24 scroll-mt-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white mb-3">
              {tCommon('featuresTitle')}
            </h2>
            <p className="text-gray-500 dark:text-brand-grey mb-10 max-w-2xl">
              {tCommon('featuresSubtitle')}
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
          >
            {service.features.map((featureId, index) => (
              <motion.div
                key={featureId}
                variants={itemVariants}
                className="group relative overflow-hidden rounded-2xl bg-white dark:bg-white/[0.03] border border-gray-200 dark:border-white/10 p-8 hover:border-brand-red/40 hover:shadow-lg hover:shadow-brand-red/5 transition-all duration-500"
              >
                {/* Número de fons decoratiu */}
                <span className="absolute top-2 right-4 text-7xl font-black text-gray-100 dark:text-white/[0.04] leading-none select-none">
                  {String(index + 1).padStart(2, '0')}
                </span>

                <div className="relative z-10">
                  {/* Icona */}
                  <div className="w-12 h-12 rounded-xl bg-brand-red/10 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:bg-brand-red/20 transition-all duration-300">
                    {FEATURE_ICONS[index % FEATURE_ICONS.length]}
                  </div>

                  {/* Títol */}
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-3">
                    {t(`servicesList.${service.translationKey}.features.${featureId}.title`)}
                  </h3>

                  {/* Descripció — text base, no xs */}
                  <p className="text-base text-gray-600 dark:text-brand-grey leading-relaxed">
                    {t(`servicesList.${service.translationKey}.features.${featureId}.description`)}
                  </p>
                </div>

                {/* Línia decorativa hover */}
                <div className="absolute bottom-0 left-0 w-0 h-1 bg-brand-red group-hover:w-full transition-all duration-500 rounded-b-2xl" />
              </motion.div>
            ))}
          </motion.div>
        </section>
      )}

      {/* Fallback si no hi ha features */}
      {(!service.features || service.features.length === 0) && (
        <section className="mb-24">
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white mb-8">
            {tCommon('featuresTitle')}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-gray-50 dark:bg-white/[0.02] border border-gray-200 dark:border-white/5 p-8 rounded-2xl">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{tCommon('fallback.premiumTitle')}</h3>
              <p className="text-base text-gray-600 dark:text-brand-grey leading-relaxed">{tCommon('fallback.premiumDescription')}</p>
            </div>
            <div className="bg-gray-50 dark:bg-white/[0.02] border border-gray-200 dark:border-white/5 p-8 rounded-2xl">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{tCommon('fallback.customTitle')}</h3>
              <p className="text-base text-gray-600 dark:text-brand-grey leading-relaxed">{tCommon('fallback.customDescription')}</p>
            </div>
          </div>
        </section>
      )}

      {/* Secció: El nostre procés */}
      <section id="process" className="mb-24 scroll-mt-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white mb-3">
            {tCommon('processTitle')}
          </h2>
          <p className="text-gray-500 dark:text-brand-grey max-w-2xl">
            {tCommon('processSubtitle')}
          </p>
        </motion.div>

        <div className="relative">
          {/* Línia connectora (desktop) */}
          <div className="hidden lg:block absolute top-8 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-brand-red/30 to-transparent" />

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
          >
            {PROCESS_STEPS.map((stepKey, index) => (
              <motion.div
                key={stepKey}
                variants={itemVariants}
                className="relative flex flex-col items-center text-center"
              >
                {/* Cercle amb número */}
                <div className="relative z-10 w-16 h-16 rounded-full bg-brand-red flex items-center justify-center mb-6 shadow-lg shadow-brand-red/30">
                  <span className="text-xl font-black text-white">{index + 1}</span>
                </div>

                {/* Contingut */}
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                  {tCommon(`process.${stepKey}.title`)}
                </h3>
                <p className="text-sm text-gray-500 dark:text-brand-grey leading-relaxed max-w-xs">
                  {tCommon(`process.${stepKey}.description`)}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Final */}
      <motion.section
        className="text-center py-16 px-8 rounded-3xl bg-gradient-to-br from-gray-50 to-white dark:from-white/[0.02] dark:to-white/[0.05] border border-gray-200 dark:border-white/10 mb-8"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white mb-4">
          {tCommon('ctaTitle')}
        </h2>
        <p className="text-gray-500 dark:text-brand-grey mb-8 max-w-xl mx-auto">
          {tCommon('ctaDescription')}
        </p>
        <Link href="/contacte" tabIndex={-1}>
          <MagicButton className="px-10 py-4 text-lg">
            {tCommon('requestQuote')}
          </MagicButton>
        </Link>
      </motion.section>
    </div>
  );
}
