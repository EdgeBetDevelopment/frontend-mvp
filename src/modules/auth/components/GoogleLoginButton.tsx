'use client';

import { Button } from '@/shared/components/button';
import GoogleIcon from '@/assets/icons/google.svg';

const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

const GoogleLoginButton = ({
  text = 'Sign in with Google',
  onSuccess: _onSuccess,
}: {
  text?: string;
  onSuccess?: () => void;
}) => {
  const handleGoogleLogin = () => {
    if (!clientId) {
      console.error('Google Client ID is not configured');
      return;
    }

    const nonce = crypto.randomUUID();
    sessionStorage.setItem('google_oauth_nonce', nonce);

    const params = new URLSearchParams({
      client_id: clientId,
      redirect_uri: window.location.origin,
      response_type: 'id_token',
      scope: 'openid email profile',
      nonce,
    });

    window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
  };

  return (
    <Button
      onClick={handleGoogleLogin}
      className="relative flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-secondary text-xl font-bold tracking-normal text-foreground transition-all duration-200 hover:bg-secondary/80"
    >
      <GoogleIcon className="!h-6 !w-6" />
      <span className="text-center">{text}</span>
    </Button>
  );
};

export default GoogleLoginButton;
