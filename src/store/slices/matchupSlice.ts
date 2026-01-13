import { StateCreator } from 'zustand';

import { IGameWithAI } from '@/types/game';
import {
  calcParlayOddsDecimal,
  makeId,
} from '@/utils/convertAmericanToDecimal';

type Sport = 'nba';

export interface BetPick {
  game_id: number;
  odds: number;
  selected_team_id: string;
  selected_team_name: string;
  description: string;
  sport: Sport;
  pid?: string;
  market_type?: string;
  bet_value?: number | null;
  bet_over_under?: string | null;
  bet_player?: string | null;
}

export interface Ticket {
  amount: number;
  win_amount: number;
  bets: BetPick[];
}

interface IMatchupState {
  trackedGame: null | IGameWithAI;
  selectedGame: null | IGameWithAI;

  isParlay: boolean;
  isAmerican: boolean;
  single: Ticket[];
  parlayOdds: number;

  parlay: Ticket;
  setIsAmerican: (val: boolean) => void;

  setTrackedGame: (g: null | IGameWithAI) => void;
  setSelectedGame: (g: null | IGameWithAI) => void;
  setIsParlay: (v: boolean) => void;

  upsertSingle: (pick: BetPick, index?: number) => void;
  setSingleAmount: (index: number, amount: number) => void;
  setSingleWin: (index: number, win: number) => void;
  removeSingle: (index: number) => void;
  clearSingle: () => void;
  removeSingleAndSyncParlay: (index: number) => void;
  removeParlayAndSyncSingle: (key: number | string) => void;

  upsertParlayPick: (pick: BetPick, index?: number) => void;
  removeParlayPick: (key: number | string) => void;
  setParlayAmount: (amount: number) => void;
  setParlayWin: (win: number) => void;
  clearParlay: () => void;
}

const emptyTicket = (): Ticket => ({
  amount: 0,
  win_amount: 0,
  bets: [],
});

