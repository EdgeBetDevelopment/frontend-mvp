import { AlertTriangle } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/ui/card';
import { Badge } from '@/ui/badge';
import { Injury } from '../types';

interface InjuryReportProps {
  injuries?: Injury[];
}

const getStatusBadge = (status: string) => {
  switch (status?.toLowerCase()) {
    case 'out':
      return (
        <Badge
          variant="outline"
          className="border-red-500/30 bg-red-500/10 text-red-400"
        >
          Out
        </Badge>
      );
    case 'questionable':
      return (
        <Badge
          variant="outline"
          className="border-yellow-500/30 bg-yellow-500/10 text-yellow-400"
        >
          Questionable
        </Badge>
      );
    case 'day-to-day':
      return (
        <Badge
          variant="outline"
          className="border-orange-500/30 bg-orange-500/10 text-orange-400"
        >
          Day-to-Day
        </Badge>
      );
    default:
      return (
        <Badge
          variant="outline"
          className="border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
        >
          Active
        </Badge>
      );
  }
};

export const InjuryReport = ({ injuries }: InjuryReportProps) => {
  return (
    <Card className="border-border bg-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-yellow-400" />
          Injury Report
        </CardTitle>
      </CardHeader>
      <CardContent>
        {injuries && injuries.length > 0 ? (
          <div className="space-y-4">
            {injuries.map((injury, index) => (
              <div key={index} className="flex items-center justify-between">
                <div>
                  <div className="font-medium">{injury.player}</div>
                  <div className="text-sm text-muted-foreground">
                    {injury.position}
                    {injury.return_date && ` • Return: ${injury.return_date}`}
                  </div>
                </div>
                {getStatusBadge(injury.status)}
              </div>
            ))}
          </div>
        ) : (
          <p className="py-4 text-center text-muted-foreground">
            No injuries reported
          </p>
        )}
      </CardContent>
    </Card>
  );
};
