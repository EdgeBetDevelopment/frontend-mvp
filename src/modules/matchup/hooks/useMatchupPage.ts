import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import {
  ReadonlyURLSearchParams,
  useRouter,
  useSearchParams,
} from 'next/navigation';

import { IGameWithAI } from '@/modules/game/types';
import { useAuth } from '@/context/AuthContext';
import useModalManager from '@/shared/hooks/useModalManager';
import { gameService } from '@/modules/game';
import { useStore } from '@/store';
import { formUrlQuery } from '@/shared/utils';
import { MODAL_IDS } from '@/shared/constants';

export const useMatchupPage = () => {
  const { isAuthenticated } = useAuth();
  const modalManager = useModalManager();
  const storeManager = useStore();

  const modalManagerRef = useRef(modalManager);
  const storeManagerRef = useRef(storeManager);

  useEffect(() => {
    modalManagerRef.current = modalManager;
    storeManagerRef.current = storeManager;
  });

  const { openModal, closeModal, isModalOpen } = modalManager;
  const { setSelectedGame, isAmerican } = storeManager;

  const params = useSearchParams() as ReadonlyURLSearchParams;
  const type = params.get('type');
  const router = useRouter();

  const [authError, setAuthError] = useState<402 | null>(null);

  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    error,
  } = useInfiniteQuery<IGameWithAI[], Error>({
    queryKey: ['games-feed'],
    queryFn: ({ pageParam }) =>
      gameService.getGames(pageParam as number | undefined),
    initialPageParam: undefined as number | undefined,
    getNextPageParam: (lastPage) => {
      if (!lastPage || lastPage.length === 0) return undefined;
      const lastGame = lastPage[lastPage.length - 1];
      return Number(lastGame?.game?.id);
    },
    refetchInterval: 300000,
    retry: false,
    enabled: isAuthenticated,
  });

  useEffect(() => {
    if (error) {
      const err = error as { code?: number };
      if (err?.code === 402) setAuthError(402);
    }
  }, [error]);

  const flatGames: IGameWithAI[] = useMemo(
    () => (data ? data.pages.flatMap((page) => page) : []),
    [data],
  );

  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const handleIntersection = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const first = entries[0];
      if (first.isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
    [fetchNextPage, hasNextPage, isFetchingNextPage],
  );

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection, {
      root: null,
      rootMargin: '200px',
      threshold: 0,
    });
    const current = loadMoreRef.current;
    if (current) observer.observe(current);
    return () => {
      if (current) observer.unobserve(current);
    };
  }, [handleIntersection]);

  const onClickFullAnalysis = useCallback(
    (game: IGameWithAI) => {
      if (!isAuthenticated) return;
      setSelectedGame(game);
      openModal(MODAL_IDS.GAME_ANALYSIS);
      setTimeout(() => {
        const url = formUrlQuery({
          params: params.toString(),
          key: 'game-analysis',
          value: game?.game?.id?.toString(),
        });
        router.push(url);
      }, 100);
    },
    [isAuthenticated, openModal, setSelectedGame, params, router],
  );

  const onClickCloseModal = useCallback(() => {
    closeModal(MODAL_IDS.GAME_ANALYSIS);
    setTimeout(() => {
      setSelectedGame(null);
      const url = formUrlQuery({
        params: params.toString(),
        keysToRemove: ['game-analysis'],
      });
      router.push(url);
    }, 150);
  }, [closeModal, setSelectedGame, params, router]);

  useEffect(() => {
    if (!isAuthenticated) return;

    const gameAnalysisParam = params.get('game-analysis');
    const { openModal, closeModal, isModalOpen } = modalManagerRef.current;
    const { setSelectedGame } = storeManagerRef.current;

    if (!gameAnalysisParam) {
      if (isModalOpen(MODAL_IDS.GAME_ANALYSIS)) {
        closeModal(MODAL_IDS.GAME_ANALYSIS);
        setTimeout(() => setSelectedGame(null), 100);
      }
      return;
    }

    const gameId = Number(gameAnalysisParam);
    const found = flatGames.find((g) => g?.game?.id === gameId);

    if (found) {
      const currentGame = useStore.getState().selectedGame;
      if (!currentGame || currentGame?.game?.id !== found?.game?.id) {
        setSelectedGame(found);
      }
      if (!isModalOpen(MODAL_IDS.GAME_ANALYSIS)) {
        openModal(MODAL_IDS.GAME_ANALYSIS);
      }
    }
  }, [isAuthenticated, params, flatGames]);

  return {
    isAuthenticated,
    authError,
    type,
    router,
    isAmerican,
    isLoading,
    isError,
    flatGames,
    loadMoreRef,
    isModalOpen,
    onClickFullAnalysis,
    onClickCloseModal,
  };
};
