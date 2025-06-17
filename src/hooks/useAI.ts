import { useState, useEffect } from 'react';
import { aiService } from '../services/aiService';

// Hook pour l'IA de pricing
export const useAIPricing = (params: any) => {
  const [pricing, setPricing] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (params.origin && params.destination) {
      setLoading(true);
      
      // Simuler un appel IA
      setTimeout(() => {
        const result = aiService.calculateUltraSophisticatedPricing(params);
        setPricing(result);
        setLoading(false);
      }, 1000);
    }
  }, [params.origin, params.destination, params.transporterRating]);

  return { pricing, loading };
};

// Hook pour la compatibilité IA
export const useAICompatibility = (transporter: any, sender: any, packageInfo: any) => {
  const [compatibility, setCompatibility] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (transporter && sender && packageInfo) {
      setLoading(true);
      
      setTimeout(() => {
        const result = aiService.calculateUltraCompatibilityScore(transporter, sender, packageInfo);
        setCompatibility(result);
        setLoading(false);
      }, 800);
    }
  }, [transporter?.id, sender?.id, packageInfo?.type]);

  return { compatibility, loading };
};

// Hook pour la détection de contournement
export const useAIBypassDetection = () => {
  const [detection, setDetection] = useState<any>(null);

  const analyzeMessage = (message: string, context: any) => {
    const result = aiService.detectContactAttempts(message, context);
    setDetection(result);
    return result;
  };

  return { detection, analyzeMessage };
};

// Hook pour la recherche intelligente
export const useAISearch = () => {
  const [results, setResults] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const search = (query: string, userProfile: any) => {
    setLoading(true);
    
    setTimeout(() => {
      const result = aiService.ultraIntelligentSearch(query, userProfile);
      setResults(result);
      setLoading(false);
    }, 1200);
  };

  return { results, loading, search };
};

// Hook pour la personnalisation
export const useAIPersonalization = (userId: string) => {
  const [personalization, setPersonalization] = useState<any>(null);

  useEffect(() => {
    if (userId) {
      const context = {
        device: /Mobile|Android|iPhone|iPad/.test(navigator.userAgent) ? 'mobile' : 'desktop',
        location: 'France', // Serait détecté via géolocalisation
        timestamp: new Date()
      };
      
      const result = aiService.personalizeUserExperience(userId, context);
      setPersonalization(result);
    }
  }, [userId]);

  return { personalization };
};

// Hook pour l'analyse comportementale
export const useAIBehaviorAnalysis = (userId: string) => {
  const [analysis, setAnalysis] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const analyzeBehavior = (historicalData: any[]) => {
    setLoading(true);
    
    setTimeout(() => {
      const result = aiService.predictUserBehavior(userId, historicalData);
      setAnalysis(result);
      setLoading(false);
    }, 1500);
  };

  return { analysis, loading, analyzeBehavior };
};