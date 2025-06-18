import axiosIns from '@/lib/axiosIns';
import { END_POINTS } from '@/utils/constants';
import { HitMissRoutineListResponse } from './types/hitMiss';

export const getHitMissRoutineList = () => {
  return axiosIns.get<HitMissRoutineListResponse>(END_POINTS.HIT_MISS_ROUTINES);
};

export const duplicateHitMissRoutine = (routine_Id: number) => {
  return axiosIns.post(`${END_POINTS.HIT_MISS_ROUTINES}/${routine_Id}/duplicate`);
};

export const deleteHitMissRoutine = (routine_Id: number) => {
  return axiosIns.delete(`${END_POINTS.HIT_MISS_ROUTINES}/${routine_Id}`);
};
