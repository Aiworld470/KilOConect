import React from 'react';
import { Shield, AlertTriangle, Ban, Eye } from 'lucide-react';

interface AISecurityAlertProps {
  detection: any;
  onAction: (action: string) => void;
  className?: string;
}

export const AISecurityAlert: React.FC<AISecurityAlertProps> = ({ 
  detection, 
  onAction, 
  className = '' 
}) => {
  if (!detection || detection.riskScore < 0.3) return null;

  const getRiskLevel = (score: number) => {
    if (score > 0.8) return { level: 'CRITIQUE', color: 'red', icon: Ban };
    if (score > 0.5) return { level: 'ÉLEVÉ', color: 'orange', icon: AlertTriangle };
    return { level: 'MODÉRÉ', color: 'yellow', icon: Eye };
  };

  const risk = getRiskLevel(detection.riskScore);
  const RiskIcon = risk.icon;

  return (
    <div className={`
      border-2 rounded-2xl p-6 animate-pulse
      ${risk.color === 'red' ? 'bg-red-50 border-red-300' : 
        risk.color === 'orange' ? 'bg-orange-50 border-orange-300' : 
        'bg-yellow-50 border-yellow-300'}
      ${className}
    `}>
      <div className="flex items-center space-x-3 mb-4">
        <div className={`
          w-12 h-12 rounded-full flex items-center justify-center
          ${risk.color === 'red' ? 'bg-red-100' : 
            risk.color === 'orange' ? 'bg-orange-100' : 
            'bg-yellow-100'}
        `}>
          <RiskIcon className={`
            h-6 w-6
            ${risk.color === 'red' ? 'text-red-600' : 
              risk.color === 'orange' ? 'text-orange-600' : 
              'text-yellow-600'}
          `} />
        </div>
        
        <div>
          <h3 className={`
            font-bold text-lg
            ${risk.color === 'red' ? 'text-red-900' : 
              risk.color === 'orange' ? 'text-orange-900' : 
              'text-yellow-900'}
          `}>
            🚨 ALERTE SÉCURITÉ IA - NIVEAU {risk.level}
          </h3>
          <p className={`
            text-sm
            ${risk.color === 'red' ? 'text-red-700' : 
              risk.color === 'orange' ? 'text-orange-700' : 
              'text-yellow-700'}
          `}>
            Score de risque: {Math.round(detection.riskScore * 100)}% | 
            Confiance: {Math.round(detection.confidence * 100)}%
          </p>
        </div>
      </div>

      {/* Détections */}
      <div className="mb-4">
        <h4 className={`
          font-medium mb-2
          ${risk.color === 'red' ? 'text-red-900' : 
            risk.color === 'orange' ? 'text-orange-900' : 
            'text-yellow-900'}
        `}>
          🔍 Détections IA :
        </h4>
        <div className="space-y-1">
          {detection.reasoning?.map((reason: string, index: number) => (
            <div key={index} className={`
              text-sm flex items-start space-x-2
              ${risk.color === 'red' ? 'text-red-800' : 
                risk.color === 'orange' ? 'text-orange-800' : 
                'text-yellow-800'}
            `}>
              <span className={`
                ${risk.color === 'red' ? 'text-red-600' : 
                  risk.color === 'orange' ? 'text-orange-600' : 
                  'text-yellow-600'}
              `}>•</span>
              <span>{reason}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Actions recommandées */}
      <div className="mb-4">
        <h4 className={`
          font-medium mb-2
          ${risk.color === 'red' ? 'text-red-900' : 
            risk.color === 'orange' ? 'text-orange-900' : 
            'text-yellow-900'}
        `}>
          ⚡ Actions recommandées :
        </h4>
        <div className="space-y-2">
          {detection.recommendations?.map((action: string, index: number) => (
            <button
              key={index}
              onClick={() => onAction(action)}
              className={`
                w-full text-left px-3 py-2 rounded-xl text-sm font-medium transition-colors
                ${risk.color === 'red' ? 'bg-red-100 text-red-800 hover:bg-red-200' : 
                  risk.color === 'orange' ? 'bg-orange-100 text-orange-800 hover:bg-orange-200' : 
                  'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'}
              `}
            >
              {action}
            </button>
          ))}
        </div>
      </div>

      {/* Protection Revenue */}
      <div className={`
        p-3 rounded-xl border-2 border-dashed
        ${risk.color === 'red' ? 'bg-red-100 border-red-300' : 
          risk.color === 'orange' ? 'bg-orange-100 border-orange-300' : 
          'bg-yellow-100 border-yellow-300'}
      `}>
        <div className="flex items-center space-x-2">
          <Shield className={`
            h-4 w-4
            ${risk.color === 'red' ? 'text-red-600' : 
              risk.color === 'orange' ? 'text-orange-600' : 
              'text-yellow-600'}
          `} />
          <span className={`
            text-sm font-medium
            ${risk.color === 'red' ? 'text-red-900' : 
              risk.color === 'orange' ? 'text-orange-900' : 
              'text-yellow-900'}
          `}>
            💰 Protection Revenue Activée - Tentative de contournement bloquée
          </span>
        </div>
      </div>
    </div>
  );
};