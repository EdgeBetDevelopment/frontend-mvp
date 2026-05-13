import { ChevronRight } from 'lucide-react';

import { ITeam } from '@/modules/team/types';
import { Badge } from '@/shared/components/badge';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/shared/components/card';

interface TeamScheduleTabProps {
  team: ITeam;
  onGameClick: (gameId: number) => void;
}

export const TeamScheduleTab = ({
  team,
  onGameClick,
}: TeamScheduleTabProps) => (
  <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
    <Card className="border-border bg-card">
      <CardHeader>
        <CardTitle>Upcoming Games</CardTitle>
      </CardHeader>
      <CardContent>
        {team.upcoming_games && team.upcoming_games.length > 0 ? (
          <div className="space-y-3">
            {team.upcoming_games.map((game) => (
              <div
                key={game.game_id}
                className="flex items-center justify-between rounded-lg bg-muted/30 p-4"
              >
                <div>
                  <div className="text-lg font-medium">
                    {game.home_team_id === team.id ? 'vs' : '@'} {game.opponent}
                  </div>
                  <div className="text-muted-foreground">
                    {new Date(game.date).toLocaleDateString('en-US', {
                      weekday: 'short',
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </div>
                </div>
                <Badge variant="outline" className="px-4 py-1 text-base">
                  {game.home_team_id === team.id ? 'Home' : 'Away'}
                </Badge>
              </div>
            ))}
          </div>
        ) : (
          <p className="py-4 text-center text-muted-foreground">
            No upcoming games scheduled
          </p>
        )}
      </CardContent>
    </Card>

    <Card className="border-border bg-card">
      <CardHeader>
        <CardTitle>Recent Games</CardTitle>
      </CardHeader>
      <CardContent>
        {team.recent_games && team.recent_games.length > 0 ? (
          <div className="space-y-3">
            {team.recent_games.map((game) => {
              const isWin = game.result === 'W';
              return (
                <div
                  key={game.game_id}
                  className={`flex items-center justify-between rounded-lg border p-4 ${
                    isWin
                      ? 'border-emerald-500/30 bg-emerald-500/10'
                      : 'border-red-500/30 bg-red-500/10'
                  }`}
                >
                  <div className="flex-1">
                    <div className="text-lg font-medium">
                      {game.home_team_id === team.id ? 'vs' : '@'}{' '}
                      {game.opponent}
                    </div>
                    <div className="text-muted-foreground">
                      {new Date(game.date).toLocaleDateString('en-US', {
                        weekday: 'short',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </div>
                    <button
                      onClick={() => onGameClick(game.game_id)}
                      className="mt-2 flex items-center gap-1 text-sm font-medium text-primary transition-colors hover:underline"
                    >
                      View Game Breakdown
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="text-right">
                    <div
                      className={`text-xl font-bold ${
                        isWin ? 'text-emerald-400' : 'text-red-400'
                      }`}
                    >
                      {game.result}
                    </div>
                    <div className="text-muted-foreground">
                      {game.final_score}
                    </div>
                  </div>
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
  </div>
);
