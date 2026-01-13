import { ITeamPlayer } from './player';

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

export interface IBet {
  market_type: string;
  bet_name: string;
  bet_team: string;
  bet_value: number | null;
  bet_over_under: string | null;
  bet_coefficient: number;
  bet_description: string;
  bet_player?: string | null;
}

export interface ITeamAnalysis {
  injuries: string;
  key_strengths: string[];
}

export interface IAnalysis {
  overview: string[];
  home_team_analysis: ITeamAnalysis;
  away_team_analysis: ITeamAnalysis;
  risk_factors: string[];
}

export interface IPrediction {
  win_probability_home: number;
  win_probability_away: number;
  odds_home: number;
  odds_away: number;
  predicted_winner: string;
  favorite_team: string;
  analysis: IAnalysis;
  value_bets: IBet[];
  conservative_bets: IBet[];
  spread_home: string;
  spread_away: string;
  over_home: string;
  over_away: string;
  moneyline_home: string;
  moneyline_away: string;
  total_line: string;
}

export interface IGame {
  id: number;
  nba_game_id: string;
  home_team: string;
  home_team_id: number;
  home_team_logo: string;
  away_team: string;
  away_team_id: number;
  away_team_logo: string;
  start_time: string;
  status: string;
  final_score: string;
  game_prediction: any;
}

export interface Injury {
  team_name: string;
  player: string;
  position: string;
  return_date: string;
  status: string;
  comment: string;
}

export interface IScoreboard {
  label: string;
  home_leaders: IGameLeader;
  away_leaders: IGameLeader;
  home_team_injury: Injury[];
  away_team_injury: Injury[];
  home_team_players: ITeamPlayer[];
  away_team_players: ITeamPlayer[];
}

export interface IGameWithAI {
  game: IGame;
  prediction: IPrediction | null;
  scoreboard: IScoreboard | null;
}
