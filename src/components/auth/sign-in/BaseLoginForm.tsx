import Link from 'next/link';

import { useLoginForm } from '@/hooks/auth/useLoginForm';
import { ROUTES } from '@/routes';
import { Button } from '@/ui/button';
import { Form, FormField, FormMessage } from '../../../ui/form';
import Loader from '../../../ui/loader';
import AuthFormInput from '../AuthFormInput';

import ArrowRight from '@/assets/icons/arrow-right.svg';

interface IBaseLoginForm {
  onSuccessLogin?: () => void;
}

const BaseLoginForm = ({ onSuccessLogin }: IBaseLoginForm) => {
  const { form, error, loginIsLoading, onSubmit } = useLoginForm({
    onSuccessLogin,
  });

  const {
    handleSubmit,
    formState: { errors },
  } = form;

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-full flex-col items-center justify-center gap-6"
      >
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
                passwordToggle
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

        <FormMessage error={error} />

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

export default BaseLoginForm;
