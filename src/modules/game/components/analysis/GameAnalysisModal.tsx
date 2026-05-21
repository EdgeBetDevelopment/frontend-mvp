'use client';

import React, { useEffect, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { TrendingUp, Users, Zap } from 'lucide-react';

import { useStore } from '@/store';
import { Dialog, DialogContent } from '@/shared/components/dialog';
import { ScrollArea } from '@/shared/components/scroll-area';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/shared/components/tabs';
import { getTeamInfoByName } from '@/shared/utils/team';
import { formatUtcToLocalDate, formatUtcToLocalTimeAmPm } from '@/shared/utils';
import { IGameWithAI } from '@/modules/game/types';
import GameModalHeader from './GameModalHeader';
import GameStatsRow from './GameStatsRow';
import AnalysisTabContent from './AnalysisTabContent';
import BettingPicksTabContent from './BettingPicksTabContent';
import InjuryReportTabContent from './InjuryReportTabContent';

interface IGameAnalysisModal {
  open: boolean;
  onClose: () => void;
}

const GameAnalysisModal = ({ open, onClose }: IGameAnalysisModal) => {
  const { selectedGame: game, setSelectedGame } = useStore();
  const [isClient, setIsClient] = useState(false);
  const queryClient = useQueryClient();

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!open || !game?.game?.id) return;

    const updateGameFromCache = () => {
      const gamesData = queryClient.getQueriesData<{ pages: IGameWithAI[][] }>({
        queryKey: ['games-feed'],
      });

      if (gamesData.length > 0) {
        const [, cachedData] = gamesData[0];
        if (cachedData?.pages) {
          const allGames = cachedData.pages.flat();
          const updatedGame = allGames.find(
            (g) => g?.game?.id === game.game.id,
          );

          if (updatedGame) {
            setSelectedGame(updatedGame);
          }
        }
      }
    };

    updateGameFromCache();

    const unsubscribe = queryClient.getQueryCache().subscribe((event) => {
      if (
        event?.type === 'updated' &&
        event?.query.queryKey[0] === 'games-feed'
      ) {
        updateGameFromCache();
      }
    });

    return () => {
      unsubscribe();
    };
  }, [open, game?.game?.id, queryClient, setSelectedGame]);

  const predictedWinnerInfo = React.useMemo(() => {
    if (!game?.prediction?.predicted_winner || !game?.game) return null;
    try {
      return getTeamInfoByName(game?.prediction?.predicted_winner, game?.game);
    } catch (error) {
      console.error('Error getting predicted winner info:', error);
      return null;
    }
  }, [game?.prediction?.predicted_winner, game?.game]);

  const favoriteTeamInfo = React.useMemo(() => {
    if (!game?.prediction?.favorite_team || !game?.game) return null;
    try {
      return getTeamInfoByName(game?.prediction?.favorite_team, game?.game);
    } catch (error) {
      console.error('Error getting favorite team info:', error);
      return null;
    }
  }, [game?.prediction?.favorite_team, game?.game]);

  if (!isClient || !game) {
    return null;
  }

  const analysis = game.prediction?.analysis;
  const overview = analysis?.overview || [];
  const homeTeamAnalysis = analysis?.home_team_analysis;
  const awayTeamAnalysis = analysis?.away_team_analysis;
  const riskFactors = analysis?.risk_factors || [];
  const homeInjuries = homeTeamAnalysis?.injuries || '';
  const awayInjuries = awayTeamAnalysis?.injuries || '';
  const homeKeyStrengths = homeTeamAnalysis?.key_strengths || [];
  const awayKeyStrengths = awayTeamAnalysis?.key_strengths || [];

  const homeTeamName = game?.game?.home_team;
  const awayTeamName = game?.game?.away_team;
  const gameDate = formatUtcToLocalDate(game?.game?.start_time);
  const gameTime = formatUtcToLocalTimeAmPm(game?.game?.start_time);

  // Calculate point differentials
  const homeWinProb = game.prediction?.win_probability_home || 0;
  const awayWinProb = game.prediction?.win_probability_away || 0;

  return (
    <Dialog key={game?.game?.id} open={open} onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh] max-w-[95vw] gap-0 overflow-hidden p-0 sm:max-w-[90vw] md:max-w-4xl lg:max-w-5xl">
        <GameModalHeader
          game={game.game}
          homeTeamName={homeTeamName}
          awayTeamName={awayTeamName}
          gameDate={gameDate}
          gameTime={gameTime}
        />

        <ScrollArea className="max-h-[calc(90vh-80px)]">
          <div className="space-y-4 p-4 sm:space-y-6 sm:p-6">
            <GameStatsRow
              predictedWinnerName={
                predictedWinnerInfo?.name || game.prediction?.predicted_winner
              }
              homeTeamName={homeTeamName}
              awayTeamName={awayTeamName}
              homeWinProb={homeWinProb}
              awayWinProb={awayWinProb}
            />

            <Tabs defaultValue="analysis" className="w-full">
              <TabsList className="w-full flex-nowrap justify-start overflow-x-auto bg-secondary/30 p-1">
                <TabsTrigger
                  value="analysis"
                  className="flex shrink-0 items-center gap-1 text-xs sm:gap-2 sm:text-sm"
                >
                  <TrendingUp className="h-4 w-4" />
                  <span>Analysis</span>
                </TabsTrigger>
                <TabsTrigger
                  value="bets"
                  className="flex shrink-0 items-center gap-1 text-xs sm:gap-2 sm:text-sm"
                >
                  <Zap className="h-4 w-4" />
                  <span className="hidden sm:inline">Betting Picks</span>
                  <span className="sm:hidden">Bets</span>
                </TabsTrigger>
                <TabsTrigger
                  value="injuries"
                  className="flex shrink-0 items-center gap-1 text-xs sm:gap-2 sm:text-sm"
                >
                  <Users className="h-4 w-4" />
                  <span className="hidden sm:inline">Injury Report</span>
                  <span className="sm:hidden">Injuries</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="analysis" className="mt-4 space-y-4">
                <AnalysisTabContent
                  overview={overview}
                  homeTeamName={homeTeamName}
                  awayTeamName={awayTeamName}
                  homeInjuries={homeInjuries}
                  awayInjuries={awayInjuries}
                  homeKeyStrengths={homeKeyStrengths}
                  awayKeyStrengths={awayKeyStrengths}
                  riskFactors={riskFactors}
                />
              </TabsContent>

              <TabsContent value="bets" className="mt-4 space-y-4">
                <BettingPicksTabContent
                  valueBets={game.prediction?.value_bets ?? []}
                  conservativeBets={game.prediction?.conservative_bets ?? []}
                />
              </TabsContent>

              <TabsContent value="injuries" className="mt-4">
                <InjuryReportTabContent
                  homeTeamInjuries={game.scoreboard?.home_team_injury}
                  awayTeamInjuries={game.scoreboard?.away_team_injury}
                />
              </TabsContent>
            </Tabs>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default GameAnalysisModal;
