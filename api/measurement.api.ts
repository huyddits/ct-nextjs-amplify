import axiosIns from '@/lib/axiosIns';
import { END_POINTS } from '@/utils/constants';
import {
  GetListMeasurementResponse,
  GetListCoachStudentResponse,
  CoachStudentPayload,
  CreateMeasurementResponse,
  CreateMeasurementPayload,
  GetBasesSpotterResponse,
  GetLatestResultResponse,
  athletePayload,
  GetImprovementResponse,
  GetLastThreeMonthsResponse,
  GetThreeLatestResultsResponse,
  GetResultForAllMeasurementsResponse,
} from './types/measurement';

export const getMeasurementList = () => {
  return axiosIns.get<GetListMeasurementResponse>(END_POINTS.MEASUREMENTS);
};

export const getCoachStudentList = (payload: CoachStudentPayload) => {
  return axiosIns.get<GetListCoachStudentResponse>(END_POINTS.ATHLETE_MEASUREMENTS, {
    params: payload,
  });
};

export const postMeasurement = (payload: CreateMeasurementPayload) => {
  return axiosIns.post<CreateMeasurementResponse>(END_POINTS.CREATE_MEASUREMENTS, payload);
};

export const getBasesSpotter = () => {
  return axiosIns.get<GetBasesSpotterResponse>(END_POINTS.BASES_SPOTTER);
};

export const getFlyer = () => {
  return axiosIns.get<GetBasesSpotterResponse>(END_POINTS.FLYER);
};

export const getLatestResult = (payload: athletePayload) => {
  return axiosIns.get<GetLatestResultResponse>(END_POINTS.LATEST_RESULT, {
    params: payload,
  });
};

export const getImprovement = (payload: athletePayload) => {
  return axiosIns.get<GetImprovementResponse>(END_POINTS.IMPROVEMENT, {
    params: payload,
  });
};

export const getLastThreeMonths = (payload: athletePayload) => {
  return axiosIns.get<GetLastThreeMonthsResponse>(END_POINTS.LAST_THREE_MONTHS, {
    params: payload,
  });
};

export const getThreeLatestResults = (payload: athletePayload) => {
  return axiosIns.get<GetThreeLatestResultsResponse>(END_POINTS.THREE_LATEST_RESULTS, {
    params: payload,
  });
};

export const getResultForAllMeasurements = (payload: athletePayload) => {
  return axiosIns.get<GetResultForAllMeasurementsResponse>(END_POINTS.RESULT_FOR_ALL_MEASUREMENTS, {
    params: payload,
  });
};
