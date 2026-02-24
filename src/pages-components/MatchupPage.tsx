"use client";

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import {
  ReadonlyURLSearchParams,
  useRouter,
  useSearchParams,
} from "next/navigation";

import EmptyPlaceholder from "@/shared/components/EmptyPlaceholder";
import MatchupPageFilters from "@/components/matchup/Filters";
import GameCard from "@/components/matchup/GameCard";
import AuthModal from "@/components/modals/AuthModal";
import { GameAnalysisModal } from "@/modules/game/components/analysis";
import TrackBetsModal from "@/components/modals/TrackBetsModal";
import { useAuth } from "@/context/AuthContext";
import useModalManager from "@/hooks/useModalManager";
import apiService from "@/services";
import { useStore } from "@/store";
import { IGameWithAI } from "@/types/game";
import { Button } from "@/shared/components/button";
import { ScrollArea } from "@/shared/components/scroll-area";
import { Skeleton } from "@/shared/components/skeleton";
import { formUrlQuery } from "@/shared/utils";
import ListRenderer from "@/wrappers/ListRenderer";

import TrackBetsAside from "./TrackBetAside";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

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
  const { setTrackedGame, setSelectedGame } = storeManager;

  const params = useSearchParams() as ReadonlyURLSearchParams;
  const type = params.get("type");
  const router = useRouter();

  const [authDismissed, setAuthDismissed] = useState(false);

  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery<IGameWithAI[], Error>({
    queryKey: ["games-feed"],
    queryFn: ({ pageParam }) =>
      apiService.getGames(pageParam as number | undefined),
    initialPageParam: undefined as number | undefined,
    getNextPageParam: (lastPage) => {
      if (!lastPage || lastPage.length === 0) {
        return undefined;
      }

      const lastGame = lastPage[lastPage.length - 1];
      const nextLastId = Number(lastGame?.game?.id);

      return nextLastId;
    },
    retry: false,
  });

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
      rootMargin: "200px",
      threshold: 0,
    });

    const current = loadMoreRef.current;
    if (current) observer.observe(current);

    return () => {
      if (current) observer.unobserve(current);
    };
  }, [handleIntersection]);

  const onClickTrackBet = (game: IGameWithAI) => {
    if (!isAuthenticated) {
      openModal("auth");
      return;
    }
    setTrackedGame(game);
    openModal("track-bet");
  };

  const onClickClearTrackBet = () => {
    setTrackedGame(null);
    closeModal("track-bet");
  };

  const onClickFullAnalysis = useCallback(
    (game: IGameWithAI) => {
      if (!isAuthenticated) {
        openModal("auth");
        return;
      }

      setSelectedGame(game);
      openModal("game-analysis");

      setTimeout(() => {
        const url = formUrlQuery({
          params: params.toString(),
          key: "game-analysis",
          value: game?.game?.id?.toString(),
        });
        router.push(url);
      }, 100);
    },
    [isAuthenticated, openModal, setSelectedGame, params, router],
  );
  const onOpenTrackBet = () => {
    if (!isAuthenticated) {
      openModal("auth");
      return;
    }
    openModal("track-bet");
  };

  const onClickCloseModal = useCallback(() => {
    closeModal("game-analysis");

    setTimeout(() => {
      setSelectedGame(null);

      const url = formUrlQuery({
        params: params.toString(),
        keysToRemove: ["game-analysis"],
      });
      router.push(url);
    }, 150);
  }, [closeModal, setSelectedGame, params, router]);

  useEffect(() => {
    if (!isAuthenticated && !authDismissed) {
      openModal("auth");
    }
    if (isAuthenticated && authDismissed) setAuthDismissed(false);
  }, [isAuthenticated, authDismissed, openModal]);

  const onCloseAuth = () => {
    setAuthDismissed(true);
    closeModal("auth");
    router.push("/");
  };

  useEffect(() => {
    if (!isAuthenticated) return;

    const gameAnalysisParam = params.get("game-analysis");
    const { openModal, closeModal, isModalOpen } = modalManagerRef.current;
    const { setSelectedGame } = storeManagerRef.current;

    if (!gameAnalysisParam) {
      const modalOpen = isModalOpen("game-analysis");
      if (modalOpen) {
        closeModal("game-analysis");
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

      if (!isModalOpen("game-analysis")) {
        openModal("game-analysis");
      }
    }
  }, [isAuthenticated, params, flatGames]);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto px-6 py-24">
        <MatchupPageFilters />

        <div className="mt-8 block lg:hidden">
          <Button variant="default" className="w-full" onClick={onOpenTrackBet}>
            Track bet
          </Button>
        </div>

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

          {/* Track Bet Sidebar */}
          <div className="lg:col-span-1">
            <TrackBetsAside />
          </div>
        </div>
      </div>

      <Footer />

      <AuthModal isOpen={isModalOpen("auth")} onClose={onCloseAuth} />

      {/* <div className="block lg:hidden">
        <TrackBetsModal
          isOpen={isModalOpen('track-bet')}
          onClose={onClickClearTrackBet}
        />
      </div> */}

      {isAuthenticated && flatGames.length > 0 && (
        <GameAnalysisModal
          open={isModalOpen("game-analysis")}
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
