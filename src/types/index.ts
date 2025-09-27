export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
}

export interface Trip {
  id: string;
  name: string;
  destination: string;
  startDate: Date;
  endDate: Date;
  budget: number;
  participants: string[];
  itinerary: ItineraryItem[];
}

export interface ItineraryItem {
  id: string;
  day: number;
  time: string;
  activity: string;
  location: string;
  cost: number;
  category: 'transport' | 'accommodation' | 'food' | 'activity' | 'shopping';
}

export interface GroupMember {
  id: string;
  name: string;
  location: {
    lat: number;
    lng: number;
    timestamp: Date;
  };
  status: 'online' | 'offline' | 'sos';
}

export interface SafetyZone {
  id: string;
  name: string;
  type: 'safe' | 'restricted' | 'warning';
  coordinates: Array<{ lat: number; lng: number }>;
}