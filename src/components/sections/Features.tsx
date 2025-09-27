import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Brain, Calculator, Users, ShoppingBag, AlertCircle, Map, Sparkles, Zap } from 'lucide-react';
import { Card } from '../ui/Card';

export const Features: React.FC = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const features = [
    {
      icon: Brain,
      title: "AI Trip Planner",
      description: "Personalized itineraries based on your preferences, budget, and travel style",
      preview: "Smart recommendations for activities, restaurants, and attractions",
      color: "from-primary-500 to-accent-500",
      bgColor: "from-primary-50 to-accent-50 dark:from-primary-900/20 dark:to-accent-900/20"
    },
    {
      icon: Calculator,
      title: "Budget Estimator",
      description: "Real-time expense tracking with intelligent cost predictions",
      preview: "Itemized breakdown with currency conversion and savings tips",
      color: "from-accent-500 to-secondary-500",
      bgColor: "from-accent-50 to-secondary-50 dark:from-accent-900/20 dark:to-secondary-900/20"
    },
    {
      icon: Users,
      title: "Group Tracking",
      description: "Live location sharing and coordination for group travelers",
      preview: "Real-time map with member status and meeting points",
      color: "from-secondary-500 to-primary-500",
      bgColor: "from-secondary-50 to-primary-50 dark:from-secondary-900/20 dark:to-primary-900/20"
    },
    {
      icon: ShoppingBag,
      title: "Shop Integration",
      description: "Discover nearby stores, markets, and local shopping experiences",
      preview: "Curated lists of authentic local shops and markets",
      color: "from-secondary-500 to-secondary-600",
      bgColor: "from-secondary-50 to-secondary-100 dark:from-secondary-900/20 dark:to-secondary-800/20"
    },
    {
      icon: AlertCircle,
      title: "SOS Alerts",
      description: "One-click emergency assistance with location sharing",
      preview: "Instant alerts to emergency contacts and local authorities",
      color: "from-red-500 to-secondary-500",
      bgColor: "from-red-50 to-secondary-50 dark:from-red-900/20 dark:to-secondary-900/20"
    },
    {
      icon: Map,
      title: "Smart Maps",
      description: "AI-powered route optimization with safety zone indicators",
      preview: "Restricted area warnings and safe route suggestions",
      color: "from-primary-500 to-primary-600",
      bgColor: "from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/20"
    }
  ];

  return (
    <section className="py-32 bg-gradient-to-br from-gray-50 via-white to-primary-50/30 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900" id="features">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary-100 to-accent-100 dark:from-primary-900/20 dark:to-accent-900/20 backdrop-blur-xl border border-primary-200/50 dark:border-primary-800/50 rounded-full px-6 py-3 mb-8"
          >
            <Zap className="h-5 w-5 text-primary-600 dark:text-primary-400" />
            <span className="text-sm font-medium text-primary-700 dark:text-primary-300">
              Powered by Advanced AI
            </span>
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-gray-900 dark:text-white mb-8">
            Powerful Features
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Advanced AI technology meets intuitive design to create the ultimate travel companion.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                onHoverStart={() => setHoveredCard(index)}
                onHoverEnd={() => setHoveredCard(null)}
              >
                <Card hover glass className="p-8 h-full relative overflow-hidden group">
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.bgColor} opacity-50 group-hover:opacity-70 transition-opacity duration-500`} />
                  
                  {/* Animated Background Effect */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10`}
                    initial={false}
                    animate={{ opacity: hoveredCard === index ? 0.1 : 0 }}
                    transition={{ duration: 0.3 }}
                  />
                  
                  <div className="relative z-10">
                    <div className="flex items-center mb-8">
                      <motion.div 
                        className={`p-4 rounded-2xl bg-gradient-to-br ${feature.color} mr-4 shadow-lg`}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Icon className="h-7 w-7 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                        {feature.title}
                      </h3>
                    </div>
                    
                    <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed text-lg">
                      {feature.description}
                    </p>

                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ 
                        opacity: hoveredCard === index ? 1 : 0,
                        height: hoveredCard === index ? 'auto' : 0
                      }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="border-t border-primary-200/50 dark:border-primary-700/50 pt-6">
                        <div className="flex items-center space-x-2 mb-3">
                          <Sparkles className="h-4 w-4 text-primary-500" />
                          <span className="text-sm font-medium text-primary-600 dark:text-primary-400">
                            Preview
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                          {feature.preview}
                        </p>
                      </div>
                    </motion.div>
                    
                    {/* Hover Glow Effect */}
                    <motion.div
                      className={`absolute -inset-1 bg-gradient-to-r ${feature.color} rounded-2xl blur opacity-0 group-hover:opacity-20`}
                      initial={false}
                      animate={{ opacity: hoveredCard === index ? 0.2 : 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
        
        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-20"
        >
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
            Ready to experience the future of travel?
          </p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <button className="inline-flex items-center space-x-3 bg-gradient-to-r from-primary-500 to-accent-500 hover:from-primary-600 hover:to-accent-600 text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-2xl hover:shadow-glow transition-all duration-300">
              <Sparkles className="h-6 w-6" />
              <span>Get Started Free</span>
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};