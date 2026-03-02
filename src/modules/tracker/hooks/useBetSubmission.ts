"use client";

import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { useStore } from "@/store";
import { handleMutationError } from "@/shared/utils";
import { trackerApi } from "../services";
import { mapPick } from "../utils";
import type { CreateParlayBetPayload, CreateSingleBetsPayload } from "../types";

interface UseBetSubmissionOptions {
  onSuccess?: () => void;
}

export const useBetSubmission = (options: UseBetSubmissionOptions = {}) => {
  const { isParlay, single, clearSingle, parlay, clearParlay } = useStore();

  const { mutate, isPending } = useMutation({
    mutationFn: async (
      body: CreateParlayBetPayload | CreateSingleBetsPayload,
    ) => {
      if (!isParlay) {
        return trackerApi.createSingleBets(body as CreateSingleBetsPayload);
      }
      return trackerApi.createBet(body as CreateParlayBetPayload);
    },
    onSuccess: () => {
      if (isParlay) {
        clearParlay();
        toast.success("Parlay bet created successfully");
      } else {
        clearSingle();
        toast.success("Single bet created successfully");
      }
      options.onSuccess?.();
    },
    onError: (error) => {
      handleMutationError(error, "Failed to create bet");
    },
  });

  const submitBet = () => {
    if (isParlay) {
      if (!parlay || parlay?.bets?.length === 0) return;

      const payload: CreateParlayBetPayload = {
        amount: parlay.amount ?? 0,
        win_amount: parlay.win_amount ?? 0,
        bets: parlay.bets.map(mapPick),
      };

      mutate(payload);
      return;
    }

    if (!single || single.length === 0) return;

    const payload: CreateSingleBetsPayload = {
      bets: single.map((ticket) => ({
        amount: ticket.amount ?? 0,
        win_amount: ticket.win_amount ?? 0,
        bets: ticket.bets.map(mapPick),
      })),
    };

    mutate(payload);
  };

  const hasItems = isParlay ? parlay?.bets?.length > 0 : single.length > 0;

  return {
    submitBet,
    isPending,
    hasItems,
  };
};
