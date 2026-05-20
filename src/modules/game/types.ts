import { ITeamPlayer } from '@/modules/player';

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

export interface PlayerStats {
  status: string;
  notPlayingReason?: string;
  notPlayingDescription?: string;
  order: number;
  personId: number;
  name: string;
  nameI: string;
  firstName: string;
  familyName: string;
  position?: string;
  jerseyNum: string;
  starter: string;
  oncourt: string;
  played: string;
  statistics: {
    assists: number;
    blocks: number;
    blocksReceived: number;
    fieldGoalsAttempted: number;
    fieldGoalsMade: number;
    fieldGoalsPercentage: number;
    foulsOffensive: number;
    foulsDrawn: number;
    foulsPersonal: number;
    foulsTechnical: number;
    freeThrowsAttempted: number;
    freeThrowsMade: number;
    freeThrowsPercentage: number;
    minus: number;
    minutes: string;
    minutesCalculated: string;
    plus: number;
    plusMinusPoints: number;
    points: number;
    pointsAgainst: number;
    pointsFastBreak: number;
    pointsInThePaint: number;
    pointsSecondChance: number;
    reboundsDefensive: number;
    reboundsOffensive: number;
    reboundsTotal: number;
    steals: number;
    threePointersAttempted: number;
    threePointersMade: number;
    threePointersPercentage: number;
    turnovers: number;
    twoPointersAttempted: number;
    twoPointersMade: number;
    twoPointersPercentage: number;
  };
}

export interface TeamGameData {
  teamId: number;
  teamName: string;
  teamCity: string;
  teamTricode: string;
  score: number;
  inBonus: string;
  timeoutsRemaining: number;
  periods: Array<{
    period: number;
    periodType: string;
    score: number;
  }>;
  players: PlayerStats[];
  statistics: {
    assists: number;
    assistsTurnoverRatio: number;
    benchPoints: number;
    biggestLead: number;
    biggestLeadScore?: string;
    biggestScoringRun?: number;
    biggestScoringRunScore?: string;
    blocks: number;
    blocksReceived: number;
    fastBreakPointsAttempted?: number;
    fastBreakPointsMade?: number;
    fastBreakPointsPercentage?: number;
    fieldGoalsAttempted: number;
    fieldGoalsEffectiveAdjusted?: number;
    fieldGoalsMade: number;
    fieldGoalsPercentage: number;
    foulsOffensive: number;
    foulsDrawn: number;
    foulsPersonal: number;
    foulsTeam: number;
    foulsTechnical: number;
    foulsTeamTechnical: number;
    freeThrowsAttempted: number;
    freeThrowsMade: number;
    freeThrowsPercentage: number;
    leadChanges?: number;
    minutes?: string;
    minutesCalculated?: string;
    pointsAgainst: number;
    pointsFastBreak: number;
    pointsFromTurnovers?: number;
    pointsInThePaint: number;
    pointsInThePaintAttempted?: number;
    pointsInThePaintMade?: number;
    pointsInThePaintPercentage?: number;
    pointsSecondChance?: number;
    reboundsDefensive: number;
    reboundsOffensive: number;
    reboundsPersonal?: number;
    reboundsTeam?: number;
    reboundsTeamDefensive?: number;
    reboundsTeamOffensive?: number;
    reboundsTotal: number;
    secondChancePointsAttempted?: number;
    secondChancePointsMade?: number;
    secondChancePointsPercentage?: number;
    steals: number;
    teamFieldGoalAttempts?: number;
    threePointersAttempted: number;
    threePointersMade: number;
    threePointersPercentage: number;
    timeLeading?: string;
    timesTied?: number;
    trueShootingAttempts?: number;
    trueShootingPercentage?: number;
    turnovers: number;
    turnoversTeam: number;
    turnoversTotal: number;
    twoPointersAttempted: number;
    twoPointersMade: number;
    twoPointersPercentage: number;
    points?: number;
  };
}

export interface Official {
  personId: number;
  name: string;
  nameI: string;
  firstName: string;
  familyName: string;
  jerseyNum: string;
  assignment: string;
}

export interface Arena {
  arenaId: number;
  arenaName: string;
  arenaCity: string;
  arenaState: string;
  arenaCountry: string;
  arenaTimezone: string;
}

export interface Boxscore {
  gameId: string;
  gameTimeLocal: string;
  gameTimeUTC: string;
  gameTimeHome: string;
  gameTimeAway: string;
  gameEt: string;
  duration: number;
  gameCode: string;
  gameStatusText: string;
  gameStatus: number;
  regulationPeriods: number;
  period: number;
  gameClock: string;
  attendance: number;
  sellout: string;
  arena: Arena;
  officials: Official[];
  homeTeam: TeamGameData;
  awayTeam: TeamGameData;
}

export interface GameDetailsData {
  home_abbr: string;
  home_name: string;
  away_abbr: string;
  away_name: string;
  team_win: string;
  arena_name: string;
  attendance: number;
  status: string;
  final_score: string;
  nba_game_ext: string;
  away_team_id: number;
  away_team: string;
  id: number;
  sport: string;
  start_time: string;
  home_team_id: number;
  home_team: string;
  scoreboards: Array<{
    id: number;
    boxscore: Boxscore;
  }>;
}
