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

const EMPTY = '—';

/**
 * A cell that keeps `null` visible as an em dash — the same rule the Surface
 * column follows. `0` still renders as 0, because for wins/losses/titles a
 * zero is a real result.
 */
const StatCell = ({ value }: { value: number | string | null }) => (
  <TableCell
    className={
      value === null || value === ''
        ? 'font-semibold text-muted-foreground'
        : 'font-semibold text-primary'
    }
  >
    {value === null || value === '' ? EMPTY : value}
  </TableCell>
);

const TennisSeasonStats = ({ stats, year }: Props) => (
  <Card className="mb-8 border-border bg-card">
    <CardHeader>
      <CardTitle className="text-lg font-semibold text-foreground">
        {stats.season ?? year} Season Stats (YTD)
      </CardTitle>
      {/* The career chart counts every level (ITF included), this block only
          tour-level main draws — say so, or the two panels look contradictory. */}
      <p className="text-xs text-muted-foreground">
        ATP/WTA tour-level main draw, year to date
      </p>
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
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow className="border-border">
              <StatCell value={stats.wins} />
              <StatCell value={stats.losses} />
              <StatCell value={stats.titles} />
              <StatCell value={stats.aces} />
              <StatCell value={stats.firstServePct} />
              <StatCell value={stats.winPct} />
              <StatCell value={stats.ranking} />
              {/* Pre-formatted by the API ('$2,451') — rendered verbatim. */}
              <StatCell value={stats.prizeMoney} />
              <StatCell value={stats.breakPtsWon} />
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </CardContent>
  </Card>
);

export default TennisSeasonStats;
