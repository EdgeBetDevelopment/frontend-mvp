import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { ITeam } from '@/modules/team/types';
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

interface TeamStatsTabProps {
  team: ITeam;
}

export const TeamStatsTab = ({ team }: TeamStatsTabProps) => {
  const stats = team.team_statistics;
  const gp = stats?.GP || 1;

  const chartData = [
    {
      name: 'PPG',
      value: parseFloat(((stats?.PTS || 0) / gp).toFixed(1)),
      color: 'hsl(var(--chart-1))',
    },
    {
      name: 'RPG',
      value: parseFloat(((stats?.REB || 0) / gp).toFixed(1)),
      color: 'hsl(var(--chart-3))',
    },
    {
      name: 'APG',
      value: parseFloat(((stats?.AST || 0) / gp).toFixed(1)),
      color: 'hsl(var(--chart-4))',
    },
    {
      name: 'FG%',
      value: parseFloat(((stats?.FG_PCT || 0) * 100).toFixed(1)),
      color: 'hsl(var(--chart-5))',
    },
    {
      name: '3P%',
      value: parseFloat(((stats?.FG3_PCT || 0) * 100).toFixed(1)),
      color: 'hsl(var(--chart-1))',
    },
    {
      name: 'FT%',
      value: parseFloat(((stats?.FT_PCT || 0) * 100).toFixed(1)),
      color: 'hsl(var(--chart-2))',
    },
  ];

  return (
    <>
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle>Team Overview</CardTitle>
          <p className="text-sm text-muted-foreground">Full season summary</p>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="hsl(var(--border))"
                />
                <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                  }}
                />
                <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle>Detailed Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Team</TableHead>
                  <TableHead>GP</TableHead>
                  <TableHead>W</TableHead>
                  <TableHead>L</TableHead>
                  <TableHead>PPG</TableHead>
                  <TableHead>OPPG</TableHead>
                  <TableHead>RPG</TableHead>
                  <TableHead>APG</TableHead>
                  <TableHead>FG%</TableHead>
                  <TableHead>3P%</TableHead>
                  <TableHead>FT%</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">
                    {team.abbreviation}
                  </TableCell>
                  <TableCell>{stats?.GP}</TableCell>
                  <TableCell className="text-emerald-400">{stats?.W}</TableCell>
                  <TableCell className="text-red-400">{stats?.L}</TableCell>
                  <TableCell>{((stats?.PTS || 0) / gp).toFixed(1)}</TableCell>
                  <TableCell>
                    {team.league_standings?.OppPointsPG.toFixed(1)}
                  </TableCell>
                  <TableCell>{((stats?.REB || 0) / gp).toFixed(1)}</TableCell>
                  <TableCell>{((stats?.AST || 0) / gp).toFixed(1)}</TableCell>
                  <TableCell>
                    {((stats?.FG_PCT || 0) * 100).toFixed(1)}%
                  </TableCell>
                  <TableCell>
                    {((stats?.FG3_PCT || 0) * 100).toFixed(1)}%
                  </TableCell>
                  <TableCell>
                    {((stats?.FT_PCT || 0) * 100).toFixed(1)}%
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </>
  );
};
