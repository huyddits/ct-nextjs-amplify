'use client';
import { AppInput, AppSelect, AppTextarea } from '@/components/compose';
import { Button } from '@/components/ui/button';
import { Controller, useWatch } from 'react-hook-form';
import { useCardio } from './_hooks';
import { useEffect, useState } from 'react';
import { useCardioStore } from '@/store/useCardio.store';
import Link from 'next/link';
import { useLoading } from '@/hooks';
import { InfoIcon } from 'lucide-react';

export default function CardioPage() {
  const { intervalsList, clearCardioSession, setDraft, draft } = useCardioStore();
  const { loading } = useLoading();
  const {
    control,
    setValue,
    trigger,
    getValues,
    rpeItems: rpeOptions,
    exercisesItems: exercisesOptions,
    selectedExercise,
    onCompleteWorkout,
    reset,
  } = useCardio({
    onSuccess: () => {
      clearCardioSession();
      reset();
    },
    onFailure: () => {},
  });

  const [inputDisabled, setInputDisabled] = useState(false);

  useEffect(() => {
    if (intervalsList.length) {
      intervalsList &&
        setValue(
          'intervals',
          intervalsList.map(item => ({
            ...item,
            duration: item.duration ?? '',
            distance: item.distance ?? '',
            distance_unit: item.distanceUnit ?? '',
            rpe: item.rpe ?? '',
            heartRateMax: item.heartRateMax ?? '',
            heartRateMin: item.heartRateMin ?? '',
          }))
        );
      setInputDisabled(true);
    }
  }, [intervalsList, setValue, getValues]);

  const watchedInterval = useWatch({ control, name: 'intervals.0' });
  const watchedNotes = useWatch({ control, name: 'notes' });
  const watchedExercise = useWatch({ control, name: 'exercise' });

  useEffect(() => {
    const updatedDraft = {
      ...draft,
      exercise: watchedExercise ?? '',
      notes: watchedNotes ?? '',
      intervals: [
        {
          ...draft.intervals[0],
          ...watchedInterval,
          distanceUnit: watchedInterval?.distanceUnit || '',
        },
      ],
    };
    setDraft(updatedDraft);
  }, [watchedInterval, watchedNotes, watchedExercise]);

  const handleCompleteWorkout = async () => {
    const valid = await trigger(['intervals.0', 'notes']);
    if (!valid) return;

    const interval = getValues('intervals.0');

    setValue('intervals', [interval]);

    const values = getValues();
    const payload = {
      ...values,
      intervals: [interval],
    };

    await onCompleteWorkout(payload);
  };

  const distanceUnit = useWatch({
    control,
    name: 'intervals.0.distanceUnit',
  });

  const distanceLabel = distanceUnit === 'Stairs' ? 'Stairs' : 'Distance';

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="pt-[56px] pb-[80px] max-w-3xl mx-auto px-4">
        <div className="space-y-6 py-6">
          <form onSubmit={e => e.preventDefault()} className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-medium">Cardio Training Selection</h2>
                <InfoIcon className="h-5 w-5 text-gray-400" />
              </div>
              <Controller
                control={control}
                name="exercise"
                render={({ field, fieldState: { error } }) => (
                  <AppSelect
                    placeholder="Select Type"
                    selectedValue={field.value}
                    onChangeSelected={field.onChange}
                    options={exercisesOptions ?? []}
                    errorMessage={error?.message}
                    fullWidth
                  />
                )}
              />
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-medium">Intervals</h2>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Controller
                  control={control}
                  name="intervals.0.duration"
                  render={({ field, fieldState: { error } }) => (
                    <AppInput
                      label="Duration (min)"
                      inputProps={{
                        placeholder: '5',
                        type: 'number',
                        min: 0,
                      }}
                      errorMessage={error?.message}
                      disabled={inputDisabled}
                      {...field}
                      className="text-sm text-gray-600"
                    />
                  )}
                />
                <Controller
                  control={control}
                  name="intervals.0.rpe"
                  render={({ field, fieldState: { error } }) => (
                    <AppSelect
                      label="RPE (0-10)"
                      placeholder="Select RPE"
                      selectedValue={field.value?.toString()}
                      onChangeSelected={field.onChange}
                      options={rpeOptions ?? []}
                      errorMessage={error?.message}
                      className="text-sm text-gray-600"
                      disabled={inputDisabled}
                      fullWidth
                    />
                  )}
                />
                <Controller
                  control={control}
                  name="intervals.0.distance"
                  render={({ field, fieldState: { error } }) => (
                    <AppInput
                      label={distanceLabel}
                      inputProps={{
                        placeholder: '0.0',
                        type: 'number',
                        min: 0,
                      }}
                      errorMessage={error?.message}
                      disabled={inputDisabled}
                      {...field}
                      className="text-sm text-gray-600"
                    />
                  )}
                />
                <Controller
                  control={control}
                  name="intervals.0.distanceUnit"
                  render={({ field, fieldState: { error } }) => (
                    <AppSelect
                      label="Unit"
                      placeholder="Select Unit"
                      selectedValue={field.value ?? ''}
                      onChangeSelected={field.onChange}
                      options={selectedExercise?.units ?? []}
                      errorMessage={error?.message}
                      className="text-sm text-gray-600"
                      disabled={inputDisabled}
                      fullWidth
                    />
                  )}
                />
                <div className="col-span-2 space-y-2">
                  <label className="text-sm text-gray-600 font-medium">
                    Heart Rate Range (BPM)
                  </label>
                  <div className="flex gap-2 pt-1">
                    <Controller
                      control={control}
                      name="intervals.0.heartRateMin"
                      render={({ field, fieldState: { error } }) => (
                        <AppInput
                          inputProps={{
                            placeholder: '140',
                            type: 'number',
                            min: 0,
                          }}
                          errorMessage={error?.message}
                          disabled={inputDisabled}
                          {...field}
                          className="text-sm text-gray-600 w-full"
                        />
                      )}
                    />
                    <span className="text-gray-600 flex items-center">-</span>
                    <Controller
                      control={control}
                      name="intervals.0.heartRateMax"
                      render={({ field, fieldState: { error } }) => (
                        <AppInput
                          inputProps={{
                            placeholder: '160',
                            type: 'number',
                            min: 0,
                          }}
                          errorMessage={error?.message}
                          disabled={inputDisabled}
                          {...field}
                          className="text-sm text-gray-600 w-full"
                        />
                      )}
                    />
                  </div>
                </div>
              </div>

              <Controller
                control={control}
                name="notes"
                render={({ field, fieldState: { error } }) => (
                  <AppTextarea
                    label="Notes"
                    textareaProps={{
                      placeholder: 'Add any notes about this interval...',
                      className: 'min-h-[100px]',
                    }}
                    errorMessage={error?.message}
                    {...field}
                  />
                )}
              />
            </div>

            <Button
              type="button"
              className="w-full mt-2"
              size="lg"
              onClick={handleCompleteWorkout}
              loading={loading}
            >
              Complete Workout
            </Button>

            <Link href="/training/cardio/past">
              <Button className="w-full" size="lg">
                Past Cardio Training
              </Button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
