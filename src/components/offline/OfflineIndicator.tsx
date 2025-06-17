import React, { useState, useEffect } from 'react';
import { Wifi, WifiOff, Signal, AlertTriangle } from 'lucide-react';
import { offlineService } from '../../services/offlineService';

export const OfflineIndicator: React.FC = () => {
  const [networkStatus, setNetworkStatus] = useState(offlineService.getNetworkStatus());
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    const handleNetworkChange = (event: CustomEvent) => {
      setNetworkStatus(event.detail);
    };

    window.addEventListener('networkStatusChange', handleNetworkChange as EventListener);
    
    // Vérifier le statut périodiquement
    const interval = setInterval(() => {
      setNetworkStatus(offlineService.getNetworkStatus());
    }, 5000);

    return () => {
      window.removeEventListener('networkStatusChange', handleNetworkChange as EventListener);
      clearInterval(interval);
    };
  }, []);

  const getStatusColor = () => {
    if (!networkStatus.isOnline) return 'bg-red-500';
    
    switch (networkStatus.speed) {
      case 'fast': return 'bg-green-500';
      case 'medium': return 'bg-yellow-500';
      case 'slow': return 'bg-orange-500';
      case 'very-slow': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = () => {
    if (!networkStatus.isOnline) return 'Hors ligne';
    
    switch (networkStatus.speed) {
      case 'fast': return 'Connexion rapide';
      case 'medium': return 'Connexion normale';
      case 'slow': return 'Connexion lente';
      case 'very-slow': return 'Connexion très lente';
      default: return 'Connecté';
    }
  };

  const getIcon = () => {
    if (!networkStatus.isOnline) {
      return <WifiOff className="h-4 w-4 text-white" />;
    }
    
    switch (networkStatus.speed) {
      case 'fast':
      case 'medium':
        return <Wifi className="h-4 w-4 text-white" />;
      case 'slow':
      case 'very-slow':
        return <Signal className="h-4 w-4 text-white" />;
      default:
        return <Wifi className="h-4 w-4 text-white" />;
    }
  };

  const shouldShowWarning = () => {
    return !networkStatus.isOnline || networkStatus.speed === 'very-slow';
  };

  if (!shouldShowWarning() && !showDetails) {
    return null;
  }

  return (
    <div className="fixed top-20 right-4 z-50">
      <div
        className={`
          flex items-center space-x-2 px-3 py-2 rounded-lg shadow-lg cursor-pointer transition-all duration-200
          ${getStatusColor()} text-white
        `}
        onClick={() => setShowDetails(!showDetails)}
      >
        {getIcon()}
        <span className="text-sm font-medium">{getStatusText()}</span>
        {shouldShowWarning() && <AlertTriangle className="h-4 w-4" />}
      </div>

      {showDetails && (
        <div className="mt-2 bg-white rounded-lg shadow-lg border border-gray-200 p-4 min-w-64">
          <h4 className="font-medium text-gray-800 mb-3">État de la connexion</h4>
          
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Statut :</span>
              <span className={`font-medium ${networkStatus.isOnline ? 'text-green-600' : 'text-red-600'}`}>
                {networkStatus.isOnline ? 'En ligne' : 'Hors ligne'}
              </span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-600">Type :</span>
              <span className="font-medium text-gray-800 uppercase">
                {networkStatus.connectionType}
              </span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-600">Vitesse :</span>
              <span className="font-medium text-gray-800 capitalize">
                {networkStatus.speed.replace('-', ' ')}
              </span>
            </div>
          </div>

          {!networkStatus.isOnline && (
            <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-start space-x-2">
                <AlertTriangle className="h-4 w-4 text-red-600 mt-0.5" />
                <div className="text-sm text-red-800">
                  <p className="font-medium">Mode hors ligne activé</p>
                  <p>Vos données seront synchronisées dès que la connexion sera rétablie.</p>
                </div>
              </div>
            </div>
          )}

          {networkStatus.isOnline && networkStatus.speed === 'very-slow' && (
            <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-start space-x-2">
                <Signal className="h-4 w-4 text-yellow-600 mt-0.5" />
                <div className="text-sm text-yellow-800">
                  <p className="font-medium">Connexion très lente détectée</p>
                  <p>Mode économie de données activé automatiquement.</p>
                </div>
              </div>
            </div>
          )}

          {offlineService.isDataSaverMode() && (
            <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="text-sm text-blue-800">
                <p className="font-medium">💡 Mode économie de données</p>
                <p>Images compressées et fonctionnalités optimisées pour réduire la consommation.</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};