'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';
import { useTranslations } from 'next-intl';

export default function HeroSection() {
  const t = useTranslations('hero');

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.5,
      },
    },
  };

  const lineVariants: Variants = {
    hidden: { scaleY: 0 },
    visible: {
      scaleY: 1,
      transition: { duration: 1, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const subtitleVariants: Variants = {
    hidden: { opacity: 0, x: -30, filter: 'blur(8px)' },
    visible: {
      opacity: 1,
      x: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const titleVariants: Variants = {
    hidden: { opacity: 0, y: 50, filter: 'blur(10px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 1, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const descVariants: Variants = {
    hidden: { opacity: 0, y: 30, filter: 'blur(6px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section className="group/hero relative h-screen w-full overflow-hidden bg-black">
      {/* Video de fons — sempre visible, sense poster */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        src="/videos/hero-youtube.mp4"
      />

      {/* Overlay base per llegibilitat */}
      <div className="absolute inset-0 bg-black/30 transition-all duration-700 group-hover/hero:bg-black/50" />

      {/* Gradient esquerre — reforçat amb hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent transition-all duration-700 group-hover/hero:from-black/80 group-hover/hero:via-black/40" />

      {/* Contingut — alineat a l'esquerra */}
      <div className="relative z-10 h-full flex flex-col justify-center px-8 md:px-16 lg:px-24 max-w-7xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col gap-6"
        >
          {/* Línia vertical vermella */}
          <motion.div
            className="w-[3px] h-20 bg-brand-red origin-top"
            variants={lineVariants}
          />

          {/* Subtítol */}
          <motion.p
            className="text-sm md:text-base font-bold uppercase tracking-[0.35em] text-brand-red"
            variants={subtitleVariants}
          >
            {t('subtitle')}
          </motion.p>

          {/* Títol — més gran */}
          <motion.h1
            className="text-5xl md:text-7xl lg:text-8xl xl:text-[7rem] font-black text-white leading-[0.85] tracking-tight"
            variants={titleVariants}
          >
            {t('title.part1')}
            <br />
            <span className="text-white/90">{t('title.part2')}</span>
          </motion.h1>

          {/* Descripció — més gran i llegible */}
          <motion.p
            className="max-w-xl text-lg md:text-xl lg:text-2xl text-white/80 leading-relaxed font-medium"
            variants={descVariants}
          >
            {t('description')}
          </motion.p>
        </motion.div>
      </div>

      {/* Indicador de scroll */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center opacity-0 group-hover/hero:opacity-100 transition-opacity duration-500"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 text-white/50"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}
