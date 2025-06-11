import { Textarea } from '@/components/ui/textarea';

export default function ExerciseNote({
  value,
  onTextChange,
}: {
  value: string;
  onTextChange?: (value: string) => void;
}) {
  return (
    <div className="mb-6">
      <label className="block text-sm font-medium mb-2">Notes</label>
      <Textarea
        placeholder="Add any notes about this workout..."
        className="min-h-[100px]"
        value={value}
        onChange={event => onTextChange?.(event.target.value)}
      />
    </div>
  );
}
