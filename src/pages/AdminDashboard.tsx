import React, { useState } from 'react';
import { Users, Package, TrendingUp, AlertTriangle, DollarSign, Globe, Shield, Settings, BarChart3, UserCheck, MessageSquare, Flag } from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');

  // Mock admin data
  const stats = {
    totalUsers: 8935,
    totalTrips: 15420,
    totalRevenue: 125000,
    activeBookings: 234,
    pendingVerifications: 12,
    reportedIssues: 3,
    monthlyGrowth: 23.5,
    conversionRate: 12.8,
  };

  const recentUsers = [
    { id: '1', name: 'Fatou Diallo', email: 'fatou.d@email.com', status: 'verified', joinedAt: '2024-02-10' },
    { id: '2', name: 'Moussa Traoré', email: 'moussa.t@email.com', status: 'pending', joinedAt: '2024-02-09' },
    { id: '3', name: 'Aïcha Bamba', email: 'aicha.b@email.com', status: 'verified', joinedAt: '2024-02-08' },
  ];

  const recentTrips = [
    { id: '1', route: 'Paris → Dakar', transporter: 'Fatou D.', status: 'active', bookings: 3 },
    { id: '2', route: 'Londres → Lagos', transporter: 'Moussa T.', status: 'full', bookings: 5 },
    { id: '3', route: 'Bruxelles → Kinshasa', transporter: 'Aïcha B.', status: 'active', bookings: 1 },
  ];

  const TabButton: React.FC<{ id: string; label: string; icon: React.ComponentType<any>; count?: number }> = ({ id, label, icon: Icon, count }) => (
    <button
      onClick={() => setActiveTab(id)}
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
          ${activeTab === id ? 'bg-primary-200 text-primary-800' : 'bg-red-100 text-red-600'}
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
            Administration KiloConnect
          </h1>
          <p className="text-gray-600">
            Tableau de bord administrateur - Vue d'ensemble de la plateforme
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-card">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-800">{stats.totalUsers.toLocaleString()}</div>
                <div className="text-sm text-gray-600 font-medium">Utilisateurs</div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-card">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-green-200 rounded-xl flex items-center justify-center">
                <Package className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-800">{stats.totalTrips.toLocaleString()}</div>
                <div className="text-sm text-gray-600 font-medium">Trajets</div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-card">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-xl flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-800">{stats.totalRevenue.toLocaleString()}€</div>
                <div className="text-sm text-gray-600 font-medium">Revenus</div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-card">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-red-100 to-red-200 rounded-xl flex items-center justify-center">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-800">{stats.reportedIssues}</div>
                <div className="text-sm text-gray-600 font-medium">Signalements</div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-card border border-gray-100">
          <div className="border-b border-gray-100 p-6">
            <div className="flex flex-wrap gap-2">
              <TabButton id="overview" label="Vue d'ensemble" icon={BarChart3} />
              <TabButton id="users" label="Utilisateurs" icon={Users} />
              <TabButton id="trips" label="Trajets" icon={Package} />
              <TabButton id="verifications" label="Vérifications" icon={UserCheck} count={stats.pendingVerifications} />
              <TabButton id="reports" label="Signalements" icon={Flag} count={stats.reportedIssues} />
              <TabButton id="messages" label="Messages" icon={MessageSquare} />
              <TabButton id="settings" label="Paramètres" icon={Settings} />
            </div>
          </div>

          <div className="p-6">
            {/* Overview */}
            {activeTab === 'overview' && (
              <div className="space-y-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Growth Chart */}
                  <div className="bg-gradient-to-br from-primary-50 to-blue-50 border border-primary-200 rounded-2xl p-6">
                    <h3 className="font-semibold text-primary-900 mb-4">Croissance mensuelle</h3>
                    <div className="text-3xl font-bold text-primary-600 mb-2">+{stats.monthlyGrowth}%</div>
                    <p className="text-primary-700 text-sm">Nouveaux utilisateurs ce mois</p>
                    <div className="mt-4 h-32 bg-white/50 rounded-xl flex items-center justify-center">
                      <span className="text-primary-600">Graphique de croissance</span>
                    </div>
                  </div>

                  {/* Conversion Rate */}
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-6">
                    <h3 className="font-semibold text-green-900 mb-4">Taux de conversion</h3>
                    <div className="text-3xl font-bold text-green-600 mb-2">{stats.conversionRate}%</div>
                    <p className="text-green-700 text-sm">Visiteurs → Utilisateurs inscrits</p>
                    <div className="mt-4 h-32 bg-white/50 rounded-xl flex items-center justify-center">
                      <span className="text-green-600">Graphique de conversion</span>
                    </div>
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-4">Nouveaux utilisateurs</h3>
                    <div className="space-y-3">
                      {recentUsers.map((user) => (
                        <div key={user.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                          <div>
                            <div className="font-medium text-gray-800">{user.name}</div>
                            <div className="text-sm text-gray-500">{user.email}</div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className={`
                              px-2 py-1 rounded-full text-xs font-medium
                              ${user.status === 'verified' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}
                            `}>
                              {user.status === 'verified' ? 'Vérifié' : 'En attente'}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-800 mb-4">Trajets récents</h3>
                    <div className="space-y-3">
                      {recentTrips.map((trip) => (
                        <div key={trip.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                          <div>
                            <div className="font-medium text-gray-800">{trip.route}</div>
                            <div className="text-sm text-gray-500">par {trip.transporter}</div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="text-sm text-gray-600">{trip.bookings} réservations</span>
                            <span className={`
                              px-2 py-1 rounded-full text-xs font-medium
                              ${trip.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}
                            `}>
                              {trip.status === 'active' ? 'Actif' : 'Complet'}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Users Management */}
            {activeTab === 'users' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-gray-800">Gestion des utilisateurs</h3>
                  <div className="flex space-x-3">
                    <button className="bg-primary-600 text-white px-4 py-2 rounded-xl hover:bg-primary-700 transition-colors">
                      Exporter
                    </button>
                    <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-xl hover:bg-gray-50 transition-colors">
                      Filtrer
                    </button>
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Utilisateur</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Inscription</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {recentUsers.map((user) => (
                        <tr key={user.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div>
                              <div className="font-medium text-gray-900">{user.name}</div>
                              <div className="text-sm text-gray-500">{user.email}</div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`
                              px-2 py-1 rounded-full text-xs font-medium
                              ${user.status === 'verified' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}
                            `}>
                              {user.status === 'verified' ? 'Vérifié' : 'En attente'}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {user.joinedAt}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button className="text-primary-600 hover:text-primary-900 mr-3">Voir</button>
                            <button className="text-red-600 hover:text-red-900">Suspendre</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Other tabs content would go here */}
            {activeTab !== 'overview' && activeTab !== 'users' && (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Settings className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Section en développement
                </h3>
                <p className="text-gray-600">
                  Cette section sera disponible dans une prochaine version.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;