// components/marketing/CatalogView.tsx
'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';
import DoorCard from '@/components/doors/DoorCard';
import { ServiceCategory } from '@/types';

interface CatalogViewProps {
  items: ServiceCategory[];
}

export default function CatalogView({ items }: CatalogViewProps) {
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
        <h1 className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tight">
          Catàleg de <span className="text-brand-red">Solucions</span>
        </h1>
        <p className="text-lg text-brand-grey max-w-2xl mx-auto">
          Explora la nostra gamma completa de portes, automatismes i estructures metàl·liques dissenyades a mesura per al teu projecte.
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
              <DoorCard service={service} />
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <div className="text-center py-20 bg-white/[0.02] border border-white/5 rounded-2xl">
          <p className="text-brand-grey text-lg">Actualment no hi ha productes disponibles.</p>
        </div>
      )}
    </div>
  );
}