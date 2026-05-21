import { AlertTriangle, ChevronRight, Shield } from 'lucide-react';

import { Card } from '@/shared/components/card';

interface IAnalysisTabContentProps {
  overview: string[];
  homeTeamName: string;
  awayTeamName: string;
  homeInjuries: string;
  awayInjuries: string;
  homeKeyStrengths: string[];
  awayKeyStrengths: string[];
  riskFactors: string[];
}

const AnalysisTabContent = ({
  overview,
  homeTeamName,
  awayTeamName,
  homeInjuries,
  awayInjuries,
  homeKeyStrengths,
  awayKeyStrengths,
  riskFactors,
}: IAnalysisTabContentProps) => {
  return (
    <div className="space-y-4">
      {overview.length > 0 && (
        <Card className="overflow-hidden p-4">
          <h3 className="mb-3 flex items-center gap-2 font-semibold">
            <Shield className="h-4 w-4 shrink-0 text-primary" />
            Game Overview
          </h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {overview.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span className="break-words">{item}</span>
              </li>
            ))}
          </ul>
        </Card>
      )}

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="overflow-hidden border-l-4 border-l-primary p-4">
          <h3 className="mb-3 break-words font-semibold">
            {homeTeamName} Analysis
          </h3>
          <div className="space-y-3">
            <div>
              <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Injuries
              </span>
              <p className="mt-1 break-words text-sm">
                {homeInjuries || 'No injuries reported'}
              </p>
            </div>
            <div>
              <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Key Strengths
              </span>
              <ul className="mt-1 space-y-1">
                {homeKeyStrengths.map((s, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm">
                    <span className="shrink-0 text-primary">•</span>
                    <span className="break-words">{s}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Card>

        <Card className="overflow-hidden border-l-4 border-l-secondary p-4">
          <h3 className="mb-3 break-words font-semibold">
            {awayTeamName} Analysis
          </h3>
          <div className="space-y-3">
            <div>
              <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Injuries
              </span>
              <p className="mt-1 break-words text-sm">
                {awayInjuries || 'No injuries reported'}
              </p>
            </div>
            <div>
              <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Key Strengths
              </span>
              <ul className="mt-1 space-y-1">
                {awayKeyStrengths.map((s, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm">
                    <span className="shrink-0 text-secondary-foreground">
                      •
                    </span>
                    <span className="break-words">{s}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Card>
      </div>

      {riskFactors.length > 0 && (
        <Card className="overflow-hidden border-destructive/20 bg-destructive/5 p-4">
          <h3 className="mb-3 flex items-center gap-2 font-semibold text-destructive">
            <AlertTriangle className="h-4 w-4 shrink-0" />
            Risk Factors
          </h3>
          <ul className="space-y-2">
            {riskFactors.map((risk, idx) => (
              <li key={idx} className="flex items-start gap-2 text-sm">
                <span className="shrink-0 text-destructive">⚠</span>
                <span className="break-words">{risk}</span>
              </li>
            ))}
          </ul>
        </Card>
      )}
    </div>
  );
};

export default AnalysisTabContent;
