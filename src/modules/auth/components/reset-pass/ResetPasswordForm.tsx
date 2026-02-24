'use client';

import React, { useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { ROUTES } from '@/routes';
import authService from "../../services";
import { useRecoveryStore } from '@/store/slices/resetPassSlice';
import { Button } from '@/ui/button';
import { Form, FormField, FormMessage } from '@/ui/form';
import Loader from '@/ui/loader';
import AuthFormInput from '../AuthFormInput';
import H2 from '../H2';

import ArrowRight from '@/assets/icons/arrow-right.svg';

const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .regex(/\d/, 'Password must include at least one number')
      .regex(/[a-zA-Z]/, 'Password must include at least one letter'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

type ResetPasswordValues = z.infer<typeof resetPasswordSchema>;

const ResetPasswordForm = () => {
  const router = useRouter();
  const { clearAll, email, code } = useRecoveryStore();

  useEffect(() => {
    if (!email || !code) {
      toast.error('Email and code are required');
      router.replace(ROUTES.AUTH.FORGOT_PASS);
    }
  }, []);

  const form = useForm<ResetPasswordValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  const {
    mutate: resetPassword,
    isPending: isResetting,
    error: resetPasswordError,
  } = useMutation({
    mutationFn: authService.resetPassword,
    onSuccess: () => {
      toast.success('Password reset successfully!');
      clearAll();
      router.push(ROUTES.AUTH.RESET_PASS_SUCCESS);
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data?.message ||
          'Failed to reset password. Please try again.',
      );
    },
  });

  const {
    handleSubmit,
    formState: { errors },
  } = form;

  const onSubmit = (values: ResetPasswordValues) => {
    const body = {
      code,
      email,
      new_password: values.password,
      new_password_repeat: values.confirmPassword,
    };

    resetPassword(body);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-full max-w-[520px] flex-col items-center justify-center gap-6"
      >
        <div>
          <H2 text="Reset Password" />
          <p className="text-center text-sm text-muted-foreground">
            Create a new password
          </p>
        </div>

        <div className="flex w-full flex-col gap-5">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <AuthFormInput
                {...field}
                passwordToggle
                type="password"
                placeholder="Enter Password"
                value={field.value}
                handleChange={field.onChange}
                error={errors.password?.message}
                disabled={isResetting}
              />
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <AuthFormInput
                {...field}
                type="password"
                placeholder="Confirm Password"
                value={field.value}
                handleChange={field.onChange}
                passwordToggle
                error={errors.confirmPassword?.message}
                disabled={isResetting}
              />
            )}
          />
        </div>

        <FormMessage error={resetPasswordError?.message} />

        <div className="flex w-full flex-col gap-2.5">
          <Button
            type="submit"
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-secondary p-4 text-xl font-semibold text-foreground transition-all duration-200 hover:bg-secondary/80"
            disabled={isResetting}
          >
            {isResetting ? (
              <Loader />
            ) : (
              <>
                <span>Submit</span>
                <ArrowRight />
              </>
            )}
          </Button>

          <Button
            variant="outline"
            type="button"
            onClick={() => router.back()}
            disabled={isResetting}
            className="border-border"
          >
            Back
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ResetPasswordForm;
