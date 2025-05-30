'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { FaCircleUser } from 'react-icons/fa6';

import { usePlayer } from '@/hooks/usePlayer';
import Loader from '@/ui/loader';
import EmptyPlaceholder from '../EmptyPlaceholder';

import LeagueTable from './LeagueTable';
import { PlayerStatsTable } from './PlayerSeasonStats';
import PlayerStatsChart from './PlayerStatsChart';

const PlayerProfile = () => {
  const [isLastGames, setIsLastGames] = useState(false);
  const params = useParams();
  const playerId = params?.id as string;

  const { data: player, error, isLoading } = usePlayer(playerId as string);

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
      <div className="flex flex-col items-center gap-1.5">
        <FaCircleUser className="h-14 w-14" />
        <h3 className="mb-2 text-2xl font-bold">
          {player?.full_name || 'Jayson Tatum'}
        </h3>
      </div>

      {!isLastGames && (
        <>
          <div className="mb-8 flex flex-col gap-[2px]">
            <p className="text-[14px] opacity-60">Total score</p>
            <h2 className="text-2xl font-bold text-[#84FDF7]">
              {(
                player?.player_stats[0]?.PTS / player?.player_stats[0]?.GP
              ).toFixed(1)}
            </h2>
          </div>
          <p className="mb-8 w-full max-w-[558px] text-center text-[#B3B3B3]">
            Professional sports analyst with expertise in NFL, NCAAF, and AFL
            predictions. Specialized in championship and playoff game analysis
            with consistent accuracy in major event outcomes.
          </p>
          <div className="flex w-full flex-row items-stretch justify-between gap-10 px-15">
            <div className="flex w-full max-w-[374px] flex-col gap-5">
              <div className="bg-top-section flex flex-row gap-4 rounded-xl px-5 py-4">
                <div className="flex w-full flex-col items-center gap-1 rounded-xl bg-[#34D4414D] py-1">
                  <h3 className="text-2xl font-semibold text-[#34D399]">80</h3>
                  <p className="text-xs font-normal text-[#EBEBEB]">Wins</p>
                </div>
                <div className="flex w-full flex-col items-center gap-1 rounded-xl bg-[#D877294D] py-1">
                  <h3 className="text-2xl font-semibold text-[#FF9812]">70</h3>
                  <p className="text-xs font-normal text-[#EBEBEB]">Draws</p>
                </div>
                <div className="flex w-full flex-col items-center gap-1 rounded-xl bg-[#DF303033] py-1">
                  <h3 className="text-2xl font-semibold text-[#DC2626]">20</h3>
                  <p className="text-xs font-normal text-[#EBEBEB]">Losses</p>
                </div>
              </div>
              <div className="bg-graph-section h-full min-h-[200px] min-w-[374px] rounded-xl"></div>
            </div>

            <div className="w-full max-w-[926px]">
              <LeagueTable />
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
            <div className="w-full max-w-[926px]">
              <LeagueTable />
            </div>
          </div>
        </>
      )}

      <div className="my-10 min-h-[244px] w-full min-w-[374px]">
        <PlayerStatsChart data={player.player_stats} />
      </div>

      <div className="w-full">
        <PlayerStatsTable stats={player.player_stats} />
      </div>
    </div>
  );
};

export default PlayerProfile;
