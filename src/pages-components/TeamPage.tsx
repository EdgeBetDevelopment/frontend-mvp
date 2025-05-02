'use client';

import { JSX } from 'react';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { FaFacebook } from 'react-icons/fa';
import { FaCircleUser } from 'react-icons/fa6';
import { FaXTwitter } from 'react-icons/fa6';
import { FaInstagram } from 'react-icons/fa6';
import { IoPeopleCircle } from 'react-icons/io5';

import EmptyPlaceholder from '@/components/EmptyPlaceholder';
import TeamStatsChart from '@/components/team/TeamStatsChart';
import { TeamStatsTable } from '@/components/team/TeamStatsTable';
import { ROUTES } from '@/routes';
import apiService from '@/services';
import { ITeamPlayer } from '@/types/player';
import { Button } from '@/ui/button';
import Loader from '@/ui/loader';

const SOCIAL_ICONS: Record<string, JSX.Element> = {
  Facebook: <FaFacebook className="mr-2 h-5 w-5 text-[#1877F2]" />,
  Instagram: <FaInstagram className="mr-2 h-5 w-5 text-[#E1306C]" />,
  Twitter: <FaXTwitter className="mr-2 h-5 w-5 text-white" />,
};

const TeamPage = () => {
  const params = useParams();
  const teamId = params?.id as string;

  const {
    data: team,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['team', teamId],
    queryFn: () => apiService.getTeamById(teamId),
    staleTime: 1000 * 60 * 5,
    retry: 2,
  });

  if (isLoading)
    return (
      <Loader
        size="h-14 w-14"
        className="flex h-[70vh] w-full items-center justify-center"
      />
    );

  if (!!error)
    return (
      <EmptyPlaceholder
        title="Something went wrong"
        subtitle="Please try again later."
      />
    );

  if (!team)
    return (
      <EmptyPlaceholder
        title="No team found"
        subtitle="The team you're looking for doesn't exist"
      />
    );

  return (
    <div className="flex w-full flex-col items-center">
      <div className="flex flex-col items-center gap-1.5">
        <IoPeopleCircle className="h-14 w-14" />
        <h1 className="text-3xl font-bold">{team.full_name}</h1>
        <p className="text-sm text-gray-400">
          {team.nickname} ({team.abbreviation})
        </p>
      </div>

      <div className="my-10 grid w-full max-w-6xl grid-cols-1 gap-6 md:grid-cols-3">
        <div className="col-span-1 space-y-4">
          <div className="rounded-lg bg-[#1A1A1A] p-4">
            <h2 className="mb-2 text-xl font-semibold">Team Info</h2>
            <p>
              <strong>City:</strong> {team.city}, {team.state}
            </p>
            <p>
              <strong>Founded:</strong> {team.year_founded}
            </p>
            <p>
              <strong>Arena:</strong> {team.arena} ({team.arena_capacity} seats)
            </p>
            <p>
              <strong>Owner:</strong> {team.owner}
            </p>
            <p>
              <strong>GM:</strong> {team.general_manager}
            </p>
            <p>
              <strong>Coach:</strong> {team.head_coach}
            </p>
            <p>
              <strong>Affiliate:</strong> {team.d_league_affiliation}
            </p>
          </div>

          <div className="rounded-lg bg-[#1A1A1A] p-4">
            <h2 className="mb-2 text-xl font-semibold">Social Media</h2>
            <ul className="space-y-1">
              {Object.entries(team.social_media).map(([platform, url]) => (
                <li key={platform} className="flex items-center">
                  <Link href={url} target="_blank" rel="noopener noreferrer">
                    <Button
                      variant="link"
                      className="text-text-primary flex items-center p-0"
                    >
                      {SOCIAL_ICONS[platform] ?? null}
                      {platform}
                    </Button>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-lg bg-[#1A1A1A] p-4">
            <h2 className="mb-2 text-xl font-semibold">
              Stats (Season {team.team_statistics.GROUP_VALUE})
            </h2>
            <p>
              <strong>Games Played:</strong> {team.team_statistics.GP}
            </p>
            <p>
              <strong>Wins:</strong> {team.team_statistics.W}
            </p>
            <p>
              <strong>Losses:</strong> {team.team_statistics.L}
            </p>
            <p>
              <strong>Win %:</strong>{' '}
              {(team.team_statistics.W_PCT * 100).toFixed(1)}%
            </p>
          </div>
        </div>

        <div className="col-span-2">
          <h2 className="mb-4 text-2xl font-bold">Players</h2>
          <div className="grid grid-cols-1 items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {team.player_statistics.map((player) => (
              <Link
                href={ROUTES.PLAYER(String(player.PLAYER_ID))}
                key={player.PLAYER_ID}
              >
                <PlayerCard player={player} />
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="my-10 min-h-[244px] w-full min-w-[374px]">
        <TeamStatsChart stats={team?.team_statistics} />
      </div>

      <div className="w-full">
        <TeamStatsTable stats={team.team_statistics} />
      </div>
    </div>
  );
};

export default TeamPage;

interface IPlayerCard {
  player: ITeamPlayer;
}

const PlayerCard = ({ player }: IPlayerCard) => {
  return (
    <div
      key={player.PLAYER_ID}
      className="flex h-full flex-col items-center gap-2 rounded-lg bg-[#111] p-4 shadow-md transition hover:shadow-lg"
    >
      <FaCircleUser className="h-10 w-10" />

      <div className="flex w-full flex-col items-start gap-1">
        <div className="mb-2 flex w-full items-center justify-between">
          <h3 className="text-lg font-semibold">{player.PLAYER}</h3>
          <span className="text-sm text-gray-400">#{player.NUM}</span>
        </div>

        <p className="text-sm text-gray-300">{player.POSITION}</p>
        <p className="text-sm text-gray-500">
          {player.HEIGHT}, {player.WEIGHT} lbs
        </p>
        <p className="text-sm text-gray-400">
          Age: {player.AGE} | Exp: {player.EXP}
        </p>
        <p className="mt-1 text-xs text-gray-500">{player.HOW_ACQUIRED}</p>
      </div>
    </div>
  );
};
