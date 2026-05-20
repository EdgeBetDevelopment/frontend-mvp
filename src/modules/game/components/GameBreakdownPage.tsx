'use client';

import { useParams, useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { ArrowLeft } from 'lucide-react';

import Navigation from '@/shared/components/Navigation';
import Footer from '@/shared/components/Footer';
import { Button } from '@/shared/components/button';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/shared/components/tabs';
import Loader from '@/shared/components/loader';
import EmptyPlaceholder from '@/shared/components/EmptyPlaceholder';
import { gameService } from '@/modules/game';
import { useAuth } from '@/modules/auth';
import { formatUtcToLocalDate, formatUtcToLocalTimeAmPm } from '@/shared/utils';
import { GameDetailsData } from '../types';
import GameHeader from './GameHeader';
import TeamStatsTab from './TeamStatsTab';
import TeamComparisonTab from './TeamComparisonTab';

const GameBreakdownPage = () => {
  const params = useParams();
  const gameId = params?.id as string;
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  const {
    data: gameData,
    error,
    isLoading,
  } = useQuery<GameDetailsData>({
    queryKey: ['game', gameId],
    queryFn: () => gameService.getGameById(gameId),
    staleTime: 1000 * 60 * 5,
    retry: 2,
    enabled: isAuthenticated && !!gameId,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto flex min-h-[60vh] items-center justify-center px-6 py-24">
          <Loader />
        </div>
        <Footer />
      </div>
    );
  }

  if (
    error ||
    !gameData ||
    !gameData.scoreboards ||
    gameData.scoreboards.length === 0
  ) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-6 py-24">
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="mb-6"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back
          </Button>
          <EmptyPlaceholder subtitle title="Game Not Found" />
        </div>
        <Footer />
      </div>
    );
  }

  const boxscore = gameData.scoreboards[0].boxscore;
  const homeTeam = boxscore.homeTeam;
  const awayTeam = boxscore.awayTeam;
  const formattedDate = formatUtcToLocalDate(gameData.start_time);
  const formattedTime = formatUtcToLocalTimeAmPm(gameData.start_time);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="container mx-auto px-6 py-8">
        <Button
          variant="ghost"
          onClick={() => router.back()}
          className="mb-6 text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>

        <GameHeader
          gameData={gameData}
          boxscore={boxscore}
          formattedDate={formattedDate}
          formattedTime={formattedTime}
        />

        <Tabs defaultValue="home" className="space-y-6">
          <TabsList className="border border-border bg-muted/30">
            <TabsTrigger
              value="home"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              {homeTeam.teamName}
            </TabsTrigger>
            <TabsTrigger
              value="away"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              {awayTeam.teamName}
            </TabsTrigger>
            <TabsTrigger
              value="comparison"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              Team Comparison
            </TabsTrigger>
          </TabsList>

          <TabsContent value="home">
            <TeamStatsTab team={homeTeam} opponentScore={awayTeam.score} />
          </TabsContent>

          <TabsContent value="away">
            <TeamStatsTab team={awayTeam} opponentScore={homeTeam.score} />
          </TabsContent>

          <TabsContent value="comparison">
            <TeamComparisonTab homeTeam={homeTeam} awayTeam={awayTeam} />
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  );
};

export default GameBreakdownPage;
