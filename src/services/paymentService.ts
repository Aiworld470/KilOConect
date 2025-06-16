// Mock payment service - to be replaced with Stripe integration

export interface PaymentIntent {
  id: string;
  amount: number;
  currency: string;
  status: 'pending' | 'processing' | 'succeeded' | 'failed';
  clientSecret: string;
}

export interface PaymentMethod {
  id: string;
  type: 'card' | 'paypal' | 'bank_transfer';
  last4?: string;
  brand?: string;
  expiryMonth?: number;
  expiryYear?: number;
}

class PaymentService {
  async createPaymentIntent(amount: number, currency: string = 'EUR'): Promise<PaymentIntent> {
    // Simulate Stripe API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return {
      id: `pi_${Math.random().toString(36).substr(2, 16)}`,
      amount: Math.round(amount * 100), // Stripe uses cents
      currency: currency.toLowerCase(),
      status: 'pending',
      clientSecret: `pi_secret_${Math.random().toString(36).substr(2, 20)}`,
    };
  }

  async confirmPayment(paymentIntentId: string, paymentMethodId: string): Promise<PaymentIntent> {
    // Simulate Stripe confirmation
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    return {
      id: paymentIntentId,
      amount: 7500, // Mock amount
      currency: 'eur',
      status: 'succeeded',
      clientSecret: 'confirmed_secret',
    };
  }

  async getPaymentMethods(): Promise<PaymentMethod[]> {
    // Simulate getting saved payment methods
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return [
      {
        id: 'pm_card_visa',
        type: 'card',
        last4: '4242',
        brand: 'Visa',
        expiryMonth: 12,
        expiryYear: 2025,
      },
      {
        id: 'pm_card_mastercard',
        type: 'card',
        last4: '5555',
        brand: 'Mastercard',
        expiryMonth: 8,
        expiryYear: 2026,
      },
    ];
  }

  async processRefund(paymentIntentId: string, amount?: number): Promise<{ success: boolean; refundId: string }> {
    // Simulate refund processing
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    return {
      success: true,
      refundId: `re_${Math.random().toString(36).substr(2, 16)}`,
    };
  }

  calculateFees(amount: number): { platformFee: number; processingFee: number; total: number } {
    const platformFee = Math.round(amount * 0.05 * 100) / 100; // 5% platform fee
    const processingFee = Math.round((amount * 0.029 + 0.30) * 100) / 100; // Stripe fees
    const total = Math.round((amount + platformFee + processingFee) * 100) / 100;
    
    return { platformFee, processingFee, total };
  }
}

export const paymentService = new PaymentService();