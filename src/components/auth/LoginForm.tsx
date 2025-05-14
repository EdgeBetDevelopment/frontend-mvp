'use client';

import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { useAuth } from '@/context/AuthContext';
import { ROUTES } from '@/routes';
import authService from '@/services/auth';
import { Button } from '@/ui/button';
import { Form, FormField, FormMessage } from '../../ui/form';
import Loader from '../../ui/loader';

import AuthFormInput from './AuthFormInput';
import H2 from './H2';

import ArrowRight from '@/assets/icons/arrow-right.svg';
import GoogleIcon from '@/assets/icons/google.svg';

const loginSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z
    .string()
    // .min(8, 'Password must be at least 8 characters')
    .regex(/\d/, 'Password must include at least one number'),
  // .regex(/[a-zA-Z]/, 'Password must include at least one letter'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

interface ILoginForm {
  title?: string;
  onSuccessLogin?: () => void;
}

const LoginForm = ({ title = 'Welcome!', onSuccessLogin }: ILoginForm) => {
  const router = useRouter();
  const { setTokens } = useAuth();

  const {
    mutate: login,
    error: loginError,
    isPending: loginIsLoading,
  } = useMutation({
    mutationFn: authService.login,
    onSuccess: (data) => {
      setTokens({
        accessToken: data.access_token,
        refreshToken: data.refresh_token,
      });

      if (onSuccessLogin) {
        onSuccessLogin();
      }
    },
    onError: (error) => {
      console.error(error);
      toast.error('Login failed. Please check your credentials.');
    },
  });

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const {
    handleSubmit,
    formState: { errors },
  } = form;

  const onSubmit = async (values: LoginFormValues) => {
    const body = {
      email: values.email,
      password: values.password,
    };

    login(body);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-full flex-col items-center justify-center gap-6"
      >
        <H2 text={title} />

        <Button type="button" className="auth-button w-full bg-[#282828]">
          {' '}
          <GoogleIcon />
          <p>Sign in with Google</p>
        </Button>

        <p className="text-center text-base text-[#B3B3B3]">
          Or, Sign in with email
        </p>

        {errors.root && (
          <p className="text-sm text-red-500">{errors.root.message}</p>
        )}

        <div className="flex w-full max-w-[800px] flex-col gap-5">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <AuthFormInput
                {...field}
                type="email"
                name="email"
                placeholder="Enter Your Email"
                value={field.value}
                handleChange={field.onChange}
                error={errors.email?.message}
                disabled={loginIsLoading}
              />
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <AuthFormInput
                {...field}
                type="password"
                placeholder="Enter Password"
                value={field.value}
                handleChange={field.onChange}
                error={errors.password?.message}
                disabled={loginIsLoading}
              />
            )}
          />
        </div>

        <FormMessage error={loginError?.message} />

        <div className="flex w-full justify-end">
          <Link
            className="text-base text-[#84FDF7]"
            href={ROUTES.AUTH.FORGOT_PASS}
          >
            Forgot Password?
          </Link>
        </div>

        <Button
          type="submit"
          className="auth-button w-full bg-[#282828]"
          disabled={loginIsLoading}
        >
          {loginIsLoading ? (
            <Loader />
          ) : (
            <>
              <p>Sign In</p>
              <ArrowRight />
            </>
          )}
        </Button>

        <p className="text-center text-base text-[#B3B3B3]">
          Don&apos;t have an account yet?{' '}
          <Link className="text-[#84FDF7]" href={ROUTES.AUTH.SIGN_UP}>
            Create Account
          </Link>
        </p>
      </form>
    </Form>
  );
};

export default LoginForm;
