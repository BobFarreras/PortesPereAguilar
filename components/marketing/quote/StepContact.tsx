'use client';

import React from 'react';
import { useTranslations } from 'next-intl';

interface StepContactProps {
  errors: Record<string, string | undefined>;
  onBlur: (name: string, value: string) => void;
}

export default function StepContact({ errors, onBlur }: StepContactProps) {
  const t = useTranslations('quote.steps.contact');

  const inputClasses = "peer w-full bg-transparent border-b px-0 py-3 text-gray-900 dark:text-white placeholder-transparent focus:outline-none transition-colors";
  const borderNormal = "border-gray-300 dark:border-white/20";
  const borderError = "border-red-500 dark:border-red-400";
  const labelClasses = "absolute left-0 top-3 text-gray-500 dark:text-brand-grey text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-xs peer-focus:text-brand-red cursor-text";

  return (
    <div className="flex flex-col gap-6">
      <div className="text-center mb-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{t('title')}</h2>
        <p className="text-gray-500 dark:text-brand-grey">{t('subtitle')}</p>
      </div>

      <div className="bg-white dark:bg-white/[0.03] border border-gray-200 dark:border-white/10 p-8 rounded-2xl">
        <div className="flex flex-col gap-6">
          {/* Nom */}
          <div className="relative">
            <input
              type="text"
              name="name"
              id="quote-name"
              required
              onBlur={(e) => onBlur('name', e.target.value)}
              className={`${inputClasses} ${errors.name ? borderError : borderNormal} focus:border-brand-red`}
              placeholder={t('name')}
            />
            <label htmlFor="quote-name" className={labelClasses}>
              {t('name')}
            </label>
            {errors.name && (
              <p className="text-red-500 dark:text-red-400 text-xs mt-1">{errors.name}</p>
            )}
          </div>

          {/* Email */}
          <div className="relative">
            <input
              type="email"
              name="email"
              id="quote-email"
              required
              onBlur={(e) => onBlur('email', e.target.value)}
              className={`${inputClasses} ${errors.email ? borderError : borderNormal} focus:border-brand-red`}
              placeholder={t('email')}
            />
            <label htmlFor="quote-email" className={labelClasses}>
              {t('email')}
            </label>
            {errors.email && (
              <p className="text-red-500 dark:text-red-400 text-xs mt-1">{errors.email}</p>
            )}
          </div>

          {/* Telèfon */}
          <div className="relative">
            <input
              type="tel"
              name="phone"
              id="quote-phone"
              required
              onBlur={(e) => onBlur('phone', e.target.value)}
              className={`${inputClasses} ${errors.phone ? borderError : borderNormal} focus:border-brand-red`}
              placeholder={t('phone')}
            />
            <label htmlFor="quote-phone" className={labelClasses}>
              {t('phone')}
            </label>
            {errors.phone && (
              <p className="text-red-500 dark:text-red-400 text-xs mt-1">{errors.phone}</p>
            )}
          </div>

          {/* Missatge */}
          <div className="relative">
            <textarea
              name="message"
              id="quote-message"
              rows={3}
              onBlur={(e) => onBlur('message', e.target.value)}
              className={`${inputClasses} border-gray-300 dark:border-white/20 focus:border-brand-red resize-none`}
              placeholder={t('message')}
            />
            <label htmlFor="quote-message" className={labelClasses}>
              {t('message')}
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
