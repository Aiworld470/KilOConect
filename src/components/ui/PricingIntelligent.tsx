import React, { useState } from 'react';
import { Euro, TrendingUp, Shield, Info, BarChart3, AlertTriangle } from 'lucide-react';

interface PricingTier {
  id: 'economique' | 'standard' | 'express';
  name: string;
  description: string;
  multiplier: number;
  features: string[];
  recommended?: boolean;
}

interface PricingIntelligentProps {
  origin: string;
  destination: string;
  transporterRating: number;
  selectedTier: string | null;
  onTierSelect: (tierId: string) => void;
  departureDate?: Date;
  className?: string;
}

export const PricingIntelligent: React.FC<PricingIntelligentProps> = ({
  origin,
  destination,
  transporterRating,
  selectedTier,
  onTierSelect,
  departureDate,
  className = '',
}) => {
  const [showBreakdown, setShowBreakdown] = useState(false);

  // Calcul de prix adapté au marché africain
  const calculateRegionalPricing = () => {
    const routeType = getRouteType(origin, destination);
    const basePrices = {
      'Europe-Africa': { eco: 10, std: 15, exp: 22 },
      'Africa-Africa': { eco: 4, std: 7, exp: 12 },
      'Europe-Europe': { eco: 6, std: 10, exp: 16 },
      'America-Africa': { eco: 12, std: 18, exp: 25 }
    };

    return basePrices[routeType as keyof typeof basePrices] || basePrices['Europe-Africa'];
  };

  const getRouteType = (origin: string, destination: string) => {
    const getContinent = (city: string) => {
      const europeanCities = ['Paris', 'Londres', 'Bruxelles', 'Milan', 'Madrid', 'Berlin'];
      const africanCities = ['Dakar', 'Lagos', 'Abidjan', 'Casablanca', 'Bamako', 'Accra', 'Kinshasa'];
      const americanCities = ['New York', 'Toronto', 'Los Angeles', 'Chicago', 'Miami'];
      
      const cityName = city.split(',')[0].trim();
      
      if (europeanCities.includes(cityName)) return 'Europe';
      if (africanCities.includes(cityName)) return 'Africa';
      if (americanCities.includes(cityName)) return 'America';
      return 'Europe';
    };

    const originContinent = getContinent(origin);
    const destinationContinent = getContinent(destination);
    return `${originContinent}-${destinationContinent}`;
  };

  const basePrices = calculateRegionalPricing();
  const routeType = getRouteType(origin, destination);

  // Ajustement selon le rating du transporteur
  const ratingMultiplier = transporterRating >= 4.5 ? 1.1 : 
                          transporterRating >= 4.0 ? 1.05 : 1.0;

  const tiers: PricingTier[] = [
    {
      id: 'economique',
      name: '💰 Économique',
      description: 'Prix optimal pour votre budget',
      multiplier: 1.0,
      features: [
        'Transport sécurisé',
        'Vérification identité',
        'Suivi en ligne',
        'Support client'
      ]
    },
    {
      id: 'standard',
      name: '⭐ Standard',
      description: '+15% - Service premium',
      multiplier: 1.15,
      features: [
        'Transport prioritaire',
        'Suivi temps réel',
        'Support prioritaire',
        'Photos de livraison',
        'Médiation gratuite'
      ],
      recommended: true
    },
    {
      id: 'express',
      name: '🚀 Express',
      description: '+30% - Priorité absolue',
      multiplier: 1.30,
      features: [
        'Transport express',
        'Suivi GPS temps réel',
        'Support VIP 24/7',
        'Photos + vidéo livraison',
        'Remise en main propre',
        'Garantie délai'
      ]
    }
  ];

  const getPrice = (tier: PricingTier) => {
    const basePrice = routeType.includes('Africa-Africa') ? basePrices.eco * 0.85 : basePrices.eco;
    return Math.round(basePrice * tier.multiplier * ratingMultiplier);
  };

  const getRouteInfo = () => {
    const originCity = origin.split(',')[0];
    const destinationCity = destination.split(',')[0];
    
    // Distance estimée selon le type de route
    const distances = {
      'Europe-Africa': 4500,
      'Africa-Africa': 2500,
      'America-Africa': 8000,
      'Europe-Europe': 2000
    };

    const estimatedDistance = distances[routeType as keyof typeof distances] || 4500;

    return {
      distance: estimatedDistance,
      category: routeType.includes('Africa-Africa') ? 'Route locale' : 
               routeType.includes('Europe-Africa') ? 'Route diaspora' : 'Route internationale',
      estimatedDemand: routeType.includes('Europe-Africa') ? 'Forte' : 'Moyenne',
      priceLevel: routeType.includes('Africa-Africa') ? 'Économique' : 'Standard'
    };
  };

  const routeInfo = getRouteInfo();

  return (
    <div className={`space-y-6 ${className}`}>
      <div className="text-center">
        <div className="flex items-center justify-center space-x-2 mb-4">
          <TrendingUp className="h-6 w-6 text-primary-600" />
          <h3 className="text-xl font-semibold text-gray-800">Tarification Libre Optimisée</h3>
        </div>
        <p className="text-gray-600">
          Fixez vos prix selon votre stratégie commerciale
        </p>
      </div>

      {/* Route Insights */}
      <div className="bg-gradient-to-r from-primary-50 to-blue-50 border border-primary-200 rounded-2xl p-4">
        <div className="flex items-center space-x-3 mb-3">
          <BarChart3 className="h-5 w-5 text-primary-600" />
          <h4 className="font-medium text-primary-900">Analyse de marché</h4>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div>
            <span className="text-primary-700 font-medium">Distance:</span>
            <div className="text-primary-900">{routeInfo.distance.toLocaleString()} km</div>
          </div>
          <div>
            <span className="text-primary-700 font-medium">Type:</span>
            <div className="text-primary-900">{routeInfo.category}</div>
          </div>
          <div>
            <span className="text-primary-700 font-medium">Demande:</span>
            <div className="text-primary-900">{routeInfo.estimatedDemand}</div>
          </div>
          <div>
            <span className="text-primary-700 font-medium">Niveau:</span>
            <div className="text-primary-900">{routeInfo.priceLevel}</div>
          </div>
        </div>
      </div>

      {/* Pricing Tiers */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {tiers.map((tier) => {
          const price = getPrice(tier);
          const isSelected = selectedTier === tier.id;
          
          return (
            <div
              key={tier.id}
              onClick={() => onTierSelect(tier.id)}
              className={`
                relative p-6 rounded-2xl border-2 cursor-pointer transition-all duration-200
                ${isSelected 
                  ? 'border-primary-500 bg-primary-50 shadow-premium transform scale-105' 
                  : 'border-gray-200 hover:border-primary-300 bg-white hover:shadow-card'
                }
                ${tier.recommended ? 'ring-2 ring-primary-200' : ''}
              `}
            >
              {/* Recommended Badge */}
              {tier.recommended && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-cta text-white px-4 py-1 rounded-full text-xs font-medium shadow-premium">
                    Recommandé
                  </span>
                </div>
              )}

              {/* Header */}
              <div className="text-center mb-4">
                <h4 className="text-lg font-semibold text-gray-800 mb-1">{tier.name}</h4>
                <p className="text-sm text-gray-600">{tier.description}</p>
              </div>

              {/* Price */}
              <div className="text-center mb-6">
                <div className="flex items-center justify-center space-x-1">
                  <Euro className="h-5 w-5 text-gray-400" />
                  <span className="text-3xl font-bold text-gray-800">{price}</span>
                  <span className="text-gray-500">/kg</span>
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  Prix suggéré marché
                </div>
              </div>

              {/* Features */}
              <ul className="space-y-2">
                {tier.features.map((feature, index) => (
                  <li key={index} className="flex items-center space-x-2 text-sm text-gray-600">
                    <div className="w-1.5 h-1.5 bg-primary-500 rounded-full"></div>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              {/* Selection indicator */}
              {isSelected && (
                <div className="absolute top-4 right-4 w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* NOUVELLE APPROCHE SÉCURITÉ - SANS ASSURANCE */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-6">
        <div className="flex items-center space-x-3 mb-4">
          <Shield className="h-5 w-5 text-green-600" />
          <h3 className="font-medium text-green-900">🛡️ Sécurité par confiance</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mt-0.5">
              <span className="text-green-600 text-lg">🆔</span>
            </div>
            <div>
              <h4 className="font-medium text-green-800">Vérification identité</h4>
              <p className="text-sm text-green-700">Tous les transporteurs vérifiés</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mt-0.5">
              <span className="text-green-600 text-lg">⭐</span>
            </div>
            <div>
              <h4 className="font-medium text-green-800">Système de notation</h4>
              <p className="text-sm text-green-700">Transparence totale sur historique</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mt-0.5">
              <span className="text-green-600 text-lg">📍</span>
            </div>
            <div>
              <h4 className="font-medium text-green-800">Suivi temps réel</h4>
              <p className="text-sm text-green-700">Visibilité complète trajet</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mt-0.5">
              <span className="text-green-600 text-lg">🤝</span>
            </div>
            <div>
              <h4 className="font-medium text-green-800">Médiation gratuite</h4>
              <p className="text-sm text-green-700">Résolution conflits par équipe</p>
            </div>
          </div>
        </div>
        
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
            <div>
              <h4 className="font-medium text-yellow-800 mb-1">⚠️ Important</h4>
              <p className="text-sm text-yellow-700">
                Le transport s'effectue aux risques de l'expéditeur. 
                KiloConnect facilite la mise en relation mais ne garantit 
                pas la livraison. Vérifiez soigneusement le profil 
                du transporteur avant envoi.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Strategy Explanation */}
      <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
        <div className="flex items-center space-x-3 mb-4">
          <Info className="h-6 w-6 text-blue-600" />
          <h4 className="font-medium text-blue-900">
            💡 Stratégies de positionnement
          </h4>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-blue-800">
          <div>
            <strong>Économique :</strong> Maximisez vos réservations avec des prix compétitifs
          </div>
          <div>
            <strong>Standard :</strong> Équilibre optimal entre prix et qualité de service
          </div>
          <div>
            <strong>Express :</strong> Positionnement premium pour clients exigeants
          </div>
        </div>
      </div>

      {/* Security Notice */}
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
        <div className="flex items-start space-x-3">
          <Shield className="h-5 w-5 text-gray-600 mt-0.5" />
          <div>
            <span className="font-medium text-gray-800">Liberté tarifaire totale</span>
            <p className="text-sm text-gray-600 mt-1">
              Vous êtes libre de fixer vos prix selon votre stratégie commerciale. 
              Ces suggestions sont basées sur l'analyse du marché.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};