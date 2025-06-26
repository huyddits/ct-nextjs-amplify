import { StrengthApi } from '@/api';
import { useCategoriesStore } from '@/store';
import { ROUTES } from '@/utils/constants';
import { set } from 'date-fns';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import { generateRandomChar } from '@/utils/formatter';
import { usePagination } from '@/hooks';
export type ProgramDetail = {
  programId: number;
  name: string;
  type: string;
  trainingType: string;
  copiedAt: string | null;
  startedAt: string | null;
  finishedAt: string | null;
};

export type WorkoutRecord = {
  id: number;
  note: string;
  sets: Omit<ExerciseSet, 'completed'>[];
  date: string;
};

export type ExerciseDetailInProgram = {
  programExerciseId: number;
  type: string;
  sets: ExerciseSet[];
  notes: string;
  status: boolean;
  trainingData: WorkoutRecord[];
  exerciseId: number;
  exerciseName: string;
  exerciseDescription: string;
  exerciseCues: string;
  exerciseTargetMuscles: string;
  exerciseDifficulty: number;
  exerciseVideoUrl: string;
  exerciseImageUrl: string;
};

export type ExerciseSet = {
  reps: number;
  rpe: number;
  weight: number;
  completed: boolean;
};

type UseExerciseOptions = { programId: number };
export const useExercise = (options: UseExerciseOptions) => {
  const router = useRouter();
  const [programDetail, setProgramDetail] = useState<ProgramDetail | null>(null);
  const [listExerciseInProgram, setListExerciseInProgram] = useState<ExerciseDetailInProgram[]>([]);
  const { strengthTrainingTypes } = useCategoriesStore();
  const [indicator, setIndicator] = useState(0);
  const [currentProgramExerciseId, setCurrentProgramExerciseId] = useState<number>();
  const {
    limit: workoutLimit,
    page: workoutPage,
    totalPages: workoutTotalPages,
    setPage: setWorkoutPage,
    setTotalPages: setWorkoutTotalPages,
  } = usePagination(5);
  const [pastWorkouts, setPastWorkouts] = useState<WorkoutRecord[]>([]);
  const fetchListExerciseInProgram = async () => {
    try {
      const response = await StrengthApi.getListExercisesInProgram(options.programId);

      const { data, error } = response.data;
      if (!data) throw error;

      setProgramDetail({
        copiedAt: data.copied_at,
        finishedAt: data.finished_at,
        name: data.name,
        programId: data.program_id,
        startedAt: data.started_at,
        type: data.type,
        trainingType: data.training_type,
      });

      setListExerciseInProgram(
        data.exercises.map(item => {
          return {
            exerciseCues: item.exercise.cues,
            exerciseDescription: item.exercise.description,
            exerciseDifficulty: item.exercise.difficulty,
            exerciseId: item.exercise.exercise_id,
            exerciseImageUrl: item.exercise.image_url,
            exerciseName: item.exercise.name,
            exerciseTargetMuscles: item.exercise.target_muscles,
            exerciseVideoUrl: item.exercise.video_url,
            programExerciseId: item.program_exercise_id,
            status: item.status,
            notes: '',
            trainingData: item.training_data.map(workoutRecord => {
              return {
                id: workoutRecord.training_data_id,
                date: workoutRecord.created_at,
                note: workoutRecord.note,
                sets: workoutRecord.sets.map(record => {
                  return {
                    reps: record.rep,
                    rpe: record.rpe,
                    weight: record.weight,
                  };
                }),
              };
            }),
            type: item.type,
            sets: item.sets.map((obj, index) => ({
              reps: obj.rep,
              rpe: obj.rpe,
              weight: item.training_data?.[0]?.sets?.[index]?.weight ?? 0,
              completed: false,
            })),
          };
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  const fetchPastWorkouts = async ({
    programExerciseId,
    page,
  }: {
    programExerciseId: number;
    page?: number;
  }) => {
    try {
      const response = await StrengthApi.getPastWorkouts({
        id: programExerciseId,
        limit: workoutLimit,
        page: page ?? workoutPage,
      });
      const { meta, data, error } = response.data;

      if (error) throw error;

      setPastWorkouts(
        data?.map(item => {
          return {
            date: item.created_at,
            id: item.training_data_id,
            note: item.note,
            sets: item.sets.map(set => ({
              reps: set.rep,
              rpe: set.rpe,
              weight: set.weight,
            })),
          };
        }) ?? []
      );
      setWorkoutTotalPages(meta?.totalPages ?? 0);
      if (workoutPage !== page && page) {
        setWorkoutPage(page);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onLoadMorePastWorkouts = async () => {
    if (!currentProgramExerciseId) return;
    try {
      const response = await StrengthApi.getPastWorkouts({
        id: currentProgramExerciseId,
        page: workoutPage,
        limit: workoutLimit,
      });
      const { data, error } = response.data;
      if (error) throw error;
      const mappedData: WorkoutRecord[] =
        data?.map(item => {
          return {
            date: item.created_at,
            id: item.training_data_id,
            note: item.note,
            sets: item.sets.map(set => ({
              reps: set.rep,
              rpe: set.rpe,
              weight: set.weight,
            })),
          };
        }) ?? [];
      setPastWorkouts(prev => [...prev, ...mappedData]);
    } catch (error) {
      console.log(error);
    }
  };

  const onCompleteWorkout = async () => {
    const isValid = listExerciseInProgram.some(item => item.sets.some(set => set.completed));

    if (!isValid) {
      toast.error('Please complete at least one set before completing the workout.');
      return;
    }
    try {
      // exclude empty set from sets
      const validList = listExerciseInProgram.map(item => {
        return {
          note: item.notes,
          program_exercise_id: item.programExerciseId,
          sets: item.sets
            .filter(set => set.completed)
            .map(set => {
              return {
                rep: set.reps,
                rpe: set.rpe,
                weight: set.weight,
              };
            }),
        };
      });

      // exclude exercise with empty sets
      await StrengthApi.completeWorkout(validList.filter(item => !!item.sets.length));

      toast.success('Workout completed successfully');
      router.push(`/${ROUTES.TRAINING_STRENGTH}?${generateRandomChar()}`);
    } catch (error) {
      console.log(error);
    }
  };

  const onAddSet = () => {
    setListExerciseInProgram(prev => {
      return prev.map((item, index) => {
        if (index !== indicator) return item;
        return {
          ...item,
          sets: [
            ...item.sets,
            { weight: 0, reps: template?.reps ?? 0, rpe: template?.rpe ?? 0, completed: false },
          ],
        };
      });
    });
  };

  const onRemoveSet = (setIndex: number) => {
    setListExerciseInProgram(prev => {
      return prev.map((item, index) => {
        if (index !== indicator) return item;
        return {
          ...item,
          sets: item.sets.filter((_, i) => i !== setIndex),
        };
      });
    });
  };

  const onUpdateSet = (setIndex: number, field: keyof ExerciseSet, value: number) => {
    setListExerciseInProgram(prev => {
      return prev.map((item, exerciseIndex) => {
        if (exerciseIndex !== indicator) return item;
        return {
          ...item,
          sets: item.sets.map((set, index) => {
            if (index !== setIndex) return set;
            return {
              ...set,
              [field]: String(value),
            };
          }),
        };
      });
    });
  };

  const exerciseName = useMemo(() => {
    return listExerciseInProgram[indicator]?.exerciseName;
  }, [indicator, listExerciseInProgram]);

  const previousExerciseName = useMemo(() => {
    return listExerciseInProgram[indicator - 1]?.exerciseName;
  }, [indicator, listExerciseInProgram]);

  const nextExerciseName = useMemo(() => {
    return listExerciseInProgram[indicator + 1]?.exerciseName;
  }, [indicator, listExerciseInProgram]);

  const currentExercise = useMemo(() => {
    return listExerciseInProgram[indicator];
  }, [indicator, listExerciseInProgram]);

  const template = useMemo(() => {
    return strengthTrainingTypes.find(({ value }) => value === programDetail?.trainingType);
  }, [strengthTrainingTypes, programDetail?.trainingType]);

  useEffect(() => {
    fetchListExerciseInProgram();
  }, []);

  useEffect(() => {
    const current = listExerciseInProgram[indicator];
    if (!current) return;
    fetchPastWorkouts({ page: 1, programExerciseId: current.programExerciseId });
    setCurrentProgramExerciseId(current.programExerciseId);
  }, [indicator, listExerciseInProgram.length]);

  return {
    workoutPage,
    template,
    indicator,
    workoutTotalPages,
    pastWorkouts,
    exerciseName,
    programDetail,
    currentExercise,
    nextExerciseName,
    previousExerciseName,
    listExerciseInProgram,
    setIndicator,
    onAddSet,
    onRemoveSet,
    onUpdateSet,
    onCompleteWorkout,
    onLoadMorePastWorkouts,
    fetchPastWorkouts,
    setListExerciseInProgram,
    fetchListExerciseInProgram,
  };
};
