import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Package, Weight, Euro, Calendar, MapPin, Shield } from 'lucide-react';
import { Trip, Package as IPackage, PackageCategory } from '../types';
import { trips } from '../data/mockData';
import { PricingTierSelector } from '../components/ui/PricingTierSelector';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { useAuth } from '../contexts/AuthContext';
import { useBooking } from '../contexts/BookingContext';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

const BookingPage: React.FC = () => {
  const { tripId } = useParams<{ tripId: string }>();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const { selectedTier, setSelectedTier, calculatePrice, createBooking } = useBooking();

  const [trip, setTrip] = useState<Trip | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [packageDetails, setPackageDetails] = useState<Partial<IPackage>>({
    weight: 1,
    description: '',
    value: 0,
    category: 'other',
    fragile: false,
    urgent: false,
    photos: [],
  });

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', { state: { returnTo: `/booking/${tripId}` } });
      return;
    }

    const fetchTrip = async () => {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const foundTrip = trips.find(t => t.id === tripId);
      setTrip(foundTrip || null);
      setIsLoading(false);
    };

    if (tripId) {
      fetchTrip();
    }
  }, [tripId, isAuthenticated, navigate]);

  const handlePackageChange = (field: keyof IPackage, value: any) => {
    setPackageDetails(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!trip || !selectedTier || !user) return;

    setIsSubmitting(true);

    try {
      const totalPrice = calculatePrice(trip.pricePerKg, packageDetails.weight || 1, selectedTier);
      
      const booking = await createBooking({
        tripId: trip.id,
        trip,
        senderId: user.id,
        sender: user,
        packageDetails: packageDetails as IPackage,
        pricePerKg: trip.pricePerKg * selectedTier.multiplier,
        totalPrice,
      });

      navigate(`/payment/${booking.id}`);
    } catch (error) {
      console.error('Error creating booking:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!trip) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Trajet non trouvé</h1>
          <button
            onClick={() => navigate(-1)}
            className="text-primary-600 hover:text-primary-700 font-medium"
          >
            Retour
          </button>
        </div>
      </div>
    );
  }

  const categories: { value: PackageCategory; label: string }[] = [
    { value: 'documents', label: 'Documents' },
    { value: 'clothing', label: 'Vêtements' },
    { value: 'electronics', label: 'Électronique' },
    { value: 'food', label: 'Alimentation' },
    { value: 'gifts', label: 'Cadeaux' },
    { value: 'cosmetics', label: 'Cosmétiques' },
    { value: 'other', label: 'Autre' },
  ];

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

          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Réserver un transport
          </h1>
          <p className="text-gray-600">
            Complétez les détails de votre colis pour finaliser la réservation
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main form */}
          <div className="lg:col-span-2 space-y-8">
            {/* Trip summary */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Détails du trajet</h2>
              
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center space-x-2 text-lg font-medium">
                  <span className="text-gray-900">{trip.origin.city}</span>
                  <div className="flex items-center space-x-1 text-primary-500">
                    <div className="w-2 h-2 rounded-full bg-current"></div>
                    <div className="w-8 h-0.5 bg-current"></div>
                    <MapPin className="h-4 w-4" />
                  </div>
                  <span className="text-gray-900">{trip.destination.city}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4" />
                  <span>{format(trip.departureDate, 'dd MMM yyyy à HH:mm', { locale: fr })}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Weight className="h-4 w-4" />
                  <span>{trip.availableWeight}kg disponibles</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex items-center space-x-3">
                  <img
                    src={trip.transporter.avatar}
                    alt={trip.transporter.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-medium text-gray-900">{trip.transporter.name}</div>
                    <div className="text-sm text-gray-500">
                      ⭐ {trip.transporter.rating.toFixed(1)} ({trip.transporter.reviewCount} avis)
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Package details form */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Détails du colis</h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Poids (kg) *
                    </label>
                    <div className="relative">
                      <Weight className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <input
                        type="number"
                        min="0.1"
                        max={trip.availableWeight}
                        step="0.1"
                        required
                        value={packageDetails.weight || ''}
                        onChange={(e) => handlePackageChange('weight', parseFloat(e.target.value))}
                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                        placeholder="1.0"
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Maximum: {trip.availableWeight}kg
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Valeur estimée (€) *
                    </label>
                    <div className="relative">
                      <Euro className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <input
                        type="number"
                        min="0"
                        required
                        value={packageDetails.value || ''}
                        onChange={(e) => handlePackageChange('value', parseFloat(e.target.value))}
                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                        placeholder="100"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Catégorie *
                  </label>
                  <select
                    required
                    value={packageDetails.category || 'other'}
                    onChange={(e) => handlePackageChange('category', e.target.value as PackageCategory)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                  >
                    {categories.map((category) => (
                      <option key={category.value} value={category.value}>
                        {category.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description du contenu *
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={packageDetails.description || ''}
                    onChange={(e) => handlePackageChange('description', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                    placeholder="Décrivez le contenu de votre colis..."
                  />
                </div>

                <div className="space-y-3">
                  <div className="flex items-center">
                    <input
                      id="fragile"
                      type="checkbox"
                      checked={packageDetails.fragile || false}
                      onChange={(e) => handlePackageChange('fragile', e.target.checked)}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    />
                    <label htmlFor="fragile" className="ml-2 block text-sm text-gray-700">
                      Colis fragile (manipulation délicate requise)
                    </label>
                  </div>

                  <div className="flex items-center">
                    <input
                      id="urgent"
                      type="checkbox"
                      checked={packageDetails.urgent || false}
                      onChange={(e) => handlePackageChange('urgent', e.target.checked)}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    />
                    <label htmlFor="urgent" className="ml-2 block text-sm text-gray-700">
                      Livraison urgente
                    </label>
                  </div>
                </div>

                {/* Pricing tier selector */}
                {packageDetails.weight && packageDetails.weight > 0 && (
                  <PricingTierSelector
                    selectedTier={selectedTier}
                    onTierSelect={setSelectedTier}
                    basePrice={trip.pricePerKg}
                    weight={packageDetails.weight}
                  />
                )}
              </form>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Récapitulatif</h3>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Poids:</span>
                    <span className="font-medium">{packageDetails.weight || 0}kg</span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Prix de base:</span>
                    <span className="font-medium">{trip.pricePerKg}€/kg</span>
                  </div>

                  {selectedTier && (
                    <>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Service:</span>
                        <span className="font-medium">{selectedTier.name}</span>
                      </div>

                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Multiplicateur:</span>
                        <span className="font-medium">×{selectedTier.multiplier}</span>
                      </div>
                    </>
                  )}

                  <hr className="my-3" />

                  <div className="flex justify-between">
                    <span className="font-medium text-gray-900">Total:</span>
                    <span className="font-bold text-xl text-primary-600">
                      {selectedTier && packageDetails.weight 
                        ? calculatePrice(trip.pricePerKg, packageDetails.weight, selectedTier)
                        : 0
                      }€
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleSubmit}
                  disabled={!selectedTier || !packageDetails.weight || isSubmitting}
                  className="w-full bg-primary-600 text-white py-3 rounded-md hover:bg-primary-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <LoadingSpinner size="sm" />
                  ) : (
                    'Continuer vers le paiement'
                  )}
                </button>

                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Shield className="h-4 w-4 text-green-500" />
                    <span>Paiement 100% sécurisé</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600 mt-2">
                    <Package className="h-4 w-4 text-green-500" />
                    <span>Assurance incluse</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;