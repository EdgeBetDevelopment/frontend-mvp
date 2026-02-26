'use client';

import { Avatar, AvatarImage } from '@/ui/avatar';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/ui/table';
import { STAT_ORDER, STAT_LABELS } from '../constants';
import { processTeamStats } from '../utils';

interface TeamStat {
  name: string;
  stats: Record<string, any>;
  logo?: string;
}

interface TeamStatsTableProps {
  stats: TeamStat[];
  tableRowClassName?: string;
}

export const TeamStatsTable = ({
  tableRowClassName,
  stats,
}: TeamStatsTableProps) => {
  const processedStats = stats.map((team) => ({
    name: team.name,
    logo: team.logo,
    values: processTeamStats(team.stats),
  }));

  return (
    <div>
      <div className="w-full overflow-x-auto">
        <Table className="w-full">
          <TableHeader>
            <TableRow>
              <TableHead className="text-white">Team</TableHead>
              {STAT_ORDER.map(
                (key) =>
                  key in STAT_LABELS && (
                    <TableHead
                      key={key}
                      className="whitespace-nowrap text-white"
                    >
                      {STAT_LABELS[key]}
                    </TableHead>
                  ),
              )}
            </TableRow>
          </TableHeader>
          <TableBody>
            {processedStats.map((team, index) => (
              <TableRow key={index} className={tableRowClassName}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {team.logo && (
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={team.logo} />
                      </Avatar>
                    )}
                    <span>{team.name}</span>
                  </div>
                </TableCell>
                {STAT_ORDER.map(
                  (key) =>
                    key in team.values && (
                      <TableCell key={key} className="whitespace-nowrap">
                        {team.values[key as keyof typeof team.values]}
                      </TableCell>
                    ),
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
