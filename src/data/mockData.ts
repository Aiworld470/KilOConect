import { User, Trip, Location, Booking, Review, UserBadge, PricingTier } from '../types';

export const userBadges: UserBadge[] = [
  { id: 'verified', name: 'Vérifié', icon: 'shield-check', color: 'text-blue-500' },
  { id: 'frequent', name: 'Voyageur Fréquent', icon: 'plane', color: 'text-primary-500' },
  { id: 'trusted', name: 'Super Transporteur', icon: 'star', color: 'text-yellow-500' },
  { id: 'fast', name: 'Livraison Express', icon: 'zap', color: 'text-green-500' },
];

export const locations: Location[] = [
  { id: '1', city: 'Paris', country: 'France', countryCode: 'FR', airport: 'CDG' },
  { id: '2', city: 'Dakar', country: 'Sénégal', countryCode: 'SN', airport: 'DKR' },
  { id: '3', city: 'Londres', country: 'Royaume-Uni', countryCode: 'GB', airport: 'LHR' },
  { id: '4', city: 'Lagos', country: 'Nigeria', countryCode: 'NG', airport: 'LOS' },
  { id: '5', city: 'Abidjan', country: 'Côte d\'Ivoire', countryCode: 'CI', airport: 'ABJ' },
  { id: '6', city: 'Casablanca', country: 'Maroc', countryCode: 'MA', airport: 'CMN' },
  { id: '7', city: 'Bamako', country: 'Mali', countryCode: 'ML', airport: 'BKO' },
  { id: '8', city: 'Bruxelles', country: 'Belgique', countryCode: 'BE', airport: 'BRU' },
  { id: '9', city: 'Accra', country: 'Ghana', countryCode: 'GH', airport: 'ACC' },
  { id: '10', city: 'Ouagadougou', country: 'Burkina Faso', countryCode: 'BF', airport: 'OUA' },
];

export const users: User[] = [
  {
    id: '1',
    name: 'Fatou Diallo',
    email: 'fatou.diallo@email.com',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
    rating: 4.9,
    reviewCount: 127,
    verifiedAt: new Date('2023-01-15'),
    joinedAt: new Date('2022-03-10'),
    phone: '+33123456789',
    bio: 'Voyageuse expérimentée entre Paris et Dakar. Spécialisée dans le transport de produits cosmétiques et alimentaires.',
    badges: [userBadges[0], userBadges[1], userBadges[2]],
  },
  {
    id: '2',
    name: 'Moussa Traoré',
    email: 'moussa.traore@email.com',
    avatar: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=150',
    rating: 4.7,
    reviewCount: 89,
    verifiedAt: new Date('2023-02-20'),
    joinedAt: new Date('2022-07-05'),
    phone: '+44987654321',
    bio: 'Ingénieur basé à Londres, voyages réguliers vers l\'Afrique de l\'Ouest pour le travail.',
    badges: [userBadges[0], userBadges[3]],
  },
  {
    id: '3',
    name: 'Aïcha Bamba',
    email: 'aicha.bamba@email.com',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',
    rating: 4.8,
    reviewCount: 156,
    verifiedAt: new Date('2022-11-30'),
    joinedAt: new Date('2021-09-15'),
    phone: '+221776543210',
    bio: 'Étudiante en commerce international. Trajets fréquents Dakar-Abidjan pour les études.',
    badges: [userBadges[0], userBadges[1]],
  },
  {
    id: '4',
    name: 'Koffi Asante',
    email: 'koffi.asante@email.com',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150',
    rating: 4.6,
    reviewCount: 203,
    verifiedAt: new Date('2023-03-10'),
    joinedAt: new Date('2022-01-20'),
    phone: '+233244567890',
    bio: 'Homme d\'affaires ghanéen, spécialiste du transport de textiles et produits artisanaux.',
    badges: [userBadges[0], userBadges[2]],
  },
  {
    id: '5',
    name: 'Mariam Keita',
    email: 'mariam.keita@email.com',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150',
    rating: 4.9,
    reviewCount: 98,
    verifiedAt: new Date('2023-01-05'),
    joinedAt: new Date('2022-08-12'),
    phone: '+223661234567',
    bio: 'Infirmière malienne vivant en France. Voyages mensuels pour la famille et le travail humanitaire.',
    badges: [userBadges[0], userBadges[3]],
  },
];