export const matchupSlice: StateCreator<IMatchupState> = (set) => ({
  trackedGame: null,
  selectedGame: null,
  isAmerican: true,
  isParlay: false,
  single: [],
  parlay: emptyTicket(),
  parlayOdds: 1,

  setTrackedGame: (trackedGame) => set({ trackedGame }),
  setSelectedGame: (selectedGame) => set({ selectedGame }),
  setIsAmerican: (val) => set({ isAmerican: val }),
  setIsParlay: (v) => set({ isParlay: v }),

  /* SINGLE  */
  upsertSingle: (pick, index) =>
    set((state) => {
      const next = [...state.single];

      const ticketFromPick: Ticket = {
        amount: next[index ?? -1]?.amount ?? 0,
        win_amount: next[index ?? -1]?.win_amount ?? 0,
        bets: [{ ...pick, sport: 'nba' }],
      };

      if (typeof index === 'number' && next[index]) {
        next[index] = ticketFromPick;
        return { single: next };
      }

      if (next.length >= 15) return state;
      next.push(ticketFromPick);
      return { single: next };
    }),

  setSingleAmount: (i, amount) =>
    set((s) => {
      if (!s.single[i]) return s;
      const next = [...s.single];
      next[i] = { ...next[i], amount };
      return { single: next };
    }),

  setSingleWin: (i, win_amount) =>
    set((s) => {
      if (!s.single[i]) return s;
      const next = [...s.single];
      next[i] = { ...next[i], win_amount };
      return { single: next };
    }),

  removeSingle: (i) =>
    set((s) => ({ single: s.single.filter((_, idx) => idx !== i) })),

  removeSingleAll: () => set((_s) => ({ single: [] })),

  clearSingle: () => set({ single: [] }),

  // Sync remove single and parlay (remove from parlay if no duplicates in single)
  removeSingleAndSyncParlay: (index) =>
    set((s) => {
      const singleToRemove = s.single[index];
      if (!singleToRemove) return s;

      const pickToRemove = singleToRemove.bets[0];
      if (!pickToRemove) return s;

      const newSingle = s.single.filter((_, idx) => idx !== index);

      const hasDuplicates = newSingle.some(
        (ticket) =>
          ticket.bets[0]?.description?.trim().toLowerCase() ===
          pickToRemove.description?.trim().toLowerCase(),
      );

      let newParlay = s.parlay;
      let newParlayOdds = s.parlayOdds;

      if (!hasDuplicates) {
        const newParlayBets = s.parlay.bets.filter(
          (b) =>
            b.description?.trim().toLowerCase() !==
            pickToRemove.description?.trim().toLowerCase(),
        );
        newParlay = { ...s.parlay, bets: newParlayBets };
        newParlayOdds = newParlayBets.length
          ? calcParlayOddsDecimal(newParlayBets)
          : 1;
      }

      return {
        single: newSingle,
        parlay: newParlay,
        parlayOdds: newParlayOdds,
      };
    }),

  // Sync remove parlay and single (remove all single picks if delete from parlay)
  removeParlayAndSyncSingle: (key) =>
    set((s) => {
      const parlayToRemove =
        typeof key === 'number'
          ? s.parlay.bets[key]
          : s.parlay.bets.find((b) => b.pid === key);

      if (!parlayToRemove) return s;

      const newParlayBets =
        typeof key === 'number'
          ? s.parlay.bets.filter((_, idx) => idx !== key)
          : s.parlay.bets.filter((b) => b.pid !== key);

      const newParlay = { ...s.parlay, bets: newParlayBets };
      const newParlayOdds = newParlayBets.length
        ? calcParlayOddsDecimal(newParlayBets)
        : 1;

      const newSingle = s.single.filter(
        (ticket) =>
          ticket.bets[0]?.description?.trim().toLowerCase() !==
          parlayToRemove.description?.trim().toLowerCase(),
      );

      return {
        single: newSingle,
        parlay: newParlay,
        parlayOdds: newParlayOdds,
      };
    }),

  /* PARLAY */
  upsertParlayPick: (pick, index) =>
    set((state) => {
      const parlay = { ...state.parlay };

      const normalized: BetPick = {
        ...pick,
        sport: 'nba',
        pid: pick.pid ?? makeId(),
      };
      const normDesc = (s?: string) => (s ?? '').trim().toLowerCase();

      if (typeof index === 'number' && parlay.bets[index]) {
        parlay.bets[index] = normalized;
      } else {
        const j = pick.pid
          ? parlay.bets.findIndex((b) => b.pid === pick.pid)
          : -1;

        if (j !== -1) {
          parlay.bets[j] = { ...parlay.bets[j], ...normalized };
        } else {
          const exists = parlay.bets.some(
            (b) => normDesc(b.description) === normDesc(normalized.description),
          );
          if (exists) {
            return { parlay: state.parlay, parlayOdds: state.parlayOdds };
          }
          if (parlay.bets.length >= 15) return state;
          parlay.bets = [...parlay.bets, normalized];
        }
      }

      const odds = parlay.bets.length ? calcParlayOddsDecimal(parlay.bets) : 1;
      return { parlay, parlayOdds: odds };
    }),

  removeParlayPick: (key: number | string) =>
    set((s) => {
      const bets =
        typeof key === 'number'
          ? s.parlay.bets.filter((_, idx) => idx !== key)
          : s.parlay.bets.filter((b) => b.pid !== key);

      const parlay = { ...s.parlay, bets };
      const odds = bets.length ? calcParlayOddsDecimal(bets) : 1;
      return { parlay, parlayOdds: odds };
    }),

  setParlayAmount: (amount) =>
    set((s) => ({ parlay: { ...s.parlay, amount } })),
  setParlayWin: (win_amount) =>
    set((s) => ({ parlay: { ...s.parlay, win_amount } })),
  clearParlay: () => set({ parlay: emptyTicket(), parlayOdds: 1 }),
});
