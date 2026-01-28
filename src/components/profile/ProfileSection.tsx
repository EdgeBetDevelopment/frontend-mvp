'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/context/AuthContext';
import authService from '@/services/auth';
import { GeneralInformation } from './GeneralInformation';
import { Subscription } from './Subscription';
import SecuritySettings from './SecuritySettings';
import PasswordSettings from './PasswordSettings';
import { userService } from '@/services/user';

export function ProfileSection() {
  const { refreshToken, setTokens } = useAuth();
  const searchParams = useSearchParams();

  const { data: user } = useQuery({
    queryKey: ['user'],
    queryFn: userService.getMe,
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
        } catch (error) {
          console.error('Failed to refresh token after subscription:', error);
        }
      }
    };

    handleTokenRefresh();
  }, [searchParams, refreshToken, setTokens]);

  return (
    <div className="space-y-6">
      <Subscription />
      <GeneralInformation />
      <PasswordSettings />
      {user && <SecuritySettings user={user} />}
    </div>
  );
}
