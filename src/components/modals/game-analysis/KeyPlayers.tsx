import React from 'react';

import { Avatar } from '@/ui/avatar';
import { Card } from '.';

import PlayerIcon from '@/assets/icons/player_logo.svg';

const KeyPlayers = () => {
  return (
    <div className="flex gap-5">
      <Card
        title="Key Players (Phoenix)"
        icon={<PlayerIcon className="h-4 w-4" />}
      >
        <div className="flex gap-3 overflow-x-auto pb-2">
          <KeyPlayerCard name="Kevin" position="Point Guard" score="2" />
        </div>
      </Card>

      <Card
        title="Key Players (Phoenix)"
        icon={<PlayerIcon className="h-4 w-4" />}
      >
        <div className="flex gap-3 overflow-x-auto pb-2">
          <KeyPlayerCard name="John" position="Point Guard" score="2" />
        </div>
      </Card>
    </div>
  );
};

export default KeyPlayers;

const KeyPlayerCard = ({
  name,
  position,
  score,
}: {
  name: string;
  position: string;
  score: string;
}) => {
  return (
    <div className="flex min-w-[120px] flex-col items-center gap-2 rounded-xl p-3">
      <Avatar className="flex h-12 w-12 items-center justify-center rounded-full border bg-[#33758780]">
        <div className="text-lg font-bold text-white">
          {name
            .split(' ')
            .map((n) => n[0])
            .join('')}
        </div>
      </Avatar>

      <div className="text-center">
        <p className="text-text-primary text-sm font-medium">{name}</p>
        <p className="text-xs text-gray-400">{position}</p>
        <p className="text-sm font-bold text-white">{score}</p>
      </div>
    </div>
  );
};
