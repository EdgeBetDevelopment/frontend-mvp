'use client';

import { useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import { useAuth, authService } from '@/modules/auth';

export function usePostPaymentSync() {
  const { refreshToken, setTokens, refreshSubscriptionStatus } = useAuth();
  const searchParams = useSearchParams();
  const qc = useQueryClient();
  const router = useRouter();

  useEffect(() => {
    const handleTokenRefresh = async () => {
      const success = searchParams.get('success');
      const sessionId = searchParams.get('session_id');

      if ((success === 'true' || sessionId) && refreshToken) {
        try {
          const MAX_ATTEMPTS = 6;
          const DELAY_MS = 1500;

          for (let i = 0; i < MAX_ATTEMPTS; i++) {
            // Refresh token on each attempt — backend may encode subscription in JWT claims
            const response = await authService.refreshToken(refreshToken);
            if (response.token) {
              setTokens({ accessToken: response.token });
            }

            const subscribed = await refreshSubscriptionStatus();
            if (subscribed) {
              qc.invalidateQueries({ queryKey: ['subscriptions'] });
              qc.invalidateQueries({ queryKey: ['user'] });
              qc.removeQueries({ queryKey: ['pick-of-day'] });
              router.replace('/profile');
              return;
            }

            if (i < MAX_ATTEMPTS - 1) {
              await new Promise(resolve => setTimeout(resolve, DELAY_MS));
            }
          }

          router.replace('/profile');
        } catch (error) {
          console.error('Failed to refresh token after subscription:', error);
        }
      }
    };

    handleTokenRefresh();
  }, [searchParams, refreshToken, setTokens, qc, refreshSubscriptionStatus, router]);
}
