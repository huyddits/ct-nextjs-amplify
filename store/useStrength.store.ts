import { Exercise } from '@/app/(in-app)/training/strength/_hooks';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { ProgramType } from '@/utils/types';
export type StrengthStore = {
  tabs: { label: string; value: ProgramType }[];
  programType: ProgramType;
  listExercises: Exercise[];
  setProgramType: (value: ProgramType) => void;
  setListExercises: (value: Exercise[]) => void;
};

export const useStrengthStore = create<StrengthStore>()(
  persist(
    (set, get) => {
      return {
        tabs: [
          { value: ProgramType.CheerTrainer, label: 'Cheer Trainer' },
          { value: ProgramType.TeamPrograms, label: 'Team Programs' },
          { value: ProgramType.MyPrograms, label: 'My Programs' },
        ],
        programType: ProgramType.TeamPrograms,
        listExercises: [],
        setProgramType: value => set({ programType: value }),
        setListExercises: value => set({ listExercises: value }),
      };
    },
    {
      name: 'strength-store',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
