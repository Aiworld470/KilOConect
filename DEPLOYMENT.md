# 🚀 **GUIDE DE DÉPLOIEMENT KILOCONNECT**

## 📋 **Prérequis**

### **Comptes Nécessaires**
- [ ] **Supabase** : Base de données + Auth
- [ ] **Stripe** : Paiements sécurisés
- [ ] **Netlify/Vercel** : Hébergement frontend
- [ ] **SendGrid/Mailgun** : Service email
- [ ] **Google Maps** : Géolocalisation (optionnel)

### **Variables d'Environnement**
Copier `.env.example` vers `.env` et remplir toutes les valeurs.

---

## 🗄️ **SETUP SUPABASE**

### **1. Création du Projet**
```bash
# Aller sur https://supabase.com
# Créer un nouveau projet
# Récupérer URL et ANON_KEY
```

### **2. Schema Base de Données**
```sql
-- Users (étend auth.users)
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  name TEXT NOT NULL,
  avatar_url TEXT,
  bio TEXT,
  phone TEXT,
  rating DECIMAL(2,1) DEFAULT 0,
  review_count INTEGER DEFAULT 0,
  verified_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Locations
CREATE TABLE public.locations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  city TEXT NOT NULL,
  country TEXT NOT NULL,
  country_code TEXT NOT NULL,
  coordinates POINT,
  airport TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Trips
CREATE TABLE public.trips (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  transporter_id UUID REFERENCES public.profiles(id) NOT NULL,
  origin_id UUID REFERENCES public.locations(id) NOT NULL,
  destination_id UUID REFERENCES public.locations(id) NOT NULL,
  departure_date TIMESTAMP NOT NULL,
  arrival_date TIMESTAMP,
  available_weight INTEGER NOT NULL,
  price_per_kg DECIMAL(10,2) NOT NULL,
  currency TEXT DEFAULT 'EUR',
  description TEXT,
  photos TEXT[],
  status TEXT DEFAULT 'active',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Bookings
CREATE TABLE public.bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  trip_id UUID REFERENCES public.trips(id) NOT NULL,
  sender_id UUID REFERENCES public.profiles(id) NOT NULL,
  package_weight DECIMAL(5,2) NOT NULL,
  package_description TEXT NOT NULL,
  package_value DECIMAL(10,2) NOT NULL,
  package_category TEXT NOT NULL,
  total_price DECIMAL(10,2) NOT NULL,
  status TEXT DEFAULT 'pending',
  payment_status TEXT DEFAULT 'pending',
  tracking_number TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Messages
CREATE TABLE public.messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id UUID REFERENCES public.bookings(id) NOT NULL,
  sender_id UUID REFERENCES public.profiles(id) NOT NULL,
  content TEXT NOT NULL,
  message_type TEXT DEFAULT 'text',
  read_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Reviews
CREATE TABLE public.reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id UUID REFERENCES public.bookings(id) NOT NULL,
  reviewer_id UUID REFERENCES public.profiles(id) NOT NULL,
  reviewee_id UUID REFERENCES public.profiles(id) NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### **3. Row Level Security (RLS)**
```sql
-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.trips ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Public profiles are viewable by everyone" 
ON public.profiles FOR SELECT USING (true);

CREATE POLICY "Users can update own profile" 
ON public.profiles FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Trips are viewable by everyone" 
ON public.trips FOR SELECT USING (true);

CREATE POLICY "Users can create trips" 
ON public.trips FOR INSERT WITH CHECK (auth.uid() = transporter_id);

-- Ajouter toutes les autres policies...
```

### **4. Storage pour Images**
```sql
-- Bucket pour avatars
INSERT INTO storage.buckets (id, name, public) VALUES ('avatars', 'avatars', true);

-- Bucket pour photos de trajets
INSERT INTO storage.buckets (id, name, public) VALUES ('trip-photos', 'trip-photos', true);

-- Policies storage
CREATE POLICY "Avatar images are publicly accessible" 
ON storage.objects FOR SELECT USING (bucket_id = 'avatars');

CREATE POLICY "Users can upload their own avatar" 
ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]);
```

---

## 💳 **SETUP STRIPE**

### **1. Configuration Stripe**
```bash
# Aller sur https://dashboard.stripe.com
# Récupérer les clés API (test puis production)
# Configurer les webhooks
```

### **2. Webhooks Stripe**
```javascript
// Endpoint: https://your-api.com/webhooks/stripe
// Events à écouter:
// - payment_intent.succeeded
// - payment_intent.payment_failed
// - charge.dispute.created

