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

export type BaseFlyerAndBases = {
  measurementName: string;
  items: {
    name: string;
    result: number;
    measurementUnit: string;
  }[];
};

type MeasurementStore = {
  measurementListOptions: SelectOption[];
  baseMeasurementList: MeasurementItem[];
  coachStudent: CoachStudentItem[];
  flyerList: BaseFlyerAndBases[];
  basesSpotterList: BaseFlyerAndBases[];
  setMeasurementListOptions: (options: SelectOption[]) => void;
  setBaseMeasurementList: (list: MeasurementItem[]) => void;
  setCoachStudent: (list: CoachStudentItem[]) => void;
  setFlyerList: (list: BaseFlyerAndBases[]) => void;
  setBasesSpotterList: (list: BaseFlyerAndBases[]) => void;
  refreshFlyer: boolean;
  refreshBasesSpotter: boolean;
  setRefreshFlyer: (value: boolean) => void;
  setRefreshBasesSpotter: (value: boolean) => void;
};

export const useMeasurementStore = create<MeasurementStore>(set => ({
  measurementListOptions: [],
  baseMeasurementList: [],
  coachStudent: [],
  flyerList: [],
  basesSpotterList: [],
  refreshFlyer: false,
  refreshBasesSpotter: false,
  setMeasurementListOptions: options => set({ measurementListOptions: options }),
  setBaseMeasurementList: list => set({ baseMeasurementList: list }),
  setCoachStudent: list => set({ coachStudent: list }),
  setFlyerList: list => set({ flyerList: list }),
  setBasesSpotterList: list => set({ basesSpotterList: list }),
  setRefreshFlyer: value => set({ refreshFlyer: value }),
  setRefreshBasesSpotter: value => set({ refreshBasesSpotter: value }),
}));
