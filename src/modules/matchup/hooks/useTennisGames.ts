import { useMemo } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';

import {
  tennisApiService,
  mapTennisApiGame,
  TennisApiGame,
} from '../services/tennis.api';
import type { TennisMatchup } from '../data/tennisMatchups';

export const useTennisGames = () => {
  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery<TennisApiGame[], Error>({
    queryKey: ['tennis-games'],
    queryFn: ({ pageParam }) =>
      tennisApiService.getTennisGames(pageParam as number | undefined),
    initialPageParam: undefined as number | undefined,
    getNextPageParam: (lastPage) => {
      if (!lastPage || lastPage.length === 0) return undefined;
      return lastPage[lastPage.length - 1].id;
    },
    refetchInterval: 300000,
    retry: false,
  });

  const flatGames: TennisMatchup[] = useMemo(
    () =>
      data ? data.pages.flatMap((page) => page.map(mapTennisApiGame)) : [],
    [data],
  );

  return {
    flatGames,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  };
};
