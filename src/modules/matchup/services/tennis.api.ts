import { axiosInstance } from '@/shared/lib';
import { formatUtcToLocalDate, formatUtcToLocalTimeAmPm } from '@/shared/utils';

import type { TennisMatchup, TennisTour } from '../data/tennisMatchups';

export interface TennisApiPlayer {
  full_name: string;
  /** Singles ranking. Null for doubles pairs and unranked players. */
  ranking_sgl: number | null;
  /** Doubles ranking. Null for most singles entries. */
  ranking_dbl: number | null;
  country: string | null;
  country_code: string | null;
  gender: 'male' | 'female' | null;
  tour: string | null;
  last_5_matches: Record<string, string> | null;
}

export interface TennisApiTournament {
  name: string;
  round: string;
  season: string;
  event_type: string;
  category: string | null;
  discipline: string | null;
}

export interface TennisApiBet {
  market_type: string;
  bet_name: string;
  selection: string;
  line: number | null;
  coefficient: number;
  description: string;
}

export interface TennisApiPrediction {
  win_probability_first_player: number;
  win_probability_second_player: number;
  odds_first_player: number;
  odds_second_player: number;
  moneyline_first_player: number;
  moneyline_second_player: number;
  predicted_winner: string;
  value_bets: TennisApiBet[];
  conservative_bets: TennisApiBet[];
  analysis: string;
  overview: string;
  h2h_score: string;
  h2h_details: Record<string, unknown>;
  surface_performance_player1: Record<string, unknown>;
  surface_performance_player2: Record<string, unknown>;
  /** Set when value_bets is empty, null otherwise. */
  value_bets_empty_reason: string | null;
  /** Set when conservative_bets is empty, null otherwise. */
  conservative_bets_empty_reason: string | null;
  /** Set only when both lists are empty, null otherwise. */
  bets_unpriceable_reason: string | null;
}

export interface TennisApiGame {
  id: number;
  start_time: string;
  surface_type: string;
  status: 'scheduled' | 'live' | 'finished' | null;
  player1: TennisApiPlayer;
  player2: TennisApiPlayer;
  tournament: TennisApiTournament;
  prediction: TennisApiPrediction;
}

interface TennisApiResponse {
  games: TennisApiGame[];
}

export const tennisApiService = {
  async getTennisGames(lastId?: number): Promise<TennisApiGame[]> {
    const response = await axiosInstance.get<TennisApiResponse>(
      `/nba/api/v1/tenis/games`,
      { params: lastId !== undefined ? { last_id: lastId } : {} },
    );
    return response.data.games ?? [];
  },
};

const getSurface = (s: string): TennisMatchup['surface'] => {
  if (!s) return 'Hard Court';
  const lower = s.toLowerCase();
  if (lower.includes('clay')) return 'Clay';
  if (lower.includes('grass')) return 'Grass';
  return 'Hard Court';
};

const fmtMoneyline = (ml: number): string => {
  if (!ml) return '';
  return ml > 0 ? `+${ml}` : String(ml);
};

/**
 * A ranking is only meaningful next to the tour it was issued by, so never
 * assume ATP. Per-player `tour` is the truth when present; otherwise the
 * tournament category covers doubles pairs, which carry no player fields.
 */
const getTour = (
  player: TennisApiPlayer,
  tournament: TennisApiTournament,
): TennisTour | null => {
  const raw = (
    player.tour ||
    tournament.category ||
    tournament.event_type ||
    ''
  ).toUpperCase();
  if (raw.includes('WTA')) return 'WTA';
  if (raw.includes('ATP')) return 'ATP';
  return null;
};

const isDoublesGame = (tournament: TennisApiTournament) =>
  tournament.discipline === 'doubles' ||
  /doubles/i.test(tournament.event_type ?? '');

const mapPlayer = (
  player: TennisApiPlayer,
  tournament: TennisApiTournament,
): TennisMatchup['player1'] => {
  const rank = isDoublesGame(tournament)
    ? (player.ranking_dbl ?? player.ranking_sgl)
    : (player.ranking_sgl ?? player.ranking_dbl);

  return {
    name: player.full_name,
    country: player.country_code || player.country || '',
    rank: rank ?? null,
    tour: getTour(player, tournament),
    form: Object.values(player.last_5_matches ?? {}).slice(0, 5),
    injuryStatus: 'Healthy',
  };
};

export const mapTennisApiGame = (game: TennisApiGame): TennisMatchup => {
  const date = formatUtcToLocalDate(game.start_time);
  const time = formatUtcToLocalTimeAmPm(game.start_time);

  const { prediction: pred } = game;

  const player1 = mapPlayer(game.player1, game.tournament);
  const player2 = mapPlayer(game.player2, game.tournament);

  return {
    id: String(game.id),
    player1,
    player2,
    date,
    time,
    tournament: game.tournament.name,
    tournamentType: game.tournament.event_type,
    round: game.tournament.round,
    status: game.status ?? null,
    category: game.tournament.category ?? null,
    discipline: game.tournament.discipline ?? null,
    surface: getSurface(game.surface_type),
    format: 'Best of 3',
    aiPick: pred?.predicted_winner ?? null,
    markets: [
      {
        category: 'Match Winner',
        label: `${player1.name} to Win`,
        odds: fmtMoneyline(pred?.moneyline_first_player),
      },
      {
        category: 'Match Winner',
        label: `${player2.name} to Win`,
        odds: fmtMoneyline(pred?.moneyline_second_player),
      },
    ],
    valueBets: (pred?.value_bets ?? []).slice(0, 3).map((bet) => ({
      label: bet.bet_name,
      odds: bet.coefficient ? String(bet.coefficient) : '',
      books: [],
      market_type: bet.market_type,
      selection: bet.selection,
      line: bet.line ?? null,
      player_key: null,
    })),
    conservativeBets: (pred?.conservative_bets ?? [])
      .slice(0, 3)
      .map((bet) => ({
        label: bet.bet_name,
        odds: bet.coefficient ? String(bet.coefficient) : '',
        books: [],
        market_type: bet.market_type,
        selection: bet.selection,
        line: bet.line ?? null,
        player_key: null,
      })),
    overview: pred?.overview ?? null,
    analysis: pred?.analysis ?? null,
    h2hScore: pred?.h2h_score ?? null,
    winProbabilityPlayer1: pred?.win_probability_first_player ?? null,
    winProbabilityPlayer2: pred?.win_probability_second_player ?? null,
    valueBetsEmptyReason: pred?.value_bets_empty_reason ?? null,
    conservativeBetsEmptyReason: pred?.conservative_bets_empty_reason ?? null,
    betsUnpriceableReason: pred?.bets_unpriceable_reason ?? null,
  };
};
