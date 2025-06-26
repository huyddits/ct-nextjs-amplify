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
  AthletePayload,
  GetImprovementResponse,
  GetLastThreeMonthsResponse,
  GetThreeLatestResultsResponse,
  GetResultForAllMeasurementsResponse,
  FlyerAndBasesPayLoad,
} from './types/measurement';

export const getMeasurementList = () => {
  return axiosIns.get<GetListMeasurementResponse>(END_POINTS.MEASUREMENTS);
};

export const getCoachStudentList = (params: CoachStudentPayload) => {
  return axiosIns.get<GetListCoachStudentResponse>(END_POINTS.ATHLETE_MEASUREMENTS, {
    params: params,
  });
};

export const postMeasurement = (payload: CreateMeasurementPayload) => {
  return axiosIns.post<CreateMeasurementResponse>(END_POINTS.CREATE_MEASUREMENTS, payload);
};

export const getBasesSpotter = (params: FlyerAndBasesPayLoad) => {
  return axiosIns.get<GetBasesSpotterResponse>(END_POINTS.BASES_SPOTTER, {
    params: params,
  });
};

export const getFlyer = (params: FlyerAndBasesPayLoad) => {
  return axiosIns.get<GetBasesSpotterResponse>(END_POINTS.FLYER, {
    params: params,
  });
};

export const getLatestResult = (params: AthletePayload) => {
  return axiosIns.get<GetLatestResultResponse>(END_POINTS.LATEST_RESULT, {
    params: params,
  });
};

export const getImprovement = (params: AthletePayload) => {
  return axiosIns.get<GetImprovementResponse>(END_POINTS.IMPROVEMENT, {
    params: params,
  });
};

export const getLastThreeMonths = (params: AthletePayload) => {
  return axiosIns.get<GetLastThreeMonthsResponse>(END_POINTS.LAST_THREE_MONTHS, {
    params: params,
  });
};

export const getThreeLatestResults = (params: AthletePayload) => {
  return axiosIns.get<GetThreeLatestResultsResponse>(END_POINTS.THREE_LATEST_RESULTS, {
    params: params,
  });
};

export const getResultForAllMeasurements = (params: AthletePayload) => {
  return axiosIns.get<GetResultForAllMeasurementsResponse>(END_POINTS.RESULT_FOR_ALL_MEASUREMENTS, {
    params: params,
  });
};
