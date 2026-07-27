'use client';

import { useState } from 'react';
import { Crown } from 'lucide-react';

import { GameAnalysisModal } from '@/modules/game/components/analysis';
import { IGameWithAI } from '@/modules/game/types';
import { Button } from '@/shared/components/button';
import { Skeleton } from '@/shared/components/skeleton';
import { ListRenderer } from '@/shared/components';
import Navigation from '@/shared/components/Navigation';
import Footer from '@/shared/components/Footer';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/shared/components/card';
import AuthGuard from '@/app/profile/AuthGuard';

import MatchupPageFilters from './Filters';
import GameCard from './GameCard';
import TrackBetsAside from './TrackBetAside';
import MobileBetSlip from './MobileBetSlip';
import TennisFullAnalysis from './TennisFullAnalysis';
import TennisGrid from './TennisGrid';
import { SPORT_CONFIGS } from '../config';
import { useMatchupPage } from '../hooks/useMatchupPage';
import { MODAL_IDS } from '@/shared/constants';
import type { TennisMatchup } from '../data/tennisMatchups';

const MatchupPage = () => {
  const [selectedTennisMatchup, setSelectedTennisMatchup] =
    useState<TennisMatchup | null>(null);
  const [tennisAnalysisOpen, setTennisAnalysisOpen] = useState(false);

  const onSelectTennisGame = (matchup: TennisMatchup) => {
    setSelectedTennisMatchup(matchup);
    setTennisAnalysisOpen(true);
  };

  const {
    isAuthenticated,
    authError,
    type,
    router,
    isAmerican,
    isLoading,
    isError,
    flatGames,
    isModalOpen,
    onClickFullAnalysis,
    onClickCloseModal,
  } = useMatchupPage();

  if (!isAuthenticated) {
    return (
      <AuthGuard message="Please login to access the matchup analysis feature.">
        {null}
      </AuthGuard>
    );
  }

  if (authError === 402) {
    return (
      <div className="flex min-h-screen flex-col bg-background">
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

  const oddsFormat = isAmerican ? 'american' : 'european';
  const currentSport =
    SPORT_CONFIGS.find((s) => s.value === type) ?? SPORT_CONFIGS[0];

  const renderMatchups = () => {
    if (currentSport.value === 'tennis') {
      return (
        <TennisGrid oddsFormat={oddsFormat} onSelectGame={onSelectTennisGame} />
      );
    }

    return (
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
    );
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navigation />
      <div className="container mx-auto px-6 py-24">
        <MatchupPageFilters />
        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-4">
          <div className="lg:col-span-3">
            {isAuthenticated && renderMatchups()}
          </div>
          <div className="hidden lg:col-span-1 lg:block">
            <TrackBetsAside />
          </div>
        </div>
      </div>
      <Footer />
      <MobileBetSlip />
      {isAuthenticated && flatGames.length > 0 && (
        <GameAnalysisModal
          open={isModalOpen(MODAL_IDS.GAME_ANALYSIS)}
          onClose={onClickCloseModal}
        />
      )}
      {selectedTennisMatchup && (
        <TennisFullAnalysis
          open={tennisAnalysisOpen}
          onOpenChange={setTennisAnalysisOpen}
          matchup={selectedTennisMatchup}
        />
      )}
    </div>
  );
};

export default MatchupPage;

const GamesLoading = () => (
  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
    {Array.from({ length: 4 }).map((_, index) => (
      <Skeleton key={index} className="h-[400px] w-full rounded-lg" />
    ))}
  </div>
);
