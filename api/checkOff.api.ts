import axiosIns from '@/lib/axiosIns';
import { CreateCheckOffPayload, CreateCheckOffResponse } from './types/checkOff';
import { END_POINTS } from '@/utils/constants';

export const postCheckOff = (payload: CreateCheckOffPayload) => {
  return axiosIns.post<CreateCheckOffResponse>(END_POINTS.CHECK_OFF_NEW, payload);
};
