'use client';

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { ReadonlyURLSearchParams, useSearchParams } from 'next/navigation';

import EmptyPlaceholder from '@/components/EmptyPlaceholder';
import MatchupPageFilters from '@/components/matchup/Filters';
import GameCard from '@/components/matchup/GameCard';
import GameAnalysisModal from '@/components/matchup/modals/GameAnalysisModal';
import AuthModal from '@/components/modals/AuthModal';
import TrackBetsModal from '@/components/modals/TrackBetsModal';
import { useAuth } from '@/context/AuthContext';
import useModalManager from '@/hooks/useModalManager';
import apiService from '@/services';
import { useStore } from '@/store';
import { IGameWithAI } from '@/types/game';
import { ScrollArea } from '@/ui/scroll-area';
import { Skeleton } from '@/ui/skeleton';
import ListRenderer from '@/wrappers/ListRenderer';

const MatchupPage = () => {
  const { isAuthenticated } = useAuth();
  const { openModal, closeModal, isModalOpen } = useModalManager();
  const { setTrackedGame, setSelectedGame } = useStore();
  const params = useSearchParams() as ReadonlyURLSearchParams;
  const type = params.get('type');

  const {
    data = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ['scrore-board'],
    queryFn: () => apiService.getGames(),
  });

  const onClickTrackBet = (game: IGameWithAI) => {
    if (!isAuthenticated) {
      openModal('auth');
      return;
    } else {
      setTrackedGame(game);
      openModal('track-bet');
    }
  };

  const onClickClearTrackBet = () => {
    setTrackedGame(null);
    closeModal('track-bet');
  };

  const onClickFullAnalysis = (game: IGameWithAI) => {
    if (!isAuthenticated) {
      openModal('auth');
      return;
    } else {
      setSelectedGame(game);
      openModal('game-analysis');
    }
  };

  const onClickCloseModal = () => {
    closeModal('game-analysis');
    setSelectedGame(null);
  };

  return (
    <>
      <div className="tl-container mb-[90px] h-[840px] gap-10">
        <div className="flex flex-col gap-4">
          <MatchupPageFilters />

          <ListRenderer
            isLoading={isLoading}
            data={data}
            isError={!!error}
            errorComponent={<div>Error load a player</div>}
            loadingComponent={<GamesLoading />}
            emptyComponent={
              <EmptyPlaceholder
                className="mt-30"
                title="No games found"
                subtitle="For now, there are no games available."
              />
            }
          >
            {(games) => (
              <ScrollArea className="pr-4">
                <div className="grid w-full grid-cols-2 gap-4">
                  {games.map((game: IGameWithAI) => (
                    <GameCard
                      key={game.game.id}
                      type={type}
                      game={game}
                      onClickTrackBet={() => onClickTrackBet(game)}
                      onClickFullAnalysis={() => onClickFullAnalysis(game)}
                    />
                  ))}
                </div>
              </ScrollArea>
            )}
          </ListRenderer>
        </div>
      </div>

      <AuthModal
        isOpen={isModalOpen('auth')}
        onClose={() => closeModal('auth')}
      />

      <TrackBetsModal
        isOpen={isModalOpen('track-bet')}
        onClose={onClickClearTrackBet}
      />

      <GameAnalysisModal
        open={isModalOpen('game-analysis')}
        onClose={onClickCloseModal}
      />
    </>
  );
};

export default MatchupPage;

const GamesLoading = () => {
  return (
    <div className="grid w-full grid-cols-2 gap-4">
      {Array.from({ length: 4 }).map((_, index) => (
        <Skeleton key={index} className="h-[387px] w-full rounded-3xl" />
      ))}
    </div>
  );
};
