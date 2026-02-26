/**
 * Chart colors for team statistics visualization
 */
export const CHART_COLORS = {
  PRIMARY: 'hsl(var(--chart-1))',
  SECONDARY: 'hsl(var(--chart-2))',
  TERTIARY: 'hsl(var(--chart-3))',
  QUATERNARY: 'hsl(var(--chart-4))',
  QUINARY: 'hsl(var(--chart-5))',
  SUCCESS: '#34D399',
  ERROR: '#DC2626',
  WARNING: '#F59E0B',
  INFO: '#60A5FA',
  CYAN: '#84FDF7',
  PINK: '#F472B6',
  PURPLE: '#A78BFA',
} as const;

/**
 * Metric descriptions for tooltips
 */
export const METRIC_DESCRIPTIONS: Record<string, string> = {
  Wins: 'Number of games won',
  Losses: 'Number of games lost',
  'FG%': 'Field Goal Percentage',
  '3PT%': 'Three Point Percentage',
  'FT%': 'Free Throw Percentage',
  'PTS (avg)': 'Average points per game',
  'REB (avg)': 'Average rebounds per game',
  'AST (avg)': 'Average assists per game',
} as const;

/**
 * Order of statistics columns in tables
 */
export const STAT_ORDER: string[] = [
  'GP',
  'MIN',
  'PTS',
  'REB',
  'AST',
  'STL',
  'BLK',
  'FGM',
  'FGA',
  'FG_PCT',
  'FG3M',
  'FG3A',
  'FG3_PCT',
  'FTM',
  'FTA',
  'FT_PCT',
  'TS_PCT',
  'OREB',
  'DREB',
  'TOV',
  'PF',
] as const;

/**
 * Labels for statistics in tables
 */
export const STAT_LABELS: Record<string, string> = {
  GP: 'GP',
  MIN: 'MIN',
  PTS: 'PTS',
  REB: 'REB',
  AST: 'AST',
  STL: 'STL',
  BLK: 'BLK',
  FGM: 'FGM',
  FGA: 'FGA',
  FG_PCT: 'FG%',
  FG3M: '3PM',
  FG3A: '3PA',
  FG3_PCT: '3P%',
  FTM: 'FTM',
  FTA: 'FTA',
  FT_PCT: 'FT%',
  TS_PCT: 'TS%',
  OREB: 'OREB',
  DREB: 'DREB',
  TOV: 'TOV',
  PF: 'PF',
} as const;
