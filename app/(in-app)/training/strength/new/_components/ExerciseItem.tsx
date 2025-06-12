'use client';
import React from 'react';
import { PlusIcon, MinusIcon } from 'lucide-react';

export default function ExerciseItem({
  name,
  isAdded,
  imageSrc,
  description,
  onToggle,
}: {
  name: string;
  isAdded: boolean;
  imageSrc: string;
  description: string;
  onToggle: () => void;
}) {
  return (
    <div className="flex items-center justify-between border-b ">
      <div className="flex items-center w-full">
        <div className="flex items-center justify-between p-4 border-b last:border-b-0">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-gray-200 rounded-md mr-3">
              <img src={imageSrc} alt="illustration" />
            </div>
            <div>
              <h3 className="font-medium">{name}</h3>
              <p className="text-sm text-gray-500">{description}</p>
            </div>
          </div>
        </div>
      </div>
      <button onClick={onToggle} className="text-green-800 p-2">
        {isAdded ? (
          <React.Fragment>
            <span className="sr-only">Remove {name}</span>
            <PlusIcon size={24} strokeWidth={2} />
          </React.Fragment>
        ) : (
          <React.Fragment>
            <span className="sr-only">Add {name}</span>
            <MinusIcon size={24} strokeWidth={2} />
          </React.Fragment>
        )}
      </button>
    </div>
  );
}
