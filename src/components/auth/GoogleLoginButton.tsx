import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { useAuth } from '@/context/AuthContext';
import authService from '@/services/auth';

const GoogleLoginButton = ({
  text,
  onSuccess,
}: {
  text?: 'signin_with' | 'signup_with' | 'continue_with' | 'signin';
  onSuccess?: () => void;
}) => {
  const router = useRouter();
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
    },
  });

  return (
    <>
      {/* <Button type="button" className="auth-button w-full bg-[#282828]">
          {' '}
          <GoogleIcon />
          <p>Sign in with Google</p>
        </Button> */}
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          if (credentialResponse.credential) {
            loginGoogle({ token: credentialResponse.credential });
          } else {
            toast.error('No credential received from Google');
          }
        }}
        onError={() => {
          toast.error('Google login failed');
        }}
        type="standard"
        theme="filled_black"
        size="large"
        text={text}
        shape="rectangular"
        logo_alignment="center"
        width="478px"
        useOneTap={true}
      />
    </>
  );
};

export default GoogleLoginButton;
