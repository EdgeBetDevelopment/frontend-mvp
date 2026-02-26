import { Card, CardContent } from '@/ui/card';
import { TeamStatistics } from '../types';

interface TeamStatsCardsProps {
  stats: TeamStatistics;
}

export const TeamStatsCards = ({ stats }: TeamStatsCardsProps) => {
  const gp = stats?.GP || 1;

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
      <Card className="border-border bg-card/50">
        <CardContent className="p-4 text-center">
          <div className="text-2xl font-bold text-primary">
            {((stats?.PTS || 0) / gp).toFixed(1)}
          </div>
          <div className="text-sm text-muted-foreground">PPG</div>
        </CardContent>
      </Card>
      <Card className="border-border bg-card/50">
        <CardContent className="p-4 text-center">
          <div className="text-2xl font-bold text-primary">
            {((stats?.REB || 0) / gp).toFixed(1)}
          </div>
          <div className="text-sm text-muted-foreground">RPG</div>
        </CardContent>
      </Card>
      <Card className="border-border bg-card/50">
        <CardContent className="p-4 text-center">
          <div className="text-2xl font-bold text-primary">
            {((stats?.AST || 0) / gp).toFixed(1)}
          </div>
          <div className="text-sm text-muted-foreground">APG</div>
        </CardContent>
      </Card>
      <Card className="border-border bg-card/50">
        <CardContent className="p-4 text-center">
          <div className="text-2xl font-bold text-primary">
            {((stats?.FG_PCT || 0) * 100).toFixed(1)}%
          </div>
          <div className="text-sm text-muted-foreground">FG%</div>
        </CardContent>
      </Card>
    </div>
  );
};
