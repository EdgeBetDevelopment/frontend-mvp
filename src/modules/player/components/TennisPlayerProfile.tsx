'use client';

import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

import Navigation from '@/shared/components/Navigation';
import Footer from '@/shared/components/Footer';
import { Button } from '@/shared/components/button';

import { TENNIS_PLAYERS } from '../data/tennisPlayers';
import TennisPlayerHeader from './tennis/TennisPlayerHeader';
import TennisRecentGames from './tennis/TennisRecentGames';
import TennisSeasonStats from './tennis/TennisSeasonStats';
import TennisCareerChart from './tennis/TennisCareerChart';

const TennisPlayerProfile = () => {
  const params = useParams();
  const router = useRouter();
  const playerId = params?.id as string;

  const player = TENNIS_PLAYERS[playerId];
  const currentYear = new Date().getFullYear();

  if (!player) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-6 py-24 text-center">
          <h1 className="mb-4 text-2xl font-bold">Player not found</h1>
          <p className="mb-6 text-muted-foreground">
            We couldn&apos;t find this tennis player.
          </p>
          <Button onClick={() => router.back()}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Go Back
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="container mx-auto px-4 py-8">
        <Button
          variant="ghost"
          onClick={() => router.back()}
          className="mb-6 text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>

        <div className="mb-8 flex flex-col gap-8 lg:flex-row">
          <TennisPlayerHeader player={player} />
          <TennisRecentGames games={player.recentGames} />
        </div>

        <TennisSeasonStats stats={player.seasonStats} year={currentYear} />
        <TennisCareerChart data={player.careerProgression} />
      </main>

      <Footer />
    </div>
  );
};

export default TennisPlayerProfile;
