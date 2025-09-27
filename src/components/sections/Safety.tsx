import React from 'react';
import { motion } from 'framer-motion';
import { Shield, AlertTriangle, MapPin, Phone } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';

export const Safety: React.FC = () => {
  const safetyFeatures = [
    {
      icon: Shield,
      title: "Safety Zones",
      description: "AI-powered identification of safe areas and risk zones in real-time"
    },
    {
      icon: AlertTriangle,
      title: "Smart Alerts",
      description: "Proactive warnings for dangerous areas, weather, or local incidents"
    },
    {
      icon: MapPin,
      title: "Live Tracking",
      description: "24/7 location monitoring with automatic check-ins"
    },
    {
      icon: Phone,
      title: "Emergency Contacts",
      description: "Instant connection to local emergency services and your contacts"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-red-50 via-white to-orange-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900" id="safety">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Safety First
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Advanced safety features and emergency systems designed to keep you protected wherever you go.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {safetyFeatures.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <Card className="p-6 text-center h-full">
                      <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/20 mb-4">
                        <Icon className="h-6 w-6 text-red-600 dark:text-red-400" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">
                        {feature.description}
                      </p>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <Card glass className="p-8 text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-orange-500/10" />
              
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="relative z-10"
              >
                <div className="w-24 h-24 bg-gradient-to-br from-red-500 to-orange-500 rounded-full mx-auto mb-6 flex items-center justify-center shadow-2xl">
                  <AlertTriangle className="h-12 w-12 text-white" />
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Emergency SOS
                </h3>
                
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  One-tap emergency button that instantly alerts your contacts and local emergency services with your exact location.
                </p>
                
                <Button variant="secondary" size="lg" className="bg-red-500 hover:bg-red-600 text-white">
                  Test SOS Feature
                </Button>
              </motion.div>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};