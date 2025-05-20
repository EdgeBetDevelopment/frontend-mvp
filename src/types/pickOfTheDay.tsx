export interface PickOfDay {
  id: number;
  user_id: number;
  created_at: string;
  updated_at: string;
  is_premium: boolean;
  game_prediction: PickOfDayGamePrediction;
}

export interface PickOfDayGamePrediction {
  id: number;
  home_team_id: number;
  away_team_id: number;
  home_team_logo: string;
  away_team_logo: string;
  win_probability_home: number;
  win_probability_away: number;
  odds_home: number;
  odds_away: number;
  predicted_winner: string;
  favorite_team: string;
  analysis: string;
  created_at: string;
  game: PickOfDayGameShort;
}

export interface PickOfDayGameShort {
  id: number;
  nba_game_id: string;
  home_team: string;
  away_team: string;
  start_time: string;
  status: string;
  final_score: string;
}
