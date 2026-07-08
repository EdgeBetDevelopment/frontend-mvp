'use client';

import { useEffect, useState, useMemo } from 'react';

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
import type { TennisMatchup, TennisMarket } from '../data/tennisMatchups';
import type { BetPick } from '@/modules/matchup/types';
import type { IGameWithAI } from '@/modules/game/types';

type Category = 'ATP' | 'WTA' | 'All';
type Discipline = 'singles' | 'doubles' | 'all';

interface Props {
  oddsFormat: 'american' | 'european';
  onSelectGame?: (matchup: TennisMatchup) => void;
}

const CATEGORIES: Category[] = ['All', 'ATP', 'WTA'];
const DISCIPLINES: { value: Discipline; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'singles', label: 'Singles' },
  { value: 'doubles', label: 'Doubles' },
];

const TennisGrid = ({ oddsFormat, onSelectGame }: Props) => {
  const { flatGames, isLoading, isError, is402Error } = useTennisGames();
  const { isSubscribed, isSubscriptionLoaded } = useAuth();
  const { startingPrice, isLoading: isPriceLoading } = useStartingPrice();
  const [paywallOpen, setPaywallOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<Category>('All');
  const [activeDiscipline, setActiveDiscipline] = useState<Discipline>('all');

  const shouldShowPaywall =
    is402Error || (isSubscriptionLoaded && !isSubscribed);

  useEffect(() => {
    if (shouldShowPaywall) {
      setPaywallOpen(true);
    }
  }, [shouldShowPaywall]);

  const { setTrackedGame, upsertSingle, upsertParlayPick } = useStore();
  const { openModal } = useModalManager();
  const isMobile = useIsMobile();

  const filteredGames = useMemo(() => {
    return flatGames.filter((g) => {
      const catMatch =
        activeCategory === 'All' ||
        !g.category ||
        g.category.toUpperCase() === activeCategory;
      const discMatch =
        activeDiscipline === 'all' ||
        !g.discipline ||
        g.discipline.toLowerCase() === activeDiscipline;
      return catMatch && discMatch;
    });
  }, [flatGames, activeCategory, activeDiscipline]);

  const groupedByTournament = useMemo(() => {
    const map = new Map<string, TennisMatchup[]>();
    for (const g of filteredGames) {
      const key = g.tournament || 'Other';
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(g);
    }
    return map;
  }, [filteredGames]);

  const makeSelectBetHandler = (matchup: TennisMatchup) => (market: TennisMarket) => {
    setTrackedGame(matchup as unknown as IGameWithAI);

    const name1 = matchup.player1?.name ?? '';
    const name2 = matchup.player2?.name ?? '';
    const label = market.label ?? '';

    let selectedName = '';
    if (label.includes(name1)) selectedName = name1;
    else if (label.includes(name2)) selectedName = name2;

    const tennisDescription = market.market_type
      ? {
          market_type: market.market_type,
          selection: market.selection ?? selectedName,
          line: market.line ?? null,
          player_key: market.player_key ?? null,
        }
      : undefined;

    const pick: BetPick = {
      game_id: Number(matchup.id),
      odds: market.odds ? convertEuropeanToAmerican(parseFloat(market.odds)) : 0,
      selected_team_id: '',
      selected_team_name: selectedName,
      description: label,
      sport: 'tennis',
      market_type: market.market_type ?? market.label ?? '',
      bet_value: market.line ?? null,
      bet_over_under: null,
      bet_player: null,
      tennis_description: tennisDescription,
    };

    upsertParlayPick(pick);
    upsertSingle(pick);
    openModal(MODAL_IDS.TRACK_BET);
    if (isMobile) toast.success('Bet successfully recorded in the tracker');
  };

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
      {/* Category tabs */}
      <div className="mb-4 flex gap-2 border-b border-border">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              activeCategory === cat
                ? 'border-b-2 border-primary text-primary'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Discipline filter */}
      <div className="mb-6 flex gap-2">
        {DISCIPLINES.map((d) => (
          <button
            key={d.value}
            onClick={() => setActiveDiscipline(d.value)}
            className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
              activeDiscipline === d.value
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
          >
            {d.label}
          </button>
        ))}
      </div>

      {filteredGames.length === 0 ? (
        <div className="flex h-40 items-center justify-center rounded-lg border border-border bg-card">
          <p className="text-muted-foreground">No matches for the selected filters</p>
        </div>
      ) : (
        Array.from(groupedByTournament.entries()).map(([tournamentName, games]) => (
          <div key={tournamentName} className="mb-8">
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              {tournamentName}
            </h3>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {games.map((matchup) => (
                <div key={matchup.id} className="relative">
                  {matchup.status === 'live' && (
                    <span className="absolute left-3 top-3 z-10 flex items-center gap-1 rounded-full bg-red-500 px-2 py-0.5 text-xs font-semibold text-white">
                      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white" />
                      Live
                    </span>
                  )}
                  <TennisMatchupCard
                    matchup={matchup}
                    oddsFormat={oddsFormat}
                    onSelectGame={() => onSelectGame?.(matchup)}
                    onSelectBet={makeSelectBetHandler(matchup)}
                  />
                </div>
              ))}
            </div>
          </div>
        ))
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
