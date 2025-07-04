'use client';
import { AppInput } from '@/components/compose';
import ExerciseItem from './ExerciseItem';
import { type Exercise } from '@/app/(in-app)/training/strength/_hooks';
import { Button } from '@/components/ui/button';
import { useStrengthStore } from '@/store';
import { forwardRef, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react';
import { SearchIcon } from 'lucide-react';
import { debounce } from '@/utils/helpers';
type ExercisesProgramListProps = {
  page: number;
  totalPages: number;
  listExcercises: Exercise[];
  onUpdate?: () => void;
  onLoadMore?: () => void;
  onChangeSearchText: (searchText: string) => void;
};

const ExerciseProgramSection = forwardRef(
  (
    {
      page,
      totalPages,
      listExcercises,
      onUpdate,
      onLoadMore,
      onChangeSearchText,
    }: ExercisesProgramListProps,
    ref
  ) => {
    const { listExercises: listExercisesFromStore, setListExercises: setListExercisesFromStore } =
      useStrengthStore();
    const [listAvailableExercises, setListAvailableExercises] = useState<Exercise[]>([]);

    useEffect(() => {
      setListAvailableExercises(
        listExcercises.filter(item => !listExercisesFromStore.some(({ id }) => item.id === id))
      );
    }, [listExcercises]);

    const onToggle = (item: Exercise, isAdded: boolean) => {
      onUpdate?.();

      if (isAdded) {
        setListExercisesFromStore(prev => [...prev, item]);
        setListAvailableExercises(prev => prev.filter(obj => obj.id !== item.id));
      } else {
        setListExercisesFromStore(prev => prev.filter(({ id }) => id !== item.id));
        if (listExcercises.some(obj => obj.id === item.id)) {
          setListAvailableExercises(prev => [...prev, item]);
        }
      }
    };

    return (
      <div>
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-primary font-medium">
              Available Exercises ({listAvailableExercises.length})
            </h2>
            <AppInput
              onChange={debounce(e => onChangeSearchText(e.target.value), 500)}
              iconPosition="start"
              inputProps={{ placeholder: 'Search exercises...' }}
              icon={<SearchIcon className="w-5 h-5 text-gray-400" />}
              className="w-4/5 max-w-96"
            />
          </div>
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
        {!!listExercisesFromStore.length && (
          <div className="mb-6">
            <h2 className="text-primary font-medium mb-2">
              Added Exercises ({listExercisesFromStore.length})
            </h2>
            <div className="bg-white rounded-lg shadow-sm max-h-95 overflow-y-auto">
              {listExercisesFromStore.map(item => (
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
        )}
      </div>
    );
  }
);

export default ExerciseProgramSection;
