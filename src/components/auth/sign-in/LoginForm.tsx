'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

import { ROUTES } from '@/routes';
import GoogleLoginButton from '../GoogleLoginButton';
import H2 from '../H2';

import BaseLoginForm from './BaseLoginForm';

interface ILoginForm {
  title?: string;
  onSuccessLogin?: () => void;
  onGoogleLoginSuccess?: () => void;
}

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

  return (
    <div className="flex w-full flex-col items-center gap-6">
      <H2 text={title} />

      <GoogleLoginButton onSuccess={handleGoogleSuccess} text="signin_with" />

      <p className="text-center text-base text-[#B3B3B3]">
        Or, Sign in with email
      </p>

      <BaseLoginForm onSuccessLogin={onSuccessLogin} />
    </div>
  );
};

export default LoginForm;
