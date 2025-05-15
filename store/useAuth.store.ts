import { STORAGE_KEY } from '@/utils/constants';
import { create } from 'zustand';

type AuthStore = {
  token: string | null;
  setToken: (value: string | null) => void;
  removeToken: () => void;
};

export const useAuthStore = create<AuthStore>((set, _get) => {
  return {
    token: null,
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
});
