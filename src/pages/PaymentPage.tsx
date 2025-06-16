import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, CreditCard, Shield, Lock, CheckCircle } from 'lucide-react';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { paymentService } from '../services/paymentService';

const PaymentPage: React.FC = () => {
  const { bookingId } = useParams<{ bookingId: string }>();
  const navigate = useNavigate();
  
  const [isLoading, setIsLoading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [error, setError] = useState('');

  // Mock booking data
  const booking = {
    id: bookingId,
    trip: {
      origin: { city: 'Paris', country: 'France' },
      destination: { city: 'Dakar', country: 'Sénégal' },
      transporter: {
        name: 'Fatou Diallo',
        avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
        rating: 4.9,
      }
    },
    packageDetails: {
      weight: 3,
      description: 'Produits cosmétiques',
      value: 200,
    },
    totalPrice: 75,
    serviceTier: 'Standard',
  };

  const fees = paymentService.calculateFees(booking.totalPrice);

  const [paymentMethod, setPaymentMethod] = useState('card');
  const [cardDetails, setCardDetails] = useState({
    number: '',
    expiry: '',
    cvc: '',
    name: '',
  });

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsProcessing(true);

    try {
      // Create payment intent
      const paymentIntent = await paymentService.createPaymentIntent(fees.total);
      
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Confirm payment
      await paymentService.confirmPayment(paymentIntent.id, 'pm_card_visa');
      
      setPaymentSuccess(true);
      
      // Redirect to success page after a delay
      setTimeout(() => {
        navigate('/dashboard', { 
          state: { 
            message: 'Paiement effectué avec succès ! Votre réservation est confirmée.' 
          }
        });
      }, 2000);
      
    } catch (err) {
      setError('Erreur lors du paiement. Veuillez réessayer.');
    } finally {
      setIsProcessing(false);
    }
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  if (paymentSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Paiement réussi !
          </h1>
          
          <p className="text-gray-600 mb-6">
            Votre réservation a été confirmée. Vous allez être redirigé vers votre tableau de bord.
          </p>
          
          <div className="animate-spin w-6 h-6 border-2 border-primary-600 border-t-transparent rounded-full mx-auto"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center space-x-2 text-gray-600 hover:text-primary-600 transition-colors mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Retour</span>
          </button>

          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Paiement sécurisé
          </h1>
          <p className="text-gray-600">
            Finalisez votre réservation en toute sécurité
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Payment form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center space-x-2 mb-6">
                <Shield className="h-5 w-5 text-green-500" />
                <span className="text-sm text-gray-600">
                  Paiement sécurisé par SSL 256-bit
                </span>
              </div>

              <form onSubmit={handlePayment} className="space-y-6">
                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm">
                    {error}
                  </div>
                )}

                {/* Payment method selection */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    Méthode de paiement
                  </h3>
                  
                  <div className="space-y-3">
                    <label className="flex items-center p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="card"
                        checked={paymentMethod === 'card'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500"
                      />
                      <div className="ml-3 flex items-center space-x-3">
                        <CreditCard className="h-5 w-5 text-gray-400" />
                        <span className="font-medium text-gray-900">Carte bancaire</span>
                      </div>
                    </label>

                    <label className="flex items-center p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 opacity-50">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="paypal"
                        disabled
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500"
                      />
                      <div className="ml-3 flex items-center space-x-3">
                        <div className="w-5 h-5 bg-blue-600 rounded"></div>
                        <span className="font-medium text-gray-900">PayPal</span>
                        <span className="text-xs text-gray-500">(Bientôt disponible)</span>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Card details */}
                {paymentMethod === 'card' && (
                  <div className="space-y-4">
                    <h4 className="font-medium text-gray-900">Détails de la carte</h4>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Numéro de carte
                      </label>
                      <input
                        type="text"
                        required
                        maxLength={19}
                        value={cardDetails.number}
                        onChange={(e) => setCardDetails({
                          ...cardDetails,
                          number: formatCardNumber(e.target.value)
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                        placeholder="1234 5678 9012 3456"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Date d'expiration
                        </label>
                        <input
                          type="text"
                          required
                          maxLength={5}
                          value={cardDetails.expiry}
                          onChange={(e) => setCardDetails({
                            ...cardDetails,
                            expiry: formatExpiry(e.target.value)
                          })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                          placeholder="MM/AA"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          CVC
                        </label>
                        <input
                          type="text"
                          required
                          maxLength={4}
                          value={cardDetails.cvc}
                          onChange={(e) => setCardDetails({
                            ...cardDetails,
                            cvc: e.target.value.replace(/\D/g, '')
                          })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                          placeholder="123"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Nom sur la carte
                      </label>
                      <input
                        type="text"
                        required
                        value={cardDetails.name}
                        onChange={(e) => setCardDetails({
                          ...cardDetails,
                          name: e.target.value
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                        placeholder="Jean Dupont"
                      />
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full bg-primary-600 text-white py-3 rounded-md hover:bg-primary-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {isProcessing ? (
                    <>
                      <LoadingSpinner size="sm" />
                      <span className="ml-2">Traitement en cours...</span>
                    </>
                  ) : (
                    <>
                      <Lock className="h-4 w-4 mr-2" />
                      Payer {fees.total}€
                    </>
                  )}
                </button>

                <div className="text-xs text-gray-500 text-center">
                  En cliquant sur "Payer", vous acceptez nos conditions d'utilisation
                  et notre politique de remboursement.
                </div>
              </form>
            </div>
          </div>

          {/* Order summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Récapitulatif
              </h3>

              {/* Trip info */}
              <div className="mb-6">
                <div className="flex items-center space-x-2 text-sm font-medium text-gray-900 mb-2">
                  <span>{booking.trip.origin.city}</span>
                  <span>→</span>
                  <span>{booking.trip.destination.city}</span>
                </div>
                
                <div className="flex items-center space-x-2 mb-3">
                  <img
                    src={booking.trip.transporter.avatar}
                    alt={booking.trip.transporter.name}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <div>
                    <div className="text-sm font-medium text-gray-900">
                      {booking.trip.transporter.name}
                    </div>
                    <div className="text-xs text-gray-500">
                      ⭐ {booking.trip.transporter.rating}
                    </div>
                  </div>
                </div>
              </div>

              {/* Package info */}
              <div className="mb-6 pb-6 border-b border-gray-200">
                <h4 className="font-medium text-gray-900 mb-2">Colis</h4>
                <div className="text-sm text-gray-600 space-y-1">
                  <div>Poids: {booking.packageDetails.weight}kg</div>
                  <div>Contenu: {booking.packageDetails.description}</div>
                  <div>Valeur: {booking.packageDetails.value}€</div>
                  <div>Service: {booking.serviceTier}</div>
                </div>
              </div>

              {/* Price breakdown */}
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Transport:</span>
                  <span>{booking.totalPrice}€</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Frais de service:</span>
                  <span>{fees.platformFee}€</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Frais de paiement:</span>
                  <span>{fees.processingFee}€</span>
                </div>
                
                <hr className="my-3" />
                
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total:</span>
                  <span>{fees.total}€</span>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Shield className="h-4 w-4 text-green-500" />
                  <span>Paiement 100% sécurisé</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600 mt-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Remboursement garanti</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;