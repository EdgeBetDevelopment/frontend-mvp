'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { profileService } from '@/modules/profile/services';
import { useAuth } from '@/modules/auth/store';
import { ROUTES } from '@/shared/config/routes';

export function useDiscordConnect() {
  const [isLoading, setIsLoading] = useState(false);
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  // When the user presses Back from the Discord OAuth page, the browser restores
  // this page from bfcache with isLoading still frozen to true. Reset it.
  useEffect(() => {
    const handlePageShow = (event: PageTransitionEvent) => {
      if (event.persisted) {
        setIsLoading(false);
      }
    };
    window.addEventListener('pageshow', handlePageShow);
    return () => window.removeEventListener('pageshow', handlePageShow);
  }, []);

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
