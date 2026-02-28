"use client";

import React from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { z } from "zod";

import { TrackGameCard, BetModeSwitch } from "@/modules/matchup";
import { GameAnalysisModal } from "@/modules/game/components/analysis";
import { IGameWithAI } from "@/modules/game/types";
import { Sheet, SheetContent } from "@/shared/components/sheet";
import { useAuth } from "@/context/AuthContext";
import useModalManager from "@/shared/hooks/useModalManager";
import { trackerApi } from "@/modules/tracker";
import { useStore } from "@/store";
import { BetPick } from "@/store/slices/matchupSlice";
import { Button } from "@/shared/components/button";
import Loader from "@/shared/components/loader";

const formSchema = z.object({
  // team: z.object(
  //   {
  //     teamId: z.number(),
  //     teamName: z.string(),
  //   },
  //   { required_error: 'Please select a team' },
  // ),

  team: z.string().min(1, "Please select a team"),
  odds: z.number().positive("Enter valid odds"),
  amount: z.number().positive("Enter valid amount"),
});

const TrackBetsModal = ({
  isOpen,

  onClose,
}: {
  isOpen: boolean;

  onClose: () => void;
}) => {
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
      if (!isParlay) trackerApi.createSingleBets(body);
      if (isParlay) trackerApi.createBet(body);
    },
    onSuccess: () => {
      if (isParlay) clearParlay();
      else clearSingle();
      toast.success("Bet created successfully");
    },
    onError: (error) => {
      toast.error("Error creating bet");
      console.error("Error creating bet:", error);
    },
  });

  const mapPick = (bet: BetPick) => {
    const description = bet.description || "";

    let marketType = bet.market_type || "";
    let betValue = bet.bet_value ?? 0;
    let betOverUnder = bet.bet_over_under || "";
    let betPlayer = bet.bet_player || "";

    if (!marketType) {
      const marketTypeMatch = description.match(/^(\w+)/);
      marketType = marketTypeMatch ? marketTypeMatch[1] : "";
    }

    if (betValue === 0 || betValue === null) {
      const valueMatch = description.match(/([+-]?\d+\.?\d*)/);
      betValue = valueMatch ? parseFloat(valueMatch[1]) : 0;
    }

    if (!betOverUnder) {
      const overUnderMatch = description
        .toLowerCase()
        .match(/\b(over|under)\b/);
      betOverUnder = overUnderMatch ? overUnderMatch[1] : "";
    }

    const betName = description;

    return {
      game_id: bet.game_id,
      odds: bet.odds,
      selected_team_id: bet.selected_team_id || "",
      selected_team_name: bet.selected_team_name,
      description: {
        market_type: marketType,
        bet_name: betName,
        bet_win_margin_min_value: 0,
        bet_win_margin_max_value: 0,
        bet_value: betValue,
        bet_over_under: betOverUnder,
        bet_team: bet.selected_team_name,
        bet_player: betPlayer,
        bet_coefficient: bet.odds,
        bet_description: description,
      },
      sport: bet.sport,
    };
  };

  const onSubmit = async () => {
    if (isParlay) {
      if (!parlay || parlay?.bets?.length === 0) return;

      const payload = {
        amount: parlay.amount ?? 0,
        win_amount: parlay.win_amount ?? 0,
        bets: parlay?.bets?.map(mapPick),
      };

      console.log("PARLAY payload", payload);
      mutate(payload);
      return;
    }

    if (!single || single.length === 0) return;

    try {
      const payload = {
        bets: single.map((ticket) => ({
          amount: ticket.amount ?? 0,
          win_amount: ticket.win_amount ?? 0,
          bets: ticket?.bets?.map(mapPick),
        })),
      };

      console.log("SINGLE payload", payload);
      mutate(payload);
    } catch (error) {
      console.error("Failed to prepare bet submission:", error);
    }
  };

  const isLoading = isPendingCreateBet;

  const onClickFullAnalysis = (game: IGameWithAI) => {
    if (!isAuthenticated) {
      openModal("auth");
      return;
    }
    setSelectedGame(game);
    openModal("game-analysis");
  };

  const onClickCloseModal = () => {
    closeModal("game-analysis");
    setSelectedGame(null);
  };

  const hasItems = isParlay ? parlay?.bets?.length > 0 : single.length > 0;

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
        open={isModalOpen("game-analysis")}
        onClose={onClickCloseModal}
      />
    </>
  );
};

export default TrackBetsModal;
