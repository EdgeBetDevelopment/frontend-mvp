'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/ui/table';

interface TeamStatsTableProps {
  stats: Record<string, any>;
}

const statOrder: string[] = [
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
];

export const TeamStatsTable = ({ stats }: TeamStatsTableProps) => {
  const gp = stats.GP || 1;

  const calcPerGame = (val: number) => (gp ? (val / gp).toFixed(1) : '0.0');
  const percent = (val: number) => (val ? (val * 100).toFixed(1) : '0.0');

  const ts =
    stats.PTS && stats.FGA && stats.FTA
      ? stats.PTS / (2 * (stats.FGA + 0.44 * stats.FTA))
      : null;

  const values: Record<string, string> = {
    GP: stats.GP?.toString(),
    MIN: calcPerGame(stats.MIN),
    PTS: calcPerGame(stats.PTS ?? stats.FGM * 2 + stats.FG3M + stats.FTM), // fallback
    REB: calcPerGame(stats.REB),
    AST: calcPerGame(stats.AST),
    STL: calcPerGame(stats.STL),
    BLK: calcPerGame(stats.BLK),
    FGM: calcPerGame(stats.FGM),
    FGA: calcPerGame(stats.FGA),
    FG_PCT: percent(stats.FG_PCT),
    FG3M: calcPerGame(stats.FG3M),
    FG3A: calcPerGame(stats.FG3A),
    FG3_PCT: percent(stats.FG3_PCT),
    FTM: calcPerGame(stats.FTM),
    FTA: calcPerGame(stats.FTA),
    FT_PCT: percent(stats.FT_PCT),
    TS_PCT: ts ? percent(ts) : '-',
    OREB: calcPerGame(stats.OREB),
    DREB: calcPerGame(stats.DREB),
    TOV: calcPerGame(stats.TOV),
    PF: calcPerGame(stats.PF),
  };

  const labels: Record<string, string> = {
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
  };

  return (
    <div className="border-border rounded-lg border bg-[#1A1A1A] p-4">
      <h3 className="mb-4 text-lg font-semibold text-white">
        Overall Statistic
      </h3>
      <div className="w-full overflow-x-auto">
        <Table className="w-full">
          <TableHeader>
            <TableRow>
              <TableHead className="text-white">Season</TableHead>
              {statOrder.map(
                (key) =>
                  key in values && (
                    <TableHead
                      key={key}
                      className="whitespace-nowrap text-white"
                    >
                      {labels[key]}
                    </TableHead>
                  ),
              )}
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>{stats.GROUP_VALUE}</TableCell>
              {statOrder.map(
                (key) =>
                  key in values && (
                    <TableCell key={key} className="whitespace-nowrap">
                      {values[key]}
                    </TableCell>
                  ),
              )}
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
