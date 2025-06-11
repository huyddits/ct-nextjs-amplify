'use client';
import ExerciseItem from './ExerciseItem';
import { type Exercise } from '@/app/(in-app)/training/strength/_hooks';
import { useStrengthStore } from '@/store';
import { forwardRef, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react';
type ExercisesProgramListProps = {
  listExcercises: Exercise[];
  onUpdate?: () => void;
};

const ExerciseProgramSection = forwardRef(
  ({ listExcercises, onUpdate }: ExercisesProgramListProps, ref) => {
    const { listExercises: listExercisesFromStore, setListExercises: setListExercisesFromStore } =
      useStrengthStore();
    const [listAvailableExercises, setListAvailableExercises] = useState<Exercise[]>([]);
    const [listAddedExercises, setListAddedExercises] = useState<Exercise[]>([]);
    const [isMounted, setIsMounted] = useState(false);

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

      let supposed: Exercise[] = [];

      if (isAdded) {
        setListAddedExercises(prev => {
          supposed = [...prev, item];
          // return [...prev, item];
          return supposed;
        });
        setListAvailableExercises(prev => prev.filter(obj => obj.id !== item.id));
        setListExercisesFromStore(supposed);
      } else {
        setListAddedExercises(prev => {
          supposed = prev.filter(({ id }) => id !== item.id);
          // return prev.filter(({ id }) => id !== item.id);
          return supposed;
        });
        setListExercisesFromStore(supposed);
        if (listExcercises.some(obj => obj.id === item.id)) {
          setListAvailableExercises(prev => [...prev, item]);
        }
      }
    };

    // useEffect(() => {
    //   setListExercisesFromStore(listAddedExercises);
    // }, [listAddedExercises]);

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
                description={item.description}
                onToggle={() => onToggle(item, true)}
                isAdded={true}
              />
            ))}
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
