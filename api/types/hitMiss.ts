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
