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
          const response = await authService.refreshToken(refreshToken);
          if (response.token) {
            setTokens({ accessToken: response.token });
          }
          qc.invalidateQueries({ queryKey: ['subscriptions'] });
          qc.invalidateQueries({ queryKey: ['user'] });

          const MAX_ATTEMPTS = 6;
          const DELAY_MS = 1500;
          let found = false;
          for (let i = 0; i < MAX_ATTEMPTS; i++) {
            const subscribed = await refreshSubscriptionStatus();
            if (subscribed) {
              found = true;
              break;
            }
            if (i < MAX_ATTEMPTS - 1) {
              await new Promise(resolve => setTimeout(resolve, DELAY_MS));
            }
          }
          if (found) {
            qc.removeQueries({ queryKey: ['pick-of-day'] });
            router.replace('/profile');
          }
        } catch (error) {
          console.error('Failed to refresh token after subscription:', error);
        }
      }
    };

    handleTokenRefresh();
  }, [searchParams, refreshToken, setTokens, qc, refreshSubscriptionStatus, router]);
}
