import { Trophy } from 'lucide-react';

import { Avatar, AvatarFallback } from '@/shared/components/avatar';
import { Badge } from '@/shared/components/badge';

import type { TennisPlayer } from '../../data/tennisPlayers';

interface Props {
  player: TennisPlayer;
}

const InfoTile = ({ value, label }: { value: string; label: string }) => (
  <div className="rounded-lg border border-primary/30 bg-primary/10 p-3 text-center">
    <span className="text-sm font-semibold text-primary">{value}</span>
    <p className="mt-1 text-xs text-muted-foreground">{label}</p>
  </div>
);

const TennisPlayerHeader = ({ player }: Props) => {
  const initials = player.name
    .split(' ')
    .map((n) => n[0])
    .join('');

  return (
    <div className="flex flex-col items-center gap-6 lg:items-start">
      <Avatar className="h-32 w-32 border-4 border-primary/30 shadow-lg">
        <AvatarFallback className="bg-primary/10 text-4xl font-bold text-primary">
          {initials}
        </AvatarFallback>
      </Avatar>

      <div className="text-center lg:text-left">
        <h1 className="mb-1 font-display text-3xl font-bold text-foreground lg:text-4xl">
          {player.name}
        </h1>
        <p className="mb-3 text-lg text-muted-foreground">{player.country}</p>
        <Badge variant="outline" className="border-primary text-primary">
          Tennis
        </Badge>
      </div>

      <div className="grid w-full max-w-md grid-cols-3 gap-3">
        <InfoTile value={player.position} label="Position" />
        <InfoTile value={player.birthday} label="Birthday" />
        <InfoTile value={player.height} label="Height" />
        <InfoTile value={player.weight} label="Weight" />
        <InfoTile value={player.experience} label="Experience" />
      </div>

      <div className="flex flex-wrap gap-2">
        {player.achievements.map((a, i) => (
          <Badge key={i} className="border-0 bg-primary/20 text-primary">
            <Trophy className="mr-1 h-3 w-3" />
            {a.label}
          </Badge>
        ))}
      </div>
    </div>
  );
};

export default TennisPlayerHeader;
