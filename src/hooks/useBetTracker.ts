import { useQuery } from '@tanstack/react-query';

import apiService from '@/services';

export const useBetTracker = () => {
  return useQuery({
    queryKey: ['betList'],
    queryFn: () => apiService.getBetList(),
    staleTime: 1000 * 60 * 5,
    retry: 2,
    refetchOnMount: 'always',
    refetchOnWindowFocus: true,
  });
};
