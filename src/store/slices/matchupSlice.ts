import { StateCreator } from 'zustand';

import { IGame } from '@/types/game';

interface IMatchupState {
  trackedGame: null | IGame;
  selectedGame: null | IGame;

  setTrackedGame: (trackedGame: null | IGame) => void;
  setSelectedGame: (selectedGame: null | IGame) => void;
}

export const matchupSlice: StateCreator<IMatchupState> = (set) => ({
  trackedGame: null,
  selectedGame: null,

  setTrackedGame: (trackedGame) => set({ trackedGame }),
  setSelectedGame: (selectedGame) => set({ selectedGame }),
});
