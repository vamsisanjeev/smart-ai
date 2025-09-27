import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Users, DollarSign, Sparkles, Clock } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { aiService, ItineraryDay, TripPlanRequest } from '../services/aiService';

export const TripPlanner: React.FC = () => {
  const [formData, setFormData] = useState<TripPlanRequest>({
    destination: '',
    budget: 1000,
    startDate: '',
    endDate: '',
    groupSize: 1,
    preferences: []
  });
  const [itinerary, setItinerary] = useState<ItineraryDay[]>([]);
  const [loading, setLoading] = useState(false);

  const preferences = [
    'Adventure', 'Culture', 'Food', 'Nightlife', 'Nature', 'Shopping', 'History', 'Art'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const result = await aiService.generateTripPlan(formData);
      setItinerary(result);
    } catch (error) {
      console.error('Error generating trip plan:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePreferenceToggle = (preference: string) => {
    setFormData(prev => ({
      ...prev,
      preferences: prev.preferences.includes(preference)
        ? prev.preferences.filter(p => p !== preference)
        : [...prev.preferences, preference]
    }));
  };

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
            AI Trip Planner
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Let our AI create the perfect itinerary based on your preferences, budget, and travel style.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Planning Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Card className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Plan Your Trip
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    <MapPin className="inline h-4 w-4 mr-2" />
                    Destination
                  </label>
                  <input
                    type="text"
                    value={formData.destination}
                    onChange={(e) => setFormData(prev => ({ ...prev, destination: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
                    placeholder="Where do you want to go?"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      <Calendar className="inline h-4 w-4 mr-2" />
                      Start Date
                    </label>
                    <input
                      type="date"
                      value={formData.startDate}
                      onChange={(e) => setFormData(prev => ({ ...prev, startDate: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      <Calendar className="inline h-4 w-4 mr-2" />
                      End Date
                    </label>
                    <input
                      type="date"
                      value={formData.endDate}
                      onChange={(e) => setFormData(prev => ({ ...prev, endDate: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      <DollarSign className="inline h-4 w-4 mr-2" />
                      Budget ($)
                    </label>
                    <input
                      type="number"
                      value={formData.budget}
                      onChange={(e) => setFormData(prev => ({ ...prev, budget: parseInt(e.target.value) }))}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
                      min="100"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      <Users className="inline h-4 w-4 mr-2" />
                      Group Size
                    </label>
                    <input
                      type="number"
                      value={formData.groupSize}
                      onChange={(e) => setFormData(prev => ({ ...prev, groupSize: parseInt(e.target.value) }))}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
                      min="1"
                      max="20"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    <Sparkles className="inline h-4 w-4 mr-2" />
                    Preferences
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {preferences.map((preference) => (
                      <button
                        key={preference}
                        type="button"
                        onClick={() => handlePreferenceToggle(preference)}
                        className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                          formData.preferences.includes(preference)
                            ? 'bg-sky-500 text-white'
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                        }`}
                      >
                        {preference}
                      </button>
                    ))}
                  </div>
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Generating Your Perfect Trip...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-5 w-5 mr-2" />
                      Generate AI Trip Plan
                    </>
                  )}
                </Button>
              </form>
            </Card>
          </motion.div>

          {/* Itinerary Results */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {itinerary.length > 0 ? (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Your AI-Generated Itinerary
                </h2>
                {itinerary.map((day) => (
                  <Card key={day.day} className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                        Day {day.day} - {day.date}
                      </h3>
                      <span className="text-lg font-bold text-sky-500">
                        ${day.totalCost}
                      </span>
                    </div>
                    <div className="space-y-4">
                      {day.activities.map((activity) => (
                        <div key={activity.id} className="border-l-4 border-sky-500 pl-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <Clock className="h-4 w-4 text-gray-500" />
                              <span className="text-sm font-medium text-gray-500">
                                {activity.time}
                              </span>
                              <span className="text-sm text-gray-400">
                                ({activity.duration})
                              </span>
                            </div>
                            <span className="text-sm font-semibold text-gray-900 dark:text-white">
                              ${activity.cost}
                            </span>
                          </div>
                          <h4 className="font-semibold text-gray-900 dark:text-white mt-1">
                            {activity.title}
                          </h4>
                          <p className="text-gray-600 dark:text-gray-300 text-sm">
                            {activity.description}
                          </p>
                          <p className="text-gray-500 text-sm flex items-center mt-1">
                            <MapPin className="h-3 w-3 mr-1" />
                            {activity.location}
                          </p>
                        </div>
                      ))}
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="p-12 text-center">
                <Sparkles className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Ready to Plan Your Adventure?
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Fill out the form to get your personalized AI-generated itinerary with detailed daily plans and cost estimates.
                </p>
              </Card>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};