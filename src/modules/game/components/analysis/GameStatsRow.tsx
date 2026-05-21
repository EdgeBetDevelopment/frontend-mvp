import { Activity, Target } from 'lucide-react';

import { Card } from '@/shared/components/card';

interface IGameStatsRowProps {
  predictedWinnerName: string | undefined;
  homeTeamName: string;
  awayTeamName: string;
  homeWinProb: number;
  awayWinProb: number;
}

const GameStatsRow = ({
  predictedWinnerName,
  homeTeamName,
  awayTeamName,
  homeWinProb,
  awayWinProb,
}: IGameStatsRowProps) => {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 md:grid-cols-3">
      <Card className="overflow-hidden border-primary/20 bg-gradient-to-br from-primary/10 to-primary/5 p-4">
        <div className="mb-2 flex items-center gap-2">
          <Target className="h-4 w-4 shrink-0 text-primary" />
          <span className="text-sm font-medium text-muted-foreground">
            Predicted Winner
          </span>
        </div>
        <p className="break-words font-display text-xl font-bold text-primary sm:text-2xl">
          {predictedWinnerName || 'N/A'}
        </p>
      </Card>
      <Card className="overflow-hidden border-border bg-card p-4">
        <div className="mb-2 flex items-center gap-2">
          <Activity className="h-4 w-4 shrink-0 text-muted-foreground" />
          <span className="truncate text-sm font-medium text-muted-foreground">
            {homeTeamName}
          </span>
        </div>
        <p className="text-xl font-semibold">{homeWinProb.toFixed(1)}%</p>
        <p className="text-sm text-primary">Win Probability</p>
      </Card>
      <Card className="overflow-hidden border-border bg-card p-4">
        <div className="mb-2 flex items-center gap-2">
          <Activity className="h-4 w-4 shrink-0 text-muted-foreground" />
          <span className="truncate text-sm font-medium text-muted-foreground">
            {awayTeamName}
          </span>
        </div>
        <p className="text-xl font-semibold">{awayWinProb.toFixed(1)}%</p>
        <p className="text-sm text-primary">Win Probability</p>
      </Card>
    </div>
  );
};

export default GameStatsRow;
