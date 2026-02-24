import { create } from "zustand";
import { devtools } from "zustand/middleware";

import { matchupSlice } from "./slices/matchupSlice";

type MatchupState = ReturnType<typeof matchupSlice>;

type IStore = MatchupState;

export const useStore = create<IStore>()(
  devtools((...a) => ({
    ...matchupSlice(...a),
  })),
);
