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
type DraftType = {
  exercise: string;
  notes: string;
  intervals: Interval[];
};

const DEFAULT_FORM: DraftType = {
  exercise: '1',
  notes: '',
  intervals: [
    {
      duration: '',
      rpe: '0',
      distance: '',
      distanceUnit: '',
      heartRateMin: '',
      heartRateMax: '',
    },
  ],
};

type CardioStore = {
  intervalsList: Interval[];
  setIntervalsList: (list: Interval[]) => void;
  addInterval: (interval: Interval) => void;
  exerciseOptions: ExerciseOption[];
  setExerciseOptions: (options: ExerciseOption[]) => void;
  rpeOptions: SelectOption[];
  setRpeOptions: (options: SelectOption[]) => void;
  draft: DraftType;
  setDraft: (values: DraftType) => void;
  clearCardioSession: () => void;
};

export const useCardioStore = create<CardioStore>(set => ({
  intervalsList: [],
  setIntervalsList: list => set({ intervalsList: list }),
  addInterval: interval => set(state => ({ intervalsList: [...state.intervalsList, interval] })),
  exerciseOptions: [],
  setExerciseOptions: options => set({ exerciseOptions: options }),
  rpeOptions: [],
  setRpeOptions: options => set({ rpeOptions: options }),
  draft: JSON.parse(JSON.stringify(DEFAULT_FORM)),
  setDraft: values => set({ draft: JSON.parse(JSON.stringify(values)) }),
  clearCardioSession: () => set({ intervalsList: [], draft: { ...DEFAULT_FORM } }),
}));
