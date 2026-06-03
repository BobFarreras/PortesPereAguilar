'use client';

import React, { useState, useCallback, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface ImageCarouselProps {
  images: string[];
  altPrefix: string;
}

export default function ImageCarousel({ images, altPrefix }: ImageCarouselProps) {
  const [page, setPage] = useState(0);
  const [direction, setDirection] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const imageIndex = images && images.length > 0 ? Math.abs(page % images.length) : 0;

  const paginate = useCallback((newDirection: number) => {
    setDirection(newDirection);
    setPage((prev) => prev + newDirection);
  }, []);

  // Auto-play cada 5s
  useEffect(() => {
    if (!images || images.length <= 1) return;
    intervalRef.current = setInterval(() => {
      setDirection(1);
      setPage((prev) => prev + 1);
    }, 5000);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [images?.length]);

  // Pausar auto-play al hover
  const pauseAutoPlay = () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  const resumeAutoPlay = () => {
    if (!images || images.length <= 1) return;
    intervalRef.current = setInterval(() => {
      setDirection(1);
      setPage((prev) => prev + 1);
    }, 5000);
  };

  if (!images || images.length === 0) return null;

  const variants = {
    enter: (d: number) => ({
      x: d > 0 ? '100%' : '-100%',
      opacity: 0,
      scale: 1.05,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      zIndex: 1,
    },
    exit: (d: number) => ({
      x: d > 0 ? '-100%' : '100%',
      opacity: 0,
      scale: 0.95,
      zIndex: 0,
    }),
  };

  return (
    <div
      className="relative w-full h-[400px] md:h-[600px] overflow-hidden rounded-2xl border border-white/10 shadow-2xl group bg-black"
      onMouseEnter={pauseAutoPlay}
      onMouseLeave={resumeAutoPlay}
    >
      <AnimatePresence initial={false} custom={direction} mode="popLayout">
        <motion.div
          key={imageIndex}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ x: { type: 'spring', stiffness: 300, damping: 30 }, opacity: { duration: 0.3 }, scale: { duration: 0.4 } }}
          className="absolute inset-0 w-full h-full"
        >
          <Image
            src={images[imageIndex]}
            alt={`${altPrefix} - Imatge ${imageIndex + 1}`}
            fill
            priority={imageIndex === 0}
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </motion.div>
      </AnimatePresence>

      {images.length > 1 && (
        <>
          <button
            className="absolute left-4 z-10 p-3 rounded-full bg-black/40 text-white backdrop-blur-md border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-brand-red hover:border-brand-red focus:outline-none focus:ring-2 focus:ring-brand-red"
            onClick={() => paginate(-1)}
            aria-label="Anterior imatge"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>
          <button
            className="absolute right-4 z-10 p-3 rounded-full bg-black/40 text-white backdrop-blur-md border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-brand-red hover:border-brand-red focus:outline-none focus:ring-2 focus:ring-brand-red"
            onClick={() => paginate(1)}
            aria-label="Següent imatge"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>

          <div className="absolute bottom-6 z-10 flex gap-2">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setDirection(i > imageIndex ? 1 : -1);
                  setPage(i);
                }}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${i === imageIndex ? 'w-8 bg-brand-red' : 'bg-white/40 hover:bg-white'}`}
                aria-label={`Anar a la imatge ${i + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
