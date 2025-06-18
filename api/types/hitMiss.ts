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

export type CreateRoutinePayload = {
  name: string;
  sections: CreateRoutineSingleSection[];
};

export type CreateRoutineSingleSection = {
  name: string;
  groups: CreateRoutineSingleGroup[];
};

export type CreateRoutineSingleGroup = {
  members: string[] | Array<{ id: string }>;
};
