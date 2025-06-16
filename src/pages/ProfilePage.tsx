import React, { useState } from 'react';
import { Camera, Edit, Star, Shield, Calendar, MapPin, Phone, Mail, Eye, EyeOff, TrendingUp, Award, Bell, Settings, CreditCard, BarChart3, Target, Zap, Users, Package, MessageCircle, Download, Trash2 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { RatingDisplay } from '../components/ui/RatingStars';
import { sampleReviews } from '../data/mockData';
import { ContactProtection } from '../components/security/ContactProtection';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

interface ProfilePageProps {
  userId?: string; // Si fourni, affiche le profil de cet utilisateur (vue publique)
}

const ProfilePage: React.FC<ProfilePageProps> = ({ userId }) => {
  const { user: currentUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [showPrivateInfo, setShowPrivateInfo] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  
  // Détermine si c'est le propriétaire du profil ou un visiteur
  const isOwner = !userId || userId === currentUser?.id;
  const profileUser = isOwner ? currentUser : null; // En réalité, on chargerait l'utilisateur par son ID

  const [editForm, setEditForm] = useState({
    name: profileUser?.name || '',
    phone: profileUser?.phone || '',
    bio: profileUser?.bio || '',
  });

  // Mock data pour les nouvelles fonctionnalités
  const revenueData = {
    thisMonth: 1247,
    total: 8934,
    avgPricePerKg: 34,
    monthlyData: [
      { month: 'Jan', revenue: 850 },
      { month: 'Fév', revenue: 920 },
      { month: 'Mar', revenue: 1100 },
      { month: 'Avr', revenue: 1247 },
    ]
  };

  const badges = [
    { id: 'super-transporter', name: 'Super Transporteur', icon: Star, color: 'text-yellow-500', progress: 100, description: '50+ trajets réussis' },
    { id: 'expert-route', name: 'Expert Route', icon: MapPin, color: 'text-blue-500', progress: 60, description: '6/10 trajets sur route principale' },
    { id: 'speed-demon', name: 'Livraison Express', icon: Zap, color: 'text-green-500', progress: 80, description: '8/10 livraisons express' },
    { id: 'trusted-member', name: 'Membre de Confiance', icon: Shield, color: 'text-purple-500', progress: 100, description: 'Vérifications complètes' },
  ];

  const analytics = {
    thisMonth: {
      trips: 12,
      weight: 156,
      rating: 4.9,
      successRate: 98,
      growth: { trips: 20, weight: 15, rating: 0.1, successRate: 0 }
    },
    favoriteRoutes: [
      { route: 'Paris → Dakar', count: 8 },
      { route: 'Londres → Lagos', count: 4 },
    ]
  };

  const notifications = [
    { id: '1', type: 'booking', message: 'Nouvelle réservation', details: 'Moussa souhaite réserver 3kg pour Paris → Dakar', time: '5 minutes', unread: true },
    { id: '2', type: 'payment', message: 'Paiement reçu', details: '75€ pour trajet Paris → Dakar', time: '2 heures', unread: false },
    { id: '3', type: 'review', message: 'Nouvel avis 5 étoiles', details: 'Avis positif de Aïcha B.', time: '1 jour', unread: false },
  ];

  const aiRecommendations = [
    'Proposez Paris → Bamako (demande +40%)',
    'Augmentez vos prix de 8% (sous-évalué)',
    'Ajoutez photos véhicule (+15% réservations)',
  ];

  if (!profileUser) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Profil non trouvé
          </h1>
        </div>
      </div>
    );
  }

  const userReviews = sampleReviews.filter(r => r.revieweeId === profileUser.id);

  const handleSave = () => {
    console.log('Saving profile:', editForm);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditForm({
      name: profileUser.name,
      phone: profileUser.phone || '',
      bio: profileUser.bio || '',
    });
    setIsEditing(false);
  };

  const handleStartChat = () => {
    console.log('Starting secure chat with:', profileUser.name);
  };

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
          ${activeTab === id ? 'bg-primary-200 text-primary-800' : 'bg-gray-200 text-gray-600'}
        `}>
          {count}
        </span>
      )}
    </button>
  );

  // VUE PROPRIÉTAIRE (utilisateur connecté regardant son propre profil)
  if (isOwner) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Propriétaire */}
          <div className="bg-white rounded-2xl shadow-card border border-gray-100 p-8 mb-8">
            <div className="flex items-center space-x-2 mb-6">
              <Shield className="h-5 w-5 text-green-500" />
              <span className="text-sm font-medium text-green-700">Mon profil privé</span>
            </div>

            <div className="flex flex-col md:flex-row items-start md:items-center space-y-6 md:space-y-0 md:space-x-8">
              <div className="relative">
                <img
                  src={profileUser.avatar}
                  alt={profileUser.name}
                  className="w-32 h-32 rounded-2xl object-cover"
                />
                <button className="absolute bottom-2 right-2 w-10 h-10 bg-primary-600 text-white rounded-xl flex items-center justify-center hover:bg-primary-700 transition-colors">
                  <Camera className="h-5 w-5" />
                </button>
              </div>

              <div className="flex-1">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                      {profileUser.name}
                    </h1>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>Membre depuis {format(profileUser.joinedAt, 'MMMM yyyy', { locale: fr })}</span>
                      </div>
                      {profileUser.verifiedAt && (
                        <div className="flex items-center space-x-1 text-blue-600">
                          <Shield className="h-4 w-4" />
                          <span>Compte vérifié</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors"
                  >
                    <Edit className="h-4 w-4" />
                    <span>{isEditing ? 'Annuler' : 'Modifier'}</span>
                  </button>
                </div>

                <RatingDisplay 
                  rating={profileUser.rating} 
                  reviewCount={profileUser.reviewCount} 
                  size="lg" 
                />
              </div>
            </div>
          </div>

          {/* Tabs Navigation */}
          <div className="bg-white rounded-2xl shadow-card border border-gray-100 mb-8">
            <div className="p-6 border-b border-gray-100">
              <div className="flex flex-wrap gap-2">
                <TabButton id="overview" label="Vue d'ensemble" icon={TrendingUp} />
                <TabButton id="revenue" label="Revenus" icon={BarChart3} />
                <TabButton id="badges" label="Badges" icon={Award} />
                <TabButton id="analytics" label="Analytics" icon={Target} />
                <TabButton id="notifications" label="Notifications" icon={Bell} count={notifications.filter(n => n.unread).length} />
                <TabButton id="personalization" label="Personnalisation" icon={Settings} />
                <TabButton id="security" label="Sécurité" icon={Shield} />
              </div>
            </div>

            <div className="p-6">
              {/* Vue d'ensemble */}
              {activeTab === 'overview' && (
                <div className="space-y-8">
                  {/* Informations Privées */}
                  <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-xl font-semibold text-red-900 flex items-center space-x-2">
                        <Shield className="h-5 w-5 text-red-500" />
                        <span>🔒 Mes informations privées</span>
                      </h2>
                      <button
                        onClick={() => setShowPrivateInfo(!showPrivateInfo)}
                        className="flex items-center space-x-2 text-red-600 hover:text-red-800"
                      >
                        {showPrivateInfo ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        <span>{showPrivateInfo ? 'Masquer' : 'Afficher'}</span>
                      </button>
                    </div>

                    {showPrivateInfo && (
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="p-4 bg-white border border-red-300 rounded-xl">
                            <div className="flex items-center space-x-2 mb-2">
                              <Mail className="h-4 w-4 text-red-600" />
                              <span className="font-medium text-red-900">Email</span>
                            </div>
                            <span className="text-red-800">{profileUser.email}</span>
                            <p className="text-xs text-red-600 mt-1">❌ Jamais visible publiquement</p>
                          </div>

                          <div className="p-4 bg-white border border-red-300 rounded-xl">
                            <div className="flex items-center space-x-2 mb-2">
                              <Phone className="h-4 w-4 text-red-600" />
                              <span className="font-medium text-red-900">Téléphone</span>
                            </div>
                            <span className="text-red-800">{profileUser.phone || 'Non renseigné'}</span>
                            <p className="text-xs text-red-600 mt-1">❌ Jamais visible publiquement</p>
                          </div>
                        </div>

                        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                          <h3 className="font-medium text-blue-900 mb-2">👁️ Ce que voient les autres utilisateurs :</h3>
                          <div className="text-sm text-blue-800">
                            <p>• Prénom + Initiale : "Fatou D."</p>
                            <p>• Rating et avis publics</p>
                            <p>• Zone géographique générale</p>
                            <p>• Statistiques de transport</p>
                            <p>• Badges et vérifications</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Recommandations IA */}
                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-2xl p-6">
                    <h4 className="font-medium text-purple-900 mb-4 flex items-center space-x-2">
                      <Zap className="h-5 w-5" />
                      <span>🤖 Recommandations IA</span>
                    </h4>
                    <ul className="text-sm text-purple-800 space-y-2">
                      {aiRecommendations.map((rec, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <span className="text-purple-600">•</span>
                          <span>{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Section À propos */}
                  <div className="bg-white rounded-2xl shadow-card border border-gray-100 p-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">À propos</h2>
                    
                    {isEditing ? (
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Nom complet
                          </label>
                          <input
                            type="text"
                            value={editForm.name}
                            onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Téléphone
                          </label>
                          <input
                            type="tel"
                            value={editForm.phone}
                            onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Biographie publique
                          </label>
                          <textarea
                            rows={4}
                            value={editForm.bio}
                            onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                            placeholder="Cette description sera visible par tous les utilisateurs..."
                          />
                        </div>

                        <div className="flex space-x-3">
                          <button
                            onClick={handleSave}
                            className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 transition-colors"
                          >
                            Sauvegarder
                          </button>
                          <button
                            onClick={handleCancel}
                            className="border border-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-50 transition-colors"
                          >
                            Annuler
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div>
                        {profileUser.bio ? (
                          <p className="text-gray-600 leading-relaxed">{profileUser.bio}</p>
                        ) : (
                          <p className="text-gray-500 italic">
                            Aucune biographie ajoutée. Cliquez sur "Modifier" pour ajouter une description publique.
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Dashboard Revenus */}
              {activeTab === 'revenue' && (
                <div className="space-y-8">
                  <h2 className="text-2xl font-bold text-gray-800">💰 Mes revenus</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-2xl border border-green-200">
                      <div className="text-3xl font-bold text-green-600">{revenueData.thisMonth}€</div>
                      <div className="text-sm text-green-700 font-medium">Ce mois</div>
                    </div>
                    <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl border border-blue-200">
                      <div className="text-3xl font-bold text-blue-600">{revenueData.total}€</div>
                      <div className="text-sm text-blue-700 font-medium">Total gagné</div>
                    </div>
                    <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl border border-purple-200">
                      <div className="text-3xl font-bold text-purple-600">{revenueData.avgPricePerKg}€</div>
                      <div className="text-sm text-purple-700 font-medium">Prix moyen/kg</div>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-2xl shadow-card border border-gray-100 p-6">
                    <h3 className="font-semibold text-gray-800 mb-4">Évolution mensuelle</h3>
                    <div className="h-64 bg-gray-50 rounded-xl flex items-center justify-center">
                      <span className="text-gray-500">Graphique revenus mensuels</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Système de badges */}
              {activeTab === 'badges' && (
                <div className="space-y-8">
                  <h2 className="text-2xl font-bold text-gray-800">🏆 Mes badges</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {badges.map((badge) => {
                      const Icon = badge.icon;
                      const isCompleted = badge.progress === 100;
                      
                      return (
                        <div key={badge.id} className={`
                          p-6 rounded-2xl border-2 transition-all duration-200
                          ${isCompleted 
                            ? 'bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-300' 
                            : 'bg-gray-50 border-gray-200'
                          }
                        `}>
                          <div className="flex items-center space-x-4 mb-4">
                            <div className={`
                              w-16 h-16 rounded-2xl flex items-center justify-center
                              ${isCompleted ? 'bg-yellow-500' : 'bg-gray-300'}
                            `}>
                              <Icon className={`h-8 w-8 ${isCompleted ? 'text-white' : 'text-gray-500'}`} />
                            </div>
                            <div className="flex-1">
                              <h4 className={`font-semibold ${isCompleted ? 'text-yellow-800' : 'text-gray-600'}`}>
                                {badge.name}
                              </h4>
                              <p className={`text-sm ${isCompleted ? 'text-yellow-700' : 'text-gray-500'}`}>
                                {badge.description}
                              </p>
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-600">Progression</span>
                              <span className="font-medium">{badge.progress}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-3">
                              <div 
                                className={`h-3 rounded-full transition-all duration-500 ${
                                  isCompleted ? 'bg-yellow-500' : 'bg-primary-500'
                                }`}
                                style={{width: `${badge.progress}%`}}
                              ></div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Analytics */}
              {activeTab === 'analytics' && (
                <div className="space-y-8">
                  <h2 className="text-2xl font-bold text-gray-800">📊 Analytics</h2>
                  
                  <div>
                    <h4 className="font-medium text-gray-700 mb-4">Performance ce mois</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center p-4 bg-white rounded-xl border border-gray-200">
                        <div className="text-2xl font-bold text-gray-800">{analytics.thisMonth.trips}</div>
                        <div className="text-sm text-gray-600">Trajets</div>
                        <div className="text-xs text-green-600">+{analytics.thisMonth.growth.trips}% vs mois dernier</div>
                      </div>
                      <div className="text-center p-4 bg-white rounded-xl border border-gray-200">
                        <div className="text-2xl font-bold text-gray-800">{analytics.thisMonth.weight}kg</div>
                        <div className="text-sm text-gray-600">Transporté</div>
                        <div className="text-xs text-green-600">+{analytics.thisMonth.growth.weight}% vs mois dernier</div>
                      </div>
                      <div className="text-center p-4 bg-white rounded-xl border border-gray-200">
                        <div className="text-2xl font-bold text-gray-800">{analytics.thisMonth.rating}⭐</div>
                        <div className="text-sm text-gray-600">Note moyenne</div>
                        <div className="text-xs text-green-600">+{analytics.thisMonth.growth.rating} vs mois dernier</div>
                      </div>
                      <div className="text-center p-4 bg-white rounded-xl border border-gray-200">
                        <div className="text-2xl font-bold text-gray-800">{analytics.thisMonth.successRate}%</div>
                        <div className="text-sm text-gray-600">Taux réussite</div>
                        <div className="text-xs text-gray-500">Stable</div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-700 mb-4">Routes favorites</h4>
                    <div className="space-y-3">
                      {analytics.favoriteRoutes.map((route, index) => (
                        <div key={index} className="flex justify-between items-center p-4 bg-white rounded-xl border border-gray-200">
                          <span className="font-medium">{route.route}</span>
                          <span className="text-gray-600">{route.count} trajets</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Notifications */}
              {activeTab === 'notifications' && (
                <div className="space-y-8">
                  <h2 className="text-2xl font-bold text-gray-800">🔔 Notifications</h2>
                  
                  <div className="space-y-4">
                    {notifications.map((notification) => (
                      <div key={notification.id} className={`
                        flex items-start space-x-4 p-4 rounded-xl border transition-all duration-200
                        ${notification.unread 
                          ? 'bg-blue-50 border-blue-200' 
                          : 'bg-white border-gray-200'
                        }
                      `}>
                        <div className={`
                          w-3 h-3 rounded-full mt-2
                          ${notification.unread ? 'bg-blue-500' : 'bg-gray-300'}
                        `}></div>
                        <div className="flex-1">
                          <p className={`font-medium ${notification.unread ? 'text-blue-900' : 'text-gray-800'}`}>
                            {notification.message}
                          </p>
                          <p className={`text-sm ${notification.unread ? 'text-blue-700' : 'text-gray-600'}`}>
                            {notification.details}
                          </p>
                          <p className={`text-xs mt-1 ${notification.unread ? 'text-blue-600' : 'text-gray-500'}`}>
                            Il y a {notification.time}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Personnalisation */}
              {activeTab === 'personalization' && (
                <div className="space-y-8">
                  <h2 className="text-2xl font-bold text-gray-800">🎨 Personnalisation</h2>
                  
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-medium text-gray-700 mb-4">Photo de couverture</h4>
                      <div className="h-32 bg-gradient-hero rounded-2xl relative overflow-hidden">
                        <button className="absolute bottom-4 right-4 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-white/30 transition-colors">
                          Changer
                        </button>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-gray-700 mb-4">Spécialités</h4>
                      <div className="flex flex-wrap gap-3">
                        <span className="px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-medium">Cosmétiques</span>
                        <span className="px-4 py-2 bg-secondary-100 text-secondary-700 rounded-full text-sm font-medium">Électronique</span>
                        <button className="px-4 py-2 border-2 border-dashed border-gray-300 text-gray-600 rounded-full text-sm hover:border-primary-400 transition-colors">
                          + Ajouter
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Sécurité */}
              {activeTab === 'security' && (
                <div className="space-y-8">
                  <h2 className="text-2xl font-bold text-gray-800">🔒 Sécurité</h2>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-xl">
                      <div className="flex items-center space-x-3">
                        <Shield className="h-5 w-5 text-green-500" />
                        <div>
                          <p className="font-medium text-gray-800">Authentification 2FA</p>
                          <p className="text-sm text-gray-600">Protection renforcée</p>
                        </div>
                      </div>
                      <span className="text-sm text-green-600 font-medium">Activé</span>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-xl">
                      <div className="flex items-center space-x-3">
                        <Shield className="h-5 w-5 text-blue-500" />
                        <div>
                          <p className="font-medium text-gray-800">Vérification identité</p>
                          <p className="text-sm text-gray-600">Document officiel validé</p>
                        </div>
                      </div>
                      <span className="text-sm text-blue-600 font-medium">Vérifié</span>
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl shadow-card border border-gray-100 p-6">
                    <h3 className="font-medium text-gray-800 mb-4">Actions rapides</h3>
                    <div className="space-y-3">
                      <button className="w-full text-left px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-xl transition-colors">
                        Changer le mot de passe
                      </button>
                      <button className="w-full text-left px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-xl transition-colors">
                        Paramètres de notification
                      </button>
                      <button className="w-full text-left px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-xl transition-colors flex items-center space-x-2">
                        <Download className="h-4 w-4" />
                        <span>Télécharger mes données</span>
                      </button>
                      <button className="w-full text-left px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl transition-colors flex items-center space-x-2">
                        <Trash2 className="h-4 w-4" />
                        <span>Supprimer le compte</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Avis reçus */}
          <div className="bg-white rounded-2xl shadow-card border border-gray-100 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Avis reçus ({userReviews.length})
            </h2>

            {userReviews.length > 0 ? (
              <div className="space-y-6">
                {userReviews.map((review) => (
                  <div key={review.id} className="border-b border-gray-200 pb-6 last:border-b-0">
                    <div className="flex items-start space-x-4">
                      <img
                        src={review.reviewer.avatar}
                        alt={review.reviewer.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <h4 className="font-medium text-gray-900">
                              {review.reviewer.name}
                            </h4>
                            <RatingDisplay 
                              rating={review.rating} 
                              showCount={false} 
                              size="sm" 
                            />
                          </div>
                          <span className="text-sm text-gray-500">
                            {format(review.createdAt, 'dd MMM yyyy', { locale: fr })}
                          </span>
                        </div>
                        
                        {review.comment && (
                          <p className="text-gray-600 leading-relaxed">
                            {review.comment}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Star className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Aucun avis pour le moment
                </h3>
                <p className="text-gray-600">
                  Vos premiers avis apparaîtront ici après vos premiers transports
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // VUE PUBLIQUE (autres utilisateurs regardant ce profil)
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Public - INFORMATIONS LIMITÉES */}
        <div className="bg-white rounded-2xl shadow-card border border-gray-100 p-8 mb-8">
          <div className="flex items-center space-x-2 mb-6">
            <Eye className="h-5 w-5 text-blue-500" />
            <span className="text-sm font-medium text-blue-700">Profil public</span>
          </div>

          <div className="flex flex-col md:flex-row items-start md:items-center space-y-6 md:space-y-0 md:space-x-8">
            <div className="relative">
              <img
                src={profileUser.avatar}
                alt="Transporteur"
                className="w-32 h-32 rounded-2xl object-cover"
              />
              {profileUser.verifiedAt && (
                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <Shield className="h-4 w-4 text-white" />
                </div>
              )}
            </div>

            <div className="flex-1">
              <div className="mb-4">
                {/* NOM ANONYMISÉ */}
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {profileUser.name.split(' ')[0]} {profileUser.name.split(' ')[1]?.[0]}.
                </h1>
                
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <span>Membre depuis {format(profileUser.joinedAt, 'MMMM yyyy', { locale: fr })}</span>
                  </div>
                  {profileUser.verifiedAt && (
                    <div className="flex items-center space-x-1 text-blue-600">
                      <Shield className="h-4 w-4" />
                      <span>Compte vérifié</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="mb-6">
                <RatingDisplay 
                  rating={profileUser.rating} 
                  reviewCount={profileUser.reviewCount} 
                  size="lg" 
                />
              </div>

              {/* Badges publics */}
              {profileUser.badges.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {profileUser.badges.map((badge) => (
                    <div
                      key={badge.id}
                      className="inline-flex items-center space-x-1 bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                    >
                      <Shield className={`h-4 w-4 ${badge.color}`} />
                      <span>{badge.name}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Informations publiques SEULEMENT */}
        <div className="space-y-8">
          {/* Zone de service */}
          <div className="bg-white rounded-2xl shadow-card border border-gray-100 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">📍 Zone de service</h2>
            <p className="text-gray-600">
              Paris, France ↔ Dakar, Sénégal
            </p>
          </div>

          {/* Statistiques publiques */}
          <div className="bg-white rounded-2xl shadow-card border border-gray-100 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">📊 Statistiques</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">12</div>
                <div className="text-sm text-gray-600">Trajets</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">28</div>
                <div className="text-sm text-gray-600">Colis</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">100%</div>
                <div className="text-sm text-gray-600">Réussite</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">156kg</div>
                <div className="text-sm text-gray-600">Total</div>
              </div>
            </div>
          </div>

          {/* Vérifications */}
          <div className="bg-white rounded-2xl shadow-card border border-gray-100 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">✅ Vérifications</h2>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-green-600">
                <Shield className="h-4 w-4" />
                <span className="text-sm">📧 Email vérifié</span>
              </div>
              <div className="flex items-center space-x-3 text-green-600">
                <Shield className="h-4 w-4" />
                <span className="text-sm">📱 Téléphone vérifié</span>
              </div>
              <div className="flex items-center space-x-3 text-green-600">
                <Shield className="h-4 w-4" />
                <span className="text-sm">🆔 Identité vérifiée</span>
              </div>
            </div>
          </div>

          {/* À propos public */}
          {profileUser.bio && (
            <div className="bg-white rounded-2xl shadow-card border border-gray-100 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">💬 À propos</h2>
              <p className="text-gray-600 leading-relaxed">{profileUser.bio}</p>
            </div>
          )}

          {/* Contact sécurisé UNIQUEMENT */}
          <div className="bg-white rounded-2xl shadow-card border border-gray-100 p-6">
            <div className="text-center">
              <button
                onClick={() => setShowContactModal(true)}
                className="bg-gradient-cta text-white px-8 py-4 rounded-xl hover:shadow-premium transition-all duration-200 font-medium text-lg"
              >
                💬 Contacter {profileUser.name.split(' ')[0]}
              </button>
              
              <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-xl">
                <div className="flex items-center justify-center space-x-2 text-blue-800 mb-2">
                  <Shield className="h-5 w-5" />
                  <span className="font-medium">🛡️ Contact sécurisé via KiloConnect uniquement</span>
                </div>
                <div className="text-sm text-blue-700">
                  ✅ Protection assurance | ✅ Support 24/7 | ✅ Résolution conflits
                </div>
              </div>
            </div>
          </div>

          {/* Avis publics */}
          {userReviews.length > 0 && (
            <div className="bg-white rounded-2xl shadow-card border border-gray-100 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Avis clients ({userReviews.length})
              </h2>

              <div className="space-y-6">
                {userReviews.slice(0, 3).map((review) => (
                  <div key={review.id} className="border-b border-gray-200 pb-6 last:border-b-0">
                    <div className="flex items-start space-x-4">
                      <img
                        src={review.reviewer.avatar}
                        alt="Client"
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            {/* NOM CLIENT ANONYMISÉ */}
                            <h4 className="font-medium text-gray-900">
                              {review.reviewer.name.split(' ')[0]} {review.reviewer.name.split(' ')[1]?.[0]}.
                            </h4>
                            <RatingDisplay 
                              rating={review.rating} 
                              showCount={false} 
                              size="sm" 
                            />
                          </div>
                          <span className="text-sm text-gray-500">
                            {format(review.createdAt, 'dd MMM yyyy', { locale: fr })}
                          </span>
                        </div>
                        
                        {review.comment && (
                          <p className="text-gray-600 leading-relaxed">
                            {review.comment}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {userReviews.length > 3 && (
                <div className="mt-6 text-center">
                  <button className="text-primary-600 hover:text-primary-700 font-medium">
                    Voir tous les avis ({userReviews.length})
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal de contact sécurisé */}
        <ContactProtection
          isOpen={showContactModal}
          onClose={() => setShowContactModal(false)}
          recipientName={profileUser.name.split(' ')[0]}
          onStartChat={handleStartChat}
        />
      </div>
    </div>
  );
};

export default ProfilePage;