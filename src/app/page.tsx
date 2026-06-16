'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import Navigation from '@/shared/components/Navigation';
import Footer from '@/shared/components/Footer';
import {
  SportCardRedesigned,
  Reviews,
  CTA,
  SearchSection,
  WhopAuthHandler,
  GoogleAuthHandler,
} from '@/modules/home';
import { gameService } from '@/modules/game';
import { tennisApiService } from '@/modules/matchup/services/tennis.api';
import { useAuth } from '@/modules/auth';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  const { data: nbaGames, isLoading: isLoadingGames } = useQuery({
    queryKey: ['nbaGamesCount'],
    queryFn: () => gameService.getGames(),
    staleTime: 1000 * 60 * 5,
    enabled: isAuthenticated,
  });

  const { data: tennisGames, isLoading: isLoadingTennisGames } = useQuery({
    queryKey: ['tennisGamesCount'],
    queryFn: () => tennisApiService.getTennisGames(),
    staleTime: 1000 * 60 * 5,
    enabled: isAuthenticated,
  });

  const nbaGamesCount = nbaGames?.length || 0;
  const tennisGamesCount = tennisGames?.length || 0;

  const sports = [
    {
      id: 'nba',
      name: 'NBA',
      icon: '🏀',
      color: 'nba',
      matches: nbaGamesCount,
      description: 'US Basketball',
      isLoadingMatches: isLoadingGames,
    },
    {
      id: 'tennis',
      name: 'Tennis',
      icon: '🎾',
      color: 'tennis',
      matches: tennisGamesCount,
      description: 'WTA / ATP Events',
      isLoadingMatches: isLoadingTennisGames,
    },
    {
      id: 'nfl',
      name: 'NFL',
      icon: '🏈',
      color: 'nfl',
      description: 'US Football',
      comingSoon: true,
    },
    {
      id: 'ncaaf',
      name: 'NCAAF',
      icon: '🏈',
      color: 'ncaaf',
      description: 'US College Football',
      comingSoon: true,
    },
    {
      id: 'ncaab',
      name: 'NCAAB',
      icon: '🏀',
      color: 'ncaab',
      description: 'US College Basketball',
      comingSoon: true,
    },
    {
      id: 'mlb',
      name: 'MLB',
      icon: '⚾',
      color: 'mlb',
      description: 'US Baseball',
      comingSoon: true,
    },
  ];

  const handleSportClick = (sportId: string) => {
    if (sportId === 'nba') {
      router.push('/matchup');
    } else {
      router.push(`/matchup?type=${sportId}`);
    }
  };

  const handlePlayerSelect = (player: { id: string; name: string; sport?: string }) => {
    setSearchQuery('');
    router.push(`/player/${player.sport === 'Tennis' ? `tennis-${player.id}` : player.id}`);
  };

  const handleTeamSelect = (team: { id: string; name: string }) => {
    setSearchQuery('');
    router.push(`/team/${team.id}`);
  };

  const filteredSports = sports.filter((sport) =>
    sport.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <WhopAuthHandler />
      <GoogleAuthHandler />
      <section className="container mx-auto px-6 py-16 md:py-24">
        <SearchSection
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onPlayerSelect={handlePlayerSelect}
          onTeamSelect={handleTeamSelect}
        />

        <div
          className="grid animate-fade-in grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
          style={{ animationDelay: '0.2s' }}
        >
          {filteredSports.map((sport, index) => (
            <SportCardRedesigned
              key={sport.id}
              sport={sport}
              onClick={() => handleSportClick(sport.id)}
              delay={index * 0.1}
            />
          ))}
        </div>

        {filteredSports.length === 0 && (
          <div className="py-12 text-center">
            <p className="text-lg text-muted-foreground">
              No sports found matching "{searchQuery}"
            </p>
          </div>
        )}
      </section>

      <Reviews />
      <CTA />
      <Footer />
    </div>
  );
}