export const trips: Trip[] = [
  {
    id: '1',
    transporterId: '1',
    transporter: users[0],
    origin: locations[0], // Paris
    destination: locations[1], // Dakar
    departureDate: new Date('2024-02-15T10:00:00'),
    arrivalDate: new Date('2024-02-15T16:30:00'),
    availableWeight: 15,
    pricePerKg: 25,
    currency: 'EUR',
    description: 'Vol direct Air Sénégal. Possibilité de transport de produits cosmétiques et alimentaires non périssables.',
    photos: [
      'https://images.pexels.com/photos/358319/pexels-photo-358319.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1309644/pexels-photo-1309644.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    status: 'active',
    bookings: [],
    createdAt: new Date('2024-01-10T08:00:00'),
    updatedAt: new Date('2024-01-10T08:00:00'),
  },
  {
    id: '2',
    transporterId: '2',
    transporter: users[1],
    origin: locations[2], // Londres
    destination: locations[3], // Lagos
    departureDate: new Date('2024-02-20T14:00:00'),
    arrivalDate: new Date('2024-02-20T20:45:00'),
    availableWeight: 20,
    pricePerKg: 30,
    currency: 'EUR',
    description: 'Vol British Airways avec escale. Spécialisé dans l\'électronique et les documents officiels.',
    photos: [
      'https://images.pexels.com/photos/2026324/pexels-photo-2026324.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    status: 'active',
    bookings: [],
    createdAt: new Date('2024-01-12T10:30:00'),
    updatedAt: new Date('2024-01-12T10:30:00'),
  },
  {
    id: '3',
    transporterId: '3',
    transporter: users[2],
    origin: locations[1], // Dakar
    destination: locations[4], // Abidjan
    departureDate: new Date('2024-02-18T09:00:00'),
    arrivalDate: new Date('2024-02-18T11:30:00'),
    availableWeight: 8,
    pricePerKg: 18,
    currency: 'EUR',
    description: 'Trajet régional Air Côte d\'Ivoire. Idéal pour produits locaux et cadeaux familiaux.',
    photos: [
      'https://images.pexels.com/photos/723240/pexels-photo-723240.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    status: 'active',
    bookings: [],
    createdAt: new Date('2024-01-08T16:20:00'),
    updatedAt: new Date('2024-01-08T16:20:00'),
  },
  {
    id: '4',
    transporterId: '4',
    transporter: users[3],
    origin: locations[7], // Bruxelles
    destination: locations[8], // Accra
    departureDate: new Date('2024-02-25T11:30:00'),
    arrivalDate: new Date('2024-02-25T17:15:00'),
    availableWeight: 25,
    pricePerKg: 22,
    currency: 'EUR',
    description: 'Vol KLM via Amsterdam. Expert en textiles traditionnels et produits artisanaux.',
    photos: [
      'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    status: 'active',
    bookings: [],
    createdAt: new Date('2024-01-15T14:45:00'),
    updatedAt: new Date('2024-01-15T14:45:00'),
  },
  {
    id: '5',
    transporterId: '5',
    transporter: users[4],
    origin: locations[0], // Paris
    destination: locations[6], // Bamako
    departureDate: new Date('2024-02-22T16:20:00'),
    arrivalDate: new Date('2024-02-22T22:10:00'),
    availableWeight: 12,
    pricePerKg: 35,
    currency: 'EUR',
    description: 'Vol Air France avec escale Casablanca. Mission humanitaire, transport prioritaire matériel médical.',
    photos: [
      'https://images.pexels.com/photos/40751/plane-aircraft-take-off-flight-40751.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    status: 'active',
    bookings: [],
    createdAt: new Date('2024-01-20T09:15:00'),
    updatedAt: new Date('2024-01-20T09:15:00'),
  },
];

export const pricingTiers: PricingTier[] = [
  {
    id: 'eco',
    name: 'Économique',
    description: 'Solution abordable pour colis non urgents',
    multiplier: 1.0,
    features: [
      'Livraison standard',
      'Assurance de base',
      'Suivi en ligne',
      'Support client'
    ],
    icon: 'package',
    color: 'text-gray-600'
  },
  {
    id: 'standard',
    name: 'Standard',
    description: 'Service équilibré qualité/prix',
    multiplier: 1.3,
    features: [
      'Livraison prioritaire',
      'Assurance étendue',
      'Suivi temps réel',
      'Support prioritaire',
      'Photos de livraison'
    ],
    icon: 'truck',
    color: 'text-primary-600'
  },
  {
    id: 'express',
    name: 'Express',
    description: 'Service premium pour colis urgents',
    multiplier: 1.8,
    features: [
      'Livraison express',
      'Assurance premium',
      'Suivi GPS temps réel',
      'Support VIP 24/7',
      'Photos + vidéo livraison',
      'Remise en main propre'
    ],
    icon: 'zap',
    color: 'text-success-600'
  }
];

export const sampleReviews: Review[] = [
  {
    id: '1',
    bookingId: 'booking-1',
    reviewerId: '2',
    reviewer: users[1],
    revieweeId: '1',
    reviewee: users[0],
    rating: 5,
    comment: 'Fatou est une transporteuse exceptionnelle ! Mes produits cosmétiques sont arrivés en parfait état. Communication excellente tout au long du voyage.',
    createdAt: new Date('2024-01-15T14:30:00'),
  },
  {
    id: '2',
    bookingId: 'booking-2',
    reviewerId: '3',
    reviewer: users[2],
    revieweeId: '1',
    reviewee: users[0],
    rating: 5,
    comment: 'Très professionnelle et ponctuelle. Le colis familial est arrivé à temps pour l\'anniversaire de ma mère. Je recommande vivement !',
    createdAt: new Date('2024-01-08T10:15:00'),
  },
  {
    id: '3',
    bookingId: 'booking-3',
    reviewerId: '1',
    reviewer: users[0],
    revieweeId: '4',
    reviewee: users[3],
    rating: 4,
    comment: 'Koffi connaît très bien les textiles traditionnels. Mes tissus Kente sont arrivés sans aucun problème. Très satisfaite du service.',
    createdAt: new Date('2023-12-20T16:45:00'),
  },
];

export const mockMessages = [
  {
    id: '1',
    bookingId: 'booking-1',
    senderId: '2',
    sender: users[1],
    content: 'Bonjour Fatou, j\'aimerais envoyer 3kg de produits cosmétiques à Dakar. Votre tarif me convient parfaitement !',
    type: 'text' as const,
    createdAt: new Date('2024-01-12T10:00:00'),
  },
  {
    id: '2',
    bookingId: 'booking-1',
    senderId: '1',
    sender: users[0],
    content: 'Bonjour ! Parfait, je peux accepter vos 3kg de cosmétiques. Pouvez-vous me confirmer le contenu exact ?',
    type: 'text' as const,
    createdAt: new Date('2024-01-12T10:15:00'),
  },
  {
    id: '3',
    bookingId: 'booking-1',
    senderId: '2',
    sender: users[1],
    content: 'Il s\'agit de crèmes de beauté et parfums dans leurs emballages d\'origine. Valeur environ 200€.',
    type: 'text' as const,
    createdAt: new Date('2024-01-12T10:30:00'),
  },
  {
    id: '4',
    bookingId: 'booking-1',
    senderId: '1',
    sender: users[0],
    content: 'Parfait ! Je confirme le transport pour 75€ (25€/kg). Rendez-vous à l\'aéroport CDG Terminal 1 à 8h00.',
    type: 'price_offer' as const,
    createdAt: new Date('2024-01-12T11:00:00'),
  },
];

export const mockStats = {
  totalTrips: 15420,
  totalUsers: 8935,
  totalDeliveries: 12678,
  averageRating: 4.8,
  countries: 25,
  totalWeight: 48500, // en kg
};