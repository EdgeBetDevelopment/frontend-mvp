'use client';

import { useRef, useCallback, useEffect } from 'react';

import { Skeleton } from '@/shared/components/skeleton';

import TennisMatchupCard from './TennisMatchupCard';
import { useTennisGames } from '../hooks/useTennisGames';
import type { TennisMatchup } from '../data/tennisMatchups';

interface Props {
  oddsFormat: 'american' | 'european';
  onSelectGame?: (matchup: TennisMatchup) => void;
}

const TennisGrid = ({ oddsFormat, onSelectGame }: Props) => {
  const {
    flatGames,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useTennisGames();

  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const handleIntersection = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const first = entries[0];
      if (first.isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
    [fetchNextPage, hasNextPage, isFetchingNextPage],
  );

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection, {
      root: null,
      rootMargin: '200px',
      threshold: 0,
    });
    const current = loadMoreRef.current;
    if (current) observer.observe(current);
    return () => {
      if (current) observer.unobserve(current);
    };
  }, [handleIntersection]);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-[400px] w-full rounded-lg" />
        ))}
      </div>
    );
  }

  if (isError) {
    return <div>Error loading tennis games</div>;
  }

  if (!flatGames.length) {
    return (
      <div className="flex h-64 items-center justify-center rounded-lg border border-border bg-card">
        <p className="text-lg text-muted-foreground">
          No tennis games scheduled for the next 24 hours
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {flatGames.map((matchup) => (
          <TennisMatchupCard
            key={matchup.id}
            matchup={matchup}
            oddsFormat={oddsFormat}
            onSelectGame={() => onSelectGame?.(matchup)}
          />
        ))}
      </div>
      <div ref={loadMoreRef} />
      {isFetchingNextPage && (
        <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-2">
          {Array.from({ length: 2 }).map((_, i) => (
            <Skeleton key={i} className="h-[400px] w-full rounded-lg" />
          ))}
        </div>
      )}
    </>
  );
};

export default TennisGrid;
