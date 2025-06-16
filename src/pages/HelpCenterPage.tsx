import React, { useState } from 'react';
import { ArrowLeft, Search, MessageCircle, Phone, Mail, ChevronDown, ChevronRight, HelpCircle, Shield, CreditCard, Package } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const HelpCenterPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'Toutes les catégories', icon: HelpCircle },
    { id: 'getting-started', name: 'Premiers pas', icon: Package },
    { id: 'booking', name: 'Réservations', icon: Package },
    { id: 'payment', name: 'Paiements', icon: CreditCard },
    { id: 'safety', name: 'Sécurité', icon: Shield },
    { id: 'account', name: 'Compte', icon: MessageCircle },
  ];

  const faqs = [
    {
      id: '1',
      category: 'getting-started',
      question: 'Comment fonctionne KiloConnect ?',
      answer: 'KiloConnect connecte les voyageurs avec de l\'espace disponible dans leurs bagages aux personnes souhaitant envoyer des colis. C\'est comme BlaBlaCar mais pour vos colis ! Les transporteurs proposent leurs trajets avec l\'espace disponible, et les expéditeurs peuvent réserver cet espace pour leurs colis.'
    },
    {
      id: '2',
      category: 'getting-started',
      question: 'Comment devenir transporteur ?',
      answer: 'Pour devenir transporteur, créez un compte, vérifiez votre identité, puis proposez vos trajets en indiquant l\'espace disponible et vos tarifs. Vous pouvez commencer à gagner de l\'argent dès que votre premier trajet est publié !'
    },
    {
      id: '3',
      category: 'booking',
      question: 'Comment réserver un transport pour mon colis ?',
      answer: 'Recherchez un trajet correspondant à votre itinéraire, consultez le profil du transporteur, négociez si nécessaire via notre chat sécurisé, puis confirmez votre réservation avec le paiement sécurisé.'
    },
    {
      id: '4',
      category: 'booking',
      question: 'Puis-je annuler ma réservation ?',
      answer: 'Oui, vous pouvez annuler votre réservation jusqu\'à 24h avant le départ. Les frais d\'annulation dépendent du délai : gratuit jusqu\'à 48h avant, 50% des frais entre 24-48h, non remboursable moins de 24h avant.'
    },
    {
      id: '5',
      category: 'payment',
      question: 'Quels moyens de paiement acceptez-vous ?',
      answer: 'Nous acceptons les cartes bancaires (Visa, Mastercard, American Express), PayPal, et les virements bancaires. Tous les paiements sont sécurisés par notre partenaire Stripe.'
    },
    {
      id: '6',
      category: 'payment',
      question: 'Quand suis-je débité ?',
      answer: 'Vous êtes débité immédiatement lors de la confirmation de votre réservation. Le transporteur est payé après la confirmation de livraison du colis.'
    },
    {
      id: '7',
      category: 'safety',
      question: 'Comment vérifiez-vous les transporteurs ?',
      answer: 'Tous nos transporteurs passent par un processus de vérification incluant : vérification d\'identité, vérification du casier judiciaire, validation des documents de voyage, et système de notation par les utilisateurs.'
    },
    {
      id: '8',
      category: 'safety',
      question: 'Que faire si mon colis est endommagé ?',
      answer: 'Tous les colis sont assurés jusqu\'à leur valeur déclarée. En cas de dommage, contactez immédiatement notre support avec des photos. Nous traiterons votre réclamation dans les 48h.'
    },
    {
      id: '9',
      category: 'account',
      question: 'Comment modifier mes informations personnelles ?',
      answer: 'Rendez-vous dans Paramètres > Compte pour modifier vos informations. Certaines modifications (email, téléphone) nécessitent une vérification supplémentaire.'
    },
    {
      id: '10',
      category: 'account',
      question: 'Comment supprimer mon compte ?',
      answer: 'Vous pouvez supprimer votre compte dans Paramètres > Sécurité > Supprimer le compte. Cette action est irréversible et supprimera toutes vos données.'
    }
  ];

  const guides = [
    {
      title: 'Guide du transporteur débutant',
      description: 'Tout ce qu\'il faut savoir pour commencer à transporter des colis',
      duration: '5 min de lecture',
      category: 'getting-started'
    },
    {
      title: 'Comment bien emballer son colis',
      description: 'Conseils pour protéger vos objets pendant le transport',
      duration: '3 min de lecture',
      category: 'booking'
    },
    {
      title: 'Résoudre un conflit avec un transporteur',
      description: 'Procédure à suivre en cas de problème',
      duration: '4 min de lecture',
      category: 'safety'
    }
  ];

  const filteredFaqs = faqs.filter(faq => {
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    const matchesSearch = searchTerm === '' || 
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

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

          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Centre d'aide
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Trouvez rapidement les réponses à vos questions
            </p>

            {/* Search */}
            <div className="max-w-2xl mx-auto relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher dans l'aide..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-lg"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-card border border-gray-100 p-6 mb-6">
              <h3 className="font-semibold text-gray-800 mb-4">Catégories</h3>
              <div className="space-y-2">
                {categories.map((category) => {
                  const Icon = category.icon;
                  return (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`
                        w-full flex items-center space-x-3 px-3 py-2 rounded-xl text-left transition-colors
                        ${selectedCategory === category.id 
                          ? 'bg-primary-50 text-primary-700' 
                          : 'text-gray-600 hover:bg-gray-50'
                        }
                      `}
                    >
                      <Icon className="h-4 w-4" />
                      <span className="text-sm font-medium">{category.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Contact Support */}
            <div className="bg-white rounded-2xl shadow-card border border-gray-100 p-6">
              <h3 className="font-semibold text-gray-800 mb-4">Besoin d'aide ?</h3>
              <div className="space-y-3">
                <button className="w-full flex items-center space-x-3 px-3 py-2 text-left text-gray-600 hover:bg-gray-50 rounded-xl transition-colors">
                  <MessageCircle className="h-4 w-4" />
                  <span className="text-sm">Chat en direct</span>
                </button>
                <button className="w-full flex items-center space-x-3 px-3 py-2 text-left text-gray-600 hover:bg-gray-50 rounded-xl transition-colors">
                  <Mail className="h-4 w-4" />
                  <span className="text-sm">Envoyer un email</span>
                </button>
                <button className="w-full flex items-center space-x-3 px-3 py-2 text-left text-gray-600 hover:bg-gray-50 rounded-xl transition-colors">
                  <Phone className="h-4 w-4" />
                  <span className="text-sm">Nous appeler</span>
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Guides */}
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Guides populaires</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {guides.map((guide, index) => (
                  <div key={index} className="bg-white rounded-2xl shadow-card border border-gray-100 p-6 hover:shadow-premium transition-all duration-200 cursor-pointer">
                    <h3 className="font-semibold text-gray-800 mb-2">{guide.title}</h3>
                    <p className="text-gray-600 text-sm mb-3">{guide.description}</p>
                    <span className="text-xs text-primary-600 font-medium">{guide.duration}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQ */}
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Questions fréquentes
                {searchTerm && (
                  <span className="text-lg font-normal text-gray-600 ml-2">
                    ({filteredFaqs.length} résultat{filteredFaqs.length !== 1 ? 's' : ''})
                  </span>
                )}
              </h2>

              <div className="space-y-4">
                {filteredFaqs.map((faq) => (
                  <div key={faq.id} className="bg-white rounded-2xl shadow-card border border-gray-100">
                    <button
                      onClick={() => setExpandedFaq(expandedFaq === faq.id ? null : faq.id)}
                      className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors"
                    >
                      <h3 className="font-medium text-gray-800 pr-4">{faq.question}</h3>
                      {expandedFaq === faq.id ? (
                        <ChevronDown className="h-5 w-5 text-gray-400 flex-shrink-0" />
                      ) : (
                        <ChevronRight className="h-5 w-5 text-gray-400 flex-shrink-0" />
                      )}
                    </button>
                    
                    {expandedFaq === faq.id && (
                      <div className="px-6 pb-6">
                        <div className="border-t border-gray-100 pt-4">
                          <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {filteredFaqs.length === 0 && (
                <div className="text-center py-12">
                  <HelpCircle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-800 mb-2">
                    Aucun résultat trouvé
                  </h3>
                  <p className="text-gray-600">
                    Essayez de modifier votre recherche ou contactez notre support
                  </p>
                </div>
              )}
            </div>

            {/* Contact Section */}
            <div className="bg-gradient-hero rounded-2xl p-8 text-center text-white">
              <h2 className="text-2xl font-bold mb-4">
                Vous ne trouvez pas votre réponse ?
              </h2>
              <p className="text-white/90 mb-6">
                Notre équipe support est disponible 24/7 pour vous aider
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-white text-primary-600 px-6 py-3 rounded-xl font-medium hover:shadow-premium transition-all duration-200">
                  Contacter le support
                </button>
                <button className="border-2 border-white text-white px-6 py-3 rounded-xl font-medium hover:bg-white hover:text-primary-600 transition-all duration-200">
                  Signaler un problème
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpCenterPage;