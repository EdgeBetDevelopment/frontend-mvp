'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { useAuth } from '@/context/AuthContext';
import { ROUTES } from '@/routes';
import apiService from '@/services';

import AuthButton from './AuthButton';
import AuthFormInput from './AuthFormInput';
import H2 from './H2';

import ArrowRight from '@/assets/icons/arrow-right.svg';
import GoogleIcon from '@/assets/icons/google.svg';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [showPassword, setShowPassword] = useState(false);

  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
    error?: string;
  }>({});

  const router = useRouter();

  const { setTokens } = useAuth();

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string) => {
    return (
      password.length >= 8 && /\d/.test(password) && /[a-zA-Z]/.test(password)
    );
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { email?: string; password?: string } = {};

    if (!validateEmail(email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!validatePassword(password)) {
      newErrors.password =
        'Password must be at least 8 characters, include a number and a letter';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        const accessToken = await apiService.login({
          email,
          password,
        });
        setTokens({ accessToken });

        router.push('/');
      } catch (err) {
        console.log(err);
        setErrors({ error: 'Login failed. Please check your credentials.' });
      }
    }
  };
  return (
    <form
      onSubmit={handleLogin}
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

      {errors.error && <p className="text-red-500">{errors.error}</p>}

      <div className="flex w-full max-w-[800px] flex-col gap-5">
        <AuthFormInput
          handleChange={setEmail}
          value={email}
          type="email"
          placeholder="Enter Your Email"
        />
        {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
        <AuthFormInput
          showPassword={showPassword}
          setShowPassword={setShowPassword}
          handleChange={setPassword}
          value={password}
          type={showPassword ? 'text' : 'password'}
          placeholder="Enter Password"
        />
        {errors.password && (
          <p className="text-sm text-red-500">{errors.password}</p>
        )}
      </div>

      <Link
        className="w-full max-w-[800px] text-end text-base text-[#84FDF7]"
        href={ROUTES.RESET_PASS}
      >
        Forgot Password?
      </Link>

      <AuthButton handleClick={handleLogin} type="submit">
        <p>Sign In</p>
        <ArrowRight />
      </AuthButton>

      <p className="text-center text-base text-[#B3B3B3]">
        Don&apos;t have an account yet?{' '}
        <Link className="text-[#84FDF7]" href={ROUTES.SIGN_UP}>
          Create Account
        </Link>
      </p>
    </form>
  );
};

export default LoginForm;
