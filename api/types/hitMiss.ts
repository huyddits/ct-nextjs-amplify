import { ApiResponse } from '@/utils/types';

export type HitMissUser = {
  first_name: string;
  last_name: string;
  user_id: string;
};

export type HitMissGroup = {
  group_id: number;
  rep_count?: number;
  hit_percentage?: number;
  events?: HitMissEventItem[];
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

export type SummarySectionResponse = {
  routine_id: number;
  from?: string;
  to?: string;
  sections: SummarySection[];
};

export type SummarySection = {
  section_id: number;
  name: string;
  total_reps: number;
  hit_percentage: number;
};

export type SummaryGroupResponse = {
  routine_id: number;
  from?: string;
  to?: string;
  sections: SummaryGroup[];
};

export type SummaryGroup = {
  section_id: number;
  name: string;
  groups: Groups[];
};
export type Groups = {
  group_id: number;
  total_reps: number;
  hit_percentage: number;
};

export type SummaryPayload = {
  routine_id: number;
};

export type HitMissCurrentResponse = {
  id: number;
  status: string;
  completed_at: string;
  events: EventsHitMiss;
};

export type EventsHitMiss = {
  routine_id: number;
  name: string;
  description: string;
  sections: HitMissSection[];
};

export type HitMissEventItem = {
  id: number;
  type: string;
};

export type SesstionPayload = {
  session_id: number;
};

export type SesstionEventItemPayload = {
  section_id: number;
  group_id: number;
  type: string;
};

export type SesstionCompleteItemPayload = {
  id: number;
  status: string;
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

export type HitMissRoutineSummaryResponse = ApiResponse<SummarySectionResponse[], {}>;

export type HitMissRoutineGroupResponse = ApiResponse<SummaryGroupResponse[], {}>;

export type HitMissRoutineCurrentResponse = ApiResponse<HitMissCurrentResponse, {}>;

export type PostHitMissEventResponse = ApiResponse<{}, {}>;

export type DeleteHitMissSessionResponse = ApiResponse<{}, {}>;

export type PostHitMissCompletePayload = ApiResponse<{}, {}>;
