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
import { Form, FormField } from '../ui/form';
import Loader from '../ui/loader';

import AuthButton from './AuthButton';
import AuthFormInput from './AuthFormInput';
import H2 from './H2';

import ArrowRight from '@/assets/icons/arrow-right.svg';
import GoogleIcon from '@/assets/icons/google.svg';

const signUpSchema = z
  .object({
    name: z
      .string()
      .min(2, 'Name is too short')
      .max(30, 'Name is too long')
      .regex(/^[a-zA-Zа-яА-ЯёЁіІїЇєЄ\s-]+$/, 'Invalid characters in name'),
    email: z.string().email('Invalid email format'),
    phone: z.string().regex(/^\+?\d{10,15}$/, 'Invalid phone number'),
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

type SignUpFormValues = z.infer<typeof signUpSchema>;

const SignUpForm: React.FC = () => {
  const router = useRouter();
  const { setTokens } = useAuth();

  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
    },
  });

  const {
    handleSubmit,
    formState: { errors },
  } = form;

  const { mutate: signUp, isPending } = useMutation({
    mutationFn: apiService.signUp,
    onSuccess: (data) => {
      setTokens({
        accessToken: data.access_token,
        refreshToken: data.refresh_token,
      });
      router.push(ROUTES.HOME);
    },
    onError: () => {
      toast.error('Sign up failed. Please check your data.');
    },
  });

  const onSubmit = (values: SignUpFormValues) => {
    signUp({
      email: values.email,
      password: values.password,
      username: values.name,
      phone_number: values.phone,
    });
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
          <p>Sign up with Google</p>
        </AuthButton>

        <p className="text-center text-base text-[#B3B3B3]">
          Or, Sign up with email
        </p>

        <div className="flex w-full max-w-[800px] flex-col gap-5">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <AuthFormInput
                {...field}
                handleChange={field.onChange}
                type="text"
                placeholder="Enter Your Name"
                error={errors.name?.message}
                disabled={isPending}
              />
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <AuthFormInput
                {...field}
                handleChange={field.onChange}
                type="email"
                placeholder="Enter Your Email"
                error={errors.email?.message}
                disabled={isPending}
              />
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <AuthFormInput
                {...field}
                handleChange={field.onChange}
                type="tel"
                placeholder="Enter Your Phone"
                error={errors.phone?.message}
                disabled={isPending}
              />
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <AuthFormInput
                {...field}
                handleChange={field.onChange}
                type="password"
                placeholder="Enter Password"
                error={errors.password?.message}
                disabled={isPending}
              />
            )}
          />

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <AuthFormInput
                {...field}
                handleChange={field.onChange}
                type="password"
                placeholder="Confirm Password"
                error={errors.confirmPassword?.message}
                disabled={isPending}
              />
            )}
          />
        </div>

        <AuthButton disabled={isPending} type="submit">
          {isPending ? (
            <Loader />
          ) : (
            <>
              <p>Create Account</p>
              <ArrowRight />
            </>
          )}
        </AuthButton>

        <p className="text-center text-base text-[#B3B3B3]">
          Already have an account?{' '}
          <Link className="text-[#84FDF7]" href={ROUTES.LOGIN}>
            Log in
          </Link>
        </p>
      </form>
    </Form>
  );
};

export default SignUpForm;
