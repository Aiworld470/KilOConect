import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { MapPin, Calendar, Weight, Euro, Star, Shield, MessageCircle, ArrowLeft, Clock, Plane } from 'lucide-react';
import { Trip } from '../types';
import { trips, sampleReviews } from '../data/mockData';
import { UserProfile } from '../components/ui/UserProfile';
import { RatingDisplay } from '../components/ui/RatingStars';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { useAuth } from '../contexts/AuthContext';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { SecurityApproach } from '../components/security/SecurityApproach';

const TripDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [trip, setTrip] = useState<Trip | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTrip = async () => {
      setIsLoading(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const foundTrip = trips.find(t => t.id === id);
      setTrip(foundTrip || null);
      setIsLoading(false);
    };

    if (id) {
      fetchTrip();
    }
  }, [id]);

  const handleBooking = () => {
    if (!isAuthenticated) {
      navigate('/login', { state: { returnTo: `/booking/${trip?.id}` } });
      return;
    }
    navigate(`/booking/${trip?.id}`);
  };

  const handleMessage = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    // Navigate to chat with this transporter
    navigate('/chat', { state: { transporterId: trip?.transporterId } });
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
          <Link
            to="/search"
            className="text-primary-600 hover:text-primary-700 font-medium"
          >
            Retour à la recherche
          </Link>
        </div>
      </div>
    );
  }

  const formatDate = (date: Date) => {
    return format(date, 'EEEE dd MMMM yyyy', { locale: fr });
  };

  const formatTime = (date: Date) => {
    return format(date, 'HH:mm');
  };

  const getDaysUntilDeparture = () => {
    const now = new Date();
    const departure = new Date(trip.departureDate);
    const diffTime = departure.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const daysUntil = getDaysUntilDeparture();
  const transporterReviews = sampleReviews.filter(r => r.revieweeId === trip.transporter.id);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back button */}
        <div className="mb-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center space-x-2 text-gray-600 hover:text-primary-600 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Retour</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Trip header */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2 text-2xl font-bold">
                    <span className="text-gray-900">{trip.origin.city}</span>
                    <div className="flex items-center space-x-2 text-primary-500">
                      <div className="w-3 h-3 rounded-full bg-current"></div>
                      <div className="w-12 h-0.5 bg-current"></div>
                      <Plane className="h-5 w-5" />
                    </div>
                    <span className="text-gray-900">{trip.destination.city}</span>
                  </div>
                </div>
                
                {daysUntil <= 3 && daysUntil > 0 && (
                  <div className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {daysUntil}j restant{daysUntil > 1 ? 's' : ''}
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="flex items-center space-x-3">
                  <Calendar className="h-5 w-5 text-gray-400" />
                  <div>
                    <div className="font-medium text-gray-900">
                      {formatDate(trip.departureDate)}
                    </div>
                    <div className="text-sm text-gray-500">
                      Départ à {formatTime(trip.departureDate)}
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Weight className="h-5 w-5 text-gray-400" />
                  <div>
                    <div className="font-medium text-gray-900">
                      {trip.availableWeight}kg disponibles
                    </div>
                    <div className="text-sm text-gray-500">
                      Espace restant
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Euro className="h-5 w-5 text-gray-400" />
                  <div>
                    <div className="font-medium text-gray-900">
                      {trip.pricePerKg}€/kg
                    </div>
                    <div className="text-sm text-gray-500">
                      Prix par kilogramme
                    </div>
                  </div>
                </div>
              </div>

              {trip.description && (
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Description</h3>
                  <p className="text-gray-600 leading-relaxed">{trip.description}</p>
                </div>
              )}
            </div>

            {/* Photos */}
            {trip.photos.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="font-medium text-gray-900 mb-4">Photos du voyage</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {trip.photos.map((photo, index) => (
                    <img
                      key={index}
                      src={photo}
                      alt={`Photo ${index + 1}`}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Security Approach for Senders */}
            <SecurityApproach userType="sender" />

            {/* Transporter profile */}
            <UserProfile user={trip.transporter} showFullInfo />

            {/* Reviews */}
            {transporterReviews.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="font-medium text-gray-900 mb-4">
                  Avis sur {trip.transporter.name}
                </h3>
                
                <div className="space-y-4">
                  {transporterReviews.slice(0, 3).map((review) => (
                    <div key={review.id} className="border-b border-gray-200 pb-4 last:border-b-0">
                      <div className="flex items-start space-x-3">
                        <img
                          src={review.reviewer.avatar}
                          alt={review.reviewer.name}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="font-medium text-gray-900">
                              {review.reviewer.name}
                            </span>
                            <RatingDisplay rating={review.rating} showCount={false} size="sm" />
                          </div>
                          <p className="text-gray-600 text-sm leading-relaxed">
                            {review.comment}
                          </p>
                          <div className="text-xs text-gray-500 mt-2">
                            {format(review.createdAt, 'dd MMM yyyy', { locale: fr })}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {transporterReviews.length > 3 && (
                  <div className="mt-4 text-center">
                    <Link
                      to={`/reviews?user=${trip.transporter.id}`}
                      className="text-primary-600 hover:text-primary-700 font-medium text-sm"
                    >
                      Voir tous les avis ({transporterReviews.length})
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="text-center mb-6">
                  <div className="text-3xl font-bold text-gray-900 mb-1">
                    {trip.pricePerKg}€
                  </div>
                  <div className="text-gray-500">par kilogramme</div>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Espace disponible:</span>
                    <span className="font-medium">{trip.availableWeight}kg</span>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Statut:</span>
                    <span className="font-medium text-green-600">Disponible</span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Départ dans:</span>
                    <span className="font-medium">
                      {daysUntil > 0 ? `${daysUntil} jour${daysUntil > 1 ? 's' : ''}` : 'Aujourd\'hui'}
                    </span>
                  </div>
                </div>

                <div className="space-y-3">
                  <button
                    onClick={handleBooking}
                    className="w-full bg-primary-600 text-white py-3 rounded-md hover:bg-primary-700 transition-colors font-medium"
                  >
                    Réserver maintenant
                  </button>

                  <button
                    onClick={handleMessage}
                    className="w-full border border-gray-300 text-gray-700 py-3 rounded-md hover:bg-gray-50 transition-colors font-medium flex items-center justify-center space-x-2"
                  >
                    <MessageCircle className="h-4 w-4" />
                    <span>Contacter</span>
                  </button>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Shield className="h-4 w-4 text-green-500" />
                    <span>Paiement sécurisé</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600 mt-2">
                    <Shield className="h-4 w-4 text-yellow-500" />
                    <span>Transport à vos risques</span>
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

export default TripDetailPage;