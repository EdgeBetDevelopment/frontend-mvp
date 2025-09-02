import Link from 'next/link';

import { useSignUpForm } from '@/hooks/auth/useSignUpForm';
import { ROUTES } from '@/routes';
import { Button } from '@/ui/button';
import { Form, FormField, FormMessage } from '../../../ui/form';
import Loader from '../../../ui/loader';
import AuthFormInput from '../AuthFormInput';

import ArrowRight from '@/assets/icons/arrow-right.svg';

interface IBaseSignUpForm {
  onSuccessSignUp?: () => void;
}

const BaseSignUpForm = ({ onSuccessSignUp }: IBaseSignUpForm) => {
  const { form, isPending, onSubmit, error } = useSignUpForm({
    onSuccessSignUp,
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
        <div className="flex w-full max-w-[800px] flex-col gap-5">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <AuthFormInput
                {...field}
                handleChange={field.onChange}
                type="text"
                placeholder="Enter Your Username"
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
                passwordToggle
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

        <FormMessage error={error} />

        <Button
          type="submit"
          className="auth-button w-full bg-[#282828]"
          disabled={isPending}
        >
          {isPending ? (
            <Loader />
          ) : (
            <>
              <p>Create Account</p>
              <ArrowRight />
            </>
          )}
        </Button>

        <p className="text-center text-base text-[#B3B3B3]">
          Already have an account?{' '}
          <Link className="text-[#84FDF7]" href={ROUTES.AUTH.LOGIN}>
            Log in
          </Link>
        </p>
      </form>
    </Form>
  );
};

export default BaseSignUpForm;
