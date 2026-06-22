import { TrendingUp } from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/shared/components/card';

import type { TennisCareerSeason } from '../../data/tennisPlayers';

interface Props {
  data: TennisCareerSeason[];
}

const TennisCareerChart = ({ data }: Props) => (
  <Card className="mb-8 border-border bg-card">
    <CardHeader>
      <div className="flex items-center gap-2">
        <TrendingUp className="h-5 w-5 text-primary" />
        <div>
          <CardTitle className="text-lg font-semibold text-foreground">
            Career Progression
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Wins, losses and titles per season (singles)
          </CardDescription>
        </div>
      </div>
    </CardHeader>
    <CardContent>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis dataKey="year" stroke="#9CA3AF" style={{ fontSize: '12px' }} />
          <YAxis stroke="#9CA3AF" style={{ fontSize: '12px' }} />
          <Tooltip
            contentStyle={{
              backgroundColor: '#1F2937',
              border: '1px solid #374151',
              borderRadius: '8px',
            }}
            labelStyle={{ color: '#F3F4F6' }}
          />
          <Legend wrapperStyle={{ fontSize: '12px' }} />
          <Line
            type="monotone"
            dataKey="wins"
            stroke="hsl(145, 70%, 50%)"
            strokeWidth={2}
            name="Wins"
            dot={{ r: 4 }}
          />
          <Line
            type="monotone"
            dataKey="titles"
            stroke="hsl(45, 90%, 55%)"
            strokeWidth={2}
            name="Titles"
            dot={{ r: 4 }}
          />
          <Line
            type="monotone"
            dataKey="aces"
            stroke="hsl(0, 70%, 55%)"
            strokeWidth={2}
            name="Losses"
            dot={{ r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </CardContent>
  </Card>
);

export default TennisCareerChart;
