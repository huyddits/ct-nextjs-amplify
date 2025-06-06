'use client';

import { SelectOption } from '@/components/compose/AppSelect.client';
import { create } from 'zustand';

type MeasurementList = {
  measurementsId: number;
  name: string;
  instruction: string;
  imperialUnit: string;
  metricUnit: string;
  thumbnailLink: string;
  videoLink: string;
};

type MeasurementStore = {
  measurementListOptions: SelectOption[];
  setMeasurementListOptions: (options: SelectOption[]) => void;
};

export const useMeasurementStore = create<MeasurementStore>(set => ({
  measurementListOptions: [],
  setMeasurementListOptions: options => set({ measurementListOptions: options }),
}));
