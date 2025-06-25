import { Button } from '@/components/ui/button';
import { CheckIcon, XIcon } from 'lucide-react';

type ExerciseSet = {
  reps: number;
  rpe: number;
  weight: number;
  completed: boolean;
};

type ExerciseSetProps = {
  index: number;
  set: ExerciseSet;
  removeSet: (index: number) => void;
  toggleSetCompletion: (index: number) => void;
  updateSet: (index: number, field: keyof ExerciseSet, value: number) => void;
  totalSet: number;
};

export default function ExerciseSet({
  set,
  index,
  removeSet,
  toggleSetCompletion,
  updateSet,
  totalSet,
}: ExerciseSetProps) {
  return (
    <div key={index} className="bg-white p-4 rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center gap-2">
          <Button
            size="icon"
            variant="ghost"
            onClick={() => removeSet(index)}
            className="text-red-500 size-7"
            disabled={totalSet === 1}
          >
            <XIcon className="h-5 w-5" />
          </Button>
          <span className="font-medium">Set {index + 1}</span>
        </div>
        <button
          onClick={() => toggleSetCompletion(index)}
          className={`p-1.5 rounded-full transition-colors ${
            set.completed ? 'bg-primary text-white' : 'bg-gray-100 text-gray-400'
          }`}
        >
          <CheckIcon className="h-4 w-4" />
        </button>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block text-xs text-gray-500 mb-1">Weight</label>
          <input
            type="number"
            value={set.weight}
            onChange={e => updateSet(index, 'weight', Number(e.target.value))}
            onFocus={e => setTimeout(() => e.target.select(), 100)}
            className="w-full border rounded p-2 text-center"
            placeholder="0"
          />
        </div>
        <div>
          <label className="block text-xs text-gray-500 mb-1">Reps</label>
          <input
            type="number"
            value={set.reps}
            onChange={e => {
              const value = Math.min(100, Math.max(1, Math.round(Number(e.target.value))));
              updateSet(index, 'reps', value);
            }}
            onFocus={e => setTimeout(() => e.target.select(), 100)}
            className="w-full border rounded p-2 text-center"
            placeholder="0"
          />
        </div>
        <div>
          <label className="block text-xs text-gray-500 mb-1">RPE</label>
          <input
            type="number"
            min="5"
            max="10"
            step="1"
            value={set.rpe}
            onChange={e => {
              const value = Math.min(10, Math.max(5, Math.round(Number(e.target.value))));
              updateSet(index, 'rpe', value);
            }}
            onFocus={e => setTimeout(() => e.target.select(), 100)}
            className="w-full border rounded p-2 text-center"
            placeholder="1-10"
          />
        </div>
      </div>
    </div>
  );
}
