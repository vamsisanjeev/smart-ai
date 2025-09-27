import React from 'react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  glow?: boolean;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  glow = false,
  children,
  className,
  ...props
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 relative overflow-hidden';
  
  const variants = {
    primary: `bg-gradient-to-r from-primary-500 to-accent-500 hover:from-primary-600 hover:to-accent-600 text-white focus:ring-primary-500 shadow-lg hover:shadow-xl ${glow ? 'hover:shadow-glow' : ''}`,
    secondary: 'bg-gradient-to-r from-secondary-500 to-secondary-600 hover:from-secondary-600 hover:to-secondary-700 text-white focus:ring-secondary-500 shadow-lg hover:shadow-xl',
    outline: 'border-2 border-primary-500 text-primary-500 hover:bg-primary-500 hover:text-white focus:ring-primary-500 backdrop-blur-sm',
    ghost: 'text-gray-700 dark:text-gray-300 hover:bg-white/10 dark:hover:bg-gray-800/50 backdrop-blur-sm'
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={clsx(baseClasses, variants[variant], sizes[size], className)}
      {...props}
    >
      {variant === 'primary' && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
          initial={{ x: '-100%' }}
          whileHover={{ x: '100%' }}
          transition={{ duration: 0.6 }}
        />
      )}
      {children}
    </motion.button>
  );
};