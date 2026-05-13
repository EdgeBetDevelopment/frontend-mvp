import { ITeam } from '@/modules/team/types';
import { Card, CardContent } from '@/shared/components/card';

interface TeamStatCardsProps {
  overall_stats: ITeam['overall_stats'];
}

export const TeamStatCards = ({ overall_stats }: TeamStatCardsProps) => {
  const gp = overall_stats?.GP || 1;

  const stats = [
    { label: 'PPG', value: ((overall_stats?.PTS || 0) / gp).toFixed(1) },
    { label: 'RPG', value: ((overall_stats?.REB || 0) / gp).toFixed(1) },
    { label: 'APG', value: ((overall_stats?.AST || 0) / gp).toFixed(1) },
    {
      label: 'FG%',
      value: `${((overall_stats?.FG_PCT || 0) * 100).toFixed(1)}%`,
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
      {stats.map(({ label, value }) => (
        <Card key={label} className="border-border bg-card/50">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">{value}</div>
            <div className="text-sm text-muted-foreground">{label}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
