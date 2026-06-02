// components/ui/MagicButton.tsx
'use client'; 

import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

interface MagicButtonProps extends HTMLMotionProps<"button"> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
}

export default function MagicButton({ 
  children, 
  variant = 'primary', 
  className = '', 
  ...props 
}: MagicButtonProps) {
  
  const baseStyles = "relative overflow-hidden rounded-xl px-6 py-3 font-semibold text-white transition-colors duration-300 backdrop-blur-md shadow-lg outline-none focus:ring-2 focus:ring-offset-2";
  const variants = {
    primary: "bg-brand-red/80 hover:bg-brand-red focus:ring-brand-red border border-white/20",
    secondary: "bg-gray-800/80 hover:bg-gray-700/90 focus:ring-gray-400 border border-white/10"
  };

  return (
    <motion.button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      whileHover={{ scale: 1.05, boxShadow: "0px 10px 20px rgba(0,0,0,0.2)" }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      {...props}
    >
      {children}
    </motion.button>
  );
}
