import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Clock, Globe, Star, Users, Package, TrendingUp, CheckCircle } from 'lucide-react';
import { mockStats } from '../data/mockData';

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-hero py-20 lg:py-32">
        <div className="absolute inset-0 bg-black/5"></div>
        
        {/* Floating elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full animate-bounce-soft"></div>
        <div className="absolute bottom-20 right-10 w-16 h-16 bg-secondary-300/20 rounded-full animate-bounce-soft" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 right-20 w-12 h-12 bg-white/10 rounded-full animate-bounce-soft" style={{ animationDelay: '2s' }}></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-fade-in">
              <div className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white/90 text-sm font-medium mb-8">
                <Star className="h-4 w-4 mr-2 text-secondary-300" />
                Plus de {mockStats.totalUsers.toLocaleString()} utilisateurs nous font confiance
              </div>
              
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                Le <span className="text-secondary-300">BlaBlaCar</span><br />
                pour vos <span className="text-secondary-300">colis</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-white/90 mb-10 max-w-3xl mx-auto leading-relaxed">
                Connectez-vous avec la diaspora pour envoyer vos colis en toute sécurité. 
                Simple, économique et fiable.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link
                  to="/search"
                  className="group bg-white text-primary-600 px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-premium-lg transition-all duration-300 flex items-center space-x-2 transform hover:scale-105"
                >
                  <span>Rechercher un trajet</span>
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                
                <Link
                  to="/register"
                  className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white hover:text-primary-600 transition-all duration-300 backdrop-blur-sm"
                >
                  Devenir transporteur
                </Link>
              </div>
              
              <div className="mt-12 flex items-center justify-center space-x-8 text-white/80">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-accent-300" />
                  <span className="text-sm">100% sécurisé</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-accent-300" />
                  <span className="text-sm">Suivi temps réel</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-accent-300" />
                  <span className="text-sm">Support 24/7</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center animate-slide-up">
              <div className="text-3xl md:text-4xl font-bold text-primary-600 mb-2">
                {mockStats.totalUsers.toLocaleString()}+
              </div>
              <div className="text-gray-600 font-medium">Utilisateurs actifs</div>
            </div>
            
            <div className="text-center animate-slide-up" style={{ animationDelay: '0.1s' }}>
              <div className="text-3xl md:text-4xl font-bold text-primary-600 mb-2">
                {mockStats.totalDeliveries.toLocaleString()}+
              </div>
              <div className="text-gray-600 font-medium">Colis livrés</div>
            </div>
            
            <div className="text-center animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <div className="text-3xl md:text-4xl font-bold text-primary-600 mb-2">
                {mockStats.countries}
              </div>
              <div className="text-gray-600 font-medium">Pays couverts</div>
            </div>
            
            <div className="text-center animate-slide-up" style={{ animationDelay: '0.3s' }}>
              <div className="text-3xl md:text-4xl font-bold text-primary-600 mb-2">
                {mockStats.averageRating}⭐
              </div>
              <div className="text-gray-600 font-medium">Note moyenne</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Pourquoi choisir KiloConnect ?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Une solution révolutionnaire conçue spécialement pour la diaspora
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="group bg-white p-8 rounded-2xl shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1">
              <div className="w-14 h-14 bg-gradient-to-br from-primary-100 to-primary-200 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Shield className="h-7 w-7 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">100% Sécurisé</h3>
              <p className="text-gray-600 leading-relaxed">
                Transporteurs vérifiés, paiements sécurisés et assurance complète pour vos colis.
              </p>
            </div>

            <div className="group bg-white p-8 rounded-2xl shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1">
              <div className="w-14 h-14 bg-gradient-to-br from-accent-100 to-accent-200 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Clock className="h-7 w-7 text-accent-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Rapide & Fiable</h3>
              <p className="text-gray-600 leading-relaxed">
                Livraison express avec suivi temps réel. Vos colis arrivent rapidement à destination.
              </p>
            </div>

            <div className="group bg-white p-8 rounded-2xl shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1">
              <div className="w-14 h-14 bg-gradient-to-br from-secondary-100 to-secondary-200 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Globe className="h-7 w-7 text-secondary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Réseau Mondial</h3>
              <p className="text-gray-600 leading-relaxed">
                Connecté dans 25 pays avec la plus grande communauté diaspora au monde.
              </p>
            </div>

            <div className="group bg-white p-8 rounded-2xl shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1">
              <div className="w-14 h-14 bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Star className="h-7 w-7 text-yellow-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Service Premium</h3>
              <p className="text-gray-600 leading-relaxed">
                Interface premium, support 24/7 et expérience utilisateur exceptionnelle.
              </p>
            </div>

            <div className="group bg-white p-8 rounded-2xl shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1">
              <div className="w-14 h-14 bg-gradient-to-br from-primary-100 to-primary-200 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Users className="h-7 w-7 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Communauté Active</h3>
              <p className="text-gray-600 leading-relaxed">
                Rejoignez des milliers de membres de la diaspora qui se font confiance.
              </p>
            </div>

            <div className="group bg-white p-8 rounded-2xl shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1">
              <div className="w-14 h-14 bg-gradient-to-br from-accent-100 to-accent-200 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <TrendingUp className="h-7 w-7 text-accent-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Prix Intelligents</h3>
              <p className="text-gray-600 leading-relaxed">
                Algorithme de pricing intelligent pour les meilleurs tarifs du marché.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Comment ça marche ?
            </h2>
            <p className="text-xl text-gray-600">
              Envoyez vos colis en 3 étapes simples
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-hero rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-premium group-hover:scale-110 transition-transform">
                <span className="text-2xl font-bold text-white">1</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Recherchez</h3>
              <p className="text-gray-600 leading-relaxed">
                Trouvez un transporteur qui voyage sur votre trajet avec de la place disponible.
              </p>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-cta rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-premium group-hover:scale-110 transition-transform">
                <span className="text-2xl font-bold text-white">2</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Négociez</h3>
              <p className="text-gray-600 leading-relaxed">
                Discutez directement avec le transporteur et trouvez le meilleur accord.
              </p>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-success rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-premium group-hover:scale-110 transition-transform">
                <span className="text-2xl font-bold text-white">3</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Suivez</h3>
              <p className="text-gray-600 leading-relaxed">
                Payez en sécurité et suivez votre colis en temps réel jusqu'à la livraison.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-hero">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <div className="animate-fade-in">
            <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-8">
              <Package className="h-10 w-10 text-white" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Prêt à révolutionner vos envois ?
            </h2>
            <p className="text-xl text-white/90 mb-10 leading-relaxed">
              Rejoignez des milliers d'utilisateurs qui font déjà confiance à KiloConnect
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/search"
                className="group bg-white text-primary-600 px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-premium-lg transition-all duration-300 inline-flex items-center justify-center space-x-2 transform hover:scale-105"
              >
                <span>Commencer maintenant</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/register"
                className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white hover:text-primary-600 transition-all duration-300 backdrop-blur-sm"
              >
                Créer un compte gratuit
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;