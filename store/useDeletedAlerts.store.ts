import { create } from 'zustand';

type DeletedAlertsState = {
  deletedIds: Set<string>;
  deleteAlert: (id: string) => void;
};

export const useDeletedAlertsStore = create<DeletedAlertsState>(set => ({
  deletedIds: new Set<string>(),
  deleteAlert: (id: string) =>
    set((state: DeletedAlertsState) => {
      const newSet = new Set(state.deletedIds);
      newSet.add(id);
      return { deletedIds: newSet };
    }),
}));
