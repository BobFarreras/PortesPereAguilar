// components/marketing/ContactForm.tsx
'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MagicButton from '@/components/ui/MagicButton';

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Aquí aniria la crida real a l'API (ex: fetch('/api/contact'))
      // Simulem un temps de xarxa per veure l'animació
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setIsSuccess(true);
    } catch (error) {
      // Integració futura amb Sentry
      console.error("Error enviant el formulari:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

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
            className="flex flex-col gap-6 bg-white/[0.03] border border-white/10 p-8 rounded-2xl backdrop-blur-md shadow-2xl"
          >
            {/* Input: Nom */}
            <div className="relative">
              <input
                type="text"
                id="name"
                required
                className="peer w-full bg-transparent border-b border-white/20 px-0 py-3 text-white placeholder-transparent focus:outline-none focus:border-brand-red transition-colors"
                placeholder="Nom complet"
              />
              <label
                htmlFor="name"
                className="absolute left-0 top-3 text-brand-grey text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-xs peer-focus:text-brand-red cursor-text"
              >
                Nom complet
              </label>
            </div>

            {/* Input: Email */}
            <div className="relative mt-2">
              <input
                type="email"
                id="email"
                required
                className="peer w-full bg-transparent border-b border-white/20 px-0 py-3 text-white placeholder-transparent focus:outline-none focus:border-brand-red transition-colors"
                placeholder="Correu electrònic"
              />
              <label
                htmlFor="email"
                className="absolute left-0 top-3 text-brand-grey text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-xs peer-focus:text-brand-red cursor-text"
              >
                Correu electrònic
              </label>
            </div>

            {/* Input: Telèfon */}
            <div className="relative mt-2">
              <input
                type="tel"
                id="phone"
                className="peer w-full bg-transparent border-b border-white/20 px-0 py-3 text-white placeholder-transparent focus:outline-none focus:border-brand-red transition-colors"
                placeholder="Telèfon"
              />
              <label
                htmlFor="phone"
                className="absolute left-0 top-3 text-brand-grey text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-xs peer-focus:text-brand-red cursor-text"
              >
                Telèfon
              </label>
            </div>

            {/* Textarea: Missatge */}
            <div className="relative mt-2">
              <textarea
                id="message"
                required
                rows={4}
                className="peer w-full bg-transparent border-b border-white/20 px-0 py-3 text-white placeholder-transparent focus:outline-none focus:border-brand-red transition-colors resize-none"
                placeholder="Com et podem ajudar?"
              />
              <label
                htmlFor="message"
                className="absolute left-0 top-3 text-brand-grey text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-xs peer-focus:text-brand-red cursor-text"
              >
                Com et podem ajudar?
              </label>
            </div>

            {/* Botó Submit */}
            <div className="mt-4">
              <MagicButton 
                type="submit" 
                disabled={isSubmitting}
                className="w-full flex justify-center items-center py-4 text-base"
              >
                {isSubmitting ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                    className="w-6 h-6 border-2 border-white border-t-transparent rounded-full"
                  />
                ) : (
                  "Enviar petició"
                )}
              </MagicButton>
            </div>
          </motion.form>
        ) : (
          /* Estat d'Èxit Animado */
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center text-center bg-white/[0.03] border border-brand-red/30 p-12 rounded-2xl backdrop-blur-md shadow-2xl"
          >
            <div className="w-16 h-16 bg-brand-red/20 rounded-full flex items-center justify-center mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-brand-red" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Missatge enviat correctament!</h3>
            <p className="text-brand-grey">El nostre equip tècnic es posarà en contacte amb tu el més aviat possible per analitzar el teu projecte.</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}