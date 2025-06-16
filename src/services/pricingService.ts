// Service de pricing intelligent IA pour KiloConnect
// Algorithme révolutionnaire qui écrase la concurrence

export interface PricingParams {
  origin: string;
  destination: string;
  distance: number;
  transporterRating: number;
  routePopularity: number;
  seasonality: 'high' | 'normal' | 'low';
  urgency: number; // jours avant départ
  transporterHistory: {
    totalTrips: number;
    successRate: number;
    avgRating: number;
  };
  packageWeight?: number;
  packageValue?: number;
}

export interface PricingResult {
  economique: number;
  standard: number;
  express: number;
  breakdown: {
    basePrice: number;
    distanceCost: number;
    trustBonus: number;
    experienceBonus: number;
    demandMultiplier: number;
    seasonMultiplier: number;
    urgencyMultiplier: number;
  };
}

class PricingService {
  // Base de données des distances entre villes principales
  private readonly DISTANCE_MATRIX: Record<string, Record<string, number>> = {
    'Paris': {
      'Dakar': 4200,
      'Lagos': 5100,
      'Abidjan': 4800,
      'Casablanca': 1800,
      'Bamako': 3200,
      'Accra': 5200,
      'Kinshasa': 6200,
      'Tunis': 1500,
    },
    'Londres': {
      'Lagos': 5100,
      'Dakar': 4500,
      'Accra': 5300,
      'Abidjan': 5000,
      'Freetown': 4800,
      'Casablanca': 2200,
    },
    'Bruxelles': {
      'Kinshasa': 6200,
      'Dakar': 4300,
      'Lagos': 5200,
      'Abidjan': 4900,
      'Bamako': 3400,
    },
    'Milan': {
      'Casablanca': 1800,
      'Tunis': 1200,
      'Alger': 1400,
      'Dakar': 4600,
      'Lagos': 5400,
    },
    'Madrid': {
      'Casablanca': 1000,
      'Dakar': 3800,
      'Bamako': 2800,
      'Abidjan': 4200,
      'Las Palmas': 1500,
    },
    'New York': {
      'Lagos': 8500,
      'Accra': 8200,
      'Dakar': 6800,
      'Casablanca': 6500,
      'Abidjan': 8400,
    },
    'Toronto': {
      'Lagos': 8800,
      'Accra': 8500,
      'Dakar': 7100,
      'Kinshasa': 9200,
    }
  };

  // Popularité des routes (0-1)
  private readonly ROUTE_POPULARITY: Record<string, number> = {
    'Paris-Dakar': 0.95,
    'Londres-Lagos': 0.90,
    'Bruxelles-Kinshasa': 0.85,
    'Milan-Casablanca': 0.75,
    'Madrid-Bamako': 0.70,
    'New York-Lagos': 0.80,
    'Toronto-Accra': 0.65,
    'Amsterdam-Abidjan': 0.70,
    'Berlin-Nairobi': 0.60,
    'Rome-Tunis': 0.75,
  };

  calculateIntelligentPricing(params: PricingParams): PricingResult {
    const {
      origin,
      destination,
      transporterRating,
      urgency,
      transporterHistory,
      seasonality = 'normal'
    } = params;

    // 1. PRIX DE BASE
    const basePrice = 15; // Prix minimum viable

    // 2. COÛT DISTANCE
    const distance = this.getDistance(origin, destination);
    const distanceCost = (distance / 100) * 0.80; // 0.80€ par 100km

    // 3. BONUS CONFIANCE
    const trustBonus = transporterRating >= 4.5 ? 5 : 
                      transporterRating >= 4.0 ? 3 : 
                      transporterRating >= 3.5 ? 1 : 0;

    // 4. AJUSTEMENT DEMANDE/OFFRE
    const routePopularity = this.getRoutePopularity(origin, destination);
    const demandMultiplier = routePopularity > 0.8 ? 1.15 :  // Route très demandée +15%
                            routePopularity > 0.6 ? 1.05 :   // Route populaire +5%
                            routePopularity > 0.4 ? 1.0 :    // Route normale
                            0.9;                              // Route peu demandée -10%

    // 5. FACTEUR SAISONNIER
    const seasonMultiplier = seasonality === 'high' ? 1.1 :  // Haute saison +10%
                            seasonality === 'low' ? 0.95 :   // Basse saison -5%
                            1.0;                              // Saison normale

    // 6. URGENCE
    const urgencyMultiplier = urgency <= 2 ? 1.2 :   // Urgent (<48h) +20%
                             urgency <= 7 ? 1.05 :   // Rapide (<7j) +5%
                             1.0;                     // Normal

    // 7. EXPÉRIENCE TRANSPORTEUR
    const experienceBonus = transporterHistory.totalTrips > 50 ? 3 :
                           transporterHistory.totalTrips > 20 ? 2 :
                           transporterHistory.totalTrips > 5 ? 1 : 0;

    // 8. BONUS TAUX DE RÉUSSITE
    const successRateBonus = transporterHistory.successRate >= 0.98 ? 2 :
                            transporterHistory.successRate >= 0.95 ? 1 : 0;

    // CALCUL FINAL
    const calculatedPrice = Math.round(
      (basePrice + distanceCost + trustBonus + experienceBonus + successRateBonus) *
      demandMultiplier * seasonMultiplier * urgencyMultiplier
    );

    // 3 TIERS
    const economique = Math.max(calculatedPrice, 12); // Prix minimum
    const standard = Math.round(calculatedPrice * 1.15);  // +15%
    const express = Math.round(calculatedPrice * 1.30);   // +30%

    return {
      economique,
      standard,
      express,
      breakdown: {
        basePrice,
        distanceCost,
        trustBonus,
        experienceBonus: experienceBonus + successRateBonus,
        demandMultiplier,
        seasonMultiplier,
        urgencyMultiplier,
      }
    };
  }

