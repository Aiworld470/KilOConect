import React, { useState } from 'react';
import { Search, Package, MapPin, Clock, CheckCircle, Truck, Plane } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

const TrackingPage: React.FC = () => {
  const [trackingNumber, setTrackingNumber] = useState('');
  const [trackingData, setTrackingData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Mock tracking data
  const mockTrackingData = {
    trackingNumber: 'KC12345678',
    status: 'in_transit',
    origin: { city: 'Paris', country: 'France' },
    destination: { city: 'Dakar', country: 'Sénégal' },
    transporter: {
      name: 'Fatou Diallo',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
      phone: '+33123456789',
    },
    packageDetails: {
      weight: 3,
      description: 'Produits cosmétiques',
    },
    estimatedDelivery: new Date('2024-02-15T16:30:00'),
    events: [
      {
        id: '1',
        status: 'package_received',
        description: 'Colis récupéré par le transporteur',
        location: 'Paris, France',
        timestamp: new Date('2024-02-15T08:00:00'),
        icon: Package,
      },
      {
        id: '2',
        status: 'departure',
        description: 'Départ de l\'aéroport Charles de Gaulle',
        location: 'Paris CDG, France',
        timestamp: new Date('2024-02-15T10:00:00'),
        icon: Plane,
      },
      {
        id: '3',
        status: 'in_transit',
        description: 'En transit vers la destination',
        location: 'Vol AF718',
        timestamp: new Date('2024-02-15T10:30:00'),
        icon: Truck,
        current: true,
      },
      {
        id: '4',
        status: 'arrival',
        description: 'Arrivée prévue à l\'aéroport de Dakar',
        location: 'Dakar DKR, Sénégal',
        timestamp: new Date('2024-02-15T16:30:00'),
        icon: MapPin,
        upcoming: true,
      },
      {
        id: '5',
        status: 'delivered',
        description: 'Livraison au destinataire',
        location: 'Dakar, Sénégal',
        timestamp: new Date('2024-02-15T18:00:00'),
        icon: CheckCircle,
        upcoming: true,
      },
    ],
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingNumber.trim()) return;

    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (trackingNumber.toUpperCase() === 'KC12345678') {
      setTrackingData(mockTrackingData);
    } else {
      setTrackingData(null);
    }
    
    setIsLoading(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'package_received':
        return 'text-blue-600 bg-blue-100';
      case 'departure':
        return 'text-purple-600 bg-purple-100';
      case 'in_transit':
        return 'text-yellow-600 bg-yellow-100';
      case 'arrival':
        return 'text-orange-600 bg-orange-100';
      case 'delivered':
        return 'text-green-600 bg-green-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'package_received':
        return 'Colis récupéré';
      case 'departure':
        return 'En route';
      case 'in_transit':
        return 'En transit';
      case 'arrival':
        return 'Arrivé';
      case 'delivered':
        return 'Livré';
      default:
        return 'Statut inconnu';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Suivre mon colis
          </h1>
          <p className="text-gray-600">
            Entrez votre numéro de suivi pour connaître l'état de votre colis
          </p>
        </div>

        {/* Search form */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <label htmlFor="tracking" className="block text-sm font-medium text-gray-700 mb-1">
                Numéro de suivi
              </label>
              <input
                id="tracking"
                type="text"
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                placeholder="Ex: KC12345678"
              />
            </div>
            
            <div className="flex items-end">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full sm:w-auto bg-primary-600 text-white px-6 py-2 rounded-md hover:bg-primary-700 transition-colors font-medium disabled:opacity-50 flex items-center justify-center"
              >
                {isLoading ? (
                  <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                ) : (
                  <Search className="h-4 w-4 mr-2" />
                )}
                Rechercher
              </button>
            </div>
          </form>

          <div className="mt-4 text-sm text-gray-500">
            💡 Essayez avec le numéro: <code className="bg-gray-100 px-2 py-1 rounded">KC12345678</code>
          </div>
        </div>

        {/* Tracking results */}
        {trackingData ? (
          <div className="space-y-8">
            {/* Package overview */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">
                    Colis #{trackingData.trackingNumber}
                  </h2>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <span>{trackingData.origin.city} → {trackingData.destination.city}</span>
                    <span>•</span>
                    <span>{trackingData.packageDetails.weight}kg</span>
                  </div>
                </div>
                
                <div className="mt-4 lg:mt-0">
                  <div className={`
                    inline-flex items-center px-3 py-1 rounded-full text-sm font-medium
                    ${getStatusColor(trackingData.status)}
                  `}>
                    {getStatusText(trackingData.status)}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium text-gray-900 mb-3">Détails du colis</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Contenu:</span>
                      <span>{trackingData.packageDetails.description}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Poids:</span>
                      <span>{trackingData.packageDetails.weight}kg</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Livraison estimée:</span>
                      <span>{format(trackingData.estimatedDelivery, 'dd MMM à HH:mm', { locale: fr })}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium text-gray-900 mb-3">Transporteur</h3>
                  <div className="flex items-center space-x-3">
                    <img
                      src={trackingData.transporter.avatar}
                      alt={trackingData.transporter.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <div className="font-medium text-gray-900">
                        {trackingData.transporter.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {trackingData.transporter.phone}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Tracking timeline */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">
                Historique de suivi
              </h3>

              <div className="relative">
                {trackingData.events.map((event: any, index: number) => {
                  const Icon = event.icon;
                  const isLast = index === trackingData.events.length - 1;
                  
                  return (
                    <div key={event.id} className="relative flex items-start space-x-4 pb-8">
                      {/* Timeline line */}
                      {!isLast && (
                        <div className={`
                          absolute left-6 top-12 w-0.5 h-full
                          ${event.current || event.upcoming ? 'bg-gray-200' : 'bg-primary-200'}
                        `} />
                      )}
                      
                      {/* Icon */}
                      <div className={`
                        relative z-10 w-12 h-12 rounded-full flex items-center justify-center
                        ${event.current 
                          ? 'bg-primary-600 text-white' 
                          : event.upcoming 
                            ? 'bg-gray-200 text-gray-400'
                            : 'bg-primary-100 text-primary-600'
                        }
                      `}>
                        <Icon className="h-5 w-5" />
                      </div>
                      
                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h4 className={`
                            font-medium
                            ${event.upcoming ? 'text-gray-500' : 'text-gray-900'}
                          `}>
                            {event.description}
                          </h4>
                          
                          {!event.upcoming && (
                            <span className="text-sm text-gray-500">
                              {format(event.timestamp, 'dd MMM HH:mm', { locale: fr })}
                            </span>
                          )}
                        </div>
                        
                        <div className="flex items-center space-x-2 mt-1">
                          <MapPin className="h-4 w-4 text-gray-400" />
                          <span className={`
                            text-sm
                            ${event.upcoming ? 'text-gray-400' : 'text-gray-600'}
                          `}>
                            {event.location}
                          </span>
                        </div>
                        
                        {event.current && (
                          <div className="mt-2">
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                              <Clock className="h-3 w-3 mr-1" />
                              En cours
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ) : trackingNumber && !isLoading ? (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Package className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Numéro de suivi non trouvé
            </h3>
            <p className="text-gray-600">
              Vérifiez votre numéro de suivi et réessayez.
            </p>
          </div>
        ) : null}

        {/* Help section */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-8">
          <h3 className="font-medium text-blue-900 mb-2">
            Besoin d'aide ?
          </h3>
          <p className="text-blue-800 text-sm mb-4">
            Si vous ne trouvez pas votre numéro de suivi ou si vous avez des questions,
            notre équipe support est là pour vous aider.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors text-sm font-medium">
              Contacter le support
            </button>
            <button className="border border-blue-300 text-blue-700 px-4 py-2 rounded-md hover:bg-blue-100 transition-colors text-sm font-medium">
              FAQ Suivi
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackingPage;