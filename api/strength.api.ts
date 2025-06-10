import axiosIns from '@/lib/axiosIns';
import type {
  CreateProgramPayload,
  CreateProgramResponse,
  GetListExercisesParams,
  GetListExercisesPayload,
  GetListExercisesResponse,
  GetListProblemsParams,
  GetListProblemsResponse,
  GetListProgramTypesParams,
  GetListProgramTypesResponse,
  GetListSkillTypesParams,
  GetListSkillTypesResponse,
  GetListStrengthProgramsParams,
  GetListStrengthProgramsResponse,
  GetListTrainingTypesResponse,
} from './types/strength';
import { END_POINTS } from '@/utils/constants';

export const getListStrengthPrograms = async (params: GetListStrengthProgramsParams) => {
  return axiosIns.get<GetListStrengthProgramsResponse>(END_POINTS.STRENGTH_PROGRAMS, { params });
};

// export const getListProgramTypes = async (params: GetListProgramTypesParams) => {
//   return new Promise<{ data: GetListProgramTypesResponse }>(resolve => {
//     return setTimeout(() => {
//       return resolve({
//         data: {
//           data: [
//             { name: 'Team Program', id: 1 },
//             { name: 'Individual Program', id: 2 },
//             { name: 'Custom Program', id: 3 },
//           ],
//           message: 'success',
//           status: 'ok',
//         },
//       });
//     });
//   });
// };

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
  return axiosIns.post<GetListExercisesResponse>(
    END_POINTS.EXERCISES_FILTER,
    // {
    //   role_id: payload.role_id[0],
    //   stunt_id: payload.stunt_id[0],
    //   cheer_type_id: [],
    //   problem_id: payload.problem_id[0],
    //   equipments: payload.equipments,
    // },
    payload,
    {
      params,
    }
  );
};

export const getListTrainingTypes = () => {
  return axiosIns.get<GetListTrainingTypesResponse>(END_POINTS.STRENGTH_PROGRAMS_TRAINING_TYPES);
};

export const createProgram = (payload: CreateProgramPayload) => {
  return axiosIns.post<CreateProgramResponse>(END_POINTS.STRENGTH_PROGRAMS, payload);
};
