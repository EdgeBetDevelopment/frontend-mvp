import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/ui/table';

const TeamStatsTable = () => {
  // Example data for two teams
  const statsData = [
    {
      season: '2017-18',
      GP: 32,
      MIN: 15.0,
      PTS: 3.2,
      REB: 3.3,
      AST: 1.8,
      STL: 0.5,
      BLK: 0.3,
      FGM: 1.2,
      FGA: 3.1,
      FG_PCT: 38.4,
      TPM: 0.1,
      TPA: 0.5,
      TP_PCT: 23.5,
      FTM: 0.7,
      FTA: 1.3,
      FT_PCT: 52.5,
      TS_PCT: 43.3,
      OREB: 1.0,
      DREB: 2.3,
      TOV: 0.8,
      PF: 1.4,
    },
    {
      season: '2017-18',
      GP: 30,
      MIN: 18.5,
      PTS: 4.5,
      REB: 4.1,
      AST: 2.0,
      STL: 0.7,
      BLK: 0.4,
      FGM: 1.5,
      FGA: 3.8,
      FG_PCT: 40.2,
      TPM: 0.2,
      TPA: 0.7,
      TP_PCT: 28.1,
      FTM: 0.8,
      FTA: 1.5,
      FT_PCT: 60.0,
      TS_PCT: 46.0,
      OREB: 1.2,
      DREB: 2.9,
      TOV: 1.0,
      PF: 1.7,
    },
  ];

  const columns = [
    { key: 'season', label: 'Season' },
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
    { key: 'TPM', label: '3PM' },
    { key: 'TPA', label: '3PA' },
    { key: 'TP_PCT', label: '3P%' },
    { key: 'FTM', label: 'FTM' },
    { key: 'FTA', label: 'FTA' },
    { key: 'FT_PCT', label: 'FT%' },
    { key: 'TS_PCT', label: 'TS%' },
    { key: 'OREB', label: 'OREB' },
    { key: 'DREB', label: 'DREB' },
    { key: 'TOV', label: 'TOV' },
    { key: 'PF', label: 'PF' },
  ];

  return (
    <div className="border-border space-y-4 rounded-lg">
      <h3 className="align-bottom text-lg font-semibold tracking-normal">
        Total Season Stats
      </h3>
      <div className="w-full overflow-x-auto">
        <Table className="w-full">
          <TableHeader>
            <TableRow>
              {columns.map((col) => (
                <TableHead
                  key={col.key}
                  className="whitespace-nowrap text-white"
                >
                  {col.label}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {statsData.map((row, idx) => (
              <TableRow key={idx} className="bg-surface-secondary">
                {columns.map((col) => (
                  <TableCell key={col.key} className="whitespace-nowrap">
                    {row[col.key as keyof typeof row]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default TeamStatsTable;
