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
      <Button className="w-full items-center justify-center gap-2 rounded-xl border border-border bg-secondary p-4 text-xl font-bold tracking-normal text-foreground transition-all duration-200 hover:bg-secondary/80">
        Sign up with Whop
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        Or, Sign up with email
      </p>

      <BaseSignUpForm onSuccessSignUp={onSuccessSignUp} />
    </div>
  );
};

export default SignUpForm;
