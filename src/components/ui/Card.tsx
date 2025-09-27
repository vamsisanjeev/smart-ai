import React from 'react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  glass?: boolean;
  neumorphism?: boolean;
  glow?: boolean;
}

export const Card: React.FC<CardProps> = ({ 
  children, 
  className, 
  hover = false,
  glass = false,
  neumorphism = false,
  glow = false
}) => {
  const baseClasses = 'rounded-2xl transition-all duration-500';
  
  const styleClasses = glass 
    ? 'bg-white/10 dark:bg-black/10 backdrop-blur-xl border border-white/20 dark:border-white/10 shadow-2xl'
    : neumorphism
    ? 'bg-gray-100 dark:bg-gray-800 shadow-neumorphism dark:shadow-neumorphism-dark border-0'
    : `bg-white dark:bg-gray-800 shadow-xl border border-gray-100 dark:border-gray-700 ${glow ? 'hover:shadow-glow' : ''}`;

  const hoverClasses = hover 
    ? 'hover:shadow-2xl hover:-translate-y-2 cursor-pointer hover:scale-[1.02]'
    : '';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      whileHover={hover ? { y: -8, scale: 1.03, rotateX: 5 } : undefined}
      className={clsx(baseClasses, styleClasses, hoverClasses, className)}
      style={{ transformStyle: 'preserve-3d' }}
    >
      {children}
    </motion.div>
  );
};