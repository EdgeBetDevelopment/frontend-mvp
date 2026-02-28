import { ResetPasswordForm } from '@/modules/auth';
import Navigation from '@/shared/components/Navigation';
import Footer from '@/shared/components/Footer';

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
