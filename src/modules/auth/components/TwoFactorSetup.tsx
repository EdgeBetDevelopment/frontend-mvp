'use client';

import React, { useState } from 'react';
import QRCode from 'react-qr-code';
import { Button } from '@/ui/button';
import { Input } from '@/ui/input';
import { Label } from '@/ui/label';
import Loader from '@/ui/loader';

interface TwoFactorSetupProps {
  qrCodeUrl: string;
  onConfirm: (code: string) => void;
  onCancel?: () => void;
  isLoading?: boolean;
  error?: string;
}

const TwoFactorSetup: React.FC<TwoFactorSetupProps> = ({
  qrCodeUrl,
  onConfirm,
  onCancel,
  isLoading = false,
  error,
}) => {
  const [code, setCode] = useState('');
  const cleanedQr = (qrCodeUrl ?? '')
    .replace(/^qr_uri:\s*"?/i, '')
    .replace(/"$/i, '')
    .replace(/\?\s+/, '?')
    .trim();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (code.length === 6) {
      onConfirm(code);
    }
  };
  console.log(cleanedQr);

  return (
    <div className="w-full max-w-md space-y-6 rounded-lg border border-border bg-card p-6">
      <div className="space-y-2 text-center">
        <h2 className="text-2xl font-bold">Enable Two-Factor Authentication</h2>
        <p className="text-sm text-muted-foreground">
          Scan the QR code with your authenticator app
        </p>
      </div>

      <div className="flex justify-center">
        <div className="rounded-lg border border-border bg-white p-4">
          <QRCode value={cleanedQr} size={200} />
        </div>
      </div>

      <div className="space-y-2 rounded-lg bg-muted p-4">
        <p className="text-sm font-medium">Setup Instructions:</p>
        <ol className="list-decimal space-y-1 pl-5 text-sm text-muted-foreground">
          <li>
            Download an authenticator app (Google Authenticator, Authy, etc.)
          </li>
          <li>Scan the QR code above</li>
          <li>Enter the 6-digit code to confirm</li>
        </ol>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="code">Verification Code</Label>
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

        <div className="flex gap-3">
          {onCancel && (
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={onCancel}
              disabled={isLoading}
            >
              Cancel
            </Button>
          )}
          <Button
            type="submit"
            className="flex-1"
            disabled={code.length !== 6 || isLoading}
          >
            {isLoading ? <Loader /> : 'Confirm'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default TwoFactorSetup;
