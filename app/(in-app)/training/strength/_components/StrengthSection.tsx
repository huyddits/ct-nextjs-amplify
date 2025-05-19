import { Copy, Pencil, Trash2, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const allPrograms = [
  {
    id: '1',
    name: 'Balance',
    content: 'Single Leg RDL, Bosu Ball Squats, Plank Walks',
    lastCompleted: 'Saturday, January 25, 2025',
  },
  {
    id: '2',
    name: 'Leg Power',
    content: 'Box Jumps, Bulgarian Split Squats, Calf Raises',
    lastCompleted: 'Friday, January 24, 2025',
  },
  {
    id: '2',
    name: 'Leg Power',
    content: 'Box Jumps, Bulgarian Split Squats, Calf Raises',
    lastCompleted: 'Friday, January 24, 2025',
  },
  {
    id: '3',
    name: 'Upper Body Strength',
    content: 'Push-ups, Pull-ups, Shoulder Press, Tricep Dips',
    lastCompleted: 'Tuesday, January 21, 2025',
  },
  {
    id: '2',
    name: 'Core Stability',
    content: 'Planks, Russian Twists, Bicycle Crunches, Dead Bugs',
    lastCompleted: 'Monday, January 20, 2025',
  },
];

export default function ProgramGroupSection() {
  return (
    <section>
      <div className="space-y-4">
        {allPrograms.map(program => (
          <Card key={program.id} className="p-4 rounded-xl shadow-sm">
            <div className="flex justify-between items-start">
              <div className="flex-1 pr-4">
                <h3 className="text-base font-semibold text-gray-900">{program.name}</h3>
                <p className="text-sm text-gray-600 mt-1">
                  <span className="text-gray-500 font-medium">Exercises:</span> {program.content}
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  Completed Last on: {program.lastCompleted}
                </p>
              </div>

              <div className="flex space-x-2">
                <button className="p-2 text-gray-400 hover:text-gray-600">
                  <Copy className="h-5 w-5 stroke-[1.5]" />
                </button>
                <button className="p-2 text-gray-400 hover:text-gray-600">
                  <Pencil className="h-5 w-5" />
                </button>
                <button className="p-2 text-gray-400 hover:text-red-600">
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="mt-3 pt-2 text-right">
              <Button
                variant="outline"
                size="sm"
                className="text-xs border-[#257951] text-[#257951] hover:bg-[#f0f9f4] hover:text-[#257951]"
              >
                <Play className="h-3 w-3 mr-1" />
                Start
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
