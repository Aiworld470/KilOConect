// Service de notifications pour KiloConnect
// Gestion des notifications push, email et SMS

export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  data?: any;
  read: boolean;
  createdAt: Date;
  expiresAt?: Date;
}

export type NotificationType = 
  | 'booking_request'
  | 'booking_accepted'
  | 'booking_rejected'
  | 'payment_received'
  | 'trip_reminder'
  | 'message_received'
  | 'review_received'
  | 'verification_complete'
  | 'system_alert';

export interface NotificationPreferences {
  email: {
    bookings: boolean;
    messages: boolean;
    marketing: boolean;
  };
  push: {
    bookings: boolean;
    messages: boolean;
  };
  sms: {
    important: boolean;
  };
}

class NotificationService {
  private notifications: Notification[] = [];

  // Créer une nouvelle notification
  async createNotification(
    userId: string,
    type: NotificationType,
    title: string,
    message: string,
    data?: any
  ): Promise<Notification> {
    const notification: Notification = {
      id: Math.random().toString(36).substr(2, 9),
      userId,
      type,
      title,
      message,
      data,
      read: false,
      createdAt: new Date(),
    };

    this.notifications.push(notification);
    
    // Envoyer la notification selon les préférences
    await this.sendNotification(notification);
    
    return notification;
  }

  // Envoyer la notification via les canaux appropriés
  private async sendNotification(notification: Notification): Promise<void> {
    const preferences = await this.getUserPreferences(notification.userId);
    
    // Push notification
    if (this.shouldSendPush(notification.type, preferences)) {
      await this.sendPushNotification(notification);
    }
    
    // Email notification
    if (this.shouldSendEmail(notification.type, preferences)) {
      await this.sendEmailNotification(notification);
    }
    
    // SMS notification
    if (this.shouldSendSMS(notification.type, preferences)) {
      await this.sendSMSNotification(notification);
    }
  }

  // Push notification
  private async sendPushNotification(notification: Notification): Promise<void> {
    // Intégration avec service push (Firebase, OneSignal, etc.)
    console.log('Sending push notification:', notification);
    
    // Exemple avec Web Push API
    if ('serviceWorker' in navigator && 'PushManager' in window) {
      try {
        const registration = await navigator.serviceWorker.ready;
        await registration.showNotification(notification.title, {
          body: notification.message,
          icon: '/icon-192x192.png',
          badge: '/badge-72x72.png',
          data: notification.data,
          actions: [
            {
              action: 'view',
              title: 'Voir',
              icon: '/icons/view.png'
            },
            {
              action: 'dismiss',
              title: 'Ignorer',
              icon: '/icons/dismiss.png'
            }
          ]
        });
      } catch (error) {
        console.error('Error sending push notification:', error);
      }
    }
  }

  // Email notification
  private async sendEmailNotification(notification: Notification): Promise<void> {
    // Intégration avec service email (SendGrid, Mailgun, etc.)
    console.log('Sending email notification:', notification);
    
    const emailData = {
      to: await this.getUserEmail(notification.userId),
      subject: notification.title,
      html: this.generateEmailTemplate(notification),
    };
    
    // Simuler l'envoi d'email
    await new Promise(resolve => setTimeout(resolve, 500));
  }

  // SMS notification
  private async sendSMSNotification(notification: Notification): Promise<void> {
    // Intégration avec service SMS (Twilio, etc.)
    console.log('Sending SMS notification:', notification);
    
    const smsData = {
      to: await this.getUserPhone(notification.userId),
      message: `${notification.title}: ${notification.message}`,
    };
    
    // Simuler l'envoi de SMS
    await new Promise(resolve => setTimeout(resolve, 500));
  }

