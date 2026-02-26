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
import { TeamStatistics } from '../types';
import { METRIC_DESCRIPTIONS } from '../constants';
import { generateDetailedChartData } from '../utils';

interface TeamStatsChartProps {
  stats: TeamStatistics;
}

const CustomTooltip = ({ active, payload }: any) => {
  if (!active || !payload || !payload.length) return null;

  return (
    <div className="w-[220px] rounded-md border border-border bg-[#111] px-4 py-3 text-xs shadow-md">
      {payload.map((entry: any, index: number) => {
        const metricName = entry.payload.name;
        const description = METRIC_DESCRIPTIONS[metricName] || '';
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

export const TeamStatsChart: FC<TeamStatsChartProps> = ({ stats }) => {
  if (!stats) return null;

  const chartData = generateDetailedChartData(stats);

  return (
    <div className="bg-graph-section w-full rounded-lg border border-border p-4 pb-6">
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
