// Service de localisation pour l'Afrique
// Gestion des langues, cultures et spécificités africaines

export interface AfricanLocale {
  code: string;
  name: string;
  nativeName: string;
  countries: string[];
  currency: string;
  dateFormat: string;
  numberFormat: string;
  rtl: boolean;
}

export interface CulturalEvent {
  id: string;
  name: string;
  date: Date;
  countries: string[];
  impact: 'high' | 'medium' | 'low';
  description: string;
}

class AfricanLocalizationService {
  private locales: AfricanLocale[] = [
    {
      code: 'fr-SN',
      name: 'Français (Sénégal)',
      nativeName: 'Français',
      countries: ['SN', 'ML', 'BF', 'CI', 'NE'],
      currency: 'XOF',
      dateFormat: 'DD/MM/YYYY',
      numberFormat: 'fr-FR',
      rtl: false
    },
    {
      code: 'en-NG',
      name: 'English (Nigeria)',
      nativeName: 'English',
      countries: ['NG', 'GH', 'KE', 'UG', 'TZ'],
      currency: 'NGN',
      dateFormat: 'DD/MM/YYYY',
      numberFormat: 'en-US',
      rtl: false
    },
    {
      code: 'ar-MA',
      name: 'العربية (المغرب)',
      nativeName: 'العربية',
      countries: ['MA', 'TN', 'DZ', 'EG'],
      currency: 'MAD',
      dateFormat: 'DD/MM/YYYY',
      numberFormat: 'ar-MA',
      rtl: true
    },
    {
      code: 'sw-KE',
      name: 'Kiswahili',
      nativeName: 'Kiswahili',
      countries: ['KE', 'TZ', 'UG'],
      currency: 'KES',
      dateFormat: 'DD/MM/YYYY',
      numberFormat: 'en-US',
      rtl: false
    },
    {
      code: 'wo-SN',
      name: 'Wolof',
      nativeName: 'Wolof',
      countries: ['SN'],
      currency: 'XOF',
      dateFormat: 'DD/MM/YYYY',
      numberFormat: 'fr-FR',
      rtl: false
    }
  ];

  private culturalEvents: CulturalEvent[] = [
    {
      id: 'ramadan',
      name: 'Ramadan',
      date: new Date('2024-03-10'),
      countries: ['SN', 'ML', 'NE', 'MA', 'TN', 'DZ'],
      impact: 'high',
      description: 'Mois de jeûne - Réduction activité diurne'
    },
    {
      id: 'tabaski',
      name: 'Tabaski (Aïd el-Kebir)',
      date: new Date('2024-06-16'),
      countries: ['SN', 'ML', 'BF', 'CI', 'NE', 'MA'],
      impact: 'high',
      description: 'Fête du mouton - Pic envois colis'
    },
    {
      id: 'korité',
      name: 'Korité (Aïd el-Fitr)',
      date: new Date('2024-04-09'),
      countries: ['SN', 'ML', 'BF', 'CI', 'NE'],
      impact: 'high',
      description: 'Fin du Ramadan - Forte demande transport'
    },
    {
      id: 'christmas',
      name: 'Noël',
      date: new Date('2024-12-25'),
      countries: ['GH', 'NG', 'KE', 'CM', 'CI'],
      impact: 'high',
      description: 'Fêtes de fin d\'année - Pic activité'
    }
  ];

  // Détecter la locale selon le pays
  getLocaleByCountry(countryCode: string): AfricanLocale {
    return this.locales.find(locale => 
      locale.countries.includes(countryCode)
    ) || this.locales[0]; // Français par défaut
  }

  // Formater les prix selon la locale
  formatPrice(amount: number, locale: AfricanLocale): string {
    const formatter = new Intl.NumberFormat(locale.numberFormat, {
      style: 'currency',
      currency: locale.currency,
      minimumFractionDigits: 0
    });

    return formatter.format(amount);
  }

  // Formater les dates selon la culture locale
  formatDate(date: Date, locale: AfricanLocale): string {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };

