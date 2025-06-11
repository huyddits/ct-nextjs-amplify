'use client';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { usePrivateConfirmStore } from '@/store/useConfirm.store';
interface AppConfirmProps {
  className?: string;
}
export default function AppConfirm({ className }: Readonly<AppConfirmProps>) {
  const {
    isOpen,
    title,
    description,
    confirmTitle,
    cancelTitle,
    confirmClass,
    cancelClass,
    setIsOpen,
    onConfirm,
    onCancel,
  } = usePrivateConfirmStore();
  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onCancel} className={cancelClass}>
            {cancelTitle}
          </AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm} className={confirmClass}>
            {confirmTitle}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
