import { Card } from '@/shared/components/card';

interface BetTrackerStatsProps {
  record: string;
  winRate: string;
  netProfit: number;
}

export const BetTrackerStats = ({
  record,
  winRate,
  netProfit,
}: BetTrackerStatsProps) => {
  return (
    <div className="mb-8 grid grid-cols-3 gap-4">
      <Card className="border-border bg-card p-4 text-center">
        <p className="mb-1 text-sm text-muted-foreground">Record</p>
        <p className="text-2xl font-bold text-foreground">{record}</p>
      </Card>
      <Card className="border-border bg-card p-4 text-center">
        <p className="mb-1 text-sm text-muted-foreground">Win Rate</p>
        <p className="text-2xl font-bold text-foreground">{winRate}%</p>
      </Card>
      <Card className="border-border bg-card p-4 text-center">
        <p className="mb-1 text-sm text-muted-foreground">Net Profit</p>
        <p
          className={`text-2xl font-bold ${netProfit >= 0 ? 'text-green-500' : 'text-red-500'}`}
        >
          {netProfit >= 0 ? '+' : ''}${netProfit.toFixed(2)}
        </p>
      </Card>
    </div>
  );
};
