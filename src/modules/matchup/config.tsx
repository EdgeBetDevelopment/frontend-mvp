export type SportDataSource = 'api' | 'mock' | 'coming-soon';

export interface SportConfig {
  label: string;
  value: string | null;
  disabled: boolean;
  dataSource: SportDataSource;
}

export const SPORT_CONFIGS: SportConfig[] = [
  {
    label: 'NBA',
    value: null,
    disabled: false,
    dataSource: 'api',
  },
  {
    label: 'Tennis',
    value: 'tennis',
    disabled: false,
    dataSource: 'api',
  },
  { label: 'NFL', value: 'nfl', disabled: true, dataSource: 'coming-soon' },
  { label: 'NCAAF', value: 'ncaaf', disabled: true, dataSource: 'coming-soon' },
  { label: 'NCAAB', value: 'ncaab', disabled: true, dataSource: 'coming-soon' },
  { label: 'MLB', value: 'mlb', disabled: true, dataSource: 'coming-soon' },
  { label: 'NHL', value: 'nhl', disabled: true, dataSource: 'coming-soon' },
  { label: 'WNBA', value: 'wnba', disabled: true, dataSource: 'coming-soon' },
];
