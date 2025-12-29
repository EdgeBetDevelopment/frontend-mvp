'use client';

import React from 'react';
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
import { Form, FormField, FormMessage } from '@/ui/form';
import Loader from '@/ui/loader';
import AuthFormInput from '../AuthFormInput';
import H2 from '../H2';

import ArrowRight from '@/assets/icons/arrow-right.svg';

const forgotPasswordSchema = z.object({
  email: z.string().email('Invalid email format'),
});

type ForgotPasswordValues = z.infer<typeof forgotPasswordSchema>;

const ForgotPassword: React.FC = () => {
  const router = useRouter();
  const { updateField, email } = useRecoveryStore();
  const form = useForm<ForgotPasswordValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: email || '',
    },
  });

  const {
    mutate: forgotPassword,
    error: forgotPasswordError,
    isPending: isLoadingForgotPassword,
  } = useMutation({
    mutationFn: authService.forgotPassword,
    onSuccess: (data) => {
      router.push(ROUTES.AUTH.VERIFY_CODE);
      toast.success('Verification code sent to your email.');
      updateField('email', form.getValues('email'));
    },
    onError: (error: any) => {
      const message =
        error.response?.data?.message || 'An error occurred. Please try again.';
      toast.error(message);
    },
  });

  const {
    handleSubmit,
    formState: { errors },
  } = form;

  const onSubmit = async (values: ForgotPasswordValues) => {
    forgotPassword(values.email);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-full max-w-[520px] flex-col items-center justify-center gap-6"
      >
        <div>
          <H2 text="Forgot Password" />

          <p className="text-center text-sm text-muted-foreground">
            Enter your email address
          </p>
        </div>

        <div className="flex w-full flex-col gap-5">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <AuthFormInput
                {...form.register('email')}
                type="email"
                placeholder="Enter Your Email"
                value={field.value}
                disabled={isLoadingForgotPassword}
                handleChange={field.onChange}
                error={errors.email?.message}
              />
            )}
          />
        </div>

        <FormMessage error={forgotPasswordError?.message} />

        <div className="flex w-full flex-col gap-2.5">
          <Button
            type="submit"
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-secondary p-4 text-xl font-semibold text-foreground transition-all duration-200 hover:bg-secondary/80"
            disabled={isLoadingForgotPassword}
          >
            {isLoadingForgotPassword ? (
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
            disabled={isLoadingForgotPassword}
            className="border-border"
          >
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ForgotPassword;
