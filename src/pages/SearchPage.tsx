import React, { useState, useEffect } from 'react';
import { SearchFilters } from '../components/ui/SearchFilters';
import { TripCard } from '../components/ui/TripCard';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { SearchFilters as ISearchFilters, Trip } from '../types';
import { trips } from '../data/mockData';

const SearchPage: React.FC = () => {
  const [filters, setFilters] = useState<ISearchFilters>({});
  const [filteredTrips, setFilteredTrips] = useState<Trip[]>(trips);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async () => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    let filtered = [...trips];

    // Apply filters
    if (filters.origin) {
      filtered = filtered.filter(trip => 
        trip.origin.city.toLowerCase().includes(filters.origin!.toLowerCase())
      );
    }

    if (filters.destination) {
      filtered = filtered.filter(trip => 
        trip.destination.city.toLowerCase().includes(filters.destination!.toLowerCase())
      );
    }

    if (filters.departureDate) {
      const filterDate = new Date(filters.departureDate);
      filtered = filtered.filter(trip => {
        const tripDate = new Date(trip.departureDate);
        return tripDate.toDateString() === filterDate.toDateString();
      });
    }

    if (filters.maxPricePerKg) {
      filtered = filtered.filter(trip => trip.pricePerKg <= filters.maxPricePerKg!);
    }

    if (filters.minAvailableWeight) {
      filtered = filtered.filter(trip => trip.availableWeight >= filters.minAvailableWeight!);
    }

    if (filters.verifiedOnly) {
      filtered = filtered.filter(trip => trip.transporter.verifiedAt);
    }

    setFilteredTrips(filtered);
    setIsLoading(false);
  };

  useEffect(() => {
    handleSearch();
  }, []);

  const getSortOptions = () => [
    { value: 'price-asc', label: 'Prix croissant' },
    { value: 'price-desc', label: 'Prix décroissant' },
    { value: 'date-asc', label: 'Date croissante' },
    { value: 'rating-desc', label: 'Mieux notés' },
    { value: 'weight-desc', label: 'Plus de place' },
  ];

  const [sortBy, setSortBy] = useState('date-asc');

  const sortTrips = (trips: Trip[], sortOption: string): Trip[] => {
    const sorted = [...trips];
    
    switch (sortOption) {
      case 'price-asc':
        return sorted.sort((a, b) => a.pricePerKg - b.pricePerKg);
      case 'price-desc':
        return sorted.sort((a, b) => b.pricePerKg - a.pricePerKg);
      case 'date-asc':
        return sorted.sort((a, b) => new Date(a.departureDate).getTime() - new Date(b.departureDate).getTime());
      case 'rating-desc':
        return sorted.sort((a, b) => b.transporter.rating - a.transporter.rating);
      case 'weight-desc':
        return sorted.sort((a, b) => b.availableWeight - a.availableWeight);
      default:
        return sorted;
    }
  };

  const sortedTrips = sortTrips(filteredTrips, sortBy);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Rechercher un trajet
          </h1>
          <p className="text-gray-600">
            Trouvez le transporteur parfait pour vos colis
          </p>
        </div>

        {/* Search Filters */}
        <SearchFilters
          filters={filters}
          onFiltersChange={setFilters}
          onSearch={handleSearch}
          className="mb-8"
        />

        {/* Results Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <div>
            {isLoading ? (
              <div className="flex items-center space-x-2">
                <LoadingSpinner size="sm" />
                <span className="text-gray-600">Recherche en cours...</span>
              </div>
            ) : (
              <p className="text-gray-600">
                <span className="font-semibold">{sortedTrips.length}</span> trajet{sortedTrips.length !== 1 ? 's' : ''} trouvé{sortedTrips.length !== 1 ? 's' : ''}
              </p>
            )}
          </div>

          {!isLoading && sortedTrips.length > 0 && (
            <div className="flex items-center space-x-2 mt-4 sm:mt-0">
              <label htmlFor="sort" className="text-sm font-medium text-gray-700">
                Trier par:
              </label>
              <select
                id="sort"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:ring-primary-500 focus:border-primary-500"
              >
                {getSortOptions().map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        {/* Results */}
        {isLoading ? (
          <div className="flex justify-center py-12">
            <LoadingSpinner size="lg" />
          </div>
        ) : sortedTrips.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {sortedTrips.map((trip) => (
              <TripCard key={trip.id} trip={trip} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Aucun trajet trouvé
            </h3>
            <p className="text-gray-600 mb-6">
              Essayez de modifier vos critères de recherche ou créez une alerte pour être notifié.
            </p>
            <button
              onClick={() => setFilters({})}
              className="bg-primary-600 text-white px-6 py-2 rounded-md hover:bg-primary-700 transition-colors"
            >
              Effacer les filtres
            </button>
          </div>
        )}

        {/* Load more button (for pagination) */}
        {!isLoading && sortedTrips.length > 0 && sortedTrips.length >= 10 && (
          <div className="text-center mt-12">
            <button className="bg-white border border-gray-300 text-gray-700 px-6 py-3 rounded-md hover:bg-gray-50 transition-colors">
              Charger plus de résultats
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;