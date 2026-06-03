// components/marketing/CatalogView.tsx
'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';
import { useTranslations } from 'next-intl';
import DoorCard from '@/components/doors/DoorCard';
import { ServiceCategory } from '@/types';

interface CatalogViewProps {
  items: ServiceCategory[];
}

export default function CatalogView({ items }: CatalogViewProps) {
  const tCatalog = useTranslations('catalog');
  const tSolutions = useTranslations('solutions');

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 24 }
    },
  };

  return (
    <div className="w-full">
      {/* Capçalera del Catàleg */}
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white mb-4 tracking-tight">
          {tCatalog('title').split(' ').slice(0, -1).join(' ')} <span className="text-brand-red">{tCatalog('title').split(' ').slice(-1)}</span>
        </h1>
        <p className="text-lg text-gray-500 dark:text-brand-grey max-w-2xl mx-auto">
          {tCatalog('description')}
        </p>
      </motion.div>

      {/* Graella de Productes o Estat Buit */}
      {items.length > 0 ? (
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {items.map((service) => (
            <motion.div key={service.id} variants={itemVariants} className="h-full">
              <DoorCard
                service={service}
                title={tSolutions(`servicesList.${service.translationKey}.title`)}
                description={tSolutions(`servicesList.${service.translationKey}.description`)}
              />
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <div className="text-center py-20 bg-gray-50/50 dark:bg-white/[0.02] border border-gray-200 dark:border-white/5 rounded-2xl">
          <p className="text-gray-500 dark:text-brand-grey text-lg">{tCatalog('empty')}</p>
        </div>
      )}
    </div>
  );
}
