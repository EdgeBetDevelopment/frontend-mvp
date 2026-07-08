import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';

import { tennisApiService, mapTennisApiGame } from '../services/tennis.api';
import type { TennisMatchup } from '../data/tennisMatchups';

export const useTennisGames = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['tennis-games'],
    queryFn: () => tennisApiService.getTennisGames(),
    refetchInterval: 300000,
    retry: false,
  });

  const is402Error =
    isError && (error as unknown as { code?: number })?.code === 402;

  const flatGames: TennisMatchup[] = useMemo(
    () => (data ? data.map(mapTennisApiGame) : []),
    [data],
  );

  return {
    flatGames,
    isLoading,
    isError,
    is402Error,
  };
};
