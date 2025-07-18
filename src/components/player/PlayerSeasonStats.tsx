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
    { key: 'PTS', label: 'PPG' },
    { key: 'REB', label: 'RPG' },
    { key: 'AST', label: 'APG' },
    { key: 'STL', label: 'SPG' },
    { key: 'BLK', label: 'BPG' },
    { key: 'FG_PCT', label: 'FG%' },
    { key: 'FT_PCT', label: 'FT%' },
    { key: 'TS_PCT', label: 'TS%' },
    { key: 'MIN', label: 'MPG' },
  ];

export const PlayerStatsTable = ({ stats }: PlayerStatsTableProps) => {
  const format = (value: number) =>
    Number.isFinite(value) ? value.toFixed(1) : '-';
  const percent = (value: number) =>
    Number.isFinite(value) ? (value * 100).toFixed(1) : '-';

  const currentYear = new Date().getFullYear() - 1;
  const seasonText = `${currentYear} - ${String(currentYear + 1).slice(2)}`;
  const seasonId = `${currentYear}-${String(currentYear + 1).slice(2)}`;
  const seasonStats = stats.find((s) => s.SEASON_ID === seasonId);

  if (!seasonStats) return null;

  const gp = seasonStats.GP || 1;
  const ts =
    seasonStats.PTS && seasonStats.FGA && seasonStats.FTA
      ? seasonStats.PTS / (2 * (seasonStats.FGA + 0.44 * seasonStats.FTA))
      : undefined;

  return (
    <div className="border-border rounded-lg border bg-[#1A1A1A] p-4">
      <h3 className="mb-4 text-lg font-semibold text-white">
        {`Current Season Stats - (${seasonText})`}
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
            <TableRow>
              {statOrder.map(({ key }) => {
                if (key === 'SEASON_ID')
                  return (
                    <TableCell key={key}>{seasonStats.SEASON_ID}</TableCell>
                  );
                if (key === 'GP')
                  return <TableCell key={key}>{seasonStats.GP}</TableCell>;
                if (key === 'TS_PCT')
                  return <TableCell key={key}>{percent(ts ?? 0)}</TableCell>;

                const value = seasonStats[key as keyof PlayerSeasonStats];
                if (key.includes('PCT'))
                  return (
                    <TableCell key={key}>{percent(value as number)}</TableCell>
                  );

                return (
                  <TableCell key={key}>
                    {format((value as number) / gp)}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
