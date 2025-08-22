'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

import { ROUTES } from '@/routes';
import { Button } from '@/ui/button';
import GoogleLoginButton from '../GoogleLoginButton';
import H2 from '../H2';

import BaseSignUpForm from './BaseSignUpForm';

interface ISignUpForm {
  title?: string;
  onSuccessSignUp?: () => void;
  onGoogleSignUpSuccess?: () => void;
}

const SignUpForm = ({
  title = 'Welcome!',
  onSuccessSignUp,
  onGoogleSignUpSuccess,
}: ISignUpForm) => {
  const router = useRouter();

  const handleGoogleSuccess = () => {
    if (onGoogleSignUpSuccess) {
      onGoogleSignUpSuccess();
    } else {
      router.push(ROUTES.HOME);
    }
  };

  return (
    <div className="flex w-full flex-col items-center gap-6">
      <H2 text={title} />

      <GoogleLoginButton
        onSuccess={handleGoogleSuccess}
        text="Sign up with Google"
      />
      <Button className="auth-button bg-surface-secondary w-full items-center justify-center gap-2 rounded-xl p-4 transition-all duration-200 hover:opacity-90">
        <p className="text-center align-middle text-2xl font-bold tracking-normal">
          Sign in with Whoop
        </p>
      </Button>

      <p className="text-center text-base text-[#B3B3B3]">
        Or, Sign up with email
      </p>

      <BaseSignUpForm onSuccessSignUp={onSuccessSignUp} />
    </div>
  );
};

export default SignUpForm;
