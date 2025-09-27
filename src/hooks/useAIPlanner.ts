import { useState } from 'react';
import { Trip, ItineraryItem } from '../types';

export const useAIPlanner = () => {
  const [loading, setLoading] = useState(false);
  const [currentTrip, setCurrentTrip] = useState<Trip | null>(null);

  const generateItinerary = async (
    destination: string,
    budget: number,
    days: number,
    preferences: string[]
  ): Promise<Trip> => {
    setLoading(true);
    
    // Simulate AI planning
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const mockItinerary: ItineraryItem[] = Array.from({ length: days }, (_, dayIndex) => ({
      id: `day-${dayIndex + 1}`,
      day: dayIndex + 1,
      time: '09:00 AM',
      activity: `Explore ${destination} - Day ${dayIndex + 1}`,
      location: `${destination} City Center`,
      cost: Math.round(budget / days * 0.8),
      category: dayIndex % 2 === 0 ? 'activity' : 'food'
    }));

    const trip: Trip = {
      id: Date.now().toString(),
      name: `${destination} Adventure`,
      destination,
      startDate: new Date(),
      endDate: new Date(Date.now() + days * 24 * 60 * 60 * 1000),
      budget,
      participants: [],
      itinerary: mockItinerary
    };

    setCurrentTrip(trip);
    setLoading(false);
    return trip;
  };

  const estimateBudget = async (destination: string, days: number): Promise<number> => {
    // Simulate budget estimation
    await new Promise(resolve => setTimeout(resolve, 1000));
    return Math.round((200 + Math.random() * 300) * days);
  };

  return {
    loading,
    currentTrip,
    generateItinerary,
    estimateBudget,
    setCurrentTrip
  };
};