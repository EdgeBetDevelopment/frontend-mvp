'use client';

import React from 'react';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import BetModeSwitch from '@/components/matchup/BetModeSwitch';
import TrackGameCard from '@/components/matchup/TrackGameCard';
import GameAnalysisModal from '@/components/modals/game-analysis';
import { useAuth } from '@/context/AuthContext';
import useModalManager from '@/hooks/useModalManager';
import apiService from '@/services';
import { useStore } from '@/store';
import { IGameWithAI } from '@/types/game';
import { Button } from '@/ui/button';
import Loader from '@/ui/loader';

const TrackBetsAside = () => {
  const {
    isParlay,
    single,
    clearSingle,
    removeSingle,
    parlay,
    clearParlay,
    removeParlayPick,
    setSelectedGame,
    trackedGame,
  } = useStore();

  const { openModal, closeModal, isModalOpen } = useModalManager();
  const { isAuthenticated } = useAuth();

  const { mutate, isPending: isPendingCreateBet } = useMutation({
    mutationFn: async (body: any) => {
      console.log(body);
      apiService.createSingleBets(body);
    },
    onSuccess: () => {
      if (isParlay) clearParlay();
      else clearSingle();
      toast.success('Bet created successfully');
    },
    onError: (error) => {
      toast.error('Error creating bet');
      console.error('Error creating bet:', error);
    },
  });

  const buildBody = () => {
    if (!trackedGame) return null;

    if (isParlay) {
      const bets = parlay.bets.map((b) => ({
        selected_team_id: String(b.selected_team_id ?? ''),
        selected_team_name: b.selected_team_name ?? '',
        game_id: b.game_id,
        nba_game_id: Number(trackedGame?.game?.id),
        odds: b.odds,
        amount: parlay.amount,
        sport: b.sport ?? 'nba',
        description: b.description ?? '',
      }));

      return {
        amount: parlay.amount ?? 0,
        bets,
      };
    }

    const bets = single
      .filter((t) => t.bets[0])
      .map((t) => {
        const b = t.bets[0];
        return {
          selected_team_id: String(b.selected_team_id ?? ''),
          selected_team_name: b.selected_team_name ?? '',
          game_id: b.game_id,
          nba_game_id: Number(trackedGame?.game?.id),
          odds: b.odds,
          amount: t.amount ?? 0,
          sport: b.sport ?? 'nba',
          description: b.description ?? '',
        };
      });

    const totalAmount = single.reduce((sum, t) => sum + (t.amount || 0), 0);

    return {
      amount: totalAmount,
      bets,
    };
  };

  const onSubmit = async () => {
    if (!single || single.length === 0) return;

    try {
      const payload = {
        bets: single.map((ticket) => ({
          amount: ticket.amount ?? 0,
          win_amount: ticket.win_amount ?? 0,
          bets: ticket.bets.map((bet) => ({
            game_id: bet.game_id,
            odds: bet.odds,
            selected_team_id: bet.selected_team_id,
            selected_team_name: bet.selected_team_name,
            description: bet.description,
            sport: bet.sport,
          })),
        })),
      };

      console.log(payload);
      mutate(payload);
    } catch (error) {
      console.error('Failed to prepare bet submission:', error);
    }
  };

  const isLoading = isPendingCreateBet;

  const onClickFullAnalysis = (game: IGameWithAI) => {
    if (!isAuthenticated) {
      openModal('auth');
      return;
    }
    setSelectedGame(game);
    openModal('game-analysis');
  };

  const onClickCloseModal = () => {
    closeModal('game-analysis');
    setSelectedGame(null);
  };

  const hasItems = isParlay ? parlay.bets.length > 0 : single.length > 0;

  return (
    <>
      <div className="bg-surface-secondary border-border flex h-full w-full max-w-[324px] min-w-[324px] flex-col gap-10 rounded-3xl border p-4">
        <div className="flex flex-col gap-5 align-bottom text-2xl font-medium capitalize">
          <p>Track Bet</p>
          <BetModeSwitch />
        </div>

        {!trackedGame ? (
          <div className="flex h-full items-center justify-center text-3xl">
            Select The Game
          </div>
        ) : (
          <div className="flex flex-1 flex-col gap-3 overflow-auto">
            {isParlay
              ? parlay.bets.map((_, index) => (
                  <TrackGameCard
                    key={index}
                    index={index}
                    game={trackedGame}
                    onClickFullAnalysis={() => onClickFullAnalysis(trackedGame)}
                    onClickClearTrackBet={() => removeParlayPick(index)}
                  />
                ))
              : single.map((_, index) => (
                  <TrackGameCard
                    key={index}
                    index={index}
                    game={trackedGame}
                    onClickFullAnalysis={() => onClickFullAnalysis(trackedGame)}
                    onClickClearTrackBet={() => removeSingle(index)}
                  />
                ))}

            {hasItems && (
              <Button
                disabled={isLoading}
                onClick={onSubmit}
                variant="gradient"
                size="lg"
              >
                {isLoading ? <Loader /> : <>Track Bet</>}
              </Button>
            )}
          </div>
        )}
      </div>

      <GameAnalysisModal
        open={isModalOpen('game-analysis')}
        onClose={onClickCloseModal}
      />
    </>
  );
};

export default TrackBetsAside;
