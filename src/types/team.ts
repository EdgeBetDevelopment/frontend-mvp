import { ITeamPlayer } from './player';

export interface ITeam {
  id: number;
  full_name: string;
  abbreviation: string;
  nickname: string;
  city: string;
  conference: string;
  division: string;
  state: string;
  year_founded: number;
  colors: { primary: string; secondary: string };
  record: { wins: number; losses: number };
  arena: string;
  logo: string;
  arena_capacity: string;
  owner: string;
  general_manager: string;
  head_coach: string;
  d_league_affiliation: string;
  social_media: SocialMedia;
  team_statistics: TeamStatistics;
  player_statistics: Player[];
  overall_stats: TeamStatistics;
}

export interface SocialMedia {
  Facebook: string;
  Instagram: string;
  Twitter: string;
}

export interface TeamStatistics {
  GROUP_SET: string;
  TEAM_ID: number;
  TEAM_NAME: string;
  GROUP_VALUE: string;
  SEASON_YEAR: string;
  GP: number;
  W: number;
  L: number;
  W_PCT: number;
  MIN: number;
  FGM: number;
  FGA: number;
  FG_PCT: number;
  FG3M: number;
  FG3A: number;
  FG3_PCT: number;
  FTM: number;
  FTA: number;
  FT_PCT: number;
  OREB: number;
  DREB: number;
  REB: number;
  AST: number;
  TOV: number;
  STL: number;
  BLK: number;
  BLKA: number;
  PF: number;
  PFD: number;
  PTS: number;
  PLUS_MINUS: number;

  GP_RANK: number;
  W_RANK: number;
  L_RANK: number;
  W_PCT_RANK: number;
  MIN_RANK: number;
  FGM_RANK: number;
  FGA_RANK: number;
  FG_PCT_RANK: number;
  FG3M_RANK: number;
  FG3A_RANK: number;
  FG3_PCT_RANK: number;
  FTM_RANK: number;
  FTA_RANK: number;
  FT_PCT_RANK: number;
  OREB_RANK: number;
  DREB_RANK: number;
  REB_RANK: number;
  AST_RANK: number;
  TOV_RANK: number;
  STL_RANK: number;
  BLK_RANK: number;
  BLKA_RANK: number;
  PF_RANK: number;
  PFD_RANK: number;
  PTS_RANK: number;
  PLUS_MINUS_RANK: number;
}

export interface Player extends ITeamPlayer {
  TeamID: number;
  SEASON: string;
  LeagueID: string;
  PLAYER: string;
  NICKNAME: string;
  PLAYER_SLUG: string;
  NUM: string;
  POSITION: string;
  HEIGHT: string;
  WEIGHT: string;
  BIRTH_DATE: string;
  AGE: number;
  EXP: string;
  SCHOOL: string;
  PLAYER_ID: number;
  HOW_ACQUIRED: string;
  status: string;
}
