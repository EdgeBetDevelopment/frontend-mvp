'use client';

import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import LoginForm from '@/components/auth/sign-in/LoginForm';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { ROUTES } from '@/routes';

const LoginPage = () => {
  const router = useRouter();

  const onSuccessLogin = () => {
    router.push(ROUTES.HOME);
    toast.success('Login successful!');
  };

  const on2FARequired = (tempToken: string) => {
    router.push(
      `${ROUTES.AUTH.TWO_FACTOR}?token=${encodeURIComponent(tempToken)}`,
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="flex min-h-[calc(100vh-200px)] w-full flex-col items-center justify-center px-4 py-24">
        <div className="w-full max-w-[520px] space-y-6">
          <LoginForm
            onSuccessLogin={onSuccessLogin}
            on2FARequired={on2FARequired}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LoginPage;
