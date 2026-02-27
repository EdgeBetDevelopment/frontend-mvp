'use client';

import React, { useState } from 'react';
import { Button } from '@/shared/components/button';
import { toast } from 'sonner';

interface BackupCodesDisplayProps {
  backupCodes: string[];
  onClose?: () => void;
}

const BackupCodesDisplay: React.FC<BackupCodesDisplayProps> = ({
  backupCodes,
  onClose,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const codesText = backupCodes.join('\n');
    navigator.clipboard.writeText(codesText);
    setCopied(true);
    toast.success('Backup codes copied to clipboard');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const codesText = backupCodes.join('\n');
    const blob = new Blob([codesText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'edgebet-backup-codes.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success('Backup codes downloaded');
  };

  return (
    <div className="w-full max-w-md space-y-6 rounded-lg border border-border bg-card p-6">
      <div className="space-y-2 text-center">
        <h2 className="text-2xl font-bold">Save Your Backup Codes</h2>
        <p className="text-sm text-muted-foreground">
          Store these codes safely. You can use them to access your account if
          you lose your device.
        </p>
      </div>

      <div className="rounded-lg border border-amber-500/50 bg-amber-50 p-4 dark:bg-amber-950/20">
        <p className="text-sm font-medium text-amber-800 dark:text-amber-200">
          ⚠️ Important: Save these codes now. You won't be able to see them
          again!
        </p>
      </div>

      <div className="space-y-2">
        <div className="rounded-lg border border-border bg-muted p-4">
          <div className="grid grid-cols-2 gap-2 font-mono text-sm">
            {backupCodes.map((code, index) => (
              <div key={index} className="rounded bg-background px-2 py-1">
                {code}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex gap-3">
        <Button
          type="button"
          variant="outline"
          className="flex-1"
          onClick={handleCopy}
        >
          {copied ? 'Copied!' : 'Copy'}
        </Button>
        <Button
          type="button"
          variant="outline"
          className="flex-1"
          onClick={handleDownload}
        >
          Download
        </Button>
      </div>

      {onClose && (
        <Button type="button" className="w-full" onClick={onClose}>
          Done
        </Button>
      )}
    </div>
  );
};

export default BackupCodesDisplay;
