export interface Location {
  lat: number;
  lng: number;
  name?: string;
}

export interface SafetyZone {
  id: string;
  name: string;
  type: 'safe' | 'warning' | 'restricted';
  coordinates: Location[];
  description: string;
}

export interface RouteInfo {
  distance: string;
  duration: string;
  safetyScore: number;
  warnings: string[];
}

class MapService {
  private apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY || 'demo-key';

  async getSafetyZones(location: Location): Promise<SafetyZone[]> {
    // Mock safety zones data
    await new Promise(resolve => setTimeout(resolve, 1000));

    return [
      {
        id: 'safe-1',
        name: 'Tourist District',
        type: 'safe',
        coordinates: [
          { lat: location.lat + 0.01, lng: location.lng + 0.01 },
          { lat: location.lat + 0.01, lng: location.lng - 0.01 },
          { lat: location.lat - 0.01, lng: location.lng - 0.01 },
          { lat: location.lat - 0.01, lng: location.lng + 0.01 }
        ],
        description: 'Well-lit tourist area with high police presence'
      },
      {
        id: 'warning-1',
        name: 'Construction Zone',
        type: 'warning',
        coordinates: [
          { lat: location.lat + 0.02, lng: location.lng + 0.02 },
          { lat: location.lat + 0.02, lng: location.lng + 0.015 },
          { lat: location.lat + 0.015, lng: location.lng + 0.015 },
          { lat: location.lat + 0.015, lng: location.lng + 0.02 }
        ],
        description: 'Active construction area - use caution'
      },
      {
        id: 'restricted-1',
        name: 'High Crime Area',
        type: 'restricted',
        coordinates: [
          { lat: location.lat - 0.02, lng: location.lng - 0.02 },
          { lat: location.lat - 0.02, lng: location.lng - 0.015 },
          { lat: location.lat - 0.015, lng: location.lng - 0.015 },
          { lat: location.lat - 0.015, lng: location.lng - 0.02 }
        ],
        description: 'Avoid this area, especially at night'
      }
    ];
  }

  async calculateSafeRoute(from: Location, to: Location): Promise<RouteInfo> {
    // Mock route calculation
    await new Promise(resolve => setTimeout(resolve, 1500));

    const distance = this.calculateDistance(from, to);
    const warnings = [];

    if (distance > 5) {
      warnings.push('Long walking distance - consider public transport');
    }

    return {
      distance: `${distance.toFixed(1)} km`,
      duration: `${Math.round(distance * 12)} minutes`,
      safetyScore: Math.round(70 + Math.random() * 25),
      warnings
    };
  }

  async getNearbyPlaces(location: Location, type: string): Promise<any[]> {
    // Mock nearby places
    await new Promise(resolve => setTimeout(resolve, 1000));

    const places = [
      { name: 'Local Restaurant', type: 'restaurant', rating: 4.5, distance: '0.2 km' },
      { name: 'Coffee Shop', type: 'cafe', rating: 4.2, distance: '0.1 km' },
      { name: 'Pharmacy', type: 'pharmacy', rating: 4.0, distance: '0.3 km' },
      { name: 'ATM', type: 'atm', rating: 4.0, distance: '0.1 km' },
      { name: 'Tourist Info', type: 'tourist_info', rating: 4.3, distance: '0.4 km' }
    ];

    return places.filter(place => type === 'all' || place.type === type);
  }

  private calculateDistance(from: Location, to: Location): number {
    const R = 6371; // Earth's radius in km
    const dLat = this.toRad(to.lat - from.lat);
    const dLng = this.toRad(to.lng - from.lng);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(this.toRad(from.lat)) * Math.cos(this.toRad(to.lat)) *
              Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  private toRad(degrees: number): number {
    return degrees * (Math.PI / 180);
  }
}

export const mapService = new MapService();