import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type CategoryItem = {
  label: string;
  value: string;
};

type RoleItem = CategoryItem & { isCoach: boolean };
type TrainingTypeItem = CategoryItem & { sets: number; reps: number; rpe: number };
type CategoryStore = {
  roles: RoleItem[];
  equipments: CategoryItem[];
  cheerTypes: CategoryItem[];
  cheerStyles: CategoryItem[];
  measurementUnits: CategoryItem[];
  strengthSkillTypes: CategoryItem[];
  strengthProblemTypes: CategoryItem[];
  strengthTrainingTypes: TrainingTypeItem[];
  setRoles: (value: RoleItem[]) => void;
  setEquipments: (value: CategoryItem[]) => void;
  setCheerTypes: (value: CategoryItem[]) => void;
  setCheerStyles: (value: CategoryItem[]) => void;
  setMeasurementUnits: (value: CategoryItem[]) => void;
  setStrengthSkillTypes: (value: CategoryItem[]) => void;
  setStrengthProblemTypes: (value: CategoryItem[]) => void;
  setStrengthTrainingTypes: (value: TrainingTypeItem[]) => void;
};

export const useCategoriesStore = create<CategoryStore>()(
  persist(
    (set, get) => {
      return {
        roles: [],
        equipments: [],
        cheerTypes: [],
        cheerStyles: [],
        measurementUnits: [],
        strengthSkillTypes: [],

        strengthProblemTypes: [],
        strengthTrainingTypes: [],
        setRoles: value => set({ roles: value }),
        setEquipments: value => set({ equipments: value }),
        setCheerTypes: value => set({ cheerTypes: value }),
        setCheerStyles: value => set({ cheerStyles: value }),
        setMeasurementUnits: value => set({ measurementUnits: value }),
        setStrengthSkillTypes: value => set({ strengthSkillTypes: value }),
        setStrengthProblemTypes: value => set({ strengthProblemTypes: value }),
        setStrengthTrainingTypes: value => set({ strengthTrainingTypes: value }),
      };
    },
    {
      name: 'category-store',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
