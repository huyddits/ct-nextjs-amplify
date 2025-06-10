'use client';
import ExerciseItem from './ExerciseItem';
import { type Exercise } from '@/app/(in-app)/training/strength/_hooks';
import { useStrengthStore } from '@/store';
import { forwardRef, useEffect, useImperativeHandle, useMemo, useState } from 'react';
type ExercisesProgramListProps = {
  listExcercises: Exercise[];
  onUpdate?: () => void;
};

const ExerciseProgramSection = forwardRef(
  ({ listExcercises, onUpdate }: ExercisesProgramListProps, ref) => {
    const [listAllExcercises, setListAllExcercises] = useState<Exercise[]>([]);

    useImperativeHandle(ref, () => ({
      getValue: () => listAllExcercises.filter(item => item.isAdded),
    }));

    useEffect(() => {
      setListAllExcercises(listExcercises);
    }, [listExcercises]);

    const onToggle = (id: number, isAdded: boolean) => {
      onUpdate?.();
      const foundIndex = listExcercises.findIndex(item => item.id === id);
      if (foundIndex > -1) {
        setListAllExcercises(prev => {
          prev[foundIndex].isAdded = isAdded;
          return [...prev];
        });
      }
    };

    const listAddedExcercises = useMemo(() => {
      return listAllExcercises.filter(item => item.isAdded);
    }, [listAllExcercises]);

    const listAvailableExcercises = useMemo(() => {
      return listAllExcercises.filter(item => !item.isAdded);
    }, [listAllExcercises]);

    return (
      <div>
        <div className="mb-6">
          <h2 className="text-primary font-medium mb-2">
            Available Exercises ({listAvailableExcercises.length})
          </h2>
          <div className="bg-white rounded-lg shadow-sm">
            {listAvailableExcercises.map(({ id, name, description }) => (
              <ExerciseItem
                key={id}
                name={name}
                description={description}
                onToggle={() => onToggle(id, true)}
                isAdded={true}
              />
            ))}
          </div>
        </div>
        <div className="mb-6">
          <h2 className="text-primary font-medium mb-2">
            Added Exercises ({listAddedExcercises.length})
          </h2>
          <div className="bg-white rounded-lg shadow-sm">
            {listAddedExcercises.map(({ id, name, description }) => (
              <ExerciseItem
                key={id}
                name={name}
                description={description}
                onToggle={() => onToggle(id, false)}
                isAdded={false}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
);

export default ExerciseProgramSection;
