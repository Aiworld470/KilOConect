// Service Mobile Money pour l'Afrique - CRITIQUE pour le business
// Integration avec tous les providers Mobile Money africains

export interface MobileMoneyProvider {
  id: string;
  name: string;
  countries: string[];
  currency: string;
  apiEndpoint: string;
  fees: {
    percentage: number;
    fixed: number;
  };
}

export interface MobileMoneyTransaction {
  id: string;
  provider: string;
  phoneNumber: string;
  amount: number;
  currency: string;
  status: 'pending' | 'success' | 'failed';
  reference: string;
  createdAt: Date;
}

class MobileMoneyService {
  private providers: MobileMoneyProvider[] = [
    // Afrique de l'Ouest
    {
      id: 'orange_money',
      name: 'Orange Money',
      countries: ['SN', 'ML', 'BF', 'CI', 'NE', 'GN'],
      currency: 'XOF',
      apiEndpoint: 'https://api.orange.com/orange-money-webpay/dev/v1',
      fees: { percentage: 1.5, fixed: 0 }
    },
    {
      id: 'mtn_momo',
      name: 'MTN Mobile Money',
      countries: ['GH', 'UG', 'RW', 'CM', 'ZM', 'BJ'],
      currency: 'GHS',
      apiEndpoint: 'https://sandbox.momodeveloper.mtn.com',
      fees: { percentage: 2.0, fixed: 0 }
    },
    {
      id: 'wave',
      name: 'Wave',
      countries: ['SN', 'ML', 'CI'],
      currency: 'XOF',
      apiEndpoint: 'https://api.wave.com/v1',
      fees: { percentage: 1.0, fixed: 0 }
    },
    {
      id: 'airtel_money',
      name: 'Airtel Money',
      countries: ['KE', 'TZ', 'ZM', 'MW', 'MG'],
      currency: 'KES',
      apiEndpoint: 'https://openapiuat.airtel.africa',
      fees: { percentage: 1.8, fixed: 0 }
    },
    {
      id: 'mpesa',
      name: 'M-Pesa',
      countries: ['KE', 'TZ', 'MZ', 'GH'],
      currency: 'KES',
      apiEndpoint: 'https://sandbox.safaricom.co.ke',
      fees: { percentage: 1.2, fixed: 0 }
    },
    {
      id: 'free_money',
      name: 'Free Money',
      countries: ['SN'],
      currency: 'XOF',
      apiEndpoint: 'https://api.free.sn/money',
      fees: { percentage: 1.5, fixed: 0 }
    }
  ];

  // Sélection automatique du provider selon le pays
  getAvailableProviders(countryCode: string): MobileMoneyProvider[] {
    return this.providers.filter(provider => 
      provider.countries.includes(countryCode)
    );
  }

  // Initier un paiement Mobile Money
  async initiatePayment(
    provider: string,
    phoneNumber: string,
    amount: number,
    currency: string,
    bookingId: string
  ): Promise<MobileMoneyTransaction> {
    const selectedProvider = this.providers.find(p => p.id === provider);
    if (!selectedProvider) {
      throw new Error('Provider not supported');
    }

    // Validation du numéro selon le provider
    this.validatePhoneNumber(phoneNumber, provider);

    const transaction: MobileMoneyTransaction = {
      id: `mm_${Math.random().toString(36).substr(2, 16)}`,
      provider,
      phoneNumber,
      amount,
      currency,
      status: 'pending',
      reference: `KC${bookingId}_${Date.now()}`,
      createdAt: new Date()
    };

    try {
      // Appel API spécifique au provider
      const result = await this.callProviderAPI(selectedProvider, transaction);
      
      // Envoyer SMS de confirmation
      await this.sendSMSConfirmation(phoneNumber, transaction);
      
      return { ...transaction, status: result.status };
    } catch (error) {
      console.error('Mobile Money payment failed:', error);
      return { ...transaction, status: 'failed' };
    }
  }

