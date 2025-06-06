import axiosIns from '@/lib/axiosIns';
import { END_POINTS } from '@/utils/constants';
import { GetListMeasurementResponse } from './types/measurement';

export const getMeasurementList = () => {
  return axiosIns.get<GetListMeasurementResponse>(END_POINTS.MEASUREMENTS);
};

export const getAthleteList = () => {
  return axiosIns.get<GetListMeasurementResponse>(END_POINTS.ATHLETE_MEASUREMENTS);
};
