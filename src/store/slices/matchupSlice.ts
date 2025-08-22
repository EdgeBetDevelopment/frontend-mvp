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
  clearSingle: () => set({ single: [] }),

  /* PARLAY */
  upsertParlayPick: (pick, index) =>
    set((state) => {
      const parlay = { ...state.parlay };

      const normalized: BetPick = {
        sport: 'nba',
        ...pick,
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
