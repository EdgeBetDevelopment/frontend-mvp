import React, { FC } from 'react';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';

import { cn } from '@/lib/utils';
import { ROUTES } from '@/routes';
import apiService from '@/services';
import { Player } from '@/types/team';
import { Avatar } from '@/ui/avatar';
import CardContainer from '@/ui/containers/CardContainer';
import { Skeleton } from '@/ui/skeleton';

interface GameLeader {
  personId: number;
  name: string;
  jerseyNum: string;
  position: string;
  teamTricode: string;
  playerSlug: string | null;
  points: number;
  rebounds: number;
  assists: number;
}

interface IKeyPlayersProps {
  homeTeamId?: number;
  awayTeamId?: number;
  homeLeader?: GameLeader;
  awayLeader?: GameLeader;
}

const KeyPlayers: FC<IKeyPlayersProps> = ({
  homeTeamId,
  awayTeamId,
  homeLeader,
  awayLeader,
}) => {
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

  const processHomePlayers = () => {
    if (!homeTeam?.player_statistics) return [];

    const players = [...homeTeam.player_statistics];

    if (homeLeader?.name) {
      const leaderIndex = players.findIndex(
        (p) => p.PLAYER === homeLeader.name,
      );

      if (leaderIndex !== -1) {
        const leader = players.splice(leaderIndex, 1)[0];

        players.unshift(leader);
      }
    }

    return players;
  };

  const processAwayPlayers = () => {
    if (!awayTeam?.player_statistics) return [];

    const players = [...awayTeam.player_statistics];

    if (awayLeader?.name) {
      const leaderIndex = players.findIndex(
        (p) => p.PLAYER === awayLeader.name,
      );
      if (leaderIndex !== -1) {
        const leader = players.splice(leaderIndex, 1)[0];
        players.unshift(leader);
      }
    }

    return players;
  };

  return (
    <div className="flex gap-3.5">
      {isLoadingAway ? (
        <CardSkeleton />
      ) : (
        <Card
          className="max-w-[calc(50%_-_7px)]"
          title={`Full roster ${homeTeam?.nickname}`}
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
            {processHomePlayers().map((item) => (
              <KeyPlayerCard
                key={item.PLAYER_ID}
                player={item}
                isLeader={homeLeader?.name === item.PLAYER}
                leaderStats={
                  homeLeader?.name === item.PLAYER ? homeLeader : undefined
                }
              />
            ))}
          </div>
        </Card>
      )}

      {isLoadingHome ? (
        <CardSkeleton />
      ) : (
        <Card
          className="max-w-[calc(50%_-_7px)]"
          title={`Full roster ${awayTeam?.nickname}`}
          icon={
            awayTeam?.logo ? (
              <Image
                height={32}
                width={32}
                src={awayTeam.logo}
                alt="Away Team Logo"
                className="object-contain"
              />
            ) : null
          }
        >
          <div className="flex gap-3 overflow-x-auto pb-2">
            {processAwayPlayers().map((item) => (
              <KeyPlayerCard
                key={item.PLAYER_ID}
                player={item}
                isLeader={awayLeader?.name === item.PLAYER}
                leaderStats={
                  awayLeader?.name === item.PLAYER ? awayLeader : undefined
                }
              />
            ))}
          </div>
        </Card>
      )}
    </div>
  );
};

export default KeyPlayers;

export const Card = ({
  children,
  className,
  title,
  icon,
}: {
  children: React.ReactNode;
  className?: string;
  title: string;
  icon: React.ReactNode;
}) => {
  return (
    <CardContainer
      className={cn('flex flex-1/2 flex-col gap-2 rounded-lg', className)}
    >
      <div className="tl-flex-icon align-bottom text-sm font-medium tracking-normal">
        {icon}
        {title}
      </div>

      {children}
    </CardContainer>
  );
};

const KeyPlayerCard = ({
  player,
  isLeader,
  leaderStats,
}: {
  player: Player;
  isLeader?: boolean;
  leaderStats?: GameLeader;
}) => {
  const { PLAYER, PLAYER_ID, POSITION } = player;

  return (
    <Link
      href={ROUTES.PLAYER(PLAYER_ID.toString())}
      className="border-border hover:border-primary-brand flex min-w-[120px] cursor-pointer flex-col items-center gap-2 rounded-xl border p-3 transition-all"
    >
      <div className="relative">
        {isLeader && (
          <div className="text-primary-brand mb-1 text-xs">Key Player</div>
        )}
        <Avatar className="flex h-12 w-12 items-center justify-center rounded-full border bg-[#33758780]">
          <div className="text-lg font-bold text-white">
            {PLAYER.split(' ')
              .map((n) => n[0])
              .join('')}
          </div>
        </Avatar>
      </div>

      <div className="text-center">
        <p className="text-text-primary text-sm font-medium">{PLAYER}</p>
        <p className="text-xs text-gray-400">{POSITION}</p>
        {isLeader && leaderStats && (
          <div className="mt-1 space-y-0.5 text-xs">
            <p className="text-primary-brand">PTS: {leaderStats.points}</p>
            <p className="text-primary-brand">REB: {leaderStats.rebounds}</p>
            <p className="text-primary-brand">AST: {leaderStats.assists}</p>
          </div>
        )}
      </div>
    </Link>
  );
};

const CardSkeleton = () => {
  return (
    <Skeleton className="flex h-[227px] flex-1/2 flex-col gap-2 rounded-lg" />
  );
};
