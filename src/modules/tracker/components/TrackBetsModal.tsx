"use client";

import { TrackGameCard, BetModeSwitch } from "@/modules/matchup";
import { GameAnalysisModal } from "@/modules/game/components/analysis";
import { IGameWithAI } from "@/modules/game/types";
import { Sheet, SheetContent } from "@/shared/components/sheet";
import { useAuthGuard } from "@/modules/auth/hooks";
import useModalManager from "@/shared/hooks/useModalManager";
import { useBetSubmission } from "@/modules/tracker";
import { useStore } from "@/store";
import { Button } from "@/shared/components/button";
import Loader from "@/shared/components/loader";
import { MODAL_IDS } from "@/shared/constants";

const TrackBetsModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
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

  return (
    <>
      <Sheet
        open={isOpen}
        onOpenChange={(open) => !open && onClose()}
        modal={false}
      >
        <SheetContent
          className="bg-surface-secondary flex h-full w-full max-w-[324px] flex-col gap-10 rounded-l-3xl border border-border p-3"
          side="right"
        >
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
                  disabled={isPending}
                  onClick={submitBet}
                  variant="gradient"
                  size="lg"
                >
                  {isPending ? <Loader /> : <>Track Bet</>}
                </Button>
              )}
            </div>
          )}
        </SheetContent>
      </Sheet>

      <GameAnalysisModal
        open={isModalOpen(MODAL_IDS.GAME_ANALYSIS)}
        onClose={onClickCloseModal}
      />
    </>
  );
};

export default TrackBetsModal;
