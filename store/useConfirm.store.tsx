import { create } from 'zustand';

type ConfirmOptions = {
  title: string;
  description: string;
  cancelTitle?: string;
  confirmTitle?: string;

  onConfirm?: () => void;
  onCancel?: () => void;
};
type ConfirmPrivateStore = {
  isOpen: boolean;
  title: string;
  description: string;
  confirmTitle: string;
  cancelTitle: string;
  onConfirm: () => void;
  onCancel: () => void;
  setIsOpen: (value: boolean) => void;
  confirm: (options: ConfirmOptions) => void;
};

export const usePrivateConfirmStore = create<ConfirmPrivateStore>((set, get) => {
  return {
    isOpen: false,
    title: 'Confirm Title',
    description: 'Confirm Description',
    confirmTitle: '',
    cancelTitle: '',
    onConfirm: () => {},
    onCancel: () => {},
    setIsOpen: value => set({ isOpen: value }),
    confirm: (options: ConfirmOptions) => {
      set({
        isOpen: true,
        title: options?.title ?? 'Confirm Title',
        description: options?.description ?? 'Confirm Description',
        cancelTitle: options?.cancelTitle ?? 'Cancel',
        confirmTitle: options?.confirmTitle ?? 'Confirm',

        onCancel: () => {
          options?.onCancel?.();
          set({ isOpen: false });
        },
        onConfirm: () => {
          options?.onConfirm?.();
          set({ isOpen: false });
        },
      });
    },
  };
});

type ConfirmStore = Pick<ConfirmPrivateStore, 'confirm'>;

export const useConfirmStore = () => {
  const state = usePrivateConfirmStore();
  return { confirm: state.confirm };
};
