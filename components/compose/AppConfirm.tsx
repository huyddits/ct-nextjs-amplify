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
  const { isOpen, title, description, confirmTitle, cancelTitle, setIsOpen, onConfirm, onCancel } =
    usePrivateConfirmStore();
  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onCancel}>{cancelTitle}</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm}>{confirmTitle}</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
