export type MeasurementItem = {
  measurementsId: number;
  name: string;
  instruction: string;
  imperialUnit: string;
  metricUnit: string;
  thumbnailLink: string;
  videoLink: string;
};

export type AthleteItem = {
  athleteId: number;
  firstName: string;
  lastName: string;
  email: string;
  avatarLink: string;
  measurementUnit: string;
};
