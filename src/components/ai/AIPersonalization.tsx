import React from 'react';
import { User, Target, Zap, TrendingUp } from 'lucide-react';

interface AIPersonalizationProps {
  personalization: any;
  className?: string;
}

export const AIPersonalization: React.FC<AIPersonalizationProps> = ({ 
  personalization, 
  className = '' 
}) => {
  if (!personalization) return null;

  return (
    <div className={`bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 rounded-2xl p-6 ${className}`}>
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-12 h-12 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-xl flex items-center justify-center">
          <User className="h-6 w-6 text-indigo-600" />
        </div>
        <div>
          <h3 className="font-semibold text-indigo-900">🎯 Expérience Personnalisée IA</h3>
          <p className="text-sm text-indigo-700">Interface adaptée à votre profil</p>
        </div>
      </div>

      {/* Layout Optimizations */}
      {personalization.layout && (
        <div className="mb-6">
          <h4 className="font-medium text-indigo-900 mb-3 flex items-center space-x-2">
            <Target className="h-4 w-4" />
            <span>Interface Optimisée</span>
          </h4>
          <div className="grid grid-cols-2 gap-3">
            {personalization.layout.prioritizeSearch && (
              <div className="bg-white/50 p-3 rounded-xl">
                <div className="text-sm font-medium text-indigo-800">🔍 Recherche Prioritaire</div>
                <div className="text-xs text-indigo-600">Basé sur votre historique</div>
              </div>
            )}
            {personalization.layout.showPriceFirst && (
              <div className="bg-white/50 p-3 rounded-xl">
                <div className="text-sm font-medium text-indigo-800">💰 Prix en Premier</div>
                <div className="text-xs text-indigo-600">Selon vos préférences</div>
              </div>
            )}
            {personalization.layout.emphasizeSpeed && (
              <div className="bg-white/50 p-3 rounded-xl">
                <div className="text-sm font-medium text-indigo-800">⚡ Rapidité Mise en Avant</div>
                <div className="text-xs text-indigo-600">Profil urgence détecté</div>
              </div>
            )}
            {personalization.layout.mobileOptimized && (
              <div className="bg-white/50 p-3 rounded-xl">
                <div className="text-sm font-medium text-indigo-800">📱 Mobile Optimisé</div>
                <div className="text-xs text-indigo-600">Interface adaptée</div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Content Personalization */}
      {personalization.content && (
        <div className="mb-6">
          <h4 className="font-medium text-indigo-900 mb-3 flex items-center space-x-2">
            <Zap className="h-4 w-4" />
            <span>Contenu Personnalisé</span>
          </h4>
          <div className="space-y-3">
            {personalization.content.recommendedRoutes?.length > 0 && (
              <div className="bg-white/50 p-3 rounded-xl">
                <div className="text-sm font-medium text-indigo-800 mb-1">🗺️ Routes Recommandées</div>
                <div className="text-xs text-indigo-600">
                  {personalization.content.recommendedRoutes.join(', ')}
                </div>
              </div>
            )}
            {personalization.content.priceRange && (
              <div className="bg-white/50 p-3 rounded-xl">
                <div className="text-sm font-medium text-indigo-800 mb-1">💵 Gamme de Prix Adaptée</div>
                <div className="text-xs text-indigo-600">
                  {personalization.content.priceRange.min}€ - {personalization.content.priceRange.max}€
                </div>
              </div>
            )}
            {personalization.content.communicationTone && (
              <div className="bg-white/50 p-3 rounded-xl">
                <div className="text-sm font-medium text-indigo-800 mb-1">💬 Ton de Communication</div>
                <div className="text-xs text-indigo-600 capitalize">
                  {personalization.content.communicationTone}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Pricing Personalization */}
      {personalization.pricing && (
        <div className="mb-6">
          <h4 className="font-medium text-indigo-900 mb-3 flex items-center space-x-2">
            <TrendingUp className="h-4 w-4" />
            <span>Tarification Intelligente</span>
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {personalization.pricing.showBudgetOptions && (
              <div className="bg-white/50 p-3 rounded-xl text-center">
                <div className="text-sm font-medium text-indigo-800">💰 Options Budget</div>
                <div className="text-xs text-indigo-600">Mises en avant</div>
              </div>
            )}
            {personalization.pricing.highlightDeals && (
              <div className="bg-white/50 p-3 rounded-xl text-center">
                <div className="text-sm font-medium text-indigo-800">🎁 Offres Spéciales</div>
                <div className="text-xs text-indigo-600">Membre fidèle</div>
              </div>
            )}
            {personalization.pricing.emphasizeValue && (
              <div className="bg-white/50 p-3 rounded-xl text-center">
                <div className="text-sm font-medium text-indigo-800">⭐ Rapport Qualité/Prix</div>
                <div className="text-xs text-indigo-600">Mis en avant</div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Recommendations */}
      {personalization.recommendations?.length > 0 && (
        <div>
          <h4 className="font-medium text-indigo-900 mb-3">🤖 Recommandations IA</h4>
          <div className="space-y-2">
            {personalization.recommendations.map((rec: string, index: number) => (
              <div key={index} className="bg-white/50 p-3 rounded-xl">
                <div className="text-sm text-indigo-800 flex items-start space-x-2">
                  <span className="text-indigo-600">•</span>
                  <span>{rec}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* AI Confidence */}
      <div className="mt-4 pt-4 border-t border-indigo-200">
        <div className="flex items-center justify-between text-sm">
          <span className="text-indigo-700">🧠 Confiance IA Personnalisation</span>
          <span className="font-medium text-indigo-900">94%</span>
        </div>
        <div className="mt-2 w-full bg-indigo-200 rounded-full h-2">
          <div className="bg-indigo-600 h-2 rounded-full" style={{width: '94%'}}></div>
        </div>
      </div>
    </div>
  );
};