import { useForm, useWatch } from 'react-hook-form';
import { InferType, object, string, array } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useMemo, useState } from 'react';
import { CardioTrainingSelectionApi } from '@/api';
import { type SelectOption } from '@/components/compose';
import dayjs from 'dayjs';
import { useAuthStore, useCardioStore } from '@/store';
import { toast } from 'react-toastify';
import { mutate } from 'swr';
import { Metric } from '../_types/index';

type UseCardioFormOptions = {
  onSuccess?: () => void;
  onFailure?: (message: string) => void;
};

const schema = object().shape({
  exercise: string(),
  notes: string().max(500).required('Please enter the data notes'),
  intervals: array(
    object().shape({
      cardio_interval_id: string(),
      duration: string().required('Please enter the data duration'),
      distance: string().min(0).required('Please enter the data distance'),
      distanceUnit: string(),
      rpe: string().min(0).max(10),
      heartRateMin: string().min(0).max(250).optional(),
      heartRateMax: string().min(0).max(250).optional(),
    })
  )
    .min(1)
    .required(),
});

export const useCardio = (options?: UseCardioFormOptions) => {
  const [exercisesItems, setExercisesItems] = useState<
    Array<SelectOption & { units: SelectOption[] }>
  >([]);
  const { info } = useAuthStore();

  const [rpeItems, setRpeItems] = useState<SelectOption[]>([]);

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
      const exercisesItems = data.map(({ name, cardio_exercises_id, units }) => ({
        label: name,
        value: cardio_exercises_id.toString(),
        // units: units.filter((item) => (item as any)?.measurementUnit === info?.measurementUnit).map(({ name }) => ({ label: name, value: name })),
        units: units.map(({ name }) => ({ label: name, value: name })),
      }));
      setExercisesItems(exercisesItems);
      setExerciseOptions(exercisesItems);
    } catch (error) {
      console.log(error);
    }
  };

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
        label: name,
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
      if (intervalsList.length === 0) {
        toast.error('Please create at least one interval before completing the workout.');
        return;
      }
      await CardioTrainingSelectionApi.postExercises({
        workout_date: dayjs().format('YYYY-MM-DD'),
        exercise: Number(formData.exercise),
        notes: formData.notes ?? '',
        intervals: intervalsList.map(data => ({
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
      const from = dayjs().startOf('isoWeek').format('YYYY-MM-DD');
      const to = dayjs().endOf('isoWeek').format('YYYY-MM-DD');
      const cacheKey = ['past-cardio', from, to, Metric.Duration];
      mutate(cacheKey, null, { revalidate: true });
      options?.onSuccess?.();
    } catch (error: unknown) {
      console.error('Workout submission failed:', error);
      toast.error('Failed to save workout');
      options?.onFailure?.('Failed to save workout');
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
  };
};
