import { StateCreator } from 'zustand';

import { IGameWithAI } from '@/types/game';

interface IMatchupState {
  trackedGame: null | IGameWithAI;
  selectedGame: null | IGameWithAI;

  betInfo: {
    game_id: number;
    nba_game_id: number;
    odds: number;
    amount: number;
    selected_team_id: string;
    selected_team_name: string;
  };

  setTrackedGame: (trackedGame: null | IGameWithAI) => void;
  setSelectedGame: (selectedGame: null | IGameWithAI) => void;
  setBetInfoField: (field: keyof IMatchupState['betInfo'], value: any) => void;
}

export const matchupSlice: StateCreator<IMatchupState> = (set) => ({
  trackedGame: null,
  selectedGame: null,

  setTrackedGame: (trackedGame) => set({ trackedGame }),
  setSelectedGame: (selectedGame) => set({ selectedGame }),
  setBetInfoField: (field, value) =>
    set((state) => ({
      betInfo: {
        ...state.betInfo,
        [field]: value,
      },
    })),
});
