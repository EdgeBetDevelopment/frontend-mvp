'use client';

import { useRouter } from 'next/navigation';

import LoginForm from '@/components/auth/sign-in/LoginForm';
import { ROUTES } from '@/routes';

const LoginPage = () => {
  const router = useRouter();

  const onSuccessLogin = () => {
    router.push(ROUTES.HOME);
  };

  return (
    <div className="flex w-full flex-col items-center justify-center">
      <div className="auth-form mt-20 mb-40 flex w-full max-w-[800px] flex-col items-center justify-center gap-6 rounded-3xl px-40 py-14">
        <LoginForm onSuccessLogin={onSuccessLogin} />
      </div>
    </div>
  );
};

export default LoginPage;
