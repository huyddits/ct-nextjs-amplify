'use client';

import type React from 'react';

import { useEffect, useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { InfoIcon, PlusIcon, Trash2Icon, MinusIcon } from 'lucide-react';
import { useProgramForm } from '../../_hooks';
import { AppInput, AppSelect } from '@/components/compose';
import { PageHeader } from '@/app/(in-app)/_components';
import { Controller } from 'react-hook-form';
import { useStrengthStore } from '@/store';
import { MAXIMUM_SETS_PER_EXERCISE } from '@/utils/constants';
import ExercisePickerModal from './ExercisePickerModal.client';
import TrainingTypeInfoModal from './TrainingTypeInfoModal';

export default function ProgramDetail({ programId }: { programId?: string }) {
  const {
    control,
    template,
    programName,
    trainingTypeOptions,
    isOpenExercisePicker,
    onAddExercise,
    onRemoveExercise,
    onAddSetToExercise,
    onRemoveSetFromExercise,
    onUpdateSetFromExercise,
    onSubmitCreate,
    onSubmitUpdate,
    setIsOpenExercisePicker,
    loading,
  } = useProgramForm({ id: programId });
  const { listExercises: listExercisesFromStore, setListExercises: setListExercisesFromStore } =
    useStrengthStore();

  const [isOpenInfo, setIsOpenInfo] = useState(false);

  const templateInfo = useMemo(() => {
    return `${template?.sets} sets x ${template?.reps} reps x ${template?.rpe} RPE`;
  }, [template]);

  useEffect(() => {
    if (!isOpenExercisePicker) {
      // auto fill new exercise was add but without sets set
      // with the current template
      if (listExercisesFromStore.some(item => !item.sets?.length)) {
        setListExercisesFromStore(prev =>
          prev.map(item => {
            if (item.sets?.length) return item;
            return {
              ...item,
              sets: Array.from({ length: template?.sets ?? 0 }).map(() => ({
                reps: template?.reps ?? 0,
                rpe: template?.rpe ?? 0,
              })),
            };
          })
        );
      }
    }
  }, [isOpenExercisePicker]);
  return (
    <div className="padding-bottom-app padding-top-app container">
      <PageHeader title="Program Editor" allowBack />

      <div className="pb-[80px]">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-lg shadow p-4 mb-4">
            <Controller
              control={control}
              name="programName"
              render={({ field, fieldState: { error } }) => (
                <AppInput
                  label="Program Name"
                  inputProps={{ placeholder: 'Enter program name' }}
                  errorMessage={error?.message}
                  className="mb-6"
                  {...field}
                />
              )}
            />

            <Controller
              control={control}
              name="trainingType"
              render={({ field: { value, onChange }, fieldState: { error } }) => (
                <>
                  <AppSelect
                    label={
                      <label className="flex items-center">
                        Training Type{' '}
                        <InfoIcon
                          className="h-4 w-4 ml-2 text-gray-400"
                          onClick={() => setIsOpenInfo(true)}
                        />
                      </label>
                    }
                    options={trainingTypeOptions}
                    selectedValue={value}
                    onChangeSelected={selectedValue => {
                      const setTemplate = trainingTypeOptions.find(
                        item => item.value === selectedValue
                      );
                      onChange(selectedValue);
                      setListExercisesFromStore(prev =>
                        prev.map(item => ({
                          ...item,
                          sets: item.sets?.map(o => ({
                            reps: setTemplate?.reps ?? 0,
                            rpe: setTemplate?.rpe ?? 0,
                          })),
                        }))
                      );
                    }}
                    errorMessage={error?.message}
                    fullWidth
                  />
                  <div className="mt-2 text-sm text-gray-600">{templateInfo}</div>
                </>
              )}
            />

            <div className="h-6" />

            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-primary">Selected Exercises</h3>
                <Button
                  variant="ghost"
                  className="text-primary hover:text-primary hover:bg-primary/10"
                  onClick={onAddExercise}
                >
                  <PlusIcon />
                  Add Exercise
                </Button>
              </div>

              {listExercisesFromStore.map((item, index) => (
                <div key={item.id} className="border border-gray-200 rounded-lg mb-4">
                  <div className="flex justify-between items-center p-4 bg-gray-50 rounded-t-lg">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gray-200 rounded mr-3">
                        {!!item.imageUrl && (
                          <img
                            src={item.imageUrl}
                            alt="illustration"
                            className="w-full h-full object-cover"
                          />
                        )}
                      </div>
                      <div>
                        <h4 className="font-medium">{item.name}</h4>
                        <p className="text-sm text-gray-500">{item.targetMuscles}</p>
                      </div>
                    </div>

                    <Button
                      variant="ghost"
                      className="text-red-500 hover:text-red-500 hover:bg-red-50"
                      size="icon"
                      onClick={() => onRemoveExercise(item.id)}
                    >
                      <Trash2Icon className="w-6! h-6!" />
                    </Button>
                  </div>

                  <div className="p-4">
                    {(item.sets || []).map((set, setIndex) => (
                      <div key={item.id + setIndex} className="flex items-center mb-3">
                        <div className="w-12 text-gray-500">Set {setIndex + 1}</div>
                        <div className="flex-1 grid grid-cols-7 gap-2 items-center">
                          <div className="col-span-2">
                            <input
                              type="number"
                              value={set.reps}
                              onChange={e =>
                                onUpdateSetFromExercise(
                                  item.id,
                                  setIndex,
                                  'reps',
                                  Number.parseInt(e.target.value) || 0
                                )
                              }
                              onFocus={e => setTimeout(() => e.target.select(), 100)}
                              className="w-full p-2 border border-gray-300 rounded text-center"
                            />
                          </div>
                          <div className="text-gray-500 text-center">reps</div>
                          <div className="col-span-2">
                            <input
                              type="number"
                              value={set.rpe}
                              onChange={e =>
                                onUpdateSetFromExercise(
                                  item.id,
                                  setIndex,
                                  'rpe',
                                  Number.parseInt(e.target.value) || 0
                                )
                              }
                              onFocus={e => setTimeout(() => e.target.select(), 100)}
                              className="w-full p-2 border border-gray-300 rounded text-center"
                            />
                          </div>
                          <div className="text-gray-500 text-center">RPE</div>
                          <div className="flex justify-end">
                            <Button
                              variant="ghost"
                              className="rounded-full text-red-500 hover:bg-red-50 hover:text-red-500"
                              size="icon"
                              onClick={() => onRemoveSetFromExercise(item.id, setIndex)}
                            >
                              <MinusIcon />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}

                    {(item?.sets?.length ?? 0) < MAXIMUM_SETS_PER_EXERCISE && (
                      <Button
                        variant="ghost"
                        className="w-full text-primary mx-auto hover:bg-green-50 hover:text-primary"
                        onClick={() => onAddSetToExercise(item.id)}
                      >
                        <PlusIcon />
                        Add Set
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <Button
              className="w-full shadow mt-6"
              disabled={!listExercisesFromStore.length || !programName.trim()}
              onClick={() => {
                programId ? onSubmitUpdate() : onSubmitCreate();
              }}
              loading={loading}
            >
              {programId ? 'Update Program' : 'Save Program'}
            </Button>
          </div>
        </div>
      </div>

      <ExercisePickerModal
        isOpen={isOpenExercisePicker}
        programId={programId ? Number(programId) : undefined}
        onOpenChange={open => setIsOpenExercisePicker(open)}
      />

      <TrainingTypeInfoModal isOpen={isOpenInfo} onOpenChange={open => setIsOpenInfo(open)} />
    </div>
  );
}
