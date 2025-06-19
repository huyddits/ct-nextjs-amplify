import { ExercisePicker } from '@/app/(in-app)/training/strength/_components';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
export default function ExercisePickerModal({
  isOpen,
  programId,
  onOpenChange,
}: {
  isOpen: boolean;
  programId: number;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your account and remove your
            data from our servers.
          </DialogDescription>
        </DialogHeader>
        <ExercisePicker />
      </DialogContent>
    </Dialog>
  );
}
