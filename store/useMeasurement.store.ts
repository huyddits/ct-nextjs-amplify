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

type CoachStudentItem = {
  coachStudentId: number;
  athleteId: string;
  status: string;
  athlete: {
    accountType: string;
    email: string;
    stripeCustomerId: string;
    stripeSubscriptionId: string;
    isActive: boolean;
    profile: {
      profileId: number;
      firstName: string;
      lastName: string;
      schoolName: string;
      dateOfBirth: string;
      coachCode: string;
    };
  };
};

type MeasurementStore = {
  measurementListOptions: SelectOption[];
  rawMeasurementList: MeasurementItem[];
  coachStudent: CoachStudentItem[];
  setMeasurementListOptions: (options: SelectOption[]) => void;
  setRawMeasurementList: (list: MeasurementItem[]) => void;
  setCoachStudent: (list: CoachStudentItem[]) => void;
};

export const useMeasurementStore = create<MeasurementStore>(set => ({
  measurementListOptions: [],
  rawMeasurementList: [],
  coachStudent: [],
  setMeasurementListOptions: options => set({ measurementListOptions: options }),
  setRawMeasurementList: list => set({ rawMeasurementList: list }),
  setCoachStudent: list => set({ coachStudent: list }),
}));
