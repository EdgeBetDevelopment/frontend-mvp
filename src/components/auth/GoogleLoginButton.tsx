import React, { useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { useAuth } from '@/context/AuthContext';
import authService from '@/services/auth';
import { Button } from '@/ui/button';
import Loader from '@/ui/loader';

import GoogleIcon from '@/assets/icons/google.svg';

declare global {
  interface Window {
    google: {
      accounts: {
        id: {
          initialize: (config: any) => void;
          prompt: (callback?: (notification: any) => void) => void;
          cancel: () => void;
        };
      };
    };
  }
}

const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

const GoogleLoginButton = ({
  text = 'Sign in with Google',
  onSuccess,
}: {
  text?: string;
  onSuccess?: () => void;
}) => {
  const { setTokens } = useAuth();

  const { mutate: loginGoogle, isPending } = useMutation({
    mutationFn: (body: { token: string }) => authService.loginGoogle(body),
    onSuccess: (data) => {
      setTokens({
        accessToken: data.access_token,
        refreshToken: data.refresh_token,
      });

      if (onSuccess) {
        onSuccess();
      }

      toast.success('Logged in with Google!');
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Google login failed');
      window.google?.accounts?.id?.cancel();
    },
  });

  useEffect(() => {
    if (!clientId) {
      console.error('Google Client ID is not configured');
      return;
    }

    initGoogle();
  }, [loginGoogle]);

  const initGoogle = () => {
    if (!clientId) {
      console.error('Google Client ID is not configured');
      return;
    }

    window.google.accounts.id.initialize({
      client_id: clientId,
      callback: (response: { credential: string }) => {
        if (response.credential) {
          loginGoogle({ token: response.credential });
        } else {
          toast.error('No credential received from Google');
        }
      },
      auto_select: false,
      cancel_on_tap_outside: true,
      ux_mode: 'popup',
      use_fedcm_for_prompt: true,
      button_auto_select: true,
    });
  };

  const handleGoogleLogin = () => {
    try {
      window.google.accounts.id.prompt();
    } catch (error) {
      console.error('Error during Google Sign-In:', error);
      toast.error('An error occurred during Google Sign-In. Please try again.');
    }
  };

  return (
    <Button
      onClick={handleGoogleLogin}
      disabled={isPending}
      className="auth-button bg-surface-secondary w-full items-center justify-center gap-2 rounded-xl p-4 transition-all duration-200 hover:opacity-90"
    >
      {isPending ? (
        <Loader size="h-8 w-8" />
      ) : (
        <>
          <GoogleIcon />
          <p className="text-center align-middle text-2xl font-bold tracking-normal">
            {text}
          </p>
        </>
      )}
    </Button>
  );
};

export default GoogleLoginButton;
