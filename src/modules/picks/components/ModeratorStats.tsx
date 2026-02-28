'use client';

import { useQuery } from '@tanstack/react-query';

import { Card, CardContent } from '@/shared/components/card';
import { picksApi } from '@/modules/picks';

type PickOfDayUserStats = {
  username: string;
  wins: number;
  losses: number;
  win_rate: number;
  ytd: number;
};

const gradientColors = [
  'from-amber-500 to-orange-600',
  'from-emerald-500 to-teal-600',
  'from-violet-500 to-purple-600',
  'from-sky-500 to-indigo-600',
  'from-rose-500 to-pink-600',
  'from-lime-500 to-green-600',
];

const formatWinRate = (value: number) => {
  if (!Number.isFinite(value)) return '0.0';
  const normalized = value <= 1 ? value * 100 : value;
  return normalized.toFixed(1);
};

const formatYtd = (value: number) => {
  if (!Number.isFinite(value)) return '0.0';
  return value.toFixed(1);
};

export const ModeratorStats = () => {
  const {
    data: users = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['pick-of-day', 'users'],
    queryFn: () => picksApi.getPickOfTheDayUsers(),
    retry: false,
  });

  if (isError && error) {
    const err = error as any;
    if (err?.code === 401 || err?.code === 402) {
      return null;
    }
  }

  if (isLoading) {
    return (
      <div className="mb-8 text-center text-muted-foreground">Loading...</div>
    );
  }

  if (isError) {
    return null;
  }

  if (users.length === 0) {
    return (
      <div className="mb-8 text-center text-muted-foreground">
        No moderator stats yet.
      </div>
    );
  }

  return (
    <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-3">
      {users.map((user: PickOfDayUserStats, index) => {
        const winRate = formatWinRate(user.win_rate);
        const ytd = formatYtd(user.ytd);
        const record = `${user.wins}-${user.losses}`;
        const color = gradientColors[index % gradientColors.length];
        const avatar = user.username?.trim()?.charAt(0)?.toUpperCase() || '?';

        return (
          <Card
            key={user.username || index}
            className="border-border/50 bg-card/30"
          >
            <CardContent className="py-4">
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br ${color} font-bold text-white`}
                >
                  {avatar}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-foreground">
                    {user.username || 'Unknown'}
                  </p>
                  <p className="text-sm text-muted-foreground">{record}</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-lg font-bold text-emerald-400">
                      {winRate}%
                    </p>
                    <p className="text-xs text-muted-foreground">Win Rate</p>
                  </div>
                  <div className="border-l border-border/50 pl-4 text-right">
                    <p
                      className={`text-lg font-bold ${
                        user.ytd >= 0 ? 'text-emerald-400' : 'text-red-400'
                      }`}
                    >
                      {user.ytd >= 0 ? '+' : ''}
                      {ytd}u
                    </p>
                    <p className="text-xs text-muted-foreground">YTD P/L</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};
