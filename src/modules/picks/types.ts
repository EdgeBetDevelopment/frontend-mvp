export interface ModeratorPick {
  id: string;
  moderator: {
    name: string;
    avatar: string;
    color: string;
    record: string;
    winRate: number;
    unitPL: number;
  };
  sport: string;
  game: string;
  pick: string;
  odds: string;
  confidence: 'high' | 'medium' | 'lock';
  analysis: string;
  postedAt: string;
  units: number;
}

export interface ApiPick {
  id: number;
  user_id: number;
  game_id: number | string;
  game?: {
    id: number;
    nba_game_id: string;
    home_team: string;
    away_team: string;
    start_time: string;
    status: string;
    final_score: string;
    name?: string;
  };
  sport: string;
  pick: string;
  odds: number;
  confidence_level: 'lock' | 'high' | 'medium' | string;
  units: number;
  analysis: string;
  status: string;
  is_premium: boolean;
  created_at: string;
}

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

export interface PickOfDayUser {
  username: string;
  wins: number;
  losses: number;
  win_rate: number;
  ytd: number;
}
