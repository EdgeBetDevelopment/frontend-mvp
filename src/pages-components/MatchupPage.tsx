'use client';

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  ReadonlyURLSearchParams,
  usePathname,
  useRouter,
  useSearchParams,
} from 'next/navigation';

import GameCard from '@/components/matchup/GameCard';
import GameAnalysisModal from '@/components/matchup/modals/GameAnalysisModal';
import AuthModal from '@/components/modals/AuthModal';
import ComingSoonModal from '@/components/modals/ComingSoonModal';
import { useAuth } from '@/context/AuthContext';
import useModalManager from '@/hooks/useModalManager';
import apiService from '@/services';
import { useStore } from '@/store';
import { IGameWithAI } from '@/types/game';
import { Button } from '@/ui/button';
import { ScrollArea } from '@/ui/scroll-area';
import { Skeleton } from '@/ui/skeleton';
import { formUrlQuery } from '@/utils/url';

import AmericanFootballIcon from '@/assets/icons/american-football.svg';
import BaseballIcon from '@/assets/icons/baseball.svg';
import FootbalIcon from '@/assets/icons/football.svg';
import TennisIcon from '@/assets/icons/tenins.svg';

const MatchupPage = () => {
  const { isAuthenticated } = useAuth();
  const { openModal, closeModal, isModalOpen } = useModalManager();
  const { setTrackedGame, setSelectedGame } = useStore();

  const { data = [], isLoading } = useQuery({
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

          <ScrollArea className="pr-4">
            <div className="grid w-full grid-cols-2 gap-4">
              {isLoading
                ? Array.from({ length: 4 }).map((_, index) => (
                    <Skeleton
                      key={index}
                      className="h-[387px] w-[644px] rounded-3xl"
                    />
                  ))
                : data.map((game: IGameWithAI) => (
                    <GameCard
                      key={game.game.id}
                      game={game}
                      onClickTrackBet={() => onClickTrackBet(game)}
                      onClickFullAnalysis={() => onClickFullAnalysis(game)}
                    />
                  ))}
            </div>
          </ScrollArea>
        </div>
      </div>

      <AuthModal
        isOpen={isModalOpen('auth')}
        onClose={() => closeModal('auth')}
      />

      {/* <TrackBetsModal
        isOpen={isModalOpen('track-bet')}
        onClose={onClickClearTrackBet}
      /> */}

      <ComingSoonModal
        title="Coming Soon"
        description="Technical work on this functionality is ongoing"
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

const SPORTS_TYPE = [
  { icon: <FootbalIcon />, label: 'Basketball', value: null },
  { icon: <FootbalIcon />, label: 'NFL', value: 'nfl' },
  { icon: <TennisIcon />, label: 'Tennis', value: 'tenis' },
  { icon: <BaseballIcon />, label: 'AFL', value: 'afl' },
  { icon: <BaseballIcon />, label: 'Rugby', value: 'rugby' },
  {
    icon: <AmericanFootballIcon />,
    label: 'NCAAF',
    value: 'ncaaf',
  },
];

const MatchupPageFilters = () => {
  const pathname = usePathname();
  const params = useSearchParams() as ReadonlyURLSearchParams;
  const router = useRouter();
  const type = params.get('type');

  const onChangeType = (value: string | null) => {
    if (value === type) return;

    let url = pathname;

    if (!value) {
      url = formUrlQuery({
        params: params.toString(),
        keysToRemove: ['type'],
      });
    } else {
      url = formUrlQuery({
        params: params.toString(),
        key: 'type',
        value,
      });
    }

    router.push(url);
  };

  return (
    <div className="flex items-center gap-4">
      {SPORTS_TYPE.map((tab) => (
        <Button
          key={tab.label}
          className="flex-1"
          variant={type === tab.value ? 'brand' : 'default'}
          onClick={() => onChangeType(tab.value)}
        >
          {tab.icon && tab.icon}
          {tab.label}
        </Button>
      ))}
    </div>
  );
};
