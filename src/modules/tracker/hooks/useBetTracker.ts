'use client';

import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  ReadonlyURLSearchParams,
  usePathname,
  useRouter,
  useSearchParams,
} from 'next/navigation';

import { useAuth } from '@/context/AuthContext';
import {
  formUrlQuery,
  formatUtcToLocalDate,
  formatUtcToLocalTimeAmPm,
} from '@/shared/utils';
import { trackerApi } from '@/modules/tracker/services';
import type { BetLeg, BetStatus, TrackedBet } from '@/modules/tracker/types';

const mapBetStatus = (status: string): BetStatus => {
  const s = status?.toLowerCase();
  if (s === 'win' || s === 'won') return 'won';
  if (s === 'loss' || s === 'lost') return 'lost';
  return 'pending';
};

const transformBetsToTrackedBets = (bets: any[]): TrackedBet[] => {
  return bets.map((bet) => {
    const selections = bet?.selections || [];
    const isParlay = selections.length > 1;
    const betStatus = mapBetStatus(bet.status);

    const legs: BetLeg[] = selections.map((selection: any, idx: number) => {
      const game = selection?.game || {};
      const payload = selection?.payload || {};
      const selectedTeamName = payload.selected_team_name || '';

      const descriptionObj = payload.description || {};
      let formattedDescription = '';

      if (typeof descriptionObj === 'object' && descriptionObj !== null) {
        const marketType = descriptionObj.market_type || '';
        const betName = descriptionObj.bet_name || '';
        const betValue = descriptionObj.bet_value;
        const betOverUnder = descriptionObj.bet_over_under;

        if (marketType.toLowerCase().includes('spread')) {
          formattedDescription =
            betName ||
            `${selectedTeamName} ${betValue > 0 ? '+' : ''}${betValue}`;
        } else if (marketType.toLowerCase().includes('total')) {
          formattedDescription = betName || `${betOverUnder} ${betValue}`;
        } else if (marketType.toLowerCase().includes('moneyline')) {
          formattedDescription = `${selectedTeamName} ML`;
        } else if (marketType.toLowerCase().includes('player_prop')) {
          formattedDescription = betName;
        } else {
          formattedDescription =
            betName || descriptionObj.bet_description || selectedTeamName;
        }
      } else if (typeof descriptionObj === 'string') {
        formattedDescription = descriptionObj;

        if (formattedDescription && selectedTeamName) {
          const mainBetInfo = formattedDescription.split(':')[0];

          if (
            mainBetInfo.includes('Spread') ||
            mainBetInfo.includes('Point Spread')
          ) {
            const spreadMatch = mainBetInfo.match(/([+-]?\d+\.?\d*)/);
            if (spreadMatch) {
              formattedDescription = `${selectedTeamName} ${spreadMatch[0]}`;
            }
          } else if (
            mainBetInfo.includes('Moneyline') ||
            mainBetInfo.includes('ML')
          ) {
            formattedDescription = `${selectedTeamName} ML`;
          } else {
            formattedDescription = `${selectedTeamName} ${mainBetInfo
              .replace(selectedTeamName, '')
              .trim()}`.replace(/\s+/g, ' ');
          }
        }
      }

      return {
        id: selection.id || idx,
        sport: (game.sport || 'nba').toUpperCase(),
        homeTeam: game.home_team || '',
        awayTeam: game.away_team || '',
        description: formattedDescription,
        odds: payload.odds_at_bet_time || '-',
        date: game.start_time ? formatUtcToLocalDate(game.start_time) : '-',
        time: game.start_time ? formatUtcToLocalTimeAmPm(game.start_time) : '-',
        status: mapBetStatus(selection.status || bet.status),
        amount: Number(selection.amount || 0),
      };
    });

    const riskAmount = Number(
      bet.total_amount || legs.reduce((sum, leg) => sum + leg.amount, 0),
    );
    const potentialPayout = Number(bet.win_amount || 0);
    const actualPayout =
      betStatus === 'won'
        ? potentialPayout
        : betStatus === 'lost'
          ? 0
          : undefined;

    return {
      id: bet.id,
      type: isParlay ? 'parlay' : 'single',
      status: betStatus,
      createdAt: bet.created_at || new Date().toISOString(),
      riskAmount,
      potentialPayout,
      actualPayout,
      legs,
    };
  });
};

export const useBetTracker = () => {
  const pathname = usePathname();
  const params = useSearchParams() as ReadonlyURLSearchParams;
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const queryClient = useQueryClient();

  const type = params.get('type') || 'active';
  const sortParam = params.get('sort') || '';
  const [activeTab, setActiveTab] = useState(type);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const { mutate: deleteHistory, isPending: isDeleting } = useMutation({
    mutationFn: () => trackerApi.deleteHistory(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['betList'] });
      setShowDeleteConfirm(false);
    },
  });

  const {
    data = [],
    error,
    isLoading,
  } = useQuery({
    queryKey: ['betList', activeTab, sortParam],
    queryFn: () =>
      trackerApi.getBetList({ filter: activeTab, sort: [] } as any),
    enabled: isAuthenticated,
    staleTime: 1000 * 60 * 2,
    refetchInterval: 300000,
    refetchOnMount: 'always',
    retry: 2,
    placeholderData: (prevData) => prevData,
  });

  const { data: allBetsData = [] } = useQuery({
    queryKey: ['betList', 'all'],
    queryFn: () => trackerApi.getBetList({ filter: 'all', sort: [] } as any),
    enabled: isAuthenticated,
    staleTime: 1000 * 60 * 2,
    retry: 2,
  });

  const onChangeTab = (value: string) => {
    if (value === activeTab) return;
    setActiveTab(value);

    let url = pathname;
    if (!value) {
      url = formUrlQuery({ params: params.toString(), keysToRemove: ['type'] });
    } else {
      url = formUrlQuery({ params: params.toString(), key: 'type', value });
    }
    router.replace(url);
  };

  const trackedBets = transformBetsToTrackedBets(data);
  const allTrackedBets = transformBetsToTrackedBets(allBetsData);

  const activeBets = allTrackedBets.filter((b) => b.status === 'pending');
  const completedBets = allTrackedBets.filter((b) => b.status !== 'pending');

  const won = allTrackedBets.filter((b) => b.status === 'won');
  const lost = allTrackedBets.filter((b) => b.status === 'lost');
  const totalWon = won.reduce((acc, b) => acc + (b.actualPayout || 0), 0);
  const totalRisked = [...won, ...lost].reduce(
    (acc, b) => acc + b.riskAmount,
    0,
  );
  const netProfit = totalWon - totalRisked;

  const stats = {
    record: `${won.length}-${lost.length}`,
    netProfit,
    winRate:
      won.length + lost.length > 0
        ? ((won.length / (won.length + lost.length)) * 100).toFixed(1)
        : '0.0',
  };

  return {
    activeTab,
    isLoading,
    error,
    betsToShow: trackedBets,
    activeBets,
    completedBets,
    allTrackedBets,
    stats,
    showDeleteConfirm,
    setShowDeleteConfirm,
    deleteHistory,
    isDeleting,
    onChangeTab,
  };
};
