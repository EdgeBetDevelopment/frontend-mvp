'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import authService from '@/modules/auth/services';
import { useAuth } from '@/modules/auth/store';
import Loader from '@/shared/components/loader';

const GoogleCallbackPage = () => {
  const router = useRouter();
  const { setTokens } = useAuth();

  const { mutate: loginGoogle } = useMutation({
    mutationFn: (body: { token: string }) => authService.loginGoogle(body),
    onSuccess: (data) => {
      setTokens({
        accessToken: data.access_token,
        refreshToken: data.refresh_token,
        isAdmin: data.is_admin,
        isSuperAdmin: data.is_super_admin,
      });

      toast.success('Logged in with Google!');
      router.replace('/');
    },
    onError: (error: unknown) => {
      const err = error as { response?: { data?: { message?: string } } };
      toast.error(err?.response?.data?.message || 'Google login failed');
      router.replace('/login');
    },
  });

  useEffect(() => {
    const hash = window.location.hash.substring(1);
    const params = new URLSearchParams(hash);
    const idToken = params.get('id_token');
    const error = params.get('error');

    if (error) {
      toast.error('Google sign-in was cancelled or failed');
      router.replace('/login');
      return;
    }

    if (!idToken) {
      toast.error('No token received from Google');
      router.replace('/login');
      return;
    }

    loginGoogle({ token: idToken });
  }, [loginGoogle, router]);

  return (
    <div className="flex h-screen items-center justify-center">
      <Loader size="h-12 w-12" />
    </div>
  );
};

export default GoogleCallbackPage;
