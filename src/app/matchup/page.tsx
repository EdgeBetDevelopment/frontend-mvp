'use client';

import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import GameCard from '@/components/matchup/GameCard';
import { Skeleton } from '@/components/ui/skeleton';
import useModalManager from '@/hooks/useModalManager';
import apiService from '@/services';
import { IGame } from '@/types/game';
import GameAnalysisModal from '../../components/matchup/modals/GameAnalysisModal';

const Matchup = () => {
  const { openModal, closeModal, isModalOpen } = useModalManager();
  const [selectedGame, setSelectedGame] = useState<IGame | null>(null);

  const { data = { games: [] }, isLoading } = useQuery<any>({
    queryKey: ['scrore-board'],
    queryFn: () => apiService.getScoreboard(),
  });

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
      <div className="tl-container mb-[90px] flex items-stretch gap-10">
        <div className="grid w-full grid-cols-2 gap-4">
          {isLoading
            ? Array.from({ length: 4 }).map((_, index) => (
                <Skeleton
                  key={index}
                  className="h-[342px] w-full rounded-3xl"
                />
              ))
            : data.games.map((game: IGame) => (
                <GameCard
                  key={game.gameId}
                  game={game}
                  onClickFullAnalysis={() => onClickFullAnalysis(game)}
                />
              ))}
        </div>

        {/* <TrackBet /> */}
      </div>

      <GameAnalysisModal
        open={isModalOpen('gameAnalysis')}
        onClose={onClickCloseModal}
        game={selectedGame}
      />
    </>
  );
};

export default Matchup;

const TrackBet = () => {
  return (
    <div className="border-border flex flex-col gap-3 rounded-3xl border p-3">
      TrackBEt
    </div>
  );
};
