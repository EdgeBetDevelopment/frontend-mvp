import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface RecoveryState {
  email: string;
  code: string;
  updateField: (
    fieldName: keyof Omit<RecoveryState, 'updateField' | 'clearAll'>,
    value: string,
  ) => void;
  clearAll: () => void;
}

export const useRecoveryStore = create<RecoveryState>()(
  persist(
    (set) => ({
      email: '',
      code: '',

      updateField: (fieldName, value) => {
        set((state) => ({
          ...state,
          [fieldName]: value,
        }));
      },

      clearAll: () => {
        set(() => ({
          email: '',
          code: '',
        }));
      },
    }),
    {
      name: 'recovery-password-storage',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
