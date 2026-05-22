import React from 'react';

import TennisMatchupCard from './components/TennisMatchupCard';
import { tennisMatchups } from './data/tennisMatchups';

export type SportDataSource = 'api' | 'mock' | 'coming-soon';

export interface SportConfig {
  label: string;
  value: string | null;
  disabled: boolean;
  dataSource: SportDataSource;
  renderGrid?: (props: {
    oddsFormat: 'american' | 'european';
    onSelectGame?: (id: string) => void;
  }) => React.ReactNode;
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
    dataSource: 'mock',
    renderGrid: ({ oddsFormat, onSelectGame }) => (
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {tennisMatchups.map((matchup) => (
          <TennisMatchupCard
            key={matchup.id}
            matchup={matchup}
            oddsFormat={oddsFormat}
            onSelectGame={() => onSelectGame?.(matchup.id)}
          />
        ))}
      </div>
    ),
  },
  { label: 'NFL', value: 'nfl', disabled: true, dataSource: 'coming-soon' },
  { label: 'NCAAF', value: 'ncaaf', disabled: true, dataSource: 'coming-soon' },
  { label: 'NCAAB', value: 'ncaab', disabled: true, dataSource: 'coming-soon' },
  { label: 'MLB', value: 'mlb', disabled: true, dataSource: 'coming-soon' },
  { label: 'NHL', value: 'nhl', disabled: true, dataSource: 'coming-soon' },
  { label: 'WNBA', value: 'wnba', disabled: true, dataSource: 'coming-soon' },
];
