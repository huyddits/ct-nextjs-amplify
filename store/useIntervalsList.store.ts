// src/store/useCardioStore.ts
import { create } from 'zustand';

type Interval = {
  duration?: number;
  rpe?: string;
  distance?: number;
  distance_unit?: string;
  heartRateMin?: number;
  heartRateMax?: number;
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
