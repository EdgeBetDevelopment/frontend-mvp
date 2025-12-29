'use client';

import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import SignUpForm from '@/components/auth/sign-up/SignUpForm';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { ROUTES } from '@/routes';

const SignUpPage = () => {
  const router = useRouter();

  const onSuccessSignUp = () => {
    router.push(ROUTES.HOME);
    toast.success('Sign up successful!');
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="flex min-h-[calc(100vh-200px)] w-full flex-col items-center justify-center px-4 py-24">
        <div className="w-full max-w-[520px] space-y-6">
          <SignUpForm onSuccessSignUp={onSuccessSignUp} />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SignUpPage;
