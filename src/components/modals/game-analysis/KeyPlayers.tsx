import React, { FC } from 'react';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';

import apiService from '@/services';
import { Avatar } from '@/ui/avatar';
import { Card } from '.';

import PlayerIcon from '@/assets/icons/player_logo.svg';

interface IKeyPlayersProps {
  homeTeamId?: number;
  awayTeamId?: number;
}

const KeyPlayers: FC<IKeyPlayersProps> = ({ homeTeamId, awayTeamId }) => {
  const {
    data: homeTeam,
    isLoading: isLoadingHome,
    error: errorHome,
  } = useQuery({
    queryKey: ['team', homeTeamId],
    queryFn: () =>
      homeTeamId ? apiService.getTeamById(`${homeTeamId}`) : null,
    enabled: !!homeTeamId,
    staleTime: 1000 * 60 * 5,
    retry: 2,
  });
  console.log(homeTeam);

  const {
    data: awayTeam,
    isLoading: isLoadingAway,
    error: errorAway,
  } = useQuery({
    queryKey: ['team', awayTeamId],
    queryFn: () =>
      awayTeamId ? apiService.getTeamById(`${awayTeamId}`) : null,
    enabled: !!awayTeamId,
    staleTime: 1000 * 60 * 5,
    retry: 2,
  });

  if (isLoadingAway && isLoadingHome) return <></>;

  return (
    <div className="flex gap-3.5">
      <Card
        className="max-w-[calc(50%_-_7px)]"
        title={`Key Players ${homeTeam?.nickname}`}
        icon={
          homeTeam?.logo ? (
            <Image
              height={32}
              width={32}
              src={homeTeam.logo}
              alt="Home Team Logo"
              className="object-contain"
            />
          ) : null
        }
      >
        <div className="flex gap-3 overflow-x-auto pb-2">
          {' '}
          {homeTeam?.player_statistics.map((item) => {
            return (
              <KeyPlayerCard
                key={item.PLAYER_ID}
                name={item.PLAYER}
                position={item.POSITION}
                score="0"
              />
            );
          })}
        </div>
      </Card>

      <Card
        className="max-w-[calc(50%_-_7px)]"
        title={`Key Players ${awayTeam?.nickname}`}
        icon={
          awayTeam?.logo ? (
            <Image
              height={32}
              width={32}
              src={awayTeam.logo}
              alt="Home Team Logo"
              className="object-contain"
            />
          ) : null
        }
      >
        <div className="flex gap-3 overflow-x-auto pb-2">
          {awayTeam?.player_statistics.map((item) => {
            return (
              <KeyPlayerCard
                key={item.PLAYER_ID}
                name={item.PLAYER}
                position={item.POSITION}
                score="0"
              />
            );
          })}
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
