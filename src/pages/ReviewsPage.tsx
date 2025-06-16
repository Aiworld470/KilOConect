import React, { useState } from 'react';
import { Star, Filter, Search, ThumbsUp, Flag } from 'lucide-react';
import { RatingDisplay, RatingStars } from '../components/ui/RatingStars';
import { sampleReviews, users } from '../data/mockData';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

const ReviewsPage: React.FC = () => {
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState('recent');
  const [searchTerm, setSearchTerm] = useState('');

  // Filter and sort reviews
  const filteredReviews = sampleReviews
    .filter(review => {
      if (selectedRating && review.rating !== selectedRating) return false;
      if (searchTerm && !review.comment?.toLowerCase().includes(searchTerm.toLowerCase())) return false;
      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'recent':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'oldest':
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        case 'highest':
          return b.rating - a.rating;
        case 'lowest':
          return a.rating - b.rating;
        default:
          return 0;
      }
    });

  // Calculate rating distribution
  const ratingDistribution = [5, 4, 3, 2, 1].map(rating => ({
    rating,
    count: sampleReviews.filter(r => r.rating === rating).length,
    percentage: (sampleReviews.filter(r => r.rating === rating).length / sampleReviews.length) * 100,
  }));

  const averageRating = sampleReviews.reduce((sum, review) => sum + review.rating, 0) / sampleReviews.length;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Avis clients
          </h1>
          <p className="text-gray-600">
            Découvrez ce que nos utilisateurs pensent de KiloConnect
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Overall rating */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Note globale</h3>
              
              <div className="text-center mb-4">
                <div className="text-4xl font-bold text-gray-900 mb-2">
                  {averageRating.toFixed(1)}
                </div>
                <RatingDisplay rating={averageRating} showCount={false} size="lg" />
                <div className="text-sm text-gray-600 mt-1">
                  Basé sur {sampleReviews.length} avis
                </div>
              </div>

              {/* Rating distribution */}
              <div className="space-y-2">
                {ratingDistribution.map(({ rating, count, percentage }) => (
                  <div key={rating} className="flex items-center space-x-2 text-sm">
                    <span className="w-8 text-gray-600">{rating}★</span>
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-yellow-400 h-2 rounded-full"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <span className="w-8 text-gray-600 text-right">{count}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                <Filter className="h-4 w-4 mr-2" />
                Filtres
              </h3>

              {/* Rating filter */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Note
                </label>
                <div className="space-y-2">
                  <button
                    onClick={() => setSelectedRating(null)}
                    className={`
                      w-full text-left px-3 py-2 rounded-md text-sm transition-colors
                      ${selectedRating === null ? 'bg-primary-100 text-primary-700' : 'hover:bg-gray-50'}
                    `}
                  >
                    Toutes les notes
                  </button>
                  {[5, 4, 3, 2, 1].map(rating => (
                    <button
                      key={rating}
                      onClick={() => setSelectedRating(rating)}
                      className={`
                        w-full text-left px-3 py-2 rounded-md text-sm transition-colors flex items-center space-x-2
                        ${selectedRating === rating ? 'bg-primary-100 text-primary-700' : 'hover:bg-gray-50'}
                      `}
                    >
                      <RatingStars rating={rating} size="sm" />
                      <span>({ratingDistribution.find(r => r.rating === rating)?.count || 0})</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Clear filters */}
              {(selectedRating || searchTerm) && (
                <button
                  onClick={() => {
                    setSelectedRating(null);
                    setSearchTerm('');
                  }}
                  className="w-full text-sm text-primary-600 hover:text-primary-700 font-medium"
                >
                  Effacer les filtres
                </button>
              )}
            </div>
          </div>

          {/* Main content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Search and sort */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Rechercher dans les avis..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>
                </div>

                <div className="sm:w-48">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                  >
                    <option value="recent">Plus récents</option>
                    <option value="oldest">Plus anciens</option>
                    <option value="highest">Mieux notés</option>
                    <option value="lowest">Moins bien notés</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Reviews list */}
            <div className="space-y-6">
              {filteredReviews.length > 0 ? (
                filteredReviews.map((review) => (
                  <div key={review.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
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
                          
                          <div className="text-sm text-gray-500">
                            {format(review.createdAt, 'dd MMM yyyy', { locale: fr })}
                          </div>
                        </div>

                        {review.comment && (
                          <p className="text-gray-600 leading-relaxed mb-4">
                            {review.comment}
                          </p>
                        )}

                        {/* Review about */}
                        <div className="bg-gray-50 rounded-lg p-3 mb-4">
                          <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <span>Avis sur:</span>
                            <img
                              src={review.reviewee.avatar}
                              alt={review.reviewee.name}
                              className="w-6 h-6 rounded-full object-cover"
                            />
                            <span className="font-medium">{review.reviewee.name}</span>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center space-x-4 text-sm">
                          <button className="flex items-center space-x-1 text-gray-500 hover:text-primary-600 transition-colors">
                            <ThumbsUp className="h-4 w-4" />
                            <span>Utile (12)</span>
                          </button>
                          
                          <button className="flex items-center space-x-1 text-gray-500 hover:text-red-600 transition-colors">
                            <Flag className="h-4 w-4" />
                            <span>Signaler</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
                  <Star className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Aucun avis trouvé
                  </h3>
                  <p className="text-gray-600">
                    Essayez de modifier vos critères de recherche.
                  </p>
                </div>
              )}
            </div>

            {/* Load more */}
            {filteredReviews.length > 0 && filteredReviews.length >= 10 && (
              <div className="text-center">
                <button className="bg-white border border-gray-300 text-gray-700 px-6 py-3 rounded-md hover:bg-gray-50 transition-colors">
                  Charger plus d'avis
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewsPage;