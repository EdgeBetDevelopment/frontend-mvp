'use client';

import { FC } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

interface TeamStatsChartProps {
  stats: any;
}

const metricDescriptions: Record<string, string> = {
  Wins: 'Number of games won',
  Losses: 'Number of games lost',
  'FG%': 'Field Goal Percentage',
  '3PT%': 'Three Point Percentage',
  'FT%': 'Free Throw Percentage',
  'PTS (avg)': 'Average points per game',
  'REB (avg)': 'Average rebounds per game',
  'AST (avg)': 'Average assists per game',
};

const CustomTooltip = ({ active, payload }: any) => {
  if (!active || !payload || !payload.length) return null;

  return (
    <div className="border-border w-[220px] rounded-md border bg-[#111] px-4 py-3 text-xs shadow-md">
      {payload.map((entry: any, index: number) => {
        const metricName = entry.payload.name;
        const description = metricDescriptions[metricName] || '';
        return (
          <div key={index} className="">
            <div className="text-sm font-semibold text-white">
              <div
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: entry.fill }}
              />
              {metricName}:{' '}
              <span className="font-medium text-[#84FDF7]">{entry.value}</span>
              {description && <p className="text-[#999]">{description}</p>}
            </div>
          </div>
        );
      })}
    </div>
  );
};

const TeamStatsChart: FC<TeamStatsChartProps> = ({ stats }) => {
  if (!stats) return null;

  const games = stats.GP || 1;

  const chartData = [
    { name: 'Wins', value: stats.W, fill: '#34D399' },
    { name: 'Losses', value: stats.L, fill: '#DC2626' },
    { name: 'FG%', value: +(stats.FG_PCT * 100).toFixed(1), fill: '#F59E0B' },
    { name: '3PT%', value: +(stats.FG3_PCT * 100).toFixed(1), fill: '#10B981' },
    { name: 'FT%', value: +(stats.FT_PCT * 100).toFixed(1), fill: '#60A5FA' },
    {
      name: 'PTS (avg)',
      value: +(stats.PTS / games).toFixed(1),
      fill: '#84FDF7',
    },
    {
      name: 'REB (avg)',
      value: +(stats.REB / games).toFixed(1),
      fill: '#F472B6',
    },
    {
      name: 'AST (avg)',
      value: +(stats.AST / games).toFixed(1),
      fill: '#A78BFA',
    },
  ];

  return (
    <div className="bg-glass-gradient border-border w-full rounded-lg border p-4 pb-6 backdrop-blur-[20px]">
      <h3 className="mb-2 text-lg font-semibold text-white">Team Overview</h3>
      <p className="mb-4 text-xs text-[#aaa]">Full season summary</p>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#444" />
          <XAxis dataKey="name" stroke="#aaa" />
          <YAxis stroke="#aaa" />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="value" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TeamStatsChart;
