import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, DollarSign, Users, Map as MapIcon, Clock, ShieldX, Zap } from 'lucide-react';
import { Card } from '../ui/Card';

export const Problems: React.FC = () => {
  const problems = [
    {
      icon: Clock,
      title: "Improper Planning",
      description: "Missed connections, double bookings, and poor itinerary coordination",
      color: "text-red-500",
      bgColor: "from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20"
    },
    {
      icon: DollarSign,
      title: "Budget Overspending",
      description: "Unexpected costs and poor expense tracking lead to financial stress",
      color: "text-secondary-500",
      bgColor: "from-secondary-50 to-secondary-100 dark:from-secondary-900/20 dark:to-secondary-800/20"
    },
    {
      icon: ShieldX,
      title: "Unsafe Routes",
      description: "Walking through dangerous areas without local knowledge",
      color: "text-red-600",
      bgColor: "from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20"
    },
    {
      icon: MapIcon,
      title: "Lack of Local Info",
      description: "Missing out on authentic restaurants, hotels, and experiences",
      color: "text-accent-600",
      bgColor: "from-accent-50 to-accent-100 dark:from-accent-900/20 dark:to-accent-800/20"
    },
    {
      icon: Users,
      title: "Group Coordination",
      description: "Lost members, conflicting schedules, and communication breakdowns",
      color: "text-primary-500",
      bgColor: "from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/20"
    },
    {
      icon: AlertTriangle,
      title: "Emergency Situations",
      description: "Getting lost in crowded places without help or emergency contacts",
      color: "text-red-700",
      bgColor: "from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };

  return (
    <section className="py-32 bg-gradient-to-br from-gray-50 via-white to-red-50/30 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900" id="problems">
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
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-red-100 to-secondary-100 dark:from-red-900/20 dark:to-secondary-900/20 backdrop-blur-xl border border-red-200/50 dark:border-red-800/50 rounded-full px-6 py-3 mb-8"
          >
            <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400" />
            <span className="text-sm font-medium text-red-700 dark:text-red-300">
              Travel Pain Points
            </span>
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-gray-900 dark:text-white mb-8">
            Common Travel Problems
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Every traveler faces these challenges. We've built the <strong className="text-primary-600 dark:text-primary-400">perfect AI solution</strong> to solve them all.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
        >
          {problems.map((problem, index) => {
            const Icon = problem.icon;
            return (
              <motion.div key={index} variants={itemVariants}>
                <Card hover glass className="p-8 h-full group relative overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-br ${problem.bgColor} opacity-50 group-hover:opacity-70 transition-opacity duration-500`} />
                  
                  <div className="text-center">
                    <motion.div 
                      className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm mb-8 shadow-lg group-hover:scale-110 transition-transform duration-300"
                      whileHover={{ rotate: 5 }}
                    >
                      <Icon className={`h-10 w-10 ${problem.color}`} />
                    </motion.div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                      {problem.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
                      {problem.description}
                    </p>
                    
                    {/* Hover Effect */}
                    <motion.div
                      className="absolute bottom-4 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      initial={{ y: 20 }}
                      whileHover={{ y: 0 }}
                    >
                      <div className="flex items-center space-x-2 text-primary-600 dark:text-primary-400 font-medium">
                        <Zap className="h-4 w-4" />
                        <span className="text-sm">AI Solution Available</span>
                      </div>
                    </motion.div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
        
        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-20"
        >
          <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-primary-500 to-accent-500 text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-2xl">
            <Zap className="h-6 w-6" />
            <span>Smart Travel Guide solves all these problems with AI</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};