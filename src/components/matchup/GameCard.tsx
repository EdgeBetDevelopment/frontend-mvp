'use client';

import React from 'react';
import Link from 'next/link';
import { toast } from 'sonner';
import { Calendar, Clock, ChevronRight } from 'lucide-react';

import { useAuth } from '@/context/AuthContext';
import { useIsMobile } from '@/hooks/useIsMobile';
import useModalManager from '@/hooks/useModalManager';
import { ROUTES } from '@/routes';
import { useStore } from '@/store';
import { IGameWithAI, IBet } from '@/types/game';
import { Badge } from '@/ui/badge';
import { Card } from '@/ui/card';
import { convertAmericanToDecimal } from '@/utils/convertAmericanToDecimal';
import { formatOddsWithSign } from '@/utils/formatOdds';
import { formatUtcToLocalDate, formatUtcToLocalTimeAmPm } from '@/utils/time';

interface IGameCard {
  game: IGameWithAI;
  onClickFullAnalysis: () => void;
  type: string | null;
}

const GameCard = ({ game, onClickFullAnalysis, type }: IGameCard) => {
  const { isAuthenticated } = useAuth();
  const formattedDate = formatUtcToLocalDate(game?.game?.start_time);
  const formattedTime = formatUtcToLocalTimeAmPm(game?.game?.start_time);

  return (
    <Card className="overflow-hidden border-border bg-gradient-to-br from-card to-secondary/20 transition-all hover:border-primary/50">
      {/* Header */}
      <div className="border-b border-border/50 p-4">
        <div className="mb-2 flex items-center justify-between">
          <h3 className="font-display text-lg font-bold text-foreground">
            <Link
              href={ROUTES.TEAM(game?.game?.home_team_id)}
              className="hover:underline"
            >
              {game?.game?.home_team}
            </Link>{' '}
            <span className="font-normal text-muted-foreground">vs</span>{' '}
            <Link
              href={ROUTES.TEAM(game?.game?.away_team_id)}
              className="hover:underline"
            >
              {game?.game?.away_team}
            </Link>
          </h3>
        </div>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <Calendar className="h-3.5 w-3.5" />
            {formattedDate}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            {formattedTime}
          </span>
        </div>
      </div>

      {/* Sport Badge */}
      <div className="border-b border-border/50 bg-secondary/20 px-4 py-3">
        <div className="flex items-center gap-2">
          <Badge
            variant="outline"
            className="border-primary/30 bg-primary/20 text-primary"
          >
            {type ? type.toUpperCase() : 'NBA'}
          </Badge>
          <ChevronRight className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">
            {game?.scoreboard?.label || 'Regular Season Game'}
          </span>
        </div>
        <button
          className="mt-2 flex items-center gap-1 text-sm font-medium text-foreground transition-colors hover:text-primary"
          onClick={onClickFullAnalysis}
        >
          Full analysis
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      {/* Bets Section */}
      {isAuthenticated && (
        <div className="space-y-4 p-4">
          <GameBets game={game} />
        </div>
      )}
    </Card>
  );
};

export default GameCard;

const GameBets = ({ game }: { game: IGameWithAI }) => {
  const isAmerican = useStore((state) => state.isAmerican);

  return (
    <>
      {/* Value Bets */}
      <div>
        <h4 className="mb-3 text-center font-semibold text-foreground">
          Top 3 Best Value Bets
        </h4>
        <div className="space-y-2">
          {game?.prediction?.value_bets
            ?.slice(0, 3)
            .map((bet, index) => (
              <GameBetsItem
                game={game}
                isAmerican={isAmerican}
                key={index}
                bet={bet}
              />
            ))}
        </div>
      </div>

      {/* Conservative Bets */}
      <div>
        <h4 className="mb-3 text-center font-semibold text-foreground">
          Top 3 Conservative Bets
        </h4>
        <div className="space-y-2">
          {game?.prediction?.conservative_bets
            ?.slice(0, 3)
            .map((bet, index) => (
              <GameBetsItem
                game={game}
                isAmerican={isAmerican}
                key={index}
                bet={bet}
              />
            ))}
        </div>
      </div>
    </>
  );
};

const GameBetsItem = ({
  bet,
  isAmerican,
  game,
}: {
  bet: IBet;
  isAmerican: boolean;
  game: IGameWithAI;
}) => {
  const { setTrackedGame, upsertSingle, upsertParlayPick } = useStore();
  const { openModal } = useModalManager();
  const isMobile = useIsMobile();

  const decimalOdds = convertAmericanToDecimal(bet.bet_coefficient).toFixed(2);

  const displayedText = isAmerican
    ? `${bet.bet_name} (${formatOddsWithSign(bet.bet_coefficient, true)})`
    : `${bet.bet_name} (${decimalOdds})`;

  const resolveTeamId = (teamName: string) => {
    if (teamName === game?.game?.home_team) {
      return String(game?.game?.home_team_id);
    }
    if (teamName === game?.game?.away_team) {
      return String(game?.game?.away_team_id);
    }
    return '';
  };

  const handleClick = () => {
    setTrackedGame(game);

    const pick = {
      game_id: game?.game?.id,
      odds: bet.bet_coefficient,
      selected_team_id: resolveTeamId(bet.bet_team),
      selected_team_name: bet.bet_team,
      description: bet.bet_name,
      sport: 'nba' as const,
    };

    upsertParlayPick(pick);
    upsertSingle(pick);
    openModal('track-bet');

    if (isMobile) {
      toast.success('Bet successfully recorded in the tracker');
    }
  };

  return (
    <button
      onClick={handleClick}
      className="w-full cursor-pointer rounded-lg bg-primary/90 px-4 py-2.5 text-center text-sm font-medium text-primary-foreground transition-colors hover:bg-primary"
    >
      {displayedText}
    </button>
  );
};
