import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Package, Plane, MessageCircle, Star, Calendar, TrendingUp } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { TripCard } from '../components/ui/TripCard';
import { trips, mockStats } from '../data/mockData';

const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'overview' | 'trips' | 'bookings' | 'messages'>('overview');

  // Mock user trips and bookings
  const userTrips = trips.filter(trip => trip.transporterId === user?.id);
  const userBookings = []; // This would come from API

  const stats = {
    totalTrips: userTrips.length,
    totalBookings: 12,
    totalEarnings: 1250,
    averageRating: user?.rating || 0,
  };

  const TabButton: React.FC<{ 
    id: string; 
    label: string; 
    icon: React.ComponentType<any>; 
    count?: number 
  }> = ({ id, label, icon: Icon, count }) => (
    <button
      onClick={() => setActiveTab(id as any)}
      className={`
        flex items-center space-x-2 px-4 py-2 rounded-xl font-medium transition-all duration-200
        ${activeTab === id 
          ? 'bg-primary-100 text-primary-700 shadow-card' 
          : 'text-gray-600 hover:text-primary-600 hover:bg-gray-50'
        }
      `}
    >
      <Icon className="h-4 w-4" />
      <span>{label}</span>
      {count !== undefined && (
        <span className={`
          px-2 py-0.5 rounded-full text-xs font-medium
          ${activeTab === id ? 'bg-primary-200 text-primary-800' : 'bg-gray-200 text-gray-600'}
        `}>
          {count}
        </span>
      )}
    </button>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Bonjour {user?.name} 👋
          </h1>
          <p className="text-gray-600">
            Gérez vos trajets et réservations depuis votre tableau de bord
          </p>
        </div>

        {/* Quick actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Link
            to="/create-trip"
            className="group relative bg-gradient-hero text-white p-8 rounded-2xl hover:shadow-premium-lg transition-all duration-300 overflow-hidden"
          >
            {/* Background pattern */}
            <div className="absolute inset-0 bg-black/5"></div>
            <div className="absolute top-4 right-4 w-20 h-20 bg-white/10 rounded-full"></div>
            <div className="absolute bottom-4 left-4 w-12 h-12 bg-white/10 rounded-full"></div>
            
            <div className="relative flex items-center space-x-4">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <Plus className="h-8 w-8 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-xl mb-2 text-white">Proposer un trajet</h3>
                <p className="text-white/90 font-medium">Transportez des colis et gagnez de l'argent</p>
              </div>
            </div>
          </Link>

          <Link
            to="/search"
            className="group bg-white border-2 border-gray-100 p-8 rounded-2xl hover:border-primary-200 hover:shadow-premium transition-all duration-300"
          >
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-br from-primary-100 to-primary-200 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <Package className="h-8 w-8 text-primary-600" />
              </div>
              <div>
                <h3 className="font-bold text-xl text-gray-800 mb-2">Envoyer un colis</h3>
                <p className="text-gray-600 font-medium">Trouvez un transporteur pour vos colis</p>
              </div>
            </div>
          </Link>
        </div>

        {/* Stats cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-card hover:shadow-card-hover transition-all duration-200">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-primary-100 to-primary-200 rounded-xl flex items-center justify-center">
                <Plane className="h-6 w-6 text-primary-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-800">{stats.totalTrips}</div>
                <div className="text-sm text-gray-600 font-medium">Trajets actifs</div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-card hover:shadow-card-hover transition-all duration-200">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-accent-100 to-accent-200 rounded-xl flex items-center justify-center">
                <Package className="h-6 w-6 text-accent-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-800">{stats.totalBookings}</div>
                <div className="text-sm text-gray-600 font-medium">Réservations</div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-card hover:shadow-card-hover transition-all duration-200">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-xl flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-800">{stats.totalEarnings}€</div>
                <div className="text-sm text-gray-600 font-medium">Gains totaux</div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-card hover:shadow-card-hover transition-all duration-200">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-secondary-100 to-secondary-200 rounded-xl flex items-center justify-center">
                <Star className="h-6 w-6 text-secondary-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-800">{stats.averageRating.toFixed(1)}</div>
                <div className="text-sm text-gray-600 font-medium">Note moyenne</div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-card">
          <div className="border-b border-gray-100 p-6">
            <div className="flex flex-wrap gap-2">
              <TabButton id="overview" label="Vue d'ensemble" icon={TrendingUp} />
              <TabButton id="trips" label="Mes trajets" icon={Plane} count={userTrips.length} />
              <TabButton id="bookings" label="Réservations" icon={Package} count={12} />
              <TabButton id="messages" label="Messages" icon={MessageCircle} count={3} />
            </div>
          </div>

          <div className="p-6">
            {activeTab === 'overview' && (
              <div className="space-y-8">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-6">Activité récente</h3>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl border border-gray-100">
                      <div className="w-10 h-10 bg-gradient-to-br from-accent-100 to-accent-200 rounded-xl flex items-center justify-center">
                        <Package className="h-5 w-5 text-accent-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-800">
                          Nouvelle réservation pour Paris → Dakar
                        </p>
                        <p className="text-xs text-gray-500">Il y a 2 heures</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl border border-gray-100">
                      <div className="w-10 h-10 bg-gradient-to-br from-primary-100 to-primary-200 rounded-xl flex items-center justify-center">
                        <MessageCircle className="h-5 w-5 text-primary-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-800">
                          Nouveau message de Moussa Traoré
                        </p>
                        <p className="text-xs text-gray-500">Il y a 4 heures</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl border border-gray-100">
                      <div className="w-10 h-10 bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-xl flex items-center justify-center">
                        <Star className="h-5 w-5 text-yellow-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-800">
                          Nouvel avis 5 étoiles reçu
                        </p>
                        <p className="text-xs text-gray-500">Hier</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-6">Prochains trajets</h3>
                  {userTrips.length > 0 ? (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {userTrips.slice(0, 2).map((trip) => (
                        <TripCard key={trip.id} trip={trip} />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center mx-auto mb-6">
                        <Plane className="h-8 w-8 text-gray-400" />
                      </div>
                      <p className="text-gray-600 mb-6 font-medium">Aucun trajet programmé</p>
                      <Link
                        to="/create-trip"
                        className="bg-gradient-cta text-white px-6 py-3 rounded-xl hover:shadow-premium transition-all duration-200 font-medium"
                      >
                        Proposer un trajet
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'trips' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold text-gray-800">Mes trajets</h3>
                  <Link
                    to="/create-trip"
                    className="bg-gradient-cta text-white px-4 py-2 rounded-xl hover:shadow-premium transition-all duration-200 flex items-center space-x-2 font-medium"
                  >
                    <Plus className="h-4 w-4" />
                    <span>Nouveau trajet</span>
                  </Link>
                </div>

                {userTrips.length > 0 ? (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {userTrips.map((trip) => (
                      <TripCard key={trip.id} trip={trip} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16">
                    <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center mx-auto mb-6">
                      <Plane className="h-10 w-10 text-gray-400" />
                    </div>
                    <h4 className="text-lg font-medium text-gray-800 mb-3">
                      Aucun trajet créé
                    </h4>
                    <p className="text-gray-600 mb-8 max-w-md mx-auto">
                      Commencez à gagner de l'argent en proposant vos trajets
                    </p>
                    <Link
                      to="/create-trip"
                      className="bg-gradient-cta text-white px-8 py-4 rounded-xl hover:shadow-premium transition-all duration-200 font-medium"
                    >
                      Créer mon premier trajet
                    </Link>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'bookings' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-6">Mes réservations</h3>
                <div className="text-center py-16">
                  <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Package className="h-10 w-10 text-gray-400" />
                  </div>
                  <h4 className="text-lg font-medium text-gray-800 mb-3">
                    Aucune réservation
                  </h4>
                  <p className="text-gray-600 mb-8 max-w-md mx-auto">
                    Vos réservations de colis apparaîtront ici
                  </p>
                  <Link
                    to="/search"
                    className="bg-gradient-cta text-white px-8 py-4 rounded-xl hover:shadow-premium transition-all duration-200 font-medium"
                  >
                    Rechercher un trajet
                  </Link>
                </div>
              </div>
            )}

            {activeTab === 'messages' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-6">Messages</h3>
                <div className="text-center py-16">
                  <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <MessageCircle className="h-10 w-10 text-gray-400" />
                  </div>
                  <h4 className="text-lg font-medium text-gray-800 mb-3">
                    Aucun message
                  </h4>
                  <p className="text-gray-600">
                    Vos conversations apparaîtront ici
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;