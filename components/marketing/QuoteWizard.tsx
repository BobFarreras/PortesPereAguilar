'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { quoteFormSchema, type QuoteFormData } from '@/lib/validations/quote';
import { DIMENSION_LIMITS } from '@/lib/constants/quoteOptions';
import StepProduct from './quote/StepProduct';
import StepType from './quote/StepType';
import StepStructure from './quote/StepStructure';
import StepAutomation from './quote/StepAutomation';
import StepDimensions from './quote/StepDimensions';
import StepColors from './quote/StepColors';
import StepAccessories from './quote/StepAccessories';
import StepContact from './quote/StepContact';
import MagicButton from '@/components/ui/MagicButton';

type ProductCategory = 'portes' | 'estructures' | 'automatismes';

interface WizardData {
  product: ProductCategory | null;
  doorType: string | null;
  structureType: string | null;
  width: number;
  height: number;
  material: string | null;
  finish: string | null;
  ralColor: string | null;
  accessories: string[];
}

const TOTAL_STEPS = 6;

export default function QuoteWizard() {
  const t = useTranslations('quote');
  const [step, setStep] = useState(1);
  const [data, setData] = useState<WizardData>({
    product: null,
    doorType: null,
    structureType: null,
    width: DIMENSION_LIMITS.width.default,
    height: DIMENSION_LIMITS.height.default,
    material: null,
    finish: null,
    ralColor: null,
    accessories: [],
  });
  const [errors, setErrors] = useState<Record<string, string | undefined>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const updateData = (partial: Partial<WizardData>) => {
    setData(prev => ({ ...prev, ...partial }));
  };

  const canGoNext = () => {
    switch (step) {
      case 1: return data.product !== null;
      case 2: {
        if (data.product === 'portes') return data.doorType !== null;
        if (data.product === 'estructures') return data.structureType !== null;
        if (data.product === 'automatismes') return data.doorType !== null;
        return false;
      }
      case 3: return true;
      case 4: return data.material !== null && data.finish !== null;
      case 5: return true;
      case 6: return true;
      default: return false;
    }
  };

  const goNext = () => {
    if (canGoNext() && step < TOTAL_STEPS) {
      setErrors({});
      setStep(prev => prev + 1);
    }
  };

  const goPrev = () => {
    if (step > 1) {
      setErrors({});
      setStep(prev => prev - 1);
    }
  };

  const handleContactBlur = (name: string, value: string) => {
    const fieldSchema = quoteFormSchema.shape[name as keyof QuoteFormData];
    if (fieldSchema) {
      const result = fieldSchema.safeParse(value);
      if (!result.success) {
        const key = result.error.issues[0]?.message ?? 'required';
        setErrors(prev => ({ ...prev, [name]: t(`steps.contact.errors.${key}`) }));
      } else {
        setErrors(prev => {
          const next = { ...prev };
          delete next[name];
          return next;
        });
      }
    }
  };

  const handleSubmit = async (formData: FormData) => {
    setServerError(null);
    setErrors({});

    const raw = {
      product: data.product,
      doorType: data.doorType ?? undefined,
      structureType: data.structureType ?? undefined,
      width: data.width,
      height: data.height,
      material: data.material,
      finish: data.finish,
      ralColor: data.ralColor ?? undefined,
      accessories: data.accessories.length > 0 ? data.accessories : undefined,
      name: formData.get('name') ?? '',
      email: formData.get('email') ?? '',
      phone: formData.get('phone') ?? '',
      message: formData.get('message') ?? '',
      honeypot: formData.get('website') ?? '',
    };

    const parsed = quoteFormSchema.safeParse(raw);
    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        const field = issue.path[0] as string | undefined;
        if (field && !fieldErrors[field]) {
          fieldErrors[field] = t(`steps.contact.errors.${issue.message}`);
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
      const res = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(parsed.data),
      });

      if (res.ok) {
        setIsSuccess(true);
      } else {
        const data = await res.json();
        setServerError(t(`steps.contact.errors.${data.errorKey ?? 'serverError'}`));
      }
    } catch {
      setServerError(t('steps.contact.errors.serverError'));
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center text-center py-16"
      >
        <div className="w-20 h-20 bg-brand-red/20 rounded-full flex items-center justify-center mb-8">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-brand-red" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">{t('success.title')}</h2>
        <p className="text-lg text-gray-500 dark:text-brand-grey max-w-md">{t('success.description')}</p>
      </motion.div>
    );
  }

  const progressPercent = Math.round((step / TOTAL_STEPS) * 100);

  return (
    <div className="flex flex-col min-h-[600px]">
      {/* Barra de progrés */}
      <div className="flex flex-col gap-3 mb-6">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-gray-500 dark:text-brand-grey">
            Pas {step} de {TOTAL_STEPS}
          </span>
          <span className="text-sm font-medium text-brand-red">
            {progressPercent}%
          </span>
        </div>
        <div className="h-2 bg-gray-200 dark:bg-white/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-brand-red rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          />
        </div>
      </div>

      {/* Contingut del pas (scrollable) */}
      <div className="flex-1 overflow-y-auto pb-32">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            {step === 1 && (
              <StepProduct
                selected={data.product}
                onSelect={(p) => updateData({ product: p, doorType: null, structureType: null })}
              />
            )}
            {step === 2 && data.product === 'portes' && (
              <StepType
                selected={data.doorType}
                onSelect={(t) => updateData({ doorType: t })}
              />
            )}
            {step === 2 && data.product === 'estructures' && (
              <StepStructure
                selected={data.structureType}
                onSelect={(s) => updateData({ structureType: s })}
              />
            )}
            {step === 2 && data.product === 'automatismes' && (
              <StepAutomation
                selected={data.doorType}
                onSelect={(t) => updateData({ doorType: t })}
              />
            )}
            {step === 3 && (
              <StepDimensions
                width={data.width}
                height={data.height}
                doorType={data.doorType}
                onWidthChange={(w) => updateData({ width: w })}
                onHeightChange={(h) => updateData({ height: h })}
              />
            )}
            {step === 4 && (
              <StepColors
                material={data.material}
                finish={data.finish}
                ralColor={data.ralColor}
                onMaterialChange={(m) => updateData({ material: m })}
                onFinishChange={(f) => updateData({ finish: f })}
                onRalColorChange={(c) => updateData({ ralColor: c })}
              />
            )}
            {step === 5 && (
              <StepAccessories
                selected={data.accessories}
                onToggle={(a) => updateData({
                  accessories: data.accessories.includes(a)
                    ? data.accessories.filter(x => x !== a)
                    : [...data.accessories, a],
                })}
              />
            )}
            {step === 6 && (
              <form id="quote-form" onSubmit={(e) => {
                e.preventDefault();
                handleSubmit(new FormData(e.currentTarget));
              }}>
                <StepContact errors={errors} onBlur={handleContactBlur} />
              </form>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Error del servidor */}
      {serverError && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4 text-red-700 dark:text-red-300 text-sm mb-4">
          {serverError}
        </div>
      )}

      {/* Botons flotants fixos a baix */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/90 dark:bg-brand-dark/90 backdrop-blur-md border-t border-gray-200 dark:border-white/10 z-40">
        <div className="max-w-3xl mx-auto px-6 py-4 flex justify-between items-center">
          <button
            type="button"
            onClick={goPrev}
            disabled={step === 1}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
              step === 1
                ? 'opacity-0 pointer-events-none'
                : 'text-gray-600 dark:text-brand-grey hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5'
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Enrere
          </button>

          {step < TOTAL_STEPS ? (
            <button
              type="button"
              onClick={goNext}
              disabled={!canGoNext()}
              className={`flex items-center gap-2 px-8 py-3 rounded-xl font-semibold transition-all ${
                canGoNext()
                  ? 'bg-brand-red text-white hover:bg-brand-red/90 shadow-lg shadow-brand-red/25'
                  : 'bg-gray-200 dark:bg-white/10 text-gray-400 dark:text-brand-grey cursor-not-allowed'
              }`}
            >
              Següent
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          ) : (
            <MagicButton
              type="submit"
              form="quote-form"
              disabled={isSubmitting}
              className="px-8 py-3 text-base"
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                    className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                  />
                  <span>Enviant...</span>
                </div>
              ) : (
                'Demanar Pressupost'
              )}
            </MagicButton>
          )}
        </div>
      </div>
    </div>
  );
}
