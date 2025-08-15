'use client';

import { useRouter } from 'next/navigation';

import H2 from '@/components/auth/H2';
import { ROUTES } from '@/routes';
import { Button } from '@/ui/button';

import ArrowRight from '@/assets/icons/arrow-right.svg';

export default function SuccessfullyResetPassword() {
  const router = useRouter();

  return (
    <div className="auth-form mt-20 mb-40 flex w-full max-w-[600px] flex-col items-center justify-center gap-8 rounded-3xl bg-[#0B0B0B]/80 px-5 py-14 shadow-xl backdrop-blur sm:px-6 md:px-8 lg:px-12">
      <div>
        <H2 text="Successfully" />
        <p className="text-center text-base text-[#B3B3B3]">
          Your Password has been reset
        </p>
      </div>

      <Button
        type="button"
        className="auth-button w-full bg-[#282828]"
        onClick={() => router.push(ROUTES.AUTH.LOGIN)}
      >
        <span>Go to Login</span>
        <ArrowRight />
      </Button>
    </div>
  );
}
