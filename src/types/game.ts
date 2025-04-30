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

export interface IGame {
  gameId: string;
  gameCode: string;
  gameStatus: number;
  gameStatusText: string;
  period: number;
  gameClock: string;
  gameTimeUTC: string;
  gameEt: string;
  regulationPeriods: number;
  ifNecessary: boolean;
  seriesGameNumber: string;
  gameLabel: string;
  gameSubLabel: string;
  seriesText: string;
  seriesConference: string;
  poRoundDesc: string;
  gameSubtype: string;
  isNeutral: boolean;
  homeTeam: ITeam;
  awayTeam: ITeam;
  gameLeaders: IGameLeaders;
  pbOdds: IPOdds;
}
