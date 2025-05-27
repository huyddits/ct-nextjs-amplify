import { useForm, useWatch } from 'react-hook-form';
import { InferType, object, string, number, array } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useMemo, useState } from 'react';
import { CardioTrainingSelectionApi } from '@/api';
import { type SelectOption } from '@/components/compose';
import dayjs from 'dayjs';
import { useIntervalsCardioStore } from '@/store';
import { toast } from 'react-toastify';

type UseCardioFormOptions = {
  onSuccess?: () => void;
  onFailure?: (message: string) => void;
};

const schema = object().shape({
  exercise: string(),
  notes: string().max(500),
  intervals: array(
    object().shape({
      cardio_interval_id: string(),
      duration: string(),
      distance: string().min(0),
      distance_unit: string(),
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
    (SelectOption & { units: SelectOption[] })[]
  >([]);

  const [rpeItems, setRpeItems] = useState<SelectOption[]>([]);

  const { intervalsList, clearIntervals } = useIntervalsCardioStore();

  const getExercises = async () => {
    try {
      const response = await CardioTrainingSelectionApi.getExercises();
      const { data, error } = response.data;
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
      const response = await CardioTrainingSelectionApi.getRpe();
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

  type FormType = InferType<typeof schema>;
  const DEFAULT_FORM: Required<FormType> = {
    exercise: '1',
    notes: '',
    intervals: [
      {
        duration: '',
        distance: '',
        distance_unit: 'Kilometers',
        rpe: '0',
        heartRateMin: '',
        heartRateMax: '',
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

  const exercise = useWatch({ control, name: 'exercise' });

  const selectedExercise = useMemo(() => {
    return exercisesItems.find(item => item.value === String(exercise));
  }, [exercisesItems, exercise]);

  useEffect(() => {
    getExercises();
    getRpe();
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
        intervals: intervalsList.map(interval => ({
          duration: Number(interval.duration),
          distance: Number(interval.distance),
          distance_unit: interval.distance_unit ?? '',
          rpe: interval.rpe ?? '',
          heart_rate_min: Number(interval.heartRateMin),
          heart_rate_max: Number(interval.heartRateMax),
        })),
      });
      toast.success('Successfully save the complete workout');
      clearIntervals();
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
    units: selectedExercise?.units,
    rpeItems,
    selectedExercise,
    onCompleteWorkout,
  };
};
