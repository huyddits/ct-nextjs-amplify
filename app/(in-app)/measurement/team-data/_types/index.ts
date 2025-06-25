export type BaseFlyerAndBases = {
  measurementName: string;
  items: {
    name: string;
    result: number;
    measurementUnit: string;
  }[];
};

export type LatestResultItem = {
  measurementSessionId: number;
  result: number;
  measurementUnit: string;
  createdAt?: string;
};

export type ImprovedItem = {
  improvement: string;
  measurementUnit: string;
};

export type ResultForAllMeasurementsItem = {
  measurementId: number;
  measurementName: string;
  result: number;
  measurementUnit: string;
  createdAt: string;
};

export type LatesThreeMonthsItem = {
  results: LatestResultItem[];
  maxResult: number;
};
