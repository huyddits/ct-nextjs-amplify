import { useForm, useWatch } from 'react-hook-form';
import { InferType, object, string, number, array } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useMemo, useState } from 'react';
import { CardioTrainingSelectionApi, CardioSelectApi } from '@/api';
import { type SelectOption } from '@/components/compose';
import dayjs from 'dayjs';
import { useIntervalsCardioStore } from '@/store';
import { toast } from 'react-toastify';

type UseCardioFormOptions = {
  onSuccess?: () => void;
  onFailure?: (message: string) => void;
};

export const useCardio = (options?: UseCardioFormOptions) => {
  const [exercisesItems, setExercisesItems] = useState<
    (SelectOption & { units: SelectOption[] })[]
  >([]);

  const [rpeItems, setRpeItems] = useState<SelectOption[]>([]);

  const { intervalsList, clearIntervals } = useIntervalsCardioStore();

  const getExercises = async () => {
    try {
      const response = await CardioSelectApi.getExercises();
      const { data, error } = response.data;
      console.log(response.data, 'sa ');
      if (!data) throw error;
      const ExercisesItems = data.map(({ name, cardio_exercises_id, units }) => ({
        label: name,
        value: cardio_exercises_id.toString(),
        units: units.map(item => ({ label: item.name, value: item.name })),
      }));
      setExercisesItems(ExercisesItems);
    } catch (error) {
      console.log(error);
    }
  };

  const getRpe = async () => {
    try {
      const response = await CardioSelectApi.getRpe();
      const { data, error } = response.data;
      if (!data) throw error;
      const RpeItems = data.map(({ name, cardio_rpe_id }) => ({
        label: name,
        value: cardio_rpe_id.toString(),
      }));
      setRpeItems(RpeItems);
    } catch (error) {
      console.log(error);
    }
  };

  const schema = useMemo(() => {
    return object().shape({
      exercises: string(),
      notes: string().max(500),
      intervals: array(
        object().shape({
          cardio_interval_id: number(),
          duration: number(),
          distance: number().min(0),
          distance_unit: string(),
          rpe: string().min(0).max(10),
          heartRateMin: number().min(0).max(250).optional(),
          heartRateMax: number().min(0).max(250).optional(),
        })
      )
        .min(1)
        .required(),
    });
  }, []);

  type FormType = InferType<typeof schema>;
  const DEFAULT_FORM: Required<FormType> = {
    exercises: '1',
    notes: '',
    intervals: [
      {
        duration: undefined,
        distance: undefined,
        distance_unit: 'Kilometers',
        rpe: '0',
        heartRateMin: undefined,
        heartRateMax: undefined,
      },
    ],
  };
  const {
    control,
    setValue,
    handleSubmit,
    formState,
    getValues,
    trigger,
    formState: { isValid },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      ...DEFAULT_FORM,
    },
    mode: 'onChange',
  });

  const exercises = useWatch({ control, name: 'exercises' });

  const selectedExercise = useMemo(() => {
    return exercisesItems.find(item => item.value === String(exercises));
  }, [exercisesItems, exercises]);

  useEffect(() => {
    getExercises();
    getRpe();
  }, []);

  const onCompleteWorkout = async (formData: FormType) => {
    try {
      if (intervalsList.length === 0) throw new Error('No completed intervals');
      await CardioTrainingSelectionApi.postExercises({
        workout_date: dayjs().format('YYYY-MM-DD'),
        exercises: Number(formData.exercises),
        notes: formData.notes ?? '',
        intervals: intervalsList.map(interval => ({
          duration: Number(interval.duration),
          distance: Number(interval.distance),
          distance_unit: interval.distance_unit ?? '',
          rpe: interval.rpe ?? '',
          heart_rate_min: Number(interval.heartRateMin),
          heart_rate_max: Number(interval.heartRateMax),
        })),
      });
      clearIntervals();
      options?.onSuccess?.();
    } catch (error: unknown) {
      console.error('Workout submission failed:', error);

      if (error instanceof Error && error.message === 'No completed intervals') {
        toast.error('Please create at least one interval before completing the workout.');
      } else {
        toast.error('Failed to save workout');
      }
      options?.onFailure?.('Failed to save workout');
    }
  };

  return {
    control,
    isValid,
    // onSubmit,
    trigger,
    setValue,
    getValues,
    handleSubmit,
    formState,
    exercisesItems,
    units: selectedExercise?.units,
    rpeItems,
    selectedExercise,
    onCompleteWorkout,
  };
};
