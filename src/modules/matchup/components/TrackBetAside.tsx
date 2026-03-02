"use client";

import { GameAnalysisModal } from "@/modules/game/components";
import { IGameWithAI } from "@/modules/game/types";
import { useAuthGuard } from "@/modules/auth/hooks";
import useModalManager from "@/shared/hooks/useModalManager";
import { useBetSubmission } from "@/modules/tracker";
import { useStore } from "@/store";
import { MODAL_IDS } from "@/shared/constants";

import BetModeSwitch from "./BetModeSwitch";
import TrackGameCard from "./TrackGameCard";
import { Button } from "@/shared/components/button";
import { Card } from "@/shared/components/card";
import Loader from "@/shared/components/loader";

const TrackBetsAside = () => {
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
      <Card className="sticky top-24 border-border bg-card p-6">
        <h2 className="mb-4 font-display text-xl font-bold text-foreground">
          Track Bet
        </h2>

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
                  className="w-full"
                >
                  {isPending ? <Loader /> : "Track Bet"}
                </Button>
              )}
            </div>
          )}
        </div>
      </Card>

      <GameAnalysisModal
        open={isModalOpen(MODAL_IDS.GAME_ANALYSIS)}
        onClose={onClickCloseModal}
      />
    </>
  );
};

export default TrackBetsAside;
