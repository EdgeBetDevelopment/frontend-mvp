'use client';

import React, { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { ROUTES } from '@/routes';
import authService from '@/services/auth';
import { useRecoveryStore } from '@/store/slices/resetPassSlice';
import { Button } from '@/ui/button';
import { Form, FormMessage } from '@/ui/form';
import Loader from '@/ui/loader';

import H2 from '../H2';
import OtpCodeInput from './OtpCodeInput';

import ArrowRight from '@/assets/icons/arrow-right.svg';

export const verifyCodeSchema = z.object({
  code: z.string().regex(/^\d{6}$/, 'Code must be a 6-digit number'),
});

type VerifyCodeValues = z.infer<typeof verifyCodeSchema>;

const VerifyCodeForm = () => {
  const router = useRouter();
  const { email, updateField } = useRecoveryStore();

  const form = useForm<VerifyCodeValues>({
    resolver: zodResolver(verifyCodeSchema),
    defaultValues: {
      code: '',
    },
  });

  const {
    mutate: verifyCode,
    isPending: isVerifying,
    error: verifyCodeError,
  } = useMutation({
    mutationFn: authService.verificationCode,
    onSuccess: (data: any) => {
      if (!data.success) {
        toast.error(data.reason || 'Something went wrong. Please try again.');
        return;
      }

      if (data.success) {
        toast.success('Code verified successfully!');
        router.push(ROUTES.AUTH.RESET_PASS);
        updateField('code', form.getValues('code'));

        return;
      }
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data?.message ||
          'Something went wrong. Please try again.',
      );
    },
  });

  const {
    handleSubmit,
    formState: { errors },
  } = form;

  const onSubmit = (values: VerifyCodeValues) => {
    if (!email) {
      toast.error('Email is required');
      router.push(ROUTES.AUTH.FORGOT_PASS);
      return;
    }

    verifyCode({ email: email, code: values.code });
  };

  useEffect(() => {
    if (email === '') {
      toast.error('Email is required');
      router.replace(ROUTES.AUTH.FORGOT_PASS);
    }
  }, [email]);

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="auth-form mt-20 mb-40 flex w-full max-w-[600px] flex-col items-center justify-center gap-6 rounded-3xl bg-[#0B0B0B]/80 px-12 py-14 shadow-xl backdrop-blur"
      >
        <div>
          <H2 text="Verification Code" />

          <p className="text-center text-base text-[#B3B3B3]">
            Enter 6-Digit Code to Retrieve password
          </p>
        </div>

        <div className="flex w-full flex-col gap-5">
          <OtpCodeInput />
        </div>

        <FormMessage error={verifyCodeError?.message} />

        <div className="flex w-full flex-col gap-2.5">
          <Button
            type="submit"
            className="auth-button bg-[#282828]"
            disabled={isVerifying}
          >
            {isVerifying ? (
              <Loader />
            ) : (
              <>
                <p>Verify</p>
                <ArrowRight />
              </>
            )}
          </Button>

          <Button
            variant="outline"
            type="button"
            onClick={() => router.back()}
            disabled={isVerifying}
          >
            Back
          </Button>
        </div>

        <p className="text-sm text-[#B3B3B3]">
          If you didn&apos;t receive any code. <ResendButton />
        </p>
      </form>
    </Form>
  );
};

export default VerifyCodeForm;

const ResendButton = () => {
  const { email } = useRecoveryStore();
  const [resendTimer, setResendTimer] = useState(0);

  const { mutate: resendForgotPassword, isPending: isResending } = useMutation({
    mutationFn: authService.forgotPassword,
    onSuccess: () => {
      toast.success('Verification code resent to your email.');
      setResendTimer(60);
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data?.message ||
          'Failed to resend code. Please try again.',
      );
    },
  });

  useEffect(() => {
    if (resendTimer > 0) {
      const interval = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [resendTimer]);

  return (
    <button
      type="button"
      onClick={() => resendForgotPassword(email)}
      className="cursor-pointer text-[#84FDF7] underline"
      disabled={isResending || resendTimer > 0}
    >
      {resendTimer > 0
        ? `Resend (${resendTimer}s)`
        : isResending
          ? 'Resending...'
          : 'Resend'}
    </button>
  );
};
