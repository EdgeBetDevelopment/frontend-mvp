'use client';

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import {
  ReadonlyURLSearchParams,
  useRouter,
  useSearchParams,
} from 'next/navigation';
import { Lock, Crown } from 'lucide-react';

import { GameAnalysisModal } from '@/modules/game/components/analysis';
import { IGameWithAI } from '@/modules/game/types';
import { useAuth } from '@/context/AuthContext';
import useModalManager from '@/shared/hooks/useModalManager';
import { gameService } from '@/modules/game';
import { useStore } from '@/store';
import { Button } from '@/shared/components/button';
import { Skeleton } from '@/shared/components/skeleton';
import { formUrlQuery } from '@/shared/utils';
import { ListRenderer } from '@/shared/components';
import Navigation from '@/shared/components/Navigation';
import Footer from '@/shared/components/Footer';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/shared/components/card';

import MatchupPageFilters from './Filters';
import GameCard from './GameCard';
import TrackBetsAside from './TrackBetAside';
import MobileBetSlip from './MobileBetSlip';
import { MODAL_IDS } from '@/shared/constants';

const MatchupPage = () => {
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
  const { setSelectedGame } = storeManager;

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
      if (!lastPage || lastPage.length === 0) {
        return undefined;
      }

      const lastGame = lastPage[lastPage.length - 1];
      const nextLastId = Number(lastGame?.game?.id);

      return nextLastId;
    },
    refetchInterval: 300000,
    retry: false,
    enabled: isAuthenticated,
  });

  useEffect(() => {
    if (error) {
      const err = error as { code?: number };
      if (err?.code === 402) {
        setAuthError(402);
      }
    }
  }, [error]);

  const flatGames: IGameWithAI[] = useMemo(() => {
    return data ? data.pages.flatMap((page) => page) : [];
  }, [data]);

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
      const modalOpen = isModalOpen(MODAL_IDS.GAME_ANALYSIS);
      if (modalOpen) {
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

  // Show login screen if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="container mx-auto px-6 py-8">
          <div className="flex min-h-[60vh] items-center justify-center">
            <Card className="max-w-md">
              <CardHeader>
                <div className="mb-4 flex justify-center">
                  <div className="rounded-full bg-primary/10 p-4">
                    <Lock className="h-8 w-8 text-primary" />
                  </div>
                </div>
                <CardTitle className="text-center text-2xl">
                  Login Required
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-center text-muted-foreground">
                  Please login to access the matchup analysis feature.
                </p>
                <Button
                  className="w-full"
                  onClick={() => router.push('/login')}
                >
                  Login
                </Button>
              </CardContent>
            </Card>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Show subscription screen for 402 (from backend)
  if (authError === 402) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="container mx-auto px-6 py-8">
          <div className="flex min-h-[60vh] items-center justify-center">
            <Card className="max-w-md">
              <CardHeader>
                <div className="mb-4 flex justify-center">
                  <div className="rounded-full bg-primary/10 p-4">
                    <Crown className="h-8 w-8 text-primary" />
                  </div>
                </div>
                <CardTitle className="text-center text-2xl">
                  Premium Access Required
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-center text-muted-foreground">
                  Get access to detailed matchup analysis and AI-powered
                  insights with a premium subscription.
                </p>
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <Crown className="mt-0.5 h-4 w-4 text-primary" />
                    <span className="text-sm">Full game analysis</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Crown className="mt-0.5 h-4 w-4 text-primary" />
                    <span className="text-sm">AI-powered predictions</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Crown className="mt-0.5 h-4 w-4 text-primary" />
                    <span className="text-sm">Real-time matchup data</span>
                  </div>
                </div>
                <Button
                  className="w-full"
                  onClick={() => router.push('/pricing')}
                >
                  View Premium Plans
                </Button>
              </CardContent>
            </Card>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto px-6 py-24">
        <MatchupPageFilters />

        {/* Main Content */}
        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-4">
          {/* Matchups Grid */}
          <div className="lg:col-span-3">
            {isAuthenticated && (
              <ListRenderer
                isLoading={isLoading}
                data={flatGames}
                isError={isError}
                errorComponent={<div>Error load games</div>}
                loadingComponent={<GamesLoading />}
                emptyComponent={
                  <div className="flex h-64 items-center justify-center rounded-lg border border-border bg-card">
                    <p className="text-lg text-muted-foreground">
                      No games scheduled for the next 24 hours
                    </p>
                  </div>
                }
              >
                {(games) => (
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    {games.map((game: IGameWithAI, idx: number) => {
                      const key =
                        game?.game?.id ??
                        `${game?.game?.home_team}-${game?.game?.away_team}-${game?.game?.start_time}-${idx}`;
                      return (
                        <GameCard
                          key={String(key)}
                          type={type}
                          game={game}
                          onClickFullAnalysis={() => onClickFullAnalysis(game)}
                        />
                      );
                    })}
                  </div>
                )}
              </ListRenderer>
            )}
          </div>

          {/* Track Bet Sidebar - Desktop Only */}
          <div className="hidden lg:col-span-1 lg:block">
            <TrackBetsAside />
          </div>
        </div>
      </div>

      <Footer />

      {/* Mobile Bet Slip */}
      <MobileBetSlip />

      {isAuthenticated && flatGames.length > 0 && (
        <GameAnalysisModal
          open={isModalOpen(MODAL_IDS.GAME_ANALYSIS)}
          onClose={onClickCloseModal}
        />
      )}
    </div>
  );
};

export default MatchupPage;

const GamesLoading = () => {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      {Array.from({ length: 4 }).map((_, index) => (
        <Skeleton key={index} className="h-[400px] w-full rounded-lg" />
      ))}
    </div>
  );
};
