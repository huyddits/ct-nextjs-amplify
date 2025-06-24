export type HitMissUserItem = {
  firstName: string;
  lastName: string;
  userId: string;
};

export type HitMissGroup = {
  groupId: number;
  repCount?: number;
  hitPercentage?: number;
  events?: HitMissEventItem[];
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

export type HitMissCurrentItem = {
  id: number;
  status: string;
  completedAt: string;
  events: EventsHitMiss;
};

export type EventsHitMiss = {
  routineId: number;
  name: string;
  description: string;
  sections: HitMissSection[];
};

export type HitMissEventItem = {
  id: number;
  type: string;
};
