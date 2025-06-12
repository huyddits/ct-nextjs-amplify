'use client';
import ExerciseItem from './ExerciseItem';
import { type Exercise } from '@/app/(in-app)/training/strength/_hooks';
import { Button } from '@/components/ui/button';
import { useStrengthStore } from '@/store';
import { forwardRef, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react';
type ExercisesProgramListProps = {
  page: number;
  totalPages: number;
  listExcercises: Exercise[];
  onUpdate?: () => void;
  onLoadMore?: () => void;
};

const ExerciseProgramSection = forwardRef(
  ({ page, totalPages, listExcercises, onUpdate, onLoadMore }: ExercisesProgramListProps, ref) => {
    const { listExercises: listExercisesFromStore, setListExercises: setListExercisesFromStore } =
      useStrengthStore();
    const [listAvailableExercises, setListAvailableExercises] = useState<Exercise[]>([]);
    const [listAddedExercises, setListAddedExercises] = useState<Exercise[]>([]);

    useImperativeHandle(ref, () => ({
      getValue: () => listAddedExercises,
    }));

    useEffect(() => {
      setListAddedExercises(listExercisesFromStore);
      setListAvailableExercises(
        listExcercises.filter(item => !listExercisesFromStore.some(({ id }) => item.id === id))
      );
    }, [listExcercises]);

    const onToggle = (item: Exercise, isAdded: boolean) => {
      onUpdate?.();

      if (isAdded) {
        setListAddedExercises(prev => [...prev, item]);
        setListExercisesFromStore(prev => [...prev, item]);
        setListAvailableExercises(prev => prev.filter(obj => obj.id !== item.id));
      } else {
        setListAddedExercises(prev => prev.filter(({ id }) => id !== item.id));
        setListExercisesFromStore(prev => prev.filter(({ id }) => id !== item.id));
        if (listExcercises.some(obj => obj.id === item.id)) {
          setListAvailableExercises(prev => [...prev, item]);
        }
      }
    };

    return (
      <div>
        <div className="mb-6">
          <h2 className="text-primary font-medium mb-2">
            Available Exercises ({listAvailableExercises.length})
          </h2>
          <div className="bg-white rounded-lg shadow-sm">
            {listAvailableExercises.map(item => (
              <ExerciseItem
                key={item.id}
                name={item.name}
                imageSrc={item.imageUrl}
                description={item.description}
                onToggle={() => onToggle(item, true)}
                isAdded={true}
              />
            ))}
          </div>
          <div>
            {page < totalPages && (
              <Button
                variant="ghost"
                className="text-primary hover:text-primary hover:bg-primary/10 w-full my-4"
                onClick={onLoadMore}
              >
                Load more
              </Button>
            )}
          </div>
        </div>
        <div className="mb-6">
          <h2 className="text-primary font-medium mb-2">
            Added Exercises ({listAddedExercises.length})
          </h2>
          <div className="bg-white rounded-lg shadow-sm">
            {listAddedExercises.map(item => (
              <ExerciseItem
                key={item.id}
                name={item.name}
                imageSrc={item.imageUrl}
                description={item.description}
                onToggle={() => onToggle(item, false)}
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
