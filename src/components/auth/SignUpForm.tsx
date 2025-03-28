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

const SignUpForm: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    phone?: string;
    error?: string;
  }>({});

  const router = useRouter();

  const { setTokens } = useAuth();

  const validateName = (name: string) =>
    /^[a-zA-Zа-яА-ЯёЁіІїЇєЄ\s-]{2,30}$/.test(name);
  const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePassword = (password: string) =>
    password.length >= 8 && /\d/.test(password) && /[a-zA-Z]/.test(password);
  const validatePhone = (phone: string) => /^\+?\d{10,15}$/.test(phone);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: {
      name?: string;
      email?: string;
      password?: string;
      confirmPassword?: string;
      phone?: string;
    } = {};

    if (!validateName(name))
      newErrors.name = 'Invalid name (only letters, 2-30 characters)';
    if (!validateEmail(email)) newErrors.email = 'Invalid email format';
    if (!validatePassword(password))
      newErrors.password =
        'Password must be at least 8 characters, include a number and a letter';
    if (password !== confirmPassword)
      newErrors.confirmPassword = 'Passwords do not match';
    if (!validatePhone(phone)) newErrors.phone = 'Invalid phone number';

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        const accessToken = await apiService.signUp({
          email,
          password,
          username: name,
          phone_number: phone,
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
      onSubmit={handleSignUp}
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

      {errors.error && <p className="text-red-500">{errors.error}</p>}

      <div className="flex w-full max-w-[800px] flex-col gap-5">
        <AuthFormInput
          handleChange={setName}
          value={name}
          type="text"
          placeholder="Enter Your Name"
        />
        {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}

        <AuthFormInput
          handleChange={setEmail}
          value={email}
          type="email"
          placeholder="Enter Your Email"
        />
        {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}

        <AuthFormInput
          handleChange={setPhone}
          value={phone}
          type="tel"
          placeholder="Enter Your Phone"
        />
        {errors.phone && <p className="text-sm text-red-500">{errors.phone}</p>}

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

        <AuthFormInput
          handleChange={setConfirmPassword}
          value={confirmPassword}
          type="password"
          placeholder="Confirm Password"
        />
        {errors.confirmPassword && (
          <p className="text-sm text-red-500">{errors.confirmPassword}</p>
        )}
      </div>

      <AuthButton handleClick={handleSignUp} type="submit">
        <p>Create Account</p>
        <ArrowRight />
      </AuthButton>

      <p className="text-center text-base text-[#B3B3B3]">
        Already have an account?{' '}
        <Link className="text-[#84FDF7]" href={ROUTES.LOGIN}>
          Log in
        </Link>
      </p>
    </form>
  );
};

export default SignUpForm;
