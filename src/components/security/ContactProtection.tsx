import React, { useState } from 'react';
import { Shield, AlertTriangle, MessageCircle, Phone, Video, X } from 'lucide-react';
import { Modal } from '../common/Modal';

interface ContactProtectionProps {
  isOpen: boolean;
  onClose: () => void;
  recipientName: string;
  onStartChat: () => void;
  onStartCall?: () => void;
  onStartVideo?: () => void;
}

export const ContactProtection: React.FC<ContactProtectionProps> = ({
  isOpen,
  onClose,
  recipientName,
  onStartChat,
  onStartCall,
  onStartVideo,
}) => {
  const [showWarning, setShowWarning] = useState(false);

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} title="Contacter le transporteur" size="md">
        <div className="space-y-6">
          {/* Security Notice */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <div className="flex items-start space-x-3">
              <Shield className="h-5 w-5 text-blue-600 mt-0.5" />
              <div>
                <h3 className="font-medium text-blue-900 mb-1">
                  Communication sécurisée
                </h3>
                <p className="text-sm text-blue-800">
                  Pour votre sécurité et la nôtre, toutes les communications doivent passer par notre plateforme. 
                  Cela nous permet de vous protéger et de résoudre d'éventuels conflits.
                </p>
              </div>
            </div>
          </div>

          {/* Contact Options */}
          <div className="space-y-3">
            <h4 className="font-medium text-gray-800">
              Comment souhaitez-vous contacter {recipientName} ?
            </h4>

            <button
              onClick={() => {
                onStartChat();
                onClose();
              }}
              className="w-full flex items-center space-x-4 p-4 border border-gray-200 rounded-xl hover:border-primary-300 hover:bg-primary-50 transition-all duration-200"
            >
              <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center">
                <MessageCircle className="h-6 w-6 text-primary-600" />
              </div>
              <div className="flex-1 text-left">
                <h5 className="font-medium text-gray-800">Chat sécurisé</h5>
                <p className="text-sm text-gray-600">Messagerie instantanée protégée</p>
              </div>
            </button>

            {onStartCall && (
              <button
                onClick={() => {
                  onStartCall();
                  onClose();
                }}
                className="w-full flex items-center space-x-4 p-4 border border-gray-200 rounded-xl hover:border-primary-300 hover:bg-primary-50 transition-all duration-200"
              >
                <div className="w-12 h-12 bg-accent-100 rounded-xl flex items-center justify-center">
                  <Phone className="h-6 w-6 text-accent-600" />
                </div>
                <div className="flex-1 text-left">
                  <h5 className="font-medium text-gray-800">Appel audio</h5>
                  <p className="text-sm text-gray-600">Conversation vocale sécurisée</p>
                </div>
              </button>
            )}

            {onStartVideo && (
              <button
                onClick={() => {
                  onStartVideo();
                  onClose();
                }}
                className="w-full flex items-center space-x-4 p-4 border border-gray-200 rounded-xl hover:border-primary-300 hover:bg-primary-50 transition-all duration-200"
              >
                <div className="w-12 h-12 bg-secondary-100 rounded-xl flex items-center justify-center">
                  <Video className="h-6 w-6 text-secondary-600" />
                </div>
                <div className="flex-1 text-left">
                  <h5 className="font-medium text-gray-800">Appel vidéo</h5>
                  <p className="text-sm text-gray-600">Visioconférence sécurisée</p>
                </div>
              </button>
            )}
          </div>

          {/* Warning about external contact */}
          <div className="border-t border-gray-200 pt-4">
            <button
              onClick={() => setShowWarning(true)}
              className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
            >
              Pourquoi ne puis-je pas avoir ses coordonnées directes ?
            </button>
          </div>
        </div>
      </Modal>

      {/* Warning Modal */}
      <Modal isOpen={showWarning} onClose={() => setShowWarning(false)} title="Protection des utilisateurs" size="md">
        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="h-6 w-6 text-yellow-500 mt-1" />
            <div>
              <h3 className="font-medium text-gray-800 mb-2">
                Pourquoi cette protection ?
              </h3>
              <div className="space-y-3 text-sm text-gray-600">
                <p>
                  <strong>Sécurité :</strong> Évite le partage d'informations personnelles avec des inconnus.
                </p>
                <p>
                  <strong>Qualité :</strong> Toutes les conversations sont enregistrées pour résoudre les conflits.
                </p>
                <p>
                  <strong>Confiance :</strong> Système de modération automatique pour détecter les comportements inappropriés.
                </p>
                <p>
                  <strong>Business :</strong> Permet à KiloConnect de maintenir un service gratuit et sécurisé.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-red-50 border border-red-200 rounded-xl p-4">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-red-900 mb-1">
                  Attention aux contournements
                </h4>
                <p className="text-sm text-red-800">
                  Tout utilisateur tentant de contourner notre système de communication 
                  (partage de numéro, email, réseaux sociaux) sera immédiatement suspendu.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};