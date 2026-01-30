import { Card, CardContent } from '@/components/ui/card';

import { moderators } from '../data';

export const ModeratorStats = () => (
  <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-3">
    {Object.values(moderators).map((mod) => (
      <Card key={mod.name} className="border-border/50 bg-card/30">
        <CardContent className="py-4">
          <div className="flex items-center gap-3">
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br ${mod.color} font-bold text-white`}
            >
              {mod.avatar}
            </div>
            <div className="flex-1">
              <p className="font-medium text-foreground">{mod.name}</p>
              <p className="text-sm text-muted-foreground">{mod.record}</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-lg font-bold text-emerald-400">
                  {mod.winRate}%
                </p>
                <p className="text-xs text-muted-foreground">Win Rate</p>
              </div>
              <div className="border-l border-border/50 pl-4 text-right">
                <p
                  className={`text-lg font-bold ${
                    mod.unitPL >= 0 ? 'text-emerald-400' : 'text-red-400'
                  }`}
                >
                  {mod.unitPL >= 0 ? '+' : ''}
                  {mod.unitPL}u
                </p>
                <p className="text-xs text-muted-foreground">YTD P/L</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    ))}
  </div>
);
