'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { MATERIALS, FINISHES, RAL_COLORS } from '@/lib/constants/quoteOptions';

interface StepColorsProps {
  material: string | null;
  finish: string | null;
  ralColor: string | null;
  onMaterialChange: (value: string) => void;
  onFinishChange: (value: string) => void;
  onRalColorChange: (value: string | null) => void;
}

export default function StepColors({
  material,
  finish,
  ralColor,
  onMaterialChange,
  onFinishChange,
  onRalColorChange,
}: StepColorsProps) {
  const t = useTranslations('quote.steps.colors');

  return (
    <div className="flex flex-col gap-8">
      <div className="text-center mb-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{t('title')}</h2>
        <p className="text-gray-500 dark:text-brand-grey">{t('subtitle')}</p>
      </div>

      {/* Material */}
      <div className="flex flex-col gap-3">
        <label className="text-sm font-semibold text-gray-900 dark:text-white">{t('material')}</label>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {MATERIALS.map((m) => (
            <button
              key={m.id}
              type="button"
              onClick={() => onMaterialChange(m.id)}
              className={`py-3 px-4 rounded-xl border-2 text-sm font-medium transition-all cursor-pointer ${
                material === m.id
                  ? 'border-brand-red bg-brand-red/5 dark:bg-brand-red/10 text-brand-red'
                  : 'border-gray-200 dark:border-white/10 hover:border-gray-300 dark:hover:border-white/20 text-gray-700 dark:text-brand-grey'
              }`}
            >
              {t(`materialOptions.${m.translationKey}`)}
            </button>
          ))}
        </div>
      </div>

      {/* Acabat */}
      <div className="flex flex-col gap-3">
        <label className="text-sm font-semibold text-gray-900 dark:text-white">{t('finish')}</label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {FINISHES.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => onFinishChange(f.id)}
              className={`py-3 px-4 rounded-xl border-2 text-sm font-medium transition-all cursor-pointer ${
                finish === f.id
                  ? 'border-brand-red bg-brand-red/5 dark:bg-brand-red/10 text-brand-red'
                  : 'border-gray-200 dark:border-white/10 hover:border-gray-300 dark:hover:border-white/20 text-gray-700 dark:text-brand-grey'
              }`}
            >
              {t(`finishOptions.${f.translationKey}`)}
            </button>
          ))}
        </div>
      </div>

      {/* Colors RAL */}
      <div className="flex flex-col gap-3">
        <label className="text-sm font-semibold text-gray-900 dark:text-white">{t('ralColor')}</label>
        <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
          {RAL_COLORS.map((color) => (
            <button
              key={color.id}
              type="button"
              onClick={() => onRalColorChange(color.id)}
              className={`group flex flex-col items-center gap-2 p-3 rounded-xl border-2 transition-all cursor-pointer ${
                ralColor === color.id
                  ? 'border-brand-red shadow-lg'
                  : 'border-gray-200 dark:border-white/10 hover:border-gray-300 dark:hover:border-white/20'
              }`}
            >
              <div
                className="w-10 h-10 rounded-full border border-gray-200 dark:border-white/20 shadow-inner"
                style={{ backgroundColor: color.hex }}
              />
              <span className="text-xs font-medium text-gray-600 dark:text-brand-grey group-hover:text-gray-900 dark:group-hover:text-white">
                {color.name}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
