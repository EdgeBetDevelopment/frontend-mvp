import Link from 'next/link';
import { Crown, Zap, Bell, TrendingUp, Check } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/shared/components/dialog';
import { Button } from '@/shared/components/button';

const FEATURES = [
  { icon: Zap, text: 'Daily expert picks across NBA, NFL, NHL & more' },
  { icon: Crown, text: 'Exclusive 🔒 LOCK plays from Premier, Kelly & Rondo' },
  { icon: Bell, text: 'Instant email + SMS alerts when picks drop' },
  { icon: TrendingUp, text: 'Full pick history, ROI tracking & analytics' },
];

interface PaywallModalProps {
  open: boolean;
  onClose: () => void;
  startingPrice: number | null;
  isPriceLoading: boolean;
}

export const PaywallModal = ({
  open,
  onClose,
  startingPrice,
  isPriceLoading,
}: PaywallModalProps) => (
  <Dialog open={open} onOpenChange={onClose}>
    <DialogContent className="max-h-[90vh] max-w-md overflow-y-auto border-border/50 bg-card">
      <DialogHeader>
        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-amber-500 to-orange-600 shadow-lg shadow-amber-500/30">
          <Crown className="h-6 w-6 text-white" />
        </div>
        <DialogTitle className="text-center font-display text-xl">
          Unlock <span className="text-primary">Premium Picks</span>
        </DialogTitle>
        <DialogDescription className="text-center text-sm">
          Get instant access to every Pick of the Day from our top moderators.
        </DialogDescription>
      </DialogHeader>

      <div className="space-y-2 py-2">
        {FEATURES.map((item, i) => (
          <div
            key={i}
            className="flex items-center gap-3 rounded-lg border border-border/50 bg-background/50 p-2.5"
          >
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10">
              <Check className="h-3.5 w-3.5 text-primary" />
            </div>
            <span className="text-sm text-foreground">{item.text}</span>
          </div>
        ))}
      </div>

      <div className="rounded-lg border border-primary/20 bg-gradient-to-r from-primary/10 to-primary/5 p-3 text-center">
        <p className="mb-1 text-xs text-muted-foreground">Starting at</p>
        {isPriceLoading ? (
          <div className="mx-auto h-8 w-24 animate-pulse rounded-md bg-muted" />
        ) : (
          <p className="text-2xl font-bold text-foreground">
            ${startingPrice}
            <span className="text-sm font-normal text-muted-foreground">
              /month
            </span>
          </p>
        )}
        <p className="mt-0.5 text-xs text-muted-foreground">Cancel anytime</p>
      </div>

      <div className="flex flex-col gap-2">
        <Button
          asChild
          size="sm"
          className="w-full gap-2 bg-gradient-to-r from-amber-500 to-orange-600 font-semibold text-white shadow-lg hover:from-amber-600 hover:to-orange-700"
        >
          <Link href="/pricing">
            <Crown className="h-4 w-4" />
            Upgrade to Premium
          </Link>
        </Button>
        <Button variant="ghost" size="sm" onClick={onClose} className="w-full">
          Maybe later
        </Button>
      </div>
    </DialogContent>
  </Dialog>
);
