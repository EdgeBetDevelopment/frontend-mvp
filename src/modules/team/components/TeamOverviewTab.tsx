import {
  AlertTriangle,
  Calendar,
  ChevronRight,
  TrendingUp,
  Trophy,
} from 'lucide-react';

import { ITeam, Injury } from '@/modules/team/types';
import { Badge } from '@/shared/components/badge';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/shared/components/card';

interface TeamOverviewTabProps {
  team: ITeam;
  onGameClick: (gameId: number) => void;
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

export const TeamOverviewTab = ({
  team,
  onGameClick,
}: TeamOverviewTabProps) => (
  <>
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      {/* Team Info */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-primary" />
            Team Info
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {[
            { label: 'Founded', value: team.year_founded },
            { label: 'Arena', value: team.arena },
            { label: 'Capacity', value: team.arena_capacity?.toLocaleString() },
            { label: 'Coach', value: team.head_coach },
            { label: 'GM', value: team.general_manager },
            { label: 'Owner', value: team.owner },
          ].map(({ label, value }) => (
            <div key={label} className="flex justify-between">
              <span className="text-muted-foreground">{label}</span>
              <span>{value}</span>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Injury Report */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-yellow-400" />
            Injury Report
          </CardTitle>
        </CardHeader>
        <CardContent>
          {team.injuries && team.injuries.length > 0 ? (
            <div className="space-y-4">
              {team.injuries.map((injury: Injury, index: number) => (
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

      {/* Upcoming Games */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-primary" />
            Upcoming Games
          </CardTitle>
        </CardHeader>
        <CardContent>
          {team.upcoming_games && team.upcoming_games.length > 0 ? (
            <div className="space-y-4">
              {team.upcoming_games.slice(0, 3).map((game) => (
                <div
                  key={game.game_id}
                  className="flex items-center justify-between rounded-lg bg-muted/30 p-3"
                >
                  <div>
                    <div className="font-medium">
                      {game.home_team_id === team.id ? 'vs' : '@'}{' '}
                      {game.opponent}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {new Date(game.date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </div>
                  </div>
                  <Badge variant="outline">
                    {game.home_team_id === team.id ? 'Home' : 'Away'}
                  </Badge>
                </div>
              ))}
            </div>
          ) : (
            <p className="py-4 text-center text-muted-foreground">
              No upcoming games
            </p>
          )}
        </CardContent>
      </Card>
    </div>

    {/* Recent Results */}
    <Card className="border-border bg-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-primary" />
          Recent Results
        </CardTitle>
      </CardHeader>
      <CardContent>
        {team.recent_games && team.recent_games.length > 0 ? (
          <div className="flex flex-wrap gap-4">
            {team.recent_games.map((game) => {
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
                        {game.home_team_id === team.id ? 'vs' : '@'}{' '}
                        {game.opponent}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {game.final_score}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => onGameClick(game.game_id)}
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
  </>
);
