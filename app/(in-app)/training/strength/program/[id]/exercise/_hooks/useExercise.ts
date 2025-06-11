import { StrengthApi } from '@/api';
import { useCategoriesStore } from '@/store';
import { set } from 'date-fns';
import { useEffect, useMemo, useState } from 'react';
import { toast } from 'react-toastify';

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
  const [programDetail, setProgramDetail] = useState<ProgramDetail | null>(null);
  const [listExerciseInProgram, setListExerciseInProgram] = useState<ExerciseDetailInProgram[]>([]);
  const { strengthTrainingTypes } = useCategoriesStore();
  const [indicator, setIndicator] = useState(0);
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
            sets: item.sets.map(obj => ({
              reps: obj.rep,
              rpe: obj.rpe,
              weight: 0,
              completed: false,
            })),
          };
        })
      );
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
      await StrengthApi.completeWorkout(
        listExerciseInProgram.map(item => {
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
        })
      );

      toast.success('Workout completed successfully');
    } catch (error) {
      console.log(error);
    }
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

  const history = useMemo(() => {
    return currentExercise?.trainingData;
  }, [currentExercise]);

  const template = useMemo(() => {
    return strengthTrainingTypes.find(({ value }) => value === programDetail?.trainingType);
  }, [strengthTrainingTypes, programDetail?.trainingType]);

  useEffect(() => {
    fetchListExerciseInProgram();
  }, []);

  return {
    history,
    template,
    indicator,
    exerciseName,
    programDetail,
    currentExercise,
    nextExerciseName,
    previousExerciseName,
    listExerciseInProgram,
    setIndicator,
    onCompleteWorkout,
    setListExerciseInProgram,
    fetchListExerciseInProgram,
  };
};
