'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { profileService } from '@/modules/profile/services';
import { useAuth } from '@/modules/auth/store';
import { ROUTES } from '@/shared/config/routes';

export function useDiscordConnect() {
  const [isLoading, setIsLoading] = useState(false);
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  const handleConnect = async () => {
    if (!isAuthenticated) {
      router.push(ROUTES.AUTH.LOGIN);
      return;
    }

    setIsLoading(true);
    try {
      const { url } = await profileService.getDiscordOAuthLink();
      window.location.href = url;
    } catch (e) {
      console.error('Discord OAuth link error:', e);
      setIsLoading(false);
    }
  };

  return { handleConnect, isLoading };
}
