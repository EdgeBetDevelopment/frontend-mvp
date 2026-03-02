export const MODAL_IDS = {
  AUTH: "auth",
  TRACK_BET: "track-bet",
  GAME_ANALYSIS: "game-analysis",
  COMING_SOON: "coming-soon",
} as const;

export type ModalId = (typeof MODAL_IDS)[keyof typeof MODAL_IDS];
