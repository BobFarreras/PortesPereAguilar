// components/marketing/SolutionsGrid.tsx
'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';
import { useTranslations } from 'next-intl';
import DoorCard from '@/components/doors/DoorCard';
import { SERVICES_DATA } from '@/lib/constants';

export default function SolutionsGrid() {
  const t = useTranslations('solutions');

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 24 }
    },
  };

  return (
    <section className="relative w-full bg-white dark:bg-brand-dark py-24 px-6">

      <div className="max-w-7xl mx-auto">

        {/* Capçalera de la Secció */}
        <div className="mb-16 text-center md:text-left">
          <motion.h2
            className="text-3xl md:text-5xl font-black text-brand-dark dark:text-white mb-4"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            {t('title').split(' ').slice(0, -1).join(' ')} <span className="text-brand-red">{t('title').split(' ').slice(-1)}</span>
          </motion.h2>
          <motion.p
            className="text-brand-dark/70 dark:text-brand-grey max-w-2xl text-lg"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {t('description')}
          </motion.p>
        </div>

        {/* Graella de Targetes Animades */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {SERVICES_DATA.map((service) => (
            <motion.div key={service.id} variants={itemVariants} className="h-full">
              <DoorCard
                service={service}
                title={t(`servicesList.${service.translationKey}.title`)}
                description={t(`servicesList.${service.translationKey}.description`)}
              />
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
