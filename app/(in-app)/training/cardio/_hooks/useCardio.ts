import { useForm, useWatch } from 'react-hook-form';
import { InferType, object, string, array } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useMemo, useState } from 'react';
import { CardioTrainingSelectionApi } from '@/api';
import { type SelectOption } from '@/components/compose';
import { useAuthStore, useCardioStore } from '@/store';
import { toast } from 'react-toastify';
import { mutate } from 'swr';
import { Metric } from '../_types/index';
import { useLoading } from '@/hooks';
import { endOfISOWeek, format, startOfISOWeek } from 'date-fns';
import { usePastCardioTraining } from '../past/_hooks';

type UseCardioFormOptions = {
  onSuccess?: () => void;
  onFailure?: (message: string) => void;
};

const schema = object().shape({
  exercise: string(),
  notes: string().max(500, 'Notes must be at most 500 characters'),
  intervals: array(
    object().shape({
      cardio_interval_id: string(),
      duration: string()
        .required('Please enter the data duration')
        .test('is-valid-number', 'Duration must be a number less than or equal to 500', value => {
          const num = Number(value);
          return !isNaN(num) && num <= 500;
        })
        .test('is-decimal', 'Only up to 2 decimal places allowed', value => {
          if (!value) return false;
          return /^\d+(\.\d{1,2})?$/.test(value);
        }),
      distance: string()
        .min(0)
        .required('Please enter the data distance')
        .test('is-valid-distance', 'Distance must not exceed 100', value => {
          const num = Number(value);
          return !isNaN(num) && num >= 0 && num <= 100;
        }),
      distanceUnit: string(),
      rpe: string().min(0).max(10),
      heartRateMin: string()
        .transform(val => (val === '' || val === undefined || val === null ? undefined : val))
        .test('valid-min', 'Heart rate min must be between 30 and 220', value => {
          if (!value) return true;
          const val = Number(value);
          return !isNaN(val) && val >= 30 && val <= 220;
        })
        .test(
          'min-less-than-max',
          'Heart rate min must be less than or equal to max',
          function (value) {
            const min = Number(value);
            const max = Number(this.parent.heartRateMax);
            // if (!value || !this.parent.heartRateMax) return min <= 160; // less than default
            if (!value && !this.parent.heartRateMax) return true;
            if (!value) return this.parent.heartRateMax >= 140;
            if (!this.parent.heartRateMax) return min <= 160;
            return !isNaN(min) && !isNaN(max) && min <= max;
          }
        )
        .optional(),
      heartRateMax: string()
        .transform(val => (val === '' || val === undefined || val === null ? undefined : val))
        .test('valid-min', 'Heart rate min must be between 30 and 220', value => {
          if (!value) return true;
          const val = Number(value);
          return !isNaN(val) && val >= 30 && val <= 220;
        })
        .test(
          'max-greater-than-min',
          'Heart rate max must be greater than or equal to min',
          function (value) {
            const max = Number(value);
            const min = Number(this.parent.heartRateMin);
            if (!value && !this.parent.heartRateMin) return true; // greater than default
            if (!value) return this.parent.heartRateMin <= 160;
            if (!this.parent.heartRateMin) return max >= 140;
            return !isNaN(min) && !isNaN(max) && min <= max;
          }
        )
        .optional(),
    })
  )
    .min(1)
    .required(),
});

