import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Calendar, Weight, Euro, Star, Shield, Clock } from 'lucide-react';
import { Trip } from '../../types';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

interface TripCardProps {
  trip: Trip;
  className?: string;
}

export const TripCard: React.FC<TripCardProps> = ({ trip, className = '' }) => {
  const formatDate = (date: Date) => {
    return format(date, 'dd MMM', { locale: fr });
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
  const isUrgent = daysUntil <= 3;

  return (
    <Link to={`/trip/${trip.id}`}>
      <div className={`
        group bg-white rounded-2xl shadow-card hover:shadow-premium-lg 
        transition-all duration-300 hover:-translate-y-1 border border-gray-100 overflow-hidden
        ${className}
      `}>
        {/* Header with route */}
        <div className="p-6 pb-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2 text-lg font-semibold">
                <span className="text-gray-800">{trip.origin.city}</span>
                <div className="flex items-center space-x-1 text-primary-500">
                  <div className="w-2 h-2 rounded-full bg-current"></div>
                  <div className="w-8 h-0.5 bg-current"></div>
                  <MapPin className="h-4 w-4" />
                </div>
                <span className="text-gray-800">{trip.destination.city}</span>
              </div>
            </div>
            
            {isUrgent && (
              <div className="bg-gradient-to-r from-secondary-500 to-secondary-600 text-white px-3 py-1.5 rounded-full text-xs font-medium flex items-center shadow-premium">
                <Clock className="h-3 w-3 mr-1" />
                {daysUntil > 0 ? `${daysUntil}j` : 'Aujourd\'hui'}
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-primary-400" />
              <span>{formatDate(trip.departureDate)} à {formatTime(trip.departureDate)}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Weight className="h-4 w-4 text-primary-400" />
              <span>{trip.availableWeight}kg disponibles</span>
            </div>
          </div>
        </div>

        {/* Transporter info */}
        <div className="px-6 pb-4">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <img
                src={trip.transporter.avatar}
                alt={trip.transporter.name}
                className="w-12 h-12 rounded-xl object-cover ring-2 ring-gray-100"
              />
              {trip.transporter.verifiedAt && (
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-accent-500 rounded-full flex items-center justify-center">
                  <Shield className="h-3 w-3 text-white" />
                </div>
              )}
            </div>
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <h3 className="font-medium text-gray-800">{trip.transporter.name}</h3>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span>{trip.transporter.rating.toFixed(1)}</span>
                </div>
                <span>•</span>
                <span>({trip.transporter.reviewCount} avis)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Price and action */}
        <div className="px-6 py-4 bg-gradient-to-r from-gray-50 to-gray-50/50 border-t border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Euro className="h-5 w-5 text-gray-400" />
              <span className="text-2xl font-bold text-gray-800">{trip.pricePerKg}</span>
              <span className="text-gray-500">/kg</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500">
                {trip.availableWeight > 5 ? 'Beaucoup de place' : 'Places limitées'}
              </span>
              <div className={`
                w-3 h-3 rounded-full 
                ${trip.availableWeight > 10 ? 'bg-accent-400' : 
                  trip.availableWeight > 5 ? 'bg-yellow-400' : 'bg-secondary-400'}
              `} />
            </div>
          </div>

          {trip.description && (
            <p className="text-sm text-gray-600 mt-3 line-clamp-2">
              {trip.description}
            </p>
          )}
        </div>

        {/* Hover effect overlay */}
        <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-primary-200 transition-colors pointer-events-none" />
      </div>
    </Link>
  );
};