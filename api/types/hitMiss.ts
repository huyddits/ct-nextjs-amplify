import { ApiResponse } from '@/utils/types';

export type HitMissUser = {
  first_name: string;
  last_name: string;
  user_id: string;
};

export type HitMissGroup = {
  group_id: number;
  users: HitMissUser[];
};

export type HitMissSection = {
  section_id: number;
  name: string;
  groups: HitMissGroup[];
};

export type HitMissRoutine = {
  routine_id: number;
  name: string;
  description: string;
  sections: HitMissSection[];
};

export type summarySectionResponse = {
  routine_id: number;
  from?: string;
  to?: string;
  sections: summarySection[];
};

export type summarySection = {
  section_id: number;
  name: string;
  total_reps: number;
  hit_percentage: number;
};

export type summaryGroupResponse = {
  routine_id: number;
  from?: string;
  to?: string;
  sections: summaryGroup[];
};

export type summaryGroup = {
  section_id: number;
  name: string;
  groups: groups[];
};
export type groups = {
  group_id: number;
  total_reps: number;
  hit_percentage: number;
};

export type summaryPlayload = {
  routine_id: number;
};

export type HitMissRoutineListResponse = ApiResponse<HitMissRoutine[]>;

export type CreateRoutinePayload<Detail = false> = {
  name: string;
  sections: CreateRoutineSingleSection<Detail>[];
} & (Detail extends true ? { routine_id: number } : {});

export type CreateRoutineSingleSection<Detail = false> = {
  name: string;
  groups: CreateRoutineSingleGroup<Detail>[];
} & (Detail extends true ? { section_id: number } : {});

export type CreateRoutineSingleGroup<Detail = false> = {
  users: Array<RoutineMember | string | undefined>;
} & (Detail extends true ? { group_id: number } : {});

type RoutineMember = {
  first_name?: string;
  last_name?: string;
  user_id?: string;
};

export type HitMissRoutineDetailResponse = ApiResponse<CreateRoutinePayload<true>>;

export type HitMissRoutineSummaryResponse = ApiResponse<summarySectionResponse[], {}>;

export type HitMissRoutineGroupResponse = ApiResponse<summaryGroupResponse[], {}>;
