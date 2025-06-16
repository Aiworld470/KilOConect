import React, { useState } from 'react';
import { ArrowLeft, Bell, Shield, Globe, CreditCard, User, Mail, Phone, Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { LoadingSpinner } from '../components/common/LoadingSpinner';

const SettingsPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('account');
  const [isLoading, setIsLoading] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const [accountData, setAccountData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    bio: user?.bio || '',
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailBookings: true,
    emailMessages: true,
    emailMarketing: false,
    pushBookings: true,
    pushMessages: true,
    smsImportant: true,
  });

  const [privacySettings, setPrivacySettings] = useState({
    profileVisible: true,
    showPhone: false,
    showEmail: false,
    allowMessages: true,
  });

  const [preferences, setPreferences] = useState({
    language: 'fr',
    currency: 'EUR',
    timezone: 'Europe/Paris',
    theme: 'light',
  });

  const handleAccountSave = async () => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      // API call to update account
      console.log('Account updated:', accountData);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordChange = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('Les mots de passe ne correspondent pas');
      return;
    }
    
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      // API call to change password
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
      console.log('Password changed');
    } finally {
      setIsLoading(false);
    }
  };

  const TabButton: React.FC<{ id: string; label: string; icon: React.ComponentType<any> }> = ({ id, label, icon: Icon }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`
        flex items-center space-x-3 w-full px-4 py-3 rounded-xl text-left transition-all duration-200
        ${activeTab === id 
          ? 'bg-primary-50 text-primary-700 border border-primary-200' 
          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800'
        }
      `}
    >
      <Icon className="h-5 w-5" />
      <span className="font-medium">{label}</span>
    </button>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
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
            Paramètres
          </h1>
          <p className="text-gray-600">
            Gérez vos préférences et paramètres de compte
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-card border border-gray-100 p-4 space-y-2">
              <TabButton id="account" label="Compte" icon={User} />
              <TabButton id="security" label="Sécurité" icon={Shield} />
              <TabButton id="notifications" label="Notifications" icon={Bell} />
              <TabButton id="privacy" label="Confidentialité" icon={Eye} />
              <TabButton id="preferences" label="Préférences" icon={Globe} />
              <TabButton id="payments" label="Paiements" icon={CreditCard} />
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-card border border-gray-100 p-6">
              {/* Account Settings */}
              {activeTab === 'account' && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-gray-800">Informations du compte</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nom complet
                      </label>
                      <input
                        type="text"
                        value={accountData.name}
                        onChange={(e) => setAccountData({...accountData, name: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        value={accountData.email}
                        onChange={(e) => setAccountData({...accountData, email: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Téléphone
                      </label>
                      <input
                        type="tel"
                        value={accountData.phone}
                        onChange={(e) => setAccountData({...accountData, phone: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Biographie
                    </label>
                    <textarea
                      rows={4}
                      value={accountData.bio}
                      onChange={(e) => setAccountData({...accountData, bio: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      placeholder="Parlez-nous de vous..."
                    />
                  </div>

                  <button
                    onClick={handleAccountSave}
                    disabled={isLoading}
                    className="bg-gradient-cta text-white px-6 py-3 rounded-xl hover:shadow-premium transition-all duration-200 font-medium disabled:opacity-50 flex items-center"
                  >
                    {isLoading ? <LoadingSpinner size="sm" /> : 'Sauvegarder'}
                  </button>
                </div>
              )}

              {/* Security Settings */}
              {activeTab === 'security' && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-gray-800">Sécurité</h2>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Mot de passe actuel
                      </label>
                      <div className="relative">
                        <input
                          type={showCurrentPassword ? 'text' : 'password'}
                          value={passwordData.currentPassword}
                          onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})}
                          className="w-full px-4 py-3 pr-12 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                        />
                        <button
                          type="button"
                          onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {showCurrentPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nouveau mot de passe
                      </label>
                      <div className="relative">
                        <input
                          type={showNewPassword ? 'text' : 'password'}
                          value={passwordData.newPassword}
                          onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                          className="w-full px-4 py-3 pr-12 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                        />
                        <button
                          type="button"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {showNewPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Confirmer le nouveau mot de passe
                      </label>
                      <input
                        type="password"
                        value={passwordData.confirmPassword}
                        onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      />
                    </div>
                  </div>

                  <button
                    onClick={handlePasswordChange}
                    disabled={isLoading}
                    className="bg-gradient-cta text-white px-6 py-3 rounded-xl hover:shadow-premium transition-all duration-200 font-medium disabled:opacity-50 flex items-center"
                  >
                    {isLoading ? <LoadingSpinner size="sm" /> : 'Changer le mot de passe'}
                  </button>

                  <div className="border-t border-gray-200 pt-6">
                    <h3 className="font-medium text-gray-800 mb-4">Authentification à deux facteurs</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Ajoutez une couche de sécurité supplémentaire à votre compte
                    </p>
                    <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-xl hover:bg-gray-50 transition-colors">
                      Configurer 2FA
                    </button>
                  </div>
                </div>
              )}

              {/* Notifications */}
              {activeTab === 'notifications' && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-gray-800">Notifications</h2>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-medium text-gray-800 mb-4">Notifications par email</h3>
                      <div className="space-y-3">
                        {Object.entries({
                          emailBookings: 'Nouvelles réservations',
                          emailMessages: 'Nouveaux messages',
                          emailMarketing: 'Offres et promotions'
                        }).map(([key, label]) => (
                          <label key={key} className="flex items-center justify-between">
                            <span className="text-sm text-gray-700">{label}</span>
                            <input
                              type="checkbox"
                              checked={notificationSettings[key as keyof typeof notificationSettings]}
                              onChange={(e) => setNotificationSettings({
                                ...notificationSettings,
                                [key]: e.target.checked
                              })}
                              className="w-4 h-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                            />
                          </label>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="font-medium text-gray-800 mb-4">Notifications push</h3>
                      <div className="space-y-3">
                        {Object.entries({
                          pushBookings: 'Nouvelles réservations',
                          pushMessages: 'Nouveaux messages'
                        }).map(([key, label]) => (
                          <label key={key} className="flex items-center justify-between">
                            <span className="text-sm text-gray-700">{label}</span>
                            <input
                              type="checkbox"
                              checked={notificationSettings[key as keyof typeof notificationSettings]}
                              onChange={(e) => setNotificationSettings({
                                ...notificationSettings,
                                [key]: e.target.checked
                              })}
                              className="w-4 h-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                            />
                          </label>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="font-medium text-gray-800 mb-4">SMS</h3>
                      <label className="flex items-center justify-between">
                        <span className="text-sm text-gray-700">Notifications importantes uniquement</span>
                        <input
                          type="checkbox"
                          checked={notificationSettings.smsImportant}
                          onChange={(e) => setNotificationSettings({
                            ...notificationSettings,
                            smsImportant: e.target.checked
                          })}
                          className="w-4 h-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                        />
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {/* Privacy */}
              {activeTab === 'privacy' && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-gray-800">Confidentialité</h2>
                  
                  <div className="space-y-4">
                    {Object.entries({
                      profileVisible: 'Profil visible publiquement',
                      showPhone: 'Afficher mon numéro de téléphone',
                      showEmail: 'Afficher mon email',
                      allowMessages: 'Autoriser les messages privés'
                    }).map(([key, label]) => (
                      <label key={key} className="flex items-center justify-between">
                        <span className="text-sm text-gray-700">{label}</span>
                        <input
                          type="checkbox"
                          checked={privacySettings[key as keyof typeof privacySettings]}
                          onChange={(e) => setPrivacySettings({
                            ...privacySettings,
                            [key]: e.target.checked
                          })}
                          className="w-4 h-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                        />
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Preferences */}
              {activeTab === 'preferences' && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-gray-800">Préférences</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Langue
                      </label>
                      <select
                        value={preferences.language}
                        onChange={(e) => setPreferences({...preferences, language: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      >
                        <option value="fr">Français</option>
                        <option value="en">English</option>
                        <option value="es">Español</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Devise
                      </label>
                      <select
                        value={preferences.currency}
                        onChange={(e) => setPreferences({...preferences, currency: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      >
                        <option value="EUR">Euro (€)</option>
                        <option value="USD">Dollar ($)</option>
                        <option value="GBP">Livre (£)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Fuseau horaire
                      </label>
                      <select
                        value={preferences.timezone}
                        onChange={(e) => setPreferences({...preferences, timezone: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      >
                        <option value="Europe/Paris">Paris (GMT+1)</option>
                        <option value="Europe/London">Londres (GMT+0)</option>
                        <option value="Africa/Dakar">Dakar (GMT+0)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Thème
                      </label>
                      <select
                        value={preferences.theme}
                        onChange={(e) => setPreferences({...preferences, theme: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      >
                        <option value="light">Clair</option>
                        <option value="dark">Sombre</option>
                        <option value="auto">Automatique</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* Payments */}
              {activeTab === 'payments' && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-gray-800">Méthodes de paiement</h2>
                  
                  <div className="space-y-4">
                    <div className="border border-gray-200 rounded-xl p-4 flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-6 bg-blue-600 rounded flex items-center justify-center">
                          <span className="text-white text-xs font-bold">VISA</span>
                        </div>
                        <div>
                          <p className="font-medium text-gray-800">•••• •••• •••• 4242</p>
                          <p className="text-sm text-gray-500">Expire 12/25</p>
                        </div>
                      </div>
                      <button className="text-red-600 hover:text-red-700 text-sm font-medium">
                        Supprimer
                      </button>
                    </div>

                    <button className="w-full border-2 border-dashed border-gray-300 rounded-xl p-4 text-gray-600 hover:border-primary-400 hover:text-primary-600 transition-colors">
                      + Ajouter une méthode de paiement
                    </button>
                  </div>

                  <div className="border-t border-gray-200 pt-6">
                    <h3 className="font-medium text-gray-800 mb-4">Informations de facturation</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="Nom sur la facture"
                        className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      />
                      <input
                        type="text"
                        placeholder="Adresse"
                        className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;