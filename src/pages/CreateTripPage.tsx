import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Calendar, Weight, Camera, Plus, X, Brain } from 'lucide-react';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { useAuth } from '../contexts/AuthContext';
import { DestinationAutocomplete } from '../components/ui/DestinationAutocomplete';
import { PricingIntelligent } from '../components/ui/PricingIntelligent';
import { POPULAR_ORIGINS, POPULAR_DESTINATIONS } from '../data/destinations';

const CreateTripPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [photos, setPhotos] = useState<string[]>([]);
  const [selectedPricingTier, setSelectedPricingTier] = useState<string>('standard');
  
  const [tripData, setTripData] = useState({
    origin: '',
    destination: '',
    departureDate: '',
    departureTime: '',
    arrivalDate: '',
    arrivalTime: '',
    availableWeight: 10,
    description: '',
    conditions: {
      fragileItems: true,
      liquidItems: false,
      electronicItems: true,
      foodItems: true,
      documentsOnly: false,
    }
  });

  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', { state: { returnTo: '/create-trip' } });
    }
  }, [isAuthenticated, navigate]);

  const handleInputChange = (field: string, value: any) => {
    setTripData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleConditionChange = (condition: string, value: boolean) => {
    setTripData(prev => ({
      ...prev,
      conditions: {
        ...prev.conditions,
        [condition]: value
      }
    }));
  };

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      // Mock photo upload - in real app, upload to cloud storage
      const newPhotos = Array.from(files).map(() => 
        `https://images.pexels.com/photos/${Math.floor(Math.random() * 1000000)}/pexels-photo.jpeg?auto=compress&cs=tinysrgb&w=400`
      );
      setPhotos(prev => [...prev, ...newPhotos].slice(0, 5));
    }
  };

  const removePhoto = (index: number) => {
    setPhotos(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Mock API call to create trip
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Redirect to dashboard with success message
      navigate('/dashboard', { 
        state: { 
          message: 'Trajet créé avec succès ! Il sera visible par les expéditeurs dans quelques minutes.' 
        }
      });
    } catch (error) {
      console.error('Error creating trip:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center space-x-2 text-gray-600 hover:text-primary-600 transition-colors mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Retour</span>
          </button>

          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Proposer un trajet
          </h1>
          <p className="text-gray-600">
            Créez votre annonce de transport et commencez à gagner de l'argent
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Route Information */}
          <div className="bg-white rounded-2xl shadow-card border border-gray-100 p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Itinéraire</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <DestinationAutocomplete
                label="Ville de départ *"
                placeholder="Tapez votre ville : Paris, Londres, Bruxelles..."
                value={tripData.origin}
                onChange={(value) => handleInputChange('origin', value)}
                suggestions={POPULAR_ORIGINS}
              />

              <DestinationAutocomplete
                label="Ville d'arrivée *"
                placeholder="Tapez votre destination : Dakar, Lagos, Abidjan..."
                value={tripData.destination}
                onChange={(value) => handleInputChange('destination', value)}
                suggestions={POPULAR_DESTINATIONS}
              />
            </div>

            {/* Route suggestions */}
            <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-xl">
              <h4 className="font-medium text-blue-900 mb-2">💡 Routes populaires :</h4>
              <div className="flex flex-wrap gap-2">
                {[
                  { from: "Paris, France", to: "Dakar, Sénégal" },
                  { from: "Londres, Royaume-Uni", to: "Lagos, Nigeria" },
                  { from: "Bruxelles, Belgique", to: "Kinshasa, RD Congo" },
                  { from: "Milan, Italie", to: "Casablanca, Maroc" }
                ].map((route, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => {
                      handleInputChange('origin', route.from);
                      handleInputChange('destination', route.to);
                    }}
                    className="text-xs bg-white border border-blue-300 text-blue-700 px-3 py-1 rounded-full hover:bg-blue-100 transition-colors"
                  >
                    {route.from.split(',')[0]} → {route.to.split(',')[0]}
                  </button>
                ))}
              </div>
              <p className="text-xs text-blue-700 mt-2">
                🌍 Vous pouvez créer des trajets vers TOUTE destination mondiale !
              </p>
            </div>
          </div>

          {/* Date & Time */}
          <div className="bg-white rounded-2xl shadow-card border border-gray-100 p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Dates et horaires</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="font-medium text-gray-700">Départ</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Date *
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <input
                        type="date"
                        required
                        value={tripData.departureDate}
                        onChange={(e) => handleInputChange('departureDate', e.target.value)}
                        className="w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Heure *
                    </label>
                    <input
                      type="time"
                      required
                      value={tripData.departureTime}
                      onChange={(e) => handleInputChange('departureTime', e.target.value)}
                      className="w-full px-3 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-medium text-gray-700">Arrivée (optionnel)</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Date
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <input
                        type="date"
                        value={tripData.arrivalDate}
                        onChange={(e) => handleInputChange('arrivalDate', e.target.value)}
                        className="w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Heure
                    </label>
                    <input
                      type="time"
                      value={tripData.arrivalTime}
                      onChange={(e) => handleInputChange('arrivalTime', e.target.value)}
                      className="w-full px-3 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Capacity */}
          <div className="bg-white rounded-2xl shadow-card border border-gray-100 p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Capacité disponible</h2>
            
            <div className="max-w-md">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Poids disponible (kg) *
              </label>
              <div className="relative">
                <Weight className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="number"
                  required
                  min="1"
                  max="50"
                  value={tripData.availableWeight}
                  onChange={(e) => handleInputChange('availableWeight', Number(e.target.value))}
                  className="w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">Maximum recommandé: 30kg</p>
            </div>
          </div>

          {/* Pricing IA avec message transporteur intégré */}
          {tripData.origin && tripData.destination && (
            <div className="bg-white rounded-2xl shadow-card border border-gray-100 p-6">
              <PricingIntelligent
                origin={tripData.origin}
                destination={tripData.destination}
                transporterRating={user?.rating || 4.0}
                selectedTier={selectedPricingTier}
                onTierSelect={setSelectedPricingTier}
              />
            </div>
          )}

          {/* Transport Conditions */}
          <div className="bg-white rounded-2xl shadow-card border border-gray-100 p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Conditions de transport</h2>
            
            <div className="space-y-4">
              <p className="text-sm text-gray-600 mb-4">
                Quels types de colis acceptez-vous ?
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries({
                  fragileItems: 'Objets fragiles',
                  liquidItems: 'Liquides (parfums, cosmétiques)',
                  electronicItems: 'Appareils électroniques',
                  foodItems: 'Produits alimentaires non périssables',
                  documentsOnly: 'Documents uniquement'
                }).map(([key, label]) => (
                  <label key={key} className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={tripData.conditions[key as keyof typeof tripData.conditions]}
                      onChange={(e) => handleConditionChange(key, e.target.checked)}
                      className="w-4 h-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                    />
                    <span className="text-sm text-gray-700">{label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Photos */}
          <div className="bg-white rounded-2xl shadow-card border border-gray-100 p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Photos (optionnel)</h2>
            
            <div className="space-y-4">
              <p className="text-sm text-gray-600">
                Ajoutez des photos de votre véhicule ou de votre voyage pour rassurer les expéditeurs
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {photos.map((photo, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={photo}
                      alt={`Photo ${index + 1}`}
                      className="w-full h-24 object-cover rounded-xl"
                    />
                    <button
                      type="button"
                      onClick={() => removePhoto(index)}
                      className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
                
                {photos.length < 5 && (
                  <label className="w-full h-24 border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-primary-400 transition-colors">
                    <Camera className="h-6 w-6 text-gray-400 mb-1" />
                    <span className="text-xs text-gray-500">Ajouter</span>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handlePhotoUpload}
                      className="hidden"
                    />
                  </label>
                )}
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="bg-white rounded-2xl shadow-card border border-gray-100 p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Description</h2>
            
            <textarea
              rows={4}
              value={tripData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              placeholder="Décrivez votre voyage, vos conditions particulières, points de récupération/livraison..."
            />
          </div>

          {/* Submit */}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium"
            >
              Annuler
            </button>
            
            <button
              type="submit"
              disabled={isSubmitting || !tripData.origin || !tripData.destination || !selectedPricingTier}
              className="px-8 py-3 bg-gradient-cta text-white rounded-xl hover:shadow-premium transition-all duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
            >
              {isSubmitting ? (
                <>
                  <LoadingSpinner size="sm" />
                  <span className="ml-2">Création en cours...</span>
                </>
              ) : (
                'Publier le trajet'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTripPage;