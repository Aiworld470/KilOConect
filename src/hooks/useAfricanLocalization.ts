import { useState, useEffect } from 'react';
import { africanLocalizationService } from '../services/africanLocalizationService';

export const useAfricanLocalization = (countryCode?: string) => {
  const [locale, setLocale] = useState(() => {
    if (countryCode) {
      return africanLocalizationService.getLocaleByCountry(countryCode);
    }
    
    // Détecter automatiquement
    const detected = africanLocalizationService.detectPreferredLanguage(
      navigator.userAgent,
      navigator.language,
      countryCode
    );
    
    return africanLocalizationService.getLocaleByCountry(detected.split('-')[1] || 'SN');
  });

  const formatPrice = (amount: number) => {
    return africanLocalizationService.formatPrice(amount, locale);
  };

  const formatDate = (date: Date) => {
    return africanLocalizationService.formatDate(date, locale);
  };

  const getCulturalEvents = (date: Date) => {
    return africanLocalizationService.getCulturalEvents(locale.countries[0], date);
  };

  const getCulturalPricingMultiplier = (date: Date) => {
    return africanLocalizationService.getCulturalPricingMultiplier(locale.countries[0], date);
  };

  const getMessageTemplates = () => {
    return africanLocalizationService.getMessageTemplates(locale);
  };

  const getCulturalMessages = () => {
    return africanLocalizationService.getCulturalMessages(locale);
  };

  const validatePhone = (phoneNumber: string) => {
    return africanLocalizationService.validateAfricanPhone(phoneNumber, locale.countries[0]);
  };

  const getPopularRoutes = () => {
    return africanLocalizationService.getPopularRoutes(locale.countries[0]);
  };

  return {
    locale,
    setLocale,
    formatPrice,
    formatDate,
    getCulturalEvents,
    getCulturalPricingMultiplier,
    getMessageTemplates,
    getCulturalMessages,
    validatePhone,
    getPopularRoutes,
  };
};

export const useMobileMoneyProviders = (countryCode: string) => {
  const [providers, setProviders] = useState(() => {
    return mobileMoneyService.getAvailableProviders(countryCode);
  });

  const calculateFees = (providerId: string, amount: number) => {
    return mobileMoneyService.calculateFees(providerId, amount);
  };

  const initiatePayment = async (
    providerId: string,
    phoneNumber: string,
    amount: number,
    currency: string,
    bookingId: string
  ) => {
    return mobileMoneyService.initiatePayment(providerId, phoneNumber, amount, currency, bookingId);
  };

  const checkPaymentStatus = async (transactionId: string) => {
    return mobileMoneyService.checkPaymentStatus(transactionId);
  };

  return {
    providers,
    calculateFees,
    initiatePayment,
    checkPaymentStatus,
  };
};

export const useOfflineCapabilities = () => {
  const [networkStatus, setNetworkStatus] = useState(() => {
    return offlineService.getNetworkStatus();
  });

  useEffect(() => {
    const handleNetworkChange = (event: CustomEvent) => {
      setNetworkStatus(event.detail);
    };

    window.addEventListener('networkStatusChange', handleNetworkChange as EventListener);
    
    return () => {
      window.removeEventListener('networkStatusChange', handleNetworkChange as EventListener);
    };
  }, []);

  const saveForOffline = async (storeName: string, data: any) => {
    return offlineService.saveForOffline(storeName, data);
  };

  const getOfflineData = async (storeName: string, key?: string) => {
    return offlineService.getOfflineData(storeName, key);
  };

  const optimizeImageForConnection = async (imageUrl: string) => {
    return offlineService.optimizeImageForConnection(imageUrl);
  };

  const estimateDownloadTime = (sizeInBytes: number) => {
    return offlineService.estimateDownloadTime(sizeInBytes);
  };

  const isDataSaverMode = () => {
    return offlineService.isDataSaverMode();
  };

  return {
    networkStatus,
    saveForOffline,
    getOfflineData,
    optimizeImageForConnection,
    estimateDownloadTime,
    isDataSaverMode,
  };
};