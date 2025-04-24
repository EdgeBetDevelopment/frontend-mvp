'use client';

import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import TrackGameCard from '@/components/matchup/TrackGameCard';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { useStore } from '@/store';
import { Button } from '@/ui/button';
import { Form } from '../../ui/form';

const formSchema = z.object({
  bet: z.string().email(),
});

const TrackBetsModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
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
            <Form {...form}>
              <form
                className="flex h-full flex-col gap-3"
                onSubmit={form.handleSubmit(onSubmit)}
              >
                <div className="flex-1">
                  <TrackGameCard
                    game={trackedGame}
                    onClickFullAnalysis={() => {}}
                    onClickClearTrackBet={() => {}}
                  />
                </div>

                <Button variant="gradient" size="lg">
                  Track Bet
                </Button>
              </form>
            </Form>
          )}
        </SheetContent>
      </Sheet>
    </>
  );
};

export default TrackBetsModal;
