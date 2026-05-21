import { Badge } from '@/shared/components/badge';
import { Card } from '@/shared/components/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/components/table';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/shared/components/tooltip';
import { getStatusColor } from '@/shared/utils';
import { Injury } from '@/modules/game/types';

interface IInjuryReportTabContentProps {
  homeTeamInjuries: Injury[] | undefined;
  awayTeamInjuries: Injury[] | undefined;
}

const InjuryReportTabContent = ({
  homeTeamInjuries,
  awayTeamInjuries,
}: IInjuryReportTabContentProps) => {
  const hasInjuries =
    (homeTeamInjuries && homeTeamInjuries.length > 0) ||
    (awayTeamInjuries && awayTeamInjuries.length > 0);

  const allInjuries = [
    ...(homeTeamInjuries ?? []).map((p, idx) => ({ ...p, key: `home-${idx}` })),
    ...(awayTeamInjuries ?? []).map((p, idx) => ({ ...p, key: `away-${idx}` })),
  ];

  return (
    <>
      {/* Mobile Card View */}
      <div className="block space-y-3 md:hidden">
        {homeTeamInjuries?.map((player, idx) => (
          <Card key={`home-card-${idx}`} className="p-4">
            <div className="mb-3 flex items-start justify-between gap-2">
              <div>
                <h4 className="font-semibold">{player.player}</h4>
                <p className="text-sm text-muted-foreground">
                  {player.team_name} · {player.position}
                </p>
              </div>
              <Badge className={getStatusColor(player.status)}>
                {player.status}
              </Badge>
            </div>
            <div className="space-y-2 text-sm">
              <div>
                <span className="font-medium">Est. Return: </span>
                <span className="text-muted-foreground">
                  {player.return_date}
                </span>
              </div>
              {player.comment && (
                <div>
                  <span className="font-medium">Notes: </span>
                  <span className="text-muted-foreground">
                    {player.comment}
                  </span>
                </div>
              )}
            </div>
          </Card>
        ))}
        {awayTeamInjuries?.map((player, idx) => (
          <Card key={`away-card-${idx}`} className="p-4">
            <div className="mb-3 flex items-start justify-between gap-2">
              <div>
                <h4 className="font-semibold">{player.player}</h4>
                <p className="text-sm text-muted-foreground">
                  {player.team_name} · {player.position}
                </p>
              </div>
              <Badge className={getStatusColor(player.status)}>
                {player.status}
              </Badge>
            </div>
            <div className="space-y-2 text-sm">
              <div>
                <span className="font-medium">Est. Return: </span>
                <span className="text-muted-foreground">
                  {player.return_date}
                </span>
              </div>
              {player.comment && (
                <div>
                  <span className="font-medium">Notes: </span>
                  <span className="text-muted-foreground">
                    {player.comment}
                  </span>
                </div>
              )}
            </div>
          </Card>
        ))}
        {!hasInjuries && (
          <Card className="p-8">
            <p className="text-center text-muted-foreground">
              No injury reports available
            </p>
          </Card>
        )}
      </div>

      {/* Desktop Table View */}
      <div className="relative hidden md:block">
        <div
          className="overflow-auto rounded-lg border border-border"
          style={{ maxHeight: 'calc(90vh - 350px)' }}
        >
          <Table className="min-w-[600px]">
            <TableHeader className="sticky top-0 z-10 bg-secondary backdrop-blur-sm">
              <TableRow className="bg-secondary/30">
                <TableHead className="whitespace-nowrap font-semibold">
                  Player
                </TableHead>
                <TableHead className="whitespace-nowrap font-semibold">
                  Team
                </TableHead>
                <TableHead className="whitespace-nowrap font-semibold">
                  Pos
                </TableHead>
                <TableHead className="whitespace-nowrap font-semibold">
                  Est. Return
                </TableHead>
                <TableHead className="whitespace-nowrap font-semibold">
                  Notes
                </TableHead>
                <TableHead className="whitespace-nowrap text-right font-semibold">
                  Status
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {allInjuries.map((player) => (
                <TableRow key={player.key} className="hover:bg-secondary/10">
                  <TableCell className="font-medium">{player.player}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {player.team_name}
                  </TableCell>
                  <TableCell>{player.position}</TableCell>
                  <TableCell className="whitespace-nowrap">
                    {player.return_date}
                  </TableCell>
                  <TableCell className="max-w-[150px] text-muted-foreground sm:max-w-[250px]">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="cursor-help truncate">
                          {player.comment}
                        </div>
                      </TooltipTrigger>
                      <TooltipContent side="left" className="max-w-xs">
                        <p className="break-words">{player.comment}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TableCell>
                  <TableCell className="text-right">
                    <Badge className={getStatusColor(player.status)}>
                      {player.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
              {!hasInjuries && (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="py-8 text-center text-muted-foreground"
                  >
                    No injury reports available
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
};

export default InjuryReportTabContent;
