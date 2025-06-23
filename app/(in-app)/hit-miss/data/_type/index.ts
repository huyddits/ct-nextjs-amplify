export type HitMissUserItem = {
  firstName: string;
  lastName: string;
  userId: string;
};

export type HitMissGroup = {
  groupId: number;
  users: HitMissUserItem[];
};

export type HitMissSection = {
  sectionId: number;
  name: string;
  groups: HitMissGroup[];
};

export type HitMissRoutine = {
  routineId: number;
  name: string;
  description: string;
  sections: HitMissSection[];
};

export type SummarySectionResponse = {
  routineId: number;
  from?: string;
  to?: string;
  sections: SummarySection[];
};

export type SummarySection = {
  sectionId: number;
  name: string;
  totalReps: number;
  hitPercentage: number;
};

export type SummaryGroupResponse = {
  routineId: number;
  from?: string;
  to?: string;
  sections: SummaryGroup[];
};

export type SummaryGroup = {
  sectionId: number;
  name: string;
  groups: Groups[];
};
export type Groups = {
  groupId: number;
  totalReps: number;
  hitPercentage: number;
};
