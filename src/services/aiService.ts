// AI Service for trip planning and budget estimation
export interface TripPlanRequest {
  destination: string;
  budget: number;
  startDate: string;
  endDate: string;
  groupSize: number;
  preferences: string[];
}

export interface ItineraryDay {
  day: number;
  date: string;
  activities: Activity[];
  totalCost: number;
}

export interface Activity {
  id: string;
  time: string;
  title: string;
  description: string;
  location: string;
  cost: number;
  category: 'transport' | 'accommodation' | 'food' | 'activity' | 'shopping';
  duration: string;
}

export interface BudgetBreakdown {
  transport: number;
  accommodation: number;
  food: number;
  activities: number;
  shopping: number;
  emergency: number;
  total: number;
}

class AIService {
  private apiKey = import.meta.env.VITE_REACT_APP_OPENAI_API_KEY || 'demo-key';

  async generateTripPlan(request: TripPlanRequest): Promise<ItineraryDay[]> {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Mock AI-generated itinerary
    const days = this.calculateDays(request.startDate, request.endDate);
    const dailyBudget = request.budget / days;

    return Array.from({ length: days }, (_, index) => ({
      day: index + 1,
      date: this.addDays(request.startDate, index),
      activities: this.generateDayActivities(request.destination, dailyBudget, index + 1),
      totalCost: Math.round(dailyBudget * (0.8 + Math.random() * 0.4))
    }));
  }

  async estimateBudget(
    destination: string,
    days: number,
    groupSize: number,
    preferences: string[]
  ): Promise<BudgetBreakdown> {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Mock budget estimation based on destination and preferences
    const baseMultiplier = this.getDestinationMultiplier(destination);
    const groupMultiplier = Math.max(0.7, 1 - (groupSize - 1) * 0.1);

    const transport = Math.round(150 * days * baseMultiplier * groupMultiplier);
    const accommodation = Math.round(120 * days * baseMultiplier * groupMultiplier);
    const food = Math.round(80 * days * baseMultiplier * groupMultiplier);
    const activities = Math.round(100 * days * baseMultiplier);
    const shopping = Math.round(50 * days * baseMultiplier);
    const emergency = Math.round((transport + accommodation + food + activities) * 0.1);

    return {
      transport,
      accommodation,
      food,
      activities,
      shopping,
      emergency,
      total: transport + accommodation + food + activities + shopping + emergency
    };
  }

  async getSuggestions(query: string): Promise<string[]> {
    // Mock AI suggestions
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const suggestions = [
      "Consider visiting during off-peak season for better prices",
      "Book accommodations in advance for group discounts",
      "Try local street food for authentic and budget-friendly meals",
      "Use public transportation to save on travel costs",
      "Look for free walking tours and city attractions"
    ];

    return suggestions.slice(0, 3);
  }

  private calculateDays(startDate: string, endDate: string): number {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
  }

  private addDays(dateString: string, days: number): string {
    const date = new Date(dateString);
    date.setDate(date.getDate() + days);
    return date.toISOString().split('T')[0];
  }

  private getDestinationMultiplier(destination: string): number {
    const expensive = ['tokyo', 'london', 'new york', 'paris', 'zurich'];
    const moderate = ['barcelona', 'rome', 'amsterdam', 'berlin', 'prague'];
    
    const dest = destination.toLowerCase();
    if (expensive.some(city => dest.includes(city))) return 1.5;
    if (moderate.some(city => dest.includes(city))) return 1.2;
    return 1.0;
  }

  private generateDayActivities(destination: string, budget: number, day: number): Activity[] {
    const activities: Activity[] = [
      {
        id: `${day}-1`,
        time: "09:00 AM",
        title: `Explore ${destination} City Center`,
        description: "Walking tour of the historic downtown area with local guide",
        location: `${destination} Downtown`,
        cost: Math.round(budget * 0.3),
        category: 'activity',
        duration: "3 hours"
      },
      {
        id: `${day}-2`,
        time: "12:30 PM",
        title: "Local Cuisine Experience",
        description: "Authentic local restaurant recommended by AI",
        location: `Traditional Restaurant in ${destination}`,
        cost: Math.round(budget * 0.25),
        category: 'food',
        duration: "1.5 hours"
      },
      {
        id: `${day}-3`,
        time: "02:30 PM",
        title: "Cultural Attraction Visit",
        description: "Visit to the most popular cultural site",
        location: `${destination} Museum/Monument`,
        cost: Math.round(budget * 0.2),
        category: 'activity',
        duration: "2 hours"
      },
      {
        id: `${day}-4`,
        time: "07:00 PM",
        title: "Evening Entertainment",
        description: "Local entertainment or nightlife experience",
        location: `${destination} Entertainment District`,
        cost: Math.round(budget * 0.25),
        category: 'activity',
        duration: "3 hours"
      }
    ];

    return activities;
  }
}

export const aiService = new AIService();