export const useCardio = (options?: UseCardioFormOptions) => {
  const [exercisesItems, setExercisesItems] = useState<
    Array<SelectOption & { units: SelectOption[] }>
  >([]);

  const [exercisesItemsTemp, setExercisesItemsTemp] = useState<any[]>();
  const { info } = useAuthStore();

  const [rpeItems, setRpeItems] = useState<SelectOption[]>([]);

  const { loading, startLoading, stopLoading } = useLoading();

  const {
    intervalsList,
    exerciseOptions,
    rpeOptions,
    draft,
    clearCardioSession,
    setExerciseOptions,
    setRpeOptions,
  } = useCardioStore();

  type FormType = InferType<typeof schema>;

  const {
    control,
    setValue,
    handleSubmit,
    formState,
    getValues,
    trigger,
    formState: { isValid },
    reset,
    setError,
    clearErrors,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      ...draft,
    },
    mode: 'onChange',
  });

  const getExercises = async (forceReload = false) => {
    if (exerciseOptions.length > 0 && !forceReload) {
      setExercisesItems(exerciseOptions);
      return;
    }
    try {
      const response = await CardioTrainingSelectionApi.getExercises();
      const { data, error } = response.data;
      if (!data) throw error;
      setExercisesItemsTemp(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!exercisesItemsTemp) return;
    const mapping = exercisesItemsTemp.map(({ name, cardio_exercises_id, units }) => ({
      label: name,
      value: cardio_exercises_id.toString(),
      units: (units as { unit_type: string; name: string }[])
        .filter(
          ({ unit_type }) =>
            unit_type === null ||
            unit_type?.toLowerCase() === info?.measurementUnitType?.toLowerCase()
        )
        .map(({ name }: { name: string }) => ({ label: name, value: name })),
    }));
    setExercisesItems(mapping);
    setExerciseOptions(mapping);
  }, [exercisesItemsTemp, info?.measurementUnitType]);

  const getRpe = async () => {
    if (rpeOptions.length > 0) {
      setRpeItems(rpeOptions);
      return;
    }
    try {
      const response = await CardioTrainingSelectionApi.getRpe();
      const { data, error } = response.data;
      if (!data) throw error;
      const RpeItems = data.map(({ name, cardio_rpe_id }) => ({
        label: `${cardio_rpe_id}: ${name}`,
        value: cardio_rpe_id.toString(),
      }));
      setRpeItems(RpeItems);
      setRpeOptions(RpeItems);
    } catch (error) {
      console.log(error);
    }
  };

  const exercise = useWatch({ control, name: 'exercise' });

  useEffect(() => {
    if (!exercise || !exercisesItems.length) return;

    const selected = exercisesItems.find(item => item.value === exercise);
    if (!selected) return;

    const defaultUnit = selected.units?.[0]?.value ?? '';

    const intervals = getValues('intervals') || [];
    const updated = intervals.map(interval => ({
      ...interval,
      distanceUnit: defaultUnit,
    }));

    setValue('intervals', updated, {
      shouldDirty: true,
    });
  }, [exercise, exercisesItems, info?.measurementUnitType]);

  useEffect(() => {
    if (info?.measurementUnitType) {
      getExercises(true);
    }
  }, [info?.measurementUnitType]);

  useEffect(() => {
    // getExercises();
    getRpe();

    if (draft.intervals) {
      setValue(
        'intervals',
        draft.intervals.map(item => ({
          distance_unit: item.distanceUnit?.toString() ?? '',
          distance: item.distance?.toString() ?? '',
          duration: item.duration?.toString() ?? '',
          rpe: item.rpe?.toString() ?? '',
        }))
      );
    }
    setValue('notes', draft?.notes);
    setValue('exercise', draft?.exercise);
  }, []);

  const onCompleteWorkout = async (formData: FormType) => {
    try {
      startLoading();
      await CardioTrainingSelectionApi.postExercises({
        workout_date: format(new Date(), 'yyyy-MM-dd'),
        exercise: Number(formData.exercise),
        notes: formData.notes ?? '',
        intervals: formData.intervals.map(data => ({
          duration: Number(data.duration),
          distance: Number(data.distance),
          distance_unit: data.distanceUnit ?? '',
          rpe: data.rpe ?? '',
          heart_rate_min: Number(data.heartRateMin || '140'),
          heart_rate_max: Number(data.heartRateMax || '160'),
        })),
      });
      clearCardioSession();
      toast.success('Successfully save the complete workout');
      const from = format(startOfISOWeek(new Date()), 'yyyy-MM-dd');
      const to = format(endOfISOWeek(new Date()), 'yyyy-MM-dd');
      const cacheKeyDuration = ['past-cardio', from, to, Metric.Duration];
      const cacheKeyDistance = ['past-cardio', from, to, Metric.Distance];
      const cacheKeyStairs = ['past-cardio', from, to, Metric.Stairs];

      // mutate(cacheKey, null, { revalidate: true });
      mutate(cacheKeyDuration, null, { revalidate: true });
      mutate(cacheKeyDistance, null, { revalidate: true });
      mutate(cacheKeyStairs, null, { revalidate: true });
      options?.onSuccess?.();
    } catch (error: unknown) {
      console.error('Workout submission failed:', error);
      toast.error('Failed to save workout');
      options?.onFailure?.('Failed to save workout');
    } finally {
      stopLoading();
    }
  };

  return {
    control,
    isValid,
    trigger,
    setValue,
    getValues,
    handleSubmit,
    formState,
    exercisesItems,
    // units: selectedExercise?.units ?? [],
    rpeItems,
    // selectedExercise,
    reset,
    onCompleteWorkout,
    getExercises,
    clearCardioSession,
    loading,
    setError,
    clearErrors,
  };
};
