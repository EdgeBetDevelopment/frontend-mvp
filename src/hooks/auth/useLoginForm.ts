import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { useAuth } from '@/context/AuthContext';
import authService from '@/services/auth';
import { handleFetchError } from '@/utils/error-handling';

const loginSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().regex(/\d/, 'Password must include at least one number'),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

interface UseLoginFormProps {
  onSuccessLogin?: () => void;
}

export const useLoginForm = ({ onSuccessLogin }: UseLoginFormProps = {}) => {
  const { setTokens } = useAuth();

  const {
    mutate: login,
    error,
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
    onError: (error: any) => {
      const errorMessage = handleFetchError(
        error,
        'Login failed. Please check your credentials.',
      );
      toast.error(errorMessage);
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
