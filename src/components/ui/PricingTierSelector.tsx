import React from 'react';
import { Check, Euro } from 'lucide-react';

interface PricingTier {
  id: string;
  name: string;
  description: string;
  multiplier: number;
  features: string[];
  recommended?: boolean;
}

interface PricingTierSelectorProps {
  selectedTier: PricingTier | null;
  onTierSelect: (tier: PricingTier) => void;
  basePrice: number;
  weight: number;
  className?: string;
}

const pricingTiers: PricingTier[] = [
  {
    id: 'eco',
    name: 'Économique',
    description: 'Solution abordable pour colis non urgents',
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
    name: 'Standard',
    description: 'Service équilibré qualité/prix',
    multiplier: 1.3,
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
    name: 'Express',
    description: 'Service premium pour colis urgents',
    multiplier: 1.8,
    features: [
      'Transport express',
      'Suivi GPS temps réel',
      'Support VIP 24/7',
      'Photos + vidéo livraison',
      'Remise en main propre'
    ]
  }
];

export const PricingTierSelector: React.FC<PricingTierSelectorProps> = ({
  selectedTier,
  onTierSelect,
  basePrice,
  weight,
  className = '',
}) => {
  const calculatePrice = (tier: PricingTier) => {
    return Math.round(basePrice * weight * tier.multiplier * 100) / 100;
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Choisissez votre service
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {pricingTiers.map((tier) => {
          const price = calculatePrice(tier);
          const isSelected = selectedTier?.id === tier.id;
          
          return (
            <div
              key={tier.id}
              onClick={() => onTierSelect(tier)}
              className={`
                relative p-6 rounded-lg border-2 cursor-pointer transition-all
                ${isSelected 
                  ? 'border-primary-500 bg-primary-50' 
                  : 'border-gray-200 hover:border-primary-300 bg-white'
                }
              `}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-lg bg-primary-100">
                    <Euro className="h-5 w-5 text-primary-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{tier.name}</h4>
                    <p className="text-sm text-gray-500">{tier.description}</p>
                  </div>
                </div>
                
                {isSelected && (
                  <div className="w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center">
                    <Check className="h-4 w-4 text-white" />
                  </div>
                )}
              </div>

              {/* Price */}
              <div className="mb-4">
                <div className="flex items-baseline space-x-1">
                  <span className="text-2xl font-bold text-gray-900">{price}€</span>
                  <span className="text-gray-500">total</span>
                </div>
                <p className="text-sm text-gray-500">
                  {(price / weight).toFixed(2)}€/kg × {weight}kg
                </p>
              </div>

              {/* Features */}
              <ul className="space-y-2">
                {tier.features.map((feature, index) => (
                  <li key={index} className="flex items-center space-x-2 text-sm text-gray-600">
                    <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              {/* Popular badge for standard */}
              {tier.recommended && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-primary-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                    Populaire
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};