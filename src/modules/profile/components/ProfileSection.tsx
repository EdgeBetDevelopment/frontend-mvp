'use client';

import { useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useAuth, authService } from '@/modules/auth';
import { GeneralInformation } from './GeneralInformation';
import { Subscription } from './Subscription';
import SecuritySettings from './SecuritySettings';
import PasswordSettings from './PasswordSettings';
import { DiscordConnect } from './DiscordConnect';
import { userService } from '@/modules/profile/services';

export function ProfileSection() {
  const { refreshToken, setTokens, isAuthenticated, refreshSubscriptionStatus } = useAuth();
  const searchParams = useSearchParams();
  const qc = useQueryClient();
  const router = useRouter();

  const { data: user } = useQuery({
    queryKey: ['user'],
    queryFn: userService.getMe,
    enabled: isAuthenticated,
  });

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

  return (
    <div className="space-y-6">
      <Subscription />
      <GeneralInformation />
      <DiscordConnect discordUserId={user?.discord_user_id} />
      <PasswordSettings />
      {user && <SecuritySettings user={user} />}
    </div>
  );
}
