'use client';

import React, { useState } from 'react';
import { Button } from '@/ui/button';
import { Input } from '@/ui/input';
import { Label } from '@/ui/label';
import Loader from '@/ui/loader';

interface TwoFactorBackupLoginProps {
  onVerify: (backupCode: string) => void;
  onBackToCode?: () => void;
  isLoading?: boolean;
  error?: string;
}

const TwoFactorBackupLogin: React.FC<TwoFactorBackupLoginProps> = ({
  onVerify,
  onBackToCode,
  isLoading = false,
  error,
}) => {
  const [backupCode, setBackupCode] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (backupCode.trim()) {
      onVerify(backupCode.trim());
    }
  };

  return (
    <div className="w-full max-w-md space-y-6 rounded-lg border border-border bg-card p-6">
      <div className="space-y-2 text-center">
        <h2 className="text-2xl font-bold">Use Backup Code</h2>
        <p className="text-sm text-muted-foreground">
          Enter one of your backup recovery codes
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="backup-code">Backup Code</Label>
          <Input
            id="backup-code"
            type="text"
            placeholder="Enter backup code"
            value={backupCode}
            onChange={(e) => setBackupCode(e.target.value)}
            className="font-mono"
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
          disabled={!backupCode.trim() || isLoading}
        >
          {isLoading ? <Loader /> : 'Verify Backup Code'}
        </Button>

        {onBackToCode && (
          <Button
            type="button"
            variant="ghost"
            className="w-full"
            onClick={onBackToCode}
            disabled={isLoading}
          >
            Back to authentication code
          </Button>
        )}
      </form>
    </div>
  );
};

export default TwoFactorBackupLogin;
