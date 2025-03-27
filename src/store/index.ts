import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { matchupSlice } from './slices/matchupSlice';

type AuthState = ReturnType<typeof matchupSlice>;

type IStore = AuthState;

export const useStore = create<IStore>()(
  devtools((...a) => ({
    ...matchupSlice(...a),
  })),
);
