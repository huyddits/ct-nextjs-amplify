// src/store/useCardioStore.ts
import { create } from 'zustand';

type Interval = {
  duration?: string;
  rpe?: string;
  distance?: string;
  distance_unit?: string;
  heartRateMin?: string;
  heartRateMax?: string;
};

type CardioStore = {
  intervalsList: Interval[];
  setIntervalsList: (list: Interval[]) => void;
  addInterval: (interval: Interval) => void;
  clearIntervals: () => void;
};

export const useIntervalsCardioStore = create<CardioStore>(set => ({
  intervalsList: [],
  setIntervalsList: list => set({ intervalsList: list }),
  addInterval: interval => set(state => ({ intervalsList: [...state.intervalsList, interval] })),
  clearIntervals: () => set({ intervalsList: [] }),
}));
