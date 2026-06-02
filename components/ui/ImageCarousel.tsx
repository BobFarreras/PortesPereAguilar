'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface ImageCarouselProps {
  images: string[];
  altPrefix: string;
}

const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 1000 : -1000,
    opacity: 0
  })
};

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => Math.abs(offset) * velocity;

export default function ImageCarousel({ images, altPrefix }: ImageCarouselProps) {
  const [[page, direction], setPage] = useState([0, 0]);

  // Si no hi ha array de galeria o està buit, utilitzem un fallback silenciós
  if (!images || images.length === 0) return null;

  const imageIndex = Math.abs(page % images.length);

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };

  return (
    <div className="relative w-full h-[400px] md:h-[600px] flex items-center justify-center overflow-hidden rounded-2xl bg-brand-dark/50 border border-white/10 shadow-2xl group">
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={page}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ x: { type: "spring", stiffness: 300, damping: 30 }, opacity: { duration: 0.2 } }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragEnd={(e, { offset, velocity }) => {
            const swipe = swipePower(offset.x, velocity.x);
            if (swipe < -swipeConfidenceThreshold) paginate(1);
            else if (swipe > swipeConfidenceThreshold) paginate(-1);
          }}
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
          <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/90 via-transparent to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* Botons de navegació (només visibles si hi ha +1 imatge) */}
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

          {/* Indicadors (Dots) */}
          <div className="absolute bottom-6 z-10 flex gap-2">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setPage([page + (i - imageIndex), i > imageIndex ? 1 : -1])}
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