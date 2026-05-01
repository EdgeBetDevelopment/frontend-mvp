import { Clock, Crown, Lock, Star, TrendingUp } from 'lucide-react';

import { Card, CardContent, CardHeader } from '@/shared/components/card';
import { Button } from '@/shared/components/button';

import type { ApiPick } from '@/modules/picks/types';
import { formatPostedAt } from '@/modules/picks/utils';
import { ConfidenceBadge } from './ConfidenceBadge';

const ApiConfidenceBadge = ({
  confidence,
}: {
  confidence: ApiPick['confidence_level'];
}) => {
  const normalized =
    confidence === 'lock' || confidence === 'high' || confidence === 'medium'
      ? confidence
      : 'medium';
  return <ConfidenceBadge confidence={normalized} />;
};

export const ApiPickCard = ({
  pick,
  userStats,
  onUnlock,
}: {
  pick: ApiPick;
  userStats?: { wins: number; losses: number; win_rate: number };
  onUnlock?: () => void;
}) => {
  const gameLabel =
    pick?.game?.home_team || pick?.game?.away_team
      ? `${pick.game.home_team} vs ${pick.game.away_team}`
      : (pick?.game?.name ?? 'TBD');

  const isLocked = pick.to_hide;

  return (
    <Card className="overflow-hidden border-border/50 bg-card/50 transition-all duration-300 hover:border-primary/30">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-semibold text-foreground">
                  {pick.username}
                </h3>
                {pick.is_premium ? (
                  <Crown className="h-4 w-4 text-amber-400" />
                ) : null}
              </div>
              {userStats && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <TrendingUp className="h-3 w-3 text-emerald-400" />
                  <span>{userStats.wins}-{userStats.losses}</span>
                  <span className="text-emerald-400">{userStats.win_rate.toFixed(1)}%</span>
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-col items-end gap-2">
            <ApiConfidenceBadge confidence={pick.confidence_level} />
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="h-3 w-3" />
              {pick?.game?.start_time
                ? formatPostedAt(pick?.game?.start_time)
                : formatPostedAt(pick.created_at)}
            </span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4 relative">
        <div className="rounded-lg border border-border/50 bg-background/50 p-4">
          <div className="mb-2 flex items-center justify-between">
            {!isLocked && (
              <span className="text-sm text-primary">
                {pick.units} Unit{pick.units > 1 ? 's' : ''}
              </span>
            )}
          </div>
          <p className="mb-1 text-sm text-muted-foreground">{gameLabel}</p>
          <div
            className={
              isLocked
                ? 'select-none blur-md pointer-events-none mt-2'
                : 'flex items-center justify-between'
            }
          >
            <span className="text-xl font-bold text-foreground">
              {isLocked ? '████ ██████ +X.X' : pick.pick}
            </span>
            {!isLocked && (
              <span className="text-lg font-semibold text-primary">
                {(() => {
                  const odds = String(pick.odds);
                  if (odds.startsWith('-') || odds.startsWith('+')) {
                    return odds;
                  }
                  const num = Number(odds);
                  return !Number.isNaN(num) && num > 0 ? `+${odds}` : odds;
                })()}
              </span>
            )}
          </div>
        </div>

        <div className="pt-2">
          <h4 className="mb-2 flex items-center gap-2 text-sm font-medium text-foreground">
            <Star className="h-4 w-4 text-primary" />
            Analysis
          </h4>
          <p
            className={`text-sm leading-relaxed text-muted-foreground${isLocked ? ' blur-sm select-none pointer-events-none' : ''}`}
          >
            {isLocked
              ? 'Lorem ipsum dolor sit amet consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua enim ad minim veniam quis nostrud.'
              : pick.analysis}
          </p>
        </div>

        {isLocked && (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-background/40 via-background/70 to-background/90 backdrop-blur-[2px] rounded-lg">
            <Button
              onClick={onUnlock}
              className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-semibold shadow-lg gap-2"
            >
              <Lock className="h-4 w-4" />
              Unlock with Premium
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
