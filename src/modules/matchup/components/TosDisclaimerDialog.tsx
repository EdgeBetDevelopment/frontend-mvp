'use client';

import { useEffect, useState } from 'react';
import { ShieldAlert } from 'lucide-react';
import {
  Button,
  Checkbox,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  ScrollArea,
} from '@/shared/components';

const TOS_STORAGE_KEY = 'tos_accepted';

const TosDisclaimerDialog = () => {
  const [open, setOpen] = useState(false);
  const [accepted, setAccepted] = useState(false);

  useEffect(() => {
    const alreadyAccepted = localStorage.getItem(TOS_STORAGE_KEY) === 'true';
    if (!alreadyAccepted) {
      setOpen(true);
    }
  }, []);

  const handleAccept = () => {
    if (!accepted) return;
    localStorage.setItem(TOS_STORAGE_KEY, 'true');
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={() => {
        /* lock until accepted */
      }}
    >
      <DialogContent
        className="sm:max-w-lg"
        onPointerDownOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full border border-primary/30 bg-primary/10">
            <ShieldAlert className="h-6 w-6 text-primary" />
          </div>
          <DialogTitle className="text-center text-xl">
            Terms of Service & Disclaimer
          </DialogTitle>
          <DialogDescription className="text-center">
            Please review and accept before continuing.
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="max-h-[260px] rounded-md border border-border bg-muted/30 p-4 text-sm leading-relaxed text-muted-foreground">
          <p className="mb-3">
            <strong className="text-foreground">EdgeBet</strong> provides
            data-driven sports betting analysis for informational and
            entertainment purposes only. We do not accept, place, or facilitate
            wagers of any kind.
          </p>
          <p className="mb-3">
            By continuing, you confirm that you are{' '}
            <strong className="text-foreground">
              21 years of age or older
            </strong>{' '}
            and that sports betting is legal in your jurisdiction. All picks,
            projections, and analysis reflect probabilistic outcomes — they are
            not guarantees.
          </p>
          <p className="mb-3">
            Past performance does not predict future results. You are solely
            responsible for any wagers placed based on information from this
            platform. Bet responsibly. If you or someone you know has a gambling
            problem, call{' '}
            <strong className="text-foreground">1-800-GAMBLER</strong>.
          </p>
          <p>
            By clicking "I Agree" you accept our Terms of Service and Privacy
            Policy.
          </p>
        </ScrollArea>

        <div className="flex items-start gap-3 pt-2">
          <Checkbox
            id="tos-accept"
            checked={accepted}
            onCheckedChange={(v) => setAccepted(v === true)}
            className="mt-0.5"
          />
          <label
            htmlFor="tos-accept"
            className="cursor-pointer select-none text-sm leading-snug text-foreground"
          >
            I am 21+ and I agree to the Terms of Service, Privacy Policy, and
            Responsible Gaming guidelines.
          </label>
        </div>

        <DialogFooter className="sm:justify-center">
          <Button
            onClick={handleAccept}
            disabled={!accepted}
            className="w-full sm:w-auto"
          >
            I Agree & Continue
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TosDisclaimerDialog;
