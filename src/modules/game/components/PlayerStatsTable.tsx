import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/components/table';
import { PlayerStats } from '../types';

const extractMinutes = (timeString: string): string => {
  const match = timeString?.match(/PT(\d+)M/);
  return match ? match[1] : '0';
};

interface PlayerStatsTableProps {
  players: PlayerStats[];
  teamAbbr: string;
}

const PlayerStatsTable = ({ players }: PlayerStatsTableProps) => (
  <div className="overflow-x-auto">
    <Table>
      <TableHeader>
        <TableRow className="border-border">
          <TableHead className="text-muted-foreground">Player</TableHead>
          <TableHead className="text-center text-muted-foreground">
            MIN
          </TableHead>
          <TableHead className="text-center text-muted-foreground">
            PTS
          </TableHead>
          <TableHead className="text-center text-muted-foreground">
            REB
          </TableHead>
          <TableHead className="text-center text-muted-foreground">
            AST
          </TableHead>
          <TableHead className="text-center text-muted-foreground">
            STL
          </TableHead>
          <TableHead className="text-center text-muted-foreground">
            BLK
          </TableHead>
          <TableHead className="text-center text-muted-foreground">
            TO
          </TableHead>
          <TableHead className="text-center text-muted-foreground">
            FG
          </TableHead>
          <TableHead className="text-center text-muted-foreground">
            3PT
          </TableHead>
          <TableHead className="text-center text-muted-foreground">
            FT
          </TableHead>
          <TableHead className="text-center text-muted-foreground">
            +/-
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {players.map((player) => (
          <TableRow
            key={player.personId}
            className="border-border hover:bg-muted/30"
          >
            <TableCell>
              <div>
                <div className="font-medium">{player.name}</div>
                <div className="text-xs text-muted-foreground">
                  {player.position}
                </div>
              </div>
            </TableCell>
            <TableCell className="text-center">
              {extractMinutes(
                player.statistics.minutesCalculated ||
                  player.statistics.minutes,
              )}
            </TableCell>
            <TableCell className="text-center font-semibold">
              {player.statistics.points}
            </TableCell>
            <TableCell className="text-center">
              {player.statistics.reboundsTotal}
            </TableCell>
            <TableCell className="text-center">
              {player.statistics.assists}
            </TableCell>
            <TableCell className="text-center">
              {player.statistics.steals}
            </TableCell>
            <TableCell className="text-center">
              {player.statistics.blocks}
            </TableCell>
            <TableCell className="text-center">
              {player.statistics.turnovers}
            </TableCell>
            <TableCell className="text-center text-sm">
              {player.statistics.fieldGoalsMade}-
              {player.statistics.fieldGoalsAttempted}
            </TableCell>
            <TableCell className="text-center text-sm">
              {player.statistics.threePointersMade}-
              {player.statistics.threePointersAttempted}
            </TableCell>
            <TableCell className="text-center text-sm">
              {player.statistics.freeThrowsMade}-
              {player.statistics.freeThrowsAttempted}
            </TableCell>
            <TableCell
              className={`text-center font-medium ${
                player.statistics.plusMinusPoints > 0
                  ? 'text-emerald-400'
                  : player.statistics.plusMinusPoints < 0
                    ? 'text-red-400'
                    : 'text-muted-foreground'
              }`}
            >
              {player.statistics.plusMinusPoints > 0 ? '+' : ''}
              {player.statistics.plusMinusPoints}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </div>
);

export default PlayerStatsTable;
