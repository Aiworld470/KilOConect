import React, { useState } from 'react';
import { Search, MapPin, Calendar, Euro, Weight, Filter, X } from 'lucide-react';
import { SearchFilters as ISearchFilters } from '../../types';
import { DestinationAutocomplete } from './DestinationAutocomplete';
import { POPULAR_ORIGINS, POPULAR_DESTINATIONS, POPULAR_ROUTES } from '../../data/destinations';

interface SearchFiltersProps {
  filters: ISearchFilters;
  onFiltersChange: (filters: ISearchFilters) => void;
  onSearch: () => void;
  className?: string;
}

export const SearchFilters: React.FC<SearchFiltersProps> = ({
  filters,
  onFiltersChange,
  onSearch,
  className = '',
}) => {
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleInputChange = (field: keyof ISearchFilters, value: any) => {
    onFiltersChange({
      ...filters,
      [field]: value === '' ? undefined : value,
    });
  };

  const clearFilters = () => {
    onFiltersChange({});
  };

  const hasActiveFilters = Object.values(filters).some(value => value !== undefined);

  return (
    <div className={`bg-white rounded-2xl shadow-premium border border-gray-100 p-6 ${className}`}>
      {/* Main search row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {/* Origin - Input libre avec suggestions */}
        <DestinationAutocomplete
          label="Départ"
          placeholder="Ex: Paris, Londres, Bruxelles..."
          value={filters.origin || ''}
          onChange={(value) => handleInputChange('origin', value)}
          suggestions={POPULAR_ORIGINS}
        />

        {/* Destination - Input libre avec suggestions */}
        <DestinationAutocomplete
          label="Destination"
          placeholder="Ex: Dakar, Lagos, Abidjan..."
          value={filters.destination || ''}
          onChange={(value) => handleInputChange('destination', value)}
          suggestions={POPULAR_DESTINATIONS}
        />

        {/* Date */}
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Date de départ
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="date"
              value={filters.departureDate ? filters.departureDate.toISOString().split('T')[0] : ''}
              onChange={(e) => handleInputChange('departureDate', e.target.value ? new Date(e.target.value) : undefined)}
              className="w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
            />
          </div>
        </div>

        {/* Search button */}
        <div className="flex flex-col justify-end">
          <button
            onClick={onSearch}
            className="w-full bg-gradient-cta text-white px-6 py-3 rounded-xl hover:shadow-premium transition-all duration-200 flex items-center justify-center space-x-2 font-medium"
          >
            <Search className="h-4 w-4" />
            <span>Rechercher</span>
          </button>
        </div>
      </div>

      {/* Popular routes suggestions */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-gray-700 mb-3">💡 Destinations populaires :</h4>
        <div className="flex flex-wrap gap-2">
          {POPULAR_ROUTES.slice(0, 6).map((route, index) => (
            <button
              key={index}
              onClick={() => {
                handleInputChange('origin', route.from);
                handleInputChange('destination', route.to);
              }}
              className="inline-flex items-center space-x-2 px-3 py-1.5 bg-gray-100 hover:bg-primary-50 hover:text-primary-700 rounded-full text-xs font-medium transition-colors"
            >
              <span>{route.from} → {route.to}</span>
              <span className="text-primary-600">{route.badge}</span>
            </button>
          ))}
        </div>
        
        <p className="text-xs text-gray-500 mt-2">
          🌍 KiloConnect dessert TOUTE l'Afrique et la diaspora mondiale ! Tapez n'importe quelle destination.
        </p>
      </div>

      {/* Advanced filters toggle */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="flex items-center space-x-2 text-primary-600 hover:text-primary-700 text-sm font-medium transition-colors"
        >
          <Filter className="h-4 w-4" />
          <span>Filtres avancés</span>
        </button>

        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="flex items-center space-x-1 text-gray-500 hover:text-gray-700 text-sm transition-colors"
          >
            <X className="h-4 w-4" />
            <span>Effacer les filtres</span>
          </button>
        )}
      </div>

      {/* Advanced filters */}
      {showAdvanced && (
        <div className="mt-6 pt-6 border-t border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Max price */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Prix maximum (€/kg)
              </label>
              <div className="relative">
                <Euro className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="number"
                  placeholder="50"
                  value={filters.maxPricePerKg || ''}
                  onChange={(e) => handleInputChange('maxPricePerKg', e.target.value ? Number(e.target.value) : undefined)}
                  className="w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                />
              </div>
            </div>

            {/* Min weight */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Poids minimum disponible (kg)
              </label>
              <div className="relative">
                <Weight className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="number"
                  placeholder="5"
                  value={filters.minAvailableWeight || ''}
                  onChange={(e) => handleInputChange('minAvailableWeight', e.target.value ? Number(e.target.value) : undefined)}
                  className="w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                />
              </div>
            </div>

            {/* Verified only */}
            <div className="flex items-end">
              <label className="flex items-center space-x-3 text-sm cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.verifiedOnly || false}
                  onChange={(e) => handleInputChange('verifiedOnly', e.target.checked)}
                  className="w-4 h-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 focus:ring-2"
                />
                <span className="text-gray-700 font-medium">Transporteurs vérifiés uniquement</span>
              </label>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};