"use client";

import React from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import BetModeSwitch from "@/components/matchup/BetModeSwitch";
import TrackGameCard from "@/components/matchup/TrackGameCard";
import { GameAnalysisModal } from "@/modules/game/components";
import { useAuth } from "@/context/AuthContext";
import useModalManager from "@/hooks/useModalManager";
import apiService from "@/services";
import { useStore } from "@/store";
import { BetPick } from "@/store/slices/matchupSlice";
import { IGameWithAI } from "@/types/game";
import { Button } from "@/shared/components/button";
import { Card } from "@/shared/components/card";
import Loader from "@/shared/components/loader";

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
      if (!isParlay) return apiService.createSingleBets(body);
      if (isParlay) return apiService.createBet(body);
    },
    onSuccess: () => {
      if (isParlay) {
        clearParlay();
        toast.success("Parlay bet created successfully");
      } else {
        clearSingle();
        toast.success("Single bet created successfully");
      }
    },
    onError: (error) => {
      toast.error("Failed to create bet");
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
                  disabled={isLoading}
                  onClick={onSubmit}
                  className="w-full"
                >
                  {isLoading ? <Loader /> : "Track Bet"}
                </Button>
              )}
            </div>
          )}
        </div>
      </Card>

      <GameAnalysisModal
        open={isModalOpen("game-analysis")}
        onClose={onClickCloseModal}
      />
    </>
  );
};

export default TrackBetsAside;
