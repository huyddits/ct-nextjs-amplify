'use client';

import { useState } from 'react';
import { CheckIcon, CircleIcon, SearchIcon, XIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

const mockTeam = [
  'Brittney Mach',
  'Chaz Johnson',
  'Nick Lutz',
  'Ross Davis',
  'Steve Roberts',
  'Tori Pimentel',
  'Alex Thompson',
];

type Props = {
  onClose: () => void;
};

export default function WhoCheckOff({ onClose }: Props) {
  const [selected, setSelected] = useState<string[]>([]);

  const toggle = (name: string) => {
    setSelected(prev => (prev.includes(name) ? prev.filter(n => n !== name) : [...prev, name]));
  };

  return (
    <div
      className="fixed inset-0 bg-black/40 z-50 flex justify-center items-center"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-md mx-auto rounded-xl p-4 relative shadow-lg"
        onClick={e => e.stopPropagation()}
      >
        <div className="space-y-4 mt-4">
          {/* Search Bar */}
          <div className="relative">
            <SearchIcon className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
            <input
              placeholder="Search Team"
              className="w-full border border-green-600 rounded-full py-2 pl-10 pr-4"
            />
          </div>

          {/* Header */}
          <div className="flex justify-between text-green-700 font-medium text-sm px-1">
            <button onClick={() => setSelected(mockTeam)}>Select All</button>
            <span>{selected.length} selected</span>
            <button onClick={() => setSelected([])}>Deselect All</button>
          </div>

          {/* Member list */}
          <div className="max-h-56 overflow-y-auto pr-1 space-y-2">
            {mockTeam.map(name => {
              const isSelected = selected.includes(name);
              return (
                <div
                  key={name}
                  onClick={() => toggle(name)}
                  className={`flex justify-between items-center border-2 rounded-full py-2 px-4 cursor-pointer ${
                    isSelected ? 'bg-green-100 border-green-600' : 'border-green-600'
                  }`}
                >
                  <span>{name}</span>
                  {isSelected ? (
                    <div className="w-5 h-5 rounded-full bg-green-600 flex items-center justify-center">
                      <CheckIcon className="w-4 h-4 text-white" />
                    </div>
                  ) : (
                    <CircleIcon className="text-gray-400 w-5 h-5" />
                  )}
                </div>
              );
            })}
          </div>

          {/* Submit Button */}
          <Button className="w-full" size="lg">
            Send Check Off
          </Button>
        </div>
      </div>
    </div>
  );
}
