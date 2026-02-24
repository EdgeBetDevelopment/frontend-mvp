'use client';

import React, { useState } from 'react';
import { Button } from '@/ui/button';
import { Card } from '@/ui/card';
import { use2FAManagement } from '@/hooks/auth/use2FAManagement';
import TwoFactorSetup from '@/components/auth/TwoFactorSetup';
import BackupCodesDisplay from '@/components/auth/BackupCodesDisplay';
import { Input } from '@/ui/input';
import { Label } from '@/ui/label';
import Loader from '@/ui/loader';
import { IUser } from '@/types/auth';

interface SecuritySettingsProps {
  user: IUser;
}

type SetupStep = 'idle' | 'qr-code' | 'backup-codes' | 'disable' | 'recovery';

const SecuritySettings: React.FC<SecuritySettingsProps> = ({ user }) => {
  const [step, setStep] = useState<SetupStep>('idle');
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [backupCodes, setBackupCodes] = useState<string[]>([]);
  const [disableCode, setDisableCode] = useState('');
  const [recoveryCode, setRecoveryCode] = useState('');

  const is2FAEnabled = user.two_fa?.is_enabled ?? user.is_2fa_enabled ?? false;

  const {
    enable2FA,
    confirm2FA,
    disable2FA,
    recover2FA,
    isEnabling,
    isConfirming,
    isDisabling,
    isRecovering,
  } = use2FAManagement({
    onEnableSuccess: (qrUrl) => {
      console.log('QR URL received:', qrUrl);
      setQrCodeUrl(qrUrl);
      setStep('qr-code');
      console.log('Step set to qr-code');
    },
    onConfirmSuccess: (codes) => {
      setBackupCodes(codes);
      setStep('backup-codes');
    },
    onDisableSuccess: () => {
      setStep('idle');
      setDisableCode('');
    },
    onRecoverySuccess: (qrUrl) => {
      setQrCodeUrl(qrUrl);
      setStep('qr-code');
    },
  });

  const handleEnableClick = () => {
    enable2FA();
  };

  const handleConfirm = (code: string) => {
    confirm2FA(code);
  };

  const handleDisableSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (disableCode.length === 6) {
      disable2FA(disableCode);
    }
  };

  const handleRecoverySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (recoveryCode.trim()) {
      recover2FA(recoveryCode.trim());
      setRecoveryCode('');
    }
  };

  const handleBackupCodesClose = () => {
    setStep('idle');
    setBackupCodes([]);
    setQrCodeUrl('');
  };

  const handleCancelSetup = () => {
    setStep('idle');
    setQrCodeUrl('');
  };

  if (step === 'qr-code' && qrCodeUrl) {
    return (
      <Card className="p-6">
        <TwoFactorSetup
          qrCodeUrl={qrCodeUrl}
          onConfirm={handleConfirm}
          onCancel={handleCancelSetup}
          isLoading={isConfirming}
        />
      </Card>
    );
  }

  if (step === 'backup-codes' && backupCodes.length > 0) {
    return (
      <Card className="p-6">
        <BackupCodesDisplay
          backupCodes={backupCodes}
          onClose={handleBackupCodesClose}
        />
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
            <svg
              className="h-6 w-6 text-primary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              />
            </svg>
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold">Security</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Protect your account with additional security
            </p>
          </div>
        </div>

        <div className="rounded-lg bg-secondary/50 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div>
                <p className="font-semibold">Two-Factor Authentication</p>
                <p className="text-sm text-muted-foreground">
                  Add an extra layer of security to your account
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {is2FAEnabled && (
                <span className="flex items-center gap-1 rounded-full border border-primary bg-transparent px-3 py-1 text-sm font-medium text-primary">
                  <svg
                    className="h-3 w-3"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Enabled
                </span>
              )}
              <label className="relative inline-flex cursor-pointer items-center">
                <input
                  type="checkbox"
                  checked={is2FAEnabled}
                  onChange={() => {
                    if (is2FAEnabled) {
                      setStep('disable');
                    } else {
                      handleEnableClick();
                    }
                  }}
                  className="peer sr-only"
                  disabled={isEnabling}
                />
                <div className="peer h-6 w-11 rounded-full bg-muted after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-border after:bg-background after:transition-all after:content-[''] peer-checked:bg-primary peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary peer-focus:ring-offset-2"></div>
              </label>
            </div>
          </div>
        </div>

        {is2FAEnabled && step === 'disable' && (
          <form
            onSubmit={handleDisableSubmit}
            className="space-y-3 rounded-lg border border-border bg-muted/50 p-4"
          >
            <div className="space-y-2">
              <Label htmlFor="disable-code">
                Enter verification code to disable 2FA
              </Label>
              <Input
                id="disable-code"
                type="text"
                placeholder="000000"
                value={disableCode}
                onChange={(e) =>
                  setDisableCode(e.target.value.replace(/\D/g, '').slice(0, 6))
                }
                maxLength={6}
                className="text-center text-xl tracking-widest text-black"
                disabled={isDisabling}
              />
            </div>
            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => {
                  setStep('idle');
                  setDisableCode('');
                }}
                disabled={isDisabling}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="destructive"
                size="sm"
                disabled={disableCode.length !== 6 || isDisabling}
              >
                {isDisabling ? <Loader /> : 'Disable 2FA'}
              </Button>
            </div>
          </form>
        )}

        {is2FAEnabled && (
          <div className="space-y-3 rounded-lg border border-border bg-muted/50 p-4">
            <div>
              <p className="font-medium">Lost your device?</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Use a backup code to recover your account
              </p>
            </div>
            {step !== 'recovery' ? (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setStep('recovery')}
              >
                Recover Account
              </Button>
            ) : (
              <form onSubmit={handleRecoverySubmit} className="space-y-3">
                <div className="space-y-2">
                  <Label htmlFor="recovery-code">Enter backup code</Label>
                  <Input
                    id="recovery-code"
                    type="text"
                    placeholder="Enter backup code"
                    value={recoveryCode}
                    onChange={(e) => setRecoveryCode(e.target.value)}
                    className="font-mono text-black"
                    disabled={isRecovering}
                  />
                </div>
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setStep('idle');
                      setRecoveryCode('');
                    }}
                    disabled={isRecovering}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    size="sm"
                    disabled={!recoveryCode.trim() || isRecovering}
                  >
                    {isRecovering ? <Loader /> : 'Recover'}
                  </Button>
                </div>
              </form>
            )}
          </div>
        )}
      </div>
    </Card>
  );
};

export default SecuritySettings;
