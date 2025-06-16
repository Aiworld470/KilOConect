export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  rating: number;
  reviewCount: number;
  verifiedAt?: Date;
  joinedAt: Date;
  phone?: string;
  bio?: string;
  badges: UserBadge[];
}

export interface UserBadge {
  id: string;
  name: string;
  icon: string;
  color: string;
}

export interface Trip {
  id: string;
  transporterId: string;
  transporter: User;
  origin: Location;
  destination: Location;
  departureDate: Date;
  arrivalDate?: Date;
  availableWeight: number;
  pricePerKg: number;
  currency: string;
  description?: string;
  photos: string[];
  status: TripStatus;
  bookings: Booking[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Location {
  id: string;
  city: string;
  country: string;
  countryCode: string;
  coordinates?: [number, number];
  airport?: string;
}

export type TripStatus = 'active' | 'full' | 'in_progress' | 'completed' | 'cancelled';

export interface Booking {
  id: string;
  tripId: string;
  trip: Trip;
  senderId: string;
  sender: User;
  packageDetails: Package;
  pricePerKg: number;
  totalPrice: number;
  status: BookingStatus;
  paymentStatus: PaymentStatus;
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
  trackingNumber?: string;
}

export type BookingStatus = 'pending' | 'accepted' | 'rejected' | 'in_transit' | 'delivered' | 'cancelled';
export type PaymentStatus = 'pending' | 'paid' | 'refunded' | 'failed';

export interface Package {
  weight: number;
  dimensions?: {
    length: number;
    width: number;
    height: number;
  };
  description: string;
  value: number;
  category: PackageCategory;
  fragile: boolean;
  urgent: boolean;
  photos: string[];
}

export type PackageCategory = 'documents' | 'clothing' | 'electronics' | 'food' | 'gifts' | 'cosmetics' | 'other';

export interface Message {
  id: string;
  bookingId: string;
  senderId: string;
  sender: User;
  content: string;
  type: MessageType;
  createdAt: Date;
  readAt?: Date;
}

export type MessageType = 'text' | 'price_offer' | 'price_counter' | 'system';

export interface Review {
  id: string;
  bookingId: string;
  reviewerId: string;
  reviewer: User;
  revieweeId: string;
  reviewee: User;
  rating: number;
  comment?: string;
  photos?: string[];
  createdAt: Date;
}

export interface SearchFilters {
  origin?: string;
  destination?: string;
  departureDate?: Date;
  maxPricePerKg?: number;
  minAvailableWeight?: number;
  verifiedOnly?: boolean;
}

export interface PricingTier {
  id: 'eco' | 'standard' | 'express';
  name: string;
  description: string;
  multiplier: number;
  features: string[];
  icon: string;
  color: string;
}

export interface TrackingEvent {
  id: string;
  bookingId: string;
  status: string;
  description: string;
  location?: string;
  timestamp: Date;
  photos?: string[];
}