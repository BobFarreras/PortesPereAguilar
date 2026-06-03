// components/marketing/ContactForm.tsx
'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import MagicButton from '@/components/ui/MagicButton';
import { contactFormSchema, type ContactFormData } from '@/lib/validations/contact';

type FormErrors = Partial<Record<keyof ContactFormData, string>>;

export default function ContactForm() {
  const t = useTranslations('contact.form');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [serverError, setServerError] = useState<string | null>(null);

  const validateField = (name: string, value: string) => {
    const result = contactFormSchema.shape[name as keyof ContactFormData]?.safeParse(value);
    if (!result.success) {
      const key = result.error.issues[0]?.message ?? 'required';
      return t(`errors.${key}`);
    }
    return undefined;
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    setErrors(prev => {
      const next = { ...prev };
      if (error) {
        next[name as keyof ContactFormData] = error;
      } else {
        delete next[name as keyof ContactFormData];
      }
      return next;
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setServerError(null);

    const formData = new FormData(e.currentTarget);
    const raw = {
      name: formData.get('name') ?? '',
      email: formData.get('email') ?? '',
      phone: formData.get('phone') ?? '',
      message: formData.get('message') ?? '',
      honeypot: formData.get('website') ?? '',
    };

    const parsed = contactFormSchema.safeParse(raw);
    if (!parsed.success) {
      const fieldErrors: FormErrors = {};
      for (const issue of parsed.error.issues) {
        const field = issue.path[0] as keyof ContactFormData | undefined;
        if (field && !fieldErrors[field]) {
          fieldErrors[field] = t(`errors.${issue.message}`);
        }
      }
      setErrors(fieldErrors);
      return;
    }

    if (parsed.data.honeypot) {
      setIsSuccess(true);
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: parsed.data.name,
          email: parsed.data.email,
          phone: parsed.data.phone || undefined,
          message: parsed.data.message,
        }),
      });

      if (res.ok) {
        setIsSuccess(true);
      } else {
        const data = await res.json();
        setServerError(t(`errors.${data.errorKey ?? 'serverError'}`));
      }
    } catch {
      setServerError(t('errors.serverError'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClasses = "peer w-full bg-transparent border-b px-0 py-3 text-gray-900 dark:text-white placeholder-transparent focus:outline-none transition-colors";
  const borderNormal = "border-gray-300 dark:border-white/20";
  const borderError = "border-red-500 dark:border-red-400";
  const labelClasses = "absolute left-0 top-3 text-gray-500 dark:text-brand-grey text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-xs peer-focus:text-brand-red cursor-text";

  return (
    <div className="w-full max-w-xl relative">
      <AnimatePresence mode="wait">
        {!isSuccess ? (
          <motion.form
            key="form"
            data-testid="contact-form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4 }}
            onSubmit={handleSubmit}
            className="flex flex-col gap-6 bg-white dark:bg-white/[0.03] border border-gray-200 dark:border-white/10 p-8 rounded-2xl backdrop-blur-md shadow-2xl"
          >
            {/* Honeypot camp invisible */}
            <div className="absolute opacity-0 pointer-events-none h-0 overflow-hidden" aria-hidden="true">
              <label htmlFor="website">Noom</label>
              <input
                type="text"
                name="website"
                id="website"
                tabIndex={-1}
                autoComplete="off"
              />
            </div>

            {/* Input: Nom */}
            <div className="relative">
              <input
                type="text"
                name="name"
                id="name"
                required
                onBlur={handleBlur}
                className={`${inputClasses} ${errors.name ? borderError : borderNormal} focus:border-brand-red`}
                placeholder={t('name')}
              />
              <label htmlFor="name" className={labelClasses}>
                {t('name')}
              </label>
              {errors.name && (
                <p className="text-red-500 dark:text-red-400 text-xs mt-1">{errors.name}</p>
              )}
            </div>

            {/* Input: Email */}
            <div className="relative mt-2">
              <input
                type="email"
                name="email"
                id="email"
                required
                onBlur={handleBlur}
                className={`${inputClasses} ${errors.email ? borderError : borderNormal} focus:border-brand-red`}
                placeholder={t('email')}
              />
              <label htmlFor="email" className={labelClasses}>
                {t('email')}
              </label>
              {errors.email && (
                <p className="text-red-500 dark:text-red-400 text-xs mt-1">{errors.email}</p>
              )}
            </div>

            {/* Input: Telèfon */}
            <div className="relative mt-2">
              <input
                type="tel"
                name="phone"
                id="phone"
                onBlur={handleBlur}
                className={`${inputClasses} ${borderNormal} focus:border-brand-red`}
                placeholder={t('phone')}
              />
              <label htmlFor="phone" className={labelClasses}>
                {t('phone')}
              </label>
            </div>

            {/* Textarea: Missatge */}
            <div className="relative mt-2">
              <textarea
                name="message"
                id="message"
                required
                rows={4}
                onBlur={handleBlur}
                className={`${inputClasses} ${errors.message ? borderError : borderNormal} focus:border-brand-red resize-none`}
                placeholder={t('message')}
              />
              <label htmlFor="message" className={labelClasses}>
                {t('message')}
              </label>
              {errors.message && (
                <p className="text-red-500 dark:text-red-400 text-xs mt-1">{errors.message}</p>
              )}
            </div>

            {/* Error del servidor */}
            {serverError && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3 text-red-700 dark:text-red-300 text-sm">
                {serverError}
              </div>
            )}

            {/* Botó Submit */}
            <div className="mt-4">
              <MagicButton
                type="submit"
                disabled={isSubmitting}
                className="w-full flex justify-center items-center py-4 text-base"
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                    />
                    <span>{t('sending')}</span>
                  </div>
                ) : (
                  t('submit')
                )}
              </MagicButton>
            </div>
          </motion.form>
        ) : (
          /* Estat d'Èxit Animat */
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center text-center bg-white dark:bg-white/[0.03] border border-brand-red/30 p-12 rounded-2xl backdrop-blur-md shadow-2xl"
          >
            <div className="w-16 h-16 bg-brand-red/20 rounded-full flex items-center justify-center mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-brand-red" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{t('successTitle')}</h3>
            <p className="text-gray-500 dark:text-brand-grey">{t('successDescription')}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
