import { StateCreator } from 'zustand';

import { IGameWithAI } from '@/types/game';

interface IBetPrefill {
  id: string;
  team?: string;
  odds?: number | null;
  description?: string;
  amount?: number;
}

interface IMatchupState {
  trackedGame: null | IGameWithAI;
  selectedGame: null | IGameWithAI;
  isAmerican: boolean;

  betInfo: {
    game_id: number;
    nba_game_id: number;
    odds: number;
    amount: number;
    selected_team_id: string;
    selected_team_name: string;
  };

  prefillBets: IBetPrefill[];

  setTrackedGame: (trackedGame: null | IGameWithAI) => void;
  setSelectedGame: (selectedGame: null | IGameWithAI) => void;
  setBetInfoField: (field: keyof IMatchupState['betInfo'], value: any) => void;
  setIsAmerican: (val: boolean) => void;
  setPrefillBetField: (
    index: number,
    field: keyof IBetPrefill,
    value: any,
  ) => void;
  addOrUpdatePrefillBet: (bet: IBetPrefill, index?: number) => void;
  clearPrefillBets: () => void;
  removePrefillBetById: (id: string) => void;
}

export const matchupSlice: StateCreator<IMatchupState> = (set) => ({
  trackedGame: null,
  selectedGame: null,
  isAmerican: true,
  betInfo: {
    game_id: 0,
    nba_game_id: 0,
    odds: 0,
    amount: 0,
    selected_team_id: '',
    selected_team_name: '',
  },
  prefillBets: [],

  setTrackedGame: (trackedGame) => set({ trackedGame }),
  setSelectedGame: (selectedGame) => set({ selectedGame }),
  setIsAmerican: (val) => set({ isAmerican: val }),
  setBetInfoField: (field, value) =>
    set((state) => ({
      betInfo: {
        ...state.betInfo,
        [field]: value,
      },
    })),

  addOrUpdatePrefillBet: (bet, index) =>
    set((state) => {
      const updated = [...state.prefillBets];

      if (bet.id) {
        const existingIndex = updated.findIndex((b) => b.id === bet.id);
        if (existingIndex !== -1) {
          updated[existingIndex] = { ...updated[existingIndex], ...bet };
          return { prefillBets: updated };
        }
      }

      if (updated.length >= 2) return state;

      const newBet = {
        ...bet,
        id: crypto.randomUUID(),
        amount: bet.amount ?? 0,
      };

      updated.push(newBet);
      return { prefillBets: updated };
    }),

  setPrefillBetField: (index: number, field: keyof IBetPrefill, value: any) =>
    set((state) => {
      const updated = [...state.prefillBets];
      if (!updated[index]) return state;

      updated[index] = {
        ...updated[index],
        [field]: value,
      };

      return { prefillBets: updated };
    }),

  removePrefillBetById: (id: string) =>
    set((state) => ({
      prefillBets: state.prefillBets.filter((bet) => bet.id !== id),
    })),

  clearPrefillBets: () => set({ prefillBets: [] }),
});
