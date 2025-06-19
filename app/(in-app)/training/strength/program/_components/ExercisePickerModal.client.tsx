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
  programId?: number;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="w-screen max-w-none! h-full overflow-y-auto p-0 block">
        <DialogHeader className="my-8 pb-0 min-h-0">
          <DialogTitle className="text-center text-primary text-xl">
            {programId ? 'Edit Program' : 'New Program'}
          </DialogTitle>
          <DialogDescription className="text-center w-full">
            Select the exercises you want to add to the program
          </DialogDescription>
        </DialogHeader>
        {isOpen && <ExercisePicker isNested onClose={() => onOpenChange(false)} />}
      </DialogContent>
    </Dialog>
  );
}
