export interface ApiResponse<T, K = undefined> {
  status: string;
  message: string;
  data?: T;
  error?: {
    code: string;
    details: K extends undefined ? unknown : K;
  };
}

export enum SocialProvider {
  Facebook = 'FACEBOOK',
  Google = 'GOOGLE',
  Instagram = 'INSTAGRAM',
  Twitter = 'TWITTER',
}

export enum AccountType {
  Athlete = 'athlete',
  Coach = 'coach',
}

export enum MeasurementUnit {
  Imperial = 'imperial',
  Metric = 'metric',
}

export type PersonalInfo = {
  id: string;
  accountType: AccountType;
  firstName: string;
  lastName: string;
  email: string;
  isActive: boolean;
  createdAt: string;
  profileId: string;
  dateOfBirth: string;
  measurementUnit: string;
  roleId: number;
  roleName: string;
  cheerTypeId: number;
  cheerTypeName: string;
  cheerStyleId: number;
  cheerStyleName: string;
  equipmentIds: number[];
} | null;
