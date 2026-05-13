import { ChevronRight, Users } from 'lucide-react';

import { Player } from '@/modules/team/types';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/shared/components/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/components/table';

interface TeamRosterTabProps {
  players: Player[];
  onPlayerClick: (playerId: number) => void;
}

export const TeamRosterTab = ({
  players,
  onPlayerClick,
}: TeamRosterTabProps) => (
  <Card className="border-border bg-card">
    <CardHeader>
      <CardTitle className="flex items-center gap-2">
        <Users className="h-5 w-5 text-primary" />
        Active Roster
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>#</TableHead>
              <TableHead>Player</TableHead>
              <TableHead>Position</TableHead>
              <TableHead>Height</TableHead>
              <TableHead>Weight</TableHead>
              <TableHead>Age</TableHead>
              <TableHead>Exp</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {players?.map((player) => (
              <TableRow
                key={player.PLAYER_ID}
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => onPlayerClick(player.PLAYER_ID)}
              >
                <TableCell className="font-medium">{player.NUM}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {player.PLAYER}
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </div>
                </TableCell>
                <TableCell>{player.POSITION}</TableCell>
                <TableCell>{player.HEIGHT}</TableCell>
                <TableCell>{player.WEIGHT} lbs</TableCell>
                <TableCell>{player.AGE}</TableCell>
                <TableCell>{player.EXP}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </CardContent>
  </Card>
);
