'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { getErrorMessage, handleFetchError } from '@/shared/utils/error-handling';

import authService from '../services';
import { useAuth } from '../store';

const loginSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().regex(/\d/, 'Password must include at least one number'),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

interface UseLoginFormProps {
  onSuccessLogin?: () => void;
  on2FARequired?: (tempToken: string) => void;
}

export const useLoginForm = ({
  onSuccessLogin,
  on2FARequired,
}: UseLoginFormProps = {}) => {
  const { setTokens } = useAuth();
  const router = useRouter();

  const {
    mutate: login,
    error,
    isPending: loginIsLoading,
  } = useMutation({
    mutationFn: authService.login,
    onError: (error: unknown) => {
      toast.error(getErrorMessage(error, 'Login failed. Please check your credentials.'));
    },
    onSuccess: (data) => {
      // Check if 2FA is required
      if (data.requires_2fa && data.temp_token) {
        if (on2FARequired) {
          on2FARequired(data.temp_token);
        }
        return;
      }

      // Regular login without 2FA
      setTokens({
        accessToken: data.access_token,
        refreshToken: data.refresh_token,
        isAdmin: data.is_admin,
        isSuperAdmin: data.is_super_admin,
      });

      if (onSuccessLogin) {
        onSuccessLogin();
      }
    },
  });

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (values: LoginFormValues) => {
    login({
      email: values.email,
      password: values.password,
    });
  };

  const errorMessage =
    error &&
    handleFetchError(error, 'Login failed. Please check your credentials.');

  return {
    form,
    loginIsLoading,
    onSubmit,
    error: errorMessage,
  };
};
