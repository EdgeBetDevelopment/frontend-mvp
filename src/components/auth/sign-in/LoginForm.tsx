'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

import { ROUTES } from '@/routes';
import { Button } from '@/ui/button';
import GoogleLoginButton from '../GoogleLoginButton';
import H2 from '../H2';

import BaseLoginForm from './BaseLoginForm';

interface ILoginForm {
  title?: string;
  onSuccessLogin?: () => void;
  onGoogleLoginSuccess?: () => void;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL!;

const LoginForm = ({
  title = 'Welcome!',
  onSuccessLogin,
  onGoogleLoginSuccess,
}: ILoginForm) => {
  const router = useRouter();

  const handleGoogleSuccess = () => {
    if (onGoogleLoginSuccess) {
      onGoogleLoginSuccess();
    } else {
      router.push(ROUTES.HOME);
    }
  };

  const startWhopLogin = () => {
    window.location.href = `${API_URL}/auth/api/v1/auth/login_whop`;
  };

  return (
    <div className="flex w-full flex-col items-center gap-6">
      <H2 text={title} />

      <GoogleLoginButton
        onSuccess={handleGoogleSuccess}
        text="Sign in with Google"
      />
      <Button
        onClick={startWhopLogin}
        className="auth-button bg-surface-secondary w-full items-center justify-center gap-2 rounded-xl p-4 transition-all duration-200 hover:opacity-90"
      >
        <p className="text-center align-middle text-2xl font-bold tracking-normal">
          Sign in with Whop
        </p>
      </Button>

      <p className="text-center text-base text-[#B3B3B3]">
        Or, Sign in with email
      </p>

      <BaseLoginForm onSuccessLogin={onSuccessLogin} />
    </div>
  );
};

export default LoginForm;
