import React from 'react';
import { Shield, Star, MapPin, MessageCircle, AlertTriangle } from 'lucide-react';

interface SecurityApproachProps {
  className?: string;
}

export const SecurityApproach: React.FC<SecurityApproachProps> = ({ className = '' }) => {
  return (
    <div className={`bg-white rounded-xl border border-gray-200 p-6 ${className}`}>
      <h3 className="text-lg font-semibold text-gray-800 mb-6 flex items-center">
        <Shield className="h-5 w-5 mr-2 text-primary-600" />
        🛡️ Sécurité par confiance
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="flex items-start space-x-3">
          <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
            <span className="text-blue-600 text-lg">🆔</span>
          </div>
          <div>
            <h4 className="font-medium text-gray-800">Vérification identité</h4>
            <p className="text-sm text-gray-600">Tous les transporteurs vérifiés</p>
          </div>
        </div>
        
        <div className="flex items-start space-x-3">
          <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
            <Star className="h-4 w-4 text-yellow-600" />
          </div>
          <div>
            <h4 className="font-medium text-gray-800">Système de notation</h4>
            <p className="text-sm text-gray-600">Transparence totale sur historique</p>
          </div>
        </div>
        
        <div className="flex items-start space-x-3">
          <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
            <MapPin className="h-4 w-4 text-green-600" />
          </div>
          <div>
            <h4 className="font-medium text-gray-800">Suivi temps réel</h4>
            <p className="text-sm text-gray-600">Visibilité complète trajet</p>
          </div>
        </div>
        
        <div className="flex items-start space-x-3">
          <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
            <MessageCircle className="h-4 w-4 text-purple-600" />
          </div>
          <div>
            <h4 className="font-medium text-gray-800">Médiation gratuite</h4>
            <p className="text-sm text-gray-600">Résolution conflits par équipe</p>
          </div>
        </div>
      </div>
      
      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
        <div className="flex items-start space-x-3">
          <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
          <div>
            <h4 className="font-medium text-yellow-800 mb-1">⚠️ Important</h4>
            <p className="text-sm text-yellow-700">
              Le transport s'effectue aux risques de l'expéditeur. KiloConnect facilite la mise en relation mais ne garantit pas la livraison. Vérifiez soigneusement le profil du transporteur avant envoi.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};