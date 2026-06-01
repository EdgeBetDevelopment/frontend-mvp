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

import type { TennisSeasonStats as TennisSeasonStatsType } from '../../data/tennisPlayers';

interface Props {
  stats: TennisSeasonStatsType;
  year: number;
}

const TennisSeasonStats = ({ stats, year }: Props) => (
  <Card className="mb-8 border-border bg-card">
    <CardHeader>
      <CardTitle className="text-lg font-semibold text-foreground">
        {year} Season Stats (YTD)
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-border hover:bg-transparent">
              <TableHead className="text-muted-foreground">WINS</TableHead>
              <TableHead className="text-muted-foreground">LOSSES</TableHead>
              <TableHead className="text-muted-foreground">TITLES</TableHead>
              <TableHead className="text-muted-foreground">ACES</TableHead>
              <TableHead className="text-muted-foreground">
                FIRSTSERVEPCT
              </TableHead>
              <TableHead className="text-muted-foreground">WINPCT</TableHead>
              <TableHead className="text-muted-foreground">RANKING</TableHead>
              <TableHead className="text-muted-foreground">
                PRIZEMONEY
              </TableHead>
              <TableHead className="text-muted-foreground">
                BREAKPTSWON
              </TableHead>
              <TableHead className="text-muted-foreground">
                TIEBREAKSWON
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow className="border-border">
              <TableCell className="font-semibold text-primary">
                {stats.wins}
              </TableCell>
              <TableCell className="font-semibold text-primary">
                {stats.losses}
              </TableCell>
              <TableCell className="font-semibold text-primary">
                {stats.titles}
              </TableCell>
              <TableCell className="font-semibold text-primary">
                {stats.aces}
              </TableCell>
              <TableCell className="font-semibold text-primary">
                {stats.firstServePct}
              </TableCell>
              <TableCell className="font-semibold text-primary">
                {stats.winPct}
              </TableCell>
              <TableCell className="font-semibold text-primary">
                {stats.ranking}
              </TableCell>
              <TableCell className="font-semibold text-primary">
                {stats.prizeMoney.toLocaleString()}
              </TableCell>
              <TableCell className="font-semibold text-primary">
                {stats.breakPtsWon}
              </TableCell>
              <TableCell className="font-semibold text-primary">
                {stats.tieBreaksWon}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </CardContent>
  </Card>
);

export default TennisSeasonStats;
