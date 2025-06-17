import React, { useState, useEffect } from 'react';
import { Smartphone, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { mobileMoneyService } from '../../services/mobileMoneyService';
import { africanLocalizationService } from '../../services/africanLocalizationService';

interface MobileMoneyPaymentProps {
  amount: number;
  currency: string;
  countryCode: string;
  onSuccess: (transaction: any) => void;
  onError: (error: string) => void;
  className?: string;
}

export const MobileMoneyPayment: React.FC<MobileMoneyPaymentProps> = ({
  amount,
  currency,
  countryCode,
  onSuccess,
  onError,
  className = ''
}) => {
  const [selectedProvider, setSelectedProvider] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [step, setStep] = useState<'select' | 'phone' | 'confirm' | 'processing' | 'success'>('select');
  const [transaction, setTransaction] = useState<any>(null);

  const availableProviders = mobileMoneyService.getAvailableProviders(countryCode);
  const locale = africanLocalizationService.getLocaleByCountry(countryCode);

  useEffect(() => {
    if (availableProviders.length === 1) {
      setSelectedProvider(availableProviders[0].id);
      setStep('phone');
    }
  }, [availableProviders]);

  const handleProviderSelect = (providerId: string) => {
    setSelectedProvider(providerId);
    setStep('phone');
  };

  const handlePhoneSubmit = () => {
    if (!phoneNumber.trim()) {
      onError('Veuillez entrer votre numéro de téléphone');
      return;
    }

    // Validation du numéro
    if (!africanLocalizationService.validateAfricanPhone(phoneNumber, countryCode)) {
      onError('Format de numéro invalide pour ce pays');
      return;
    }

    setStep('confirm');
  };

  const handlePayment = async () => {
    setIsProcessing(true);
    setStep('processing');

    try {
      const result = await mobileMoneyService.initiatePayment(
        selectedProvider,
        phoneNumber,
        amount,
        currency,
        'booking_123' // ID de réservation
      );

      setTransaction(result);

      if (result.status === 'success') {
        setStep('success');
        onSuccess(result);
      } else if (result.status === 'pending') {
        // Attendre confirmation utilisateur
        setTimeout(() => checkPaymentStatus(result.id), 5000);
      } else {
        onError('Paiement échoué. Veuillez réessayer.');
        setStep('phone');
      }
    } catch (error) {
      onError('Erreur lors du paiement. Vérifiez votre connexion.');
      setStep('phone');
    } finally {
      setIsProcessing(false);
    }
  };

  const checkPaymentStatus = async (transactionId: string) => {
    try {
      const status = await mobileMoneyService.checkPaymentStatus(transactionId);
      
      if (status.status === 'success') {
        setStep('success');
        onSuccess(status);
      } else if (status.status === 'failed') {
        onError('Paiement échoué ou annulé');
        setStep('phone');
      } else {
        // Continuer à vérifier
        setTimeout(() => checkPaymentStatus(transactionId), 5000);
      }
    } catch (error) {
      console.error('Error checking payment status:', error);
    }
  };

  const formatAmount = (amount: number) => {
    return africanLocalizationService.formatPrice(amount, locale);
  };

  const getProviderLogo = (providerId: string) => {
    const logos: { [key: string]: string } = {
      orange_money: '🟠',
      mtn_momo: '🟡',
      wave: '🌊',
      airtel_money: '🔴',
      mpesa: '🟢',
      free_money: '🔵'
    };
    return logos[providerId] || '📱';
  };

  return (
    <div className={`bg-white rounded-2xl shadow-card border border-gray-100 p-6 ${className}`}>
      <div className="flex items-center space-x-3 mb-6">
        <Smartphone className="h-6 w-6 text-primary-600" />
        <h3 className="text-lg font-semibold text-gray-800">Paiement Mobile Money</h3>
      </div>

      {/* Sélection du provider */}
      {step === 'select' && (
        <div className="space-y-4">
          <p className="text-gray-600 mb-4">
            Choisissez votre service de paiement mobile :
          </p>
          
          <div className="grid grid-cols-1 gap-3">
            {availableProviders.map((provider) => {
              const fees = mobileMoneyService.calculateFees(provider.id, amount);
              
              return (
                <button
                  key={provider.id}
                  onClick={() => handleProviderSelect(provider.id)}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:border-primary-300 hover:bg-primary-50 transition-all duration-200"
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{getProviderLogo(provider.id)}</span>
                    <div className="text-left">
                      <div className="font-medium text-gray-800">{provider.name}</div>
                      <div className="text-sm text-gray-500">
                        Frais: {formatAmount(fees.fees)}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-gray-800">
                      {formatAmount(fees.total)}
                    </div>
                    <div className="text-xs text-gray-500">Total</div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Saisie du numéro */}
      {step === 'phone' && (
        <div className="space-y-4">
          <div className="flex items-center space-x-3 p-3 bg-primary-50 rounded-xl">
            <span className="text-xl">{getProviderLogo(selectedProvider)}</span>
            <span className="font-medium text-primary-800">
              {availableProviders.find(p => p.id === selectedProvider)?.name}
            </span>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Numéro de téléphone
            </label>
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder={countryCode === 'SN' ? '+221 77 123 45 67' : '+XXX XX XXX XXXX'}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
            <p className="text-xs text-gray-500 mt-1">
              Le numéro associé à votre compte {availableProviders.find(p => p.id === selectedProvider)?.name}
            </p>
          </div>

          <button
            onClick={handlePhoneSubmit}
            className="w-full bg-primary-600 text-white py-3 rounded-xl hover:bg-primary-700 transition-colors font-medium"
          >
            Continuer
          </button>
        </div>
      )}

      {/* Confirmation */}
      {step === 'confirm' && (
        <div className="space-y-6">
          <div className="bg-gray-50 rounded-xl p-4">
            <h4 className="font-medium text-gray-800 mb-3">Récapitulatif du paiement</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Service:</span>
                <span className="font-medium">{availableProviders.find(p => p.id === selectedProvider)?.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Numéro:</span>
                <span className="font-medium">{phoneNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Montant:</span>
                <span className="font-medium">{formatAmount(amount)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Frais:</span>
                <span className="font-medium">
                  {formatAmount(mobileMoneyService.calculateFees(selectedProvider, amount).fees)}
                </span>
              </div>
              <hr className="my-2" />
              <div className="flex justify-between font-bold">
                <span>Total:</span>
                <span>{formatAmount(mobileMoneyService.calculateFees(selectedProvider, amount).total)}</span>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <div className="flex items-start space-x-3">
              <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
              <div className="text-sm text-blue-800">
                <p className="font-medium mb-1">Instructions de paiement :</p>
                <ol className="list-decimal list-inside space-y-1">
                  <li>Cliquez sur "Payer maintenant"</li>
                  <li>Vous recevrez un SMS de confirmation</li>
                  <li>Suivez les instructions sur votre téléphone</li>
                  <li>Entrez votre code PIN pour confirmer</li>
                </ol>
              </div>
            </div>
          </div>

          <div className="flex space-x-3">
            <button
              onClick={() => setStep('phone')}
              className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-xl hover:bg-gray-50 transition-colors"
            >
              Retour
            </button>
            <button
              onClick={handlePayment}
              disabled={isProcessing}
              className="flex-1 bg-primary-600 text-white py-3 rounded-xl hover:bg-primary-700 transition-colors font-medium disabled:opacity-50"
            >
              Payer maintenant
            </button>
          </div>
        </div>
      )}

      {/* Processing */}
      {step === 'processing' && (
        <div className="text-center py-8">
          <Loader2 className="h-12 w-12 text-primary-600 animate-spin mx-auto mb-4" />
          <h4 className="font-medium text-gray-800 mb-2">Traitement en cours...</h4>
          <p className="text-gray-600 text-sm mb-4">
            Vérifiez votre téléphone et suivez les instructions pour confirmer le paiement.
          </p>
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-3">
            <p className="text-yellow-800 text-sm">
              💡 Un SMS de confirmation a été envoyé au {phoneNumber}
            </p>
          </div>
        </div>
      )}

      {/* Success */}
      {step === 'success' && (
        <div className="text-center py-8">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h4 className="font-bold text-xl text-gray-800 mb-2">Paiement réussi !</h4>
          <p className="text-gray-600 mb-4">
            Votre paiement de {formatAmount(amount)} a été confirmé.
          </p>
          {transaction && (
            <div className="bg-green-50 border border-green-200 rounded-xl p-4">
              <p className="text-green-800 text-sm">
                <strong>Référence :</strong> {transaction.reference}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};