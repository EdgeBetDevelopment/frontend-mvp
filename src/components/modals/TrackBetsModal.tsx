'use client';

import React, { useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { FormProvider, useForm } from 'react-hook-form';
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
import { Form } from '../../ui/form';
import GameAnalysisModal from '../matchup/modals/GameAnalysisModal';

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
  const { setTrackedGame, setSelectedGame, trackedGame } = useStore();
  const { openModal, closeModal, isModalOpen } = useModalManager();
  const { isAuthenticated } = useAuth();

  const { mutate } = useMutation({
    mutationFn: async (body: any) => apiService.createBet(body),
    onSuccess: () => {
      form.reset();
      toast.success('Bet created successfully');
      onClose();
    },
    onError: (error) => {
      toast.success('Error creating bet');
      console.error('Error creating bet:', error);
    },
  });

  const { data, mutate: findTeam } = useMutation({
    mutationFn: async (body: any) => apiService.findTeam(body),

    onError: (error) => {
      toast.success('Something went wrong, please try later');
      console.error('Error find team:', error);
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      team: '',
      odds: 0,
      amount: 0,
    },
    mode: 'onChange',
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const body = {
      selected_team_id: String(1),
      selected_team_name: values.team,
      game_id: 1,
      nba_game_id: Number(trackedGame?.game.id),
      odds: values.odds,
      amount: values.amount,
    };

    try {
      const result = await findTeam(values.team);
      console.log('findTeam result:', result);

      mutate(body);
    } catch (error) {
      console.error('Failed to find team, not mutating');
    }
  }

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

  useEffect(() => {
    clearForm();
  }, [isOpen, trackedGame]);

  const clearForm = () => {
    if (isOpen && trackedGame) {
      form.reset({
        team: '',
        odds: 0,
        amount: 0,
      });
    }
  };

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
      <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()} modal>
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
            <FormProvider {...form}>
              <Form {...form}>
                <form
                  className="flex h-full flex-col gap-3"
                  onSubmit={form.handleSubmit(onSubmit)}
                >
                  <div className="flex-1">
                    <TrackGameCard
                      game={trackedGame}
                      onClickFullAnalysis={() =>
                        onClickFullAnalysis(trackedGame)
                      }
                      onClickClearTrackBet={() => {}}
                    />
                  </div>

                  <Button type="submit" variant="gradient" size="lg">
                    Track Bet
                  </Button>
                </form>
              </Form>
            </FormProvider>
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
