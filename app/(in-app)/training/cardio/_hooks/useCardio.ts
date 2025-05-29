import { useForm, useWatch } from 'react-hook-form';
import { InferType, object, string, array } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useMemo, useState } from 'react';
import { CardioTrainingSelectionApi } from '@/api';
import { type SelectOption } from '@/components/compose';
import dayjs from 'dayjs';
import { useCardioStore } from '@/store';
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
    Array<SelectOption & { units: SelectOption[] }>
  >([]);

  const [rpeItems, setRpeItems] = useState<SelectOption[]>([]);

  const {
    intervalsList,
    exerciseOptions,
    rpeOptions,
    clearCardioIntervals,
    setExerciseOptions,
    setRpeOptions,
  } = useCardioStore();

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
        units: units.map(item => ({ label: item.name, value: item.name })),
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

  type FormType = InferType<typeof schema>;
  const DEFAULT_FORM: Required<FormType> = {
    exercise: '1',
    notes: '',
    intervals: [
      {
        duration: '',
        distance: '',
        distance_unit: '',
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
    reset,
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
    return exercisesItems.find(item => item.value === exercise);
  }, [exercisesItems, exercise]);

  useEffect(() => {
    if (selectedExercise && selectedExercise?.units?.length) {
      const defaultUnit = selectedExercise.units[0].value;
      setValue('intervals.0.distance_unit', defaultUnit);
    }
  }, [selectedExercise, setValue]);

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
        intervals: intervalsList.map(data => ({
          duration: Number(data.duration),
          distance: Number(data.distance),
          distance_unit: data.distanceUnit ?? '',
          rpe: data.rpe ?? '',
          heart_rate_min: Number(data.heartRateMin),
          heart_rate_max: Number(data.heartRateMax),
        })),
      });
      toast.success('Successfully save the complete workout');
      clearCardioIntervals();
      reset(DEFAULT_FORM);
      options?.onSuccess?.();
    } catch (error: unknown) {
      clearCardioIntervals();
      reset(DEFAULT_FORM);
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
    onCompleteWorkout,
    getExercises,
  };
};
