import { StateCreator } from 'zustand';

import { IGameWithAI } from '@/types/game';

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

  prefillTeam: string;
  prefillOdds: number | null;

  setTrackedGame: (trackedGame: null | IGameWithAI) => void;
  setSelectedGame: (selectedGame: null | IGameWithAI) => void;
  setBetInfoField: (field: keyof IMatchupState['betInfo'], value: any) => void;
  setIsAmerican: (val: boolean) => void;
  setPrefillTeam: (team: string) => void;
  setPrefillOdds: (odds: number) => void;
  clearPrefill: () => void;
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
  prefillTeam: '',
  prefillOdds: null,

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
  setPrefillTeam: (team) => set({ prefillTeam: team }),
  setPrefillOdds: (odds) => set({ prefillOdds: odds }),
  clearPrefill: () => set({ prefillTeam: '', prefillOdds: null }),
});
