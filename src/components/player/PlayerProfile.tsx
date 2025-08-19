'use client';

import { useState } from 'react';
import { Outfit } from 'next/font/google';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { FaCircleUser } from 'react-icons/fa6';

import { usePlayer } from '@/hooks/usePlayer';
import Loader from '@/ui/loader';
import EmptyPlaceholder from '../EmptyPlaceholder';

import LeagueTable from './LeagueTable';
import { PlayerStatsTable } from './PlayerSeasonStats';
import PlayerStatsChart from './PlayerStatsChart';

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  display: 'swap',
});

const PlayerProfile = () => {
  const [isLastGames, setIsLastGames] = useState(false);
  const params = useParams();
  const playerId = params?.id as string;

  const {
    data: player,
    playerNameData,
    playerSeason,
    error,
    isLoading,
  } = usePlayer(playerId as string);

  const { profile } = playerNameData || {};

  console.log(player);

  if (isLoading)
    return (
      <Loader
        size="h-14 w-14"
        className="flex h-[70vh] w-full items-center justify-center"
      />
    );

  if (error)
    return (
      <EmptyPlaceholder
        title="Something went wrong"
        subtitle="We couldn't load this player. Please try again later."
      />
    );

  if (!player)
    return (
      <EmptyPlaceholder
        title="Player not found"
        subtitle="The player you're looking for doesn't exist."
      />
    );

  return (
    <div className="flex w-full flex-col items-center">
      <div className="relative flex w-full flex-row justify-center">
        <div className="flex flex-col items-center gap-1.5">
          {playerNameData?.image_url ? (
            // <Image
            //   src={`${playerNameData?.image_url}`}
            //   height={56}
            //   width={68}
            //   className="h-14 w-17 rounded-full"
            //   alt="Player Logo"
            // />
            <FaCircleUser className="h-14 w-14" />
          ) : (
            <FaCircleUser className="h-14 w-14" />
          )}
          <h3 className="mb-2 text-2xl font-bold">
            {player?.full_name || 'Jayson Tatum'}
          </h3>
        </div>
      </div>

      {!isLastGames && (
        <>
          <div className="mb-8 flex flex-col gap-[2px]">
            {/* <p className="text-[14px] opacity-60">Total score</p>
            <h2 className="text-2xl font-bold text-[#84FDF7]">
              {(
                player?.player_stats[0]?.PTS / player?.player_stats[0]?.GP
              ).toFixed(1)}
            </h2> */}
            <Link
              className="mb-8 w-full max-w-[558px] text-center text-[#B3B3B3] hover:text-[#fff]"
              href={`/team/${playerNameData?.team_details[0]?.id}`}
            >
              {playerNameData?.team_details[0]?.full_name}
            </Link>
          </div>
          {/* <p className="mb-8 w-full max-w-[558px] text-center text-[#B3B3B3]">
            Professional sports analyst with expertise in NFL, NCAAF, and AFL
            predictions. Specialized in championship and playoff game analysis
            with consistent accuracy in major event outcomes.
          </p> */}
          <div className="flex w-full flex-row items-stretch justify-center gap-10">
            {/* <div className="flex w-full max-w-[400px] flex-col gap-5">
              <div className="bg-graph-section h-full min-h-[200px] min-w-[374px] rounded-xl"></div>
            </div> */}

            <div
              className={`${outfit.className} flex w-full flex-row justify-between px-13`}
            >
              <div className="flex flex-col gap-4">
                <div
                  style={{
                    background: `linear-gradient(112.71deg, rgba(23, 23, 23, 0.6) 19.64%, rgba(105, 105, 105, 0.316464) 55.1%, rgba(125, 125, 125, 0.06) 92%)`,
                  }}
                  className="left-0 flex h-auto w-[434px] flex-row flex-wrap gap-4 rounded-xl px-5 py-4"
                >
                  {profile &&
                    Object.entries(profile).map(([label, value], idx) => (
                      <div
                        key={idx}
                        className="flex h-[60px] max-w-[120px] min-w-[100px] flex-1 flex-col items-center justify-center gap-1 rounded-xl bg-[#85FDF7] py-1"
                      >
                        <h3 className="text-2xl font-semibold text-black">
                          {String(value ?? 'N/A')}
                        </h3>
                        <p className="text-xs font-normal text-black">
                          {label}
                        </p>
                      </div>
                    ))}
                </div>
              </div>
              <LeagueTable recentGames={playerSeason} />
            </div>
          </div>
        </>
      )}

      {isLastGames && (
        <>
          <div className="mb-8 flex flex-col gap-[2px]">
            <p className="text-[14px] opacity-60">Last 10 games performance</p>
          </div>
          <div className="flex w-full flex-row items-center justify-between px-15">
            <div className="flex w-full max-w-[374px] flex-col gap-5">
              <div className="bg-top-section flex flex-row gap-4 rounded-xl px-5 py-4"></div>
              <div className="bg-graph-section min-h-[244px] min-w-[374px] rounded-xl"></div>
            </div>
            <div className="w-full max-w-[926px]">{/* <LeagueTable /> */}</div>
          </div>
        </>
      )}
      {playerNameData?.season_stats && (
        <div className="mt-10 w-full">
          <PlayerStatsTable stats={playerNameData?.season_stats} />
        </div>
      )}
      {playerNameData?.season_stats && (
        <div className="my-10 min-h-[244px] w-full min-w-[374px]">
          <PlayerStatsChart data={player?.player_stats} />
        </div>
      )}
    </div>
  );
};

export default PlayerProfile;
