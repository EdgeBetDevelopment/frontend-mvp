'use client';

import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import SignUpForm from '@/components/auth/sign-up/SignUpForm';
import { ROUTES } from '@/routes';

const SignUpPage = () => {
  const router = useRouter();

  const onSuccessSignUp = () => {
    router.push(ROUTES.HOME);
    toast.success('Sign up successful!');
  };

  return (
    <div className="flex w-full flex-col items-center justify-center">
      <div className="auth-form mt-20 mb-40 flex w-full max-w-[800px] flex-col items-center justify-center gap-6 rounded-3xl px-6 py-14 sm:px-10 md:px-20 lg:px-40">
        <SignUpForm onSuccessSignUp={onSuccessSignUp} />
      </div>
    </div>
  );
};

export default SignUpPage;
