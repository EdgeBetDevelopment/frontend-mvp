import { Badge } from '@/shared/components/badge';
import { Card } from '@/shared/components/card';
import { IBet } from '@/modules/game/types';

interface IBettingPicksTabContentProps {
  valueBets: IBet[];
  conservativeBets: IBet[];
}

const BettingPicksTabContent = ({
  valueBets,
  conservativeBets,
}: IBettingPicksTabContentProps) => {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div>
        <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold">
          <div className="h-2 w-2 rounded-full bg-emerald-500" />
          Top 3 Value Bets
        </h3>
        <div className="space-y-3">
          {valueBets && valueBets.length > 0 ? (
            valueBets.slice(0, 3).map((bet, idx) => {
              const betType = bet.market_type
                .replace(/_/g, ' ')
                .replace(/\b\w/g, (l) => l.toUpperCase());

              return (
                <Card
                  key={idx}
                  className="cursor-pointer overflow-hidden border-emerald-500/30 bg-emerald-500/10 p-4 transition-colors hover:border-emerald-500/50"
                >
                  <div className="mb-2 flex items-center justify-between gap-2">
                    <Badge
                      variant="outline"
                      className="truncate border-emerald-500/30 bg-emerald-500/20 text-xs text-emerald-400"
                    >
                      {betType}
                    </Badge>
                    <span className="shrink-0 font-mono font-bold text-emerald-400">
                      {bet.bet_coefficient > 0 ? '+' : ''}
                      {bet.bet_coefficient}
                    </span>
                  </div>
                  <p className="mb-2 break-words font-semibold">
                    {bet.bet_name}
                  </p>
                  <p className="break-words text-sm text-muted-foreground">
                    {bet.bet_description}
                  </p>
                </Card>
              );
            })
          ) : (
            <p className="text-sm text-muted-foreground">
              No value bets available
            </p>
          )}
        </div>
      </div>

      <div>
        <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold">
          <div className="h-2 w-2 rounded-full bg-amber-500" />
          Top 3 Conservative Bets
        </h3>
        <div className="space-y-3">
          {conservativeBets && conservativeBets.length > 0 ? (
            conservativeBets.slice(0, 3).map((bet, idx) => {
              const betType = bet.market_type
                .replace(/_/g, ' ')
                .replace(/\b\w/g, (l) => l.toUpperCase());

              return (
                <Card
                  key={idx}
                  className="cursor-pointer overflow-hidden border-amber-500/30 bg-amber-500/10 p-4 transition-colors hover:border-amber-500/50"
                >
                  <div className="mb-2 flex items-center justify-between gap-2">
                    <Badge
                      variant="outline"
                      className="truncate border-amber-500/30 bg-amber-500/20 text-xs text-amber-400"
                    >
                      {betType}
                    </Badge>
                    <span className="shrink-0 font-mono font-bold text-amber-400">
                      {bet.bet_coefficient > 0 ? '+' : ''}
                      {bet.bet_coefficient}
                    </span>
                  </div>
                  <p className="mb-2 break-words font-semibold">
                    {bet.bet_name}
                  </p>
                  <p className="break-words text-sm text-muted-foreground">
                    {bet.bet_description}
                  </p>
                </Card>
              );
            })
          ) : (
            <p className="text-sm text-muted-foreground">
              No conservative bets available
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BettingPicksTabContent;
