import { TrendingUp, ChevronRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardContent } from '@/ui/card';
import { ROUTES } from '@/routes';
import { Game } from '../types';

interface RecentResultsProps {
  games?: Game[];
  teamId: number;
}

export const RecentResults = ({ games, teamId }: RecentResultsProps) => {
  const router = useRouter();

  return (
    <Card className="border-border bg-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-primary" />
          Recent Results
        </CardTitle>
      </CardHeader>
      <CardContent>
        {games && games.length > 0 ? (
          <div className="flex flex-wrap gap-4">
            {games.map((game) => {
              const isWin = game.result === 'W';
              return (
                <div
                  key={game.game_id}
                  className={`flex min-w-[180px] flex-col rounded-lg border p-4 ${
                    isWin
                      ? 'border-emerald-500/30 bg-emerald-500/10'
                      : 'border-red-500/30 bg-red-500/10'
                  }`}
                >
                  <div className="mb-2 text-xs text-muted-foreground">
                    {new Date(game.date).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                    })}
                  </div>
                  <div className="flex flex-1 items-center gap-3">
                    <div
                      className={`text-2xl font-bold ${
                        isWin ? 'text-emerald-400' : 'text-red-400'
                      }`}
                    >
                      {game.result}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">
                        {game.home_team_id === teamId ? 'vs' : '@'}{' '}
                        {game.opponent}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {game.final_score}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => router.push(ROUTES.GAME(game.game_id))}
                    className="mt-3 flex items-center gap-1 text-xs font-medium text-primary transition-colors hover:underline"
                  >
                    View Game Breakdown
                    <ChevronRight className="h-3 w-3" />
                  </button>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="py-4 text-center text-muted-foreground">
            No recent games
          </p>
        )}
      </CardContent>
    </Card>
  );
};
