'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';

interface AuthContextType {
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  setTokens: (tokens: { accessToken: string; refreshToken?: string }) => void;
  clearTokens: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setAccessToken(localStorage.getItem('accessToken'));
      setRefreshToken(localStorage.getItem('refreshToken'));
    }
  }, []);

  const setTokens = ({
    accessToken,
    refreshToken,
  }: {
    accessToken: string;
    refreshToken?: string;
  }) => {
    setAccessToken(accessToken);
    localStorage.setItem('accessToken', accessToken);

    if (refreshToken) {
      setRefreshToken(refreshToken);
      localStorage.setItem('refreshToken', refreshToken);
    }
  };

  const clearTokens = () => {
    setAccessToken(null);
    setRefreshToken(null);
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  };

  const isAuthenticated = useMemo(() => !!accessToken, [accessToken]);

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        refreshToken,
        isAuthenticated,
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
