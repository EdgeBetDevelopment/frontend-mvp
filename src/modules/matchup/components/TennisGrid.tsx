'use client';

import { useRef, useCallback, useEffect, useState } from 'react';

import { Skeleton } from '@/shared/components/skeleton';
import { PaywallModal } from '@/modules/picks/components/PaywallModal';
import { useStartingPrice } from '@/modules/picks/hooks/useStartingPrice';
import { useAuth } from '@/modules/auth';

import TennisMatchupCard from './TennisMatchupCard';
import { useStore } from '@/store';
import useModalManager from '@/shared/hooks/useModalManager';
import { MODAL_IDS } from '@/shared/constants';
import { toast } from 'sonner';
import { useIsMobile } from '@/shared/hooks/useIsMobile';
import { useTennisGames } from '../hooks/useTennisGames';
import { convertEuropeanToAmerican } from '@/shared/utils';
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
    is402Error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useTennisGames();
  const { isSubscribed, isSubscriptionLoaded } = useAuth();
  const { startingPrice, isLoading: isPriceLoading } = useStartingPrice();
  const [paywallOpen, setPaywallOpen] = useState(false);

  const shouldShowPaywall =
    is402Error || (isSubscriptionLoaded && !isSubscribed);

  useEffect(() => {
    if (shouldShowPaywall) {
      setPaywallOpen(true);
    }
  }, [shouldShowPaywall]);

  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const { setTrackedGame, upsertSingle, upsertParlayPick } = useStore();
  const { openModal } = useModalManager();
  const isMobile = useIsMobile();

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

  if (is402Error || (isSubscriptionLoaded && !isSubscribed)) {
    return (
      <>
        <div className="flex h-64 items-center justify-center rounded-lg border border-border bg-card">
          <div className="text-center">
            <p className="mb-4 text-lg text-muted-foreground">
              A subscription is required to view tennis predictions.
            </p>
            <button
              onClick={() => setPaywallOpen(true)}
              className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
            >
              Upgrade to Premium
            </button>
          </div>
        </div>
        <PaywallModal
          open={paywallOpen}
          onClose={() => setPaywallOpen(false)}
          startingPrice={startingPrice}
          isPriceLoading={isPriceLoading}
        />
      </>
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
        {flatGames.map((matchup) => {
          const handleSelectBet = (market: any) => {
            setTrackedGame(matchup as any);

            const name1 = matchup.player1?.name ?? '';
            const name2 = matchup.player2?.name ?? '';
            const label = market?.label ?? '';

            let selectedName = '';
            if (label.includes(name1)) selectedName = name1;
            else if (label.includes(name2)) selectedName = name2;

            const pick = {
              game_id: matchup.id,
              odds: market?.odds ? convertEuropeanToAmerican(parseFloat(market.odds)) : 0,
              selected_team_id: '',
              selected_team_name: selectedName,
              description: label,
              sport: 'tennis' as const,
              market_type: market?.label ?? '',
              bet_value: null,
              bet_over_under: null,
              bet_player: null,
            };

            upsertParlayPick(pick as any);
            upsertSingle(pick as any);
            openModal(MODAL_IDS.TRACK_BET);
            if (isMobile) toast.success('Bet successfully recorded in the tracker');
          };

          return (
            <TennisMatchupCard
              key={matchup.id}
              matchup={matchup}
              oddsFormat={oddsFormat}
              onSelectGame={() => onSelectGame?.(matchup)}
              onSelectBet={handleSelectBet}
            />
          );
        })}
      </div>
      <div ref={loadMoreRef} />
      {isFetchingNextPage && (
        <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-2">
          {Array.from({ length: 2 }).map((_, i) => (
            <Skeleton key={i} className="h-[400px] w-full rounded-lg" />
          ))}
        </div>
      )}
      <PaywallModal
        open={paywallOpen}
        onClose={() => setPaywallOpen(false)}
        startingPrice={startingPrice}
        isPriceLoading={isPriceLoading}
      />
    </>
  );
};

export default TennisGrid;
