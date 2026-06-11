'use client';

import { useParams, useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { ArrowLeft } from 'lucide-react';

import Navigation from '@/shared/components/Navigation';
import Footer from '@/shared/components/Footer';
import { Button } from '@/shared/components/button';

import { playerApi } from '../services';
import type { TennisPlayer, TennisRecentGame, TennisCareerSeason, TennisSeasonStats as TennisSeasonStatsType } from '../data/tennisPlayers';
import TennisPlayerHeader from './tennis/TennisPlayerHeader';
import TennisRecentGames from './tennis/TennisRecentGames';
import TennisSeasonStats from './tennis/TennisSeasonStats';
import TennisCareerChart from './tennis/TennisCareerChart';

function mapApiToPlayer(data: any): TennisPlayer {
  const last5Raw = Array.isArray(data.last_5_matches)
    ? data.last_5_matches
    : Object.values(data.last_5_matches ?? {});

  const singleStats = data.season_stats_single ?? {};
  const careerRaw = data.career_stats_single ?? {};

  const recentGames: TennisRecentGame[] = last5Raw.map((m: any) => ({
    date: m.date ?? '',
    tournament: m.tournament ?? m.tournament_name ?? '',
    city: m.city ?? m.location ?? '',
    surface: m.surface ?? 'Hard',
    round: m.round ?? '',
    opponentName: m.opponent ?? m.opponent_name ?? '',
    opponentRank: m.opponent_rank ?? 0,
    result: m.result === 'W' || m.won === true ? 'W' : 'L',
    score: m.score ?? '',
    aces: m.aces ?? 0,
  }));

  const seasonStats: TennisSeasonStatsType = {
    wins: singleStats.wins ?? 0,
    losses: singleStats.losses ?? 0,
    titles: singleStats.titles ?? 0,
    aces: singleStats.aces ?? 0,
    firstServePct: singleStats.first_serve_pct ?? singleStats.firstServePct ?? 0,
    winPct: singleStats.win_pct ?? singleStats.winPct ?? 0,
    ranking: data.ranking ?? 0,
    prizeMoney: singleStats.prize_money ?? singleStats.prizeMoney ?? 0,
    breakPtsWon: singleStats.break_pts_won ?? singleStats.breakPtsWon ?? 0,
    tieBreaksWon: singleStats.tie_breaks_won ?? singleStats.tieBreaksWon ?? 0,
  };

  const careerProgression: TennisCareerSeason[] = Array.isArray(careerRaw)
    ? careerRaw.map((s: any) => ({
        year: String(s.year ?? ''),
        wins: s.wins ?? 0,
        titles: s.titles ?? 0,
        aces: s.aces ?? 0,
      }))
    : [];

  return {
    id: data.player_id,
    name: data.full_name,
    country: data.country ?? '',
    position: data.plays || 'Singles Player',
    birthday: data.birth_date ?? '',
    height: data.height_ft
      ? `${data.height_ft} (${data.height_cm}cm)`
      : `${data.height_cm ?? ''}cm`,
    weight: `${data.weight_kg ?? data.weight_lb ?? ''}${data.weight_kg ? 'kg' : 'lbs'}`,
    experience: `Age ${data.age ?? ''}`,
    achievements: [
      ...(data.ranking ? [{ label: `Ranking #${data.ranking}` }] : []),
      ...(data.points ? [{ label: `${data.points} pts` }] : []),
    ],
    recentGames,
    seasonStats,
    careerProgression,
  };
}

const TennisPlayerProfile = () => {
  const params = useParams();
  const router = useRouter();
  const rawId = params?.id as string;
  const playerId = rawId?.replace(/^tennis-/, '');
  const currentYear = new Date().getFullYear();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['tennis-player', playerId],
    queryFn: () => playerApi.getTennisPlayerById(playerId),
    enabled: !!playerId,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-6 py-24 text-center">
          <p className="text-muted-foreground">Loading...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (isError || !data) {
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

  const player = mapApiToPlayer(data);

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
