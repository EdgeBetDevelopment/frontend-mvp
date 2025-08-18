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

type SeasonEntry = {
  SEASON_ID?: string | number;
  GP?: number | string;
  PTS?: number | string;
  AST?: number | string;
  REB?: number | string;
  FG3M?: number | string;
  MIN?: number | string;
};

interface PlayerStatsChartProps {
  data: SeasonEntry[] | Record<string, any> | null | undefined;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload || !payload.length) return null;
  return (
    <div className="border-border rounded-md border bg-[#111] px-4 py-3 text-xs shadow-md">
      <p className="mb-2 font-semibold text-white">Season: {label}</p>
      {payload.map((entry: any, i: number) => (
        <p key={i} className="text-[#ccc]">
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

const toNum = (v: any) => (v == null || v === '' ? 0 : +v);

const PlayerStatsChart: FC<PlayerStatsChartProps> = ({ data }) => {
  let chartData: Array<{
    season: string;
    PTS: number;
    AST: number;
    REB: number;
    FG3M: number;
    MIN: number;
  }> = [];

  if (Array.isArray(data)) {
    chartData = data
      .filter((s) => (s.SEASON_ID ?? s['season']) && toNum(s.GP) > 0)
      .map((s) => {
        const gp = Math.max(1, toNum(s.GP));
        return {
          season: String(s.SEASON_ID ?? s['season']),
          PTS: +(toNum(s.PTS) / gp).toFixed(1),
          AST: +(toNum(s.AST) / gp).toFixed(1),
          REB: +(toNum(s.REB) / gp).toFixed(1),
          FG3M: +(toNum(s.FG3M) / gp).toFixed(1),
          MIN: +(toNum(s.MIN) / gp).toFixed(1),
        };
      });
  } else if (data && typeof data === 'object') {
    chartData = [
      {
        season: String((data as any).SEASON_ID ?? 'Current'),
        PTS: toNum((data as any).PPG), // вже per-game
        AST: toNum((data as any).APG),
        REB: toNum((data as any).RPG),
        FG3M: toNum((data as any).FG3M ?? (data as any)['3PM'] ?? 0),
        MIN: toNum((data as any).MPG ?? (data as any).MIN ?? 0),
      },
    ];
  }

  if (!chartData.length) {
    return (
      <div className="bg-graph-section w-full rounded-lg p-4">
        <p className="text-sm text-[#aaa]">No stats available.</p>
      </div>
    );
  }

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
