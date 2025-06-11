import axiosIns from '@/lib/axiosIns';
import type {
  CreateProgramPayload,
  CreateProgramResponse,
  DeleteProgramResponse,
  DuplicateProgramPayload,
  DuplicateProgramResponse,
  GetListExercisesParams,
  GetListExercisesPayload,
  GetListExercisesResponse,
  GetListProblemsParams,
  GetListProblemsResponse,
  GetListSkillTypesParams,
  GetListSkillTypesResponse,
  GetListStrengthProgramsParams,
  GetListStrengthProgramsResponse,
  GetListTrainingTypesResponse,
  TrainingLogResponse,
  GetProgramDetailResponse,
  UpdateProgramPayload,
} from './types/strength';
import { END_POINTS } from '@/utils/constants';
import { ApiResponse } from '@/utils/types';

export const getListStrengthPrograms = async (params: GetListStrengthProgramsParams) => {
  return axiosIns.get<GetListStrengthProgramsResponse>(END_POINTS.STRENGTH_PROGRAMS, { params });
};

export const getListSkillTypes = async (params: GetListSkillTypesParams) => {
  return axiosIns.get<GetListSkillTypesResponse>(END_POINTS.STRENGTH_SKILLS, { params });
};

export const getListProblemTypes = async (params: GetListProblemsParams) => {
  return axiosIns.get<GetListProblemsResponse>(END_POINTS.PROBLEMS, { params });
};

export const getListExercises = (
  params: GetListExercisesParams,
  payload: GetListExercisesPayload
) => {
  return axiosIns.post<GetListExercisesResponse>(END_POINTS.EXERCISES_FILTER, payload, {
    params,
  });
};

export const getListTrainingTypes = () => {
  return axiosIns.get<GetListTrainingTypesResponse>(END_POINTS.STRENGTH_PROGRAMS_TRAINING_TYPES);
};

export const createProgram = (payload: CreateProgramPayload) => {
  return axiosIns.post<CreateProgramResponse>(END_POINTS.STRENGTH_PROGRAMS, payload);
};

export const getTraningLog = () => {
  return axiosIns.get<ApiResponse<TrainingLogResponse>>(END_POINTS.TEAM_TRAINING_DATA);
};

export const updateProgram = (payload: UpdateProgramPayload) => {
  return axiosIns.put(END_POINTS.STRENGTH_PROGRAMS, payload);
};

export const duplicateProgram = (payload: DuplicateProgramPayload) => {
  return axiosIns.post<DuplicateProgramResponse>(END_POINTS.STRENGTH_PROGRAMS_COPY, payload);
};

export const getProgramDetail = (id: number) => {
  return axiosIns.get<GetProgramDetailResponse>(END_POINTS.STRENGTH_PROGRAMS + `/${id}`);
};

export const deleteProgram = (id: number) => {
  return axiosIns.delete<DeleteProgramResponse>(END_POINTS.STRENGTH_PROGRAMS, {
    params: { id },
  });
};

export const getListExercisesInProgram = (programId: number) => {
  console.log({ programId });
  return axiosIns.post(
    END_POINTS.STRENGTH_PROGRAMS_START,
    {},
    {
      params: { program_id: programId },
    }
  );
};
