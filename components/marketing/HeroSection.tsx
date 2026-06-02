'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';
import MagicButton from '@/components/ui/MagicButton';

export default function HeroSection() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 24 }
    },
  };

  return (
    <section className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-brand-dark">
      {/* Efecte de fons radiant adaptat al Vermell Corporatiu */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-red/15 blur-[120px] rounded-full pointer-events-none" />

      <motion.div 
        className="relative z-10 flex max-w-5xl flex-col items-center px-6 text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.p 
          className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-brand-red"
          variants={itemVariants}
        >
          Artesania d&apos;Alta Tecnologia
        </motion.p>
        
        <motion.h1 
          className="mb-8 text-5xl font-black tracking-tight text-white md:text-7xl lg:text-8xl"
          variants={itemVariants}
        >
          Enginyeria en <br className="hidden md:block" />
          {/* Gradient ajustat al vermell corporatiu i blanc */}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-red to-white">
            cada tancament.
          </span>
        </motion.h1>

        <motion.p 
          className="mb-10 max-w-2xl text-lg text-brand-grey md:text-xl"
          variants={itemVariants}
        >
          Serralleria i estructures metàl·liques dissenyades amb precisió mil·limètrica. 
          Protegeix i eleva el teu espai amb materials de primera qualitat.
        </motion.p>

        <motion.div variants={itemVariants}>
          <MagicButton variant="primary" className="text-lg px-8 py-4">
            Demana el teu Pressupost
          </MagicButton>
        </motion.div>
      </motion.div>

      <motion.div 
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-brand-grey"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <span className="text-xs uppercase tracking-widest">Descobreix</span>
        <motion.div 
          animate={{ y: [0, 10, 0] }} 
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="h-6 w-[1px] bg-brand-grey"
        />
      </motion.div>
    </section>
  );
}