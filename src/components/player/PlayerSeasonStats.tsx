'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/ui/table';

interface PlayerSeasonStats {
  SEASON_ID: string;
  GP: number;
  MIN: number;
  PTS: number;
  REB: number;
  AST: number;
  STL: number;
  BLK: number;
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
  TOV: number;
  PF: number;
}

interface PlayerStatsTableProps {
  stats: PlayerSeasonStats[];
}

const statOrder: { key: keyof PlayerSeasonStats | 'TS_PCT'; label: string }[] =
  [
    { key: 'SEASON_ID', label: 'Season' },
    { key: 'GP', label: 'GP' },
    { key: 'MIN', label: 'MIN' },
    { key: 'PTS', label: 'PTS' },
    { key: 'REB', label: 'REB' },
    { key: 'AST', label: 'AST' },
    { key: 'STL', label: 'STL' },
    { key: 'BLK', label: 'BLK' },
    { key: 'FGM', label: 'FGM' },
    { key: 'FGA', label: 'FGA' },
    { key: 'FG_PCT', label: 'FG%' },
    { key: 'FG3M', label: '3PM' },
    { key: 'FG3A', label: '3PA' },
    { key: 'FG3_PCT', label: '3P%' },
    { key: 'FTM', label: 'FTM' },
    { key: 'FTA', label: 'FTA' },
    { key: 'FT_PCT', label: 'FT%' },
    { key: 'TS_PCT', label: 'TS%' },
    { key: 'OREB', label: 'OREB' },
    { key: 'DREB', label: 'DREB' },
    { key: 'TOV', label: 'TOV' },
    { key: 'PF', label: 'PF' },
  ];

export const PlayerStatsTable = ({ stats }: PlayerStatsTableProps) => {
  const format = (value: number) =>
    Number.isFinite(value) ? value.toFixed(1) : '-';
  const percent = (value: number) =>
    Number.isFinite(value) ? (value * 100).toFixed(1) : '-';

  return (
    <div className="border-border rounded-lg border bg-[#1A1A1A] p-4">
      <h3 className="mb-4 text-lg font-semibold text-white">
        Total Season Stats
      </h3>
      <div className="w-full overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              {statOrder.map((stat) => (
                <TableHead
                  key={stat.key}
                  className="whitespace-nowrap text-white"
                >
                  {stat.label}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {stats.map((row) => {
              const gp = row.GP || 1;
              const ts =
                row.PTS && row.FGA && row.FTA
                  ? row.PTS / (2 * (row.FGA + 0.44 * row.FTA))
                  : undefined;

              return (
                <TableRow key={row.SEASON_ID}>
                  {statOrder.map(({ key }) => {
                    if (key === 'SEASON_ID')
                      return <TableCell key={key}>{row.SEASON_ID}</TableCell>;
                    if (key === 'GP')
                      return <TableCell key={key}>{row.GP}</TableCell>;
                    if (key === 'TS_PCT')
                      return (
                        <TableCell key={key}>{percent(ts ?? 0)}</TableCell>
                      );

                    const value = row[key as keyof PlayerSeasonStats];
                    if (key.includes('PCT'))
                      return (
                        <TableCell key={key}>
                          {percent(value as number)}
                        </TableCell>
                      );

                    return (
                      <TableCell key={key}>
                        {format((value as number) / gp)}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
