import { useQuery } from '@tanstack/react-query';

import apiService from '@/services';

export const usePlayer = (playerId: string) => {
  return useQuery({
    queryKey: ['player', playerId],
    queryFn: () => apiService.getPlayerById(playerId),
    staleTime: 1000 * 60 * 5,
    retry: 2,
  });
};
