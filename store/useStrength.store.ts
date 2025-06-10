import { Exercise } from '@/app/(in-app)/training/strength/_hooks';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export enum TabsValue {
  CheerTrainer = 'cheer_trainer',
  TeamPrograms = 'team_program',
  MyPrograms = 'personal_program',
}

export type StrengthStore = {
  tabs: { label: string; value: TabsValue }[];
  programType: string;
  listExercises: Exercise[];
  setProgramType: (value: string) => void;
  setListExercises: (value: Exercise[]) => void;
};

export const useStrengthStore = create<StrengthStore>()(
  persist(
    (set, get) => {
      return {
        tabs: [
          { value: TabsValue.CheerTrainer, label: 'Cheer Trainer' },
          { value: TabsValue.TeamPrograms, label: 'Team Programs' },
          { value: TabsValue.MyPrograms, label: 'My Programs' },
        ],
        programType: TabsValue.TeamPrograms,
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
