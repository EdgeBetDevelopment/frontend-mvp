import ResetPasswordForm from '@/components/auth/reset-pass/ResetPasswordForm';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const ResetPassword = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="flex min-h-[calc(100vh-200px)] w-full flex-col items-center justify-center px-4 py-24">
        <ResetPasswordForm />
      </div>
      <Footer />
    </div>
  );
};

export default ResetPassword;
