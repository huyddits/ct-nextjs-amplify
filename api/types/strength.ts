import { ApiResponse, Pagination } from '@/utils/types';

type ExerciseRecord = {
  exercise_id: number;
  name: string;
  cues: string;
  description: string;
  target_muscles: string;
  difficulty: number;
  video_url: string;
  image_url: string;
  equipment: any[];
  filterExercise: any[];
};

type TrainingTypeRecord = {
  type: string;
  sets: number;
  rep: number;
  rpe: number;
};

type ExerciseSet = { rep: number; rpe: number };

type WorkoutSet = ExerciseSet & { weight: number };

type ExerciseProgramRecord = {
  exercise_id: number;
  sets: ExerciseSet[];
};

type PastWorkoutRecord = {
  note: string;
  sets: WorkoutSet[];
  training_data_id: number;
  created_at: string;
  updated_at: string;
};

type ExerciseProgramRecordInProgram = {
  program_exercise_id: number;
  sets: ExerciseSet[];
  exercise: ExerciseRecord;
  status: boolean;
  training_data: PastWorkoutRecord[];
  type: string;
};

type ProgramRecord = {
  name: string;
  type: string;
  copied_at: string;
  created_at: string;
  finished_at: string;
  program_id: number;
  started_at: string;
  training_type: string;
  // exercises: ExerciseProgramRecord[];
  exercises: string;
};

type ProgramDetailRecord = {
  program_id: number;
  name: string;
  type: string; // e.g. 'personal_program'
  training_type: string; // e.g. 'general'
  copied_at: string | null;
  started_at: string | null;
  finished_at: string | null;
  created_at: string;
  updated_at: string;
  exercises: ExerciseProgramRecordInProgram[];
};

type ProgramStart = Omit<ProgramRecord, 'exercises'> & {
  exercises: ExerciseProgramRecordInProgram[];
};

type WorkoutRecord = {
  program_exercise_id: number;
  note: string;
  sets: WorkoutSet[];
};

export type GetListStrengthProgramsParams = {
  type: string;
  name: string;
};

export type GetListStrengthProgramsResponse = ApiResponse<ProgramRecord[]>;

export type GetListSkillTypesParams = {};

export type GetListSkillTypesResponse = ApiResponse<{ name: string; stunt_id: number }[]>;

export type GetListProblemsParams = {};

export type GetListProblemsResponse = ApiResponse<{ name: string; problem_id: number }[]>;

export type GetListExercisesParams = {
  page: number;
  limit: number;
};

export type GetListExercisesPayload = {
  role_id: number[];
  stunt_id: number[];
  cheer_type_id: number[];
  problem_id: number[];
  equipments: number[];
};

export type GetListExercisesResponse = ApiResponse<ExerciseRecord[]>;

export type GetListTrainingTypesResponse = ApiResponse<TrainingTypeRecord[]>;

export type CreateProgramPayload = {
  name: string;
  type: string;
  training_type: string;
  copied_at?: string;
  exercises: ExerciseProgramRecord[];
};

export type CreateProgramResponse = ApiResponse<{}, {}>;

export type TrainingLogAthlete = {
  name: string;
  cardioTrainingDays: number;
  strengthTrainingDays: number;
  cardioTotalDuration: number;
};

export type TrainingLogTeamAverage = {
  averageCardioTrainingDays: number;
  averageStrengthTrainingDays: number;
  averageCardioDuration: number;
};

export type TrainingLogResponse = {
  athletes: TrainingLogAthlete[];
  teamAverages: TrainingLogTeamAverage;
};
export type UpdateProgramPayload = Partial<CreateProgramPayload & { program_id: number }>;

export type UpdateProgramResponse = ApiResponse<{}, {}>;

export type DuplicateProgramParams = { id: number };

export type DuplicateProgramResponse = ApiResponse<{}>;

export type GetProgramDetailResponse = ApiResponse<ProgramDetailRecord>;

export type DeleteProgramResponse = ApiResponse<{}, {}>;
export type GetStrengthPastTrainingDataPayload = {
  page?: number;
  limit?: number;
  start_date: string;
  end_date: string;
};

export type StrengthPastTrainingDataSet = {
  weight: number;
  set: number;
  rpe: number;
};

export type StrengthPastTrainingDataTraining = {
  training_data_id: number;
  sets: StrengthPastTrainingDataSet[];
  note: string | null;
  created_at: string;
  updated_at: string;
};

export type StrengthPastTrainingDataExercise = {
  program_exercise_id: number;
  exercise_name: string;
  training_data: StrengthPastTrainingDataTraining;
};

export type StrengthPastTrainingDataProgram = {
  program_id: number;
  program_name: string;
  exercises: StrengthPastTrainingDataExercise[];
};

export type StrengthPastTrainingDataDateGroup = {
  date: string;
  programs: StrengthPastTrainingDataProgram[];
};

export type GetStrengthPastTrainingDataResponse = ApiResponse<StrengthPastTrainingDataDateGroup[]>;

export type GetListExercisesInProgramResponse = ApiResponse<ProgramStart, {}>;

export type CompleteWorkoutPayload = WorkoutRecord[];

export type CompleteWorkoutResponse = ApiResponse<{}, {}>;
