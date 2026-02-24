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
  username: string;
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
