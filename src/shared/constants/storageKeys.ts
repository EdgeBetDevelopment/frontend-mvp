export const STORAGE_KEYS = {
  ACCESS_TOKEN: "accessToken",
  REFRESH_TOKEN: "refreshToken",
  TOKEN: "token",
  USER_ID: "userId",
  IS_ADMIN: "isAdmin",
  IS_SUPER_ADMIN: "isSuperAdmin",
} as const;

export const PERSIST_STORAGE_KEYS = {
  AUTH: "auth-storage",
  RECOVERY: "recovery-password-storage",
} as const;

export type StorageKey = (typeof STORAGE_KEYS)[keyof typeof STORAGE_KEYS];
export type PersistStorageKey =
  (typeof PERSIST_STORAGE_KEYS)[keyof typeof PERSIST_STORAGE_KEYS];
