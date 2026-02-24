"use client";

import { useEffect } from "react";
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import authService from "../services";
import { useAuth } from "../store";
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
  const router = useRouter();

  const { mutate: loginGoogle, isPending } = useMutation({
    mutationFn: (body: { token: string }) => authService.loginGoogle(body),
    onSuccess: (data) => {
      setTokens({
        accessToken: data.access_token,
        refreshToken: data.refresh_token,
        isAdmin: data.is_admin,
        isSuperAdmin: data.is_super_admin,
      });

      toast.success('Logged in with Google!');

      // Redirect to admin if user is admin or super admin
      if (data.is_admin || data.is_super_admin) {
        router.push('/admin');
        return;
      }

      if (onSuccess) {
        onSuccess();
      }
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
  }, [loginGoogle]);

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
      className="w-full items-center justify-center gap-2 rounded-xl border border-border bg-secondary p-4 text-xl font-bold tracking-normal text-foreground transition-all duration-200 hover:bg-secondary/80"
    >
      {isPending ? (
        <Loader size="h-8 w-8" />
      ) : (
        <>
          <GoogleIcon />
          <span className="text-center">{text}</span>
        </>
      )}
    </Button>
  );
};

export default GoogleLoginButton;
