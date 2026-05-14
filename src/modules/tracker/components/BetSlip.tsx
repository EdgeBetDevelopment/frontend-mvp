import {
  Calendar,
  Clock,
  DollarSign,
  Loader2,
  TrendingDown,
  TrendingUp,
} from 'lucide-react';
import React from 'react';

import { Badge } from '@/shared/components/badge';
import { Card } from '@/shared/components/card';
import type { BetStatus, TrackedBet } from '@/modules/tracker/types';

type StatusConfig = {
  label: string;
  variant: 'default' | 'secondary' | 'destructive' | 'outline';
  icon: React.ElementType;
  colorClass: string;
};

const statusConfig: Record<BetStatus, StatusConfig> = {
  pending: {
    label: 'Pending',
    variant: 'secondary',
    icon: Loader2,
    colorClass: 'text-yellow-500',
  },
  won: {
    label: 'Won',
    variant: 'default',
    icon: TrendingUp,
    colorClass: 'text-green-500',
  },
  lost: {
    label: 'Lost',
    variant: 'destructive',
    icon: TrendingDown,
    colorClass: 'text-red-500',
  },
};

interface BetSlipProps {
  bet: TrackedBet;
}

export const BetSlip = ({ bet }: BetSlipProps) => {
  const config = statusConfig[bet.status];
  const StatusIcon = config.icon;
  const isParlay = bet.type === 'parlay';

  return (
    <Card className="border-border bg-card p-5 transition-colors hover:border-primary/30">
      <div className="mb-4 flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div
            className={`flex h-10 w-10 items-center justify-center rounded-full ${
              bet.status === 'won'
                ? 'bg-green-500/20'
                : bet.status === 'lost'
                  ? 'bg-red-500/20'
                  : 'bg-yellow-500/20'
            }`}
          >
            <StatusIcon
              className={`h-5 w-5 ${config.colorClass} ${bet.status === 'pending' ? 'animate-spin' : ''}`}
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <Badge
                variant={isParlay ? 'default' : 'outline'}
                className="text-xs"
              >
                {isParlay ? `Parlay (${bet.legs.length} legs)` : 'Single'}
              </Badge>
              <Badge variant={config.variant} className="text-xs">
                {config.label}
              </Badge>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">
              {new Date(bet.createdAt).toLocaleString('en-US', {
                month: 'short',
                day: 'numeric',
                hour: 'numeric',
                minute: '2-digit',
                hour12: true,
              })}
            </p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm text-muted-foreground">Risk</p>
          <p className="font-bold text-foreground">
            ${bet.riskAmount.toFixed(2)}
          </p>
        </div>
      </div>

      <div className="mb-4 space-y-2">
        {bet.legs.map((leg) => (
          <div
            key={leg.id}
            className={`rounded-md border px-3 py-2 ${
              leg.status === 'won'
                ? 'border-green-500/30 bg-green-500/10'
                : leg.status === 'lost'
                  ? 'border-red-500/30 bg-red-500/10'
                  : 'border-border/50 bg-secondary/30'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="mb-1 flex items-center gap-2">
                  <Badge variant="outline" className="px-1.5 py-0 text-xs">
                    {leg.sport}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {leg.homeTeam} vs {leg.awayTeam}
                  </span>
                </div>
                <p className="text-sm font-medium text-foreground">
                  {leg.description}{' '}
                  <span className="font-bold text-primary">{leg.odds}</span>
                </p>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Calendar className="h-3 w-3" />
                  {leg.date}
                </div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  {leg.time}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between border-t border-border pt-3">
        <div className="flex items-center gap-2">
          <DollarSign className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">
            {bet.status === 'pending' ? 'Potential Payout' : 'Payout'}
          </span>
        </div>
        <p
          className={`text-lg font-bold ${
            bet.status === 'won'
              ? 'text-green-500'
              : bet.status === 'lost'
                ? 'text-red-500 line-through'
                : 'text-primary'
          }`}
        >
          ${bet.status === 'lost' ? '0.00' : bet.potentialPayout.toFixed(2)}
        </p>
      </div>
    </Card>
  );
};
