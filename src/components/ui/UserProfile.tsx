import React from 'react';
import { Star, Shield, Calendar, MapPin, Badge } from 'lucide-react';
import { User } from '../../types';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

interface UserProfileProps {
  user: User;
  showFullInfo?: boolean;
  className?: string;
}

export const UserProfile: React.FC<UserProfileProps> = ({ 
  user, 
  showFullInfo = false, 
  className = '' 
}) => {
  const getBadgeIcon = (iconName: string) => {
    switch (iconName) {
      case 'shield-check':
        return Shield;
      case 'star':
        return Star;
      case 'plane':
        return MapPin;
      case 'zap':
        return Badge;
      default:
        return Shield;
    }
  };

  return (
    <div className={`bg-white rounded-lg border border-gray-200 p-6 ${className}`}>
      {/* Header */}
      <div className="flex items-start space-x-4 mb-6">
        <img
          src={user.avatar}
          alt={user.name}
          className="w-16 h-16 rounded-full object-cover"
        />
        
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-1">
            <h2 className="text-xl font-semibold text-gray-900">{user.name}</h2>
            {user.verifiedAt && (
              <Shield className="h-5 w-5 text-blue-500" />
            )}
          </div>
          
          <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
            <div className="flex items-center space-x-1">
              <Star className="h-4 w-4 text-yellow-400 fill-current" />
              <span className="font-medium">{user.rating.toFixed(1)}</span>
              <span>({user.reviewCount} avis)</span>
            </div>
            
            <div className="flex items-center space-x-1">
              <Calendar className="h-4 w-4" />
              <span>Membre depuis {format(user.joinedAt, 'MMM yyyy', { locale: fr })}</span>
            </div>
          </div>

          {/* Badges */}
          {user.badges.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {user.badges.map((badge) => {
                const IconComponent = getBadgeIcon(badge.icon);
                return (
                  <div
                    key={badge.id}
                    className="inline-flex items-center space-x-1 bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs"
                  >
                    <IconComponent className={`h-3 w-3 ${badge.color}`} />
                    <span>{badge.name}</span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Full info section */}
      {showFullInfo && (
        <>
          {user.bio && (
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-900 mb-2">À propos</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{user.bio}</p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Contact info */}
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-3">Contact</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center space-x-2 text-gray-600">
                  <span>Email:</span>
                  <span className="font-medium">{user.email}</span>
                </div>
                {user.phone && (
                  <div className="flex items-center space-x-2 text-gray-600">
                    <span>Téléphone:</span>
                    <span className="font-medium">{user.phone}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Stats */}
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-3">Statistiques</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Note moyenne:</span>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="font-medium">{user.rating.toFixed(1)}/5</span>
                  </div>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Nombre d'avis:</span>
                  <span className="font-medium">{user.reviewCount}</span>
                </div>
                {user.verifiedAt && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Vérifié depuis:</span>
                    <span className="font-medium">
                      {format(user.verifiedAt, 'MMM yyyy', { locale: fr })}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};