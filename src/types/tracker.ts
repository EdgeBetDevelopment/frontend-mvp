import { IGame } from './game';

export interface IGameTracker {
  amount: number;
  selected_team_name: string;
  odds_at_bet_time: number;
  status: string;
  created_at: Date;
  id: number;
  game: IGame;
  payload: {
    description: string;
    odds_at_bet_time: number;
    selected_team_id: string;
    selected_team_name: string;
  };
}
