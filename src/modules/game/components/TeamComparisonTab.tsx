import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/shared/components/card';
import { TeamGameData } from '../types';

interface StatRow {
  label: string;
  home: number;
  away: number;
  format: (val: number) => string;
  inverse?: boolean;
}

const STAT_ROWS: Omit<StatRow, 'home' | 'away'>[] = [
  { label: 'Field Goal %', format: (val) => val.toFixed(1) + '%' },
  { label: '3-Point %', format: (val) => val.toFixed(1) + '%' },
  { label: 'Free Throw %', format: (val) => val.toFixed(1) + '%' },
  { label: 'Rebounds', format: (val) => val.toString() },
  { label: 'Assists', format: (val) => val.toString() },
  { label: 'Turnovers', format: (val) => val.toString(), inverse: true },
  { label: 'Steals', format: (val) => val.toString() },
  { label: 'Blocks', format: (val) => val.toString() },
  { label: 'Points in Paint', format: (val) => val.toString() },
  { label: 'Fast Break Points', format: (val) => val.toString() },
];

const getStatValues = (
  label: string,
  homeTeam: TeamGameData,
  awayTeam: TeamGameData,
): { home: number; away: number } => {
  const s = { home: homeTeam.statistics, away: awayTeam.statistics };
  switch (label) {
    case 'Field Goal %':
      return {
        home: s.home.fieldGoalsPercentage,
        away: s.away.fieldGoalsPercentage,
      };
    case '3-Point %':
      return {
        home: s.home.threePointersPercentage,
        away: s.away.threePointersPercentage,
      };
    case 'Free Throw %':
      return {
        home: s.home.freeThrowsPercentage,
        away: s.away.freeThrowsPercentage,
      };
    case 'Rebounds':
      return { home: s.home.reboundsTotal, away: s.away.reboundsTotal };
    case 'Assists':
      return { home: s.home.assists, away: s.away.assists };
    case 'Turnovers':
      return { home: s.home.turnoversTotal, away: s.away.turnoversTotal };
    case 'Steals':
      return { home: s.home.steals, away: s.away.steals };
    case 'Blocks':
      return { home: s.home.blocks, away: s.away.blocks };
    case 'Points in Paint':
      return { home: s.home.pointsInThePaint, away: s.away.pointsInThePaint };
    case 'Fast Break Points':
      return { home: s.home.pointsFastBreak, away: s.away.pointsFastBreak };
    default:
      return { home: 0, away: 0 };
  }
};

interface TeamComparisonTabProps {
  homeTeam: TeamGameData;
  awayTeam: TeamGameData;
}

const TeamComparisonTab = ({ homeTeam, awayTeam }: TeamComparisonTabProps) => (
  <Card className="border-border bg-card">
    <CardHeader>
      <CardTitle>Team Statistics Comparison</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="space-y-4">
        {STAT_ROWS.map((row, idx) => {
          const { home, away } = getStatValues(row.label, homeTeam, awayTeam);
          const homeWins = row.inverse ? home < away : home > away;
          const awayWins = row.inverse ? away < home : away > home;
          return (
            <div
              key={idx}
              className="grid grid-cols-3 items-center gap-4 border-b border-border py-3 last:border-0"
            >
              <div
                className={`text-right font-medium ${
                  homeWins ? 'text-emerald-400' : 'text-muted-foreground'
                }`}
              >
                {row.format(home)}
              </div>
              <div className="text-center text-sm text-muted-foreground">
                {row.label}
              </div>
              <div
                className={`text-left font-medium ${
                  awayWins ? 'text-emerald-400' : 'text-muted-foreground'
                }`}
              >
                {row.format(away)}
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-6 flex justify-between border-t border-border pt-4 text-sm text-muted-foreground">
        <span>{homeTeam.teamTricode}</span>
        <span>{awayTeam.teamTricode}</span>
      </div>
    </CardContent>
  </Card>
);

export default TeamComparisonTab;
