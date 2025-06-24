import axiosIns from '@/lib/axiosIns';
import { END_POINTS } from '@/utils/constants';
import {
  CreateRoutinePayload,
  HitMissRoutineListResponse,
  HitMissRoutineDetailResponse,
  SummaryPayload,
  HitMissRoutineSummaryResponse,
  HitMissRoutineGroupResponse,
  HitMissRoutineCurrentResponse,
  PostHitMissEventResponse,
  SesstionPayload,
  DeleteHitMissSessionResponse,
  SesstionEventItemPayload,
  PostHitMissCompletePayload,
  UndoHitMissPayload,
} from './types/hitMiss';

export const getHitMissRoutineList = () => {
  return axiosIns.get<HitMissRoutineListResponse>(END_POINTS.HIT_MISS_ROUTINES);
};

export const duplicateHitMissRoutine = (routine_Id: number) => {
  return axiosIns.post(`${END_POINTS.HIT_MISS_ROUTINES}/copy/${routine_Id}`);
};

export const deleteHitMissRoutine = (routine_Id: number) => {
  return axiosIns.delete(`${END_POINTS.HIT_MISS_ROUTINES}/${routine_Id}`);
};

export const createHitMissRoutine = (body: CreateRoutinePayload) => {
  return axiosIns.post(END_POINTS.HIT_MISS_ROUTINES, body);
};

export const updateHitMissRoutine = (routine_Id: number, body: CreateRoutinePayload) => {
  return axiosIns.put(`${END_POINTS.HIT_MISS_ROUTINES}/${routine_Id}`, body);
};

export const getHitMissRoutineDetail = (routine_Id: number) => {
  return axiosIns.get<HitMissRoutineDetailResponse>(
    `${END_POINTS.HIT_MISS_ROUTINES}/${routine_Id}`
  );
};

export const getSummarySection = (params: SummaryPayload) => {
  return axiosIns.get<HitMissRoutineSummaryResponse>(END_POINTS.SUMMARY_SECTION, {
    params: params,
  });
};

export const getSummaryGroup = (params: SummaryPayload) => {
  return axiosIns.get<HitMissRoutineGroupResponse>(END_POINTS.SUMMARY_GROUP, {
    params: params,
  });
};

export const getHitMissRoutineCurrent = (params: SummaryPayload) => {
  return axiosIns.get<HitMissRoutineCurrentResponse>(END_POINTS.HIT_MISS_SESSION, {
    params: params,
  });
};

export const postHitMissEvent = (params: SesstionPayload, payload: SesstionEventItemPayload) => {
  const endpoint = END_POINTS.HIT_MISS_EVENT.replace(':session_id', String(params.session_id));
  return axiosIns.post<PostHitMissEventResponse>(endpoint, payload);
};

export const deleteHitMissEvent = (params: UndoHitMissPayload) => {
  const endpoint = END_POINTS.HIT_MISS_DELETE_EVENT.replace(
    ':session_id',
    String(params.session_id)
  )
    .replace(':section_id', String(params.section_id))
    .replace(':group_id', String(params.group_id));

  return axiosIns.delete<DeleteHitMissSessionResponse>(endpoint);
};

export const postHitMissComplete = (params: SesstionPayload) => {
  const endpoint = END_POINTS.HIT_MISS_COMPLETE.replace(':session_id', String(params.session_id));
  return axiosIns.post<PostHitMissCompletePayload>(endpoint);
};
