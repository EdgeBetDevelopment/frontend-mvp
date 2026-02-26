import { Calendar } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/ui/card';
import { Badge } from '@/ui/badge';
import { Game } from '../types';

interface UpcomingGamesProps {
  games?: Game[];
  teamId: number;
}

export const UpcomingGames = ({ games, teamId }: UpcomingGamesProps) => {
  return (
    <Card className="border-border bg-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-primary" />
          Upcoming Games
        </CardTitle>
      </CardHeader>
      <CardContent>
        {games && games.length > 0 ? (
          <div className="space-y-4">
            {games.slice(0, 3).map((game) => (
              <div
                key={game.game_id}
                className="flex items-center justify-between rounded-lg bg-muted/30 p-3"
              >
                <div>
                  <div className="font-medium">
                    {game.home_team_id === teamId ? 'vs' : '@'} {game.opponent}
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
                  {game.home_team_id === teamId ? 'Home' : 'Away'}
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
  );
};