  private getDistance(origin: string, destination: string): number {
    const originCity = origin.split(',')[0].trim();
    const destinationCity = destination.split(',')[0].trim();
    
    const distance = this.DISTANCE_MATRIX[originCity]?.[destinationCity] ||
                    this.DISTANCE_MATRIX[destinationCity]?.[originCity];
    
    if (distance) return distance;
    
    // Calcul approximatif pour nouvelles routes
    return this.estimateDistance(originCity, destinationCity);
  }

  private estimateDistance(origin: string, destination: string): number {
    // Estimation basée sur les continents
    const europeanCities = ['Paris', 'Londres', 'Bruxelles', 'Milan', 'Madrid', 'Berlin', 'Amsterdam', 'Rome'];
    const africanCities = ['Dakar', 'Lagos', 'Abidjan', 'Casablanca', 'Bamako', 'Accra', 'Kinshasa', 'Tunis'];
    const americanCities = ['New York', 'Toronto', 'Montréal', 'Los Angeles', 'Chicago'];
    
    const isOriginEuropean = europeanCities.includes(origin);
    const isDestinationAfrican = africanCities.includes(destination);
    const isOriginAmerican = americanCities.includes(origin);
    
    if (isOriginEuropean && isDestinationAfrican) return 4500; // Europe → Afrique
    if (isOriginAmerican && isDestinationAfrican) return 8000; // Amérique → Afrique
    if (isOriginEuropean && americanCities.includes(destination)) return 7000; // Europe → Amérique
    
    return 5000; // Distance par défaut
  }

  private getRoutePopularity(origin: string, destination: string): number {
    const originCity = origin.split(',')[0].trim();
    const destinationCity = destination.split(',')[0].trim();
    const routeKey = `${originCity}-${destinationCity}`;
    const reverseRouteKey = `${destinationCity}-${originCity}`;
    
    return this.ROUTE_POPULARITY[routeKey] || 
           this.ROUTE_POPULARITY[reverseRouteKey] || 
           0.5; // Popularité moyenne pour nouvelles routes
  }

  // Méthodes utilitaires pour l'interface
  getRouteInsights(origin: string, destination: string) {
    const distance = this.getDistance(origin, destination);
    const popularity = this.getRoutePopularity(origin, destination);
    
    return {
      distance,
      popularity,
      category: popularity > 0.8 ? 'Très populaire' :
               popularity > 0.6 ? 'Populaire' :
               popularity > 0.4 ? 'Modérée' : 'Émergente',
      estimatedDemand: popularity > 0.8 ? 'Forte' :
                      popularity > 0.6 ? 'Moyenne' : 'Faible'
    };
  }

  // Simulation de facteurs saisonniers
  getCurrentSeasonality(): 'high' | 'normal' | 'low' {
    const month = new Date().getMonth() + 1;
    
    // Décembre-Janvier: Fêtes
    if (month === 12 || month === 1) return 'high';
    
    // Juillet-Août: Vacances
    if (month === 7 || month === 8) return 'high';
    
    // Mars-Mai: Basse saison
    if (month >= 3 && month <= 5) return 'low';
    
    return 'normal';
  }

  // Calcul de l'urgence basé sur la date de départ
  calculateUrgency(departureDate: Date): number {
    const now = new Date();
    const diffTime = departureDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return Math.max(diffDays, 0);
  }
}

export const pricingService = new PricingService();