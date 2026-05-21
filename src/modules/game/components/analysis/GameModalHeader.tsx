import { Calendar, Clock } from 'lucide-react';

import { Badge } from '@/shared/components/badge';
import { DialogHeader, DialogTitle } from '@/shared/components/dialog';
import { IGame } from '@/modules/game/types';

interface IGameModalHeaderProps {
  game: IGame;
  homeTeamName: string;
  awayTeamName: string;
  gameDate: string;
  gameTime: string;
}

const GameModalHeader = ({
  game,
  homeTeamName,
  awayTeamName,
  gameDate,
  gameTime,
}: IGameModalHeaderProps) => {
  return (
    <DialogHeader className="border-b border-border bg-gradient-to-r from-card to-secondary/30 px-4 py-3 sm:px-6 sm:py-4">
      <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center sm:gap-4">
        <div className="flex w-full items-center gap-2 overflow-hidden sm:w-auto sm:gap-4">
          <div className="flex items-center gap-2 overflow-hidden sm:gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full bg-primary/20 sm:h-10 sm:w-10">
              {game.home_team_logo ? (
                <img
                  src={game.home_team_logo}
                  alt={homeTeamName}
                  className="h-6 w-6 object-contain sm:h-8 sm:w-8"
                />
              ) : (
                <span className="text-base font-bold text-primary sm:text-lg">
                  {homeTeamName.charAt(0)}
                </span>
              )}
            </div>
            <DialogTitle className="min-w-0 truncate font-display text-base sm:text-lg md:text-xl">
              <span className="hidden sm:inline">
                {homeTeamName}{' '}
                <span className="font-normal text-muted-foreground">vs</span>{' '}
                {awayTeamName}
              </span>
              <span className="truncate sm:hidden">
                {homeTeamName.split(' ').pop()}{' '}
                <span className="font-normal text-muted-foreground">vs</span>{' '}
                {awayTeamName.split(' ').pop()}
              </span>
            </DialogTitle>
            <div className="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full bg-primary/20 sm:h-10 sm:w-10">
              {game.away_team_logo ? (
                <img
                  src={game.away_team_logo}
                  alt={awayTeamName}
                  className="h-6 w-6 object-contain sm:h-8 sm:w-8"
                />
              ) : (
                <span className="text-base font-bold text-primary sm:text-lg">
                  {awayTeamName.charAt(0)}
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground sm:gap-4 sm:text-sm">
          <span className="flex items-center gap-1 sm:gap-1.5">
            <Calendar className="h-4 w-4" />
            {gameDate}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="h-4 w-4" />
            {gameTime}
          </span>
          <Badge
            variant="outline"
            className="border-primary/30 bg-primary/10 text-primary"
          >
            {game.status === 'scheduled' ? 'Scheduled' : game.status}
          </Badge>
        </div>
      </div>
    </DialogHeader>
  );
};

export default GameModalHeader;
