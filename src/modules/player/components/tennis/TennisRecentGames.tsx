import { useState } from 'react';
import { Calendar } from 'lucide-react';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/shared/components/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/components/table';

import type { TennisRecentGame } from '../../data/tennisPlayers';

type GameFilter = 'full' | 'last5' | 'last10';

const surfaceColors: Record<string, string> = {
  Hard: 'bg-blue-500/20 text-blue-400 border-blue-500/40',
  'Hard (Indoor)': 'bg-indigo-500/20 text-indigo-400 border-indigo-500/40',
  Clay: 'bg-orange-500/20 text-orange-400 border-orange-500/40',
  Grass: 'bg-green-500/20 text-green-400 border-green-500/40',
};

interface Props {
  games: TennisRecentGame[];
}

const TennisRecentGames = ({ games }: Props) => {
  const [filter, setFilter] = useState<GameFilter>('full');

  const filtered =
    filter === 'last5'
      ? games.slice(0, 5)
      : filter === 'last10'
        ? games.slice(0, 10)
        : games;

  return (
    <Card className="flex-1 border-border bg-card">
      <CardHeader className="pb-4">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <CardTitle className="flex items-center gap-2 text-lg font-semibold text-foreground">
            <Calendar className="h-5 w-5 text-primary" />
            Recent Games
          </CardTitle>
          <Select
            value={filter}
            onValueChange={(v: GameFilter) => setFilter(v)}
          >
            <SelectTrigger className="w-[140px] border-border bg-secondary">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="border-border bg-popover">
              <SelectItem value="full">Full Season</SelectItem>
              <SelectItem value="last10">Last 10</SelectItem>
              <SelectItem value="last5">Last 5</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-border hover:bg-transparent">
                <TableHead className="text-muted-foreground">Date</TableHead>
                <TableHead className="text-muted-foreground">
                  Tournament
                </TableHead>
                <TableHead className="text-muted-foreground">Surface</TableHead>
                <TableHead className="text-muted-foreground">Rd</TableHead>
                <TableHead className="text-muted-foreground">
                  Opponent
                </TableHead>
                <TableHead className="text-muted-foreground">Result</TableHead>
                <TableHead className="text-right text-muted-foreground">
                  Aces
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((game, i) => (
                <TableRow key={i} className="border-border">
                  <TableCell className="text-foreground">{game.date}</TableCell>
                  <TableCell>
                    <div className="font-medium text-foreground">
                      {game.tournament}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {game.city}
                    </div>
                  </TableCell>
                  <TableCell>
                    <span
                      className={`rounded border px-2 py-0.5 text-xs font-medium ${surfaceColors[game.surface] ?? 'bg-secondary text-foreground'}`}
                    >
                      {game.surface}
                    </span>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {game.round}
                  </TableCell>
                  <TableCell>
                    <div className="text-foreground">{game.opponentName}</div>
                    <div className="text-xs text-muted-foreground">
                      Rank #{game.opponentRank}
                    </div>
                  </TableCell>
                  <TableCell>
                    <span
                      className={
                        game.result === 'W'
                          ? 'font-semibold text-[#34D399]'
                          : 'font-semibold text-[#DC2626]'
                      }
                    >
                      {game.result}
                    </span>
                    <div className="text-xs text-muted-foreground">
                      {game.score}
                    </div>
                  </TableCell>
                  <TableCell className="text-right text-foreground">
                    {game.aces}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default TennisRecentGames;
