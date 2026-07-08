import { axiosInstance } from '@/shared/lib';

import type { TennisMatchup } from '../data/tennisMatchups';

export interface TennisApiPlayer {
  full_name: string;
  ranking: number;
  country: string;
  country_code: string;
  last_5_matches: Record<string, string>;
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

export const mapTennisApiGame = (game: TennisApiGame): TennisMatchup => {
  const dt = new Date(game.start_time);
  const date = dt.toLocaleDateString('en-US', {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric',
  });
  const time = dt.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });

  const form1 = Object.values(game.player1.last_5_matches ?? {}).slice(
    0,
    5,
  ) as string[];
  const form2 = Object.values(game.player2.last_5_matches ?? {}).slice(
    0,
    5,
  ) as string[];

  const { prediction: pred } = game;

  return {
    id: String(game.id),
    player1: {
      name: game.player1.full_name,
      country: game.player1.country_code || game.player1.country,
      rank: game.player1.ranking,
      form: form1,
      injuryStatus: 'Healthy',
    },
    player2: {
      name: game.player2.full_name,
      country: game.player2.country_code || game.player2.country,
      rank: game.player2.ranking,
      form: form2,
      injuryStatus: 'Healthy',
    },
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
        label: `${game.player1.full_name} to Win`,
        odds: fmtMoneyline(pred?.moneyline_first_player),
      },
      {
        category: 'Match Winner',
        label: `${game.player2.full_name} to Win`,
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
    conservativeBets: (pred?.conservative_bets ?? []).slice(0, 3).map((bet) => ({
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
  };
};
