import React from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin, Plane } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      icon: Search,
      title: "Plan",
      description: "Tell our AI your destination, preferences, and budget. Get a personalized itinerary in seconds.",
      color: "from-sky-500 to-blue-600"
    },
    {
      icon: MapPin,
      title: "Track",
      description: "Coordinate with your group using real-time location sharing and smart meeting points.",
      color: "from-emerald-500 to-green-600"
    },
    {
      icon: Plane,
      title: "Travel",
      description: "Enjoy your trip with AI guidance, safety alerts, and instant access to local recommendations.",
      color: "from-orange-500 to-red-500"
    }
  ];

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900" id="how-it-works">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            How It Works
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Three simple steps to transform your travel experience with AI-powered assistance.
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-sky-500 via-emerald-500 to-orange-500 hidden lg:block" />

          <div className="space-y-16 lg:space-y-24">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  className={`flex items-center ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} flex-col lg:gap-16`}
                >
                  <div className="flex-1 text-center lg:text-left">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className={`inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br ${step.color} mb-6 mx-auto lg:mx-0`}
                    >
                      <Icon className="h-10 w-10 text-white" />
                    </motion.div>
                    
                    <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                      Step {index + 1}: {step.title}
                    </h3>
                    
                    <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed max-w-md mx-auto lg:mx-0">
                      {step.description}
                    </p>
                  </div>

                  <div className="flex-1 flex justify-center items-center mt-8 lg:mt-0">
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="w-80 h-60 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 flex items-center justify-center"
                    >
                      <div className="text-center">
                        <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${step.color} mx-auto mb-4 flex items-center justify-center`}>
                          <Icon className="h-8 w-8 text-white" />
                        </div>
                        <p className="text-gray-500 dark:text-gray-400">
                          Interactive {step.title} Preview
                        </p>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};