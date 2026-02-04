import { Clock, Crown, Star, TrendingUp } from 'lucide-react';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

import type { ModeratorPick } from '../types';
import { ConfidenceBadge } from './ConfidenceBadge';

export const ModeratorCard = ({ pick }: { pick: ModeratorPick }) => {
  return (
    <Card className="overflow-hidden border-border/50 bg-card/50 transition-all duration-300 hover:border-primary/30">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div
              className={`flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br ${pick.moderator.color} text-xl font-bold text-white shadow-lg`}
            >
              {pick.moderator.avatar}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-semibold text-foreground">
                  {pick.moderator.name}
                </h3>
                <Crown className="h-4 w-4 text-amber-400" />
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <TrendingUp className="h-3 w-3 text-emerald-400" />
                  {pick.moderator.record}
                </span>
                <span className="font-medium text-emerald-400">
                  {pick.moderator.winRate}%
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-end gap-2">
            <ConfidenceBadge confidence={pick.confidence} />
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="h-3 w-3" />
              {pick.postedAt}
            </span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="rounded-lg border border-border/50 bg-background/50 p-4">
          <div className="mb-2 flex items-center justify-between">
            <Badge variant="outline" className="text-xs">
              {pick.sport}
            </Badge>
            <span className="text-sm text-muted-foreground">
              {pick.units} Unit{pick.units > 1 ? 's' : ''}
            </span>
          </div>
          <p className="mb-1 text-sm text-muted-foreground">{pick.game}</p>
          <div className="flex items-center justify-between">
            <span className="text-xl font-bold text-foreground">
              {pick.pick}
            </span>
            <span className="text-lg font-semibold text-primary">
              {pick.odds}
            </span>
          </div>
        </div>

        <div className="pt-2">
          <h4 className="mb-2 flex items-center gap-2 text-sm font-medium text-foreground">
            <Star className="h-4 w-4 text-primary" />
            Analysis
          </h4>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {pick.analysis}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
