interface IPeriod {
  period: number;
  periodType: 'REGULAR';
  score: number;
}

export interface ITeam {
  teamId: number;
  teamName: string;
  teamCity: string;
  teamTricode: string;
  wins: number;
  draws?: number;
  losses: number;
  score: number;
  seed: number | null;
  inBonus: boolean | null;
  timeoutsRemaining: number;
  periods: IPeriod[];
}

interface IGameLeader {
  personId: number;
  name: string;
  jerseyNum: string;
  position: string;
  teamTricode: string;
  playerSlug: string | null;
  points: number;
  rebounds: number;
  assists: number;
}

interface IGameLeaders {
  homeLeaders: IGameLeader;
  awayLeaders: IGameLeader;
}

interface IPOdds {
  team: string | null;
  odds: number;
  suspended: number;
}

export interface IPrediction {
  win_probability_home: number;
  win_probability_away: number;
  odds_home: number;
  odds_away: number;
  predicted_winner: string;
  favorite_team: string;
  analysis: string;
}

export interface IGame {
  id: number;
  nba_game_id: string;
  home_team: string;
  away_team: string;
  start_time: string;
  status: string;
  final_score: string;
}

export interface IGameWithAI {
  game: IGame;
  prediction: IPrediction;
  scoreboard: null;
}
