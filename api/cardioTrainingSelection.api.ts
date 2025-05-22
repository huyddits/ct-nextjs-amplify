import axiosIns from '@/lib/axiosIns';
import { CreateCardioPayload, CreateCardioResponse } from './types/cardioTrainingSelection.api';
import { END_POINTS } from '@/utils/constants';

export const postExercises = (payload: CreateCardioPayload) => {
  return axiosIns.post<CreateCardioResponse>(END_POINTS.CARDIO_CREATE, payload);
};
