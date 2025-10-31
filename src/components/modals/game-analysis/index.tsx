'use client';

import React, { useEffect, useState } from 'react';

import { cn } from '@/lib/utils';
import { useStore } from '@/store';
import CardContainer from '@/ui/containers/CardContainer';
import {
  Dialog,
  DialogContent,
  DialogContentWrapper,
  DialogHeader,
  DialogTitle,
} from '@/ui/dialog';
import { getTeamInfoByName } from '@/utils/team';
import { GameCardHeader } from '../../matchup/GameCard';

import { Analysis } from './Analys';
import ErrorBoundary from './ErrorBoundary';
import InjuryTable from './InjuryTable';
import KeyPlayers from './KeyPlayers';
import MarketSummary from './MarketSummary';
import TeamStatsTable from './TeamStatsTable';
import TopBets from './TobBets';
import TopTeams from './TopTeams';

interface IGameAnalysisModal {
  open: boolean;
  onClose: () => void;
}

const GameAnalysisModal = ({ open, onClose }: IGameAnalysisModal) => {
  const { selectedGame: game } = useStore();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const predictedWinnerInfo = React.useMemo(() => {
    if (!game?.prediction?.predicted_winner || !game?.game) return null;
    try {
      return getTeamInfoByName(game.prediction.predicted_winner, game.game);
    } catch (error) {
      console.error('Error getting predicted winner info:', error);
      return null;
    }
  }, [game?.prediction?.predicted_winner, game?.game]);

  const favoriteTeamInfo = React.useMemo(() => {
    if (!game?.prediction?.favorite_team || !game?.game) return null;
    try {
      return getTeamInfoByName(game.prediction.favorite_team, game.game);
    } catch (error) {
      console.error('Error getting favorite team info:', error);
      return null;
    }
  }, [game?.prediction?.favorite_team, game?.game]);

  if (!isClient || !game) {
    return null;
  }

  return (
    <Dialog key={game.game.id} open={open} onOpenChange={onClose}>
      <DialogContent className="tl-gradient-mistBlue">
        <DialogHeader className="flex flex-col gap-5">
          <DialogTitle>Full Analysis</DialogTitle>
        </DialogHeader>

        <ErrorBoundary>
          <DialogContentWrapper className="flex flex-col gap-5">
            {game && (
              <>
                <GameCardHeader game={game} />

                <Analysis text={game.prediction?.analysis} />

                <TopTeams
                  favoriteTeamInfo={favoriteTeamInfo}
                  predictedWinnerInfo={predictedWinnerInfo}
                />

                <TopBets
                  valueBets={game?.prediction?.value_bets || []}
                  conservativeBets={game?.prediction?.conservative_bets || []}
                />

                {game.game && (
                  <KeyPlayers
                    homeTeamId={game.game.home_team_id}
                    awayTeamId={game.game.away_team_id}
                    homeLeader={game.scoreboard?.home_leaders}
                    awayLeader={game.scoreboard?.away_leaders}
                    playersHome={game.scoreboard?.home_team_players}
                    playersAway={game.scoreboard?.away_team_players}
                  />
                )}

                <InjuryTable
                  homeInjuries={game?.scoreboard?.home_team_injury}
                  awayInjuries={game?.scoreboard?.away_team_injury}
                />

                {game.prediction && (
                  <MarketSummary game={game} prediction={game.prediction} />
                )}

                {game.game && (
                  <TeamStatsTable
                    homeTeamId={game.game.home_team_id}
                    awayTeamId={game.game.away_team_id}
                  />
                )}
              </>
            )}
          </DialogContentWrapper>
        </ErrorBoundary>
      </DialogContent>
    </Dialog>
  );
};

export default GameAnalysisModal;

export const Card = ({
  children,
  className,
  title,
  icon,
}: {
  children: React.ReactNode;
  className?: string;
  title: string;
  icon: React.ReactNode;
}) => {
  return (
    <CardContainer
      className={cn('flex flex-1/2 flex-col gap-2 rounded-lg', className)}
    >
      <div className="tl-flex-icon align-bottom text-sm font-medium tracking-normal">
        {icon}
        {title}
      </div>

      {children}
    </CardContainer>
  );
};
