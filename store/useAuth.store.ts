import { create } from 'zustand';

type AuthStore = {
  token: string | null;
  setToken: (value: string) => void;
};

export const useAuthStore = create<AuthStore>((set, _get) => {
  return {
    token: null,
    setToken: value => {
      set({ token: value });
      localStorage.setItem('token', value);
    },
  };
});
