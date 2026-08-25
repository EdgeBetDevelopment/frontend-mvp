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

/** Number that stays null when the API omits the field, instead of collapsing to 0. */
function num(...values: unknown[]): number | null {
  for (const v of values) {
    if (typeof v === 'number' && Number.isFinite(v)) return v;
    if (typeof v === 'string' && v.trim() !== '') {
      const parsed = Number(v);
      if (Number.isFinite(parsed)) return parsed;
    }
  }
  return null;
}

/** First non-empty string among the candidate keys, '' if the API reports none. */
function str(...values: unknown[]): string {
  for (const v of values) {
    if (typeof v === 'string' && v.trim() !== '') return v.trim();
    if (typeof v === 'number') return String(v);
  }
  return '';
}

/**
 * Map whatever the API calls a surface onto the labels the table colours.
 * Unknown values pass through verbatim and an absent value stays empty —
 * we never guess 'Hard'.
 */
function normalizeSurface(...values: unknown[]): string {
  const raw = str(...values);
  if (!raw) return '';

  const k = raw.toLowerCase();
  if (k.includes('clay')) return 'Clay';
  if (k.includes('grass')) return 'Grass';
  if (k.includes('carpet')) return 'Carpet';
  if (k.includes('hard')) {
    return k.includes('indoor') || k.startsWith('i.')
      ? 'Hard (Indoor)'
      : 'Hard';
  }
  return raw;
}

/**
 * 'W'/'L' only when the API actually says so — an absent result stays null
 * rather than silently rendering as a loss.
 */
function parseResult(...values: unknown[]): 'W' | 'L' | null {
  for (const v of values) {
    if (v === true) return 'W';
    if (v === false) return 'L';
    if (typeof v === 'string') {
      const k = v.trim().toLowerCase();
      if (k === 'w' || k === 'win' || k === 'won') return 'W';
      if (k === 'l' || k === 'loss' || k === 'lost') return 'L';
    }
  }
  return null;
}

function mapApiGames(data: unknown): TennisRecentGame[] {
  const container = r(data);
  const raw: unknown[] = Array.isArray(data)
    ? data
    : Array.isArray(container.recent_games)
      ? (container.recent_games as unknown[])
      : Array.isArray(container.games)
        ? (container.games as unknown[])
        : data && typeof data === 'object'
          ? Object.values(container).filter(
              (v) => v && typeof v === 'object' && !Array.isArray(v),
            )
          : [];

  return raw.map((m) => {
    const g = r(m);
    return {
      date: str(g.date, g.match_date, g.start_time),
      tournament: str(g.tournament, g.tournament_name, g.competition),
      city: str(g.city, g.location, g.venue),
      surface: normalizeSurface(g.surface, g.surface_type, g.court_surface),
      round: str(g.round, g.round_name),
      opponentName: str(g.opponent, g.opponent_name, g.opponent_full_name),
      opponentRank: num(g.opponent_rank, g.opponent_ranking),
      result: parseResult(g.result, g.won, g.outcome),
      score: str(g.score, g.result_score),
      aces: num(g.aces, g.player_aces, g.aces_total),
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

  const { data, isLoading, isFetched, isError } = useQuery({
    queryKey: ['tennis-player', playerId],
    queryFn: () => playerApi.getTennisPlayerById(playerId),
    enabled: !!playerId,
  });

  // GET /players/{id} is the source of truth for the table: its recent_games
  // array already arrives in exactly the shape we render.
  const playerGames = mapApiGames(r(data).recent_games);

  // /players/{id}/games returns the identical shape but costs two provider
  // round-trips on a cache miss, so it is a fallback only — it never runs, and
  // never overwrites the table, while the player payload carries the matches.
  const { data: gamesData } = useQuery({
    queryKey: ['tennis-player-games', playerId],
    queryFn: () => playerApi.getTennisPlayerGames(playerId),
    enabled: !!playerId && isFetched && playerGames.length === 0,
  });

  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col bg-background">
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
      <div className="flex min-h-screen flex-col bg-background">
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
  // Backend order is the display order — no client-side re-sort, the date
  // strings are not guaranteed to be comparable.
  const recentGames =
    playerGames.length > 0 ? playerGames : mapApiGames(gamesData);
  const careerProgression = mapApiStats(data);

  return (
    <div className="flex min-h-screen flex-col bg-background">
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

