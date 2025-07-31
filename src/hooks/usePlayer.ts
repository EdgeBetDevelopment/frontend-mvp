import { useQuery } from '@tanstack/react-query';

import apiService from '@/services';

export const usePlayer = (playerId: string) => {
  const playerQuery = useQuery({
    queryKey: ['player', playerId],
    queryFn: () => apiService.getPlayerById(playerId),
    staleTime: 1000 * 60 * 5,
    retry: 2,
  });

  const playerSeasonQuery = useQuery({
    queryKey: ['playerSeason', playerQuery?.data?.full_name],
    queryFn: () =>
      apiService.getPlayerSeasonByName(playerQuery.data!.full_name),
    staleTime: 1000 * 60 * 5,
    retry: 2,
  });

  const playerNameQuery = useQuery({
    queryKey: ['playerByName', playerQuery?.data?.full_name],
    queryFn: () => apiService.getPlayerByName(playerQuery.data!.full_name),
    enabled: !!playerQuery.data?.full_name,
    staleTime: 1000 * 60 * 5,
    retry: 2,
  });

  return {
    ...playerQuery,
    playerNameData: playerNameQuery.data,
    isLoadingFull: playerQuery.isLoading || playerNameQuery.isLoading,
    isErrorFull: playerQuery.isError || playerNameQuery.isError,
    playerSeason: playerSeasonQuery.data,
  };
};
