import { Calendar, MapPin, Trophy, TrendingDown } from 'lucide-react';
import { Card, CardContent } from '@/shared/components/card';
import { Badge } from '@/shared/components/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/components/table';
import { Boxscore, GameDetailsData } from '../types';

interface GameHeaderProps {
  gameData: GameDetailsData;
  boxscore: Boxscore;
  formattedDate: string;
  formattedTime: string;
}

const GameHeader = ({
  gameData,
  boxscore,
  formattedDate,
  formattedTime,
}: GameHeaderProps) => {
  const { homeTeam, awayTeam } = boxscore;

  return (
    <Card className="mb-8 border-border bg-card">
      <CardContent className="p-6">
        <div className="mb-6 flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            {formattedDate} • {formattedTime}
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="h-4 w-4" />
            {boxscore.arena.arenaName}
          </div>
          <Badge variant="outline" className="text-xs">
            Attendance: {boxscore.attendance.toLocaleString()}
          </Badge>
        </div>
        <div className="flex items-center justify-center gap-8 md:gap-16">
          <div className="text-center">
            <div className="mb-1 text-lg font-medium text-muted-foreground">
              {awayTeam.teamTricode}
            </div>
            <div
              className={`text-4xl font-bold md:text-5xl ${
                awayTeam.score > homeTeam.score
                  ? 'text-foreground'
                  : 'text-muted-foreground'
              }`}
            >
              {awayTeam.score}
            </div>
            <div className="mt-1 text-sm text-muted-foreground">
              {gameData.away_name}
            </div>
            {awayTeam.score < homeTeam.score && (
              <Badge
                variant="outline"
                className="mt-2 border-red-400/30 text-red-400"
              >
                <TrendingDown className="mr-1 h-3 w-3" /> Loss
              </Badge>
            )}
            {awayTeam.score > homeTeam.score && (
              <Badge className="mt-2 border-emerald-500/30 bg-emerald-500/20 text-emerald-400">
                <Trophy className="mr-1 h-3 w-3" /> Win
              </Badge>
            )}
          </div>
          <div className="text-2xl font-light text-muted-foreground">FINAL</div>
          <div className="text-center">
            <div className="mb-1 text-lg font-medium text-muted-foreground">
              {homeTeam.teamTricode}
            </div>
            <div
              className={`text-4xl font-bold md:text-5xl ${
                homeTeam.score > awayTeam.score
                  ? 'text-foreground'
                  : 'text-muted-foreground'
              }`}
            >
              {homeTeam.score}
            </div>
            <div className="mt-1 text-sm text-muted-foreground">
              {gameData.home_name}
            </div>
            {homeTeam.score < awayTeam.score && (
              <Badge
                variant="outline"
                className="mt-2 border-red-400/30 text-red-400"
              >
                <TrendingDown className="mr-1 h-3 w-3" /> Loss
              </Badge>
            )}
            {homeTeam.score > awayTeam.score && (
              <Badge className="mt-2 border-emerald-500/30 bg-emerald-500/20 text-emerald-400">
                <Trophy className="mr-1 h-3 w-3" /> Win
              </Badge>
            )}
          </div>
        </div>
        <div className="mt-8 flex justify-center">
          <div className="rounded-lg bg-muted/30 p-4">
            <Table>
              <TableHeader>
                <TableRow className="border-border">
                  <TableHead className="text-muted-foreground">Team</TableHead>
                  <TableHead className="text-center text-muted-foreground">
                    Q1
                  </TableHead>
                  <TableHead className="text-center text-muted-foreground">
                    Q2
                  </TableHead>
                  <TableHead className="text-center text-muted-foreground">
                    Q3
                  </TableHead>
                  <TableHead className="text-center text-muted-foreground">
                    Q4
                  </TableHead>
                  <TableHead className="text-center font-bold text-muted-foreground">
                    Total
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow className="border-border">
                  <TableCell className="font-medium">
                    {awayTeam.teamTricode}
                  </TableCell>
                  {awayTeam.periods.slice(0, 4).map((period) => (
                    <TableCell key={period.period} className="text-center">
                      {period.score}
                    </TableCell>
                  ))}
                  <TableCell className="text-center font-bold">
                    {awayTeam.score}
                  </TableCell>
                </TableRow>
                <TableRow className="border-border">
                  <TableCell className="font-medium">
                    {homeTeam.teamTricode}
                  </TableCell>
                  {homeTeam.periods.slice(0, 4).map((period) => (
                    <TableCell key={period.period} className="text-center">
                      {period.score}
                    </TableCell>
                  ))}
                  <TableCell className="text-center font-bold">
                    {homeTeam.score}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default GameHeader;
