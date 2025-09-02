'use client';

import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  ReadonlyURLSearchParams,
  useRouter,
  useSearchParams,
} from 'next/navigation';

import EmptyPlaceholder from '@/components/EmptyPlaceholder';
import MatchupPageFilters from '@/components/matchup/Filters';
import GameCard from '@/components/matchup/GameCard';
import AuthModal from '@/components/modals/AuthModal';
import GameAnalysisModal from '@/components/modals/game-analysis';
import { useAuth } from '@/context/AuthContext';
import useModalManager from '@/hooks/useModalManager';
import apiService from '@/services';
import { useStore } from '@/store';
import { IGameWithAI } from '@/types/game';
import { ScrollArea } from '@/ui/scroll-area';
import { Skeleton } from '@/ui/skeleton';
import { formUrlQuery } from '@/utils/url';
import ListRenderer from '@/wrappers/ListRenderer';

import TrackBetsAside from './TrackBetAside';

const MatchupPage = () => {
  const { isAuthenticated } = useAuth();
  const { openModal, closeModal, isModalOpen } = useModalManager();
  const { setTrackedGame, setSelectedGame } = useStore();
  const params = useSearchParams() as ReadonlyURLSearchParams;
  const type = params.get('type');
  const router = useRouter();

  const [authDismissed, setAuthDismissed] = useState(false);

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
      const url = formUrlQuery({
        params: params.toString(),
        key: 'game-analysis',
        value: game.game.id.toString(),
      });

      router.push(url);
    }
  };

  const onClickCloseModal = () => {
    closeModal('game-analysis');
    setSelectedGame(null);

    const url = formUrlQuery({
      params: params.toString(),
      keysToRemove: ['game-analysis'],
    });

    router.push(url);
  };

  useEffect(() => {
    if (!isAuthenticated && !authDismissed) {
      openModal('auth');
    }
    if (isAuthenticated && authDismissed) setAuthDismissed(false);
  }, [isAuthenticated, authDismissed, openModal]);

  const onCloseAuth = () => {
    setAuthDismissed(true);
    closeModal('auth');
  };

  useEffect(() => {
    if (!isAuthenticated) return;
    const gameAnalysis = params.get('game-analysis');
    if (!gameAnalysis) return;

    const found = data.find((g) => g.game.id === Number(gameAnalysis));
    if (!found) return;

    setSelectedGame(found);
    if (!isModalOpen('game-analysis')) openModal('game-analysis');
  }, [isAuthenticated, params, data, isModalOpen, openModal, setSelectedGame]);

  return (
    <>
      <div className="tl-container mb-[90px] flex h-[840px] flex-row justify-center gap-14">
        <div className="flex w-full max-w-[calc(100%-420px)] flex-col gap-4">
          <MatchupPageFilters />
          {isAuthenticated && data && (
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
          )}
        </div>
        <TrackBetsAside />
      </div>

      <AuthModal isOpen={isModalOpen('auth')} onClose={onCloseAuth} />

      {/* <TrackBetsModal
        isOpen={isModalOpen('track-bet')}
        onClose={onClickClearTrackBet}
      /> */}
      {isAuthenticated && data && (
        <GameAnalysisModal
          open={isModalOpen('game-analysis')}
          onClose={onClickCloseModal}
        />
      )}
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
