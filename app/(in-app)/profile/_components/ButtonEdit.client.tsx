import { Button } from '@/components/ui/button';
import { PencilIcon, SaveIcon } from 'lucide-react';

export default function ButtonEdit({
  isEditing,
  onClick,
}: Readonly<{ isEditing?: boolean; onClick?: () => void }>) {
  return (
    <div className="flex justify-end">
      <Button
        variant="ghost"
        className="size-8 rounded-full p-0! text-primary!"
        size="icon"
        aria-label={isEditing ? 'Save changes' : 'Edit profile'}
        onClick={onClick}
      >
        {isEditing ? <SaveIcon className="h-5! w-5!" /> : <PencilIcon className="h-5! w-5!" />}
      </Button>
    </div>
  );
}
