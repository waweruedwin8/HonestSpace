import React, { createContext, useContext, useEffect, useState } from 'react';
import { apiClient } from '@/lib/api';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  userType: 'tenant' | 'landlord' | 'scout' | 'admin';
  profileImage?: string;
  isVerified: boolean;
  createdAt: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string, userType?: 'tenant' | 'landlord') => Promise<{ error?: string }>;
  register: (userData: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phone: string;
    userType: 'tenant' | 'landlord';
  }) => Promise<{ error?: string }>;
  googleLogin: (token: string, userType?: 'tenant' | 'landlord') => Promise<{ error?: string }>;
  logout: () => Promise<void>;
  refreshAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Initialize auth state
  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem('auth_token');
      const refreshToken = localStorage.getItem('refresh_token');

      if (token) {
        try {
          // Try to get user profile with existing token
          const response = await apiClient.getProfile();
          setUser(response.data);
          setIsAuthenticated(true);
        } catch (error) {
          // Token might be expired, try refresh
          if (refreshToken) {
            try {
              const refreshResponse = await apiClient.refreshToken(refreshToken);
              apiClient.setToken(refreshResponse.data.access);
              
              // Get profile with new token
              const profileResponse = await apiClient.getProfile();
              setUser(profileResponse.data);
              setIsAuthenticated(true);
            } catch (refreshError) {
              // Refresh failed, clear auth state
              await clearAuthState();
            }
          } else {
            await clearAuthState();
          }
        }
      }
      setIsLoading(false);
    };

    initializeAuth();
  }, []);

  const clearAuthState = async () => {
    setUser(null);
    setIsAuthenticated(false);
    apiClient.setToken(null);
    localStorage.removeItem('auth_token');
    localStorage.removeItem('refresh_token');
  };

  const login = async (
    email: string, 
    password: string, 
    userType: 'tenant' | 'landlord' = 'tenant'
  ): Promise<{ error?: string }> => {
    try {
      setIsLoading(true);
      const response = await apiClient.login(email, password, userType);
      
      apiClient.setToken(response.data.access);
      localStorage.setItem('refresh_token', response.data.refresh);
      
      setUser(response.data.user);
      setIsAuthenticated(true);
      
      return {};
    } catch (error) {
      console.error('Login error:', error);
      return { error: error instanceof Error ? error.message : 'Login failed' };
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phone: string;
    userType: 'tenant' | 'landlord';
  }): Promise<{ error?: string }> => {
    try {
      setIsLoading(true);
      const response = await apiClient.register(userData);
      
      apiClient.setToken(response.data.access);
      localStorage.setItem('refresh_token', response.data.refresh);
      
      setUser(response.data.user);
      setIsAuthenticated(true);
      
      return {};
    } catch (error) {
      console.error('Registration error:', error);
      return { error: error instanceof Error ? error.message : 'Registration failed' };
    } finally {
      setIsLoading(false);
    }
  };

  const googleLogin = async (
    token: string, 
    userType: 'tenant' | 'landlord' = 'tenant'
  ): Promise<{ error?: string }> => {
    try {
      setIsLoading(true);
      const response = await apiClient.googleLogin(token, userType);
      
      apiClient.setToken(response.data.access);
      localStorage.setItem('refresh_token', response.data.refresh);
      
      setUser(response.data.user);
      setIsAuthenticated(true);
      
      return {};
    } catch (error) {
      console.error('Google login error:', error);
      return { error: error instanceof Error ? error.message : 'Google login failed' };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    try {
      await apiClient.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      await clearAuthState();
    }
  };

  const refreshAuth = async (): Promise<void> => {
    const refreshToken = localStorage.getItem('refresh_token');
    if (refreshToken) {
      try {
        const response = await apiClient.refreshToken(refreshToken);
        apiClient.setToken(response.data.access);
        
        const profileResponse = await apiClient.getProfile();
        setUser(profileResponse.data);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Auth refresh error:', error);
        await clearAuthState();
      }
    }
  };

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated,
    login,
    register,
    googleLogin,
    logout,
    refreshAuth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};