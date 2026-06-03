'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { ACCESSORIES } from '@/lib/constants/quoteOptions';

interface StepAccessoriesProps {
  selected: string[];
  onToggle: (value: string) => void;
}

export default function StepAccessories({ selected, onToggle }: StepAccessoriesProps) {
  const t = useTranslations('quote.steps.accessories');

  return (
    <div className="flex flex-col gap-6">
      <div className="text-center mb-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{t('title')}</h2>
        <p className="text-gray-500 dark:text-brand-grey">{t('subtitle')}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {ACCESSORIES.map((acc) => {
          const isSelected = selected.includes(acc.id);
          return (
            <button
              key={acc.id}
              type="button"
              onClick={() => onToggle(acc.id)}
              className={`group flex items-center gap-4 p-5 rounded-2xl border-2 transition-all duration-200 text-left cursor-pointer ${
                isSelected
                  ? 'border-brand-red bg-brand-red/5 dark:bg-brand-red/10'
                  : 'border-gray-200 dark:border-white/10 hover:border-gray-300 dark:hover:border-white/20 bg-white dark:bg-white/[0.03]'
              }`}
            >
              <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-colors shrink-0 ${
                isSelected
                  ? 'border-brand-red bg-brand-red'
                  : 'border-gray-300 dark:border-white/20'
              }`}>
                {isSelected && (
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
              <div className="flex-1">
                <span className={`text-base font-semibold ${isSelected ? 'text-brand-red' : 'text-gray-900 dark:text-white'}`}>
                  {t(`options.${acc.translationKey}.title`)}
                </span>
                <p className="text-sm text-gray-500 dark:text-brand-grey mt-0.5">
                  {t(`options.${acc.translationKey}.description`)}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
