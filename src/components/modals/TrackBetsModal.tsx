'use client';

import React from 'react';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { z } from 'zod';

import TrackGameCard from '@/components/matchup/TrackGameCard';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { useAuth } from '@/context/AuthContext';
import useModalManager from '@/hooks/useModalManager';
import apiService from '@/services';
import { useStore } from '@/store';
import { IGameWithAI } from '@/types/game';
import { Button } from '@/ui/button';
import Loader from '@/ui/loader';

import GameAnalysisModal from './game-analysis';

const formSchema = z.object({
  // team: z.object(
  //   {
  //     teamId: z.number(),
  //     teamName: z.string(),
  //   },
  //   { required_error: 'Please select a team' },
  // ),

  team: z.string().min(1, 'Please select a team'),
  odds: z.number().positive('Enter valid odds'),
  amount: z.number().positive('Enter valid amount'),
});

const TrackBetsModal = ({
  isOpen,

  onClose,
}: {
  isOpen: boolean;

  onClose: () => void;
}) => {
  const {
    setTrackedGame,
    prefillBets,
    setSelectedGame,
    trackedGame,
    clearPrefillBets,
    isAmerican,
    removePrefillBetById,
  } = useStore();
  const { openModal, closeModal, isModalOpen } = useModalManager();
  const { isAuthenticated } = useAuth();

  console.log(prefillBets);

  const { mutate, isPending: isPendingCreateBet } = useMutation({
    mutationFn: async (body: any) => apiService.createSingleBets(body),

    onSuccess: () => {
      clearPrefillBets();
      toast.success('Bet created successfully');
      onClose();
    },

    onError: (error) => {
      toast.success('Error creating bet');

      console.error('Error creating bet:', error);
    },
  });

  const {
    data,
    mutate: findTeam,
    isPending: isPendingFindTeam,
  } = useMutation({
    mutationFn: async (body: any) => apiService.findTeam(body),

    onError: (error) => {
      toast.success('Something went wrong, please try later');
      console.error('Error find team:', error);
    },
  });

  const onSubmit = async () => {
    if (!trackedGame) return;

    try {
      const bets = prefillBets.map((bet) => {
        if (bet.odds === null) throw new Error('Invalid bet');

        // findTeam(bet.team);

        return {
          selected_team_id: String(1),
          selected_team_name: bet?.team ? bet?.team : '',
          game_id: bet?.game_id,
          nba_game_id: Number(trackedGame?.game?.id),
          odds: bet.odds,
          amount: bet.amount,
          sport: 'nba',
          description: bet.description,
        };
      });

      const totalAmount = bets.reduce((sum, bet) => sum + (bet.amount || 0), 0);

      const body = {
        amount: totalAmount,
        bets,
      };

      mutate(body);
    } catch (error) {
      console.error('Failed to prepare bet submission:', error);
    }
  };

  const isLoading = isPendingCreateBet || isPendingFindTeam;

  // async function onSubmit(values: z.infer<typeof formSchema>) {
  //   const body = {
  //     // selected_team_id: String(values.team.teamId),
  //     selected_team_id: String(1),
  //     // selected_team_name: values.team.teamName,
  //     selected_team_name: values.team,
  //     game_id: 1,
  //     nba_game_id: Number(trackedGame?.game.id),
  //     odds: values.odds,
  //     amount: values.amount,
  //   };

  //   findTeam(values.team);
  //   console.log('data', data);
  //   console.log('body', body);
  //   mutate(body);
  // }

  // useEffect(() => {
  //   clearForm();
  // }, [isOpen, trackedGame]);

  // const clearForm = () => {
  //   if (isOpen && trackedGame) {
  //     form.reset({
  //       team: '',
  //       odds: 0,
  //       amount: 0,
  //     });
  //   }
  // };

  const onClickFullAnalysis = (game: IGameWithAI) => {
    if (!isAuthenticated) {
      openModal('auth');
      return;
    } else {
      setSelectedGame(game);
      openModal('game-analysis');
    }
  };

  const onClickCloseModal = () => {
    closeModal('game-analysis');
    setSelectedGame(null);
  };

  return (
    <>
      <Sheet
        open={true}
        onOpenChange={(open) => !open && onClose()}
        modal={false}
      >
        <SheetContent
          className="bg-surface-secondary border-border flex h-full w-full max-w-[324px] flex-col gap-10 rounded-l-3xl border p-3"
          side="right"
        >
          <div className="align-bottom text-2xl font-medium capitalize">
            Track Bet
          </div>

          {!trackedGame ? (
            <div className="flex h-full items-center justify-center text-3xl">
              Select The Game
            </div>
          ) : (
            <div className="flex flex-1 flex-col gap-3 overflow-auto">
              {prefillBets?.map((bet, index) => (
                <TrackGameCard
                  key={index}
                  index={index}
                  game={trackedGame}
                  onClickFullAnalysis={() => onClickFullAnalysis(trackedGame)}
                  onClickClearTrackBet={() => removePrefillBetById(bet.id)}
                />
              ))}

              {prefillBets.length > 0 && (
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
        </SheetContent>
      </Sheet>

      <GameAnalysisModal
        open={isModalOpen('game-analysis')}
        onClose={onClickCloseModal}
      />
    </>
  );
};

export default TrackBetsModal;
