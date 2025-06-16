// Base de données complète des destinations mondiales pour KiloConnect
// Expansion sans limites pour domination du marché diaspora

export const POPULAR_ORIGINS = [
  // Europe - Diaspora principale
  'Paris, France',
  'Londres, Royaume-Uni',
  'Bruxelles, Belgique',
  'Milan, Italie',
  'Madrid, Espagne',
  'Berlin, Allemagne',
  'Amsterdam, Pays-Bas',
  'Rome, Italie',
  'Barcelone, Espagne',
  'Lisbonne, Portugal',
  'Zurich, Suisse',
  'Genève, Suisse',
  'Vienne, Autriche',
  'Stockholm, Suède',
  'Oslo, Norvège',
  'Copenhague, Danemark',
  'Helsinki, Finlande',
  'Dublin, Irlande',
  'Luxembourg, Luxembourg',
  'Marseille, France',
  'Lyon, France',
  'Nice, France',
  'Toulouse, France',
  'Strasbourg, France',
  
  // Amérique du Nord - Diaspora internationale
  'New York, États-Unis',
  'Los Angeles, États-Unis',
  'Chicago, États-Unis',
  'Miami, États-Unis',
  'Washington DC, États-Unis',
  'Atlanta, États-Unis',
  'Houston, États-Unis',
  'Toronto, Canada',
  'Montréal, Canada',
  'Vancouver, Canada',
  'Ottawa, Canada',
  
  // Autres continents
  'Sydney, Australie',
  'Melbourne, Australie',
  'Perth, Australie',
  'Dubai, Émirats Arabes Unis',
  'Doha, Qatar',
  'Istanbul, Turquie',
  'Moscou, Russie',
  'Tokyo, Japon',
  'Singapour, Singapour',
];

export const POPULAR_DESTINATIONS = [
  // Afrique de l'Ouest - Marché principal
  'Dakar, Sénégal',
  'Lagos, Nigeria',
  'Abidjan, Côte d\'Ivoire',
  'Accra, Ghana',
  'Bamako, Mali',
  'Ouagadougou, Burkina Faso',
  'Lomé, Togo',
  'Cotonou, Bénin',
  'Conakry, Guinée',
  'Freetown, Sierra Leone',
  'Monrovia, Liberia',
  'Bissau, Guinée-Bissau',
  'Banjul, Gambie',
  'Praia, Cap-Vert',
  'Niamey, Niger',
  'N\'Djamena, Tchad',
  
  // Afrique du Nord
  'Casablanca, Maroc',
  'Rabat, Maroc',
  'Marrakech, Maroc',
  'Tunis, Tunisie',
  'Alger, Algérie',
  'Oran, Algérie',
  'Le Caire, Égypte',
  'Alexandrie, Égypte',
  'Tripoli, Libye',
  'Khartoum, Soudan',
  
  // Afrique Centrale
  'Kinshasa, RD Congo',
  'Brazzaville, Congo',
  'Libreville, Gabon',
  'Yaoundé, Cameroun',
  'Douala, Cameroun',
  'Bangui, République Centrafricaine',
  'Malabo, Guinée Équatoriale',
  'São Tomé, São Tomé-et-Principe',
  
  // Afrique de l'Est
  'Nairobi, Kenya',
  'Kampala, Ouganda',
  'Dar es Salaam, Tanzanie',
  'Kigali, Rwanda',
  'Bujumbura, Burundi',
  'Addis-Abeba, Éthiopie',
  'Asmara, Érythrée',
  'Djibouti, Djibouti',
  'Mogadiscio, Somalie',
  'Antananarivo, Madagascar',
  'Port-Louis, Maurice',
  'Victoria, Seychelles',
  'Moroni, Comores',
  
  // Afrique Australe
  'Johannesburg, Afrique du Sud',
  'Le Cap, Afrique du Sud',
  'Durban, Afrique du Sud',
  'Pretoria, Afrique du Sud',
  'Luanda, Angola',
  'Maputo, Mozambique',
  'Harare, Zimbabwe',
  'Gaborone, Botswana',
  'Windhoek, Namibie',
  'Maseru, Lesotho',
  'Mbabane, Eswatini',
  'Lusaka, Zambie',
  'Lilongwe, Malawi',
  
  // Diaspora retour - Destinations secondaires
  'Paris, France',
  'Londres, Royaume-Uni',
  'New York, États-Unis',
  'Toronto, Canada',
  'Sydney, Australie',
];

export const POPULAR_ROUTES = [
  { from: "Paris", to: "Dakar", badge: "🔥 Populaire", frequency: "Quotidien" },
  { from: "Londres", to: "Lagos", badge: "⭐ Trending", frequency: "3x/semaine" },
  { from: "Bruxelles", to: "Kinshasa", badge: "💎 Premium", frequency: "2x/semaine" },
  { from: "Milan", to: "Casablanca", badge: "🚀 Nouveau", frequency: "Hebdomadaire" },
  { from: "New York", to: "Accra", badge: "🌟 International", frequency: "2x/semaine" },
  { from: "Madrid", to: "Bamako", badge: "📈 Croissance", frequency: "Hebdomadaire" },
  { from: "Amsterdam", to: "Abidjan", badge: "✈️ Direct", frequency: "2x/semaine" },
  { from: "Toronto", to: "Lagos", badge: "🇨🇦 Canada", frequency: "Hebdomadaire" },
  { from: "Berlin", to: "Nairobi", badge: "🌍 Afrique Est", frequency: "Hebdomadaire" },
  { from: "Rome", to: "Tunis", badge: "🏛️ Méditerranée", frequency: "3x/semaine" },
];

export const ALL_DESTINATIONS = [
  ...POPULAR_ORIGINS,
  ...POPULAR_DESTINATIONS,
  // Ajout automatique de nouvelles destinations selon la demande
].sort();

export const getDestinationSuggestions = (input: string, type: 'origin' | 'destination' = 'destination') => {
  const baseList = type === 'origin' ? POPULAR_ORIGINS : POPULAR_DESTINATIONS;
  
  if (!input) return baseList.slice(0, 8);
  
  const filtered = ALL_DESTINATIONS.filter(dest =>
    dest.toLowerCase().includes(input.toLowerCase())
  );
  
  return filtered.slice(0, 8);
};

export const validateDestinationFormat = (input: string) => {
  if (!input.trim()) return { isValid: true };
  
  if (!input.includes(',')) {
    return {
      isValid: false,
      suggestion: `Format recommandé : "${input}, [Pays]"`
    };
  }
  
  return { isValid: true };
};