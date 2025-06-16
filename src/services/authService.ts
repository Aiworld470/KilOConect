// Mock authentication service - to be replaced with real API calls

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  phone?: string;
}

class AuthService {
  async login(credentials: LoginCredentials) {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock validation
    if (credentials.email && credentials.password) {
      return {
        success: true,
        token: 'mock-jwt-token',
        user: {
          id: '1',
          email: credentials.email,
          name: 'User Name',
        }
      };
    }
    
    throw new Error('Invalid credentials');
  }

  async register(data: RegisterData) {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return {
      success: true,
      token: 'mock-jwt-token',
      user: {
        id: Math.random().toString(36).substr(2, 9),
        ...data,
      }
    };
  }

  async logout() {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    localStorage.removeItem('kiloconnect_token');
    return { success: true };
  }

  async refreshToken() {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    return { token: 'refreshed-mock-jwt-token' };
  }

  getStoredToken(): string | null {
    return localStorage.getItem('kiloconnect_token');
  }

  storeToken(token: string): void {
    localStorage.setItem('kiloconnect_token', token);
  }
}

export const authService = new AuthService();