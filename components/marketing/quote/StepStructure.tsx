'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { STRUCTURE_TYPES } from '@/lib/constants/quoteOptions';

interface StepStructureProps {
  selected: string | null;
  onSelect: (value: string) => void;
}

export default function StepStructure({ selected, onSelect }: StepStructureProps) {
  const t = useTranslations('quote.steps.structure');

  return (
    <div className="flex flex-col gap-6">
      <div className="text-center mb-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{t('title')}</h2>
        <p className="text-gray-500 dark:text-brand-grey">{t('subtitle')}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {STRUCTURE_TYPES.map((type) => (
          <button
            key={type.id}
            type="button"
            onClick={() => onSelect(type.id)}
            className={`group relative flex flex-col items-center gap-3 rounded-2xl border-2 transition-all duration-200 cursor-pointer overflow-hidden ${
              selected === type.id
                ? 'border-brand-red shadow-lg'
                : 'border-gray-200 dark:border-white/10 hover:border-gray-300 dark:hover:border-white/20'
            }`}
          >
            {/* Imatge */}
            <div className="relative w-full h-48 bg-gray-100 dark:bg-white/5">
              <Image
                src={type.imageUrl}
                alt={t(`options.${type.translationKey}`)}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>

            {/* Text */}
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <span className="text-lg font-semibold text-white">
                {t(`options.${type.translationKey}`)}
              </span>
            </div>

            {/* Indicador seleccionat */}
            {selected === type.id && (
              <div className="absolute top-3 right-3 w-6 h-6 bg-brand-red rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
