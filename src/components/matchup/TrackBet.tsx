'use client';

import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import TrackGameCard from '@/components/matchup/TrackGameCard';
import { Button } from '@/ui/button';
import { useStore } from '@/store';
import { IGame } from '@/types/game';
import { Form } from '../../ui/form';

const formSchema = z.object({
  bet: z.string().email(),
});

const TrackBet = ({
  onClickFullAnalysis,
  onClickClearTrackBet,
}: {
  onClickFullAnalysis: (game: IGame) => void;
  onClickClearTrackBet: () => void;
}) => {
  const { trackedGame } = useStore();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      bet: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const body = {
      bet: values.bet,
    };

    //something
  }

  return (
    <div className="bg-surface-secondary border-border h-full w-full max-w-[324px] rounded-3xl border p-3">
      {!trackedGame ? (
        <div className="flex h-full items-center justify-center text-3xl">
          Select The Game
        </div>
      ) : (
        <Form {...form}>
          <form
            className="flex h-full flex-col gap-3"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <div className="flex-1">
              <TrackGameCard
                game={trackedGame}
                onClickFullAnalysis={() => onClickFullAnalysis(trackedGame)}
                onClickClearTrackBet={onClickClearTrackBet}
              />
            </div>

            <Button variant="gradient" size="lg">
              Track Bet
            </Button>
          </form>
        </Form>
      )}
    </div>
  );
};

export default TrackBet;
