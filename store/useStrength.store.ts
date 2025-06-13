import { Exercise } from '@/app/(in-app)/training/strength/_hooks';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { ProgramType } from '@/utils/types';

type Updater = (value: Exercise[]) => Exercise[];
type WorkoutSession = {};
export type StrengthStore = {
  tabs: { label: string; value: ProgramType }[];
  workoutSession: WorkoutSession;
  programType: ProgramType;
  listExercises: Exercise[];
  setWorkoutSession: (value: WorkoutSession) => void;
  setProgramType: (value: ProgramType) => void;
  setListExercises: (value: Exercise[] | Updater) => void;
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
        setListExercises: valueOrUpdater => {
          if (typeof valueOrUpdater === 'function') {
            set(state => ({ listExercises: valueOrUpdater(state.listExercises) }));
          } else {
            set(state => ({ listExercises: valueOrUpdater }));
          }
        },
        workoutSession: {},
        setWorkoutSession: () => {},
      };
    },
    {
      name: 'strength-store',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
