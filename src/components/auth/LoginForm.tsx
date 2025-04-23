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
import apiService from '@/services';
import { Form, FormField, FormMessage } from '../ui/form';
import Loader from '../ui/loader';

import AuthButton from './AuthButton';
import AuthFormInput from './AuthFormInput';
import H2 from './H2';

import ArrowRight from '@/assets/icons/arrow-right.svg';
import GoogleIcon from '@/assets/icons/google.svg';

const loginSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/\d/, 'Password must include at least one number')
    .regex(/[a-zA-Z]/, 'Password must include at least one letter'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const LoginForm: React.FC = () => {
  const router = useRouter();
  const { setTokens } = useAuth();

  const {
    mutate: login,
    error: loginError,
    isPending: loginIsLoading,
  } = useMutation({
    mutationFn: apiService.login,
    onSuccess: (data) => {
      console.log('data', data);
      setTokens({
        accessToken: data.access_token,
        refreshToken: data.refresh_token,
      });
      router.push(ROUTES.HOME);
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
        className="auth-form mt-20 mb-40 flex w-full max-w-[800px] flex-col items-center justify-center gap-6 rounded-3xl px-40 py-14"
      >
        <H2 text="Welcome!" />

        <AuthButton type="button">
          <GoogleIcon />
          <p>Sign in with Google</p>
        </AuthButton>

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

        <Link
          className="w-full max-w-[800px] text-end text-base text-[#84FDF7]"
          href={ROUTES.RESET_PASS}
        >
          Forgot Password?
        </Link>

        <AuthButton disabled={loginIsLoading} type="submit">
          {loginIsLoading ? (
            <Loader />
          ) : (
            <>
              <p>Sign In</p>
              <ArrowRight />
            </>
          )}
        </AuthButton>

        <p className="text-center text-base text-[#B3B3B3]">
          Don&apos;t have an account yet?{' '}
          <Link className="text-[#84FDF7]" href={ROUTES.SIGN_UP}>
            Create Account
          </Link>
        </p>
      </form>
    </Form>
  );
};

export default LoginForm;
