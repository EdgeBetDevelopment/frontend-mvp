import { ITeam, TeamStatistics } from './types';
import { CHART_COLORS } from './constants';

export interface ChartDataPoint {
  name: string;
  value: number;
  color?: string;
  fill?: string;
}

export interface ProcessedStats {
  GP: string;
  MIN: string;
  PTS: string;
  REB: string;
  AST: string;
  STL: string;
  BLK: string;
  FGM: string;
  FGA: string;
  FG_PCT: string;
  FG3M: string;
  FG3A: string;
  FG3_PCT: string;
  FTM: string;
  FTA: string;
  FT_PCT: string;
  TS_PCT: string;
  OREB: string;
  DREB: string;
  TOV: string;
  PF: string;
}

/**
 * Generate chart data for team statistics overview
 */
export const generateOverviewChartData = (
  team: ITeam,
  gp: number,
): ChartDataPoint[] => {
  return [
    {
      name: 'PPG',
      value: parseFloat(((team.team_statistics?.PTS || 0) / gp).toFixed(1)),
      color: CHART_COLORS.PRIMARY,
    },
    {
      name: 'RPG',
      value: parseFloat(((team.team_statistics?.REB || 0) / gp).toFixed(1)),
      color: CHART_COLORS.TERTIARY,
    },
    {
      name: 'APG',
      value: parseFloat(((team.team_statistics?.AST || 0) / gp).toFixed(1)),
      color: CHART_COLORS.QUATERNARY,
    },
    {
      name: 'FG%',
      value: parseFloat(((team.team_statistics?.FG_PCT || 0) * 100).toFixed(1)),
      color: CHART_COLORS.QUINARY,
    },
    {
      name: '3P%',
      value: parseFloat(
        ((team.team_statistics?.FG3_PCT || 0) * 100).toFixed(1),
      ),
      color: CHART_COLORS.PRIMARY,
    },
    {
      name: 'FT%',
      value: parseFloat(((team.team_statistics?.FT_PCT || 0) * 100).toFixed(1)),
      color: CHART_COLORS.SECONDARY,
    },
  ];
};

/**
 * Generate detailed chart data for team statistics
 */
export const generateDetailedChartData = (
  stats: TeamStatistics,
): ChartDataPoint[] => {
  const games = stats.GP || 1;

  return [
    { name: 'Wins', value: stats.W, fill: CHART_COLORS.SUCCESS },
    { name: 'Losses', value: stats.L, fill: CHART_COLORS.ERROR },
    {
      name: 'FG%',
      value: +(stats.FG_PCT * 100).toFixed(1),
      fill: CHART_COLORS.WARNING,
    },
    {
      name: '3PT%',
      value: +(stats.FG3_PCT * 100).toFixed(1),
      fill: CHART_COLORS.SUCCESS,
    },
    {
      name: 'FT%',
      value: +(stats.FT_PCT * 100).toFixed(1),
      fill: CHART_COLORS.INFO,
    },
    {
      name: 'PTS (avg)',
      value: +(stats.PTS / games).toFixed(1),
      fill: CHART_COLORS.CYAN,
    },
    {
      name: 'REB (avg)',
      value: +(stats.REB / games).toFixed(1),
      fill: CHART_COLORS.PINK,
    },
    {
      name: 'AST (avg)',
      value: +(stats.AST / games).toFixed(1),
      fill: CHART_COLORS.PURPLE,
    },
  ];
};

/**
 * Calculate win percentage from team statistics
 */
export const calculateWinPercentage = (
  stats?: TeamStatistics | null,
): string | null => {
  if (!stats) return null;

  const wins = stats.W || 0;
  const losses = stats.L || 0;
  const totalGames = wins + losses;

  if (totalGames === 0) return null;

  return ((wins / totalGames) * 100).toFixed(1);
};

/**
 * Process raw team statistics into formatted display values
 */
export const processTeamStats = (
  stats: Record<string, any>,
): ProcessedStats => {
  const gp = stats?.GP || 1;

  const calcPerGame = (val: number) => (gp ? (val / gp).toFixed(1) : '0.0');
  const percent = (val: number) => (val ? (val * 100).toFixed(1) : '0.0');

  const ts =
    stats?.PTS && stats?.FGA && stats?.FTA
      ? stats.PTS / (2 * (stats.FGA + 0.44 * stats.FTA))
      : null;

  return {
    GP: stats?.GP?.toString(),
    MIN: calcPerGame(stats?.MIN),
    PTS: calcPerGame(stats?.PTS ?? stats?.FGM * 2 + stats?.FG3M + stats?.FTM),
    REB: calcPerGame(stats?.REB),
    AST: calcPerGame(stats?.AST),
    STL: calcPerGame(stats?.STL),
    BLK: calcPerGame(stats?.BLK),
    FGM: calcPerGame(stats?.FGM),
    FGA: calcPerGame(stats?.FGA),
    FG_PCT: percent(stats?.FG_PCT),
    FG3M: calcPerGame(stats?.FG3M),
    FG3A: calcPerGame(stats?.FG3A),
    FG3_PCT: percent(stats?.FG3_PCT),
    FTM: calcPerGame(stats?.FTM),
    FTA: calcPerGame(stats?.FTA),
    FT_PCT: percent(stats?.FT_PCT),
    TS_PCT: ts ? percent(ts) : '-',
    OREB: calcPerGame(stats?.OREB),
    DREB: calcPerGame(stats?.DREB),
    TOV: calcPerGame(stats?.TOV),
    PF: calcPerGame(stats?.PF),
  };
};
