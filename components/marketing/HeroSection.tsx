'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { useTranslations } from 'next-intl';

function createAmbientPad(ctx: AudioContext, destination: AudioNode) {
  const now = ctx.currentTime;
  const masterGain = ctx.createGain();
  masterGain.gain.setValueAtTime(0, now);
  masterGain.gain.linearRampToValueAtTime(0.15, now + 3);
  masterGain.connect(destination);

  const notes = [130.81, 164.81, 196.00, 261.63]; // C3, E3, G3, C4

  notes.forEach((freq) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now);

    // LFO per vibrato suau
    const lfo = ctx.createOscillator();
    const lfoGain = ctx.createGain();
    lfo.frequency.setValueAtTime(0.3 + Math.random() * 0.2, now);
    lfoGain.gain.setValueAtTime(1.5, now);
    lfo.connect(lfoGain);
    lfoGain.connect(osc.frequency);
    lfo.start(now);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(400, now);
    filter.Q.setValueAtTime(1, now);

    gain.gain.setValueAtTime(0.08, now);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(masterGain);
    osc.start(now);
  });

  return masterGain;
}

export default function HeroSection() {
  const t = useTranslations('hero');
  const sectionRef = useRef<HTMLDivElement>(null);
  const [showText, setShowText] = useState(false);
  const isFirstLoad = useRef(true);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const audioStarted = useRef(false);

  // IntersectionObserver + delay només al primer load
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let showTimer: NodeJS.Timeout;
    let hideTimer: NodeJS.Timeout;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (isFirstLoad.current) {
            // Primer cop: delay de 3s
            isFirstLoad.current = false;
            showTimer = setTimeout(() => {
              setShowText(true);
              hideTimer = setTimeout(() => {
                setShowText(false);
              }, 11000);
            }, 3000);
          } else {
            // Scroll back: instantani
            setShowText(true);
            hideTimer = setTimeout(() => {
              setShowText(false);
            }, 11000);
          }
        } else {
          clearTimeout(showTimer);
          clearTimeout(hideTimer);
          setShowText(false);
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(section);
    return () => {
      observer.disconnect();
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  const startAudio = useCallback(() => {
    if (audioStarted.current) return;
    audioStarted.current = true;
    const ctx = new AudioContext();
    audioCtxRef.current = ctx;
    createAmbientPad(ctx, ctx.destination);
  }, []);

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
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover"
        src="/videos/hero-youtube.mp4"
      />

      {/* Contingut — alineat a l'esquerra, desplaçat */}
      <div className="relative z-10 h-full flex flex-col justify-center pl-4 md:pl-8 lg:pl-12 max-w-7xl mx-auto">
        <AnimatePresence mode="wait">
          {showText && (
            <motion.div
              key="hero-text"
              className="flex flex-col gap-5 w-fit"
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
                style={{ textShadow: '0 2px 12px rgba(0,0,0,0.6), 0 1px 3px rgba(0,0,0,0.4)' }}
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
                style={{ textShadow: '0 1px 8px rgba(0,0,0,0.5), 0 1px 2px rgba(0,0,0,0.3)' }}
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

      {/* Botó so ambiental */}
      <motion.button
        onClick={startAudio}
        className="absolute bottom-8 right-8 z-10 p-3 rounded-full bg-white/10 text-white backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all duration-300"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        aria-label="Activar so ambiental"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
        </svg>
      </motion.button>
    </section>
  );
}