  // Récupérer les notifications d'un utilisateur
  async getUserNotifications(userId: string, limit = 20): Promise<Notification[]> {
    return this.notifications
      .filter(n => n.userId === userId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice(0, limit);
  }

  // Marquer une notification comme lue
  async markAsRead(notificationId: string): Promise<void> {
    const notification = this.notifications.find(n => n.id === notificationId);
    if (notification) {
      notification.read = true;
    }
  }

  // Marquer toutes les notifications comme lues
  async markAllAsRead(userId: string): Promise<void> {
    this.notifications
      .filter(n => n.userId === userId)
      .forEach(n => n.read = true);
  }

  // Supprimer une notification
  async deleteNotification(notificationId: string): Promise<void> {
    const index = this.notifications.findIndex(n => n.id === notificationId);
    if (index > -1) {
      this.notifications.splice(index, 1);
    }
  }

  // Compter les notifications non lues
  async getUnreadCount(userId: string): Promise<number> {
    return this.notifications.filter(n => n.userId === userId && !n.read).length;
  }

  // Préférences utilisateur
  async getUserPreferences(userId: string): Promise<NotificationPreferences> {
    // Mock preferences - en réalité, récupéré depuis la base de données
    return {
      email: {
        bookings: true,
        messages: true,
        marketing: false,
      },
      push: {
        bookings: true,
        messages: true,
      },
      sms: {
        important: true,
      },
    };
  }

  async updateUserPreferences(
    userId: string, 
    preferences: NotificationPreferences
  ): Promise<void> {
    // Sauvegarder en base de données
    console.log('Updating notification preferences for user:', userId, preferences);
  }

  // Logique de décision pour l'envoi
  private shouldSendPush(type: NotificationType, preferences: NotificationPreferences): boolean {
    switch (type) {
      case 'booking_request':
      case 'booking_accepted':
      case 'booking_rejected':
      case 'payment_received':
        return preferences.push.bookings;
      case 'message_received':
        return preferences.push.messages;
      default:
        return true; // Notifications système toujours envoyées
    }
  }

  private shouldSendEmail(type: NotificationType, preferences: NotificationPreferences): boolean {
    switch (type) {
      case 'booking_request':
      case 'booking_accepted':
      case 'booking_rejected':
      case 'payment_received':
        return preferences.email.bookings;
      case 'message_received':
        return preferences.email.messages;
      default:
        return false;
    }
  }

  private shouldSendSMS(type: NotificationType, preferences: NotificationPreferences): boolean {
    const importantTypes: NotificationType[] = [
      'booking_accepted',
      'payment_received',
      'verification_complete',
      'system_alert'
    ];
    
    return preferences.sms.important && importantTypes.includes(type);
  }

  // Helpers
  private async getUserEmail(userId: string): Promise<string> {
    // Récupérer l'email depuis la base de données
    return 'user@example.com';
  }

  private async getUserPhone(userId: string): Promise<string> {
    // Récupérer le téléphone depuis la base de données
    return '+33123456789';
  }

  private generateEmailTemplate(notification: Notification): string {
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>${notification.title}</title>
        </head>
        <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #00AFF0 0%, #0084C7 100%); padding: 20px; text-align: center;">
            <h1 style="color: white; margin: 0;">KiloConnect</h1>
          </div>
          <div style="padding: 20px;">
            <h2 style="color: #333;">${notification.title}</h2>
            <p style="color: #666; line-height: 1.6;">${notification.message}</p>
            <div style="text-align: center; margin-top: 30px;">
              <a href="${process.env.VITE_APP_URL}" style="background: #00AFF0; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px;">
                Voir sur KiloConnect
              </a>
            </div>
          </div>
          <div style="background: #f8f9fa; padding: 20px; text-align: center; color: #666; font-size: 12px;">
            <p>Vous recevez cet email car vous êtes inscrit sur KiloConnect.</p>
            <p><a href="${process.env.VITE_APP_URL}/settings">Gérer mes préférences</a></p>
          </div>
        </body>
      </html>
    `;
  }

  // Notifications prédéfinies pour les événements courants
  async notifyBookingRequest(transporterId: string, senderName: string, route: string): Promise<void> {
    await this.createNotification(
      transporterId,
      'booking_request',
      'Nouvelle demande de réservation',
      `${senderName} souhaite réserver un espace sur votre trajet ${route}`,
      { route, senderName }
    );
  }

  async notifyBookingAccepted(senderId: string, transporterName: string, route: string): Promise<void> {
    await this.createNotification(
      senderId,
      'booking_accepted',
      'Réservation acceptée !',
      `${transporterName} a accepté votre demande pour le trajet ${route}`,
      { route, transporterName }
    );
  }

  async notifyPaymentReceived(transporterId: string, amount: number, route: string): Promise<void> {
    await this.createNotification(
      transporterId,
      'payment_received',
      'Paiement reçu',
      `Vous avez reçu un paiement de ${amount}€ pour le trajet ${route}`,
      { amount, route }
    );
  }

  async notifyNewMessage(userId: string, senderName: string): Promise<void> {
    await this.createNotification(
      userId,
      'message_received',
      'Nouveau message',
      `${senderName} vous a envoyé un message`,
      { senderName }
    );
  }
}

export const notificationService = new NotificationService();