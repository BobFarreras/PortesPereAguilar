'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { useTranslations } from 'next-intl';

export default function HeroSection() {
  const t = useTranslations('hero');
  const sectionRef = useRef<HTMLDivElement>(null);
  const [showText, setShowText] = useState(false);

  // Detecta quan la secció és visible (Intersection Observer)
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShowText(true);
        } else {
          setShowText(false);
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  // Amaga el text després de 7 segons (quan és visible)
  useEffect(() => {
    if (!showText) return;

    const timer = setTimeout(() => {
      setShowText(false);
    }, 8000);

    return () => clearTimeout(timer);
  }, [showText]);

  const lineVariants: Variants = {
    hidden: { scaleY: 0 },
    visible: {
      scaleY: 1,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    },
    exit: {
      scaleY: 0,
      transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const subtitleVariants: Variants = {
    hidden: { opacity: 0, x: -30, filter: 'blur(8px)' },
    visible: {
      opacity: 1,
      x: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
    exit: {
      opacity: 0,
      x: -20,
      filter: 'blur(6px)',
      transition: { duration: 0.4 },
    },
  };

  const titleVariants: Variants = {
    hidden: { opacity: 0, y: 50, filter: 'blur(10px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    },
    exit: {
      opacity: 0,
      y: -30,
      filter: 'blur(8px)',
      transition: { duration: 0.5 },
    },
  };

  const descVariants: Variants = {
    hidden: { opacity: 0, y: 30, filter: 'blur(6px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
    exit: {
      opacity: 0,
      y: -20,
      filter: 'blur(4px)',
      transition: { duration: 0.3 },
    },
  };

  return (
    <section ref={sectionRef} className="relative h-screen w-full overflow-hidden bg-black">
      {/* Video de fons — sempre visible, sense overlay */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        src="/videos/hero-youtube.mp4"
      />

      {/* Contingut — alineat a l'esquerra */}
      <div className="relative z-10 h-full flex flex-col justify-center px-8 md:px-16 lg:px-24 max-w-7xl mx-auto">
        <AnimatePresence mode="wait">
          {showText && (
            <motion.div
              key="hero-text"
              className="flex flex-col gap-5 w-fit backdrop-blur-xl px-20 py-16"
              style={{
                background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.3) 40%, transparent 75%)',
                maskImage: 'radial-gradient(ellipse at center, black 20%, transparent 70%)',
                WebkitMaskImage: 'radial-gradient(ellipse at center, black 20%, transparent 70%)',
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Línia vertical vermella */}
              <motion.div
                className="w-[3px] h-16 bg-brand-red origin-top"
                variants={lineVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              />

              {/* Subtítol */}
              <motion.p
                className="text-sm md:text-base font-bold uppercase tracking-[0.35em] text-brand-red"
                variants={subtitleVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                {t('subtitle')}
              </motion.p>

              {/* Títol */}
              <motion.h1
                className="text-5xl md:text-7xl lg:text-8xl xl:text-[7rem] font-black text-white leading-[0.85] tracking-tight"
                variants={titleVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                {t('title.part1')}
                <br />
                <span className="text-white/90">{t('title.part2')}</span>
              </motion.h1>

              {/* Descripció */}
              <motion.p
                className="max-w-xl text-lg md:text-xl lg:text-2xl text-white/90 leading-relaxed font-medium"
                variants={descVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                {t('description')}
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Indicador de scroll — sempre visible */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 text-white/60"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}
