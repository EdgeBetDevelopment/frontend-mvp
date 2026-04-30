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

export const PaywallModal = ({ open, onClose, startingPrice, isPriceLoading }: PaywallModalProps) => (
  <Dialog open={open} onOpenChange={onClose}>
    <DialogContent className="max-w-lg bg-card border-border/50">
      <DialogHeader>
        <div className="mx-auto w-16 h-16 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center mb-4 shadow-lg shadow-amber-500/30">
          <Crown className="h-8 w-8 text-white" />
        </div>
        <DialogTitle className="text-center text-2xl font-display">
          Unlock <span className="text-primary">Premium Picks</span>
        </DialogTitle>
        <DialogDescription className="text-center text-base">
          Get instant access to every Pick of the Day from our top moderators.
        </DialogDescription>
      </DialogHeader>

      <div className="space-y-3 py-4">
        {FEATURES.map((item, i) => (
          <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-background/50 border border-border/50">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <Check className="h-4 w-4 text-primary" />
            </div>
            <span className="text-sm text-foreground pt-1">{item.text}</span>
          </div>
        ))}
      </div>

      <div className="bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 rounded-lg p-4 text-center">
        <p className="text-sm text-muted-foreground mb-1">Starting at</p>
        {isPriceLoading ? (
          <div className="h-9 w-24 mx-auto rounded-md bg-muted animate-pulse" />
        ) : (
          <p className="text-3xl font-bold text-foreground">
            ${startingPrice}
            <span className="text-base font-normal text-muted-foreground">/month</span>
          </p>
        )}
        <p className="text-xs text-muted-foreground mt-1">Cancel anytime</p>
      </div>

      <div className="flex flex-col gap-2">
        <Button
          asChild
          size="lg"
          className="w-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-semibold shadow-lg gap-2"
        >
          <Link href="/pricing">
            <Crown className="h-4 w-4" />
            Upgrade to Premium
          </Link>
        </Button>
        <Button variant="ghost" onClick={onClose} className="w-full">
          Maybe later
        </Button>
      </div>
    </DialogContent>
  </Dialog>
);
