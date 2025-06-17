import React, { useState } from 'react';
import { ArrowLeft, Shield, Eye, FileText, Scale } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const LegalPages: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('terms');

  const TabButton: React.FC<{ id: string; label: string; icon: React.ComponentType<any> }> = ({ id, label, icon: Icon }) => (
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
    </button>
  );

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
            Informations légales
          </h1>
          <p className="text-gray-600">
            Conditions d'utilisation et politique de confidentialité
          </p>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-card border border-gray-100 mb-8">
          <div className="p-6 border-b border-gray-100">
            <div className="flex flex-wrap gap-2">
              <TabButton id="terms" label="Conditions d'utilisation" icon={FileText} />
              <TabButton id="privacy" label="Politique de confidentialité" icon={Shield} />
              <TabButton id="cookies" label="Politique des cookies" icon={Eye} />
              <TabButton id="legal" label="Mentions légales" icon={Scale} />
            </div>
          </div>

          <div className="p-6">
            {/* Conditions d'utilisation */}
            {activeTab === 'terms' && (
              <div className="prose max-w-none">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Conditions Générales d'Utilisation</h2>
                
                <div className="space-y-6">
                  <section>
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">1. Objet</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Les présentes conditions générales d'utilisation (CGU) régissent l'utilisation de la plateforme KiloConnect, 
                      service de mise en relation entre voyageurs disposant d'espace de transport et expéditeurs de colis.
                    </p>
                  </section>

                  <section>
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">2. Définitions</h3>
                    <ul className="text-gray-600 space-y-2">
                      <li><strong>Plateforme :</strong> Le site web et l'application mobile KiloConnect</li>
                      <li><strong>Transporteur :</strong> Utilisateur proposant un espace de transport</li>
                      <li><strong>Expéditeur :</strong> Utilisateur souhaitant envoyer un colis</li>
                      <li><strong>Trajet :</strong> Voyage proposé par un transporteur</li>
                      <li><strong>Réservation :</strong> Demande de transport d'un colis</li>
                    </ul>
                  </section>

                  <section>
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">3. Inscription et Compte Utilisateur</h3>
                    <div className="text-gray-600 space-y-3">
                      <p>
                        L'inscription sur KiloConnect est gratuite et ouverte à toute personne physique majeure 
                        ou personne morale ayant la capacité juridique.
                      </p>
                      <p>
                        L'utilisateur s'engage à fournir des informations exactes et à les maintenir à jour. 
                        KiloConnect se réserve le droit de suspendre ou supprimer tout compte en cas d'informations 
                        inexactes ou de non-respect des présentes CGU.
                      </p>
                    </div>
                  </section>

                  <section>
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">4. Services Proposés</h3>
                    <div className="text-gray-600 space-y-3">
                      <p>KiloConnect propose :</p>
                      <ul className="list-disc list-inside space-y-1 ml-4">
                        <li>Mise en relation entre transporteurs et expéditeurs</li>
                        <li>Système de réservation et paiement sécurisé</li>
                        <li>Suivi des colis en temps réel</li>
                        <li>Système d'évaluation et de commentaires</li>
                        <li>Support client et résolution de conflits</li>
                      </ul>
                    </div>
                  </section>

                  <section>
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">5. Obligations des Utilisateurs</h3>
                    <div className="text-gray-600 space-y-3">
                      <h4 className="font-medium text-gray-800">Transporteurs :</h4>
                      <ul className="list-disc list-inside space-y-1 ml-4">
                        <li>Respecter les dates et horaires annoncés</li>
                        <li>Prendre soin des colis transportés</li>
                        <li>Communiquer uniquement via la plateforme</li>
                        <li>Respecter les réglementations douanières</li>
                      </ul>
                      
                      <h4 className="font-medium text-gray-800 mt-4">Expéditeurs :</h4>
                      <ul className="list-disc list-inside space-y-1 ml-4">
                        <li>Déclarer fidèlement le contenu des colis</li>
                        <li>Respecter les interdictions de transport</li>
                        <li>Emballer correctement les colis</li>
                        <li>Effectuer le paiement dans les délais</li>
                      </ul>
                    </div>
                  </section>

                  <section>
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">6. Tarification et Paiement</h3>
                    <div className="text-gray-600 space-y-3">
                      <p>
                        Les prix sont fixés librement par les transporteurs selon les suggestions de la plateforme. 
                        KiloConnect prélève une commission de service sur chaque transaction.
                      </p>
                      <p>
                        Le paiement s'effectue en ligne via des moyens sécurisés. Le transporteur est rémunéré 
                        après confirmation de la livraison.
                      </p>
                    </div>
                  </section>

                  <section>
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">7. Responsabilité</h3>
                    <div className="text-gray-600 space-y-3">
                      <p>
                        KiloConnect agit en qualité d'intermédiaire et ne peut être tenue responsable des dommages 
                        causés aux colis pendant le transport. Une assurance est proposée pour couvrir les risques.
                      </p>
                      <p>
                        Les utilisateurs sont responsables du respect des réglementations en vigueur, 
                        notamment douanières et de sécurité.
                      </p>
                    </div>
                  </section>

                  <section>
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">8. Résiliation</h3>
                    <p className="text-gray-600 leading-relaxed">
                      L'utilisateur peut supprimer son compte à tout moment. KiloConnect se réserve le droit 
                      de suspendre ou supprimer un compte en cas de non-respect des présentes CGU.
                    </p>
                  </section>

                  <section>
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">9. Droit Applicable</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Les présentes CGU sont soumises au droit français. Tout litige sera soumis aux 
                      tribunaux compétents de Paris.
                    </p>
                  </section>
                </div>

                <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-xl">
                  <p className="text-sm text-blue-800">
                    <strong>Dernière mise à jour :</strong> {new Date().toLocaleDateString('fr-FR')}
                  </p>
                </div>
              </div>
            )}

            {/* Politique de confidentialité */}
            {activeTab === 'privacy' && (
              <div className="prose max-w-none">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Politique de Confidentialité</h2>
                
                <div className="space-y-6">
                  <section>
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">1. Collecte des Données</h3>
                    <div className="text-gray-600 space-y-3">
                      <p>KiloConnect collecte les données suivantes :</p>
                      <ul className="list-disc list-inside space-y-1 ml-4">
                        <li><strong>Données d'identification :</strong> nom, prénom, email, téléphone</li>
                        <li><strong>Données de profil :</strong> photo, biographie, préférences</li>
                        <li><strong>Données de transaction :</strong> historique des réservations et paiements</li>
                        <li><strong>Données de navigation :</strong> cookies, logs de connexion</li>
                      </ul>
                    </div>
                  </section>

                  <section>
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">2. Utilisation des Données</h3>
                    <div className="text-gray-600 space-y-3">
                      <p>Vos données sont utilisées pour :</p>
                      <ul className="list-disc list-inside space-y-1 ml-4">
                        <li>Fournir et améliorer nos services</li>
                        <li>Faciliter les mises en relation</li>
                        <li>Traiter les paiements et réservations</li>
                        <li>Assurer la sécurité de la plateforme</li>
                        <li>Vous envoyer des communications importantes</li>
                      </ul>
                    </div>
                  </section>

                  <section>
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">3. Protection des Données</h3>
                    <div className="text-gray-600 space-y-3">
                      <p>
                        <strong>Principe de minimisation :</strong> Seules les données nécessaires au service sont collectées.
                      </p>
                      <p>
                        <strong>Anonymisation :</strong> Vos coordonnées personnelles ne sont jamais visibles publiquement.
                      </p>
                      <p>
                        <strong>Chiffrement :</strong> Toutes les données sensibles sont chiffrées en base.
                      </p>
                      <p>
                        <strong>Accès restreint :</strong> Seul le personnel autorisé peut accéder aux données.
                      </p>
                    </div>
                  </section>

                  <section>
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">4. Partage des Données</h3>
                    <div className="text-gray-600 space-y-3">
                      <p>KiloConnect ne partage vos données qu'avec :</p>
                      <ul className="list-disc list-inside space-y-1 ml-4">
                        <li>Les autres utilisateurs (informations publiques uniquement)</li>
                        <li>Nos prestataires de paiement (données nécessaires aux transactions)</li>
                        <li>Les autorités légales (sur demande judiciaire)</li>
                      </ul>
                      <p className="font-medium text-gray-800">
                        Nous ne vendons jamais vos données à des tiers.
                      </p>
                    </div>
                  </section>

                  <section>
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">5. Vos Droits RGPD</h3>
                    <div className="text-gray-600 space-y-3">
                      <p>Conformément au RGPD, vous disposez des droits suivants :</p>
                      <ul className="list-disc list-inside space-y-1 ml-4">
                        <li><strong>Droit d'accès :</strong> consulter vos données personnelles</li>
                        <li><strong>Droit de rectification :</strong> corriger vos données</li>
                        <li><strong>Droit à l'effacement :</strong> supprimer vos données</li>
                        <li><strong>Droit à la portabilité :</strong> récupérer vos données</li>
                        <li><strong>Droit d'opposition :</strong> refuser certains traitements</li>
                      </ul>
                      <p>
                        Pour exercer ces droits, contactez-nous à : <strong>privacy@kiloconnect.com</strong>
                      </p>
                    </div>
                  </section>

                  <section>
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">6. Conservation des Données</h3>
                    <div className="text-gray-600 space-y-3">
                      <p>Nous conservons vos données :</p>
                      <ul className="list-disc list-inside space-y-1 ml-4">
                        <li><strong>Compte actif :</strong> pendant toute la durée d'utilisation</li>
                        <li><strong>Après suppression :</strong> 3 ans pour les obligations légales</li>
                        <li><strong>Données de transaction :</strong> 10 ans pour la comptabilité</li>
                      </ul>
                    </div>
                  </section>
                </div>

                <div className="mt-8 p-4 bg-green-50 border border-green-200 rounded-xl">
                  <p className="text-sm text-green-800">
                    <strong>Contact DPO :</strong> dpo@kiloconnect.com<br/>
                    <strong>Dernière mise à jour :</strong> {new Date().toLocaleDateString('fr-FR')}
                  </p>
                </div>
              </div>
            )}

            {/* Politique des cookies */}
            {activeTab === 'cookies' && (
              <div className="prose max-w-none">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Politique des Cookies</h2>
                
                <div className="space-y-6">
                  <section>
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">Qu'est-ce qu'un cookie ?</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Un cookie est un petit fichier texte stocké sur votre appareil lors de votre visite sur notre site. 
                      Il nous permet de reconnaître votre navigateur et d'améliorer votre expérience.
                    </p>
                  </section>

                  <section>
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">Types de cookies utilisés</h3>
                    <div className="space-y-4">
                      <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl">
                        <h4 className="font-medium text-blue-900 mb-2">🔧 Cookies Techniques (Obligatoires)</h4>
                        <p className="text-blue-800 text-sm">
                          Nécessaires au fonctionnement du site : authentification, panier, préférences de langue.
                        </p>
                      </div>

                      <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
                        <h4 className="font-medium text-yellow-900 mb-2">📊 Cookies Analytiques</h4>
                        <p className="text-yellow-800 text-sm">
                          Nous aident à comprendre l'utilisation du site : Google Analytics, Hotjar.
                        </p>
                      </div>

                      <div className="p-4 bg-purple-50 border border-purple-200 rounded-xl">
                        <h4 className="font-medium text-purple-900 mb-2">🎯 Cookies Marketing</h4>
                        <p className="text-purple-800 text-sm">
                          Personnalisent la publicité : Facebook Pixel, Google Ads.
                        </p>
                      </div>
                    </div>
                  </section>

                  <section>
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">Gestion des cookies</h3>
                    <div className="text-gray-600 space-y-3">
                      <p>Vous pouvez contrôler les cookies via :</p>
                      <ul className="list-disc list-inside space-y-1 ml-4">
                        <li>Notre bandeau de consentement lors de votre première visite</li>
                        <li>Les paramètres de votre navigateur</li>
                        <li>Les liens de désinscription dans nos emails</li>
                      </ul>
                    </div>
                  </section>
                </div>
              </div>
            )}

            {/* Mentions légales */}
            {activeTab === 'legal' && (
              <div className="prose max-w-none">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Mentions Légales</h2>
                
                <div className="space-y-6">
                  <section>
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">Éditeur du Site</h3>
                    <div className="text-gray-600 space-y-2">
                      <p><strong>Raison sociale :</strong> KiloConnect SAS</p>
                      <p><strong>Capital social :</strong> 10 000 €</p>
                      <p><strong>RCS :</strong> Paris B 123 456 789</p>
                      <p><strong>SIRET :</strong> 123 456 789 00012</p>
                      <p><strong>TVA :</strong> FR12 123456789</p>
                      <p><strong>Adresse :</strong> 123 Avenue des Champs-Élysées, 75008 Paris</p>
                      <p><strong>Téléphone :</strong> +33 1 23 45 67 89</p>
                      <p><strong>Email :</strong> contact@kiloconnect.com</p>
                    </div>
                  </section>

                  <section>
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">Directeur de Publication</h3>
                    <p className="text-gray-600">
                      [Nom du Directeur], en qualité de représentant légal de KiloConnect SAS.
                    </p>
                  </section>

                  <section>
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">Hébergement</h3>
                    <div className="text-gray-600 space-y-2">
                      <p><strong>Hébergeur :</strong> Netlify, Inc.</p>
                      <p><strong>Adresse :</strong> 2325 3rd Street, Suite 296, San Francisco, CA 94107</p>
                      <p><strong>Site web :</strong> https://www.netlify.com</p>
                    </div>
                  </section>

                  <section>
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">Propriété Intellectuelle</h3>
                    <p className="text-gray-600 leading-relaxed">
                      L'ensemble du contenu de ce site (textes, images, logos, etc.) est protégé par le droit d'auteur. 
                      Toute reproduction sans autorisation est interdite.
                    </p>
                  </section>

                  <section>
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">Limitation de Responsabilité</h3>
                    <p className="text-gray-600 leading-relaxed">
                      KiloConnect ne peut être tenue responsable des dommages directs ou indirects résultant 
                      de l'utilisation du site ou de l'impossibilité d'y accéder.
                    </p>
                  </section>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LegalPages;