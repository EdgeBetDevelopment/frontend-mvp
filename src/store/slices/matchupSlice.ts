import { StateCreator } from 'zustand';

import { IGameWithAI } from '@/types/game';

type Sport = 'nba';

export interface BetPick {
  game_id: number;
  odds: number;
  selected_team_id: string;
  selected_team_name: string;
  description: string;
  sport: Sport;
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

  upsertParlayPick: (pick: BetPick, index?: number) => void;
  removeParlayPick: (index: number) => void;
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

      if (next.length >= 2) return state;
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
  clearSingle: () => set({ single: [] }),

  /* PARLAY */
  upsertParlayPick: (pick, index) =>
    set((state) => {
      const parlay = { ...state.parlay };
      const normalized: BetPick = { sport: 'nba', ...pick };

      if (typeof index === 'number' && parlay.bets[index]) {
        parlay.bets[index] = normalized;
        return { parlay };
      }

      if (parlay.bets.length >= 3) return state;
      parlay.bets = [...parlay.bets, normalized];
      return { parlay };
    }),

  removeParlayPick: (i) =>
    set((s) => {
      const parlay = {
        ...s.parlay,
        bets: s.parlay.bets.filter((_, idx) => idx !== i),
      };
      return { parlay };
    }),

  setParlayAmount: (amount) =>
    set((s) => ({ parlay: { ...s.parlay, amount } })),
  setParlayWin: (win_amount) =>
    set((s) => ({ parlay: { ...s.parlay, win_amount } })),
  clearParlay: () => set({ parlay: emptyTicket() }),
});
