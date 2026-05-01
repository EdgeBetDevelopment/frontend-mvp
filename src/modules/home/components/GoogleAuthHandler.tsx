'use client';

import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import authService from '@/modules/auth/services';
import { useAuth } from '@/modules/auth/store';

export default function GoogleAuthHandler() {
  const router = useRouter();
  const { setTokens } = useAuth();
  const didRun = useRef(false);

  useEffect(() => {
    if (didRun.current) return;

    const hash = window.location.hash.substring(1);
    if (!hash) return;

    const params = new URLSearchParams(hash);
    const idToken = params.get('id_token');
    const error = params.get('error');

    if (!idToken && !error) return;

    didRun.current = true;

    history.replaceState(null, '', window.location.pathname);

    if (error || !idToken) {
      toast.error('Google sign-in was cancelled or failed');
      return;
    }

    authService
      .loginGoogle({ token: idToken })
      .then((data) => {
        setTokens({
          accessToken: data.access_token,
          refreshToken: data.refresh_token,
          isAdmin: data.is_admin,
          isSuperAdmin: data.is_super_admin,
        });
        toast.success('Logged in with Google!');
      })
      .catch((err: unknown) => {
        const e = err as { response?: { data?: { message?: string } } };
        toast.error(e?.response?.data?.message || 'Google login failed');
      });
  }, [router, setTokens]);

  return null;
}
