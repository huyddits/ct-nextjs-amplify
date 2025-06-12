'use client';

import { SelectOption } from '@/components/compose/AppSelect.client';
import { create } from 'zustand';

type MeasurementItem = {
  measurementsId: number;
  name: string;
  instruction: string;
  imperialUnit: string;
  metricUnit: string;
  thumbnailLink: string;
  videoLink: string;
};

export type AthleteItem = {
  accountType: string;
  email: string;
  stripeCustomerId: string;
  stripeSubscriptionId: string;
  isActive: boolean;
  profile: AthleteProfileItem;
};

export type AthleteProfileItem = {
  profileId: number;
  firstName: string;
  lastName: string;
  schoolName: string;
  dateOfBirth: string;
  coachCode: string;
};

export type CoachStudentItem = {
  coachStudentId: number;
  status: string;
  athleteId: string;
  athlete: AthleteItem;
};

type MeasurementStore = {
  measurementListOptions: SelectOption[];
  baseMeasurementList: MeasurementItem[];
  coachStudent: CoachStudentItem[];
  setMeasurementListOptions: (options: SelectOption[]) => void;
  setRawMeasurementList: (list: MeasurementItem[]) => void;
  setCoachStudent: (list: CoachStudentItem[]) => void;
};

export const useMeasurementStore = create<MeasurementStore>(set => ({
  measurementListOptions: [],
  baseMeasurementList: [],
  coachStudent: [],
  setMeasurementListOptions: options => set({ measurementListOptions: options }),
  setRawMeasurementList: list => set({ baseMeasurementList: list }),
  setCoachStudent: list => set({ coachStudent: list }),
}));
