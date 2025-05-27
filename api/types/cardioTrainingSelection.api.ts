import { ApiResponse } from '@/utils/types';

type ExerciseRecord = {
  cardio_exercises_id: number;
  name: string;
  units: [
    {
      cardio_unit_id: number;
      name: string;
    },
  ];
};

type rpeRecord = {
  cardio_rpe_id: number;
  name: string;
};

export type CreateCardioPayload = {
  workout_date: string; // YYYY-MM-DD
  exercise: number;
  notes: string;
  intervals: intervalsPayload[];
};

export type exercisesPayload = {
  cardio_exercises_id: number;
  name: string;
};

export type intervalsPayload = {
  duration: number;
  distance: number;
  distance_unit: string;
  heart_rate_min: number;
  heart_rate_max: number;
  rpe: string;
};

export type GetListExerciseResponse = ApiResponse<ExerciseRecord[], {}>;

export type GetListRpeResponse = ApiResponse<rpeRecord[], {}>;

export type CreateCardioResponse = ApiResponse<{}, {}>;
