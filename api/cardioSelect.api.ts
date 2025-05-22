import axiosIns from '@/lib/axiosIns';
import { END_POINTS } from '@/utils/constants';
import { GetListExerciseResponse, GetListRpeResponse } from './types/cardioSelect';

export const getExercises = () => {
  return axiosIns.get<GetListExerciseResponse>(END_POINTS.EXERCISES);
};

export const getRpe = () => {
  return axiosIns.get<GetListRpeResponse>(END_POINTS.RPE);
};
