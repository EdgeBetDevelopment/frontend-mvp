'use client';

import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import LoginForm from '@/components/auth/sign-in/LoginForm';
import { ROUTES } from '@/routes';

const LoginPage = () => {
  const router = useRouter();

  const onSuccessLogin = () => {
    router.push(ROUTES.HOME);
    toast.success('Login successful!');
  };

  return (
    <div className="flex w-full flex-col items-center justify-center">
      <div className="auth-form mt-20 mb-40 flex w-full max-w-[800px] flex-col items-center justify-center gap-6 rounded-3xl px-5 py-14 sm:px-10 md:px-20 lg:px-40">
        <LoginForm onSuccessLogin={onSuccessLogin} />
      </div>
    </div>
  );
};

export default LoginPage;
