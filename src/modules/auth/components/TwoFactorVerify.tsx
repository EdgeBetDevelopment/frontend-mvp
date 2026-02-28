'use client';

import React, { useState } from 'react';
import { Button } from '@/shared/components/button';
import { Input } from '@/shared/components/input';
import { Label } from '@/shared/components/label';
import Loader from '@/shared/components/loader';

interface TwoFactorVerifyProps {
  onVerify: (code: string) => void;
  onUseBackupCode?: () => void;
  isLoading?: boolean;
  error?: string;
}

const TwoFactorVerify: React.FC<TwoFactorVerifyProps> = ({
  onVerify,
  onUseBackupCode,
  isLoading = false,
  error,
}) => {
  const [code, setCode] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (code.length === 6) {
      onVerify(code);
    }
  };

  return (
    <div className="w-full max-w-md space-y-6 rounded-lg border border-border bg-card p-6">
      <div className="space-y-2 text-center">
        <h2 className="text-2xl font-bold">Two-Factor Authentication</h2>
        <p className="text-sm text-muted-foreground">
          Enter the 6-digit code from your authenticator app
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="code">Authentication Code</Label>
          <Input
            id="code"
            type="text"
            placeholder="000000"
            value={code}
            onChange={(e) =>
              setCode(e.target.value.replace(/\D/g, '').slice(0, 6))
            }
            maxLength={6}
            className="text-center text-2xl tracking-widest text-black"
            disabled={isLoading}
          />
        </div>

        {error && (
          <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
            {error}
          </div>
        )}

        <Button
          type="submit"
          className="w-full"
          disabled={code.length !== 6 || isLoading}
        >
          {isLoading ? <Loader /> : 'Verify'}
        </Button>

        {onUseBackupCode && (
          <Button
            type="button"
            variant="ghost"
            className="w-full"
            onClick={onUseBackupCode}
            disabled={isLoading}
          >
            Use backup code instead
          </Button>
        )}
      </form>
    </div>
  );
};

export default TwoFactorVerify;
