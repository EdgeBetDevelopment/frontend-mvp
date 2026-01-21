import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { useAuth } from '@/context/AuthContext';
import authService from '@/services/auth';
import { handleFetchError } from '@/utils/error-handling';

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

export type SignUpFormValues = z.infer<typeof signUpSchema>;

interface UseSignUpFormProps {
  onSuccessSignUp?: () => void;
}

export const useSignUpForm = ({ onSuccessSignUp }: UseSignUpFormProps = {}) => {
  const { setTokens } = useAuth();
  const router = useRouter();

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
    mutate: signUp,
    isPending,
    error,
  } = useMutation({
    mutationFn: authService.signUp,
    onSuccess: (data) => {
      setTokens({
        accessToken: data.access_token,
        refreshToken: data.refresh_token,
        isAdmin: data.is_admin,
        isSuperAdmin: data.is_super_admin,
      });

      // Redirect to admin if user is admin or super admin
      if (data.is_admin || data.is_super_admin) {
        router.push('/admin');
        return;
      }

      if (onSuccessSignUp) {
        onSuccessSignUp();
      }
    },
    onError: (error: any) => {
      const errorMessage =
        error &&
        handleFetchError(error, 'Sign up failed. Please check your data.');

      toast.error(errorMessage);
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

  const errorMessage =
    error && handleFetchError(error, 'Sign up failed. Please check your data.');

  return {
    form,
    isPending,
    error: errorMessage,
    onSubmit,
  };
};
