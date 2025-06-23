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

export type summarySectionResponse = {
  routineId: number;
  from?: string;
  to?: string;
  sections: summarySection[];
};

export type summarySection = {
  sectionId: number;
  name: string;
  totalReps: number;
  hitPercentage: number;
};

export type summaryGroupResponse = {
  routineId: number;
  from?: string;
  to?: string;
  sections: summaryGroup[];
};

export type summaryGroup = {
  sectionId: number;
  name: string;
  groups: groups[];
};
export type groups = {
  groupId: number;
  totalReps: number;
  hitPercentage: number;
};
