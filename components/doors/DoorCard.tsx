// components/doors/DoorCard.tsx
'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ServiceCategory } from '@/types';

interface DoorCardProps {
  service: ServiceCategory;
}

export default function DoorCard({ service }: DoorCardProps) {
  return (
    <Link href={`/cataleg/${service.slug}`} className="block outline-none group">
      <motion.div 
        className="relative overflow-hidden rounded-2xl bg-brand-dark border border-white/5 shadow-lg flex flex-col h-full"
        whileHover={{ 
          y: -10, 
          borderColor: 'rgba(227, 65, 51, 0.4)', // brand-red
          boxShadow: '0 20px 40px -15px rgba(227, 65, 51, 0.2)' 
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        {/* Contenidor de la Imatge amb Zoom Interior */}
        <div className="relative h-64 w-full overflow-hidden bg-brand-grey/10">
          <Image
            src={service.imageUrl}
            alt={`Imatge de ${service.title}`}
            fill
            className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {/* Capa de degradat fosc per integrar la imatge amb la targeta */}
          <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-transparent to-transparent opacity-80" />
        </div>

        {/* Contingut Textual (Glassmorphism Effect) */}
        <div className="relative p-6 flex flex-col flex-grow backdrop-blur-sm">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xl font-bold text-white group-hover:text-brand-red transition-colors duration-300">
              {service.title}
            </h3>
            {/* Icona de Fletxa que es mou al fer hover */}
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5 text-brand-grey transform transition-transform duration-300 group-hover:translate-x-1 group-hover:text-brand-red" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </div>
          
          <p className="text-sm text-brand-grey line-clamp-3">
            {service.description}
          </p>
        </div>
      </motion.div>
    </Link>
  );
}