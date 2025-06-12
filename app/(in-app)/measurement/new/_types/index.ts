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

export type CreateMeasurementItem = {
  measurementId: number;
  athleteId: number;
  result: number;
};
