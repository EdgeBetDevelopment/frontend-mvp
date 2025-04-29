import { StateCreator } from 'zustand';

import { IGame } from '@/types/game';

interface IMatchupState {
  trackedGame: null | IGame;
  selectedGame: null | IGame;
  betInfo: {
    game_id: number;
    nba_game_id: number;
    odds: number;
    amount: number;
    selected_team_id: string;
    selected_team_name: string;
  };

  setTrackedGame: (trackedGame: null | IGame) => void;
  setSelectedGame: (selectedGame: null | IGame) => void;
  setBetInfoField: (field: keyof IMatchupState['betInfo'], value: any) => void;
}

export const matchupSlice: StateCreator<IMatchupState> = (set) => ({
  trackedGame: null,
  selectedGame: null,
  betInfo: {
    game_id: 1,
    nba_game_id: 1,
    odds: 0,
    amount: 0,
    selected_team_id: '1610612739',
    selected_team_name: 'Cavaliers',
  },

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
