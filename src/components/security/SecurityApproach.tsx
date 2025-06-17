import React from 'react';
import { Shield, Star, MapPin, MessageCircle, AlertTriangle } from 'lucide-react';

interface SecurityApproachProps {
  className?: string;
}

export const SecurityApproach: React.FC<SecurityApproachProps> = ({ className = '' }) => {
  return (
    <div className={`bg-white rounded-xl border border-gray-200 p-6 ${className}`}>
      <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
        <Shield className="h-5 w-5 mr-2 text-primary-600" />
        🛡️ Sécurité par confiance
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="flex items-start space-x-4">
          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mt-1">
            <span className="text-blue-600 text-lg">🆔</span>
          </div>
          <div>
            <h4 className="font-medium text-gray-800 mb-1">Vérification identité</h4>
            <p className="text-sm text-gray-600">
              Tous les transporteurs passent par un processus de vérification d'identité rigoureux avant de pouvoir proposer des trajets.
            </p>
          </div>
        </div>
        
        <div className="flex items-start space-x-4">
          <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center mt-1">
            <Star className="h-5 w-5 text-yellow-600" />
          </div>
          <div>
            <h4 className="font-medium text-gray-800 mb-1">Système de notation</h4>
            <p className="text-sm text-gray-600">
              Transparence totale sur l'historique des transporteurs avec avis vérifiés des utilisateurs précédents.
            </p>
          </div>
        </div>
        
        <div className="flex items-start space-x-4">
          <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mt-1">
            <MapPin className="h-5 w-5 text-green-600" />
          </div>
          <div>
            <h4 className="font-medium text-gray-800 mb-1">Suivi temps réel</h4>
            <p className="text-sm text-gray-600">
              Suivez votre colis à chaque étape du voyage avec des mises à jour en temps réel et des photos.
            </p>
          </div>
        </div>
        
        <div className="flex items-start space-x-4">
          <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mt-1">
            <MessageCircle className="h-5 w-5 text-purple-600" />
          </div>
          <div>
            <h4 className="font-medium text-gray-800 mb-1">Médiation gratuite</h4>
            <p className="text-sm text-gray-600">
              Notre équipe de support est disponible pour résoudre tout conflit entre expéditeurs et transporteurs.
            </p>
          </div>
        </div>
      </div>
      
      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-5">
        <div className="flex items-start space-x-3">
          <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
          <div>
            <h4 className="font-medium text-yellow-800 mb-2">⚠️ Transport à vos risques</h4>
            <p className="text-sm text-yellow-700 leading-relaxed">
              Le transport s'effectue aux risques de l'expéditeur. KiloConnect facilite la mise en relation mais ne garantit pas la livraison. Vérifiez soigneusement le profil du transporteur avant envoi.
            </p>
            <p className="text-sm text-yellow-700 mt-2">
              <strong>Conseils de sécurité :</strong>
            </p>
            <ul className="text-sm text-yellow-700 list-disc list-inside mt-1 space-y-1">
              <li>Vérifiez les avis et l'historique du transporteur</li>
              <li>Privilégiez les transporteurs avec un compte vérifié</li>
              <li>Communiquez uniquement via la plateforme</li>
              <li>Documentez le contenu de votre colis avec des photos</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};