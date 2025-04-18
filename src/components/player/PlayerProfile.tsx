'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useParams } from 'next/navigation';

import { usePlayer } from '@/hooks/usePlayer';

import LeagueTable from './LeagueTable';

import player_logo from '@/assets/icons/player_logo.svg';

const PlayerProfile = () => {
  const [isLastGames, setIsLastGames] = useState(false);
  const params = useParams();
  const playerId = params?.id as string;

  const { data: player, error, isLoading } = usePlayer(playerId as string);

  //   if (isLoading) return <p>Loading...</p>;
  //   if (error) return <p>Error load a player</p>;
  //   if (!player) return <p>Player not found</p>;

  return (
    <div className="flex w-full flex-col items-center">
      <div className="flex flex-col gap-1.5">
        <Image
          width={48}
          height={46}
          src={player?.imageUrl || player_logo}
          alt="Player icon"
        />
        <h3 className="mb-2 text-2xl font-bold">
          {player?.name || 'Jayson Tatum'}
        </h3>
      </div>
      {!isLastGames && (
        <>
          <div className="mb-8 flex flex-col gap-[2px]">
            <p className="text-[14px] opacity-60">Total score</p>
            <h2 className="text-2xl font-bold text-[#84FDF7]">
              {player?.score || '21.30'}
            </h2>
          </div>
          <p className="mb-8 w-full max-w-[558px] text-center text-[#B3B3B3]">
            Professional sports analyst with expertise in NFL, NCAAF, and AFL
            predictions. Specialized in championship and playoff game analysis
            with consistent accuracy in major event outcomes.
          </p>
          <div className="flex w-full flex-row items-center justify-between px-15">
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
              <div className="bg-graph-section min-h-[244px] min-w-[374px] rounded-xl"></div>
            </div>
            <div className="w-full max-w-[926px]">
              <LeagueTable />
            </div>
          </div>
        </>
      )}

      {isLastGames && (
        <>
          <p>Last 10 games perfomance</p>
        </>
      )}
    </div>
  );
};

export default PlayerProfile;
