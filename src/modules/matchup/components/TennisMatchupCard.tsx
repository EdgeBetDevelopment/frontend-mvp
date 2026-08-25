'use client';

import { User, Calendar, Clock, BarChart3, Loader2 } from 'lucide-react';

import { Card } from '@/shared/components/card';
import { Badge } from '@/shared/components/badge';
import { Button } from '@/shared/components/button';
import { cn } from '@/shared/utils/helper';

import {
  isLinkableTennisPlayer,
  useTennisPlayerProfile,
} from '../hooks/useTennisPlayerProfile';
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

const toAmerican = (decimalStr: string) => {
  const n = parseFloat(decimalStr);
  if (isNaN(n) || n <= 1) return decimalStr;
  if (n >= 2.0) {
    return `+${Math.round((n - 1) * 100)}`;
  }
  return `${Math.round(-100 / (n - 1))}`;
};

const fmtOdds = (o: string, f: 'american' | 'european') =>
  f === 'american' ? toAmerican(o) : o;

const surfaceColor: Record<string, string> = {
  Clay: 'bg-orange-500/20 text-orange-400 border-orange-500/40',
  Grass: 'bg-green-500/20 text-green-400 border-green-500/40',
  'Hard Court': 'bg-blue-500/20 text-blue-400 border-blue-500/40',
};

interface PlayerHeaderProps {
  p: TennisMatchup['player1'];
  onOpenProfile: (name: string) => void;
  isOpening: boolean;
}

const PlayerHeader = ({ p, onOpenProfile, isOpening }: PlayerHeaderProps) => {
  /**
   * Doubles pairs and unranked entrants come through with no country and no
   * ranking, so this line is built from whatever is actually there — otherwise
   * it renders as a bare "· ATP #". The tour label follows the ranking; never
   * hardcode ATP, half the feed is WTA.
   */
  const meta = [
    p.country,
    p.rank ? `${p.tour ? `${p.tour} ` : ''}#${p.rank}` : null,
  ].filter(Boolean);

  const linkable = isLinkableTennisPlayer(p.name);

  return (
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
          {linkable ? (
            <button
              type="button"
              // The card itself has no click target of its own, but the bet
              // buttons below do — stop the event so a name click never
              // doubles as a bet selection.
              onClick={(e) => {
                e.stopPropagation();
                onOpenProfile(p.name);
              }}
              disabled={isOpening}
              title={`View ${p.name} profile`}
              className="flex min-w-0 items-center gap-1 truncate font-display text-base font-bold text-foreground transition-colors hover:text-primary hover:underline disabled:cursor-progress disabled:opacity-70"
            >
              <span className="truncate">{p.name}</span>
              {isOpening && (
                <Loader2 className="h-3.5 w-3.5 shrink-0 animate-spin text-muted-foreground" />
              )}
            </button>
          ) : (
            <span className="truncate font-display text-base font-bold text-foreground">
              {p.name}
            </span>
          )}
        </div>
        {meta.length > 0 && (
          <div className="text-[11px] text-muted-foreground">
            {meta.join(' · ')}
          </div>
        )}
      </div>
    </div>
  );
};

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

  const { openProfile, pendingName } = useTennisPlayerProfile();

  const noBets = valueBets.length === 0 && conservativeBets.length === 0;
  const showUnpriceableReason = noBets && !!matchup.betsUnpriceableReason;

  /**
   * Why a list is empty. A list the backend sent full but the sportsbook filter
   * emptied is a filter problem; anything else is the model's own reason, which
   * we render verbatim. Only claim a sportsbook cause when one actually applies.
   */
  const emptyReason = (
    source: TennisMarket[],
    reason: string | null | undefined,
  ) =>
    source.length > 0
      ? 'No markets from the selected sportsbook.'
      : (reason ?? 'No bets in this category for this match.');

  return (
    <Card className="overflow-hidden border-border bg-gradient-to-br from-card to-secondary/20 transition-all hover:border-primary/50">
      <div className="border-b border-border/50 p-4">
        <div className="mb-3 flex items-start justify-between gap-3">
          <div className="flex min-w-0 flex-1 flex-wrap items-center gap-3">
            <PlayerHeader
              p={matchup.player1}
              onOpenProfile={openProfile}
              isOpening={pendingName === matchup.player1.name}
            />
            <span className="text-sm font-normal text-muted-foreground">
              vs
            </span>
            <PlayerHeader
              p={matchup.player2}
              onOpenProfile={openProfile}
              isOpening={pendingName === matchup.player2.name}
            />
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
        {showUnpriceableReason ? (
          <p className="rounded-lg border border-border/50 bg-secondary/30 px-4 py-3 text-center text-xs text-muted-foreground">
            {matchup.betsUnpriceableReason}
          </p>
        ) : (
          <>
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
                      {m.label}
                      {m.odds ? ` (${fmtOdds(m.odds, oddsFormat)})` : ''}
                    </button>
                  ))
                ) : (
                  <p className="py-2 text-center text-xs leading-relaxed text-muted-foreground">
                    {emptyReason(
                      matchup.valueBets,
                      matchup.valueBetsEmptyReason,
                    )}
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
                      {m.label}
                      {m.odds ? ` (${fmtOdds(m.odds, oddsFormat)})` : ''}
                    </button>
                  ))
                ) : (
                  <p className="py-2 text-center text-xs leading-relaxed text-muted-foreground">
                    {emptyReason(
                      matchup.conservativeBets,
                      matchup.conservativeBetsEmptyReason,
                    )}
                  </p>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </Card>
  );
};

export default TennisMatchupCard;
