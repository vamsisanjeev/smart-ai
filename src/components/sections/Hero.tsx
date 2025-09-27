import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Plane, Luggage, Navigation, Sparkles, Globe } from 'lucide-react';
import { Button } from '../ui/Button';

export const Hero: React.FC = () => {
  const iconVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.6,
        ease: "easeOut"
      }
    })
  };

  const floatingAnimation = {
    y: [-20, 20, -20],
    rotate: [-5, 5, -5],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  const particleVariants = {
    animate: {
      y: [0, -100],
      opacity: [0, 1, 0],
      scale: [0, 1, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeOut"
      }
    }
  };
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary-50 via-white to-accent-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 bg-hero-pattern opacity-30"></div>
        
        {/* Gradient Orbs */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-24 -left-24 w-96 h-96 bg-gradient-to-r from-primary-400/30 to-accent-400/30 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-24 -right-24 w-96 h-96 bg-gradient-to-r from-secondary-400/30 to-primary-400/30 rounded-full blur-3xl"
        />
        
        {/* Floating Icons */}
        <motion.div
          animate={floatingAnimation}
          className="absolute top-20 left-10 opacity-30"
        >
          <div className="p-4 bg-white/20 dark:bg-black/20 backdrop-blur-lg rounded-2xl border border-white/30">
            <Plane className="h-8 w-8 text-primary-500" />
          </div>
        </motion.div>
        <motion.div
          animate={{...floatingAnimation, transition: {...floatingAnimation.transition, delay: 1}}}
          className="absolute top-40 right-20 opacity-30"
        >
          <div className="p-4 bg-white/20 dark:bg-black/20 backdrop-blur-lg rounded-2xl border border-white/30">
            <MapPin className="h-8 w-8 text-accent-500" />
          </div>
        </motion.div>
        <motion.div
          animate={{...floatingAnimation, transition: {...floatingAnimation.transition, delay: 2}}}
          className="absolute bottom-40 left-20 opacity-30"
        >
          <div className="p-4 bg-white/20 dark:bg-black/20 backdrop-blur-lg rounded-2xl border border-white/30">
            <Luggage className="h-8 w-8 text-secondary-500" />
          </div>
        </motion.div>
        <motion.div
          animate={{...floatingAnimation, transition: {...floatingAnimation.transition, delay: 3}}}
          className="absolute bottom-20 right-10 opacity-30"
        >
          <div className="p-4 bg-white/20 dark:bg-black/20 backdrop-blur-lg rounded-2xl border border-white/30">
            <Navigation className="h-8 w-8 text-primary-500" />
          </div>
        </motion.div>
        
        {/* Floating Particles */}
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            variants={particleVariants}
            animate="animate"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`
            }}
            className="absolute bottom-0 w-2 h-2 bg-primary-400 rounded-full"
          />
        ))}
      </div>
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Floating Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center space-x-2 bg-white/20 dark:bg-black/20 backdrop-blur-xl border border-white/30 rounded-full px-6 py-3 mb-8"
          >
            <Sparkles className="h-5 w-5 text-primary-500" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              AI-Powered Travel Assistant
            </span>
          </motion.div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold text-gray-900 dark:text-white mb-8 leading-tight">
            Plan Smarter,{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 via-accent-500 to-secondary-500 animate-pulse">
              Travel Safer
            </span>
          </h1>
          
          <motion.p 
            className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-16 max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Experience the future of travel with <strong className="text-primary-600 dark:text-primary-400">AI-powered planning</strong>, 
            real-time group tracking, and safety features that keep you connected and protected worldwide.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-20"
          >
            <Link to="/trip-planner">
              <Button size="lg" glow className="text-xl px-12 py-5 shadow-2xl">
                <Sparkles className="h-6 w-6 mr-3" />
                Plan My Trip
              </Button>
            </Link>
            <Link to="/safety">
              <Button variant="outline" size="lg" className="text-xl px-12 py-5">
                <Globe className="h-6 w-6 mr-3" />
                Safety Features
              </Button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Animated Icons */}
        <motion.div 
          className="flex justify-center space-x-6 md:space-x-12"
          initial="hidden"
          animate="visible"
        >
          {[
            { icon: MapPin, color: 'from-primary-500 to-primary-600' },
            { icon: Plane, color: 'from-accent-500 to-accent-600' },
            { icon: Luggage, color: 'from-secondary-500 to-secondary-600' },
            { icon: Navigation, color: 'from-primary-500 to-accent-500' }
          ].map((item, i) => (
            <motion.div
              key={i}
              custom={i}
              variants={iconVariants}
              whileHover={{ scale: 1.3, rotate: 10, y: -10 }}
              className={`p-6 rounded-2xl bg-gradient-to-br ${item.color} shadow-2xl backdrop-blur-sm border border-white/20 dark:border-gray-700/20 cursor-pointer`}
            >
              <item.icon className="h-8 w-8 text-white" />
            </motion.div>
          ))}
        </motion.div>
        
        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-20 grid grid-cols-3 gap-8 max-w-2xl mx-auto"
        >
          {[
            { number: '50K+', label: 'Happy Travelers' },
            { number: '200+', label: 'Countries' },
            { number: '99.9%', label: 'Uptime' }
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary-600 dark:text-primary-400 mb-2">
                {stat.number}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 15, 0], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 3, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="w-8 h-12 border-2 border-primary-400 dark:border-primary-600 rounded-full flex justify-center backdrop-blur-sm bg-white/10">
          <motion.div 
            animate={{ y: [0, 16, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-2 h-4 bg-primary-500 dark:bg-primary-400 rounded-full mt-2"
          />
        </div>
      </motion.div>
    </section>
  );
};