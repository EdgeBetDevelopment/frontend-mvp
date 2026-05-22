'use client';

import { User, Calendar, Clock, BarChart3 } from 'lucide-react';

import { Card } from '@/shared/components/card';
import { Badge } from '@/shared/components/badge';
import { Button } from '@/shared/components/button';
import { cn } from '@/shared/utils/helper';

import type {
  TennisMatchup,
  TennisMarket,
  Sportsbook,
} from '../data/tennisMatchups';

interface Props {
  matchup: TennisMatchup;
  oddsFormat?: 'american' | 'european';
  bookFilter?: Sportsbook | 'All';
  onSelectGame?: () => void;
  onSelectBet?: (market: TennisMarket) => void;
}

const toDecimal = (american: string) => {
  const n = parseInt(american.replace('+', ''));
  if (isNaN(n)) return american;
  return (n > 0 ? n / 100 + 1 : 100 / Math.abs(n) + 1).toFixed(2);
};

const fmtOdds = (o: string, f: 'american' | 'european') =>
  f === 'european' ? toDecimal(o) : o;

const surfaceColor: Record<string, string> = {
  Clay: 'bg-orange-500/20 text-orange-400 border-orange-500/40',
  Grass: 'bg-green-500/20 text-green-400 border-green-500/40',
  'Hard Court': 'bg-blue-500/20 text-blue-400 border-blue-500/40',
};

const PlayerHeader = ({ p }: { p: TennisMatchup['player1'] }) => (
  <div className="flex min-w-0 items-center gap-2">
    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border bg-secondary/60">
      <User className="h-4 w-4 text-muted-foreground" />
    </div>
    <div className="min-w-0">
      <div className="flex items-center gap-1.5">
        {p.seed && (
          <span className="rounded bg-secondary/60 px-1 py-0.5 font-mono text-[10px] text-muted-foreground">
            [{p.seed}]
          </span>
        )}
        <span className="truncate font-display text-base font-bold text-foreground">
          {p.name}
        </span>
      </div>
      <div className="text-[11px] text-muted-foreground">
        {p.country} · ATP #{p.rank}
      </div>
    </div>
  </div>
);

const TennisMatchupCard = ({
  matchup,
  oddsFormat = 'american',
  bookFilter = 'All',
  onSelectGame,
  onSelectBet,
}: Props) => {
  const valueBets = matchup.valueBets.filter(
    (m) => bookFilter === 'All' || m.books.includes(bookFilter as Sportsbook),
  );
  const conservativeBets = matchup.conservativeBets.filter(
    (m) => bookFilter === 'All' || m.books.includes(bookFilter as Sportsbook),
  );

  return (
    <Card className="overflow-hidden border-border bg-gradient-to-br from-card to-secondary/20 transition-all hover:border-primary/50">
      <div className="border-b border-border/50 p-4">
        <div className="mb-3 flex items-start justify-between gap-3">
          <div className="flex min-w-0 flex-1 flex-wrap items-center gap-3">
            <PlayerHeader p={matchup.player1} />
            <span className="text-sm font-normal text-muted-foreground">
              vs
            </span>
            <PlayerHeader p={matchup.player2} />
          </div>
          <Button
            size="sm"
            onClick={onSelectGame}
            className="shrink-0 gap-1.5 bg-gradient-to-r from-cta to-cta-glow font-semibold text-cta-foreground shadow-[0_0_20px_-5px_hsl(var(--cta)/0.6)] transition-all hover:scale-105 hover:shadow-[0_0_28px_-3px_hsl(var(--cta)/0.85)]"
          >
            <BarChart3 className="h-4 w-4" />
            Full Analysis
          </Button>
        </div>

        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <Calendar className="h-3.5 w-3.5" />
            {matchup.date}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            {matchup.time}
          </span>
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-1.5 border-b border-border/50 bg-secondary/20 px-4 py-3">
        <Badge
          variant="outline"
          className="border-primary/30 bg-primary/20 text-[10px] text-primary"
        >
          {matchup.tournamentType}
        </Badge>
        <span className="truncate text-xs text-muted-foreground">
          {matchup.tournament} · {matchup.round}
        </span>
        <div className="ml-auto flex items-center gap-1.5">
          <Badge
            variant="outline"
            className={cn('text-[10px]', surfaceColor[matchup.surface])}
          >
            {matchup.surface}
          </Badge>
          <Badge variant="outline" className="bg-secondary/40 text-[10px]">
            {matchup.format}
          </Badge>
        </div>
      </div>

      <div className="space-y-4 p-4">
        <div>
          <h4 className="mb-3 text-center font-semibold text-foreground">
            Top 3 Best Value Bets
          </h4>
          <div className="space-y-2">
            {valueBets.length > 0 ? (
              valueBets.map((m, idx) => (
                <button
                  key={idx}
                  onClick={() => onSelectBet?.(m)}
                  className="w-full rounded-lg bg-primary/90 px-4 py-2.5 text-center text-sm font-medium text-primary-foreground transition-colors hover:bg-primary"
                >
                  {m.label} ({fmtOdds(m.odds, oddsFormat)})
                </button>
              ))
            ) : (
              <p className="py-2 text-center text-xs text-muted-foreground">
                No value markets available for selected sportsbook.
              </p>
            )}
          </div>
        </div>

        <div>
          <h4 className="mb-3 text-center font-semibold text-foreground">
            Top 3 Conservative Bets
          </h4>
          <div className="space-y-2">
            {conservativeBets.length > 0 ? (
              conservativeBets.map((m, idx) => (
                <button
                  key={idx}
                  onClick={() => onSelectBet?.(m)}
                  className="w-full rounded-lg bg-primary/90 px-4 py-2.5 text-center text-sm font-medium text-primary-foreground transition-colors hover:bg-primary"
                >
                  {m.label} ({fmtOdds(m.odds, oddsFormat)})
                </button>
              ))
            ) : (
              <p className="py-2 text-center text-xs text-muted-foreground">
                No conservative markets available for selected sportsbook.
              </p>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default TennisMatchupCard;
