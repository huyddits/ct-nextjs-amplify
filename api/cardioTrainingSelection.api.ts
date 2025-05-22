import axiosIns from '@/lib/axiosIns';
import {
  CreateCardioPayload,
  CreateCardioResponse,
  GetListExerciseResponse,
  GetListRpeResponse,
} from './types/cardioTrainingSelection.api';
import { END_POINTS } from '@/utils/constants';

export const postExercises = (payload: CreateCardioPayload) => {
  return axiosIns.post<CreateCardioResponse>(END_POINTS.CARDIO_CREATE, payload);
};
export const getExercises = () => {
  return axiosIns.get<GetListExerciseResponse>(END_POINTS.EXERCISES);
};

export const getRpe = () => {
  return axiosIns.get<GetListRpeResponse>(END_POINTS.RPE);
};
