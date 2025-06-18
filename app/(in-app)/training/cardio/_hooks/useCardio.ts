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

type UseCardioFormOptions = {
  onSuccess?: () => void;
  onFailure?: (message: string) => void;
};

const schema = object().shape({
  exercise: string(),
  notes: string()
    .max(500, 'Notes must be at most 500 characters')
    .required('Please enter the data notes'),
  intervals: array(
    object().shape({
      cardio_interval_id: string(),
      duration: string().required('Please enter the data duration'),
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
        .optional(),
      heartRateMax: string()
        .transform(val => (val === '' || val === undefined || val === null ? undefined : val))
        .test('valid-max', 'Heart rate max must be between 30 and 220', value => {
          if (!value) return true;
          const val = Number(value);
          return !isNaN(val) && val >= 30 && val <= 220;
        })
        .test(
          'max-greater-than-min',
          'Heart rate max must be greater than or equal to min',
          function (value) {
            const { heartRateMin } = this.parent;
            const minVal = Number(heartRateMin);
            const maxVal = Number(value);
            if (!value || !heartRateMin) return true;
            return maxVal >= minVal;
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
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      ...draft,
    },
    mode: 'onChange',
  });

  const getExercises = async () => {
    if (exerciseOptions.length > 0) {
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

  const selectedExercise = useMemo(() => {
    return exercisesItems.find(item => item.value === exercise);
  }, [exercisesItems, exercise]);

  useEffect(() => {
    if (selectedExercise && selectedExercise.units.length) {
      const defaultUnit = selectedExercise.units?.[0].value;
      setValue('intervals.0.distanceUnit', defaultUnit);
    }
  }, [selectedExercise, setValue]);

  useEffect(() => {
    getExercises();
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
      const cacheKey = ['past-cardio', from, to, Metric.Duration];
      mutate(cacheKey, null, { revalidate: true });
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
    units: selectedExercise?.units ?? [],
    rpeItems,
    selectedExercise,
    reset,
    onCompleteWorkout,
    getExercises,
    clearCardioSession,
    loading,
  };
};
