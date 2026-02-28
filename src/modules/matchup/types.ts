import { IGameWithAI } from '@/modules/game/types';

export type Sport = 'nba';

export interface BetPick {
  game_id: number;
  odds: number;
  selected_team_id: string;
  selected_team_name: string;
  description: string;
  sport: Sport;
  pid?: string;
  market_type?: string;
  bet_value?: number | null;
  bet_over_under?: string | null;
  bet_player?: string | null;
}

export interface Ticket {
  amount: number;
  win_amount: number;
  bets: BetPick[];
}

export interface IMatchupState {
  trackedGame: null | IGameWithAI;
  selectedGame: null | IGameWithAI;
  isParlay: boolean;
  isAmerican: boolean;
  single: Ticket[];
  parlayOdds: number;
  parlay: Ticket;
}
