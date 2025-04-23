'use client';

import React from 'react';
import { useQuery } from '@tanstack/react-query';

import GameCard from '@/components/matchup/GameCard';
import TrackBet from '@/components/matchup/TrackBet';
import useModalManager from '@/hooks/useModalManager';
import apiService from '@/services';
import { useStore } from '@/store';
import { IGame } from '@/types/game';
import { ScrollArea } from '@/ui/scroll-area';
import { Skeleton } from '@/ui/skeleton';
import GameAnalysisModal from '../../components/matchup/modals/GameAnalysisModal';

const Matchup = () => {
  const { openModal, closeModal, isModalOpen } = useModalManager();
  const { setTrackedGame, setSelectedGame } = useStore();

  const { data = { games: [] }, isLoading } = useQuery<any>({
    queryKey: ['scrore-board'],
    queryFn: () => apiService.getScoreboard(),
  });

  const onClickTrackBet = (game: IGame) => {
    setTrackedGame(game);
  };

  const onClickClearTrackBet = () => {
    setTrackedGame(null);
  };

  const onClickFullAnalysis = (game: IGame) => {
    setSelectedGame(game);
    openModal('gameAnalysis');
  };

  const onClickCloseModal = () => {
    closeModal('gameAnalysis');
    setSelectedGame(null);
  };

  return (
    <>
      <div className="tl-container mb-[90px] flex h-[840px] items-stretch gap-10">
        <ScrollArea className="pr-4">
          <div className="grid w-full grid-cols-2 gap-4">
            {isLoading
              ? Array.from({ length: 4 }).map((_, index) => (
                  <Skeleton
                    key={index}
                    className="h-[411px] w-[462px] rounded-3xl"
                  />
                ))
              : data.games.map((game: IGame) => (
                  <GameCard
                    key={game.gameId}
                    game={game}
                    onClickTrackBet={() => onClickTrackBet(game)}
                    onClickFullAnalysis={() => onClickFullAnalysis(game)}
                  />
                ))}
          </div>
        </ScrollArea>

        <TrackBet
          onClickFullAnalysis={onClickFullAnalysis}
          onClickClearTrackBet={onClickClearTrackBet}
        />
      </div>

      <GameAnalysisModal
        open={isModalOpen('gameAnalysis')}
        onClose={onClickCloseModal}
      />
    </>
  );
};

export default Matchup;
