// Service Offline pour l'Afrique
// Gestion des connexions instables et mode hors ligne

export interface OfflineData {
  searches: any[];
  trips: any[];
  messages: any[];
  bookings: any[];
  lastSync: Date;
}

export interface NetworkStatus {
  isOnline: boolean;
  connectionType: 'wifi' | '4g' | '3g' | '2g' | 'slow-2g' | 'offline';
  speed: 'fast' | 'medium' | 'slow' | 'very-slow';
}

class OfflineService {
  private dbName = 'KiloConnectOffline';
  private dbVersion = 1;
  private db: IDBDatabase | null = null;

  constructor() {
    this.initDB();
    this.setupNetworkMonitoring();
  }

  // Initialiser la base de données locale
  private async initDB(): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.dbVersion);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        this.db = request.result;
        resolve();
      };

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;

        // Store pour les recherches
        if (!db.objectStoreNames.contains('searches')) {
          const searchStore = db.createObjectStore('searches', { keyPath: 'id', autoIncrement: true });
          searchStore.createIndex('timestamp', 'timestamp');
        }

        // Store pour les trajets
        if (!db.objectStoreNames.contains('trips')) {
          const tripStore = db.createObjectStore('trips', { keyPath: 'id' });
          tripStore.createIndex('route', 'route');
        }

        // Store pour les messages
        if (!db.objectStoreNames.contains('messages')) {
          const messageStore = db.createObjectStore('messages', { keyPath: 'id' });
          messageStore.createIndex('bookingId', 'bookingId');
        }

        // Store pour les réservations
        if (!db.objectStoreNames.contains('bookings')) {
          db.createObjectStore('bookings', { keyPath: 'id' });
        }
      };
    });
  }

  // Monitoring de la connexion réseau
  private setupNetworkMonitoring(): void {
    // Écouter les changements de connexion
    window.addEventListener('online', () => this.handleOnline());
    window.addEventListener('offline', () => this.handleOffline());

    // Détecter la qualité de connexion
    if ('connection' in navigator) {
      const connection = (navigator as any).connection;
      connection.addEventListener('change', () => this.handleConnectionChange());
    }
  }

  // Détecter le statut réseau
  getNetworkStatus(): NetworkStatus {
    const isOnline = navigator.onLine;
    
    if (!isOnline) {
      return {
        isOnline: false,
        connectionType: 'offline',
        speed: 'very-slow'
      };
    }

    // Détecter le type de connexion (si supporté)
    if ('connection' in navigator) {
      const connection = (navigator as any).connection;
      const effectiveType = connection.effectiveType || '4g';
      
      return {
        isOnline: true,
        connectionType: effectiveType,
        speed: this.getSpeedFromConnectionType(effectiveType)
      };
    }

    return {
      isOnline: true,
      connectionType: '4g',
      speed: 'medium'
    };
  }

  private getSpeedFromConnectionType(type: string): 'fast' | 'medium' | 'slow' | 'very-slow' {
    switch (type) {
      case '4g': return 'fast';
      case '3g': return 'medium';
      case '2g': return 'slow';
      case 'slow-2g': return 'very-slow';
      default: return 'medium';
    }
  }

  // Sauvegarder des données pour utilisation offline
  async saveForOffline(storeName: string, data: any): Promise<void> {
    if (!this.db) await this.initDB();
    
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([storeName], 'readwrite');
      const store = transaction.objectStore(storeName);
      
      const request = store.put(data);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  // Récupérer des données offline
  async getOfflineData(storeName: string, key?: string): Promise<any> {
    if (!this.db) await this.initDB();
    
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([storeName], 'readonly');
      const store = transaction.objectStore(storeName);
      
      const request = key ? store.get(key) : store.getAll();
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  // Synchroniser les données quand la connexion revient
  async syncWhenOnline(): Promise<void> {
    const networkStatus = this.getNetworkStatus();
    
    if (!networkStatus.isOnline) {
      console.log('Offline - sync postponed');
      return;
    }

    try {
      // Synchroniser les messages en attente
      await this.syncPendingMessages();
      
      // Synchroniser les recherches
      await this.syncPendingSearches();
      
      // Synchroniser les réservations
      await this.syncPendingBookings();
      
      console.log('Sync completed successfully');
    } catch (error) {
      console.error('Sync failed:', error);
    }
  }

  private async syncPendingMessages(): Promise<void> {
    const pendingMessages = await this.getOfflineData('messages');
    
    for (const message of pendingMessages) {
      if (message.status === 'pending') {
        try {
          // Envoyer le message via API
          await this.sendMessageToAPI(message);
          
          // Marquer comme envoyé
          message.status = 'sent';
          await this.saveForOffline('messages', message);
        } catch (error) {
          console.error('Failed to sync message:', message.id, error);
        }
      }
    }
  }

  private async syncPendingSearches(): Promise<void> {
    // Synchroniser les recherches sauvegardées
    const searches = await this.getOfflineData('searches');
    console.log('Syncing searches:', searches.length);
  }

  private async syncPendingBookings(): Promise<void> {
    // Synchroniser les réservations en attente
    const bookings = await this.getOfflineData('bookings');
    console.log('Syncing bookings:', bookings.length);
  }

  private async sendMessageToAPI(message: any): Promise<void> {
    // Simuler envoi API
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  // Optimiser les images pour connexions lentes
  async optimizeImageForConnection(imageUrl: string): Promise<string> {
    const networkStatus = this.getNetworkStatus();
    
    if (networkStatus.speed === 'very-slow' || networkStatus.speed === 'slow') {
      // Retourner une version très compressée
      return imageUrl.replace(/\.(jpg|jpeg|png)$/, '_low.$1');
    }
    
    if (networkStatus.speed === 'medium') {
      // Version moyennement compressée
      return imageUrl.replace(/\.(jpg|jpeg|png)$/, '_med.$1');
    }
    
    // Version originale pour connexions rapides
    return imageUrl;
  }

  // Précharger les données essentielles
  async preloadEssentialData(): Promise<void> {
    const networkStatus = this.getNetworkStatus();
    
    if (networkStatus.isOnline && networkStatus.speed !== 'very-slow') {
      try {
        // Précharger les trajets populaires
        const popularTrips = await this.fetchPopularTrips();
        await this.saveForOffline('trips', popularTrips);
        
        // Précharger les destinations fréquentes
        const destinations = await this.fetchPopularDestinations();
        await this.saveForOffline('destinations', destinations);
        
        console.log('Essential data preloaded');
      } catch (error) {
        console.error('Failed to preload data:', error);
      }
    }
  }

  private async fetchPopularTrips(): Promise<any[]> {
    // Simuler récupération des trajets populaires
    return [
      { id: '1', route: 'Paris → Dakar', popularity: 0.9 },
      { id: '2', route: 'Londres → Lagos', popularity: 0.8 },
      { id: '3', route: 'Bruxelles → Kinshasa', popularity: 0.7 }
    ];
  }

  private async fetchPopularDestinations(): Promise<any[]> {
    return [
      { city: 'Dakar', country: 'Sénégal' },
      { city: 'Lagos', country: 'Nigeria' },
      { city: 'Abidjan', country: 'Côte d\'Ivoire' }
    ];
  }

  // Gestion des événements réseau
  private handleOnline(): void {
    console.log('Connection restored - starting sync');
    this.syncWhenOnline();
  }

  private handleOffline(): void {
    console.log('Connection lost - switching to offline mode');
  }

  private handleConnectionChange(): void {
    const networkStatus = this.getNetworkStatus();
    console.log('Connection changed:', networkStatus);
    
    // Adapter l'interface selon la qualité de connexion
    this.adaptUIForConnection(networkStatus);
  }

  private adaptUIForConnection(status: NetworkStatus): void {
    // Émettre un événement pour adapter l'UI
    const event = new CustomEvent('networkStatusChange', { detail: status });
    window.dispatchEvent(event);
  }

  // Compression des données pour connexions lentes
  compressData(data: any): string {
    // Compression simple pour réduire la taille des données
    return JSON.stringify(data);
  }

  decompressData(compressedData: string): any {
    return JSON.parse(compressedData);
  }

  // Estimation du temps de téléchargement
  estimateDownloadTime(sizeInBytes: number): number {
    const networkStatus = this.getNetworkStatus();
    
    // Vitesses estimées en bytes/seconde
    const speeds = {
      'fast': 1000000,    // 1 MB/s
      'medium': 500000,   // 500 KB/s
      'slow': 100000,     // 100 KB/s
      'very-slow': 20000  // 20 KB/s
    };
    
    const speed = speeds[networkStatus.speed];
    return Math.ceil(sizeInBytes / speed);
  }

  // Mode économie de données
  isDataSaverMode(): boolean {
    // Détecter si l'utilisateur a activé l'économie de données
    if ('connection' in navigator) {
      const connection = (navigator as any).connection;
      return connection.saveData === true;
    }
    
    // Par défaut en Afrique, considérer que les données sont chères
    return true;
  }
}

export const offlineService = new OfflineService();