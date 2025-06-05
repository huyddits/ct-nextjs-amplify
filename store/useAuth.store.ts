import { STORAGE_KEY } from '@/utils/constants';
import { persist, createJSONStorage } from 'zustand/middleware';
import { create } from 'zustand';
import { type PersonalInfo } from '@/utils/types';

type AuthStore = {
  info: PersonalInfo;
  token: string | null;
  setInfo: (value: PersonalInfo) => void;
  updateInfo: (value: Partial<PersonalInfo>) => void;
  setToken: (value: string | null) => void;
  removeToken: () => void;
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, _get) => {
      return {
        info: null,
        token: null,
        setInfo: value => {
          if (!value) return;
          set({ info: value });
        },
        updateInfo: partial => {
          set(state => ({
            info: state.info ? { ...state.info, ...partial } : null,
          }));
        },
        setToken: value => {
          if (!value) return;
          set({ token: value });
          localStorage.setItem(STORAGE_KEY.TOKEN, value ?? '');
        },
        removeToken: () => {
          set({ token: null });
          localStorage.removeItem(STORAGE_KEY.TOKEN);
        },
      };
    },
    {
      name: 'auth-store',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
