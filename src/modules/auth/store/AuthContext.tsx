"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

import { userService } from "@/modules/profile/services";
import { hasPremiumSubscription } from "@/modules/profile/types";

interface AuthContextType {
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isSuperAdmin: boolean;
  isPremium: boolean;
  isPremiumLoading: boolean;
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
  const [isPremiumLoading, setIsPremiumLoading] = useState<boolean>(false);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setAccessToken(localStorage.getItem("accessToken"));
      setRefreshToken(localStorage.getItem("refreshToken"));
      setIsAdmin(localStorage.getItem("isAdmin") === "true");
      setIsSuperAdmin(localStorage.getItem("isSuperAdmin") === "true");
      setIsInitialized(true);
    }
  }, []);

  useEffect(() => {
    if (!accessToken) {
      setIsPremium(false);
      setIsPremiumLoading(false);
      return;
    }
    setIsPremiumLoading(true);
    userService.getMe().then((me) => {
      setIsPremium(hasPremiumSubscription(me?.subscriptions));
    }).catch((error) => {
      setIsPremium(false);
      if (error?.code === 401) {
        clearTokens();
      }
    }).finally(() => {
      setIsPremiumLoading(false);
    });
  }, [accessToken]);

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
    if (typeof window !== "undefined") {
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("isAdmin", String(admin || false));
      localStorage.setItem("isSuperAdmin", String(superAdmin || false));
      document.cookie = `accessToken=${accessToken}; path=/; SameSite=Lax; max-age=${60 * 60 * 24 * 7}`;

      if (refreshToken) {
        setRefreshToken(refreshToken);
        localStorage.setItem("refreshToken", refreshToken);
      }
    }
  };

  const clearTokens = () => {
    setAccessToken(null);
    setRefreshToken(null);
    setIsAdmin(false);
    setIsSuperAdmin(false);
    setIsPremium(false);
    if (typeof window !== "undefined") {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("isAdmin");
      localStorage.removeItem("isSuperAdmin");
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
        isPremiumLoading,
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
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
