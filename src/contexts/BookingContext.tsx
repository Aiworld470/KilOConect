import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Booking, Package, PricingTier } from '../types';

interface BookingContextType {
  currentBooking: Partial<Booking> | null;
  selectedTier: PricingTier | null;
  packageDetails: Package | null;
  setCurrentBooking: (booking: Partial<Booking> | null) => void;
  setSelectedTier: (tier: PricingTier | null) => void;
  setPackageDetails: (pkg: Package | null) => void;
  calculatePrice: (basePrice: number, weight: number, tier: PricingTier) => number;
  createBooking: (bookingData: Partial<Booking>) => Promise<Booking>;
  updateBookingStatus: (bookingId: string, status: string) => Promise<void>;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (context === undefined) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};

interface BookingProviderProps {
  children: ReactNode;
}

export const BookingProvider: React.FC<BookingProviderProps> = ({ children }) => {
  const [currentBooking, setCurrentBooking] = useState<Partial<Booking> | null>(null);
  const [selectedTier, setSelectedTier] = useState<PricingTier | null>(null);
  const [packageDetails, setPackageDetails] = useState<Package | null>(null);

  const calculatePrice = (basePrice: number, weight: number, tier: PricingTier): number => {
    return Math.round(basePrice * weight * tier.multiplier * 100) / 100;
  };

  const createBooking = async (bookingData: Partial<Booking>): Promise<Booking> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newBooking: Booking = {
      id: Math.random().toString(36).substr(2, 9),
      tripId: bookingData.tripId || '',
      trip: bookingData.trip!,
      senderId: bookingData.senderId || '',
      sender: bookingData.sender!,
      packageDetails: bookingData.packageDetails!,
      pricePerKg: bookingData.pricePerKg || 0,
      totalPrice: bookingData.totalPrice || 0,
      status: 'pending',
      paymentStatus: 'pending',
      messages: [],
      createdAt: new Date(),
      updatedAt: new Date(),
      trackingNumber: `KC${Math.random().toString(36).substr(2, 8).toUpperCase()}`,
    };

    return newBooking;
  };

  const updateBookingStatus = async (bookingId: string, status: string): Promise<void> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    console.log(`Booking ${bookingId} status updated to ${status}`);
  };

  const value = {
    currentBooking,
    selectedTier,
    packageDetails,
    setCurrentBooking,
    setSelectedTier,
    setPackageDetails,
    calculatePrice,
    createBooking,
    updateBookingStatus,
  };

  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>;
};