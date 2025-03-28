'use client';

import { useState } from 'react';

import AuthButton from './AuthButton';
import AuthFormInput from './AuthFormInput';
import H2 from './H2';

import ArrowRight from '@/assets/icons/arrow-right.svg';

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('');

  const [errors, setErrors] = useState<{
    email?: string;
    error?: string;
  }>({});

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { email?: string; password?: string } = {};

    if (!validateEmail(email)) {
      newErrors.email = 'Invalid email format';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
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
      <H2 text="Forgot Password" />

      <p className="text-center text-base text-[#B3B3B3]">
        Enter your email address
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
      </div>

      <AuthButton handleClick={handleLogin} type="submit">
        <p>Submit</p>
        <ArrowRight />
      </AuthButton>
    </form>
  );
};

export default ForgotPassword;
