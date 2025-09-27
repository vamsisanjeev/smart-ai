import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { DollarSign, PieChart, TrendingUp, AlertTriangle, Lightbulb } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { aiService, BudgetBreakdown } from '../services/aiService';

export const BudgetEstimator: React.FC = () => {
  const [formData, setFormData] = useState({
    destination: '',
    days: 7,
    groupSize: 1,
    preferences: [] as string[]
  });
  const [budget, setBudget] = useState<BudgetBreakdown | null>(null);
  const [customBudget, setCustomBudget] = useState({
    transport: 0,
    accommodation: 0,
    food: 0,
    activities: 0,
    shopping: 0
  });
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const preferences = ['Budget', 'Mid-range', 'Luxury', 'Backpacking', 'Business'];

  const handleEstimate = async () => {
    setLoading(true);
    try {
      const result = await aiService.estimateBudget(
        formData.destination,
        formData.days,
        formData.groupSize,
        formData.preferences
      );
      setBudget(result);
      setCustomBudget({
        transport: result.transport,
        accommodation: result.accommodation,
        food: result.food,
        activities: result.activities,
        shopping: result.shopping
      });

      // Get AI suggestions
      const aiSuggestions = await aiService.getSuggestions(
        `budget optimization for ${formData.destination}`
      );
      setSuggestions(aiSuggestions);
    } catch (error) {
      console.error('Error estimating budget:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateCustomTotal = () => {
    const total = Object.values(customBudget).reduce((sum, value) => sum + value, 0);
    const emergency = Math.round(total * 0.1);
    return total + emergency;
  };

  const getBudgetStatus = () => {
    if (!budget) return null;
    const customTotal = calculateCustomTotal();
    const difference = customTotal - budget.total;
    
    if (Math.abs(difference) < budget.total * 0.05) {
      return { type: 'good', message: 'Your budget is well balanced!' };
    } else if (difference > 0) {
      return { type: 'over', message: `You're $${difference} over the recommended budget` };
    } else {
      return { type: 'under', message: `You're $${Math.abs(difference)} under budget - consider upgrading!` };
    }
  };

  const budgetStatus = getBudgetStatus();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Smart Budget Estimator
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Get AI-powered budget estimates and optimize your travel expenses with intelligent recommendations.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Input Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Card className="p-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                Trip Details
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Destination
                  </label>
                  <input
                    type="text"
                    value={formData.destination}
                    onChange={(e) => setFormData(prev => ({ ...prev, destination: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
                    placeholder="Enter destination"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Duration (days)
                  </label>
                  <input
                    type="number"
                    value={formData.days}
                    onChange={(e) => setFormData(prev => ({ ...prev, days: parseInt(e.target.value) }))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
                    min="1"
                    max="365"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Group Size
                  </label>
                  <input
                    type="number"
                    value={formData.groupSize}
                    onChange={(e) => setFormData(prev => ({ ...prev, groupSize: parseInt(e.target.value) }))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
                    min="1"
                    max="20"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Travel Style
                  </label>
                  <div className="space-y-2">
                    {preferences.map((preference) => (
                      <label key={preference} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={formData.preferences.includes(preference)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setFormData(prev => ({ ...prev, preferences: [...prev.preferences, preference] }));
                            } else {
                              setFormData(prev => ({ ...prev, preferences: prev.preferences.filter(p => p !== preference) }));
                            }
                          }}
                          className="rounded border-gray-300 text-sky-600 focus:ring-sky-500"
                        />
                        <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">{preference}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <Button
                  onClick={handleEstimate}
                  className="w-full"
                  disabled={loading || !formData.destination}
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Calculating...
                    </>
                  ) : (
                    <>
                      <PieChart className="h-4 w-4 mr-2" />
                      Estimate Budget
                    </>
                  )}
                </Button>
              </div>
            </Card>
          </motion.div>

          {/* Budget Breakdown */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Card className="p-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                Budget Breakdown
              </h2>
              
              {budget ? (
                <div className="space-y-4">
                  {Object.entries(customBudget).map(([category, amount]) => (
                    <div key={category} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 capitalize">
                          {category}
                        </label>
                        <span className="text-sm font-semibold text-gray-900 dark:text-white">
                          ${amount}
                        </span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max={budget[category as keyof BudgetBreakdown] * 2}
                        value={amount}
                        onChange={(e) => setCustomBudget(prev => ({ 
                          ...prev, 
                          [category]: parseInt(e.target.value) 
                        }))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                      />
                    </div>
                  ))}
                  
                  <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                    <div className="flex justify-between items-center text-lg font-bold">
                      <span className="text-gray-900 dark:text-white">Emergency Fund (10%)</span>
                      <span className="text-gray-900 dark:text-white">
                        ${Math.round(calculateCustomTotal() * 0.1 / 1.1)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-xl font-bold mt-2">
                      <span className="text-gray-900 dark:text-white">Total Budget</span>
                      <span className="text-sky-500">${calculateCustomTotal()}</span>
                    </div>
                  </div>

                  {budgetStatus && (
                    <div className={`p-3 rounded-lg flex items-center space-x-2 ${
                      budgetStatus.type === 'good' ? 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400' :
                      budgetStatus.type === 'over' ? 'bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-400' :
                      'bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-400'
                    }`}>
                      {budgetStatus.type === 'good' ? <TrendingUp className="h-4 w-4" /> : <AlertTriangle className="h-4 w-4" />}
                      <span className="text-sm font-medium">{budgetStatus.message}</span>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-8">
                  <DollarSign className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500 dark:text-gray-400">
                    Enter your trip details to get a personalized budget estimate
                  </p>
                </div>
              )}
            </Card>
          </motion.div>

          {/* AI Suggestions */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Card className="p-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                AI Recommendations
              </h2>
              
              {suggestions.length > 0 ? (
                <div className="space-y-4">
                  {suggestions.map((suggestion, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 bg-sky-50 dark:bg-sky-900/20 rounded-lg">
                      <Lightbulb className="h-5 w-5 text-sky-500 mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-gray-700 dark:text-gray-300">{suggestion}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Lightbulb className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500 dark:text-gray-400">
                    Get personalized money-saving tips after estimating your budget
                  </p>
                </div>
              )}
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};