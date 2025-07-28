import { IGame } from './game';

export interface ISelection {
  amount: number;
  game_id: number;
  parlay_bet_id: number;
  payload: {
    description: string;
    odds_at_bet_time: number;
    selected_team_id: string;
    selected_team_name: string;
  };
  sport: string;
  status: string;
  game: IGame;
  created_at: string;
  id: number;
}

export interface IGameTracker {
  id: number;
  amount: number;
  status: string;
  created_at: string;
  selections: ISelection[];
}
