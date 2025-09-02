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
import { BetPick } from '@/store/slices/matchupSlice';
import { IGameWithAI } from '@/types/game';
import { Button } from '@/ui/button';
import Loader from '@/ui/loader';

const TrackBetsAside = () => {
  const {
    isParlay,
    single,
    clearSingle,
    parlay,
    clearParlay,
    setSelectedGame,
    trackedGame,
  } = useStore();

  const { openModal, closeModal, isModalOpen } = useModalManager();
  const { isAuthenticated } = useAuth();

  const { mutate, isPending: isPendingCreateBet } = useMutation({
    mutationFn: async (body: any) => {
      console.log(body);
      if (!isParlay) apiService.createSingleBets(body);
      if (isParlay) apiService.createBet(body);
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

  const mapPick = (bet: BetPick) => ({
    game_id: bet.game_id,
    odds: bet.odds,
    selected_team_id: bet.selected_team_id,
    selected_team_name: bet.selected_team_name,
    description: bet.description,
    sport: bet.sport,
  });

  const onSubmit = async () => {
    if (isParlay) {
      if (!parlay || parlay.bets.length === 0) return;

      const payload = {
        amount: parlay.amount ?? 0,
        win_amount: parlay.win_amount ?? 0,
        bets: parlay.bets.map(mapPick),
      };

      console.log('PARLAY payload', payload);
      mutate(payload);
      return;
    }

    if (!single || single.length === 0) return;

    try {
      const payload = {
        bets: single.map((ticket) => ({
          amount: ticket.amount ?? 0,
          win_amount: ticket.win_amount ?? 0,
          bets: ticket.bets.map(mapPick),
        })),
      };

      console.log('SINGLE payload', payload);
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
      <div className="bg-surface-secondary border-border hidden h-full w-full max-w-[324px] min-w-[324px] flex-col gap-10 rounded-3xl border p-4 lg:flex">
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
            {isParlay ? (
              <TrackGameCard
                key="parlay"
                index={0}
                game={trackedGame}
                onClickFullAnalysis={() => onClickFullAnalysis(trackedGame)}
              />
            ) : (
              single.map((_, index) => (
                <TrackGameCard
                  key={index}
                  index={index}
                  game={trackedGame}
                  onClickFullAnalysis={() => onClickFullAnalysis(trackedGame)}
                />
              ))
            )}

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
