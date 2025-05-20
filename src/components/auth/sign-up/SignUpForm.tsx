'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

import { ROUTES } from '@/routes';
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

      <p className="text-center text-base text-[#B3B3B3]">
        Or, Sign up with email
      </p>

      <BaseSignUpForm onSuccessSignUp={onSuccessSignUp} />
    </div>
  );
};

export default SignUpForm;
