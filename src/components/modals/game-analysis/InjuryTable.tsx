import React from 'react';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { Injury } from '@/types/game';
import { Badge } from '@/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/ui/table';

interface InjuryTableProps {
  homeInjuries?: Injury[];
  awayInjuries?: Injury[];
}

const InjuryTable = ({
  homeInjuries = [],
  awayInjuries = [],
}: InjuryTableProps) => {
  const allInjuries = [...homeInjuries, ...awayInjuries];

  const getStatusVariant = (status: string) => {
    const statusLower = status.toLowerCase();
    if (statusLower.includes('out')) return 'red';
    if (statusLower.includes('day-to-day')) return 'orange';
    if (statusLower.includes('probable')) return 'green';
    return 'default';
  };

  return (
    <div className="space-y-4">
      <h3 className="align-bottom text-lg font-semibold tracking-normal">
        Injury Report
      </h3>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Player</TableHead>
            <TableHead>Team</TableHead>
            <TableHead>Pos</TableHead>
            <TableHead>EST. Return Date</TableHead>
            <TableHead>Comment</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allInjuries.map((injury, index) => (
            <TableRow key={index} className="bg-surface-secondary">
              <TableCell className="font-medium">{injury.player}</TableCell>
              <TableCell>{injury.team_name}</TableCell>
              <TableCell>{injury.position}</TableCell>
              <TableCell>{injury.return_date}</TableCell>

              <TableCell>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span className="cursor-help text-sm">
                        {injury.comment.length > 30
                          ? `${injury.comment.slice(0, 30)}...`
                          : injury.comment}
                      </span>
                    </TooltipTrigger>
                    <TooltipContent className="max-w-[300px] p-3">
                      <p className="text-sm">{injury.comment}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </TableCell>

              <TableCell>
                <Badge
                  variant={getStatusVariant(injury.status)}
                  className={cn(
                    'w-full max-w-[85px] py-2 capitalize',
                    getStatusVariant(injury.status),
                  )}
                >
                  {injury.status}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default InjuryTable;
