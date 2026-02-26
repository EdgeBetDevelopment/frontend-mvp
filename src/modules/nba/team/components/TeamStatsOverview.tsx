'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from '@/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/ui/table';
import { ITeam } from '../types';
import { generateOverviewChartData } from '../utils';

interface TeamStatsOverviewProps {
  team: ITeam;
}

export const TeamStatsOverview = ({ team }: TeamStatsOverviewProps) => {
  const gp = team.team_statistics?.GP || 1;
  const chartData = generateOverviewChartData(team, gp);

  return (
    <div className="space-y-6">
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
                  <TableCell>{team.team_statistics?.GP}</TableCell>
                  <TableCell className="text-emerald-400">
                    {team.team_statistics?.W}
                  </TableCell>
                  <TableCell className="text-red-400">
                    {team.team_statistics?.L}
                  </TableCell>
                  <TableCell>
                    {(
                      (team.team_statistics?.PTS || 0) /
                      (team.team_statistics?.GP || 1)
                    ).toFixed(1)}
                  </TableCell>
                  <TableCell>
                    {team.league_standings?.OppPointsPG.toFixed(1)}
                  </TableCell>
                  <TableCell>
                    {(
                      (team.team_statistics?.REB || 0) /
                      (team.team_statistics?.GP || 1)
                    ).toFixed(1)}
                  </TableCell>
                  <TableCell>
                    {(
                      (team.team_statistics?.AST || 0) /
                      (team.team_statistics?.GP || 1)
                    ).toFixed(1)}
                  </TableCell>
                  <TableCell>
                    {((team.team_statistics?.FG_PCT || 0) * 100).toFixed(1)}%
                  </TableCell>
                  <TableCell>
                    {((team.team_statistics?.FG3_PCT || 0) * 100).toFixed(1)}%
                  </TableCell>
                  <TableCell>
                    {((team.team_statistics?.FT_PCT || 0) * 100).toFixed(1)}%
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