  // Vérifier le statut d'un paiement
  async checkPaymentStatus(transactionId: string): Promise<MobileMoneyTransaction> {
    // Simuler vérification statut
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // En réalité, appel API provider pour vérifier statut
    return {
      id: transactionId,
      provider: 'orange_money',
      phoneNumber: '+221771234567',
      amount: 7500,
      currency: 'XOF',
      status: Math.random() > 0.2 ? 'success' : 'pending',
      reference: 'KC123_1234567890',
      createdAt: new Date()
    };
  }

  // Calculer les frais selon le provider et le montant
  calculateFees(provider: string, amount: number): { fees: number; total: number } {
    const selectedProvider = this.providers.find(p => p.id === provider);
    if (!selectedProvider) return { fees: 0, total: amount };

    const fees = (amount * selectedProvider.fees.percentage / 100) + selectedProvider.fees.fixed;
    return {
      fees: Math.round(fees),
      total: Math.round(amount + fees)
    };
  }

  // Validation numéro selon le provider
  private validatePhoneNumber(phoneNumber: string, provider: string): boolean {
    const patterns = {
      orange_money: /^(\+221|221)?7[0-8]\d{7}$/, // Sénégal Orange
      wave: /^(\+221|221)?7[0-8]\d{7}$/, // Sénégal Wave
      mtn_momo: /^(\+233|233)?[0-9]{9}$/, // Ghana MTN
      mpesa: /^(\+254|254)?[0-9]{9}$/, // Kenya M-Pesa
      airtel_money: /^(\+254|254)?[0-9]{9}$/, // Kenya Airtel
    };

    const pattern = patterns[provider as keyof typeof patterns];
    if (!pattern) return true; // Provider non configuré = validation passée

    return pattern.test(phoneNumber);
  }

  // Appel API spécifique au provider
  private async callProviderAPI(
    provider: MobileMoneyProvider, 
    transaction: MobileMoneyTransaction
  ): Promise<{ status: 'success' | 'failed' | 'pending' }> {
    // Simulation d'appel API - en réalité, intégration avec chaque provider
    console.log(`Calling ${provider.name} API for transaction:`, transaction);
    
    // Simuler délai réseau africain
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // 90% de succès pour simulation
    return { status: Math.random() > 0.1 ? 'success' : 'failed' };
  }

  // SMS de confirmation (critique en Afrique)
  private async sendSMSConfirmation(
    phoneNumber: string, 
    transaction: MobileMoneyTransaction
  ): Promise<void> {
    const message = `KiloConnect: Paiement de ${transaction.amount} ${transaction.currency} initié. Ref: ${transaction.reference}. Confirmez sur votre téléphone.`;
    
    // Intégration avec service SMS (Twilio Africa, etc.)
    console.log(`SMS sent to ${phoneNumber}: ${message}`);
  }

  // Conversion de devises automatique
  async convertCurrency(
    amount: number, 
    fromCurrency: string, 
    toCurrency: string
  ): Promise<number> {
    // Taux de change fixes pour simulation
    const rates: { [key: string]: { [key: string]: number } } = {
      'EUR': {
        'XOF': 655.957, // Euro vers Franc CFA
        'GHS': 12.5,    // Euro vers Cedi Ghana
        'KES': 120.0,   // Euro vers Shilling Kenya
        'NGN': 850.0    // Euro vers Naira Nigeria
      },
      'XOF': {
        'EUR': 0.00152,
        'GHS': 0.019,
        'KES': 0.183
      }
    };

    if (fromCurrency === toCurrency) return amount;
    
    const rate = rates[fromCurrency]?.[toCurrency] || 1;
    return Math.round(amount * rate);
  }

  // Gestion des remboursements Mobile Money
  async processRefund(
    transactionId: string,
    amount: number,
    reason: string
  ): Promise<{ success: boolean; refundId: string }> {
    // Logique de remboursement spécifique Mobile Money
    console.log(`Processing refund for transaction ${transactionId}: ${amount}`);
    
    return {
      success: true,
      refundId: `rf_${Math.random().toString(36).substr(2, 16)}`
    };
  }
}

export const mobileMoneyService = new MobileMoneyService();