const handleStripeWebhook = async (event) => {
  switch (event.type) {
    case 'payment_intent.succeeded':
      // Marquer la réservation comme payée
      await updateBookingPaymentStatus(event.data.object.metadata.booking_id, 'paid');
      break;
    case 'payment_intent.payment_failed':
      // Marquer le paiement comme échoué
      await updateBookingPaymentStatus(event.data.object.metadata.booking_id, 'failed');
      break;
  }
};
```

---

## 📧 **SETUP EMAIL SERVICE**

### **SendGrid Configuration**
```javascript
// Installation
npm install @sendgrid/mail

// Configuration
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Templates email
const emailTemplates = {
  bookingConfirmation: 'd-xxxxx',
  paymentReceived: 'd-xxxxx',
  tripReminder: 'd-xxxxx',
};
```

---

## 🌐 **DÉPLOIEMENT FRONTEND**

### **Netlify**
```bash
# Build settings
Build command: npm run build
Publish directory: dist

# Environment variables dans Netlify UI
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_anon_key
VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_key
```

### **Vercel**
```json
// vercel.json
{
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": { "distDir": "dist" }
    }
  ],
  "routes": [
    { "handle": "filesystem" },
    { "src": "/.*", "dest": "/index.html" }
  ],
  "env": {
    "VITE_SUPABASE_URL": "@supabase_url",
    "VITE_SUPABASE_ANON_KEY": "@supabase_anon_key"
  }
}
```

---

## 🔧 **BACKEND API (Optionnel)**

### **Supabase Edge Functions**
```typescript
// supabase/functions/payment-webhook/index.ts
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

serve(async (req) => {
  const supabase = createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
  )

  // Traiter les webhooks Stripe
  const signature = req.headers.get('stripe-signature')
  const body = await req.text()
  
  // Vérifier la signature Stripe
  // Traiter l'événement
  
  return new Response('OK', { status: 200 })
})
```

---

## 📱 **NOTIFICATIONS PUSH**

### **Firebase Setup**
```bash
# Installation
npm install firebase

# Configuration
// firebase-config.js
import { initializeApp } from 'firebase/app';
import { getMessaging } from 'firebase/messaging';

const firebaseConfig = {
  // Votre config Firebase
};

const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);
```

### **Service Worker**
```javascript
// public/firebase-messaging-sw.js
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

firebase.initializeApp({
  // Votre config
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/icon-192x192.png'
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
```

---

## 🔍 **MONITORING & ANALYTICS**

### **Google Analytics 4**
```javascript
// Installation
npm install gtag

// Configuration
gtag('config', 'GA_MEASUREMENT_ID', {
  page_title: document.title,
  page_location: window.location.href
});

// Events tracking
gtag('event', 'booking_completed', {
  event_category: 'engagement',
  event_label: 'trip_booking',
  value: bookingAmount
});
```

### **Error Monitoring (Sentry)**
```bash
npm install @sentry/react @sentry/tracing

# Configuration
Sentry.init({
  dsn: "YOUR_SENTRY_DSN",
  integrations: [new BrowserTracing()],
  tracesSampleRate: 1.0,
});
```

---

## ✅ **CHECKLIST DÉPLOIEMENT**

### **Pre-Production**
- [ ] Tests unitaires passent
- [ ] Tests d'intégration OK
- [ ] Performance Lighthouse > 90
- [ ] Sécurité audit OK
- [ ] Backup base de données
- [ ] Variables d'environnement configurées

### **Production**
- [ ] DNS configuré
- [ ] SSL/HTTPS activé
- [ ] CDN configuré
- [ ] Monitoring activé
- [ ] Alertes configurées
- [ ] Documentation à jour

### **Post-Déploiement**
- [ ] Tests de fumée
- [ ] Vérification paiements
- [ ] Test notifications
- [ ] Monitoring erreurs
- [ ] Performance check

---

## 🚨 **ROLLBACK PLAN**

### **En cas de problème**
```bash
# Rollback Netlify
netlify sites:list
netlify api listSiteDeploys --site-id=SITE_ID
netlify api restoreSiteDeploy --site-id=SITE_ID --deploy-id=DEPLOY_ID

# Rollback Vercel
vercel --prod --force

# Rollback base de données
# Restaurer depuis backup automatique Supabase
```

---

## 📞 **SUPPORT POST-DÉPLOIEMENT**

### **Contacts Urgence**
- **DevOps Lead** : [email]
- **Backend Lead** : [email]  
- **Frontend Lead** : [email]

### **Monitoring URLs**
- **Status Page** : https://status.kiloconnect.com
- **Analytics** : https://analytics.google.com
- **Error Tracking** : https://sentry.io
- **Uptime** : https://uptimerobot.com

---

**🎯 OBJECTIF : DÉPLOIEMENT SANS DOWNTIME EN 2-3 SEMAINES !**