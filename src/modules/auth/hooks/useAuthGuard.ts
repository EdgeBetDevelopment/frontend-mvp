"use client";

import { useCallback } from "react";
import { useAuth } from "@/context/AuthContext";

interface UseAuthGuardOptions {
  onUnauthenticated?: () => void;
}

export const useAuthGuard = (options: UseAuthGuardOptions = {}) => {
  const { isAuthenticated } = useAuth();
  const { onUnauthenticated } = options;

  const requireAuth = useCallback((): boolean => {
    if (!isAuthenticated) {
      onUnauthenticated?.();
      return false;
    }
    return true;
  }, [isAuthenticated, onUnauthenticated]);

  const withAuth = useCallback(
    <T extends (...args: unknown[]) => unknown>(action: T) => {
      return (...args: Parameters<T>) => {
        if (!isAuthenticated) {
          onUnauthenticated?.();
          return;
        }
        return action(...args);
      };
    },
    [isAuthenticated, onUnauthenticated],
  );

  return {
    isAuthenticated,
    requireAuth,
    withAuth,
  };
};
