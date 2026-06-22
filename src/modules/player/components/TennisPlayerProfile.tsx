'use client';

import { useParams, useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { ArrowLeft } from 'lucide-react';

import Navigation from '@/shared/components/Navigation';
import Footer from '@/shared/components/Footer';
import { Button } from '@/shared/components/button';

import { playerApi } from '../services';
import type {
  TennisPlayer,
  TennisRecentGame,
  TennisCareerSeason,
  TennisSeasonStats as TennisSeasonStatsType,
} from '../data/tennisPlayers';
import TennisPlayerHeader from './tennis/TennisPlayerHeader';
import TennisRecentGames from './tennis/TennisRecentGames';
import TennisSeasonStats from './tennis/TennisSeasonStats';
import TennisCareerChart from './tennis/TennisCareerChart';

type R = Record<string, unknown>;

const r = (v: unknown): R => (v && typeof v === 'object' ? (v as R) : {});
const n = (v: unknown): number => (typeof v === 'number' ? v : 0);
const s = (v: unknown): string => (typeof v === 'string' ? v : String(v ?? ''));

function parseMoney(value: unknown): number {
  if (!value) return 0;
  return parseInt(String(value).replace(/[$,]/g, ''), 10) || 0;
}

function mapApiGames(data: unknown): TennisRecentGame[] {
  const raw: unknown[] = Array.isArray(data)
    ? data
    : Array.isArray(r(data).games)
      ? (r(data).games as unknown[])
      : data && typeof data === 'object'
        ? Object.values(r(data))
        : [];

  return raw.map((m) => {
    const g = r(m);
    return {
      date: s(g.date),
      tournament: s(g.tournament ?? g.tournament_name),
      city: s(g.city ?? g.location),
      surface: (s(g.surface) || 'Hard') as TennisRecentGame['surface'],
      round: s(g.round),
      opponentName: s(g.opponent ?? g.opponent_name),
      opponentRank: n(g.opponent_rank),
      result: (g.result === 'W' || g.won === true ? 'W' : 'L') as 'W' | 'L',
      score: s(g.score),
      aces: n(g.aces),
    };
  });
}

function mapApiStats(data: unknown): TennisCareerSeason[] {
  const raw = r(data);
  const stats: unknown[] = Array.isArray(raw.api_stats)
    ? (raw.api_stats as unknown[])
    : [];

  console.log('[mapApiStats] total:', stats.length, 'sample:', stats[0]);

  const result = stats
    .filter((item) => s(r(item).type) === 'singles')
    .map((item): TennisCareerSeason => {
      const g = r(item);
      return {
        year: s(g.season),
        wins: parseInt(s(g.matches_won), 10) || 0,
        titles: parseInt(s(g.titles), 10) || 0,
        aces: parseInt(s(g.matches_lost), 10) || 0,
      };
    })
    .sort((a, b) => a.year.localeCompare(b.year));

  return result;
}

function mapApiToPlayer(data: R): TennisPlayer {
  const singleStats = r(data.season_stats_single);
  const yearStats = r(r(data.stats).Year) as Record<string, R>;

  const yearKeys = Object.keys(yearStats).sort();
  const latestYearKey = yearKeys[yearKeys.length - 1];
  const latestYearAll = r(r(yearStats[latestYearKey]).ALL);
  const latestService = r(latestYearAll.ServiceRecordStats);
  const latestReturn = r(latestYearAll.ReturnRecordStats);

  const wins = n(singleStats.wins);
  const losses = n(singleStats.losses);
  const winPct =
    wins + losses > 0 ? Math.round((wins / (wins + losses)) * 100) : 0;

  const seasonStats: TennisSeasonStatsType = {
    wins,
    losses,
    titles: n(singleStats.titles),
    aces: n(latestService.Aces),
    firstServePct: n(latestService.FirstServePercentage),
    winPct,
    ranking: n(data.ranking_sgl),
    prizeMoney: parseMoney(singleStats.prize_money),
    breakPtsWon: n(latestReturn.BreakPointsConvertedPercentage),
    tieBreaksWon: 0,
  };

  const careerProgression: TennisCareerSeason[] = yearKeys.map((year) => {
    const yd = r(r(yearStats[year]).ALL);
    const svc = r(yd.ServiceRecordStats);
    const ret = r(yd.ReturnRecordStats);
    return {
      year,
      wins: n(svc.ServiceGamesWonPercentage),
      titles: n(ret.ReturnGamesWonPercentage),
      aces: n(svc.Aces),
    };
  });

  return {
    id: s(data.player_id),
    name: s(data.full_name),
    country: s(data.country),
    position: s(data.plays) || 'Singles Player',
    birthday: s(data.birth_date),
    height: data.height_ft
      ? `${s(data.height_ft)} (${s(data.height_cm)}cm)`
      : `${s(data.height_cm)}cm`,
    weight: `${s(data.weight_kg ?? data.weight_lb)}${data.weight_kg ? 'kg' : 'lbs'}`,
    experience: `Age ${s(data.age)}`,
    achievements: [
      ...(data.ranking_sgl ? [{ label: `SGL #${s(data.ranking_sgl)}` }] : []),
      ...(data.ranking_dbl ? [{ label: `DBL #${s(data.ranking_dbl)}` }] : []),
      ...(data.points_sgl ? [{ label: `${s(data.points_sgl)} pts` }] : []),
    ],
    recentGames: [],
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

  const { data: gamesData, isLoading: gamesLoading } = useQuery({
    queryKey: ['tennis-player-games', playerId],
    queryFn: () => playerApi.getTennisPlayerGames(playerId),
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

  const player = mapApiToPlayer(data as R);
  const recentGames = gamesLoading ? [] : mapApiGames(gamesData);
  const careerProgression = mapApiStats(data);

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
          <TennisRecentGames games={recentGames} />
        </div>

        <TennisSeasonStats stats={player.seasonStats} year={currentYear} />
        <TennisCareerChart data={careerProgression} />
      </main>

      <Footer />
    </div>
  );
};

export default TennisPlayerProfile;

