'use client';

import { FC } from 'react';
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

interface PlayerStatsChartProps {
  data: any[];
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload || !payload.length) return null;

  return (
    <div className="border-border rounded-md border bg-[#111] px-4 py-3 text-xs shadow-md">
      <p className="mb-2 font-semibold text-white">Season: {label}</p>
      {payload.map((entry: any, index: number) => (
        <p key={index} className="text-[#ccc]">
          <span
            className="mr-2 inline-block h-2 w-2 rounded-full"
            style={{ backgroundColor: entry.color }}
          />
          {entry.name}:{' '}
          <span className="font-medium text-white">{entry.value}</span>
        </p>
      ))}
    </div>
  );
};

const PlayerStatsChart: FC<PlayerStatsChartProps> = ({ data }) => {
  const chartData = data
    .filter((s) => s.SEASON_ID && s.GP > 0)
    .map((s) => ({
      season: s.SEASON_ID,
      PTS: +(s.PTS / s.GP).toFixed(1),
      AST: +(s.AST / s.GP).toFixed(1),
      REB: +(s.REB / s.GP).toFixed(1),
      FG3M: +(s.FG3M / s.GP).toFixed(1),
      MIN: +(s.MIN / s.GP).toFixed(1),
    }));

  return (
    <div className="bg-graph-section w-full rounded-lg p-4 pb-6">
      <h3 className="text-lg font-semibold text-white">Performance Trend</h3>
      <p className="mb-4 text-xs text-[#aaa]">Per-game averages per season</p>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#444" />
          <XAxis dataKey="season" stroke="#999" />
          <YAxis stroke="#999" />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Line
            type="monotone"
            dataKey="PTS"
            stroke="#84FDF7"
            strokeWidth={2}
            name="Points"
          />
          <Line
            type="monotone"
            dataKey="AST"
            stroke="#4F46E5"
            strokeWidth={2}
            name="Assists"
          />
          <Line
            type="monotone"
            dataKey="REB"
            stroke="#F59E0B"
            strokeWidth={2}
            name="Rebounds"
          />
          <Line
            type="monotone"
            dataKey="FG3M"
            stroke="#10B981"
            strokeWidth={2}
            name="3PT Made"
          />
          <Line
            type="monotone"
            dataKey="MIN"
            stroke="#A78BFA"
            strokeWidth={2}
            name="Minutes"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PlayerStatsChart;
