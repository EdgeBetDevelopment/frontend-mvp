import { ForgotPasswordForm as ForgotPassword } from '@/modules/auth';
import Navigation from '@/shared/components/Navigation';
import Footer from '@/shared/components/Footer';

const ResetPassword = () => {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navigation />
      <div className="flex min-h-[calc(100vh-200px)] w-full flex-col items-center justify-center px-4 py-24">
        <ForgotPassword />
      </div>
      <Footer />
    </div>
  );
};

export default ResetPassword;
