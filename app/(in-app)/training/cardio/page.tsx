'use client';
import { AppInput, AppSelect, AppTextarea } from '@/components/compose';
import { Button } from '@/components/ui/button';
import { Controller, useFieldArray } from 'react-hook-form';
import { useCardio } from './_hooks';
import { useEffect, useState } from 'react';
import { useIntervalsCardioStore } from '@/store/useIntervalsList.store';
import { toast } from 'react-toastify';

export default function CardioPage() {
  const {
    control,
    setValue,
    trigger,
    getValues,
    rpeItems: rpeOptions,
    exercisesItems: exercisesOptions,
    selectedExercise,
    onCompleteWorkout,
  } = useCardio({ onSuccess: () => {}, onFailure: () => {} });

  const { intervalsList, addInterval, clearIntervals } = useIntervalsCardioStore();

  const [inputDisabled, setInputDisabled] = useState(false);

  const { fields } = useFieldArray({ control, name: 'intervals' });

  useEffect(() => {
    if (intervalsList.length > 0) {
      setValue('intervals', intervalsList);
      setInputDisabled(true);
    } else {
      setInputDisabled(false);
      setValue('intervals', [
        {
          duration: '',
          rpe: '0',
          distance: '',
          distance_unit: '',
          heartRateMin: '',
          heartRateMax: '',
        },
      ]);
    }
  }, [intervalsList, setValue]);

  const handleCreateInterval = async () => {
    const valid = await trigger('intervals.0');
    if (!valid) return;

    const currentInterval = getValues('intervals.0');
    addInterval(currentInterval);
    setInputDisabled(true);
  };

  const handleCompleteWorkout = async () => {
    const valid = await trigger('intervals.0');
    if (!valid) return;

    const currentInterval = getValues('intervals.0');
    addInterval(currentInterval);

    await onCompleteWorkout(getValues());
    clearIntervals();
    setInputDisabled(false);
  };

  const handleAddNew = () => {
    const current = getValues('intervals.0');

    const isEmpty =
      !current.duration &&
      !current.distance &&
      !current.distance_unit &&
      !current.heartRateMin &&
      current.heartRateMin &&
      !current.heartRateMax &&
      current.heartRateMax;

    if (isEmpty) {
      toast.error('Please enter interval data before adding a new one.');
      return;
    }
    setInputDisabled(false);
    setValue('intervals.0', {
      duration: undefined,
      rpe: '0',
      distance: undefined,
      distance_unit: '',
      heartRateMin: undefined,
      heartRateMax: undefined,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="pt-[56px] pb-[80px] max-w-3xl mx-auto px-4">
        <div className="space-y-6 py-6">
          <form onSubmit={e => e.preventDefault()} className="space-y-4">
            <div className="space-y-2">
              <h2 className="text-lg font-medium">Cardio Training Selection</h2>
              <Controller
                control={control}
                name="exercises"
                render={({ field: { value, onChange }, fieldState: { error } }) => (
                  <AppSelect
                    placeholder="Select Type"
                    selectedValue={value}
                    onChangeSelected={onChange}
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
                <Button type="button" variant="outline" onClick={handleAddNew}>
                  + Add
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Controller
                    control={control}
                    name="intervals.0.duration"
                    render={({ field, fieldState: { error } }) => (
                      <AppInput
                        label="Duration (min)"
                        inputProps={{ placeholder: '5', type: 'number', disabled: inputDisabled }}
                        errorMessage={error?.message}
                        {...field}
                        value={field.value?.toString() ?? ''}
                        onBlur={() => trigger('intervals.0.duration')}
                        className="text-sm text-gray-600"
                      />
                    )}
                  />
                </div>
                <div className="space-y-2">
                  <Controller
                    control={control}
                    name="intervals.0.rpe"
                    render={({ field: { value, onChange }, fieldState: { error } }) => (
                      <AppSelect
                        label="RPE (0-10)"
                        placeholder="Select RPE"
                        selectedValue={value?.toString()}
                        onChangeSelected={onChange}
                        options={rpeOptions ?? []}
                        errorMessage={error?.message}
                        className="text-sm text-gray-600 w-30"
                        disabled={inputDisabled}
                      />
                    )}
                  />
                </div>
                <div className="space-y-2">
                  <Controller
                    control={control}
                    name="intervals.0.distance"
                    render={({ field, fieldState: { error } }) => (
                      <AppInput
                        label="Distance"
                        inputProps={{ placeholder: '0.0', type: 'number', disabled: inputDisabled }}
                        errorMessage={error?.message}
                        {...field}
                        value={field.value?.toString() ?? ''}
                        onBlur={() => trigger('intervals.0.distance')}
                        className="text-sm text-gray-600"
                      />
                    )}
                  />
                </div>
                <div className="space-y-2">
                  <Controller
                    control={control}
                    name="intervals.0.distance_unit"
                    render={({ field: { value, onChange }, fieldState: { error } }) => (
                      <AppSelect
                        label="Unit"
                        selectedValue={value}
                        onChangeSelected={onChange}
                        options={selectedExercise?.units ?? []}
                        errorMessage={error?.message}
                        className="text-sm text-gray-600 w-30"
                        disabled={inputDisabled}
                      />
                    )}
                  />
                </div>
                <div className="col-span-2 space-y-2">
                  <label className="text-sm text-gray-600">Heart Rate Range (BPM)</label>
                  <div className="flex gap-2">
                    <Controller
                      control={control}
                      name="intervals.0.heartRateMin"
                      render={({ field, fieldState: { error } }) => (
                        <AppInput
                          inputProps={{
                            placeholder: '140',
                            type: 'number',
                            disabled: inputDisabled,
                          }}
                          errorMessage={error?.message}
                          {...field}
                          value={field.value?.toString() ?? ''}
                          onBlur={() => trigger('intervals.0.heartRateMin')}
                          className="text-sm text-gray-600 w-full"
                        />
                      )}
                    />
                    <span className="text-gray-600">-</span>
                    <Controller
                      control={control}
                      name="intervals.0.heartRateMax"
                      render={({ field, fieldState: { error } }) => (
                        <AppInput
                          inputProps={{
                            placeholder: '160',
                            type: 'number',
                            disabled: inputDisabled,
                          }}
                          errorMessage={error?.message}
                          {...field}
                          value={field.value?.toString() ?? ''}
                          onBlur={() => trigger('intervals.0.heartRateMax')}
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
                    value={field.value?.toString() ?? ''}
                    onBlur={() => trigger('notes')}
                  />
                )}
              />
            </div>

            <div className="pl-0 padding-left-button">
              <Button type="button" size="lg" onClick={handleCreateInterval}>
                Create Interval
              </Button>
            </div>

            <Button type="button" className="w-full mt-2" size="lg" onClick={handleCompleteWorkout}>
              Complete Workout
            </Button>

            <Button type="button" className="w-full mt-2" size="lg">
              Past Cardio Training
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