    return new Intl.DateTimeFormat(locale.code, options).format(date);
  }

  // Détecter les événements culturels impactants
  getCulturalEvents(countryCode: string, date: Date): CulturalEvent[] {
    const monthStart = new Date(date.getFullYear(), date.getMonth(), 1);
    const monthEnd = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    return this.culturalEvents.filter(event => 
      event.countries.includes(countryCode) &&
      event.date >= monthStart &&
      event.date <= monthEnd
    );
  }

  // Ajustement pricing selon événements culturels
  getCulturalPricingMultiplier(countryCode: string, date: Date): number {
    const events = this.getCulturalEvents(countryCode, date);
    
    if (events.some(e => e.impact === 'high')) {
      return 1.2; // +20% pendant événements majeurs
    }
    if (events.some(e => e.impact === 'medium')) {
      return 1.1; // +10% pendant événements moyens
    }
    
    return 1.0; // Prix normal
  }

  // Messages adaptés à la culture
  getCulturalMessages(locale: AfricanLocale): { [key: string]: string } {
    const messages = {
      'fr-SN': {
        greeting: 'Asalamu aleykum',
        thanks: 'Jërëjëf',
        welcome: 'Bienvenue sur KiloConnect',
        familyFirst: 'La famille avant tout',
        respectElders: 'Respect aux aînés'
      },
      'en-NG': {
        greeting: 'Welcome',
        thanks: 'Thank you',
        welcome: 'Welcome to KiloConnect',
        familyFirst: 'Family first',
        respectElders: 'Respect for elders'
      },
      'ar-MA': {
        greeting: 'أهلا وسهلا',
        thanks: 'شكرا',
        welcome: 'مرحبا بكم في كيلو كونكت',
        familyFirst: 'الأسرة أولا',
        respectElders: 'احترام الكبار'
      },
      'sw-KE': {
        greeting: 'Karibu',
        thanks: 'Asante',
        welcome: 'Karibu KiloConnect',
        familyFirst: 'Familia kwanza',
        respectElders: 'Heshima kwa wazee'
      }
    };

    return messages[locale.code] || messages['fr-SN'];
  }

  // Validation numéros de téléphone africains
  validateAfricanPhone(phoneNumber: string, countryCode: string): boolean {
    const patterns: { [key: string]: RegExp } = {
      'SN': /^(\+221|221)?[0-9]{9}$/, // Sénégal
      'ML': /^(\+223|223)?[0-9]{8}$/, // Mali
      'BF': /^(\+226|226)?[0-9]{8}$/, // Burkina Faso
      'CI': /^(\+225|225)?[0-9]{8}$/, // Côte d'Ivoire
      'NG': /^(\+234|234)?[0-9]{10}$/, // Nigeria
      'GH': /^(\+233|233)?[0-9]{9}$/, // Ghana
      'KE': /^(\+254|254)?[0-9]{9}$/, // Kenya
      'MA': /^(\+212|212)?[0-9]{9}$/, // Maroc
      'TN': /^(\+216|216)?[0-9]{8}$/, // Tunisie
      'DZ': /^(\+213|213)?[0-9]{9}$/, // Algérie
    };

    const pattern = patterns[countryCode];
    return pattern ? pattern.test(phoneNumber) : true;
  }

  // Suggestions de routes populaires par région
  getPopularRoutes(countryCode: string): string[] {
    const routes: { [key: string]: string[] } = {
      'FR': ['Paris → Dakar', 'Paris → Abidjan', 'Paris → Bamako', 'Marseille → Casablanca'],
      'GB': ['Londres → Lagos', 'Londres → Accra', 'Londres → Nairobi'],
      'BE': ['Bruxelles → Kinshasa', 'Bruxelles → Dakar', 'Anvers → Abidjan'],
      'IT': ['Milan → Casablanca', 'Rome → Tunis', 'Milan → Lagos'],
      'ES': ['Madrid → Casablanca', 'Madrid → Dakar', 'Barcelone → Rabat'],
      'US': ['New York → Lagos', 'Washington → Accra', 'Atlanta → Dakar'],
      'CA': ['Toronto → Lagos', 'Montréal → Dakar', 'Vancouver → Nairobi']
    };

    return routes[countryCode] || [];
  }

  // Détection automatique de la langue préférée
  detectPreferredLanguage(userAgent: string, acceptLanguage: string, countryCode?: string): string {
    // Priorité 1: Langue du navigateur
    if (acceptLanguage.includes('fr')) return 'fr-SN';
    if (acceptLanguage.includes('ar')) return 'ar-MA';
    if (acceptLanguage.includes('sw')) return 'sw-KE';
    
    // Priorité 2: Pays de l'utilisateur
    if (countryCode) {
      const locale = this.getLocaleByCountry(countryCode);
      return locale.code;
    }
    
    // Par défaut: Français (langue principale diaspora)
    return 'fr-SN';
  }

  // Conversion automatique des devises
  async getExchangeRate(from: string, to: string): Promise<number> {
    // Taux fixes pour simulation - en réalité API de change
    const rates: { [key: string]: { [key: string]: number } } = {
      'EUR': {
        'XOF': 655.957,
        'NGN': 850.0,
        'GHS': 12.5,
        'KES': 120.0,
        'MAD': 10.8,
        'TND': 3.3
      }
    };

    return rates[from]?.[to] || 1;
  }

  // Templates de messages selon la culture
  getMessageTemplates(locale: AfricanLocale): { [key: string]: string } {
    const templates = {
      'fr-SN': {
        bookingRequest: 'Bonjour {name}, j\'aimerais réserver {weight}kg pour {route}. Merci.',
        priceNegotiation: 'Bonjour, votre prix me convient. Pouvons-nous finaliser ?',
        thankYou: 'Merci beaucoup pour votre service. Que Dieu vous bénisse.',
        familyPackage: 'C\'est pour ma famille au pays. Merci de bien prendre soin.'
      },
      'en-NG': {
        bookingRequest: 'Hello {name}, I would like to book {weight}kg for {route}. Thank you.',
        priceNegotiation: 'Hello, your price is good. Can we finalize?',
        thankYou: 'Thank you very much for your service. God bless you.',
        familyPackage: 'This is for my family back home. Please take good care.'
      },
      'ar-MA': {
        bookingRequest: 'السلام عليكم {name}، أريد حجز {weight}كغ لـ {route}. شكرا.',
        priceNegotiation: 'السلام عليكم، السعر مناسب. هل يمكننا الانتهاء؟',
        thankYou: 'شكرا جزيلا لخدمتكم. بارك الله فيكم.',
        familyPackage: 'هذا لعائلتي في الوطن. يرجى الاعتناء جيدا.'
      }
    };

    return templates[locale.code] || templates['fr-SN'];
  }
}

export const africanLocalizationService = new AfricanLocalizationService();