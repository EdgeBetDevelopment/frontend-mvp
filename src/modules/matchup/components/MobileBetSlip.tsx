'use client';

import { useState } from 'react';
import { IGameWithAI } from '@/modules/game/types';
import { GameAnalysisModal } from '@/modules/game/components';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/shared/components/sheet';
import { useAuthGuard } from '@/modules/auth/hooks';
import useModalManager from '@/shared/hooks/useModalManager';
import { useBetSubmission } from '@/modules/tracker';
import { useStore } from '@/store';
import { Button } from '@/shared/components/button';
import Loader from '@/shared/components/loader';
import { MODAL_IDS } from '@/shared/constants';
import { ChevronUp } from 'lucide-react';

import BetModeSwitch from './BetModeSwitch';
import TrackGameCard from './TrackGameCard';

const MobileBetSlip = () => {
  const [open, setOpen] = useState(false);
  const { isParlay, single, setSelectedGame, trackedGame } = useStore();

  const { openModal, closeModal, isModalOpen } = useModalManager();
  const { requireAuth } = useAuthGuard({
    onUnauthenticated: () => openModal(MODAL_IDS.AUTH),
  });

  const { submitBet, isPending, hasItems } = useBetSubmission();

  const onClickFullAnalysis = (game: IGameWithAI) => {
    if (!requireAuth()) return;
    setSelectedGame(game);
    openModal(MODAL_IDS.GAME_ANALYSIS);
  };

  const onClickCloseModal = () => {
    closeModal(MODAL_IDS.GAME_ANALYSIS);
    setSelectedGame(null);
  };

  // Calculate total selections count
  const selectionsCount = trackedGame ? (isParlay ? 1 : single.length) : 0;

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <button className="flex w-full items-center justify-between bg-primary px-5 py-3.5 text-primary-foreground shadow-[0_-4px_20px_rgba(0,0,0,0.3)]">
              <div className="flex items-center gap-3">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary-foreground/20 text-sm font-bold">
                  {selectionsCount}
                </div>
                <span className="text-sm font-semibold">
                  {selectionsCount === 0
                    ? 'Bet Slip'
                    : `${selectionsCount} Selection${selectionsCount > 1 ? 's' : ''}`}
                </span>
              </div>
              <ChevronUp
                className={`h-5 w-5 transition-transform ${open ? 'rotate-180' : ''}`}
              />
            </button>
          </SheetTrigger>
          <SheetContent
            side="bottom"
            className="max-h-[85vh] overflow-y-auto rounded-t-2xl p-0"
          >
            <div className="p-6">
              <SheetHeader>
                <SheetTitle className="mb-4 font-display text-xl font-bold text-foreground">
                  Track Bet
                </SheetTitle>
              </SheetHeader>

              <div className="mb-6">
                <BetModeSwitch />
              </div>

              <div className="max-h-[500px] overflow-y-auto pr-1">
                {!trackedGame ? (
                  <div className="flex min-h-[200px] items-center justify-center">
                    <p className="font-display text-xl text-muted-foreground">
                      Select The Game
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {isParlay ? (
                      <TrackGameCard
                        key="parlay"
                        index={0}
                        game={trackedGame}
                        onClickFullAnalysis={() =>
                          onClickFullAnalysis(trackedGame)
                        }
                      />
                    ) : (
                      single.map((_, index) => (
                        <TrackGameCard
                          key={index}
                          index={index}
                          game={trackedGame}
                          onClickFullAnalysis={() =>
                            onClickFullAnalysis(trackedGame)
                          }
                        />
                      ))
                    )}

                    {hasItems && (
                      <Button
                        disabled={isPending}
                        onClick={submitBet}
                        className="w-full"
                      >
                        {isPending ? <Loader /> : 'Track Bet'}
                      </Button>
                    )}
                  </div>
                )}
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      <GameAnalysisModal
        open={isModalOpen(MODAL_IDS.GAME_ANALYSIS)}
        onClose={onClickCloseModal}
      />
    </>
  );
};

export default MobileBetSlip;
