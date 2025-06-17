import React from 'react';
import { Brain, TrendingUp, Shield, Target, Zap, BarChart3 } from 'lucide-react';

interface AIInsightsProps {
  type: 'pricing' | 'compatibility' | 'search' | 'behavior';
  data: any;
  className?: string;
}

export const AIInsights: React.FC<AIInsightsProps> = ({ type, data, className = '' }) => {
  if (!data) return null;

  const renderPricingInsights = () => (
    <div className={`bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-2xl p-6 ${className}`}>
      <div className="flex items-center space-x-3 mb-4">
        <Brain className="h-6 w-6 text-purple-600" />
        <h3 className="font-semibold text-purple-900">🧠 Analyse IA Pricing</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div className="text-center p-3 bg-white/50 rounded-xl">
          <div className="text-2xl font-bold text-purple-600">{data.aiConfidence}%</div>
          <div className="text-sm text-purple-700">Confiance IA</div>
        </div>
        <div className="text-center p-3 bg-white/50 rounded-xl">
          <div className="text-2xl font-bold text-purple-600">{data.marketInsights?.demandLevel}</div>
          <div className="text-sm text-purple-700">Demande</div>
        </div>
        <div className="text-center p-3 bg-white/50 rounded-xl">
          <div className="text-2xl font-bold text-purple-600">{data.marketInsights?.pricePosition}</div>
          <div className="text-sm text-purple-700">Position</div>
        </div>
      </div>
      
      <div className="space-y-2">
        <h4 className="font-medium text-purple-900">💡 Raisonnement IA :</h4>
        {data.reasoning?.map((reason: string, index: number) => (
          <div key={index} className="text-sm text-purple-800 flex items-start space-x-2">
            <span className="text-purple-600">•</span>
            <span>{reason}</span>
          </div>
        ))}
      </div>
    </div>
  );

  const renderCompatibilityInsights = () => (
    <div className={`bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-6 ${className}`}>
      <div className="flex items-center space-x-3 mb-4">
        <Target className="h-6 w-6 text-green-600" />
        <h3 className="font-semibold text-green-900">🎯 Score de Compatibilité IA</h3>
      </div>
      
      <div className="text-center mb-6">
        <div className="text-4xl font-bold text-green-600 mb-2">{data.overallScore}%</div>
        <div className="text-green-700 font-medium">{data.recommendation}</div>
        <div className="text-sm text-green-600">Confiance: {data.confidenceLevel}%</div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h4 className="font-medium text-green-900 mb-2">✅ Points forts :</h4>
          {data.strengthAreas?.map((strength: string, index: number) => (
            <div key={index} className="text-sm text-green-800 flex items-center space-x-2">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              <span>{strength}</span>
            </div>
          ))}
        </div>
        
        {data.potentialConcerns?.length > 0 && (
          <div>
            <h4 className="font-medium text-green-900 mb-2">⚠️ Points d'attention :</h4>
            {data.potentialConcerns.map((concern: string, index: number) => (
              <div key={index} className="text-sm text-green-700 flex items-center space-x-2">
                <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                <span>{concern}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  const renderSearchInsights = () => (
    <div className={`bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 rounded-2xl p-6 ${className}`}>
      <div className="flex items-center space-x-3 mb-4">
        <Zap className="h-6 w-6 text-blue-600" />
        <h3 className="font-semibold text-blue-900">⚡ Insights Recherche IA</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div className="text-center p-3 bg-white/50 rounded-xl">
          <div className="text-lg font-bold text-blue-600">{data.insights?.searchIntent}</div>
          <div className="text-sm text-blue-700">Intention</div>
        </div>
        <div className="text-center p-3 bg-white/50 rounded-xl">
          <div className="text-lg font-bold text-blue-600">{data.insights?.urgencyLevel}</div>
          <div className="text-sm text-blue-700">Urgence</div>
        </div>
        <div className="text-center p-3 bg-white/50 rounded-xl">
          <div className="text-lg font-bold text-blue-600">{data.aiConfidence}%</div>
          <div className="text-sm text-blue-700">Confiance</div>
        </div>
      </div>
      
      {data.suggestions?.smartRecommendations && (
        <div>
          <h4 className="font-medium text-blue-900 mb-2">🤖 Suggestions IA :</h4>
          <div className="space-y-2">
            {data.suggestions.smartRecommendations.map((suggestion: string, index: number) => (
              <div key={index} className="text-sm text-blue-800 flex items-start space-x-2">
                <span className="text-blue-600">•</span>
                <span>{suggestion}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  const renderBehaviorInsights = () => (
    <div className={`bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 rounded-2xl p-6 ${className}`}>
      <div className="flex items-center space-x-3 mb-4">
        <BarChart3 className="h-6 w-6 text-orange-600" />
        <h3 className="font-semibold text-orange-900">📊 Analyse Comportementale IA</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div className="text-center p-3 bg-white/50 rounded-xl">
          <div className="text-lg font-bold text-orange-600">{Math.round(data.churnRisk * 100)}%</div>
          <div className="text-sm text-orange-700">Risque Churn</div>
        </div>
        <div className="text-center p-3 bg-white/50 rounded-xl">
          <div className="text-lg font-bold text-orange-600">{data.lifetimeValue}€</div>
          <div className="text-sm text-orange-700">LTV Prédite</div>
        </div>
        <div className="text-center p-3 bg-white/50 rounded-xl">
          <div className="text-lg font-bold text-orange-600">{data.nextAction}</div>
          <div className="text-sm text-orange-700">Action Prédite</div>
        </div>
      </div>
      
      {data.recommendations && (
        <div>
          <h4 className="font-medium text-orange-900 mb-2">💡 Recommandations IA :</h4>
          <div className="space-y-2">
            {data.recommendations.map((rec: string, index: number) => (
              <div key={index} className="text-sm text-orange-800 flex items-start space-x-2">
                <span className="text-orange-600">•</span>
                <span>{rec}</span>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {data.interventions?.length > 0 && (
        <div className="mt-4 p-3 bg-red-100 border border-red-200 rounded-xl">
          <h4 className="font-medium text-red-900 mb-2">🚨 Interventions Urgentes :</h4>
          {data.interventions.map((intervention: string, index: number) => (
            <div key={index} className="text-sm text-red-800">{intervention}</div>
          ))}
        </div>
      )}
    </div>
  );

  switch (type) {
    case 'pricing':
      return renderPricingInsights();
    case 'compatibility':
      return renderCompatibilityInsights();
    case 'search':
      return renderSearchInsights();
    case 'behavior':
      return renderBehaviorInsights();
    default:
      return null;
  }
};