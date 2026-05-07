'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';

import { userService } from '@/modules/profile/services';
import {
  hasPremiumSubscription,
  hasAnySubscription,
} from '@/modules/profile/types';

interface AuthContextType {
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isSuperAdmin: boolean;
  isPremium: boolean;
  isSubscribed: boolean;
  isPremiumLoading: boolean;
  isSubscriptionLoaded: boolean;
  isAuthLoading: boolean;
  setAuthLoading: (loading: boolean) => void;
  refreshSubscriptionStatus: () => Promise<boolean>;
  setTokens: (tokens: {
    accessToken: string;
    refreshToken?: string;
    isAdmin?: boolean;
    isSuperAdmin?: boolean;
  }) => void;
  clearTokens: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [isSuperAdmin, setIsSuperAdmin] = useState<boolean>(false);
  const [isPremium, setIsPremium] = useState<boolean>(false);
  const [isSubscribed, setIsSubscribed] = useState<boolean>(false);
  const [isPremiumLoading, setIsPremiumLoading] = useState<boolean>(false);
  const [isSubscriptionLoaded, setIsSubscriptionLoaded] =
    useState<boolean>(false);
  const [isAuthLoading, setAuthLoading] = useState<boolean>(false);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('accessToken');
      if (token) setIsPremiumLoading(true);
      setAccessToken(token);
      setRefreshToken(localStorage.getItem('refreshToken'));
      setIsAdmin(localStorage.getItem('isAdmin') === 'true');
      setIsSuperAdmin(localStorage.getItem('isSuperAdmin') === 'true');
      setIsInitialized(true);
    }
  }, []);

  useEffect(() => {
    const handleTokenRefreshed = (e: Event) => {
      const token = (e as CustomEvent<{ token: string }>).detail.token;
      setAccessToken(token);
      localStorage.setItem('accessToken', token);
    };

    const handleLogout = () => {
      clearTokens();
    };

    window.addEventListener('auth:tokenRefreshed', handleTokenRefreshed);
    window.addEventListener('auth:logout', handleLogout);

    return () => {
      window.removeEventListener('auth:tokenRefreshed', handleTokenRefreshed);
      window.removeEventListener('auth:logout', handleLogout);
    };
  }, []);

  useEffect(() => {
    if (!isInitialized) return;

    if (!accessToken) {
      setIsPremium(false);
      setIsSubscribed(false);
      setIsPremiumLoading(false);
      setIsSubscriptionLoaded(true);
      return;
    }
    setIsPremiumLoading(true);
    setIsSubscriptionLoaded(false);
    userService
      .getMe()
      .then((me) => {
        setIsPremium(hasPremiumSubscription(me?.subscriptions));
        setIsSubscribed(hasAnySubscription(me?.subscriptions));
        setIsSubscriptionLoaded(true);
      })
      .catch((error) => {
        setIsPremium(false);
        setIsSubscribed(false);
        if (error?.code === 401) {
          clearTokens();
        }
      })
      .finally(() => {
        setIsPremiumLoading(false);
      });
  }, [accessToken, isInitialized]);

  const refreshSubscriptionStatus = async (): Promise<boolean> => {
    if (!accessToken) return false;
    setIsPremiumLoading(true);
    setIsSubscriptionLoaded(false);
    try {
      const me = await userService.getMe();
      const premium = hasPremiumSubscription(me?.subscriptions);
      const subscribed = hasAnySubscription(me?.subscriptions);
      setIsPremium(premium);
      setIsSubscribed(subscribed);
      setIsSubscriptionLoaded(true);
      return subscribed;
    } catch {
      setIsPremium(false);
      setIsSubscribed(false);
      return false;
    } finally {
      setIsPremiumLoading(false);
    }
  };

  const setTokens = ({
    accessToken,
    refreshToken,
    isAdmin: admin,
    isSuperAdmin: superAdmin,
  }: {
    accessToken: string;
    refreshToken?: string;
    isAdmin?: boolean;
    isSuperAdmin?: boolean;
  }) => {
    setAccessToken(accessToken);
    setIsAdmin(admin || false);
    setIsSuperAdmin(superAdmin || false);
    if (typeof window !== 'undefined') {
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('isAdmin', String(admin || false));
      localStorage.setItem('isSuperAdmin', String(superAdmin || false));
      document.cookie = `accessToken=${accessToken}; path=/; SameSite=Lax; max-age=${60 * 60 * 24 * 7}`;

      if (refreshToken) {
        setRefreshToken(refreshToken);
        localStorage.setItem('refreshToken', refreshToken);
      }
    }
  };

  const clearTokens = () => {
    setAccessToken(null);
    setRefreshToken(null);
    setIsAdmin(false);
    setIsSuperAdmin(false);
    setIsPremium(false);
    setIsSubscribed(false);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('isAdmin');
      localStorage.removeItem('isSuperAdmin');
      document.cookie = 'accessToken=; path=/; max-age=0';
    }
  };

  const isAuthenticated = useMemo(() => !!accessToken, [accessToken]);

  if (!isInitialized) {
    return null;
  }

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        refreshToken,
        isAuthenticated,
        isAdmin,
        isSuperAdmin,
        isPremium,
        isSubscribed,
        isPremiumLoading,
        isSubscriptionLoaded,
        isAuthLoading,
        setAuthLoading,
        refreshSubscriptionStatus,
        setTokens,
        clearTokens,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
