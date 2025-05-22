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

export type GetListExerciseResponse = ApiResponse<ExerciseRecord[], {}>;

export type GetListRpeResponse = ApiResponse<rpeRecord[], {}>;
