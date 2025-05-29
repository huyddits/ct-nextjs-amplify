// src/store/useCardioStore.ts
'use client';
import { create } from 'zustand';
import { SelectOption } from '@/components/compose/AppSelect.client';

type Interval = {
  duration?: string;
  rpe?: string;
  distance?: string;
  distanceUnit?: string;
  heartRateMin?: string;
  heartRateMax?: string;
};

type ExerciseOption = SelectOption & {
  units: SelectOption[];
};

type CardioStore = {
  intervalsList: Interval[];
  setIntervalsList: (list: Interval[]) => void;
  addInterval: (interval: Interval) => void;
  clearCardioIntervals: () => void;
  exerciseOptions: ExerciseOption[];
  setExerciseOptions: (options: ExerciseOption[]) => void;
  rpeOptions: SelectOption[];
  setRpeOptions: (options: SelectOption[]) => void;
};

export const useCardioStore = create<CardioStore>(set => ({
  intervalsList: [],
  setIntervalsList: list => set({ intervalsList: list }),
  addInterval: interval => set(state => ({ intervalsList: [...state.intervalsList, interval] })),
  clearCardioIntervals: () => set({ intervalsList: [] }),
  exerciseOptions: [],
  setExerciseOptions: options => set({ exerciseOptions: options }),
  rpeOptions: [],
  setRpeOptions: options => set({ rpeOptions: options }),
}));
