import { useQuery } from '@tanstack/react-query';

import { playerApi } from '../services';

export const usePlayer = (playerId: string) => {
  const playerQuery = useQuery({
    queryKey: ['player', playerId],
    queryFn: () => playerApi.getPlayerById(playerId),
    staleTime: 1000 * 60 * 5,
    retry: 2,
  });

  const playerSeasonQuery = useQuery({
    queryKey: ['playerSeason', playerQuery?.data?.full_name],
    queryFn: () => playerApi.getPlayerSeasonByName(playerQuery.data!.full_name),
    staleTime: 1000 * 60 * 5,
    retry: 2,
  });

  const playerNameQuery = useQuery({
    queryKey: ['playerByName', playerQuery?.data?.full_name],
    queryFn: () => playerApi.getPlayerByName(playerQuery.data!.full_name),
    enabled: !!playerQuery.data?.full_name,
    staleTime: 1000 * 60 * 5,
    retry: 2,
  });

  return {
    ...playerQuery,
    playerNameData: playerNameQuery.data,
    isLoadingFull:
      playerQuery.isLoading &&
      playerNameQuery.isLoading &&
      playerSeasonQuery.isLoading,
    isErrorFull: playerQuery.isError || playerNameQuery.isError,
    playerSeason: playerSeasonQuery.data,
  };
};
