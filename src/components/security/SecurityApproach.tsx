import React from 'react';
import { Shield, Star, MapPin, MessageCircle, AlertTriangle, Package, Scale } from 'lucide-react';

interface SecurityApproachProps {
  userType?: 'sender' | 'transporter';
  className?: string;
}

export const SecurityApproach: React.FC<SecurityApproachProps> = ({ 
  userType = 'sender',
  className = '' 
}) => {
  // Contenu différent selon le type d'utilisateur
  const isSender = userType === 'sender';
  
  return (
    <div className={`bg-white rounded-xl border border-gray-200 p-6 ${className}`}>
      <h3 className="text-lg font-semibold text-gray-800 mb-6 flex items-center">
        <Shield className="h-5 w-5 mr-2 text-primary-600" />
        🛡️ {isSender ? 'Sécurité par confiance' : 'Responsabilités du transporteur'}
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {isSender ? (
          // Points pour l'expéditeur
          <>
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
          </>
        ) : (
          // Points pour le transporteur
          <>
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <Package className="h-4 w-4 text-blue-600" />
              </div>
              <div>
                <h4 className="font-medium text-gray-800">Soin des colis</h4>
                <p className="text-sm text-gray-600">Manipulation soigneuse requise</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Star className="h-4 w-4 text-yellow-600" />
              </div>
              <div>
                <h4 className="font-medium text-gray-800">Réputation</h4>
                <p className="text-sm text-gray-600">Vos avis impactent vos revenus</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                <Scale className="h-4 w-4 text-green-600" />
              </div>
              <div>
                <h4 className="font-medium text-gray-800">Obligations légales</h4>
                <p className="text-sm text-gray-600">Respect des règles douanières</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                <MessageCircle className="h-4 w-4 text-purple-600" />
              </div>
              <div>
                <h4 className="font-medium text-gray-800">Communication</h4>
                <p className="text-sm text-gray-600">Informez de tout retard/problème</p>
              </div>
            </div>
          </>
        )}
      </div>
      
      <div className={`${isSender ? 'bg-yellow-50 border-yellow-200' : 'bg-blue-50 border-blue-200'} border rounded-xl p-4`}>
        <div className="flex items-start space-x-3">
          <AlertTriangle className={`h-5 w-5 ${isSender ? 'text-yellow-600' : 'text-blue-600'} mt-0.5`} />
          <div>
            <h4 className={`font-medium ${isSender ? 'text-yellow-800' : 'text-blue-800'} mb-1`}>
              ⚠️ {isSender ? 'Important' : 'Responsabilité'}
            </h4>
            <p className={`text-sm ${isSender ? 'text-yellow-700' : 'text-blue-700'}`}>
              {isSender 
                ? "Le transport s'effectue aux risques de l'expéditeur. KiloConnect facilite la mise en relation mais ne garantit pas la livraison. Vérifiez soigneusement le profil du transporteur avant envoi."
                : "En tant que transporteur, vous êtes responsable des colis qui vous sont confiés. Tout dommage ou perte pourrait affecter votre réputation et vos revenus futurs. Communiquez régulièrement avec l'expéditeur."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};