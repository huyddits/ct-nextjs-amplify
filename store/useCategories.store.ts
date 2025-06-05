import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type CategoryItem = {
  label: string;
  value: string;
};

type RoleItem = CategoryItem & { isCoach: boolean };
type CategoryStore = {
  roles: RoleItem[];
  equipments: CategoryItem[];
  cheerTypes: CategoryItem[];
  cheerStyles: CategoryItem[];
  measurementUnits: CategoryItem[];
  setRoles: (value: RoleItem[]) => void;
  setEquipments: (value: CategoryItem[]) => void;
  setCheerTypes: (value: CategoryItem[]) => void;
  setCheerStyles: (value: CategoryItem[]) => void;
  setMeasurementUnits: (value: CategoryItem[]) => void;
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
        setRoles: value => set({ roles: value }),
        setEquipments: value => set({ equipments: value }),
        setCheerTypes: value => set({ cheerTypes: value }),
        setCheerStyles: value => set({ cheerStyles: value }),
        setMeasurementUnits: value => set({ measurementUnits: value }),
      };
    },
    {
      name: 'category-store',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
