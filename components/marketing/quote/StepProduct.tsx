'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { PRODUCT_CATEGORIES, type ProductCategory } from '@/lib/constants/quoteOptions';

interface StepProductProps {
  selected: ProductCategory | null;
  onSelect: (value: ProductCategory) => void;
}

const CATEGORY_ICONS: Record<ProductCategory, string> = {
  portes: 'M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z',
  estructures: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4',
  automatismes: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z',
};

export default function StepProduct({ selected, onSelect }: StepProductProps) {
  const t = useTranslations('quote.steps.product');

  return (
    <div className="flex flex-col gap-6">
      <div className="text-center mb-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{t('title')}</h2>
        <p className="text-gray-500 dark:text-brand-grey">{t('subtitle')}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {PRODUCT_CATEGORIES.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => onSelect(cat)}
            className={`group relative flex flex-col items-center gap-4 p-8 rounded-2xl border-2 transition-all duration-200 cursor-pointer ${
              selected === cat
                ? 'border-brand-red bg-brand-red/5 dark:bg-brand-red/10 shadow-lg'
                : 'border-gray-200 dark:border-white/10 hover:border-gray-300 dark:hover:border-white/20 bg-white dark:bg-white/[0.03]'
            }`}
          >
            <div className={`w-16 h-16 rounded-full flex items-center justify-center transition-colors ${
              selected === cat
                ? 'bg-brand-red/20'
                : 'bg-gray-100 dark:bg-white/5 group-hover:bg-gray-200 dark:group-hover:bg-white/10'
            }`}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`w-8 h-8 ${selected === cat ? 'text-brand-red' : 'text-gray-500 dark:text-brand-grey group-hover:text-gray-700 dark:group-hover:text-white'}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={CATEGORY_ICONS[cat]} />
              </svg>
            </div>
            <span className={`text-lg font-semibold ${selected === cat ? 'text-brand-red' : 'text-gray-900 dark:text-white'}`}>
              {t(`options.${cat}`)}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
