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
            <div></div>
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
