'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'sonner';

import Navigation from '@/shared/components/Navigation';
import Footer from '@/shared/components/Footer';
import { TwoFactorVerify, TwoFactorBackupLogin, use2FALogin } from '@/modules/auth';
import { ROUTES } from '@/shared/config/routes';

const TwoFactorPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [useBackup, setUseBackup] = useState(false);

  const tempToken = searchParams.get('token');

  const onSuccess = () => {
    router.push(ROUTES.HOME);
    toast.success('Login successful!');
  };

  if (!tempToken) {
    router.push(ROUTES.AUTH.LOGIN);
    return null;
  }

  const {
    verify2FA,
    loginWithBackup,
    isVerifying,
    isBackupLoading,
    verifyError,
    backupError,
  } = use2FALogin({
    onSuccess,
    tempToken,
  });

  const handleVerify = (code: string) => {
    verify2FA(code);
  };

  const handleBackupLogin = (backupCode: string) => {
    loginWithBackup(backupCode);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="flex min-h-[calc(100vh-200px)] w-full flex-col items-center justify-center px-4 py-24">
        <div className="w-full max-w-[520px] space-y-6">
          {useBackup ? (
            <TwoFactorBackupLogin
              onVerify={handleBackupLogin}
              onBackToCode={() => setUseBackup(false)}
              isLoading={isBackupLoading}
              error={backupError ?? undefined}
            />
          ) : (
            <TwoFactorVerify
              onVerify={handleVerify}
              onUseBackupCode={() => setUseBackup(true)}
              isLoading={isVerifying}
              error={verifyError ?? undefined}
            />
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TwoFactorPage;
