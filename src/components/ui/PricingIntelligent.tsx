import React, { useState } from 'react';
import { Euro, TrendingUp, Shield, Info, BarChart3 } from 'lucide-react';

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

  // Calcul de prix simple basé sur la distance estimée
  const calculateBasePrice = () => {
    // Prix de base selon la popularité de la route
    const popularRoutes = [
      { route: 'Paris-Dakar', basePrice: 25 },
      { route: 'Londres-Lagos', basePrice: 30 },
      { route: 'Bruxelles-Kinshasa', basePrice: 28 },
      { route: 'Milan-Casablanca', basePrice: 22 },
      { route: 'Madrid-Bamako', basePrice: 26 },
    ];

    const routeKey = `${origin.split(',')[0]}-${destination.split(',')[0]}`;
    const reverseRouteKey = `${destination.split(',')[0]}-${origin.split(',')[0]}`;
    
    const foundRoute = popularRoutes.find(r => 
      r.route === routeKey || r.route === reverseRouteKey
    );

    return foundRoute ? foundRoute.basePrice : 24; // Prix par défaut
  };

  const basePrice = calculateBasePrice();

  // Ajustement selon le rating du transporteur
  const ratingMultiplier = transporterRating >= 4.5 ? 1.1 : 
                          transporterRating >= 4.0 ? 1.05 : 1.0;

  const tiers: PricingTier[] = [
    {
      id: 'economique',
      name: '💰 Économique',
      description: 'Votre prix pour ce service',
      multiplier: 1.0,
      features: [
        'Livraison standard',
        'Assurance de base',
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
        'Livraison prioritaire',
        'Assurance étendue',
        'Suivi temps réel',
        'Support prioritaire',
        'Photos de livraison'
      ],
      recommended: true
    },
    {
      id: 'express',
      name: '🚀 Express',
      description: '+30% - Priorité absolue',
      multiplier: 1.30,
      features: [
        'Livraison express',
        'Assurance premium',
        'Suivi GPS temps réel',
        'Support VIP 24/7',
        'Photos + vidéo livraison',
        'Remise en main propre'
      ]
    }
  ];

  const getPrice = (tier: PricingTier) => {
    return Math.round(basePrice * tier.multiplier * ratingMultiplier);
  };

  const getRouteInfo = () => {
    const originCity = origin.split(',')[0];
    const destinationCity = destination.split(',')[0];
    
    // Distance estimée simple
    const estimatedDistance = originCity === 'Paris' && destinationCity === 'Dakar' ? 4200 :
                             originCity === 'Londres' && destinationCity === 'Lagos' ? 5100 :
                             originCity === 'Bruxelles' && destinationCity === 'Kinshasa' ? 6200 :
                             4500; // Distance par défaut

    return {
      distance: estimatedDistance,
      category: 'Populaire',
      estimatedDemand: 'Moyenne'
    };
  };

  const routeInfo = getRouteInfo();

  return (
    <div className={`space-y-6 ${className}`}>
      <div className="text-center">
        <div className="flex items-center justify-center space-x-2 mb-4">
          <TrendingUp className="h-6 w-6 text-primary-600" />
          <h3 className="text-xl font-semibold text-gray-800">Choisissez votre stratégie tarifaire</h3>
        </div>
        <p className="text-gray-600">
          Positionnez vos prix selon votre stratégie commerciale
        </p>
      </div>

      {/* Route Insights */}
      <div className="bg-gradient-to-r from-primary-50 to-blue-50 border border-primary-200 rounded-2xl p-4">
        <div className="flex items-center space-x-3 mb-3">
          <BarChart3 className="h-5 w-5 text-primary-600" />
          <h4 className="font-medium text-primary-900">Analyse de route</h4>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
          <div>
            <span className="text-primary-700 font-medium">Distance:</span>
            <div className="text-primary-900">{routeInfo.distance.toLocaleString()} km</div>
          </div>
          <div>
            <span className="text-primary-700 font-medium">Popularité:</span>
            <div className="text-primary-900">{routeInfo.category}</div>
          </div>
          <div>
            <span className="text-primary-700 font-medium">Demande:</span>
            <div className="text-primary-900">{routeInfo.estimatedDemand}</div>
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
                  Prix suggéré
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