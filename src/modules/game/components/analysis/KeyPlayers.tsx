import React, { FC } from "react";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";

import { cn } from "@/shared/utils/helper";
import { ROUTES } from "@/shared/config/routes";
import { teamApi } from "@/modules/team";
import { ITeamPlayer } from "@/modules/player";
import { Player } from "@/modules/team";
import { Avatar } from "@/shared/components/avatar";
import { CardContainer } from "@/shared/components";
import { Skeleton } from "@/shared/components/skeleton";

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
  playersHome?: ITeamPlayer[];
  playersAway?: ITeamPlayer[];
}

const KeyPlayers: FC<IKeyPlayersProps> = ({
  homeTeamId,
  awayTeamId,
  homeLeader,
  awayLeader,
  playersHome,
  playersAway,
}) => {
  const { data: homeTeam, isLoading: isLoadingHome } = useQuery({
    queryKey: ["team", homeTeamId],
    queryFn: () =>
      homeTeamId ? teamApi.getTeamById(`${homeTeamId}`) : null,
    enabled: !!homeTeamId,
    staleTime: 1000 * 60 * 5,
    retry: 2,
  });

  const { data: awayTeam, isLoading: isLoadingAway } = useQuery({
    queryKey: ["team", awayTeamId],
    queryFn: () =>
      awayTeamId ? teamApi.getTeamById(`${awayTeamId}`) : null,
    enabled: !!awayTeamId,
    staleTime: 1000 * 60 * 5,
    retry: 2,
  });

  const processPlayers = (
    players: ITeamPlayer[] | undefined,
    leader: GameLeader | undefined,
  ) => {
    if (!players) return [];

    const enriched = players.map((player) => ({
      player,
      isKeyPlayer: leader?.personId === player.PLAYER_ID,
      stats:
        leader?.name === player.fullname
          ? {
              points: leader.points,
              rebounds: leader.rebounds,
              assists: leader.assists,
            }
          : {
              points: player.PTS,
              rebounds: player.REB,
              assists: player.AST,
            },
    }));

    enriched.sort((a, b) => (b.isKeyPlayer ? 1 : 0) - (a.isKeyPlayer ? 1 : 0));

    return enriched;
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
            {processPlayers(playersHome, homeLeader).map(
              ({ player, stats, isKeyPlayer }) => (
                <KeyPlayerCard
                  key={player.PLAYER_ID}
                  player={player}
                  stats={stats}
                  isKeyPlayer={isKeyPlayer}
                />
              ),
            )}
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
            {processPlayers(playersAway, awayLeader).map(
              ({ player, stats, isKeyPlayer }) => (
                <KeyPlayerCard
                  key={player.PLAYER_ID}
                  player={player}
                  stats={stats}
                  isKeyPlayer={isKeyPlayer}
                />
              ),
            )}
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
      className={cn("flex flex-1/2 flex-col gap-2 rounded-lg", className)}
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
  stats,
  isKeyPlayer,
}: {
  player: Player;
  stats?: { points: number; rebounds: number; assists: number } | null;
  isKeyPlayer?: boolean;
}) => {
  const { fullname, PLAYER_ID, POSITION } = player;

  return (
    <Link
      href={ROUTES.PLAYER(PLAYER_ID.toString())}
      className="border-border hover:border-primary-brand flex min-h-[200px] min-w-[120px] cursor-pointer flex-col items-center gap-2 rounded-xl border p-3 transition-all"
    >
      <div className="relative">
        {isKeyPlayer && (
          <div className="text-primary-brand mb-1 text-xs font-semibold">
            Key Player
          </div>
        )}
        <Avatar className="flex h-12 w-12 items-center justify-center rounded-full border bg-[#33758780]">
          <div className="text-lg font-bold text-white">
            {fullname
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </div>
        </Avatar>
      </div>

      <div className="text-center">
        <p className="text-text-primary text-sm font-medium">{fullname}</p>
        <p className="text-xs text-gray-400">{POSITION}</p>
        {stats && (
          <div className="mt-1 space-y-0.5 text-xs">
            <p className="text-primary-brand">PTS: {stats.points}</p>
            <p className="text-primary-brand">REB: {stats.rebounds}</p>
            <p className="text-primary-brand">AST: {stats.assists}</p>
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
