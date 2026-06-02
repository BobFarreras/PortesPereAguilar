// components/marketing/TrustSection.tsx
'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';

const TRUST_DATA = [
  {
    id: 1,
    metric: '+30',
    title: "Anys d'Experiència",
    description: "Tres dècades perfeccionant l'art de la serralleria i l'enginyeria metàl·lica de precisió.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-brand-red" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    id: 2,
    metric: '+2000',
    title: "Projectes Realitzats",
    description: "Des de portes residencials fins a estructures industrials complexes, garantint un funcionament impecable.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-brand-red" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
  },
  {
    id: 3,
    metric: '100%',
    title: "Garantia de Qualitat",
    description: "Utilitzem materials nobles i automatismes d'alta gamma per oferir tancaments infranquejables i segurs.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-brand-red" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  }
];

export default function TrustSection() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
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
    <section className="relative w-full border-t border-white/5 bg-gradient-to-b from-brand-dark to-black py-24 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Capçalera */}
        <div className="mb-20 text-center">
          <motion.h2 
            className="text-3xl md:text-5xl font-black text-white mb-4"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            Confiança i <span className="text-brand-red">Precisió</span>
          </motion.h2>
          <motion.p 
            className="text-brand-grey max-w-2xl mx-auto text-lg"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            No només fabriquem estructures metàl·liques, creem solucions perdurables avalades per la nostra trajectòria i compromís tecnològic.
          </motion.p>
        </div>

        {/* Graella de Confiança */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {TRUST_DATA.map((item) => (
            <motion.div 
              key={item.id} 
              variants={itemVariants}
              className="flex flex-col items-center text-center p-6 rounded-2xl bg-white/[0.02] border border-white/5 backdrop-blur-sm hover:border-brand-red/30 transition-colors duration-300"
            >
              <div className="mb-6 p-4 rounded-full bg-brand-red/10">
                {item.icon}
              </div>
              <h3 className="text-5xl font-black text-white mb-2 tracking-tight">
                {item.metric}
              </h3>
              <h4 className="text-xl font-bold text-brand-red mb-4">
                {item.title}
              </h4>
              <p className="text-brand-grey">
                {item.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Detall Visual de Fons (Línies làser) */}
      <div className="absolute left-0 right-0 top-1/2 h-[1px] bg-gradient-to-r from-transparent via-brand-red/10 to-transparent pointer-events-none -z-0" />
    </section>
  );
}